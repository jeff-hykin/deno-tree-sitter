import ParserClass from "./web_tree_sitter.js"

// this is to get around .parse being unwritable by default
class ParserWrapper extends ParserClass {
    parse = ParserClass.prototype.parse
}

let hasBeenInitilizedAtLeastOnce = false
export const Parser = (...args)=>ParserClass.init(...args).then(_=>{
    hasBeenInitilizedAtLeastOnce = true
    return new ParserClass()
})

/**
 * Create a parser
 *
 * @returns {ParserClass} output 
 *
 */
export const parserFromWasm = async (wasmUint8ArrayOrFilePath)=>{
    if (!hasBeenInitilizedAtLeastOnce) {
        await ParserClass.init()
    }
    let bytes = wasmUint8ArrayOrFilePath
    if (typeof wasmUint8ArrayOrFilePath == 'string') {
        bytes = await Deno.readFile(wasmUint8ArrayOrFilePath)
    }
    const language = await ParserClass.Language.load(bytes)
    const parser = new ParserWrapper()
    parser.setLanguage(language)
    const realParceFunction = parser.parse.bind(parser)
    
    /**
     * parse
     *
     * @example
     *     var tree = parser.parse("blah blah")
     *     var treeWithWhitespace = parser.parse({string: "blah blah", withWhitespace: true })
     *     // for efficient updates (see tree.edit() documentation)
     *     var parser.parse(newSourceCode, tree)
     *     // for Custom Data Structure (see full docs)
     *     var tree = parser.parse((index, position) => line.slice(position.column))
     * 
     * @returns output - a Tree object
     *
     */
    parser.parse = (arg1, ...args)=>{
        if (arg1.withWhitespace) {
            return addWhitespaceNodes({
                tree: realParceFunction(arg1.string, ...args),
                string: arg1.string,
            })
        }
        return realParceFunction(typeof arg1.string == 'string' ? : arg1.string)
    }
    return parser
}

export function flatNodeList(node) {
    return [ node, ...(node.children||[]).map(flatNodeList) ].flat(Infinity)
}

class WhitespaceNode {
    constructor(data) {
        Object.assign(this, data)
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
}
export const addWhitespaceNodes = ({tree, string})=>{
    const rootNode = tree.rootNode
    Object.defineProperties(tree, {
        rootNode: {
            configurable: true,
            get() {
                return rootNode
            }
        },
    })
    const allNodes = flatNodeList(tree.rootNode)
    rootNode.rootLeadingWhitespace = string.slice(0,tree.rootNode.startIndex)
    rootNode.indent = (rootNode.rootLeadingWhitespace.split("\n")||[""]).slice(-1)[0]
    // get the indent of the root
    let indent = rootNode.indent
    // mutate nodes
    for (const eachNode of allNodes) {
        if (eachNode.hasChildren) {
            const newChildren = []
            const childrenCopy = [...eachNode.children]
            let firstChild = childrenCopy.shift()
            // preceding whitespace
            if (eachNode.startIndex != firstChild.startIndex) {
                const whitespaceText = string.slice(eachNode.startIndex, firstChild.startIndex)
                if (whitespaceText.match(/\n/)) {
                    indent = whitespaceText.split(/\n/).slice(-1)[0]
                }
                newChildren.push(new WhitespaceNode({
                    typeId: -1,
                    type: "whitespace",
                    text: whitespaceText,
                    startIndex: eachNode.startIndex,
                    endIndex: firstChild.startIndex,
                    indent,
                    hasChildren: false,
                    children: [],
                }))
            }
            firstChild.indent = indent
            newChildren.push(firstChild)
            // gaps between sibilings
            let prevChild = firstChild
            for (const eachSecondaryNode of childrenCopy) {
                if (prevChild.endIndex != eachSecondaryNode.startIndex) {
                    const whitespaceText = string.slice(prevChild.endIndex, eachSecondaryNode.startIndex)
                    if (whitespaceText.match(/\n/)) {
                        indent = whitespaceText.split(/\n/).slice(-1)[0]
                    }
                    newChildren.push(new WhitespaceNode({
                        typeId: -1,
                        type: "whitespace",
                        text: whitespaceText,
                        startIndex: prevChild.endIndex,
                        endIndex: eachSecondaryNode.startIndex,
                        indent,
                        hasChildren: false,
                        children: [],
                    }))
                }
                eachSecondaryNode.indent = indent
                newChildren.push(eachSecondaryNode)
                prevChild = eachSecondaryNode
            }
            
            // 
            // inject whitespace "nodes"
            // 
            Object.defineProperties(eachNode, {
                children: {
                    configurable: true,
                    get() {
                        return newChildren
                    },
                },
            })
        }
    }
    return tree
}