import { Parser } from "../tree_sitter/parser.js"
import { Language } from "../tree_sitter/language.js"
import "./node_extended.js" // note: redundant but might not be redundant in the future

let hasBeenLoaded = false
/**
 * Creates and returns a new parser instance, loading a language from a WebAssembly binary or file path.
 * Optionally, the parser can be configured to disable soft nodes.
 *
 * @async
 * @param {Uint8Array|string} wasmUint8ArrayOrFilePath - The WebAssembly binary as a `Uint8Array` or a file path to load the language.
 * @param {Object} [options] - Optional configuration options.
 * @param {boolean} [options.disableSoftNodes=false] - Whether to disable soft nodes in the parser (default is `false`).
 * @returns {Promise<Parser>} A promise that resolves to the created parser instance.
 */
export async function newParser(wasmUint8ArrayOrFilePath, { disableSoftNodes=false, moduleOptions }={}) {
    // download if given a url
    if (typeof wasmUint8ArrayOrFilePath == "string" && wasmUint8ArrayOrFilePath.match(/^https?:\/\//)) {
        wasmUint8ArrayOrFilePath = await fetch(wasmUint8ArrayOrFilePath).then(async r=>new Uint8Array(await r.arrayBuffer()))
    }
    if (!hasBeenLoaded) {
        hasBeenLoaded = true
        await Parser.init(moduleOptions)
    }
    const language = await Language.load(wasmUint8ArrayOrFilePath)
    const parser = new Parser()
    parser.setLanguage(language)
    parser.disableSoftNodes = disableSoftNodes
    return parser
}

// 
// parser class
// 
const realParseFunction = Parser.prototype.parse
Parser.prototype.parse = function(codeOrCallback, oldTree, options) {
    let tree
    if (this.disableSoftNodes) {
        tree = realParseFunction.apply(this, [codeOrCallback, oldTree, options])
        tree._codeOrCallback = codeOrCallback
    } else {
        // tree sitter allows this (not me)
        let string = codeOrCallback
        if (typeof codeOrCallback == "function") {
            string = codeOrCallback()
        }
        tree = realParseFunction.apply(this, [codeOrCallback, oldTree, options])
        tree._codeOrCallback = codeOrCallback
        tree._enableSoftNodes = true
    }
    return tree
}