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
Parser.prototype.parse = function(code, oldTree, options) {
    if (typeof code == "function") {
        console.warn("When calling .parse() the source code was a function instead of a string. The original tree sitter supports giving a function as a means of supporting edits (see: https://github.com/tree-sitter/tree-sitter/discussions/2553 ).\nHowever, this library supports edits directly (use node.replaceInnards(``))\nThe downside of making edits easy is that .parse() doesn't really accept a function argument. I'm just going to evaluate that function to grab the string once at the beginning. Use tree.codeString if you want to get the full string after a .replaceInnards() call.")
        code = code(0)
    }
    const tree = realParseFunction.apply(this, [
        (index)=>(code||tree.codeString).slice(index),
        oldTree,
        options
    ])
    tree.codeString = code
    code = null
    tree._enableSoftNodes = !this.disableSoftNodes
    return tree
}