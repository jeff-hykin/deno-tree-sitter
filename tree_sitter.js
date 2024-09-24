import "data:text/javascript;base64,IWdsb2JhbFRoaXMuRGVubyAmJiAoZ2xvYmFsVGhpcy5EZW5vID0ge2FyZ3M6IFtdLGJ1aWxkOiB7b3M6ICJsaW51eCIsYXJjaDogIng4Nl82NCIsdmVyc2lvbjogIiIsfSxwaWQ6IDEsZW52OiB7Z2V0KF8pIHtyZXR1cm4gbnVsbDt9LHNldChfLCBfXykge3JldHVybiBudWxsO30sfSx9KTs="
import { zip } from "https://deno.land/x/good@1.7.1.1/array.js"
// 
// 
// all the wasm setup stuff
// 
// 
    import uint8ArrayOfWasmTreeSitter from "./tree_sitter.wasm.binaryified.js"
    // https://esm.sh/v135/web-tree-sitter@0.22.5/denonext/web-tree-sitter.mjs
    var __Process$ = { versions: { node: "1" }, argv: [import.meta.href] }
    import * as fs from "https://deno.land/std@0.177.0/node/fs.ts"
    import * as nodePath from "https://deno.land/std@0.177.0/node/path.ts"

    var Module = {}
    var moduleOverrides = Object.assign({}, Module),
        arguments_ = [],
        thisProgram = "./this.program",
        quit_ = (e, t) => {
            throw t
        },
        ENVIRONMENT_IS_WEB = false,
        ENVIRONMENT_IS_WORKER = false,
        ENVIRONMENT_IS_NODE = true,
        scriptDirectory = "",
        read_,
        readAsync,
        readBinary

    function locateFile(e) {
        return Module.locateFile ? Module.locateFile(e, scriptDirectory) : scriptDirectory + e
    }
    ;(scriptDirectory = ENVIRONMENT_IS_WORKER ? nodePath.dirname(scriptDirectory) + "/" : "/_virtual/esm.sh/v135/web-tree-sitter@0.22.5/denonext/"),
        (read_ = (e, t) => ((e = isFileURI(e) ? new URL(e) : nodePath.normalize(e)), fs.readFileSync(e, t ? void 0 : "utf8"))),
        (readBinary = (e) => {
            var t = read_(e, true)
            return t.buffer || (t = new Uint8Array(t)), t
        }),
        (readAsync = (e, t, _, s = true) => {
            ;(e = isFileURI(e) ? new URL(e) : nodePath.normalize(e)),
                fs.readFile(e, s ? void 0 : "utf8", (r, a) => {
                    r ? _(r) : t(s ? a.buffer : a)
                })
        }),
        !Module.thisProgram && __Process$.argv.length > 1 && (thisProgram = __Process$.argv[1].replace(/\\/g, "/")),
        (arguments_ = __Process$.argv.slice(2)),
        typeof module < "u" && (module.exports = Module),
        (quit_ = (e, t) => {
            throw ((__Process$.exitCode = e), t)
        })

    var out = Module.print || console.log.bind(console),
        err = Module.printErr || console.error.bind(console)
    Object.assign(Module, moduleOverrides), (moduleOverrides = null), Module.arguments && (arguments_ = Module.arguments), Module.thisProgram && (thisProgram = Module.thisProgram), Module.quit && (quit_ = Module.quit)
    var dynamicLibraries = Module.dynamicLibraries || [],
        wasmBinary,
        wasmMemory
    Module.wasmBinary && (wasmBinary = Module.wasmBinary), typeof WebAssembly != "object" && abort("no native wasm support detected")
    var ABORT = false,
        EXITSTATUS,
        HEAP8,
        HEAPU8,
        HEAP16,
        HEAPU16,
        HEAP32,
        HEAPU32,
        HEAPF32,
        HEAPF64
    function updateMemoryViews() {
        var e = wasmMemory.buffer
        ;(Module.HEAP8 = HEAP8 = new Int8Array(e)), (Module.HEAP16 = HEAP16 = new Int16Array(e)), (Module.HEAPU8 = HEAPU8 = new Uint8Array(e)), (Module.HEAPU16 = HEAPU16 = new Uint16Array(e)), (Module.HEAP32 = HEAP32 = new Int32Array(e)), (Module.HEAPU32 = HEAPU32 = new Uint32Array(e)), (Module.HEAPF32 = HEAPF32 = new Float32Array(e)), (Module.HEAPF64 = HEAPF64 = new Float64Array(e))
    }
    var INITIAL_MEMORY = Module.INITIAL_MEMORY || 33554432
    ;(wasmMemory = Module.wasmMemory ? Module.wasmMemory : new WebAssembly.Memory({ initial: INITIAL_MEMORY / 65536, maximum: 32768 })), updateMemoryViews(), (INITIAL_MEMORY = wasmMemory.buffer.byteLength)
    var __ATPRERUN__ = [],
        __ATINIT__ = [],
        __ATMAIN__ = [],
        __ATPOSTRUN__ = [],
        __RELOC_FUNCS__ = [],
        runtimeInitialized = false
    function preRun() {
        if (Module.preRun) for (typeof Module.preRun == "function" && (Module.preRun = [Module.preRun]); Module.preRun.length; ) addOnPreRun(Module.preRun.shift())
        callRuntimeCallbacks(__ATPRERUN__)
    }
    function initRuntime() {
        ;(runtimeInitialized = true), callRuntimeCallbacks(__RELOC_FUNCS__), callRuntimeCallbacks(__ATINIT__)
    }
    function preMain() {
        callRuntimeCallbacks(__ATMAIN__)
    }
    function postRun() {
        if (Module.postRun) for (typeof Module.postRun == "function" && (Module.postRun = [Module.postRun]); Module.postRun.length; ) addOnPostRun(Module.postRun.shift())
        callRuntimeCallbacks(__ATPOSTRUN__)
    }
    function addOnPreRun(e) {
        __ATPRERUN__.unshift(e)
    }
    function addOnInit(e) {
        __ATINIT__.unshift(e)
    }
    function addOnPostRun(e) {
        __ATPOSTRUN__.unshift(e)
    }
    var runDependencies = 0,
        runDependencyWatcher = null,
        dependenciesFulfilled = null
    function getUniqueRunDependency(e) {
        return e
    }
    function addRunDependency(e) {
        runDependencies++, Module.monitorRunDependencies?.(runDependencies)
    }
    function removeRunDependency(e) {
        if ((runDependencies--, Module.monitorRunDependencies?.(runDependencies), runDependencies == 0 && (runDependencyWatcher !== null && (clearInterval(runDependencyWatcher), (runDependencyWatcher = null)), dependenciesFulfilled))) {
            var t = dependenciesFulfilled
            ;(dependenciesFulfilled = null), t()
        }
    }
    function abort(e) {
        throw (Module.onAbort?.(e), err((e = "Aborted(" + e + ")")), (ABORT = true), (EXITSTATUS = 1), (e += ". Build with -sASSERTIONS for more info."), new WebAssembly.RuntimeError(e))
    }
    var dataURIPrefix = "data:application/octet-stream;base64,",
        isDataURI = (e) => e.startsWith(dataURIPrefix),
        isFileURI = (e) => e.startsWith("file://"),
        wasmBinaryFile
    function getBinarySync(e) {
        if (e == wasmBinaryFile && wasmBinary) return new Uint8Array(wasmBinary)
        if (readBinary) return readBinary(e)
        throw "both async and sync fetching of the wasm failed"
    }
    function getBinaryPromise(e) {
        if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
            if (typeof fetch == "function" && !isFileURI(e))
                return fetch(e, { credentials: "same-origin" })
                    .then((t) => {
                        if (!t.ok) throw `failed to load wasm binary file at '${e}'`
                        return t.arrayBuffer()
                    })
                    .catch(() => getBinarySync(e))
            if (readAsync)
                return new Promise((t, _) => {
                    readAsync(e, (s) => t(new Uint8Array(s)), _)
                })
        }
        return Promise.resolve().then(() => getBinarySync(e))
    }
    function instantiateArrayBuffer(e, t, _) {
        return Promise.resolve(uint8ArrayOfWasmTreeSitter)
            .then((s) => WebAssembly.instantiate(s, t))
            .then(_, (s) => {
                err(`failed to asynchronously prepare wasm: ${s}`), abort(s)
            })
    }
    function instantiateAsync(e, t, _, s) {
        return e || typeof WebAssembly.instantiateStreaming != "function" || isDataURI(t) || isFileURI(t) || ENVIRONMENT_IS_NODE || typeof fetch != "function"
            ? instantiateArrayBuffer(t, _, s)
            : fetch(t, { credentials: "same-origin" }).then((r) =>
                WebAssembly.instantiateStreaming(r, _).then(s, function (a) {
                    return err(`wasm streaming compile failed: ${a}`), err("falling back to ArrayBuffer instantiation"), instantiateArrayBuffer(t, _, s)
                })
            )
    }
    function createWasm() {
        var e = { env: wasmImports, wasi_snapshot_preview1: wasmImports, "GOT.mem": new Proxy(wasmImports, GOTHandler), "GOT.func": new Proxy(wasmImports, GOTHandler) }
        function t(_, s) {
            ;(wasmExports = _.exports), (wasmExports = relocateExports(wasmExports, 1024))
            var r = getDylinkMetadata(s)
            return r.neededDynlibs && (dynamicLibraries = r.neededDynlibs.concat(dynamicLibraries)), mergeLibSymbols(wasmExports, "main"), LDSO.init(), loadDylibs(), addOnInit(wasmExports.__wasm_call_ctors), __RELOC_FUNCS__.push(wasmExports.__wasm_apply_data_relocs), removeRunDependency("wasm-instantiate"), wasmExports
        }
        if ((addRunDependency("wasm-instantiate"), Module.instantiateWasm))
            try {
                return Module.instantiateWasm(e, t)
            } catch (_) {
                return err(`Module.instantiateWasm callback failed with error: ${_}`), false
            }
        return (
            instantiateAsync(wasmBinary, wasmBinaryFile, e, function (_) {
                t(_.instance, _.module)
            }),
            {}
        )
    }
    ;(wasmBinaryFile = "tree-sitter.wasm"), isDataURI(wasmBinaryFile) || (wasmBinaryFile = locateFile(wasmBinaryFile))
    var ASM_CONSTS = {}
    function ExitStatus(e) {
        ;(this.name = "ExitStatus"), (this.message = `Program terminated with exit(${e})`), (this.status = e)
    }
    var GOT = {},
        currentModuleWeakSymbols = /* @__PURE__ */ new Set([]),
        GOTHandler = {
            get(e, t) {
                var _ = GOT[t]
                return _ || (_ = GOT[t] = new WebAssembly.Global({ value: "i32", mutable: true })), currentModuleWeakSymbols.has(t) || (_.required = true), _
            },
        },
        callRuntimeCallbacks = (e) => {
            for (; e.length > 0; ) e.shift()(Module)
        },
        UTF8Decoder = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0,
        UTF8ArrayToString = (e, t, _) => {
            for (var s = t + _, r = t; e[r] && !(r >= s); ) ++r
            if (r - t > 16 && e.buffer && UTF8Decoder) return UTF8Decoder.decode(e.subarray(t, r))
            for (var a = ""; t < r; ) {
                var o = e[t++]
                if (128 & o) {
                    var n = 63 & e[t++]
                    if ((224 & o) != 192) {
                        var u = 63 & e[t++]
                        if ((o = (240 & o) == 224 ? ((15 & o) << 12) | (n << 6) | u : ((7 & o) << 18) | (n << 12) | (u << 6) | (63 & e[t++])) < 65536) a += String.fromCharCode(o)
                        else {
                            var m = o - 65536
                            a += String.fromCharCode(55296 | (m >> 10), 56320 | (1023 & m))
                        }
                    } else a += String.fromCharCode(((31 & o) << 6) | n)
                } else a += String.fromCharCode(o)
            }
            return a
        },
        getDylinkMetadata = (e) => {
            var t = 0,
                _ = 0
            function s() {
                for (var h = 0, l = 1; ; ) {
                    var g = e[t++]
                    if (((h += (127 & g) * l), (l *= 128), !(128 & g))) break
                }
                return h
            }
            function r() {
                var h = s()
                return UTF8ArrayToString(e, (t += h) - h, h)
            }
            function a(h, l) {
                if (h) throw new Error(l)
            }
            var o = "dylink.0"
            if (e instanceof WebAssembly.Module) {
                var n = WebAssembly.Module.customSections(e, o)
                n.length === 0 && ((o = "dylink"), (n = WebAssembly.Module.customSections(e, o))), a(n.length === 0, "need dylink section"), (_ = (e = new Uint8Array(n[0])).length)
            } else {
                a(new Uint32Array(new Uint8Array(e.subarray(0, 24)).buffer)[0] != 1836278016, "need to see wasm magic number"), a(e[8] !== 0, "need the dylink section to be first"), (t = 9)
                var u = s()
                ;(_ = t + u), (o = r())
            }
            var m = { neededDynlibs: [], tlsExports: /* @__PURE__ */ new Set(), weakImports: /* @__PURE__ */ new Set() }
            if (o == "dylink") {
                ;(m.memorySize = s()), (m.memoryAlign = s()), (m.tableSize = s()), (m.tableAlign = s())
                for (var w = s(), c = 0; c < w; ++c) {
                    var f = r()
                    m.neededDynlibs.push(f)
                }
            } else
                for (a(o !== "dylink.0"); t < _; ) {
                    var p = e[t++],
                        I = s()
                    if (p === 1) (m.memorySize = s()), (m.memoryAlign = s()), (m.tableSize = s()), (m.tableAlign = s())
                    else if (p === 2) for (w = s(), c = 0; c < w; ++c) (f = r()), m.neededDynlibs.push(f)
                    else if (p === 3)
                        for (var d = s(); d--; ) {
                            var b = r()
                            256 & s() && m.tlsExports.add(b)
                        }
                    else if (p === 4) for (d = s(); d--; ) r(), (b = r()), (3 & s()) == 1 && m.weakImports.add(b)
                    else t += I
                }
            return m
        }
    function getValue(e, t = "i8") {
        switch ((t.endsWith("*") && (t = "*"), t)) {
            case "i1":
            case "i8":
                return HEAP8[e]
            case "i16":
                return HEAP16[e >> 1]
            case "i32":
                return HEAP32[e >> 2]
            case "i64":
                abort("to do getValue(i64) use WASM_BIGINT")
            case "float":
                return HEAPF32[e >> 2]
            case "double":
                return HEAPF64[e >> 3]
            case "*":
                return HEAPU32[e >> 2]
            default:
                abort(`invalid type for getValue: ${t}`)
        }
    }
    var newDSO = (e, t, _) => {
            var s = { refcount: 1 / 0, name: e, exports: _, global: true }
            return (LDSO.loadedLibsByName[e] = s), t != null && (LDSO.loadedLibsByHandle[t] = s), s
        },
        LDSO = {
            loadedLibsByName: {},
            loadedLibsByHandle: {},
            init() {
                newDSO("__main__", 0, wasmImports)
            },
        },
        ___heap_base = 78096,
        zeroMemory = (e, t) => (HEAPU8.fill(0, e, e + t), e),
        alignMemory = (e, t) => Math.ceil(e / t) * t,
        getMemory = (e) => {
            if (runtimeInitialized) return zeroMemory(_malloc(e), e)
            var t = ___heap_base,
                _ = t + alignMemory(e, 16);
            (!GOT.__heap_base)&&GOTHandler.get(wasmImports, "__heap_base");
            return (___heap_base = _), (GOT.__heap_base.value = _), t
        },
        isInternalSym = (e) => ["__cpp_exception", "__c_longjmp", "__wasm_apply_data_relocs", "__dso_handle", "__tls_size", "__tls_align", "__set_stack_limits", "_emscripten_tls_init", "__wasm_init_tls", "__wasm_call_ctors", "__start_em_asm", "__stop_em_asm", "__start_em_js", "__stop_em_js"].includes(e) || e.startsWith("__em_js__"),
        uleb128Encode = (e, t) => {
            e < 128 ? t.push(e) : t.push(e % 128 | 128, e >> 7)
        },
        sigToWasmTypes = (e) => {
            for (var t = { i: "i32", j: "i64", f: "f32", d: "f64", e: "externref", p: "i32" }, _ = { parameters: [], results: e[0] == "v" ? [] : [t[e[0]]] }, s = 1; s < e.length; ++s) _.parameters.push(t[e[s]])
            return _
        },
        generateFuncType = (e, t) => {
            var _ = e.slice(0, 1),
                s = e.slice(1),
                r = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 }
            t.push(96), uleb128Encode(s.length, t)
            for (var a = 0; a < s.length; ++a) t.push(r[s[a]])
            _ == "v" ? t.push(0) : t.push(1, r[_])
        },
        convertJsFunctionToWasm = (e, t) => {
            if (typeof WebAssembly.Function == "function") return new WebAssembly.Function(sigToWasmTypes(t), e)
            var _ = [1]
            generateFuncType(t, _)
            var s = [0, 97, 115, 109, 1, 0, 0, 0, 1]
            uleb128Encode(_.length, s), s.push(..._), s.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0)
            var r = new WebAssembly.Module(new Uint8Array(s))
            return new WebAssembly.Instance(r, { e: { f: e } }).exports.f
        },
        wasmTableMirror = [],
        wasmTable = new WebAssembly.Table({ initial: 27, element: "anyfunc" }),
        getWasmTableEntry = (e) => {
            var t = wasmTableMirror[e]
            return t || (e >= wasmTableMirror.length && (wasmTableMirror.length = e + 1), (wasmTableMirror[e] = t = wasmTable.get(e))), t
        },
        updateTableMap = (e, t) => {
            if (functionsInTableMap)
                for (var _ = e; _ < e + t; _++) {
                    var s = getWasmTableEntry(_)
                    s && functionsInTableMap.set(s, _)
                }
        },
        functionsInTableMap,
        getFunctionAddress = (e) => (functionsInTableMap || ((functionsInTableMap = /* @__PURE__ */ new WeakMap()), updateTableMap(0, wasmTable.length)), functionsInTableMap.get(e) || 0),
        freeTableIndexes = [],
        getEmptyTableSlot = () => {
            if (freeTableIndexes.length) return freeTableIndexes.pop()
            try {
                wasmTable.grow(1)
            } catch (e) {
                throw e instanceof RangeError ? "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH." : e
            }
            return wasmTable.length - 1
        },
        setWasmTableEntry = (e, t) => {
            wasmTable.set(e, t), (wasmTableMirror[e] = wasmTable.get(e))
        },
        addFunction = (e, t) => {
            var _ = getFunctionAddress(e)
            if (_) return _
            var s = getEmptyTableSlot()
            try {
                setWasmTableEntry(s, e)
            } catch (a) {
                if (!(a instanceof TypeError)) throw a
                var r = convertJsFunctionToWasm(e, t)
                setWasmTableEntry(s, r)
            }
            return functionsInTableMap.set(e, s), s
        },
        updateGOT = (e, t) => {
            for (var _ in e)
                if (!isInternalSym(_)) {
                    var s = e[_]
                    _.startsWith("orig$") && ((_ = _.split("$")[1]), (t = true)), (GOT[_] ||= new WebAssembly.Global({ value: "i32", mutable: true })), (t || GOT[_].value == 0) && (typeof s == "function" ? (GOT[_].value = addFunction(s)) : typeof s == "number" ? (GOT[_].value = s) : err(`unhandled export type for '${_}': ${typeof s}`))
                }
        },
        relocateExports = (e, t, _) => {
            var s = {}
            for (var r in e) {
                var a = e[r]
                typeof a == "object" && (a = a.value), typeof a == "number" && (a += t), (s[r] = a)
            }
            return updateGOT(s, _), s
        },
        isSymbolDefined = (e) => {
            var t = wasmImports[e]
            return !(!t || t.stub)
        },
        dynCallLegacy = (e, t, _) => (0, Module["dynCall_" + e])(t, ..._),
        dynCall = (e, t, _ = []) => (e.includes("j") ? dynCallLegacy(e, t, _) : getWasmTableEntry(t)(..._)),
        createInvokeFunction = (e) =>
            function () {
                var t = stackSave()
                try {
                    return dynCall(e, arguments[0], Array.prototype.slice.call(arguments, 1))
                } catch (_) {
                    if ((stackRestore(t), _ !== _ + 0)) throw _
                    _setThrew(1, 0)
                }
            },
        resolveGlobalSymbol = (e, t = false) => {
            var _
            return t && "orig$" + e in wasmImports && (e = "orig$" + e), isSymbolDefined(e) ? (_ = wasmImports[e]) : e.startsWith("invoke_") && (_ = wasmImports[e] = createInvokeFunction(e.split("_")[1])), { sym: _, name: e }
        },
        UTF8ToString = (e, t) => (e ? UTF8ArrayToString(HEAPU8, e, t) : ""),
        loadWebAssemblyModule = (binary, flags, libName, localScope, handle) => {
            var metadata = getDylinkMetadata(binary)
            function loadModule() {
                var firstLoad = !handle || !HEAP8[handle + 8]
                if (firstLoad) {
                    var memAlign = Math.pow(2, metadata.memoryAlign),
                        memoryBase = metadata.memorySize ? alignMemory(getMemory(metadata.memorySize + memAlign), memAlign) : 0,
                        tableBase = metadata.tableSize ? wasmTable.length : 0
                    handle && ((HEAP8[handle + 8] = 1), (HEAPU32[(handle + 12) >> 2] = memoryBase), (HEAP32[(handle + 16) >> 2] = metadata.memorySize), (HEAPU32[(handle + 20) >> 2] = tableBase), (HEAP32[(handle + 24) >> 2] = metadata.tableSize))
                } else (memoryBase = HEAPU32[(handle + 12) >> 2]), (tableBase = HEAPU32[(handle + 20) >> 2])
                var tableGrowthNeeded = tableBase + metadata.tableSize - wasmTable.length,
                    moduleExports
                function resolveSymbol(e) {
                    var t = resolveGlobalSymbol(e).sym
                    return !t && localScope && (t = localScope[e]), t || (t = moduleExports[e]), t
                }
                tableGrowthNeeded > 0 && wasmTable.grow(tableGrowthNeeded)
                var proxyHandler = {
                        get(e, t) {
                            switch (t) {
                                case "__memory_base":
                                    return memoryBase
                                case "__table_base":
                                    return tableBase
                            }
                            if (t in wasmImports && !wasmImports[t].stub) return wasmImports[t]
                            var _
                            return (
                                t in e ||
                                    (e[t] = (...s) => {
                                        _ ||= resolveSymbol(t)
                                        if (typeof _ != "function") {
                                            throw new Error(`\n\n(deno-tree-sitter speaking here)\nSo a wasm file you're trying to load is old or incomplete.\nI can't find the symbol ${JSON.stringify(t)}.\nThis is effectively a dynamic linking (dyld) error from compiling the C code that became wasm.\n\n`)
                                        }
                                        return _(...s)
                                    }),
                                e[t]
                            )
                        },
                    },
                    proxy = new Proxy({}, proxyHandler),
                    info = { "GOT.mem": new Proxy({}, GOTHandler), "GOT.func": new Proxy({}, GOTHandler), env: proxy, wasi_snapshot_preview1: proxy }
                function postInstantiation(module, instance) {
                    function addEmAsm(addr, body) {
                        for (var args = [], arity = 0; arity < 16 && body.indexOf("$" + arity) != -1; arity++) args.push("$" + arity)
                        args = args.join(",")
                        var func = `(${args}) => { ${body} };`
                        ASM_CONSTS[start] = eval(func)
                    }
                    if ((updateTableMap(tableBase, metadata.tableSize), (moduleExports = relocateExports(instance.exports, memoryBase)), flags.allowUndefined || reportUndefinedSymbols(), "__start_em_asm" in moduleExports))
                        for (var start = moduleExports.__start_em_asm, stop = moduleExports.__stop_em_asm; start < stop; ) {
                            var jsString = UTF8ToString(start)
                            addEmAsm(start, jsString), (start = HEAPU8.indexOf(0, start) + 1)
                        }
                    function addEmJs(name, cSig, body) {
                        var jsArgs = []
                        if (((cSig = cSig.slice(1, -1)), cSig != "void"))
                            for (var i in ((cSig = cSig.split(",")), cSig)) {
                                var jsArg = cSig[i].split(" ").pop()
                                jsArgs.push(jsArg.replace("*", ""))
                            }
                        var func = `(${jsArgs}) => ${body};`
                        moduleExports[name] = eval(func)
                    }
                    for (var name in moduleExports)
                        if (name.startsWith("__em_js__")) {
                            var start = moduleExports[name],
                                jsString = UTF8ToString(start),
                                parts = jsString.split("<::>")
                            addEmJs(name.replace("__em_js__", ""), parts[0], parts[1]), delete moduleExports[name]
                        }
                    var applyRelocs = moduleExports.__wasm_apply_data_relocs
                    applyRelocs && (runtimeInitialized ? applyRelocs() : __RELOC_FUNCS__.push(applyRelocs))
                    var init = moduleExports.__wasm_call_ctors
                    return init && (runtimeInitialized ? init() : __ATINIT__.push(init)), moduleExports
                }
                if (flags.loadAsync) {
                    if (binary instanceof WebAssembly.Module) {
                        var instance = new WebAssembly.Instance(binary, info)
                        return Promise.resolve(postInstantiation(binary, instance))
                    }
                    return WebAssembly.instantiate(binary, info).then((e) => postInstantiation(e.module, e.instance))
                }
                var module = binary instanceof WebAssembly.Module ? binary : new WebAssembly.Module(binary),
                    instance = new WebAssembly.Instance(module, info)
                return postInstantiation(module, instance)
            }
            return (currentModuleWeakSymbols = metadata.weakImports), flags.loadAsync ? metadata.neededDynlibs.reduce((e, t) => e.then(() => loadDynamicLibrary(t, flags)), Promise.resolve()).then(loadModule) : (metadata.neededDynlibs.forEach((e) => loadDynamicLibrary(e, flags, localScope)), loadModule())
        },
        mergeLibSymbols = (e, t) => {
            for (var [_, s] of Object.entries(e)) {
                let r = (o) => {
                    isSymbolDefined(o) || (wasmImports[o] = s)
                }
                r(_)
                let a = "__main_argc_argv"
                _ == "main" && r(a), _ == a && r("main"), _.startsWith("dynCall_") && !Module.hasOwnProperty(_) && (Module[_] = s)
            }
        },
        asyncLoad = (e, t, _, s) => {
            var r = s ? "" : `al ${e}`
            readAsync(
                e,
                (a) => {
                    t(new Uint8Array(a)), r && removeRunDependency(r)
                },
                (a) => {
                    if (!_) throw `Loading data file "${e}" failed.`
                    _()
                }
            ),
                r && addRunDependency(r)
        }
    function loadDynamicLibrary(e, t = { global: true, nodelete: true }, _, s) {
        var r = LDSO.loadedLibsByName[e]
        if (r) return t.global ? r.global || ((r.global = true), mergeLibSymbols(r.exports, e)) : _ && Object.assign(_, r.exports), t.nodelete && r.refcount !== 1 / 0 && (r.refcount = 1 / 0), r.refcount++, s && (LDSO.loadedLibsByHandle[s] = r), !t.loadAsync || Promise.resolve(true)
        function a() {
            if (s) {
                var u = HEAPU32[(s + 28) >> 2],
                    m = HEAPU32[(s + 32) >> 2]
                if (u && m) {
                    var w = HEAP8.slice(u, u + m)
                    return t.loadAsync ? Promise.resolve(w) : w
                }
            }
            var c = locateFile(e)
            if (t.loadAsync)
                return new Promise(function (f, p) {
                    asyncLoad(c, f, p)
                })
            if (!readBinary) throw new Error(`${c}: file not found, and synchronous loading of external files is not available`)
            return readBinary(c)
        }
        function o() {
            return t.loadAsync ? a().then((u) => loadWebAssemblyModule(u, t, e, _, s)) : loadWebAssemblyModule(a(), t, e, _, s)
        }
        function n(u) {
            r.global ? mergeLibSymbols(u, e) : _ && Object.assign(_, u), (r.exports = u)
        }
        return ((r = newDSO(e, s, "loading")).refcount = t.nodelete ? 1 / 0 : 1), (r.global = t.global), t.loadAsync ? o().then((u) => (n(u), true)) : (n(o()), true)
    }
    var reportUndefinedSymbols = () => {
            for (var [e, t] of Object.entries(GOT))
                if (t.value == 0) {
                    var _ = resolveGlobalSymbol(e, true).sym
                    if (!_ && !t.required) continue
                    if (typeof _ == "function") t.value = addFunction(_, _.sig)
                    else {
                        if (typeof _ != "number") throw new Error(`bad export type for '${e}': ${typeof _}`)
                        t.value = _
                    }
                }
        },
        loadDylibs = () => {
            dynamicLibraries.length
                ? (addRunDependency("loadDylibs"),
                dynamicLibraries
                    .reduce((e, t) => e.then(() => loadDynamicLibrary(t, { loadAsync: true, global: true, nodelete: true, allowUndefined: true })), Promise.resolve())
                    .then(() => {
                        reportUndefinedSymbols(), removeRunDependency("loadDylibs")
                    }))
                : reportUndefinedSymbols()
        },
        noExitRuntime = Module.noExitRuntime || true
    function setValue(e, t, _ = "i8") {
        switch ((_.endsWith("*") && (_ = "*"), _)) {
            case "i1":
            case "i8":
                HEAP8[e] = t
                break
            case "i16":
                HEAP16[e >> 1] = t
                break
            case "i32":
                HEAP32[e >> 2] = t
                break
            case "i64":
                abort("to do setValue(i64) use WASM_BIGINT")
            case "float":
                HEAPF32[e >> 2] = t
                break
            case "double":
                HEAPF64[e >> 3] = t
                break
            case "*":
                HEAPU32[e >> 2] = t
                break
            default:
                abort(`invalid type for setValue: ${_}`)
        }
    }
    var ___memory_base = new WebAssembly.Global({ value: "i32", mutable: false }, 1024),
        ___stack_pointer = new WebAssembly.Global({ value: "i32", mutable: true }, 78096),
        ___table_base = new WebAssembly.Global({ value: "i32", mutable: false }, 1),
        nowIsMonotonic = 1,
        __emscripten_get_now_is_monotonic = () => nowIsMonotonic
    __emscripten_get_now_is_monotonic.sig = "i"
    var _abort = () => {
        abort("")
    }
    _abort.sig = "v"
    var _emscripten_date_now = () => Date.now(),
        _emscripten_get_now
    ;(_emscripten_date_now.sig = "d"), (_emscripten_get_now = () => performance.now()), (_emscripten_get_now.sig = "d")
    var _emscripten_memcpy_js = (e, t, _) => HEAPU8.copyWithin(e, t, t + _)
    _emscripten_memcpy_js.sig = "vppp"
    var getHeapMax = () => 2147483648,
        growMemory = (e) => {
            var t = (e - wasmMemory.buffer.byteLength + 65535) / 65536
            try {
                return wasmMemory.grow(t), updateMemoryViews(), 1
            } catch {}
        },
        _emscripten_resize_heap = (e) => {
            var t = HEAPU8.length
            e >>>= 0
            var _ = getHeapMax()
            if (e > _) return false
            for (var s, r, a = 1; a <= 4; a *= 2) {
                var o = t * (1 + 0.2 / a)
                o = Math.min(o, e + 100663296)
                var n = Math.min(_, (s = Math.max(e, o)) + (((r = 65536) - (s % r)) % r))
                if (growMemory(n)) return true
            }
            return false
        }
    _emscripten_resize_heap.sig = "ip"
    var _fd_close = (e) => 52
    _fd_close.sig = "ii"
    var convertI32PairToI53Checked = (e, t) => ((t + 2097152) >>> 0 < 4194305 - !!e ? (e >>> 0) + 4294967296 * t : NaN)
    function _fd_seek(e, t, _, s, r) {
        return convertI32PairToI53Checked(t, _), 70
    }
    _fd_seek.sig = "iiiiip"
    var printCharBuffers = [null, [], []],
        printChar = (e, t) => {
            var _ = printCharBuffers[e]
            t === 0 || t === 10 ? ((e === 1 ? out : err)(UTF8ArrayToString(_, 0)), (_.length = 0)) : _.push(t)
        },
        SYSCALLS = {
            varargs: void 0,
            get() {
                var e = HEAP32[+SYSCALLS.varargs >> 2]
                return (SYSCALLS.varargs += 4), e
            },
            getp: () => SYSCALLS.get(),
            getStr: (e) => UTF8ToString(e),
        },
        _fd_write = (e, t, _, s) => {
            for (var r = 0, a = 0; a < _; a++) {
                var o = HEAPU32[t >> 2],
                    n = HEAPU32[(t + 4) >> 2]
                t += 8
                for (var u = 0; u < n; u++) printChar(e, HEAPU8[o + u])
                r += n
            }
            return (HEAPU32[s >> 2] = r), 0
        }
    function _tree_sitter_log_callback(e, t) {
        if (currentLogCallback) {
            let _ = UTF8ToString(t)
            currentLogCallback(_, e !== 0)
        }
    }
    function _tree_sitter_parse_callback(e, t, _, s, r) {
        let a = currentParseCallback(t, { row: _, column: s })
        typeof a == "string" ? (setValue(r, a.length, "i32"), stringToUTF16(a, e, 10240)) : setValue(r, 0, "i32")
    }
    _fd_write.sig = "iippp"
    var runtimeKeepaliveCounter = 0,
        keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0,
        _proc_exit = (e) => {
            ;(EXITSTATUS = e), keepRuntimeAlive() || (Module.onExit?.(e), (ABORT = true)), quit_(e, new ExitStatus(e))
        }
    _proc_exit.sig = "vi"
    var exitJS = (e, t) => {
            ;(EXITSTATUS = e), _proc_exit(e)
        },
        handleException = (e) => {
            if (e instanceof ExitStatus || e == "unwind") return EXITSTATUS
            quit_(1, e)
        },
        lengthBytesUTF8 = (e) => {
            for (var t = 0, _ = 0; _ < e.length; ++_) {
                var s = e.charCodeAt(_)
                s <= 127 ? t++ : s <= 2047 ? (t += 2) : s >= 55296 && s <= 57343 ? ((t += 4), ++_) : (t += 3)
            }
            return t
        },
        stringToUTF8Array = (e, t, _, s) => {
            if (!(s > 0)) return 0
            for (var r = _, a = _ + s - 1, o = 0; o < e.length; ++o) {
                var n = e.charCodeAt(o)
                if ((n >= 55296 && n <= 57343 && (n = (65536 + ((1023 & n) << 10)) | (1023 & e.charCodeAt(++o))), n <= 127)) {
                    if (_ >= a) break
                    t[_++] = n
                } else if (n <= 2047) {
                    if (_ + 1 >= a) break
                    ;(t[_++] = 192 | (n >> 6)), (t[_++] = 128 | (63 & n))
                } else if (n <= 65535) {
                    if (_ + 2 >= a) break
                    ;(t[_++] = 224 | (n >> 12)), (t[_++] = 128 | ((n >> 6) & 63)), (t[_++] = 128 | (63 & n))
                } else {
                    if (_ + 3 >= a) break
                    ;(t[_++] = 240 | (n >> 18)), (t[_++] = 128 | ((n >> 12) & 63)), (t[_++] = 128 | ((n >> 6) & 63)), (t[_++] = 128 | (63 & n))
                }
            }
            return (t[_] = 0), _ - r
        },
        stringToUTF8 = (e, t, _) => stringToUTF8Array(e, HEAPU8, t, _),
        stringToUTF8OnStack = (e) => {
            var t = lengthBytesUTF8(e) + 1,
                _ = stackAlloc(t)
            return stringToUTF8(e, _, t), _
        },
        stringToUTF16 = (e, t, _) => {
            if (((_ ??= 2147483647), _ < 2)) return 0
            for (var s = t, r = (_ -= 2) < 2 * e.length ? _ / 2 : e.length, a = 0; a < r; ++a) {
                var o = e.charCodeAt(a)
                ;(HEAP16[t >> 1] = o), (t += 2)
            }
            return (HEAP16[t >> 1] = 0), t - s
        },
        AsciiToString = (e) => {
            for (var t = ""; ; ) {
                var _ = HEAPU8[e++]
                if (!_) return t
                t += String.fromCharCode(_)
            }
        },
        wasmImports = { __heap_base: ___heap_base, __indirect_function_table: wasmTable, __memory_base: ___memory_base, __stack_pointer: ___stack_pointer, __table_base: ___table_base, _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic, abort: _abort, emscripten_get_now: _emscripten_get_now, emscripten_memcpy_js: _emscripten_memcpy_js, emscripten_resize_heap: _emscripten_resize_heap, fd_close: _fd_close, fd_seek: _fd_seek, fd_write: _fd_write, memory: wasmMemory, tree_sitter_log_callback: _tree_sitter_log_callback, tree_sitter_parse_callback: _tree_sitter_parse_callback },
        wasmExports = createWasm(),
        ___wasm_call_ctors = () => (___wasm_call_ctors = wasmExports.__wasm_call_ctors)(),
        ___wasm_apply_data_relocs = () => (___wasm_apply_data_relocs = wasmExports.__wasm_apply_data_relocs)(),
        _malloc = (Module._malloc = (e) => (_malloc = Module._malloc = wasmExports.malloc)(e)),
        _calloc = (Module._calloc = (e, t) => (_calloc = Module._calloc = wasmExports.calloc)(e, t)),
        _realloc = (Module._realloc = (e, t) => (_realloc = Module._realloc = wasmExports.realloc)(e, t)),
        _free = (Module._free = (e) => (_free = Module._free = wasmExports.free)(e)),
        _ts_language_symbol_count = (Module._ts_language_symbol_count = (e) => (_ts_language_symbol_count = Module._ts_language_symbol_count = wasmExports.ts_language_symbol_count)(e)),
        _ts_language_state_count = (Module._ts_language_state_count = (e) => (_ts_language_state_count = Module._ts_language_state_count = wasmExports.ts_language_state_count)(e)),
        _ts_language_version = (Module._ts_language_version = (e) => (_ts_language_version = Module._ts_language_version = wasmExports.ts_language_version)(e)),
        _ts_language_field_count = (Module._ts_language_field_count = (e) => (_ts_language_field_count = Module._ts_language_field_count = wasmExports.ts_language_field_count)(e)),
        _ts_language_next_state = (Module._ts_language_next_state = (e, t, _) => (_ts_language_next_state = Module._ts_language_next_state = wasmExports.ts_language_next_state)(e, t, _)),
        _ts_language_symbol_name = (Module._ts_language_symbol_name = (e, t) => (_ts_language_symbol_name = Module._ts_language_symbol_name = wasmExports.ts_language_symbol_name)(e, t)),
        _ts_language_symbol_for_name = (Module._ts_language_symbol_for_name = (e, t, _, s) => (_ts_language_symbol_for_name = Module._ts_language_symbol_for_name = wasmExports.ts_language_symbol_for_name)(e, t, _, s)),
        _strncmp = (Module._strncmp = (e, t, _) => (_strncmp = Module._strncmp = wasmExports.strncmp)(e, t, _)),
        _ts_language_symbol_type = (Module._ts_language_symbol_type = (e, t) => (_ts_language_symbol_type = Module._ts_language_symbol_type = wasmExports.ts_language_symbol_type)(e, t)),
        _ts_language_field_name_for_id = (Module._ts_language_field_name_for_id = (e, t) => (_ts_language_field_name_for_id = Module._ts_language_field_name_for_id = wasmExports.ts_language_field_name_for_id)(e, t)),
        _ts_lookahead_iterator_new = (Module._ts_lookahead_iterator_new = (e, t) => (_ts_lookahead_iterator_new = Module._ts_lookahead_iterator_new = wasmExports.ts_lookahead_iterator_new)(e, t)),
        _ts_lookahead_iterator_delete = (Module._ts_lookahead_iterator_delete = (e) => (_ts_lookahead_iterator_delete = Module._ts_lookahead_iterator_delete = wasmExports.ts_lookahead_iterator_delete)(e)),
        _ts_lookahead_iterator_reset_state = (Module._ts_lookahead_iterator_reset_state = (e, t) => (_ts_lookahead_iterator_reset_state = Module._ts_lookahead_iterator_reset_state = wasmExports.ts_lookahead_iterator_reset_state)(e, t)),
        _ts_lookahead_iterator_reset = (Module._ts_lookahead_iterator_reset = (e, t, _) => (_ts_lookahead_iterator_reset = Module._ts_lookahead_iterator_reset = wasmExports.ts_lookahead_iterator_reset)(e, t, _)),
        _ts_lookahead_iterator_next = (Module._ts_lookahead_iterator_next = (e) => (_ts_lookahead_iterator_next = Module._ts_lookahead_iterator_next = wasmExports.ts_lookahead_iterator_next)(e)),
        _ts_lookahead_iterator_current_symbol = (Module._ts_lookahead_iterator_current_symbol = (e) => (_ts_lookahead_iterator_current_symbol = Module._ts_lookahead_iterator_current_symbol = wasmExports.ts_lookahead_iterator_current_symbol)(e)),
        _memset = (Module._memset = (e, t, _) => (_memset = Module._memset = wasmExports.memset)(e, t, _)),
        _memcpy = (Module._memcpy = (e, t, _) => (_memcpy = Module._memcpy = wasmExports.memcpy)(e, t, _)),
        _ts_parser_delete = (Module._ts_parser_delete = (e) => (_ts_parser_delete = Module._ts_parser_delete = wasmExports.ts_parser_delete)(e)),
        _ts_parser_reset = (Module._ts_parser_reset = (e) => (_ts_parser_reset = Module._ts_parser_reset = wasmExports.ts_parser_reset)(e)),
        _ts_parser_set_language = (Module._ts_parser_set_language = (e, t) => (_ts_parser_set_language = Module._ts_parser_set_language = wasmExports.ts_parser_set_language)(e, t)),
        _ts_parser_timeout_micros = (Module._ts_parser_timeout_micros = (e) => (_ts_parser_timeout_micros = Module._ts_parser_timeout_micros = wasmExports.ts_parser_timeout_micros)(e)),
        _ts_parser_set_timeout_micros = (Module._ts_parser_set_timeout_micros = (e, t, _) => (_ts_parser_set_timeout_micros = Module._ts_parser_set_timeout_micros = wasmExports.ts_parser_set_timeout_micros)(e, t, _)),
        _ts_parser_set_included_ranges = (Module._ts_parser_set_included_ranges = (e, t, _) => (_ts_parser_set_included_ranges = Module._ts_parser_set_included_ranges = wasmExports.ts_parser_set_included_ranges)(e, t, _)),
        _memmove = (Module._memmove = (e, t, _) => (_memmove = Module._memmove = wasmExports.memmove)(e, t, _)),
        _memcmp = (Module._memcmp = (e, t, _) => (_memcmp = Module._memcmp = wasmExports.memcmp)(e, t, _)),
        _ts_query_new = (Module._ts_query_new = (e, t, _, s, r) => (_ts_query_new = Module._ts_query_new = wasmExports.ts_query_new)(e, t, _, s, r)),
        _ts_query_delete = (Module._ts_query_delete = (e) => (_ts_query_delete = Module._ts_query_delete = wasmExports.ts_query_delete)(e)),
        _iswspace = (Module._iswspace = (e) => (_iswspace = Module._iswspace = wasmExports.iswspace)(e)),
        _iswalnum = (Module._iswalnum = (e) => (_iswalnum = Module._iswalnum = wasmExports.iswalnum)(e)),
        _ts_query_pattern_count = (Module._ts_query_pattern_count = (e) => (_ts_query_pattern_count = Module._ts_query_pattern_count = wasmExports.ts_query_pattern_count)(e)),
        _ts_query_capture_count = (Module._ts_query_capture_count = (e) => (_ts_query_capture_count = Module._ts_query_capture_count = wasmExports.ts_query_capture_count)(e)),
        _ts_query_string_count = (Module._ts_query_string_count = (e) => (_ts_query_string_count = Module._ts_query_string_count = wasmExports.ts_query_string_count)(e)),
        _ts_query_capture_name_for_id = (Module._ts_query_capture_name_for_id = (e, t, _) => (_ts_query_capture_name_for_id = Module._ts_query_capture_name_for_id = wasmExports.ts_query_capture_name_for_id)(e, t, _)),
        _ts_query_string_value_for_id = (Module._ts_query_string_value_for_id = (e, t, _) => (_ts_query_string_value_for_id = Module._ts_query_string_value_for_id = wasmExports.ts_query_string_value_for_id)(e, t, _)),
        _ts_query_predicates_for_pattern = (Module._ts_query_predicates_for_pattern = (e, t, _) => (_ts_query_predicates_for_pattern = Module._ts_query_predicates_for_pattern = wasmExports.ts_query_predicates_for_pattern)(e, t, _)),
        _ts_query_disable_capture = (Module._ts_query_disable_capture = (e, t, _) => (_ts_query_disable_capture = Module._ts_query_disable_capture = wasmExports.ts_query_disable_capture)(e, t, _)),
        _ts_tree_copy = (Module._ts_tree_copy = (e) => (_ts_tree_copy = Module._ts_tree_copy = wasmExports.ts_tree_copy)(e)),
        _ts_tree_delete = (Module._ts_tree_delete = (e) => (_ts_tree_delete = Module._ts_tree_delete = wasmExports.ts_tree_delete)(e)),
        _ts_init = (Module._ts_init = () => (_ts_init = Module._ts_init = wasmExports.ts_init)()),
        _ts_parser_new_wasm = (Module._ts_parser_new_wasm = () => (_ts_parser_new_wasm = Module._ts_parser_new_wasm = wasmExports.ts_parser_new_wasm)()),
        _ts_parser_enable_logger_wasm = (Module._ts_parser_enable_logger_wasm = (e, t) => (_ts_parser_enable_logger_wasm = Module._ts_parser_enable_logger_wasm = wasmExports.ts_parser_enable_logger_wasm)(e, t)),
        _ts_parser_parse_wasm = (Module._ts_parser_parse_wasm = (e, t, _, s, r) => (_ts_parser_parse_wasm = Module._ts_parser_parse_wasm = wasmExports.ts_parser_parse_wasm)(e, t, _, s, r)),
        _ts_parser_included_ranges_wasm = (Module._ts_parser_included_ranges_wasm = (e) => (_ts_parser_included_ranges_wasm = Module._ts_parser_included_ranges_wasm = wasmExports.ts_parser_included_ranges_wasm)(e)),
        _ts_language_type_is_named_wasm = (Module._ts_language_type_is_named_wasm = (e, t) => (_ts_language_type_is_named_wasm = Module._ts_language_type_is_named_wasm = wasmExports.ts_language_type_is_named_wasm)(e, t)),
        _ts_language_type_is_visible_wasm = (Module._ts_language_type_is_visible_wasm = (e, t) => (_ts_language_type_is_visible_wasm = Module._ts_language_type_is_visible_wasm = wasmExports.ts_language_type_is_visible_wasm)(e, t)),
        _ts_tree_root_node_wasm = (Module._ts_tree_root_node_wasm = (e) => (_ts_tree_root_node_wasm = Module._ts_tree_root_node_wasm = wasmExports.ts_tree_root_node_wasm)(e)),
        _ts_tree_root_node_with_offset_wasm = (Module._ts_tree_root_node_with_offset_wasm = (e) => (_ts_tree_root_node_with_offset_wasm = Module._ts_tree_root_node_with_offset_wasm = wasmExports.ts_tree_root_node_with_offset_wasm)(e)),
        _ts_tree_edit_wasm = (Module._ts_tree_edit_wasm = (e) => (_ts_tree_edit_wasm = Module._ts_tree_edit_wasm = wasmExports.ts_tree_edit_wasm)(e)),
        _ts_tree_included_ranges_wasm = (Module._ts_tree_included_ranges_wasm = (e) => (_ts_tree_included_ranges_wasm = Module._ts_tree_included_ranges_wasm = wasmExports.ts_tree_included_ranges_wasm)(e)),
        _ts_tree_get_changed_ranges_wasm = (Module._ts_tree_get_changed_ranges_wasm = (e, t) => (_ts_tree_get_changed_ranges_wasm = Module._ts_tree_get_changed_ranges_wasm = wasmExports.ts_tree_get_changed_ranges_wasm)(e, t)),
        _ts_tree_cursor_new_wasm = (Module._ts_tree_cursor_new_wasm = (e) => (_ts_tree_cursor_new_wasm = Module._ts_tree_cursor_new_wasm = wasmExports.ts_tree_cursor_new_wasm)(e)),
        _ts_tree_cursor_delete_wasm = (Module._ts_tree_cursor_delete_wasm = (e) => (_ts_tree_cursor_delete_wasm = Module._ts_tree_cursor_delete_wasm = wasmExports.ts_tree_cursor_delete_wasm)(e)),
        _ts_tree_cursor_reset_wasm = (Module._ts_tree_cursor_reset_wasm = (e) => (_ts_tree_cursor_reset_wasm = Module._ts_tree_cursor_reset_wasm = wasmExports.ts_tree_cursor_reset_wasm)(e)),
        _ts_tree_cursor_reset_to_wasm = (Module._ts_tree_cursor_reset_to_wasm = (e, t) => (_ts_tree_cursor_reset_to_wasm = Module._ts_tree_cursor_reset_to_wasm = wasmExports.ts_tree_cursor_reset_to_wasm)(e, t)),
        _ts_tree_cursor_goto_first_child_wasm = (Module._ts_tree_cursor_goto_first_child_wasm = (e) => (_ts_tree_cursor_goto_first_child_wasm = Module._ts_tree_cursor_goto_first_child_wasm = wasmExports.ts_tree_cursor_goto_first_child_wasm)(e)),
        _ts_tree_cursor_goto_last_child_wasm = (Module._ts_tree_cursor_goto_last_child_wasm = (e) => (_ts_tree_cursor_goto_last_child_wasm = Module._ts_tree_cursor_goto_last_child_wasm = wasmExports.ts_tree_cursor_goto_last_child_wasm)(e)),
        _ts_tree_cursor_goto_first_child_for_index_wasm = (Module._ts_tree_cursor_goto_first_child_for_index_wasm = (e) => (_ts_tree_cursor_goto_first_child_for_index_wasm = Module._ts_tree_cursor_goto_first_child_for_index_wasm = wasmExports.ts_tree_cursor_goto_first_child_for_index_wasm)(e)),
        _ts_tree_cursor_goto_first_child_for_position_wasm = (Module._ts_tree_cursor_goto_first_child_for_position_wasm = (e) => (_ts_tree_cursor_goto_first_child_for_position_wasm = Module._ts_tree_cursor_goto_first_child_for_position_wasm = wasmExports.ts_tree_cursor_goto_first_child_for_position_wasm)(e)),
        _ts_tree_cursor_goto_next_sibling_wasm = (Module._ts_tree_cursor_goto_next_sibling_wasm = (e) => (_ts_tree_cursor_goto_next_sibling_wasm = Module._ts_tree_cursor_goto_next_sibling_wasm = wasmExports.ts_tree_cursor_goto_next_sibling_wasm)(e)),
        _ts_tree_cursor_goto_previous_sibling_wasm = (Module._ts_tree_cursor_goto_previous_sibling_wasm = (e) => (_ts_tree_cursor_goto_previous_sibling_wasm = Module._ts_tree_cursor_goto_previous_sibling_wasm = wasmExports.ts_tree_cursor_goto_previous_sibling_wasm)(e)),
        _ts_tree_cursor_goto_descendant_wasm = (Module._ts_tree_cursor_goto_descendant_wasm = (e, t) => (_ts_tree_cursor_goto_descendant_wasm = Module._ts_tree_cursor_goto_descendant_wasm = wasmExports.ts_tree_cursor_goto_descendant_wasm)(e, t)),
        _ts_tree_cursor_goto_parent_wasm = (Module._ts_tree_cursor_goto_parent_wasm = (e) => (_ts_tree_cursor_goto_parent_wasm = Module._ts_tree_cursor_goto_parent_wasm = wasmExports.ts_tree_cursor_goto_parent_wasm)(e)),
        _ts_tree_cursor_current_node_type_id_wasm = (Module._ts_tree_cursor_current_node_type_id_wasm = (e) => (_ts_tree_cursor_current_node_type_id_wasm = Module._ts_tree_cursor_current_node_type_id_wasm = wasmExports.ts_tree_cursor_current_node_type_id_wasm)(e)),
        _ts_tree_cursor_current_node_state_id_wasm = (Module._ts_tree_cursor_current_node_state_id_wasm = (e) => (_ts_tree_cursor_current_node_state_id_wasm = Module._ts_tree_cursor_current_node_state_id_wasm = wasmExports.ts_tree_cursor_current_node_state_id_wasm)(e)),
        _ts_tree_cursor_current_node_is_named_wasm = (Module._ts_tree_cursor_current_node_is_named_wasm = (e) => (_ts_tree_cursor_current_node_is_named_wasm = Module._ts_tree_cursor_current_node_is_named_wasm = wasmExports.ts_tree_cursor_current_node_is_named_wasm)(e)),
        _ts_tree_cursor_current_node_is_missing_wasm = (Module._ts_tree_cursor_current_node_is_missing_wasm = (e) => (_ts_tree_cursor_current_node_is_missing_wasm = Module._ts_tree_cursor_current_node_is_missing_wasm = wasmExports.ts_tree_cursor_current_node_is_missing_wasm)(e)),
        _ts_tree_cursor_current_node_id_wasm = (Module._ts_tree_cursor_current_node_id_wasm = (e) => (_ts_tree_cursor_current_node_id_wasm = Module._ts_tree_cursor_current_node_id_wasm = wasmExports.ts_tree_cursor_current_node_id_wasm)(e)),
        _ts_tree_cursor_start_position_wasm = (Module._ts_tree_cursor_start_position_wasm = (e) => (_ts_tree_cursor_start_position_wasm = Module._ts_tree_cursor_start_position_wasm = wasmExports.ts_tree_cursor_start_position_wasm)(e)),
        _ts_tree_cursor_end_position_wasm = (Module._ts_tree_cursor_end_position_wasm = (e) => (_ts_tree_cursor_end_position_wasm = Module._ts_tree_cursor_end_position_wasm = wasmExports.ts_tree_cursor_end_position_wasm)(e)),
        _ts_tree_cursor_start_index_wasm = (Module._ts_tree_cursor_start_index_wasm = (e) => (_ts_tree_cursor_start_index_wasm = Module._ts_tree_cursor_start_index_wasm = wasmExports.ts_tree_cursor_start_index_wasm)(e)),
        _ts_tree_cursor_end_index_wasm = (Module._ts_tree_cursor_end_index_wasm = (e) => (_ts_tree_cursor_end_index_wasm = Module._ts_tree_cursor_end_index_wasm = wasmExports.ts_tree_cursor_end_index_wasm)(e)),
        _ts_tree_cursor_current_field_id_wasm = (Module._ts_tree_cursor_current_field_id_wasm = (e) => (_ts_tree_cursor_current_field_id_wasm = Module._ts_tree_cursor_current_field_id_wasm = wasmExports.ts_tree_cursor_current_field_id_wasm)(e)),
        _ts_tree_cursor_current_depth_wasm = (Module._ts_tree_cursor_current_depth_wasm = (e) => (_ts_tree_cursor_current_depth_wasm = Module._ts_tree_cursor_current_depth_wasm = wasmExports.ts_tree_cursor_current_depth_wasm)(e)),
        _ts_tree_cursor_current_descendant_index_wasm = (Module._ts_tree_cursor_current_descendant_index_wasm = (e) => (_ts_tree_cursor_current_descendant_index_wasm = Module._ts_tree_cursor_current_descendant_index_wasm = wasmExports.ts_tree_cursor_current_descendant_index_wasm)(e)),
        _ts_tree_cursor_current_node_wasm = (Module._ts_tree_cursor_current_node_wasm = (e) => (_ts_tree_cursor_current_node_wasm = Module._ts_tree_cursor_current_node_wasm = wasmExports.ts_tree_cursor_current_node_wasm)(e)),
        _ts_node_symbol_wasm = (Module._ts_node_symbol_wasm = (e) => (_ts_node_symbol_wasm = Module._ts_node_symbol_wasm = wasmExports.ts_node_symbol_wasm)(e)),
        _ts_node_field_name_for_child_wasm = (Module._ts_node_field_name_for_child_wasm = (e, t) => (_ts_node_field_name_for_child_wasm = Module._ts_node_field_name_for_child_wasm = wasmExports.ts_node_field_name_for_child_wasm)(e, t)),
        _ts_node_children_by_field_id_wasm = (Module._ts_node_children_by_field_id_wasm = (e, t) => (_ts_node_children_by_field_id_wasm = Module._ts_node_children_by_field_id_wasm = wasmExports.ts_node_children_by_field_id_wasm)(e, t)),
        _ts_node_first_child_for_byte_wasm = (Module._ts_node_first_child_for_byte_wasm = (e) => (_ts_node_first_child_for_byte_wasm = Module._ts_node_first_child_for_byte_wasm = wasmExports.ts_node_first_child_for_byte_wasm)(e)),
        _ts_node_first_named_child_for_byte_wasm = (Module._ts_node_first_named_child_for_byte_wasm = (e) => (_ts_node_first_named_child_for_byte_wasm = Module._ts_node_first_named_child_for_byte_wasm = wasmExports.ts_node_first_named_child_for_byte_wasm)(e)),
        _ts_node_grammar_symbol_wasm = (Module._ts_node_grammar_symbol_wasm = (e) => (_ts_node_grammar_symbol_wasm = Module._ts_node_grammar_symbol_wasm = wasmExports.ts_node_grammar_symbol_wasm)(e)),
        _ts_node_child_count_wasm = (Module._ts_node_child_count_wasm = (e) => (_ts_node_child_count_wasm = Module._ts_node_child_count_wasm = wasmExports.ts_node_child_count_wasm)(e)),
        _ts_node_named_child_count_wasm = (Module._ts_node_named_child_count_wasm = (e) => (_ts_node_named_child_count_wasm = Module._ts_node_named_child_count_wasm = wasmExports.ts_node_named_child_count_wasm)(e)),
        _ts_node_child_wasm = (Module._ts_node_child_wasm = (e, t) => (_ts_node_child_wasm = Module._ts_node_child_wasm = wasmExports.ts_node_child_wasm)(e, t)),
        _ts_node_named_child_wasm = (Module._ts_node_named_child_wasm = (e, t) => (_ts_node_named_child_wasm = Module._ts_node_named_child_wasm = wasmExports.ts_node_named_child_wasm)(e, t)),
        _ts_node_child_by_field_id_wasm = (Module._ts_node_child_by_field_id_wasm = (e, t) => (_ts_node_child_by_field_id_wasm = Module._ts_node_child_by_field_id_wasm = wasmExports.ts_node_child_by_field_id_wasm)(e, t)),
        _ts_node_next_sibling_wasm = (Module._ts_node_next_sibling_wasm = (e) => (_ts_node_next_sibling_wasm = Module._ts_node_next_sibling_wasm = wasmExports.ts_node_next_sibling_wasm)(e)),
        _ts_node_prev_sibling_wasm = (Module._ts_node_prev_sibling_wasm = (e) => (_ts_node_prev_sibling_wasm = Module._ts_node_prev_sibling_wasm = wasmExports.ts_node_prev_sibling_wasm)(e)),
        _ts_node_next_named_sibling_wasm = (Module._ts_node_next_named_sibling_wasm = (e) => (_ts_node_next_named_sibling_wasm = Module._ts_node_next_named_sibling_wasm = wasmExports.ts_node_next_named_sibling_wasm)(e)),
        _ts_node_prev_named_sibling_wasm = (Module._ts_node_prev_named_sibling_wasm = (e) => (_ts_node_prev_named_sibling_wasm = Module._ts_node_prev_named_sibling_wasm = wasmExports.ts_node_prev_named_sibling_wasm)(e)),
        _ts_node_descendant_count_wasm = (Module._ts_node_descendant_count_wasm = (e) => (_ts_node_descendant_count_wasm = Module._ts_node_descendant_count_wasm = wasmExports.ts_node_descendant_count_wasm)(e)),
        _ts_node_parent_wasm = (Module._ts_node_parent_wasm = (e) => (_ts_node_parent_wasm = Module._ts_node_parent_wasm = wasmExports.ts_node_parent_wasm)(e)),
        _ts_node_descendant_for_index_wasm = (Module._ts_node_descendant_for_index_wasm = (e) => (_ts_node_descendant_for_index_wasm = Module._ts_node_descendant_for_index_wasm = wasmExports.ts_node_descendant_for_index_wasm)(e)),
        _ts_node_named_descendant_for_index_wasm = (Module._ts_node_named_descendant_for_index_wasm = (e) => (_ts_node_named_descendant_for_index_wasm = Module._ts_node_named_descendant_for_index_wasm = wasmExports.ts_node_named_descendant_for_index_wasm)(e)),
        _ts_node_descendant_for_position_wasm = (Module._ts_node_descendant_for_position_wasm = (e) => (_ts_node_descendant_for_position_wasm = Module._ts_node_descendant_for_position_wasm = wasmExports.ts_node_descendant_for_position_wasm)(e)),
        _ts_node_named_descendant_for_position_wasm = (Module._ts_node_named_descendant_for_position_wasm = (e) => (_ts_node_named_descendant_for_position_wasm = Module._ts_node_named_descendant_for_position_wasm = wasmExports.ts_node_named_descendant_for_position_wasm)(e)),
        _ts_node_start_point_wasm = (Module._ts_node_start_point_wasm = (e) => (_ts_node_start_point_wasm = Module._ts_node_start_point_wasm = wasmExports.ts_node_start_point_wasm)(e)),
        _ts_node_end_point_wasm = (Module._ts_node_end_point_wasm = (e) => (_ts_node_end_point_wasm = Module._ts_node_end_point_wasm = wasmExports.ts_node_end_point_wasm)(e)),
        _ts_node_start_index_wasm = (Module._ts_node_start_index_wasm = (e) => (_ts_node_start_index_wasm = Module._ts_node_start_index_wasm = wasmExports.ts_node_start_index_wasm)(e)),
        _ts_node_end_index_wasm = (Module._ts_node_end_index_wasm = (e) => (_ts_node_end_index_wasm = Module._ts_node_end_index_wasm = wasmExports.ts_node_end_index_wasm)(e)),
        _ts_node_to_string_wasm = (Module._ts_node_to_string_wasm = (e) => (_ts_node_to_string_wasm = Module._ts_node_to_string_wasm = wasmExports.ts_node_to_string_wasm)(e)),
        _ts_node_children_wasm = (Module._ts_node_children_wasm = (e) => (_ts_node_children_wasm = Module._ts_node_children_wasm = wasmExports.ts_node_children_wasm)(e)),
        _ts_node_named_children_wasm = (Module._ts_node_named_children_wasm = (e) => (_ts_node_named_children_wasm = Module._ts_node_named_children_wasm = wasmExports.ts_node_named_children_wasm)(e)),
        _ts_node_descendants_of_type_wasm = (Module._ts_node_descendants_of_type_wasm = (e, t, _, s, r, a, o) => (_ts_node_descendants_of_type_wasm = Module._ts_node_descendants_of_type_wasm = wasmExports.ts_node_descendants_of_type_wasm)(e, t, _, s, r, a, o)),
        _ts_node_is_named_wasm = (Module._ts_node_is_named_wasm = (e) => (_ts_node_is_named_wasm = Module._ts_node_is_named_wasm = wasmExports.ts_node_is_named_wasm)(e)),
        _ts_node_has_changes_wasm = (Module._ts_node_has_changes_wasm = (e) => (_ts_node_has_changes_wasm = Module._ts_node_has_changes_wasm = wasmExports.ts_node_has_changes_wasm)(e)),
        _ts_node_has_error_wasm = (Module._ts_node_has_error_wasm = (e) => (_ts_node_has_error_wasm = Module._ts_node_has_error_wasm = wasmExports.ts_node_has_error_wasm)(e)),
        _ts_node_is_error_wasm = (Module._ts_node_is_error_wasm = (e) => (_ts_node_is_error_wasm = Module._ts_node_is_error_wasm = wasmExports.ts_node_is_error_wasm)(e)),
        _ts_node_is_missing_wasm = (Module._ts_node_is_missing_wasm = (e) => (_ts_node_is_missing_wasm = Module._ts_node_is_missing_wasm = wasmExports.ts_node_is_missing_wasm)(e)),
        _ts_node_is_extra_wasm = (Module._ts_node_is_extra_wasm = (e) => (_ts_node_is_extra_wasm = Module._ts_node_is_extra_wasm = wasmExports.ts_node_is_extra_wasm)(e)),
        _ts_node_parse_state_wasm = (Module._ts_node_parse_state_wasm = (e) => (_ts_node_parse_state_wasm = Module._ts_node_parse_state_wasm = wasmExports.ts_node_parse_state_wasm)(e)),
        _ts_node_next_parse_state_wasm = (Module._ts_node_next_parse_state_wasm = (e) => (_ts_node_next_parse_state_wasm = Module._ts_node_next_parse_state_wasm = wasmExports.ts_node_next_parse_state_wasm)(e)),
        _ts_query_matches_wasm = (Module._ts_query_matches_wasm = (e, t, _, s, r, a, o, n, u, m) => (_ts_query_matches_wasm = Module._ts_query_matches_wasm = wasmExports.ts_query_matches_wasm)(e, t, _, s, r, a, o, n, u, m)),
        _ts_query_captures_wasm = (Module._ts_query_captures_wasm = (e, t, _, s, r, a, o, n, u, m) => (_ts_query_captures_wasm = Module._ts_query_captures_wasm = wasmExports.ts_query_captures_wasm)(e, t, _, s, r, a, o, n, u, m)),
        _iswalpha = (Module._iswalpha = (e) => (_iswalpha = Module._iswalpha = wasmExports.iswalpha)(e)),
        _iswblank = (Module._iswblank = (e) => (_iswblank = Module._iswblank = wasmExports.iswblank)(e)),
        _iswdigit = (Module._iswdigit = (e) => (_iswdigit = Module._iswdigit = wasmExports.iswdigit)(e)),
        _iswlower = (Module._iswlower = (e) => (_iswlower = Module._iswlower = wasmExports.iswlower)(e)),
        _iswupper = (Module._iswupper = (e) => (_iswupper = Module._iswupper = wasmExports.iswupper)(e)),
        _iswxdigit = (Module._iswxdigit = (e) => (_iswxdigit = Module._iswxdigit = wasmExports.iswxdigit)(e)),
        _memchr = (Module._memchr = (e, t, _) => (_memchr = Module._memchr = wasmExports.memchr)(e, t, _)),
        _strlen = (Module._strlen = (e) => (_strlen = Module._strlen = wasmExports.strlen)(e)),
        _strcmp = (Module._strcmp = (e, t) => (_strcmp = Module._strcmp = wasmExports.strcmp)(e, t)),
        _strncat = (Module._strncat = (e, t, _) => (_strncat = Module._strncat = wasmExports.strncat)(e, t, _)),
        _strncpy = (Module._strncpy = (e, t, _) => (_strncpy = Module._strncpy = wasmExports.strncpy)(e, t, _)),
        _towlower = (Module._towlower = (e) => (_towlower = Module._towlower = wasmExports.towlower)(e)),
        _towupper = (Module._towupper = (e) => (_towupper = Module._towupper = wasmExports.towupper)(e)),
        _setThrew = (e, t) => (_setThrew = wasmExports.setThrew)(e, t),
        stackSave = () => (stackSave = wasmExports.stackSave)(),
        stackRestore = (e) => (stackRestore = wasmExports.stackRestore)(e),
        stackAlloc = (e) => (stackAlloc = wasmExports.stackAlloc)(e),
        dynCall_jiji = (Module.dynCall_jiji = (e, t, _, s, r) => (dynCall_jiji = Module.dynCall_jiji = wasmExports.dynCall_jiji)(e, t, _, s, r)),
        _orig$ts_parser_timeout_micros = (Module._orig$ts_parser_timeout_micros = (e) => (_orig$ts_parser_timeout_micros = Module._orig$ts_parser_timeout_micros = wasmExports.orig$ts_parser_timeout_micros)(e)),
        _orig$ts_parser_set_timeout_micros = (Module._orig$ts_parser_set_timeout_micros = (e, t) => (_orig$ts_parser_set_timeout_micros = Module._orig$ts_parser_set_timeout_micros = wasmExports.orig$ts_parser_set_timeout_micros)(e, t)),
        calledRun
    function callMain(e = []) {
        var t = resolveGlobalSymbol("main").sym
        if (t) {
            e.unshift(thisProgram)
            var _ = e.length,
                s = stackAlloc(4 * (_ + 1)),
                r = s
            e.forEach((o) => {
                ;(HEAPU32[r >> 2] = stringToUTF8OnStack(o)), (r += 4)
            }),
                (HEAPU32[r >> 2] = 0)
            try {
                var a = t(_, s)
                return exitJS(a, true), a
            } catch (o) {
                return handleException(o)
            }
        }
    }
    function run(e = arguments_) {
        function t() {
            calledRun || ((calledRun = true), (Module.calledRun = true), ABORT || (initRuntime(), preMain(), Module.onRuntimeInitialized && Module.onRuntimeInitialized(), shouldRunNow && callMain(e), postRun()))
        }
        runDependencies > 0 ||
            (preRun(),
            runDependencies > 0 ||
                (Module.setStatus
                    ? (Module.setStatus("Running..."),
                    setTimeout(function () {
                        setTimeout(function () {
                            Module.setStatus("")
                        }, 1),
                            t()
                    }, 1))
                    : t()))
    }
    if (
        ((Module.AsciiToString = AsciiToString),
        (Module.stringToUTF16 = stringToUTF16),
        (dependenciesFulfilled = function e() {
            calledRun || run(), calledRun || (dependenciesFulfilled = e)
        }),
        Module.preInit)
    )
        for (typeof Module.preInit == "function" && (Module.preInit = [Module.preInit]); Module.preInit.length > 0; ) Module.preInit.pop()()
    var shouldRunNow = true
    Module.noInitialRun && (shouldRunNow = false), run()
    let C = Module,
        INTERNAL = {},
        SIZE_OF_INT = 4,
        SIZE_OF_CURSOR = 4 * SIZE_OF_INT,
        SIZE_OF_NODE = 5 * SIZE_OF_INT,
        SIZE_OF_POINT = 2 * SIZE_OF_INT,
        SIZE_OF_RANGE = 2 * SIZE_OF_INT + 2 * SIZE_OF_POINT,
        ZERO_POINT = { row: 0, column: 0 },
        QUERY_WORD_REGEX = /[\w-.]*/g,
        PREDICATE_STEP_TYPE_CAPTURE = 1,
        PREDICATE_STEP_TYPE_STRING = 2,
        LANGUAGE_FUNCTION_REGEX = /^_?tree_sitter_\w+/,
        VERSION,
        MIN_COMPATIBLE_VERSION,
        TRANSFER_BUFFER,
        currentParseCallback,
        currentLogCallback

