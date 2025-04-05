import { WhitespaceNode } from "./whitespace_node.js"
import { SoftTextNode } from "./soft_text_node.js"

// flatNodeList
export const addSoftNodes = ({tree, string})=>{
    const rootNode = tree.rootNode
    rootNode.rootLeadingWhitespace = string.slice(0,tree.rootNode.startIndex)
    rootNode.indent = (rootNode.rootLeadingWhitespace.split("\n")||[""]).slice(-1)[0]
    // get the indent of the root
    let indent = rootNode.indent
    // mutate nodes
    for (const eachNode of tree.rootNode.iterFlatten()) {
        if (eachNode.hasChildren) {
            const newChildren = []
            const childrenCopy = [...eachNode.children]
            let firstChild = childrenCopy.shift()
            // preceding whitespace
            if (eachNode.startIndex != firstChild.startIndex) {
                const gapText = string.slice(eachNode.startIndex, firstChild.startIndex)
                if (gapText.match(/^\s*$/)) {
                    const whitespaceText = gapText
                    if (whitespaceText.match(/\n/)) {
                        indent = whitespaceText.split(/\n/).slice(-1)[0]
                    }
                    newChildren.push(new WhitespaceNode({
                        text: whitespaceText,
                        startIndex: eachNode.startIndex,
                        endIndex: firstChild.startIndex,
                        indent,
                        children: [],
                        parent: eachNode,
                    }))
                // sometimes the gap isn't always whitespace
                } else {
                    newChildren.push(new TextNode({
                        text: gapText,
                        startIndex: eachNode.startIndex,
                        endIndex: firstChild.startIndex,
                        indent,
                        children: [],
                        parent: eachNode,
                    }))
                }
            }
            firstChild.indent = indent
            newChildren.push(firstChild)
            // gaps between sibilings
            let prevChild = firstChild
            for (const eachSecondaryNode of childrenCopy) {
                if (prevChild.endIndex != eachSecondaryNode.startIndex) {
                    const gapText = string.slice(prevChild.endIndex, eachSecondaryNode.startIndex)
                    if (gapText.match(/^\s*$/)) {
                        const whitespaceText = gapText
                        if (whitespaceText.match(/\n/)) {
                            indent = whitespaceText.split(/\n/).slice(-1)[0]
                        }
                        newChildren.push(new WhitespaceNode({
                            text: whitespaceText,
                            startIndex: prevChild.startIndex,
                            endIndex: eachSecondaryNode.startIndex,
                            indent,
                            children: [],
                            parent: eachNode,
                        }))
                    // sometimes the gap isn't always whitespace
                    } else {
                        newChildren.push(new SoftTextNode({
                            text: gapText,
                            startIndex: prevChild.startIndex,
                            endIndex: eachSecondaryNode.startIndex,
                            indent,
                            children: [],
                            parent: eachNode,
                        }))
                    }
                }
                eachSecondaryNode.indent = indent
                newChildren.push(eachSecondaryNode)
                prevChild = eachSecondaryNode
            }
            
            // 
            // inject whitespace "nodes"
            // 
            eachNode._children = newChildren
        }
    }
    return tree
}