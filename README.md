# The Tree Sitter for Deno!

This is a patched version of the [web-tree-sitter](https://github.com/tree-sitter/tree-sitter/tree/master/lib/binding_web) made to run on Deno.

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
import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter@0.0.7/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"

const parser = await parserFromWasm(javascript) // path or Uint8Array
const tree = parser.parse('let x = 1;')
```

Alternatively load from a file:

```js
import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter@0.0.7/main.js"

// see https://github.com/jeff-hykin/common_tree_sitter_languages
// for getting wasm files for different languages
const parser = await parserFromWasm('./path/to/javascript.wasm')
const tree = parser.parse('let x = 1;')
```


### Data Structure

```js
import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter@0.0.7/main.js"
import rust from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/rust.js"

const parser = await parserFromWasm(rust)
const tree = parser.parse('fn main() { }')

tree.language.types  // array 
tree.language.fields // array 
tree.rootNode.text == "fn main() { }" // true
tree.rootNode = {
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

## Handy Tools/Usage


### Whitespace Nodes

Most tree sitter parsers don't have whitespace nodes, they just skip the whitespace. This means doing a .join("") on the code doesn't reproduce the original input. This argument solves that problem by auto-injecting whitespace nodes into any parsed output!

```js
import { parserFromWasm } from "https://deno.land/x/deno_tree_sitter@0.0.7/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"

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
import { parserFromWasm } from "https://deno.land/x/deno_tree_sitter@0.0.7/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"

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

### Flatten 

It is surprisingly handy to be able to iterate over every node in order.

```js
import { parserFromWasm, flatNodeList } from "https://deno.land/x/deno_tree_sitter@0.0.7/main.js"
import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"

var parser = await parserFromWasm(javascript)
var tree = parser.parse({string: 'let x = 1;', withWhitespace: true })

var allNodes = flatNodeList(tree.rootNode)

var originalString = allNodes.map(each=>each.hasChildren ? "" : (each.text||"")).join("")
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
