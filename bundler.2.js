import * as denoGraph from "https://deno.land/x/deno_graph@0.48.1/mod.ts"
import { FileSystem, glob } from "https://deno.land/x/quickr@0.6.36/main/file_system.js"
import { Parser, parserFromWasm, flatNodeList } from "https://deno.land/x/deno_tree_sitter@0.0.8/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
import { toFileUrl } from "https://deno.land/std@0.186.0/path/posix.ts"
import * as Path from "https://deno.land/std@0.128.0/path/mod.ts"
import { iter, next, Stop, concat, Iterable, zip, count, enumerate, permute, combinations, slices, asyncIteratorToList, concurrentlyTransform, forkAndFilter } from "https://deno.land/x/good@1.4.3.0/iterable.js"
import { indent, isValidIdentifier, toRepresentation } from "https://deno.land/x/good@1.4.3.0/string.js"

const ts = await import(`https://esm.sh/typescript@${Deno.version.typescript}`)
const transpile = source=>ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022 }}).outputText
const parser = await parserFromWasm(javascript) // path or Uint8Array
const curl = url=>fetch(url).then(v=>v.text())

async function bundledSourceOf(urlOrPath) {
    const url     = urlOrPath.startsWith("./") ? `${new URL(urlOrPath, import.meta.url)}` : urlOrPath
    const results = await denoGraph.createGraph(url)
    const urls    = recursivelyAllUrls(results)
    
    // keep track of all identifiers
    const identifiers = new Set()
    for (const eachUrl of urls) {
        for (const eachIdentifier of parser.parse((await readAbsoluteUrl(eachUrl)).sourceCode) .rootNode.descendantsOfType("identifier")) {
            identifiers.add(eachIdentifier.text)
        }
    }

    // create globally unique names
    const globalImportName      = ensureNameIsntUsed({ baseName: "globalImport", identifiers, })
    const helperName            = ensureNameIsntUsed({ baseName: "globalImportHelper", identifiers, })

    // 
    // replace all the import sources with base64-encoded imports
    // replace import.meta with helper
    // 
    const importMapping = {}
    const recursivePart = async (module, recursiveDependences) => {
        if (recursiveDependences[url]) {
            throw Error(`bundle does not support recursiveDependences (e.g. ${JSON.stringify(url)})`)
        }
        recursiveDependences[url] = true
        
        const hasNoDependencies = !module.dependencies && !(module.code instanceof Object)
        if (hasNoDependencies && isUrl(module.specifier)) {
            const url = module.specifier
            const { sourceCode } = await readAbsoluteUrl(url)

            // FIXME: resolve (e.g. urlBase)
            // FIXME: main

            // 
            // 1. add helper
            // 
            let topOfCode = `
                const ${globalImportName} = globalThis.${globalImportName};
                const ${helperName} = Object.freeze({
                    url: ${JSON.stringify(url)},
                    main: ${JSON.stringify(isMain&&true)},
                    resolve: (relative)=>${JSON.stringify(urlBase)}+\`/\${relative}\`,
                });
            `
            
            // 
            // 2. modify imports
            // 
            const { rootNode } = parser.parse({
                string: sourceCode,
                withWhitespace: true,
            })
            for (const each of concat(rootNode.descendantsOfType("import_statement"), rootNode.descendantsOfType("export_statement"))) {
                for (const eachStringNode of each.descendantsOfType("string")) {
                    // FIXME: get the url for eachStringNode (need to resolve it or match it from module.dependencies)
                    replaceNodeWith(node, "data:text/javascript;base64, "+btoa(unescape(encodeURIComponent(sourceCode))) )
                }
            }

            //
            // 3. replace import.meta with a variable
            //
            // replace import.meta with a variable
            for (const each of flatNodeList(rootNode)) {
                if (each.type == "member_expression") {
                    const originalText = each.text
                    // import.meta, import.main, import.resolve
                    const replacedText = originalText.replace(/[^\.]import\.meta\b/g, helperName)
                    if (replacedText != originalText) {
                        replaceNodeWith(each, replacedText)
                    }
                }
            }
            
            //
            // 4. combine everything
            //
            importMapping[url] = topOfCode+flatNodeList(rootNode).filter(each=>(each.isLeaf||!each.hasChildren)).map(each=>each.text).join("")
        }
    }
    
}

const sheBangPattern = /^#!.+\n/
const isUrl = specifier=>specifier.startsWith("file:") || specifier.startsWith("http:") || specifier.startsWith("https:")
const readAbsoluteUrl = async (url)=>{
    // TODO: could add caching here to avoid curling twice
    const remoteUrl = url.startsWith("http")
    let sourceCode = remoteUrl ? await curl(url) : await FileSystem.read(url)
    if (!sourceCode) {
        throw Error(`couldn't read url: ${toRepresentation(url)}`)
    }
    // remove she-bang, as its irrelvent if not the main module
    let sheBang = sourceCode.match(sheBangPattern)
    if (sheBang) {
        sheBang = sheBang[0]
        sourceCode = sourceCode.slice(0,sheBang.length)
    } else {
        sheBang = ""
    }
    if (url.endsWith(".ts")) {
        sourceCode = transpile(sourceCode)
    }
    return { sourceCode, sheBang }
}

const replaceNodeWith = (node, text)=>Object.defineProperties(eachStringNode, {
    text: {
        get() {
            return text
        }
    },
    children: {
        get() {
            return []
        }
    },
    hasChildren: {
        get() {
            return false
        }
    },
})

