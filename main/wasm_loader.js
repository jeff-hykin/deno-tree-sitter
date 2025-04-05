// this file is the loader for tree-sitter.wasm, specifically derived from v0.25.3 of web-tree-sitter
    // unlike the normal tree sitter code, this code allows for arguments to be given
    // which allows it to be run on Deno, Web, Webworkers, and Node
    // there is no platform-dependant code in here

const __name = (thing, name)=>thing
const defaults = {
        arguments: [],
        dynamicLibraries: [],
        thisProgram: "./this.program",
        INITIAL_MEMORY: 33554432,
        wasmBinary: null,
        wasmBinaryFilePath: null,
        noExitRuntime: true,
        noInitialRun: false,
        monitorRunDependencies: null, // func
        onRuntimeInitialized: null, // func
        preRun: null, // func or array of functions
        preInit: null, // func or array of functions
        onAbort: null, // func
        onExit: null, // func
        postRun: null, // func or array of functions
        setStatus: null, // func, string arg of "Running..."
        defaultWasmPath: "tree-sitter.wasm",
        quit: (status, toThrow) => {
            throw toThrow
        },
        locateFile: (relativePath)=>{
            return relativePath
        },
        readAsync: async (path)=>{}, // expects Uint8Array output
        readBinary: (path)=>{}, // expects Uint8Array output
        print: null, // console.log alternative
        printErr: null, // console.log alternative
        instantiateWasm: null,  //  func(info, receiveInstance), // probably most important
        fetch: globalThis.fetch,
            // info2={
            //     env: wasmImports,
            //     wasi_snapshot_preview1: wasmImports,
            //     "GOT.mem": new Proxy(wasmImports, GOTHandler),
            //     "GOT.func": new Proxy(wasmImports, GOTHandler),
            // }
            // needs to call receiveInstance
            // receiveInstance(instantiationResult["instance"], instantiationResult["module"])
}
export default async function (Module) {
    Module = Object.assign({}, defaults, Module)
    var readyPromiseResolve, readyPromiseReject
    var readyPromise = new Promise((resolve, reject) => {
        readyPromiseResolve = resolve
        readyPromiseReject = reject
    })
    Module.currentQueryProgressCallback = null
    Module.currentProgressCallback = null
    Module.currentLogCallback = null
    Module.currentParseCallback = null
    var {
        arguments: arguments_,
        thisProgram,
        INITIAL_MEMORY,
        noExitRuntime,
        dynamicLibraries,
        wasmBinary,
        wasmBinaryFilePath,
        quit: quit_,
        locateFile,
        readAsync,
        readBinary,
        scriptDirectory,
        wasmMemory,
    } = Module
    __name(quit_, "quit_")
    __name(locateFile, "locateFile")
    __name(readBinary, "readBinary")
    __name(readAsync, "readAsync")
    
    var out = Module["print"] || console.log.bind(console)
    var err = Module["printErr"] || console.error.bind(console)
    
    wasmMemory = wasmMemory || new WebAssembly.Memory({
        initial: INITIAL_MEMORY / 65536,
        // In theory we should not need to emit the maximum if we want "unlimited"
        // or 4GB of memory, but VMs error on that atm, see
        // https://github.com/emscripten-core/emscripten/issues/14130
        // And in the pthreads case we definitely need to emit a maximum. So
        // always emit one.
        maximum: 32768,
    })

    var ABORT = false
    var EXITSTATUS
    function assert(condition, text) {
        if (!condition) {
            abort(text)
        }
    }
    __name(assert, "assert")
    var HEAP, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAP64, HEAPU64, HEAPF64
    var HEAP_DATA_VIEW
    var runtimeInitialized = false
    var dataURIPrefix = "data:application/octet-stream;base64,"
    var isUrl = (filename)=>{
        try {
            new URL(filename)
        } catch (error) {
            if (error?.message?.startsWith?.("Invalid URL: ")) {
                return false
            }
        }
        return true
    }
    var isDataURI = /* @__PURE__ */ __name((filename) => filename.startsWith(dataURIPrefix), "isDataURI")
    var isFileURI = /* @__PURE__ */ __name((filename) => filename.startsWith("file://"), "isFileURI")
    function updateMemoryViews() {
        var b = wasmMemory.buffer
        Module["HEAP_DATA_VIEW"] = HEAP_DATA_VIEW = new DataView(b)
        Module["HEAP8"] = HEAP8 = new Int8Array(b)
        Module["HEAP16"] = HEAP16 = new Int16Array(b)
        Module["HEAPU8"] = HEAPU8 = new Uint8Array(b)
        Module["HEAPU16"] = HEAPU16 = new Uint16Array(b)
        Module["HEAP32"] = HEAP32 = new Int32Array(b)
        Module["HEAPU32"] = HEAPU32 = new Uint32Array(b)
        Module["HEAPF32"] = HEAPF32 = new Float32Array(b)
        Module["HEAPF64"] = HEAPF64 = new Float64Array(b)
        Module["HEAP64"] = HEAP64 = new BigInt64Array(b)
        Module["HEAPU64"] = HEAPU64 = new BigUint64Array(b)
    }
    __name(updateMemoryViews, "updateMemoryViews")
    updateMemoryViews()
    var __ATPRERUN__ = []
    var __ATINIT__ = []
    var __ATMAIN__ = []
    var __ATEXIT__ = []
    var __ATPOSTRUN__ = []
    var __RELOC_FUNCS__ = []
    function preRun() {
        if (Module["preRun"]) {
            if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]]
            while (Module["preRun"].length) {
                addOnPreRun(Module["preRun"].shift())
            }
        }
        callRuntimeCallbacks(__ATPRERUN__)
    }
    __name(preRun, "preRun")
    function initRuntime() {
        runtimeInitialized = true
        callRuntimeCallbacks(__RELOC_FUNCS__)
        callRuntimeCallbacks(__ATINIT__)
    }
    __name(initRuntime, "initRuntime")
    function preMain() {
        callRuntimeCallbacks(__ATMAIN__)
    }
    __name(preMain, "preMain")
    function postRun() {
        if (Module["postRun"]) {
            if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]]
            while (Module["postRun"].length) {
                addOnPostRun(Module["postRun"].shift())
            }
        }
        callRuntimeCallbacks(__ATPOSTRUN__)
    }
    __name(postRun, "postRun")
    function addOnPreRun(cb) {
        __ATPRERUN__.unshift(cb)
    }
    __name(addOnPreRun, "addOnPreRun")
    function addOnInit(cb) {
        __ATINIT__.unshift(cb)
    }
    __name(addOnInit, "addOnInit")
    function addOnPreMain(cb) {
        __ATMAIN__.unshift(cb)
    }
    __name(addOnPreMain, "addOnPreMain")
    function addOnExit(cb) {}
    __name(addOnExit, "addOnExit")
    function addOnPostRun(cb) {
        __ATPOSTRUN__.unshift(cb)
    }
    __name(addOnPostRun, "addOnPostRun")
    var runDependencies = 0
    var dependenciesFulfilled = null
    function getUniqueRunDependency(id) {
        return id
    }
    __name(getUniqueRunDependency, "getUniqueRunDependency")
    function addRunDependency(id) {
        runDependencies++
        Module["monitorRunDependencies"]?.(runDependencies)
    }
    __name(addRunDependency, "addRunDependency")
    function removeRunDependency(id) {
        runDependencies--
        Module["monitorRunDependencies"]?.(runDependencies)
        if (runDependencies == 0) {
            if (dependenciesFulfilled) {
                var callback = dependenciesFulfilled
                dependenciesFulfilled = null
                callback()
            }
        }
    }
    __name(removeRunDependency, "removeRunDependency")
    function abort(what) {
        Module["onAbort"]?.(what)
        what = "Aborted(" + what + ")"
        err(what)
        ABORT = true
        what += ". Build with -sASSERTIONS for more info."
        var e = new WebAssembly.RuntimeError(what)
        readyPromiseReject(e)
        throw e
    }
    __name(abort, "abort")
    
    var ASM_CONSTS = {}
    class ExitStatus {
        static {
            __name(this, "ExitStatus")
        }
        name = "ExitStatus"
        constructor(status) {
            this.message = `Program terminated with exit(${status})`
            this.status = status
        }
    }
    var GOT = {}
    var currentModuleWeakSymbols = /* @__PURE__ */ new Set([])
    var GOTHandler = {
        get(obj, symName) {
            var rtn = GOT[symName]
            if (!rtn) {
                rtn = GOT[symName] = new WebAssembly.Global({
                    value: "i32",
                    mutable: true,
                })
            }
            if (!currentModuleWeakSymbols.has(symName)) {
                rtn.required = true
            }
            return rtn
        },
    }
    var LE_HEAP_LOAD_F32 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getFloat32(byteOffset, true), "LE_HEAP_LOAD_F32")
    var LE_HEAP_LOAD_F64 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getFloat64(byteOffset, true), "LE_HEAP_LOAD_F64")
    var LE_HEAP_LOAD_I16 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getInt16(byteOffset, true), "LE_HEAP_LOAD_I16")
    var LE_HEAP_LOAD_I32 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getInt32(byteOffset, true), "LE_HEAP_LOAD_I32")
    var LE_HEAP_LOAD_U16 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getUint16(byteOffset, true), "LE_HEAP_LOAD_U16")
    var LE_HEAP_LOAD_U32 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getUint32(byteOffset, true), "LE_HEAP_LOAD_U32")
    var LE_HEAP_STORE_F32 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setFloat32(byteOffset, value, true), "LE_HEAP_STORE_F32")
    var LE_HEAP_STORE_F64 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setFloat64(byteOffset, value, true), "LE_HEAP_STORE_F64")
    var LE_HEAP_STORE_I16 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setInt16(byteOffset, value, true), "LE_HEAP_STORE_I16")
    var LE_HEAP_STORE_I32 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setInt32(byteOffset, value, true), "LE_HEAP_STORE_I32")
    var LE_HEAP_STORE_U16 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setUint16(byteOffset, value, true), "LE_HEAP_STORE_U16")
    var LE_HEAP_STORE_U32 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setUint32(byteOffset, value, true), "LE_HEAP_STORE_U32")
    var callRuntimeCallbacks = /* @__PURE__ */ __name((callbacks) => {
        while (callbacks.length > 0) {
            callbacks.shift()(Module)
        }
    }, "callRuntimeCallbacks")
    var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder() : void 0
    var UTF8ArrayToString = /* @__PURE__ */ __name((heapOrArray, idx = 0, maxBytesToRead = NaN) => {
        var endIdx = idx + maxBytesToRead
        var endPtr = idx
        while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr
        if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
            return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr))
        }
        var str = ""
        while (idx < endPtr) {
            var u0 = heapOrArray[idx++]
            if (!(u0 & 128)) {
                str += String.fromCharCode(u0)
                continue
            }
            var u1 = heapOrArray[idx++] & 63
            if ((u0 & 224) == 192) {
                str += String.fromCharCode(((u0 & 31) << 6) | u1)
                continue
            }
            var u2 = heapOrArray[idx++] & 63
            if ((u0 & 240) == 224) {
                u0 = ((u0 & 15) << 12) | (u1 << 6) | u2
            } else {
                u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63)
            }
            if (u0 < 65536) {
                str += String.fromCharCode(u0)
            } else {
                var ch = u0 - 65536
                str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023))
            }
        }
        return str
    }, "UTF8ArrayToString")
    var getDylinkMetadata = /* @__PURE__ */ __name((binary2) => {
        var offset = 0
        var end = 0
        function getU8() {
            return binary2[offset++]
        }
        __name(getU8, "getU8")
        function getLEB() {
            var ret = 0
            var mul = 1
            while (1) {
                var byte = binary2[offset++]
                ret += (byte & 127) * mul
                mul *= 128
                if (!(byte & 128)) break
            }
            return ret
        }
        __name(getLEB, "getLEB")
        function getString() {
            var len = getLEB()
            offset += len
            return UTF8ArrayToString(binary2, offset - len, len)
        }
        __name(getString, "getString")
        function failIf(condition, message) {
            if (condition) throw new Error(message)
        }
        __name(failIf, "failIf")
        var name2 = "dylink.0"
        if (binary2 instanceof WebAssembly.Module) {
            var dylinkSection = WebAssembly.Module.customSections(binary2, name2)
            if (dylinkSection.length === 0) {
                name2 = "dylink"
                dylinkSection = WebAssembly.Module.customSections(binary2, name2)
            }
            failIf(dylinkSection.length === 0, "need dylink section")
            binary2 = new Uint8Array(dylinkSection[0])
            end = binary2.length
        } else {
            var int32View = new Uint32Array(new Uint8Array(binary2.subarray(0, 24)).buffer)
            var magicNumberFound = int32View[0] == 1836278016 || int32View[0] == 6386541
            failIf(!magicNumberFound, "need to see wasm magic number")
            failIf(binary2[8] !== 0, "need the dylink section to be first")
            offset = 9
            var section_size = getLEB()
            end = offset + section_size
            name2 = getString()
        }
        var customSection = {
            neededDynlibs: [],
            tlsExports: /* @__PURE__ */ new Set(),
            weakImports: /* @__PURE__ */ new Set(),
        }
        if (name2 == "dylink") {
            customSection.memorySize = getLEB()
            customSection.memoryAlign = getLEB()
            customSection.tableSize = getLEB()
            customSection.tableAlign = getLEB()
            var neededDynlibsCount = getLEB()
            for (var i2 = 0; i2 < neededDynlibsCount; ++i2) {
                var libname = getString()
                customSection.neededDynlibs.push(libname)
            }
        } else {
            failIf(name2 !== "dylink.0")
            var WASM_DYLINK_MEM_INFO = 1
            var WASM_DYLINK_NEEDED = 2
            var WASM_DYLINK_EXPORT_INFO = 3
            var WASM_DYLINK_IMPORT_INFO = 4
            var WASM_SYMBOL_TLS = 256
            var WASM_SYMBOL_BINDING_MASK = 3
            var WASM_SYMBOL_BINDING_WEAK = 1
            while (offset < end) {
                var subsectionType = getU8()
                var subsectionSize = getLEB()
                if (subsectionType === WASM_DYLINK_MEM_INFO) {
                    customSection.memorySize = getLEB()
                    customSection.memoryAlign = getLEB()
                    customSection.tableSize = getLEB()
                    customSection.tableAlign = getLEB()
                } else if (subsectionType === WASM_DYLINK_NEEDED) {
                    var neededDynlibsCount = getLEB()
                    for (var i2 = 0; i2 < neededDynlibsCount; ++i2) {
                        libname = getString()
                        customSection.neededDynlibs.push(libname)
                    }
                } else if (subsectionType === WASM_DYLINK_EXPORT_INFO) {
                    var count = getLEB()
                    while (count--) {
                        var symname = getString()
                        var flags2 = getLEB()
                        if (flags2 & WASM_SYMBOL_TLS) {
                            customSection.tlsExports.add(symname)
                        }
                    }
                } else if (subsectionType === WASM_DYLINK_IMPORT_INFO) {
                    var count = getLEB()
                    while (count--) {
                        var modname = getString()
                        var symname = getString()
                        var flags2 = getLEB()
                        if ((flags2 & WASM_SYMBOL_BINDING_MASK) == WASM_SYMBOL_BINDING_WEAK) {
                            customSection.weakImports.add(symname)
                        }
                    }
                } else {
                    offset += subsectionSize
                }
            }
        }
        return customSection
    }, "getDylinkMetadata")
    function getValue(ptr, type = "i8") {
        if (type.endsWith("*")) type = "*"
        switch (type) {
            case "i1":
                return HEAP8[ptr]
            case "i8":
                return HEAP8[ptr]
            case "i16":
                return LE_HEAP_LOAD_I16((ptr >> 1) * 2)
            case "i32":
                return LE_HEAP_LOAD_I32((ptr >> 2) * 4)
            case "i64":
                return HEAP64[ptr >> 3]
            case "float":
                return LE_HEAP_LOAD_F32((ptr >> 2) * 4)
            case "double":
                return LE_HEAP_LOAD_F64((ptr >> 3) * 8)
            case "*":
                return LE_HEAP_LOAD_U32((ptr >> 2) * 4)
            default:
                abort(`invalid type for getValue: ${type}`)
        }
    }
    __name(getValue, "getValue")
    var newDSO = /* @__PURE__ */ __name((name2, handle2, syms) => {
        var dso = {
            refcount: Infinity,
            name: name2,
            exports: syms,
            global: true,
        }
        LDSO.loadedLibsByName[name2] = dso
        if (handle2 != void 0) {
            LDSO.loadedLibsByHandle[handle2] = dso
        }
        return dso
    }, "newDSO")
    var LDSO = {
        loadedLibsByName: {},
        loadedLibsByHandle: {},
        init() {
            newDSO("__main__", 0, wasmImports)
        },
    }
    var ___heap_base = 78224
    var alignMemory = /* @__PURE__ */ __name((size, alignment) => Math.ceil(size / alignment) * alignment, "alignMemory")
    var getMemory = /* @__PURE__ */ __name((size) => {
        if (runtimeInitialized) {
            return _calloc(size, 1)
        }
        var ret = ___heap_base
        var end = ret + alignMemory(size, 16)
        ___heap_base = end
        GOT["__heap_base"].value = end
        return ret
    }, "getMemory")
    var isInternalSym = /* @__PURE__ */ __name((symName) => ["__cpp_exception", "__c_longjmp", "__wasm_apply_data_relocs", "__dso_handle", "__tls_size", "__tls_align", "__set_stack_limits", "_emscripten_tls_init", "__wasm_init_tls", "__wasm_call_ctors", "__start_em_asm", "__stop_em_asm", "__start_em_js", "__stop_em_js"].includes(symName) || symName.startsWith("__em_js__"), "isInternalSym")
    var uleb128Encode = /* @__PURE__ */ __name((n, target) => {
        if (n < 128) {
            target.push(n)
        } else {
            target.push(n % 128 | 128, n >> 7)
        }
    }, "uleb128Encode")
    var sigToWasmTypes = /* @__PURE__ */ __name((sig) => {
        var typeNames = {
            i: "i32",
            j: "i64",
            f: "f32",
            d: "f64",
            e: "externref",
            p: "i32",
        }
        var type = {
            parameters: [],
            results: sig[0] == "v" ? [] : [typeNames[sig[0]]],
        }
        for (var i2 = 1; i2 < sig.length; ++i2) {
            type.parameters.push(typeNames[sig[i2]])
        }
        return type
    }, "sigToWasmTypes")
    var generateFuncType = /* @__PURE__ */ __name((sig, target) => {
        var sigRet = sig.slice(0, 1)
        var sigParam = sig.slice(1)
        var typeCodes = {
            i: 127,
            // i32
            p: 127,
            // i32
            j: 126,
            // i64
            f: 125,
            // f32
            d: 124,
            // f64
            e: 111,
        }
        target.push(96)
        uleb128Encode(sigParam.length, target)
        for (var i2 = 0; i2 < sigParam.length; ++i2) {
            target.push(typeCodes[sigParam[i2]])
        }
        if (sigRet == "v") {
            target.push(0)
        } else {
            target.push(1, typeCodes[sigRet])
        }
    }, "generateFuncType")
    var convertJsFunctionToWasm = /* @__PURE__ */ __name((func2, sig) => {
        if (typeof WebAssembly.Function == "function") {
            return new WebAssembly.Function(sigToWasmTypes(sig), func2)
        }
        var typeSectionBody = [1]
        generateFuncType(sig, typeSectionBody)
        var bytes = [
            0,
            97,
            115,
            109,
            // magic ("\0asm")
            1,
            0,
            0,
            0,
            // version: 1
            1,
        ]
        uleb128Encode(typeSectionBody.length, bytes)
        bytes.push(...typeSectionBody)
        bytes.push(
            2,
            7,
            // import section
            // (import "e" "f" (func 0 (type 0)))
            1,
            1,
            101,
            1,
            102,
            0,
            0,
            7,
            5,
            // export section
            // (export "f" (func 0 (type 0)))
            1,
            1,
            102,
            0,
            0
        )
        var module2 = new WebAssembly.Module(new Uint8Array(bytes))
        var instance2 = new WebAssembly.Instance(module2, {
            e: {
                f: func2,
            },
        })
        var wrappedFunc = instance2.exports["f"]
        return wrappedFunc
    }, "convertJsFunctionToWasm")
    var wasmTableMirror = []
    var wasmTable = new WebAssembly.Table({
        initial: 31,
        element: "anyfunc",
    })
    var getWasmTableEntry = /* @__PURE__ */ __name((funcPtr) => {
        var func2 = wasmTableMirror[funcPtr]
        if (!func2) {
            if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1
            wasmTableMirror[funcPtr] = func2 = wasmTable.get(funcPtr)
        }
        return func2
    }, "getWasmTableEntry")
    var updateTableMap = /* @__PURE__ */ __name((offset, count) => {
        if (functionsInTableMap) {
            for (var i2 = offset; i2 < offset + count; i2++) {
                var item = getWasmTableEntry(i2)
                if (item) {
                    functionsInTableMap.set(item, i2)
                }
            }
        }
    }, "updateTableMap")
    var functionsInTableMap
    var getFunctionAddress = /* @__PURE__ */ __name((func2) => {
        if (!functionsInTableMap) {
            functionsInTableMap = /* @__PURE__ */ new WeakMap()
            updateTableMap(0, wasmTable.length)
        }
        return functionsInTableMap.get(func2) || 0
    }, "getFunctionAddress")
    var freeTableIndexes = []
    var getEmptyTableSlot = /* @__PURE__ */ __name(() => {
        if (freeTableIndexes.length) {
            return freeTableIndexes.pop()
        }
        try {
            wasmTable.grow(1)
        } catch (err2) {
            if (!(err2 instanceof RangeError)) {
                throw err2
            }
            throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."
        }
        return wasmTable.length - 1
    }, "getEmptyTableSlot")
    var setWasmTableEntry = /* @__PURE__ */ __name((idx, func2) => {
        wasmTable.set(idx, func2)
        wasmTableMirror[idx] = wasmTable.get(idx)
    }, "setWasmTableEntry")
    var addFunction = /* @__PURE__ */ __name((func2, sig) => {
        var rtn = getFunctionAddress(func2)
        if (rtn) {
            return rtn
        }
        var ret = getEmptyTableSlot()
        try {
            setWasmTableEntry(ret, func2)
        } catch (err2) {
            if (!(err2 instanceof TypeError)) {
                throw err2
            }
            var wrapped = convertJsFunctionToWasm(func2, sig)
            setWasmTableEntry(ret, wrapped)
        }
        functionsInTableMap.set(func2, ret)
        return ret
    }, "addFunction")
    var updateGOT = /* @__PURE__ */ __name((exports, replace) => {
        for (var symName in exports) {
            if (isInternalSym(symName)) {
                continue
            }
            var value = exports[symName]
            GOT[symName] ||= new WebAssembly.Global({
                value: "i32",
                mutable: true,
            })
            if (replace || GOT[symName].value == 0) {
                if (typeof value == "function") {
                    GOT[symName].value = addFunction(value)
                } else if (typeof value == "number") {
                    GOT[symName].value = value
                } else {
                    err(`unhandled export type for '${symName}': ${typeof value}`)
                }
            }
        }
    }, "updateGOT")
    var relocateExports = /* @__PURE__ */ __name((exports, memoryBase2, replace) => {
        var relocated = {}
        for (var e in exports) {
            var value = exports[e]
            if (typeof value == "object") {
                value = value.value
            }
            if (typeof value == "number") {
                value += memoryBase2
            }
            relocated[e] = value
        }
        updateGOT(relocated, replace)
        return relocated
    }, "relocateExports")
    var isSymbolDefined = /* @__PURE__ */ __name((symName) => {
        var existing = wasmImports[symName]
        if (!existing || existing.stub) {
            return false
        }
        return true
    }, "isSymbolDefined")
    var dynCall = /* @__PURE__ */ __name((sig, ptr, args2 = []) => {
        var rtn = getWasmTableEntry(ptr)(...args2)
        return rtn
    }, "dynCall")
    var stackSave = /* @__PURE__ */ __name(() => _emscripten_stack_get_current(), "stackSave")
    var stackRestore = /* @__PURE__ */ __name((val) => __emscripten_stack_restore(val), "stackRestore")
    var createInvokeFunction = /* @__PURE__ */ __name(
        (sig) =>
            (ptr, ...args2) => {
                var sp = stackSave()
                try {
                    return dynCall(sig, ptr, args2)
                } catch (e) {
                    stackRestore(sp)
                    if (e !== e + 0) throw e
                    _setThrew(1, 0)
                    if (sig[0] == "j") return 0n
                }
            },
        "createInvokeFunction"
    )
    var resolveGlobalSymbol = /* @__PURE__ */ __name((symName, direct = false) => {
        var sym
        if (isSymbolDefined(symName)) {
            sym = wasmImports[symName]
        } else if (symName.startsWith("invoke_")) {
            sym = wasmImports[symName] = createInvokeFunction(symName.split("_")[1])
        }
        return {
            sym,
            name: symName,
        }
    }, "resolveGlobalSymbol")
    var UTF8ToString = /* @__PURE__ */ __name((ptr, maxBytesToRead) => (ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : ""), "UTF8ToString")
    var loadWebAssemblyModule = /* @__PURE__ */ __name((binary, flags, libName, localScope, handle) => {
        var metadata = getDylinkMetadata(binary)
        currentModuleWeakSymbols = metadata.weakImports
        function loadModule() {
            var firstLoad = !handle || !HEAP8[handle + 8]
            if (firstLoad) {
                var memAlign = Math.pow(2, metadata.memoryAlign)
                var memoryBase = metadata.memorySize ? alignMemory(getMemory(metadata.memorySize + memAlign), memAlign) : 0
                var tableBase = metadata.tableSize ? wasmTable.length : 0
                if (handle) {
                    HEAP8[handle + 8] = 1
                    LE_HEAP_STORE_U32(((handle + 12) >> 2) * 4, memoryBase)
                    LE_HEAP_STORE_I32(((handle + 16) >> 2) * 4, metadata.memorySize)
                    LE_HEAP_STORE_U32(((handle + 20) >> 2) * 4, tableBase)
                    LE_HEAP_STORE_I32(((handle + 24) >> 2) * 4, metadata.tableSize)
                }
            } else {
                memoryBase = LE_HEAP_LOAD_U32(((handle + 12) >> 2) * 4)
                tableBase = LE_HEAP_LOAD_U32(((handle + 20) >> 2) * 4)
            }
            var tableGrowthNeeded = tableBase + metadata.tableSize - wasmTable.length
            if (tableGrowthNeeded > 0) {
                wasmTable.grow(tableGrowthNeeded)
            }
            var moduleExports
            function resolveSymbol(sym) {
                var resolved = resolveGlobalSymbol(sym).sym
                if (!resolved && localScope) {
                    resolved = localScope[sym]
                }
                if (!resolved) {
                    resolved = moduleExports[sym]
                }
                return resolved
            }
            __name(resolveSymbol, "resolveSymbol")
            var proxyHandler = {
                get(stubs, prop) {
                    switch (prop) {
                        case "__memory_base":
                            return memoryBase
                        case "__table_base":
                            return tableBase
                    }
                    if (prop in wasmImports && !wasmImports[prop].stub) {
                        return wasmImports[prop]
                    }
                    if (!(prop in stubs)) {
                        var resolved
                        stubs[prop] = (...args2) => {
                            resolved ||= resolveSymbol(prop)
                            return resolved(...args2)
                        }
                    }
                    return stubs[prop]
                },
            }
            var proxy = new Proxy({}, proxyHandler)
            var info = {
                "GOT.mem": new Proxy({}, GOTHandler),
                "GOT.func": new Proxy({}, GOTHandler),
                env: proxy,
                wasi_snapshot_preview1: proxy,
            }
            function postInstantiation(module, instance) {
                updateTableMap(tableBase, metadata.tableSize)
                moduleExports = relocateExports(instance.exports, memoryBase)
                if (!flags.allowUndefined) {
                    reportUndefinedSymbols()
                }
                function addEmAsm(addr, body) {
                    var args = []
                    var arity = 0
                    for (; arity < 16; arity++) {
                        if (body.indexOf("$" + arity) != -1) {
                            args.push("$" + arity)
                        } else {
                            break
                        }
                    }
                    args = args.join(",")
                    var func = `(${args}) => { ${body} };`
                    ASM_CONSTS[start] = eval(func)
                }
                __name(addEmAsm, "addEmAsm")
                if ("__start_em_asm" in moduleExports) {
                    var start = moduleExports["__start_em_asm"]
                    var stop = moduleExports["__stop_em_asm"]
                    while (start < stop) {
                        var jsString = UTF8ToString(start)
                        addEmAsm(start, jsString)
                        start = HEAPU8.indexOf(0, start) + 1
                    }
                }
                function addEmJs(name, cSig, body) {
                    var jsArgs = []
                    cSig = cSig.slice(1, -1)
                    if (cSig != "void") {
                        cSig = cSig.split(",")
                        for (var i in cSig) {
                            var jsArg = cSig[i].split(" ").pop()
                            jsArgs.push(jsArg.replace("*", ""))
                        }
                    }
                    var func = `(${jsArgs}) => ${body};`
                    moduleExports[name] = eval(func)
                }
                __name(addEmJs, "addEmJs")
                for (var name in moduleExports) {
                    if (name.startsWith("__em_js__")) {
                        var start = moduleExports[name]
                        var jsString = UTF8ToString(start)
                        var parts = jsString.split("<::>")
                        addEmJs(name.replace("__em_js__", ""), parts[0], parts[1])
                        delete moduleExports[name]
                    }
                }
                var applyRelocs = moduleExports["__wasm_apply_data_relocs"]
                if (applyRelocs) {
                    if (runtimeInitialized) {
                        applyRelocs()
                    } else {
                        __RELOC_FUNCS__.push(applyRelocs)
                    }
                }
                var init = moduleExports["__wasm_call_ctors"]
                if (init) {
                    if (runtimeInitialized) {
                        init()
                    } else {
                        __ATINIT__.push(init)
                    }
                }
                return moduleExports
            }
            __name(postInstantiation, "postInstantiation")
            if (flags.loadAsync) {
                if (binary instanceof WebAssembly.Module) {
                    var instance = new WebAssembly.Instance(binary, info)
                    return Promise.resolve(postInstantiation(binary, instance))
                }
                return WebAssembly.instantiate(binary, info).then((result) => postInstantiation(result.module, result.instance))
            }
            var module = binary instanceof WebAssembly.Module ? binary : new WebAssembly.Module(binary)
            var instance = new WebAssembly.Instance(module, info)
            return postInstantiation(module, instance)
        }
        __name(loadModule, "loadModule")
        if (flags.loadAsync) {
            return metadata.neededDynlibs.reduce((chain, dynNeeded) => chain.then(() => loadDynamicLibrary(dynNeeded, flags, localScope)), Promise.resolve()).then(loadModule)
        }
        metadata.neededDynlibs.forEach((needed) => loadDynamicLibrary(needed, flags, localScope))
        return loadModule()
    }, "loadWebAssemblyModule")
    var mergeLibSymbols = /* @__PURE__ */ __name((exports, libName2) => {
        for (var [sym, exp] of Object.entries(exports)) {
            const setImport = /* @__PURE__ */ __name((target) => {
                if (!isSymbolDefined(target)) {
                    wasmImports[target] = exp
                }
            }, "setImport")
            setImport(sym)
            const main_alias = "__main_argc_argv"
            if (sym == "main") {
                setImport(main_alias)
            }
            if (sym == main_alias) {
                setImport("main")
            }
        }
    }, "mergeLibSymbols")
    var asyncLoad = /* @__PURE__ */ __name(async (url) => {
        var arrayBuffer = await readAsync(url)
        return new Uint8Array(arrayBuffer)
    }, "asyncLoad")
    function loadDynamicLibrary(
        libName2,
        flags2 = {
            global: true,
            nodelete: true,
        },
        localScope2,
        handle2
    ) {
        var dso = LDSO.loadedLibsByName[libName2]
        if (dso) {
            if (!flags2.global) {
                if (localScope2) {
                    Object.assign(localScope2, dso.exports)
                }
            } else if (!dso.global) {
                dso.global = true
                mergeLibSymbols(dso.exports, libName2)
            }
            if (flags2.nodelete && dso.refcount !== Infinity) {
                dso.refcount = Infinity
            }
            dso.refcount++
            if (handle2) {
                LDSO.loadedLibsByHandle[handle2] = dso
            }
            return flags2.loadAsync ? Promise.resolve(true) : true
        }
        dso = newDSO(libName2, handle2, "loading")
        dso.refcount = flags2.nodelete ? Infinity : 1
        dso.global = flags2.global
        function loadLibData() {
            if (handle2) {
                var data = LE_HEAP_LOAD_U32(((handle2 + 28) >> 2) * 4)
                var dataSize = LE_HEAP_LOAD_U32(((handle2 + 32) >> 2) * 4)
                if (data && dataSize) {
                    var libData = HEAP8.slice(data, data + dataSize)
                    return flags2.loadAsync ? Promise.resolve(libData) : libData
                }
            }
            var libFile = locateFile(libName2)
            if (flags2.loadAsync) {
                return asyncLoad(libFile)
            }
            if (!readBinary) {
                throw new Error(`${libFile}: file not found, and synchronous loading of external files is not available`)
            }
            return readBinary(libFile)
        }
        __name(loadLibData, "loadLibData")
        function getExports() {
            if (flags2.loadAsync) {
                return loadLibData().then((libData) => loadWebAssemblyModule(libData, flags2, libName2, localScope2, handle2))
            }
            return loadWebAssemblyModule(loadLibData(), flags2, libName2, localScope2, handle2)
        }
        __name(getExports, "getExports")
        function moduleLoaded(exports) {
            if (dso.global) {
                mergeLibSymbols(exports, libName2)
            } else if (localScope2) {
                Object.assign(localScope2, exports)
            }
            dso.exports = exports
        }
        __name(moduleLoaded, "moduleLoaded")
        if (flags2.loadAsync) {
            return getExports().then((exports) => {
                moduleLoaded(exports)
                return true
            })
        }
        moduleLoaded(getExports())
        return true
    }
    __name(loadDynamicLibrary, "loadDynamicLibrary")
    var reportUndefinedSymbols = /* @__PURE__ */ __name(() => {
        for (var [symName, entry] of Object.entries(GOT)) {
            if (entry.value == 0) {
                var value = resolveGlobalSymbol(symName, true).sym
                if (!value && !entry.required) {
                    continue
                }
                if (typeof value == "function") {
                    entry.value = addFunction(value, value.sig)
                } else if (typeof value == "number") {
                    entry.value = value
                } else {
                    throw new Error(`bad export type for '${symName}': ${typeof value}`)
                }
            }
        }
    }, "reportUndefinedSymbols")
    var loadDylibs = /* @__PURE__ */ __name(() => {
        if (!dynamicLibraries.length) {
            reportUndefinedSymbols()
            return
        }
        addRunDependency("loadDylibs")
        dynamicLibraries
            .reduce(
                (chain, lib) =>
                    chain.then(() =>
                        loadDynamicLibrary(lib, {
                            loadAsync: true,
                            global: true,
                            nodelete: true,
                            allowUndefined: true,
                        })
                    ),
                Promise.resolve()
            )
            .then(() => {
                reportUndefinedSymbols()
                removeRunDependency("loadDylibs")
            })
    }, "loadDylibs")
    function setValue(ptr, value, type = "i8") {
        if (type.endsWith("*")) type = "*"
        switch (type) {
            case "i1":
                HEAP8[ptr] = value
                break
            case "i8":
                HEAP8[ptr] = value
                break
            case "i16":
                LE_HEAP_STORE_I16((ptr >> 1) * 2, value)
                break
            case "i32":
                LE_HEAP_STORE_I32((ptr >> 2) * 4, value)
                break
            case "i64":
                HEAP64[ptr >> 3] = BigInt(value)
                break
            case "float":
                LE_HEAP_STORE_F32((ptr >> 2) * 4, value)
                break
            case "double":
                LE_HEAP_STORE_F64((ptr >> 3) * 8, value)
                break
            case "*":
                LE_HEAP_STORE_U32((ptr >> 2) * 4, value)
                break
            default:
                abort(`invalid type for setValue: ${type}`)
        }
    }
    __name(setValue, "setValue")
    var ___memory_base = new WebAssembly.Global(
        {
            value: "i32",
            mutable: false,
        },
        1024
    )
    var ___stack_pointer = new WebAssembly.Global(
        {
            value: "i32",
            mutable: true,
        },
        78224
    )
    var ___table_base = new WebAssembly.Global(
        {
            value: "i32",
            mutable: false,
        },
        1
    )
    var __abort_js = /* @__PURE__ */ __name(() => abort(""), "__abort_js")
    __abort_js.sig = "v"
    var _emscripten_get_now = /* @__PURE__ */ __name(() => performance.now(), "_emscripten_get_now")
    _emscripten_get_now.sig = "d"
    var _emscripten_date_now = /* @__PURE__ */ __name(() => Date.now(), "_emscripten_date_now")
    _emscripten_date_now.sig = "d"
    var nowIsMonotonic = 1
    var checkWasiClock = /* @__PURE__ */ __name((clock_id) => clock_id >= 0 && clock_id <= 3, "checkWasiClock")
    var INT53_MAX = 9007199254740992
    var INT53_MIN = -9007199254740992
    var bigintToI53Checked = /* @__PURE__ */ __name((num) => (num < INT53_MIN || num > INT53_MAX ? NaN : Number(num)), "bigintToI53Checked")
    function _clock_time_get(clk_id, ignored_precision, ptime) {
        ignored_precision = bigintToI53Checked(ignored_precision)
        if (!checkWasiClock(clk_id)) {
            return 28
        }
        var now
        if (clk_id === 0) {
            now = _emscripten_date_now()
        } else if (nowIsMonotonic) {
            now = _emscripten_get_now()
        } else {
            return 52
        }
        var nsec = Math.round(now * 1e3 * 1e3)
        HEAP64[ptime >> 3] = BigInt(nsec)
        return 0
    }
    __name(_clock_time_get, "_clock_time_get")
    _clock_time_get.sig = "iijp"
    var getHeapMax = /* @__PURE__ */ __name(
        () =>
            // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
            // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
            // for any code that deals with heap sizes, which would require special
            // casing all heap size related code to treat 0 specially.
            2147483648,
        "getHeapMax"
    )
    var growMemory = /* @__PURE__ */ __name((size) => {
        var b = wasmMemory.buffer
        var pages = ((size - b.byteLength + 65535) / 65536) | 0
        try {
            wasmMemory.grow(pages)
            updateMemoryViews()
            return 1
        } catch (e) {}
    }, "growMemory")
    var _emscripten_resize_heap = /* @__PURE__ */ __name((requestedSize) => {
        var oldSize = HEAPU8.length
        requestedSize >>>= 0
        var maxHeapSize = getHeapMax()
        if (requestedSize > maxHeapSize) {
            return false
        }
        for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
            var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown)
            overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296)
            var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536))
            var replacement = growMemory(newSize)
            if (replacement) {
                return true
            }
        }
        return false
    }, "_emscripten_resize_heap")
    _emscripten_resize_heap.sig = "ip"
    var _fd_close = /* @__PURE__ */ __name((fd) => 52, "_fd_close")
    _fd_close.sig = "ii"
    function _fd_seek(fd, offset, whence, newOffset) {
        offset = bigintToI53Checked(offset)
        return 70
    }
    __name(_fd_seek, "_fd_seek")
    _fd_seek.sig = "iijip"
    var printCharBuffers = [null, [], []]
    var printChar = /* @__PURE__ */ __name((stream, curr) => {
        var buffer = printCharBuffers[stream]
        if (curr === 0 || curr === 10) {
            ;(stream === 1 ? out : err)(UTF8ArrayToString(buffer))
            buffer.length = 0
        } else {
            buffer.push(curr)
        }
    }, "printChar")
    var flush_NO_FILESYSTEM = /* @__PURE__ */ __name(() => {
        if (printCharBuffers[1].length) printChar(1, 10)
        if (printCharBuffers[2].length) printChar(2, 10)
    }, "flush_NO_FILESYSTEM")
    var SYSCALLS = {
        varargs: void 0,
        getStr(ptr) {
            var ret = UTF8ToString(ptr)
            return ret
        },
    }
    var _fd_write = /* @__PURE__ */ __name((fd, iov, iovcnt, pnum) => {
        var num = 0
        for (var i2 = 0; i2 < iovcnt; i2++) {
            var ptr = LE_HEAP_LOAD_U32((iov >> 2) * 4)
            var len = LE_HEAP_LOAD_U32(((iov + 4) >> 2) * 4)
            iov += 8
            for (var j = 0; j < len; j++) {
                printChar(fd, HEAPU8[ptr + j])
            }
            num += len
        }
        LE_HEAP_STORE_U32((pnum >> 2) * 4, num)
        return 0
    }, "_fd_write")
    _fd_write.sig = "iippp"
    function _tree_sitter_log_callback(isLexMessage, messageAddress) {
        if (Module.currentLogCallback) {
            const message = UTF8ToString(messageAddress)
            Module.currentLogCallback(message, isLexMessage !== 0)
        }
    }
    __name(_tree_sitter_log_callback, "_tree_sitter_log_callback")
    function _tree_sitter_parse_callback(inputBufferAddress, index, row, column, lengthAddress) {
        const INPUT_BUFFER_SIZE = 10 * 1024
        const string = Module.currentParseCallback(index, {
            row,
            column,
        })
        if (typeof string === "string") {
            setValue(lengthAddress, string.length, "i32")
            stringToUTF16(string, inputBufferAddress, INPUT_BUFFER_SIZE)
        } else {
            setValue(lengthAddress, 0, "i32")
        }
    }
    __name(_tree_sitter_parse_callback, "_tree_sitter_parse_callback")
    function _tree_sitter_progress_callback(currentOffset, hasError) {
        if (Module.currentProgressCallback) {
            return Module.currentProgressCallback({
                currentOffset,
                hasError,
            })
        }
        return false
    }
    __name(_tree_sitter_progress_callback, "_tree_sitter_progress_callback")
    function _tree_sitter_query_progress_callback(currentOffset) {
        if (Module.currentQueryProgressCallback) {
            return Module.currentQueryProgressCallback({
                currentOffset,
            })
        }
        return false
    }
    __name(_tree_sitter_query_progress_callback, "_tree_sitter_query_progress_callback")
    var runtimeKeepaliveCounter = 0
    var keepRuntimeAlive = /* @__PURE__ */ __name(() => noExitRuntime || runtimeKeepaliveCounter > 0, "keepRuntimeAlive")
    var _proc_exit = /* @__PURE__ */ __name((code) => {
        EXITSTATUS = code
        if (!keepRuntimeAlive()) {
            Module["onExit"]?.(code)
            ABORT = true
        }
        quit_(code, new ExitStatus(code))
    }, "_proc_exit")
    _proc_exit.sig = "vi"
    var exitJS = /* @__PURE__ */ __name((status, implicit) => {
        EXITSTATUS = status
        _proc_exit(status)
    }, "exitJS")
    var handleException = /* @__PURE__ */ __name((e) => {
        if (e instanceof ExitStatus || e == "unwind") {
            return EXITSTATUS
        }
        quit_(1, e)
    }, "handleException")
    var lengthBytesUTF8 = /* @__PURE__ */ __name((str) => {
        var len = 0
        for (var i2 = 0; i2 < str.length; ++i2) {
            var c = str.charCodeAt(i2)
            if (c <= 127) {
                len++
            } else if (c <= 2047) {
                len += 2
            } else if (c >= 55296 && c <= 57343) {
                len += 4
                ++i2
            } else {
                len += 3
            }
        }
        return len
    }, "lengthBytesUTF8")
    var stringToUTF8Array = /* @__PURE__ */ __name((str, heap, outIdx, maxBytesToWrite) => {
        if (!(maxBytesToWrite > 0)) return 0
        var startIdx = outIdx
        var endIdx = outIdx + maxBytesToWrite - 1
        for (var i2 = 0; i2 < str.length; ++i2) {
            var u = str.charCodeAt(i2)
            if (u >= 55296 && u <= 57343) {
                var u1 = str.charCodeAt(++i2)
                u = (65536 + ((u & 1023) << 10)) | (u1 & 1023)
            }
            if (u <= 127) {
                if (outIdx >= endIdx) break
                heap[outIdx++] = u
            } else if (u <= 2047) {
                if (outIdx + 1 >= endIdx) break
                heap[outIdx++] = 192 | (u >> 6)
                heap[outIdx++] = 128 | (u & 63)
            } else if (u <= 65535) {
                if (outIdx + 2 >= endIdx) break
                heap[outIdx++] = 224 | (u >> 12)
                heap[outIdx++] = 128 | ((u >> 6) & 63)
                heap[outIdx++] = 128 | (u & 63)
            } else {
                if (outIdx + 3 >= endIdx) break
                heap[outIdx++] = 240 | (u >> 18)
                heap[outIdx++] = 128 | ((u >> 12) & 63)
                heap[outIdx++] = 128 | ((u >> 6) & 63)
                heap[outIdx++] = 128 | (u & 63)
            }
        }
        heap[outIdx] = 0
        return outIdx - startIdx
    }, "stringToUTF8Array")
    var stringToUTF8 = /* @__PURE__ */ __name((str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite), "stringToUTF8")
    var stackAlloc = /* @__PURE__ */ __name((sz) => __emscripten_stack_alloc(sz), "stackAlloc")
    var stringToUTF8OnStack = /* @__PURE__ */ __name((str) => {
        var size = lengthBytesUTF8(str) + 1
        var ret = stackAlloc(size)
        stringToUTF8(str, ret, size)
        return ret
    }, "stringToUTF8OnStack")
    var AsciiToString = /* @__PURE__ */ __name((ptr) => {
        var str = ""
        while (1) {
            var ch = HEAPU8[ptr++]
            if (!ch) return str
            str += String.fromCharCode(ch)
        }
    }, "AsciiToString")
    var stringToUTF16 = /* @__PURE__ */ __name((str, outPtr, maxBytesToWrite) => {
        maxBytesToWrite ??= 2147483647
        if (maxBytesToWrite < 2) return 0
        maxBytesToWrite -= 2
        var startPtr = outPtr
        var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length
        for (var i2 = 0; i2 < numCharsToWrite; ++i2) {
            var codeUnit = str.charCodeAt(i2)
            LE_HEAP_STORE_I16((outPtr >> 1) * 2, codeUnit)
            outPtr += 2
        }
        LE_HEAP_STORE_I16((outPtr >> 1) * 2, 0)
        return outPtr - startPtr
    }, "stringToUTF16")
    var wasmImports = {
        /** @export */
        __heap_base: ___heap_base,
        /** @export */
        __indirect_function_table: wasmTable,
        /** @export */
        __memory_base: ___memory_base,
        /** @export */
        __stack_pointer: ___stack_pointer,
        /** @export */
        __table_base: ___table_base,
        /** @export */
        _abort_js: __abort_js,
        /** @export */
        clock_time_get: _clock_time_get,
        /** @export */
        emscripten_resize_heap: _emscripten_resize_heap,
        /** @export */
        fd_close: _fd_close,
        /** @export */
        fd_seek: _fd_seek,
        /** @export */
        fd_write: _fd_write,
        /** @export */
        memory: wasmMemory,
        /** @export */
        tree_sitter_log_callback: _tree_sitter_log_callback,
        /** @export */
        tree_sitter_parse_callback: _tree_sitter_parse_callback,
        /** @export */
        tree_sitter_progress_callback: _tree_sitter_progress_callback,
        /** @export */
        tree_sitter_query_progress_callback: _tree_sitter_query_progress_callback,
    }
    // IMPORTANT
    async function createWasm() {
        addRunDependency("wasm-instantiate")
        const info = {
            env: wasmImports,
            wasi_snapshot_preview1: wasmImports,
            "GOT.mem": new Proxy(wasmImports, GOTHandler),
            "GOT.func": new Proxy(wasmImports, GOTHandler),
        }
        // 
        // try instantiate arg
        // 
        if (Module["instantiateWasm"]) {
            try {
                return Module["instantiateWasm"](info, receiveInstance)
            } catch (e) {
                err(`Module.instantiateWasm callback failed with error: ${e}`)
                readyPromiseReject(e)
            }
        }
        // 
        // get path (if missing)
        // 
        if (!wasmBinaryFilePath) {
            const path = Module["defaultWasmPath"]
            if (locateFile) {
                if (!isDataURI(path)) {
                    wasmBinaryFilePath = locateFile(path)
                } else {
                    wasmBinaryFilePath = path
                }
            } else {
                wasmBinaryFilePath = new URL(path, import.meta.url).href
            }
        }

        // 
        // instantiate module
        // 
        try {
            let instantiationResult
            // 
            // load wasm file
            // 
                const binaryFilePath = wasmBinaryFilePath
                const imports = info
                // 
                // streaming
                // 
                if (!wasmBinary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFilePath) && isUrl(binaryFilePath) && !isFileURI(binaryFilePath) && fetch) {
                    try {
                        var response = fetch(binaryFilePath, {
                            credentials: "same-origin",
                        })
                        instantiationResult = await WebAssembly.instantiateStreaming(response, imports)
                    } catch (reason) {
                        err(`wasm streaming compile failed: ${reason}`)
                        err("falling back to ArrayBuffer instantiation")
                    }
                }

                // 
                // fallback on non-streaming
                // 
                if (!instantiationResult) {
                    try {
                        var binaryArray = wasmBinary
                        // 
                        // get binary async
                        // 
                        if (!binaryArray) { // argument of main function
                            try {
                                binaryArray = new Uint8Array(
                                    await readAsync(binaryFilePath)
                                )
                            } catch {}
                        }
                        // 
                        // get binary sync
                        // 
                        if (!binaryArray) {
                            if (binaryFilePath == wasmBinaryFilePath && wasmBinary) {
                                binaryArray = new Uint8Array(wasmBinary)
                            } else if (readBinary) {
                                binaryArray = readBinary(binaryFilePath)
                            } else {
                                throw Error("both async and sync fetching of the wasm failed")
                            }
                        }
                        // 
                        // instantiate
                        // 
                        instantiationResult = await WebAssembly.instantiate(binaryArray, imports)
                    } catch (reason) {
                        err(`failed to asynchronously prepare wasm: ${reason}`)
                        abort(reason)
                    }
                }
            instantiationResult = await instantiationResult
            return receiveInstance(instantiationResult["instance"], instantiationResult["module"])
        } catch (e) {
            readyPromiseReject(e)
            return Promise.reject(e)
        }

        function receiveInstance(instance2, module2) {
            wasmExports = instance2.exports
            wasmExports = relocateExports(wasmExports, 1024)
            var metadata2 = getDylinkMetadata(module2)
            if (metadata2.neededDynlibs) {
                dynamicLibraries = metadata2.neededDynlibs.concat(dynamicLibraries)
            }
            mergeLibSymbols(wasmExports, "main")
            LDSO.init()
            loadDylibs()
            addOnInit(wasmExports["__wasm_call_ctors"])
            __RELOC_FUNCS__.push(wasmExports["__wasm_apply_data_relocs"])
            removeRunDependency("wasm-instantiate")
            return wasmExports
        }
        __name(receiveInstance, "receiveInstance")
    }
    __name(createWasm, "createWasm")
    var wasmExports = await createWasm()
    var ___wasm_call_ctors = wasmExports["__wasm_call_ctors"]
    var _malloc = (Module["_malloc"] = wasmExports["malloc"])
    var _calloc = (Module["_calloc"] = wasmExports["calloc"])
    var _realloc = (Module["_realloc"] = wasmExports["realloc"])
    var _free = (Module["_free"] = wasmExports["free"])
    var _memcmp = (Module["_memcmp"] = wasmExports["memcmp"])
    var _ts_language_symbol_count = (Module["_ts_language_symbol_count"] = wasmExports["ts_language_symbol_count"])
    var _ts_language_state_count = (Module["_ts_language_state_count"] = wasmExports["ts_language_state_count"])
    var _ts_language_version = (Module["_ts_language_version"] = wasmExports["ts_language_version"])
    var _ts_language_abi_version = (Module["_ts_language_abi_version"] = wasmExports["ts_language_abi_version"])
    var _ts_language_metadata = (Module["_ts_language_metadata"] = wasmExports["ts_language_metadata"])
    var _ts_language_name = (Module["_ts_language_name"] = wasmExports["ts_language_name"])
    var _ts_language_field_count = (Module["_ts_language_field_count"] = wasmExports["ts_language_field_count"])
    var _ts_language_next_state = (Module["_ts_language_next_state"] = wasmExports["ts_language_next_state"])
    var _ts_language_symbol_name = (Module["_ts_language_symbol_name"] = wasmExports["ts_language_symbol_name"])
    var _ts_language_symbol_for_name = (Module["_ts_language_symbol_for_name"] = wasmExports["ts_language_symbol_for_name"])
    var _strncmp = (Module["_strncmp"] = wasmExports["strncmp"])
    var _ts_language_symbol_type = (Module["_ts_language_symbol_type"] = wasmExports["ts_language_symbol_type"])
    var _ts_language_field_name_for_id = (Module["_ts_language_field_name_for_id"] = wasmExports["ts_language_field_name_for_id"])
    var _ts_lookahead_iterator_new = (Module["_ts_lookahead_iterator_new"] = wasmExports["ts_lookahead_iterator_new"])
    var _ts_lookahead_iterator_delete = (Module["_ts_lookahead_iterator_delete"] = wasmExports["ts_lookahead_iterator_delete"])
    var _ts_lookahead_iterator_reset_state = (Module["_ts_lookahead_iterator_reset_state"] = wasmExports["ts_lookahead_iterator_reset_state"])
    var _ts_lookahead_iterator_reset = (Module["_ts_lookahead_iterator_reset"] = wasmExports["ts_lookahead_iterator_reset"])
    var _ts_lookahead_iterator_next = (Module["_ts_lookahead_iterator_next"] = wasmExports["ts_lookahead_iterator_next"])
    var _ts_lookahead_iterator_current_symbol = (Module["_ts_lookahead_iterator_current_symbol"] = wasmExports["ts_lookahead_iterator_current_symbol"])
    var _ts_parser_delete = (Module["_ts_parser_delete"] = wasmExports["ts_parser_delete"])
    var _ts_parser_reset = (Module["_ts_parser_reset"] = wasmExports["ts_parser_reset"])
    var _ts_parser_set_language = (Module["_ts_parser_set_language"] = wasmExports["ts_parser_set_language"])
    var _ts_parser_timeout_micros = (Module["_ts_parser_timeout_micros"] = wasmExports["ts_parser_timeout_micros"])
    var _ts_parser_set_timeout_micros = (Module["_ts_parser_set_timeout_micros"] = wasmExports["ts_parser_set_timeout_micros"])
    var _ts_parser_set_included_ranges = (Module["_ts_parser_set_included_ranges"] = wasmExports["ts_parser_set_included_ranges"])
    var _ts_query_new = (Module["_ts_query_new"] = wasmExports["ts_query_new"])
    var _ts_query_delete = (Module["_ts_query_delete"] = wasmExports["ts_query_delete"])
    var _iswspace = (Module["_iswspace"] = wasmExports["iswspace"])
    var _iswalnum = (Module["_iswalnum"] = wasmExports["iswalnum"])
    var _ts_query_pattern_count = (Module["_ts_query_pattern_count"] = wasmExports["ts_query_pattern_count"])
    var _ts_query_capture_count = (Module["_ts_query_capture_count"] = wasmExports["ts_query_capture_count"])
    var _ts_query_string_count = (Module["_ts_query_string_count"] = wasmExports["ts_query_string_count"])
    var _ts_query_capture_name_for_id = (Module["_ts_query_capture_name_for_id"] = wasmExports["ts_query_capture_name_for_id"])
    var _ts_query_capture_quantifier_for_id = (Module["_ts_query_capture_quantifier_for_id"] = wasmExports["ts_query_capture_quantifier_for_id"])
    var _ts_query_string_value_for_id = (Module["_ts_query_string_value_for_id"] = wasmExports["ts_query_string_value_for_id"])
    var _ts_query_predicates_for_pattern = (Module["_ts_query_predicates_for_pattern"] = wasmExports["ts_query_predicates_for_pattern"])
    var _ts_query_start_byte_for_pattern = (Module["_ts_query_start_byte_for_pattern"] = wasmExports["ts_query_start_byte_for_pattern"])
    var _ts_query_end_byte_for_pattern = (Module["_ts_query_end_byte_for_pattern"] = wasmExports["ts_query_end_byte_for_pattern"])
    var _ts_query_is_pattern_rooted = (Module["_ts_query_is_pattern_rooted"] = wasmExports["ts_query_is_pattern_rooted"])
    var _ts_query_is_pattern_non_local = (Module["_ts_query_is_pattern_non_local"] = wasmExports["ts_query_is_pattern_non_local"])
    var _ts_query_is_pattern_guaranteed_at_step = (Module["_ts_query_is_pattern_guaranteed_at_step"] = wasmExports["ts_query_is_pattern_guaranteed_at_step"])
    var _ts_query_disable_capture = (Module["_ts_query_disable_capture"] = wasmExports["ts_query_disable_capture"])
    var _ts_query_disable_pattern = (Module["_ts_query_disable_pattern"] = wasmExports["ts_query_disable_pattern"])
    var _ts_tree_copy = (Module["_ts_tree_copy"] = wasmExports["ts_tree_copy"])
    var _ts_tree_delete = (Module["_ts_tree_delete"] = wasmExports["ts_tree_delete"])
    var _ts_init = (Module["_ts_init"] = wasmExports["ts_init"])
    var _ts_parser_new_wasm = (Module["_ts_parser_new_wasm"] = wasmExports["ts_parser_new_wasm"])
    var _ts_parser_enable_logger_wasm = (Module["_ts_parser_enable_logger_wasm"] = wasmExports["ts_parser_enable_logger_wasm"])
    var _ts_parser_parse_wasm = (Module["_ts_parser_parse_wasm"] = wasmExports["ts_parser_parse_wasm"])
    var _ts_parser_included_ranges_wasm = (Module["_ts_parser_included_ranges_wasm"] = wasmExports["ts_parser_included_ranges_wasm"])
    var _ts_language_type_is_named_wasm = (Module["_ts_language_type_is_named_wasm"] = wasmExports["ts_language_type_is_named_wasm"])
    var _ts_language_type_is_visible_wasm = (Module["_ts_language_type_is_visible_wasm"] = wasmExports["ts_language_type_is_visible_wasm"])
    var _ts_language_supertypes_wasm = (Module["_ts_language_supertypes_wasm"] = wasmExports["ts_language_supertypes_wasm"])
    var _ts_language_subtypes_wasm = (Module["_ts_language_subtypes_wasm"] = wasmExports["ts_language_subtypes_wasm"])
    var _ts_tree_root_node_wasm = (Module["_ts_tree_root_node_wasm"] = wasmExports["ts_tree_root_node_wasm"])
    var _ts_tree_root_node_with_offset_wasm = (Module["_ts_tree_root_node_with_offset_wasm"] = wasmExports["ts_tree_root_node_with_offset_wasm"])
    var _ts_tree_edit_wasm = (Module["_ts_tree_edit_wasm"] = wasmExports["ts_tree_edit_wasm"])
    var _ts_tree_included_ranges_wasm = (Module["_ts_tree_included_ranges_wasm"] = wasmExports["ts_tree_included_ranges_wasm"])
    var _ts_tree_get_changed_ranges_wasm = (Module["_ts_tree_get_changed_ranges_wasm"] = wasmExports["ts_tree_get_changed_ranges_wasm"])
    var _ts_tree_cursor_new_wasm = (Module["_ts_tree_cursor_new_wasm"] = wasmExports["ts_tree_cursor_new_wasm"])
    var _ts_tree_cursor_copy_wasm = (Module["_ts_tree_cursor_copy_wasm"] = wasmExports["ts_tree_cursor_copy_wasm"])
    var _ts_tree_cursor_delete_wasm = (Module["_ts_tree_cursor_delete_wasm"] = wasmExports["ts_tree_cursor_delete_wasm"])
    var _ts_tree_cursor_reset_wasm = (Module["_ts_tree_cursor_reset_wasm"] = wasmExports["ts_tree_cursor_reset_wasm"])
    var _ts_tree_cursor_reset_to_wasm = (Module["_ts_tree_cursor_reset_to_wasm"] = wasmExports["ts_tree_cursor_reset_to_wasm"])
    var _ts_tree_cursor_goto_first_child_wasm = (Module["_ts_tree_cursor_goto_first_child_wasm"] = wasmExports["ts_tree_cursor_goto_first_child_wasm"])
    var _ts_tree_cursor_goto_last_child_wasm = (Module["_ts_tree_cursor_goto_last_child_wasm"] = wasmExports["ts_tree_cursor_goto_last_child_wasm"])
    var _ts_tree_cursor_goto_first_child_for_index_wasm = (Module["_ts_tree_cursor_goto_first_child_for_index_wasm"] = wasmExports["ts_tree_cursor_goto_first_child_for_index_wasm"])
    var _ts_tree_cursor_goto_first_child_for_position_wasm = (Module["_ts_tree_cursor_goto_first_child_for_position_wasm"] = wasmExports["ts_tree_cursor_goto_first_child_for_position_wasm"])
    var _ts_tree_cursor_goto_next_sibling_wasm = (Module["_ts_tree_cursor_goto_next_sibling_wasm"] = wasmExports["ts_tree_cursor_goto_next_sibling_wasm"])
    var _ts_tree_cursor_goto_previous_sibling_wasm = (Module["_ts_tree_cursor_goto_previous_sibling_wasm"] = wasmExports["ts_tree_cursor_goto_previous_sibling_wasm"])
    var _ts_tree_cursor_goto_descendant_wasm = (Module["_ts_tree_cursor_goto_descendant_wasm"] = wasmExports["ts_tree_cursor_goto_descendant_wasm"])
    var _ts_tree_cursor_goto_parent_wasm = (Module["_ts_tree_cursor_goto_parent_wasm"] = wasmExports["ts_tree_cursor_goto_parent_wasm"])
    var _ts_tree_cursor_current_node_type_id_wasm = (Module["_ts_tree_cursor_current_node_type_id_wasm"] = wasmExports["ts_tree_cursor_current_node_type_id_wasm"])
    var _ts_tree_cursor_current_node_state_id_wasm = (Module["_ts_tree_cursor_current_node_state_id_wasm"] = wasmExports["ts_tree_cursor_current_node_state_id_wasm"])
    var _ts_tree_cursor_current_node_is_named_wasm = (Module["_ts_tree_cursor_current_node_is_named_wasm"] = wasmExports["ts_tree_cursor_current_node_is_named_wasm"])
    var _ts_tree_cursor_current_node_is_missing_wasm = (Module["_ts_tree_cursor_current_node_is_missing_wasm"] = wasmExports["ts_tree_cursor_current_node_is_missing_wasm"])
    var _ts_tree_cursor_current_node_id_wasm = (Module["_ts_tree_cursor_current_node_id_wasm"] = wasmExports["ts_tree_cursor_current_node_id_wasm"])
    var _ts_tree_cursor_start_position_wasm = (Module["_ts_tree_cursor_start_position_wasm"] = wasmExports["ts_tree_cursor_start_position_wasm"])
    var _ts_tree_cursor_end_position_wasm = (Module["_ts_tree_cursor_end_position_wasm"] = wasmExports["ts_tree_cursor_end_position_wasm"])
    var _ts_tree_cursor_start_index_wasm = (Module["_ts_tree_cursor_start_index_wasm"] = wasmExports["ts_tree_cursor_start_index_wasm"])
    var _ts_tree_cursor_end_index_wasm = (Module["_ts_tree_cursor_end_index_wasm"] = wasmExports["ts_tree_cursor_end_index_wasm"])
    var _ts_tree_cursor_current_field_id_wasm = (Module["_ts_tree_cursor_current_field_id_wasm"] = wasmExports["ts_tree_cursor_current_field_id_wasm"])
    var _ts_tree_cursor_current_depth_wasm = (Module["_ts_tree_cursor_current_depth_wasm"] = wasmExports["ts_tree_cursor_current_depth_wasm"])
    var _ts_tree_cursor_current_descendant_index_wasm = (Module["_ts_tree_cursor_current_descendant_index_wasm"] = wasmExports["ts_tree_cursor_current_descendant_index_wasm"])
    var _ts_tree_cursor_current_node_wasm = (Module["_ts_tree_cursor_current_node_wasm"] = wasmExports["ts_tree_cursor_current_node_wasm"])
    var _ts_node_symbol_wasm = (Module["_ts_node_symbol_wasm"] = wasmExports["ts_node_symbol_wasm"])
    var _ts_node_field_name_for_child_wasm = (Module["_ts_node_field_name_for_child_wasm"] = wasmExports["ts_node_field_name_for_child_wasm"])
    var _ts_node_field_name_for_named_child_wasm = (Module["_ts_node_field_name_for_named_child_wasm"] = wasmExports["ts_node_field_name_for_named_child_wasm"])
    var _ts_node_children_by_field_id_wasm = (Module["_ts_node_children_by_field_id_wasm"] = wasmExports["ts_node_children_by_field_id_wasm"])
    var _ts_node_first_child_for_byte_wasm = (Module["_ts_node_first_child_for_byte_wasm"] = wasmExports["ts_node_first_child_for_byte_wasm"])
    var _ts_node_first_named_child_for_byte_wasm = (Module["_ts_node_first_named_child_for_byte_wasm"] = wasmExports["ts_node_first_named_child_for_byte_wasm"])
    var _ts_node_grammar_symbol_wasm = (Module["_ts_node_grammar_symbol_wasm"] = wasmExports["ts_node_grammar_symbol_wasm"])
    var _ts_node_child_count_wasm = (Module["_ts_node_child_count_wasm"] = wasmExports["ts_node_child_count_wasm"])
    var _ts_node_named_child_count_wasm = (Module["_ts_node_named_child_count_wasm"] = wasmExports["ts_node_named_child_count_wasm"])
    var _ts_node_child_wasm = (Module["_ts_node_child_wasm"] = wasmExports["ts_node_child_wasm"])
    var _ts_node_named_child_wasm = (Module["_ts_node_named_child_wasm"] = wasmExports["ts_node_named_child_wasm"])
    var _ts_node_child_by_field_id_wasm = (Module["_ts_node_child_by_field_id_wasm"] = wasmExports["ts_node_child_by_field_id_wasm"])
    var _ts_node_next_sibling_wasm = (Module["_ts_node_next_sibling_wasm"] = wasmExports["ts_node_next_sibling_wasm"])
    var _ts_node_prev_sibling_wasm = (Module["_ts_node_prev_sibling_wasm"] = wasmExports["ts_node_prev_sibling_wasm"])
    var _ts_node_next_named_sibling_wasm = (Module["_ts_node_next_named_sibling_wasm"] = wasmExports["ts_node_next_named_sibling_wasm"])
    var _ts_node_prev_named_sibling_wasm = (Module["_ts_node_prev_named_sibling_wasm"] = wasmExports["ts_node_prev_named_sibling_wasm"])
    var _ts_node_descendant_count_wasm = (Module["_ts_node_descendant_count_wasm"] = wasmExports["ts_node_descendant_count_wasm"])
    var _ts_node_parent_wasm = (Module["_ts_node_parent_wasm"] = wasmExports["ts_node_parent_wasm"])
    var _ts_node_child_with_descendant_wasm = (Module["_ts_node_child_with_descendant_wasm"] = wasmExports["ts_node_child_with_descendant_wasm"])
    var _ts_node_descendant_for_index_wasm = (Module["_ts_node_descendant_for_index_wasm"] = wasmExports["ts_node_descendant_for_index_wasm"])
    var _ts_node_named_descendant_for_index_wasm = (Module["_ts_node_named_descendant_for_index_wasm"] = wasmExports["ts_node_named_descendant_for_index_wasm"])
    var _ts_node_descendant_for_position_wasm = (Module["_ts_node_descendant_for_position_wasm"] = wasmExports["ts_node_descendant_for_position_wasm"])
    var _ts_node_named_descendant_for_position_wasm = (Module["_ts_node_named_descendant_for_position_wasm"] = wasmExports["ts_node_named_descendant_for_position_wasm"])
    var _ts_node_start_point_wasm = (Module["_ts_node_start_point_wasm"] = wasmExports["ts_node_start_point_wasm"])
    var _ts_node_end_point_wasm = (Module["_ts_node_end_point_wasm"] = wasmExports["ts_node_end_point_wasm"])
    var _ts_node_start_index_wasm = (Module["_ts_node_start_index_wasm"] = wasmExports["ts_node_start_index_wasm"])
    var _ts_node_end_index_wasm = (Module["_ts_node_end_index_wasm"] = wasmExports["ts_node_end_index_wasm"])
    var _ts_node_to_string_wasm = (Module["_ts_node_to_string_wasm"] = wasmExports["ts_node_to_string_wasm"])
    var _ts_node_children_wasm = (Module["_ts_node_children_wasm"] = wasmExports["ts_node_children_wasm"])
    var _ts_node_named_children_wasm = (Module["_ts_node_named_children_wasm"] = wasmExports["ts_node_named_children_wasm"])
    var _ts_node_descendants_of_type_wasm = (Module["_ts_node_descendants_of_type_wasm"] = wasmExports["ts_node_descendants_of_type_wasm"])
    var _ts_node_is_named_wasm = (Module["_ts_node_is_named_wasm"] = wasmExports["ts_node_is_named_wasm"])
    var _ts_node_has_changes_wasm = (Module["_ts_node_has_changes_wasm"] = wasmExports["ts_node_has_changes_wasm"])
    var _ts_node_has_error_wasm = (Module["_ts_node_has_error_wasm"] = wasmExports["ts_node_has_error_wasm"])
    var _ts_node_is_error_wasm = (Module["_ts_node_is_error_wasm"] = wasmExports["ts_node_is_error_wasm"])
    var _ts_node_is_missing_wasm = (Module["_ts_node_is_missing_wasm"] = wasmExports["ts_node_is_missing_wasm"])
    var _ts_node_is_extra_wasm = (Module["_ts_node_is_extra_wasm"] = wasmExports["ts_node_is_extra_wasm"])
    var _ts_node_parse_state_wasm = (Module["_ts_node_parse_state_wasm"] = wasmExports["ts_node_parse_state_wasm"])
    var _ts_node_next_parse_state_wasm = (Module["_ts_node_next_parse_state_wasm"] = wasmExports["ts_node_next_parse_state_wasm"])
    var _ts_query_matches_wasm = (Module["_ts_query_matches_wasm"] = wasmExports["ts_query_matches_wasm"])
    var _ts_query_captures_wasm = (Module["_ts_query_captures_wasm"] = wasmExports["ts_query_captures_wasm"])
    var _memset = (Module["_memset"] = wasmExports["memset"])
    var _memcpy = (Module["_memcpy"] = wasmExports["memcpy"])
    var _memmove = (Module["_memmove"] = wasmExports["memmove"])
    var _iswalpha = (Module["_iswalpha"] = wasmExports["iswalpha"])
    var _iswblank = (Module["_iswblank"] = wasmExports["iswblank"])
    var _iswdigit = (Module["_iswdigit"] = wasmExports["iswdigit"])
    var _iswlower = (Module["_iswlower"] = wasmExports["iswlower"])
    var _iswupper = (Module["_iswupper"] = wasmExports["iswupper"])
    var _iswxdigit = (Module["_iswxdigit"] = wasmExports["iswxdigit"])
    var _memchr = (Module["_memchr"] = wasmExports["memchr"])
    var _strlen = (Module["_strlen"] = wasmExports["strlen"])
    var _strcmp = (Module["_strcmp"] = wasmExports["strcmp"])
    var _strncat = (Module["_strncat"] = wasmExports["strncat"])
    var _strncpy = (Module["_strncpy"] = wasmExports["strncpy"])
    var _towlower = (Module["_towlower"] = wasmExports["towlower"])
    var _towupper = (Module["_towupper"] = wasmExports["towupper"])
    var _setThrew = wasmExports["setThrew"]
    var __emscripten_stack_restore = wasmExports["_emscripten_stack_restore"]
    var __emscripten_stack_alloc = wasmExports["_emscripten_stack_alloc"]
    var _emscripten_stack_get_current = wasmExports["emscripten_stack_get_current"]
    var ___wasm_apply_data_relocs = wasmExports["__wasm_apply_data_relocs"]
    Module["setValue"] = setValue
    Module["getValue"] = getValue
    Module["UTF8ToString"] = UTF8ToString
    Module["stringToUTF8"] = stringToUTF8
    Module["lengthBytesUTF8"] = lengthBytesUTF8
    Module["AsciiToString"] = AsciiToString
    Module["stringToUTF16"] = stringToUTF16
    Module["loadWebAssemblyModule"] = loadWebAssemblyModule
    function callMain(args2 = []) {
        var entryFunction = resolveGlobalSymbol("main").sym
        if (!entryFunction) return
        args2.unshift(thisProgram)
        var argc = args2.length
        var argv = stackAlloc((argc + 1) * 4)
        var argv_ptr = argv
        args2.forEach((arg) => {
            LE_HEAP_STORE_U32((argv_ptr >> 2) * 4, stringToUTF8OnStack(arg))
            argv_ptr += 4
        })
        LE_HEAP_STORE_U32((argv_ptr >> 2) * 4, 0)
        try {
            var ret = entryFunction(argc, argv)
            exitJS(
                ret,
                /* implicit = */
                true
            )
            return ret
        } catch (e) {
            return handleException(e)
        }
    }
    __name(callMain, "callMain")
    function run(args2 = arguments_) {
        if (runDependencies > 0) {
            dependenciesFulfilled = run
            return
        }
        preRun()
        if (runDependencies > 0) {
            dependenciesFulfilled = run
            return
        }
        function doRun() {
            Module["calledRun"] = true
            if (ABORT) return
            initRuntime()
            preMain()
            readyPromiseResolve(Module)
            Module["onRuntimeInitialized"]?.()
            if (!Module["noInitialRun"]) callMain(args2)
            postRun()
        }
        __name(doRun, "doRun")
        if (Module["setStatus"]) {
            Module["setStatus"]("Running...")
            setTimeout(() => {
                setTimeout(() => Module["setStatus"](""), 1)
                doRun()
            }, 1)
        } else {
            doRun()
        }
    }
    __name(run, "run")
    if (Module["preInit"]) {
        if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]]
        while (Module["preInit"].length > 0) {
            Module["preInit"].pop()()
        }
    }
    run()
    return readyPromise
}