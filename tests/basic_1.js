#!/usr/bin/env -S deno run --allow-all
import { createParser, BaseNode } from "../main/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"

var parser = await createParser(
    "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.wasm",
    {
        disableSoftNodes: false,
    }
)
var tree = parser.parse('let x = 1;')

var allNodes = tree.rootNode.flattened({ includeSelf: true })

console.debug(`allNodes[0] is:`,allNodes[0])


var originalString = allNodes.map(each=>each.hasChildren ? "" : (each.text||"")).join("")
console.log(allNodes)
console.log(JSON.stringify(tree.rootNode,0,4))