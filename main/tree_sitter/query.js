import { ZERO_POINT, SIZE_OF_INT, C } from "./constants.js"
import { Node } from "./node.js"
import { marshalNode, unmarshalCaptures } from "./marshal.js"
import { TRANSFER_BUFFER } from "./parser.js"
import { Language } from "./language.js"

const PREDICATE_STEP_TYPE_CAPTURE = 1

const PREDICATE_STEP_TYPE_STRING = 2

const QUERY_WORD_REGEX = /[\w-]+/g

/**
 * Options for query execution
 */
/**
 * A stateful object that is passed into the progress callback {@link QueryOptions#progressCallback}
 * to provide the current state of the query.
 */
/** A record of key-value pairs associated with a particular pattern in a {@link Query}. */
/**
 * A predicate that contains an operator and list of operands.
 */
/**
 * A particular {@link Node} that has been captured with a particular name within a
 * {@link Query}.
 */
/** A match of a {@link Query} to a particular set of {@link Node}s. */
/** A quantifier for captures */
export const CaptureQuantifier = {
    Zero: 0,
    ZeroOrOne: 1,
    ZeroOrMore: 2,
    One: 3,
    OneOrMore: 4,
}

/** A quantifier for captures */
/**
 * Predicates are represented as a single array of steps. There are two
 * types of steps, which correspond to the two legal values for
 * the `type` field:
 *
 * - `CapturePredicateStep` - Steps with this type represent names
 *    of captures.
 *
 * - `StringPredicateStep` - Steps with this type represent literal
 *    strings.
 */
/**
 * A step in a predicate that refers to a capture.
 *
 * The `name` field is the name of the capture.
 */
/**
 * A step in a predicate that refers to a string.
 *
 * The `value` field is the string value.
 */
const isCaptureStep = (step) => step.type === "capture"

const isStringStep = (step) => step.type === "string"

/**
 * @internal
 *
 * A function that checks if a given set of captures matches a particular
 * condition. This is used in the built-in `eq?`, `match?`, and `any-of?`
 * predicates.
 */
/** Error codes returned from tree-sitter query parsing */
export const QueryErrorKind = {
    Syntax: 1,
    NodeName: 2,
    FieldName: 3,
    CaptureName: 4,
    PatternStructure: 5,
}

/** An error that occurred while parsing a query string. */
/** Information about a {@link QueryError}. */
/** Error thrown when parsing a tree-sitter query fails */
export class QueryError extends Error {
    constructor(kind, info, index, length) {
        super(QueryError.formatMessage(kind, info))
        this.name = "QueryError"
    }

    /** Formats an error message based on the error kind and info */
    static formatMessage(kind, info) {
        switch (kind) {
            case QueryErrorKind.NodeName:
                return `Bad node name '${info.word}'`
            case QueryErrorKind.FieldName:
                return `Bad field name '${info.word}'`
            case QueryErrorKind.CaptureName:
                return `Bad capture name @${info.word}`
            case QueryErrorKind.PatternStructure:
                return `Bad pattern structure at offset ${info.suffix}`
            case QueryErrorKind.Syntax:
                return `Bad syntax at offset ${info.suffix}`
        }
    }
}

/**
 * Parses the `eq?` and `not-eq?` predicates in a query, and updates the text predicates.
 */
function parseAnyPredicate(steps, index, operator, textPredicates) {
    if (steps.length !== 3) {
        throw new Error(`Wrong number of arguments to \`#${operator}\` predicate. Expected 2, got ${steps.length - 1}`)
    }

    if (!isCaptureStep(steps[1])) {
        throw new Error(`First argument of \`#${operator}\` predicate must be a capture. Got "${steps[1].value}"`)
    }

    const isPositive = operator === "eq?" || operator === "any-eq?"
    const matchAll = !operator.startsWith("any-")

    if (isCaptureStep(steps[2])) {
        const captureName1 = steps[1].name
        const captureName2 = steps[2].name
        textPredicates[index].push((captures) => {
            const nodes1 = []
            const nodes2 = []
            for (const c of captures) {
                if (c.name === captureName1) nodes1.push(c.node)
                if (c.name === captureName2) nodes2.push(c.node)
            }
            const compare = (n1, n2, positive) => {
                return positive ? n1.text === n2.text : n1.text !== n2.text
            }
            return matchAll ? nodes1.every((n1) => nodes2.some((n2) => compare(n1, n2, isPositive))) : nodes1.some((n1) => nodes2.some((n2) => compare(n1, n2, isPositive)))
        })
    } else {
        const captureName = steps[1].name
        const stringValue = steps[2].value
        const matches = (n) => n.text === stringValue
        const doesNotMatch = (n) => n.text !== stringValue
        textPredicates[index].push((captures) => {
            const nodes = []
            for (const c of captures) {
                if (c.name === captureName) nodes.push(c.node)
            }
            const test = isPositive ? matches : doesNotMatch
            return matchAll ? nodes.every(test) : nodes.some(test)
        })
    }
}

