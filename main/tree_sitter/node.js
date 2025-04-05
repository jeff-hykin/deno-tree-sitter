import { INTERNAL, assertInternal, SIZE_OF_INT, SIZE_OF_NODE, SIZE_OF_POINT, ZERO_POINT, isPoint, C } from "./constants.js"
import { getText, Tree } from "./tree.js"
import { TreeCursor } from "./tree_cursor.js"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Language } from "./language.js"
import { marshalNode, marshalPoint, unmarshalNode, unmarshalPoint } from "./marshal.js"
import { TRANSFER_BUFFER } from "./parser.js"

/** A single node within a syntax {@link Tree}. */
export class Node {
    /** @internal */
    [0] = 0 // Internal handle for WASM

    /** @internal */
    _children

    /** @internal */
    _namedChildren

    /** @internal */
    constructor(internal, { id, tree, startIndex, startPosition, other }) {
        assertInternal(internal)
        this[0] = other
        this.id = id
        this.tree = tree
        this.startIndex = startIndex
        this.startPosition = startPosition
    }

    /**
     * The numeric id for this node that is unique.
     *
     * Within a given syntax tree, no two nodes have the same id. However:
     *
     * * If a new tree is created based on an older tree, and a node from the old tree is reused in
     *   the process, then that node will have the same id in both trees.
     *
     * * A node not marked as having changes does not guarantee it was reused.
     *
     * * If a node is marked as having changed in the old tree, it will not be reused.
     */
    id

    /** The byte index where this node starts. */
    startIndex

    /** The position where this node starts. */
    startPosition

    /** The tree that this node belongs to. */
    tree

    /** Get this node's type as a numerical id. */
    get typeId() {
        marshalNode(this)
        return C._ts_node_symbol_wasm(this.tree[0])
    }

    /**
     * Get the node's type as a numerical id as it appears in the grammar,
     * ignoring aliases.
     */
    get grammarId() {
        marshalNode(this)
        return C._ts_node_grammar_symbol_wasm(this.tree[0])
    }

    /** Get this node's type as a string. */
    get type() {
        return this.tree.language.types[this.typeId] || "ERROR"
    }

    /**
     * Get this node's symbol name as it appears in the grammar, ignoring
     * aliases as a string.
     */
    get grammarType() {
        return this.tree.language.types[this.grammarId] || "ERROR"
    }

    /**
     * Check if this node is *named*.
     *
     * Named nodes correspond to named rules in the grammar, whereas
     * *anonymous* nodes correspond to string literals in the grammar.
     */
    get isNamed() {
        marshalNode(this)
        return C._ts_node_is_named_wasm(this.tree[0]) === 1
    }

    /**
     * Check if this node is *extra*.
     *
     * Extra nodes represent things like comments, which are not required
     * by the grammar, but can appear anywhere.
     */
    get isExtra() {
        marshalNode(this)
        return C._ts_node_is_extra_wasm(this.tree[0]) === 1
    }

    /**
     * Check if this node represents a syntax error.
     *
     * Syntax errors represent parts of the code that could not be incorporated
     * into a valid syntax tree.
     */
    get isError() {
        marshalNode(this)
        return C._ts_node_is_error_wasm(this.tree[0]) === 1
    }

    /**
     * Check if this node is *missing*.
     *
     * Missing nodes are inserted by the parser in order to recover from
     * certain kinds of syntax errors.
     */
    get isMissing() {
        marshalNode(this)
        return C._ts_node_is_missing_wasm(this.tree[0]) === 1
    }

    /** Check if this node has been edited. */
    get hasChanges() {
        marshalNode(this)
        return C._ts_node_has_changes_wasm(this.tree[0]) === 1
    }

    /**
     * Check if this node represents a syntax error or contains any syntax
     * errors anywhere within it.
     */
    get hasError() {
        marshalNode(this)
        return C._ts_node_has_error_wasm(this.tree[0]) === 1
    }

    /** Get the byte index where this node ends. */
    get endIndex() {
        marshalNode(this)
        return C._ts_node_end_index_wasm(this.tree[0])
    }

    /** Get the position where this node ends. */
    get endPosition() {
        marshalNode(this)
        C._ts_node_end_point_wasm(this.tree[0])
        return unmarshalPoint(TRANSFER_BUFFER)
    }

    /** Get the string content of this node. */
    get text() {
        return getText(this.tree, this.startIndex, this.endIndex, this.startPosition)
    }

    /** Get this node's parse state. */
    get parseState() {
        marshalNode(this)
        return C._ts_node_parse_state_wasm(this.tree[0])
    }

    /** Get the parse state after this node. */
    get nextParseState() {
        marshalNode(this)
        return C._ts_node_next_parse_state_wasm(this.tree[0])
    }

