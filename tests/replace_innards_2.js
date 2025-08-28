#!/usr/bin/env -S deno run --allow-all
import { xmlStylePreview } from "../main/extras/xml_style_preview.js"
import { createParser, BaseNode } from "../main/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
import rust from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/rust.js"
var parser = await createParser(rust)
// tree.rootNode.replaceInnards('fn main() { }')
var tree = parser.parse('    ')
console.debug(`tree.rootNode.text is:`,JSON.stringify(tree.rootNode.text))
try {
    tree.rootNode.children[0].fields.parameters.text
    throw Error(`This should have failed`)
} catch (error) {
    
}

console.debug(`tree.rootNode.children is:`,tree.rootNode.children)
tree.rootNode.children[0].replaceInnards("\t\t\t\ta")
console.debug(`tree.rootNode.text after is:`,JSON.stringify(tree.rootNode.text))