import { INTERNAL, SIZE_OF_INT, SIZE_OF_NODE, SIZE_OF_POINT, C } from "./constants.js"
import { Node } from "./node.js"
import { Tree } from "./tree.js"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Query } from "./query.js"
import { TreeCursor } from "./tree_cursor.js"
import { TRANSFER_BUFFER } from "./parser.js"
import { LanguageMetadata } from "./language.js"

/**
 * @internal
 *
 * Unmarshals a {@link QueryMatch} to the transfer buffer.
 */
export function unmarshalCaptures(query, tree, address, patternIndex, result) {
    for (let i = 0, n = result.length; i < n; i++) {
        const captureIndex = C.getValue(address, "i32")
        address += SIZE_OF_INT
        const node = unmarshalNode(tree, address)
        address += SIZE_OF_NODE
        result[i] = { patternIndex, name: query.captureNames[captureIndex], node }
    }
    return address
}

/**
 * @internal
 *
 * Marshals a {@link Node} to the transfer buffer.
 */
export function marshalNode(node) {
    let address = TRANSFER_BUFFER
    C.setValue(address, node.id, "i32")
    address += SIZE_OF_INT
    C.setValue(address, node.startIndex, "i32")
    address += SIZE_OF_INT
    C.setValue(address, node.startPosition.row, "i32")
    address += SIZE_OF_INT
    C.setValue(address, node.startPosition.column, "i32")
    address += SIZE_OF_INT
    C.setValue(address, node[0], "i32")
}

/**
 * @internal
 *
 * Unmarshals a {@link Node} from the transfer buffer.
 */
export function unmarshalNode(tree, address = TRANSFER_BUFFER) {
    const id = C.getValue(address, "i32")
    address += SIZE_OF_INT
    if (id === 0) return null

    const index = C.getValue(address, "i32")
    address += SIZE_OF_INT
    const row = C.getValue(address, "i32")
    address += SIZE_OF_INT
    const column = C.getValue(address, "i32")
    address += SIZE_OF_INT
    const other = C.getValue(address, "i32")

    const result = new Node(INTERNAL, {
        id,
        tree,
        startIndex: index,
        startPosition: { row, column },
        other,
    })

    return result
}

/**
 * @internal
 *
 * Marshals a {@link TreeCursor} to the transfer buffer.
 */
export function marshalTreeCursor(cursor, address = TRANSFER_BUFFER) {
    C.setValue(address + 0 * SIZE_OF_INT, cursor[0], "i32")
    C.setValue(address + 1 * SIZE_OF_INT, cursor[1], "i32")
    C.setValue(address + 2 * SIZE_OF_INT, cursor[2], "i32")
    C.setValue(address + 3 * SIZE_OF_INT, cursor[3], "i32")
}

/**
 * @internal
 *
 * Unmarshals a {@link TreeCursor} from the transfer buffer.
 */
export function unmarshalTreeCursor(cursor) {
    cursor[0] = C.getValue(TRANSFER_BUFFER + 0 * SIZE_OF_INT, "i32")
    cursor[1] = C.getValue(TRANSFER_BUFFER + 1 * SIZE_OF_INT, "i32")
    cursor[2] = C.getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32")
    cursor[3] = C.getValue(TRANSFER_BUFFER + 3 * SIZE_OF_INT, "i32")
}

/**
 * @internal
 *
 * Marshals a {@link Point} to the transfer buffer.
 */
export function marshalPoint(address, point) {
    C.setValue(address, point.row, "i32")
    C.setValue(address + SIZE_OF_INT, point.column, "i32")
}

/**
 * @internal
 *
 * Unmarshals a {@link Point} from the transfer buffer.
 */
export function unmarshalPoint(address) {
    const result = {
        row: C.getValue(address, "i32") >>> 0,
        column: C.getValue(address + SIZE_OF_INT, "i32") >>> 0,
    }
    return result
}

/**
 * @internal
 *
 * Marshals a {@link Range} to the transfer buffer.
 */
export function marshalRange(address, range) {
    marshalPoint(address, range.startPosition)
    address += SIZE_OF_POINT
    marshalPoint(address, range.endPosition)
    address += SIZE_OF_POINT
    C.setValue(address, range.startIndex, "i32")
    address += SIZE_OF_INT
    C.setValue(address, range.endIndex, "i32")
    address += SIZE_OF_INT
}

/**
 * @internal
 *
 * Unmarshals a {@link Range} from the transfer buffer.
 */
export function unmarshalRange(address) {
    const result = {}
    result.startPosition = unmarshalPoint(address)
    address += SIZE_OF_POINT
    result.endPosition = unmarshalPoint(address)
    address += SIZE_OF_POINT
    result.startIndex = C.getValue(address, "i32") >>> 0
    address += SIZE_OF_INT
    result.endIndex = C.getValue(address, "i32") >>> 0
    return result
}

/**
 * @internal
 *
 * Marshals an {@link Edit} to the transfer buffer.
 */
export function marshalEdit(edit, address = TRANSFER_BUFFER) {
    marshalPoint(address, edit.startPosition)
    address += SIZE_OF_POINT
    marshalPoint(address, edit.oldEndPosition)
    address += SIZE_OF_POINT
    marshalPoint(address, edit.newEndPosition)
    address += SIZE_OF_POINT
    C.setValue(address, edit.startIndex, "i32")
    address += SIZE_OF_INT
    C.setValue(address, edit.oldEndIndex, "i32")
    address += SIZE_OF_INT
    C.setValue(address, edit.newEndIndex, "i32")
    address += SIZE_OF_INT
}

/**
 * @internal
 *
 * Unmarshals a {@link LanguageMetadata} from the transfer buffer.
 */
export function unmarshalLanguageMetadata(address) {
    const result = {}
    result.major_version = C.getValue(address, "i32")
    address += SIZE_OF_INT
    result.minor_version = C.getValue(address, "i32")
    address += SIZE_OF_INT
    result.field_count = C.getValue(address, "i32")
    return result
}
