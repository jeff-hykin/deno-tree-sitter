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