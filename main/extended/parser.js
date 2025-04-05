import { Parser } from "../tree_sitter/parser.js"
import { Language } from "../tree_sitter/language.js"
import { addSoftNodes } from "./add_soft_nodes.js"
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
    } else {
        // tree sitter allows this (not me)
        let string = codeOrCallback
        if (typeof codeOrCallback == "function") {
            string = codeOrCallback()
        }

        tree = addSoftNodes({
            tree: realParseFunction.apply(this, [codeOrCallback, oldTree, options]),
            string,
        })
    }
    return tree
}