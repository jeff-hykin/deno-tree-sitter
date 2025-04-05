import { Node } from "../tree_sitter/node.js"
import { BaseNode } from "./base_node.js"

// force it to inherit from BaseNode
Object.setPrototypeOf(Node.prototype, BaseNode)

class HardNode {
    *traverse(arg = { _parentNodes: [] }) {
        const { _parentNodes } = arg
        const parentNodes = [this, ..._parentNodes]
        if (this.children.length == 0) {
            yield [_parentNodes, this, "-"]
        } else {
            yield [_parentNodes, this, "->"]
            for (const each of this.children) {
                if (each instanceof Node) {
                    for (const eachInner of each.traverse({ _parentNodes: parentNodes })) {
                        yield eachInner
                    }
                } else {
                    yield [parentNodes, each, "-"]
                }
            }
            yield [_parentNodes, this, "<-"]
        }
    }

    /**
    * A generator function that flattens the hierarchical structure of `children` and their descendants.
    * It yields each child and their flattened descendants recursively.
    *
    * @param {Function} filter - A function to filter the flattened elements.
    * @generator
    * @yields {Node} The current child or grandchild in the structure.
    */
    *iterFlatten(filter) {
        if (typeof filter == "function") {
            for (const each of this.children) {
                if (filter(each)) {
                    yield each
                }
                for (const eachGrandChild of each.flattened(filter)) {
                    yield each
                }
            }
        } else {
            for (const each of this.children) {
                yield each
                for (const eachGrandChild of each.flattened()) {
                    yield each
                }
            }
        }
    }
    
    /**
    * Flattens the structure of `children` using the provided filter function.
    * This method returns an array containing the flattened elements.
    *
    * @param {Function} filter - A function to filter the flattened elements.
    * @returns {Array} An array containing the flattened elements that pass the filter.
    */
    flatten(filter) {
        return [...this.iterFlatten(filter)]
    }
    