/**
 * Parses the `match?` and `not-match?` predicates in a query, and updates the text predicates.
 */
function parseMatchPredicate(steps, index, operator, textPredicates) {
    if (steps.length !== 3) {
        throw new Error(`Wrong number of arguments to \`#${operator}\` predicate. Expected 2, got ${steps.length - 1}.`)
    }

    if (steps[1].type !== "capture") {
        throw new Error(`First argument of \`#${operator}\` predicate must be a capture. Got "${steps[1].value}".`)
    }

    if (steps[2].type !== "string") {
        throw new Error(`Second argument of \`#${operator}\` predicate must be a string. Got @${steps[2].name}.`)
    }

    const isPositive = operator === "match?" || operator === "any-match?"
    const matchAll = !operator.startsWith("any-")
    const captureName = steps[1].name
    const regex = new RegExp(steps[2].value)
    textPredicates[index].push((captures) => {
        const nodes = []
        for (const c of captures) {
            if (c.name === captureName) nodes.push(c.node.text)
        }
        const test = (text, positive) => {
            return positive ? regex.test(text) : !regex.test(text)
        }
        if (nodes.length === 0) return !isPositive
        return matchAll ? nodes.every((text) => test(text, isPositive)) : nodes.some((text) => test(text, isPositive))
    })
}

/**
 * Parses the `any-of?` and `not-any-of?` predicates in a query, and updates the text predicates.
 */
function parseAnyOfPredicate(steps, index, operator, textPredicates) {
    if (steps.length < 2) {
        throw new Error(`Wrong number of arguments to \`#${operator}\` predicate. Expected at least 1. Got ${steps.length - 1}.`)
    }

    if (steps[1].type !== "capture") {
        throw new Error(`First argument of \`#${operator}\` predicate must be a capture. Got "${steps[1].value}".`)
    }

    const isPositive = operator === "any-of?"
    const captureName = steps[1].name

    const stringSteps = steps.slice(2)
    if (!stringSteps.every(isStringStep)) {
        throw new Error(`Arguments to \`#${operator}\` predicate must be strings.".`)
    }
    const values = stringSteps.map((s) => s.value)

    textPredicates[index].push((captures) => {
        const nodes = []
        for (const c of captures) {
            if (c.name === captureName) nodes.push(c.node.text)
        }
        if (nodes.length === 0) return !isPositive
        return nodes.every((text) => values.includes(text)) === isPositive
    })
}

/**
 * Parses the `is?` and `is-not?` predicates in a query, and updates the asserted or refuted properties,
 * depending on if the operator is positive or negative.
 */
function parseIsPredicate(steps, index, operator, assertedProperties, refutedProperties) {
    if (steps.length < 2 || steps.length > 3) {
        throw new Error(`Wrong number of arguments to \`#${operator}\` predicate. Expected 1 or 2. Got ${steps.length - 1}.`)
    }

    if (!steps.every(isStringStep)) {
        throw new Error(`Arguments to \`#${operator}\` predicate must be strings.".`)
    }

    const properties = operator === "is?" ? assertedProperties : refutedProperties
    if (!properties[index]) properties[index] = {}
    properties[index][steps[1].value] = steps[2]?.value ?? null
}

/**
 * Parses the `set!` directive in a query, and updates the set properties.
 */