// 
// 
// all the tree-sitter classes 
// 
// 
    let firstTime = true
    export class Parser {
        constructor() {
            this.initialize()
        }
        static init() {
            if (firstTime) {
                firstTime = false
                return
            }
            ;(TRANSFER_BUFFER = C._ts_init()), (VERSION = getValue(TRANSFER_BUFFER, "i32")), (MIN_COMPATIBLE_VERSION = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"))
        }
        initialize() {
            C._ts_parser_new_wasm(), (this[0] = getValue(TRANSFER_BUFFER, "i32")), (this[1] = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"))
        }
        delete() {
            C._ts_parser_delete(this[0]), C._free(this[1]), (this[0] = 0), (this[1] = 0)
        }
        setLanguage(t) {
            let _
            if (t) {
                if (t.constructor !== Language) throw new Error("Argument must be a Language")
                {
                    _ = t[0]
                    let s = C._ts_language_version(_)
                    if (s < MIN_COMPATIBLE_VERSION || VERSION < s) throw new Error(`Incompatible language version ${s}. Compatibility range ${MIN_COMPATIBLE_VERSION} through ${VERSION}.`)
                }
            } else (_ = 0), (t = null)
            return (this.language = t), C._ts_parser_set_language(this[0], _), this
        }
        getLanguage() {
            return this.language
        }
        // parse(input: string | Parser.Input, previousTree?: Parser.Tree, options?: Parser.Options): Parser.Tree
        parse(inputString, previousTree, options) {
            if (typeof inputString == "string") {
                currentParseCallback = (u, m) => inputString.slice(u)
            } else {
                if (typeof inputString != "function") throw new Error("Argument must be a string or a function")
                currentParseCallback = inputString
            }
            this.logCallback ? ((currentLogCallback = this.logCallback), C._ts_parser_enable_logger_wasm(this[0], 1)) : ((currentLogCallback = null), C._ts_parser_enable_logger_wasm(this[0], 0))
            let r = 0,
                a = 0
            if (options?.includedRanges) {
                ;(r = options.includedRanges.length), (a = C._calloc(r, SIZE_OF_RANGE))
                let u = a
                for (let m = 0; m < r; m++) marshalRange(u, options.includedRanges[m]), (u += SIZE_OF_RANGE)
            }
            let o = C._ts_parser_parse_wasm(this[0], this[1], previousTree ? previousTree[0] : 0, a, r)
            if (!o) throw ((currentParseCallback = null), (currentLogCallback = null), new Error("Parsing failed"))
            let n = new Tree(INTERNAL, o, this.language, currentParseCallback)
            n.parse = (newString,newOptions) => this.parse(newString, n, newOptions||options)
            // enable modification
            Object.defineProperty(n, "string", {
                get: () => inputString,
                set(v) {
                    inputString = v
                }
            })
            return (currentParseCallback = null), (currentLogCallback = null), n
        }
        reset() {
            C._ts_parser_reset(this[0])
        }
        getIncludedRanges() {
            C._ts_parser_included_ranges_wasm(this[0])
            let t = getValue(TRANSFER_BUFFER, "i32"),
                _ = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"),
                s = new Array(t)
            if (t > 0) {
                let r = _
                for (let a = 0; a < t; a++) (s[a] = unmarshalRange(r)), (r += SIZE_OF_RANGE)
                C._free(_)
            }
            return s
        }
        getTimeoutMicros() {
            return C._ts_parser_timeout_micros(this[0])
        }
        setTimeoutMicros(t) {
            C._ts_parser_set_timeout_micros(this[0], t)
        }
        setLogger(t) {
            if (t) {
                if (typeof t != "function") throw new Error("Logger callback must be a function")
            } else t = null
            return (this.logCallback = t), this
        }
        getLogger() {
            return this.logCallback
        }
    }
    export class Tree {
        constructor(t, _, s, r) {
            assertInternal(t), (this[0] = _), (this.language = s), (this.textCallback = r)
        }
        copy() {
            let t = C._ts_tree_copy(this[0])
            return new Tree(INTERNAL, t, this.language, this.textCallback)
        }
        delete() {
            C._ts_tree_delete(this[0]), (this[0] = 0)
        }
        edit({ startIndex, oldEndIndex, newEndIndex, startPosition, oldEndPosition, newEndPosition }) {
            marshalEdit({ startIndex, oldEndIndex, newEndIndex, startPosition, oldEndPosition, newEndPosition }), C._ts_tree_edit_wasm(this[0])
        }
        get rootNode() {
            return C._ts_tree_root_node_wasm(this[0]), unmarshalNode(this)
        }
        rootNodeWithOffset(t, _) {
            let s = TRANSFER_BUFFER + SIZE_OF_NODE
            return setValue(s, t, "i32"), marshalPoint(s + SIZE_OF_INT, _), C._ts_tree_root_node_with_offset_wasm(this[0]), unmarshalNode(this)
        }
        getLanguage() {
            return this.language
        }
        walk() {
            return this.rootNode.walk()
        }
        getChangedRanges(t) {
            if (t.constructor !== Tree) throw new TypeError("Argument must be a Tree")
            C._ts_tree_get_changed_ranges_wasm(this[0], t[0])
            let _ = getValue(TRANSFER_BUFFER, "i32"),
                s = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"),
                r = new Array(_)
            if (_ > 0) {
                let a = s
                for (let o = 0; o < _; o++) (r[o] = unmarshalRange(a)), (a += SIZE_OF_RANGE)
                C._free(s)
            }
            return r
        }
        getIncludedRanges() {
            C._ts_tree_included_ranges_wasm(this[0])
            let t = getValue(TRANSFER_BUFFER, "i32"),
                _ = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"),
                s = new Array(t)
            if (t > 0) {
                let r = _
                for (let a = 0; a < t; a++) (s[a] = unmarshalRange(r)), (r += SIZE_OF_RANGE)
                C._free(_)
            }
            return s
        }
    }
    export class Node {
        constructor(t, _) {
            assertInternal(t), (this.tree = _)
        }
        get typeId() {
            return marshalNode(this), C._ts_node_symbol_wasm(this.tree[0])
        }
        get grammarId() {
            return marshalNode(this), C._ts_node_grammar_symbol_wasm(this.tree[0])
        }
        get type() {
            return this.tree.language.types[this.typeId] || "ERROR"
        }
        get grammarType() {
            return this.tree.language.types[this.grammarId] || "ERROR"
        }
        get endPosition() {
            return marshalNode(this), C._ts_node_end_point_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER)
        }
        get endIndex() {
            return marshalNode(this), C._ts_node_end_index_wasm(this.tree[0])
        }
        get text() {
            return getText(this.tree, this.startIndex, this.endIndex)
        }
        get parseState() {
            return marshalNode(this), C._ts_node_parse_state_wasm(this.tree[0])
        }
        get nextParseState() {
            return marshalNode(this), C._ts_node_next_parse_state_wasm(this.tree[0])
        }
        get isNamed() {
            return marshalNode(this), C._ts_node_is_named_wasm(this.tree[0]) === 1
        }
        get hasError() {
            return marshalNode(this), C._ts_node_has_error_wasm(this.tree[0]) === 1
        }
        get hasChanges() {
            return marshalNode(this), C._ts_node_has_changes_wasm(this.tree[0]) === 1
        }
        get isError() {
            return marshalNode(this), C._ts_node_is_error_wasm(this.tree[0]) === 1
        }
        get isMissing() {
            return marshalNode(this), C._ts_node_is_missing_wasm(this.tree[0]) === 1
        }
        get isExtra() {
            return marshalNode(this), C._ts_node_is_extra_wasm(this.tree[0]) === 1
        }
        equals(t) {
            return this.id === t.id
        }
        child(t) {
            return marshalNode(this), C._ts_node_child_wasm(this.tree[0], t), unmarshalNode(this.tree)
        }
        namedChild(t) {
            return marshalNode(this), C._ts_node_named_child_wasm(this.tree[0], t), unmarshalNode(this.tree)
        }
        childForFieldId(t) {
            return marshalNode(this), C._ts_node_child_by_field_id_wasm(this.tree[0], t), unmarshalNode(this.tree)
        }
        childForFieldName(t) {
            let _ = this.tree.language.fields.indexOf(t)
            return _ !== -1 ? this.childForFieldId(_) : null
        }
        fieldNameForChild(t) {
            marshalNode(this)
            let _ = C._ts_node_field_name_for_child_wasm(this.tree[0], t)
            return _ ? AsciiToString(_) : null
        }
        childrenForFieldName(t) {
            let _ = this.tree.language.fields.indexOf(t)
            return _ !== -1 && _ !== 0 ? this.childrenForFieldId(_) : []
        }
        childrenForFieldId(t) {
            marshalNode(this), C._ts_node_children_by_field_id_wasm(this.tree[0], t)
            let _ = getValue(TRANSFER_BUFFER, "i32"),
                s = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"),
                r = new Array(_)
            if (_ > 0) {
                let a = s
                for (let o = 0; o < _; o++) (r[o] = unmarshalNode(this.tree, a)), (a += SIZE_OF_NODE)
                C._free(s)
            }
            return r
        }
        firstChildForIndex(t) {
            return marshalNode(this), setValue(TRANSFER_BUFFER + SIZE_OF_NODE, t, "i32"), C._ts_node_first_child_for_byte_wasm(this.tree[0]), unmarshalNode(this.tree)
        }
        firstNamedChildForIndex(t) {
            return marshalNode(this), setValue(TRANSFER_BUFFER + SIZE_OF_NODE, t, "i32"), C._ts_node_first_named_child_for_byte_wasm(this.tree[0]), unmarshalNode(this.tree)
        }
        get childCount() {
            return marshalNode(this), C._ts_node_child_count_wasm(this.tree[0])
        }
        get namedChildCount() {
            return marshalNode(this), C._ts_node_named_child_count_wasm(this.tree[0])
        }
        get firstChild() {
            return this.child(0)
        }
        get firstNamedChild() {
            return this.namedChild(0)
        }
        get lastChild() {
            return this.child(this.childCount - 1)
        }
        get lastNamedChild() {
            return this.namedChild(this.namedChildCount - 1)
        }
        get children() {
            if (!this._children) {
                marshalNode(this), C._ts_node_children_wasm(this.tree[0])
                let t = getValue(TRANSFER_BUFFER, "i32"),
                    _ = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32")
                if (((this._children = new Array(t)), t > 0)) {
                    let s = _
                    for (let r = 0; r < t; r++) (this._children[r] = unmarshalNode(this.tree, s)), (s += SIZE_OF_NODE)
                    C._free(_)
                }
            }
            return this._children
        }
        get namedChildren() {
            if (!this._namedChildren) {
                marshalNode(this), C._ts_node_named_children_wasm(this.tree[0])
                let t = getValue(TRANSFER_BUFFER, "i32"),
                    _ = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32")
                if (((this._namedChildren = new Array(t)), t > 0)) {
                    let s = _
                    for (let r = 0; r < t; r++) (this._namedChildren[r] = unmarshalNode(this.tree, s)), (s += SIZE_OF_NODE)
                    C._free(_)
                }
            }
            return this._namedChildren
        }
        descendantsOfType(t, _, s) {
            Array.isArray(t) || (t = [t]), _ || (_ = ZERO_POINT), s || (s = ZERO_POINT)
            let r = [],
                a = this.tree.language.types
            for (let w = 0, c = a.length; w < c; w++) t.includes(a[w]) && r.push(w)
            let o = C._malloc(SIZE_OF_INT * r.length)
            for (let w = 0, c = r.length; w < c; w++) setValue(o + w * SIZE_OF_INT, r[w], "i32")
            marshalNode(this), C._ts_node_descendants_of_type_wasm(this.tree[0], o, r.length, _.row, _.column, s.row, s.column)
            let n = getValue(TRANSFER_BUFFER, "i32"),
                u = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"),
                m = new Array(n)
            if (n > 0) {
                let w = u
                for (let c = 0; c < n; c++) (m[c] = unmarshalNode(this.tree, w)), (w += SIZE_OF_NODE)
            }
            return C._free(u), C._free(o), m
        }
        get nextSibling() {
            return marshalNode(this), C._ts_node_next_sibling_wasm(this.tree[0]), unmarshalNode(this.tree)
        }
        get previousSibling() {
            return marshalNode(this), C._ts_node_prev_sibling_wasm(this.tree[0]), unmarshalNode(this.tree)
        }
        get nextNamedSibling() {
            return marshalNode(this), C._ts_node_next_named_sibling_wasm(this.tree[0]), unmarshalNode(this.tree)
        }
        get previousNamedSibling() {
            return marshalNode(this), C._ts_node_prev_named_sibling_wasm(this.tree[0]), unmarshalNode(this.tree)
        }
        get descendantCount() {
            return marshalNode(this), C._ts_node_descendant_count_wasm(this.tree[0])
        }
        get parent() {
            return marshalNode(this), C._ts_node_parent_wasm(this.tree[0]), unmarshalNode(this.tree)
        }

        get depth() {
            if (this._depth == null) {
                if (this.parent == null) {
                    this._depth = 0
                } else {
                    this._depth = this.parent.depth + 1
                }
            }
            return this._depth
        }
        descendantForIndex(t, _ = t) {
            if (typeof t != "number" || typeof _ != "number") throw new Error("Arguments must be numbers")
            marshalNode(this)
            let s = TRANSFER_BUFFER + SIZE_OF_NODE
            return setValue(s, t, "i32"), setValue(s + SIZE_OF_INT, _, "i32"), C._ts_node_descendant_for_index_wasm(this.tree[0]), unmarshalNode(this.tree)
        }
        namedDescendantForIndex(t, _ = t) {
            if (typeof t != "number" || typeof _ != "number") throw new Error("Arguments must be numbers")
            marshalNode(this)
            let s = TRANSFER_BUFFER + SIZE_OF_NODE
            return setValue(s, t, "i32"), setValue(s + SIZE_OF_INT, _, "i32"), C._ts_node_named_descendant_for_index_wasm(this.tree[0]), unmarshalNode(this.tree)
        }
        descendantForPosition(t, _ = t) {
            if (!isPoint(t) || !isPoint(_)) throw new Error("Arguments must be {row, column} objects")
            marshalNode(this)
            let s = TRANSFER_BUFFER + SIZE_OF_NODE
            return marshalPoint(s, t), marshalPoint(s + SIZE_OF_POINT, _), C._ts_node_descendant_for_position_wasm(this.tree[0]), unmarshalNode(this.tree)
        }
        namedDescendantForPosition(t, _ = t) {
            if (!isPoint(t) || !isPoint(_)) throw new Error("Arguments must be {row, column} objects")
            marshalNode(this)
            let s = TRANSFER_BUFFER + SIZE_OF_NODE
            return marshalPoint(s, t), marshalPoint(s + SIZE_OF_POINT, _), C._ts_node_named_descendant_for_position_wasm(this.tree[0]), unmarshalNode(this.tree)
        }
        walk() {
            return marshalNode(this), C._ts_tree_cursor_new_wasm(this.tree[0]), new TreeCursor(INTERNAL, this.tree)
        }
        toString() {
            marshalNode(this)
            let t = C._ts_node_to_string_wasm(this.tree[0]),
                _ = AsciiToString(t)
            return C._free(t), _
        }
        get hasChildren() {
            return (this.children?.length || 0) > 0
        }
        *traverse(arg = { _parentNodes: [] }) {
            const { _parentNodes } = arg
            const parentNodes = [this, ..._parentNodes]
            if (this.children.length == 0) {
                yield [_parentNodes, this, "-"]
            } else {
                yield [_parentNodes, this, "->"]
                for (const each of this.children) {
                    if (each instanceof Node) {
                        for (const eachInner of each.traverse({ _parentNodes: parentNodes })) {
                            yield eachInner
                        }
                    } else {
                        yield [_parentNodes, each, "-"]
                    }
                }
                yield [_parentNodes, this, "<-"]
            }
        }
        toJSON() {
            const optionalData = {}
            if (typeof this.rootLeadingWhitespace == "string") {
                optionalData.rootLeadingWhitespace = this.rootLeadingWhitespace
            }
            if (this.children && this.children.length) {
                return {
                    type: this.type,
                    typeId: this.typeId,
                    startPosition: this.startPosition,
                    startIndex: this.startIndex,
                    endPosition: this.endPosition,
                    startIndex: this.startIndex,
                    endIndex: this.endIndex,
                    indent: this.indent,
                    textOverride: this.textOverride,
                    ...optionalData,
                    children: this.children.map((each) => each.toJSON()),
                }
            } else {
                return {
                    type: this.type,
                    typeId: this.typeId,
                    startPosition: this.startPosition,
                    startIndex: this.startIndex,
                    endPosition: this.endPosition,
                    startIndex: this.startIndex,
                    endIndex: this.endIndex,
                    indent: this.indent,
                    textOverride: this.textOverride,
                    ...optionalData,
                    text: this.text,
                    children: [],
                }
            }
        }
        [Symbol.for("Deno.customInspect")](inspect, options) {
            const optional = {}
            if (typeof this.rootLeadingWhitespace == "string") {
                optional.rootLeadingWhitespace = this.rootLeadingWhitespace
            }
            return inspect(
                {
                    type: this.type,
                    typeId: this.typeId,
                    startPosition: this.startPosition,
                    startIndex: this.startIndex,
                    endPosition: this.endPosition,
                    startIndex: this.startIndex,
                    endIndex: this.endIndex,
                    indent: this.indent,
                    ...optional,
                    hasChildren: this.hasChildren,
                    children: [...(this.children || [])],
                },
                options
            )
        }
        *[Symbol.iterator]() {
            yield* this.children
        }
        get length() {
            return this.children.length
        }
        /**
         * Query
         *
         * @example
         * ```js
         * import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter/main.js"
         * import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
         * const parser = await parserFromWasm(javascript) // path or Uint8Array
         * var tree = parser.parse('let a = 1;let b = 1;let c = 1;')
         *
         * tree.rootNode.query(`(identifier) @blahBlahBlah`, {matchLimit: 2})
         * // returns:
         * [
         *   {
         *     pattern: 0,
         *     captures: [
         *       {
         *         name: "blahBlahBlah",
         *         node: {
         *           type: "identifier",
         *           typeId: 1,
         *           startPosition: { row: 0, column: 4 },
         *           startIndex: 4,
         *           endPosition: { row: 0, column: 5 },
         *           endIndex: 5,
         *           indent: undefined,
         *           hasChildren: false,
         *           children: []
         *         }
         *       }
         *     ]
         *   },
         *   {
         *     pattern: 0,
         *     captures: [
         *       {
         *         name: "blahBlahBlah",
         *         node: {
         *           type: "identifier",
         *           typeId: 1,
         *           startPosition: { row: 0, column: 14 },
         *           startIndex: 14,
         *           endPosition: { row: 0, column: 15 },
         *           endIndex: 15,
         *           indent: undefined,
         *           hasChildren: false,
         *           children: []
         *         }
         *       }
         *     ]
         *   },
         *   {
         *     pattern: 0,
         *     captures: [
         *       {
         *         name: "blahBlahBlah",
         *         node: {
         *           type: "identifier",
         *           typeId: 1,
         *           startPosition: { row: 0, column: 24 },
         *           startIndex: 24,
         *           endPosition: { row: 0, column: 25 },
         *           endIndex: 25,
         *           indent: undefined,
         *           hasChildren: false,
         *           children: []
         *         }
         *       }
         *     ]
         *   }
         * ]
         * ```
         *
         * @param {String} queryString - see https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax
         * @param options.matchLimit - max number of results
         * @param options.startPosition - {row: Number, column: number}
         * @param options.endPosition - {row: Number, column: number}
         * @param options.maxResultDepth - depth relative to the current node (1 = direct children, 2 = grandchildren, etc)
         * @returns {[Object]} output
         *
         */
        query(queryString, options) {
            const { matchLimit, startPosition, endPosition, maxResultDepth } = options || {}
            const realMaxResultDepth = maxResultDepth == null ? Infinity : maxResultDepth
            const result = this.tree.language.query(queryString).matches(this, startPosition || this.startPosition, endPosition || this.endPosition, matchLimit)
            return result.filter((each) => each.captures.every((each) => each.node.depth - this.depth <= realMaxResultDepth))
        }
        /**
         * quickQuery
         *
         * @example
         * ```js
         * import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter/main.js"
         * import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/676ffa3b93768b8ac628fd5c61656f7dc41ba413/main/javascript.js"
         * const parser = await parserFromWasm(javascript) // path or Uint8Array
         * var tree = parser.parse('let a = 1;let b = 1;let c = 1;')
         *
         * tree.rootNode.quickQuery(`(identifier)`, {matchLimit: 2})
         * // returns:
         * [
         *   {
         *      type: "identifier",
         *      typeId: 1,
         *      startPosition: { row: 0, column: 4 },
         *      startIndex: 4,
         *      endPosition: { row: 0, column: 5 },
         *      endIndex: 5,
         *      indent: undefined,
         *      hasChildren: false,
         *      children: []
         *   }
         * ]
         * ```
         *
         * @param {String} queryString - see https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax
         * @param options.matchLimit - max number of results
         * @param options.startPosition - {row: Number, column: number}
         * @param options.endPosition - {row: Number, column: number}
         * @param options.maxResultDepth - depth relative to the current node (1 = direct children, 2 = grandchildren, etc)
         * @returns {[Object]} output
         *
         */
        quickQuery(queryString, options) {
            let topLevelVarname = ""
            let thereMightBeIssues = true
            while (thereMightBeIssues) {
                topLevelVarname = `${topLevelVarname}_`
                thereMightBeIssues = queryString.includes(`@${topLevelVarname} `) || queryString.includes(`@${topLevelVarname}\t`) || queryString.endsWith(`@${topLevelVarname}`)
            }
            // add the top-level extraction always
            queryString = `${queryString} @${topLevelVarname}`
            const output = this.query(queryString, options).map((each) => Object.fromEntries(each.captures.map((each) => [each.name, each.node])))
            // combine the top-level extraction and the named extractions using proxies
            return output.map((eachMatch) => {
                const topLevel = eachMatch[topLevelVarname]
                delete eachMatch[topLevelVarname]
                const keys = Object.keys(eachMatch)
                if (keys.length == 0) {
                    return topLevel
                }
                return new Proxy(topLevel, {
                    ownKeys(original, ...args) {
                        return keys.concat(Reflect.ownKeys(original, ...args))
                    },
                    getOwnPropertyDescriptor(original, prop) {
                        return {
                            enumerable: true,
                            configurable: true,
                        }
                    },
                    get(original, key, ...args) {
                        // replace the inspect and toJSON
                        if (key == Symbol.for("Deno.customInspect") || key == "toJSON") {
                            return (inspect = (a) => a, options = {}) => {
                                const optional = {}
                                if (typeof original.rootLeadingWhitespace == "string") {
                                    optional.rootLeadingWhitespace = original.rootLeadingWhitespace
                                }
                                return inspect(
                                    {
                                        ...Object.fromEntries(keys.map((eachKey) => [eachKey, eachMatch[eachKey]])),
                                        type: original.type,
                                        typeId: original.typeId,
                                        startPosition: original.startPosition,
                                        startIndex: original.startIndex,
                                        endPosition: original.endPosition,
                                        startIndex: original.startIndex,
                                        endIndex: original.endIndex,
                                        indent: original.indent,
                                        ...optional,
                                        hasChildren: original.hasChildren,
                                        children: [...(original.children || [])],
                                    },
                                    options
                                )
                            }
                        }
                        return keys.includes(key) ? eachMatch[key] : Reflect.get(original, key, ...args)
                    },
                    set(original, key, value) {
                        if (keys.includes(key)) {
                            eachMatch[key] = value
                        }
                        return Reflect.set(original, key, value)
                    },
                    has(target, key) {
                        return keys.includes(key) || Reflect.has(target, key)
                    },
                    deleteProperty(target, key) {
                        if (keys.includes(key)) {
                            delete keys[keys.indexOf(key)]
                        }
                        return Reflect.deleteProperty(target, key)
                    },
                    isExtensible: Reflect.isExtensible,
                    preventExtensions: Reflect.preventExtensions,
                    setPrototypeOf: Reflect.setPrototypeOf,
                    defineProperty: Reflect.defineProperty,
                    getPrototypeOf: Reflect.getPrototypeOf,
                })
            })
        }
        /**
         * quickQueryFirst
         *
         * @example
         * ```js
         * import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter/main.js"
         * import javascript from "https://github.com/jeff-hykin/common_tree_sitter_languages/raw/4d8a6d34d7f6263ff570f333cdcf5ded6be89e3d/main/javascript.js"
         * const parser = await parserFromWasm(javascript) // path or Uint8Array
         * var tree = parser.parse('let a = 1;let b = 1;let c = 1;')
         *
         * tree.rootNode.quickQueryFirst(`(identifier)`)
         * // returns:
         * ({
         *      type: "identifier",
         *      typeId: 1,
         *      startPosition: { row: 0, column: 4 },
         *      startIndex: 4,
         *      endPosition: { row: 0, column: 5 },
         *      endIndex: 5,
         *      indent: undefined,
         *      hasChildren: false,
         *      children: []
         * })
         * ```
         *
         * @param {String} queryString - see https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax
         * @param options.startPosition - {row: Number, column: number}
         * @param options.endPosition - {row: Number, column: number}
         * @param options.maxResultDepth - depth relative to the current node (1 = direct children, 2 = grandchildren, etc)
         * @returns {Object} output
         *
         */
        quickQueryFirst(queryString, options) {
            return this.quickQuery(queryString, { ...options, matchLimit: 1 })[0]
        }
        gutWith(stringOrNode) {
            const oldTree = this.tree
            const { startPosition: originalStart, endPosition: originalEnd, startIndex: originalStartIndex, endIndex: originalEndIndex } = this
            if (typeof stringOrNode != "string") {
                stringOrNode = stringOrNode?.text||""
            }
            const addedLines = stringOrNode.match(/\n/g)?.length || 0
            
            let newEndRow = originalStart.row
            if (addedLines == 0) {
                newEndRow = originalStart.row + stringOrNode.length
            } else {
                newEndRow = stringOrNode.split("\n").slice(-1)[0].length
            }
            const newString = this.tree.string.slice(0, originalStartIndex) + stringOrNode + this.tree.string.slice(originalEndIndex) 
            // update the .text of all the nodes
            this.tree.string = newString
            // update all the indices
            oldTree.edit({
                startIndex: originalStartIndex,
                oldEndIndex: originalEndIndex,
                newEndIndex: originalStartIndex + stringOrNode.length,
                startPosition: originalStart,
                oldEndPosition: originalEnd,
                newEndPosition: { row: newEndRow, column: originalStart.column + addedLines } 
            })
        }
    }
    export class TreeCursor {
        constructor(t, _) {
            assertInternal(t), (this.tree = _), unmarshalTreeCursor(this)
        }
        delete() {
            marshalTreeCursor(this), C._ts_tree_cursor_delete_wasm(this.tree[0]), (this[0] = this[1] = this[2] = 0)
        }
        reset(t) {
            marshalNode(t), marshalTreeCursor(this, TRANSFER_BUFFER + SIZE_OF_NODE), C._ts_tree_cursor_reset_wasm(this.tree[0]), unmarshalTreeCursor(this)
        }
        resetTo(t) {
            marshalTreeCursor(this, TRANSFER_BUFFER), marshalTreeCursor(t, TRANSFER_BUFFER + SIZE_OF_CURSOR), C._ts_tree_cursor_reset_to_wasm(this.tree[0], t.tree[0]), unmarshalTreeCursor(this)
        }
        get nodeType() {
            return this.tree.language.types[this.nodeTypeId] || "ERROR"
        }
        get nodeTypeId() {
            return marshalTreeCursor(this), C._ts_tree_cursor_current_node_type_id_wasm(this.tree[0])
        }
        get nodeStateId() {
            return marshalTreeCursor(this), C._ts_tree_cursor_current_node_state_id_wasm(this.tree[0])
        }
        get nodeId() {
            return marshalTreeCursor(this), C._ts_tree_cursor_current_node_id_wasm(this.tree[0])
        }
        get nodeIsNamed() {
            return marshalTreeCursor(this), C._ts_tree_cursor_current_node_is_named_wasm(this.tree[0]) === 1
        }
        get nodeIsMissing() {
            return marshalTreeCursor(this), C._ts_tree_cursor_current_node_is_missing_wasm(this.tree[0]) === 1
        }
        get nodeText() {
            marshalTreeCursor(this)
            let t = C._ts_tree_cursor_start_index_wasm(this.tree[0]),
                _ = C._ts_tree_cursor_end_index_wasm(this.tree[0])
            return getText(this.tree, t, _)
        }
        get startPosition() {
            return marshalTreeCursor(this), C._ts_tree_cursor_start_position_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER)
        }
        get endPosition() {
            return marshalTreeCursor(this), C._ts_tree_cursor_end_position_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER)
        }
        get startIndex() {
            return marshalTreeCursor(this), C._ts_tree_cursor_start_index_wasm(this.tree[0])
        }
        get endIndex() {
            return marshalTreeCursor(this), C._ts_tree_cursor_end_index_wasm(this.tree[0])
        }
        get currentNode() {
            return marshalTreeCursor(this), C._ts_tree_cursor_current_node_wasm(this.tree[0]), unmarshalNode(this.tree)
        }
        get currentFieldId() {
            return marshalTreeCursor(this), C._ts_tree_cursor_current_field_id_wasm(this.tree[0])
        }
        get currentFieldName() {
            return this.tree.language.fields[this.currentFieldId]
        }
        get currentDepth() {
            return marshalTreeCursor(this), C._ts_tree_cursor_current_depth_wasm(this.tree[0])
        }
        get currentDescendantIndex() {
            return marshalTreeCursor(this), C._ts_tree_cursor_current_descendant_index_wasm(this.tree[0])
        }
        gotoFirstChild() {
            marshalTreeCursor(this)
            let t = C._ts_tree_cursor_goto_first_child_wasm(this.tree[0])
            return unmarshalTreeCursor(this), t === 1
        }
        gotoLastChild() {
            marshalTreeCursor(this)
            let t = C._ts_tree_cursor_goto_last_child_wasm(this.tree[0])
            return unmarshalTreeCursor(this), t === 1
        }
        gotoFirstChildForIndex(t) {
            marshalTreeCursor(this), setValue(TRANSFER_BUFFER + SIZE_OF_CURSOR, t, "i32")
            let _ = C._ts_tree_cursor_goto_first_child_for_index_wasm(this.tree[0])
            return unmarshalTreeCursor(this), _ === 1
        }
        gotoFirstChildForPosition(t) {
            marshalTreeCursor(this), marshalPoint(TRANSFER_BUFFER + SIZE_OF_CURSOR, t)
            let _ = C._ts_tree_cursor_goto_first_child_for_position_wasm(this.tree[0])
            return unmarshalTreeCursor(this), _ === 1
        }
        gotoNextSibling() {
            marshalTreeCursor(this)
            let t = C._ts_tree_cursor_goto_next_sibling_wasm(this.tree[0])
            return unmarshalTreeCursor(this), t === 1
        }
        gotoPreviousSibling() {
            marshalTreeCursor(this)
            let t = C._ts_tree_cursor_goto_previous_sibling_wasm(this.tree[0])
            return unmarshalTreeCursor(this), t === 1
        }
        gotoDescendant(t) {
            marshalTreeCursor(this), C._ts_tree_cursor_goto_descendant_wasm(this.tree[0], t), unmarshalTreeCursor(this)
        }
        gotoParent() {
            marshalTreeCursor(this)
            let t = C._ts_tree_cursor_goto_parent_wasm(this.tree[0])
            return unmarshalTreeCursor(this), t === 1
        }
    }
    export class Language {
        constructor(t, _) {
            assertInternal(t), (this[0] = _), (this.types = new Array(C._ts_language_symbol_count(this[0])))
            for (let s = 0, r = this.types.length; s < r; s++) C._ts_language_symbol_type(this[0], s) < 2 && (this.types[s] = UTF8ToString(C._ts_language_symbol_name(this[0], s)))
            this.fields = new Array(C._ts_language_field_count(this[0]) + 1)
            for (let s = 0, r = this.fields.length; s < r; s++) {
                let a = C._ts_language_field_name_for_id(this[0], s)
                this.fields[s] = a !== 0 ? UTF8ToString(a) : null
            }
        }
        get version() {
            return C._ts_language_version(this[0])
        }
        get fieldCount() {
            return this.fields.length - 1
        }
        get stateCount() {
            return C._ts_language_state_count(this[0])
        }
        fieldIdForName(t) {
            let _ = this.fields.indexOf(t)
            return _ !== -1 ? _ : null
        }
        fieldNameForId(t) {
            return this.fields[t] || null
        }
        idForNodeType(t, _) {
            let s = lengthBytesUTF8(t),
                r = C._malloc(s + 1)
            stringToUTF8(t, r, s + 1)
            let a = C._ts_language_symbol_for_name(this[0], r, s, _)
            return C._free(r), a || null
        }
        get nodeTypeCount() {
            return C._ts_language_symbol_count(this[0])
        }
        nodeTypeForId(t) {
            let _ = C._ts_language_symbol_name(this[0], t)
            return _ ? UTF8ToString(_) : null
        }
        nodeTypeIsNamed(t) {
            return !!C._ts_language_type_is_named_wasm(this[0], t)
        }
        nodeTypeIsVisible(t) {
            return !!C._ts_language_type_is_visible_wasm(this[0], t)
        }
        nextState(t, _) {
            return C._ts_language_next_state(this[0], t, _)
        }
        lookaheadIterator(t) {
            let _ = C._ts_lookahead_iterator_new(this[0], t)
            return _ ? new LookaheadIterable(INTERNAL, _, this) : null
        }
        query(t) {
            let _ = lengthBytesUTF8(t),
                s = C._malloc(_ + 1)
            stringToUTF8(t, s, _ + 1)
            let r = C._ts_query_new(this[0], s, _, TRANSFER_BUFFER, TRANSFER_BUFFER + SIZE_OF_INT)
            if (!r) {
                let d = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"),
                    b = getValue(TRANSFER_BUFFER, "i32"),
                    h = UTF8ToString(s, b).length,
                    l = t.substr(h, 100).split(`\n`)[0],
                    g,
                    M = l.match(QUERY_WORD_REGEX)[0]
                switch (d) {
                    case 2:
                        g = new RangeError(`Bad node name '${M}'`)
                        break
                    case 3:
                        g = new RangeError(`Bad field name '${M}'`)
                        break
                    case 4:
                        g = new RangeError(`Bad capture name @${M}`)
                        break
                    case 5:
                        ;(g = new TypeError(`Bad pattern structure at offset ${h}: '${l}'...`)), (M = "")
                        break
                    default:
                        ;(g = new SyntaxError(`Bad syntax at offset ${h}: '${l}'...`)), (M = "")
                }
                throw ((g.index = h), (g.length = M.length), C._free(s), g)
            }
            let a = C._ts_query_string_count(r),
                o = C._ts_query_capture_count(r),
                n = C._ts_query_pattern_count(r),
                u = new Array(o),
                m = new Array(a)
            for (let d = 0; d < o; d++) {
                let b = C._ts_query_capture_name_for_id(r, d, TRANSFER_BUFFER),
                    h = getValue(TRANSFER_BUFFER, "i32")
                u[d] = UTF8ToString(b, h)
            }
            for (let d = 0; d < a; d++) {
                let b = C._ts_query_string_value_for_id(r, d, TRANSFER_BUFFER),
                    h = getValue(TRANSFER_BUFFER, "i32")
                m[d] = UTF8ToString(b, h)
            }
            let w = new Array(n),
                c = new Array(n),
                f = new Array(n),
                p = new Array(n),
                I = new Array(n)
            for (let d = 0; d < n; d++) {
                let b = C._ts_query_predicates_for_pattern(r, d, TRANSFER_BUFFER),
                    h = getValue(TRANSFER_BUFFER, "i32")
                ;(p[d] = []), (I[d] = [])
                let l = [],
                    g = b
                for (let M = 0; M < h; M++) {
                    let U = getValue(g, "i32")
                    g += SIZE_OF_INT
                    let W = getValue(g, "i32")
                    if (((g += SIZE_OF_INT), U === PREDICATE_STEP_TYPE_CAPTURE)) l.push({ type: "capture", name: u[W] })
                    else if (U === PREDICATE_STEP_TYPE_STRING) l.push({ type: "string", value: m[W] })
                    else if (l.length > 0) {
                        if (l[0].type !== "string") throw new Error("Predicates must begin with a literal value")
                        let T = l[0].value,
                            v,
                            R = true,
                            k = true
                        switch (T) {
                            case "any-not-eq?":
                            case "not-eq?":
                                R = false
                            case "any-eq?":
                            case "eq?":
                                if (l.length !== 3) throw new Error(`Wrong number of arguments to \`#${T}\` predicate. Expected 2, got ${l.length - 1}`)
                                if (l[1].type !== "capture") throw new Error(`First argument of \`#${T}\` predicate must be a capture. Got "${l[1].value}"`)
                                if (((k = !T.startsWith("any-")), l[2].type === "capture")) {
                                    let y = l[1].name,
                                        x = l[2].name
                                    I[d].push((S) => {
                                        let E = [],
                                            N = []
                                        for (let F of S) F.name === y && E.push(F.node), F.name === x && N.push(F.node)
                                        let B = (F, O, z) => (z ? F.text === O.text : F.text !== O.text)
                                        return k ? E.every((F) => N.some((O) => B(F, O, R))) : E.some((F) => N.some((O) => B(F, O, R)))
                                    })
                                } else {
                                    v = l[1].name
                                    let y = l[2].value,
                                        x = (E) => E.text === y,
                                        S = (E) => E.text !== y
                                    I[d].push((E) => {
                                        let N = []
                                        for (let F of E) F.name === v && N.push(F.node)
                                        let B = R ? x : S
                                        return k ? N.every(B) : N.some(B)
                                    })
                                }
                                break
                            case "any-not-match?":
                            case "not-match?":
                                R = false
                            case "any-match?":
                            case "match?":
                                if (l.length !== 3) throw new Error(`Wrong number of arguments to \`#${T}\` predicate. Expected 2, got ${l.length - 1}.`)
                                if (l[1].type !== "capture") throw new Error(`First argument of \`#${T}\` predicate must be a capture. Got "${l[1].value}".`)
                                if (l[2].type !== "string") throw new Error(`Second argument of \`#${T}\` predicate must be a string. Got @${l[2].value}.`)
                                v = l[1].name
                                let H = new RegExp(l[2].value)
                                ;(k = !T.startsWith("any-")),
                                    I[d].push((y) => {
                                        let x = []
                                        for (let E of y) E.name === v && x.push(E.node.text)
                                        let S = (E, N) => (N ? H.test(E) : !H.test(E))
                                        return x.length === 0 ? !R : k ? x.every((E) => S(E, R)) : x.some((E) => S(E, R))
                                    })
                                break
                            case "set!":
                                if (l.length < 2 || l.length > 3) throw new Error(`Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${l.length - 1}.`)
                                if (l.some((y) => y.type !== "string")) throw new Error('Arguments to `#set!` predicate must be a strings.".')
                                w[d] || (w[d] = {}), (w[d][l[1].value] = l[2] ? l[2].value : null)
                                break
                            case "is?":
                            case "is-not?":
                                if (l.length < 2 || l.length > 3) throw new Error(`Wrong number of arguments to \`#${T}\` predicate. Expected 1 or 2. Got ${l.length - 1}.`)
                                if (l.some((y) => y.type !== "string")) throw new Error(`Arguments to \`#${T}\` predicate must be a strings.".`)
                                let V = T === "is?" ? c : f
                                V[d] || (V[d] = {}), (V[d][l[1].value] = l[2] ? l[2].value : null)
                                break
                            case "not-any-of?":
                                R = false
                            case "any-of?":
                                if (l.length < 2) throw new Error(`Wrong number of arguments to \`#${T}\` predicate. Expected at least 1. Got ${l.length - 1}.`)
                                if (l[1].type !== "capture") throw new Error(`First argument of \`#${T}\` predicate must be a capture. Got "${l[1].value}".`)
                                for (let y = 2; y < l.length; y++) if (l[y].type !== "string") throw new Error(`Arguments to \`#${T}\` predicate must be a strings.".`)
                                v = l[1].name
                                let j = l.slice(2).map((y) => y.value)
                                I[d].push((y) => {
                                    let x = []
                                    for (let S of y) S.name === v && x.push(S.node.text)
                                    return x.length === 0 ? !R : x.every((S) => j.includes(S)) === R
                                })
                                break
                            default:
                                p[d].push({ operator: T, operands: l.slice(1) })
                        }
                        l.length = 0
                    }
                }
                Object.freeze(w[d]), Object.freeze(c[d]), Object.freeze(f[d])
            }
            return C._free(s), new Query(INTERNAL, r, u, I, p, Object.freeze(w), Object.freeze(c), Object.freeze(f))
        }
        static load(t) {
            let _
            if (t instanceof Uint8Array) _ = Promise.resolve(t)
            else {
                let s = t
                if (typeof __Process$ < "u" && __Process$.versions && __Process$.versions.node) {
                    let r = Z("fs")
                    _ = Promise.resolve(r.readFileSync(s))
                } else
                    _ = fetch(s).then((r) =>
                        r.arrayBuffer().then((a) => {
                            if (r.ok) return new Uint8Array(a)
                            {
                                let o = new TextDecoder("utf-8").decode(a)
                                throw new Error(`Language.load failed with status ${r.status}.\n\n${o}`)
                            }
                        })
                    )
            }
            return _.then((s) => loadWebAssemblyModule(s, { loadAsync: true })).then((s) => {
                let r = Object.keys(s),
                    a = r.find((n) => LANGUAGE_FUNCTION_REGEX.test(n) && !n.includes("external_scanner_"))
                a || console.log(`Couldn't find language function in WASM file. Symbols:\n${JSON.stringify(r, null, 2)}`)
                let o = s[a]()
                return new Language(INTERNAL, o)
            })
        }
    }
    export class LookaheadIterable {
        constructor(t, _, s) {
            assertInternal(t), (this[0] = _), (this.language = s)
        }
        get currentTypeId() {
            return C._ts_lookahead_iterator_current_symbol(this[0])
        }
        get currentType() {
            return this.language.types[this.currentTypeId] || "ERROR"
        }
        delete() {
            C._ts_lookahead_iterator_delete(this[0]), (this[0] = 0)
        }
        resetState(t) {
            return C._ts_lookahead_iterator_reset_state(this[0], t)
        }
        reset(t, _) {
            return !!C._ts_lookahead_iterator_reset(this[0], t[0], _) && ((this.language = t), true)
        }
        [Symbol.iterator]() {
            let t = this
            return { next: () => (C._ts_lookahead_iterator_next(t[0]) ? { done: false, value: t.currentType } : { done: true, value: "" }) }
        }
    }
    export class Query {
        constructor(t, _, s, r, a, o, n, u) {
            assertInternal(t), (this[0] = _), (this.captureNames = s), (this.textPredicates = r), (this.predicates = a), (this.setProperties = o), (this.assertedProperties = n), (this.refutedProperties = u), (this.exceededMatchLimit = false)
        }
        delete() {
            C._ts_query_delete(this[0]), (this[0] = 0)
        }
        matches(t, { startPosition: _ = ZERO_POINT, endPosition: s = ZERO_POINT, startIndex: r = 0, endIndex: a = 0, matchLimit: o = 4294967295, maxStartDepth: n = 4294967295 } = {}) {
            if (typeof o != "number") throw new Error("Arguments must be numbers")
            marshalNode(t), C._ts_query_matches_wasm(this[0], t.tree[0], _.row, _.column, s.row, s.column, r, a, o, n)
            let u = getValue(TRANSFER_BUFFER, "i32"),
                m = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"),
                w = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32"),
                c = new Array(u)
            this.exceededMatchLimit = !!w
            let f = 0,
                p = m
            for (let I = 0; I < u; I++) {
                let d = getValue(p, "i32")
                p += SIZE_OF_INT
                let b = getValue(p, "i32")
                p += SIZE_OF_INT
                let h = new Array(b)
                if (((p = unmarshalCaptures(this, t.tree, p, h)), this.textPredicates[d].every((l) => l(h)))) {
                    c[f] = { pattern: d, captures: h }
                    let l = this.setProperties[d]
                    l && (c[f].setProperties = l)
                    let g = this.assertedProperties[d]
                    g && (c[f].assertedProperties = g)
                    let M = this.refutedProperties[d]
                    M && (c[f].refutedProperties = M), f++
                }
            }
            return (c.length = f), C._free(m), c
        }
        *iterMatches(t, startPosition = null, endPosition = null, options) {
            var defaultValues = { startPosition: (_ = ZERO_POINT), endPosition: (s = ZERO_POINT), startIndex: (r = 0), endIndex: (a = 0), matchLimit: (o = 4294967295), maxStartDepth: (n = 4294967295) }
            if (!(originalStart instanceof Object && originalStart.row != undefined)) {
                var { startPosition, endPosition, matchLimit, startIndex, endIndex, maxStartDepth } = { ...defaultValues, ...options, ...startPosition }
            } else {
                var values = { ...defaultValues, ...options }
                var { matchLimit, startIndex, endIndex, maxStartDepth } = values
                if (endPosition === null) {
                    endPosition = values.endPosition
                }
            }
            if (matchLimit === void 0) matchLimit = 0
            if (typeof matchLimit != "number") throw new Error("Arguments must be numbers")
            marshalNode(t), C._ts_query_matches_wasm(this[0], t.tree[0], _.row, _.column, endPosition.row, endPosition.column, r, a, matchLimit, maxStartDepth)
            let u = getValue(TRANSFER_BUFFER, "i32"),
                m = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"),
                w = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32")
            this.exceededMatchLimit = !!w
            let p = m
            for (let I = 0; I < u; I++) {
                let d = getValue(p, "i32")
                p += SIZE_OF_INT
                let b = getValue(p, "i32")
                p += SIZE_OF_INT
                let h = new Array(b)
                if (((p = unmarshalCaptures(this, t.tree, p, h)), this.textPredicates[d].every((l) => l(h)))) {
                    const item = { pattern: d, captures: h }
                    let l = this.setProperties[d]
                    l && (item.setProperties = l)
                    let g = this.assertedProperties[d]
                    g && (item.assertedProperties = g)
                    let M = this.refutedProperties[d]
                    M && (item.refutedProperties = M)
                    yield item
                }
            }
            C._free(m)
        }

        captures(t, { startPosition: _ = ZERO_POINT, endPosition: s = ZERO_POINT, startIndex: r = 0, endIndex: a = 0, matchLimit: o = 4294967295, maxStartDepth: n = 4294967295 } = {}) {
            if (typeof o != "number") throw new Error("Arguments must be numbers")
            marshalNode(t), C._ts_query_captures_wasm(this[0], t.tree[0], _.row, _.column, s.row, s.column, r, a, o, n)
            let u = getValue(TRANSFER_BUFFER, "i32"),
                m = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"),
                w = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32"),
                c = []
            this.exceededMatchLimit = !!w
            let f = [],
                p = m
            for (let I = 0; I < u; I++) {
                let d = getValue(p, "i32")
                p += SIZE_OF_INT
                let b = getValue(p, "i32")
                p += SIZE_OF_INT
                let h = getValue(p, "i32")
                if (((p += SIZE_OF_INT), (f.length = b), (p = unmarshalCaptures(this, t.tree, p, f)), this.textPredicates[d].every((l) => l(f)))) {
                    let l = f[h],
                        g = this.setProperties[d]
                    g && (l.setProperties = g)
                    let M = this.assertedProperties[d]
                    M && (l.assertedProperties = M)
                    let U = this.refutedProperties[d]
                    U && (l.refutedProperties = U), c.push(l)
                }
            }
            return C._free(m), c
        }
        predicatesForPattern(t) {
            return this.predicates[t]
        }
        disableCapture(t) {
            let _ = lengthBytesUTF8(t),
                s = C._malloc(_ + 1)
            stringToUTF8(t, s, _ + 1), C._ts_query_disable_capture(this[0], s, _), C._free(s)
        }
        didExceedMatchLimit() {
            return this.exceededMatchLimit
        }
    }