    /** Check if this node is equal to another node. */
    equals(other) {
        return this.tree === other.tree && this.id === other.id
    }

    /**
     * Get the node's child at the given index, where zero represents the first child.
     *
     * This method is fairly fast, but its cost is technically log(n), so if
     * you might be iterating over a long list of children, you should use
     * {@link Node#children} instead.
     */
    child(index) {
        marshalNode(this)
        C._ts_node_child_wasm(this.tree[0], index)
        return unmarshalNode(this.tree)
    }

    /**
     * Get this node's *named* child at the given index.
     *
     * See also {@link Node#isNamed}.
     * This method is fairly fast, but its cost is technically log(n), so if
     * you might be iterating over a long list of children, you should use
     * {@link Node#namedChildren} instead.
     */
    namedChild(index) {
        marshalNode(this)
        C._ts_node_named_child_wasm(this.tree[0], index)
        return unmarshalNode(this.tree)
    }

    /**
     * Get this node's child with the given numerical field id.
     *
     * See also {@link Node#childForFieldName}. You can
     * convert a field name to an id using {@link Language#fieldIdForName}.
     */
    childForFieldId(fieldId) {
        marshalNode(this)
        C._ts_node_child_by_field_id_wasm(this.tree[0], fieldId)
        return unmarshalNode(this.tree)
    }

    /**
     * Get the first child with the given field name.
     *
     * If multiple children may have the same field name, access them using
     * {@link Node#childrenForFieldName}.
     */
    childForFieldName(fieldName) {
        const fieldId = this.tree.language.fields.indexOf(fieldName)
        if (fieldId !== -1) return this.childForFieldId(fieldId)
        return null
    }

    /** Get the field name of this node's child at the given index. */
    fieldNameForChild(index) {
        marshalNode(this)
        const address = C._ts_node_field_name_for_child_wasm(this.tree[0], index)
        if (!address) return null
        return C.AsciiToString(address)
    }

    /** Get the field name of this node's named child at the given index. */
    fieldNameForNamedChild(index) {
        marshalNode(this)
        const address = C._ts_node_field_name_for_named_child_wasm(this.tree[0], index)
        if (!address) return null
        return C.AsciiToString(address)
    }
    /**
     * Get an array of this node's children with a given field name.
     *
     * See also {@link Node#children}.
     */
    childrenForFieldName(fieldName) {
        const fieldId = this.tree.language.fields.indexOf(fieldName)
        if (fieldId !== -1 && fieldId !== 0) return this.childrenForFieldId(fieldId)
        return []
    }

    /**
     * Get an array of this node's children with a given field id.
     *
     * See also {@link Node#childrenForFieldName}.
     */
    childrenForFieldId(fieldId) {
        marshalNode(this)
        C._ts_node_children_by_field_id_wasm(this.tree[0], fieldId)
        const count = C.getValue(TRANSFER_BUFFER, "i32")
        const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32")
        const result = new Array(count)

        if (count > 0) {
            let address = buffer
            for (let i = 0; i < count; i++) {
                result[i] = unmarshalNode(this.tree, address)
                address += SIZE_OF_NODE
            }
            C._free(buffer)
        }
        return result
    }

    /** Get the node's first child that contains or starts after the given byte offset. */
    firstChildForIndex(index) {
        marshalNode(this)
        const address = TRANSFER_BUFFER + SIZE_OF_NODE
        C.setValue(address, index, "i32")
        C._ts_node_first_child_for_byte_wasm(this.tree[0])
        return unmarshalNode(this.tree)
    }

    /** Get the node's first named child that contains or starts after the given byte offset. */
    firstNamedChildForIndex(index) {
        marshalNode(this)
        const address = TRANSFER_BUFFER + SIZE_OF_NODE
        C.setValue(address, index, "i32")
        C._ts_node_first_named_child_for_byte_wasm(this.tree[0])
        return unmarshalNode(this.tree)
    }

    /** Get this node's number of children. */
    get childCount() {
        marshalNode(this)
        return C._ts_node_child_count_wasm(this.tree[0])
    }

    /**
     * Get this node's number of *named* children.
     *
     * See also {@link Node#isNamed}.
     */
    get namedChildCount() {
        marshalNode(this)
        return C._ts_node_named_child_count_wasm(this.tree[0])
    }

    /** Get this node's first child. */
    get firstChild() {
        return this.child(0)
    }

    /**
     * Get this node's first named child.
     *
     * See also {@link Node#isNamed}.
     */
    get firstNamedChild() {
        return this.namedChild(0)
    }

    /** Get this node's last child. */
    get lastChild() {
        return this.child(this.childCount - 1)
    }