function parseSetDirective(steps, index, setProperties) {
    if (steps.length < 2 || steps.length > 3) {
        throw new Error(`Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${steps.length - 1}.`)
    }
    if (!steps.every(isStringStep)) {
        throw new Error(`Arguments to \`#set!\` predicate must be strings.".`)
    }
    if (!setProperties[index]) setProperties[index] = {}
    setProperties[index][steps[1].value] = steps[2]?.value ?? null
}

/**
 * Parses the predicate at a given step in a pattern, and updates the appropriate
 * predicates or properties.
 */
function parsePattern(index, stepType, stepValueId, captureNames, stringValues, steps, textPredicates, predicates, setProperties, assertedProperties, refutedProperties) {
    if (stepType === PREDICATE_STEP_TYPE_CAPTURE) {
        const name = captureNames[stepValueId]
        steps.push({ type: "capture", name })
    } else if (stepType === PREDICATE_STEP_TYPE_STRING) {
        steps.push({ type: "string", value: stringValues[stepValueId] })
    } else if (steps.length > 0) {
        if (steps[0].type !== "string") {
            throw new Error("Predicates must begin with a literal value")
        }

        const operator = steps[0].value
        switch (operator) {
            case "any-not-eq?":
            case "not-eq?":
            case "any-eq?":
            case "eq?":
                parseAnyPredicate(steps, index, operator, textPredicates)
                break

            case "any-not-match?":
            case "not-match?":
            case "any-match?":
            case "match?":
                parseMatchPredicate(steps, index, operator, textPredicates)
                break

            case "not-any-of?":
            case "any-of?":
                parseAnyOfPredicate(steps, index, operator, textPredicates)
                break

            case "is?":
            case "is-not?":
                parseIsPredicate(steps, index, operator, assertedProperties, refutedProperties)
                break

            case "set!":
                parseSetDirective(steps, index, setProperties)
                break

            default:
                predicates[index].push({ operator, operands: steps.slice(1) })
        }

        steps.length = 0
    }
}

export class Query {
    /** @internal */
    [0] = 0 // Internal handle for WASM

    /** @internal */
    exceededMatchLimit

    /** @internal */
    textPredicates

    /** The names of the captures used in the query. */
    captureNames

    /** The quantifiers of the captures used in the query. */
    captureQuantifiers

    /**
     * The other user-defined predicates associated with the given index.
     *
     * This includes predicates with operators other than:
     * - `match?`
     * - `eq?` and `not-eq?`
     * - `any-of?` and `not-any-of?`
     * - `is?` and `is-not?`
     * - `set!`
     */
    predicates

    /** The properties for predicates with the operator `set!`. */
    setProperties

    /** The properties for predicates with the operator `is?`. */
    assertedProperties

    /** The properties for predicates with the operator `is-not?`. */
    refutedProperties

    /** The maximum number of in-progress matches for this cursor. */
    matchLimit