    /**
    * Query
    *
    * @example
    * ```js
    * import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter/main.js"
    * import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
    * const parser = await parserFromWasm(javascript) // path or Uint8Array
    * var tree = parser.parse('let a = 1;let b = 1;let c = 1;')
    *
    * tree.rootNode.query(`(identifier) @blahBlahBlah`, {matchLimit: 2})
    * // returns:
    * [
    *   {
    *     pattern: 0,
    *     captures: [
    *       {
    *         name: "blahBlahBlah",
    *         node: {
    *           type: "identifier",
    *           typeId: 1,
    *           startPosition: { row: 0, column: 4 },
    *           startIndex: 4,
    *           endPosition: { row: 0, column: 5 },
    *           endIndex: 5,
    *           indent: undefined,
    *           hasChildren: false,
    *           children: []
    *         }
    *       }
    *     ]
    *   },
    *   {
    *     pattern: 0,
    *     captures: [
    *       {
    *         name: "blahBlahBlah",
    *         node: {
    *           type: "identifier",
    *           typeId: 1,
    *           startPosition: { row: 0, column: 14 },
    *           startIndex: 14,
    *           endPosition: { row: 0, column: 15 },
    *           endIndex: 15,
    *           indent: undefined,
    *           hasChildren: false,
    *           children: []
    *         }
    *       }
    *     ]
    *   },
    *   {
    *     pattern: 0,
    *     captures: [
    *       {
    *         name: "blahBlahBlah",
    *         node: {
    *           type: "identifier",
    *           typeId: 1,
    *           startPosition: { row: 0, column: 24 },
    *           startIndex: 24,
    *           endPosition: { row: 0, column: 25 },
    *           endIndex: 25,
    *           indent: undefined,
    *           hasChildren: false,
    *           children: []
    *         }
    *       }
    *     ]
    *   }
    * ]
    * ```
    *
    * @param {String} queryString - see https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax
    * @param options.matchLimit - max number of results
    * @param options.startPosition - {row: Number, column: number}
    * @param options.endPosition - {row: Number, column: number}
    * @param options.maxResultDepth - depth relative to the current node (1 = direct children, 2 = grandchildren, etc)
    * @returns {[Object]} output
    *
    */
    query(queryString, options) {
        const { matchLimit, startPosition, endPosition, maxResultDepth } = options || {}
        const realMaxResultDepth = maxResultDepth == null ? Infinity : maxResultDepth
        const result = this.tree.language.query(queryString).matches(this, startPosition || this.startPosition, endPosition || this.endPosition, matchLimit)
        return result.filter((each) => each.captures.every((each) => each.node.depth - this.depth <= realMaxResultDepth))
    }
    /**
    * quickQuery
    *
    * @example
    * ```js
    * import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter/main.js"
    * import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/676ffa3b93768b8ac628fd5c61656f7dc41ba413/main/javascript.js"
    * const parser = await parserFromWasm(javascript) // path or Uint8Array
    * var tree = parser.parse('let a = 1;let b = 1;let c = 1;')
    *
    * tree.rootNode.quickQuery(`(identifier)`, {matchLimit: 2})
    * // returns:
    * [
    *   {
    *      type: "identifier",
    *      typeId: 1,
    *      startPosition: { row: 0, column: 4 },
    *      startIndex: 4,
    *      endPosition: { row: 0, column: 5 },
    *      endIndex: 5,
    *      indent: undefined,
    *      hasChildren: false,
    *      children: []
    *   }
    * ]
    * ```
    *
    * @param {String} queryString - see https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax
    * @param options.matchLimit - max number of results
    * @param options.startPosition - {row: Number, column: number}
    * @param options.endPosition - {row: Number, column: number}
    * @param options.maxResultDepth - depth relative to the current node (1 = direct children, 2 = grandchildren, etc)
    * @returns {[Object]} output
    *
    */
    quickQuery(queryString, options) {
        let topLevelVarname = ""
        let thereMightBeIssues = true
        while (thereMightBeIssues) {
            topLevelVarname = `${topLevelVarname}_`
            thereMightBeIssues = queryString.includes(`@${topLevelVarname} `) || queryString.includes(`@${topLevelVarname}\t`) || queryString.endsWith(`@${topLevelVarname}`)
        }
        // add the top-level extraction always
        queryString = `${queryString} @${topLevelVarname}`
        const output = this.query(queryString, options).map((each) => Object.fromEntries(each.captures.map((each) => [each.name, each.node])))
        // combine the top-level extraction and the named extractions using proxies
        return output.map((eachMatch) => {
            const topLevel = eachMatch[topLevelVarname]
            delete eachMatch[topLevelVarname]
            const keys = Object.keys(eachMatch)
            if (keys.length == 0) {
                return topLevel
            }
            return new Proxy(topLevel, {
                ownKeys(original, ...args) {
                    return keys.concat(Reflect.ownKeys(original, ...args))
                },
                getOwnPropertyDescriptor(original, prop) {
                    return {
                        enumerable: true,
                        configurable: true,
                    }
                },
                get(original, key, ...args) {
                    // replace the inspect and toJSON
                    if (key == Symbol.for("Deno.customInspect") || key == "toJSON") {
                        return (inspect = (a) => a, options = {}) => {
                            const optional = {}
                            if (typeof original.rootLeadingWhitespace == "string") {
                                optional.rootLeadingWhitespace = original.rootLeadingWhitespace
                            }
                            return inspect(
                                {
                                    ...Object.fromEntries(keys.map((eachKey) => [eachKey, eachMatch[eachKey]])),
                                    type: original.type,
                                    typeId: original.typeId,
                                    startPosition: original.startPosition,
                                    startIndex: original.startIndex,
                                    endPosition: original.endPosition,
                                    startIndex: original.startIndex,
                                    endIndex: original.endIndex,
                                    indent: original.indent,
                                    ...optional,
                                    hasChildren: original.hasChildren,
                                    children: [...(original.children || [])],
                                },
                                options
                            )
                        }
                    }
                    return keys.includes(key) ? eachMatch[key] : Reflect.get(original, key, ...args)
                },
                set(original, key, value) {
                    if (keys.includes(key)) {
                        eachMatch[key] = value
                    }
                    return Reflect.set(original, key, value)
                },
                has(target, key) {
                    return keys.includes(key) || Reflect.has(target, key)
                },
                deleteProperty(target, key) {
                    if (keys.includes(key)) {
                        delete keys[keys.indexOf(key)]
                    }
                    return Reflect.deleteProperty(target, key)
                },
                isExtensible: Reflect.isExtensible,
                preventExtensions: Reflect.preventExtensions,
                setPrototypeOf: Reflect.setPrototypeOf,
                defineProperty: Reflect.defineProperty,
                getPrototypeOf: Reflect.getPrototypeOf,
            })
        })
    }
    /**
    * quickQueryFirst
    *
    * @example
    * ```js
    * import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter/main.js"
    * import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
    * const parser = await parserFromWasm(javascript) // path or Uint8Array
    * var tree = parser.parse('let a = 1;let b = 1;let c = 1;')
    *
    * tree.rootNode.quickQueryFirst(`(identifier)`)
    * // returns:
    * ({
    *      type: "identifier",
    *      typeId: 1,
    *      startPosition: { row: 0, column: 4 },
    *      startIndex: 4,
    *      endPosition: { row: 0, column: 5 },
    *      endIndex: 5,
    *      indent: undefined,
    *      hasChildren: false,
    *      children: []
    * })
    * ```
    *
    * @param {String} queryString - see https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax
    * @param options.startPosition - {row: Number, column: number}
    * @param options.endPosition - {row: Number, column: number}
    * @param options.maxResultDepth - depth relative to the current node (1 = direct children, 2 = grandchildren, etc)
    * @returns {Object} output
    *
    */
    quickQueryFirst(queryString, options) {
        return this.quickQuery(queryString, { ...options, matchLimit: 1 })[0]
    }
    get fields() {
        if (!this._fields) {
            this._fields = {}
            let index = -1
            for (let each of this.children) {
                index++
                const name = this.fieldNameForChild(index)
                if (name) {
                    this._fields[name] = each
                }
            }
        }
        return this._fields
    }
    get fieldNames() {
        return Object.keys(this.fields)
    }
    // while gutWith has every reason to work, I think something with tree sitter internals causes it not to work. May not play nice with SoftNodes either so its disabled for now
    // gutWith(stringOrNode) {
    //     const oldTree = this.tree
    //     const { startPosition: originalStart, endPosition: originalEnd, startIndex: originalStartIndex, endIndex: originalEndIndex } = this
    //     if (typeof stringOrNode != "string") {
    //         stringOrNode = stringOrNode?.text||""
    //     }
    //     const addedLines = stringOrNode.match(/\n/g)?.length || 0
        
    //     let newEndRow = originalStart.row
    //     if (addedLines == 0) {
    //         newEndRow = originalStart.row + stringOrNode.length
    //     } else {
    //         newEndRow = stringOrNode.split("\n").slice(-1)[0].length
    //     }
    //     const newString = this.tree.string.slice(0, originalStartIndex) + stringOrNode + this.tree.string.slice(originalEndIndex) 
    //     // update the .text of all the nodes
    //     this.tree.string = newString
    //     // update all the indices
    //     oldTree.edit({
    //         startIndex: originalStartIndex,
    //         oldEndIndex: originalEndIndex,
    //         newEndIndex: originalStartIndex + stringOrNode.length,
    //         startPosition: originalStart,
    //         oldEndPosition: originalEnd,
    //         newEndPosition: { row: newEndRow, column: originalStart.column + addedLines } 
    //     })
    // }
}

// extend the Node class itself
Object.assign(Node.prototype, HardNode.prototype)

export {
    Node
}