import ParserClass from "./tree_sitter.js"
import { Node } from "./tree_sitter.js" 
await ParserClass.init()

// modyify the .parse method to handle "withWhitespace"
const realParseFunction = ParserClass.prototype.parse
ParserClass.prototype.parse = function(arg1, oldTree, options) {
    let stringArg
    if (typeof arg1 == 'string') {
        stringArg = arg1
    } else {
        stringArg = arg1?.string
    }
    let withWhitespace = arg1?.withWhitespace
    
    let tree = realParseFunction.apply(this, [stringArg, oldTree, options])
    if (withWhitespace) {
        tree = addWhitespaceNodes({
            tree: realParseFunction.apply(this, [stringArg, oldTree, options]),
            string: arg1?.string,
        })
    }
    // attach parse function
    tree.parse = (newString,newOptions) => this.parse(newString, tree, newOptions||options)
    return tree
}

export const Parser = (...args)=>{
    ParserClass.init(...args)
    return new ParserClass()
}


/**
 * Create a parser
 *
 * @returns {ParserClass} output 
 *
 */
export const parserFromWasm = async (wasmUint8ArrayOrFilePath)=>{
    const language = await ParserClass.Language.load(wasmUint8ArrayOrFilePath)
    const parser = new ParserClass()
    parser.setLanguage(language)
    return parser
}

export function flatNodeList(node) {
    return [ node, ...(node.children||[]).map(flatNodeList) ].flat(Infinity)
}

export class TextNode extends Node {
    constructor({parent, ...data}) {
        super({...data, type: "text", typeId: -2})
        this._parent = parent
    }
    get parent() {
        return this._parent
    }
}
export class WhitespaceNode extends Node {
    constructor({parent, ...data}) {
        super({...data, type: "whitespace", typeId: -1})
        this._parent = parent
    }
    get parent() {
        return this._parent
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
                        newChildren.push(new TextNode({
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

// from npm html-escaper
var escapeHtml;
{
    var { replace: c } = "";
    var o = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
    var s = /[&<>'"]/g;
    var a = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
    var e = (t) => a[t];
    escapeHtml = (str) => c.call(str, s, e);
}

/**
 * style text based on tree-sitter parsing rules
 *
 * @description
 * make sure to test queries withthe plaground!
 * https://tree-sitter.github.io/tree-sitter/playground
 * 
 * @example
 * ```js
 * import { Parser, parserFromWasm, applyThemeGetHtml } from "https://deno.land/x/deno_tree_sitter@0.2.1.0/main.js"
 * import bash from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/676ffa3b93768b8ac628fd5c61656f7dc41ba413/main/bash.js"
 * 
 * const string = "echo hello 'world'";
 * const parser = await parserFromWasm(bash)
 * const output = applyThemeGetHtml({
 *     themeRules: [
 *         { query: `(word) @target`, style: `color:salmon; font-weight:bold;`, class: "animate-pulse" },
 *         // bottom takes priority! top is just a fallback
 *         { query: `(command_name (word) @target)`, style: `color:aqua; font-weight:bold;` },
 *     ],
 *     tree: parser.parse(string),
 *     string: string,
 * });
 * 
 * console.log(output)
 * 
 * ```
 *
 * @param arg1.themeRules - list of objects { query, style, class }
 * @param arg1.tree - a tree-sitter tree of the string
 * @param arg1.string - the original string that was fed to the tree-sitter parser
 * @returns {String} output - html string of styled text
 *
 */
export const applyThemeGetHtml = ({ themeRules, tree, string }) => {
    const { rootNode } = addWhitespaceNodes({ string, tree });
    const spliceStarts = {};
    const spliceEnds = {};
    let priority = 0;
    for (const { query, style, class: classNames } of themeRules) {
        priority++;
        const targets = rootNode.quickQuery(query).map((each) => each.target);
        for (const { startIndex, endIndex } of targets) {
            if (spliceStarts[startIndex] == null) {
                spliceStarts[startIndex] = [];
            }
            if (spliceEnds[endIndex] == null) {
                spliceEnds[endIndex] = [];
            }
            spliceStarts[startIndex].push([[style, classNames], priority]);
            spliceEnds[endIndex].push([[style, classNames], startIndex - 0, priority]);
        }
    }
    const splicePoints = [...new Set(Object.keys(spliceStarts).concat(Object.keys(spliceEnds)))];
    splicePoints.sort((a, b) => a - b);

    // console.debug(`spliceStarts is:`, spliceStarts);
    // console.debug(`spliceEnds is:`, spliceEnds);
    let innerHtml = string.slice(0, splicePoints[0]);
    let prevSlicePoint = splicePoints[0];
    // console.debug(`string is:`, string);
    // console.debug(`splicePoints is:`, splicePoints);
    let priorityStack = [0];
    let activated = {};
    for (const eachSplicePoint of splicePoints) {
        // prev string value
        const chunk = escapeHtml(string.slice(prevSlicePoint, eachSplicePoint));
        if (chunk.length != 0) {
            innerHtml += `<p>${chunk}</p>`;
        }
        // console.debug(`eachSplicePoint is:`, eachSplicePoint);
        // console.debug(`    spliceEnds[eachSplicePoint] is:`, spliceEnds[eachSplicePoint]);
        // close first
        if (spliceEnds[eachSplicePoint] instanceof Array && spliceEnds[eachSplicePoint].length > 0) {
            for (const [styleAndClass, startIndex, eachPriority] of spliceEnds[eachSplicePoint]) {
                const id = JSON.stringify([styleAndClass, startIndex - 0, eachPriority]);
                // console.debug(`        style is:`, style);
                // console.debug(`        id is:`, id);
                // console.debug(`        activated[id] is:`, activated[id]);
                if (activated[id]) {
                    innerHtml += `</span>`;
                    priorityStack.pop();
                    delete activated[id];
                }
            }
        }
        // console.debug(`spliceStarts[eachSplicePoint] is:`, spliceStarts[eachSplicePoint]);
        // then open
        if (spliceStarts[eachSplicePoint] instanceof Array && spliceStarts[eachSplicePoint].length > 0) {
            // the .reverse() causes highest priority to be checked first
            for (const [styleAndClass, eachPriority] of spliceStarts[eachSplicePoint].reverse()) {
                const [style, classNames] = styleAndClass;
                let activePriority = priorityStack.slice(-1)[0];
                if (eachPriority > activePriority) {
                    priorityStack.push(eachPriority);
                    innerHtml += `<span style="${escapeHtml(style)}" class="${escapeHtml(
                        classNames||""
                    )}">`;
                    let id = JSON.stringify([styleAndClass, eachSplicePoint - 0, eachPriority]);
                    // console.debug(`    +id is:`, id);
                    activated[id] = true;
                }
            }
        }
        // console.debug(`chunk is:`, string.slice(prevSlicePoint, eachSplicePoint));

        prevSlicePoint = eachSplicePoint;
    }
    innerHtml += `<p>${escapeHtml(string.slice(prevSlicePoint))}</p>`
    return innerHtml;
}


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
                    output += indent+`<${quoteIfNeeded(node.type)} text=${JSON.stringify(node.text)} indent=${JSON.stringify(node.indent)} />\n`
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