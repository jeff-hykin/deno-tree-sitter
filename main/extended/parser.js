import { _shadows } from "./base_node.js"
import { Node } from "../tree_sitter/node.js"
import { Tree } from "../tree_sitter/tree.js"
import { Parser } from "../tree_sitter/parser.js"
import { Language } from "../tree_sitter/language.js"
import "./node_extended.js" // note: redundant but might not be redundant in the future
import { _childrenWithSoftNodes } from "./node_extended.js"

const langCache = new Map()
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
export async function createParser(wasmUint8ArrayOrFilePath, { disableSoftNodes=false, moduleOptions }={}) {
    // download if given a url
    if (typeof wasmUint8ArrayOrFilePath == "string" && wasmUint8ArrayOrFilePath.match(/^https?:\/\//)) {
        wasmUint8ArrayOrFilePath = await fetch(wasmUint8ArrayOrFilePath).then(async r=>new Uint8Array(await r.arrayBuffer()))
    }
    if (!hasBeenLoaded) {
        hasBeenLoaded = true
        await Parser.init(moduleOptions)
    }
    // this is a workaround for the a bug in the loader where loading the same language twice causes a freeze
    // see: "WebAssembly.instantiate(binary, info).then" inside wasm_loader.js
    let language
    if (wasmUint8ArrayOrFilePath instanceof Uint8Array) {
        const hashString = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", wasmUint8ArrayOrFilePath))).map((b) => b.toString(16).padStart(2, "0")).join("")
        if (langCache.has(hashString)) {
            language = langCache.get(hashString)
        } else {
            language = await Language.load(wasmUint8ArrayOrFilePath)
            langCache.set(hashString, language)
        }
    } else {
        language = await Language.load(wasmUint8ArrayOrFilePath)
    }
    const parser = new Parser()
    parser.setLanguage(language)
    parser.disableSoftNodes = disableSoftNodes
    return parser
}

const realParseFunction = Parser.prototype.parse

const realRootNodeGetter = Object.getOwnPropertyDescriptor(Tree.prototype, "rootNode").get
// 
// complicated override in order to make the root node pretend to contain soft nodes (ex: leading and trailing whitespace)
// 
Object.defineProperty(Tree.prototype, "rootNode", {
    get() {
        const rootNode = realRootNodeGetter.call(this)
        const rootShadow = {}
        Object.setPrototypeOf(rootShadow, Object.getPrototypeOf(rootNode))
        const descriptors = Object.assign(Object.getOwnPropertyDescriptors(Node.prototype), Object.getOwnPropertyDescriptors(rootNode))
        const newDescriptors = {}
        for (const [key, setting] of Object.entries(descriptors)) {
            if (key == "startIndex" || key == "startPosition") {
                continue
            } else if (key == "text" || key == "replaceInnards") {
                // use the faked .startIndex for these methods/getters
                newDescriptors[key] = setting
            } else {
                // use the real .startIndex for these methods/getters (get it from the real thing)
                // (otherwise stuff breaks when there is a whitespace prefix)
                newDescriptors[key] = {
                    get: ()=>{
                        const output = rootNode[key]
                        if (typeof output == "function") {
                            return (...args)=>output.apply(rootNode, args)
                        }
                        return output
                    },
                    set: (value)=>rootNode[key] = value,
                    enumerable: setting.enumerable,    
                    configurable: setting.configurable,
                }
            }
        }
        Object.setPrototypeOf(rootShadow, Node.prototype)
        Object.defineProperties(rootShadow, newDescriptors)
        rootShadow.startIndex = 0
        rootShadow.startPosition = { row: 0, column: 0 }
        // if the original file is just whitespace or non-matched text, then fill it with soft nodes even though it'd normally have no children
        if (rootShadow.children == null && rootShadow.endIndex != 0) {
            rootShadow._children = _childrenWithSoftNodes(rootShadow, [{startIndex: rootShadow.endIndex, endIndex: rootShadow.endIndex, endPosition: rootShadow.endPosition}], rootNode.tree.codeString).slice(0,-1)
        }
        _shadows[rootNode.id] = rootShadow
        return rootShadow
    }
})

/**
 * Parse a slice of UTF8 text.
 *
 * @param {string | ParseCallback} callback - Source code to parse
 *
 * @param {Tree | null} [oldTree] - A previous syntax tree parsed from the same document. If the text of the
 *   document has changed since `oldTree` was created, then you must edit `oldTree` to match
 *   the new text using {@link Tree#edit}.
 *
 * @param {ParseOptions} [options] - Options for parsing the text.
 *  This can be used to set the included ranges, or a progress callback.
 *
 * @returns {Tree | null} A {@link Tree} if parsing succeeded, or `null` if:
 *  - The parser has not yet had a language assigned with {@link Parser#setLanguage}.
 *  - The progress callback returned true.
 */
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