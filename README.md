# The Tree Sitter for Deno!

This is a patched+extended version of the [web-tree-sitter](https://github.com/tree-sitter/tree-sitter/tree/master/lib/binding_web) made to be bundler-friendly and run on Deno and the web.

# Usage: How do I __ ?

1. Install / Import 
2. Load + Parse Code
3. Find a specific part of code (query the AST)
4. Edit the tree (replace nodes, etc)

## 1. How to Install / Import

Thanks to Deno, boilerplate was able to be removed!

### The Legacy `web-tree-sitter` Way 🤢

```js
const Parser = require('web-tree-sitter');

(async () => {
  await Parser.init();
  const parser = new Parser();
  const Lang = await Parser.Language.load('tree-sitter-javascript.wasm');
  parser.setLanguage(Lang);
  const tree = parser.parse('let x = 1;');
  console.log(tree.rootNode.toString());
})();
```

### The New Way ✨

```js
import { createParser } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/main.js"
import javascript from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/javascript.js"

const parser = await createParser(javascript) // path or Uint8Array or URL
const tree = parser.parse('let x = 1;')
```


## 2. How to Parse

1. Find a tree-sitter.wasm file for the language you want to parse (I precompiled a bunch over here: https://github.com/jeff-hykin/common_tree_sitter_languages)
2. Load that wasm file using a URL, file path, or Uint8Array
3. Call `.parse()` on a string of code


```js
import { createParser } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/main.js"
import javascriptUint8Array from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/javascript.js"

// ex: uint8array
const parser1 = await createParser(javascriptUint8Array)
// ex: file path
const parser2 = await createParser('./path/to/javascript.wasm')
// ex: url
const parser3 = await createParser("https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/javascript.wasm")

// parse a string
const tree1 = parser1.parse('let x = 1;')
```

#### Quick Languages

I aggregated some wasm parser [here](https://github.com/jeff-hykin/common_tree_sitter_languages) for quick usage.

```js
import html from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/html.js"
import c from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/c.js"
import python from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/python.js"
import bash from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/bash.js"
import typescript from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/typescript.js"
import yaml from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/yaml.js"
import javascript from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/javascript.js"
import rust from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/rust.js"
import css from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/css.js"
import json from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/json.js"
import wat from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/wat.js"
import wast from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/wast.js"
import tsx from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/tsx.js"
import toml from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/toml.js"
import nix from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/nix.js"
import cpp from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/cpp.js"
import gitignore from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/gitignore.js"
import treeSitterQuery from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/tree-sitter-query.js"
```

#### The Tree Data Structure

```js
import { Parser, createParser } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/main.js"
import rust from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/rust.js"

const parser = await createParser(rust)
const tree = parser.parse(' fn main() { }')

tree.rootNode // main thing you probably care about
tree.rootNode.children // array of nodes
tree.rootNode.children[0].fields // object of nodes
tree.rootNode.children[0].fields.parameters.text // "()"
tree.rootNode.children[0].fields.body.text // "{ }"
tree.rootNode.children[0].fields.name.text // "main"
tree.rootNode.text == " fn main() { }" // true

tree.language.types  // array 
tree.language.fields // array 
tree.rootNode == {
  type: "source_file",
  typeId: 139,
  startPosition: { row: 0, column: 0 },
  startIndex: 0,
  endPosition: { row: 0, column: 13 },
  endIndex: 13,
  indent: "",
  hasChildren: true,
  children: [
    {
      type: "function_item",
      typeId: 170,
      startPosition: { row: 0, column: 0 },
      startIndex: 0,
      endPosition: { row: 0, column: 13 },
      endIndex: 13,
      indent: undefined,
      hasChildren: true,
      children: [ [Object], [Object], [Object], [Object] ]
    }
  ]
}
```

## 3. How to Find Specific Things (Query)

If you want to use j-query like approach to an AST, you're in luck. There is a whole query syntax explained [here](https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax) and here's how to use it:

```js
// 
// setup
// 
import { Parser, createParser } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/main.js"
import javascript from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/javascript.js"
var parser = await createParser(javascript) // path or Uint8Array
var tree = parser.parse('let a = 1;let b = 1;let c = 1;')
var root = tree.rootNode

// if you have access to the node as a var, use console.log(node.getQueryForSelf()) on it
// ex:
    console.log(root.children[0].children[0].getQueryForSelf())
    // (program (lexical_declaration (let)))

// 
// quickQuery will return the high level node, even if you dont specify names (like @name1)
// 
    var firstLexicalNode = root.quickQuery(`(lexical_declaration)`)[0]
    // Alternatively:
    var firstLexicalNode = root.quickQueryFirst(`(lexical_declaration)`)

// 
// quickQueryFirst
// 
    var firstIdentifierNode = root.quickQueryFirst(`(lexical_declaration)`).quickQueryFirst(`(identifier)`)

// 
// you can also specify extraction names
// 
    var { blahInner, blahOuter } = root.quickQuery(`(lexical_declaration (identifier) @blahInner ) @blahOuter`)[0]

// 
// full .query()
// 
    // basic
    var results = tree.rootNode.query(`(identifier) @blahBlahBlah`)
    // capped count
    var results = tree.rootNode.query(`(identifier) @blahBlahBlah`, { matchLimit: 2 })
    // limited range
    var results = tree.rootNode.query(
        `(identifier) @blahBlahBlah`,
        {
            matchLimit: 2,
            startPosition: { row: 0, column: 0 },
            endPosition: {row: 1000, column: 1000}
        }
    )

// ouput structure
results == [
    {
        pattern: 0,
        captures: [
            {
                name: "blahBlahBlah",
                node: {
                    type: "identifier",
                    typeId: 1,
                    startPosition: { row: 0, column: 4 },
                    startIndex: 4,
                    endPosition: { row: 0, column: 5 },
                    endIndex: 5,
                    indent: undefined,
                    hasChildren: false,
                    children: []
                }
            }
        ]
    },
    {
        pattern: 0,
        captures: [
            {
                name: "blahBlahBlah",
                node: {
                    type: "identifier",
                    typeId: 1,
                    startPosition: { row: 0, column: 14 },
                    startIndex: 14,
                    endPosition: { row: 0, column: 15 },
                    endIndex: 15,
                    indent: undefined,
                    hasChildren: false,
                    children: []
                }
            }
        ]
    },
    {
        pattern: 0,
        captures: [
            {
                name: "blahBlahBlah",
                node: {
                    type: "identifier",
                    typeId: 1,
                    startPosition: { row: 0, column: 24 },
                    startIndex: 24,
                    endPosition: { row: 0, column: 25 },
                    endIndex: 25,
                    indent: undefined,
                    hasChildren: false,
                    children: []
                }
            }
        ]
    }
]
```

### Traversing

It is surprisingly handy to be able to iterate over every node (at any depth) in order.

```js
import { createParser } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/main.js"
import javascript from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/javascript.js"
const parser = await createParser(javascript) // path or Uint8Array
const tree = parser.parse(`
    function thing(arg1) {
        let a = 10
    }
`)

// 
// example with nice printout:
// 
let indent = ""
for (const [ parents, node, direction ] of tree.rootNode.traverse()) {
    const isLeafNode = direction == "-"
    if (isLeafNode) {
        console.log(indent+`<${node.type} text=${JSON.stringify(node.text)} />`)
    } else if (direction == "->") {
        console.log(indent+`<${node.type}>`)
        indent += "    "
    } else if (direction == "<-") {
        indent = indent.slice(0,-4)
        console.log(indent+`</${node.type}>`)
    }
}

// prints:
// <program>
//     <function_declaration>
//         <function text="function" />
//         <identifier text="thing" />
//         <formal_parameters>
//             <( text="(" />
//             <identifier text="arg1" />
//             <) text=")" />
//         </formal_parameters>
//         <statement_block>
//             <{ text="{" />
//             <lexical_declaration>
//                 <let text="let" />
//                 <variable_declarator>
//                     <identifier text="a" />
//                     <= text="=" />
//                     <number text="10" />
//                 </variable_declarator>
//             </lexical_declaration>
//             <} text="}" />
//         </statement_block>
//     </function_declaration>
// </program>
```

### Whitespace and Soft Nodes

If you're making a formatter or a code refactoring tool, it would normally be a bit of a pain because the tree sitter doesn't handle whitespace great.

Typically tree sitter languages don't have whitespace nodes at all (and sometimes they even skip normal code!). This means there's text that is stored outside of the nodes in the AST. This library solves that problem by auto injecting "soft nodes" back into the AST. Most of the time they are just whitespace nodes, but sometimes they can be other syntax depending on your grammar.

```js
import { createParser } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/main.js"
import javascript from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/javascript.js"

const parser = await createParser(javascript)
const tree = parser.parse('   let x = 1;')
tree.rootNode.children[0] // whitespace node (soft node)
tree.rootNode.hardChildren[0] // "let" node
```

Note: you can't query a whitespace node because it's not actually part of the tree, it's just there to make processing easier. 


## 4. Edit the tree

Editing is [normally a huge pain](https://github.com/tree-sitter/tree-sitter/discussions/2553#discussioncomment-9976343), but not anymore! Just use `.replaceInnards()` on a node to replace it with a string (example below). You can query, perform many edits, all of the .startIndex, .endIndex, .text, etc attributes will continue to be correct.

However:
1. **Calling .replaceInnards() will destroy the .children**! While that might be obvious to some, what is less obvious is, if you still have access to a child via a var, the .text of that (destroyed) child will be *wrong*. There currently is not a practical way to avoid this, the same thing happens with the normal tree-sitter library. If you need the text of a child you are about to replace, grab that child's .text before you replace it.
2. `.replaceInnards()` does not trigger a re-parse. You can dump completely invalid syntax into the tree, all the non-child nodes will stay as-is. If you want to re-parse there is a fast way! Pass the old tree into the parse function (ex: `let newTree = parser.parse(oldTree.codeString, oldTree)`). Note: when a new tree is created there is ZERO OVERLAP between old nodes and new nodes. This is a tree sitter limitation.

```js
import { createParser } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/main.js"
import javascript from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/javascript.js"

const parser = await createParser(javascript)
const tree = parser.parse(`
    function thing(arg1) {
        let a = 10
    }
`)

// the always-correct string of all nodes combined
tree.codeString

tree.rootNode.children[0].children[0].replaceInnards(`async function`)
tree.rootNode.children[0].children[5].children[2].children[2].children[4].replaceInnards(`999`)
tree.rootNode.children[0].children[5].children[2].children[2].children[2].replaceInnards(`+=`)

console.log(tree.rootNode.text)
// prints:
    // async function thing(arg1) {
    //     let a += 999
    // }
```


<!-- ### Code 2 JSON

For quick analysis and debugging, its always nice to convert a parsed document to JSON.

```js
import { createParser } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/main.js"
import javascript from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/javascript.js"

const parser = await createParser(javascript)
const tree = parser.parse('let x = 1;')

// this used to not work! I added support for it
console.log(
    JSON.stringify(
        tree.rootNode,
        0,
        4, // indent=4
    )
)
const outputLooksLike = {
    "type": "program",
    "typeId": 125,
    "startPosition": {
        "row": 0,
        "column": 0
    },
    "startIndex": 0,
    "endPosition": {
        "row": 0,
        "column": 10
    },
    "endIndex": 10,
    "indent": "",
    "rootLeadingWhitespace": "",
    "children": [
        {
            "type": "lexical_declaration",
            "typeId": 138,
            "startPosition": {
                "row": 0,
                "column": 0
            },
            "startIndex": 0,
            "endPosition": {
                "row": 0,
                "column": 10
            },
            "endIndex": 10,
            "indent": "",
            "children": [
                {
                    "type": "let",
                    "typeId": 13,
                    "startPosition": {
                        "row": 0,
                        "column": 0
                    },
                    "startIndex": 0,
                    "endPosition": {
                        "row": 0,
                        "column": 3
                    },
                    "endIndex": 3,
                    "indent": "",
                    "text": "let",
                    "children": []
                },
                {
                    "type": "whitespace",
                    "typeId": -1,
                    "startIndex": 3,
                    "endIndex": 4,
                    "indent": "",
                    "text": " ",
                    "children": []
                },
                {
                    "type": "variable_declarator",
                    "typeId": 139,
                    "startPosition": {
                        "row": 0,
                        "column": 4
                    },
                    "startIndex": 4,
                    "endPosition": {
                        "row": 0,
                        "column": 9
                    },
                    "endIndex": 9,
                    "indent": "",
                    "children": [
                        {
                            "type": "identifier",
                            "typeId": 1,
                            "startPosition": {
                                "row": 0,
                                "column": 4
                            },
                            "startIndex": 4,
                            "endPosition": {
                                "row": 0,
                                "column": 5
                            },
                            "endIndex": 5,
                            "indent": "",
                            "text": "x",
                            "children": []
                        },
                        {
                            "type": "whitespace",
                            "typeId": -1,
                            "startIndex": 5,
                            "endIndex": 6,
                            "indent": "",
                            "text": " ",
                            "children": []
                        },
                        {
                            "type": "=",
                            "typeId": 39,
                            "startPosition": {
                                "row": 0,
                                "column": 6
                            },
                            "startIndex": 6,
                            "endPosition": {
                                "row": 0,
                                "column": 7
                            },
                            "endIndex": 7,
                            "indent": "",
                            "text": "=",
                            "children": []
                        },
                        {
                            "type": "whitespace",
                            "typeId": -1,
                            "startIndex": 7,
                            "endIndex": 8,
                            "indent": "",
                            "text": " ",
                            "children": []
                        },
                        {
                            "type": "number",
                            "typeId": 109,
                            "startPosition": {
                                "row": 0,
                                "column": 8
                            },
                            "startIndex": 8,
                            "endPosition": {
                                "row": 0,
                                "column": 9
                            },
                            "endIndex": 9,
                            "indent": "",
                            "text": "1",
                            "children": []
                        }
                    ]
                },
                {
                    "type": ";",
                    "typeId": 33,
                    "startPosition": {
                        "row": 0,
                        "column": 9
                    },
                    "startIndex": 9,
                    "endPosition": {
                        "row": 0,
                        "column": 10
                    },
                    "endIndex": 10,
                    "indent": "",
                    "text": ";",
                    "children": []
                }
            ]
        }
    ]
}
```

### XML Style Preview

Sometimes you want to know what the tree looks like, but without the verbose structure of JSON. The XML style preview can give be a bit more readable in that aspect.

NOTE: It is NOT valid XML, just very XML-like

```js
import { createParser, xmlStylePreview } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/main.js"
import javascript from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/javascript.js"

const parser = await createParser(javascript)
const tree = parser.parse('let x = 1;')

console.log(xmlStylePreview(tree.rootNode))
```

Output:

```xml
<program>
    <lexical_declaration>
        <let text="let" />
        <whitespace text=" " />
        <variable_declarator>
            <identifier text="x" />
            <whitespace text=" " />
            <"=" text="=" />
            <whitespace text=" " />
            <number text="1" />
        </variable_declarator>
        <";" text=";" />
    </lexical_declaration>
</program>
```

For *extreme* debugging, you can use the `alwaysShowTextAttr` option.

```js

// CAUTION: for normal-sized files, this will create a HUGE output (<program text=THE ENTIRE FILE>)
console.log(xmlStylePreview(tree.rootNode, { alwaysShowTextAttr: true }))
```

```xml
<program text="let x = 1;" />
    <lexical_declaration text="let x = 1;" />
        <let text="let" />
        <whitespace text=" " />
        <variable_declarator text="x = 1" />
            <identifier text="x" />
            <whitespace text=" " />
            <"=" text="=" />
            <whitespace text=" " />
            <number text="1" />
        </variable_declarator>
        <";" text=";" />
    </lexical_declaration>
</program>
```


## Original Documentation (from web-tree-sitter)

Now you can parse source code:

```js
const sourceCode = 'let x = 1; console.log(x);';
const tree = parser.parse(sourceCode);
```

and inspect the syntax tree.

```javascript
console.log(tree.rootNode.toString());

// (program
//   (lexical_declaration
//     (variable_declarator (identifier) (number)))
//   (expression_statement
//     (call_expression
//       (member_expression (identifier) (property_identifier))
//       (arguments (identifier)))))

const callExpression = tree.rootNode.child(1).firstChild;
console.log(callExpression);

// { type: 'call_expression',
//   startPosition: {row: 0, column: 16},
//   endPosition: {row: 0, column: 30},
//   startIndex: 0,
//   endIndex: 30 }
```

### Editing

If your source code *changes*, you can update the syntax tree. This will take less time than the first parse.

```javascript
// Replace 'let' with 'const'
const newSourceCode = 'const x = 1; console.log(x);';

tree.edit({
  startIndex: 0,
  oldEndIndex: 3,
  newEndIndex: 5,
  startPosition: {row: 0, column: 0},
  oldEndPosition: {row: 0, column: 3},
  newEndPosition: {row: 0, column: 5},
});

const newTree = parser.parse(newSourceCode, tree);
```

### Parsing Text From a Custom Data Structure

If your text is stored in a data structure other than a single string, you can parse it by supplying a callback to `parse` instead of a string:

```javascript
const sourceLines = [
  'let x = 1;',
  'console.log(x);'
];

const tree = parser.parse((index, position) => {
  let line = sourceLines[position.row];
  if (line) return line.slice(position.column);
});
```

# API Reference

```js
parser.parse(sourceCode).rootNode.typeId
parser.parse(sourceCode).rootNode.type
parser.parse(sourceCode).rootNode.endPosition
parser.parse(sourceCode).rootNode.endIndex
parser.parse(sourceCode).rootNode.text
parser.parse(sourceCode).rootNode.childCount
parser.parse(sourceCode).rootNode.namedChildCount
parser.parse(sourceCode).rootNode.firstChild
parser.parse(sourceCode).rootNode.firstNamedChild
parser.parse(sourceCode).rootNode.lastChild
parser.parse(sourceCode).rootNode.lastNamedChild
parser.parse(sourceCode).rootNode.children
parser.parse(sourceCode).rootNode.namedChildren
parser.parse(sourceCode).rootNode.nextSibling
parser.parse(sourceCode).rootNode.previousSibling
parser.parse(sourceCode).rootNode.nextNamedSibling
parser.parse(sourceCode).rootNode.previousNamedSibling
parser.parse(sourceCode).rootNode.parent
parser.parse(sourceCode).rootNode.isNamed() 
parser.parse(sourceCode).rootNode.hasError() 
parser.parse(sourceCode).rootNode.hasChanges() 
parser.parse(sourceCode).rootNode.isMissing() 
parser.parse(sourceCode).rootNode.equals(t) 
parser.parse(sourceCode).rootNode.child(t) 
parser.parse(sourceCode).rootNode.namedChild(t) 
parser.parse(sourceCode).rootNode.childForFieldId(t) 
parser.parse(sourceCode).rootNode.childForFieldName(t) 
parser.parse(sourceCode).rootNode.descendantsOfType(t, r, s) 
parser.parse(sourceCode).rootNode.descendantForIndex(t, r=t) 
parser.parse(sourceCode).rootNode.namedDescendantForIndex(t, r=t) 
parser.parse(sourceCode).rootNode.descendantForPosition(t, r=t) 
parser.parse(sourceCode).rootNode.namedDescendantForPosition(t, r=t) 
parser.parse(sourceCode).rootNode.walk() 
```
 -->
 
# Extras

Here's a few tools

### Indent

The `.indent` of a node is based on the whitespace indentation of the line it is on.
```js
const myVar = parser.parse(`   let myVar = 1;`).quickQueryFirst(`(identifier)`)
myVar.indent // "   " 
```

### Debug with XML Style Preview

If you want to look at an AST in a human-readable format, try the `xmlStylePreview` function.

```js
import { xmlStylePreview } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/extras/xml_style_preview.js"
import { createParser } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/main.js"
import javascript from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/javascript.js"

const parser = await createParser(javascript) // path or Uint8Array
const tree = parser.parse(`
function thing(arg1) {
    let a = 10
}
`)

// NOTE: this is not valid XML, just very XML-like
console.log(xmlStylePreview(tree.rootNode, { alwaysShowTextAttr: false }))
// NOTE: setting alwaysShowTextAttr to true will output A LOT of text, be wary
// output:
`<program>
    <function_declaration>
        <function text="function" />
        <whitespace text=" " />
        <identifier text="thing" />
        <formal_parameters>
            <"(" text="(" />
            <identifier text="arg1" />
            <")" text=")" />
        </formal_parameters>
        <whitespace text=" " />
        <statement_block>
            <"{" text="{" />
            <whitespace text="\\n    " />
            <lexical_declaration>
                <let text="let" />
                <whitespace text=" " />
                <variable_declarator>
                    <identifier text="a" />
                    <whitespace text=" " />
                    <"=" text="=" />
                    <whitespace text=" " />
                    <number text="10" />
                </variable_declarator>
            </lexical_declaration>
            <whitespace text="\\n" />
            <"}" text="}" />
        </statement_block>
    </function_declaration>
    <whitespace text="\\n" />
</program>`
```

### Theme/Colors Via HTML

If you want to do some basic text-styling and colors, try the `applyThemeGetHtml` function.

```js
import { applyThemeGetHtml } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/extras/apply_theme_get_html.js"
import { createParser } from "https://deno.land/x/deno_tree_sitter@1.0.1.2/main/main.js"
import javascript from "https://esm.sh/gh/jeff-hykin/common_tree_sitter_languages@1.3.2.0/main/javascript.js"
const parser = await createParser(javascript) // path or Uint8Array
const sourceCode = `function thing(arg1, arg2) {
    let a = 10
}`
var tree = parser.parse(sourceCode)

console.log(applyThemeGetHtml({
    themeRules: [
        { query: `(number) @target`, style: `color:salmon;` },
        { query: `(identifier) @target`, style: `color:cornflowerblue;`, class: "animate-pulse" },
        // parameters
        { query: `(formal_parameters (",") @target)`, style: `color:purple;`, },
        // function declaration name
        { query: `(function_declaration (identifier) @target)`, style: `color:aqua; font-weight:bold;` },
    ],
    tree: tree,
    string: sourceCode,
    tagForBaseElements: "code",
    tagForStyledElements: "span", // can create a hierarchy (e.g. don't use "p")
}))
// output:
`<code>function </code>
<span style="color: aqua; font-weight: bold"><code>thing</code></span>
<code>(</code>
<span style="color: cornflowerblue" class="animate-pulse"><code>arg1</code></span>
<span style="color: purple"><code>,</code></span>
<code> </code>
<span style="color: cornflowerblue" class="animate-pulse"><code>arg2</code></span>
<code>) {
    let </code>
<span style="color: cornflowerblue" class="animate-pulse"><code>a</code></span>
<code> = </code>
<span style="color: salmon"><code>10</code></span>
<code>
}</code>`
```

# Contributing

You can edit anything inside of `main/extended` or `main/extras`. However everything under `main/tree_sitter/` is automatically derived from the upstream tree sitter. To update it, run `run/pull_tree_sitter` in the command line. At time of writing (2025-August) the latest tree sitter version is `0.25.8`, which is what this codebase is based on.
