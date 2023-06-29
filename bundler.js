// import { Parser, parserFromWasm, flatNodeList } from "https://deno.land/x/deno_tree_sitter@0.0.8/main.js"
import { Parser, parserFromWasm, flatNodeList } from "./main.js"
import { FileSystem, glob } from "https://deno.land/x/quickr@0.6.33/main/file_system.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
import { toFileUrl } from "https://deno.land/std@0.186.0/path/posix.ts"
import * as Path from "https://deno.land/std@0.128.0/path/mod.ts"
import { iter, next, Stop, Iterable, zip, count, enumerate, permute, combinations, slices, asyncIteratorToList, concurrentlyTransform, forkAndFilter } from "https://deno.land/x/good@1.3.0.4/iterable.js"
import { indent, isValidIdentifier, toRepresentation } from "https://deno.land/x/good@1.3.0.4/string.js"

const parser = await parserFromWasm(javascript) // path or Uint8Array

const curl = (url) => {
    return new Promise((resolve) =>
        fetch(url)
            .then((res) => res.text())
            .then((body) => resolve(body))
    )
}

const stringToBacktickRepresentation = (string) => {
    let newString = "`"
    for (const each of string) {
        if (each == "\\") {
            newString += "\\\\"
        } else if (each == "`") {
            newString += "\\`"
        } else if (each == "$") {
            newString += "\\$"
        } else if (each == "\r") { // special because it screws up CRLF vs LF and makes the file look like a binary file
            newString += "\\r"
        // sequences that dont need to be escaped
        } else if (each == "\b"||each == "\t"||each == "\n"||each == "\v"||each=="\f") { // note: \r is the only one missing, which is intentional because it causes problems: https://262.ecma-international.org/13.0/#sec-ecmascript-data-types-and-values
            newString += each
        } else if (each.codePointAt(0) < 0x7F) {
            newString += each
        } else if (isValidIdentifier(`_${each}`)) {
            newString += each
        } else {
            const stringified = JSON.stringify(each)
            if (stringified.length > 4) { // unicode escape needed, "\\n".length == 4
                newString += stringified.slice(1,-1) // slices off the double quote, and the first of two backslashes
            } else {
                newString += each
            }
        }
    }
    return newString +"`"
    // '`'+string.slice(0,10).replace("\\","\\\\").replace("`","\\`").replace("${","\\${")+'`'
}

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

const generateAsboluteImportUrl = ({urlBase, importPath})=>{
    const relativeImport = importPath.startsWith("./")||importPath.startsWith("../")
    const absoluteImport = importPath.startsWith("/")
    const urlImport      = importPath.startsWith("http")
    const fileUriImport  = importPath.startsWith("file:")
    
    let url = ""
    if (relativeImport) {
        url = `${urlBase}/${importPath}`
    } else if (absoluteImport) {
        url = toFileUrl(importPath).href
    } else if (urlImport || fileUriImport) {
        url = importPath
    } else {
        throw Error(`Unsupported import, probably a node import: ${toRepresentation(importPath)}, urlBase:${urlBase}`)
    }

    const urlObject = new URL(url)
    // fix the ".././././" to be just "../"
    urlObject.pathname = FileSystem.normalize(urlObject.pathname)
    return urlObject.href
}
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
    return { sourceCode, sheBang }
}

const sheBangPattern = /^#!.+\n/

