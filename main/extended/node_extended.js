import { Node } from "../tree_sitter/node.js"
import { BaseNode, _shadows } from "./base_node.js"
import { WhitespaceNode } from "./whitespace_node.js"
import { SoftTextNode } from "./soft_text_node.js"
import { Query, QueryError } from "../tree_sitter/query.js"
import { _getQueryCaptureTargets } from "../extras/misc.js"

const originalDescriptors = Object.getOwnPropertyDescriptors(Node.prototype)
const originalChildrenGetter = originalDescriptors.children.get
const originalEndIndex = originalDescriptors.endIndex.get
const originalEndPosition = originalDescriptors.endPosition.get
const originalParent = originalDescriptors.parent.get
const originalTextGetter = originalDescriptors.text.get

class HardNode {
    get parent() {
        const rawParent = originalParent.call(this)
        return _shadows[rawParent?.id] || rawParent
    }

    get text() {
        return originalTextGetter.call(_shadows[this.id] || this)
    }

    get endIndex() {
        if (this.depth == 0) {
            return this.tree.codeString.length
        }
        return originalEndIndex.call(this)
    }
    
    get endPosition() {
        if (this.depth == 0) {
            const rowIndex = (this.tree.codeString.match(/\n/g)||[]).length
            const columnIndex = this.tree.codeString.match(new RegExp(`^(?:.*\\r?\\n){${rowIndex}}(.*)`))[1].length
            return { row: rowIndex, column: columnIndex }
        }
        return originalEndPosition.call(this)
    }
    
    get children() {
        if (!this._children) {
            // will set this._children
            this._children = originalChildrenGetter.call(this)
            // add soft nodes if needed
            if (this.tree._enableSoftNodes) {
                this._children = _childrenWithSoftNodes(this, this._children, this.tree.codeString)
            }
        }
        return this._children
    }
    
    set children(value) {
        this._children = value
    }