// 
// 
// helpers
// 
// 
    function getText(e, t, _) {
        let s = _ - t,
            r = e.textCallback(t, null, _)
        for (t += r.length; t < _; ) {
            let a = e.textCallback(t, null, _)
            if (!(a && a.length > 0)) break
            ;(t += a.length), (r += a)
        }
        return t > _ && (r = r.slice(0, s)), r
    }
    function unmarshalCaptures(e, t, _, s) {
        for (let r = 0, a = s.length; r < a; r++) {
            let o = getValue(_, "i32"),
                n = unmarshalNode(t, (_ += SIZE_OF_INT))
            ;(_ += SIZE_OF_NODE), (s[r] = { name: e.captureNames[o], node: n })
        }
        return _
    }
    function assertInternal(e) {
        if (e !== INTERNAL) throw new Error("Illegal constructor")
    }
    function isPoint(e) {
        return e && typeof e.row == "number" && typeof e.column == "number"
    }
    function marshalNode(e) {
        let t = TRANSFER_BUFFER
        setValue(t, e.id, "i32"), (t += SIZE_OF_INT), setValue(t, e.startIndex, "i32"), (t += SIZE_OF_INT), setValue(t, e.startPosition.row, "i32"), (t += SIZE_OF_INT), setValue(t, e.startPosition.column, "i32"), (t += SIZE_OF_INT), setValue(t, e[0], "i32")
    }
    function unmarshalNode(e, t = TRANSFER_BUFFER) {
        let _ = getValue(t, "i32")
        if (_ === 0) return null
        let s = getValue((t += SIZE_OF_INT), "i32"),
            r = getValue((t += SIZE_OF_INT), "i32"),
            a = getValue((t += SIZE_OF_INT), "i32"),
            o = getValue((t += SIZE_OF_INT), "i32"),
            n = new Node(INTERNAL, e)
        return (n.id = _), (n.startIndex = s), (n.startPosition = { row: r, column: a }), (n[0] = o), n
    }
    function marshalTreeCursor(e, t = TRANSFER_BUFFER) {
        setValue(t + 0 * SIZE_OF_INT, e[0], "i32"), setValue(t + 1 * SIZE_OF_INT, e[1], "i32"), setValue(t + 2 * SIZE_OF_INT, e[2], "i32"), setValue(t + 3 * SIZE_OF_INT, e[3], "i32")
    }
    function unmarshalTreeCursor(e) {
        ;(e[0] = getValue(TRANSFER_BUFFER + 0 * SIZE_OF_INT, "i32")), (e[1] = getValue(TRANSFER_BUFFER + 1 * SIZE_OF_INT, "i32")), (e[2] = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32")), (e[3] = getValue(TRANSFER_BUFFER + 3 * SIZE_OF_INT, "i32"))
    }
    function marshalPoint(e, t) {
        setValue(e, t.row, "i32"), setValue(e + SIZE_OF_INT, t.column, "i32")
    }
    function unmarshalPoint(e) {
        return { row: getValue(e, "i32") >>> 0, column: getValue(e + SIZE_OF_INT, "i32") >>> 0 }
    }
    function marshalRange(e, t) {
        marshalPoint(e, t.startPosition), marshalPoint((e += SIZE_OF_POINT), t.endPosition), setValue((e += SIZE_OF_POINT), t.startIndex, "i32"), setValue((e += SIZE_OF_INT), t.endIndex, "i32"), (e += SIZE_OF_INT)
    }
    function unmarshalRange(e) {
        let t = {}
        return (t.startPosition = unmarshalPoint(e)), (e += SIZE_OF_POINT), (t.endPosition = unmarshalPoint(e)), (e += SIZE_OF_POINT), (t.startIndex = getValue(e, "i32") >>> 0), (e += SIZE_OF_INT), (t.endIndex = getValue(e, "i32") >>> 0), t
    }
    function marshalEdit(e) {
        let t = TRANSFER_BUFFER
        marshalPoint(t, e.startPosition), (t += SIZE_OF_POINT), marshalPoint(t, e.oldEndPosition), (t += SIZE_OF_POINT), marshalPoint(t, e.newEndPosition), (t += SIZE_OF_POINT), setValue(t, e.startIndex, "i32"), (t += SIZE_OF_INT), setValue(t, e.oldEndIndex, "i32"), (t += SIZE_OF_INT), setValue(t, e.newEndIndex, "i32"), (t += SIZE_OF_INT)
    }

    Parser.Language = Language
    Module.onRuntimeInitialized = ()=>Parser.init()

export default Parser