#!/usr/bin/env sh
"\"",`$(echo --% ' |out-null)" >$null;function :{};function dv{<#${/*'>/dev/null )` 2>/dev/null;dv() { #>
echo "1.42.1"; : --% ' |out-null <#'; }; version="$(dv)"; deno="$HOME/.deno/$version/bin/deno"; if [ -x "$deno" ]; then  exec "$deno" run -q -A --no-lock "$0" "$@";  elif [ -f "$deno" ]; then  chmod +x "$deno" && exec "$deno" run -q -A --no-lock "$0" "$@";  fi; bin_dir="$HOME/.deno/$version/bin"; exe="$bin_dir/deno"; has () { command -v "$1" >/dev/null; } ;  if ! has unzip; then if ! has apt-get; then  has brew && brew install unzip; else  if [ "$(whoami)" = "root" ]; then  apt-get install unzip -y; elif has sudo; then  echo "Can I install unzip for you? (its required for this command to work) ";read ANSWER;echo;  if [ "$ANSWER" = "y" ] || [ "$ANSWER" = "yes" ] || [ "$ANSWER" = "Y" ]; then  sudo apt-get install unzip -y; fi; elif has doas; then  echo "Can I install unzip for you? (its required for this command to work) ";read ANSWER;echo;  if [ "$ANSWER" = "y" ] || [ "$ANSWER" = "yes" ] || [ "$ANSWER" = "Y" ]; then  doas apt-get install unzip -y; fi; fi;  fi;  fi;  if ! has unzip; then  echo ""; echo "So I couldn't find an 'unzip' command"; echo "And I tried to auto install it, but it seems that failed"; echo "(This script needs unzip and either curl or wget)"; echo "Please install the unzip command manually then re-run this script"; exit 1;  fi;  repo="denoland/deno"; if [ "$OS" = "Windows_NT" ]; then target="x86_64-pc-windows-msvc"; else :;  case $(uname -sm) in "Darwin x86_64") target="x86_64-apple-darwin" ;; "Darwin arm64") target="aarch64-apple-darwin" ;; "Linux aarch64") repo="LukeChannings/deno-arm64" target="linux-arm64" ;; "Linux armhf") echo "deno sadly doesn't support 32-bit ARM. Please check your hardware and possibly install a 64-bit operating system." exit 1 ;; *) target="x86_64-unknown-linux-gnu" ;; esac; fi; deno_uri="https://github.com/$repo/releases/download/v$version/deno-$target.zip"; exe="$bin_dir/deno"; if [ ! -d "$bin_dir" ]; then mkdir -p "$bin_dir"; fi;  if ! curl --fail --location --progress-bar --output "$exe.zip" "$deno_uri"; then if ! wget --output-document="$exe.zip" "$deno_uri"; then echo "Howdy! I looked for the 'curl' and for 'wget' commands but I didn't see either of them. Please install one of them, otherwise I have no way to install the missing deno version needed to run this code"; exit 1; fi; fi; unzip -d "$bin_dir" -o "$exe.zip"; chmod +x "$exe"; rm "$exe.zip"; exec "$deno" run -q -A --no-lock "$0" "$@"; #>}; $DenoInstall = "${HOME}/.deno/$(dv)"; $BinDir = "$DenoInstall/bin"; $DenoExe = "$BinDir/deno.exe"; if (-not(Test-Path -Path "$DenoExe" -PathType Leaf)) { $DenoZip = "$BinDir/deno.zip"; $DenoUri = "https://github.com/denoland/deno/releases/download/v$(dv)/deno-x86_64-pc-windows-msvc.zip";  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;  if (!(Test-Path $BinDir)) { New-Item $BinDir -ItemType Directory | Out-Null; };  Function Test-CommandExists { Param ($command); $oldPreference = $ErrorActionPreference; $ErrorActionPreference = "stop"; try {if(Get-Command "$command"){RETURN $true}} Catch {Write-Host "$command does not exist"; RETURN $false}; Finally {$ErrorActionPreference=$oldPreference}; };  if (Test-CommandExists curl) { curl -Lo $DenoZip $DenoUri; } else { curl.exe -Lo $DenoZip $DenoUri; };  if (Test-CommandExists curl) { tar xf $DenoZip -C $BinDir; } else { tar -Lo $DenoZip $DenoUri; };  Remove-Item $DenoZip;  $User = [EnvironmentVariableTarget]::User; $Path = [Environment]::GetEnvironmentVariable('Path', $User); if (!(";$Path;".ToLower() -like "*;$BinDir;*".ToLower())) { [Environment]::SetEnvironmentVariable('Path', "$Path;$BinDir", $User); $Env:Path += ";$BinDir"; } }; & "$DenoExe" run -q -A --no-lock "$PSCommandPath" @args; Exit $LastExitCode; <# 
# */0}`;
import { FileSystem } from "https://deno.land/x/quickr@0.6.44/main/file_system.js"
import { Console, bold, lightRed, yellow } from "https://deno.land/x/quickr@0.6.44/main/console.js"
import { run, Timeout, Env, Cwd, Stdin, Stdout, Stderr, Out, Overwrite, AppendTo, throwIfFails, returnAsString, zipInto, mergeInto } from "https://deno.land/x/quickr@0.6.44/main/run.js"
import $ from "https://deno.land/x/dax@0.39.2/mod.ts"
import { pureBinaryify } from "https://deno.land/x/binaryify@2.4.1.0/tools.js"

