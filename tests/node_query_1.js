#!/usr/bin/env -S deno run --allow-all







import { Parser, parserFromWasm } from "../main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
const parser = await parserFromWasm(javascript) // path or Uint8Array
var tree = parser.parse('let a = 1;let b = 1;let c = 1;')

// 
// usage
// 
var nodes = tree.rootNode.quickQuery(`(lexical_declaration)`)
console.log("🚀 ~ file: node_query_1.js:16 ~ nodes:", nodes)

var nodes = tree.rootNode.quickQuery(`(lexical_declaration (variable_declarator) @blahBlahInner) @blahBlahOuter`)
// queryString = `(lexical_declaration) @blahBlahBlah`
console.log("🚀 ~ file: node_query_1.js:12 ~ nodes:", nodes)

console.debug(`nodes[0].blahBlahInner.quickQueryFirst("number") is:`,nodes[0].blahBlahInner.quickQueryFirst("(number)"))
var captures = tree.rootNode.query(`(lexical_declaration) @blahBlahBlah`, {matchLimit: 2}).map(each=>each.captures)
var namedNodeList = captures.map(eachCapture=>Object.fromEntries(eachCapture.map(each=>[each.name, each.node])))

namedNodeList[0].blahBlahBlah.query(`(variable_declarator)`)