const ensureNameIsntUsed = ({baseName, identifiers})=>{
    // ensure the globalImports baseName isnt being used anywhere
    if (!identifiers.has(baseName)) {
        return baseName
    } else {
        let replacementName = baseName+"1"
        let isBeingUsed = identifiers.has(replacementName)
        // eventually (and probably immediately) this will find a baseName that is not being used
        while (isBeingUsed) {
            replacementName = `${baseName}${Math.random()}`.replace(/[^\d]/,"")
            isBeingUsed = identifiers.has(replacementName)
        }
        return replacementName
    }
}

function recursivelyAllUrls(denoGraphResults) {
    // const denoGraphResults = await denoGraph.createGraph(url)
    const urls = [
        ...denoGraphResults.roots,
    ]
    
    const recursivePart = ({ kind, dependencies, mediaType, specifier, code,})=>{
        if (dependencies instanceof Array) {
            for (const each of dependencies) {
                recursivePart(each)
            }
        }
        if (code instanceof Object) {
            recursivePart(code)
        }
        if (specifier) {
            if (isUrl(specifier)) {
                if (!urls.includes(specifier)) {
                    urls.push(specifier)
                }
            }
        }
    }
    for (const each of denoGraphResults.modules) {
        recursivePart(each)
    }
    
    return urls
}

// var a = await fetch("https://deno.land/x/deno_graph@0.48.1/mod.ts").then(data=>data.text())
// {
//     "roots": [
//         "file:///Users/jeffhykin/repos/deno_std/bundle.js"
//     ],
//     "modules": [
//         {
//             "kind": "esm",
//             "dependencies": [
//                 {
//                     "specifier": "https://deno.land/x/deno_graph@0.48.1/mod.ts",
//                     "code": {
//                         "specifier": "https://deno.land/x/deno_graph@0.48.1/mod.ts",
//                         "span": {
//                             "start": {
//                                 "line": 1,
//                                 "character": 27
//                             },
//                             "end": {
//                                 "line": 1,
//                                 "character": 73
//                             }
//                         }
//                     }
//                 }
//             ],
//             "size": 384,
//             "mediaType": "JavaScript",
//             "specifier": "file:///Users/jeffhykin/repos/deno_std/bundle.js"
//         },
//         {
//             "kind": "esm",
//             "size": 23619,
//             "mediaType": "JavaScript",
//             "specifier": "https://deno.land/x/deno_graph@0.48.1/deno_graph_wasm.generated.js"
//         },
//         {
//             "kind": "esm",
//             "dependencies": [
//                 {
//                     "specifier": "./types.d.ts",
//                     "type": {
//                         "specifier": "https://deno.land/x/deno_graph@0.48.1/types.d.ts",
//                         "span": {
//                             "start": {
//                                 "line": 2,
//                                 "character": 34
//                             },
//                             "end": {
//                                 "line": 2,
//                                 "character": 48
//                             }
//                         }
//                     }
//                 }
//             ],
//             "size": 2037,
//             "mediaType": "TypeScript",
//             "specifier": "https://deno.land/x/deno_graph@0.48.1/loader.ts"
//         },
//         {
//             "kind": "esm",
//             "size": 414,
//             "mediaType": "TypeScript",
//             "specifier": "https://deno.land/x/deno_graph@0.48.1/media_type.ts"
//         },
//         {
//             "kind": "esm",
//             "dependencies": [
//                 {
//                     "specifier": "./deno_graph_wasm.generated.js",
//                     "code": {
//                         "specifier": "https://deno.land/x/deno_graph@0.48.1/deno_graph_wasm.generated.js",
//                         "span": {
//                             "start": {
//                                 "line": 20,
//                                 "character": 22
//                             },
//                             "end": {
//                                 "line": 20,
//                                 "character": 54
//                             }
//                         }
//                     }
//                 },
//                 {
//                     "specifier": "./loader.ts",
//                     "code": {
//                         "specifier": "https://deno.land/x/deno_graph@0.48.1/loader.ts",
//                         "span": {
//                             "start": {
//                                 "line": 21,
//                                 "character": 36
//                             },
//                             "end": {
//                                 "line": 21,
//                                 "character": 49
//                             }
//                         }
//                     }
//                 },
//                 {
//                     "specifier": "./types.d.ts",
//                     "type": {
//                         "specifier": "https://deno.land/x/deno_graph@0.48.1/types.d.ts",
//                         "span": {
//                             "start": {
//                                 "line": 28,
//                                 "character": 7
//                             },
//                             "end": {
//                                 "line": 28,
//                                 "character": 21
//                             }
//                         }
//                     }
//                 },
//                 {
//                     "specifier": "./media_type.ts",
//                     "code": {
//                         "specifier": "https://deno.land/x/deno_graph@0.48.1/media_type.ts",
//                         "span": {
//                             "start": {
//                                 "line": 31,
//                                 "character": 26
//                             },
//                             "end": {
//                                 "line": 31,
//                                 "character": 43
//                             }
//                         }
//                     }
//                 }
//             ],
//             "size": 7915,
//             "mediaType": "TypeScript",
//             "specifier": "https://deno.land/x/deno_graph@0.48.1/mod.ts"
//         },
//         {
//             "kind": "esm",
//             "dependencies": [
//                 {
//                     "specifier": "./media_type.ts",
//                     "type": {
//                         "specifier": "https://deno.land/x/deno_graph@0.48.1/media_type.ts",
//                         "span": {
//                             "start": {
//                                 "line": 2,
//                                 "character": 31
//                             },
//                             "end": {
//                                 "line": 2,
//                                 "character": 48
//                             }
//                         }
//                     }
//                 }
//             ],
//             "size": 6744,
//             "mediaType": "Dts",
//             "specifier": "https://deno.land/x/deno_graph@0.48.1/types.d.ts"
//         }
//     ],
//     "redirects": {}
// }

// import("data:text/javascript;base64, "+btoa(unescape(encodeURIComponent(source))))