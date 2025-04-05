import {} from "../wasm_loader_with_defaults.js"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {} from "./parser.js"

/**
 * A position in a multi-line text document, in terms of rows and columns.
 *
 * Rows and columns are zero-based.
 */
/**
 *  A range of positions in a multi-line text document, both in terms of bytes
 *  and of rows and columns.
 */
/**
 * A summary of a change to a text document.
 */
/** @internal */
export const SIZE_OF_SHORT = 2

/** @internal */
export const SIZE_OF_INT = 4

/** @internal */
export const SIZE_OF_CURSOR = 4 * SIZE_OF_INT

/** @internal */
export const SIZE_OF_NODE = 5 * SIZE_OF_INT

/** @internal */
export const SIZE_OF_POINT = 2 * SIZE_OF_INT

/** @internal */
export const SIZE_OF_RANGE = 2 * SIZE_OF_INT + 2 * SIZE_OF_POINT

/** @internal */
export const ZERO_POINT = { row: 0, column: 0 }

/**
 * A callback for parsing that takes an index and point, and should return a string.
 */
/**
 * A callback that receives the parse state during parsing.
 */
/**
 * A callback for logging messages.
 *
 * If `isLex` is `true`, the message is from the lexer, otherwise it's from the parser.
 */
// Helper type for internal use
/** @internal */
export const INTERNAL = Symbol("INTERNAL")
/** @internal */
// Helper functions for type checking
/** @internal */
export function assertInternal(x) {
    if (x !== INTERNAL) throw new Error("Illegal constructor")
}

/** @internal */
export function isPoint(point) {
    return !!point && typeof point.row === "number" && typeof point.column === "number"
}

/**
 * @internal
 *
 * Sets the Tree-sitter WASM module. This should only be called by the {@link Parser} class via {@link Parser.init}.
 */
export function setModule(module) {
    C = module
}

/**
 * @internal
 *
 * `C` is a convenient shorthand for the Tree-sitter WASM module,
 * which allows us to call all of the exported functions.
 */
export let C