    /**
     * Create a new query from a string containing one or more S-expression
     * patterns.
     *
     * The query is associated with a particular language, and can only be run
     * on syntax nodes parsed with that language. References to Queries can be
     * shared between multiple threads.
     *
     * @link {@see https://tree-sitter.github.io/tree-sitter/using-parsers/queries}
     */
    constructor(language, source) {
        const sourceLength = C.lengthBytesUTF8(source)
        const sourceAddress = C._malloc(sourceLength + 1)
        C.stringToUTF8(source, sourceAddress, sourceLength + 1)
        const address = C._ts_query_new(language[0], sourceAddress, sourceLength, TRANSFER_BUFFER, TRANSFER_BUFFER + SIZE_OF_INT)

        if (!address) {
            const errorId = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32")
            const errorByte = C.getValue(TRANSFER_BUFFER, "i32")
            const errorIndex = C.UTF8ToString(sourceAddress, errorByte).length
            const suffix = source.slice(errorIndex, errorIndex + 100).split("\n")[0]
            const word = suffix.match(QUERY_WORD_REGEX)?.[0] ?? ""
            C._free(sourceAddress)

            switch (errorId) {
                case QueryErrorKind.Syntax:
                    throw new QueryError(QueryErrorKind.Syntax, { suffix: `${errorIndex}: '${suffix}'...` }, errorIndex, 0)
                case QueryErrorKind.NodeName:
                    throw new QueryError(errorId, { word }, errorIndex, word.length)
                case QueryErrorKind.FieldName:
                    throw new QueryError(errorId, { word }, errorIndex, word.length)
                case QueryErrorKind.CaptureName:
                    throw new QueryError(errorId, { word }, errorIndex, word.length)
                case QueryErrorKind.PatternStructure:
                    throw new QueryError(errorId, { suffix: `${errorIndex}: '${suffix}'...` }, errorIndex, 0)
            }
        }

        const stringCount = C._ts_query_string_count(address)
        const captureCount = C._ts_query_capture_count(address)
        const patternCount = C._ts_query_pattern_count(address)
        const captureNames = new Array(captureCount)
        const captureQuantifiers = new Array(patternCount)
        const stringValues = new Array(stringCount)

        // Fill in the capture names
        for (let i = 0; i < captureCount; i++) {
            const nameAddress = C._ts_query_capture_name_for_id(address, i, TRANSFER_BUFFER)
            const nameLength = C.getValue(TRANSFER_BUFFER, "i32")
            captureNames[i] = C.UTF8ToString(nameAddress, nameLength)
        }

        // Fill in the capture quantifiers
        for (let i = 0; i < patternCount; i++) {
            const captureQuantifiersArray = new Array(captureCount)
            for (let j = 0; j < captureCount; j++) {
                const quantifier = C._ts_query_capture_quantifier_for_id(address, i, j)
                captureQuantifiersArray[j] = quantifier
            }
            captureQuantifiers[i] = captureQuantifiersArray
        }

        // Fill in the string values
        for (let i = 0; i < stringCount; i++) {
            const valueAddress = C._ts_query_string_value_for_id(address, i, TRANSFER_BUFFER)
            const nameLength = C.getValue(TRANSFER_BUFFER, "i32")
            stringValues[i] = C.UTF8ToString(valueAddress, nameLength)
        }

        const setProperties = new Array(patternCount)
        const assertedProperties = new Array(patternCount)
        const refutedProperties = new Array(patternCount)
        const predicates = new Array(patternCount)
        const textPredicates = new Array(patternCount)

        // Parse the predicates, and add the appropriate predicates or properties
        for (let i = 0; i < patternCount; i++) {
            const predicatesAddress = C._ts_query_predicates_for_pattern(address, i, TRANSFER_BUFFER)
            const stepCount = C.getValue(TRANSFER_BUFFER, "i32")

            predicates[i] = []
            textPredicates[i] = []

            const steps = new Array()

            let stepAddress = predicatesAddress
            for (let j = 0; j < stepCount; j++) {
                const stepType = C.getValue(stepAddress, "i32")
                stepAddress += SIZE_OF_INT

                const stepValueId = C.getValue(stepAddress, "i32")
                stepAddress += SIZE_OF_INT

                parsePattern(i, stepType, stepValueId, captureNames, stringValues, steps, textPredicates, predicates, setProperties, assertedProperties, refutedProperties)
            }

            Object.freeze(textPredicates[i])
            Object.freeze(predicates[i])
            Object.freeze(setProperties[i])
            Object.freeze(assertedProperties[i])
            Object.freeze(refutedProperties[i])
        }

        C._free(sourceAddress)

        this[0] = address
        this.captureNames = captureNames
        this.captureQuantifiers = captureQuantifiers
        this.textPredicates = textPredicates
        this.predicates = predicates
        this.setProperties = setProperties
        this.assertedProperties = assertedProperties
        this.refutedProperties = refutedProperties
        this.exceededMatchLimit = false
    }

    /** Delete the query, freeing its resources. */
    delete() {
        C._ts_query_delete(this[0])
        this[0] = 0
    }

