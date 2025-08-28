import { Node } from "../tree_sitter/node.js"

export const _shadows = {}
export class BaseNode {
    // type = ""
    // typeId = 0
    // startPosition = 0
    // startIndex = 0
    // endPosition = 0
    // startIndex = 0
    // endIndex = 0
    // indent = ""

    constructor(data) {
        Object.assign(this, data)
    }
    
    /** @type {number} */
    get depth() {
        if (this._depth == null) {
            if (this.parent == null) {
                this._depth = 0
            } else {
                this._depth = this.parent.depth + 1
            }
        }
        return this._depth
    }
    
    /** @type {number} */
    get length() {
        return this.children?.length||0
    }
    
    *[Symbol.iterator]() {
        yield* this.children||[]
    }
    
    get hasChildren() {
        return (this.children?.length || 0) > 0
    }
    
    get hardChildren() {
        return (this.children||[]).filter(each=>each instanceof Node)
    }

    get fields() {
        return {}
    }
    
    get fieldNames() {
        return []
    }
    
    /** @type {string} */
    get indent() {
        return this.tree.codeString.match(new RegExp(`^(?:.*\\r?\\n){${this.startPosition.row}}(\\s*)`))[1]
        // equivalent but usually faster than:
        // return this.tree.codeString.split("\n")[this.startPosition.row].match(/^\s*/)[0]
    }
    
    /** @type {Object} */
    toJSON() {
        const optionalData = {}
        if (this.children?.length) {
            return {
                type: this.type,
                typeId: this.typeId,
                fieldNames: this.fieldNames,
                startPosition: this.startPosition,
                startIndex: this.startIndex,
                endPosition: this.endPosition,
                startIndex: this.startIndex,
                endIndex: this.endIndex,
                indent: this.indent,
                ...optionalData,
                children: this.children.map(each=>each.toJSON()),
            }
        } else {
            return {
                type: this.type,
                typeId: this.typeId,
                fieldNames: this.fieldNames,
                startPosition: this.startPosition,
                startIndex: this.startIndex,
                endPosition: this.endPosition,
                startIndex: this.startIndex,
                endIndex: this.endIndex,
                indent: this.indent,
                ...optionalData,
                text: this.text,
                children: [],
            }
        }
    }

    [Symbol.for("Deno.customInspect")](inspect, options) {
        const optional = {}
        let text
        try {
            text = this.text
        } catch (error) {
            text = undefined
        }
        if (text == undefined) {
            return this
        }
        return inspect(
            {
                '': text.length < 60 ? text : text.slice(0, 30) + "..." + text.slice(-27),
                type: this.type,
                typeId: this.typeId,
                fieldNames: this.fieldNames,
                startPosition: this.startPosition,
                startIndex: this.startIndex,
                endPosition: this.endPosition,
                startIndex: this.startIndex,
                endIndex: this.endIndex,
                indent: this.indent,
                ...optional,
                hasChildren: this.hasChildren,
                children: [...(this.children || [])],
            },
            options
        )
    }
    *iterFlattened() {
        
    }
    flattened() {
        return []
    }
    
    /**
     * Destroy the children of this node and replace the .text of this node with the given string.
     * 
     * @param {string} replacement - description
     */
    replaceInnards(replacement) {
        const tree = this.tree
        const sourceCode = this.tree.codeString
        const node = _shadows[this.id] || this
        // clear out children (innards) because of replacement
        node._children = []
        node._fields = {}
        // get the node position info
        const {
            startPosition: originalStart,
            endPosition: originalEnd,
            startIndex: originalStartIndex,
            endIndex: originalEndIndex,
        } = node

        // compute what the new row-column will be
        const newNumberOfLines = replacement.match(/\n/g)?.length || 0
        let newEndCol = originalStart.column;
        if (newNumberOfLines == 0) {
            newEndCol = originalStart.column + replacement.length
        } else {
            newEndCol = replacement.split("\n").slice(-1)[0].length
        }
        // updates all the indices of all the nodes
        tree.edit({
            startIndex: originalStartIndex,
            oldEndIndex: originalEndIndex,
            newEndIndex: originalStartIndex + replacement.length,
            startPosition: originalStart,
            oldEndPosition: originalEnd,
            newEndPosition: { row: originalStart.row + newNumberOfLines, column: newEndCol },
        })

        this.tree.codeString = sourceCode.slice(0, originalStartIndex) + replacement + sourceCode.slice(originalEndIndex)
    }
}