    /**
     * Get this node's last named child.
     *
     * See also {@link Node#isNamed}.
     */
    get lastNamedChild() {
        return this.namedChild(this.namedChildCount - 1)
    }

    /**
     * Iterate over this node's children.
     *
     * If you're walking the tree recursively, you may want to use the
     * {@link TreeCursor} APIs directly instead.
     */
    get children() {
        if (!this._children) {
            marshalNode(this)
            C._ts_node_children_wasm(this.tree[0])
            const count = C.getValue(TRANSFER_BUFFER, "i32")
            const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32")
            this._children = new Array(count)
            if (count > 0) {
                let address = buffer
                for (let i = 0; i < count; i++) {
                    this._children[i] = unmarshalNode(this.tree, address)
                    address += SIZE_OF_NODE
                }
                C._free(buffer)
            }
        }
        return this._children
    }

    /**
     * Iterate over this node's named children.
     *
     * See also {@link Node#children}.
     */
    get namedChildren() {
        if (!this._namedChildren) {
            marshalNode(this)
            C._ts_node_named_children_wasm(this.tree[0])
            const count = C.getValue(TRANSFER_BUFFER, "i32")
            const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32")
            this._namedChildren = new Array(count)
            if (count > 0) {
                let address = buffer
                for (let i = 0; i < count; i++) {
                    this._namedChildren[i] = unmarshalNode(this.tree, address)
                    address += SIZE_OF_NODE
                }
                C._free(buffer)
            }
        }
        return this._namedChildren
    }

    /**
     * Get the descendants of this node that are the given type, or in the given types array.
     *
     * The types array should contain node type strings, which can be retrieved from {@link Language#types}.
     *
     * Additionally, a `startPosition` and `endPosition` can be passed in to restrict the search to a byte range.
     */
    descendantsOfType(types, startPosition = ZERO_POINT, endPosition = ZERO_POINT) {
        if (!Array.isArray(types)) types = [types]

        // Convert the type strings to numeric type symbols
        const symbols = []
        const typesBySymbol = this.tree.language.types
        for (const node_type of types) {
            if (node_type == "ERROR") {
                symbols.push(65535) // Internally, ts_builtin_sym_error is -1, which is UINT_16MAX
            }
        }
        for (let i = 0, n = typesBySymbol.length; i < n; i++) {
            if (types.includes(typesBySymbol[i])) {
                symbols.push(i)
            }
        }

        // Copy the array of symbols to the WASM heap
        const symbolsAddress = C._malloc(SIZE_OF_INT * symbols.length)
        for (let i = 0, n = symbols.length; i < n; i++) {
            C.setValue(symbolsAddress + i * SIZE_OF_INT, symbols[i], "i32")
        }

        // Call the C API to compute the descendants
        marshalNode(this)
        C._ts_node_descendants_of_type_wasm(this.tree[0], symbolsAddress, symbols.length, startPosition.row, startPosition.column, endPosition.row, endPosition.column)

        // Instantiate the nodes based on the data returned
        const descendantCount = C.getValue(TRANSFER_BUFFER, "i32")
        const descendantAddress = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32")
        const result = new Array(descendantCount)
        if (descendantCount > 0) {
            let address = descendantAddress
            for (let i = 0; i < descendantCount; i++) {
                result[i] = unmarshalNode(this.tree, address)
                address += SIZE_OF_NODE
            }
        }

        // Free the intermediate buffers
        C._free(descendantAddress)
        C._free(symbolsAddress)
        return result
    }

    /** Get this node's next sibling. */
    get nextSibling() {
        marshalNode(this)
        C._ts_node_next_sibling_wasm(this.tree[0])
        return unmarshalNode(this.tree)
    }

    /** Get this node's previous sibling. */
    get previousSibling() {
        marshalNode(this)
        C._ts_node_prev_sibling_wasm(this.tree[0])
        return unmarshalNode(this.tree)
    }

    /**
     * Get this node's next *named* sibling.
     *
     * See also {@link Node#isNamed}.
     */
    get nextNamedSibling() {
        marshalNode(this)
        C._ts_node_next_named_sibling_wasm(this.tree[0])
        return unmarshalNode(this.tree)
    }

    /**
     * Get this node's previous *named* sibling.
     *
     * See also {@link Node#isNamed}.
     */
    get previousNamedSibling() {
        marshalNode(this)
        C._ts_node_prev_named_sibling_wasm(this.tree[0])
        return unmarshalNode(this.tree)
    }

    /** Get the node's number of descendants, including one for the node itself. */
    get descendantCount() {
        marshalNode(this)
        return C._ts_node_descendant_count_wasm(this.tree[0])
    }

    /**
     * Get this node's immediate parent.
     * Prefer {@link Node#childWithDescendant} for iterating over this node's ancestors.
     */
    get parent() {
        marshalNode(this)
        C._ts_node_parent_wasm(this.tree[0])
        return unmarshalNode(this.tree)
    }

