#!/usr/bin/env -S deno run --allow-all
import { xmlStylePreview } from "../main/extras/xml_style_preview.js"
import { createParser, BaseNode } from "../main/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
import rust from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/rust.js"
var parser = await createParser(rust)
var tree = parser.parse('fn main() { }')
console.debug(`tree.rootNode.text is:`,tree.rootNode.text)
console.debug(`tree.rootNode.children[0].parent.text is:`,tree.rootNode.children[0].parent.text)
console.debug(`tree.rootNode.children[0] is:`,tree.rootNode.children[0].children[1])
tree.rootNode.children[0].fields.body.replaceInnards('{ let a = 10; }')
// console.debug(`tree.rootNode.children[0] is:`,tree.rootNode.children[0])
console.debug(`tree.rootNode.children[0] is:`,tree.rootNode.children[0].children[1])
console.debug(`tree.rootNode.children[0].children[4] is:`,tree.rootNode.children[0].children[4])
console.debug(`tree.rootNode.children[0].fields.parameters is:`,tree.rootNode.children[0].fields.parameters)
tree.rootNode.children[0].fields.parameters.replaceInnards('(___)')
console.debug(`tree.rootNode.children[0].fields.parameters is:`,tree.rootNode.children[0].fields.parameters)
// console.debug(`tree.rootNode.children[0] is:`,tree.rootNode.children[0])
console.debug(`tree.rootNode.children[0].children[4] is:`,tree.rootNode.children[0].children[4])
console.debug(`tree.rootNode.text is:`,JSON.stringify(tree.rootNode.text))