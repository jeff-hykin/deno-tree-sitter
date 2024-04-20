#!/usr/bin/env -S deno run --allow-all
import { Parser, parserFromWasm } from "../updated.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
const parser = await parserFromWasm(javascript) // path or Uint8Array
var tree = parser.parse({
    string: `
        function thing(arg1) {
            let a = 10
        }
    `,
    withWhitespace: false,
})

// 
// usage
// 
let indent = ""
for (const [ parents, node, direction ] of tree.rootNode.traverse()) {
    if (direction == "-") {
        console.log(indent+`<${node.type} text=${JSON.stringify(node.text)} />`)
    } else {
        if (direction == "->") {
            console.log(indent+`<${node.type}>`)
            indent += "    "
        } else if (direction == "<-") {
            indent = indent.slice(0,-4)
            console.log(indent+`</${node.type}>`)
        }
    }
}

console.log(``)
var tree = parser.parse({
    string: `
        function thing(arg1, arg2) {
            let a = 10
        }
    `,
    withWhitespace: false,
})
indent = ""
for (const [ parents, node, direction ] of tree.rootNode.traverse()) {
    if (direction == "-") {
        console.log(indent+`${JSON.stringify(node.type)}: ${JSON.stringify(node.text)}`)
    } else {
        if (direction == "->") {
            console.log(indent+`<${node.type}>`)
            indent += "    "
        } else if (direction == "<-") {
            indent = indent.slice(0,-4)
            console.log(indent+`</${node.type}>`)
        }
    }
}