    /**
     * Get the node that contains `descendant`.
     *
     * Note that this can return `descendant` itself.
     */
    childWithDescendant(descendant) {
        marshalNode(this)
        marshalNode(descendant)
        C._ts_node_child_with_descendant_wasm(this.tree[0])
        return unmarshalNode(this.tree)
    }

    /** Get the smallest node within this node that spans the given byte range. */
    descendantForIndex(start, end = start) {
        if (typeof start !== "number" || typeof end !== "number") {
            throw new Error("Arguments must be numbers")
        }

        marshalNode(this)
        const address = TRANSFER_BUFFER + SIZE_OF_NODE
        C.setValue(address, start, "i32")
        C.setValue(address + SIZE_OF_INT, end, "i32")
        C._ts_node_descendant_for_index_wasm(this.tree[0])
        return unmarshalNode(this.tree)
    }

    /** Get the smallest named node within this node that spans the given byte range. */
    namedDescendantForIndex(start, end = start) {
        if (typeof start !== "number" || typeof end !== "number") {
            throw new Error("Arguments must be numbers")
        }

        marshalNode(this)
        const address = TRANSFER_BUFFER + SIZE_OF_NODE
        C.setValue(address, start, "i32")
        C.setValue(address + SIZE_OF_INT, end, "i32")
        C._ts_node_named_descendant_for_index_wasm(this.tree[0])
        return unmarshalNode(this.tree)
    }

    /** Get the smallest node within this node that spans the given point range. */
    descendantForPosition(start, end = start) {
        if (!isPoint(start) || !isPoint(end)) {
            throw new Error("Arguments must be {row, column} objects")
        }

        marshalNode(this)
        const address = TRANSFER_BUFFER + SIZE_OF_NODE
        marshalPoint(address, start)
        marshalPoint(address + SIZE_OF_POINT, end)
        C._ts_node_descendant_for_position_wasm(this.tree[0])
        return unmarshalNode(this.tree)
    }

    /** Get the smallest named node within this node that spans the given point range. */
    namedDescendantForPosition(start, end = start) {
        if (!isPoint(start) || !isPoint(end)) {
            throw new Error("Arguments must be {row, column} objects")
        }

        marshalNode(this)
        const address = TRANSFER_BUFFER + SIZE_OF_NODE
        marshalPoint(address, start)
        marshalPoint(address + SIZE_OF_POINT, end)
        C._ts_node_named_descendant_for_position_wasm(this.tree[0])
        return unmarshalNode(this.tree)
    }

    /**
     * Create a new {@link TreeCursor} starting from this node.
     *
     * Note that the given node is considered the root of the cursor,
     * and the cursor cannot walk outside this node.
     */
    walk() {
        marshalNode(this)
        C._ts_tree_cursor_new_wasm(this.tree[0])
        return new TreeCursor(INTERNAL, this.tree)
    }

    /**
     * Edit this node to keep it in-sync with source code that has been edited.
     *
     * This function is only rarely needed. When you edit a syntax tree with
     * the {@link Tree#edit} method, all of the nodes that you retrieve from
     * the tree afterward will already reflect the edit. You only need to
     * use {@link Node#edit} when you have a specific {@link Node} instance that
     * you want to keep and continue to use after an edit.
     */
    edit(edit) {
        if (this.startIndex >= edit.oldEndIndex) {
            this.startIndex = edit.newEndIndex + (this.startIndex - edit.oldEndIndex)
            let subbedPointRow
            let subbedPointColumn
            if (this.startPosition.row > edit.oldEndPosition.row) {
                subbedPointRow = this.startPosition.row - edit.oldEndPosition.row
                subbedPointColumn = this.startPosition.column
            } else {
                subbedPointRow = 0
                subbedPointColumn = this.startPosition.column
                if (this.startPosition.column >= edit.oldEndPosition.column) {
                    subbedPointColumn = this.startPosition.column - edit.oldEndPosition.column
                }
            }

            if (subbedPointRow > 0) {
                this.startPosition.row += subbedPointRow
                this.startPosition.column = subbedPointColumn
            } else {
                this.startPosition.column += subbedPointColumn
            }
        } else if (this.startIndex > edit.startIndex) {
            this.startIndex = edit.newEndIndex
            this.startPosition.row = edit.newEndPosition.row
            this.startPosition.column = edit.newEndPosition.column
        }
    }

    /** Get the S-expression representation of this node. */
    toString() {
        marshalNode(this)
        const address = C._ts_node_to_string_wasm(this.tree[0])
        const result = C.AsciiToString(address)
        C._free(address)
        return result
    }
}
