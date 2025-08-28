#!/usr/bin/env -S deno run --allow-all
import { applyThemeGetHtml } from "../main/extras/apply_theme_get_html.js"
import { createParser } from "../main/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
const parser = await createParser(javascript) // path or Uint8Array
const sourceCode = `
    function thing(arg1, arg2) {
        let a = 10
    }
`
var tree = parser.parse(sourceCode)

console.log(applyThemeGetHtml({
    themeRules: [
        { query: `(number) @target`, style: `color:salmon;` },
        { query: `(identifier) @target`, style: `color:cornflowerblue;`, class: "animate-pulse" },
        // parameters
        { query: `(formal_parameters (",") @target)`, style: `color:puple;`, },
        // function declaration name
        { query: `(function_declaration (identifier) @target)`, style: `color:aqua; font-weight:bold;` },
    ],
    tree: tree,
    string: sourceCode,
}))