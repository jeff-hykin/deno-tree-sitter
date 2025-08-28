import createModule from "../wasm_loader_with_defaults.js"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {} from "./parser.js"

export let Module = null

/**
 * @internal
 *
 * Initialize the Tree-sitter Wasm module. This should only be called by the {@link Parser} class via {@link Parser.init}.
 */
export async function initializeBinding(moduleOptions) {
    if (!Module) {
        Module = await createModule(moduleOptions)
    }
    return Module
}

/**
 * @internal
 *
 * Checks if the Tree-sitter Wasm module has been initialized.
 */
export function checkModule() {
    return !!Module
}
