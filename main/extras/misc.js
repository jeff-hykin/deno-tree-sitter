export function _getQueryCaptureTargets(queryString) {
    if (!queryString.includes("@")) {
        return []
    } else {  // need a rigorous check
        // remove all strings from within the query (the only place a false capture target could appear)
        // NOTE: this is based exactly on the language spec, its not a hack: https://github.com/tree-sitter-grammars/tree-sitter-query/blob/3a9808b22742d5bd906ef5d1a562f2f1ae57406d/src/grammar.json#L140
        const safeSearchableQuery = queryString.replace(/"(?:\\(?:[^xu0-7]|[0-7]{1,3}|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]+})|[^\"\\])*"/g, "")
        // now check if there is a capture target
        // NOTE: also based on the language spec: https://github.com/tree-sitter-grammars/tree-sitter-query/blob/3a9808b22742d5bd906ef5d1a562f2f1ae57406d/src/grammar.json#L204
        return safeSearchableQuery.match(/@([a-zA-Z0-9.\-_\$]+)/g)
    }
}