import { C, assertInternal } from "./constants.js"
import { Language } from "./language.js"

export class LookaheadIterator {
    /** @internal */
    [0] = 0 // Internal handle for Wasm

    /** @internal */
    language

    /** @internal */
    constructor(internal, address, language) {
        assertInternal(internal)
        this[0] = address
        this.language = language
    }

    /** Get the current symbol of the lookahead iterator. */
    get currentTypeId() {
        return C._ts_lookahead_iterator_current_symbol(this[0])
    }

    /** Get the current symbol name of the lookahead iterator. */
    get currentType() {
        return this.language.types[this.currentTypeId] || "ERROR"
    }

    /** Delete the lookahead iterator, freeing its resources. */
    delete() {
        C._ts_lookahead_iterator_delete(this[0])
        this[0] = 0
    }

    /**
     * Reset the lookahead iterator.
     *
     * This returns `true` if the language was set successfully and `false`
     * otherwise.
     */
    reset(language, stateId) {
        if (C._ts_lookahead_iterator_reset(this[0], language[0], stateId)) {
            this.language = language
            return true
        }
        return false
    }

    /**
     * Reset the lookahead iterator to another state.
     *
     * This returns `true` if the iterator was reset to the given state and
     * `false` otherwise.
     */
    resetState(stateId) {
        return Boolean(C._ts_lookahead_iterator_reset_state(this[0], stateId))
    }

    /**
     * Returns an iterator that iterates over the symbols of the lookahead iterator.
     *
     * The iterator will yield the current symbol name as a string for each step
     * until there are no more symbols to iterate over.
     */
    [Symbol.iterator]() {
        return {
            next: () => {
                if (C._ts_lookahead_iterator_next(this[0])) {
                    return { done: false, value: this.currentType }
                }
                return { done: true, value: "" }
            },
        }
    }
}