const deno = Deno.execPath()

// TODO: the following has been hand-done but needs to be automated:
    // rename Node to HardNode
    // make HardNode extend Node

    // - see git tag "prev_hand_modified_commit"
    // - handle enumerable/configurable/writable: true
    // - replace parse args with parse(inputString, previousTree, options)
    // - n.parser = this at the bottom of parse() in ParserImpl 
    
    // - extract out of function
    // - set ENVIRONMENT_IS_NODE=true
    // - set ENVIRONMENT_IS_WEB=false
    // - set ENVIRONMENT_IS_WORKER=false
    // - var Module, initPromise
    // - delete nodePath = Z("path"), change the import
    // - delete nodePath = Z("fs"), change the import
    // - WORKS^

    // - extract out of promise
    // - var Module = {}, // no initPromise
    // - put "for (let e of Object.getOwnPropertyNames"... below parser class
    // - fix the initPromise next to "ParserImpl.init()" in the Module.onRuntimeInitialized
    // - keep the Object.assign({}, Module) in the moduleOverrides
    // - ALSO WORKS^

    // - add constructor to class ParserImpl
    // - add if (firstTime) check to ParserImpl init()
    // - remove "for (let e of Object.getOwnPropertyNames"... below parser class
    // - remove "ENVIRONMENT_IS_NODE" check, remove the else (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) 
    // - export class Tree
    // - export class Node
    // - export class TreeCursor
    // - export class Language
    // - export class LookaheadIterable
    // - export class Query
    // - delete class Parser
    // - rename class ParserImpl to Parser and export
    // - ALSO WORKS^
    
    // change the load function to have this:
        // else if (typeof t == "string") {
        //     const roughButNotPerfectMaxPathLengthUnix = 4096
        //     if (t.length > roughButNotPerfectMaxPathLengthUnix) {
        //         console.warn(`I (tree sitter) received a string arg to load. I always assuming the string is a path, but it was longer than ${roughButNotPerfectMaxPathLengthUnix} (actual length=${t.length}). If you get an error in a moment, that is probably why.`)
        //     }
        //     const seemsToBeAUrl = t.startsWith("http://") || t.startsWith("https://")
        // 
        //     if (!seemsToBeAUrl && globalThis.Deno && globalThis.Deno.readFile) {
        //         _ = globalThis.Deno.readFile(t)
        //     } else if (globalThis.fetch) {
        //         if (!seemsToBeAUrl) {
        //             // TODO: not sure what happens on windows
        //             // encodeURIComponent is necessary for encoding unusual chars such as "#", otherwise they'll fail
        //             t = `file://${t.split("/").map(encodeURIComponent).join("/")}`
        //         }
        //         _ = fetch(t).then((r) =>
        //             r.arrayBuffer().then((a) => {
        //                 if (r.ok) return new Uint8Array(a)
        //                 {
        //                     let o = new TextDecoder("utf-8").decode(a)
        //                     throw new Error(`Language.load failed with status ${r.status}.\n\n${o}`)
        //                 }
        //             })
        //         )
        //     // probably node
        //     } else if (typeof __Process$ < "u" && __Process$.versions && __Process$.versions.node) {
        //         let r = require("fs")
        //         _ = Promise.resolve(r.readFileSync(s))
        //     } else {
        //         throw new Error(`Tree sitter was trying to load a string argument, however there was no global fetch function available, and the runtime doesn't appear to be node. So I don't know how to load this file path. Try passing the loaded file as a Uint8Array to get around this problem`, )
        //     }
        // } else {
        //     throw new Error(`You're trying to load something that's not a string or Uint8Array. The arg I was given is: ${toRepresentation(t)}`, )
        // }

