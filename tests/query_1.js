#!/usr/bin/env -S deno run --allow-all
import { Parser, parserFromWasm } from "../main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
const parser = await parserFromWasm(javascript) // path or Uint8Array
var tree = parser.parse('let a = 1;let b = 1;let c = 1;')

// 
// usage
// 
var results = tree.rootNode.query(`(identifier) @blahBlahBlah`, {matchLimit: 2})
console.log("🚀 ~ file: query_1.js:12 ~ results:", results)

var results = tree.rootNode.query(`(identifier) @blahBlahBlah`, {matchLimit: 2, startPosition: { row: 0, column: 0 }, endPosition: {row: 1000, column: 1000}})
console.log("🚀 ~ file: query_1.js:13 ~ results:", results)
