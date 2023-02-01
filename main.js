import Parser as ParserClass from "./web_tree_sitter.js"

let hasBeenInitilizedAtLeastOnce = false
export const Parser = (...args)=>ParserClass.init(...args).then(_=>{
    hasBeenInitilizedAtLeastOnce = true
    return new ParserClass()
})

export const parserFromWasm = async (wasmUint8ArrayOrFilePath)=>{
    if (!hasBeenInitilizedAtLeastOnce) {
        await ParserClass.init()
    }
    let bytes = wasmUint8ArrayOrFilePath
    if (typeof wasmUint8ArrayOrFilePath == 'string') {
        bytes = await Deno.readFile(wasmUint8ArrayOrFilePath)
    }
    const language = await ParserClass.Language.load(bytes)
    const parser = new ParserClass()
    parser.setLanguage(language)
    return parser
}