const treeSitterPath = `${FileSystem.thisFolder}/../tree_sitter.js`
const treeSitterWasmPath = `${FileSystem.thisFolder}/../tree_sitter.wasm.binaryified.js`
 
// $`${deno} run -A https://raw.githubusercontent.com/jeff-hykin/deno_bundle/master/main.js`
let treeSitterCode = await $`${deno} run -A https://raw.githubusercontent.com/jeff-hykin/deno_bundle/a87f6f782c0f014aa288c12da57d32aae2359a90/main.js https://esm.sh/web-tree-sitter`.text("stdout")
let versionMatch = treeSitterCode.match(/.+web-tree-sitter@(.+?)\/denonext/)
if (!versionMatch || !versionMatch[1]) {
    throw new Error(`\nI normally pull the version from first line of the downloaded tree-sitter code\n(esm.sh downloads the latest),\nbut I couldn't find the version on that line:\n${treeSitterCode.split("\n")[0]}\n\n`)
}
let version = versionMatch[1]
// fetch(`https://github.com/tree-sitter/tree-sitter/releases/download/v${version}/tree-sitter.wasm`)
let url = `https://github.com/tree-sitter/tree-sitter/releases/download/v${version}/tree-sitter.wasm`
let data
try {
    // data = await (await fetch(url)).arrayBuffer()
    data = await (await fetch(`https://github.com/tree-sitter/tree-sitter/releases/download/v0.22.5/tree-sitter.wasm`)).arrayBuffer()
} catch (error) {
    throw Error(`I tried to download the wasm file for the tree sitter version ${version}, but it failed. Make sure the URL exists: ${url}`)
}

FileSystem.write({
    path: treeSitterWasmPath,
    data: pureBinaryify(data),
})

let globalMatch = treeSitterCode.match(/export\s*\{\s*([\w$]+)\s*as\s*default\s*\}/)
if (!globalMatch || !globalMatch[1]) {
    throw new Error(`\nI can't find the name of the global object (e.g. Parser) in the tree-sitter code.\nUsually its inside of: export { theTHING as default }\n\n`)
}
const parserVarName = globalMatch[1]

// import the wasm file
treeSitterCode = `import uint8ArrayOfWasmTreeSitter from ${JSON.stringify("./"+FileSystem.makeRelativePath({ from: FileSystem.parentPath(treeSitterPath), to: treeSitterWasmPath }))}\n${treeSitterCode}` 
// pollyfill deno for browser
treeSitterCode = `import "data:text/javascript;base64,${btoa(`!globalThis.Deno && (globalThis.Deno = {args: [],build: {os: "linux",arch: "x86_64",version: "",},pid: 1,env: {get(_) {return null;},set(_, __) {return null;},},});`)}"\n${treeSitterCode}`