const bundle = async ({ path })=> {
    const sharedInfo = {
        globalImportName: "globalImports",
        helperName: 'globalImportsHelper',
        identifiers: new Set(),
        sourceCodeStatusOf: {},
    }
    
    async function* innerBundle({ urlBase, relativePath, isMain=true }) {
        // 
        // first get imports recursively so that non-used names can be determined
        // 
            const url = generateAsboluteImportUrl({ urlBase, importPath: relativePath })
            // intentionally don't save tree or sourceCode in a variable (otherwise memory usage will explode; all source code of all files)
            const importStatements = parser.parse((await readAbsoluteUrl(url)).sourceCode).rootNode.descendantsOfType("import_statement")
            const exportImportStatements = parser.parse((await readAbsoluteUrl(url)).sourceCode).rootNode.descendantsOfType("export_statement").filter(each=>each.descendantsOfType("from").length > 0)
            let childCalls = []
            for (const eachImport of importStatements.concat(exportImportStatements)) {
                const importString = eachImport.descendantsOfType("string")[0].text
                console.warn(`eachImport is:`,eachImport.text)
                if (!importString) {
                    continue
                }
                const childUrl = generateAsboluteImportUrl({ urlBase, importPath: eval(importString) })
                        
                // if has been scheduled, just go to the next one
                if (sharedInfo.sourceCodeStatusOf[childUrl]) {
                    continue
                // if hasn't been scheduled
                } else {
                    sharedInfo.sourceCodeStatusOf[childUrl] = "aboutToParse"

                    if (childUrl.endsWith(".ts")) {
                        throw Error(`Can't handle typescript imports yet`)
                        // TODO: typescript support
                    }
                    
                    const { sourceCode } = await readAbsoluteUrl(childUrl)
                    const tree = parser.parse(sourceCode) 

                    // keep track of all identifiers
                    for (const eachIdentifier of tree.rootNode.descendantsOfType("identifier")) {
                        sharedInfo.identifiers.add(eachIdentifier.text)
                    }
                    sharedInfo.sourceCodeStatusOf[childUrl] = "tokensAdded"

                    const args = {
                        urlBase: childUrl.split(/\//).slice(0, -1).join("/"),
                        relativePath: "./"+childUrl.split(/\//).slice(-1)[0],
                        isMain: false,
                    }

                    childCalls.push({
                        args,
                        iter:iter(
                            innerBundle(args)
                        )
                    })
                }
            }
            // iterate each of them exactly once (let them do the import step of bundling)
            for (const {args, iter} of childCalls) {
                const output = await next(iter)
                if (output != "handledImports") {
                    throw Error(`There was a problem with a child import ${toRepresentation(args)}, ${toRepresentation(output)}`)
                }
            }
            // hand control back to parent before recursing again
            if (!isMain) {
                yield "handledImports"
            } else {
                // now that sourceCodeStatusOf is completely populated, finding unique names possible
                // populate shared info 
                sharedInfo.globalImportName      = ensureNameIsntUsed({ baseName: sharedInfo.globalImportName, identifiers: sharedInfo.identifiers })
                sharedInfo.helperName            = ensureNameIsntUsed({ baseName: sharedInfo.helperName, identifiers: sharedInfo.identifiers })
            }
        // 
        // now that the names have been solved, go back to letting children (leaf dependencies) do work
        // 
            // 
            // 1. add helper
            // 
            let topOfCode = `
                const ${sharedInfo.globalImportName} = globalThis.${sharedInfo.globalImportName};
                const ${sharedInfo.helperName} = Object.freeze({
                    url: ${JSON.stringify(url)},
                    main: ${JSON.stringify(isMain&&true)},
                    resolve: (relative)=>${JSON.stringify(urlBase)}+\`/\${relative}\`,
                });
            `

            // 
            // 2. modify imports
            // 
            // FIXME: doesn't handle the `export * from "./empty_dir.ts";` case yet
            const rootNode = (
                (
                    parser.parse({
                        string: (
                            (
                                await readAbsoluteUrl(url)
                            ).sourceCode
                        ),
                        withWhitespace: true,
                    })
                ).rootNode
            )
            
            for (const each of flatNodeList(rootNode)) {
                
                if (each.type == "import_statement") {

                    let replacement = ``
                    const importClauseChildren = each.descendantsOfType("import_clause")[0]?.children||[]
                    const namedImportsNodes = each.descendantsOfType("named_imports")
                    const namespaceImport = each.descendantsOfType("namespace_import").length > 0
                    const defaultImport = importClauseChildren.length == 1 && importClauseChildren[0]?.type == "identifier"
                    const hasFrom = each.descendantsOfType("from").length > 0

                    const thisUrlString = JSON.stringify(generateAsboluteImportUrl({ urlBase, importPath: eval(each.descendantsOfType("string")[0].text)  }))
                    const importValue = `
                        ((async ()=>{
                            const normalOutput = (await ${sharedInfo.globalImportName}[${thisUrlString}])
                            // merge in "other" exports
                            if (${sharedInfo.helperName}[Symbol.for("extraAggregates")] && ${sharedInfo.helperName}[Symbol.for("extraAggregates")][${thisUrlString}]) {
                                Object.assign(normalOutput, ${sharedInfo.helperName}[Symbol.for("extraAggregates")][${thisUrlString}])
                            }
                            return normalOutput
                        })())
                    `
                    // 
                    // import Name from "./something"
                    // 
                    if (defaultImport) {
                        replacement += `
                            const ${importClauseChildren[0].text} = ${importValue}.default;
                        `
                    }
                    
                    // 
                    // import * as Thing from "./something"
                    // 
                    if (namespaceImport) {
                        const identifier = each.descendantsOfType("namespace_import")[0].descendantsOfType("identifier")[0].text
                        replacement += `
                            const ${identifier} = ${importValue};
                        `
                    }
                    
                    // 
                    // import { thing as otherThing } from "./something"
                    // 
                    if (namedImportsNodes.length > 0) {
                        const namedSpecifiers = namedImportsNodes[0].descendantsOfType("import_specifier")
                        for (const eachSpecifier of namedSpecifiers) {
                            for (const eachChild of eachSpecifier.children) {
                                if (eachChild.type == "as") {
                                    Object.defineProperties(eachChild, {
                                        text: {
                                            get() {
                                                return ":"
                                            }
                                        },
                                    })
                                }
                            }
                        }
                        const importArea = flatNodeList(namedImportsNodes[0]).filter(each=>!each.hasChildren).map(each=>each.text).join(" ")
                        
                        replacement += `
                            const ${importArea.replace(/ as /g,": ")} = ${importValue};
                        `
                    }
                    // delete children to prevent recursing next time
                    Object.defineProperties(each, {
                        text: {
                            get() {
                                return replacement
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
                } else if (each.type == 'export_statement') {
                    const importSource = each.descendantsOfType("from")
                    if (importSource.length >= 1) {
                        let replacement = ``
                        const isNamespaceExport = each.descendantsOfType("*").length > 0
                        const isNamedExport = each.descendantsOfType("export_clause").length > 0
                        
                        const thisUrlString = JSON.stringify(generateAsboluteImportUrl({ urlBase, importPath: eval(each.descendantsOfType("string")[0].text)  }))
                        const importValue = `(await ${sharedInfo.globalImportName}[${thisUrlString}])`
                        // 
                        // export * from "./something"
                        // 
                        if (isNamespaceExport) {
                            // TODO: create extraImports for each module, then, upon import, merge the extra imports before pulling named imports out
                            replacement += `
                                if (!${sharedInfo.helperName}[Symbol.for("extraAggregates")]) {
                                    ${sharedInfo.helperName}[Symbol.for("extraAggregates")] = {}
                                }
                                if (!${sharedInfo.helperName}[Symbol.for("extraAggregates")][${thisUrlString}]) {
                                    ${sharedInfo.helperName}[Symbol.for("extraAggregates")][${thisUrlString}] = {}
                                }
                                Object.assign(${sharedInfo.helperName}[Symbol.for("extraAggregates")][${thisUrlString}], ${importValue});
                            `
                        
                        // 
                        // import { thing as otherThing } from "./something"
                        // 
                        } else if (isNamedExport) {
                            const exportNameSection = each.descendantsOfType("export_clause")[0]
                            // FIXME: probably missing the export { thing as otherThing } from "./blah.js"
                            // FIXME: export * as name1 from "module-name";
                            // FIXME: export * as default from "module-name";
                            const names = exportNameSection.descendantsOfType("export_specifier").map(each=>each.text)
                            const withDetails = names.map(each=>`${each}: ${sharedInfo.helperName}.temp.${each}`)
                            replacement += `
                                ${sharedInfo.helperName}.temp = ${importValue};
                                export { ${withDetails.join(", ")} };
                            `
                            // const namedSpecifiers = namedImportsNodes[0].descendantsOfType("import_specifier")
                            // for (const eachSpecifier of namedSpecifiers) {
                            //     for (const eachChild of eachSpecifier.children) {
                            //         if (eachChild.type == "as") {
                            //             Object.defineProperties(eachChild, {
                            //                 text: {
                            //                     get() {
                            //                         return ":"
                            //                     }
                            //                 },
                            //             })
                            //         }
                            //     }
                            // }
                            // const importArea = flatNodeList(namedImportsNodes[0]).filter(each=>!each.hasChildren).map(each=>each.text).join(" ")
                            
                            // replacement += `
                            //     const ${importArea} = ${importValue};
                            // `
                        } else {
                            continue
                        }

                        // delete children to prevent recursing next time
                        Object.defineProperties(each, {
                            text: {
                                get() {
                                    return replacement
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
                        // export_specifier
                    }
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
                    const replacedText = originalText.replace(/[^\.]import\.meta\b/g, sharedInfo.helperName)
                    if (replacedText != originalText) {
                        Object.defineProperties(each, {
                            text: {
                                get() {
                                    return replacedText
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
                    }
                }
            }
            
            //
            // 4. combine everything
            //
            const moduleWithNoImportsOrImportMeta = topOfCode+flatNodeList(rootNode).filter(each=>(each.isLeaf||!each.hasChildren)).map(each=>each.text).join("")
            
            // 
            // 5. extract exports using a btoa method
            // 
            let importableCode = `
                Object.defineProperty(${sharedInfo.globalImportName}, ${JSON.stringify(url)}, {
                    get() {
                        const source = js${stringToBacktickRepresentation(indent({string: moduleWithNoImportsOrImportMeta, by: "                        "}))}
                        return import("data:text/javascript;base64, "+btoa(unescape(encodeURIComponent(source))))
                    }
                })
            `
        
        // 
        // now that code has been made, bundle everything up and give it to the parent
        // 
            const importableThings = [
                importableCode
            ]
            for (const {args, iter} of childCalls) {
                const childOutputs = await next(iter)
                for (const sourceCode of childOutputs) {
                    importableThings.push(sourceCode)
                }
            }
        
        // 
        // final step
        // 
            if (!isMain) {
                yield importableThings
            } else {
                yield `${(await readAbsoluteUrl(url)).sheBang}
                    const js = (strings)=>strings[0]
                    globalThis.${sharedInfo.globalImportName} = {}
                    
                    ${importableThings.join("\n\n")}

                    await globalThis.${sharedInfo.globalImportName}[${JSON.stringify(url)}]
                `
            }
    }
    
    const rootUrl = toFileUrl(await FileSystem.makeAbsolutePath(path)).href
    return await next(iter(innerBundle({
        urlBase: rootUrl.split(/\//).slice(0, -1).join("/"),
        relativePath: "./"+rootUrl.split(/\//).slice(-1)[0],
    })))
}

console.log(await bundle({path: Deno.args[0]}))