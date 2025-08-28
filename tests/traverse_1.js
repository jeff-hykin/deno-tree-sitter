#!/usr/bin/env -S deno run --allow-all
import { Parser, parserFromWasm, xmlStylePreview } from "../main.js"
import { createParser } from "../main/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"

const parser = await createParser(javascript) // path or Uint8Array
var tree = parser.parse(`
function thing(arg1) {
    let a = 10
}
`)
console.log(xmlStylePreview(tree.rootNode))
console.log(xmlStylePreview(tree.rootNode, { alwaysShowTextAttr: true }))

// // 
// // usage
// // 

// console.log(``)
// var tree = parser.parse({
//     string: `
//         function thing(arg1, arg2) {
//             let a = 10
//         }
//     `,
//     withWhitespace: false,
// })
// let indent = ""
// for (const [ parents, node, direction ] of tree.rootNode.traverse()) {
//     if (direction == "-") {
//         console.log(indent+`${JSON.stringify(safeEscape(node.type))}: ${JSON.stringify(node.text)}`)
//     } else {
//         if (direction == "->") {
//             console.log(indent+`<${safeEscape(node.type)}>`)
//             indent += "    "
//         } else if (direction == "<-") {
//             indent = indent.slice(0,-4)
//             console.log(indent+`</${safeEscape(node.type)}>`)
//         }
//     }
// }