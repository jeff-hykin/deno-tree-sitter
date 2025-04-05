const quoteIfNeeded = (word)=>{
    if (word.match(/[a-zA-Z0-9]+/)) {
        return word
    } else {
        return JSON.stringify(word)
    }
}

/**
 * helpful for visualizing the AST
 *
 * @example
 * ```js
 * const tree = parser.parse({
 *     string: `
 *         function thing(arg1) {
 *             let a = 10
 *         }
 *     `,
 *     withWhitespace: false,
 * })
 * console.log(xmlStylePreview(tree.rootNode))
 * // <program>
 * //     <function_declaration>
 * //         <function text="function" />
 * //         <identifier text="thing" />
 * //         <formal_parameters>
 * //             <"(" text="(" />
 * //             <identifier text="arg1" />
 * //             <")" text=")" />
 * //         </formal_parameters>
 * //         <statement_block>
 * //             <"{" text="{" />
 * //             <lexical_declaration>
 * //                 <let text="let" />
 * //                 <variable_declarator>
 * //                     <identifier text="a" />
 * //                     <"=" text="=" />
 * //                     <number text="10" />
 * //                 </variable_declarator>
 * //             </lexical_declaration>
 * //             <"}" text="}" />
 * //         </statement_block>
 * //     </function_declaration>
 * // </program>
 * ```
 *
 * @param {Node} startNode - 
 * @param {Object} options - 
 * @param {Boolean} options.alwaysShowTextAttr - parent nodes will get a text attribute (NOTE: it can be massive for large trees)
 * @returns {String} output - html-like formatted string of the AST
 */
export function xmlStylePreview(startNode, { alwaysShowTextAttr = false } = {}) {
    // 
    // usage
    // 
    let output = ""
    let indent = ""
    for (const [ parents, node, direction ] of startNode.traverse()) {
        if (direction == "-") {
            output += indent+`<${quoteIfNeeded(node.type)} text=${JSON.stringify(node.text)} />\n`
        } else {
            if (direction == "->") {
                if (alwaysShowTextAttr) {
                    output += indent+`<${quoteIfNeeded(node.type)} text=${JSON.stringify(node.text)} />\n`
                } else {
                    output += indent+`<${quoteIfNeeded(node.type)}>\n`
                }
                indent += "    "
            } else if (direction == "<-") {
                indent = indent.slice(0,-4)
                output += indent+`</${quoteIfNeeded(node.type)}>\n`
            }
        }
    }
    return output
}