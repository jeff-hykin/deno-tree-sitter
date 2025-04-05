import { Parser } from "../tree_sitter/parser.js"
import { addSoftNodes } from "./add_soft_nodes.js"
import "./node_extended.js" // note: redundant but might not be redundant in the future
await Parser.init()

export async function newParser(wasmUint8ArrayOrFilePath, { disableSoftNodes=false }={}) {
    const language = await Parser.Language.load(wasmUint8ArrayOrFilePath)
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
    if (parser.disableSoftNodes) {
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