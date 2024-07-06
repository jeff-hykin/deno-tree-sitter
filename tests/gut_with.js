#!/usr/bin/env -S deno run --allow-all
import { Parser, parserFromWasm, xmlStylePreview } from "../main.js"
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

console.log(`should be "function" :`,tree.rootNode.children[0].children[0].text)
console.log(`before gutting:`,xmlStylePreview(tree.rootNode, { alwaysShowTextAttr: true }))
console.debug(`tree.string is:`,tree.string)
tree.rootNode.children[0].children[0].gutWith(`async function`)
console.log(`after gutting:`,xmlStylePreview(tree.rootNode, { alwaysShowTextAttr: true }))
console.debug(`tree.string is:`,tree.string)