    /**
     * Iterate over all of the matches in the order that they were found.
     *
     * Each match contains the index of the pattern that matched, and a list of
     * captures. Because multiple patterns can match the same set of nodes,
     * one match may contain captures that appear *before* some of the
     * captures from a previous match.
     *
     * @param {Node} node - The node to execute the query on.
     *
     * @param {QueryOptions} options - Options for query execution.
     */
    matches(node, options = {}) {
        const startPosition = options.startPosition ?? ZERO_POINT
        const endPosition = options.endPosition ?? ZERO_POINT
        const startIndex = options.startIndex ?? 0
        const endIndex = options.endIndex ?? 0
        const matchLimit = options.matchLimit ?? 0xffffffff
        const maxStartDepth = options.maxStartDepth ?? 0xffffffff
        const timeoutMicros = options.timeoutMicros ?? 0
        const progressCallback = options.progressCallback

        if (typeof matchLimit !== "number") {
            throw new Error("Arguments must be numbers")
        }
        this.matchLimit = matchLimit

        if (endIndex !== 0 && startIndex > endIndex) {
            throw new Error("`startIndex` cannot be greater than `endIndex`")
        }

        if (endPosition !== ZERO_POINT && (startPosition.row > endPosition.row || (startPosition.row === endPosition.row && startPosition.column > endPosition.column))) {
            throw new Error("`startPosition` cannot be greater than `endPosition`")
        }

        if (progressCallback) {
            C.currentQueryProgressCallback = progressCallback
        }

        marshalNode(node)

        C._ts_query_matches_wasm(this[0], node.tree[0], startPosition.row, startPosition.column, endPosition.row, endPosition.column, startIndex, endIndex, matchLimit, maxStartDepth, timeoutMicros)

        const rawCount = C.getValue(TRANSFER_BUFFER, "i32")
        const startAddress = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32")
        const didExceedMatchLimit = C.getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32")
        const result = new Array(rawCount)
        this.exceededMatchLimit = Boolean(didExceedMatchLimit)

        let filteredCount = 0
        let address = startAddress
        for (let i = 0; i < rawCount; i++) {
            const patternIndex = C.getValue(address, "i32")
            address += SIZE_OF_INT
            const captureCount = C.getValue(address, "i32")
            address += SIZE_OF_INT

            const captures = new Array(captureCount)
            address = unmarshalCaptures(this, node.tree, address, patternIndex, captures)

            if (this.textPredicates[patternIndex].every((p) => p(captures))) {
                result[filteredCount] = { pattern: patternIndex, patternIndex, captures }
                const setProperties = this.setProperties[patternIndex]
                result[filteredCount].setProperties = setProperties
                const assertedProperties = this.assertedProperties[patternIndex]
                result[filteredCount].assertedProperties = assertedProperties
                const refutedProperties = this.refutedProperties[patternIndex]
                result[filteredCount].refutedProperties = refutedProperties
                filteredCount++
            }
        }
        result.length = filteredCount

        C._free(startAddress)
        C.currentQueryProgressCallback = null
        return result
    }

    /**
     * Iterate over all of the individual captures in the order that they
     * appear.
     *
     * This is useful if you don't care about which pattern matched, and just
     * want a single, ordered sequence of captures.
     *
     * @param {Node} node - The node to execute the query on.
     *
     * @param {QueryOptions} options - Options for query execution.
     */
    captures(node, options = {}) {
        const startPosition = options.startPosition ?? ZERO_POINT
        const endPosition = options.endPosition ?? ZERO_POINT
        const startIndex = options.startIndex ?? 0
        const endIndex = options.endIndex ?? 0
        const matchLimit = options.matchLimit ?? 0xffffffff
        const maxStartDepth = options.maxStartDepth ?? 0xffffffff
        const timeoutMicros = options.timeoutMicros ?? 0
        const progressCallback = options.progressCallback

        if (typeof matchLimit !== "number") {
            throw new Error("Arguments must be numbers")
        }
        this.matchLimit = matchLimit

        if (endIndex !== 0 && startIndex > endIndex) {
            throw new Error("`startIndex` cannot be greater than `endIndex`")
        }

        if (endPosition !== ZERO_POINT && (startPosition.row > endPosition.row || (startPosition.row === endPosition.row && startPosition.column > endPosition.column))) {
            throw new Error("`startPosition` cannot be greater than `endPosition`")
        }

        if (progressCallback) {
            C.currentQueryProgressCallback = progressCallback
        }

        marshalNode(node)

        C._ts_query_captures_wasm(this[0], node.tree[0], startPosition.row, startPosition.column, endPosition.row, endPosition.column, startIndex, endIndex, matchLimit, maxStartDepth, timeoutMicros)

        const count = C.getValue(TRANSFER_BUFFER, "i32")
        const startAddress = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32")
        const didExceedMatchLimit = C.getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32")
        const result = new Array()
        this.exceededMatchLimit = Boolean(didExceedMatchLimit)

        const captures = new Array()
        let address = startAddress
        for (let i = 0; i < count; i++) {
            const patternIndex = C.getValue(address, "i32")
            address += SIZE_OF_INT
            const captureCount = C.getValue(address, "i32")
            address += SIZE_OF_INT
            const captureIndex = C.getValue(address, "i32")
            address += SIZE_OF_INT

            captures.length = captureCount
            address = unmarshalCaptures(this, node.tree, address, patternIndex, captures)

            if (this.textPredicates[patternIndex].every((p) => p(captures))) {
                const capture = captures[captureIndex]
                const setProperties = this.setProperties[patternIndex]
                capture.setProperties = setProperties
                const assertedProperties = this.assertedProperties[patternIndex]
                capture.assertedProperties = assertedProperties
                const refutedProperties = this.refutedProperties[patternIndex]
                capture.refutedProperties = refutedProperties
                result.push(capture)
            }
        }

        C._free(startAddress)
        C.currentQueryProgressCallback = null
        return result
    }

