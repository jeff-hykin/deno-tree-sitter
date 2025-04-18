# The Tree Sitter for Deno!

This is a patched+enhanced version of the [web-tree-sitter](https://github.com/tree-sitter/tree-sitter/tree/master/lib/binding_web) made to run on Deno.

# Usage

Thanks to Deno, some boilerplate was able to be removed!


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
import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter@0.2.8.6/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/676ffa3b93768b8ac628fd5c61656f7dc41ba413/main/javascript.js"

const parser = await parserFromWasm(javascript) // path or Uint8Array
const tree = parser.parse('let x = 1;')
```

Alternatively load from a file:

```js
import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter@0.2.8.6/main.js"

// see https://github.com/jeff-hykin/common_tree_sitter_languages
// for getting wasm files for different languages
const parser = await parserFromWasm('./path/to/javascript.wasm')
const tree = parser.parse('let x = 1;')
```

Alternatively-alternatively load from a URL!:

```js
import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter@0.2.8.6/main.js"

// see https://github.com/jeff-hykin/common_tree_sitter_languages
// for getting wasm files for different languages
const parser = await parserFromWasm('https://github.com/jeff-hykin/common_tree_sitter_languages/raw/676ffa3b93768b8ac628fd5c61656f7dc41ba413/main/javascript.wasm')
// NOTE: the URL ends with .wasm not .js (in contrast with the first example)
const tree = parser.parse('let x = 1;')
```


### Data Structure

```js
import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter@0.2.8.6/main.js"
import rust from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/rust.js"

const parser = await parserFromWasm(rust)
const tree = parser.parse('fn main() { }')

tree.language.types  // array 
tree.language.fields // array 
tree.rootNode.text == "fn main() { }" // true
tree.rootNode == {
  type: "source_file",
  typeId: 139,
  startPosition: { row: 0, column: 0 },
  startIndex: 0,
  endPosition: { row: 0, column: 13 },
  endIndex: 13,
  indent: undefined,
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

<!-- ### Issues

None specific to deno-tree-sitter!

However, there is an issue with the tree sitter library itself though. Using the newest tree sitter with an older wasm file will throw something like this:

```
(deno-tree-sitter speaking here)
So a wasm file you're trying to load is old or incomplete.
I can't find the symbol "_Znwm".
This is effectively a dynamic linking (dyld) error from compiling the C code that became wasm.
```

Either get a newer wasm file, or import an older deno-tree-sitter, probably this version:

```js
import * as oldTreeSitter from "https://deno.land/x/deno_tree_sitter@0.1.3.0/main.js"
import oldYamlWasm from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/yaml.js"

const parser = await oldTreeSitter.parserFromWasm(oldYamlWasm)
``` -->

## Handy Tools/Usage

### Languages

I aggregated some wasm parser [here](https://github.com/jeff-hykin/common_tree_sitter_languages) for quick usage.

```js
import html from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/html.js"
import c from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/c.js"
import python from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/python.js"
import bash from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/bash.js"
import typescript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/typescript.js"
import yaml from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/yaml.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/javascript.js"
import rust from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/rust.js"
import css from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/css.js"
import json from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/json.js"
import wat from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/wat.js"
import wast from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/wast.js"
import tsx from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/tsx.js"
import toml from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/toml.js"
import nix from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/nix.js"
import cpp from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/cpp.js"
import gitignore from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/gitignore.js"
import treeSitterQuery from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/tree-sitter-query.js"
```


### Traversing

It is surprisingly handy to be able to iterate over every node (at any depth) in order.

```js
import { parserFromWasm, flatNodeList } from "https://deno.land/x/deno_tree_sitter@0.2.8.6/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/javascript.js"
const parser = await parserFromWasm(javascript) // path or Uint8Array
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

### Whitespace Nodes

Most tree sitter parsers don't have whitespace nodes, they just skip the whitespace. This means doing a .join("") on the code doesn't reproduce the original input. This argument solves that problem by auto-injecting whitespace nodes into any parsed output!

```js
import { parserFromWasm } from "https://deno.land/x/deno_tree_sitter@0.2.8.6/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/javascript.js"

const parser = await parserFromWasm(javascript)
const tree = parser.parse({string: 'let x = 1;', withWhitespace: true })
// NOTE:
    // 1. theres 1 edgecase: the root node will have a rootLeadingWhitespace attribute
    //    because there isn't a practical way of inserting a whitespace node infront of the
    //    root node. (But whitespace can appead infront of the root node)
    // 2. the rest of the tree will contain whitespace nodes
    // 3. existing nodes will have an "indent" attribute
    //    Every node on an indented line has the non-empty indent value, not just the first node
```

### Code 2 JSON

For quick analysis and debugging, its always nice to convert a parsed document to JSON.

```js
import { parserFromWasm } from "https://deno.land/x/deno_tree_sitter@0.2.8.6/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/javascript.js"

const parser = await parserFromWasm(javascript)
const tree = parser.parse({string: 'let x = 1;', withWhitespace: true })

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
import { parserFromWasm, xmlStylePreview } from "https://deno.land/x/deno_tree_sitter@0.2.8.6/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/javascript.js"

const parser = await parserFromWasm(javascript)
const tree = parser.parse({string: 'let x = 1;', withWhitespace: true })

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

### Querying

There's a whole query syntax explained [here](https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax) but here's how to use it:

```js
// 
// setup
// 
import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter@0.2.8.6/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/a1c34a3a73a173f82657e25468efc76e9e593843/main/javascript.js"
var parser = await parserFromWasm(javascript) // path or Uint8Array
var tree = parser.parse('let a = 1;let b = 1;let c = 1;')
var root = tree.rootNode

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


# Contributing

You can edit the main.js or tree_sitter.js. But, if you edit the tree_sitter.js, you'll need to edit `run/pull_tree_sitter` (which is JavaScript). The `run/pull_tree_sitter` is what allows this repo to stay up to date with the tree-sitter-web. It injects changes into the official tree-sitter codebase, and you'll have to do that for any changes you make as well.
