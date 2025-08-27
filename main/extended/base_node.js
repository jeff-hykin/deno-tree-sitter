import { Node } from "../tree_sitter/node.js"

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

    get length() {
        return this.children?.length
    }
    
    *[Symbol.iterator]() {
        yield* this.children
    }
    
    get hasChildren() {
        return (this.children?.length || 0) > 0
    }
    
    get hardChildren() {
        return this.children.filter(each=>each instanceof Node)
    }

    get fields() {
        return {}
    }
    
    get fieldNames() {
        return []
    }
    
    get indent() {
        // only works if the tree's source is a string
        if (typeof this.tree?._codeOrCallback == "string") {
            return this.tree._codeOrCallback.split("\n")[this.startPosition.row].match(/^\s*/)[0]
        }
    }
    
    toJSON() {
        const optionalData = {}
        if (typeof this.rootLeadingWhitespace == 'string') {
            optionalData.rootLeadingWhitespace = this.rootLeadingWhitespace
        }
        if (this.children && this.children.length) {
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
        if (typeof this.rootLeadingWhitespace == "string") {
            optional.rootLeadingWhitespace = this.rootLeadingWhitespace
        }
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
}