    /** Get the predicates for a given pattern. */
    predicatesForPattern(patternIndex) {
        return this.predicates[patternIndex]
    }

    /**
     * Disable a certain capture within a query.
     *
     * This prevents the capture from being returned in matches, and also
     * avoids any resource usage associated with recording the capture.
     */
    disableCapture(captureName) {
        const captureNameLength = C.lengthBytesUTF8(captureName)
        const captureNameAddress = C._malloc(captureNameLength + 1)
        C.stringToUTF8(captureName, captureNameAddress, captureNameLength + 1)
        C._ts_query_disable_capture(this[0], captureNameAddress, captureNameLength)
        C._free(captureNameAddress)
    }

    /**
     * Disable a certain pattern within a query.
     *
     * This prevents the pattern from matching, and also avoids any resource
     * usage associated with the pattern. This throws an error if the pattern
     * index is out of bounds.
     */
    disablePattern(patternIndex) {
        if (patternIndex >= this.predicates.length) {
            throw new Error(`Pattern index is ${patternIndex} but the pattern count is ${this.predicates.length}`)
        }
        C._ts_query_disable_pattern(this[0], patternIndex)
    }

    /**
     * Check if, on its last execution, this cursor exceeded its maximum number
     * of in-progress matches.
     */
    didExceedMatchLimit() {
        return this.exceededMatchLimit
    }

    /** Get the byte offset where the given pattern starts in the query's source. */
    startIndexForPattern(patternIndex) {
        if (patternIndex >= this.predicates.length) {
            throw new Error(`Pattern index is ${patternIndex} but the pattern count is ${this.predicates.length}`)
        }
        return C._ts_query_start_byte_for_pattern(this[0], patternIndex)
    }

    /** Get the byte offset where the given pattern ends in the query's source. */
    endIndexForPattern(patternIndex) {
        if (patternIndex >= this.predicates.length) {
            throw new Error(`Pattern index is ${patternIndex} but the pattern count is ${this.predicates.length}`)
        }
        return C._ts_query_end_byte_for_pattern(this[0], patternIndex)
    }

    /** Get the number of patterns in the query. */
    patternCount() {
        return C._ts_query_pattern_count(this[0])
    }

    /** Get the index for a given capture name. */
    captureIndexForName(captureName) {
        return this.captureNames.indexOf(captureName)
    }

    /** Check if a given pattern within a query has a single root node. */
    isPatternRooted(patternIndex) {
        return C._ts_query_is_pattern_rooted(this[0], patternIndex) === 1
    }

    /** Check if a given pattern within a query has a single root node. */
    isPatternNonLocal(patternIndex) {
        return C._ts_query_is_pattern_non_local(this[0], patternIndex) === 1
    }

    /**
     * Check if a given step in a query is 'definite'.
     *
     * A query step is 'definite' if its parent pattern will be guaranteed to
     * match successfully once it reaches the step.
     */
    isPatternGuaranteedAtStep(byteIndex) {
        return C._ts_query_is_pattern_guaranteed_at_step(this[0], byteIndex) === 1
    }
}
