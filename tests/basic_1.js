#!/usr/bin/env -S deno run --allow-all
import { parserFromWasm, flatNodeList } from "../updated.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"

var parser = await parserFromWasm(javascript)
var tree = parser.parse({string: 'let x = 1;', withWhitespace: true })

var allNodes = flatNodeList(tree.rootNode)

var originalString = allNodes.map(each=>each.hasChildren ? "" : (each.text||"")).join("")
console.log(allNodes)
console.log(JSON.stringify(tree.rootNode,0,4))