    *traverse(arg = { _parentNodes: [] }) {
        const { _parentNodes } = arg
        const parentNodes = [this, ..._parentNodes]
        if (this.children?.length == 0) {
            yield [_parentNodes, this, "-"]
        } else {
            yield [_parentNodes, this, "->"]
            for (const each of this.children||[]) {
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
    * @param {Function} opts.filter - A function to filter the flattened elements.
    * @param {Boolean} opts.includeSelf - 
    * @generator
    * @yields {Node} The current child or grandchild in the structure.
    */
    *iterFlattened({filter, includeSelf=false}={}) {
        if (includeSelf) {
            yield this
        }
        if (typeof filter == "function") {
            for (const each of this.children||[]) {
                if (filter(each)) {
                    yield each
                }
                for (const eachGrandChild of each.iterFlattened({filter})) {
                    yield eachGrandChild
                }
            }
        } else {
            for (const each of this.children||[]) {
                yield each
                for (const eachGrandChild of each.iterFlattened({filter})) {
                    yield eachGrandChild
                }
            }
        }
    }
    iterFlatten() {
        throw Error(`did you mean iterFlattened instead of iterFlatten?`)
    }
    
    /**
    * Flattens the structure of `children` using the provided filter function.
    * This method returns an array containing the flattened elements.
    *
    * @param {Function} opts.filter - A function to filter the flattened elements.
    * @param {Boolean} opts.includeSelf - 
    * @returns {Array} An array containing the flattened elements that pass the filter.
    */
    flattened({filter, includeSelf=false}={}) {
        return [...this.iterFlattened({filter, includeSelf})]
    }
    flatten() {
        throw Error(`did you mean flattened instead of flatten?`)
    }
    
    /**
    * Query
    *
    * @example
    * ```js
    * // import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter/main.js"
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
        let query
        try {
            query = new Query(this.tree.language, queryString)
        } catch (error) {
            if (error instanceof QueryError) {
                error.message = `${error.message} in the following query: ${JSON.stringify(queryString)}`
            }
            throw error
        }
        const result = query.matches(this, startPosition || this.startPosition, endPosition || this.endPosition, matchLimit)
        const results = result.filter((each) => each.captures.every((each) => each.node.depth - this.depth <= realMaxResultDepth))
        const codeOrCallback = this.tree.codeString
        // without this soft nodes will be missing
        for (const eachResult of results) {
            for (const eachCapture of eachResult.captures) {
                eachCapture.node.children = _childrenWithSoftNodes(eachCapture.node, eachCapture.node.children, codeOrCallback)
            }
        }
        return result.filter((each) => each.captures.every((each) => each.node.depth - this.depth <= realMaxResultDepth))
    }
    /**
    * quickQuery
    *
    * @example
    * ```js
    * //import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter/main.js"
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
        const possibleCaptureTargets = _getQueryCaptureTargets(queryString)
        // 
        // get a base capture name
        // 
        let baseCaptureName = "_"
        while (possibleCaptureTargets.includes(baseCaptureName)) {
            // append until it doesn't conflict
            baseCaptureName = `${baseCaptureName}_`
        }
        
        // add the base capture always
        queryString = `${queryString} @${baseCaptureName}`
        const output = this.query(queryString, options).map((each) => {
            const nodesByCaptureName = Object.fromEntries(each.captures.map((each) => [each.name, each.node]))
            // no capture targets means just return the base
            if (possibleCaptureTargets.length == 0) {
                return nodesByCaptureName[baseCaptureName]
            // return named targets
            } else {
                // 0 is not allowed as a capture name, so it will never conflict
                nodesByCaptureName[0] = nodesByCaptureName[baseCaptureName]
                delete nodesByCaptureName[baseCaptureName]
                return nodesByCaptureName
            }
        })
        return output
    }
    /**
    * quickQueryFirst
    *
    * @example
    * ```js
    * // import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter/main.js"
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
            for (let each of this.children||[]) {
                // skip soft nodes
                if (each.typeId <= 0) {
                    continue
                }
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
}

// patch Node with all HardNode properties
const descriptors = Object.getOwnPropertyDescriptors(HardNode.prototype)
delete descriptors.constructor
Object.defineProperties(Node.prototype, descriptors)
// force it to inherit from BaseNode
Object.setPrototypeOf(Node.prototype, BaseNode.prototype)

export {
    Node
}

// helper
export const _childrenWithSoftNodes = (node, children, string)=>{
    if (children?.length > 0) {
        const newChildren = []
        const childrenCopy = [...children]
        let firstChild = childrenCopy.shift()
        // helper
        const handleGaps = (gapText, getReferencePoint, parentNode) => {
            const { index, position } = getReferencePoint()
            let start = index
            let startPosition = position
            const chunks = gapText.split(/(?<!\s)(?=\s+)/g)
            let colOffset = startPosition.column
            let rowOffset = startPosition.row
            for (const eachGap of chunks) {
                if (eachGap.length == 0) {
                    continue
                }
                const end = start + eachGap.length
                if (eachGap.match(/^\s/)) {
                    const rowOffsetBefore = rowOffset
                    const colOffsetBefore = colOffset
                    rowOffset += (eachGap.match(/\n/g)||[]).length
                    // reset column offset on new row
                    if (rowOffsetBefore != rowOffset) {
                        colOffset = eachGap.split("\n").slice(-1)[0].length
                    } else {
                        colOffset += eachGap.length
                    }
                    newChildren.push(new WhitespaceNode({
                        tree: node.tree,
                        parent: parentNode,
                        getReferencePoint,
                        text: eachGap,
                        _startIndexOffset: start-index,
                        _startRowOffset: rowOffsetBefore-position.row,
                        _startColOffset: colOffsetBefore-position.column,
                        _endIndexOffset: end-index,
                        _endRowOffset: rowOffset-position.row,
                        _endColOffset: colOffset-position.column,
                        children: [],
                    }))
                // sometimes the gap isn't always whitespace
                } else {
                    const colOffsetBefore = colOffset
                    colOffset += eachGap.length
                    newChildren.push(new SoftTextNode({
                        tree: node.tree,
                        parent: parentNode,
                        getReferencePoint,
                        text: eachGap,
                        _startIndexOffset: start-index,
                        _startRowOffset: rowOffset-position.row,
                        _startColOffset: colOffsetBefore-position.column,
                        _endIndexOffset: end-index,
                        _endRowOffset: rowOffset-position.row,
                        _endColOffset: colOffset-position.column,
                        children: [],
                    }))
                }
                start = end
            }
        }
        // preceding whitespace
        if (node.startIndex != firstChild.startIndex) {
            const gapText = string.slice(node.startIndex, firstChild.startIndex)
            const thisNode = node
            // whitespace and non-whitespace chunks
            handleGaps(gapText, ()=>({index: thisNode.startIndex, position: thisNode.startPosition}), node)
        }
        // firstChild.indent = indent
        newChildren.push(firstChild)
        // gaps between sibilings
        let prevChild = firstChild
        for (const eachSecondaryNode of childrenCopy) {
            if (prevChild.endIndex != eachSecondaryNode.startIndex) {
                const gapText = string.slice(prevChild.endIndex, eachSecondaryNode.startIndex)
                const thisChild = prevChild
                handleGaps(gapText, ()=>({index: thisChild.endIndex, position: thisChild.endPosition}), node)
            }
            // eachSecondaryNode.indent = indent
            newChildren.push(eachSecondaryNode)
            prevChild = eachSecondaryNode
        }

        // gap between last child and parent
        if (prevChild.endIndex != node.endIndex) {
            const gapText = string.slice(prevChild.endIndex, node.endIndex)
            const thisChild = prevChild
            handleGaps(gapText, ()=>({index: thisChild.endIndex, position: thisChild.endPosition}), node)
        }
        
        return newChildren
    }
}