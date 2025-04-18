import { INTERNAL, assertInternal, SIZE_OF_NODE, SIZE_OF_INT, SIZE_OF_RANGE, C } from "./constants.js"
import { Language } from "./language.js"
import { Node } from "./node.js"
import { TreeCursor } from "./tree_cursor.js"
import { marshalEdit, marshalPoint, unmarshalNode, unmarshalRange } from "./marshal.js"
import { TRANSFER_BUFFER } from "./parser.js"

/** @internal */
export function getText(tree, startIndex, endIndex, startPosition) {
    const length = endIndex - startIndex
    let result = tree.textCallback(startIndex, startPosition)
    if (result) {
        startIndex += result.length
        while (startIndex < endIndex) {
            const string = tree.textCallback(startIndex, startPosition)
            if (string && string.length > 0) {
                startIndex += string.length
                result += string
            } else {
                break
            }
        }
        if (startIndex > endIndex) {
            result = result.slice(0, length)
        }
    }
    return result ?? ""
}

/** A tree that represents the syntactic structure of a source code file. */
export class Tree {
    /** @internal */
    [0] = 0 // Internal handle for WASM

    /** @internal */
    textCallback

    /** The language that was used to parse the syntax tree. */
    language

    /** @internal */
    constructor(internal, address, language, textCallback) {
        assertInternal(internal)
        this[0] = address
        this.language = language
        this.textCallback = textCallback
    }

    /** Create a shallow copy of the syntax tree. This is very fast. */
    copy() {
        const address = C._ts_tree_copy(this[0])
        return new Tree(INTERNAL, address, this.language, this.textCallback)
    }

    /** Delete the syntax tree, freeing its resources. */
    delete() {
        C._ts_tree_delete(this[0])
        this[0] = 0
    }

    /** Get the root node of the syntax tree. */
    get rootNode() {
        C._ts_tree_root_node_wasm(this[0])
        return unmarshalNode(this)
    }

    /**
     * Get the root node of the syntax tree, but with its position shifted
     * forward by the given offset.
     */
    rootNodeWithOffset(offsetBytes, offsetExtent) {
        const address = TRANSFER_BUFFER + SIZE_OF_NODE
        C.setValue(address, offsetBytes, "i32")
        marshalPoint(address + SIZE_OF_INT, offsetExtent)
        C._ts_tree_root_node_with_offset_wasm(this[0])
        return unmarshalNode(this)
    }

    /**
     * Edit the syntax tree to keep it in sync with source code that has been
     * edited.
     *
     * You must describe the edit both in terms of byte offsets and in terms of
     * row/column coordinates.
     */
    edit(edit) {
        marshalEdit(edit)
        C._ts_tree_edit_wasm(this[0])
    }

    /** Create a new {@link TreeCursor} starting from the root of the tree. */
    walk() {
        return this.rootNode.walk()
    }

    /**
     * Compare this old edited syntax tree to a new syntax tree representing
     * the same document, returning a sequence of ranges whose syntactic
     * structure has changed.
     *
     * For this to work correctly, this syntax tree must have been edited such
     * that its ranges match up to the new tree. Generally, you'll want to
     * call this method right after calling one of the [`Parser::parse`]
     * functions. Call it on the old tree that was passed to parse, and
     * pass the new tree that was returned from `parse`.
     */
    getChangedRanges(other) {
        if (!(other instanceof Tree)) {
            throw new TypeError("Argument must be a Tree")
        }

        C._ts_tree_get_changed_ranges_wasm(this[0], other[0])
        const count = C.getValue(TRANSFER_BUFFER, "i32")
        const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32")
        const result = new Array(count)

        if (count > 0) {
            let address = buffer
            for (let i = 0; i < count; i++) {
                result[i] = unmarshalRange(address)
                address += SIZE_OF_RANGE
            }
            C._free(buffer)
        }
        return result
    }

    /** Get the included ranges that were used to parse the syntax tree. */
    getIncludedRanges() {
        C._ts_tree_included_ranges_wasm(this[0])
        const count = C.getValue(TRANSFER_BUFFER, "i32")
        const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32")
        const result = new Array(count)

        if (count > 0) {
            let address = buffer
            for (let i = 0; i < count; i++) {
                result[i] = unmarshalRange(address)
                address += SIZE_OF_RANGE
            }
            C._free(buffer)
        }
        return result
    }
}