// last run: https://esm.sh/web-tree-sitter@0.22.5
treeSitterCode = treeSitterCode.replace(/\bwindow\.document\.currentScript\b/, `window?.document?.currentScript`)
treeSitterCode = treeSitterCode.replace(
    /import ([\w$]+) from "node:process"/,
    `var $1 = { versions: { node: "1" }, argv: [ import.meta.href ] }`,
)
treeSitterCode = treeSitterCode.replace(
    /import \* as ([\w$]+) from "node:path"/,
    `import \* as $1 from "https://deno.land/std@0.177.0/node/path.ts"`,
)
treeSitterCode = treeSitterCode.replace(
    /import \* as ([\w$]+) from "node:fs"/,
    `import \* as $1 from "https://deno.land/std@0.177.0/node/fs.ts"`,
)
treeSitterCode = treeSitterCode.replace(
    `instantiateArrayBuffer(e, t, _) {
            return getBinaryPromise(e).then`,
    `instantiateArrayBuffer(e, t, _) {
            return Promise.resolve(uint8ArrayOfWasmTreeSitter).then`,
)
treeSitterCode = treeSitterCode.replace(
    `Object.defineProperties(tree, {
        rootNode: {
            configurable: true,
            get() {
                return rootNode
            }
        },
    })`,
    `Object.defineProperties(tree, {
        rootNode: {
            writable: true,
            configurable: true,
            get() {
                return rootNode
            }
        },
    })`,
)
treeSitterCode = treeSitterCode.replace(
    `walk() {
              return marshalNode(this), C._ts_tree_cursor_new_wasm(this.tree[0]), new TreeCursor(INTERNAL, this.tree);
            }
            toString() {
              marshalNode(this);
              let t = C._ts_node_to_string_wasm(this.tree[0]), _ = AsciiToString(t);
              return C._free(t), _;
            }`,
    `walk() {
              return marshalNode(this), C._ts_tree_cursor_new_wasm(this.tree[0]), new TreeCursor(INTERNAL, this.tree);
            }
            toString() {
              marshalNode(this);
              let t = C._ts_node_to_string_wasm(this.tree[0]), _ = AsciiToString(t);
              return C._free(t), _;
            }
            get hasChildren() {
                return (this.children?.length || 0) > 0
            }
            *traverse(arg={_parentNodes: [],}) {
                const { _parentNodes } = arg
                const parentNodes = [ this, ..._parentNodes ]
                if (this.children.length == 0) {
                    yield [_parentNodes, this, "-"]
                } else {
                    yield [_parentNodes, this, "->"]
                    for (const each of this.children) {
                        if (each instanceof Node) {
                            for (const eachInner of each.traverse({ _parentNodes: parentNodes })) {
                                yield eachInner
                            }
                        } else {
                            yield [_parentNodes, each, "-"]
                        }
                    }
                    yield [_parentNodes, this, "<-"]
                }
            }
            toJSON() {
                const optionalData = {}
                if (typeof this.rootLeadingWhitespace == "string") {
                    optionalData.rootLeadingWhitespace = this.rootLeadingWhitespace
                }
                if (this.children && this.children.length) {
                    return {
                        type: this.type,
                        typeId: this.typeId,
                        startPosition: this.startPosition,
                        startIndex: this.startIndex,
                        endPosition: this.endPosition,
                        startIndex: this.startIndex,
                        endIndex: this.endIndex,
                        indent: this.indent,
                        textOverride: this.textOverride,
                        ...optionalData,
                        children: this.children.map((each) => each.toJSON()),
                    }
                } else {
                    return {
                        type: this.type,
                        typeId: this.typeId,
                        startPosition: this.startPosition,
                        startIndex: this.startIndex,
                        endPosition: this.endPosition,
                        startIndex: this.startIndex,
                        endIndex: this.endIndex,
                        indent: this.indent,
                        textOverride: this.textOverride,
                        ...optionalData,
                        text: this.text,
                        children: [],
                    }
                }
            }
            [Symbol.for("Deno.customInspect")](inspect, options) {
                const optional = {}
                if (typeof this.rootLeadingWhitespace == "string") {
                    optional.rootLeadingWhitespace = this.rootLeadingWhitespace
                }
                return inspect(
                    {
                        type: this.type,
                        typeId: this.typeId,
                        startPosition: this.startPosition,
                        startIndex: this.startIndex,
                        endPosition: this.endPosition,
                        startIndex: this.startIndex,
                        endIndex: this.endIndex,
                        indent: this.indent,
                        ...optional,
                        hasChildren: this.hasChildren,
                        children: [...(this.children || [])],
                    },
                    options
                )
            }
            *[Symbol.iterator]() {
                yield* this.children
            }
            get length() {
                return this.children.length
            }
            /**
             * Query
             *
             * @example
             * \`\`\`js
             * import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter/main.js"
             * import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
             * const parser = await parserFromWasm(javascript) // path or Uint8Array
             * var tree = parser.parse('let a = 1;let b = 1;let c = 1;')
             *
             * tree.rootNode.query(\`(identifier) @blahBlahBlah\`, {matchLimit: 2})
             * // returns:
             * [
             *   {
             *     pattern: 0,
             *     captures: [
             *       {
             *         name: "blahBlahBlah",
             *         node: {
             *           type: "identifier",
             *           typeId: 1,
             *           startPosition: { row: 0, column: 4 },
             *           startIndex: 4,
             *           endPosition: { row: 0, column: 5 },
             *           endIndex: 5,
             *           indent: undefined,
             *           hasChildren: false,
             *           children: []
             *         }
             *       }
             *     ]
             *   },
             *   {
             *     pattern: 0,
             *     captures: [
             *       {
             *         name: "blahBlahBlah",
             *         node: {
             *           type: "identifier",
             *           typeId: 1,
             *           startPosition: { row: 0, column: 14 },
             *           startIndex: 14,
             *           endPosition: { row: 0, column: 15 },
             *           endIndex: 15,
             *           indent: undefined,
             *           hasChildren: false,
             *           children: []
             *         }
             *       }
             *     ]
             *   },
             *   {
             *     pattern: 0,
             *     captures: [
             *       {
             *         name: "blahBlahBlah",
             *         node: {
             *           type: "identifier",
             *           typeId: 1,
             *           startPosition: { row: 0, column: 24 },
             *           startIndex: 24,
             *           endPosition: { row: 0, column: 25 },
             *           endIndex: 25,
             *           indent: undefined,
             *           hasChildren: false,
             *           children: []
             *         }
             *       }
             *     ]
             *   }
             * ]
             * \`\`\`
             *
             * @param {String} queryString - see https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax
             * @param options.matchLimit - max number of results
             * @param options.startPosition - {row: Number, column: number}
             * @param options.endPosition - {row: Number, column: number}
             * @param options.maxResultDepth - depth relative to the current node (1 = direct children, 2 = grandchildren, etc)
             * @returns {[Object]} output
             *
             */
            query(queryString, options) {
                const { matchLimit, startPosition, endPosition, maxResultDepth } = options||{}
                const realMaxResultDepth = maxResultDepth == null ? Infinity : maxResultDepth
                const result = this.tree.language.query(queryString).matches(this, startPosition || this.startPosition, endPosition || this.endPosition, matchLimit)
                return result.filter((each)=>each.captures.every((each)=>(each.node.depth-this.depth) <= realMaxResultDepth))
            }
            /**
             * quickQuery
             *
             * @example
             * \`\`\`js
             * import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter/main.js"
             * import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/676ffa3b93768b8ac628fd5c61656f7dc41ba413/main/javascript.js"
             * const parser = await parserFromWasm(javascript) // path or Uint8Array
             * var tree = parser.parse('let a = 1;let b = 1;let c = 1;')
             *
             * tree.rootNode.quickQuery(\`(identifier)\`, {matchLimit: 2})
             * // returns:
             * [
             *   {
             *      type: "identifier",
             *      typeId: 1,
             *      startPosition: { row: 0, column: 4 },
             *      startIndex: 4,
             *      endPosition: { row: 0, column: 5 },
             *      endIndex: 5,
             *      indent: undefined,
             *      hasChildren: false,
             *      children: []
             *   }
             * ]
             * \`\`\`
             *
             * @param {String} queryString - see https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax
             * @param options.matchLimit - max number of results
             * @param options.startPosition - {row: Number, column: number}
             * @param options.endPosition - {row: Number, column: number}
             * @param options.maxResultDepth - depth relative to the current node (1 = direct children, 2 = grandchildren, etc)
             * @returns {[Object]} output
             *
             */
            quickQuery(queryString, options) {
                let topLevelVarname = ""
                let thereMightBeIssues = true
                while (thereMightBeIssues) {
                    topLevelVarname = \`\${topLevelVarname}_\`
                    thereMightBeIssues = (queryString.includes(\`@\${topLevelVarname} \`) || queryString.includes(\`@\${topLevelVarname}\\t\`) || queryString.endsWith(\`@\${topLevelVarname}\`))
                }
                // add the top-level extraction always
                queryString = \`\${queryString} @\${topLevelVarname}\`
                const output = this.query(queryString, options).map((each) => Object.fromEntries(each.captures.map((each) => [each.name, each.node])))
                // combine the top-level extraction and the named extractions using proxies
                return output.map((eachMatch) => {
                    const topLevel = eachMatch[topLevelVarname]
                    delete eachMatch[topLevelVarname]
                    const keys = Object.keys(eachMatch)
                    if (keys.length == 0) {
                        return topLevel
                    }
                    return new Proxy(topLevel, {
                        ownKeys(original, ...args) {
                            return keys.concat(Reflect.ownKeys(original, ...args)) 
                        },
                        getOwnPropertyDescriptor(original, prop) {
                            return {
                                enumerable: true,
                                configurable: true
                            }
                        },
                        get(original, key, ...args) {
                            // replace the inspect and toJSON
                            if (key == Symbol.for("Deno.customInspect") || key == "toJSON") {
                                return (inspect=(a)=>a, options={})=>{
                                    const optional = {}
                                    if (typeof original.rootLeadingWhitespace == "string") {
                                        optional.rootLeadingWhitespace = original.rootLeadingWhitespace
                                    }
                                    return inspect(
                                        {
                                            ...Object.fromEntries(keys.map((eachKey)=>[eachKey,eachMatch[eachKey]])),
                                            type: original.type,
                                            typeId: original.typeId,
                                            startPosition: original.startPosition,
                                            startIndex: original.startIndex,
                                            endPosition: original.endPosition,
                                            startIndex: original.startIndex,
                                            endIndex: original.endIndex,
                                            indent: original.indent,
                                            ...optional,
                                            hasChildren: original.hasChildren,
                                            children: [...(original.children || [])],
                                        },
                                        options
                                    )
                                }
                            }
                            return keys.includes(key) ? eachMatch[key] : Reflect.get(original, key, ...args)
                        },
                        set(original, key, value) {
                            if (keys.includes(key)) {
                                eachMatch[key] = value
                            }
                            return Reflect.set(original, key, value)
                        },
                        has(target, key) {
                            return keys.includes(key) || Reflect.has(target, key)
                        },
                        deleteProperty(target, key) {
                            if (keys.includes(key)) {
                                delete keys[keys.indexOf(key)]
                            }
                            return Reflect.deleteProperty(target, key)
                        },
                        isExtensible: Reflect.isExtensible,
                        preventExtensions: Reflect.preventExtensions,
                        setPrototypeOf: Reflect.setPrototypeOf,
                        defineProperty: Reflect.defineProperty,
                        getPrototypeOf: Reflect.getPrototypeOf,
                    })
                })
            }
            /**
             * quickQueryFirst
             *
             * @example
             * \`\`\`js
             * import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter/main.js"
             * import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
             * const parser = await parserFromWasm(javascript) // path or Uint8Array
             * var tree = parser.parse('let a = 1;let b = 1;let c = 1;')
             *
             * tree.rootNode.quickQueryFirst(\`(identifier)\`)
             * // returns:
             * ({
             *      type: "identifier",
             *      typeId: 1,
             *      startPosition: { row: 0, column: 4 },
             *      startIndex: 4,
             *      endPosition: { row: 0, column: 5 },
             *      endIndex: 5,
             *      indent: undefined,
             *      hasChildren: false,
             *      children: []
             * })
             * \`\`\`
             *
             * @param {String} queryString - see https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax
             * @param options.startPosition - {row: Number, column: number}
             * @param options.endPosition - {row: Number, column: number}
             * @param options.maxResultDepth - depth relative to the current node (1 = direct children, 2 = grandchildren, etc)
             * @returns {Object} output
             *
             */
            quickQueryFirst(queryString, options) {
                return this.quickQuery(queryString, {...options, matchLimit: 1})[0]
            }`,
)
treeSitterCode = treeSitterCode.replace(
    // the matches methods in the Query class
    /class Query((?:[^a]|[a])+?)\n(\s*)matches\(((?:[^a]|[a])+?)\n\2}/,
    `$&
            *iterMatches(t, startPosition=null, endPosition=null, options) {
              var defaultValues = { startPosition: _ = ZERO_POINT, endPosition: s = ZERO_POINT, startIndex: r = 0, endIndex: a = 0, matchLimit: o = 4294967295, maxStartDepth: n = 4294967295, }
              if (!(originalStart instanceof Object && originalStart.row != undefined)) {
                var { startPosition, endPosition, matchLimit, startIndex, endIndex, maxStartDepth } = { ...defaultValues, ...options, ...startPosition }
              } else {
                var values = { ...defaultValues, ...options, }
                var { matchLimit, startIndex, endIndex, maxStartDepth } = values
                if (endPosition === null) {
                    endPosition = values.endPosition
                }
              }
              if (matchLimit === void 0) matchLimit = 0
              if (typeof matchLimit != "number")
                throw new Error("Arguments must be numbers");
              marshalNode(t), C._ts_query_matches_wasm(this[0], t.tree[0], _.row, _.column, endPosition.row, endPosition.column, r, a, matchLimit, maxStartDepth);
              let u = getValue(TRANSFER_BUFFER, "i32"), m = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), w = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32");
              this.exceededMatchLimit = !!w;
              let p = m;
              for (let I = 0; I < u; I++) {
                let d = getValue(p, "i32");
                p += SIZE_OF_INT;
                let b = getValue(p, "i32");
                p += SIZE_OF_INT;
                let h = new Array(b);
                if (p = unmarshalCaptures(this, t.tree, p, h), this.textPredicates[d].every((l) => l(h))) {
                  const item = { pattern: d, captures: h };
                  let l = this.setProperties[d];
                  l && (item.setProperties = l);
                  let g = this.assertedProperties[d];
                  g && (item.assertedProperties = g);
                  let M = this.refutedProperties[d];
                  M && (item.refutedProperties = M);
                  yield item;
                }
              }
              C._free(m)
            }
            `,
)
treeSitterCode = treeSitterCode.replace(
    // the matches methods in the Query class
    /get parent\(\) \{[\w\W]*?\} *\n/,
    `$&
            get depth() {
                if (this._depth == null) {
                    if (this.parent == null) {
                        this._depth = 0
                    } else {
                        this._depth = this.parent.depth + 1
                    }
                }
                return this._depth
            }\n`,
)
treeSitterCode = treeSitterCode.replace(
    /`\n`/,
    "`\\n`",
)
treeSitterCode = treeSitterCode.replace(
    `return t in e || (e[t] = (...s) => (_ ||= resolveSymbol(t), _(...s))), e[t];`,
    `return t in e || (
                        e[t]=(...s)=>{
                            _ ||= resolveSymbol(t)
                            if (typeof _ != "function") {
                                throw new Error(\`\\n\\n(deno-tree-sitter speaking here)\\nSo a wasm file you're trying to load is old or incomplete.\\nI can't find the symbol \${JSON.stringify(t)}.\\nThis is effectively a dynamic linking (dyld) error from compiling the C code that became wasm.\\n\\n\`)
                            }
                            return _(...s)
                        }
                    ), e[t];`,
)
treeSitterCode = treeSitterCode.replace(
    `_ = t + alignMemory(e, 16)`,
    // fix race condition that seems to only show up when loaded in the browser
    `_ = t + alignMemory(e, 16);\n            (!GOT.__heap_base)&&GOTHandler.get(wasmImports, "__heap_base");`,
)



await FileSystem.write({
    path: treeSitterPath,
    data: treeSitterCode,
})

// (this comment is part of deno-guillotine, dont remove) #>