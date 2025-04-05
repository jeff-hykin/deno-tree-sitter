import loader from "./wasm_loader.js"

// just loads the local wasm
export default async ({wasmBinary, wasmBinaryFilePath, ...args}={})=>{
    if (wasmBinary == null && wasmBinaryFilePath == null) {
        wasmBinary = (await import("./tree_sitter_wasm.js")).default
    }
    return loader({...args, wasmBinary, wasmBinaryFilePath})
}