# The Tree Sitter for Deno!

This is a patched version of the [web-tree-sitter](https://github.com/tree-sitter/tree-sitter/tree/master/lib/binding_web) made to run on Deno.

# Usage

Thanks to Deno, some boilerplate was able to be removed.


### The Old Way 🤢

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
import { Parser, parserFromWasm } from "https://deno.land/x/deno-tree-sitter@0.0.1/main.js"

const parser = await parserFromWasm('tree-sitter-javascript.wasm') // also accepts Uint8Array's
parser.parse('let x = 1;')
console.log(tree.rootNode.toString())
```


## Original Documentation

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