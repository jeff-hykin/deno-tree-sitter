#!/usr/bin/env -S deno run --allow-all
import { xmlStylePreview } from "../main/extras/xml_style_preview.js"
import { createParser, BaseNode } from "../main/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
var parser = await createParser(javascript) // path or Uint8Array
var tree = parser.parse('let a = 1;let b = 1;let c = 1;')
var root = tree.rootNode

// if you already know the node you want, you can use console.log(node.getQueryForSelf()) on it
// ex:
    console.log("root.children[0].getQueryForSelf()", root.children[0].children[0].getQueryForSelf())

var parser = await createParser(javascript) // path or Uint8Array
var tree = parser.parse(`
    function thing(arg1) {
        let a = 10
    }
`)

console.log(`should be "function" :`,tree.rootNode.children[0].children[0].text)
console.log(`should be "10" :`,tree.rootNode.children[0].children[5].children[2].children[2].children[4])
console.log(`should be "=" :`,tree.rootNode.children[0].children[5].children[2].children[2].children[2])
console.log(`before gutting:`,xmlStylePreview(tree.rootNode, { alwaysShowTextAttr: true }))
console.debug(`tree.codeString is:`,tree.codeString)
tree.rootNode.children[0].children[0].replaceInnards(`async function`)
tree.rootNode.children[0].children[5].children[2].children[2].children[4].replaceInnards(`999`)
tree.rootNode.children[0].children[5].children[2].children[2].children[2].replaceInnards(`+=`)
console.debug(`tree.rootNode.children[0].children[5].children[2].children[2].getQueryForSelf() is:`,tree.rootNode.children[0].children[5].children[2].children[2].getQueryForSelf())
console.log(`after gutting:`,xmlStylePreview(tree.rootNode, { alwaysShowTextAttr: true }))
console.debug(`tree.codeString is:`,tree.codeString)