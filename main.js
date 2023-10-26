// This code was bundled using `deno bundle` and it's not recommended to edit it manually
// BUT I EDITED IT MANUALLY ANYWAYS 😎 (because web-tree-sitter doesnt work without modifications)
import { stringToBytes } from "https://deno.land/x/binaryify@0.0.6/tools.js"
import treeSitterQuery from "https://deno.land/x/common_tree_sitter_languages@1.0.0.3/main/tree-sitter-query.js"
import { iter, next, Stop, Iterable, map, filter, reduce, frequencyCount, zip, count, enumerate, permute, combinations, slices, asyncIteratorToList, concurrentlyTransform, forkBy } from "https://deno.land/x/good@1.4.4.3/iterable.js"

import wasmJson from "./tree_sitter.wasm.binaryified.js"
const wasmBytes = stringToBytes(wasmJson)

class DenoStdInternalError extends Error {
    constructor(message){
        super(message);
        this.name = "DenoStdInternalError";
    }
}
function assert(expr, msg = "") {
    if (!expr) {
        throw new DenoStdInternalError(msg);
    }
}
function unreachable() {
    throw new DenoStdInternalError("unreachable");
}
const osType = (()=>{
    const { Deno: Deno1  } = globalThis;
    if (typeof Deno1?.build?.os === "string") {
        return Deno1.build.os;
    }
    const { navigator  } = globalThis;
    if (navigator?.appVersion?.includes?.("Win")) {
        return "windows";
    }
    return "linux";
})();
const isWindows = osType === "windows";
const isLinux = osType === "linux";
function uvTranslateSysError(sysErrno) {
    switch(sysErrno){
        case 5:
            return "EACCES";
        case 998:
            return "EACCES";
        case 10013:
            return "EACCES";
        case 1920:
            return "EACCES";
        case 1227:
            return "EADDRINUSE";
        case 10048:
            return "EADDRINUSE";
        case 10049:
            return "EADDRNOTAVAIL";
        case 10047:
            return "EAFNOSUPPORT";
        case 10035:
            return "EAGAIN";
        case 10037:
            return "EALREADY";
        case 1004:
            return "EBADF";
        case 6:
            return "EBADF";
        case 33:
            return "EBUSY";
        case 231:
            return "EBUSY";
        case 32:
            return "EBUSY";
        case 995:
            return "ECANCELED";
        case 10004:
            return "ECANCELED";
        case 1113:
            return "ECHARSET";
        case 1236:
            return "ECONNABORTED";
        case 10053:
            return "ECONNABORTED";
        case 1225:
            return "ECONNREFUSED";
        case 10061:
            return "ECONNREFUSED";
        case 64:
            return "ECONNRESET";
        case 10054:
            return "ECONNRESET";
        case 183:
            return "EEXIST";
        case 80:
            return "EEXIST";
        case 111:
            return "EFAULT";
        case 10014:
            return "EFAULT";
        case 1232:
            return "EHOSTUNREACH";
        case 10065:
            return "EHOSTUNREACH";
        case 122:
            return "EINVAL";
        case 13:
            return "EINVAL";
        case 123:
            return "EINVAL";
        case 87:
            return "EINVAL";
        case 10022:
            return "EINVAL";
        case 10046:
            return "EINVAL";
        case 1102:
            return "EIO";
        case 1111:
            return "EIO";
        case 23:
            return "EIO";
        case 1166:
            return "EIO";
        case 1165:
            return "EIO";
        case 1393:
            return "EIO";
        case 1129:
            return "EIO";
        case 1101:
            return "EIO";
        case 31:
            return "EIO";
        case 1106:
            return "EIO";
        case 1117:
            return "EIO";
        case 1104:
            return "EIO";
        case 205:
            return "EIO";
        case 110:
            return "EIO";
        case 1103:
            return "EIO";
        case 156:
            return "EIO";
        case 10056:
            return "EISCONN";
        case 1921:
            return "ELOOP";
        case 4:
            return "EMFILE";
        case 10024:
            return "EMFILE";
        case 10040:
            return "EMSGSIZE";
        case 206:
            return "ENAMETOOLONG";
        case 1231:
            return "ENETUNREACH";
        case 10051:
            return "ENETUNREACH";
        case 10055:
            return "ENOBUFS";
        case 161:
            return "ENOENT";
        case 267:
            return "ENOTDIR";
        case 203:
            return "ENOENT";
        case 2:
            return "ENOENT";
        case 15:
            return "ENOENT";
        case 4392:
            return "ENOENT";
        case 126:
            return "ENOENT";
        case 3:
            return "ENOENT";
        case 11001:
            return "ENOENT";
        case 11004:
            return "ENOENT";
        case 8:
            return "ENOMEM";
        case 14:
            return "ENOMEM";
        case 82:
            return "ENOSPC";
        case 112:
            return "ENOSPC";
        case 277:
            return "ENOSPC";
        case 1100:
            return "ENOSPC";
        case 39:
            return "ENOSPC";
        case 2250:
            return "ENOTCONN";
        case 10057:
            return "ENOTCONN";
        case 145:
            return "ENOTEMPTY";
        case 10038:
            return "ENOTSOCK";
        case 50:
            return "ENOTSUP";
        case 109:
            return "EOF";
        case 1314:
            return "EPERM";
        case 230:
            return "EPIPE";
        case 232:
            return "EPIPE";
        case 233:
            return "EPIPE";
        case 10058:
            return "EPIPE";
        case 10043:
            return "EPROTONOSUPPORT";
        case 19:
            return "EROFS";
        case 121:
            return "ETIMEDOUT";
        case 10060:
            return "ETIMEDOUT";
        case 17:
            return "EXDEV";
        case 1:
            return "EISDIR";
        case 208:
            return "E2BIG";
        case 10044:
            return "ESOCKTNOSUPPORT";
        default:
            return "UNKNOWN";
    }
}
const codeToErrorWindows = [
    [
        -4093,
        [
            "E2BIG",
            "argument list too long"
        ]
    ],
    [
        -4092,
        [
            "EACCES",
            "permission denied"
        ]
    ],
    [
        -4091,
        [
            "EADDRINUSE",
            "address already in use"
        ]
    ],
    [
        -4090,
        [
            "EADDRNOTAVAIL",
            "address not available"
        ]
    ],
    [
        -4089,
        [
            "EAFNOSUPPORT",
            "address family not supported"
        ]
    ],
    [
        -4088,
        [
            "EAGAIN",
            "resource temporarily unavailable"
        ]
    ],
    [
        -3000,
        [
            "EAI_ADDRFAMILY",
            "address family not supported"
        ]
    ],
    [
        -3001,
        [
            "EAI_AGAIN",
            "temporary failure"
        ]
    ],
    [
        -3002,
        [
            "EAI_BADFLAGS",
            "bad ai_flags value"
        ]
    ],
    [
        -3013,
        [
            "EAI_BADHINTS",
            "invalid value for hints"
        ]
    ],
    [
        -3003,
        [
            "EAI_CANCELED",
            "request canceled"
        ]
    ],
    [
        -3004,
        [
            "EAI_FAIL",
            "permanent failure"
        ]
    ],
    [
        -3005,
        [
            "EAI_FAMILY",
            "ai_family not supported"
        ]
    ],
    [
        -3006,
        [
            "EAI_MEMORY",
            "out of memory"
        ]
    ],
    [
        -3007,
        [
            "EAI_NODATA",
            "no address"
        ]
    ],
    [
        -3008,
        [
            "EAI_NONAME",
            "unknown node or service"
        ]
    ],
    [
        -3009,
        [
            "EAI_OVERFLOW",
            "argument buffer overflow"
        ]
    ],
    [
        -3014,
        [
            "EAI_PROTOCOL",
            "resolved protocol is unknown"
        ]
    ],
    [
        -3010,
        [
            "EAI_SERVICE",
            "service not available for socket type"
        ]
    ],
    [
        -3011,
        [
            "EAI_SOCKTYPE",
            "socket type not supported"
        ]
    ],
    [
        -4084,
        [
            "EALREADY",
            "connection already in progress"
        ]
    ],
    [
        -4083,
        [
            "EBADF",
            "bad file descriptor"
        ]
    ],
    [
        -4082,
        [
            "EBUSY",
            "resource busy or locked"
        ]
    ],
    [
        -4081,
        [
            "ECANCELED",
            "operation canceled"
        ]
    ],
    [
        -4080,
        [
            "ECHARSET",
            "invalid Unicode character"
        ]
    ],
    [
        -4079,
        [
            "ECONNABORTED",
            "software caused connection abort"
        ]
    ],
    [
        -4078,
        [
            "ECONNREFUSED",
            "connection refused"
        ]
    ],
    [
        -4077,
        [
            "ECONNRESET",
            "connection reset by peer"
        ]
    ],
    [
        -4076,
        [
            "EDESTADDRREQ",
            "destination address required"
        ]
    ],
    [
        -4075,
        [
            "EEXIST",
            "file already exists"
        ]
    ],
    [
        -4074,
        [
            "EFAULT",
            "bad address in system call argument"
        ]
    ],
    [
        -4036,
        [
            "EFBIG",
            "file too large"
        ]
    ],
    [
        -4073,
        [
            "EHOSTUNREACH",
            "host is unreachable"
        ]
    ],
    [
        -4072,
        [
            "EINTR",
            "interrupted system call"
        ]
    ],
    [
        -4071,
        [
            "EINVAL",
            "invalid argument"
        ]
    ],
    [
        -4070,
        [
            "EIO",
            "i/o error"
        ]
    ],
    [
        -4069,
        [
            "EISCONN",
            "socket is already connected"
        ]
    ],
    [
        -4068,
        [
            "EISDIR",
            "illegal operation on a directory"
        ]
    ],
    [
        -4067,
        [
            "ELOOP",
            "too many symbolic links encountered"
        ]
    ],
    [
        -4066,
        [
            "EMFILE",
            "too many open files"
        ]
    ],
    [
        -4065,
        [
            "EMSGSIZE",
            "message too long"
        ]
    ],
    [
        -4064,
        [
            "ENAMETOOLONG",
            "name too long"
        ]
    ],
    [
        -4063,
        [
            "ENETDOWN",
            "network is down"
        ]
    ],
    [
        -4062,
        [
            "ENETUNREACH",
            "network is unreachable"
        ]
    ],
    [
        -4061,
        [
            "ENFILE",
            "file table overflow"
        ]
    ],
    [
        -4060,
        [
            "ENOBUFS",
            "no buffer space available"
        ]
    ],
    [
        -4059,
        [
            "ENODEV",
            "no such device"
        ]
    ],
    [
        -4058,
        [
            "ENOENT",
            "no such file or directory"
        ]
    ],
    [
        -4057,
        [
            "ENOMEM",
            "not enough memory"
        ]
    ],
    [
        -4056,
        [
            "ENONET",
            "machine is not on the network"
        ]
    ],
    [
        -4035,
        [
            "ENOPROTOOPT",
            "protocol not available"
        ]
    ],
    [
        -4055,
        [
            "ENOSPC",
            "no space left on device"
        ]
    ],
    [
        -4054,
        [
            "ENOSYS",
            "function not implemented"
        ]
    ],
    [
        -4053,
        [
            "ENOTCONN",
            "socket is not connected"
        ]
    ],
    [
        -4052,
        [
            "ENOTDIR",
            "not a directory"
        ]
    ],
    [
        -4051,
        [
            "ENOTEMPTY",
            "directory not empty"
        ]
    ],
    [
        -4050,
        [
            "ENOTSOCK",
            "socket operation on non-socket"
        ]
    ],
    [
        -4049,
        [
            "ENOTSUP",
            "operation not supported on socket"
        ]
    ],
    [
        -4048,
        [
            "EPERM",
            "operation not permitted"
        ]
    ],
    [
        -4047,
        [
            "EPIPE",
            "broken pipe"
        ]
    ],
    [
        -4046,
        [
            "EPROTO",
            "protocol error"
        ]
    ],
    [
        -4045,
        [
            "EPROTONOSUPPORT",
            "protocol not supported"
        ]
    ],
    [
        -4044,
        [
            "EPROTOTYPE",
            "protocol wrong type for socket"
        ]
    ],
    [
        -4034,
        [
            "ERANGE",
            "result too large"
        ]
    ],
    [
        -4043,
        [
            "EROFS",
            "read-only file system"
        ]
    ],
    [
        -4042,
        [
            "ESHUTDOWN",
            "cannot send after transport endpoint shutdown"
        ]
    ],
    [
        -4041,
        [
            "ESPIPE",
            "invalid seek"
        ]
    ],
    [
        -4040,
        [
            "ESRCH",
            "no such process"
        ]
    ],
    [
        -4039,
        [
            "ETIMEDOUT",
            "connection timed out"
        ]
    ],
    [
        -4038,
        [
            "ETXTBSY",
            "text file is busy"
        ]
    ],
    [
        -4037,
        [
            "EXDEV",
            "cross-device link not permitted"
        ]
    ],
    [
        -4094,
        [
            "UNKNOWN",
            "unknown error"
        ]
    ],
    [
        -4095,
        [
            "EOF",
            "end of file"
        ]
    ],
    [
        -4033,
        [
            "ENXIO",
            "no such device or address"
        ]
    ],
    [
        -4032,
        [
            "EMLINK",
            "too many links"
        ]
    ],
    [
        -4031,
        [
            "EHOSTDOWN",
            "host is down"
        ]
    ],
    [
        -4030,
        [
            "EREMOTEIO",
            "remote I/O error"
        ]
    ],
    [
        -4029,
        [
            "ENOTTY",
            "inappropriate ioctl for device"
        ]
    ],
    [
        -4028,
        [
            "EFTYPE",
            "inappropriate file type or format"
        ]
    ],
    [
        -4027,
        [
            "EILSEQ",
            "illegal byte sequence"
        ]
    ], 
];
const errorToCodeWindows = codeToErrorWindows.map(([status, [error1]])=>[
        error1,
        status
    ]
);
const codeToErrorDarwin = [
    [
        -7,
        [
            "E2BIG",
            "argument list too long"
        ]
    ],
    [
        -13,
        [
            "EACCES",
            "permission denied"
        ]
    ],
    [
        -48,
        [
            "EADDRINUSE",
            "address already in use"
        ]
    ],
    [
        -49,
        [
            "EADDRNOTAVAIL",
            "address not available"
        ]
    ],
    [
        -47,
        [
            "EAFNOSUPPORT",
            "address family not supported"
        ]
    ],
    [
        -35,
        [
            "EAGAIN",
            "resource temporarily unavailable"
        ]
    ],
    [
        -3000,
        [
            "EAI_ADDRFAMILY",
            "address family not supported"
        ]
    ],
    [
        -3001,
        [
            "EAI_AGAIN",
            "temporary failure"
        ]
    ],
    [
        -3002,
        [
            "EAI_BADFLAGS",
            "bad ai_flags value"
        ]
    ],
    [
        -3013,
        [
            "EAI_BADHINTS",
            "invalid value for hints"
        ]
    ],
    [
        -3003,
        [
            "EAI_CANCELED",
            "request canceled"
        ]
    ],
    [
        -3004,
        [
            "EAI_FAIL",
            "permanent failure"
        ]
    ],
    [
        -3005,
        [
            "EAI_FAMILY",
            "ai_family not supported"
        ]
    ],
    [
        -3006,
        [
            "EAI_MEMORY",
            "out of memory"
        ]
    ],
    [
        -3007,
        [
            "EAI_NODATA",
            "no address"
        ]
    ],
    [
        -3008,
        [
            "EAI_NONAME",
            "unknown node or service"
        ]
    ],
    [
        -3009,
        [
            "EAI_OVERFLOW",
            "argument buffer overflow"
        ]
    ],
    [
        -3014,
        [
            "EAI_PROTOCOL",
            "resolved protocol is unknown"
        ]
    ],
    [
        -3010,
        [
            "EAI_SERVICE",
            "service not available for socket type"
        ]
    ],
    [
        -3011,
        [
            "EAI_SOCKTYPE",
            "socket type not supported"
        ]
    ],
    [
        -37,
        [
            "EALREADY",
            "connection already in progress"
        ]
    ],
    [
        -9,
        [
            "EBADF",
            "bad file descriptor"
        ]
    ],
    [
        -16,
        [
            "EBUSY",
            "resource busy or locked"
        ]
    ],
    [
        -89,
        [
            "ECANCELED",
            "operation canceled"
        ]
    ],
    [
        -4080,
        [
            "ECHARSET",
            "invalid Unicode character"
        ]
    ],
    [
        -53,
        [
            "ECONNABORTED",
            "software caused connection abort"
        ]
    ],
    [
        -61,
        [
            "ECONNREFUSED",
            "connection refused"
        ]
    ],
    [
        -54,
        [
            "ECONNRESET",
            "connection reset by peer"
        ]
    ],
    [
        -39,
        [
            "EDESTADDRREQ",
            "destination address required"
        ]
    ],
    [
        -17,
        [
            "EEXIST",
            "file already exists"
        ]
    ],
    [
        -14,
        [
            "EFAULT",
            "bad address in system call argument"
        ]
    ],
    [
        -27,
        [
            "EFBIG",
            "file too large"
        ]
    ],
    [
        -65,
        [
            "EHOSTUNREACH",
            "host is unreachable"
        ]
    ],
    [
        -4,
        [
            "EINTR",
            "interrupted system call"
        ]
    ],
    [
        -22,
        [
            "EINVAL",
            "invalid argument"
        ]
    ],
    [
        -5,
        [
            "EIO",
            "i/o error"
        ]
    ],
    [
        -56,
        [
            "EISCONN",
            "socket is already connected"
        ]
    ],
    [
        -21,
        [
            "EISDIR",
            "illegal operation on a directory"
        ]
    ],
    [
        -62,
        [
            "ELOOP",
            "too many symbolic links encountered"
        ]
    ],
    [
        -24,
        [
            "EMFILE",
            "too many open files"
        ]
    ],
    [
        -40,
        [
            "EMSGSIZE",
            "message too long"
        ]
    ],
    [
        -63,
        [
            "ENAMETOOLONG",
            "name too long"
        ]
    ],
    [
        -50,
        [
            "ENETDOWN",
            "network is down"
        ]
    ],
    [
        -51,
        [
            "ENETUNREACH",
            "network is unreachable"
        ]
    ],
    [
        -23,
        [
            "ENFILE",
            "file table overflow"
        ]
    ],
    [
        -55,
        [
            "ENOBUFS",
            "no buffer space available"
        ]
    ],
    [
        -19,
        [
            "ENODEV",
            "no such device"
        ]
    ],
    [
        -2,
        [
            "ENOENT",
            "no such file or directory"
        ]
    ],
    [
        -12,
        [
            "ENOMEM",
            "not enough memory"
        ]
    ],
    [
        -4056,
        [
            "ENONET",
            "machine is not on the network"
        ]
    ],
    [
        -42,
        [
            "ENOPROTOOPT",
            "protocol not available"
        ]
    ],
    [
        -28,
        [
            "ENOSPC",
            "no space left on device"
        ]
    ],
    [
        -78,
        [
            "ENOSYS",
            "function not implemented"
        ]
    ],
    [
        -57,
        [
            "ENOTCONN",
            "socket is not connected"
        ]
    ],
    [
        -20,
        [
            "ENOTDIR",
            "not a directory"
        ]
    ],
    [
        -66,
        [
            "ENOTEMPTY",
            "directory not empty"
        ]
    ],
    [
        -38,
        [
            "ENOTSOCK",
            "socket operation on non-socket"
        ]
    ],
    [
        -45,
        [
            "ENOTSUP",
            "operation not supported on socket"
        ]
    ],
    [
        -1,
        [
            "EPERM",
            "operation not permitted"
        ]
    ],
    [
        -32,
        [
            "EPIPE",
            "broken pipe"
        ]
    ],
    [
        -100,
        [
            "EPROTO",
            "protocol error"
        ]
    ],
    [
        -43,
        [
            "EPROTONOSUPPORT",
            "protocol not supported"
        ]
    ],
    [
        -41,
        [
            "EPROTOTYPE",
            "protocol wrong type for socket"
        ]
    ],
    [
        -34,
        [
            "ERANGE",
            "result too large"
        ]
    ],
    [
        -30,
        [
            "EROFS",
            "read-only file system"
        ]
    ],
    [
        -58,
        [
            "ESHUTDOWN",
            "cannot send after transport endpoint shutdown"
        ]
    ],
    [
        -29,
        [
            "ESPIPE",
            "invalid seek"
        ]
    ],
    [
        -3,
        [
            "ESRCH",
            "no such process"
        ]
    ],
    [
        -60,
        [
            "ETIMEDOUT",
            "connection timed out"
        ]
    ],
    [
        -26,
        [
            "ETXTBSY",
            "text file is busy"
        ]
    ],
    [
        -18,
        [
            "EXDEV",
            "cross-device link not permitted"
        ]
    ],
    [
        -4094,
        [
            "UNKNOWN",
            "unknown error"
        ]
    ],
    [
        -4095,
        [
            "EOF",
            "end of file"
        ]
    ],
    [
        -6,
        [
            "ENXIO",
            "no such device or address"
        ]
    ],
    [
        -31,
        [
            "EMLINK",
            "too many links"
        ]
    ],
    [
        -64,
        [
            "EHOSTDOWN",
            "host is down"
        ]
    ],
    [
        -4030,
        [
            "EREMOTEIO",
            "remote I/O error"
        ]
    ],
    [
        -25,
        [
            "ENOTTY",
            "inappropriate ioctl for device"
        ]
    ],
    [
        -79,
        [
            "EFTYPE",
            "inappropriate file type or format"
        ]
    ],
    [
        -92,
        [
            "EILSEQ",
            "illegal byte sequence"
        ]
    ], 
];
const errorToCodeDarwin = codeToErrorDarwin.map(([status, [code]])=>[
        code,
        status
    ]
);
const codeToErrorLinux = [
    [
        -7,
        [
            "E2BIG",
            "argument list too long"
        ]
    ],
    [
        -13,
        [
            "EACCES",
            "permission denied"
        ]
    ],
    [
        -98,
        [
            "EADDRINUSE",
            "address already in use"
        ]
    ],
    [
        -99,
        [
            "EADDRNOTAVAIL",
            "address not available"
        ]
    ],
    [
        -97,
        [
            "EAFNOSUPPORT",
            "address family not supported"
        ]
    ],
    [
        -11,
        [
            "EAGAIN",
            "resource temporarily unavailable"
        ]
    ],
    [
        -3000,
        [
            "EAI_ADDRFAMILY",
            "address family not supported"
        ]
    ],
    [
        -3001,
        [
            "EAI_AGAIN",
            "temporary failure"
        ]
    ],
    [
        -3002,
        [
            "EAI_BADFLAGS",
            "bad ai_flags value"
        ]
    ],
    [
        -3013,
        [
            "EAI_BADHINTS",
            "invalid value for hints"
        ]
    ],
    [
        -3003,
        [
            "EAI_CANCELED",
            "request canceled"
        ]
    ],
    [
        -3004,
        [
            "EAI_FAIL",
            "permanent failure"
        ]
    ],
    [
        -3005,
        [
            "EAI_FAMILY",
            "ai_family not supported"
        ]
    ],
    [
        -3006,
        [
            "EAI_MEMORY",
            "out of memory"
        ]
    ],
    [
        -3007,
        [
            "EAI_NODATA",
            "no address"
        ]
    ],
    [
        -3008,
        [
            "EAI_NONAME",
            "unknown node or service"
        ]
    ],
    [
        -3009,
        [
            "EAI_OVERFLOW",
            "argument buffer overflow"
        ]
    ],
    [
        -3014,
        [
            "EAI_PROTOCOL",
            "resolved protocol is unknown"
        ]
    ],
    [
        -3010,
        [
            "EAI_SERVICE",
            "service not available for socket type"
        ]
    ],
    [
        -3011,
        [
            "EAI_SOCKTYPE",
            "socket type not supported"
        ]
    ],
    [
        -114,
        [
            "EALREADY",
            "connection already in progress"
        ]
    ],
    [
        -9,
        [
            "EBADF",
            "bad file descriptor"
        ]
    ],
    [
        -16,
        [
            "EBUSY",
            "resource busy or locked"
        ]
    ],
    [
        -125,
        [
            "ECANCELED",
            "operation canceled"
        ]
    ],
    [
        -4080,
        [
            "ECHARSET",
            "invalid Unicode character"
        ]
    ],
    [
        -103,
        [
            "ECONNABORTED",
            "software caused connection abort"
        ]
    ],
    [
        -111,
        [
            "ECONNREFUSED",
            "connection refused"
        ]
    ],
    [
        -104,
        [
            "ECONNRESET",
            "connection reset by peer"
        ]
    ],
    [
        -89,
        [
            "EDESTADDRREQ",
            "destination address required"
        ]
    ],
    [
        -17,
        [
            "EEXIST",
            "file already exists"
        ]
    ],
    [
        -14,
        [
            "EFAULT",
            "bad address in system call argument"
        ]
    ],
    [
        -27,
        [
            "EFBIG",
            "file too large"
        ]
    ],
    [
        -113,
        [
            "EHOSTUNREACH",
            "host is unreachable"
        ]
    ],
    [
        -4,
        [
            "EINTR",
            "interrupted system call"
        ]
    ],
    [
        -22,
        [
            "EINVAL",
            "invalid argument"
        ]
    ],
    [
        -5,
        [
            "EIO",
            "i/o error"
        ]
    ],
    [
        -106,
        [
            "EISCONN",
            "socket is already connected"
        ]
    ],
    [
        -21,
        [
            "EISDIR",
            "illegal operation on a directory"
        ]
    ],
    [
        -40,
        [
            "ELOOP",
            "too many symbolic links encountered"
        ]
    ],
    [
        -24,
        [
            "EMFILE",
            "too many open files"
        ]
    ],
    [
        -90,
        [
            "EMSGSIZE",
            "message too long"
        ]
    ],
    [
        -36,
        [
            "ENAMETOOLONG",
            "name too long"
        ]
    ],
    [
        -100,
        [
            "ENETDOWN",
            "network is down"
        ]
    ],
    [
        -101,
        [
            "ENETUNREACH",
            "network is unreachable"
        ]
    ],
    [
        -23,
        [
            "ENFILE",
            "file table overflow"
        ]
    ],
    [
        -105,
        [
            "ENOBUFS",
            "no buffer space available"
        ]
    ],
    [
        -19,
        [
            "ENODEV",
            "no such device"
        ]
    ],
    [
        -2,
        [
            "ENOENT",
            "no such file or directory"
        ]
    ],
    [
        -12,
        [
            "ENOMEM",
            "not enough memory"
        ]
    ],
    [
        -64,
        [
            "ENONET",
            "machine is not on the network"
        ]
    ],
    [
        -92,
        [
            "ENOPROTOOPT",
            "protocol not available"
        ]
    ],
    [
        -28,
        [
            "ENOSPC",
            "no space left on device"
        ]
    ],
    [
        -38,
        [
            "ENOSYS",
            "function not implemented"
        ]
    ],
    [
        -107,
        [
            "ENOTCONN",
            "socket is not connected"
        ]
    ],
    [
        -20,
        [
            "ENOTDIR",
            "not a directory"
        ]
    ],
    [
        -39,
        [
            "ENOTEMPTY",
            "directory not empty"
        ]
    ],
    [
        -88,
        [
            "ENOTSOCK",
            "socket operation on non-socket"
        ]
    ],
    [
        -95,
        [
            "ENOTSUP",
            "operation not supported on socket"
        ]
    ],
    [
        -1,
        [
            "EPERM",
            "operation not permitted"
        ]
    ],
    [
        -32,
        [
            "EPIPE",
            "broken pipe"
        ]
    ],
    [
        -71,
        [
            "EPROTO",
            "protocol error"
        ]
    ],
    [
        -93,
        [
            "EPROTONOSUPPORT",
            "protocol not supported"
        ]
    ],
    [
        -91,
        [
            "EPROTOTYPE",
            "protocol wrong type for socket"
        ]
    ],
    [
        -34,
        [
            "ERANGE",
            "result too large"
        ]
    ],
    [
        -30,
        [
            "EROFS",
            "read-only file system"
        ]
    ],
    [
        -108,
        [
            "ESHUTDOWN",
            "cannot send after transport endpoint shutdown"
        ]
    ],
    [
        -29,
        [
            "ESPIPE",
            "invalid seek"
        ]
    ],
    [
        -3,
        [
            "ESRCH",
            "no such process"
        ]
    ],
    [
        -110,
        [
            "ETIMEDOUT",
            "connection timed out"
        ]
    ],
    [
        -26,
        [
            "ETXTBSY",
            "text file is busy"
        ]
    ],
    [
        -18,
        [
            "EXDEV",
            "cross-device link not permitted"
        ]
    ],
    [
        -4094,
        [
            "UNKNOWN",
            "unknown error"
        ]
    ],
    [
        -4095,
        [
            "EOF",
            "end of file"
        ]
    ],
    [
        -6,
        [
            "ENXIO",
            "no such device or address"
        ]
    ],
    [
        -31,
        [
            "EMLINK",
            "too many links"
        ]
    ],
    [
        -112,
        [
            "EHOSTDOWN",
            "host is down"
        ]
    ],
    [
        -121,
        [
            "EREMOTEIO",
            "remote I/O error"
        ]
    ],
    [
        -25,
        [
            "ENOTTY",
            "inappropriate ioctl for device"
        ]
    ],
    [
        -4028,
        [
            "EFTYPE",
            "inappropriate file type or format"
        ]
    ],
    [
        -84,
        [
            "EILSEQ",
            "illegal byte sequence"
        ]
    ], 
];
const errorToCodeLinux = codeToErrorLinux.map(([status, [code]])=>[
        code,
        status
    ]
);
const codeToErrorFreebsd = [
    [
        -7,
        [
            "E2BIG",
            "argument list too long"
        ]
    ],
    [
        -13,
        [
            "EACCES",
            "permission denied"
        ]
    ],
    [
        -48,
        [
            "EADDRINUSE",
            "address already in use"
        ]
    ],
    [
        -49,
        [
            "EADDRNOTAVAIL",
            "address not available"
        ]
    ],
    [
        -47,
        [
            "EAFNOSUPPORT",
            "address family not supported"
        ]
    ],
    [
        -35,
        [
            "EAGAIN",
            "resource temporarily unavailable"
        ]
    ],
    [
        -3000,
        [
            "EAI_ADDRFAMILY",
            "address family not supported"
        ]
    ],
    [
        -3001,
        [
            "EAI_AGAIN",
            "temporary failure"
        ]
    ],
    [
        -3002,
        [
            "EAI_BADFLAGS",
            "bad ai_flags value"
        ]
    ],
    [
        -3013,
        [
            "EAI_BADHINTS",
            "invalid value for hints"
        ]
    ],
    [
        -3003,
        [
            "EAI_CANCELED",
            "request canceled"
        ]
    ],
    [
        -3004,
        [
            "EAI_FAIL",
            "permanent failure"
        ]
    ],
    [
        -3005,
        [
            "EAI_FAMILY",
            "ai_family not supported"
        ]
    ],
    [
        -3006,
        [
            "EAI_MEMORY",
            "out of memory"
        ]
    ],
    [
        -3007,
        [
            "EAI_NODATA",
            "no address"
        ]
    ],
    [
        -3008,
        [
            "EAI_NONAME",
            "unknown node or service"
        ]
    ],
    [
        -3009,
        [
            "EAI_OVERFLOW",
            "argument buffer overflow"
        ]
    ],
    [
        -3014,
        [
            "EAI_PROTOCOL",
            "resolved protocol is unknown"
        ]
    ],
    [
        -3010,
        [
            "EAI_SERVICE",
            "service not available for socket type"
        ]
    ],
    [
        -3011,
        [
            "EAI_SOCKTYPE",
            "socket type not supported"
        ]
    ],
    [
        -37,
        [
            "EALREADY",
            "connection already in progress"
        ]
    ],
    [
        -9,
        [
            "EBADF",
            "bad file descriptor"
        ]
    ],
    [
        -16,
        [
            "EBUSY",
            "resource busy or locked"
        ]
    ],
    [
        -85,
        [
            "ECANCELED",
            "operation canceled"
        ]
    ],
    [
        -4080,
        [
            "ECHARSET",
            "invalid Unicode character"
        ]
    ],
    [
        -53,
        [
            "ECONNABORTED",
            "software caused connection abort"
        ]
    ],
    [
        -61,
        [
            "ECONNREFUSED",
            "connection refused"
        ]
    ],
    [
        -54,
        [
            "ECONNRESET",
            "connection reset by peer"
        ]
    ],
    [
        -39,
        [
            "EDESTADDRREQ",
            "destination address required"
        ]
    ],
    [
        -17,
        [
            "EEXIST",
            "file already exists"
        ]
    ],
    [
        -14,
        [
            "EFAULT",
            "bad address in system call argument"
        ]
    ],
    [
        -27,
        [
            "EFBIG",
            "file too large"
        ]
    ],
    [
        -65,
        [
            "EHOSTUNREACH",
            "host is unreachable"
        ]
    ],
    [
        -4,
        [
            "EINTR",
            "interrupted system call"
        ]
    ],
    [
        -22,
        [
            "EINVAL",
            "invalid argument"
        ]
    ],
    [
        -5,
        [
            "EIO",
            "i/o error"
        ]
    ],
    [
        -56,
        [
            "EISCONN",
            "socket is already connected"
        ]
    ],
    [
        -21,
        [
            "EISDIR",
            "illegal operation on a directory"
        ]
    ],
    [
        -62,
        [
            "ELOOP",
            "too many symbolic links encountered"
        ]
    ],
    [
        -24,
        [
            "EMFILE",
            "too many open files"
        ]
    ],
    [
        -40,
        [
            "EMSGSIZE",
            "message too long"
        ]
    ],
    [
        -63,
        [
            "ENAMETOOLONG",
            "name too long"
        ]
    ],
    [
        -50,
        [
            "ENETDOWN",
            "network is down"
        ]
    ],
    [
        -51,
        [
            "ENETUNREACH",
            "network is unreachable"
        ]
    ],
    [
        -23,
        [
            "ENFILE",
            "file table overflow"
        ]
    ],
    [
        -55,
        [
            "ENOBUFS",
            "no buffer space available"
        ]
    ],
    [
        -19,
        [
            "ENODEV",
            "no such device"
        ]
    ],
    [
        -2,
        [
            "ENOENT",
            "no such file or directory"
        ]
    ],
    [
        -12,
        [
            "ENOMEM",
            "not enough memory"
        ]
    ],
    [
        -4056,
        [
            "ENONET",
            "machine is not on the network"
        ]
    ],
    [
        -42,
        [
            "ENOPROTOOPT",
            "protocol not available"
        ]
    ],
    [
        -28,
        [
            "ENOSPC",
            "no space left on device"
        ]
    ],
    [
        -78,
        [
            "ENOSYS",
            "function not implemented"
        ]
    ],
    [
        -57,
        [
            "ENOTCONN",
            "socket is not connected"
        ]
    ],
    [
        -20,
        [
            "ENOTDIR",
            "not a directory"
        ]
    ],
    [
        -66,
        [
            "ENOTEMPTY",
            "directory not empty"
        ]
    ],
    [
        -38,
        [
            "ENOTSOCK",
            "socket operation on non-socket"
        ]
    ],
    [
        -45,
        [
            "ENOTSUP",
            "operation not supported on socket"
        ]
    ],
    [
        -84,
        [
            "EOVERFLOW",
            "value too large for defined data type"
        ]
    ],
    [
        -1,
        [
            "EPERM",
            "operation not permitted"
        ]
    ],
    [
        -32,
        [
            "EPIPE",
            "broken pipe"
        ]
    ],
    [
        -92,
        [
            "EPROTO",
            "protocol error"
        ]
    ],
    [
        -43,
        [
            "EPROTONOSUPPORT",
            "protocol not supported"
        ]
    ],
    [
        -41,
        [
            "EPROTOTYPE",
            "protocol wrong type for socket"
        ]
    ],
    [
        -34,
        [
            "ERANGE",
            "result too large"
        ]
    ],
    [
        -30,
        [
            "EROFS",
            "read-only file system"
        ]
    ],
    [
        -58,
        [
            "ESHUTDOWN",
            "cannot send after transport endpoint shutdown"
        ]
    ],
    [
        -29,
        [
            "ESPIPE",
            "invalid seek"
        ]
    ],
    [
        -3,
        [
            "ESRCH",
            "no such process"
        ]
    ],
    [
        -60,
        [
            "ETIMEDOUT",
            "connection timed out"
        ]
    ],
    [
        -26,
        [
            "ETXTBSY",
            "text file is busy"
        ]
    ],
    [
        -18,
        [
            "EXDEV",
            "cross-device link not permitted"
        ]
    ],
    [
        -4094,
        [
            "UNKNOWN",
            "unknown error"
        ]
    ],
    [
        -4095,
        [
            "EOF",
            "end of file"
        ]
    ],
    [
        -6,
        [
            "ENXIO",
            "no such device or address"
        ]
    ],
    [
        -31,
        [
            "EMLINK",
            "too many links"
        ]
    ],
    [
        -64,
        [
            "EHOSTDOWN",
            "host is down"
        ]
    ],
    [
        -4030,
        [
            "EREMOTEIO",
            "remote I/O error"
        ]
    ],
    [
        -25,
        [
            "ENOTTY",
            "inappropriate ioctl for device"
        ]
    ],
    [
        -79,
        [
            "EFTYPE",
            "inappropriate file type or format"
        ]
    ],
    [
        -86,
        [
            "EILSEQ",
            "illegal byte sequence"
        ]
    ],
    [
        -44,
        [
            "ESOCKTNOSUPPORT",
            "socket type not supported"
        ]
    ], 
];
const errorToCodeFreebsd = codeToErrorFreebsd.map(([status, [code]])=>[
        code,
        status
    ]
);
const errorMap = new Map(osType === "windows" ? codeToErrorWindows : osType === "darwin" ? codeToErrorDarwin : osType === "linux" ? codeToErrorLinux : osType === "freebsd" ? codeToErrorFreebsd : unreachable());
const codeMap = new Map(osType === "windows" ? errorToCodeWindows : osType === "darwin" ? errorToCodeDarwin : osType === "linux" ? errorToCodeLinux : osType === "freebsd" ? errorToCodeFreebsd : unreachable());
function mapSysErrnoToUvErrno(sysErrno) {
    if (osType === "windows") {
        const code = uvTranslateSysError(sysErrno);
        return codeMap.get(code) ?? -sysErrno;
    } else {
        return -sysErrno;
    }
}
const UV_EAI_MEMORY = codeMap.get("EAI_MEMORY");
const UV_EBADF = codeMap.get("EBADF");
const UV_EEXIST = codeMap.get("EEXIST");
const UV_EINVAL = codeMap.get("EINVAL");
const UV_ENOENT = codeMap.get("ENOENT");
const UV_ENOTSOCK = codeMap.get("ENOTSOCK");
const UV_UNKNOWN = codeMap.get("UNKNOWN");
const mod = {
    errorMap: errorMap,
    codeMap: codeMap,
    mapSysErrnoToUvErrno: mapSysErrnoToUvErrno,
    UV_EAI_MEMORY: UV_EAI_MEMORY,
    UV_EBADF: UV_EBADF,
    UV_EEXIST: UV_EEXIST,
    UV_EINVAL: UV_EINVAL,
    UV_ENOENT: UV_ENOENT,
    UV_ENOTSOCK: UV_ENOTSOCK,
    UV_UNKNOWN: UV_UNKNOWN
};
const codes = {};
function notImplemented(msg) {
    const message = msg ? `Not implemented: ${msg}` : "Not implemented";
    throw new Error(message);
}
function warnNotImplemented(msg) {
    const message = msg ? `Warning: Not implemented: ${msg}` : "Warning: Not implemented";
    console.warn(message);
}
function intoCallbackAPIWithIntercept(func, interceptor, cb, ...args) {
    func(...args).then((value)=>cb && cb(null, interceptor(value))
    , (err)=>cb && cb(err)
    );
}
function spliceOne(list, index) {
    for(; index + 1 < list.length; index++)list[index] = list[index + 1];
    list.pop();
}
function normalizeEncoding(enc) {
    if (enc == null || enc === "utf8" || enc === "utf-8") return "utf8";
    return slowCases(enc);
}
function slowCases(enc) {
    switch(enc.length){
        case 4:
            if (enc === "UTF8") return "utf8";
            if (enc === "ucs2" || enc === "UCS2") return "utf16le";
            enc = `${enc}`.toLowerCase();
            if (enc === "utf8") return "utf8";
            if (enc === "ucs2") return "utf16le";
            break;
        case 3:
            if (enc === "hex" || enc === "HEX" || `${enc}`.toLowerCase() === "hex") {
                return "hex";
            }
            break;
        case 5:
            if (enc === "ascii") return "ascii";
            if (enc === "ucs-2") return "utf16le";
            if (enc === "UTF-8") return "utf8";
            if (enc === "ASCII") return "ascii";
            if (enc === "UCS-2") return "utf16le";
            enc = `${enc}`.toLowerCase();
            if (enc === "utf-8") return "utf8";
            if (enc === "ascii") return "ascii";
            if (enc === "ucs-2") return "utf16le";
            break;
        case 6:
            if (enc === "base64") return "base64";
            if (enc === "latin1" || enc === "binary") return "latin1";
            if (enc === "BASE64") return "base64";
            if (enc === "LATIN1" || enc === "BINARY") return "latin1";
            enc = `${enc}`.toLowerCase();
            if (enc === "base64") return "base64";
            if (enc === "latin1" || enc === "binary") return "latin1";
            break;
        case 7:
            if (enc === "utf16le" || enc === "UTF16LE" || `${enc}`.toLowerCase() === "utf16le") {
                return "utf16le";
            }
            break;
        case 8:
            if (enc === "utf-16le" || enc === "UTF-16LE" || `${enc}`.toLowerCase() === "utf-16le") {
                return "utf16le";
            }
            break;
        default:
            if (enc === "") return "utf8";
    }
}
const NumberIsSafeInteger = Number.isSafeInteger;
function getSystemErrorName(code) {
    if (typeof code !== "number") {
        throw new codes.ERR_INVALID_ARG_TYPE("err", "number", code);
    }
    if (code >= 0 || !NumberIsSafeInteger(code)) {
        throw new codes.ERR_OUT_OF_RANGE("err", "a negative integer", code);
    }
    return errorMap.get(code)?.[0];
}
let core;
const { Deno: Deno2  } = globalThis;
if (Deno2?.[Deno2.internal]?.core) {
    core = Deno2[Deno2.internal].core;
} else if (Deno2?.core) {
    core = Deno2.core;
} else {
    core = {
        runMicrotasks () {
            throw new Error("Deno.core.runMicrotasks() is not supported in this environment");
        },
        setHasTickScheduled () {
            throw new Error("Deno.core.setHasTickScheduled() is not supported in this environment");
        },
        hasTickScheduled () {
            throw new Error("Deno.core.hasTickScheduled() is not supported in this environment");
        },
        setNextTickCallback: undefined,
        setMacrotaskCallback () {
            throw new Error("Deno.core.setNextTickCallback() is not supported in this environment");
        },
        evalContext (_code, _filename) {
            throw new Error("Deno.core.evalContext is not supported in this environment");
        },
        encode (chunk) {
            return new TextEncoder().encode(chunk);
        },
        eventLoopHasMoreWork () {
            return false;
        },
        isProxy () {
            return false;
        },
        getPromiseDetails (_promise) {
            throw new Error("Deno.core.getPromiseDetails is not supported in this environment");
        },
        setPromiseHooks () {
            throw new Error("Deno.core.setPromiseHooks is not supported in this environment");
        },
        ops: {
            op_napi_open (_filename) {
                throw new Error("Node API is not supported in this environment");
            }
        }
    };
}
const _toString = Object.prototype.toString;
const _isObjectLike = (value)=>value !== null && typeof value === "object"
;
const _isFunctionLike = (value)=>value !== null && typeof value === "function"
;
function isAnyArrayBuffer(value) {
    return _isObjectLike(value) && (_toString.call(value) === "[object ArrayBuffer]" || _toString.call(value) === "[object SharedArrayBuffer]");
}
function isArgumentsObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Arguments]";
}
function isArrayBuffer(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object ArrayBuffer]";
}
function isAsyncFunction(value) {
    return _isFunctionLike(value) && _toString.call(value) === "[object AsyncFunction]";
}
function isBooleanObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Boolean]";
}
function isBoxedPrimitive(value) {
    return isBooleanObject(value) || isStringObject(value) || isNumberObject(value) || isSymbolObject(value) || isBigIntObject(value);
}
function isDataView(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object DataView]";
}
function isDate(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Date]";
}
function isGeneratorFunction(value) {
    return _isFunctionLike(value) && _toString.call(value) === "[object GeneratorFunction]";
}
function isGeneratorObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Generator]";
}
function isMap(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Map]";
}
function isMapIterator(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Map Iterator]";
}
function isModuleNamespaceObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Module]";
}
function isNativeError(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Error]";
}
function isNumberObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Number]";
}
function isBigIntObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object BigInt]";
}
function isPromise(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Promise]";
}
function isProxy(value) {
    return core.isProxy(value);
}
function isRegExp(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object RegExp]";
}
function isSet(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Set]";
}
function isSetIterator(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Set Iterator]";
}
function isSharedArrayBuffer(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object SharedArrayBuffer]";
}
function isStringObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object String]";
}
function isSymbolObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Symbol]";
}
function isWeakMap(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object WeakMap]";
}
function isWeakSet(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object WeakSet]";
}
const __default = {
    isAsyncFunction,
    isGeneratorFunction,
    isAnyArrayBuffer,
    isArrayBuffer,
    isArgumentsObject,
    isBoxedPrimitive,
    isDataView,
    isMap,
    isMapIterator,
    isModuleNamespaceObject,
    isNativeError,
    isPromise,
    isSet,
    isSetIterator,
    isWeakMap,
    isWeakSet,
    isRegExp,
    isDate,
    isStringObject,
    isNumberObject,
    isBooleanObject,
    isBigIntObject
};
const mod1 = {
    isAnyArrayBuffer: isAnyArrayBuffer,
    isArgumentsObject: isArgumentsObject,
    isArrayBuffer: isArrayBuffer,
    isAsyncFunction: isAsyncFunction,
    isBooleanObject: isBooleanObject,
    isBoxedPrimitive: isBoxedPrimitive,
    isDataView: isDataView,
    isDate: isDate,
    isGeneratorFunction: isGeneratorFunction,
    isGeneratorObject: isGeneratorObject,
    isMap: isMap,
    isMapIterator: isMapIterator,
    isModuleNamespaceObject: isModuleNamespaceObject,
    isNativeError: isNativeError,
    isNumberObject: isNumberObject,
    isBigIntObject: isBigIntObject,
    isPromise: isPromise,
    isProxy: isProxy,
    isRegExp: isRegExp,
    isSet: isSet,
    isSetIterator: isSetIterator,
    isSharedArrayBuffer: isSharedArrayBuffer,
    isStringObject: isStringObject,
    isSymbolObject: isSymbolObject,
    isWeakMap: isWeakMap,
    isWeakSet: isWeakSet,
    default: __default
};
Symbol("kHandle");
Symbol("kKeyObject");
Symbol("kKeyType");
const _getTypedArrayToStringTag = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Uint8Array).prototype, Symbol.toStringTag).get;
function isArrayBufferView(value) {
    return ArrayBuffer.isView(value);
}
function isFloat32Array(value) {
    return _getTypedArrayToStringTag.call(value) === "Float32Array";
}
function isFloat64Array(value) {
    return _getTypedArrayToStringTag.call(value) === "Float64Array";
}
function isTypedArray(value) {
    return _getTypedArrayToStringTag.call(value) !== undefined;
}
function isUint8Array(value) {
    return _getTypedArrayToStringTag.call(value) === "Uint8Array";
}
const { isDate: isDate1 , isArgumentsObject: isArgumentsObject1 , isBigIntObject: isBigIntObject1 , isBooleanObject: isBooleanObject1 , isNumberObject: isNumberObject1 , isStringObject: isStringObject1 , isSymbolObject: isSymbolObject1 , isNativeError: isNativeError1 , isRegExp: isRegExp1 , isAsyncFunction: isAsyncFunction1 , isGeneratorFunction: isGeneratorFunction1 , isGeneratorObject: isGeneratorObject1 , isPromise: isPromise1 , isMap: isMap1 , isSet: isSet1 , isMapIterator: isMapIterator1 , isSetIterator: isSetIterator1 , isWeakMap: isWeakMap1 , isWeakSet: isWeakSet1 , isArrayBuffer: isArrayBuffer1 , isDataView: isDataView1 , isSharedArrayBuffer: isSharedArrayBuffer1 , isProxy: isProxy1 , isModuleNamespaceObject: isModuleNamespaceObject1 , isAnyArrayBuffer: isAnyArrayBuffer1 , isBoxedPrimitive: isBoxedPrimitive1 ,  } = mod1;
function hideStackFrames(fn) {
    const hidden = "__node_internal_" + fn.name;
    Object.defineProperty(fn, "name", {
        value: hidden,
        writable: true,
        configurable: true,
    });
    return fn;
}
function normalizeEncoding1(enc) {
    if (enc == null || enc === "utf8" || enc === "utf-8") return "utf8";
    return slowCases1(enc);
}
function slowCases1(enc) {
    switch(enc.length){
        case 4:
            if (enc === "UTF8") return "utf8";
            if (enc === "ucs2" || enc === "UCS2") return "utf16le";
            enc = `${enc}`.toLowerCase();
            if (enc === "utf8") return "utf8";
            if (enc === "ucs2") return "utf16le";
            break;
        case 3:
            if (enc === "hex" || enc === "HEX" || `${enc}`.toLowerCase() === "hex") {
                return "hex";
            }
            break;
        case 5:
            if (enc === "ascii") return "ascii";
            if (enc === "ucs-2") return "utf16le";
            if (enc === "UTF-8") return "utf8";
            if (enc === "ASCII") return "ascii";
            if (enc === "UCS-2") return "utf16le";
            enc = `${enc}`.toLowerCase();
            if (enc === "utf-8") return "utf8";
            if (enc === "ascii") return "ascii";
            if (enc === "ucs-2") return "utf16le";
            break;
        case 6:
            if (enc === "base64") return "base64";
            if (enc === "latin1" || enc === "binary") return "latin1";
            if (enc === "BASE64") return "base64";
            if (enc === "LATIN1" || enc === "BINARY") return "latin1";
            enc = `${enc}`.toLowerCase();
            if (enc === "base64") return "base64";
            if (enc === "latin1" || enc === "binary") return "latin1";
            break;
        case 7:
            if (enc === "utf16le" || enc === "UTF16LE" || `${enc}`.toLowerCase() === "utf16le") {
                return "utf16le";
            }
            break;
        case 8:
            if (enc === "utf-16le" || enc === "UTF-16LE" || `${enc}`.toLowerCase() === "utf-16le") {
                return "utf16le";
            }
            break;
        case 9:
            if (enc === "base64url" || enc === "BASE64URL" || `${enc}`.toLowerCase() === "base64url") {
                return "base64url";
            }
            break;
        default:
            if (enc === "") return "utf8";
    }
}
function isInt32(value) {
    return value === (value | 0);
}
function isUint32(value) {
    return value === value >>> 0;
}
const octalReg = /^[0-7]+$/;
const modeDesc = "must be a 32-bit unsigned integer or an octal string";
function parseFileMode(value, name1, def) {
    value ??= def;
    if (typeof value === "string") {
        if (!octalReg.test(value)) {
            throw new codes.ERR_INVALID_ARG_VALUE(name1, value, modeDesc);
        }
        value = Number.parseInt(value, 8);
    }
    validateInt32(value, name1, 0, 2 ** 32 - 1);
    return value;
}
const validateBuffer = hideStackFrames((buffer, name2 = "buffer")=>{
    if (!isArrayBufferView(buffer)) {
        throw new codes.ERR_INVALID_ARG_TYPE(name2, [
            "Buffer",
            "TypedArray",
            "DataView"
        ], buffer);
    }
});
const validateInteger = hideStackFrames((value, name3, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER)=>{
    if (typeof value !== "number") {
        throw new codes.ERR_INVALID_ARG_TYPE(name3, "number", value);
    }
    if (!Number.isInteger(value)) {
        throw new codes.ERR_OUT_OF_RANGE(name3, "an integer", value);
    }
    if (value < min || value > max) {
        throw new codes.ERR_OUT_OF_RANGE(name3, `>= ${min} && <= ${max}`, value);
    }
});
const validateObject = hideStackFrames((value, name4, options)=>{
    const useDefaultOptions = options == null;
    const allowArray = useDefaultOptions ? false : options.allowArray;
    const allowFunction = useDefaultOptions ? false : options.allowFunction;
    const nullable = useDefaultOptions ? false : options.nullable;
    if (!nullable && value === null || !allowArray && Array.isArray(value) || typeof value !== "object" && (!allowFunction || typeof value !== "function")) {
        throw new codes.ERR_INVALID_ARG_TYPE(name4, "Object", value);
    }
});
const validateInt32 = hideStackFrames((value, name5, min = -2147483648, max = 2147483647)=>{
    if (!isInt32(value)) {
        if (typeof value !== "number") {
            throw new codes.ERR_INVALID_ARG_TYPE(name5, "number", value);
        }
        if (!Number.isInteger(value)) {
            throw new codes.ERR_OUT_OF_RANGE(name5, "an integer", value);
        }
        throw new codes.ERR_OUT_OF_RANGE(name5, `>= ${min} && <= ${max}`, value);
    }
    if (value < min || value > max) {
        throw new codes.ERR_OUT_OF_RANGE(name5, `>= ${min} && <= ${max}`, value);
    }
});
const validateUint32 = hideStackFrames((value, name6, positive)=>{
    if (!isUint32(value)) {
        if (typeof value !== "number") {
            throw new codes.ERR_INVALID_ARG_TYPE(name6, "number", value);
        }
        if (!Number.isInteger(value)) {
            throw new codes.ERR_OUT_OF_RANGE(name6, "an integer", value);
        }
        const min = positive ? 1 : 0;
        throw new codes.ERR_OUT_OF_RANGE(name6, `>= ${min} && < 4294967296`, value);
    }
    if (positive && value === 0) {
        throw new codes.ERR_OUT_OF_RANGE(name6, ">= 1 && < 4294967296", value);
    }
});
function validateString(value, name7) {
    if (typeof value !== "string") {
        throw new codes.ERR_INVALID_ARG_TYPE(name7, "string", value);
    }
}
function validateBoolean(value, name8) {
    if (typeof value !== "boolean") {
        throw new codes.ERR_INVALID_ARG_TYPE(name8, "boolean", value);
    }
}
hideStackFrames((value, name9, oneOf)=>{
    if (!Array.prototype.includes.call(oneOf, value)) {
        const allowed = Array.prototype.join.call(Array.prototype.map.call(oneOf, (v1)=>typeof v1 === "string" ? `'${v1}'` : String(v1)
        ), ", ");
        const reason = "must be one of: " + allowed;
        throw new codes.ERR_INVALID_ARG_VALUE(name9, value, reason);
    }
});
function validateEncoding(data, encoding) {
    const normalizedEncoding = normalizeEncoding1(encoding);
    const length = data.length;
    if (normalizedEncoding === "hex" && length % 2 !== 0) {
        throw new codes.ERR_INVALID_ARG_VALUE("encoding", encoding, `is invalid for data of length ${length}`);
    }
}
const validateAbortSignal = hideStackFrames((signal, name10)=>{
    if (signal !== undefined && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
        throw new codes.ERR_INVALID_ARG_TYPE(name10, "AbortSignal", signal);
    }
});
const validateFunction = hideStackFrames((value, name11)=>{
    if (typeof value !== "function") {
        throw new codes.ERR_INVALID_ARG_TYPE(name11, "Function", value);
    }
});
hideStackFrames((value, name12, minLength = 0)=>{
    if (!Array.isArray(value)) {
        throw new codes.ERR_INVALID_ARG_TYPE(name12, "Array", value);
    }
    if (value.length < minLength) {
        const reason = `must be longer than ${minLength}`;
        throw new codes.ERR_INVALID_ARG_VALUE(name12, value, reason);
    }
});
function guessHandleType(_fd) {
    notImplemented("util.guessHandleType");
}
const isNumericLookup = {};
function isArrayIndex(value) {
    switch(typeof value){
        case "number":
            return value >= 0 && (value | 0) === value;
        case "string":
            {
                const result = isNumericLookup[value];
                if (result !== void 0) {
                    return result;
                }
                const length = value.length;
                if (length === 0) {
                    return isNumericLookup[value] = false;
                }
                let ch = 0;
                let i2 = 0;
                for(; i2 < length; ++i2){
                    ch = value.charCodeAt(i2);
                    if (i2 === 0 && ch === 0x30 && length > 1 || ch < 0x30 || ch > 0x39) {
                        return isNumericLookup[value] = false;
                    }
                }
                return isNumericLookup[value] = true;
            }
        default:
            return false;
    }
}
function getOwnNonIndexProperties(obj, filter) {
    let allProperties = [
        ...Object.getOwnPropertyNames(obj),
        ...Object.getOwnPropertySymbols(obj), 
    ];
    if (Array.isArray(obj)) {
        allProperties = allProperties.filter((k)=>!isArrayIndex(k)
        );
    }
    if (filter === 0) {
        return allProperties;
    }
    const result = [];
    for (const key of allProperties){
        const desc = Object.getOwnPropertyDescriptor(obj, key);
        if (desc === undefined) {
            continue;
        }
        if (filter & 1 && !desc.writable) {
            continue;
        }
        if (filter & 2 && !desc.enumerable) {
            continue;
        }
        if (filter & 4 && !desc.configurable) {
            continue;
        }
        if (filter & 8 && typeof key === "string") {
            continue;
        }
        if (filter & 16 && typeof key === "symbol") {
            continue;
        }
        result.push(key);
    }
    return result;
}
const mod2 = function() {
    return {
        guessHandleType: guessHandleType,
        ALL_PROPERTIES: 0,
        ONLY_WRITABLE: 1,
        ONLY_ENUMERABLE: 2,
        ONLY_CONFIGURABLE: 4,
        ONLY_ENUM_WRITABLE: 6,
        SKIP_STRINGS: 8,
        SKIP_SYMBOLS: 16,
        isArrayIndex: isArrayIndex,
        getOwnNonIndexProperties: getOwnNonIndexProperties
    };
}();
const kObjectType = 0;
const kArrayExtrasType = 2;
const kRejected = 2;
const meta = [
    '\\x00',
    '\\x01',
    '\\x02',
    '\\x03',
    '\\x04',
    '\\x05',
    '\\x06',
    '\\x07',
    '\\b',
    '\\t',
    '\\n',
    '\\x0B',
    '\\f',
    '\\r',
    '\\x0E',
    '\\x0F',
    '\\x10',
    '\\x11',
    '\\x12',
    '\\x13',
    '\\x14',
    '\\x15',
    '\\x16',
    '\\x17',
    '\\x18',
    '\\x19',
    '\\x1A',
    '\\x1B',
    '\\x1C',
    '\\x1D',
    '\\x1E',
    '\\x1F',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    "\\'",
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '\\\\',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '\\x7F',
    '\\x80',
    '\\x81',
    '\\x82',
    '\\x83',
    '\\x84',
    '\\x85',
    '\\x86',
    '\\x87',
    '\\x88',
    '\\x89',
    '\\x8A',
    '\\x8B',
    '\\x8C',
    '\\x8D',
    '\\x8E',
    '\\x8F',
    '\\x90',
    '\\x91',
    '\\x92',
    '\\x93',
    '\\x94',
    '\\x95',
    '\\x96',
    '\\x97',
    '\\x98',
    '\\x99',
    '\\x9A',
    '\\x9B',
    '\\x9C',
    '\\x9D',
    '\\x9E',
    '\\x9F'
];
const isUndetectableObject = (v2)=>typeof v2 === "undefined" && v2 !== undefined
;
const strEscapeSequencesRegExp = /[\x00-\x1f\x27\x5c\x7f-\x9f]/;
const strEscapeSequencesReplacer = /[\x00-\x1f\x27\x5c\x7f-\x9f]/g;
const strEscapeSequencesRegExpSingle = /[\x00-\x1f\x5c\x7f-\x9f]/;
const strEscapeSequencesReplacerSingle = /[\x00-\x1f\x5c\x7f-\x9f]/g;
const keyStrRegExp = /^[a-zA-Z_][a-zA-Z_0-9]*$/;
const numberRegExp = /^(0|[1-9][0-9]*)$/;
const nodeModulesRegExp = /[/\\]node_modules[/\\](.+?)(?=[/\\])/g;
const classRegExp = /^(\s+[^(]*?)\s*{/;
const stripCommentsRegExp = /(\/\/.*?\n)|(\/\*(.|\n)*?\*\/)/g;
const inspectDefaultOptions = {
    showHidden: false,
    depth: 2,
    colors: false,
    customInspect: true,
    showProxy: false,
    maxArrayLength: 100,
    maxStringLength: 10000,
    breakLength: 80,
    compact: 3,
    sorted: false,
    getters: false
};
function getUserOptions(ctx, isCrossContext) {
    const ret = {
        stylize: ctx.stylize,
        showHidden: ctx.showHidden,
        depth: ctx.depth,
        colors: ctx.colors,
        customInspect: ctx.customInspect,
        showProxy: ctx.showProxy,
        maxArrayLength: ctx.maxArrayLength,
        maxStringLength: ctx.maxStringLength,
        breakLength: ctx.breakLength,
        compact: ctx.compact,
        sorted: ctx.sorted,
        getters: ctx.getters,
        ...ctx.userOptions
    };
    if (isCrossContext) {
        Object.setPrototypeOf(ret, null);
        for (const key of Object.keys(ret)){
            if ((typeof ret[key] === "object" || typeof ret[key] === "function") && ret[key] !== null) {
                delete ret[key];
            }
        }
        ret.stylize = Object.setPrototypeOf((value, flavour)=>{
            let stylized;
            try {
                stylized = `${ctx.stylize(value, flavour)}`;
            } catch  {}
            if (typeof stylized !== "string") return value;
            return stylized;
        }, null);
    }
    return ret;
}
function inspect(value, opts) {
    const ctx = {
        budget: {},
        indentationLvl: 0,
        seen: [],
        currentDepth: 0,
        stylize: stylizeNoColor,
        showHidden: inspectDefaultOptions.showHidden,
        depth: inspectDefaultOptions.depth,
        colors: inspectDefaultOptions.colors,
        customInspect: inspectDefaultOptions.customInspect,
        showProxy: inspectDefaultOptions.showProxy,
        maxArrayLength: inspectDefaultOptions.maxArrayLength,
        maxStringLength: inspectDefaultOptions.maxStringLength,
        breakLength: inspectDefaultOptions.breakLength,
        compact: inspectDefaultOptions.compact,
        sorted: inspectDefaultOptions.sorted,
        getters: inspectDefaultOptions.getters
    };
    if (arguments.length > 1) {
        if (arguments.length > 2) {
            if (arguments[2] !== undefined) {
                ctx.depth = arguments[2];
            }
            if (arguments.length > 3 && arguments[3] !== undefined) {
                ctx.colors = arguments[3];
            }
        }
        if (typeof opts === "boolean") {
            ctx.showHidden = opts;
        } else if (opts) {
            const optKeys = Object.keys(opts);
            for(let i3 = 0; i3 < optKeys.length; ++i3){
                const key = optKeys[i3];
                if (inspectDefaultOptions.hasOwnProperty(key) || key === "stylize") {
                    ctx[key] = opts[key];
                } else if (ctx.userOptions === undefined) {
                    ctx.userOptions = opts;
                }
            }
        }
    }
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    if (ctx.maxArrayLength === null) ctx.maxArrayLength = Infinity;
    if (ctx.maxStringLength === null) ctx.maxStringLength = Infinity;
    return formatValue(ctx, value, 0);
}
const customInspectSymbol = Symbol.for("nodejs.util.inspect.custom");
inspect.custom = customInspectSymbol;
Object.defineProperty(inspect, "defaultOptions", {
    get () {
        return inspectDefaultOptions;
    },
    set (options) {
        validateObject(options, "options");
        return Object.assign(inspectDefaultOptions, options);
    }
});
const defaultFG = 39;
const defaultBG = 49;
inspect.colors = Object.assign(Object.create(null), {
    reset: [
        0,
        0
    ],
    bold: [
        1,
        22
    ],
    dim: [
        2,
        22
    ],
    italic: [
        3,
        23
    ],
    underline: [
        4,
        24
    ],
    blink: [
        5,
        25
    ],
    inverse: [
        7,
        27
    ],
    hidden: [
        8,
        28
    ],
    strikethrough: [
        9,
        29
    ],
    doubleunderline: [
        21,
        24
    ],
    black: [
        30,
        defaultFG
    ],
    red: [
        31,
        defaultFG
    ],
    green: [
        32,
        defaultFG
    ],
    yellow: [
        33,
        defaultFG
    ],
    blue: [
        34,
        defaultFG
    ],
    magenta: [
        35,
        defaultFG
    ],
    cyan: [
        36,
        defaultFG
    ],
    white: [
        37,
        defaultFG
    ],
    bgBlack: [
        40,
        defaultBG
    ],
    bgRed: [
        41,
        defaultBG
    ],
    bgGreen: [
        42,
        defaultBG
    ],
    bgYellow: [
        43,
        defaultBG
    ],
    bgBlue: [
        44,
        defaultBG
    ],
    bgMagenta: [
        45,
        defaultBG
    ],
    bgCyan: [
        46,
        defaultBG
    ],
    bgWhite: [
        47,
        defaultBG
    ],
    framed: [
        51,
        54
    ],
    overlined: [
        53,
        55
    ],
    gray: [
        90,
        defaultFG
    ],
    redBright: [
        91,
        defaultFG
    ],
    greenBright: [
        92,
        defaultFG
    ],
    yellowBright: [
        93,
        defaultFG
    ],
    blueBright: [
        94,
        defaultFG
    ],
    magentaBright: [
        95,
        defaultFG
    ],
    cyanBright: [
        96,
        defaultFG
    ],
    whiteBright: [
        97,
        defaultFG
    ],
    bgGray: [
        100,
        defaultBG
    ],
    bgRedBright: [
        101,
        defaultBG
    ],
    bgGreenBright: [
        102,
        defaultBG
    ],
    bgYellowBright: [
        103,
        defaultBG
    ],
    bgBlueBright: [
        104,
        defaultBG
    ],
    bgMagentaBright: [
        105,
        defaultBG
    ],
    bgCyanBright: [
        106,
        defaultBG
    ],
    bgWhiteBright: [
        107,
        defaultBG
    ]
});
function defineColorAlias(target, alias) {
    Object.defineProperty(inspect.colors, alias, {
        get () {
            return this[target];
        },
        set (value) {
            this[target] = value;
        },
        configurable: true,
        enumerable: false
    });
}
defineColorAlias("gray", "grey");
defineColorAlias("gray", "blackBright");
defineColorAlias("bgGray", "bgGrey");
defineColorAlias("bgGray", "bgBlackBright");
defineColorAlias("dim", "faint");
defineColorAlias("strikethrough", "crossedout");
defineColorAlias("strikethrough", "strikeThrough");
defineColorAlias("strikethrough", "crossedOut");
defineColorAlias("hidden", "conceal");
defineColorAlias("inverse", "swapColors");
defineColorAlias("inverse", "swapcolors");
defineColorAlias("doubleunderline", "doubleUnderline");
inspect.styles = Object.assign(Object.create(null), {
    special: "cyan",
    number: "yellow",
    bigint: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    symbol: "green",
    date: "magenta",
    regexp: "red",
    module: "underline"
});
function addQuotes(str, quotes) {
    if (quotes === -1) {
        return `"${str}"`;
    }
    if (quotes === -2) {
        return `\`${str}\``;
    }
    return `'${str}'`;
}
const escapeFn = (str)=>meta[str.charCodeAt(0)]
;
function strEscape(str) {
    let escapeTest = strEscapeSequencesRegExp;
    let escapeReplace = strEscapeSequencesReplacer;
    let singleQuote = 39;
    if (str.includes("'")) {
        if (!str.includes('"')) {
            singleQuote = -1;
        } else if (!str.includes("`") && !str.includes("${")) {
            singleQuote = -2;
        }
        if (singleQuote !== 39) {
            escapeTest = strEscapeSequencesRegExpSingle;
            escapeReplace = strEscapeSequencesReplacerSingle;
        }
    }
    if (str.length < 5000 && !escapeTest.test(str)) {
        return addQuotes(str, singleQuote);
    }
    if (str.length > 100) {
        str = str.replace(escapeReplace, escapeFn);
        return addQuotes(str, singleQuote);
    }
    let result = "";
    let last = 0;
    const lastIndex = str.length;
    for(let i4 = 0; i4 < lastIndex; i4++){
        const point = str.charCodeAt(i4);
        if (point === singleQuote || point === 92 || point < 32 || point > 126 && point < 160) {
            if (last === i4) {
                result += meta[point];
            } else {
                result += `${str.slice(last, i4)}${meta[point]}`;
            }
            last = i4 + 1;
        }
    }
    if (last !== lastIndex) {
        result += str.slice(last);
    }
    return addQuotes(result, singleQuote);
}
function stylizeWithColor(str, styleType) {
    const style = inspect.styles[styleType];
    if (style !== undefined) {
        const color = inspect.colors[style];
        if (color !== undefined) {
            return `\u001b[${color[0]}m${str}\u001b[${color[1]}m`;
        }
    }
    return str;
}
function stylizeNoColor(str) {
    return str;
}
function formatValue(ctx, value, recurseTimes, typedArray) {
    if (typeof value !== "object" && typeof value !== "function" && !isUndetectableObject(value)) {
        return formatPrimitive(ctx.stylize, value, ctx);
    }
    if (value === null) {
        return ctx.stylize("null", "null");
    }
    const context = value;
    const proxy = undefined;
    if (ctx.customInspect) {
        const maybeCustom = value[customInspectSymbol];
        if (typeof maybeCustom === "function" && maybeCustom !== inspect && !(value.constructor && value.constructor.prototype === value)) {
            const depth = ctx.depth === null ? null : ctx.depth - recurseTimes;
            const isCrossContext = proxy !== undefined || !(context instanceof Object);
            const ret = maybeCustom.call(context, depth, getUserOptions(ctx, isCrossContext));
            if (ret !== context) {
                if (typeof ret !== "string") {
                    return formatValue(ctx, ret, recurseTimes);
                }
                return ret.replace(/\n/g, `\n${" ".repeat(ctx.indentationLvl)}`);
            }
        }
    }
    if (ctx.seen.includes(value)) {
        let index = 1;
        if (ctx.circular === undefined) {
            ctx.circular = new Map();
            ctx.circular.set(value, index);
        } else {
            index = ctx.circular.get(value);
            if (index === undefined) {
                index = ctx.circular.size + 1;
                ctx.circular.set(value, index);
            }
        }
        return ctx.stylize(`[Circular *${index}]`, "special");
    }
    return formatRaw(ctx, value, recurseTimes, typedArray);
}
function formatRaw(ctx, value, recurseTimes, typedArray) {
    let keys;
    let protoProps;
    if (ctx.showHidden && (recurseTimes <= ctx.depth || ctx.depth === null)) {
        protoProps = [];
    }
    const constructor = getConstructorName(value, ctx, recurseTimes, protoProps);
    if (protoProps !== undefined && protoProps.length === 0) {
        protoProps = undefined;
    }
    let tag = value[Symbol.toStringTag];
    if (typeof tag !== "string") {
        tag = "";
    }
    let base1 = "";
    let formatter = getEmptyFormatArray;
    let braces;
    let noIterator = true;
    let i5 = 0;
    const filter = ctx.showHidden ? 0 : 2;
    let extrasType = 0;
    if (value[Symbol.iterator] || constructor === null) {
        noIterator = false;
        if (Array.isArray(value)) {
            const prefix = constructor !== "Array" || tag !== "" ? getPrefix(constructor, tag, "Array", `(${value.length})`) : "";
            keys = getOwnNonIndexProperties(value, filter);
            braces = [
                `${prefix}[`,
                "]"
            ];
            if (value.length === 0 && keys.length === 0 && protoProps === undefined) {
                return `${braces[0]}]`;
            }
            extrasType = kArrayExtrasType;
            formatter = formatArray;
        } else if (isSet1(value)) {
            const size = value.size;
            const prefix = getPrefix(constructor, tag, "Set", `(${size})`);
            keys = getKeys(value, ctx.showHidden);
            formatter = constructor !== null ? formatSet.bind(null, value) : formatSet.bind(null, value.values());
            if (size === 0 && keys.length === 0 && protoProps === undefined) {
                return `${prefix}{}`;
            }
            braces = [
                `${prefix}{`,
                "}"
            ];
        } else if (isMap1(value)) {
            const size = value.size;
            const prefix = getPrefix(constructor, tag, "Map", `(${size})`);
            keys = getKeys(value, ctx.showHidden);
            formatter = constructor !== null ? formatMap.bind(null, value) : formatMap.bind(null, value.entries());
            if (size === 0 && keys.length === 0 && protoProps === undefined) {
                return `${prefix}{}`;
            }
            braces = [
                `${prefix}{`,
                "}"
            ];
        } else if (isTypedArray(value)) {
            keys = getOwnNonIndexProperties(value, filter);
            const bound = value;
            const fallback = "";
            const size = value.length;
            const prefix = getPrefix(constructor, tag, fallback, `(${size})`);
            braces = [
                `${prefix}[`,
                "]"
            ];
            if (value.length === 0 && keys.length === 0 && !ctx.showHidden) {
                return `${braces[0]}]`;
            }
            formatter = formatTypedArray.bind(null, bound, size);
            extrasType = kArrayExtrasType;
        } else if (isMapIterator1(value)) {
            keys = getKeys(value, ctx.showHidden);
            braces = getIteratorBraces("Map", tag);
            formatter = formatIterator.bind(null, braces);
        } else if (isSetIterator1(value)) {
            keys = getKeys(value, ctx.showHidden);
            braces = getIteratorBraces("Set", tag);
            formatter = formatIterator.bind(null, braces);
        } else {
            noIterator = true;
        }
    }
    if (noIterator) {
        keys = getKeys(value, ctx.showHidden);
        braces = [
            "{",
            "}"
        ];
        if (constructor === "Object") {
            if (isArgumentsObject1(value)) {
                braces[0] = "[Arguments] {";
            } else if (tag !== "") {
                braces[0] = `${getPrefix(constructor, tag, "Object")}{`;
            }
            if (keys.length === 0 && protoProps === undefined) {
                return `${braces[0]}}`;
            }
        } else if (typeof value === "function") {
            base1 = getFunctionBase(value, constructor, tag);
            if (keys.length === 0 && protoProps === undefined) {
                return ctx.stylize(base1, "special");
            }
        } else if (isRegExp1(value)) {
            base1 = RegExp(constructor !== null ? value : new RegExp(value)).toString();
            const prefix = getPrefix(constructor, tag, "RegExp");
            if (prefix !== "RegExp ") {
                base1 = `${prefix}${base1}`;
            }
            if (keys.length === 0 && protoProps === undefined || recurseTimes > ctx.depth && ctx.depth !== null) {
                return ctx.stylize(base1, "regexp");
            }
        } else if (isDate1(value)) {
            base1 = Number.isNaN(value.getTime()) ? value.toString() : value.toISOString();
            const prefix = getPrefix(constructor, tag, "Date");
            if (prefix !== "Date ") {
                base1 = `${prefix}${base1}`;
            }
            if (keys.length === 0 && protoProps === undefined) {
                return ctx.stylize(base1, "date");
            }
        } else if (value instanceof Error) {
            base1 = formatError(value, constructor, tag, ctx, keys);
            if (keys.length === 0 && protoProps === undefined) {
                return base1;
            }
        } else if (isAnyArrayBuffer1(value)) {
            const arrayType = isArrayBuffer1(value) ? "ArrayBuffer" : "SharedArrayBuffer";
            const prefix = getPrefix(constructor, tag, arrayType);
            if (typedArray === undefined) {
                formatter = formatArrayBuffer;
            } else if (keys.length === 0 && protoProps === undefined) {
                return prefix + `{ byteLength: ${formatNumber(ctx.stylize, value.byteLength)} }`;
            }
            braces[0] = `${prefix}{`;
            Array.prototype.unshift.call(keys, "byteLength");
        } else if (isDataView1(value)) {
            braces[0] = `${getPrefix(constructor, tag, "DataView")}{`;
            Array.prototype.unshift.call(keys, "byteLength", "byteOffset", "buffer");
        } else if (isPromise1(value)) {
            braces[0] = `${getPrefix(constructor, tag, "Promise")}{`;
            formatter = formatPromise;
        } else if (isWeakSet1(value)) {
            braces[0] = `${getPrefix(constructor, tag, "WeakSet")}{`;
            formatter = ctx.showHidden ? formatWeakSet : formatWeakCollection;
        } else if (isWeakMap1(value)) {
            braces[0] = `${getPrefix(constructor, tag, "WeakMap")}{`;
            formatter = ctx.showHidden ? formatWeakMap : formatWeakCollection;
        } else if (isModuleNamespaceObject1(value)) {
            braces[0] = `${getPrefix(constructor, tag, "Module")}{`;
            formatter = formatNamespaceObject.bind(null, keys);
        } else if (isBoxedPrimitive1(value)) {
            base1 = getBoxedBase(value, ctx, keys, constructor, tag);
            if (keys.length === 0 && protoProps === undefined) {
                return base1;
            }
        } else {
            if (keys.length === 0 && protoProps === undefined) {
                return `${getCtxStyle(value, constructor, tag)}{}`;
            }
            braces[0] = `${getCtxStyle(value, constructor, tag)}{`;
        }
    }
    if (recurseTimes > ctx.depth && ctx.depth !== null) {
        let constructorName = getCtxStyle(value, constructor, tag).slice(0, -1);
        if (constructor !== null) {
            constructorName = `[${constructorName}]`;
        }
        return ctx.stylize(constructorName, "special");
    }
    recurseTimes += 1;
    ctx.seen.push(value);
    ctx.currentDepth = recurseTimes;
    let output;
    const indentationLvl = ctx.indentationLvl;
    try {
        output = formatter(ctx, value, recurseTimes);
        for(i5 = 0; i5 < keys.length; i5++){
            output.push(formatProperty(ctx, value, recurseTimes, keys[i5], extrasType));
        }
        if (protoProps !== undefined) {
            output.push(...protoProps);
        }
    } catch (err) {
        const constructorName = getCtxStyle(value, constructor, tag).slice(0, -1);
        return handleMaxCallStackSize(ctx, err, constructorName, indentationLvl);
    }
    if (ctx.circular !== undefined) {
        const index = ctx.circular.get(value);
        if (index !== undefined) {
            const reference = ctx.stylize(`<ref *${index}>`, "special");
            if (ctx.compact !== true) {
                base1 = base1 === "" ? reference : `${reference} ${base1}`;
            } else {
                braces[0] = `${reference} ${braces[0]}`;
            }
        }
    }
    ctx.seen.pop();
    if (ctx.sorted) {
        const comparator = ctx.sorted === true ? undefined : ctx.sorted;
        if (extrasType === 0) {
            output = output.sort(comparator);
        } else if (keys.length > 1) {
            const sorted = output.slice(output.length - keys.length).sort(comparator);
            output.splice(output.length - keys.length, keys.length, ...sorted);
        }
    }
    const res = reduceToSingleString(ctx, output, base1, braces, extrasType, recurseTimes, value);
    const budget = ctx.budget[ctx.indentationLvl] || 0;
    const newLength = budget + res.length;
    ctx.budget[ctx.indentationLvl] = newLength;
    if (newLength > 2 ** 27) {
        ctx.depth = -1;
    }
    return res;
}
const builtInObjects = new Set(Object.getOwnPropertyNames(globalThis).filter((e)=>/^[A-Z][a-zA-Z0-9]+$/.test(e)
));
function addPrototypeProperties(ctx, main, obj, recurseTimes, output) {
    let depth = 0;
    let keys;
    let keySet;
    do {
        if (depth !== 0 || main === obj) {
            obj = Object.getPrototypeOf(obj);
            if (obj === null) {
                return;
            }
            const descriptor = Object.getOwnPropertyDescriptor(obj, "constructor");
            if (descriptor !== undefined && typeof descriptor.value === "function" && builtInObjects.has(descriptor.value.name)) {
                return;
            }
        }
        if (depth === 0) {
            keySet = new Set();
        } else {
            Array.prototype.forEach.call(keys, (key)=>keySet.add(key)
            );
        }
        keys = Reflect.ownKeys(obj);
        Array.prototype.push.call(ctx.seen, main);
        for (const key1 of keys){
            if (key1 === "constructor" || main.hasOwnProperty(key1) || depth !== 0 && keySet.has(key1)) {
                continue;
            }
            const desc = Object.getOwnPropertyDescriptor(obj, key1);
            if (typeof desc.value === "function") {
                continue;
            }
            const value = formatProperty(ctx, obj, recurseTimes, key1, 0, desc, main);
            if (ctx.colors) {
                Array.prototype.push.call(output, `\u001b[2m${value}\u001b[22m`);
            } else {
                Array.prototype.push.call(output, value);
            }
        }
        Array.prototype.pop.call(ctx.seen);
    }while (++depth !== 3)
}
function getConstructorName(obj, ctx, recurseTimes, protoProps) {
    let firstProto;
    const tmp = obj;
    while(obj || isUndetectableObject(obj)){
        const descriptor = Object.getOwnPropertyDescriptor(obj, "constructor");
        if (descriptor !== undefined && typeof descriptor.value === "function" && descriptor.value.name !== "" && isInstanceof(tmp, descriptor.value)) {
            if (protoProps !== undefined && (firstProto !== obj || !builtInObjects.has(descriptor.value.name))) {
                addPrototypeProperties(ctx, tmp, firstProto || tmp, recurseTimes, protoProps);
            }
            return descriptor.value.name;
        }
        obj = Object.getPrototypeOf(obj);
        if (firstProto === undefined) {
            firstProto = obj;
        }
    }
    if (firstProto === null) {
        return null;
    }
    const res = undefined;
    if (recurseTimes > ctx.depth && ctx.depth !== null) {
        return `${res} <Complex prototype>`;
    }
    const protoConstr = getConstructorName(firstProto, ctx, recurseTimes + 1, protoProps);
    if (protoConstr === null) {
        return `${res} <${inspect(firstProto, {
            ...ctx,
            customInspect: false,
            depth: -1
        })}>`;
    }
    return `${res} <${protoConstr}>`;
}
function formatPrimitive(fn, value, ctx) {
    if (typeof value === "string") {
        let trailer = "";
        if (value.length > ctx.maxStringLength) {
            const remaining = value.length - ctx.maxStringLength;
            value = value.slice(0, ctx.maxStringLength);
            trailer = `... ${remaining} more character${remaining > 1 ? "s" : ""}`;
        }
        if (ctx.compact !== true && value.length > 16 && value.length > ctx.breakLength - ctx.indentationLvl - 4) {
            return value.split(/(?<=\n)/).map((line)=>fn(strEscape(line), "string")
            ).join(` +\n${" ".repeat(ctx.indentationLvl + 2)}`) + trailer;
        }
        return fn(strEscape(value), "string") + trailer;
    }
    if (typeof value === "number") {
        return formatNumber(fn, value);
    }
    if (typeof value === "bigint") {
        return formatBigInt(fn, value);
    }
    if (typeof value === "boolean") {
        return fn(`${value}`, "boolean");
    }
    if (typeof value === "undefined") {
        return fn("undefined", "undefined");
    }
    return fn(value.toString(), "symbol");
}
function getEmptyFormatArray() {
    return [];
}
function isInstanceof(object, proto) {
    try {
        return object instanceof proto;
    } catch  {
        return false;
    }
}
function getPrefix(constructor, tag, fallback, size = "") {
    if (constructor === null) {
        if (tag !== "" && fallback !== tag) {
            return `[${fallback}${size}: null prototype] [${tag}] `;
        }
        return `[${fallback}${size}: null prototype] `;
    }
    if (tag !== "" && constructor !== tag) {
        return `${constructor}${size} [${tag}] `;
    }
    return `${constructor}${size} `;
}
function formatArray(ctx, value, recurseTimes) {
    const valLen = value.length;
    const len = Math.min(Math.max(0, ctx.maxArrayLength), valLen);
    const remaining = valLen - len;
    const output = [];
    for(let i6 = 0; i6 < len; i6++){
        if (!value.hasOwnProperty(i6)) {
            return formatSpecialArray(ctx, value, recurseTimes, len, output, i6);
        }
        output.push(formatProperty(ctx, value, recurseTimes, i6, 1));
    }
    if (remaining > 0) {
        output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
    }
    return output;
}
function getCtxStyle(_value, constructor, tag) {
    let fallback = "";
    if (constructor === null) {
        if (fallback === tag) {
            fallback = "Object";
        }
    }
    return getPrefix(constructor, tag, fallback);
}
function getKeys(value, showHidden) {
    let keys;
    const symbols = Object.getOwnPropertySymbols(value);
    if (showHidden) {
        keys = Object.getOwnPropertyNames(value);
        if (symbols.length !== 0) {
            Array.prototype.push.apply(keys, symbols);
        }
    } else {
        try {
            keys = Object.keys(value);
        } catch (_err) {
            keys = Object.getOwnPropertyNames(value);
        }
        if (symbols.length !== 0) {}
    }
    return keys;
}
function formatSet(value, ctx, _ignored, recurseTimes) {
    const output = [];
    ctx.indentationLvl += 2;
    for (const v3 of value){
        Array.prototype.push.call(output, formatValue(ctx, v3, recurseTimes));
    }
    ctx.indentationLvl -= 2;
    return output;
}
function formatMap(value, ctx, _gnored, recurseTimes) {
    const output = [];
    ctx.indentationLvl += 2;
    for (const { 0: k , 1: v4  } of value){
        output.push(`${formatValue(ctx, k, recurseTimes)} => ${formatValue(ctx, v4, recurseTimes)}`);
    }
    ctx.indentationLvl -= 2;
    return output;
}
function formatTypedArray(value, length, ctx, _ignored, recurseTimes) {
    const maxLength = Math.min(Math.max(0, ctx.maxArrayLength), length);
    const remaining = value.length - maxLength;
    const output = new Array(maxLength);
    const elementFormatter = value.length > 0 && typeof value[0] === "number" ? formatNumber : formatBigInt;
    for(let i7 = 0; i7 < maxLength; ++i7){
        output[i7] = elementFormatter(ctx.stylize, value[i7]);
    }
    if (remaining > 0) {
        output[maxLength] = `... ${remaining} more item${remaining > 1 ? "s" : ""}`;
    }
    if (ctx.showHidden) {
        ctx.indentationLvl += 2;
        for (const key of [
            "BYTES_PER_ELEMENT",
            "length",
            "byteLength",
            "byteOffset",
            "buffer", 
        ]){
            const str = formatValue(ctx, value[key], recurseTimes, true);
            Array.prototype.push.call(output, `[${key}]: ${str}`);
        }
        ctx.indentationLvl -= 2;
    }
    return output;
}
function getIteratorBraces(type, tag) {
    if (tag !== `${type} Iterator`) {
        if (tag !== "") {
            tag += "] [";
        }
        tag += `${type} Iterator`;
    }
    return [
        `[${tag}] {`,
        "}"
    ];
}
function formatIterator(braces, ctx, value, recurseTimes) {
    const { 0: entries , 1: isKeyValue  } = value;
    if (isKeyValue) {
        braces[0] = braces[0].replace(/ Iterator] {$/, " Entries] {");
        return formatMapIterInner(ctx, recurseTimes, entries, 2);
    }
    return formatSetIterInner(ctx, recurseTimes, entries, 1);
}
function getFunctionBase(value, constructor, tag) {
    const stringified = Function.prototype.toString.call(value);
    if (stringified.slice(0, 5) === "class" && stringified.endsWith("}")) {
        const slice = stringified.slice(5, -1);
        const bracketIndex = slice.indexOf("{");
        if (bracketIndex !== -1 && (!slice.slice(0, bracketIndex).includes("(") || classRegExp.test(slice.replace(stripCommentsRegExp)))) {
            return getClassBase(value, constructor, tag);
        }
    }
    let type = "Function";
    if (isGeneratorFunction1(value)) {
        type = `Generator${type}`;
    }
    if (isAsyncFunction1(value)) {
        type = `Async${type}`;
    }
    let base2 = `[${type}`;
    if (constructor === null) {
        base2 += " (null prototype)";
    }
    if (value.name === "") {
        base2 += " (anonymous)";
    } else {
        base2 += `: ${value.name}`;
    }
    base2 += "]";
    if (constructor !== type && constructor !== null) {
        base2 += ` ${constructor}`;
    }
    if (tag !== "" && constructor !== tag) {
        base2 += ` [${tag}]`;
    }
    return base2;
}
function formatError(err, constructor, tag, ctx, keys) {
    const name13 = err.name != null ? String(err.name) : "Error";
    let len = name13.length;
    let stack = err.stack ? String(err.stack) : err.toString();
    if (!ctx.showHidden && keys.length !== 0) {
        for (const name14 of [
            "name",
            "message",
            "stack"
        ]){
            const index = keys.indexOf(name14);
            if (index !== -1 && stack.includes(err[name14])) {
                keys.splice(index, 1);
            }
        }
    }
    if (constructor === null || name13.endsWith("Error") && stack.startsWith(name13) && (stack.length === len || stack[len] === ":" || stack[len] === "\n")) {
        let fallback = "Error";
        if (constructor === null) {
            const start = stack.match(/^([A-Z][a-z_ A-Z0-9[\]()-]+)(?::|\n {4}at)/) || stack.match(/^([a-z_A-Z0-9-]*Error)$/);
            fallback = start && start[1] || "";
            len = fallback.length;
            fallback = fallback || "Error";
        }
        const prefix = getPrefix(constructor, tag, fallback).slice(0, -1);
        if (name13 !== prefix) {
            if (prefix.includes(name13)) {
                if (len === 0) {
                    stack = `${prefix}: ${stack}`;
                } else {
                    stack = `${prefix}${stack.slice(len)}`;
                }
            } else {
                stack = `${prefix} [${name13}]${stack.slice(len)}`;
            }
        }
    }
    let pos = err.message && stack.indexOf(err.message) || -1;
    if (pos !== -1) {
        pos += err.message.length;
    }
    const stackStart = stack.indexOf("\n    at", pos);
    if (stackStart === -1) {
        stack = `[${stack}]`;
    } else if (ctx.colors) {
        let newStack = stack.slice(0, stackStart);
        const lines = stack.slice(stackStart + 1).split("\n");
        for (const line of lines){
            let nodeModule;
            newStack += "\n";
            let pos = 0;
            while(nodeModule = nodeModulesRegExp.exec(line)){
                newStack += line.slice(pos, nodeModule.index + 14);
                newStack += ctx.stylize(nodeModule[1], "module");
                pos = nodeModule.index + nodeModule[0].length;
            }
            newStack += pos === 0 ? line : line.slice(pos);
        }
        stack = newStack;
    }
    if (ctx.indentationLvl !== 0) {
        const indentation = " ".repeat(ctx.indentationLvl);
        stack = stack.replace(/\n/g, `\n${indentation}`);
    }
    return stack;
}
let hexSlice;
function formatArrayBuffer(ctx, value) {
    let buffer;
    try {
        buffer = new Uint8Array(value);
    } catch  {
        return [
            ctx.stylize("(detached)", "special")
        ];
    }
    let str = hexSlice(buffer, 0, Math.min(ctx.maxArrayLength, buffer.length)).replace(/(.{2})/g, "$1 ").trim();
    const remaining = buffer.length - ctx.maxArrayLength;
    if (remaining > 0) {
        str += ` ... ${remaining} more byte${remaining > 1 ? "s" : ""}`;
    }
    return [
        `${ctx.stylize("[Uint8Contents]", "special")}: <${str}>`
    ];
}
function formatNumber(fn, value) {
    return fn(Object.is(value, -0) ? "-0" : `${value}`, "number");
}
function formatPromise(ctx, value, recurseTimes) {
    let output;
    const { 0: state , 1: result  } = value;
    if (state === 0) {
        output = [
            ctx.stylize("<pending>", "special")
        ];
    } else {
        ctx.indentationLvl += 2;
        const str = formatValue(ctx, result, recurseTimes);
        ctx.indentationLvl -= 2;
        output = [
            state === kRejected ? `${ctx.stylize("<rejected>", "special")} ${str}` : str, 
        ];
    }
    return output;
}
function formatWeakCollection(ctx) {
    return [
        ctx.stylize("<items unknown>", "special")
    ];
}
function formatWeakSet(ctx, value, recurseTimes) {
    const entries = value;
    return formatSetIterInner(ctx, recurseTimes, entries, 0);
}
function formatWeakMap(ctx, value, recurseTimes) {
    const entries = value;
    return formatMapIterInner(ctx, recurseTimes, entries, 0);
}
function formatProperty(ctx, value, recurseTimes, key, type, desc, original = value) {
    let name15, str;
    let extra = " ";
    desc = desc || Object.getOwnPropertyDescriptor(value, key) || {
        value: value[key],
        enumerable: true
    };
    if (desc.value !== undefined) {
        const diff = ctx.compact !== true || type !== 0 ? 2 : 3;
        ctx.indentationLvl += diff;
        str = formatValue(ctx, desc.value, recurseTimes);
        if (diff === 3 && ctx.breakLength < getStringWidth(str, ctx.colors)) {
            extra = `\n${" ".repeat(ctx.indentationLvl)}`;
        }
        ctx.indentationLvl -= diff;
    } else if (desc.get !== undefined) {
        const label = desc.set !== undefined ? "Getter/Setter" : "Getter";
        const s = ctx.stylize;
        const sp = "special";
        if (ctx.getters && (ctx.getters === true || ctx.getters === "get" && desc.set === undefined || ctx.getters === "set" && desc.set !== undefined)) {
            try {
                const tmp = desc.get.call(original);
                ctx.indentationLvl += 2;
                if (tmp === null) {
                    str = `${s(`[${label}:`, sp)} ${s("null", "null")}${s("]", sp)}`;
                } else if (typeof tmp === "object") {
                    str = `${s(`[${label}]`, sp)} ${formatValue(ctx, tmp, recurseTimes)}`;
                } else {
                    const primitive = formatPrimitive(s, tmp, ctx);
                    str = `${s(`[${label}:`, sp)} ${primitive}${s("]", sp)}`;
                }
                ctx.indentationLvl -= 2;
            } catch (err) {
                const message = `<Inspection threw (${err.message})>`;
                str = `${s(`[${label}:`, sp)} ${message}${s("]", sp)}`;
            }
        } else {
            str = ctx.stylize(`[${label}]`, sp);
        }
    } else if (desc.set !== undefined) {
        str = ctx.stylize("[Setter]", "special");
    } else {
        str = ctx.stylize("undefined", "undefined");
    }
    if (type === 1) {
        return str;
    }
    if (typeof key === "symbol") {
        const tmp = key.toString().replace(strEscapeSequencesReplacer, escapeFn);
        name15 = `[${ctx.stylize(tmp, "symbol")}]`;
    } else if (key === "__proto__") {
        name15 = "['__proto__']";
    } else if (desc.enumerable === false) {
        const tmp = key.replace(strEscapeSequencesReplacer, escapeFn);
        name15 = `[${tmp}]`;
    } else if (keyStrRegExp.test(key)) {
        name15 = ctx.stylize(key, "name");
    } else {
        name15 = ctx.stylize(strEscape(key), "string");
    }
    return `${name15}:${extra}${str}`;
}
function handleMaxCallStackSize(_ctx, _err, _constructorName, _indentationLvl) {}
const colorRegExp = /\u001b\[\d\d?m/g;
function removeColors(str) {
    return str.replace(colorRegExp, "");
}
function isBelowBreakLength(ctx, output, start, base3) {
    let totalLength = output.length + start;
    if (totalLength + output.length > ctx.breakLength) {
        return false;
    }
    for(let i8 = 0; i8 < output.length; i8++){
        if (ctx.colors) {
            totalLength += removeColors(output[i8]).length;
        } else {
            totalLength += output[i8].length;
        }
        if (totalLength > ctx.breakLength) {
            return false;
        }
    }
    return base3 === "" || !base3.includes("\n");
}
function formatBigInt(fn, value) {
    return fn(`${value}n`, "bigint");
}
function formatNamespaceObject(keys, ctx, value, recurseTimes) {
    const output = new Array(keys.length);
    for(let i9 = 0; i9 < keys.length; i9++){
        try {
            output[i9] = formatProperty(ctx, value, recurseTimes, keys[i9], kObjectType);
        } catch (_err) {
            const tmp = {
                [keys[i9]]: ""
            };
            output[i9] = formatProperty(ctx, tmp, recurseTimes, keys[i9], kObjectType);
            const pos = output[i9].lastIndexOf(" ");
            output[i9] = output[i9].slice(0, pos + 1) + ctx.stylize("<uninitialized>", "special");
        }
    }
    keys.length = 0;
    return output;
}
function formatSpecialArray(ctx, value, recurseTimes, maxLength, output, i10) {
    const keys = Object.keys(value);
    let index = i10;
    for(; i10 < keys.length && output.length < maxLength; i10++){
        const key = keys[i10];
        const tmp = +key;
        if (tmp > 2 ** 32 - 2) {
            break;
        }
        if (`${index}` !== key) {
            if (!numberRegExp.test(key)) {
                break;
            }
            const emptyItems = tmp - index;
            const ending = emptyItems > 1 ? "s" : "";
            const message = `<${emptyItems} empty item${ending}>`;
            output.push(ctx.stylize(message, "undefined"));
            index = tmp;
            if (output.length === maxLength) {
                break;
            }
        }
        output.push(formatProperty(ctx, value, recurseTimes, key, 1));
        index++;
    }
    const remaining = value.length - index;
    if (output.length !== maxLength) {
        if (remaining > 0) {
            const ending = remaining > 1 ? "s" : "";
            const message = `<${remaining} empty item${ending}>`;
            output.push(ctx.stylize(message, "undefined"));
        }
    } else if (remaining > 0) {
        output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
    }
    return output;
}
function getBoxedBase(value, ctx, keys, constructor, tag) {
    let type;
    if (isNumberObject1(value)) {
        type = "Number";
    } else if (isStringObject1(value)) {
        type = "String";
        keys.splice(0, value.length);
    } else if (isBooleanObject1(value)) {
        type = "Boolean";
    } else if (isBigIntObject1(value)) {
        type = "BigInt";
    } else {
        type = "Symbol";
    }
    let base4 = `[${type}`;
    if (type !== constructor) {
        if (constructor === null) {
            base4 += " (null prototype)";
        } else {
            base4 += ` (${constructor})`;
        }
    }
    base4 += `: ${formatPrimitive(stylizeNoColor, value.valueOf(), ctx)}]`;
    if (tag !== "" && tag !== constructor) {
        base4 += ` [${tag}]`;
    }
    if (keys.length !== 0 || ctx.stylize === stylizeNoColor) {
        return base4;
    }
    return ctx.stylize(base4, type.toLowerCase());
}
function getClassBase(value, constructor, tag) {
    const hasName = value.hasOwnProperty("name");
    const name16 = hasName && value.name || "(anonymous)";
    let base5 = `class ${name16}`;
    if (constructor !== "Function" && constructor !== null) {
        base5 += ` [${constructor}]`;
    }
    if (tag !== "" && constructor !== tag) {
        base5 += ` [${tag}]`;
    }
    if (constructor !== null) {
        const superName = Object.getPrototypeOf(value).name;
        if (superName) {
            base5 += ` extends ${superName}`;
        }
    } else {
        base5 += " extends [null prototype]";
    }
    return `[${base5}]`;
}
function reduceToSingleString(ctx, output, base6, braces, extrasType, recurseTimes, value) {
    if (ctx.compact !== true) {
        if (typeof ctx.compact === "number" && ctx.compact >= 1) {
            const entries = output.length;
            if (extrasType === 2 && entries > 6) {
                output = groupArrayElements(ctx, output, value);
            }
            if (ctx.currentDepth - recurseTimes < ctx.compact && entries === output.length) {
                const start = output.length + ctx.indentationLvl + braces[0].length + base6.length + 10;
                if (isBelowBreakLength(ctx, output, start, base6)) {
                    return `${base6 ? `${base6} ` : ""}${braces[0]} ${join(output, ", ")}` + ` ${braces[1]}`;
                }
            }
        }
        const indentation = `\n${" ".repeat(ctx.indentationLvl)}`;
        return `${base6 ? `${base6} ` : ""}${braces[0]}${indentation}  ` + `${join(output, `,${indentation}  `)}${indentation}${braces[1]}`;
    }
    if (isBelowBreakLength(ctx, output, 0, base6)) {
        return `${braces[0]}${base6 ? ` ${base6}` : ""} ${join(output, ", ")} ` + braces[1];
    }
    const indentation = " ".repeat(ctx.indentationLvl);
    const ln = base6 === "" && braces[0].length === 1 ? " " : `${base6 ? ` ${base6}` : ""}\n${indentation}  `;
    return `${braces[0]}${ln}${join(output, `,\n${indentation}  `)} ${braces[1]}`;
}
function join(output, separator) {
    let str = "";
    if (output.length !== 0) {
        const lastIndex = output.length - 1;
        for(let i11 = 0; i11 < lastIndex; i11++){
            str += output[i11];
            str += separator;
        }
        str += output[lastIndex];
    }
    return str;
}
function groupArrayElements(ctx, output, value) {
    let totalLength = 0;
    let maxLength = 0;
    let i12 = 0;
    let outputLength = output.length;
    if (ctx.maxArrayLength < output.length) {
        outputLength--;
    }
    const separatorSpace = 2;
    const dataLen = new Array(outputLength);
    for(; i12 < outputLength; i12++){
        const len = getStringWidth(output[i12], ctx.colors);
        dataLen[i12] = len;
        totalLength += len + separatorSpace;
        if (maxLength < len) {
            maxLength = len;
        }
    }
    const actualMax = maxLength + 2;
    if (actualMax * 3 + ctx.indentationLvl < ctx.breakLength && (totalLength / actualMax > 5 || maxLength <= 6)) {
        const averageBias = Math.sqrt(actualMax - totalLength / output.length);
        const biasedMax = Math.max(actualMax - 3 - averageBias, 1);
        const columns = Math.min(Math.round(Math.sqrt(2.5 * biasedMax * outputLength) / biasedMax), Math.floor((ctx.breakLength - ctx.indentationLvl) / actualMax), ctx.compact * 4, 15);
        if (columns <= 1) {
            return output;
        }
        const tmp = [];
        const maxLineLength = [];
        for(let i13 = 0; i13 < columns; i13++){
            let lineMaxLength = 0;
            for(let j1 = i13; j1 < output.length; j1 += columns){
                if (dataLen[j1] > lineMaxLength) {
                    lineMaxLength = dataLen[j1];
                }
            }
            lineMaxLength += separatorSpace;
            maxLineLength[i13] = lineMaxLength;
        }
        let order = String.prototype.padStart;
        if (value !== undefined) {
            for(let i14 = 0; i14 < output.length; i14++){
                if (typeof value[i14] !== "number" && typeof value[i14] !== "bigint") {
                    order = String.prototype.padEnd;
                    break;
                }
            }
        }
        for(let i1 = 0; i1 < outputLength; i1 += columns){
            const max = Math.min(i1 + columns, outputLength);
            let str = "";
            let j2 = i1;
            for(; j2 < max - 1; j2++){
                const padding = maxLineLength[j2 - i1] + output[j2].length - dataLen[j2];
                str += `${output[j2]}, `.padStart(padding, " ");
            }
            if (order === String.prototype.padStart) {
                const padding = maxLineLength[j2 - i1] + output[j2].length - dataLen[j2] - 2;
                str += output[j2].padStart(padding, " ");
            } else {
                str += output[j2];
            }
            Array.prototype.push.call(tmp, str);
        }
        if (ctx.maxArrayLength < output.length) {
            Array.prototype.push.call(tmp, output[outputLength]);
        }
        output = tmp;
    }
    return output;
}
function formatMapIterInner(ctx, recurseTimes, entries, state) {
    const maxArrayLength = Math.max(ctx.maxArrayLength, 0);
    const len = entries.length / 2;
    const remaining = len - maxArrayLength;
    const maxLength = Math.min(maxArrayLength, len);
    let output = new Array(maxLength);
    let i15 = 0;
    ctx.indentationLvl += 2;
    if (state === 0) {
        for(; i15 < maxLength; i15++){
            const pos = i15 * 2;
            output[i15] = `${formatValue(ctx, entries[pos], recurseTimes)} => ${formatValue(ctx, entries[pos + 1], recurseTimes)}`;
        }
        if (!ctx.sorted) {
            output = output.sort();
        }
    } else {
        for(; i15 < maxLength; i15++){
            const pos = i15 * 2;
            const res = [
                formatValue(ctx, entries[pos], recurseTimes),
                formatValue(ctx, entries[pos + 1], recurseTimes), 
            ];
            output[i15] = reduceToSingleString(ctx, res, "", [
                "[",
                "]"
            ], kArrayExtrasType, recurseTimes);
        }
    }
    ctx.indentationLvl -= 2;
    if (remaining > 0) {
        output.push(`... ${remaining} more item${remaining > 1 ? "s" : ""}`);
    }
    return output;
}
function formatSetIterInner(ctx, recurseTimes, entries, state) {
    const maxArrayLength = Math.max(ctx.maxArrayLength, 0);
    const maxLength = Math.min(maxArrayLength, entries.length);
    const output = new Array(maxLength);
    ctx.indentationLvl += 2;
    for(let i16 = 0; i16 < maxLength; i16++){
        output[i16] = formatValue(ctx, entries[i16], recurseTimes);
    }
    ctx.indentationLvl -= 2;
    if (state === 0 && !ctx.sorted) {
        output.sort();
    }
    const remaining = entries.length - maxLength;
    if (remaining > 0) {
        Array.prototype.push.call(output, `... ${remaining} more item${remaining > 1 ? "s" : ""}`);
    }
    return output;
}
const ansiPattern = "[\\u001B\\u009B][[\\]()#;?]*" + "(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*" + "|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)" + "|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))";
const ansi = new RegExp(ansiPattern, "g");
function getStringWidth(str, removeControlChars = true) {
    let width = 0;
    if (removeControlChars) {
        str = stripVTControlCharacters(str);
    }
    str = str.normalize("NFC");
    for (const __char of str[Symbol.iterator]()){
        const code = __char.codePointAt(0);
        if (isFullWidthCodePoint(code)) {
            width += 2;
        } else if (!isZeroWidthCodePoint(code)) {
            width++;
        }
    }
    return width;
}
const isFullWidthCodePoint = (code)=>{
    return code >= 0x1100 && (code <= 0x115f || code === 0x2329 || code === 0x232a || code >= 0x2e80 && code <= 0x3247 && code !== 0x303f || code >= 0x3250 && code <= 0x4dbf || code >= 0x4e00 && code <= 0xa4c6 || code >= 0xa960 && code <= 0xa97c || code >= 0xac00 && code <= 0xd7a3 || code >= 0xf900 && code <= 0xfaff || code >= 0xfe10 && code <= 0xfe19 || code >= 0xfe30 && code <= 0xfe6b || code >= 0xff01 && code <= 0xff60 || code >= 0xffe0 && code <= 0xffe6 || code >= 0x1b000 && code <= 0x1b001 || code >= 0x1f200 && code <= 0x1f251 || code >= 0x1f300 && code <= 0x1f64f || code >= 0x20000 && code <= 0x3fffd);
};
const isZeroWidthCodePoint = (code)=>{
    return code <= 0x1F || code >= 0x7F && code <= 0x9F || code >= 0x300 && code <= 0x36F || code >= 0x200B && code <= 0x200F || code >= 0x20D0 && code <= 0x20FF || code >= 0xFE00 && code <= 0xFE0F || code >= 0xFE20 && code <= 0xFE2F || code >= 0xE0100 && code <= 0xE01EF;
};
function stripVTControlCharacters(str) {
    validateString(str, "str");
    return str.replace(ansi, "");
}
let os;
if (Deno.build.os === "darwin") {
    os = {
        UV_UDP_REUSEADDR: 4,
        dlopen: {
            RTLD_LAZY: 1,
            RTLD_NOW: 2,
            RTLD_GLOBAL: 8,
            RTLD_LOCAL: 4
        },
        errno: {
            E2BIG: 7,
            EACCES: 13,
            EADDRINUSE: 48,
            EADDRNOTAVAIL: 49,
            EAFNOSUPPORT: 47,
            EAGAIN: 35,
            EALREADY: 37,
            EBADF: 9,
            EBADMSG: 94,
            EBUSY: 16,
            ECANCELED: 89,
            ECHILD: 10,
            ECONNABORTED: 53,
            ECONNREFUSED: 61,
            ECONNRESET: 54,
            EDEADLK: 11,
            EDESTADDRREQ: 39,
            EDOM: 33,
            EDQUOT: 69,
            EEXIST: 17,
            EFAULT: 14,
            EFBIG: 27,
            EHOSTUNREACH: 65,
            EIDRM: 90,
            EILSEQ: 92,
            EINPROGRESS: 36,
            EINTR: 4,
            EINVAL: 22,
            EIO: 5,
            EISCONN: 56,
            EISDIR: 21,
            ELOOP: 62,
            EMFILE: 24,
            EMLINK: 31,
            EMSGSIZE: 40,
            EMULTIHOP: 95,
            ENAMETOOLONG: 63,
            ENETDOWN: 50,
            ENETRESET: 52,
            ENETUNREACH: 51,
            ENFILE: 23,
            ENOBUFS: 55,
            ENODATA: 96,
            ENODEV: 19,
            ENOENT: 2,
            ENOEXEC: 8,
            ENOLCK: 77,
            ENOLINK: 97,
            ENOMEM: 12,
            ENOMSG: 91,
            ENOPROTOOPT: 42,
            ENOSPC: 28,
            ENOSR: 98,
            ENOSTR: 99,
            ENOSYS: 78,
            ENOTCONN: 57,
            ENOTDIR: 20,
            ENOTEMPTY: 66,
            ENOTSOCK: 38,
            ENOTSUP: 45,
            ENOTTY: 25,
            ENXIO: 6,
            EOPNOTSUPP: 102,
            EOVERFLOW: 84,
            EPERM: 1,
            EPIPE: 32,
            EPROTO: 100,
            EPROTONOSUPPORT: 43,
            EPROTOTYPE: 41,
            ERANGE: 34,
            EROFS: 30,
            ESPIPE: 29,
            ESRCH: 3,
            ESTALE: 70,
            ETIME: 101,
            ETIMEDOUT: 60,
            ETXTBSY: 26,
            EWOULDBLOCK: 35,
            EXDEV: 18
        },
        signals: {
            SIGHUP: 1,
            SIGINT: 2,
            SIGQUIT: 3,
            SIGILL: 4,
            SIGTRAP: 5,
            SIGABRT: 6,
            SIGIOT: 6,
            SIGBUS: 10,
            SIGFPE: 8,
            SIGKILL: 9,
            SIGUSR1: 30,
            SIGSEGV: 11,
            SIGUSR2: 31,
            SIGPIPE: 13,
            SIGALRM: 14,
            SIGTERM: 15,
            SIGCHLD: 20,
            SIGCONT: 19,
            SIGSTOP: 17,
            SIGTSTP: 18,
            SIGTTIN: 21,
            SIGTTOU: 22,
            SIGURG: 16,
            SIGXCPU: 24,
            SIGXFSZ: 25,
            SIGVTALRM: 26,
            SIGPROF: 27,
            SIGWINCH: 28,
            SIGIO: 23,
            SIGINFO: 29,
            SIGSYS: 12
        },
        priority: {
            PRIORITY_LOW: 19,
            PRIORITY_BELOW_NORMAL: 10,
            PRIORITY_NORMAL: 0,
            PRIORITY_ABOVE_NORMAL: -7,
            PRIORITY_HIGH: -14,
            PRIORITY_HIGHEST: -20
        }
    };
} else if (Deno.build.os === "linux") {
    os = {
        UV_UDP_REUSEADDR: 4,
        dlopen: {
            RTLD_LAZY: 1,
            RTLD_NOW: 2,
            RTLD_GLOBAL: 256,
            RTLD_LOCAL: 0,
            RTLD_DEEPBIND: 8
        },
        errno: {
            E2BIG: 7,
            EACCES: 13,
            EADDRINUSE: 98,
            EADDRNOTAVAIL: 99,
            EAFNOSUPPORT: 97,
            EAGAIN: 11,
            EALREADY: 114,
            EBADF: 9,
            EBADMSG: 74,
            EBUSY: 16,
            ECANCELED: 125,
            ECHILD: 10,
            ECONNABORTED: 103,
            ECONNREFUSED: 111,
            ECONNRESET: 104,
            EDEADLK: 35,
            EDESTADDRREQ: 89,
            EDOM: 33,
            EDQUOT: 122,
            EEXIST: 17,
            EFAULT: 14,
            EFBIG: 27,
            EHOSTUNREACH: 113,
            EIDRM: 43,
            EILSEQ: 84,
            EINPROGRESS: 115,
            EINTR: 4,
            EINVAL: 22,
            EIO: 5,
            EISCONN: 106,
            EISDIR: 21,
            ELOOP: 40,
            EMFILE: 24,
            EMLINK: 31,
            EMSGSIZE: 90,
            EMULTIHOP: 72,
            ENAMETOOLONG: 36,
            ENETDOWN: 100,
            ENETRESET: 102,
            ENETUNREACH: 101,
            ENFILE: 23,
            ENOBUFS: 105,
            ENODATA: 61,
            ENODEV: 19,
            ENOENT: 2,
            ENOEXEC: 8,
            ENOLCK: 37,
            ENOLINK: 67,
            ENOMEM: 12,
            ENOMSG: 42,
            ENOPROTOOPT: 92,
            ENOSPC: 28,
            ENOSR: 63,
            ENOSTR: 60,
            ENOSYS: 38,
            ENOTCONN: 107,
            ENOTDIR: 20,
            ENOTEMPTY: 39,
            ENOTSOCK: 88,
            ENOTSUP: 95,
            ENOTTY: 25,
            ENXIO: 6,
            EOPNOTSUPP: 95,
            EOVERFLOW: 75,
            EPERM: 1,
            EPIPE: 32,
            EPROTO: 71,
            EPROTONOSUPPORT: 93,
            EPROTOTYPE: 91,
            ERANGE: 34,
            EROFS: 30,
            ESPIPE: 29,
            ESRCH: 3,
            ESTALE: 116,
            ETIME: 62,
            ETIMEDOUT: 110,
            ETXTBSY: 26,
            EWOULDBLOCK: 11,
            EXDEV: 18
        },
        signals: {
            SIGHUP: 1,
            SIGINT: 2,
            SIGQUIT: 3,
            SIGILL: 4,
            SIGTRAP: 5,
            SIGABRT: 6,
            SIGIOT: 6,
            SIGBUS: 7,
            SIGFPE: 8,
            SIGKILL: 9,
            SIGUSR1: 10,
            SIGSEGV: 11,
            SIGUSR2: 12,
            SIGPIPE: 13,
            SIGALRM: 14,
            SIGTERM: 15,
            SIGCHLD: 17,
            SIGSTKFLT: 16,
            SIGCONT: 18,
            SIGSTOP: 19,
            SIGTSTP: 20,
            SIGTTIN: 21,
            SIGTTOU: 22,
            SIGURG: 23,
            SIGXCPU: 24,
            SIGXFSZ: 25,
            SIGVTALRM: 26,
            SIGPROF: 27,
            SIGWINCH: 28,
            SIGIO: 29,
            SIGPOLL: 29,
            SIGPWR: 30,
            SIGSYS: 31,
            SIGUNUSED: 31
        },
        priority: {
            PRIORITY_LOW: 19,
            PRIORITY_BELOW_NORMAL: 10,
            PRIORITY_NORMAL: 0,
            PRIORITY_ABOVE_NORMAL: -7,
            PRIORITY_HIGH: -14,
            PRIORITY_HIGHEST: -20
        }
    };
} else {
    os = {
        UV_UDP_REUSEADDR: 4,
        dlopen: {},
        errno: {
            E2BIG: 7,
            EACCES: 13,
            EADDRINUSE: 100,
            EADDRNOTAVAIL: 101,
            EAFNOSUPPORT: 102,
            EAGAIN: 11,
            EALREADY: 103,
            EBADF: 9,
            EBADMSG: 104,
            EBUSY: 16,
            ECANCELED: 105,
            ECHILD: 10,
            ECONNABORTED: 106,
            ECONNREFUSED: 107,
            ECONNRESET: 108,
            EDEADLK: 36,
            EDESTADDRREQ: 109,
            EDOM: 33,
            EEXIST: 17,
            EFAULT: 14,
            EFBIG: 27,
            EHOSTUNREACH: 110,
            EIDRM: 111,
            EILSEQ: 42,
            EINPROGRESS: 112,
            EINTR: 4,
            EINVAL: 22,
            EIO: 5,
            EISCONN: 113,
            EISDIR: 21,
            ELOOP: 114,
            EMFILE: 24,
            EMLINK: 31,
            EMSGSIZE: 115,
            ENAMETOOLONG: 38,
            ENETDOWN: 116,
            ENETRESET: 117,
            ENETUNREACH: 118,
            ENFILE: 23,
            ENOBUFS: 119,
            ENODATA: 120,
            ENODEV: 19,
            ENOENT: 2,
            ENOEXEC: 8,
            ENOLCK: 39,
            ENOLINK: 121,
            ENOMEM: 12,
            ENOMSG: 122,
            ENOPROTOOPT: 123,
            ENOSPC: 28,
            ENOSR: 124,
            ENOSTR: 125,
            ENOSYS: 40,
            ENOTCONN: 126,
            ENOTDIR: 20,
            ENOTEMPTY: 41,
            ENOTSOCK: 128,
            ENOTSUP: 129,
            ENOTTY: 25,
            ENXIO: 6,
            EOPNOTSUPP: 130,
            EOVERFLOW: 132,
            EPERM: 1,
            EPIPE: 32,
            EPROTO: 134,
            EPROTONOSUPPORT: 135,
            EPROTOTYPE: 136,
            ERANGE: 34,
            EROFS: 30,
            ESPIPE: 29,
            ESRCH: 3,
            ETIME: 137,
            ETIMEDOUT: 138,
            ETXTBSY: 139,
            EWOULDBLOCK: 140,
            EXDEV: 18,
            WSAEINTR: 10004,
            WSAEBADF: 10009,
            WSAEACCES: 10013,
            WSAEFAULT: 10014,
            WSAEINVAL: 10022,
            WSAEMFILE: 10024,
            WSAEWOULDBLOCK: 10035,
            WSAEINPROGRESS: 10036,
            WSAEALREADY: 10037,
            WSAENOTSOCK: 10038,
            WSAEDESTADDRREQ: 10039,
            WSAEMSGSIZE: 10040,
            WSAEPROTOTYPE: 10041,
            WSAENOPROTOOPT: 10042,
            WSAEPROTONOSUPPORT: 10043,
            WSAESOCKTNOSUPPORT: 10044,
            WSAEOPNOTSUPP: 10045,
            WSAEPFNOSUPPORT: 10046,
            WSAEAFNOSUPPORT: 10047,
            WSAEADDRINUSE: 10048,
            WSAEADDRNOTAVAIL: 10049,
            WSAENETDOWN: 10050,
            WSAENETUNREACH: 10051,
            WSAENETRESET: 10052,
            WSAECONNABORTED: 10053,
            WSAECONNRESET: 10054,
            WSAENOBUFS: 10055,
            WSAEISCONN: 10056,
            WSAENOTCONN: 10057,
            WSAESHUTDOWN: 10058,
            WSAETOOMANYREFS: 10059,
            WSAETIMEDOUT: 10060,
            WSAECONNREFUSED: 10061,
            WSAELOOP: 10062,
            WSAENAMETOOLONG: 10063,
            WSAEHOSTDOWN: 10064,
            WSAEHOSTUNREACH: 10065,
            WSAENOTEMPTY: 10066,
            WSAEPROCLIM: 10067,
            WSAEUSERS: 10068,
            WSAEDQUOT: 10069,
            WSAESTALE: 10070,
            WSAEREMOTE: 10071,
            WSASYSNOTREADY: 10091,
            WSAVERNOTSUPPORTED: 10092,
            WSANOTINITIALISED: 10093,
            WSAEDISCON: 10101,
            WSAENOMORE: 10102,
            WSAECANCELLED: 10103,
            WSAEINVALIDPROCTABLE: 10104,
            WSAEINVALIDPROVIDER: 10105,
            WSAEPROVIDERFAILEDINIT: 10106,
            WSASYSCALLFAILURE: 10107,
            WSASERVICE_NOT_FOUND: 10108,
            WSATYPE_NOT_FOUND: 10109,
            WSA_E_NO_MORE: 10110,
            WSA_E_CANCELLED: 10111,
            WSAEREFUSED: 10112
        },
        signals: {
            SIGHUP: 1,
            SIGINT: 2,
            SIGILL: 4,
            SIGABRT: 22,
            SIGFPE: 8,
            SIGKILL: 9,
            SIGSEGV: 11,
            SIGTERM: 15,
            SIGBREAK: 21,
            SIGWINCH: 28
        },
        priority: {
            PRIORITY_LOW: 19,
            PRIORITY_BELOW_NORMAL: 10,
            PRIORITY_NORMAL: 0,
            PRIORITY_ABOVE_NORMAL: -7,
            PRIORITY_HIGH: -14,
            PRIORITY_HIGHEST: -20
        }
    };
}
const fs = {
    UV_FS_SYMLINK_DIR: 1,
    UV_FS_SYMLINK_JUNCTION: 2,
    O_RDONLY: 0,
    O_WRONLY: 1,
    O_RDWR: 2,
    UV_DIRENT_UNKNOWN: 0,
    UV_DIRENT_FILE: 1,
    UV_DIRENT_DIR: 2,
    UV_DIRENT_LINK: 3,
    UV_DIRENT_FIFO: 4,
    UV_DIRENT_SOCKET: 5,
    UV_DIRENT_CHAR: 6,
    UV_DIRENT_BLOCK: 7,
    S_IFMT: 61440,
    S_IFREG: 32768,
    S_IFDIR: 16384,
    S_IFCHR: 8192,
    S_IFBLK: 24576,
    S_IFIFO: 4096,
    S_IFLNK: 40960,
    S_IFSOCK: 49152,
    O_CREAT: 512,
    O_EXCL: 2048,
    UV_FS_O_FILEMAP: 0,
    O_NOCTTY: 131072,
    O_TRUNC: 1024,
    O_APPEND: 8,
    O_DIRECTORY: 1048576,
    O_NOFOLLOW: 256,
    O_SYNC: 128,
    O_DSYNC: 4194304,
    O_SYMLINK: 2097152,
    O_NONBLOCK: 4,
    S_IRWXU: 448,
    S_IRUSR: 256,
    S_IWUSR: 128,
    S_IXUSR: 64,
    S_IRWXG: 56,
    S_IRGRP: 32,
    S_IWGRP: 16,
    S_IXGRP: 8,
    S_IRWXO: 7,
    S_IROTH: 4,
    S_IWOTH: 2,
    S_IXOTH: 1,
    F_OK: 0,
    R_OK: 4,
    W_OK: 2,
    X_OK: 1,
    UV_FS_COPYFILE_EXCL: 1,
    COPYFILE_EXCL: 1,
    UV_FS_COPYFILE_FICLONE: 2,
    COPYFILE_FICLONE: 2,
    UV_FS_COPYFILE_FICLONE_FORCE: 4,
    COPYFILE_FICLONE_FORCE: 4
};
const crypto = {
    OPENSSL_VERSION_NUMBER: 269488319,
    SSL_OP_ALL: 2147485780,
    SSL_OP_ALLOW_NO_DHE_KEX: 1024,
    SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION: 262144,
    SSL_OP_CIPHER_SERVER_PREFERENCE: 4194304,
    SSL_OP_CISCO_ANYCONNECT: 32768,
    SSL_OP_COOKIE_EXCHANGE: 8192,
    SSL_OP_CRYPTOPRO_TLSEXT_BUG: 2147483648,
    SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS: 2048,
    SSL_OP_EPHEMERAL_RSA: 0,
    SSL_OP_LEGACY_SERVER_CONNECT: 4,
    SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER: 0,
    SSL_OP_MICROSOFT_SESS_ID_BUG: 0,
    SSL_OP_MSIE_SSLV2_RSA_PADDING: 0,
    SSL_OP_NETSCAPE_CA_DN_BUG: 0,
    SSL_OP_NETSCAPE_CHALLENGE_BUG: 0,
    SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG: 0,
    SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG: 0,
    SSL_OP_NO_COMPRESSION: 131072,
    SSL_OP_NO_ENCRYPT_THEN_MAC: 524288,
    SSL_OP_NO_QUERY_MTU: 4096,
    SSL_OP_NO_RENEGOTIATION: 1073741824,
    SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION: 65536,
    SSL_OP_NO_SSLv2: 0,
    SSL_OP_NO_SSLv3: 33554432,
    SSL_OP_NO_TICKET: 16384,
    SSL_OP_NO_TLSv1: 67108864,
    SSL_OP_NO_TLSv1_1: 268435456,
    SSL_OP_NO_TLSv1_2: 134217728,
    SSL_OP_NO_TLSv1_3: 536870912,
    SSL_OP_PKCS1_CHECK_1: 0,
    SSL_OP_PKCS1_CHECK_2: 0,
    SSL_OP_PRIORITIZE_CHACHA: 2097152,
    SSL_OP_SINGLE_DH_USE: 0,
    SSL_OP_SINGLE_ECDH_USE: 0,
    SSL_OP_SSLEAY_080_CLIENT_DH_BUG: 0,
    SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG: 0,
    SSL_OP_TLS_BLOCK_PADDING_BUG: 0,
    SSL_OP_TLS_D5_BUG: 0,
    SSL_OP_TLS_ROLLBACK_BUG: 8388608,
    ENGINE_METHOD_RSA: 1,
    ENGINE_METHOD_DSA: 2,
    ENGINE_METHOD_DH: 4,
    ENGINE_METHOD_RAND: 8,
    ENGINE_METHOD_EC: 2048,
    ENGINE_METHOD_CIPHERS: 64,
    ENGINE_METHOD_DIGESTS: 128,
    ENGINE_METHOD_PKEY_METHS: 512,
    ENGINE_METHOD_PKEY_ASN1_METHS: 1024,
    ENGINE_METHOD_ALL: 65535,
    ENGINE_METHOD_NONE: 0,
    DH_CHECK_P_NOT_SAFE_PRIME: 2,
    DH_CHECK_P_NOT_PRIME: 1,
    DH_UNABLE_TO_CHECK_GENERATOR: 4,
    DH_NOT_SUITABLE_GENERATOR: 8,
    ALPN_ENABLED: 1,
    RSA_PKCS1_PADDING: 1,
    RSA_SSLV23_PADDING: 2,
    RSA_NO_PADDING: 3,
    RSA_PKCS1_OAEP_PADDING: 4,
    RSA_X931_PADDING: 5,
    RSA_PKCS1_PSS_PADDING: 6,
    RSA_PSS_SALTLEN_DIGEST: -1,
    RSA_PSS_SALTLEN_MAX_SIGN: -2,
    RSA_PSS_SALTLEN_AUTO: -2,
    defaultCoreCipherList: "TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA",
    TLS1_VERSION: 769,
    TLS1_1_VERSION: 770,
    TLS1_2_VERSION: 771,
    TLS1_3_VERSION: 772,
    POINT_CONVERSION_COMPRESSED: 2,
    POINT_CONVERSION_UNCOMPRESSED: 4,
    POINT_CONVERSION_HYBRID: 6
};
const zlib = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    Z_VERSION_ERROR: -6,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    ZLIB_VERNUM: 4784,
    DEFLATE: 1,
    INFLATE: 2,
    GZIP: 3,
    GUNZIP: 4,
    DEFLATERAW: 5,
    INFLATERAW: 6,
    UNZIP: 7,
    BROTLI_DECODE: 8,
    BROTLI_ENCODE: 9,
    Z_MIN_WINDOWBITS: 8,
    Z_MAX_WINDOWBITS: 15,
    Z_DEFAULT_WINDOWBITS: 15,
    Z_MIN_CHUNK: 64,
    Z_MAX_CHUNK: Infinity,
    Z_DEFAULT_CHUNK: 16384,
    Z_MIN_MEMLEVEL: 1,
    Z_MAX_MEMLEVEL: 9,
    Z_DEFAULT_MEMLEVEL: 8,
    Z_MIN_LEVEL: -1,
    Z_MAX_LEVEL: 9,
    Z_DEFAULT_LEVEL: -1,
    BROTLI_OPERATION_PROCESS: 0,
    BROTLI_OPERATION_FLUSH: 1,
    BROTLI_OPERATION_FINISH: 2,
    BROTLI_OPERATION_EMIT_METADATA: 3,
    BROTLI_PARAM_MODE: 0,
    BROTLI_MODE_GENERIC: 0,
    BROTLI_MODE_TEXT: 1,
    BROTLI_MODE_FONT: 2,
    BROTLI_DEFAULT_MODE: 0,
    BROTLI_PARAM_QUALITY: 1,
    BROTLI_MIN_QUALITY: 0,
    BROTLI_MAX_QUALITY: 11,
    BROTLI_DEFAULT_QUALITY: 11,
    BROTLI_PARAM_LGWIN: 2,
    BROTLI_MIN_WINDOW_BITS: 10,
    BROTLI_MAX_WINDOW_BITS: 24,
    BROTLI_LARGE_MAX_WINDOW_BITS: 30,
    BROTLI_DEFAULT_WINDOW: 22,
    BROTLI_PARAM_LGBLOCK: 3,
    BROTLI_MIN_INPUT_BLOCK_BITS: 16,
    BROTLI_MAX_INPUT_BLOCK_BITS: 24,
    BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
    BROTLI_PARAM_SIZE_HINT: 5,
    BROTLI_PARAM_LARGE_WINDOW: 6,
    BROTLI_PARAM_NPOSTFIX: 7,
    BROTLI_PARAM_NDIRECT: 8,
    BROTLI_DECODER_RESULT_ERROR: 0,
    BROTLI_DECODER_RESULT_SUCCESS: 1,
    BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
    BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
    BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
    BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
    BROTLI_DECODER_NO_ERROR: 0,
    BROTLI_DECODER_SUCCESS: 1,
    BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
    BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
    BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
    BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
    BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
    BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
    BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
    BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
    BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
    BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
    BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
    BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
    BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
    BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
    BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
    BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
    BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
    BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
    BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
    BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
    BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
    BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
    BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
    BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
    BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
    BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
    BROTLI_DECODER_ERROR_UNREACHABLE: -31
};
const trace = {
    TRACE_EVENT_PHASE_BEGIN: 66,
    TRACE_EVENT_PHASE_END: 69,
    TRACE_EVENT_PHASE_COMPLETE: 88,
    TRACE_EVENT_PHASE_INSTANT: 73,
    TRACE_EVENT_PHASE_ASYNC_BEGIN: 83,
    TRACE_EVENT_PHASE_ASYNC_STEP_INTO: 84,
    TRACE_EVENT_PHASE_ASYNC_STEP_PAST: 112,
    TRACE_EVENT_PHASE_ASYNC_END: 70,
    TRACE_EVENT_PHASE_NESTABLE_ASYNC_BEGIN: 98,
    TRACE_EVENT_PHASE_NESTABLE_ASYNC_END: 101,
    TRACE_EVENT_PHASE_NESTABLE_ASYNC_INSTANT: 110,
    TRACE_EVENT_PHASE_FLOW_BEGIN: 115,
    TRACE_EVENT_PHASE_FLOW_STEP: 116,
    TRACE_EVENT_PHASE_FLOW_END: 102,
    TRACE_EVENT_PHASE_METADATA: 77,
    TRACE_EVENT_PHASE_COUNTER: 67,
    TRACE_EVENT_PHASE_SAMPLE: 80,
    TRACE_EVENT_PHASE_CREATE_OBJECT: 78,
    TRACE_EVENT_PHASE_SNAPSHOT_OBJECT: 79,
    TRACE_EVENT_PHASE_DELETE_OBJECT: 68,
    TRACE_EVENT_PHASE_MEMORY_DUMP: 118,
    TRACE_EVENT_PHASE_MARK: 82,
    TRACE_EVENT_PHASE_CLOCK_SYNC: 99,
    TRACE_EVENT_PHASE_ENTER_CONTEXT: 40,
    TRACE_EVENT_PHASE_LEAVE_CONTEXT: 41,
    TRACE_EVENT_PHASE_LINK_IDS: 61
};
const mod3 = {
    os: os,
    fs: fs,
    crypto: crypto,
    zlib: zlib,
    trace: trace
};
const { errno: { ENOTDIR , ENOENT  } ,  } = os;
const kIsNodeError = Symbol("kIsNodeError");
const classRegExp1 = /^([A-Z][a-z0-9]*)+$/;
const kTypes = [
    "string",
    "function",
    "number",
    "object",
    "Function",
    "Object",
    "boolean",
    "bigint",
    "symbol", 
];
class AbortError extends Error {
    code;
    constructor(message = "The operation was aborted", options){
        if (options !== undefined && typeof options !== "object") {
            throw new codes.ERR_INVALID_ARG_TYPE("options", "Object", options);
        }
        super(message, options);
        this.code = "ABORT_ERR";
        this.name = "AbortError";
    }
}
function addNumericalSeparator(val) {
    let res = "";
    let i17 = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for(; i17 >= start + 4; i17 -= 3){
        res = `_${val.slice(i17 - 3, i17)}${res}`;
    }
    return `${val.slice(0, i17)}${res}`;
}
const captureLargerStackTrace = hideStackFrames(function captureLargerStackTrace(err) {
    Error.captureStackTrace(err);
    return err;
});
hideStackFrames(function uvExceptionWithHostPort(err, syscall, address, port) {
    const { 0: code , 1: uvmsg  } = uvErrmapGet(err) || uvUnmappedError;
    const message = `${syscall} ${code}: ${uvmsg}`;
    let details = "";
    if (port && port > 0) {
        details = ` ${address}:${port}`;
    } else if (address) {
        details = ` ${address}`;
    }
    const ex = new Error(`${message}${details}`);
    ex.code = code;
    ex.errno = err;
    ex.syscall = syscall;
    ex.address = address;
    if (port) {
        ex.port = port;
    }
    return captureLargerStackTrace(ex);
});
const errnoException = hideStackFrames(function errnoException(err, syscall, original) {
    const code = getSystemErrorName(err);
    const message = original ? `${syscall} ${code} ${original}` : `${syscall} ${code}`;
    const ex = new Error(message);
    ex.errno = err;
    ex.code = code;
    ex.syscall = syscall;
    return captureLargerStackTrace(ex);
});
function uvErrmapGet(name17) {
    return errorMap.get(name17);
}
const uvUnmappedError = [
    "UNKNOWN",
    "unknown error"
];
const uvException = hideStackFrames(function uvException(ctx) {
    const { 0: code , 1: uvmsg  } = uvErrmapGet(ctx.errno) || uvUnmappedError;
    let message = `${code}: ${ctx.message || uvmsg}, ${ctx.syscall}`;
    let path4;
    let dest;
    if (ctx.path) {
        path4 = ctx.path.toString();
        message += ` '${path4}'`;
    }
    if (ctx.dest) {
        dest = ctx.dest.toString();
        message += ` -> '${dest}'`;
    }
    const err = new Error(message);
    for (const prop of Object.keys(ctx)){
        if (prop === "message" || prop === "path" || prop === "dest") {
            continue;
        }
        err[prop] = ctx[prop];
    }
    err.code = code;
    if (path4) {
        err.path = path4;
    }
    if (dest) {
        err.dest = dest;
    }
    return captureLargerStackTrace(err);
});
hideStackFrames(function exceptionWithHostPort(err, syscall, address, port, additional) {
    const code = getSystemErrorName(err);
    let details = "";
    if (port && port > 0) {
        details = ` ${address}:${port}`;
    } else if (address) {
        details = ` ${address}`;
    }
    if (additional) {
        details += ` - Local (${additional})`;
    }
    const ex = new Error(`${syscall} ${code}${details}`);
    ex.errno = err;
    ex.code = code;
    ex.syscall = syscall;
    ex.address = address;
    if (port) {
        ex.port = port;
    }
    return captureLargerStackTrace(ex);
});
hideStackFrames(function(code, syscall, hostname) {
    let errno;
    if (typeof code === "number") {
        errno = code;
        if (code === codeMap.get("EAI_NODATA") || code === codeMap.get("EAI_NONAME")) {
            code = "ENOTFOUND";
        } else {
            code = getSystemErrorName(code);
        }
    }
    const message = `${syscall} ${code}${hostname ? ` ${hostname}` : ""}`;
    const ex = new Error(message);
    ex.errno = errno;
    ex.code = code;
    ex.syscall = syscall;
    if (hostname) {
        ex.hostname = hostname;
    }
    return captureLargerStackTrace(ex);
});
class NodeErrorAbstraction extends Error {
    code;
    constructor(name18, code, message){
        super(message);
        this.code = code;
        this.name = name18;
        this.stack = this.stack && `${name18} [${this.code}]${this.stack.slice(20)}`;
    }
    toString() {
        return `${this.name} [${this.code}]: ${this.message}`;
    }
}
class NodeError extends NodeErrorAbstraction {
    constructor(code, message){
        super(Error.prototype.name, code, message);
    }
}
class NodeRangeError extends NodeErrorAbstraction {
    constructor(code, message){
        super(RangeError.prototype.name, code, message);
        Object.setPrototypeOf(this, RangeError.prototype);
        this.toString = function() {
            return `${this.name} [${this.code}]: ${this.message}`;
        };
    }
}
class NodeTypeError extends NodeErrorAbstraction {
    constructor(code, message){
        super(TypeError.prototype.name, code, message);
        Object.setPrototypeOf(this, TypeError.prototype);
        this.toString = function() {
            return `${this.name} [${this.code}]: ${this.message}`;
        };
    }
}
class NodeURIError extends NodeErrorAbstraction {
    constructor(code, message){
        super(URIError.prototype.name, code, message);
        Object.setPrototypeOf(this, URIError.prototype);
        this.toString = function() {
            return `${this.name} [${this.code}]: ${this.message}`;
        };
    }
}
class NodeSystemError extends NodeErrorAbstraction {
    constructor(key, context, msgPrefix){
        let message = `${msgPrefix}: ${context.syscall} returned ` + `${context.code} (${context.message})`;
        if (context.path !== undefined) {
            message += ` ${context.path}`;
        }
        if (context.dest !== undefined) {
            message += ` => ${context.dest}`;
        }
        super("SystemError", key, message);
        captureLargerStackTrace(this);
        Object.defineProperties(this, {
            [kIsNodeError]: {
                value: true,
                enumerable: false,
                writable: true,
                configurable: true
            },
            info: {
                value: context,
                enumerable: true,
                configurable: true,
                writable:true
            },
            errno: {
                get () {
                    return context.errno;
                },
                set: (value)=>{
                    context.errno = value;
                },
                enumerable: true,
                configurable: true
            },
            syscall: {
                get () {
                    return context.syscall;
                },
                set: (value)=>{
                    context.syscall = value;
                },
                enumerable: true,
                configurable: true
            }
        });
        if (context.path !== undefined) {
            Object.defineProperty(this, "path", {
                get () {
                    return context.path;
                },
                set: (value)=>{
                    context.path = value;
                },
                enumerable: true,
                configurable: true
            });
        }
        if (context.dest !== undefined) {
            Object.defineProperty(this, "dest", {
                get () {
                    return context.dest;
                },
                set: (value)=>{
                    context.dest = value;
                },
                enumerable: true,
                configurable: true
            });
        }
    }
    toString() {
        return `${this.name} [${this.code}]: ${this.message}`;
    }
}
function makeSystemErrorWithCode(key, msgPrfix) {
    return class NodeError extends NodeSystemError {
        constructor(ctx){
            super(key, ctx, msgPrfix);
        }
    };
}
const ERR_FS_EISDIR = makeSystemErrorWithCode("ERR_FS_EISDIR", "Path is a directory");
function createInvalidArgType(name19, expected) {
    expected = Array.isArray(expected) ? expected : [
        expected
    ];
    let msg = "The ";
    if (name19.endsWith(" argument")) {
        msg += `${name19} `;
    } else {
        const type = name19.includes(".") ? "property" : "argument";
        msg += `"${name19}" ${type} `;
    }
    msg += "must be ";
    const types = [];
    const instances = [];
    const other = [];
    for (const value of expected){
        if (kTypes.includes(value)) {
            types.push(value.toLocaleLowerCase());
        } else if (classRegExp1.test(value)) {
            instances.push(value);
        } else {
            other.push(value);
        }
    }
    if (instances.length > 0) {
        const pos = types.indexOf("object");
        if (pos !== -1) {
            types.splice(pos, 1);
            instances.push("Object");
        }
    }
    if (types.length > 0) {
        if (types.length > 2) {
            const last = types.pop();
            msg += `one of type ${types.join(", ")}, or ${last}`;
        } else if (types.length === 2) {
            msg += `one of type ${types[0]} or ${types[1]}`;
        } else {
            msg += `of type ${types[0]}`;
        }
        if (instances.length > 0 || other.length > 0) {
            msg += " or ";
        }
    }
    if (instances.length > 0) {
        if (instances.length > 2) {
            const last = instances.pop();
            msg += `an instance of ${instances.join(", ")}, or ${last}`;
        } else {
            msg += `an instance of ${instances[0]}`;
            if (instances.length === 2) {
                msg += ` or ${instances[1]}`;
            }
        }
        if (other.length > 0) {
            msg += " or ";
        }
    }
    if (other.length > 0) {
        if (other.length > 2) {
            const last = other.pop();
            msg += `one of ${other.join(", ")}, or ${last}`;
        } else if (other.length === 2) {
            msg += `one of ${other[0]} or ${other[1]}`;
        } else {
            if (other[0].toLowerCase() !== other[0]) {
                msg += "an ";
            }
            msg += `${other[0]}`;
        }
    }
    return msg;
}
class ERR_INVALID_ARG_TYPE_RANGE extends NodeRangeError {
    constructor(name20, expected, actual){
        const msg = createInvalidArgType(name20, expected);
        super("ERR_INVALID_ARG_TYPE", `${msg}.${invalidArgTypeHelper(actual)}`);
    }
}
class ERR_INVALID_ARG_TYPE extends NodeTypeError {
    constructor(name21, expected, actual){
        const msg = createInvalidArgType(name21, expected);
        super("ERR_INVALID_ARG_TYPE", `${msg}.${invalidArgTypeHelper(actual)}`);
    }
    static RangeError = ERR_INVALID_ARG_TYPE_RANGE;
}
class ERR_INVALID_ARG_VALUE_RANGE extends NodeRangeError {
    constructor(name22, value, reason = "is invalid"){
        const type = name22.includes(".") ? "property" : "argument";
        const inspected = inspect(value);
        super("ERR_INVALID_ARG_VALUE", `The ${type} '${name22}' ${reason}. Received ${inspected}`);
    }
}
class ERR_INVALID_ARG_VALUE extends NodeTypeError {
    constructor(name23, value, reason = "is invalid"){
        const type = name23.includes(".") ? "property" : "argument";
        const inspected = inspect(value);
        super("ERR_INVALID_ARG_VALUE", `The ${type} '${name23}' ${reason}. Received ${inspected}`);
    }
    static RangeError = ERR_INVALID_ARG_VALUE_RANGE;
}
function invalidArgTypeHelper(input) {
    if (input == null) {
        return ` Received ${input}`;
    }
    if (typeof input === "function" && input.name) {
        return ` Received function ${input.name}`;
    }
    if (typeof input === "object") {
        if (input.constructor && input.constructor.name) {
            return ` Received an instance of ${input.constructor.name}`;
        }
        return ` Received ${inspect(input, {
            depth: -1
        })}`;
    }
    let inspected = inspect(input, {
        colors: false
    });
    if (inspected.length > 25) {
        inspected = `${inspected.slice(0, 25)}...`;
    }
    return ` Received type ${typeof input} (${inspected})`;
}
class ERR_OUT_OF_RANGE extends RangeError {
    code = "ERR_OUT_OF_RANGE";
    constructor(str, range, input, replaceDefaultBoolean = false){
        assert(range, 'Missing "range" argument');
        let msg = replaceDefaultBoolean ? str : `The value of "${str}" is out of range.`;
        let received;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
            received = String(input);
            if (input > 2n ** 32n || input < -(2n ** 32n)) {
                received = addNumericalSeparator(received);
            }
            received += "n";
        } else {
            received = inspect(input);
        }
        msg += ` It must be ${range}. Received ${received}`;
        super(msg);
        const { name: name24  } = this;
        this.name = `${name24} [${this.code}]`;
        this.stack;
        this.name = name24;
    }
}
class ERR_BUFFER_OUT_OF_BOUNDS extends NodeRangeError {
    constructor(name25){
        super("ERR_BUFFER_OUT_OF_BOUNDS", name25 ? `"${name25}" is outside of buffer bounds` : "Attempt to access memory outside buffer bounds");
    }
}
class ERR_FS_INVALID_SYMLINK_TYPE extends NodeError {
    constructor(x){
        super("ERR_FS_INVALID_SYMLINK_TYPE", `Symlink type must be one of "dir", "file", or "junction". Received "${x}"`);
    }
}
class ERR_INVALID_CURSOR_POS extends NodeTypeError {
    constructor(){
        super("ERR_INVALID_CURSOR_POS", `Cannot set cursor row without setting its column`);
    }
}
class ERR_INVALID_FILE_URL_HOST extends NodeTypeError {
    constructor(x){
        super("ERR_INVALID_FILE_URL_HOST", `File URL host must be "localhost" or empty on ${x}`);
    }
}
class ERR_INVALID_FILE_URL_PATH extends NodeTypeError {
    constructor(x){
        super("ERR_INVALID_FILE_URL_PATH", `File URL path ${x}`);
    }
}
class ERR_INVALID_OPT_VALUE_ENCODING extends NodeTypeError {
    constructor(x){
        super("ERR_INVALID_OPT_VALUE_ENCODING", `The value "${x}" is invalid for option "encoding"`);
    }
}
class ERR_INVALID_URI extends NodeURIError {
    constructor(){
        super("ERR_INVALID_URI", `URI malformed`);
    }
}
class ERR_IPC_CHANNEL_CLOSED extends NodeError {
    constructor(){
        super("ERR_IPC_CHANNEL_CLOSED", `Channel closed`);
    }
}
class ERR_MISSING_ARGS extends NodeTypeError {
    constructor(...args){
        let msg = "The ";
        const len = args.length;
        const wrap = (a)=>`"${a}"`
        ;
        args = args.map((a)=>Array.isArray(a) ? a.map(wrap).join(" or ") : wrap(a)
        );
        switch(len){
            case 1:
                msg += `${args[0]} argument`;
                break;
            case 2:
                msg += `${args[0]} and ${args[1]} arguments`;
                break;
            default:
                msg += args.slice(0, len - 1).join(", ");
                msg += `, and ${args[len - 1]} arguments`;
                break;
        }
        super("ERR_MISSING_ARGS", `${msg} must be specified`);
    }
}
class ERR_SOCKET_BAD_PORT extends NodeRangeError {
    constructor(name26, port, allowZero = true){
        assert(typeof allowZero === "boolean", "The 'allowZero' argument must be of type boolean.");
        const operator = allowZero ? ">=" : ">";
        super("ERR_SOCKET_BAD_PORT", `${name26} should be ${operator} 0 and < 65536. Received ${port}.`);
    }
}
class ERR_STREAM_PREMATURE_CLOSE extends NodeError {
    constructor(){
        super("ERR_STREAM_PREMATURE_CLOSE", `Premature close`);
    }
}
class ERR_UNHANDLED_ERROR extends NodeError {
    constructor(x){
        super("ERR_UNHANDLED_ERROR", `Unhandled error. (${x})`);
    }
}
class ERR_UNKNOWN_ENCODING extends NodeTypeError {
    constructor(x){
        super("ERR_UNKNOWN_ENCODING", `Unknown encoding: ${x}`);
    }
}
class ERR_UNKNOWN_SIGNAL extends NodeTypeError {
    constructor(x){
        super("ERR_UNKNOWN_SIGNAL", `Unknown signal: ${x}`);
    }
}
class ERR_INVALID_URL extends NodeTypeError {
    input;
    constructor(input){
        super("ERR_INVALID_URL", `Invalid URL: ${input}`);
        this.input = input;
    }
}
class ERR_INVALID_URL_SCHEME extends NodeTypeError {
    constructor(expected){
        expected = Array.isArray(expected) ? expected : [
            expected
        ];
        const res = expected.length === 2 ? `one of scheme ${expected[0]} or ${expected[1]}` : `of scheme ${expected[0]}`;
        super("ERR_INVALID_URL_SCHEME", `The URL must be ${res}`);
    }
}
class ERR_INTERNAL_ASSERTION extends NodeError {
    constructor(message){
        const suffix = "This is caused by either a bug in Node.js " + "or incorrect usage of Node.js internals.\n" + "Please open an issue with this stack trace at " + "https://github.com/nodejs/node/issues\n";
        super("ERR_INTERNAL_ASSERTION", message === undefined ? suffix : `${message}\n${suffix}`);
    }
}
class ERR_FS_RMDIR_ENOTDIR extends NodeSystemError {
    constructor(path5){
        const code = isWindows ? "ENOENT" : "ENOTDIR";
        const ctx = {
            message: "not a directory",
            path: path5,
            syscall: "rmdir",
            code,
            errno: isWindows ? ENOENT : ENOTDIR
        };
        super(code, ctx, "Path is not a directory");
    }
}
function denoErrorToNodeError(e, ctx) {
    const errno = extractOsErrorNumberFromErrorMessage(e);
    if (typeof errno === "undefined") {
        return e;
    }
    const ex = uvException({
        errno: mapSysErrnoToUvErrno(errno),
        ...ctx
    });
    return ex;
}
function extractOsErrorNumberFromErrorMessage(e) {
    const match = e instanceof Error ? e.message.match(/\(os error (\d+)\)/) : false;
    if (match) {
        return +match[1];
    }
    return undefined;
}
function aggregateTwoErrors(innerError, outerError) {
    if (innerError && outerError && innerError !== outerError) {
        if (Array.isArray(outerError.errors)) {
            outerError.errors.push(innerError);
            return outerError;
        }
        const err = new AggregateError([
            outerError,
            innerError, 
        ], outerError.message);
        err.code = outerError.code;
        return err;
    }
    return innerError || outerError;
}
codes.ERR_IPC_CHANNEL_CLOSED = ERR_IPC_CHANNEL_CLOSED;
codes.ERR_INVALID_ARG_TYPE = ERR_INVALID_ARG_TYPE;
codes.ERR_INVALID_ARG_VALUE = ERR_INVALID_ARG_VALUE;
codes.ERR_OUT_OF_RANGE = ERR_OUT_OF_RANGE;
codes.ERR_SOCKET_BAD_PORT = ERR_SOCKET_BAD_PORT;
codes.ERR_BUFFER_OUT_OF_BOUNDS = ERR_BUFFER_OUT_OF_BOUNDS;
codes.ERR_UNKNOWN_ENCODING = ERR_UNKNOWN_ENCODING;
hideStackFrames(function genericNodeError(message, errorProperties) {
    const err = new Error(message);
    Object.assign(err, errorProperties);
    return err;
});
"use strict";
const kRejection = Symbol.for("nodejs.rejection");
const kCapture = Symbol("kCapture");
const kErrorMonitor = Symbol("events.errorMonitor");
const kMaxEventTargetListeners = Symbol("events.maxEventTargetListeners");
const kMaxEventTargetListenersWarned = Symbol("events.maxEventTargetListenersWarned");
function EventEmitter(opts) {
    EventEmitter.init.call(this, opts);
}
EventEmitter.on = on;
EventEmitter.once = once;
EventEmitter.getEventListeners = getEventListeners;
EventEmitter.setMaxListeners = setMaxListeners;
EventEmitter.listenerCount = listenerCount;
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.usingDomains = false;
EventEmitter.captureRejectionSymbol = kRejection;
EventEmitter.captureRejectionSymbol;
EventEmitter.errorMonitor;
Object.defineProperty(EventEmitter, "captureRejections", {
    get () {
        return EventEmitter.prototype[kCapture];
    },
    set (value) {
        validateBoolean(value, "EventEmitter.captureRejections");
        EventEmitter.prototype[kCapture] = value;
    },
    enumerable: true
});
EventEmitter.errorMonitor = kErrorMonitor;
Object.defineProperty(EventEmitter.prototype, kCapture, {
    value: false,
    writable: true,
    enumerable: false
});
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;
let defaultMaxListeners = 10;
function checkListener(listener) {
    validateFunction(listener, "listener");
}
Object.defineProperty(EventEmitter, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
        return defaultMaxListeners;
    },
    set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
            throw new ERR_OUT_OF_RANGE("defaultMaxListeners", "a non-negative number", arg);
        }
        defaultMaxListeners = arg;
    }
});
Object.defineProperties(EventEmitter, {
    kMaxEventTargetListeners: {
        value: kMaxEventTargetListeners,
        enumerable: false,
        configurable: false,
        writable: true
    },
    kMaxEventTargetListenersWarned: {
        value: kMaxEventTargetListenersWarned,
        enumerable: false,
        configurable: false,
        writable: true
    }
});
function setMaxListeners(n = defaultMaxListeners, ...eventTargets) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
        throw new ERR_OUT_OF_RANGE("n", "a non-negative number", n);
    }
    if (eventTargets.length === 0) {
        defaultMaxListeners = n;
    } else {
        for(let i18 = 0; i18 < eventTargets.length; i18++){
            const target = eventTargets[i18];
            if (target instanceof EventTarget) {
                target[kMaxEventTargetListeners] = n;
                target[kMaxEventTargetListenersWarned] = false;
            } else if (typeof target.setMaxListeners === "function") {
                target.setMaxListeners(n);
            } else {
                throw new ERR_INVALID_ARG_TYPE("eventTargets", [
                    "EventEmitter",
                    "EventTarget"
                ], target);
            }
        }
    }
}
EventEmitter.init = function(opts) {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
    if (opts?.captureRejections) {
        validateBoolean(opts.captureRejections, "options.captureRejections");
        this[kCapture] = Boolean(opts.captureRejections);
    } else {
        this[kCapture] = EventEmitter.prototype[kCapture];
    }
};
function addCatch(that, promise, type, args) {
    if (!that[kCapture]) {
        return;
    }
    try {
        const then = promise.then;
        if (typeof then === "function") {
            then.call(promise, undefined, function(err) {
                process.nextTick(emitUnhandledRejectionOrErr, that, err, type, args);
            });
        }
    } catch (err) {
        that.emit("error", err);
    }
}
function emitUnhandledRejectionOrErr(ee, err, type, args) {
    if (typeof ee[kRejection] === "function") {
        ee[kRejection](err, type, ...args);
    } else {
        const prev = ee[kCapture];
        try {
            ee[kCapture] = false;
            ee.emit("error", err);
        } finally{
            ee[kCapture] = prev;
        }
    }
}
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
        throw new ERR_OUT_OF_RANGE("n", "a non-negative number", n);
    }
    this._maxListeners = n;
    return this;
};
function _getMaxListeners(that) {
    if (that._maxListeners === undefined) {
        return EventEmitter.defaultMaxListeners;
    }
    return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type, ...args) {
    let doError = type === "error";
    const events = this._events;
    if (events !== undefined) {
        if (doError && events[kErrorMonitor] !== undefined) {
            this.emit(kErrorMonitor, ...args);
        }
        doError = doError && events.error === undefined;
    } else if (!doError) {
        return false;
    }
    if (doError) {
        let er;
        if (args.length > 0) {
            er = args[0];
        }
        if (er instanceof Error) {
            try {
                const capture = {};
                Error.captureStackTrace(capture, EventEmitter.prototype.emit);
            } catch  {}
            throw er;
        }
        let stringifiedEr;
        try {
            stringifiedEr = inspect(er);
        } catch  {
            stringifiedEr = er;
        }
        const err = new ERR_UNHANDLED_ERROR(stringifiedEr);
        err.context = er;
        throw err;
    }
    const handler = events[type];
    if (handler === undefined) {
        return false;
    }
    if (typeof handler === "function") {
        const result = handler.apply(this, args);
        if (result !== undefined && result !== null) {
            addCatch(this, result, type, args);
        }
    } else {
        const len = handler.length;
        const listeners = arrayClone(handler);
        for(let i19 = 0; i19 < len; ++i19){
            const result = listeners[i19].apply(this, args);
            if (result !== undefined && result !== null) {
                addCatch(this, result, type, args);
            }
        }
    }
    return true;
};
function _addListener(target, type, listener, prepend) {
    let m1;
    let events;
    let existing;
    checkListener(listener);
    events = target._events;
    if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
    } else {
        if (events.newListener !== undefined) {
            target.emit("newListener", type, listener.listener ?? listener);
            events = target._events;
        }
        existing = events[type];
    }
    if (existing === undefined) {
        events[type] = listener;
        ++target._eventsCount;
    } else {
        if (typeof existing === "function") {
            existing = events[type] = prepend ? [
                listener,
                existing
            ] : [
                existing,
                listener
            ];
        } else if (prepend) {
            existing.unshift(listener);
        } else {
            existing.push(listener);
        }
        m1 = _getMaxListeners(target);
        if (m1 > 0 && existing.length > m1 && !existing.warned) {
            existing.warned = true;
            const w = new Error("Possible EventEmitter memory leak detected. " + `${existing.length} ${String(type)} listeners ` + `added to ${inspect(target, {
                depth: -1
            })}. Use ` + "emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            process.emitWarning(w);
        }
    }
    return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
};
function onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) {
            return this.listener.call(this.target);
        }
        return this.listener.apply(this.target, arguments);
    }
}
function _onceWrap(target, type, listener) {
    const state = {
        fired: false,
        wrapFn: undefined,
        target,
        type,
        listener
    };
    const wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
};
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    checkListener(listener);
    const events = this._events;
    if (events === undefined) {
        return this;
    }
    const list = events[type];
    if (list === undefined) {
        return this;
    }
    if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0) {
            this._events = Object.create(null);
        } else {
            delete events[type];
            if (events.removeListener) {
                this.emit("removeListener", type, list.listener || listener);
            }
        }
    } else if (typeof list !== "function") {
        let position = -1;
        for(let i20 = list.length - 1; i20 >= 0; i20--){
            if (list[i20] === listener || list[i20].listener === listener) {
                position = i20;
                break;
            }
        }
        if (position < 0) {
            return this;
        }
        if (position === 0) {
            list.shift();
        } else {
            spliceOne(list, position);
        }
        if (list.length === 1) {
            events[type] = list[0];
        }
        if (events.removeListener !== undefined) {
            this.emit("removeListener", type, listener);
        }
    }
    return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    const events = this._events;
    if (events === undefined) {
        return this;
    }
    if (events.removeListener === undefined) {
        if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
        } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0) {
                this._events = Object.create(null);
            } else {
                delete events[type];
            }
        }
        return this;
    }
    if (arguments.length === 0) {
        for (const key of Reflect.ownKeys(events)){
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
    }
    const listeners = events[type];
    if (typeof listeners === "function") {
        this.removeListener(type, listeners);
    } else if (listeners !== undefined) {
        for(let i21 = listeners.length - 1; i21 >= 0; i21--){
            this.removeListener(type, listeners[i21]);
        }
    }
    return this;
};
function _listeners(target, type, unwrap) {
    const events = target._events;
    if (events === undefined) {
        return [];
    }
    const evlistener = events[type];
    if (evlistener === undefined) {
        return [];
    }
    if (typeof evlistener === "function") {
        return unwrap ? [
            evlistener.listener || evlistener
        ] : [
            evlistener
        ];
    }
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener);
}
EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
};
const _listenerCount = function listenerCount(type) {
    const events = this._events;
    if (events !== undefined) {
        const evlistener = events[type];
        if (typeof evlistener === "function") {
            return 1;
        } else if (evlistener !== undefined) {
            return evlistener.length;
        }
    }
    return 0;
};
EventEmitter.prototype.listenerCount = _listenerCount;
function listenerCount(emitter, type) {
    if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
    }
    return _listenerCount.call(emitter, type);
}
EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};
function arrayClone(arr) {
    switch(arr.length){
        case 2:
            return [
                arr[0],
                arr[1]
            ];
        case 3:
            return [
                arr[0],
                arr[1],
                arr[2]
            ];
        case 4:
            return [
                arr[0],
                arr[1],
                arr[2],
                arr[3]
            ];
        case 5:
            return [
                arr[0],
                arr[1],
                arr[2],
                arr[3],
                arr[4]
            ];
        case 6:
            return [
                arr[0],
                arr[1],
                arr[2],
                arr[3],
                arr[4],
                arr[5]
            ];
    }
    return arr.slice();
}
function unwrapListeners(arr) {
    const ret = arrayClone(arr);
    for(let i22 = 0; i22 < ret.length; ++i22){
        const orig = ret[i22].listener;
        if (typeof orig === "function") {
            ret[i22] = orig;
        }
    }
    return ret;
}
function getEventListeners(emitterOrTarget, type) {
    if (typeof emitterOrTarget.listeners === "function") {
        return emitterOrTarget.listeners(type);
    }
    if (emitterOrTarget instanceof EventTarget) {
        const root = emitterOrTarget[kEvents].get(type);
        const listeners = [];
        let handler = root?.next;
        while(handler?.listener !== undefined){
            const listener = handler.listener?.deref ? handler.listener.deref() : handler.listener;
            listeners.push(listener);
            handler = handler.next;
        }
        return listeners;
    }
    throw new ERR_INVALID_ARG_TYPE("emitter", [
        "EventEmitter",
        "EventTarget"
    ], emitterOrTarget);
}
async function once(emitter, name27, options = {}) {
    const signal = options?.signal;
    validateAbortSignal(signal, "options.signal");
    if (signal?.aborted) {
        throw new AbortError();
    }
    return new Promise((resolve6, reject)=>{
        const errorListener = (err)=>{
            emitter.removeListener(name27, resolver);
            if (signal != null) {
                eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
            }
            reject(err);
        };
        const resolver = (...args)=>{
            if (typeof emitter.removeListener === "function") {
                emitter.removeListener("error", errorListener);
            }
            if (signal != null) {
                eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
            }
            resolve6(args);
        };
        eventTargetAgnosticAddListener(emitter, name27, resolver, {
            once: true
        });
        if (name27 !== "error" && typeof emitter.once === "function") {
            emitter.once("error", errorListener);
        }
        function abortListener() {
            eventTargetAgnosticRemoveListener(emitter, name27, resolver);
            eventTargetAgnosticRemoveListener(emitter, "error", errorListener);
            reject(new AbortError());
        }
        if (signal != null) {
            eventTargetAgnosticAddListener(signal, "abort", abortListener, {
                once: true
            });
        }
    });
}
const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function*() {}).prototype);
function createIterResult(value, done) {
    return {
        value,
        done
    };
}
function eventTargetAgnosticRemoveListener(emitter, name28, listener, flags) {
    if (typeof emitter.removeListener === "function") {
        emitter.removeListener(name28, listener);
    } else if (typeof emitter.removeEventListener === "function") {
        emitter.removeEventListener(name28, listener, flags);
    } else {
        throw new ERR_INVALID_ARG_TYPE("emitter", "EventEmitter", emitter);
    }
}
function eventTargetAgnosticAddListener(emitter, name29, listener, flags) {
    if (typeof emitter.on === "function") {
        if (flags?.once) {
            emitter.once(name29, listener);
        } else {
            emitter.on(name29, listener);
        }
    } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name29, (arg)=>{
            listener(arg);
        }, flags);
    } else {
        throw new ERR_INVALID_ARG_TYPE("emitter", "EventEmitter", emitter);
    }
}
function on(emitter, event, options) {
    const signal = options?.signal;
    validateAbortSignal(signal, "options.signal");
    if (signal?.aborted) {
        throw new AbortError();
    }
    const unconsumedEvents = [];
    const unconsumedPromises = [];
    let error2 = null;
    let finished = false;
    const iterator = Object.setPrototypeOf({
        next () {
            const value = unconsumedEvents.shift();
            if (value) {
                return Promise.resolve(createIterResult(value, false));
            }
            if (error2) {
                const p = Promise.reject(error2);
                error2 = null;
                return p;
            }
            if (finished) {
                return Promise.resolve(createIterResult(undefined, true));
            }
            return new Promise(function(resolve7, reject) {
                unconsumedPromises.push({
                    resolve: resolve7,
                    reject
                });
            });
        },
        return () {
            eventTargetAgnosticRemoveListener(emitter, event, eventHandler);
            eventTargetAgnosticRemoveListener(emitter, "error", errorHandler);
            if (signal) {
                eventTargetAgnosticRemoveListener(signal, "abort", abortListener, {
                    once: true
                });
            }
            finished = true;
            for (const promise of unconsumedPromises){
                promise.resolve(createIterResult(undefined, true));
            }
            return Promise.resolve(createIterResult(undefined, true));
        },
        throw (err) {
            if (!err || !(err instanceof Error)) {
                throw new ERR_INVALID_ARG_TYPE("EventEmitter.AsyncIterator", "Error", err);
            }
            error2 = err;
            eventTargetAgnosticRemoveListener(emitter, event, eventHandler);
            eventTargetAgnosticRemoveListener(emitter, "error", errorHandler);
        },
        [Symbol.asyncIterator] () {
            return this;
        }
    }, AsyncIteratorPrototype);
    eventTargetAgnosticAddListener(emitter, event, eventHandler);
    if (event !== "error" && typeof emitter.on === "function") {
        emitter.on("error", errorHandler);
    }
    if (signal) {
        eventTargetAgnosticAddListener(signal, "abort", abortListener, {
            once: true
        });
    }
    return iterator;
    function abortListener() {
        errorHandler(new AbortError());
    }
    function eventHandler(...args) {
        const promise = unconsumedPromises.shift();
        if (promise) {
            promise.resolve(createIterResult(args, false));
        } else {
            unconsumedEvents.push(args);
        }
    }
    function errorHandler(err) {
        finished = true;
        const toError = unconsumedPromises.shift();
        if (toError) {
            toError.reject(err);
        } else {
            error2 = err;
        }
        iterator.return();
    }
}
const { hasOwn  } = Object;
function get(obj, key) {
    if (hasOwn(obj, key)) {
        return obj[key];
    }
}
function getForce(obj, key) {
    const v5 = get(obj, key);
    assert(v5 != null);
    return v5;
}
function isNumber(x) {
    if (typeof x === "number") return true;
    if (/^0x[0-9a-f]+$/i.test(String(x))) return true;
    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(String(x));
}
function hasKey(obj, keys) {
    let o = obj;
    keys.slice(0, -1).forEach((key)=>{
        o = get(o, key) ?? {};
    });
    const key1 = keys[keys.length - 1];
    return hasOwn(o, key1);
}
function parse(args, { "--": doubleDash = false , alias: alias3 = {} , boolean: __boolean = false , default: defaults = {} , stopEarly =false , string =[] , collect: collect1 = [] , negatable =[] , unknown =(i23)=>i23
  } = {}) {
    const aliases = {};
    const flags = {
        bools: {},
        strings: {},
        unknownFn: unknown,
        allBools: false,
        collect: {},
        negatable: {}
    };
    if (alias3 !== undefined) {
        for(const key in alias3){
            const val = getForce(alias3, key);
            if (typeof val === "string") {
                aliases[key] = [
                    val
                ];
            } else {
                aliases[key] = val;
            }
            for (const alias1 of getForce(aliases, key)){
                aliases[alias1] = [
                    key
                ].concat(aliases[key].filter((y)=>alias1 !== y
                ));
            }
        }
    }
    if (__boolean !== undefined) {
        if (typeof __boolean === "boolean") {
            flags.allBools = !!__boolean;
        } else {
            const booleanArgs = typeof __boolean === "string" ? [
                __boolean
            ] : __boolean;
            for (const key of booleanArgs.filter(Boolean)){
                flags.bools[key] = true;
                const alias = get(aliases, key);
                if (alias) {
                    for (const al of alias){
                        flags.bools[al] = true;
                    }
                }
            }
        }
    }
    if (string !== undefined) {
        const stringArgs = typeof string === "string" ? [
            string
        ] : string;
        for (const key of stringArgs.filter(Boolean)){
            flags.strings[key] = true;
            const alias = get(aliases, key);
            if (alias) {
                for (const al of alias){
                    flags.strings[al] = true;
                }
            }
        }
    }
    if (collect1 !== undefined) {
        const collectArgs = typeof collect1 === "string" ? [
            collect1
        ] : collect1;
        for (const key of collectArgs.filter(Boolean)){
            flags.collect[key] = true;
            const alias = get(aliases, key);
            if (alias) {
                for (const al of alias){
                    flags.collect[al] = true;
                }
            }
        }
    }
    if (negatable !== undefined) {
        const negatableArgs = typeof negatable === "string" ? [
            negatable
        ] : negatable;
        for (const key of negatableArgs.filter(Boolean)){
            flags.negatable[key] = true;
            const alias = get(aliases, key);
            if (alias) {
                for (const al of alias){
                    flags.negatable[al] = true;
                }
            }
        }
    }
    const argv1 = {
        _: []
    };
    function argDefined(key, arg) {
        return flags.allBools && /^--[^=]+$/.test(arg) || get(flags.bools, key) || !!get(flags.strings, key) || !!get(aliases, key);
    }
    function setKey(obj, name30, value, collect = true) {
        let o = obj;
        const keys = name30.split(".");
        keys.slice(0, -1).forEach(function(key) {
            if (get(o, key) === undefined) {
                o[key] = {};
            }
            o = get(o, key);
        });
        const key5 = keys[keys.length - 1];
        const collectable = collect && !!get(flags.collect, name30);
        if (!collectable) {
            o[key5] = value;
        } else if (get(o, key5) === undefined) {
            o[key5] = [
                value
            ];
        } else if (Array.isArray(get(o, key5))) {
            o[key5].push(value);
        } else {
            o[key5] = [
                get(o, key5),
                value
            ];
        }
    }
    function setArg(key, val, arg = undefined, collect) {
        if (arg && flags.unknownFn && !argDefined(key, arg)) {
            if (flags.unknownFn(arg, key, val) === false) return;
        }
        const value = !get(flags.strings, key) && isNumber(val) ? Number(val) : val;
        setKey(argv1, key, value, collect);
        const alias = get(aliases, key);
        if (alias) {
            for (const x of alias){
                setKey(argv1, x, value, collect);
            }
        }
    }
    function aliasIsBoolean(key) {
        return getForce(aliases, key).some((x)=>typeof get(flags.bools, x) === "boolean"
        );
    }
    let notFlags = [];
    if (args.includes("--")) {
        notFlags = args.slice(args.indexOf("--") + 1);
        args = args.slice(0, args.indexOf("--"));
    }
    for(let i24 = 0; i24 < args.length; i24++){
        const arg = args[i24];
        if (/^--.+=/.test(arg)) {
            const m2 = arg.match(/^--([^=]+)=(.*)$/s);
            assert(m2 != null);
            const [, key, value] = m2;
            if (flags.bools[key]) {
                const booleanValue = value !== "false";
                setArg(key, booleanValue, arg);
            } else {
                setArg(key, value, arg);
            }
        } else if (/^--no-.+/.test(arg) && get(flags.negatable, arg.replace(/^--no-/, ""))) {
            const m3 = arg.match(/^--no-(.+)/);
            assert(m3 != null);
            setArg(m3[1], false, arg, false);
        } else if (/^--.+/.test(arg)) {
            const m4 = arg.match(/^--(.+)/);
            assert(m4 != null);
            const [, key] = m4;
            const next = args[i24 + 1];
            if (next !== undefined && !/^-/.test(next) && !get(flags.bools, key) && !flags.allBools && (get(aliases, key) ? !aliasIsBoolean(key) : true)) {
                setArg(key, next, arg);
                i24++;
            } else if (/^(true|false)$/.test(next)) {
                setArg(key, next === "true", arg);
                i24++;
            } else {
                setArg(key, get(flags.strings, key) ? "" : true, arg);
            }
        } else if (/^-[^-]+/.test(arg)) {
            const letters = arg.slice(1, -1).split("");
            let broken = false;
            for(let j3 = 0; j3 < letters.length; j3++){
                const next = arg.slice(j3 + 2);
                if (next === "-") {
                    setArg(letters[j3], next, arg);
                    continue;
                }
                if (/[A-Za-z]/.test(letters[j3]) && /=/.test(next)) {
                    setArg(letters[j3], next.split(/=(.+)/)[1], arg);
                    broken = true;
                    break;
                }
                if (/[A-Za-z]/.test(letters[j3]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
                    setArg(letters[j3], next, arg);
                    broken = true;
                    break;
                }
                if (letters[j3 + 1] && letters[j3 + 1].match(/\W/)) {
                    setArg(letters[j3], arg.slice(j3 + 2), arg);
                    broken = true;
                    break;
                } else {
                    setArg(letters[j3], get(flags.strings, letters[j3]) ? "" : true, arg);
                }
            }
            const [key] = arg.slice(-1);
            if (!broken && key !== "-") {
                if (args[i24 + 1] && !/^(-|--)[^-]/.test(args[i24 + 1]) && !get(flags.bools, key) && (get(aliases, key) ? !aliasIsBoolean(key) : true)) {
                    setArg(key, args[i24 + 1], arg);
                    i24++;
                } else if (args[i24 + 1] && /^(true|false)$/.test(args[i24 + 1])) {
                    setArg(key, args[i24 + 1] === "true", arg);
                    i24++;
                } else {
                    setArg(key, get(flags.strings, key) ? "" : true, arg);
                }
            }
        } else {
            if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
                argv1._.push(flags.strings["_"] ?? !isNumber(arg) ? arg : Number(arg));
            }
            if (stopEarly) {
                argv1._.push(...args.slice(i24 + 1));
                break;
            }
        }
    }
    for (const [key4, value1] of Object.entries(defaults)){
        if (!hasKey(argv1, key4.split("."))) {
            setKey(argv1, key4, value1);
            if (aliases[key4]) {
                for (const x of aliases[key4]){
                    setKey(argv1, x, value1);
                }
            }
        }
    }
    for (const key2 of Object.keys(flags.bools)){
        if (!hasKey(argv1, key2.split("."))) {
            const value = get(flags.collect, key2) ? [] : false;
            setKey(argv1, key2, value, false);
        }
    }
    for (const key3 of Object.keys(flags.strings)){
        if (!hasKey(argv1, key3.split(".")) && get(flags.collect, key3)) {
            setKey(argv1, key3, [], false);
        }
    }
    if (doubleDash) {
        argv1["--"] = [];
        for (const key of notFlags){
            argv1["--"].push(key);
        }
    } else {
        for (const key of notFlags){
            argv1._.push(key);
        }
    }
    return argv1;
}
function getOptions() {
    const { Deno  } = globalThis;
    const args = parse(Deno?.args ?? []);
    const options = new Map(Object.entries(args).map(([key, value])=>[
            key,
            {
                value
            }
        ]
    ));
    return {
        options
    };
}
let optionsMap;
function getOptionsFromBinding() {
    if (!optionsMap) {
        ({ options: optionsMap  } = getOptions());
    }
    return optionsMap;
}
function getOptionValue(optionName) {
    const options = getOptionsFromBinding();
    if (optionName.startsWith("--no-")) {
        const option = options.get("--" + optionName.slice(5));
        return option && !option.value;
    }
    return options.get(optionName)?.value;
}
const CHAR_FORWARD_SLASH = 47;
function assertPath(path6) {
    if (typeof path6 !== "string") {
        throw new TypeError(`Path must be a string. Received ${JSON.stringify(path6)}`);
    }
}
function isPosixPathSeparator(code) {
    return code === 47;
}
function isPathSeparator(code) {
    return isPosixPathSeparator(code) || code === 92;
}
function isWindowsDeviceRoot(code) {
    return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function normalizeString(path7, allowAboveRoot, separator, isPathSeparator1) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code;
    for(let i25 = 0, len = path7.length; i25 <= len; ++i25){
        if (i25 < len) code = path7.charCodeAt(i25);
        else if (isPathSeparator1(code)) break;
        else code = CHAR_FORWARD_SLASH;
        if (isPathSeparator1(code)) {
            if (lastSlash === i25 - 1 || dots === 1) {} else if (lastSlash !== i25 - 1 && dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = "";
                            lastSegmentLength = 0;
                        } else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i25;
                        dots = 0;
                        continue;
                    } else if (res.length === 2 || res.length === 1) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = i25;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) res += `${separator}..`;
                    else res = "..";
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += separator + path7.slice(lastSlash + 1, i25);
                else res = path7.slice(lastSlash + 1, i25);
                lastSegmentLength = i25 - lastSlash - 1;
            }
            lastSlash = i25;
            dots = 0;
        } else if (code === 46 && dots !== -1) {
            ++dots;
        } else {
            dots = -1;
        }
    }
    return res;
}
function _format(sep6, pathObject) {
    const dir = pathObject.dir || pathObject.root;
    const base7 = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) return base7;
    if (base7 === sep6) return dir;
    if (dir === pathObject.root) return dir + base7;
    return dir + sep6 + base7;
}
const WHITESPACE_ENCODINGS = {
    "\u0009": "%09",
    "\u000A": "%0A",
    "\u000B": "%0B",
    "\u000C": "%0C",
    "\u000D": "%0D",
    "\u0020": "%20"
};
function encodeWhitespace(string) {
    return string.replaceAll(/[\s]/g, (c)=>{
        return WHITESPACE_ENCODINGS[c] ?? c;
    });
}
function lastPathSegment(path8, isSep, start = 0) {
    let matchedNonSeparator = false;
    let end = path8.length;
    for(let i26 = path8.length - 1; i26 >= start; --i26){
        if (isSep(path8.charCodeAt(i26))) {
            if (matchedNonSeparator) {
                start = i26 + 1;
                break;
            }
        } else if (!matchedNonSeparator) {
            matchedNonSeparator = true;
            end = i26 + 1;
        }
    }
    return path8.slice(start, end);
}
function stripTrailingSeparators(segment, isSep) {
    if (segment.length <= 1) {
        return segment;
    }
    let end = segment.length;
    for(let i27 = segment.length - 1; i27 > 0; i27--){
        if (isSep(segment.charCodeAt(i27))) {
            end = i27;
        } else {
            break;
        }
    }
    return segment.slice(0, end);
}
function stripSuffix(name31, suffix) {
    if (suffix.length >= name31.length) {
        return name31;
    }
    const lenDiff = name31.length - suffix.length;
    for(let i28 = suffix.length - 1; i28 >= 0; --i28){
        if (name31.charCodeAt(lenDiff + i28) !== suffix.charCodeAt(i28)) {
            return name31;
        }
    }
    return name31.slice(0, -suffix.length);
}
const sep = "\\";
const delimiter = ";";
function resolve(...pathSegments) {
    let resolvedDevice = "";
    let resolvedTail = "";
    let resolvedAbsolute = false;
    for(let i29 = pathSegments.length - 1; i29 >= -1; i29--){
        let path9;
        const { Deno  } = globalThis;
        if (i29 >= 0) {
            path9 = pathSegments[i29];
        } else if (!resolvedDevice) {
            if (typeof Deno?.cwd !== "function") {
                throw new TypeError("Resolved a drive-letter-less path without a CWD.");
            }
            path9 = Deno.cwd();
        } else {
            if (typeof Deno?.env?.get !== "function" || typeof Deno?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path9 = Deno.cwd();
            if (path9 === undefined || path9.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                path9 = `${resolvedDevice}\\`;
            }
        }
        assertPath(path9);
        const len = path9.length;
        if (len === 0) continue;
        let rootEnd = 0;
        let device = "";
        let isAbsolute1 = false;
        const code = path9.charCodeAt(0);
        if (len > 1) {
            if (isPathSeparator(code)) {
                isAbsolute1 = true;
                if (isPathSeparator(path9.charCodeAt(1))) {
                    let j4 = 2;
                    let last = j4;
                    for(; j4 < len; ++j4){
                        if (isPathSeparator(path9.charCodeAt(j4))) break;
                    }
                    if (j4 < len && j4 !== last) {
                        const firstPart = path9.slice(last, j4);
                        last = j4;
                        for(; j4 < len; ++j4){
                            if (!isPathSeparator(path9.charCodeAt(j4))) break;
                        }
                        if (j4 < len && j4 !== last) {
                            last = j4;
                            for(; j4 < len; ++j4){
                                if (isPathSeparator(path9.charCodeAt(j4))) break;
                            }
                            if (j4 === len) {
                                device = `\\\\${firstPart}\\${path9.slice(last)}`;
                                rootEnd = j4;
                            } else if (j4 !== last) {
                                device = `\\\\${firstPart}\\${path9.slice(last, j4)}`;
                                rootEnd = j4;
                            }
                        }
                    }
                } else {
                    rootEnd = 1;
                }
            } else if (isWindowsDeviceRoot(code)) {
                if (path9.charCodeAt(1) === 58) {
                    device = path9.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (isPathSeparator(path9.charCodeAt(2))) {
                            isAbsolute1 = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        } else if (isPathSeparator(code)) {
            rootEnd = 1;
            isAbsolute1 = true;
        }
        if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            continue;
        }
        if (resolvedDevice.length === 0 && device.length > 0) {
            resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
            resolvedTail = `${path9.slice(rootEnd)}\\${resolvedTail}`;
            resolvedAbsolute = isAbsolute1;
        }
        if (resolvedAbsolute && resolvedDevice.length > 0) break;
    }
    resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator);
    return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize(path10) {
    assertPath(path10);
    const len = path10.length;
    if (len === 0) return ".";
    let rootEnd = 0;
    let device;
    let isAbsolute2 = false;
    const code = path10.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            isAbsolute2 = true;
            if (isPathSeparator(path10.charCodeAt(1))) {
                let j5 = 2;
                let last = j5;
                for(; j5 < len; ++j5){
                    if (isPathSeparator(path10.charCodeAt(j5))) break;
                }
                if (j5 < len && j5 !== last) {
                    const firstPart = path10.slice(last, j5);
                    last = j5;
                    for(; j5 < len; ++j5){
                        if (!isPathSeparator(path10.charCodeAt(j5))) break;
                    }
                    if (j5 < len && j5 !== last) {
                        last = j5;
                        for(; j5 < len; ++j5){
                            if (isPathSeparator(path10.charCodeAt(j5))) break;
                        }
                        if (j5 === len) {
                            return `\\\\${firstPart}\\${path10.slice(last)}\\`;
                        } else if (j5 !== last) {
                            device = `\\\\${firstPart}\\${path10.slice(last, j5)}`;
                            rootEnd = j5;
                        }
                    }
                }
            } else {
                rootEnd = 1;
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path10.charCodeAt(1) === 58) {
                device = path10.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path10.charCodeAt(2))) {
                        isAbsolute2 = true;
                        rootEnd = 3;
                    }
                }
            }
        }
    } else if (isPathSeparator(code)) {
        return "\\";
    }
    let tail;
    if (rootEnd < len) {
        tail = normalizeString(path10.slice(rootEnd), !isAbsolute2, "\\", isPathSeparator);
    } else {
        tail = "";
    }
    if (tail.length === 0 && !isAbsolute2) tail = ".";
    if (tail.length > 0 && isPathSeparator(path10.charCodeAt(len - 1))) {
        tail += "\\";
    }
    if (device === undefined) {
        if (isAbsolute2) {
            if (tail.length > 0) return `\\${tail}`;
            else return "\\";
        } else if (tail.length > 0) {
            return tail;
        } else {
            return "";
        }
    } else if (isAbsolute2) {
        if (tail.length > 0) return `${device}\\${tail}`;
        else return `${device}\\`;
    } else if (tail.length > 0) {
        return device + tail;
    } else {
        return device;
    }
}
function isAbsolute(path11) {
    assertPath(path11);
    const len = path11.length;
    if (len === 0) return false;
    const code = path11.charCodeAt(0);
    if (isPathSeparator(code)) {
        return true;
    } else if (isWindowsDeviceRoot(code)) {
        if (len > 2 && path11.charCodeAt(1) === 58) {
            if (isPathSeparator(path11.charCodeAt(2))) return true;
        }
    }
    return false;
}
function join1(...paths) {
    const pathsCount = paths.length;
    if (pathsCount === 0) return ".";
    let joined;
    let firstPart = null;
    for(let i30 = 0; i30 < pathsCount; ++i30){
        const path12 = paths[i30];
        assertPath(path12);
        if (path12.length > 0) {
            if (joined === undefined) joined = firstPart = path12;
            else joined += `\\${path12}`;
        }
    }
    if (joined === undefined) return ".";
    let needsReplace = true;
    let slashCount = 0;
    assert(firstPart != null);
    if (isPathSeparator(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1) {
            if (isPathSeparator(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;
                    else {
                        needsReplace = false;
                    }
                }
            }
        }
    }
    if (needsReplace) {
        for(; slashCount < joined.length; ++slashCount){
            if (!isPathSeparator(joined.charCodeAt(slashCount))) break;
        }
        if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
    }
    return normalize(joined);
}
function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    const fromOrig = resolve(from);
    const toOrig = resolve(to);
    if (fromOrig === toOrig) return "";
    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();
    if (from === to) return "";
    let fromStart = 0;
    let fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 92) break;
    }
    for(; fromEnd - 1 > fromStart; --fromEnd){
        if (from.charCodeAt(fromEnd - 1) !== 92) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 0;
    let toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 92) break;
    }
    for(; toEnd - 1 > toStart; --toEnd){
        if (to.charCodeAt(toEnd - 1) !== 92) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i31 = 0;
    for(; i31 <= length; ++i31){
        if (i31 === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i31) === 92) {
                    return toOrig.slice(toStart + i31 + 1);
                } else if (i31 === 2) {
                    return toOrig.slice(toStart + i31);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i31) === 92) {
                    lastCommonSep = i31;
                } else if (i31 === 2) {
                    lastCommonSep = 3;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i31);
        const toCode = to.charCodeAt(toStart + i31);
        if (fromCode !== toCode) break;
        else if (fromCode === 92) lastCommonSep = i31;
    }
    if (i31 !== length && lastCommonSep === -1) {
        return toOrig;
    }
    let out = "";
    if (lastCommonSep === -1) lastCommonSep = 0;
    for(i31 = fromStart + lastCommonSep + 1; i31 <= fromEnd; ++i31){
        if (i31 === fromEnd || from.charCodeAt(i31) === 92) {
            if (out.length === 0) out += "..";
            else out += "\\..";
        }
    }
    if (out.length > 0) {
        return out + toOrig.slice(toStart + lastCommonSep, toEnd);
    } else {
        toStart += lastCommonSep;
        if (toOrig.charCodeAt(toStart) === 92) ++toStart;
        return toOrig.slice(toStart, toEnd);
    }
}
function toNamespacedPath(path13) {
    if (typeof path13 !== "string") return path13;
    if (path13.length === 0) return "";
    const resolvedPath = resolve(path13);
    if (resolvedPath.length >= 3) {
        if (resolvedPath.charCodeAt(0) === 92) {
            if (resolvedPath.charCodeAt(1) === 92) {
                const code = resolvedPath.charCodeAt(2);
                if (code !== 63 && code !== 46) {
                    return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                }
            }
        } else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
            if (resolvedPath.charCodeAt(1) === 58 && resolvedPath.charCodeAt(2) === 92) {
                return `\\\\?\\${resolvedPath}`;
            }
        }
    }
    return path13;
}
function dirname(path14) {
    assertPath(path14);
    const len = path14.length;
    if (len === 0) return ".";
    let rootEnd = -1;
    let end = -1;
    let matchedSlash = true;
    let offset = 0;
    const code = path14.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            rootEnd = offset = 1;
            if (isPathSeparator(path14.charCodeAt(1))) {
                let j6 = 2;
                let last = j6;
                for(; j6 < len; ++j6){
                    if (isPathSeparator(path14.charCodeAt(j6))) break;
                }
                if (j6 < len && j6 !== last) {
                    last = j6;
                    for(; j6 < len; ++j6){
                        if (!isPathSeparator(path14.charCodeAt(j6))) break;
                    }
                    if (j6 < len && j6 !== last) {
                        last = j6;
                        for(; j6 < len; ++j6){
                            if (isPathSeparator(path14.charCodeAt(j6))) break;
                        }
                        if (j6 === len) {
                            return path14;
                        }
                        if (j6 !== last) {
                            rootEnd = offset = j6 + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path14.charCodeAt(1) === 58) {
                rootEnd = offset = 2;
                if (len > 2) {
                    if (isPathSeparator(path14.charCodeAt(2))) rootEnd = offset = 3;
                }
            }
        }
    } else if (isPathSeparator(code)) {
        return path14;
    }
    for(let i32 = len - 1; i32 >= offset; --i32){
        if (isPathSeparator(path14.charCodeAt(i32))) {
            if (!matchedSlash) {
                end = i32;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) {
        if (rootEnd === -1) return ".";
        else end = rootEnd;
    }
    return stripTrailingSeparators(path14.slice(0, end), isPosixPathSeparator);
}
function basename(path15, suffix = "") {
    assertPath(path15);
    if (path15.length === 0) return path15;
    if (typeof suffix !== "string") {
        throw new TypeError(`Suffix must be a string. Received ${JSON.stringify(suffix)}`);
    }
    let start = 0;
    if (path15.length >= 2) {
        const drive = path15.charCodeAt(0);
        if (isWindowsDeviceRoot(drive)) {
            if (path15.charCodeAt(1) === 58) start = 2;
        }
    }
    const lastSegment = lastPathSegment(path15, isPathSeparator, start);
    const strippedSegment = stripTrailingSeparators(lastSegment, isPathSeparator);
    return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
function extname(path16) {
    assertPath(path16);
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    if (path16.length >= 2 && path16.charCodeAt(1) === 58 && isWindowsDeviceRoot(path16.charCodeAt(0))) {
        start = startPart = 2;
    }
    for(let i33 = path16.length - 1; i33 >= start; --i33){
        const code = path16.charCodeAt(i33);
        if (isPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i33 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i33 + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i33;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path16.slice(startDot, end);
}
function format(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format("\\", pathObject);
}
function parse1(path17) {
    assertPath(path17);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    const len = path17.length;
    if (len === 0) return ret;
    let rootEnd = 0;
    let code = path17.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator(code)) {
            rootEnd = 1;
            if (isPathSeparator(path17.charCodeAt(1))) {
                let j7 = 2;
                let last = j7;
                for(; j7 < len; ++j7){
                    if (isPathSeparator(path17.charCodeAt(j7))) break;
                }
                if (j7 < len && j7 !== last) {
                    last = j7;
                    for(; j7 < len; ++j7){
                        if (!isPathSeparator(path17.charCodeAt(j7))) break;
                    }
                    if (j7 < len && j7 !== last) {
                        last = j7;
                        for(; j7 < len; ++j7){
                            if (isPathSeparator(path17.charCodeAt(j7))) break;
                        }
                        if (j7 === len) {
                            rootEnd = j7;
                        } else if (j7 !== last) {
                            rootEnd = j7 + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot(code)) {
            if (path17.charCodeAt(1) === 58) {
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator(path17.charCodeAt(2))) {
                        if (len === 3) {
                            ret.root = ret.dir = path17;
                            ret.base = "\\";
                            return ret;
                        }
                        rootEnd = 3;
                    }
                } else {
                    ret.root = ret.dir = path17;
                    return ret;
                }
            }
        }
    } else if (isPathSeparator(code)) {
        ret.root = ret.dir = path17;
        ret.base = "\\";
        return ret;
    }
    if (rootEnd > 0) ret.root = path17.slice(0, rootEnd);
    let startDot = -1;
    let startPart = rootEnd;
    let end = -1;
    let matchedSlash = true;
    let i34 = path17.length - 1;
    let preDotState = 0;
    for(; i34 >= rootEnd; --i34){
        code = path17.charCodeAt(i34);
        if (isPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i34 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i34 + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i34;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            ret.base = ret.name = path17.slice(startPart, end);
        }
    } else {
        ret.name = path17.slice(startPart, startDot);
        ret.base = path17.slice(startPart, end);
        ret.ext = path17.slice(startDot, end);
    }
    ret.base = ret.base || "\\";
    if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = path17.slice(0, startPart - 1);
    } else ret.dir = ret.root;
    return ret;
}
function fromFileUrl(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    let path18 = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    if (url.hostname != "") {
        path18 = `\\\\${url.hostname}${path18}`;
    }
    return path18;
}
function toFileUrl(path19) {
    if (!isAbsolute(path19)) {
        throw new TypeError("Must be an absolute path.");
    }
    const [, hostname, pathname] = path19.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(pathname.replace(/%/g, "%25"));
    if (hostname != null && hostname != "localhost") {
        url.hostname = hostname;
        if (!url.hostname) {
            throw new TypeError("Invalid hostname.");
        }
    }
    return url;
}
const mod4 = {
    sep: sep,
    delimiter: delimiter,
    resolve: resolve,
    normalize: normalize,
    isAbsolute: isAbsolute,
    join: join1,
    relative: relative,
    toNamespacedPath: toNamespacedPath,
    dirname: dirname,
    basename: basename,
    extname: extname,
    format: format,
    parse: parse1,
    fromFileUrl: fromFileUrl,
    toFileUrl: toFileUrl
};
const sep1 = "/";
const delimiter1 = ":";
function resolve1(...pathSegments) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for(let i35 = pathSegments.length - 1; i35 >= -1 && !resolvedAbsolute; i35--){
        let path20;
        if (i35 >= 0) path20 = pathSegments[i35];
        else {
            const { Deno  } = globalThis;
            if (typeof Deno?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path20 = Deno.cwd();
        }
        assertPath(path20);
        if (path20.length === 0) {
            continue;
        }
        resolvedPath = `${path20}/${resolvedPath}`;
        resolvedAbsolute = isPosixPathSeparator(path20.charCodeAt(0));
    }
    resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator);
    if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return `/${resolvedPath}`;
        else return "/";
    } else if (resolvedPath.length > 0) return resolvedPath;
    else return ".";
}
function normalize1(path21) {
    assertPath(path21);
    if (path21.length === 0) return ".";
    const isAbsolute1 = isPosixPathSeparator(path21.charCodeAt(0));
    const trailingSeparator = isPosixPathSeparator(path21.charCodeAt(path21.length - 1));
    path21 = normalizeString(path21, !isAbsolute1, "/", isPosixPathSeparator);
    if (path21.length === 0 && !isAbsolute1) path21 = ".";
    if (path21.length > 0 && trailingSeparator) path21 += "/";
    if (isAbsolute1) return `/${path21}`;
    return path21;
}
function isAbsolute1(path22) {
    assertPath(path22);
    return path22.length > 0 && isPosixPathSeparator(path22.charCodeAt(0));
}
function join2(...paths) {
    if (paths.length === 0) return ".";
    let joined;
    for(let i36 = 0, len = paths.length; i36 < len; ++i36){
        const path23 = paths[i36];
        assertPath(path23);
        if (path23.length > 0) {
            if (!joined) joined = path23;
            else joined += `/${path23}`;
        }
    }
    if (!joined) return ".";
    return normalize1(joined);
}
function relative1(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    from = resolve1(from);
    to = resolve1(to);
    if (from === to) return "";
    let fromStart = 1;
    const fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (!isPosixPathSeparator(from.charCodeAt(fromStart))) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 1;
    const toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (!isPosixPathSeparator(to.charCodeAt(toStart))) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i37 = 0;
    for(; i37 <= length; ++i37){
        if (i37 === length) {
            if (toLen > length) {
                if (isPosixPathSeparator(to.charCodeAt(toStart + i37))) {
                    return to.slice(toStart + i37 + 1);
                } else if (i37 === 0) {
                    return to.slice(toStart + i37);
                }
            } else if (fromLen > length) {
                if (isPosixPathSeparator(from.charCodeAt(fromStart + i37))) {
                    lastCommonSep = i37;
                } else if (i37 === 0) {
                    lastCommonSep = 0;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i37);
        const toCode = to.charCodeAt(toStart + i37);
        if (fromCode !== toCode) break;
        else if (isPosixPathSeparator(fromCode)) lastCommonSep = i37;
    }
    let out = "";
    for(i37 = fromStart + lastCommonSep + 1; i37 <= fromEnd; ++i37){
        if (i37 === fromEnd || isPosixPathSeparator(from.charCodeAt(i37))) {
            if (out.length === 0) out += "..";
            else out += "/..";
        }
    }
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
    else {
        toStart += lastCommonSep;
        if (isPosixPathSeparator(to.charCodeAt(toStart))) ++toStart;
        return to.slice(toStart);
    }
}
function toNamespacedPath1(path24) {
    return path24;
}
function dirname1(path25) {
    if (path25.length === 0) return ".";
    let end = -1;
    let matchedNonSeparator = false;
    for(let i38 = path25.length - 1; i38 >= 1; --i38){
        if (isPosixPathSeparator(path25.charCodeAt(i38))) {
            if (matchedNonSeparator) {
                end = i38;
                break;
            }
        } else {
            matchedNonSeparator = true;
        }
    }
    if (end === -1) {
        return isPosixPathSeparator(path25.charCodeAt(0)) ? "/" : ".";
    }
    return stripTrailingSeparators(path25.slice(0, end), isPosixPathSeparator);
}
function basename1(path26, suffix = "") {
    assertPath(path26);
    if (path26.length === 0) return path26;
    if (typeof suffix !== "string") {
        throw new TypeError(`Suffix must be a string. Received ${JSON.stringify(suffix)}`);
    }
    const lastSegment = lastPathSegment(path26, isPosixPathSeparator);
    const strippedSegment = stripTrailingSeparators(lastSegment, isPosixPathSeparator);
    return suffix ? stripSuffix(strippedSegment, suffix) : strippedSegment;
}
function extname1(path27) {
    assertPath(path27);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for(let i39 = path27.length - 1; i39 >= 0; --i39){
        const code = path27.charCodeAt(i39);
        if (isPosixPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i39 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i39 + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i39;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path27.slice(startDot, end);
}
function format1(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(`The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`);
    }
    return _format("/", pathObject);
}
function parse2(path28) {
    assertPath(path28);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    if (path28.length === 0) return ret;
    const isAbsolute2 = isPosixPathSeparator(path28.charCodeAt(0));
    let start;
    if (isAbsolute2) {
        ret.root = "/";
        start = 1;
    } else {
        start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i40 = path28.length - 1;
    let preDotState = 0;
    for(; i40 >= start; --i40){
        const code = path28.charCodeAt(i40);
        if (isPosixPathSeparator(code)) {
            if (!matchedSlash) {
                startPart = i40 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i40 + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i40;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            if (startPart === 0 && isAbsolute2) {
                ret.base = ret.name = path28.slice(1, end);
            } else {
                ret.base = ret.name = path28.slice(startPart, end);
            }
        }
        ret.base = ret.base || "/";
    } else {
        if (startPart === 0 && isAbsolute2) {
            ret.name = path28.slice(1, startDot);
            ret.base = path28.slice(1, end);
        } else {
            ret.name = path28.slice(startPart, startDot);
            ret.base = path28.slice(startPart, end);
        }
        ret.ext = path28.slice(startDot, end);
    }
    if (startPart > 0) {
        ret.dir = stripTrailingSeparators(path28.slice(0, startPart - 1), isPosixPathSeparator);
    } else if (isAbsolute2) ret.dir = "/";
    return ret;
}
function fromFileUrl1(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function toFileUrl1(path29) {
    if (!isAbsolute1(path29)) {
        throw new TypeError("Must be an absolute path.");
    }
    const url = new URL("file:///");
    url.pathname = encodeWhitespace(path29.replace(/%/g, "%25").replace(/\\/g, "%5C"));
    return url;
}
const mod5 = {
    sep: sep1,
    delimiter: delimiter1,
    resolve: resolve1,
    normalize: normalize1,
    isAbsolute: isAbsolute1,
    join: join2,
    relative: relative1,
    toNamespacedPath: toNamespacedPath1,
    dirname: dirname1,
    basename: basename1,
    extname: extname1,
    format: format1,
    parse: parse2,
    fromFileUrl: fromFileUrl1,
    toFileUrl: toFileUrl1
};
const path = isWindows ? mod4 : mod5;
const { join: join3 , normalize: normalize2  } = path;
const path1 = isWindows ? mod4 : mod5;
const { basename: basename2 , delimiter: delimiter2 , dirname: dirname2 , extname: extname2 , format: format2 , fromFileUrl: fromFileUrl2 , isAbsolute: isAbsolute2 , join: join4 , normalize: normalize3 , parse: parse3 , relative: relative2 , resolve: resolve2 , sep: sep2 , toFileUrl: toFileUrl2 , toNamespacedPath: toNamespacedPath2 ,  } = path1;
let _exiting = false;
const kSize = 2048;
const kMask = 2048 - 1;
class FixedCircularBuffer {
    bottom;
    top;
    list;
    next;
    constructor(){
        this.bottom = 0;
        this.top = 0;
        this.list = new Array(kSize);
        this.next = null;
    }
    isEmpty() {
        return this.top === this.bottom;
    }
    isFull() {
        return (this.top + 1 & kMask) === this.bottom;
    }
    push(data) {
        this.list[this.top] = data;
        this.top = this.top + 1 & kMask;
    }
    shift() {
        const nextItem = this.list[this.bottom];
        if (nextItem === undefined) {
            return null;
        }
        this.list[this.bottom] = undefined;
        this.bottom = this.bottom + 1 & kMask;
        return nextItem;
    }
}
class FixedQueue {
    head;
    tail;
    constructor(){
        this.head = this.tail = new FixedCircularBuffer();
    }
    isEmpty() {
        return this.head.isEmpty();
    }
    push(data) {
        if (this.head.isFull()) {
            this.head = this.head.next = new FixedCircularBuffer();
        }
        this.head.push(data);
    }
    shift() {
        const tail = this.tail;
        const next = tail.shift();
        if (tail.isEmpty() && tail.next !== null) {
            this.tail = tail.next;
        }
        return next;
    }
}
const queue = new FixedQueue();
let _nextTick;
function processTicksAndRejections() {
    let tock;
    do {
        while(tock = queue.shift()){
            try {
                const callback = tock.callback;
                if (tock.args === undefined) {
                    callback();
                } else {
                    const args = tock.args;
                    switch(args.length){
                        case 1:
                            callback(args[0]);
                            break;
                        case 2:
                            callback(args[0], args[1]);
                            break;
                        case 3:
                            callback(args[0], args[1], args[2]);
                            break;
                        case 4:
                            callback(args[0], args[1], args[2], args[3]);
                            break;
                        default:
                            callback(...args);
                    }
                }
            } finally{}
        }
        core.runMicrotasks();
    }while (!queue.isEmpty())
    core.setHasTickScheduled(false);
}
if (typeof core.setNextTickCallback !== "undefined") {
    function runNextTicks() {
        if (!core.hasTickScheduled()) {
            core.runMicrotasks();
        }
        if (!core.hasTickScheduled()) {
            return true;
        }
        processTicksAndRejections();
        return true;
    }
    core.setNextTickCallback(processTicksAndRejections);
    core.setMacrotaskCallback(runNextTicks);
    function __nextTickNative(callback, ...args) {
        validateFunction(callback, "callback");
        if (_exiting) {
            return;
        }
        let args_;
        switch(args.length){
            case 0:
                break;
            case 1:
                args_ = [
                    args[0]
                ];
                break;
            case 2:
                args_ = [
                    args[0],
                    args[1]
                ];
                break;
            case 3:
                args_ = [
                    args[0],
                    args[1],
                    args[2]
                ];
                break;
            default:
                args_ = new Array(args.length);
                for(let i41 = 0; i41 < args.length; i41++){
                    args_[i41] = args[i41];
                }
        }
        if (queue.isEmpty()) {
            core.setHasTickScheduled(true);
        }
        const tickObject = {
            callback,
            args: args_
        };
        queue.push(tickObject);
    }
    _nextTick = __nextTickNative;
} else {
    function __nextTickQueueMicrotask(callback, ...args) {
        if (args) {
            queueMicrotask(()=>callback.call(this, ...args)
            );
        } else {
            queueMicrotask(callback);
        }
    }
    _nextTick = __nextTickQueueMicrotask;
}
function nextTick1(callback, ...args) {
    _nextTick(callback, ...args);
}
function _arch() {
    if (Deno.build.arch == "x86_64") {
        return "x64";
    } else if (Deno.build.arch == "aarch64") {
        return "arm64";
    } else {
        throw Error("unreachable");
    }
}
const arch = _arch();
const chdir = Deno.chdir;
const cwd = Deno.cwd;
function denoEnvGet(name32) {
    try {
        return Deno.env.get(name32);
    } catch (e) {
        if (e instanceof TypeError) {
            return undefined;
        }
        throw e;
    }
}
const OBJECT_PROTO_PROP_NAMES = Object.getOwnPropertyNames(Object.prototype);
const env = new Proxy(Object(), {
    get: (target, prop)=>{
        if (typeof prop === "symbol") {
            return target[prop];
        }
        const envValue = denoEnvGet(prop);
        if (envValue) {
            return envValue;
        }
        if (OBJECT_PROTO_PROP_NAMES.includes(prop)) {
            return target[prop];
        }
        return envValue;
    },
    ownKeys: ()=>Reflect.ownKeys(Deno.env.toObject())
    ,
    getOwnPropertyDescriptor: (_target, name33)=>{
        const value = denoEnvGet(String(name33));
        if (value) {
            return {
                enumerable: true,
                configurable: true,
                value
            };
        }
    },
    set (_target, prop, value) {
        Deno.env.set(String(prop), String(value));
        return true;
    },
    has: (_target, prop)=>typeof denoEnvGet(String(prop)) === "string"
});
const pid = Deno.pid;
const platform = isWindows ? "win32" : Deno.build.os;
const version = "v18.12.1";
const versions = {
    node: "18.12.1",
    uv: "1.43.0",
    zlib: "1.2.11",
    brotli: "1.0.9",
    ares: "1.18.1",
    modules: "108",
    nghttp2: "1.47.0",
    napi: "8",
    llhttp: "6.0.10",
    openssl: "3.0.7+quic",
    cldr: "41.0",
    icu: "71.1",
    tz: "2022b",
    unicode: "14.0",
    ngtcp2: "0.8.1",
    nghttp3: "0.7.0",
    ...Deno.version
};
var Encodings;
(function(Encodings1) {
    Encodings1[Encodings1["ASCII"] = 0] = "ASCII";
    Encodings1[Encodings1["UTF8"] = 1] = "UTF8";
    Encodings1[Encodings1["BASE64"] = 2] = "BASE64";
    Encodings1[Encodings1["UCS2"] = 3] = "UCS2";
    Encodings1[Encodings1["BINARY"] = 4] = "BINARY";
    Encodings1[Encodings1["HEX"] = 5] = "HEX";
    Encodings1[Encodings1["BUFFER"] = 6] = "BUFFER";
    Encodings1[Encodings1["BASE64URL"] = 7] = "BASE64URL";
    Encodings1[Encodings1["LATIN1"] = 4] = "LATIN1";
})(Encodings || (Encodings = {}));
const encodings = [];
encodings[Encodings.ASCII] = "ascii";
encodings[Encodings.BASE64] = "base64";
encodings[Encodings.BASE64URL] = "base64url";
encodings[Encodings.BUFFER] = "buffer";
encodings[Encodings.HEX] = "hex";
encodings[Encodings.LATIN1] = "latin1";
encodings[Encodings.UCS2] = "utf16le";
encodings[Encodings.UTF8] = "utf8";
const __default1 = {
    encodings
};
const mod6 = {
    encodings: encodings,
    default: __default1
};
function indexOfNeedle(source, needle, start = 0) {
    if (start >= source.length) {
        return -1;
    }
    if (start < 0) {
        start = Math.max(0, source.length + start);
    }
    const s = needle[0];
    for(let i42 = start; i42 < source.length; i42++){
        if (source[i42] !== s) continue;
        const pin = i42;
        let matched = 1;
        let j8 = i42;
        while(matched < needle.length){
            j8++;
            if (source[j8] !== needle[j8 - pin]) {
                break;
            }
            matched++;
        }
        if (matched === needle.length) {
            return pin;
        }
    }
    return -1;
}
function numberToBytes(n) {
    if (n === 0) return new Uint8Array([
        0
    ]);
    const bytes = [];
    bytes.unshift(n & 255);
    while(n >= 256){
        n = n >>> 8;
        bytes.unshift(n & 255);
    }
    return new Uint8Array(bytes);
}
function findLastIndex(targetBuffer, buffer, offset) {
    offset = offset > targetBuffer.length ? targetBuffer.length : offset;
    const searchableBuffer = targetBuffer.slice(0, offset + buffer.length);
    const searchableBufferLastIndex = searchableBuffer.length - 1;
    const bufferLastIndex = buffer.length - 1;
    let lastMatchIndex = -1;
    let matches = 0;
    let index = -1;
    for(let x = 0; x <= searchableBufferLastIndex; x++){
        if (searchableBuffer[searchableBufferLastIndex - x] === buffer[bufferLastIndex - matches]) {
            if (lastMatchIndex === -1) {
                lastMatchIndex = x;
            }
            matches++;
        } else {
            matches = 0;
            if (lastMatchIndex !== -1) {
                x = lastMatchIndex + 1;
                lastMatchIndex = -1;
            }
            continue;
        }
        if (matches === buffer.length) {
            index = x;
            break;
        }
    }
    if (index === -1) return index;
    return searchableBufferLastIndex - index;
}
function indexOfBuffer(targetBuffer, buffer, byteOffset, encoding, forwardDirection) {
    if (!Encodings[encoding] === undefined) {
        throw new Error(`Unknown encoding code ${encoding}`);
    }
    if (!forwardDirection) {
        if (byteOffset < 0) {
            byteOffset = targetBuffer.length + byteOffset;
        }
        if (buffer.length === 0) {
            return byteOffset <= targetBuffer.length ? byteOffset : targetBuffer.length;
        }
        return findLastIndex(targetBuffer, buffer, byteOffset);
    }
    if (buffer.length === 0) {
        return byteOffset <= targetBuffer.length ? byteOffset : targetBuffer.length;
    }
    return indexOfNeedle(targetBuffer, buffer, byteOffset);
}
function indexOfNumber(targetBuffer, number, byteOffset, forwardDirection) {
    const bytes = numberToBytes(number);
    if (bytes.length > 1) {
        throw new Error("Multi byte number search is not supported");
    }
    return indexOfBuffer(targetBuffer, numberToBytes(number), byteOffset, Encodings.UTF8, forwardDirection);
}
const __default2 = {
    indexOfBuffer,
    indexOfNumber
};
const mod7 = {
    indexOfBuffer: indexOfBuffer,
    indexOfNumber: indexOfNumber,
    numberToBytes: numberToBytes,
    default: __default2
};
const base64abc = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "/", 
];
function encode(data) {
    const uint8 = typeof data === "string" ? new TextEncoder().encode(data) : data instanceof Uint8Array ? data : new Uint8Array(data);
    let result = "", i43;
    const l = uint8.length;
    for(i43 = 2; i43 < l; i43 += 3){
        result += base64abc[uint8[i43 - 2] >> 2];
        result += base64abc[(uint8[i43 - 2] & 0x03) << 4 | uint8[i43 - 1] >> 4];
        result += base64abc[(uint8[i43 - 1] & 0x0f) << 2 | uint8[i43] >> 6];
        result += base64abc[uint8[i43] & 0x3f];
    }
    if (i43 === l + 1) {
        result += base64abc[uint8[i43 - 2] >> 2];
        result += base64abc[(uint8[i43 - 2] & 0x03) << 4];
        result += "==";
    }
    if (i43 === l) {
        result += base64abc[uint8[i43 - 2] >> 2];
        result += base64abc[(uint8[i43 - 2] & 0x03) << 4 | uint8[i43 - 1] >> 4];
        result += base64abc[(uint8[i43 - 1] & 0x0f) << 2];
        result += "=";
    }
    return result;
}
function decode(b64) {
    const binString = atob(b64);
    const size = binString.length;
    const bytes = new Uint8Array(size);
    for(let i44 = 0; i44 < size; i44++){
        bytes[i44] = binString.charCodeAt(i44);
    }
    return bytes;
}
function addPaddingToBase64url(base64url) {
    if (base64url.length % 4 === 2) return base64url + "==";
    if (base64url.length % 4 === 3) return base64url + "=";
    if (base64url.length % 4 === 1) {
        throw new TypeError("Illegal base64url string!");
    }
    return base64url;
}
function convertBase64urlToBase64(b64url) {
    if (!/^[-_A-Z0-9]*?={0,2}$/i.test(b64url)) {
        throw new TypeError("Failed to decode base64url: invalid character");
    }
    return addPaddingToBase64url(b64url).replace(/\-/g, "+").replace(/_/g, "/");
}
function convertBase64ToBase64url(b64) {
    return b64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function encode1(data) {
    return convertBase64ToBase64url(encode(data));
}
function decode1(b64url) {
    return decode(convertBase64urlToBase64(b64url));
}
function asciiToBytes(str) {
    const byteArray = [];
    for(let i45 = 0; i45 < str.length; ++i45){
        byteArray.push(str.charCodeAt(i45) & 255);
    }
    return new Uint8Array(byteArray);
}
function base64ToBytes(str) {
    str = base64clean(str);
    str = str.replaceAll("-", "+").replaceAll("_", "/");
    return decode(str);
}
const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2) return "";
    while(str.length % 4 !== 0){
        str = str + "=";
    }
    return str;
}
function base64UrlToBytes(str) {
    str = base64clean(str);
    str = str.replaceAll("+", "-").replaceAll("/", "_");
    return decode1(str);
}
function hexToBytes(str) {
    const byteArray = new Uint8Array(Math.floor((str || "").length / 2));
    let i46;
    for(i46 = 0; i46 < byteArray.length; i46++){
        const a = Number.parseInt(str[i46 * 2], 16);
        const b = Number.parseInt(str[i46 * 2 + 1], 16);
        if (Number.isNaN(a) && Number.isNaN(b)) {
            break;
        }
        byteArray[i46] = a << 4 | b;
    }
    return new Uint8Array(i46 === byteArray.length ? byteArray : byteArray.slice(0, i46));
}
function utf16leToBytes(str, units) {
    let c, hi1, lo;
    const byteArray = [];
    for(let i47 = 0; i47 < str.length; ++i47){
        if ((units -= 2) < 0) {
            break;
        }
        c = str.charCodeAt(i47);
        hi1 = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi1);
    }
    return new Uint8Array(byteArray);
}
function bytesToAscii(bytes) {
    let ret = "";
    for(let i48 = 0; i48 < bytes.length; ++i48){
        ret += String.fromCharCode(bytes[i48] & 127);
    }
    return ret;
}
function bytesToUtf16le(bytes) {
    let res = "";
    for(let i49 = 0; i49 < bytes.length - 1; i49 += 2){
        res += String.fromCharCode(bytes[i49] + bytes[i49 + 1] * 256);
    }
    return res;
}
Array.isArray;
Object.assign;
Object.create;
Object.hasOwn;
RegExp.prototype.exec;
String.fromCharCode;
const { signals  } = os;
Symbol.for("nodejs.util.inspect.custom");
const kEnumerableProperty = Object.create(null);
kEnumerableProperty.enumerable = true;
const kEmptyObject = Object.freeze(Object.create(null));
function once1(callback) {
    let called = false;
    return function(...args) {
        if (called) return;
        called = true;
        Reflect.apply(callback, this, args);
    };
}
function createDeferredPromise() {
    let resolve8;
    let reject;
    const promise = new Promise((res, rej)=>{
        resolve8 = res;
        reject = rej;
    });
    return {
        promise,
        resolve: resolve8,
        reject
    };
}
const kCustomPromisifiedSymbol = Symbol.for("nodejs.util.promisify.custom");
const kCustomPromisifyArgsSymbol = Symbol.for("nodejs.util.promisify.customArgs");
function promisify(original) {
    validateFunction(original, "original");
    if (original[kCustomPromisifiedSymbol]) {
        const fn = original[kCustomPromisifiedSymbol];
        validateFunction(fn, "util.promisify.custom");
        return Object.defineProperty(fn, kCustomPromisifiedSymbol, {
            value: fn,
            enumerable: false,
            writable: true,
            configurable: true
        });
    }
    const argumentNames = original[kCustomPromisifyArgsSymbol];
    function fn(...args) {
        return new Promise((resolve9, reject)=>{
            args.push((err, ...values)=>{
                if (err) {
                    return reject(err);
                }
                if (argumentNames !== undefined && values.length > 1) {
                    const obj = {};
                    for(let i50 = 0; i50 < argumentNames.length; i50++){
                        obj[argumentNames[i50]] = values[i50];
                    }
                    resolve9(obj);
                } else {
                    resolve9(values[0]);
                }
            });
            Reflect.apply(original, this, args);
        });
    }
    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: true,
        configurable: true
    });
    return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original));
}
promisify.custom = kCustomPromisifiedSymbol;
const utf8Encoder = new TextEncoder();
const float32Array = new Float32Array(1);
const uInt8Float32Array = new Uint8Array(float32Array.buffer);
const float64Array = new Float64Array(1);
const uInt8Float64Array = new Uint8Array(float64Array.buffer);
float32Array[0] = -1;
const bigEndian = uInt8Float32Array[3] === 0;
const kMaxLength = 2147483647;
const MAX_UINT32 = 2 ** 32;
const customInspectSymbol1 = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
const INSPECT_MAX_BYTES = 50;
const constants = {
    MAX_LENGTH: 2147483647,
    MAX_STRING_LENGTH: 536870888
};
Object.defineProperty(Buffer.prototype, "parent", {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) {
            return void 0;
        }
        return this.buffer;
    }
});
Object.defineProperty(Buffer.prototype, "offset", {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) {
            return void 0;
        }
        return this.byteOffset;
    }
});
function createBuffer(length) {
    if (length > 2147483647) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
function Buffer(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
            throw new codes.ERR_INVALID_ARG_TYPE("string", "string", arg);
        }
        return _allocUnsafe(arg);
    }
    return _from(arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192;
function _from(value, encodingOrOffset, length) {
    if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
    }
    if (typeof value === "object" && value !== null) {
        if (isAnyArrayBuffer1(value)) {
            return fromArrayBuffer(value, encodingOrOffset, length);
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value && (typeof valueOf === "string" || typeof valueOf === "object")) {
            return _from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b) {
            return b;
        }
        if (typeof value[Symbol.toPrimitive] === "function") {
            const primitive = value[Symbol.toPrimitive]("string");
            if (typeof primitive === "string") {
                return fromString(primitive, encodingOrOffset);
            }
        }
    }
    throw new codes.ERR_INVALID_ARG_TYPE("first argument", [
        "string",
        "Buffer",
        "ArrayBuffer",
        "Array",
        "Array-like Object"
    ], value);
}
Buffer.from = function from(value, encodingOrOffset, length) {
    return _from(value, encodingOrOffset, length);
};
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);
function assertSize(size) {
    validateNumber(size, "size");
    if (!(size >= 0 && size <= 2147483647)) {
        throw new codes.ERR_INVALID_ARG_VALUE.RangeError("size", size);
    }
}
function _alloc(size, fill, encoding) {
    assertSize(size);
    const buffer = createBuffer(size);
    if (fill !== undefined) {
        if (encoding !== undefined && typeof encoding !== "string") {
            throw new codes.ERR_INVALID_ARG_TYPE("encoding", "string", encoding);
        }
        return buffer.fill(fill, encoding);
    }
    return buffer;
}
Buffer.alloc = function alloc(size, fill, encoding) {
    return _alloc(size, fill, encoding);
};
function _allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
}
Buffer.allocUnsafe = function allocUnsafe(size) {
    return _allocUnsafe(size);
};
Buffer.allocUnsafeSlow = function allocUnsafeSlow(size) {
    return _allocUnsafe(size);
};
function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
    }
    if (!Buffer.isEncoding(encoding)) {
        throw new codes.ERR_UNKNOWN_ENCODING(encoding);
    }
    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) {
        buf = buf.slice(0, actual);
    }
    return buf;
}
function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for(let i1 = 0; i1 < length; i1 += 1){
        buf[i1] = array[i1] & 255;
    }
    return buf;
}
function fromObject(obj) {
    if (obj.length !== undefined || isAnyArrayBuffer1(obj.buffer)) {
        if (typeof obj.length !== "number") {
            return createBuffer(0);
        }
        return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
    }
}
function checked(length) {
    if (length >= 2147483647) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + 2147483647..toString(16) + " bytes");
    }
    return length | 0;
}
function SlowBuffer(length) {
    assertSize(length);
    return Buffer.alloc(+length);
}
Object.setPrototypeOf(SlowBuffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(SlowBuffer, Uint8Array);
Buffer.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer.prototype;
};
Buffer.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array)) {
        a = Buffer.from(a, a.offset, a.byteLength);
    }
    if (isInstance(b, Uint8Array)) {
        b = Buffer.from(b, b.offset, b.byteLength);
    }
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    }
    if (a === b) {
        return 0;
    }
    let x = a.length;
    let y = b.length;
    for(let i2 = 0, len = Math.min(x, y); i2 < len; ++i2){
        if (a[i2] !== b[i2]) {
            x = a[i2];
            y = b[i2];
            break;
        }
    }
    if (x < y) {
        return -1;
    }
    if (y < x) {
        return 1;
    }
    return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
    return typeof encoding === "string" && encoding.length !== 0 && normalizeEncoding1(encoding) !== undefined;
};
Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
        throw new codes.ERR_INVALID_ARG_TYPE("list", "Array", list);
    }
    if (list.length === 0) {
        return Buffer.alloc(0);
    }
    if (length === undefined) {
        length = 0;
        for(let i3 = 0; i3 < list.length; i3++){
            if (list[i3].length) {
                length += list[i3].length;
            }
        }
    } else {
        validateOffset(length, "length");
    }
    const buffer = Buffer.allocUnsafe(length);
    let pos = 0;
    for(let i4 = 0; i4 < list.length; i4++){
        const buf = list[i4];
        if (!isUint8Array(buf)) {
            throw new codes.ERR_INVALID_ARG_TYPE(`list[${i4}]`, [
                "Buffer",
                "Uint8Array"
            ], list[i4]);
        }
        pos += _copyActual(buf, buffer, pos, 0, buf.length);
    }
    if (pos < length) {
        buffer.fill(0, pos, length);
    }
    return buffer;
};
function byteLength(string, encoding) {
    if (typeof string !== "string") {
        if (isArrayBufferView(string) || isAnyArrayBuffer1(string)) {
            return string.byteLength;
        }
        throw new codes.ERR_INVALID_ARG_TYPE("string", [
            "string",
            "Buffer",
            "ArrayBuffer"
        ], string);
    }
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) {
        return 0;
    }
    if (!encoding) {
        return mustMatch ? -1 : byteLengthUtf8(string);
    }
    const ops = getEncodingOps(encoding);
    if (ops === undefined) {
        return mustMatch ? -1 : byteLengthUtf8(string);
    }
    return ops.byteLength(string);
}
Buffer.byteLength = byteLength;
Buffer.prototype._isBuffer = true;
function swap(b, n, m5) {
    const i5 = b[n];
    b[n] = b[m5];
    b[m5] = i5;
}
Buffer.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for(let i6 = 0; i6 < len; i6 += 2){
        swap(this, i6, i6 + 1);
    }
    return this;
};
Buffer.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for(let i7 = 0; i7 < len; i7 += 4){
        swap(this, i7, i7 + 3);
        swap(this, i7 + 1, i7 + 2);
    }
    return this;
};
Buffer.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for(let i8 = 0; i8 < len; i8 += 8){
        swap(this, i8, i8 + 7);
        swap(this, i8 + 1, i8 + 6);
        swap(this, i8 + 2, i8 + 5);
        swap(this, i8 + 3, i8 + 4);
    }
    return this;
};
Buffer.prototype.toString = function toString(encoding, start, end) {
    if (arguments.length === 0) {
        return this.utf8Slice(0, this.length);
    }
    const len = this.length;
    if (start <= 0) {
        start = 0;
    } else if (start >= len) {
        return "";
    } else {
        start |= 0;
    }
    if (end === undefined || end > len) {
        end = len;
    } else {
        end |= 0;
    }
    if (end <= start) {
        return "";
    }
    if (encoding === undefined) {
        return this.utf8Slice(start, end);
    }
    const ops = getEncodingOps(encoding);
    if (ops === undefined) {
        throw new codes.ERR_UNKNOWN_ENCODING(encoding);
    }
    return ops.slice(this, start, end);
};
Buffer.prototype.toLocaleString = Buffer.prototype.toString;
Buffer.prototype.equals = function equals(b) {
    if (!isUint8Array(b)) {
        throw new codes.ERR_INVALID_ARG_TYPE("otherBuffer", [
            "Buffer",
            "Uint8Array"
        ], b);
    }
    if (this === b) {
        return true;
    }
    return Buffer.compare(this, b) === 0;
};
Buffer.prototype.inspect = function inspect() {
    let str = "";
    const max = INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max) {
        str += " ... ";
    }
    return "<Buffer " + str + ">";
};
if (customInspectSymbol1) {
    Buffer.prototype[customInspectSymbol1] = Buffer.prototype.inspect;
}
Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) {
        target = Buffer.from(target, target.offset, target.byteLength);
    }
    if (!Buffer.isBuffer(target)) {
        throw new codes.ERR_INVALID_ARG_TYPE("target", [
            "Buffer",
            "Uint8Array"
        ], target);
    }
    if (start === undefined) {
        start = 0;
    } else {
        validateOffset(start, "targetStart", 0, kMaxLength);
    }
    if (end === undefined) {
        end = target.length;
    } else {
        validateOffset(end, "targetEnd", 0, target.length);
    }
    if (thisStart === undefined) {
        thisStart = 0;
    } else {
        validateOffset(start, "sourceStart", 0, kMaxLength);
    }
    if (thisEnd === undefined) {
        thisEnd = this.length;
    } else {
        validateOffset(end, "sourceEnd", 0, this.length);
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new codes.ERR_OUT_OF_RANGE("out of range index", "range");
    }
    if (thisStart >= thisEnd && start >= end) {
        return 0;
    }
    if (thisStart >= thisEnd) {
        return -1;
    }
    if (start >= end) {
        return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) {
        return 0;
    }
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for(let i9 = 0; i9 < len; ++i9){
        if (thisCopy[i9] !== targetCopy[i9]) {
            x = thisCopy[i9];
            y = targetCopy[i9];
            break;
        }
    }
    if (x < y) {
        return -1;
    }
    if (y < x) {
        return 1;
    }
    return 0;
};
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    validateBuffer(buffer);
    if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = undefined;
    } else if (byteOffset > 0x7fffffff) {
        byteOffset = 0x7fffffff;
    } else if (byteOffset < -0x80000000) {
        byteOffset = -0x80000000;
    }
    byteOffset = +byteOffset;
    if (Number.isNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length || buffer.byteLength;
    }
    dir = !!dir;
    if (typeof val === "number") {
        return indexOfNumber(buffer, val >>> 0, byteOffset, dir);
    }
    let ops;
    if (encoding === undefined) {
        ops = encodingOps.utf8;
    } else {
        ops = getEncodingOps(encoding);
    }
    if (typeof val === "string") {
        if (ops === undefined) {
            throw new codes.ERR_UNKNOWN_ENCODING(encoding);
        }
        return ops.indexOf(buffer, val, byteOffset, dir);
    }
    if (isUint8Array(val)) {
        const encodingVal = ops === undefined ? encodingsMap.utf8 : ops.encodingVal;
        return indexOfBuffer(buffer, val, byteOffset, encodingVal, dir);
    }
    throw new codes.ERR_INVALID_ARG_TYPE("value", [
        "number",
        "string",
        "Buffer",
        "Uint8Array"
    ], val);
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
Buffer.prototype.asciiSlice = function asciiSlice(offset, length) {
    if (offset === 0 && length === this.length) {
        return bytesToAscii(this);
    } else {
        return bytesToAscii(this.slice(offset, length));
    }
};
Buffer.prototype.asciiWrite = function asciiWrite(string, offset, length) {
    return blitBuffer(asciiToBytes(string), this, offset, length);
};
Buffer.prototype.base64Slice = function base64Slice(offset, length) {
    if (offset === 0 && length === this.length) {
        return encode(this);
    } else {
        return encode(this.slice(offset, length));
    }
};
Buffer.prototype.base64Write = function base64Write(string, offset, length) {
    return blitBuffer(base64ToBytes(string), this, offset, length);
};
Buffer.prototype.base64urlSlice = function base64urlSlice(offset, length) {
    if (offset === 0 && length === this.length) {
        return encode1(this);
    } else {
        return encode1(this.slice(offset, length));
    }
};
Buffer.prototype.base64urlWrite = function base64urlWrite(string, offset, length) {
    return blitBuffer(base64UrlToBytes(string), this, offset, length);
};
Buffer.prototype.hexWrite = function hexWrite(string, offset, length) {
    return blitBuffer(hexToBytes(string, this.length - offset), this, offset, length);
};
Buffer.prototype.hexSlice = function hexSlice(string, offset, length) {
    return _hexSlice(this, string, offset, length);
};
Buffer.prototype.latin1Slice = function latin1Slice(string, offset, length) {
    return _latin1Slice(this, string, offset, length);
};
Buffer.prototype.latin1Write = function latin1Write(string, offset, length) {
    return blitBuffer(asciiToBytes(string), this, offset, length);
};
Buffer.prototype.ucs2Slice = function ucs2Slice(offset, length) {
    if (offset === 0 && length === this.length) {
        return bytesToUtf16le(this);
    } else {
        return bytesToUtf16le(this.slice(offset, length));
    }
};
Buffer.prototype.ucs2Write = function ucs2Write(string, offset, length) {
    return blitBuffer(utf16leToBytes(string, this.length - offset), this, offset, length);
};
Buffer.prototype.utf8Slice = function utf8Slice(string, offset, length) {
    return _utf8Slice(this, string, offset, length);
};
Buffer.prototype.utf8Write = function utf8Write(string, offset, length) {
    return blitBuffer(utf8ToBytes(string, this.length - offset), this, offset, length);
};
Buffer.prototype.write = function write(string, offset, length, encoding) {
    if (offset === undefined) {
        return this.utf8Write(string, 0, this.length);
    }
    if (length === undefined && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
    } else {
        validateOffset(offset, "offset", 0, this.length);
        const remaining = this.length - offset;
        if (length === undefined) {
            length = remaining;
        } else if (typeof length === "string") {
            encoding = length;
            length = remaining;
        } else {
            validateOffset(length, "length", 0, this.length);
            if (length > remaining) {
                length = remaining;
            }
        }
    }
    if (!encoding) {
        return this.utf8Write(string, offset, length);
    }
    const ops = getEncodingOps(encoding);
    if (ops === undefined) {
        throw new codes.ERR_UNKNOWN_ENCODING(encoding);
    }
    return ops.write(this, string, offset, length);
};
Buffer.prototype.toJSON = function toJSON() {
    return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
    };
};
function fromArrayBuffer(obj, byteOffset, length) {
    if (byteOffset === undefined) {
        byteOffset = 0;
    } else {
        byteOffset = +byteOffset;
        if (Number.isNaN(byteOffset)) {
            byteOffset = 0;
        }
    }
    const maxLength = obj.byteLength - byteOffset;
    if (maxLength < 0) {
        throw new codes.ERR_BUFFER_OUT_OF_BOUNDS("offset");
    }
    if (length === undefined) {
        length = maxLength;
    } else {
        length = +length;
        if (length > 0) {
            if (length > maxLength) {
                throw new codes.ERR_BUFFER_OUT_OF_BOUNDS("length");
            }
        } else {
            length = 0;
        }
    }
    const buffer = new Uint8Array(obj, byteOffset, length);
    Object.setPrototypeOf(buffer, Buffer.prototype);
    return buffer;
}
const decoder = new TextDecoder();
function _utf8Slice(buf, start, end) {
    return decoder.decode(buf.slice(start, end));
}
function _latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for(let i10 = start; i10 < end; ++i10){
        ret += String.fromCharCode(buf[i10]);
    }
    return ret;
}
function _hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) {
        start = 0;
    }
    if (!end || end < 0 || end > len) {
        end = len;
    }
    let out = "";
    for(let i11 = start; i11 < end; ++i11){
        out += hexSliceLookupTable[buf[i11]];
    }
    return out;
}
Buffer.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
        start += len;
        if (start < 0) {
            start = 0;
        }
    } else if (start > len) {
        start = len;
    }
    if (end < 0) {
        end += len;
        if (end < 0) {
            end = 0;
        }
    } else if (end > len) {
        end = len;
    }
    if (end < start) {
        end = start;
    }
    const newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer.prototype);
    return newBuf;
};
Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength1) {
    if (offset === undefined) {
        throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
    }
    if (byteLength1 === 6) {
        return readUInt48LE(this, offset);
    }
    if (byteLength1 === 5) {
        return readUInt40LE(this, offset);
    }
    if (byteLength1 === 3) {
        return readUInt24LE(this, offset);
    }
    if (byteLength1 === 4) {
        return this.readUInt32LE(offset);
    }
    if (byteLength1 === 2) {
        return this.readUInt16LE(offset);
    }
    if (byteLength1 === 1) {
        return this.readUInt8(offset);
    }
    boundsError(byteLength1, 6, "byteLength");
};
Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength2) {
    if (offset === undefined) {
        throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
    }
    if (byteLength2 === 6) {
        return readUInt48BE(this, offset);
    }
    if (byteLength2 === 5) {
        return readUInt40BE(this, offset);
    }
    if (byteLength2 === 3) {
        return readUInt24BE(this, offset);
    }
    if (byteLength2 === 4) {
        return this.readUInt32BE(offset);
    }
    if (byteLength2 === 2) {
        return this.readUInt16BE(offset);
    }
    if (byteLength2 === 1) {
        return this.readUInt8(offset);
    }
    boundsError(byteLength2, 6, "byteLength");
};
Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset = 0) {
    validateNumber(offset, "offset");
    const val = this[offset];
    if (val === undefined) {
        boundsError(offset, this.length - 1);
    }
    return val;
};
Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = readUInt16BE;
Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset = 0) {
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 1];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 2);
    }
    return first + last * 2 ** 8;
};
Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset = 0) {
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 3];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 4);
    }
    return first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
};
Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = readUInt32BE;
Buffer.prototype.readBigUint64LE = Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
    }
    const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi2 = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi2) << BigInt(32));
});
Buffer.prototype.readBigUint64BE = Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
    }
    const hi3 = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
    return (BigInt(hi3) << BigInt(32)) + BigInt(lo);
});
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength3) {
    if (offset === undefined) {
        throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
    }
    if (byteLength3 === 6) {
        return readInt48LE(this, offset);
    }
    if (byteLength3 === 5) {
        return readInt40LE(this, offset);
    }
    if (byteLength3 === 3) {
        return readInt24LE(this, offset);
    }
    if (byteLength3 === 4) {
        return this.readInt32LE(offset);
    }
    if (byteLength3 === 2) {
        return this.readInt16LE(offset);
    }
    if (byteLength3 === 1) {
        return this.readInt8(offset);
    }
    boundsError(byteLength3, 6, "byteLength");
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength4) {
    if (offset === undefined) {
        throw new codes.ERR_INVALID_ARG_TYPE("offset", "number", offset);
    }
    if (byteLength4 === 6) {
        return readInt48BE(this, offset);
    }
    if (byteLength4 === 5) {
        return readInt40BE(this, offset);
    }
    if (byteLength4 === 3) {
        return readInt24BE(this, offset);
    }
    if (byteLength4 === 4) {
        return this.readInt32BE(offset);
    }
    if (byteLength4 === 2) {
        return this.readInt16BE(offset);
    }
    if (byteLength4 === 1) {
        return this.readInt8(offset);
    }
    boundsError(byteLength4, 6, "byteLength");
};
Buffer.prototype.readInt8 = function readInt8(offset = 0) {
    validateNumber(offset, "offset");
    const val = this[offset];
    if (val === undefined) {
        boundsError(offset, this.length - 1);
    }
    return val | (val & 2 ** 7) * 0x1fffffe;
};
Buffer.prototype.readInt16LE = function readInt16LE(offset = 0) {
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 1];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 2);
    }
    const val = first + last * 2 ** 8;
    return val | (val & 2 ** 15) * 0x1fffe;
};
Buffer.prototype.readInt16BE = function readInt16BE(offset = 0) {
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 1];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 2);
    }
    const val = first * 2 ** 8 + last;
    return val | (val & 2 ** 15) * 0x1fffe;
};
Buffer.prototype.readInt32LE = function readInt32LE(offset = 0) {
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 3];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 4);
    }
    return first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + (last << 24);
};
Buffer.prototype.readInt32BE = function readInt32BE(offset = 0) {
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 3];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 4);
    }
    return (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
};
Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
    }
    const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
});
Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
    }
    const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
});
Buffer.prototype.readFloatLE = function readFloatLE(offset) {
    return bigEndian ? readFloatBackwards(this, offset) : readFloatForwards(this, offset);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset) {
    return bigEndian ? readFloatForwards(this, offset) : readFloatBackwards(this, offset);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset) {
    return bigEndian ? readDoubleBackwards(this, offset) : readDoubleForwards(this, offset);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset) {
    return bigEndian ? readDoubleForwards(this, offset) : readDoubleBackwards(this, offset);
};
Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength5) {
    if (byteLength5 === 6) {
        return writeU_Int48LE(this, value, offset, 0, 0xffffffffffff);
    }
    if (byteLength5 === 5) {
        return writeU_Int40LE(this, value, offset, 0, 0xffffffffff);
    }
    if (byteLength5 === 3) {
        return writeU_Int24LE(this, value, offset, 0, 0xffffff);
    }
    if (byteLength5 === 4) {
        return writeU_Int32LE(this, value, offset, 0, 0xffffffff);
    }
    if (byteLength5 === 2) {
        return writeU_Int16LE(this, value, offset, 0, 0xffff);
    }
    if (byteLength5 === 1) {
        return writeU_Int8(this, value, offset, 0, 0xff);
    }
    boundsError(byteLength5, 6, "byteLength");
};
Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength6) {
    if (byteLength6 === 6) {
        return writeU_Int48BE(this, value, offset, 0, 0xffffffffffff);
    }
    if (byteLength6 === 5) {
        return writeU_Int40BE(this, value, offset, 0, 0xffffffffff);
    }
    if (byteLength6 === 3) {
        return writeU_Int24BE(this, value, offset, 0, 0xffffff);
    }
    if (byteLength6 === 4) {
        return writeU_Int32BE(this, value, offset, 0, 0xffffffff);
    }
    if (byteLength6 === 2) {
        return writeU_Int16BE(this, value, offset, 0, 0xffff);
    }
    if (byteLength6 === 1) {
        return writeU_Int8(this, value, offset, 0, 0xff);
    }
    boundsError(byteLength6, 6, "byteLength");
};
Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset = 0) {
    return writeU_Int8(this, value, offset, 0, 0xff);
};
Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset = 0) {
    return writeU_Int16LE(this, value, offset, 0, 0xffff);
};
Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset = 0) {
    return writeU_Int16BE(this, value, offset, 0, 0xffff);
};
Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset = 0) {
    return _writeUInt32LE(this, value, offset, 0, 0xffffffff);
};
Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset = 0) {
    return _writeUInt32BE(this, value, offset, 0, 0xffffffff);
};
function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi4 = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset++] = hi4;
    hi4 = hi4 >> 8;
    buf[offset++] = hi4;
    hi4 = hi4 >> 8;
    buf[offset++] = hi4;
    hi4 = hi4 >> 8;
    buf[offset++] = hi4;
    return offset;
}
function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi5 = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset + 3] = hi5;
    hi5 = hi5 >> 8;
    buf[offset + 2] = hi5;
    hi5 = hi5 >> 8;
    buf[offset + 1] = hi5;
    hi5 = hi5 >> 8;
    buf[offset] = hi5;
    return offset + 8;
}
Buffer.prototype.writeBigUint64LE = Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
});
Buffer.prototype.writeBigUint64BE = Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
});
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength7) {
    if (byteLength7 === 6) {
        return writeU_Int48LE(this, value, offset, -0x800000000000, 0x7fffffffffff);
    }
    if (byteLength7 === 5) {
        return writeU_Int40LE(this, value, offset, -0x8000000000, 0x7fffffffff);
    }
    if (byteLength7 === 3) {
        return writeU_Int24LE(this, value, offset, -0x800000, 0x7fffff);
    }
    if (byteLength7 === 4) {
        return writeU_Int32LE(this, value, offset, -0x80000000, 0x7fffffff);
    }
    if (byteLength7 === 2) {
        return writeU_Int16LE(this, value, offset, -0x8000, 0x7fff);
    }
    if (byteLength7 === 1) {
        return writeU_Int8(this, value, offset, -0x80, 0x7f);
    }
    boundsError(byteLength7, 6, "byteLength");
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength8) {
    if (byteLength8 === 6) {
        return writeU_Int48BE(this, value, offset, -0x800000000000, 0x7fffffffffff);
    }
    if (byteLength8 === 5) {
        return writeU_Int40BE(this, value, offset, -0x8000000000, 0x7fffffffff);
    }
    if (byteLength8 === 3) {
        return writeU_Int24BE(this, value, offset, -0x800000, 0x7fffff);
    }
    if (byteLength8 === 4) {
        return writeU_Int32BE(this, value, offset, -0x80000000, 0x7fffffff);
    }
    if (byteLength8 === 2) {
        return writeU_Int16BE(this, value, offset, -0x8000, 0x7fff);
    }
    if (byteLength8 === 1) {
        return writeU_Int8(this, value, offset, -0x80, 0x7f);
    }
    boundsError(byteLength8, 6, "byteLength");
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset = 0) {
    return writeU_Int8(this, value, offset, -0x80, 0x7f);
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset = 0) {
    return writeU_Int16LE(this, value, offset, -0x8000, 0x7fff);
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset = 0) {
    return writeU_Int16BE(this, value, offset, -0x8000, 0x7fff);
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset = 0) {
    return writeU_Int32LE(this, value, offset, -0x80000000, 0x7fffffff);
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset = 0) {
    return writeU_Int32BE(this, value, offset, -0x80000000, 0x7fffffff);
};
Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset) {
    return bigEndian ? writeFloatBackwards(this, value, offset) : writeFloatForwards(this, value, offset);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset) {
    return bigEndian ? writeFloatForwards(this, value, offset) : writeFloatBackwards(this, value, offset);
};
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset) {
    return bigEndian ? writeDoubleBackwards(this, value, offset) : writeDoubleForwards(this, value, offset);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset) {
    return bigEndian ? writeDoubleForwards(this, value, offset) : writeDoubleBackwards(this, value, offset);
};
Buffer.prototype.copy = function copy(target, targetStart, sourceStart, sourceEnd) {
    if (!isUint8Array(this)) {
        throw new codes.ERR_INVALID_ARG_TYPE("source", [
            "Buffer",
            "Uint8Array"
        ], this);
    }
    if (!isUint8Array(target)) {
        throw new codes.ERR_INVALID_ARG_TYPE("target", [
            "Buffer",
            "Uint8Array"
        ], target);
    }
    if (targetStart === undefined) {
        targetStart = 0;
    } else {
        targetStart = toInteger(targetStart, 0);
        if (targetStart < 0) {
            throw new codes.ERR_OUT_OF_RANGE("targetStart", ">= 0", targetStart);
        }
    }
    if (sourceStart === undefined) {
        sourceStart = 0;
    } else {
        sourceStart = toInteger(sourceStart, 0);
        if (sourceStart < 0) {
            throw new codes.ERR_OUT_OF_RANGE("sourceStart", ">= 0", sourceStart);
        }
        if (sourceStart >= MAX_UINT32) {
            throw new codes.ERR_OUT_OF_RANGE("sourceStart", `< ${MAX_UINT32}`, sourceStart);
        }
    }
    if (sourceEnd === undefined) {
        sourceEnd = this.length;
    } else {
        sourceEnd = toInteger(sourceEnd, 0);
        if (sourceEnd < 0) {
            throw new codes.ERR_OUT_OF_RANGE("sourceEnd", ">= 0", sourceEnd);
        }
        if (sourceEnd >= MAX_UINT32) {
            throw new codes.ERR_OUT_OF_RANGE("sourceEnd", `< ${MAX_UINT32}`, sourceEnd);
        }
    }
    if (targetStart >= target.length) {
        return 0;
    }
    if (sourceEnd > 0 && sourceEnd < sourceStart) {
        sourceEnd = sourceStart;
    }
    if (sourceEnd === sourceStart) {
        return 0;
    }
    if (target.length === 0 || this.length === 0) {
        return 0;
    }
    if (sourceEnd > this.length) {
        sourceEnd = this.length;
    }
    if (target.length - targetStart < sourceEnd - sourceStart) {
        sourceEnd = target.length - targetStart + sourceStart;
    }
    const len = sourceEnd - sourceStart;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, sourceStart, sourceEnd);
    } else {
        Uint8Array.prototype.set.call(target, this.subarray(sourceStart, sourceEnd), targetStart);
    }
    return len;
};
Buffer.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
        if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
        } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
                val = code;
            }
        }
    } else if (typeof val === "number") {
        val = val & 255;
    } else if (typeof val === "boolean") {
        val = Number(val);
    }
    if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
    }
    if (end <= start) {
        return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val) {
        val = 0;
    }
    let i12;
    if (typeof val === "number") {
        for(i12 = start; i12 < end; ++i12){
            this[i12] = val;
        }
    } else {
        const bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
            throw new codes.ERR_INVALID_ARG_VALUE("value", val);
        }
        for(i12 = 0; i12 < end - start; ++i12){
            this[i12 + start] = bytes[i12 % len];
        }
    }
    return this;
};
function checkBounds(buf, offset, byteLength2) {
    validateNumber(offset, "offset");
    if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
    }
}
function checkIntBI(value, min, max, buf, offset, byteLength2) {
    if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
                range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
                range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
        } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new codes.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength2);
}
function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for(let i13 = 0; i13 < length; ++i13){
        codePoint = string.charCodeAt(i13);
        if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
                if (codePoint > 56319) {
                    if ((units -= 3) > -1) {
                        bytes.push(239, 191, 189);
                    }
                    continue;
                } else if (i13 + 1 === length) {
                    if ((units -= 3) > -1) {
                        bytes.push(239, 191, 189);
                    }
                    continue;
                }
                leadSurrogate = codePoint;
                continue;
            }
            if (codePoint < 56320) {
                if ((units -= 3) > -1) {
                    bytes.push(239, 191, 189);
                }
                leadSurrogate = codePoint;
                continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
            if ((units -= 3) > -1) {
                bytes.push(239, 191, 189);
            }
        }
        leadSurrogate = null;
        if (codePoint < 128) {
            if ((units -= 1) < 0) {
                break;
            }
            bytes.push(codePoint);
        } else if (codePoint < 2048) {
            if ((units -= 2) < 0) {
                break;
            }
            bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
        } else if (codePoint < 65536) {
            if ((units -= 3) < 0) {
                break;
            }
            bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) {
                break;
            }
            bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else {
            throw new Error("Invalid code point");
        }
    }
    return bytes;
}
function blitBuffer(src, dst, offset, byteLength9) {
    let i14;
    const length = byteLength9 === undefined ? src.length : byteLength9;
    for(i14 = 0; i14 < length; ++i14){
        if (i14 + offset >= dst.length || i14 >= src.length) {
            break;
        }
        dst[i14 + offset] = src[i14];
    }
    return i14;
}
function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}
const hexSliceLookupTable = function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for(let i15 = 0; i15 < 16; ++i15){
        const i16 = i15 * 16;
        for(let j9 = 0; j9 < 16; ++j9){
            table[i16 + j9] = alphabet[i15] + alphabet[j9];
        }
    }
    return table;
}();
function defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
}
function BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
}
const atob1 = globalThis.atob;
const Blob = globalThis.Blob;
const btoa = globalThis.btoa;
function readUInt48LE(buf, offset = 0) {
    validateNumber(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 5];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 6);
    }
    return first + buf[++offset] * 2 ** 8 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 24 + (buf[++offset] + last * 2 ** 8) * 2 ** 32;
}
function readUInt40LE(buf, offset = 0) {
    validateNumber(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 4];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 5);
    }
    return first + buf[++offset] * 2 ** 8 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 24 + last * 2 ** 32;
}
function readUInt24LE(buf, offset = 0) {
    validateNumber(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 2];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 3);
    }
    return first + buf[++offset] * 2 ** 8 + last * 2 ** 16;
}
function readUInt48BE(buf, offset = 0) {
    validateNumber(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 5];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 6);
    }
    return (first * 2 ** 8 + buf[++offset]) * 2 ** 32 + buf[++offset] * 2 ** 24 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function readUInt40BE(buf, offset = 0) {
    validateNumber(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 4];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 5);
    }
    return first * 2 ** 32 + buf[++offset] * 2 ** 24 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function readUInt24BE(buf, offset = 0) {
    validateNumber(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 2];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 3);
    }
    return first * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function readUInt16BE(offset = 0) {
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 1];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 2);
    }
    return first * 2 ** 8 + last;
}
function readUInt32BE(offset = 0) {
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 3];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 4);
    }
    return first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
}
function readDoubleBackwards(buffer, offset = 0) {
    validateNumber(offset, "offset");
    const first = buffer[offset];
    const last = buffer[offset + 7];
    if (first === undefined || last === undefined) {
        boundsError(offset, buffer.length - 8);
    }
    uInt8Float64Array[7] = first;
    uInt8Float64Array[6] = buffer[++offset];
    uInt8Float64Array[5] = buffer[++offset];
    uInt8Float64Array[4] = buffer[++offset];
    uInt8Float64Array[3] = buffer[++offset];
    uInt8Float64Array[2] = buffer[++offset];
    uInt8Float64Array[1] = buffer[++offset];
    uInt8Float64Array[0] = last;
    return float64Array[0];
}
function readDoubleForwards(buffer, offset = 0) {
    validateNumber(offset, "offset");
    const first = buffer[offset];
    const last = buffer[offset + 7];
    if (first === undefined || last === undefined) {
        boundsError(offset, buffer.length - 8);
    }
    uInt8Float64Array[0] = first;
    uInt8Float64Array[1] = buffer[++offset];
    uInt8Float64Array[2] = buffer[++offset];
    uInt8Float64Array[3] = buffer[++offset];
    uInt8Float64Array[4] = buffer[++offset];
    uInt8Float64Array[5] = buffer[++offset];
    uInt8Float64Array[6] = buffer[++offset];
    uInt8Float64Array[7] = last;
    return float64Array[0];
}
function writeDoubleForwards(buffer, val, offset = 0) {
    val = +val;
    checkBounds(buffer, offset, 7);
    float64Array[0] = val;
    buffer[offset++] = uInt8Float64Array[0];
    buffer[offset++] = uInt8Float64Array[1];
    buffer[offset++] = uInt8Float64Array[2];
    buffer[offset++] = uInt8Float64Array[3];
    buffer[offset++] = uInt8Float64Array[4];
    buffer[offset++] = uInt8Float64Array[5];
    buffer[offset++] = uInt8Float64Array[6];
    buffer[offset++] = uInt8Float64Array[7];
    return offset;
}
function writeDoubleBackwards(buffer, val, offset = 0) {
    val = +val;
    checkBounds(buffer, offset, 7);
    float64Array[0] = val;
    buffer[offset++] = uInt8Float64Array[7];
    buffer[offset++] = uInt8Float64Array[6];
    buffer[offset++] = uInt8Float64Array[5];
    buffer[offset++] = uInt8Float64Array[4];
    buffer[offset++] = uInt8Float64Array[3];
    buffer[offset++] = uInt8Float64Array[2];
    buffer[offset++] = uInt8Float64Array[1];
    buffer[offset++] = uInt8Float64Array[0];
    return offset;
}
function readFloatBackwards(buffer, offset = 0) {
    validateNumber(offset, "offset");
    const first = buffer[offset];
    const last = buffer[offset + 3];
    if (first === undefined || last === undefined) {
        boundsError(offset, buffer.length - 4);
    }
    uInt8Float32Array[3] = first;
    uInt8Float32Array[2] = buffer[++offset];
    uInt8Float32Array[1] = buffer[++offset];
    uInt8Float32Array[0] = last;
    return float32Array[0];
}
function readFloatForwards(buffer, offset = 0) {
    validateNumber(offset, "offset");
    const first = buffer[offset];
    const last = buffer[offset + 3];
    if (first === undefined || last === undefined) {
        boundsError(offset, buffer.length - 4);
    }
    uInt8Float32Array[0] = first;
    uInt8Float32Array[1] = buffer[++offset];
    uInt8Float32Array[2] = buffer[++offset];
    uInt8Float32Array[3] = last;
    return float32Array[0];
}
function writeFloatForwards(buffer, val, offset = 0) {
    val = +val;
    checkBounds(buffer, offset, 3);
    float32Array[0] = val;
    buffer[offset++] = uInt8Float32Array[0];
    buffer[offset++] = uInt8Float32Array[1];
    buffer[offset++] = uInt8Float32Array[2];
    buffer[offset++] = uInt8Float32Array[3];
    return offset;
}
function writeFloatBackwards(buffer, val, offset = 0) {
    val = +val;
    checkBounds(buffer, offset, 3);
    float32Array[0] = val;
    buffer[offset++] = uInt8Float32Array[3];
    buffer[offset++] = uInt8Float32Array[2];
    buffer[offset++] = uInt8Float32Array[1];
    buffer[offset++] = uInt8Float32Array[0];
    return offset;
}
function readInt24LE(buf, offset = 0) {
    validateNumber(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 2];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 3);
    }
    const val = first + buf[++offset] * 2 ** 8 + last * 2 ** 16;
    return val | (val & 2 ** 23) * 0x1fe;
}
function readInt40LE(buf, offset = 0) {
    validateNumber(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 4];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 5);
    }
    return (last | (last & 2 ** 7) * 0x1fffffe) * 2 ** 32 + first + buf[++offset] * 2 ** 8 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 24;
}
function readInt48LE(buf, offset = 0) {
    validateNumber(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 5];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 6);
    }
    const val = buf[offset + 4] + last * 2 ** 8;
    return (val | (val & 2 ** 15) * 0x1fffe) * 2 ** 32 + first + buf[++offset] * 2 ** 8 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 24;
}
function readInt24BE(buf, offset = 0) {
    validateNumber(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 2];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 3);
    }
    const val = first * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
    return val | (val & 2 ** 23) * 0x1fe;
}
function readInt48BE(buf, offset = 0) {
    validateNumber(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 5];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 6);
    }
    const val = buf[++offset] + first * 2 ** 8;
    return (val | (val & 2 ** 15) * 0x1fffe) * 2 ** 32 + buf[++offset] * 2 ** 24 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function readInt40BE(buf, offset = 0) {
    validateNumber(offset, "offset");
    const first = buf[offset];
    const last = buf[offset + 4];
    if (first === undefined || last === undefined) {
        boundsError(offset, buf.length - 5);
    }
    return (first | (first & 2 ** 7) * 0x1fffffe) * 2 ** 32 + buf[++offset] * 2 ** 24 + buf[++offset] * 2 ** 16 + buf[++offset] * 2 ** 8 + last;
}
function byteLengthUtf8(str) {
    return utf8Encoder.encode(str).length;
}
function base64ByteLength(str, bytes) {
    if (str.charCodeAt(bytes - 1) === 0x3D) {
        bytes--;
    }
    if (bytes > 1 && str.charCodeAt(bytes - 1) === 0x3D) {
        bytes--;
    }
    return bytes * 3 >>> 2;
}
const encodingsMap = Object.create(null);
for(let i = 0; i < encodings.length; ++i){
    encodingsMap[encodings[i]] = i;
}
const encodingOps = {
    ascii: {
        byteLength: (string)=>string.length
        ,
        encoding: "ascii",
        encodingVal: encodingsMap.ascii,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, asciiToBytes(val), byteOffset, encodingsMap.ascii, dir)
        ,
        slice: (buf, start, end)=>buf.asciiSlice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.asciiWrite(string, offset, len)
    },
    base64: {
        byteLength: (string)=>base64ByteLength(string, string.length)
        ,
        encoding: "base64",
        encodingVal: encodingsMap.base64,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, base64ToBytes(val), byteOffset, encodingsMap.base64, dir)
        ,
        slice: (buf, start, end)=>buf.base64Slice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.base64Write(string, offset, len)
    },
    base64url: {
        byteLength: (string)=>base64ByteLength(string, string.length)
        ,
        encoding: "base64url",
        encodingVal: encodingsMap.base64url,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, base64UrlToBytes(val), byteOffset, encodingsMap.base64url, dir)
        ,
        slice: (buf, start, end)=>buf.base64urlSlice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.base64urlWrite(string, offset, len)
    },
    hex: {
        byteLength: (string)=>string.length >>> 1
        ,
        encoding: "hex",
        encodingVal: encodingsMap.hex,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, hexToBytes(val), byteOffset, encodingsMap.hex, dir)
        ,
        slice: (buf, start, end)=>buf.hexSlice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.hexWrite(string, offset, len)
    },
    latin1: {
        byteLength: (string)=>string.length
        ,
        encoding: "latin1",
        encodingVal: encodingsMap.latin1,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, asciiToBytes(val), byteOffset, encodingsMap.latin1, dir)
        ,
        slice: (buf, start, end)=>buf.latin1Slice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.latin1Write(string, offset, len)
    },
    ucs2: {
        byteLength: (string)=>string.length * 2
        ,
        encoding: "ucs2",
        encodingVal: encodingsMap.utf16le,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, utf16leToBytes(val), byteOffset, encodingsMap.utf16le, dir)
        ,
        slice: (buf, start, end)=>buf.ucs2Slice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.ucs2Write(string, offset, len)
    },
    utf8: {
        byteLength: byteLengthUtf8,
        encoding: "utf8",
        encodingVal: encodingsMap.utf8,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, utf8Encoder.encode(val), byteOffset, encodingsMap.utf8, dir)
        ,
        slice: (buf, start, end)=>buf.utf8Slice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.utf8Write(string, offset, len)
    },
    utf16le: {
        byteLength: (string)=>string.length * 2
        ,
        encoding: "utf16le",
        encodingVal: encodingsMap.utf16le,
        indexOf: (buf, val, byteOffset, dir)=>indexOfBuffer(buf, utf16leToBytes(val), byteOffset, encodingsMap.utf16le, dir)
        ,
        slice: (buf, start, end)=>buf.ucs2Slice(start, end)
        ,
        write: (buf, string, offset, len)=>buf.ucs2Write(string, offset, len)
    }
};
function getEncodingOps(encoding) {
    encoding = String(encoding).toLowerCase();
    switch(encoding.length){
        case 4:
            if (encoding === "utf8") return encodingOps.utf8;
            if (encoding === "ucs2") return encodingOps.ucs2;
            break;
        case 5:
            if (encoding === "utf-8") return encodingOps.utf8;
            if (encoding === "ascii") return encodingOps.ascii;
            if (encoding === "ucs-2") return encodingOps.ucs2;
            break;
        case 7:
            if (encoding === "utf16le") {
                return encodingOps.utf16le;
            }
            break;
        case 8:
            if (encoding === "utf-16le") {
                return encodingOps.utf16le;
            }
            break;
        case 6:
            if (encoding === "latin1" || encoding === "binary") {
                return encodingOps.latin1;
            }
            if (encoding === "base64") return encodingOps.base64;
        case 3:
            if (encoding === "hex") {
                return encodingOps.hex;
            }
            break;
        case 9:
            if (encoding === "base64url") {
                return encodingOps.base64url;
            }
            break;
    }
}
function _copyActual(source, target, targetStart, sourceStart, sourceEnd) {
    if (sourceEnd - sourceStart > target.length - targetStart) {
        sourceEnd = sourceStart + target.length - targetStart;
    }
    let nb = sourceEnd - sourceStart;
    const sourceLen = source.length - sourceStart;
    if (nb > sourceLen) {
        nb = sourceLen;
    }
    if (sourceStart !== 0 || sourceEnd < source.length) {
        source = new Uint8Array(source.buffer, source.byteOffset + sourceStart, nb);
    }
    target.set(source, targetStart);
    return nb;
}
function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new codes.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
    }
    if (length < 0) {
        throw new codes.ERR_BUFFER_OUT_OF_BOUNDS();
    }
    throw new codes.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
}
function validateNumber(value, name34) {
    if (typeof value !== "number") {
        throw new codes.ERR_INVALID_ARG_TYPE(name34, "number", value);
    }
}
function checkInt(value, min, max, buf, offset, byteLength10) {
    if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength10 > 3) {
            if (min === 0 || min === 0n) {
                range = `>= 0${n} and < 2${n} ** ${(byteLength10 + 1) * 8}${n}`;
            } else {
                range = `>= -(2${n} ** ${(byteLength10 + 1) * 8 - 1}${n}) and ` + `< 2${n} ** ${(byteLength10 + 1) * 8 - 1}${n}`;
            }
        } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new codes.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength10);
}
function toInteger(n, defaultVal) {
    n = +n;
    if (!Number.isNaN(n) && n >= Number.MIN_SAFE_INTEGER && n <= Number.MAX_SAFE_INTEGER) {
        return n % 1 === 0 ? n : Math.floor(n);
    }
    return defaultVal;
}
function writeU_Int8(buf, value, offset, min, max) {
    value = +value;
    validateNumber(offset, "offset");
    if (value > max || value < min) {
        throw new codes.ERR_OUT_OF_RANGE("value", `>= ${min} and <= ${max}`, value);
    }
    if (buf[offset] === undefined) {
        boundsError(offset, buf.length - 1);
    }
    buf[offset] = value;
    return offset + 1;
}
function writeU_Int16BE(buf, value, offset, min, max) {
    value = +value;
    checkInt(value, min, max, buf, offset, 1);
    buf[offset++] = value >>> 8;
    buf[offset++] = value;
    return offset;
}
function _writeUInt32LE(buf, value, offset, min, max) {
    value = +value;
    checkInt(value, min, max, buf, offset, 3);
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    return offset;
}
function writeU_Int16LE(buf, value, offset, min, max) {
    value = +value;
    checkInt(value, min, max, buf, offset, 1);
    buf[offset++] = value;
    buf[offset++] = value >>> 8;
    return offset;
}
function _writeUInt32BE(buf, value, offset, min, max) {
    value = +value;
    checkInt(value, min, max, buf, offset, 3);
    buf[offset + 3] = value;
    value = value >>> 8;
    buf[offset + 2] = value;
    value = value >>> 8;
    buf[offset + 1] = value;
    value = value >>> 8;
    buf[offset] = value;
    return offset + 4;
}
function writeU_Int48BE(buf, value, offset, min, max) {
    value = +value;
    checkInt(value, min, max, buf, offset, 5);
    const newVal = Math.floor(value * 2 ** -32);
    buf[offset++] = newVal >>> 8;
    buf[offset++] = newVal;
    buf[offset + 3] = value;
    value = value >>> 8;
    buf[offset + 2] = value;
    value = value >>> 8;
    buf[offset + 1] = value;
    value = value >>> 8;
    buf[offset] = value;
    return offset + 4;
}
function writeU_Int40BE(buf, value, offset, min, max) {
    value = +value;
    checkInt(value, min, max, buf, offset, 4);
    buf[offset++] = Math.floor(value * 2 ** -32);
    buf[offset + 3] = value;
    value = value >>> 8;
    buf[offset + 2] = value;
    value = value >>> 8;
    buf[offset + 1] = value;
    value = value >>> 8;
    buf[offset] = value;
    return offset + 4;
}
function writeU_Int32BE(buf, value, offset, min, max) {
    value = +value;
    checkInt(value, min, max, buf, offset, 3);
    buf[offset + 3] = value;
    value = value >>> 8;
    buf[offset + 2] = value;
    value = value >>> 8;
    buf[offset + 1] = value;
    value = value >>> 8;
    buf[offset] = value;
    return offset + 4;
}
function writeU_Int24BE(buf, value, offset, min, max) {
    value = +value;
    checkInt(value, min, max, buf, offset, 2);
    buf[offset + 2] = value;
    value = value >>> 8;
    buf[offset + 1] = value;
    value = value >>> 8;
    buf[offset] = value;
    return offset + 3;
}
function validateOffset(value, name35, min = 0, max = Number.MAX_SAFE_INTEGER) {
    if (typeof value !== "number") {
        throw new codes.ERR_INVALID_ARG_TYPE(name35, "number", value);
    }
    if (!Number.isInteger(value)) {
        throw new codes.ERR_OUT_OF_RANGE(name35, "an integer", value);
    }
    if (value < min || value > max) {
        throw new codes.ERR_OUT_OF_RANGE(name35, `>= ${min} && <= ${max}`, value);
    }
}
function writeU_Int48LE(buf, value, offset, min, max) {
    value = +value;
    checkInt(value, min, max, buf, offset, 5);
    const newVal = Math.floor(value * 2 ** -32);
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    buf[offset++] = newVal;
    buf[offset++] = newVal >>> 8;
    return offset;
}
function writeU_Int40LE(buf, value, offset, min, max) {
    value = +value;
    checkInt(value, min, max, buf, offset, 4);
    const newVal = value;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    buf[offset++] = Math.floor(newVal * 2 ** -32);
    return offset;
}
function writeU_Int32LE(buf, value, offset, min, max) {
    value = +value;
    checkInt(value, min, max, buf, offset, 3);
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    return offset;
}
function writeU_Int24LE(buf, value, offset, min, max) {
    value = +value;
    checkInt(value, min, max, buf, offset, 2);
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    value = value >>> 8;
    buf[offset++] = value;
    return offset;
}
const __default3 = {
    atob: atob1,
    btoa,
    Blob,
    Buffer,
    constants,
    kMaxLength: 2147483647,
    kStringMaxLength: 536870888,
    SlowBuffer
};
"use strict";
const kEscape = "\x1b";
Symbol("kSubstringSearch");
function CSI(strings, ...args) {
    let ret = `${kEscape}[`;
    for(let n = 0; n < strings.length; n++){
        ret += strings[n];
        if (n < args.length) {
            ret += args[n];
        }
    }
    return ret;
}
CSI.kEscape = kEscape;
CSI.kClearToLineBeginning = CSI`1K`;
CSI.kClearToLineEnd = CSI`0K`;
CSI.kClearLine = CSI`2K`;
CSI.kClearScreenDown = CSI`0J`;
"use strict";
const { kClearLine , kClearScreenDown , kClearToLineBeginning , kClearToLineEnd ,  } = CSI;
function cursorTo(stream, x, y, callback) {
    if (callback !== undefined) {
        validateFunction(callback, "callback");
    }
    if (typeof y === "function") {
        callback = y;
        y = undefined;
    }
    if (Number.isNaN(x)) throw new ERR_INVALID_ARG_VALUE("x", x);
    if (Number.isNaN(y)) throw new ERR_INVALID_ARG_VALUE("y", y);
    if (stream == null || typeof x !== "number" && typeof y !== "number") {
        if (typeof callback === "function") process.nextTick(callback, null);
        return true;
    }
    if (typeof x !== "number") throw new ERR_INVALID_CURSOR_POS();
    const data = typeof y !== "number" ? CSI`${x + 1}G` : CSI`${y + 1};${x + 1}H`;
    return stream.write(data, callback);
}
function moveCursor(stream, dx, dy, callback) {
    if (callback !== undefined) {
        validateFunction(callback, "callback");
    }
    if (stream == null || !(dx || dy)) {
        if (typeof callback === "function") process.nextTick(callback, null);
        return true;
    }
    let data = "";
    if (dx < 0) {
        data += CSI`${-dx}D`;
    } else if (dx > 0) {
        data += CSI`${dx}C`;
    }
    if (dy < 0) {
        data += CSI`${-dy}A`;
    } else if (dy > 0) {
        data += CSI`${dy}B`;
    }
    return stream.write(data, callback);
}
function clearLine(stream, dir, callback) {
    if (callback !== undefined) {
        validateFunction(callback, "callback");
    }
    if (stream === null || stream === undefined) {
        if (typeof callback === "function") process.nextTick(callback, null);
        return true;
    }
    const type = dir < 0 ? kClearToLineBeginning : dir > 0 ? kClearToLineEnd : kClearLine;
    return stream.write(type, callback);
}
function clearScreenDown(stream, callback) {
    if (callback !== undefined) {
        validateFunction(callback, "callback");
    }
    if (stream === null || stream === undefined) {
        if (typeof callback === "function") process.nextTick(callback, null);
        return true;
    }
    return stream.write(kClearScreenDown, callback);
}
const stdio = {};
var NotImplemented;
(function(NotImplemented1) {
    NotImplemented1[NotImplemented1["ascii"] = 0] = "ascii";
    NotImplemented1[NotImplemented1["latin1"] = 1] = "latin1";
    NotImplemented1[NotImplemented1["utf16le"] = 2] = "utf16le";
})(NotImplemented || (NotImplemented = {}));
function normalizeEncoding2(enc) {
    const encoding = normalizeEncoding(enc ?? null);
    if (encoding && encoding in NotImplemented) notImplemented(encoding);
    if (!encoding && typeof enc === "string" && enc.toLowerCase() !== "raw") {
        throw new Error(`Unknown encoding: ${enc}`);
    }
    return String(encoding);
}
function isBufferType(buf) {
    return buf instanceof ArrayBuffer && buf.BYTES_PER_ELEMENT;
}
function utf8CheckByte(__byte) {
    if (__byte <= 0x7f) return 0;
    else if (__byte >> 5 === 0x06) return 2;
    else if (__byte >> 4 === 0x0e) return 3;
    else if (__byte >> 3 === 0x1e) return 4;
    return __byte >> 6 === 0x02 ? -1 : -2;
}
function utf8CheckIncomplete(self, buf, i51) {
    let j10 = buf.length - 1;
    if (j10 < i51) return 0;
    let nb = utf8CheckByte(buf[j10]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
    }
    if (--j10 < i51 || nb === -2) return 0;
    nb = utf8CheckByte(buf[j10]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
    }
    if (--j10 < i51 || nb === -2) return 0;
    nb = utf8CheckByte(buf[j10]);
    if (nb >= 0) {
        if (nb > 0) {
            if (nb === 2) nb = 0;
            else self.lastNeed = nb - 3;
        }
        return nb;
    }
    return 0;
}
function utf8CheckExtraBytes(self, buf) {
    if ((buf[0] & 0xc0) !== 0x80) {
        self.lastNeed = 0;
        return "\ufffd";
    }
    if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xc0) !== 0x80) {
            self.lastNeed = 1;
            return "\ufffd";
        }
        if (self.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 0xc0) !== 0x80) {
                self.lastNeed = 2;
                return "\ufffd";
            }
        }
    }
}
function utf8FillLastComplete(buf) {
    const p = this.lastTotal - this.lastNeed;
    const r = utf8CheckExtraBytes(this, buf);
    if (r !== undefined) return r;
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
}
function utf8FillLastIncomplete(buf) {
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
}
function utf8Text(buf, i52) {
    const total = utf8CheckIncomplete(this, buf, i52);
    if (!this.lastNeed) return buf.toString("utf8", i52);
    this.lastTotal = total;
    const end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString("utf8", i52, end);
}
function utf8End(buf) {
    const r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) return r + "\ufffd";
    return r;
}
function utf8Write(buf) {
    if (typeof buf === "string") {
        return buf;
    }
    if (buf.length === 0) return "";
    let r;
    let i53;
    const normalizedBuffer = isBufferType(buf) ? buf : Buffer.from(buf);
    if (this.lastNeed) {
        r = this.fillLast(normalizedBuffer);
        if (r === undefined) return "";
        i53 = this.lastNeed;
        this.lastNeed = 0;
    } else {
        i53 = 0;
    }
    if (i53 < buf.length) {
        return r ? r + this.text(normalizedBuffer, i53) : this.text(normalizedBuffer, i53);
    }
    return r || "";
}
function base64Text(buf, i54) {
    const n = (buf.length - i54) % 3;
    if (n === 0) return buf.toString("base64", i54);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
    } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i54, buf.length - n);
}
function base64End(buf) {
    const r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
        return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    }
    return r;
}
function simpleWrite(buf) {
    if (typeof buf === "string") {
        return buf;
    }
    return buf.toString(this.encoding);
}
function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
}
class StringDecoderBase {
    lastChar;
    lastNeed;
    lastTotal;
    constructor(encoding, nb){
        this.encoding = encoding;
        this.lastNeed = 0;
        this.lastTotal = 0;
        this.lastChar = Buffer.allocUnsafe(nb);
    }
    encoding;
}
class Base64Decoder extends StringDecoderBase {
    end = base64End;
    fillLast = utf8FillLastIncomplete;
    text = base64Text;
    write = utf8Write;
    constructor(encoding){
        super(normalizeEncoding2(encoding), 3);
    }
}
class GenericDecoder extends StringDecoderBase {
    end = simpleEnd;
    fillLast = undefined;
    text = utf8Text;
    write = simpleWrite;
    constructor(encoding){
        super(normalizeEncoding2(encoding), 4);
    }
}
class Utf8Decoder extends StringDecoderBase {
    end = utf8End;
    fillLast = utf8FillLastComplete;
    text = utf8Text;
    write = utf8Write;
    constructor(encoding){
        super(normalizeEncoding2(encoding), 4);
    }
}
class StringDecoder {
    encoding;
    end;
    fillLast;
    lastChar;
    lastNeed;
    lastTotal;
    text;
    write;
    constructor(encoding){
        const normalizedEncoding = normalizeEncoding2(encoding);
        let decoder1;
        switch(normalizedEncoding){
            case "utf8":
                decoder1 = new Utf8Decoder(encoding);
                break;
            case "base64":
                decoder1 = new Base64Decoder(encoding);
                break;
            default:
                decoder1 = new GenericDecoder(encoding);
        }
        this.encoding = decoder1.encoding;
        this.end = decoder1.end;
        this.fillLast = decoder1.fillLast;
        this.lastChar = decoder1.lastChar;
        this.lastNeed = decoder1.lastNeed;
        this.lastTotal = decoder1.lastTotal;
        this.text = decoder1.text;
        this.write = decoder1.write;
    }
}
const PStringDecoder = new Proxy(StringDecoder, {
    apply (_target, thisArg, args) {
        return Object.assign(thisArg, new StringDecoder(...args));
    }
});
const __default4 = {
    StringDecoder: PStringDecoder
};
const kDestroy = Symbol("kDestroy");
Symbol("kConstruct");
function checkError(err, w, r) {
    if (err) {
        err.stack;
        if (w && !w.errored) {
            w.errored = err;
        }
        if (r && !r.errored) {
            r.errored = err;
        }
    }
}
function destroy(err, cb) {
    const r = this._readableState;
    const w = this._writableState;
    const s = w || r;
    if (w && w.destroyed || r && r.destroyed) {
        if (typeof cb === "function") {
            cb();
        }
        return this;
    }
    checkError(err, w, r);
    if (w) {
        w.destroyed = true;
    }
    if (r) {
        r.destroyed = true;
    }
    if (!s.constructed) {
        this.once(kDestroy, function(er) {
            _destroy(this, aggregateTwoErrors(er, err), cb);
        });
    } else {
        _destroy(this, err, cb);
    }
    return this;
}
function _destroy(self, err1, cb) {
    let called = false;
    function onDestroy(err) {
        if (called) {
            return;
        }
        called = true;
        const r = self._readableState;
        const w = self._writableState;
        checkError(err, w, r);
        if (w) {
            w.closed = true;
        }
        if (r) {
            r.closed = true;
        }
        if (typeof cb === "function") {
            cb(err);
        }
        if (err) {
            nextTick1(emitErrorCloseNT, self, err);
        } else {
            nextTick1(emitCloseNT, self);
        }
    }
    try {
        const result = self._destroy(err1 || null, onDestroy);
        if (result != null) {
            const then = result.then;
            if (typeof then === "function") {
                then.call(result, function() {
                    nextTick1(onDestroy, null);
                }, function(err) {
                    nextTick1(onDestroy, err);
                });
            }
        }
    } catch (err) {
        onDestroy(err);
    }
}
function emitErrorCloseNT(self, err) {
    emitErrorNT(self, err);
    emitCloseNT(self);
}
function emitCloseNT(self) {
    const r = self._readableState;
    const w = self._writableState;
    if (w) {
        w.closeEmitted = true;
    }
    if (r) {
        r.closeEmitted = true;
    }
    if (w && w.emitClose || r && r.emitClose) {
        self.emit("close");
    }
}
function emitErrorNT(self, err) {
    const r = self._readableState;
    const w = self._writableState;
    if (w && w.errorEmitted || r && r.errorEmitted) {
        return;
    }
    if (w) {
        w.errorEmitted = true;
    }
    if (r) {
        r.errorEmitted = true;
    }
    self.emit("error", err);
}
function errorOrDestroy(stream, err, sync) {
    const r = stream._readableState;
    const w = stream._writableState;
    if (w && w.destroyed || r && r.destroyed) {
        return this;
    }
    if (r && r.autoDestroy || w && w.autoDestroy) {
        stream.destroy(err);
    } else if (err) {
        err.stack;
        if (w && !w.errored) {
            w.errored = err;
        }
        if (r && !r.errored) {
            r.errored = err;
        }
        if (sync) {
            nextTick1(emitErrorNT, stream, err);
        } else {
            emitErrorNT(stream, err);
        }
    }
}
function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
}
function isServerResponse(stream) {
    return typeof stream._sent100 === "boolean" && typeof stream._removedConnection === "boolean" && typeof stream._removedContLen === "boolean" && typeof stream._removedTE === "boolean" && typeof stream._closed === "boolean";
}
function isReadable(stream) {
    return typeof stream.readable === "boolean" || typeof stream.readableEnded === "boolean" || !!stream._readableState;
}
function isWritable(stream) {
    return typeof stream.writable === "boolean" || typeof stream.writableEnded === "boolean" || !!stream._writableState;
}
function isWritableFinished(stream) {
    if (stream.writableFinished) return true;
    const wState = stream._writableState;
    if (!wState || wState.errored) return false;
    return wState.finished || wState.ended && wState.length === 0;
}
const nop = ()=>{};
function isReadableEnded(stream) {
    if (stream.readableEnded) return true;
    const rState = stream._readableState;
    if (!rState || rState.errored) return false;
    return rState.endEmitted || rState.ended && rState.length === 0;
}
function eos(stream, options, callback) {
    if (arguments.length === 2) {
        callback = options;
        options = {};
    } else if (options == null) {
        options = {};
    } else {
        validateObject(options, "options");
    }
    validateFunction(callback, "callback");
    validateAbortSignal(options.signal, "options.signal");
    callback = once1(callback);
    const readable = options.readable || options.readable !== false && isReadable(stream);
    const writable = options.writable || options.writable !== false && isWritable(stream);
    const wState = stream._writableState;
    const rState = stream._readableState;
    const state = wState || rState;
    const onlegacyfinish = ()=>{
        if (!stream.writable) onfinish();
    };
    let willEmitClose = isServerResponse(stream) || state && state.autoDestroy && state.emitClose && state.closed === false && isReadable(stream) === readable && isWritable(stream) === writable;
    let writableFinished = stream.writableFinished || wState && wState.finished;
    const onfinish = ()=>{
        writableFinished = true;
        if (stream.destroyed) willEmitClose = false;
        if (willEmitClose && (!stream.readable || readable)) return;
        if (!readable || readableEnded) callback.call(stream);
    };
    let readableEnded = stream.readableEnded || rState && rState.endEmitted;
    const onend = ()=>{
        readableEnded = true;
        if (stream.destroyed) willEmitClose = false;
        if (willEmitClose && (!stream.writable || writable)) return;
        if (!writable || writableFinished) callback.call(stream);
    };
    const onerror = (err)=>{
        callback.call(stream, err);
    };
    const onclose = ()=>{
        if (readable && !readableEnded) {
            if (!isReadableEnded(stream)) {
                return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
            }
        }
        if (writable && !writableFinished) {
            if (!isWritableFinished(stream)) {
                return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
            }
        }
        callback.call(stream);
    };
    const onrequest = ()=>{
        stream.req.on("finish", onfinish);
    };
    if (isRequest(stream)) {
        stream.on("complete", onfinish);
        if (!willEmitClose) {
            stream.on("abort", onclose);
        }
        if (stream.req) onrequest();
        else stream.on("request", onrequest);
    } else if (writable && !wState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
    }
    if (!willEmitClose && typeof stream.aborted === "boolean") {
        stream.on("aborted", onclose);
    }
    stream.on("end", onend);
    stream.on("finish", onfinish);
    if (options.error !== false) stream.on("error", onerror);
    stream.on("close", onclose);
    const closed = !wState && !rState && stream._closed === true || wState && wState.closed || rState && rState.closed || wState && wState.errorEmitted || rState && rState.errorEmitted || rState && stream.req && stream.aborted || (!wState || !willEmitClose || typeof wState.closed !== "boolean") && (!rState || !willEmitClose || typeof rState.closed !== "boolean") && (!writable || wState && wState.finished) && (!readable || rState && rState.endEmitted);
    if (closed) {
        nextTick1(()=>{
            callback();
        });
    }
    const cleanup = ()=>{
        callback = nop;
        stream.removeListener("aborted", onclose);
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
    };
    if (options.signal && !closed) {
        const abort = ()=>{
            const endCallback = callback;
            cleanup();
            endCallback.call(stream, new AbortError());
        };
        if (options.signal.aborted) {
            nextTick1(abort);
        } else {
            const originalCallback = callback;
            callback = once1((...args)=>{
                options.signal.removeEventListener("abort", abort);
                originalCallback.apply(stream, args);
            });
            options.signal.addEventListener("abort", abort);
        }
    }
    return cleanup;
}
Symbol("kIsDisturbed");
function isReadableNodeStream(obj) {
    return !!(obj && typeof obj.pipe === "function" && typeof obj.on === "function" && (!obj._writableState || obj._readableState?.readable !== false) && (!obj._writableState || obj._readableState));
}
function isWritableNodeStream(obj) {
    return !!(obj && typeof obj.write === "function" && typeof obj.on === "function" && (!obj._readableState || obj._writableState?.writable !== false));
}
function isNodeStream(obj) {
    return obj && (obj._readableState || obj._writableState || typeof obj.write === "function" && typeof obj.on === "function" || typeof obj.pipe === "function" && typeof obj.on === "function");
}
function isDestroyed(stream) {
    if (!isNodeStream(stream)) return null;
    const wState = stream._writableState;
    const rState = stream._readableState;
    const state = wState || rState;
    return !!(stream.destroyed || state?.destroyed);
}
function isWritableEnded(stream) {
    if (!isWritableNodeStream(stream)) return null;
    if (stream.writableEnded === true) return true;
    const wState = stream._writableState;
    if (wState?.errored) return false;
    if (typeof wState?.ended !== "boolean") return null;
    return wState.ended;
}
function isReadableEnded1(stream) {
    if (!isReadableNodeStream(stream)) return null;
    if (stream.readableEnded === true) return true;
    const rState = stream._readableState;
    if (!rState || rState.errored) return false;
    if (typeof rState?.ended !== "boolean") return null;
    return rState.ended;
}
function isReadableFinished(stream, strict) {
    if (!isReadableNodeStream(stream)) return null;
    const rState = stream._readableState;
    if (rState?.errored) return false;
    if (typeof rState?.endEmitted !== "boolean") return null;
    return !!(rState.endEmitted || strict === false && rState.ended === true && rState.length === 0);
}
function isReadable1(stream) {
    const r = isReadableNodeStream(stream);
    if (r === null || typeof stream?.readable !== "boolean") return null;
    if (isDestroyed(stream)) return false;
    return r && stream.readable && !isReadableFinished(stream);
}
function isWritable1(stream) {
    const r = isWritableNodeStream(stream);
    if (r === null || typeof stream?.writable !== "boolean") return null;
    if (isDestroyed(stream)) return false;
    return r && stream.writable && !isWritableEnded(stream);
}
const __process$ = {
    nextTick: nextTick1,
    stdio
};
var pi = Object.create;
var Bt = Object.defineProperty;
var wi = Object.getOwnPropertyDescriptor;
var yi = Object.getOwnPropertyNames;
var gi = Object.getPrototypeOf, Si = Object.prototype.hasOwnProperty;
((e)=>typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, {
        get: (t, n)=>(typeof require < "u" ? require : t)[n]
    }) : e
)(function(e) {
    if (typeof require < "u") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + e + '" is not supported');
});
var g = (e, t)=>()=>(t || e((t = {
            exports: {}
        }).exports, t), t.exports)
;
var Ei = (e, t, n, r)=>{
    if (t && typeof t == "object" || typeof t == "function") for (let i55 of yi(t))!Si.call(e, i55) && i55 !== n && Bt(e, i55, {
        get: ()=>t[i55]
        ,
        enumerable: !(r = wi(t, i55)) || r.enumerable
    });
    return e;
};
var Ri = (e, t, n)=>(n = e != null ? pi(gi(e)) : {}, Ei(t || !e || !e.__esModule ? Bt(n, "default", {
        value: e,
        enumerable: !0
    }) : n, e))
;
var m = g((Yf, Gt)=>{
    "use strict";
    Gt.exports = {
        ArrayIsArray (e) {
            return Array.isArray(e);
        },
        ArrayPrototypeIncludes (e, t) {
            return e.includes(t);
        },
        ArrayPrototypeIndexOf (e, t) {
            return e.indexOf(t);
        },
        ArrayPrototypeJoin (e, t) {
            return e.join(t);
        },
        ArrayPrototypeMap (e, t) {
            return e.map(t);
        },
        ArrayPrototypePop (e, t) {
            return e.pop(t);
        },
        ArrayPrototypePush (e, t) {
            return e.push(t);
        },
        ArrayPrototypeSlice (e, t, n) {
            return e.slice(t, n);
        },
        Error,
        FunctionPrototypeCall (e, t, ...n) {
            return e.call(t, ...n);
        },
        FunctionPrototypeSymbolHasInstance (e, t) {
            return Function.prototype[Symbol.hasInstance].call(e, t);
        },
        MathFloor: Math.floor,
        Number,
        NumberIsInteger: Number.isInteger,
        NumberIsNaN: Number.isNaN,
        NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
        NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
        NumberParseInt: Number.parseInt,
        ObjectDefineProperties (e, t) {
            return Object.defineProperties(e, t);
        },
        ObjectDefineProperty (e, t, n) {
            return Object.defineProperty(e, t, n);
        },
        ObjectGetOwnPropertyDescriptor (e, t) {
            return Object.getOwnPropertyDescriptor(e, t);
        },
        ObjectKeys (e) {
            return Object.keys(e);
        },
        ObjectSetPrototypeOf (e, t) {
            return Object.setPrototypeOf(e, t);
        },
        Promise,
        PromisePrototypeCatch (e, t) {
            return e.catch(t);
        },
        PromisePrototypeThen (e, t, n) {
            return e.then(t, n);
        },
        PromiseReject (e) {
            return Promise.reject(e);
        },
        ReflectApply: Reflect.apply,
        RegExpPrototypeTest (e, t) {
            return e.test(t);
        },
        SafeSet: Set,
        String,
        StringPrototypeSlice (e, t, n) {
            return e.slice(t, n);
        },
        StringPrototypeToLowerCase (e) {
            return e.toLowerCase();
        },
        StringPrototypeToUpperCase (e) {
            return e.toUpperCase();
        },
        StringPrototypeTrim (e) {
            return e.trim();
        },
        Symbol,
        SymbolAsyncIterator: Symbol.asyncIterator,
        SymbolHasInstance: Symbol.hasInstance,
        SymbolIterator: Symbol.iterator,
        TypedArrayPrototypeSet (e, t, n) {
            return e.set(t, n);
        },
        Uint8Array
    };
});
var j = g((Kf, Je)=>{
    "use strict";
    var Ai = __default3, mi = Object.getPrototypeOf(async function() {}).constructor, Ht = globalThis.Blob || Ai.Blob, Ti = typeof Ht < "u" ? function(t) {
        return t instanceof Ht;
    } : function(t) {
        return !1;
    }, Xe = class extends Error {
        constructor(t){
            if (!Array.isArray(t)) throw new TypeError(`Expected input to be an Array, got ${typeof t}`);
            let n = "";
            for(let r = 0; r < t.length; r++)n += `    ${t[r].stack}
`;
            super(n), this.name = "AggregateError", this.errors = t;
        }
    };
    Je.exports = {
        AggregateError: Xe,
        kEmptyObject: Object.freeze({}),
        once (e) {
            let t = !1;
            return function(...n) {
                t || (t = !0, e.apply(this, n));
            };
        },
        createDeferredPromise: function() {
            let e, t;
            return {
                promise: new Promise((r, i56)=>{
                    e = r, t = i56;
                }),
                resolve: e,
                reject: t
            };
        },
        promisify (e) {
            return new Promise((t, n)=>{
                e((r, ...i57)=>r ? n(r) : t(...i57)
                );
            });
        },
        debuglog () {
            return function() {};
        },
        format (e, ...t) {
            return e.replace(/%([sdifj])/g, function(...[n, r]) {
                let i58 = t.shift();
                return r === "f" ? i58.toFixed(6) : r === "j" ? JSON.stringify(i58) : r === "s" && typeof i58 == "object" ? `${i58.constructor !== Object ? i58.constructor.name : ""} {}`.trim() : i58.toString();
            });
        },
        inspect (e) {
            switch(typeof e){
                case "string":
                    if (e.includes("'")) if (e.includes('"')) {
                        if (!e.includes("`") && !e.includes("${")) return `\`${e}\``;
                    } else return `"${e}"`;
                    return `'${e}'`;
                case "number":
                    return isNaN(e) ? "NaN" : Object.is(e, -0) ? String(e) : e;
                case "bigint":
                    return `${String(e)}n`;
                case "boolean":
                case "undefined":
                    return String(e);
                case "object":
                    return "{}";
            }
        },
        types: {
            isAsyncFunction (e) {
                return e instanceof mi;
            },
            isArrayBufferView (e) {
                return ArrayBuffer.isView(e);
            }
        },
        isBlob: Ti
    };
    Je.exports.promisify.custom = Symbol.for("nodejs.util.promisify.custom");
});
var O = g((zf, Kt)=>{
    "use strict";
    var { format: Ii , inspect: Re , AggregateError: Mi  } = j(), Ni = globalThis.AggregateError || Mi, Di = Symbol("kIsNodeError"), Oi = [
        "string",
        "function",
        "number",
        "object",
        "Function",
        "Object",
        "boolean",
        "bigint",
        "symbol"
    ], qi = /^([A-Z][a-z0-9]*)+$/, xi = "__node_internal_", Ae = {};
    function X(e, t) {
        if (!e) throw new Ae.ERR_INTERNAL_ASSERTION(t);
    }
    function Vt(e) {
        let t = "", n = e.length, r = e[0] === "-" ? 1 : 0;
        for(; n >= r + 4; n -= 3)t = `_${e.slice(n - 3, n)}${t}`;
        return `${e.slice(0, n)}${t}`;
    }
    function Li(e, t, n) {
        if (typeof t == "function") return X(t.length <= n.length, `Code: ${e}; The provided arguments length (${n.length}) does not match the required ones (${t.length}).`), t(...n);
        let r = (t.match(/%[dfijoOs]/g) || []).length;
        return X(r === n.length, `Code: ${e}; The provided arguments length (${n.length}) does not match the required ones (${r}).`), n.length === 0 ? t : Ii(t, ...n);
    }
    function N(e, t, n) {
        n || (n = Error);
        class r extends n {
            constructor(...o){
                super(Li(e, t, o));
            }
            toString() {
                return `${this.name} [${e}]: ${this.message}`;
            }
        }
        Object.defineProperties(r.prototype, {
            name: {
                value: n.name,
                writable: !0,
                enumerable: !1,
                configurable: !0
            },
            toString: {
                value () {
                    return `${this.name} [${e}]: ${this.message}`;
                },
                writable: !0,
                enumerable: !1,
                configurable: !0
            }
        }), r.prototype.code = e, r.prototype[Di] = !0, Ae[e] = r;
    }
    function Yt(e) {
        let t = xi + e.name;
        return Object.defineProperty(e, "name", {
            value: t,
            writable: true,
            configurable: true,
        }), e;
    }
    function Pi(e, t) {
        if (e && t && e !== t) {
            if (Array.isArray(t.errors)) return t.errors.push(e), t;
            let n = new Ni([
                t,
                e
            ], t.message);
            return n.code = t.code, n;
        }
        return e || t;
    }
    var Qe = class extends Error {
        constructor(t = "The operation was aborted", n = void 0){
            if (n !== void 0 && typeof n != "object") throw new Ae.ERR_INVALID_ARG_TYPE("options", "Object", n);
            super(t, n), this.code = "ABORT_ERR", this.name = "AbortError";
        }
    };
    N("ERR_ASSERTION", "%s", Error);
    N("ERR_INVALID_ARG_TYPE", (e, t, n)=>{
        X(typeof e == "string", "'name' must be a string"), Array.isArray(t) || (t = [
            t
        ]);
        let r = "The ";
        e.endsWith(" argument") ? r += `${e} ` : r += `"${e}" ${e.includes(".") ? "property" : "argument"} `, r += "must be ";
        let i59 = [], o = [], l = [];
        for (let f of t)X(typeof f == "string", "All expected entries have to be of type string"), Oi.includes(f) ? i59.push(f.toLowerCase()) : qi.test(f) ? o.push(f) : (X(f !== "object", 'The value "object" should be written as "Object"'), l.push(f));
        if (o.length > 0) {
            let f = i59.indexOf("object");
            f !== -1 && (i59.splice(i59, f, 1), o.push("Object"));
        }
        if (i59.length > 0) {
            switch(i59.length){
                case 1:
                    r += `of type ${i59[0]}`;
                    break;
                case 2:
                    r += `one of type ${i59[0]} or ${i59[1]}`;
                    break;
                default:
                    {
                        let f = i59.pop();
                        r += `one of type ${i59.join(", ")}, or ${f}`;
                    }
            }
            (o.length > 0 || l.length > 0) && (r += " or ");
        }
        if (o.length > 0) {
            switch(o.length){
                case 1:
                    r += `an instance of ${o[0]}`;
                    break;
                case 2:
                    r += `an instance of ${o[0]} or ${o[1]}`;
                    break;
                default:
                    {
                        let f = o.pop();
                        r += `an instance of ${o.join(", ")}, or ${f}`;
                    }
            }
            l.length > 0 && (r += " or ");
        }
        switch(l.length){
            case 0:
                break;
            case 1:
                l[0].toLowerCase() !== l[0] && (r += "an "), r += `${l[0]}`;
                break;
            case 2:
                r += `one of ${l[0]} or ${l[1]}`;
                break;
            default:
                {
                    let f = l.pop();
                    r += `one of ${l.join(", ")}, or ${f}`;
                }
        }
        if (n == null) r += `. Received ${n}`;
        else if (typeof n == "function" && n.name) r += `. Received function ${n.name}`;
        else if (typeof n == "object") {
            var u;
            (u = n.constructor) !== null && u !== void 0 && u.name ? r += `. Received an instance of ${n.constructor.name}` : r += `. Received ${Re(n, {
                depth: -1
            })}`;
        } else {
            let f = Re(n, {
                colors: !1
            });
            f.length > 25 && (f = `${f.slice(0, 25)}...`), r += `. Received type ${typeof n} (${f})`;
        }
        return r;
    }, TypeError);
    N("ERR_INVALID_ARG_VALUE", (e, t, n = "is invalid")=>{
        let r = Re(t);
        return r.length > 128 && (r = r.slice(0, 128) + "..."), `The ${e.includes(".") ? "property" : "argument"} '${e}' ${n}. Received ${r}`;
    }, TypeError);
    N("ERR_INVALID_RETURN_VALUE", (e, t, n)=>{
        var r;
        let i60 = n != null && (r = n.constructor) !== null && r !== void 0 && r.name ? `instance of ${n.constructor.name}` : `type ${typeof n}`;
        return `Expected ${e} to be returned from the "${t}" function but got ${i60}.`;
    }, TypeError);
    N("ERR_MISSING_ARGS", (...e)=>{
        X(e.length > 0, "At least one arg needs to be specified");
        let t, n = e.length;
        switch(e = (Array.isArray(e) ? e : [
            e
        ]).map((r)=>`"${r}"`
        ).join(" or "), n){
            case 1:
                t += `The ${e[0]} argument`;
                break;
            case 2:
                t += `The ${e[0]} and ${e[1]} arguments`;
                break;
            default:
                {
                    let r = e.pop();
                    t += `The ${e.join(", ")}, and ${r} arguments`;
                }
                break;
        }
        return `${t} must be specified`;
    }, TypeError);
    N("ERR_OUT_OF_RANGE", (e, t, n)=>{
        X(t, 'Missing "range" argument');
        let r;
        return Number.isInteger(n) && Math.abs(n) > 2 ** 32 ? r = Vt(String(n)) : typeof n == "bigint" ? (r = String(n), (n > 2n ** 32n || n < -(2n ** 32n)) && (r = Vt(r)), r += "n") : r = Re(n), `The value of "${e}" is out of range. It must be ${t}. Received ${r}`;
    }, RangeError);
    N("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error);
    N("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
    N("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error);
    N("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
    N("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error);
    N("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    N("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
    N("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
    N("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error);
    N("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
    N("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);
    Kt.exports = {
        AbortError: Qe,
        aggregateTwoErrors: Yt(Pi),
        hideStackFrames: Yt,
        codes: Ae
    };
});
var _e = g((Xf, nn)=>{
    "use strict";
    var { ArrayIsArray: Jt , ArrayPrototypeIncludes: Qt1 , ArrayPrototypeJoin: Zt , ArrayPrototypeMap: ki , NumberIsInteger: et , NumberIsNaN: Wi , NumberMAX_SAFE_INTEGER: Ci , NumberMIN_SAFE_INTEGER: ji , NumberParseInt: $i , ObjectPrototypeHasOwnProperty: vi , RegExpPrototypeExec: Fi , String: Ui , StringPrototypeToUpperCase: Bi , StringPrototypeTrim: Gi  } = m(), { hideStackFrames: k , codes: { ERR_SOCKET_BAD_PORT: Hi , ERR_INVALID_ARG_TYPE: q , ERR_INVALID_ARG_VALUE: me , ERR_OUT_OF_RANGE: J , ERR_UNKNOWN_SIGNAL: zt  }  } = O(), { normalizeEncoding: Vi  } = j(), { isAsyncFunction: Yi , isArrayBufferView: Ki  } = j().types, Xt = {};
    function zi(e) {
        return e === (e | 0);
    }
    function Xi(e) {
        return e === e >>> 0;
    }
    var Ji = /^[0-7]+$/, Qi = "must be a 32-bit unsigned integer or an octal string";
    function Zi(e, t, n) {
        if (typeof e > "u" && (e = n), typeof e == "string") {
            if (Fi(Ji, e) === null) throw new me(t, e, Qi);
            e = $i(e, 8);
        }
        return en1(e, t), e;
    }
    var eo = k((e, t, n = ji, r = Ci)=>{
        if (typeof e != "number") throw new q(t, "number", e);
        if (!et(e)) throw new J(t, "an integer", e);
        if (e < n || e > r) throw new J(t, `>= ${n} && <= ${r}`, e);
    }), to = k((e, t, n = -2147483648, r = 2147483647)=>{
        if (typeof e != "number") throw new q(t, "number", e);
        if (!et(e)) throw new J(t, "an integer", e);
        if (e < n || e > r) throw new J(t, `>= ${n} && <= ${r}`, e);
    }), en1 = k((e, t, n = !1)=>{
        if (typeof e != "number") throw new q(t, "number", e);
        if (!et(e)) throw new J(t, "an integer", e);
        let r = n ? 1 : 0, i61 = 4294967295;
        if (e < r || e > i61) throw new J(t, `>= ${r} && <= ${i61}`, e);
    });
    function tn1(e, t) {
        if (typeof e != "string") throw new q(t, "string", e);
    }
    function no(e, t, n = void 0, r) {
        if (typeof e != "number") throw new q(t, "number", e);
        if (n != null && e < n || r != null && e > r || (n != null || r != null) && Wi(e)) throw new J(t, `${n != null ? `>= ${n}` : ""}${n != null && r != null ? " && " : ""}${r != null ? `<= ${r}` : ""}`, e);
    }
    var ro = k((e, t, n)=>{
        if (!Qt1(n, e)) {
            let r = Zt(ki(n, (o)=>typeof o == "string" ? `'${o}'` : Ui(o)
            ), ", "), i62 = "must be one of: " + r;
            throw new me(t, e, i62);
        }
    });
    function io(e, t) {
        if (typeof e != "boolean") throw new q(t, "boolean", e);
    }
    function Ze(e, t, n) {
        return e == null || !vi(e, t) ? n : e[t];
    }
    var oo = k((e, t, n = null)=>{
        let r = Ze(n, "allowArray", !1), i63 = Ze(n, "allowFunction", !1);
        if (!Ze(n, "nullable", !1) && e === null || !r && Jt(e) || typeof e != "object" && (!i63 || typeof e != "function")) throw new q(t, "Object", e);
    }), lo = k((e, t, n = 0)=>{
        if (!Jt(e)) throw new q(t, "Array", e);
        if (e.length < n) {
            let r = `must be longer than ${n}`;
            throw new me(t, e, r);
        }
    });
    function ao(e, t = "signal") {
        if (tn1(e, t), Xt[e] === void 0) throw Xt[Bi(e)] !== void 0 ? new zt(e + " (signals must use all capital letters)") : new zt(e);
    }
    var fo = k((e, t = "buffer")=>{
        if (!Ki(e)) throw new q(t, [
            "Buffer",
            "TypedArray",
            "DataView"
        ], e);
    });
    function uo(e, t) {
        let n = Vi(t), r = e.length;
        if (n === "hex" && r % 2 !== 0) throw new me("encoding", t, `is invalid for data of length ${r}`);
    }
    function so(e, t = "Port", n = !0) {
        if (typeof e != "number" && typeof e != "string" || typeof e == "string" && Gi(e).length === 0 || +e !== +e >>> 0 || e > 65535 || e === 0 && !n) throw new Hi(t, e, n);
        return e | 0;
    }
    var co = k((e, t)=>{
        if (e !== void 0 && (e === null || typeof e != "object" || !("aborted" in e))) throw new q(t, "AbortSignal", e);
    }), ho = k((e, t)=>{
        if (typeof e != "function") throw new q(t, "Function", e);
    }), bo = k((e, t)=>{
        if (typeof e != "function" || Yi(e)) throw new q(t, "Function", e);
    }), _o = k((e, t)=>{
        if (e !== void 0) throw new q(t, "undefined", e);
    });
    function po(e, t, n) {
        if (!Qt1(n, e)) throw new q(t, `('${Zt(n, "|")}')`, e);
    }
    nn.exports = {
        isInt32: zi,
        isUint32: Xi,
        parseFileMode: Zi,
        validateArray: lo,
        validateBoolean: io,
        validateBuffer: fo,
        validateEncoding: uo,
        validateFunction: ho,
        validateInt32: to,
        validateInteger: eo,
        validateNumber: no,
        validateObject: oo,
        validateOneOf: ro,
        validatePlainFunction: bo,
        validatePort: so,
        validateSignalName: ao,
        validateString: tn1,
        validateUint32: en1,
        validateUndefined: _o,
        validateUnion: po,
        validateAbortSignal: co
    };
});
var V = g((Jf, _n)=>{
    "use strict";
    var { Symbol: Te , SymbolAsyncIterator: rn , SymbolIterator: on1  } = m(), ln = Te("kDestroyed"), an = Te("kIsErrored"), tt = Te("kIsReadable"), fn = Te("kIsDisturbed");
    function Ie(e, t = !1) {
        var n;
        return !!(e && typeof e.pipe == "function" && typeof e.on == "function" && (!t || typeof e.pause == "function" && typeof e.resume == "function") && (!e._writableState || ((n = e._readableState) === null || n === void 0 ? void 0 : n.readable) !== !1) && (!e._writableState || e._readableState));
    }
    function Me(e) {
        var t;
        return !!(e && typeof e.write == "function" && typeof e.on == "function" && (!e._readableState || ((t = e._writableState) === null || t === void 0 ? void 0 : t.writable) !== !1));
    }
    function wo(e) {
        return !!(e && typeof e.pipe == "function" && e._readableState && typeof e.on == "function" && typeof e.write == "function");
    }
    function Q(e) {
        return e && (e._readableState || e._writableState || typeof e.write == "function" && typeof e.on == "function" || typeof e.pipe == "function" && typeof e.on == "function");
    }
    function yo(e, t) {
        return e == null ? !1 : t === !0 ? typeof e[rn] == "function" : t === !1 ? typeof e[on1] == "function" : typeof e[rn] == "function" || typeof e[on1] == "function";
    }
    function Ne(e) {
        if (!Q(e)) return null;
        let t = e._writableState, n = e._readableState, r = t || n;
        return !!(e.destroyed || e[ln] || r != null && r.destroyed);
    }
    function un(e) {
        if (!Me(e)) return null;
        if (e.writableEnded === !0) return !0;
        let t = e._writableState;
        return t != null && t.errored ? !1 : typeof t?.ended != "boolean" ? null : t.ended;
    }
    function go(e, t) {
        if (!Me(e)) return null;
        if (e.writableFinished === !0) return !0;
        let n = e._writableState;
        return n != null && n.errored ? !1 : typeof n?.finished != "boolean" ? null : !!(n.finished || t === !1 && n.ended === !0 && n.length === 0);
    }
    function So(e) {
        if (!Ie(e)) return null;
        if (e.readableEnded === !0) return !0;
        let t = e._readableState;
        return !t || t.errored ? !1 : typeof t?.ended != "boolean" ? null : t.ended;
    }
    function sn(e, t) {
        if (!Ie(e)) return null;
        let n = e._readableState;
        return n != null && n.errored ? !1 : typeof n?.endEmitted != "boolean" ? null : !!(n.endEmitted || t === !1 && n.ended === !0 && n.length === 0);
    }
    function dn(e) {
        return e && e[tt] != null ? e[tt] : typeof e?.readable != "boolean" ? null : Ne(e) ? !1 : Ie(e) && e.readable && !sn(e);
    }
    function cn(e) {
        return typeof e?.writable != "boolean" ? null : Ne(e) ? !1 : Me(e) && e.writable && !un(e);
    }
    function Eo(e, t) {
        return Q(e) ? Ne(e) ? !0 : !(t?.readable !== !1 && dn(e) || t?.writable !== !1 && cn(e)) : null;
    }
    function Ro(e) {
        var t, n;
        return Q(e) ? e.writableErrored ? e.writableErrored : (t = (n = e._writableState) === null || n === void 0 ? void 0 : n.errored) !== null && t !== void 0 ? t : null : null;
    }
    function Ao(e) {
        var t, n;
        return Q(e) ? e.readableErrored ? e.readableErrored : (t = (n = e._readableState) === null || n === void 0 ? void 0 : n.errored) !== null && t !== void 0 ? t : null : null;
    }
    function mo(e) {
        if (!Q(e)) return null;
        if (typeof e.closed == "boolean") return e.closed;
        let t = e._writableState, n = e._readableState;
        return typeof t?.closed == "boolean" || typeof n?.closed == "boolean" ? t?.closed || n?.closed : typeof e._closed == "boolean" && hn(e) ? e._closed : null;
    }
    function hn(e) {
        return typeof e._closed == "boolean" && typeof e._defaultKeepAlive == "boolean" && typeof e._removedConnection == "boolean" && typeof e._removedContLen == "boolean";
    }
    function bn(e) {
        return typeof e._sent100 == "boolean" && hn(e);
    }
    function To(e) {
        var t;
        return typeof e._consuming == "boolean" && typeof e._dumped == "boolean" && ((t = e.req) === null || t === void 0 ? void 0 : t.upgradeOrConnect) === void 0;
    }
    function Io(e) {
        if (!Q(e)) return null;
        let t = e._writableState, n = e._readableState, r = t || n;
        return !r && bn(e) || !!(r && r.autoDestroy && r.emitClose && r.closed === !1);
    }
    function Mo(e) {
        var t;
        return !!(e && ((t = e[fn]) !== null && t !== void 0 ? t : e.readableDidRead || e.readableAborted));
    }
    function No(e) {
        var t, n, r, i64, o, l, u, f, a, c;
        return !!(e && ((t = (n = (r = (i64 = (o = (l = e[an]) !== null && l !== void 0 ? l : e.readableErrored) !== null && o !== void 0 ? o : e.writableErrored) !== null && i64 !== void 0 ? i64 : (u = e._readableState) === null || u === void 0 ? void 0 : u.errorEmitted) !== null && r !== void 0 ? r : (f = e._writableState) === null || f === void 0 ? void 0 : f.errorEmitted) !== null && n !== void 0 ? n : (a = e._readableState) === null || a === void 0 ? void 0 : a.errored) !== null && t !== void 0 ? t : (c = e._writableState) === null || c === void 0 ? void 0 : c.errored));
    }
    _n.exports = {
        kDestroyed: ln,
        isDisturbed: Mo,
        kIsDisturbed: fn,
        isErrored: No,
        kIsErrored: an,
        isReadable: dn,
        kIsReadable: tt,
        isClosed: mo,
        isDestroyed: Ne,
        isDuplexNodeStream: wo,
        isFinished: Eo,
        isIterable: yo,
        isReadableNodeStream: Ie,
        isReadableEnded: So,
        isReadableFinished: sn,
        isReadableErrored: Ao,
        isNodeStream: Q,
        isWritable: cn,
        isWritableNodeStream: Me,
        isWritableEnded: un,
        isWritableFinished: go,
        isWritableErrored: Ro,
        isServerRequest: To,
        isServerResponse: bn,
        willEmitClose: Io
    };
});
var Y = g((Qf, rt)=>{
    var oe = __process$, { AbortError: Do , codes: Oo  } = O(), { ERR_INVALID_ARG_TYPE: qo , ERR_STREAM_PREMATURE_CLOSE: pn  } = Oo, { kEmptyObject: wn , once: Node  } = j(), { validateAbortSignal: xo , validateFunction: Lo , validateObject: Po  } = _e(), { Promise: ko  } = m(), { isClosed: Wo , isReadable: gn , isReadableNodeStream: nt , isReadableFinished: Sn , isReadableErrored: Co , isWritable: En , isWritableNodeStream: Rn , isWritableFinished: An , isWritableErrored: jo , isNodeStream: $o , willEmitClose: vo  } = V();
    function Fo(e) {
        return e.setHeader && typeof e.abort == "function";
    }
    var Uo = ()=>{};
    function mn(e, t, n) {
        var r, i65;
        arguments.length === 2 ? (n = t, t = wn) : t == null ? t = wn : Po(t, "options"), Lo(n, "callback"), xo(t.signal, "options.signal"), n = Node(n);
        let o = (r = t.readable) !== null && r !== void 0 ? r : nt(e), l = (i65 = t.writable) !== null && i65 !== void 0 ? i65 : Rn(e);
        if (!$o(e)) throw new qo("stream", "Stream", e);
        let u = e._writableState, f = e._readableState, a = ()=>{
            e.writable || b();
        }, c = vo(e) && nt(e) === o && Rn(e) === l, s = An(e, !1), b = ()=>{
            s = !0, e.destroyed && (c = !1), !(c && (!e.readable || o)) && (!o || d) && n.call(e);
        }, d = Sn(e, !1), h = ()=>{
            d = !0, e.destroyed && (c = !1), !(c && (!e.writable || l)) && (!l || s) && n.call(e);
        }, D = (M)=>{
            n.call(e, M);
        }, L = Wo(e), _ = ()=>{
            L = !0;
            let M = jo(e) || Co(e);
            if (M && typeof M != "boolean") return n.call(e, M);
            if (o && !d && nt(e, !0) && !Sn(e, !1)) return n.call(e, new pn);
            if (l && !s && !An(e, !1)) return n.call(e, new pn);
            n.call(e);
        }, p = ()=>{
            e.req.on("finish", b);
        };
        Fo(e) ? (e.on("complete", b), c || e.on("abort", _), e.req ? p() : e.on("request", p)) : l && !u && (e.on("end", a), e.on("close", a)), !c && typeof e.aborted == "boolean" && e.on("aborted", _), e.on("end", h), e.on("finish", b), t.error !== !1 && e.on("error", D), e.on("close", _), L ? oe.nextTick(_) : u != null && u.errorEmitted || f != null && f.errorEmitted ? c || oe.nextTick(_) : (!o && (!c || gn(e)) && (s || En(e) === !1) || !l && (!c || En(e)) && (d || gn(e) === !1) || f && e.req && e.aborted) && oe.nextTick(_);
        let I = ()=>{
            n = Uo, e.removeListener("aborted", _), e.removeListener("complete", b), e.removeListener("abort", _), e.removeListener("request", p), e.req && e.req.removeListener("finish", b), e.removeListener("end", a), e.removeListener("close", a), e.removeListener("finish", b), e.removeListener("end", h), e.removeListener("error", D), e.removeListener("close", _);
        };
        if (t.signal && !L) {
            let M = ()=>{
                let F1 = n;
                I(), F1.call(e, new Do(void 0, {
                    cause: t.signal.reason
                }));
            };
            if (t.signal.aborted) oe.nextTick(M);
            else {
                let F2 = n;
                n = Node((...re)=>{
                    t.signal.removeEventListener("abort", M), F2.apply(e, re);
                }), t.signal.addEventListener("abort", M);
            }
        }
        return I;
    }
    function Bo(e, t) {
        return new ko((n, r)=>{
            mn(e, t, (i66)=>{
                i66 ? r(i66) : n();
            });
        });
    }
    rt.exports = mn;
    rt.exports.finished = Bo;
});
var xn = g((Zf, lt)=>{
    "use strict";
    var Nn1 = globalThis.AbortController, { codes: { ERR_INVALID_ARG_TYPE: pe , ERR_MISSING_ARGS: Go , ERR_OUT_OF_RANGE: Ho  } , AbortError: $  } = O(), { validateAbortSignal: le , validateInteger: Vo , validateObject: ae  } = _e(), Yo = m().Symbol("kWeak"), { finished: Ko  } = Y(), { ArrayPrototypePush: zo , MathFloor: Xo , Number: Jo , NumberIsNaN: Qo , Promise: Tn1 , PromiseReject: In , PromisePrototypeThen: Zo , Symbol: Dn  } = m(), De = Dn("kEmpty"), Mn1 = Dn("kEof");
    function Oe(e, t) {
        if (typeof e != "function") throw new pe("fn", [
            "Function",
            "AsyncFunction"
        ], e);
        t != null && ae(t, "options"), t?.signal != null && le(t.signal, "options.signal");
        let n = 1;
        return t?.concurrency != null && (n = Xo(t.concurrency)), Vo(n, "concurrency", 1), (async function*() {
            var i67, o;
            let l = new Nn1, u = this, f = [], a = l.signal, c = {
                signal: a
            }, s = ()=>l.abort()
            ;
            t != null && (i67 = t.signal) !== null && i67 !== void 0 && i67.aborted && s(), t == null || (o = t.signal) === null || o === void 0 || o.addEventListener("abort", s);
            let b, d, h = !1;
            function D() {
                h = !0;
            }
            async function L() {
                try {
                    for await (let I of u){
                        var _;
                        if (h) return;
                        if (a.aborted) throw new $;
                        try {
                            I = e(I, c);
                        } catch (M1) {
                            I = In(M1);
                        }
                        I !== De && (typeof ((_ = I) === null || _ === void 0 ? void 0 : _.catch) == "function" && I.catch(D), f.push(I), b && (b(), b = null), !h && f.length && f.length >= n && await new Tn1((M)=>{
                            d = M;
                        }));
                    }
                    f.push(Mn1);
                } catch (I) {
                    let M = In(I);
                    Zo(M, void 0, D), f.push(M);
                } finally{
                    var p;
                    h = !0, b && (b(), b = null), t == null || (p = t.signal) === null || p === void 0 || p.removeEventListener("abort", s);
                }
            }
            L();
            try {
                for(;;){
                    for(; f.length > 0;){
                        let _ = await f[0];
                        if (_ === Mn1) return;
                        if (a.aborted) throw new $;
                        _ !== De && (yield _), f.shift(), d && (d(), d = null);
                    }
                    await new Tn1((_)=>{
                        b = _;
                    });
                }
            } finally{
                l.abort(), h = !0, d && (d(), d = null);
            }
        }).call(this);
    }
    function el(e = void 0) {
        return e != null && ae(e, "options"), e?.signal != null && le(e.signal, "options.signal"), (async function*() {
            let n = 0;
            for await (let i68 of this){
                var r;
                if (e != null && (r = e.signal) !== null && r !== void 0 && r.aborted) throw new $({
                    cause: e.signal.reason
                });
                yield [
                    n++,
                    i68
                ];
            }
        }).call(this);
    }
    async function On1(e, t = void 0) {
        for await (let n of ot.call(this, e, t))return !0;
        return !1;
    }
    async function tl(e, t = void 0) {
        if (typeof e != "function") throw new pe("fn", [
            "Function",
            "AsyncFunction"
        ], e);
        return !await On1.call(this, async (...n)=>!await e(...n)
        , t);
    }
    async function nl(e, t) {
        for await (let n of ot.call(this, e, t))return n;
    }
    async function rl(e, t) {
        if (typeof e != "function") throw new pe("fn", [
            "Function",
            "AsyncFunction"
        ], e);
        async function n(r, i69) {
            return await e(r, i69), De;
        }
        for await (let r1 of Oe.call(this, n, t));
    }
    function ot(e, t) {
        if (typeof e != "function") throw new pe("fn", [
            "Function",
            "AsyncFunction"
        ], e);
        async function n(r, i70) {
            return await e(r, i70) ? r : De;
        }
        return Oe.call(this, n, t);
    }
    var it = class extends Go {
        constructor(){
            super("reduce"), this.message = "Reduce of an empty stream requires an initial value";
        }
    };
    async function il(e, t, n) {
        var r;
        if (typeof e != "function") throw new pe("reducer", [
            "Function",
            "AsyncFunction"
        ], e);
        n != null && ae(n, "options"), n?.signal != null && le(n.signal, "options.signal");
        let i71 = arguments.length > 1;
        if (n != null && (r = n.signal) !== null && r !== void 0 && r.aborted) {
            let a = new $(void 0, {
                cause: n.signal.reason
            });
            throw this.once("error", ()=>{}), await Ko(this.destroy(a)), a;
        }
        let o = new Nn1, l = o.signal;
        if (n != null && n.signal) {
            let a = {
                once: !0,
                [Yo]: this
            };
            n.signal.addEventListener("abort", ()=>o.abort()
            , a);
        }
        let u = !1;
        try {
            for await (let a of this){
                var f;
                if (u = !0, n != null && (f = n.signal) !== null && f !== void 0 && f.aborted) throw new $;
                i71 ? t = await e(t, a, {
                    signal: l
                }) : (t = a, i71 = !0);
            }
            if (!u && !i71) throw new it;
        } finally{
            o.abort();
        }
        return t;
    }
    async function ol(e) {
        e != null && ae(e, "options"), e?.signal != null && le(e.signal, "options.signal");
        let t = [];
        for await (let r of this){
            var n;
            if (e != null && (n = e.signal) !== null && n !== void 0 && n.aborted) throw new $(void 0, {
                cause: e.signal.reason
            });
            zo(t, r);
        }
        return t;
    }
    function ll(e, t) {
        let n = Oe.call(this, e, t);
        return (async function*() {
            for await (let i72 of n)yield* i72;
        }).call(this);
    }
    function qn1(e) {
        if (e = Jo(e), Qo(e)) return 0;
        if (e < 0) throw new Ho("number", ">= 0", e);
        return e;
    }
    function al(e, t = void 0) {
        return t != null && ae(t, "options"), t?.signal != null && le(t.signal, "options.signal"), e = qn1(e), (async function*() {
            var r;
            if (t != null && (r = t.signal) !== null && r !== void 0 && r.aborted) throw new $;
            for await (let o of this){
                var i73;
                if (t != null && (i73 = t.signal) !== null && i73 !== void 0 && i73.aborted) throw new $;
                e-- <= 0 && (yield o);
            }
        }).call(this);
    }
    function fl(e, t = void 0) {
        return t != null && ae(t, "options"), t?.signal != null && le(t.signal, "options.signal"), e = qn1(e), (async function*() {
            var r;
            if (t != null && (r = t.signal) !== null && r !== void 0 && r.aborted) throw new $;
            for await (let o of this){
                var i74;
                if (t != null && (i74 = t.signal) !== null && i74 !== void 0 && i74.aborted) throw new $;
                if (e-- > 0) yield o;
                else return;
            }
        }).call(this);
    }
    lt.exports.streamReturningOperators = {
        asIndexedPairs: el,
        drop: al,
        filter: ot,
        flatMap: ll,
        map: Oe,
        take: fl
    };
    lt.exports.promiseReturningOperators = {
        every: tl,
        forEach: rl,
        reduce: il,
        toArray: ol,
        some: On1,
        find: nl
    };
});
var Z = g((eu, vn)=>{
    "use strict";
    var K = __process$, { aggregateTwoErrors: ul , codes: { ERR_MULTIPLE_CALLBACK: sl  } , AbortError: dl  } = O(), { Symbol: kn1  } = m(), { kDestroyed: cl , isDestroyed: hl , isFinished: bl , isServerRequest: _l  } = V(), Wn1 = kn1("kDestroy"), at = kn1("kConstruct");
    function Cn1(e, t, n) {
        e && (e.stack, t && !t.errored && (t.errored = e), n && !n.errored && (n.errored = e));
    }
    function pl(e, t) {
        let n = this._readableState, r = this._writableState, i75 = r || n;
        return r && r.destroyed || n && n.destroyed ? (typeof t == "function" && t(), this) : (Cn1(e, r, n), r && (r.destroyed = !0), n && (n.destroyed = !0), i75.constructed ? Ln(this, e, t) : this.once(Wn1, function(o) {
            Ln(this, ul(o, e), t);
        }), this);
    }
    function Ln(e, t, n) {
        let r = !1;
        function i76(o) {
            if (r) return;
            r = !0;
            let l = e._readableState, u = e._writableState;
            Cn1(o, u, l), u && (u.closed = !0), l && (l.closed = !0), typeof n == "function" && n(o), o ? K.nextTick(wl, e, o) : K.nextTick(jn, e);
        }
        try {
            e._destroy(t || null, i76);
        } catch (o) {
            i76(o);
        }
    }
    function wl(e, t) {
        ft(e, t), jn(e);
    }
    function jn(e) {
        let t = e._readableState, n = e._writableState;
        n && (n.closeEmitted = !0), t && (t.closeEmitted = !0), (n && n.emitClose || t && t.emitClose) && e.emit("close");
    }
    function ft(e, t) {
        let n = e._readableState, r = e._writableState;
        r && r.errorEmitted || n && n.errorEmitted || (r && (r.errorEmitted = !0), n && (n.errorEmitted = !0), e.emit("error", t));
    }
    function yl() {
        let e = this._readableState, t = this._writableState;
        e && (e.constructed = !0, e.closed = !1, e.closeEmitted = !1, e.destroyed = !1, e.errored = null, e.errorEmitted = !1, e.reading = !1, e.ended = e.readable === !1, e.endEmitted = e.readable === !1), t && (t.constructed = !0, t.destroyed = !1, t.closed = !1, t.closeEmitted = !1, t.errored = null, t.errorEmitted = !1, t.finalCalled = !1, t.prefinished = !1, t.ended = t.writable === !1, t.ending = t.writable === !1, t.finished = t.writable === !1);
    }
    function ut(e, t, n) {
        let r = e._readableState, i77 = e._writableState;
        if (i77 && i77.destroyed || r && r.destroyed) return this;
        r && r.autoDestroy || i77 && i77.autoDestroy ? e.destroy(t) : t && (t.stack, i77 && !i77.errored && (i77.errored = t), r && !r.errored && (r.errored = t), n ? K.nextTick(ft, e, t) : ft(e, t));
    }
    function gl(e, t) {
        if (typeof e._construct != "function") return;
        let n = e._readableState, r = e._writableState;
        n && (n.constructed = !1), r && (r.constructed = !1), e.once(at, t), !(e.listenerCount(at) > 1) && K.nextTick(Sl, e);
    }
    function Sl(e) {
        let t = !1;
        function n(r) {
            if (t) {
                ut(e, r ?? new sl);
                return;
            }
            t = !0;
            let i78 = e._readableState, o = e._writableState, l = o || i78;
            i78 && (i78.constructed = !0), o && (o.constructed = !0), l.destroyed ? e.emit(Wn1, r) : r ? ut(e, r, !0) : K.nextTick(El, e);
        }
        try {
            e._construct(n);
        } catch (r) {
            n(r);
        }
    }
    function El(e) {
        e.emit(at);
    }
    function Pn1(e) {
        return e && e.setHeader && typeof e.abort == "function";
    }
    function $n(e) {
        e.emit("close");
    }
    function Rl(e, t) {
        e.emit("error", t), K.nextTick($n, e);
    }
    function Al(e, t) {
        !e || hl(e) || (!t && !bl(e) && (t = new dl), _l(e) ? (e.socket = null, e.destroy(t)) : Pn1(e) ? e.abort() : Pn1(e.req) ? e.req.abort() : typeof e.destroy == "function" ? e.destroy(t) : typeof e.close == "function" ? e.close() : t ? K.nextTick(Rl, e, t) : K.nextTick($n, e), e.destroyed || (e[cl] = !0));
    }
    vn.exports = {
        construct: gl,
        destroyer: Al,
        destroy: pl,
        undestroy: yl,
        errorOrDestroy: ut
    };
});
var Le = g((tu, Un)=>{
    "use strict";
    var { ArrayIsArray: ml , ObjectSetPrototypeOf: Fn1  } = m(), { EventEmitter: qe  } = EventEmitter;
    function xe(e) {
        qe.call(this, e);
    }
    Fn1(xe.prototype, qe.prototype);
    Fn1(xe, qe);
    xe.prototype.pipe = function(e, t) {
        let n = this;
        function r(c) {
            e.writable && e.write(c) === !1 && n.pause && n.pause();
        }
        n.on("data", r);
        function i79() {
            n.readable && n.resume && n.resume();
        }
        e.on("drain", i79), !e._isStdio && (!t || t.end !== !1) && (n.on("end", l), n.on("close", u));
        let o = !1;
        function l() {
            o || (o = !0, e.end());
        }
        function u() {
            o || (o = !0, typeof e.destroy == "function" && e.destroy());
        }
        function f(c) {
            a(), qe.listenerCount(this, "error") === 0 && this.emit("error", c);
        }
        st(n, "error", f), st(e, "error", f);
        function a() {
            n.removeListener("data", r), e.removeListener("drain", i79), n.removeListener("end", l), n.removeListener("close", u), n.removeListener("error", f), e.removeListener("error", f), n.removeListener("end", a), n.removeListener("close", a), e.removeListener("close", a);
        }
        return n.on("end", a), n.on("close", a), e.on("close", a), e.emit("pipe", n), e;
    };
    function st(e, t, n) {
        if (typeof e.prependListener == "function") return e.prependListener(t, n);
        !e._events || !e._events[t] ? e.on(t, n) : ml(e._events[t]) ? e._events[t].unshift(n) : e._events[t] = [
            n,
            e._events[t]
        ];
    }
    Un.exports = {
        Stream: xe,
        prependListener: st
    };
});
var ke = g((nu, Pe)=>{
    "use strict";
    var { AbortError: Tl , codes: Il  } = O(), Ml = Y(), { ERR_INVALID_ARG_TYPE: Bn  } = Il, Nl = (e, t)=>{
        if (typeof e != "object" || !("aborted" in e)) throw new Bn(t, "AbortSignal", e);
    };
    function Dl(e) {
        return !!(e && typeof e.pipe == "function");
    }
    Pe.exports.addAbortSignal = function(t, n) {
        if (Nl(t, "signal"), !Dl(n)) throw new Bn("stream", "stream.Stream", n);
        return Pe.exports.addAbortSignalNoValidate(t, n);
    };
    Pe.exports.addAbortSignalNoValidate = function(e, t) {
        if (typeof e != "object" || !("aborted" in e)) return t;
        let n = ()=>{
            t.destroy(new Tl(void 0, {
                cause: e.reason
            }));
        };
        return e.aborted ? n() : (e.addEventListener("abort", n), Ml(t, ()=>e.removeEventListener("abort", n)
        )), t;
    };
});
var Vn = g((iu, Hn)=>{
    "use strict";
    var { StringPrototypeSlice: Gn , SymbolIterator: Ol , TypedArrayPrototypeSet: We , Uint8Array: ql  } = m(), { Buffer: dt  } = __default3, { inspect: xl  } = j();
    Hn.exports = class {
        constructor(){
            this.head = null, this.tail = null, this.length = 0;
        }
        push(t) {
            let n = {
                data: t,
                next: null
            };
            this.length > 0 ? this.tail.next = n : this.head = n, this.tail = n, ++this.length;
        }
        unshift(t) {
            let n = {
                data: t,
                next: this.head
            };
            this.length === 0 && (this.tail = n), this.head = n, ++this.length;
        }
        shift() {
            if (this.length === 0) return;
            let t = this.head.data;
            return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, t;
        }
        clear() {
            this.head = this.tail = null, this.length = 0;
        }
        join(t) {
            if (this.length === 0) return "";
            let n = this.head, r = "" + n.data;
            for(; (n = n.next) !== null;)r += t + n.data;
            return r;
        }
        concat(t) {
            if (this.length === 0) return dt.alloc(0);
            let n = dt.allocUnsafe(t >>> 0), r = this.head, i80 = 0;
            for(; r;)We(n, r.data, i80), i80 += r.data.length, r = r.next;
            return n;
        }
        consume(t, n) {
            let r = this.head.data;
            if (t < r.length) {
                let i81 = r.slice(0, t);
                return this.head.data = r.slice(t), i81;
            }
            return t === r.length ? this.shift() : n ? this._getString(t) : this._getBuffer(t);
        }
        first() {
            return this.head.data;
        }
        *[Ol]() {
            for(let t = this.head; t; t = t.next)yield t.data;
        }
        _getString(t) {
            let n = "", r = this.head, i82 = 0;
            do {
                let o = r.data;
                if (t > o.length) n += o, t -= o.length;
                else {
                    t === o.length ? (n += o, ++i82, r.next ? this.head = r.next : this.head = this.tail = null) : (n += Gn(o, 0, t), this.head = r, r.data = Gn(o, t));
                    break;
                }
                ++i82;
            }while ((r = r.next) !== null)
            return this.length -= i82, n;
        }
        _getBuffer(t) {
            let n = dt.allocUnsafe(t), r = t, i83 = this.head, o = 0;
            do {
                let l = i83.data;
                if (t > l.length) We(n, l, r - t), t -= l.length;
                else {
                    t === l.length ? (We(n, l, r - t), ++o, i83.next ? this.head = i83.next : this.head = this.tail = null) : (We(n, new ql(l.buffer, l.byteOffset, t), r - t), this.head = i83, i83.data = l.slice(t));
                    break;
                }
                ++o;
            }while ((i83 = i83.next) !== null)
            return this.length -= o, n;
        }
        [Symbol.for("nodejs.util.inspect.custom")](t, n) {
            return xl(this, {
                ...n,
                depth: 0,
                customInspect: !1
            });
        }
    };
});
var Ce = g((ou, Kn)=>{
    "use strict";
    var { MathFloor: Ll , NumberIsInteger: Pl  } = m(), { ERR_INVALID_ARG_VALUE: kl  } = O().codes;
    function Wl(e, t, n) {
        return e.highWaterMark != null ? e.highWaterMark : t ? e[n] : null;
    }
    function Yn(e) {
        return e ? 16 : 16 * 1024;
    }
    function Cl(e, t, n, r) {
        let i84 = Wl(t, r, n);
        if (i84 != null) {
            if (!Pl(i84) || i84 < 0) {
                let o = r ? `options.${n}` : "options.highWaterMark";
                throw new kl(o, i84);
            }
            return Ll(i84);
        }
        return Yn(e.objectMode);
    }
    Kn.exports = {
        getHighWaterMark: Cl,
        getDefaultHighWaterMark: Yn
    };
});
var ct = g((lu, Qn)=>{
    "use strict";
    var zn = __process$, { PromisePrototypeThen: jl , SymbolAsyncIterator: Xn , SymbolIterator: Jn  } = m(), { Buffer: $l  } = __default3, { ERR_INVALID_ARG_TYPE: vl , ERR_STREAM_NULL_VALUES: Fl  } = O().codes;
    function Ul(e, t, n) {
        let r;
        if (typeof t == "string" || t instanceof $l) return new e({
            objectMode: !0,
            ...n,
            read () {
                this.push(t), this.push(null);
            }
        });
        let i85;
        if (t && t[Xn]) i85 = !0, r = t[Xn]();
        else if (t && t[Jn]) i85 = !1, r = t[Jn]();
        else throw new vl("iterable", [
            "Iterable"
        ], t);
        let o = new e({
            objectMode: !0,
            highWaterMark: 1,
            ...n
        }), l = !1;
        o._read = function() {
            l || (l = !0, f());
        }, o._destroy = function(a, c) {
            jl(u(a), ()=>zn.nextTick(c, a)
            , (s)=>zn.nextTick(c, s || a)
            );
        };
        async function u(a) {
            let c = a != null, s = typeof r.throw == "function";
            if (c && s) {
                let { value: b , done: d  } = await r.throw(a);
                if (await b, d) return;
            }
            if (typeof r.return == "function") {
                let { value: b  } = await r.return();
                await b;
            }
        }
        async function f() {
            for(;;){
                try {
                    let { value: a , done: c  } = i85 ? await r.next() : r.next();
                    if (c) o.push(null);
                    else {
                        let s = a && typeof a.then == "function" ? await a : a;
                        if (s === null) throw l = !1, new Fl;
                        if (o.push(s)) continue;
                        l = !1;
                    }
                } catch (a) {
                    o.destroy(a);
                }
                break;
            }
        }
        return o;
    }
    Qn.exports = Ul;
});
var we = g((au, dr)=>{
    var W = __process$, { ArrayPrototypeIndexOf: Bl , NumberIsInteger: Gl , NumberIsNaN: Hl , NumberParseInt: Vl , ObjectDefineProperties: tr , ObjectKeys: Yl , ObjectSetPrototypeOf: nr , Promise: Kl , SafeSet: zl , SymbolAsyncIterator: Xl , Symbol: Jl  } = m();
    dr.exports = w;
    w.ReadableState = yt;
    var { EventEmitter: Ql  } = EventEmitter, { Stream: z , prependListener: Zl  } = Le(), { Buffer: ht  } = __default3, { addAbortSignal: ea  } = ke(), ta = Y(), y = j().debuglog("stream", (e)=>{
        y = e;
    }), na = Vn(), ue = Z(), { getHighWaterMark: ra , getDefaultHighWaterMark: ia  } = Ce(), { aggregateTwoErrors: Zn , codes: { ERR_INVALID_ARG_TYPE: oa , ERR_METHOD_NOT_IMPLEMENTED: la , ERR_OUT_OF_RANGE: aa , ERR_STREAM_PUSH_AFTER_EOF: fa , ERR_STREAM_UNSHIFT_AFTER_END_EVENT: ua  }  } = O(), { validateObject: sa  } = _e(), ee = Jl("kPaused"), { StringDecoder: rr  } = __default4, da = ct();
    nr(w.prototype, z.prototype);
    nr(w, z);
    var bt = ()=>{}, { errorOrDestroy: fe  } = ue;
    function yt(e, t, n) {
        typeof n != "boolean" && (n = t instanceof v()), this.objectMode = !!(e && e.objectMode), n && (this.objectMode = this.objectMode || !!(e && e.readableObjectMode)), this.highWaterMark = e ? ra(this, e, "readableHighWaterMark", n) : ia(!1), this.buffer = new na, this.length = 0, this.pipes = [], this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.constructed = !0, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this[ee] = null, this.errorEmitted = !1, this.emitClose = !e || e.emitClose !== !1, this.autoDestroy = !e || e.autoDestroy !== !1, this.destroyed = !1, this.errored = null, this.closed = !1, this.closeEmitted = !1, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.multiAwaitDrain = !1, this.readingMore = !1, this.dataEmitted = !1, this.decoder = null, this.encoding = null, e && e.encoding && (this.decoder = new rr(e.encoding), this.encoding = e.encoding);
    }
    function w(e) {
        if (!(this instanceof w)) return new w(e);
        let t = this instanceof v();
        this._readableState = new yt(e, this, t), e && (typeof e.read == "function" && (this._read = e.read), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.construct == "function" && (this._construct = e.construct), e.signal && !t && ea(e.signal, this)), z.call(this, e), ue.construct(this, ()=>{
            this._readableState.needReadable && je(this, this._readableState);
        });
    }
    w.prototype.destroy = ue.destroy;
    w.prototype._undestroy = ue.undestroy;
    w.prototype._destroy = function(e, t) {
        t(e);
    };
    w.prototype[Ql.captureRejectionSymbol] = function(e) {
        this.destroy(e);
    };
    w.prototype.push = function(e, t) {
        return ir(this, e, t, !1);
    };
    w.prototype.unshift = function(e, t) {
        return ir(this, e, t, !0);
    };
    function ir(e, t, n, r) {
        y("readableAddChunk", t);
        let i86 = e._readableState, o;
        if (i86.objectMode || (typeof t == "string" ? (n = n || i86.defaultEncoding, i86.encoding !== n && (r && i86.encoding ? t = ht.from(t, n).toString(i86.encoding) : (t = ht.from(t, n), n = ""))) : t instanceof ht ? n = "" : z._isUint8Array(t) ? (t = z._uint8ArrayToBuffer(t), n = "") : t != null && (o = new oa("chunk", [
            "string",
            "Buffer",
            "Uint8Array"
        ], t))), o) fe(e, o);
        else if (t === null) i86.reading = !1, ba(e, i86);
        else if (i86.objectMode || t && t.length > 0) if (r) if (i86.endEmitted) fe(e, new ua);
        else {
            if (i86.destroyed || i86.errored) return !1;
            _t(e, i86, t, !0);
        }
        else if (i86.ended) fe(e, new fa);
        else {
            if (i86.destroyed || i86.errored) return !1;
            i86.reading = !1, i86.decoder && !n ? (t = i86.decoder.write(t), i86.objectMode || t.length !== 0 ? _t(e, i86, t, !1) : je(e, i86)) : _t(e, i86, t, !1);
        }
        else r || (i86.reading = !1, je(e, i86));
        return !i86.ended && (i86.length < i86.highWaterMark || i86.length === 0);
    }
    function _t(e, t, n, r) {
        t.flowing && t.length === 0 && !t.sync && e.listenerCount("data") > 0 ? (t.multiAwaitDrain ? t.awaitDrainWriters.clear() : t.awaitDrainWriters = null, t.dataEmitted = !0, e.emit("data", n)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), t.needReadable && $e(e)), je(e, t);
    }
    w.prototype.isPaused = function() {
        let e = this._readableState;
        return e[ee] === !0 || e.flowing === !1;
    };
    w.prototype.setEncoding = function(e) {
        let t = new rr(e);
        this._readableState.decoder = t, this._readableState.encoding = this._readableState.decoder.encoding;
        let n = this._readableState.buffer, r = "";
        for (let i87 of n)r += t.write(i87);
        return n.clear(), r !== "" && n.push(r), this._readableState.length = r.length, this;
    };
    var ca = 1073741824;
    function ha(e) {
        if (e > ca) throw new aa("size", "<= 1GiB", e);
        return e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++, e;
    }
    function er(e, t) {
        return e <= 0 || t.length === 0 && t.ended ? 0 : t.objectMode ? 1 : Hl(e) ? t.flowing && t.length ? t.buffer.first().length : t.length : e <= t.length ? e : t.ended ? t.length : 0;
    }
    w.prototype.read = function(e) {
        y("read", e), e === void 0 ? e = NaN : Gl(e) || (e = Vl(e, 10));
        let t = this._readableState, n = e;
        if (e > t.highWaterMark && (t.highWaterMark = ha(e)), e !== 0 && (t.emittedReadable = !1), e === 0 && t.needReadable && ((t.highWaterMark !== 0 ? t.length >= t.highWaterMark : t.length > 0) || t.ended)) return y("read: emitReadable", t.length, t.ended), t.length === 0 && t.ended ? pt(this) : $e(this), null;
        if (e = er(e, t), e === 0 && t.ended) return t.length === 0 && pt(this), null;
        let r = t.needReadable;
        if (y("need readable", r), (t.length === 0 || t.length - e < t.highWaterMark) && (r = !0, y("length less than watermark", r)), t.ended || t.reading || t.destroyed || t.errored || !t.constructed) r = !1, y("reading, ended or constructing", r);
        else if (r) {
            y("do read"), t.reading = !0, t.sync = !0, t.length === 0 && (t.needReadable = !0);
            try {
                this._read(t.highWaterMark);
            } catch (o) {
                fe(this, o);
            }
            t.sync = !1, t.reading || (e = er(n, t));
        }
        let i88;
        return e > 0 ? i88 = ur(e, t) : i88 = null, i88 === null ? (t.needReadable = t.length <= t.highWaterMark, e = 0) : (t.length -= e, t.multiAwaitDrain ? t.awaitDrainWriters.clear() : t.awaitDrainWriters = null), t.length === 0 && (t.ended || (t.needReadable = !0), n !== e && t.ended && pt(this)), i88 !== null && !t.errorEmitted && !t.closeEmitted && (t.dataEmitted = !0, this.emit("data", i88)), i88;
    };
    function ba(e, t) {
        if (y("onEofChunk"), !t.ended) {
            if (t.decoder) {
                let n = t.decoder.end();
                n && n.length && (t.buffer.push(n), t.length += t.objectMode ? 1 : n.length);
            }
            t.ended = !0, t.sync ? $e(e) : (t.needReadable = !1, t.emittedReadable = !0, or(e));
        }
    }
    function $e(e) {
        let t = e._readableState;
        y("emitReadable", t.needReadable, t.emittedReadable), t.needReadable = !1, t.emittedReadable || (y("emitReadable", t.flowing), t.emittedReadable = !0, W.nextTick(or, e));
    }
    function or(e) {
        let t = e._readableState;
        y("emitReadable_", t.destroyed, t.length, t.ended), !t.destroyed && !t.errored && (t.length || t.ended) && (e.emit("readable"), t.emittedReadable = !1), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, ar(e);
    }
    function je(e, t) {
        !t.readingMore && t.constructed && (t.readingMore = !0, W.nextTick(_a, e, t));
    }
    function _a(e, t) {
        for(; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && t.length === 0);){
            let n = t.length;
            if (y("maybeReadMore read 0"), e.read(0), n === t.length) break;
        }
        t.readingMore = !1;
    }
    w.prototype._read = function(e) {
        throw new la("_read()");
    };
    w.prototype.pipe = function(e, t) {
        let n = this, r = this._readableState;
        r.pipes.length === 1 && (r.multiAwaitDrain || (r.multiAwaitDrain = !0, r.awaitDrainWriters = new zl(r.awaitDrainWriters ? [
            r.awaitDrainWriters
        ] : []))), r.pipes.push(e), y("pipe count=%d opts=%j", r.pipes.length, t);
        let o = (!t || t.end !== !1) && e !== W.stdout && e !== W.stderr ? u : L;
        r.endEmitted ? W.nextTick(o) : n.once("end", o), e.on("unpipe", l);
        function l(_, p) {
            y("onunpipe"), _ === n && p && p.hasUnpiped === !1 && (p.hasUnpiped = !0, c());
        }
        function u() {
            y("onend"), e.end();
        }
        let f, a = !1;
        function c() {
            y("cleanup"), e.removeListener("close", h), e.removeListener("finish", D), f && e.removeListener("drain", f), e.removeListener("error", d), e.removeListener("unpipe", l), n.removeListener("end", u), n.removeListener("end", L), n.removeListener("data", b), a = !0, f && r.awaitDrainWriters && (!e._writableState || e._writableState.needDrain) && f();
        }
        function s() {
            a || (r.pipes.length === 1 && r.pipes[0] === e ? (y("false write response, pause", 0), r.awaitDrainWriters = e, r.multiAwaitDrain = !1) : r.pipes.length > 1 && r.pipes.includes(e) && (y("false write response, pause", r.awaitDrainWriters.size), r.awaitDrainWriters.add(e)), n.pause()), f || (f = pa(n, e), e.on("drain", f));
        }
        n.on("data", b);
        function b(_) {
            y("ondata");
            let p = e.write(_);
            y("dest.write", p), p === !1 && s();
        }
        function d(_) {
            if (y("onerror", _), L(), e.removeListener("error", d), e.listenerCount("error") === 0) {
                let p = e._writableState || e._readableState;
                p && !p.errorEmitted ? fe(e, _) : e.emit("error", _);
            }
        }
        Zl(e, "error", d);
        function h() {
            e.removeListener("finish", D), L();
        }
        e.once("close", h);
        function D() {
            y("onfinish"), e.removeListener("close", h), L();
        }
        e.once("finish", D);
        function L() {
            y("unpipe"), n.unpipe(e);
        }
        return e.emit("pipe", n), e.writableNeedDrain === !0 ? r.flowing && s() : r.flowing || (y("pipe resume"), n.resume()), e;
    };
    function pa(e, t) {
        return function() {
            let r = e._readableState;
            r.awaitDrainWriters === t ? (y("pipeOnDrain", 1), r.awaitDrainWriters = null) : r.multiAwaitDrain && (y("pipeOnDrain", r.awaitDrainWriters.size), r.awaitDrainWriters.delete(t)), (!r.awaitDrainWriters || r.awaitDrainWriters.size === 0) && e.listenerCount("data") && e.resume();
        };
    }
    w.prototype.unpipe = function(e) {
        let t = this._readableState, n = {
            hasUnpiped: !1
        };
        if (t.pipes.length === 0) return this;
        if (!e) {
            let i89 = t.pipes;
            t.pipes = [], this.pause();
            for(let o = 0; o < i89.length; o++)i89[o].emit("unpipe", this, {
                hasUnpiped: !1
            });
            return this;
        }
        let r = Bl(t.pipes, e);
        return r === -1 ? this : (t.pipes.splice(r, 1), t.pipes.length === 0 && this.pause(), e.emit("unpipe", this, n), this);
    };
    w.prototype.on = function(e, t) {
        let n = z.prototype.on.call(this, e, t), r = this._readableState;
        return e === "data" ? (r.readableListening = this.listenerCount("readable") > 0, r.flowing !== !1 && this.resume()) : e === "readable" && !r.endEmitted && !r.readableListening && (r.readableListening = r.needReadable = !0, r.flowing = !1, r.emittedReadable = !1, y("on readable", r.length, r.reading), r.length ? $e(this) : r.reading || W.nextTick(wa, this)), n;
    };
    w.prototype.addListener = w.prototype.on;
    w.prototype.removeListener = function(e, t) {
        let n = z.prototype.removeListener.call(this, e, t);
        return e === "readable" && W.nextTick(lr, this), n;
    };
    w.prototype.off = w.prototype.removeListener;
    w.prototype.removeAllListeners = function(e) {
        let t = z.prototype.removeAllListeners.apply(this, arguments);
        return (e === "readable" || e === void 0) && W.nextTick(lr, this), t;
    };
    function lr(e) {
        let t = e._readableState;
        t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && t[ee] === !1 ? t.flowing = !0 : e.listenerCount("data") > 0 ? e.resume() : t.readableListening || (t.flowing = null);
    }
    function wa(e) {
        y("readable nexttick read 0"), e.read(0);
    }
    w.prototype.resume = function() {
        let e = this._readableState;
        return e.flowing || (y("resume"), e.flowing = !e.readableListening, ya(this, e)), e[ee] = !1, this;
    };
    function ya(e, t) {
        t.resumeScheduled || (t.resumeScheduled = !0, W.nextTick(ga, e, t));
    }
    function ga(e, t) {
        y("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), ar(e), t.flowing && !t.reading && e.read(0);
    }
    w.prototype.pause = function() {
        return y("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (y("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState[ee] = !0, this;
    };
    function ar(e) {
        let t = e._readableState;
        for(y("flow", t.flowing); t.flowing && e.read() !== null;);
    }
    w.prototype.wrap = function(e) {
        let t = !1;
        e.on("data", (r)=>{
            !this.push(r) && e.pause && (t = !0, e.pause());
        }), e.on("end", ()=>{
            this.push(null);
        }), e.on("error", (r)=>{
            fe(this, r);
        }), e.on("close", ()=>{
            this.destroy();
        }), e.on("destroy", ()=>{
            this.destroy();
        }), this._read = ()=>{
            t && e.resume && (t = !1, e.resume());
        };
        let n = Yl(e);
        for(let r2 = 1; r2 < n.length; r2++){
            let i90 = n[r2];
            this[i90] === void 0 && typeof e[i90] == "function" && (this[i90] = e[i90].bind(e));
        }
        return this;
    };
    w.prototype[Xl] = function() {
        return fr(this);
    };
    w.prototype.iterator = function(e) {
        return e !== void 0 && sa(e, "options"), fr(this, e);
    };
    function fr(e, t) {
        typeof e.read != "function" && (e = w.wrap(e, {
            objectMode: !0
        }));
        let n = Sa(e, t);
        return n.stream = e, n;
    }
    async function* Sa(e, t) {
        let n = bt;
        function r(l) {
            this === e ? (n(), n = bt) : n = l;
        }
        e.on("readable", r);
        let i91, o = ta(e, {
            writable: !0
        }, (l)=>{
            i91 = l ? Zn(i91, l) : null, n(), n = bt;
        });
        try {
            for(;;){
                let l = e.destroyed ? null : e.read();
                if (l !== null) yield l;
                else {
                    if (i91) throw i91;
                    if (i91 === null) return;
                    await new Kl(r);
                }
            }
        } catch (l) {
            throw i91 = Zn(i91, l), i91;
        } finally{
            (i91 || t?.destroyOnReturn !== !1) && (i91 === void 0 || e._readableState.autoDestroy) ? ue.destroyer(e, null) : (e.off("readable", r), o());
        }
    }
    tr(w.prototype, {
        readable: {
            __proto__: null,
            get () {
                let e = this._readableState;
                return !!e && e.readable !== !1 && !e.destroyed && !e.errorEmitted && !e.endEmitted;
            },
            set (e) {
                this._readableState && (this._readableState.readable = !!e);
            }
        },
        readableDidRead: {
            __proto__: null,
            enumerable: !1,
            get: function() {
                return this._readableState.dataEmitted;
            }
        },
        readableAborted: {
            __proto__: null,
            enumerable: !1,
            get: function() {
                return !!(this._readableState.readable !== !1 && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
            }
        },
        readableHighWaterMark: {
            __proto__: null,
            enumerable: !1,
            get: function() {
                return this._readableState.highWaterMark;
            }
        },
        readableBuffer: {
            __proto__: null,
            enumerable: !1,
            get: function() {
                return this._readableState && this._readableState.buffer;
            }
        },
        readableFlowing: {
            __proto__: null,
            enumerable: !1,
            get: function() {
                return this._readableState.flowing;
            },
            set: function(e) {
                this._readableState && (this._readableState.flowing = e);
            }
        },
        readableLength: {
            __proto__: null,
            enumerable: !1,
            get () {
                return this._readableState.length;
            }
        },
        readableObjectMode: {
            __proto__: null,
            enumerable: !1,
            get () {
                return this._readableState ? this._readableState.objectMode : !1;
            }
        },
        readableEncoding: {
            __proto__: null,
            enumerable: !1,
            get () {
                return this._readableState ? this._readableState.encoding : null;
            }
        },
        errored: {
            __proto__: null,
            enumerable: !1,
            get () {
                return this._readableState ? this._readableState.errored : null;
            }
        },
        closed: {
            __proto__: null,
            get () {
                return this._readableState ? this._readableState.closed : !1;
            }
        },
        destroyed: {
            __proto__: null,
            enumerable: !1,
            get () {
                return this._readableState ? this._readableState.destroyed : !1;
            },
            set (e) {
                !this._readableState || (this._readableState.destroyed = e);
            }
        },
        readableEnded: {
            __proto__: null,
            enumerable: !1,
            get () {
                return this._readableState ? this._readableState.endEmitted : !1;
            }
        }
    });
    tr(yt.prototype, {
        pipesCount: {
            __proto__: null,
            get () {
                return this.pipes.length;
            }
        },
        paused: {
            __proto__: null,
            get () {
                return this[ee] !== !1;
            },
            set (e) {
                this[ee] = !!e;
            }
        }
    });
    w._fromList = ur;
    function ur(e, t) {
        if (t.length === 0) return null;
        let n;
        return t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (t.decoder ? n = t.buffer.join("") : t.buffer.length === 1 ? n = t.buffer.first() : n = t.buffer.concat(t.length), t.buffer.clear()) : n = t.buffer.consume(e, t.decoder), n;
    }
    function pt(e) {
        let t = e._readableState;
        y("endReadable", t.endEmitted), t.endEmitted || (t.ended = !0, W.nextTick(Ea, t, e));
    }
    function Ea(e, t) {
        if (y("endReadableNT", e.endEmitted, e.length), !e.errored && !e.closeEmitted && !e.endEmitted && e.length === 0) {
            if (e.endEmitted = !0, t.emit("end"), t.writable && t.allowHalfOpen === !1) W.nextTick(Ra, t);
            else if (e.autoDestroy) {
                let n = t._writableState;
                (!n || n.autoDestroy && (n.finished || n.writable === !1)) && t.destroy();
            }
        }
    }
    function Ra(e) {
        e.writable && !e.writableEnded && !e.destroyed && e.end();
    }
    w.from = function(e, t) {
        return da(w, e, t);
    };
    var wt;
    function sr() {
        return wt === void 0 && (wt = {}), wt;
    }
    w.fromWeb = function(e, t) {
        return sr().newStreamReadableFromReadableStream(e, t);
    };
    w.toWeb = function(e, t) {
        return sr().newReadableStreamFromStreamReadable(e, t);
    };
    w.wrap = function(e, t) {
        var n, r;
        return new w({
            objectMode: (n = (r = e.readableObjectMode) !== null && r !== void 0 ? r : e.objectMode) !== null && n !== void 0 ? n : !0,
            ...t,
            destroy (i92, o) {
                ue.destroyer(e, i92), o(i92);
            }
        }).wrap(e);
    };
});
var Tt = g((fu, Ar)=>{
    var te = __process$, { ArrayPrototypeSlice: br , Error: Aa , FunctionPrototypeSymbolHasInstance: _r , ObjectDefineProperty: pr , ObjectDefineProperties: ma , ObjectSetPrototypeOf: wr , StringPrototypeToLowerCase: Ta , Symbol: Ia , SymbolHasInstance: Ma  } = m();
    Ar.exports = S;
    S.WritableState = Se;
    var { EventEmitter: Na  } = EventEmitter, ye = Le().Stream, { Buffer: ve  } = __default3, Be = Z(), { addAbortSignal: Da  } = ke(), { getHighWaterMark: Oa , getDefaultHighWaterMark: qa  } = Ce(), { ERR_INVALID_ARG_TYPE: xa , ERR_METHOD_NOT_IMPLEMENTED: La , ERR_MULTIPLE_CALLBACK: yr , ERR_STREAM_CANNOT_PIPE: Pa , ERR_STREAM_DESTROYED: ge , ERR_STREAM_ALREADY_FINISHED: ka , ERR_STREAM_NULL_VALUES: Wa , ERR_STREAM_WRITE_AFTER_END: Ca , ERR_UNKNOWN_ENCODING: gr  } = O().codes, { errorOrDestroy: se  } = Be;
    wr(S.prototype, ye.prototype);
    wr(S, ye);
    function Et() {}
    var de = Ia("kOnFinished");
    function Se(e, t, n) {
        typeof n != "boolean" && (n = t instanceof v()), this.objectMode = !!(e && e.objectMode), n && (this.objectMode = this.objectMode || !!(e && e.writableObjectMode)), this.highWaterMark = e ? Oa(this, e, "writableHighWaterMark", n) : qa(!1), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
        let r = !!(e && e.decodeStrings === !1);
        this.decodeStrings = !r, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = $a.bind(void 0, t), this.writecb = null, this.writelen = 0, this.afterWriteTickInfo = null, Ue(this), this.pendingcb = 0, this.constructed = !0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !e || e.emitClose !== !1, this.autoDestroy = !e || e.autoDestroy !== !1, this.errored = null, this.closed = !1, this.closeEmitted = !1, this[de] = [];
    }
    function Ue(e) {
        e.buffered = [], e.bufferedIndex = 0, e.allBuffers = !0, e.allNoop = !0;
    }
    Se.prototype.getBuffer = function() {
        return br(this.buffered, this.bufferedIndex);
    };
    pr(Se.prototype, "bufferedRequestCount", {
        __proto__: null,
        get () {
            return this.buffered.length - this.bufferedIndex;
        }
    });
    function S(e) {
        let t = this instanceof v();
        if (!t && !_r(S, this)) return new S(e);
        this._writableState = new Se(e, this, t), e && (typeof e.write == "function" && (this._write = e.write), typeof e.writev == "function" && (this._writev = e.writev), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.final == "function" && (this._final = e.final), typeof e.construct == "function" && (this._construct = e.construct), e.signal && Da(e.signal, this)), ye.call(this, e), Be.construct(this, ()=>{
            let n = this._writableState;
            n.writing || At(this, n), mt(this, n);
        });
    }
    pr(S, Ma, {
        __proto__: null,
        value: function(e) {
            return _r(this, e) ? !0 : this !== S ? !1 : e && e._writableState instanceof Se;
        }
    });
    S.prototype.pipe = function() {
        se(this, new Pa);
    };
    function Sr(e, t, n, r) {
        let i93 = e._writableState;
        if (typeof n == "function") r = n, n = i93.defaultEncoding;
        else {
            if (!n) n = i93.defaultEncoding;
            else if (n !== "buffer" && !ve.isEncoding(n)) throw new gr(n);
            typeof r != "function" && (r = Et);
        }
        if (t === null) throw new Wa;
        if (!i93.objectMode) if (typeof t == "string") i93.decodeStrings !== !1 && (t = ve.from(t, n), n = "buffer");
        else if (t instanceof ve) n = "buffer";
        else if (ye._isUint8Array(t)) t = ye._uint8ArrayToBuffer(t), n = "buffer";
        else throw new xa("chunk", [
            "string",
            "Buffer",
            "Uint8Array"
        ], t);
        let o;
        return i93.ending ? o = new Ca : i93.destroyed && (o = new ge("write")), o ? (te.nextTick(r, o), se(e, o, !0), o) : (i93.pendingcb++, ja(e, i93, t, n, r));
    }
    S.prototype.write = function(e, t, n) {
        return Sr(this, e, t, n) === !0;
    };
    S.prototype.cork = function() {
        this._writableState.corked++;
    };
    S.prototype.uncork = function() {
        let e = this._writableState;
        e.corked && (e.corked--, e.writing || At(this, e));
    };
    S.prototype.setDefaultEncoding = function(t) {
        if (typeof t == "string" && (t = Ta(t)), !ve.isEncoding(t)) throw new gr(t);
        return this._writableState.defaultEncoding = t, this;
    };
    function ja(e, t, n, r, i94) {
        let o = t.objectMode ? 1 : n.length;
        t.length += o;
        let l = t.length < t.highWaterMark;
        return l || (t.needDrain = !0), t.writing || t.corked || t.errored || !t.constructed ? (t.buffered.push({
            chunk: n,
            encoding: r,
            callback: i94
        }), t.allBuffers && r !== "buffer" && (t.allBuffers = !1), t.allNoop && i94 !== Et && (t.allNoop = !1)) : (t.writelen = o, t.writecb = i94, t.writing = !0, t.sync = !0, e._write(n, r, t.onwrite), t.sync = !1), l && !t.errored && !t.destroyed;
    }
    function cr(e, t, n, r, i95, o, l) {
        t.writelen = r, t.writecb = l, t.writing = !0, t.sync = !0, t.destroyed ? t.onwrite(new ge("write")) : n ? e._writev(i95, t.onwrite) : e._write(i95, o, t.onwrite), t.sync = !1;
    }
    function hr(e, t, n, r) {
        --t.pendingcb, r(n), Rt(t), se(e, n);
    }
    function $a(e, t) {
        let n = e._writableState, r = n.sync, i96 = n.writecb;
        if (typeof i96 != "function") {
            se(e, new yr);
            return;
        }
        n.writing = !1, n.writecb = null, n.length -= n.writelen, n.writelen = 0, t ? (t.stack, n.errored || (n.errored = t), e._readableState && !e._readableState.errored && (e._readableState.errored = t), r ? te.nextTick(hr, e, n, t, i96) : hr(e, n, t, i96)) : (n.buffered.length > n.bufferedIndex && At(e, n), r ? n.afterWriteTickInfo !== null && n.afterWriteTickInfo.cb === i96 ? n.afterWriteTickInfo.count++ : (n.afterWriteTickInfo = {
            count: 1,
            cb: i96,
            stream: e,
            state: n
        }, te.nextTick(va, n.afterWriteTickInfo)) : Er(e, n, 1, i96));
    }
    function va({ stream: e , state: t , count: n , cb: r  }) {
        return t.afterWriteTickInfo = null, Er(e, t, n, r);
    }
    function Er(e, t, n, r) {
        for(!t.ending && !e.destroyed && t.length === 0 && t.needDrain && (t.needDrain = !1, e.emit("drain")); n-- > 0;)t.pendingcb--, r();
        t.destroyed && Rt(t), mt(e, t);
    }
    function Rt(e) {
        if (e.writing) return;
        for(let i97 = e.bufferedIndex; i97 < e.buffered.length; ++i97){
            var t;
            let { chunk: o , callback: l  } = e.buffered[i97], u = e.objectMode ? 1 : o.length;
            e.length -= u, l((t = e.errored) !== null && t !== void 0 ? t : new ge("write"));
        }
        let n = e[de].splice(0);
        for(let i1 = 0; i1 < n.length; i1++){
            var r;
            n[i1]((r = e.errored) !== null && r !== void 0 ? r : new ge("end"));
        }
        Ue(e);
    }
    function At(e, t) {
        if (t.corked || t.bufferProcessing || t.destroyed || !t.constructed) return;
        let { buffered: n , bufferedIndex: r , objectMode: i98  } = t, o = n.length - r;
        if (!o) return;
        let l = r;
        if (t.bufferProcessing = !0, o > 1 && e._writev) {
            t.pendingcb -= o - 1;
            let u = t.allNoop ? Et : (a)=>{
                for(let c = l; c < n.length; ++c)n[c].callback(a);
            }, f = t.allNoop && l === 0 ? n : br(n, l);
            f.allBuffers = t.allBuffers, cr(e, t, !0, t.length, f, "", u), Ue(t);
        } else {
            do {
                let { chunk: u , encoding: f , callback: a  } = n[l];
                n[l++] = null;
                let c = i98 ? 1 : u.length;
                cr(e, t, !1, c, u, f, a);
            }while (l < n.length && !t.writing)
            l === n.length ? Ue(t) : l > 256 ? (n.splice(0, l), t.bufferedIndex = 0) : t.bufferedIndex = l;
        }
        t.bufferProcessing = !1;
    }
    S.prototype._write = function(e, t, n) {
        if (this._writev) this._writev([
            {
                chunk: e,
                encoding: t
            }
        ], n);
        else throw new La("_write()");
    };
    S.prototype._writev = null;
    S.prototype.end = function(e, t, n) {
        let r = this._writableState;
        typeof e == "function" ? (n = e, e = null, t = null) : typeof t == "function" && (n = t, t = null);
        let i99;
        if (e != null) {
            let o = Sr(this, e, t);
            o instanceof Aa && (i99 = o);
        }
        return r.corked && (r.corked = 1, this.uncork()), i99 || (!r.errored && !r.ending ? (r.ending = !0, mt(this, r, !0), r.ended = !0) : r.finished ? i99 = new ka("end") : r.destroyed && (i99 = new ge("end"))), typeof n == "function" && (i99 || r.finished ? te.nextTick(n, i99) : r[de].push(n)), this;
    };
    function Fe(e) {
        return e.ending && !e.destroyed && e.constructed && e.length === 0 && !e.errored && e.buffered.length === 0 && !e.finished && !e.writing && !e.errorEmitted && !e.closeEmitted;
    }
    function Fa(e, t) {
        let n = !1;
        function r(i100) {
            if (n) {
                se(e, i100 ?? yr());
                return;
            }
            if (n = !0, t.pendingcb--, i100) {
                let o = t[de].splice(0);
                for(let l = 0; l < o.length; l++)o[l](i100);
                se(e, i100, t.sync);
            } else Fe(t) && (t.prefinished = !0, e.emit("prefinish"), t.pendingcb++, te.nextTick(St, e, t));
        }
        t.sync = !0, t.pendingcb++;
        try {
            e._final(r);
        } catch (i101) {
            r(i101);
        }
        t.sync = !1;
    }
    function Ua(e, t) {
        !t.prefinished && !t.finalCalled && (typeof e._final == "function" && !t.destroyed ? (t.finalCalled = !0, Fa(e, t)) : (t.prefinished = !0, e.emit("prefinish")));
    }
    function mt(e, t, n) {
        Fe(t) && (Ua(e, t), t.pendingcb === 0 && (n ? (t.pendingcb++, te.nextTick((r, i102)=>{
            Fe(i102) ? St(r, i102) : i102.pendingcb--;
        }, e, t)) : Fe(t) && (t.pendingcb++, St(e, t))));
    }
    function St(e, t) {
        t.pendingcb--, t.finished = !0;
        let n = t[de].splice(0);
        for(let r = 0; r < n.length; r++)n[r]();
        if (e.emit("finish"), t.autoDestroy) {
            let r = e._readableState;
            (!r || r.autoDestroy && (r.endEmitted || r.readable === !1)) && e.destroy();
        }
    }
    ma(S.prototype, {
        closed: {
            __proto__: null,
            get () {
                return this._writableState ? this._writableState.closed : !1;
            }
        },
        destroyed: {
            __proto__: null,
            get () {
                return this._writableState ? this._writableState.destroyed : !1;
            },
            set (e) {
                this._writableState && (this._writableState.destroyed = e);
            }
        },
        writable: {
            __proto__: null,
            get () {
                let e = this._writableState;
                return !!e && e.writable !== !1 && !e.destroyed && !e.errored && !e.ending && !e.ended;
            },
            set (e) {
                this._writableState && (this._writableState.writable = !!e);
            }
        },
        writableFinished: {
            __proto__: null,
            get () {
                return this._writableState ? this._writableState.finished : !1;
            }
        },
        writableObjectMode: {
            __proto__: null,
            get () {
                return this._writableState ? this._writableState.objectMode : !1;
            }
        },
        writableBuffer: {
            __proto__: null,
            get () {
                return this._writableState && this._writableState.getBuffer();
            }
        },
        writableEnded: {
            __proto__: null,
            get () {
                return this._writableState ? this._writableState.ending : !1;
            }
        },
        writableNeedDrain: {
            __proto__: null,
            get () {
                let e = this._writableState;
                return e ? !e.destroyed && !e.ending && e.needDrain : !1;
            }
        },
        writableHighWaterMark: {
            __proto__: null,
            get () {
                return this._writableState && this._writableState.highWaterMark;
            }
        },
        writableCorked: {
            __proto__: null,
            get () {
                return this._writableState ? this._writableState.corked : 0;
            }
        },
        writableLength: {
            __proto__: null,
            get () {
                return this._writableState && this._writableState.length;
            }
        },
        errored: {
            __proto__: null,
            enumerable: !1,
            get () {
                return this._writableState ? this._writableState.errored : null;
            }
        },
        writableAborted: {
            __proto__: null,
            enumerable: !1,
            get: function() {
                return !!(this._writableState.writable !== !1 && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
            }
        }
    });
    var Ba = Be.destroy;
    S.prototype.destroy = function(e, t) {
        let n = this._writableState;
        return !n.destroyed && (n.bufferedIndex < n.buffered.length || n[de].length) && te.nextTick(Rt, n), Ba.call(this, e, t), this;
    };
    S.prototype._undestroy = Be.undestroy;
    S.prototype._destroy = function(e, t) {
        t(e);
    };
    S.prototype[Na.captureRejectionSymbol] = function(e) {
        this.destroy(e);
    };
    var gt;
    function Rr() {
        return gt === void 0 && (gt = {}), gt;
    }
    S.fromWeb = function(e, t) {
        return Rr().newStreamWritableFromWritableStream(e, t);
    };
    S.toWeb = function(e) {
        return Rr().newWritableStreamFromStreamWritable(e);
    };
});
var kr = g((uu, Pr)=>{
    var It = __process$, Ga = __default3, { isReadable: Ha , isWritable: Va , isIterable: mr , isNodeStream: Ya , isReadableNodeStream: Tr , isWritableNodeStream: Ir , isDuplexNodeStream: Ka  } = V(), Mr = Y(), { AbortError: Lr , codes: { ERR_INVALID_ARG_TYPE: za , ERR_INVALID_RETURN_VALUE: Nr  }  } = O(), { destroyer: ce  } = Z(), Xa = v(), Ja = we(), { createDeferredPromise: Dr  } = j(), Or = ct(), qr = globalThis.Blob || Ga.Blob, Qa = typeof qr < "u" ? function(t) {
        return t instanceof qr;
    } : function(t) {
        return !1;
    }, Za = globalThis.AbortController, { FunctionPrototypeCall: xr  } = m(), ne = class extends Xa {
        constructor(t){
            super(t), t?.readable === !1 && (this._readableState.readable = !1, this._readableState.ended = !0, this._readableState.endEmitted = !0), t?.writable === !1 && (this._writableState.writable = !1, this._writableState.ending = !0, this._writableState.ended = !0, this._writableState.finished = !0);
        }
    };
    Pr.exports = function e(t, n) {
        if (Ka(t)) return t;
        if (Tr(t)) return Ge({
            readable: t
        });
        if (Ir(t)) return Ge({
            writable: t
        });
        if (Ya(t)) return Ge({
            writable: !1,
            readable: !1
        });
        if (typeof t == "function") {
            let { value: i103 , write: o , final: l , destroy: u  } = ef(t);
            if (mr(i103)) return Or(ne, i103, {
                objectMode: !0,
                write: o,
                final: l,
                destroy: u
            });
            let f = i103?.then;
            if (typeof f == "function") {
                let a, c = xr(f, i103, (s)=>{
                    if (s != null) throw new Nr("nully", "body", s);
                }, (s)=>{
                    ce(a, s);
                });
                return a = new ne({
                    objectMode: !0,
                    readable: !1,
                    write: o,
                    final (s) {
                        l(async ()=>{
                            try {
                                await c, It.nextTick(s, null);
                            } catch (b) {
                                It.nextTick(s, b);
                            }
                        });
                    },
                    destroy: u
                });
            }
            throw new Nr("Iterable, AsyncIterable or AsyncFunction", n, i103);
        }
        if (Qa(t)) return e(t.arrayBuffer());
        if (mr(t)) return Or(ne, t, {
            objectMode: !0,
            writable: !1
        });
        if (typeof t?.writable == "object" || typeof t?.readable == "object") {
            let i104 = t != null && t.readable ? Tr(t?.readable) ? t?.readable : e(t.readable) : void 0, o = t != null && t.writable ? Ir(t?.writable) ? t?.writable : e(t.writable) : void 0;
            return Ge({
                readable: i104,
                writable: o
            });
        }
        let r = t?.then;
        if (typeof r == "function") {
            let i105;
            return xr(r, t, (o)=>{
                o != null && i105.push(o), i105.push(null);
            }, (o)=>{
                ce(i105, o);
            }), i105 = new ne({
                objectMode: !0,
                writable: !1,
                read () {}
            });
        }
        throw new za(n, [
            "Blob",
            "ReadableStream",
            "WritableStream",
            "Stream",
            "Iterable",
            "AsyncIterable",
            "Function",
            "{ readable, writable } pair",
            "Promise"
        ], t);
    };
    function ef(e) {
        let { promise: t , resolve: n  } = Dr(), r = new Za, i106 = r.signal;
        return {
            value: e(async function*() {
                for(;;){
                    let l = t;
                    t = null;
                    let { chunk: u , done: f , cb: a  } = await l;
                    if (It.nextTick(a), f) return;
                    if (i106.aborted) throw new Lr(void 0, {
                        cause: i106.reason
                    });
                    ({ promise: t , resolve: n  } = Dr()), yield u;
                }
            }(), {
                signal: i106
            }),
            write (l, u, f) {
                let a = n;
                n = null, a({
                    chunk: l,
                    done: !1,
                    cb: f
                });
            },
            final (l) {
                let u = n;
                n = null, u({
                    done: !0,
                    cb: l
                });
            },
            destroy (l, u) {
                r.abort(), u(l);
            }
        };
    }
    function Ge(e) {
        let t = e.readable && typeof e.readable.read != "function" ? Ja.wrap(e.readable) : e.readable, n = e.writable, r = !!Ha(t), i107 = !!Va(n), o, l, u, f, a;
        function c(s) {
            let b = f;
            f = null, b ? b(s) : s ? a.destroy(s) : !r && !i107 && a.destroy();
        }
        return a = new ne({
            readableObjectMode: !!(t != null && t.readableObjectMode),
            writableObjectMode: !!(n != null && n.writableObjectMode),
            readable: r,
            writable: i107
        }), i107 && (Mr(n, (s)=>{
            i107 = !1, s && ce(t, s), c(s);
        }), a._write = function(s, b, d) {
            n.write(s, b) ? d() : o = d;
        }, a._final = function(s) {
            n.end(), l = s;
        }, n.on("drain", function() {
            if (o) {
                let s = o;
                o = null, s();
            }
        }), n.on("finish", function() {
            if (l) {
                let s = l;
                l = null, s();
            }
        })), r && (Mr(t, (s)=>{
            r = !1, s && ce(t, s), c(s);
        }), t.on("readable", function() {
            if (u) {
                let s = u;
                u = null, s();
            }
        }), t.on("end", function() {
            a.push(null);
        }), a._read = function() {
            for(;;){
                let s = t.read();
                if (s === null) {
                    u = a._read;
                    return;
                }
                if (!a.push(s)) return;
            }
        }), a._destroy = function(s, b) {
            !s && f !== null && (s = new Lr), u = null, o = null, l = null, f === null ? b(s) : (f = b, ce(n, s), ce(t, s));
        }, a;
    }
});
var v = g((su, jr)=>{
    "use strict";
    var { ObjectDefineProperties: tf , ObjectGetOwnPropertyDescriptor: B , ObjectKeys: nf , ObjectSetPrototypeOf: Wr  } = m();
    jr.exports = C0842;
    var Dt = we(), x = Tt();
    Wr(C0842.prototype, Dt.prototype);
    Wr(C0842, Dt);
    {
        let e = nf(x.prototype);
        for(let t = 0; t < e.length; t++){
            let n = e[t];
            C0842.prototype[n] || (C0842.prototype[n] = x.prototype[n]);
        }
    }
    function C0842(e) {
        if (!(this instanceof C0842)) return new C0842(e);
        Dt.call(this, e), x.call(this, e), e ? (this.allowHalfOpen = e.allowHalfOpen !== !1, e.readable === !1 && (this._readableState.readable = !1, this._readableState.ended = !0, this._readableState.endEmitted = !0), e.writable === !1 && (this._writableState.writable = !1, this._writableState.ending = !0, this._writableState.ended = !0, this._writableState.finished = !0)) : this.allowHalfOpen = !0;
    }
    tf(C0842.prototype, {
        writable: {
            __proto__: null,
            ...B(x.prototype, "writable")
        },
        writableHighWaterMark: {
            __proto__: null,
            ...B(x.prototype, "writableHighWaterMark")
        },
        writableObjectMode: {
            __proto__: null,
            ...B(x.prototype, "writableObjectMode")
        },
        writableBuffer: {
            __proto__: null,
            ...B(x.prototype, "writableBuffer")
        },
        writableLength: {
            __proto__: null,
            ...B(x.prototype, "writableLength")
        },
        writableFinished: {
            __proto__: null,
            ...B(x.prototype, "writableFinished")
        },
        writableCorked: {
            __proto__: null,
            ...B(x.prototype, "writableCorked")
        },
        writableEnded: {
            __proto__: null,
            ...B(x.prototype, "writableEnded")
        },
        writableNeedDrain: {
            __proto__: null,
            ...B(x.prototype, "writableNeedDrain")
        },
        destroyed: {
            __proto__: null,
            get () {
                return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
            },
            set (e) {
                this._readableState && this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e);
            }
        }
    });
    var Mt;
    function Cr() {
        return Mt === void 0 && (Mt = {}), Mt;
    }
    C0842.fromWeb = function(e, t) {
        return Cr().newStreamDuplexFromReadableWritablePair(e, t);
    };
    C0842.toWeb = function(e) {
        return Cr().newReadableWritablePairFromDuplex(e);
    };
    var Nt;
    C0842.from = function(e) {
        return Nt || (Nt = kr()), Nt(e, "body");
    };
});
var xt = g((du, vr)=>{
    "use strict";
    var { ObjectSetPrototypeOf: $r , Symbol: rf  } = m();
    vr.exports = G;
    var { ERR_METHOD_NOT_IMPLEMENTED: of  } = O().codes, qt = v(), { getHighWaterMark: lf  } = Ce();
    $r(G.prototype, qt.prototype);
    $r(G, qt);
    var Ee = rf("kCallback");
    function G(e) {
        if (!(this instanceof G)) return new G(e);
        let t = e ? lf(this, e, "readableHighWaterMark", !0) : null;
        t === 0 && (e = {
            ...e,
            highWaterMark: null,
            readableHighWaterMark: t,
            writableHighWaterMark: e.writableHighWaterMark || 0
        }), qt.call(this, e), this._readableState.sync = !1, this[Ee] = null, e && (typeof e.transform == "function" && (this._transform = e.transform), typeof e.flush == "function" && (this._flush = e.flush)), this.on("prefinish", af);
    }
    function Ot(e) {
        typeof this._flush == "function" && !this.destroyed ? this._flush((t, n)=>{
            if (t) {
                e ? e(t) : this.destroy(t);
                return;
            }
            n != null && this.push(n), this.push(null), e && e();
        }) : (this.push(null), e && e());
    }
    function af() {
        this._final !== Ot && Ot.call(this);
    }
    G.prototype._final = Ot;
    G.prototype._transform = function(e, t, n) {
        throw new of("_transform()");
    };
    G.prototype._write = function(e, t, n) {
        let r = this._readableState, i108 = this._writableState, o = r.length;
        this._transform(e, t, (l, u)=>{
            if (l) {
                n(l);
                return;
            }
            u != null && this.push(u), i108.ended || o === r.length || r.length < r.highWaterMark ? n() : this[Ee] = n;
        });
    };
    G.prototype._read = function() {
        if (this[Ee]) {
            let e = this[Ee];
            this[Ee] = null, e();
        }
    };
});
var Pt = g((cu, Ur)=>{
    "use strict";
    var { ObjectSetPrototypeOf: Fr  } = m();
    Ur.exports = he;
    var Lt = xt();
    Fr(he.prototype, Lt.prototype);
    Fr(he, Lt);
    function he(e) {
        if (!(this instanceof he)) return new he(e);
        Lt.call(this, e);
    }
    he.prototype._transform = function(e, t, n) {
        n(null, e);
    };
});
var Ye = g((hu, zr)=>{
    var He = __process$, { ArrayIsArray: ff , Promise: uf , SymbolAsyncIterator: sf  } = m(), Ve = Y(), { once: df  } = j(), cf = Z(), Br = v(), { aggregateTwoErrors: hf , codes: { ERR_INVALID_ARG_TYPE: Yr , ERR_INVALID_RETURN_VALUE: kt , ERR_MISSING_ARGS: bf , ERR_STREAM_DESTROYED: _f , ERR_STREAM_PREMATURE_CLOSE: pf  } , AbortError: wf  } = O(), { validateFunction: yf , validateAbortSignal: gf  } = _e(), { isIterable: be , isReadable: Wt , isReadableNodeStream: $t , isNodeStream: Gr  } = V(), Sf = globalThis.AbortController, Ct, jt;
    function Hr(e, t, n) {
        let r = !1;
        e.on("close", ()=>{
            r = !0;
        });
        let i109 = Ve(e, {
            readable: t,
            writable: n
        }, (o)=>{
            r = !o;
        });
        return {
            destroy: (o)=>{
                r || (r = !0, cf.destroyer(e, o || new _f("pipe")));
            },
            cleanup: i109
        };
    }
    function Ef(e) {
        return yf(e[e.length - 1], "streams[stream.length - 1]"), e.pop();
    }
    function Rf(e) {
        if (be(e)) return e;
        if ($t(e)) return Af(e);
        throw new Yr("val", [
            "Readable",
            "Iterable",
            "AsyncIterable"
        ], e);
    }
    async function* Af(e) {
        jt || (jt = we()), yield* jt.prototype[sf].call(e);
    }
    async function Vr(e, t, n, { end: r  }) {
        let i110, o = null, l = (a)=>{
            if (a && (i110 = a), o) {
                let c = o;
                o = null, c();
            }
        }, u = ()=>new uf((a, c)=>{
                i110 ? c(i110) : o = ()=>{
                    i110 ? c(i110) : a();
                };
            })
        ;
        t.on("drain", l);
        let f = Ve(t, {
            readable: !1
        }, l);
        try {
            t.writableNeedDrain && await u();
            for await (let a of e)t.write(a) || await u();
            r && t.end(), await u(), n();
        } catch (a) {
            n(i110 !== a ? hf(i110, a) : a);
        } finally{
            f(), t.off("drain", l);
        }
    }
    function mf(...e) {
        return Kr(e, df(Ef(e)));
    }
    function Kr(e, t, n) {
        if (e.length === 1 && ff(e[0]) && (e = e[0]), e.length < 2) throw new bf("streams");
        let r = new Sf, i111 = r.signal, o = n?.signal, l = [];
        gf(o, "options.signal");
        function u() {
            d(new wf);
        }
        o?.addEventListener("abort", u);
        let f, a, c = [], s = 0;
        function b(_) {
            d(_, --s === 0);
        }
        function d(_, p) {
            if (_ && (!f || f.code === "ERR_STREAM_PREMATURE_CLOSE") && (f = _), !(!f && !p)) {
                for(; c.length;)c.shift()(f);
                o?.removeEventListener("abort", u), r.abort(), p && (f || l.forEach((I)=>I()
                ), He.nextTick(t, f, a));
            }
        }
        let h;
        for(let _1 = 0; _1 < e.length; _1++){
            let p = e[_1], I = _1 < e.length - 1, M = _1 > 0, F3 = I || n?.end !== !1, re = _1 === e.length - 1;
            if (Gr(p)) {
                let P = function(U) {
                    U && U.name !== "AbortError" && U.code !== "ERR_STREAM_PREMATURE_CLOSE" && b(U);
                };
                if (F3) {
                    let { destroy: U , cleanup: ze  } = Hr(p, I, M);
                    c.push(U), Wt(p) && re && l.push(ze);
                }
                p.on("error", P), Wt(p) && re && l.push(()=>{
                    p.removeListener("error", P);
                });
            }
            if (_1 === 0) if (typeof p == "function") {
                if (h = p({
                    signal: i111
                }), !be(h)) throw new kt("Iterable, AsyncIterable or Stream", "source", h);
            } else be(p) || $t(p) ? h = p : h = Br.from(p);
            else if (typeof p == "function") if (h = Rf(h), h = p(h, {
                signal: i111
            }), I) {
                if (!be(h, !0)) throw new kt("AsyncIterable", `transform[${_1 - 1}]`, h);
            } else {
                var D;
                Ct || (Ct = Pt());
                let P = new Ct({
                    objectMode: !0
                }), U = (D = h) === null || D === void 0 ? void 0 : D.then;
                if (typeof U == "function") s++, U.call(h, (ie)=>{
                    a = ie, ie != null && P.write(ie), F3 && P.end(), He.nextTick(b);
                }, (ie)=>{
                    P.destroy(ie), He.nextTick(b, ie);
                });
                else if (be(h, !0)) s++, Vr(h, P, b, {
                    end: F3
                });
                else throw new kt("AsyncIterable or Promise", "destination", h);
                h = P;
                let { destroy: ze , cleanup: _i  } = Hr(h, !1, !0);
                c.push(ze), re && l.push(_i);
            }
            else if (Gr(p)) {
                if ($t(h)) {
                    s += 2;
                    let P = Tf(h, p, b, {
                        end: F3
                    });
                    Wt(p) && re && l.push(P);
                } else if (be(h)) s++, Vr(h, p, b, {
                    end: F3
                });
                else throw new Yr("val", [
                    "Readable",
                    "Iterable",
                    "AsyncIterable"
                ], h);
                h = p;
            } else h = Br.from(p);
        }
        return (i111 != null && i111.aborted || o != null && o.aborted) && He.nextTick(u), h;
    }
    function Tf(e, t, n, { end: r  }) {
        let i112 = !1;
        return t.on("close", ()=>{
            i112 || n(new pf);
        }), e.pipe(t, {
            end: r
        }), r ? e.once("end", ()=>{
            i112 = !0, t.end();
        }) : n(), Ve(e, {
            readable: !0,
            writable: !1
        }, (o)=>{
            let l = e._readableState;
            o && o.code === "ERR_STREAM_PREMATURE_CLOSE" && l && l.ended && !l.errored && !l.errorEmitted ? e.once("end", n).once("error", n) : n(o);
        }), Ve(t, {
            readable: !1,
            writable: !0
        }, n);
    }
    zr.exports = {
        pipelineImpl: Kr,
        pipeline: mf
    };
});
var ei = g((bu, Zr)=>{
    "use strict";
    var { pipeline: If  } = Ye(), Ke = v(), { destroyer: Mf  } = Z(), { isNodeStream: Nf , isReadable: Xr , isWritable: Jr  } = V(), { AbortError: Df , codes: { ERR_INVALID_ARG_VALUE: Qr , ERR_MISSING_ARGS: Of  }  } = O();
    Zr.exports = function(...t) {
        if (t.length === 0) throw new Of("streams");
        if (t.length === 1) return Ke.from(t[0]);
        let n = [
            ...t
        ];
        if (typeof t[0] == "function" && (t[0] = Ke.from(t[0])), typeof t[t.length - 1] == "function") {
            let d = t.length - 1;
            t[d] = Ke.from(t[d]);
        }
        for(let d1 = 0; d1 < t.length; ++d1)if (!!Nf(t[d1])) {
            if (d1 < t.length - 1 && !Xr(t[d1])) throw new Qr(`streams[${d1}]`, n[d1], "must be readable");
            if (d1 > 0 && !Jr(t[d1])) throw new Qr(`streams[${d1}]`, n[d1], "must be writable");
        }
        let r, i113, o, l, u;
        function f(d) {
            let h = l;
            l = null, h ? h(d) : d ? u.destroy(d) : !b && !s && u.destroy();
        }
        let a = t[0], c = If(t, f), s = !!Jr(a), b = !!Xr(c);
        return u = new Ke({
            writableObjectMode: !!(a != null && a.writableObjectMode),
            readableObjectMode: !!(c != null && c.writableObjectMode),
            writable: s,
            readable: b
        }), s && (u._write = function(d, h, D) {
            a.write(d, h) ? D() : r = D;
        }, u._final = function(d) {
            a.end(), i113 = d;
        }, a.on("drain", function() {
            if (r) {
                let d = r;
                r = null, d();
            }
        }), c.on("finish", function() {
            if (i113) {
                let d = i113;
                i113 = null, d();
            }
        })), b && (c.on("readable", function() {
            if (o) {
                let d = o;
                o = null, d();
            }
        }), c.on("end", function() {
            u.push(null);
        }), u._read = function() {
            for(;;){
                let d = c.read();
                if (d === null) {
                    o = u._read;
                    return;
                }
                if (!u.push(d)) return;
            }
        }), u._destroy = function(d, h) {
            !d && l !== null && (d = new Df), o = null, r = null, i113 = null, l === null ? h(d) : (l = h, Mf(c, d));
        }, u;
    };
});
var vt = g((_u, ti)=>{
    "use strict";
    var { ArrayPrototypePop: qf , Promise: xf  } = m(), { isIterable: Lf , isNodeStream: Pf  } = V(), { pipelineImpl: kf  } = Ye(), { finished: Wf  } = Y();
    function Cf(...e) {
        return new xf((t, n)=>{
            let r, i114, o = e[e.length - 1];
            if (o && typeof o == "object" && !Pf(o) && !Lf(o)) {
                let l = qf(e);
                r = l.signal, i114 = l.end;
            }
            kf(e, (l, u)=>{
                l ? n(l) : t(u);
            }, {
                signal: r,
                end: i114
            });
        });
    }
    ti.exports = {
        finished: Wf,
        pipeline: Cf
    };
});
var di = g((pu, si)=>{
    var { Buffer: jf  } = __default3, { ObjectDefineProperty: H , ObjectKeys: ii , ReflectApply: oi  } = m(), { promisify: { custom: li  }  } = j(), { streamReturningOperators: ni , promiseReturningOperators: ri  } = xn(), { codes: { ERR_ILLEGAL_CONSTRUCTOR: ai  }  } = O(), $f = ei(), { pipeline: fi  } = Ye(), { destroyer: vf  } = Z(), ui = Y(), Ft = vt(), Ut = V(), R = si.exports = Le().Stream;
    R.isDisturbed = Ut.isDisturbed;
    R.isErrored = Ut.isErrored;
    R.isReadable = Ut.isReadable;
    R.Readable = we();
    for (let e of ii(ni)){
        let n = function(...r) {
            if (new.target) throw ai();
            return R.Readable.from(oi(t, this, r));
        };
        let t = ni[e];
        H(n, "name", {
            __proto__: null,
            value: t.name
        }), H(n, "length", {
            __proto__: null,
            value: t.length
        }), H(R.Readable.prototype, e, {
            __proto__: null,
            value: n,
            enumerable: !1,
            configurable: !0,
            writable: !0
        });
    }
    for (let e1 of ii(ri)){
        let n = function(...i115) {
            if (new.target) throw ai();
            return oi(t, this, i115);
        };
        let t = ri[e1];
        H(n, "name", {
            __proto__: null,
            value: t.name
        }), H(n, "length", {
            __proto__: null,
            value: t.length
        }), H(R.Readable.prototype, e1, {
            __proto__: null,
            value: n,
            enumerable: !1,
            configurable: !0,
            writable: !0
        });
    }
    R.Writable = Tt();
    R.Duplex = v();
    R.Transform = xt();
    R.PassThrough = Pt();
    R.pipeline = fi;
    var { addAbortSignal: Ff  } = ke();
    R.addAbortSignal = Ff;
    R.finished = ui;
    R.destroy = vf;
    R.compose = $f;
    H(R, "promises", {
        __proto__: null,
        configurable: !0,
        enumerable: !0,
        get () {
            return Ft;
        }
    });
    H(fi, li, {
        __proto__: null,
        enumerable: !0,
        get () {
            return Ft.pipeline;
        }
    });
    H(ui, li, {
        __proto__: null,
        enumerable: !0,
        get () {
            return Ft.finished;
        }
    });
    R.Stream = R;
    R._isUint8Array = function(t) {
        return t instanceof Uint8Array;
    };
    R._uint8ArrayToBuffer = function(t) {
        return jf.from(t.buffer, t.byteOffset, t.byteLength);
    };
});
var ci = g((wu, A)=>{
    "use strict";
    var T = di(), Bf = vt(), Gf = T.Readable.destroy;
    A.exports = T.Readable;
    A.exports._uint8ArrayToBuffer = T._uint8ArrayToBuffer;
    A.exports._isUint8Array = T._isUint8Array;
    A.exports.isDisturbed = T.isDisturbed;
    A.exports.isErrored = T.isErrored;
    A.exports.isReadable = T.isReadable;
    A.exports.Readable = T.Readable;
    A.exports.Writable = T.Writable;
    A.exports.Duplex = T.Duplex;
    A.exports.Transform = T.Transform;
    A.exports.PassThrough = T.PassThrough;
    A.exports.addAbortSignal = T.addAbortSignal;
    A.exports.finished = T.finished;
    A.exports.destroy = T.destroy;
    A.exports.destroy = Gf;
    A.exports.pipeline = T.pipeline;
    A.exports.compose = T.compose;
    Object.defineProperty(T, "promises", {
        configurable: !0,
        enumerable: !0,
        get () {
            return Bf;
        }
    });
    A.exports.Stream = T.Stream;
    A.exports.default = A.exports;
});
var bi = Ri(ci()), { _uint8ArrayToBuffer: yu , _isUint8Array: gu , isDisturbed: Su , isErrored: Eu , isReadable: Ru , Readable: Au , Writable: mu , Duplex: Tu , Transform: Iu , PassThrough: Mu , addAbortSignal: Nu , finished: Du , destroy: Ou , pipeline: qu , compose: xu , Stream: Lu  } = bi, { default: hi , ...Hf } = bi;
const process2 = __process$;
const { Buffer: Buffer1  } = __default3;
const Readable = Au;
const Writable = mu;
const Duplex = Tu;
function isReadableStream(object) {
    return object instanceof ReadableStream;
}
function isWritableStream(object) {
    return object instanceof WritableStream;
}
Readable.fromWeb = function(readableStream, options = kEmptyObject) {
    if (!isReadableStream(readableStream)) {
        throw new ERR_INVALID_ARG_TYPE("readableStream", "ReadableStream", readableStream);
    }
    validateObject(options, "options");
    const { highWaterMark , encoding , objectMode =false , signal ,  } = options;
    if (encoding !== undefined && !Buffer1.isEncoding(encoding)) {
        throw new ERR_INVALID_ARG_VALUE(encoding, "options.encoding");
    }
    validateBoolean(objectMode, "options.objectMode");
    const reader = readableStream.getReader();
    let closed = false;
    const readable = new Readable({
        objectMode,
        highWaterMark,
        encoding,
        signal,
        read () {
            reader.read().then((chunk)=>{
                if (chunk.done) {
                    readable.push(null);
                } else {
                    readable.push(chunk.value);
                }
            }, (error3)=>destroy.call(readable, error3)
            );
        },
        destroy (error1, callback) {
            function done() {
                try {
                    callback(error1);
                } catch (error4) {
                    process2.nextTick(()=>{
                        throw error4;
                    });
                }
            }
            if (!closed) {
                reader.cancel(error1).then(done, done);
                return;
            }
            done();
        }
    });
    reader.closed.then(()=>{
        closed = true;
        if (!isReadableEnded1(readable)) {
            readable.push(null);
        }
    }, (error5)=>{
        closed = true;
        destroy.call(readable, error5);
    });
    return readable;
};
Writable.fromWeb = function(writableStream, options = kEmptyObject) {
    if (!isWritableStream(writableStream)) {
        throw new ERR_INVALID_ARG_TYPE("writableStream", "WritableStream", writableStream);
    }
    validateObject(options, "options");
    const { highWaterMark , decodeStrings =true , objectMode =false , signal ,  } = options;
    validateBoolean(objectMode, "options.objectMode");
    validateBoolean(decodeStrings, "options.decodeStrings");
    const writer = writableStream.getWriter();
    let closed = false;
    const writable = new Writable({
        highWaterMark,
        objectMode,
        decodeStrings,
        signal,
        writev (chunks, callback) {
            function done(error6) {
                error6 = error6.filter((e)=>e
                );
                try {
                    callback(error6.length === 0 ? undefined : error6);
                } catch (error2) {
                    process2.nextTick(()=>destroy.call(writable, error2)
                    );
                }
            }
            writer.ready.then(()=>Promise.all(chunks.map((data)=>writer.write(data.chunk)
                )).then(done, done)
            , done);
        },
        write (chunk, encoding, callback) {
            if (typeof chunk === "string" && decodeStrings && !objectMode) {
                chunk = Buffer1.from(chunk, encoding);
                chunk = new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
            }
            function done(error7) {
                try {
                    callback(error7);
                } catch (error3) {
                    destroy(this, duplex, error3);
                }
            }
            writer.ready.then(()=>writer.write(chunk).then(done, done)
            , done);
        },
        destroy (error4, callback) {
            function done() {
                try {
                    callback(error4);
                } catch (error8) {
                    process2.nextTick(()=>{
                        throw error8;
                    });
                }
            }
            if (!closed) {
                if (error4 != null) {
                    writer.abort(error4).then(done, done);
                } else {
                    writer.close().then(done, done);
                }
                return;
            }
            done();
        },
        final (callback) {
            function done(error9) {
                try {
                    callback(error9);
                } catch (error5) {
                    process2.nextTick(()=>destroy.call(writable, error5)
                    );
                }
            }
            if (!closed) {
                writer.close().then(done, done);
            }
        }
    });
    writer.closed.then(()=>{
        closed = true;
        if (!isWritableEnded(writable)) {
            destroy.call(writable, new ERR_STREAM_PREMATURE_CLOSE());
        }
    }, (error10)=>{
        closed = true;
        destroy.call(writable, error10);
    });
    return writable;
};
Duplex.fromWeb = function(pair, options = kEmptyObject) {
    validateObject(pair, "pair");
    const { readable: readableStream , writable: writableStream ,  } = pair;
    if (!isReadableStream(readableStream)) {
        throw new ERR_INVALID_ARG_TYPE("pair.readable", "ReadableStream", readableStream);
    }
    if (!isWritableStream(writableStream)) {
        throw new ERR_INVALID_ARG_TYPE("pair.writable", "WritableStream", writableStream);
    }
    validateObject(options, "options");
    const { allowHalfOpen =false , objectMode =false , encoding: encoding1 , decodeStrings =true , highWaterMark , signal ,  } = options;
    validateBoolean(objectMode, "options.objectMode");
    if (encoding1 !== undefined && !Buffer1.isEncoding(encoding1)) {
        throw new ERR_INVALID_ARG_VALUE(encoding1, "options.encoding");
    }
    const writer = writableStream.getWriter();
    const reader = readableStream.getReader();
    let writableClosed = false;
    let readableClosed = false;
    const duplex = new Duplex({
        allowHalfOpen,
        highWaterMark,
        objectMode,
        encoding: encoding1,
        decodeStrings,
        signal,
        writev (chunks, callback) {
            function done(error11) {
                error11 = error11.filter((e)=>e
                );
                try {
                    callback(error11.length === 0 ? undefined : error11);
                } catch (error6) {
                    process2.nextTick(()=>destroy(duplex, error6)
                    );
                }
            }
            writer.ready.then(()=>Promise.all(chunks.map((data)=>writer.write(data.chunk)
                )).then(done, done)
            , done);
        },
        write (chunk, encoding, callback) {
            if (typeof chunk === "string" && decodeStrings && !objectMode) {
                chunk = Buffer1.from(chunk, encoding);
                chunk = new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
            }
            function done(error12) {
                try {
                    callback(error12);
                } catch (error7) {
                    destroy(duplex, error7);
                }
            }
            writer.ready.then(()=>writer.write(chunk).then(done, done)
            , done);
        },
        final (callback) {
            function done(error13) {
                try {
                    callback(error13);
                } catch (error8) {
                    process2.nextTick(()=>destroy(duplex, error8)
                    );
                }
            }
            if (!writableClosed) {
                writer.close().then(done, done);
            }
        },
        read () {
            reader.read().then((chunk)=>{
                if (chunk.done) {
                    duplex.push(null);
                } else {
                    duplex.push(chunk.value);
                }
            }, (error14)=>destroy(duplex, error14)
            );
        },
        destroy (error9, callback) {
            function done() {
                try {
                    callback(error9);
                } catch (error15) {
                    process2.nextTick(()=>{
                        throw error15;
                    });
                }
            }
            async function closeWriter() {
                if (!writableClosed) {
                    await writer.abort(error9);
                }
            }
            async function closeReader() {
                if (!readableClosed) {
                    await reader.cancel(error9);
                }
            }
            if (!writableClosed || !readableClosed) {
                Promise.all([
                    closeWriter(),
                    closeReader(), 
                ]).then(done, done);
                return;
            }
            done();
        }
    });
    writer.closed.then(()=>{
        writableClosed = true;
        if (!isWritableEnded(duplex)) {
            destroy(duplex, new ERR_STREAM_PREMATURE_CLOSE());
        }
    }, (error16)=>{
        writableClosed = true;
        readableClosed = true;
        destroy(duplex, error16);
    });
    reader.closed.then(()=>{
        readableClosed = true;
        if (!isReadableEnded1(duplex)) {
            duplex.push(null);
        }
    }, (error17)=>{
        writableClosed = true;
        readableClosed = true;
        destroy(duplex, error17);
    });
    return duplex;
};
delete Readable.Duplex;
delete Readable.PassThrough;
delete Readable.Readable;
delete Readable.Stream;
delete Readable.Transform;
delete Readable.Writable;
delete Readable._isUint8Array;
delete Readable._uint8ArrayToBuffer;
delete Readable.addAbortSignal;
delete Readable.compose;
delete Readable.destroy;
delete Readable.finished;
delete Readable.isDisturbed;
delete Readable.isErrored;
delete Readable.isReadable;
delete Readable.pipeline;
function newReadableStreamFromStreamReadable(streamReadable, options = kEmptyObject) {
    if (typeof streamReadable?._readableState !== "object") {
        throw new ERR_INVALID_ARG_TYPE("streamReadable", "stream.Readable", streamReadable);
    }
    if (isDestroyed(streamReadable) || !isReadable1(streamReadable)) {
        const readable = new ReadableStream();
        readable.cancel();
        return readable;
    }
    const objectMode = streamReadable.readableObjectMode;
    const highWaterMark = streamReadable.readableHighWaterMark;
    const evaluateStrategyOrFallback = (strategy)=>{
        if (strategy) {
            return strategy;
        }
        if (objectMode) {
            return new CountQueuingStrategy({
                highWaterMark
            });
        }
        return {
            highWaterMark
        };
    };
    const strategy1 = evaluateStrategyOrFallback(options?.strategy);
    let controller;
    function onData(chunk) {
        if (Buffer1.isBuffer(chunk) && !objectMode) {
            chunk = new Uint8Array(chunk);
        }
        controller.enqueue(chunk);
        if (controller.desiredSize <= 0) {
            streamReadable.pause();
        }
    }
    streamReadable.pause();
    const cleanup = eos(streamReadable, (error18)=>{
        if (error18?.code === "ERR_STREAM_PREMATURE_CLOSE") {
            const err = new AbortError(undefined, {
                cause: error18
            });
            error18 = err;
        }
        cleanup();
        streamReadable.on("error", ()=>{});
        if (error18) {
            return controller.error(error18);
        }
        controller.close();
    });
    streamReadable.on("data", onData);
    return new ReadableStream({
        start (c) {
            controller = c;
        },
        pull () {
            streamReadable.resume();
        },
        cancel (reason) {
            destroy(streamReadable, reason);
        }
    }, strategy1);
}
function newWritableStreamFromStreamWritable(streamWritable) {
    if (typeof streamWritable?._writableState !== "object") {
        throw new ERR_INVALID_ARG_TYPE("streamWritable", "stream.Writable", streamWritable);
    }
    if (isDestroyed(streamWritable) || !isWritable1(streamWritable)) {
        const writable = new WritableStream();
        writable.close();
        return writable;
    }
    const highWaterMark = streamWritable.writableHighWaterMark;
    const strategy = streamWritable.writableObjectMode ? new CountQueuingStrategy({
        highWaterMark
    }) : {
        highWaterMark
    };
    let controller;
    let backpressurePromise;
    let closed;
    function onDrain() {
        if (backpressurePromise !== undefined) {
            backpressurePromise.resolve();
        }
    }
    const cleanup = eos(streamWritable, (error19)=>{
        if (error19?.code === "ERR_STREAM_PREMATURE_CLOSE") {
            const err = new AbortError(undefined, {
                cause: error19
            });
            error19 = err;
        }
        cleanup();
        streamWritable.on("error", ()=>{});
        if (error19 != null) {
            if (backpressurePromise !== undefined) {
                backpressurePromise.reject(error19);
            }
            if (closed !== undefined) {
                closed.reject(error19);
                closed = undefined;
            }
            controller.error(error19);
            controller = undefined;
            return;
        }
        if (closed !== undefined) {
            closed.resolve();
            closed = undefined;
            return;
        }
        controller.error(new AbortError());
        controller = undefined;
    });
    streamWritable.on("drain", onDrain);
    return new WritableStream({
        start (c) {
            controller = c;
        },
        async write (chunk) {
            if (streamWritable.writableNeedDrain || !streamWritable.write(chunk)) {
                backpressurePromise = createDeferredPromise();
                return backpressurePromise.promise.finally(()=>{
                    backpressurePromise = undefined;
                });
            }
        },
        abort (reason) {
            destroy(streamWritable, reason);
        },
        close () {
            if (closed === undefined && !isWritableEnded(streamWritable)) {
                closed = createDeferredPromise();
                streamWritable.end();
                return closed.promise;
            }
            controller = undefined;
            return Promise.resolve();
        }
    }, strategy);
}
function newReadableWritablePairFromDuplex(duplex) {
    if (typeof duplex?._writableState !== "object" || typeof duplex?._readableState !== "object") {
        throw new ERR_INVALID_ARG_TYPE("duplex", "stream.Duplex", duplex);
    }
    if (isDestroyed(duplex)) {
        const writable = new WritableStream();
        const readable = new ReadableStream();
        writable.close();
        readable.cancel();
        return {
            readable,
            writable
        };
    }
    const writable = isWritable1(duplex) ? newWritableStreamFromStreamWritable(duplex) : new WritableStream();
    if (!isWritable1(duplex)) {
        writable.close();
    }
    const readable = isReadable1(duplex) ? newReadableStreamFromStreamReadable(duplex) : new ReadableStream();
    if (!isReadable1(duplex)) {
        readable.cancel();
    }
    return {
        writable,
        readable
    };
}
Readable.toWeb = newReadableStreamFromStreamReadable;
Writable.toWeb = newWritableStreamFromStreamWritable;
Duplex.toWeb = newReadableWritablePairFromDuplex;
function createWritableStdioStream(writer, name36) {
    const stream = new mu({
        write (buf, enc, cb) {
            if (!writer) {
                this.destroy(new Error(`Deno.${name36} is not available in this environment`));
                return;
            }
            writer.writeSync(buf instanceof Uint8Array ? buf : Buffer.from(buf, enc));
            cb();
        },
        destroy (err, cb) {
            cb(err);
            this._undestroy();
            if (!this._writableState.emitClose) {
                nextTick(()=>this.emit("close")
                );
            }
        }
    });
    stream.fd = writer?.rid ?? -1;
    stream.destroySoon = stream.destroy;
    stream._isStdio = true;
    stream.once("close", ()=>writer?.close()
    );
    Object.defineProperties(stream, {
        columns: {
            enumerable: true,
            configurable: true,
            get: ()=>Deno.isatty?.(writer?.rid) ? Deno.consoleSize?.().columns : undefined
        },
        rows: {
            enumerable: true,
            configurable: true,
            get: ()=>Deno.isatty?.(writer?.rid) ? Deno.consoleSize?.().rows : undefined
        },
        isTTY: {
            enumerable: true,
            configurable: true,
            get: ()=>Deno.isatty?.(writer?.rid)
        },
        getWindowSize: {
            enumerable: true,
            configurable: true,
            value: ()=>Deno.isatty?.(writer?.rid) ? Object.values(Deno.consoleSize?.()) : undefined
        }
    });
    if (Deno.isatty?.(writer?.rid)) {
        stream.cursorTo = function(x, y, callback) {
            return cursorTo(this, x, y, callback);
        };
        stream.moveCursor = function(dx, dy, callback) {
            return moveCursor(this, dx, dy, callback);
        };
        stream.clearLine = function(dir, callback) {
            return clearLine(this, dir, callback);
        };
        stream.clearScreenDown = function(callback) {
            return clearScreenDown(this, callback);
        };
    }
    return stream;
}
const stderr = stdio.stderr = createWritableStdioStream(Deno.stderr, "stderr");
const stdout = stdio.stdout = createWritableStdioStream(Deno.stdout, "stdout");
const stdin = stdio.stdin = new Au({
    highWaterMark: 0,
    emitClose: false,
    read (size) {
        const p = Buffer.alloc(size || 16 * 1024);
        if (!Deno.stdin) {
            this.destroy(new Error("Deno.stdin is not available in this environment"));
            return;
        }
        Deno.stdin.read(p).then((length)=>{
            this.push(length === null ? null : p.slice(0, length));
        }, (error20)=>{
            this.destroy(error20);
        });
    }
});
stdin.on("close", ()=>Deno.stdin?.close()
);
stdin.fd = Deno.stdin?.rid ?? -1;
Object.defineProperty(stdin, "isTTY", {
    enumerable: true,
    configurable: true,
    get () {
        return Deno.isatty?.(Deno.stdin.rid);
    }
});
stdin._isRawMode = false;
stdin.setRawMode = (enable)=>{
    Deno.stdin?.setRaw?.(enable);
    stdin._isRawMode = enable;
    return stdin;
};
Object.defineProperty(stdin, "isRaw", {
    enumerable: true,
    configurable: true,
    get () {
        return stdin._isRawMode;
    }
});
function registerDestroyHook(_target, _asyncId, _prop) {}
var constants1;
(function(constants4) {
    constants4[constants4["kInit"] = 0] = "kInit";
    constants4[constants4["kBefore"] = 1] = "kBefore";
    constants4[constants4["kAfter"] = 2] = "kAfter";
    constants4[constants4["kDestroy"] = 3] = "kDestroy";
    constants4[constants4["kPromiseResolve"] = 4] = "kPromiseResolve";
    constants4[constants4["kTotals"] = 5] = "kTotals";
    constants4[constants4["kCheck"] = 6] = "kCheck";
    constants4[constants4["kExecutionAsyncId"] = 7] = "kExecutionAsyncId";
    constants4[constants4["kTriggerAsyncId"] = 8] = "kTriggerAsyncId";
    constants4[constants4["kAsyncIdCounter"] = 9] = "kAsyncIdCounter";
    constants4[constants4["kDefaultTriggerAsyncId"] = 10] = "kDefaultTriggerAsyncId";
    constants4[constants4["kUsesExecutionAsyncResource"] = 11] = "kUsesExecutionAsyncResource";
    constants4[constants4["kStackLength"] = 12] = "kStackLength";
})(constants1 || (constants1 = {}));
const asyncHookFields = new Uint32Array(Object.keys(constants1).length);
function newAsyncId() {
    return ++asyncIdFields[constants1.kAsyncIdCounter];
}
var UidFields;
(function(UidFields1) {
    UidFields1[UidFields1["kExecutionAsyncId"] = 0] = "kExecutionAsyncId";
    UidFields1[UidFields1["kTriggerAsyncId"] = 1] = "kTriggerAsyncId";
    UidFields1[UidFields1["kAsyncIdCounter"] = 2] = "kAsyncIdCounter";
    UidFields1[UidFields1["kDefaultTriggerAsyncId"] = 3] = "kDefaultTriggerAsyncId";
    UidFields1[UidFields1["kUidFieldsCount"] = 4] = "kUidFieldsCount";
})(UidFields || (UidFields = {}));
const asyncIdFields = new Float64Array(Object.keys(UidFields).length);
asyncIdFields[UidFields.kAsyncIdCounter] = 1;
asyncIdFields[UidFields.kDefaultTriggerAsyncId] = -1;
var providerType;
(function(providerType1) {
    providerType1[providerType1["NONE"] = 0] = "NONE";
    providerType1[providerType1["DIRHANDLE"] = 1] = "DIRHANDLE";
    providerType1[providerType1["DNSCHANNEL"] = 2] = "DNSCHANNEL";
    providerType1[providerType1["ELDHISTOGRAM"] = 3] = "ELDHISTOGRAM";
    providerType1[providerType1["FILEHANDLE"] = 4] = "FILEHANDLE";
    providerType1[providerType1["FILEHANDLECLOSEREQ"] = 5] = "FILEHANDLECLOSEREQ";
    providerType1[providerType1["FIXEDSIZEBLOBCOPY"] = 6] = "FIXEDSIZEBLOBCOPY";
    providerType1[providerType1["FSEVENTWRAP"] = 7] = "FSEVENTWRAP";
    providerType1[providerType1["FSREQCALLBACK"] = 8] = "FSREQCALLBACK";
    providerType1[providerType1["FSREQPROMISE"] = 9] = "FSREQPROMISE";
    providerType1[providerType1["GETADDRINFOREQWRAP"] = 10] = "GETADDRINFOREQWRAP";
    providerType1[providerType1["GETNAMEINFOREQWRAP"] = 11] = "GETNAMEINFOREQWRAP";
    providerType1[providerType1["HEAPSNAPSHOT"] = 12] = "HEAPSNAPSHOT";
    providerType1[providerType1["HTTP2SESSION"] = 13] = "HTTP2SESSION";
    providerType1[providerType1["HTTP2STREAM"] = 14] = "HTTP2STREAM";
    providerType1[providerType1["HTTP2PING"] = 15] = "HTTP2PING";
    providerType1[providerType1["HTTP2SETTINGS"] = 16] = "HTTP2SETTINGS";
    providerType1[providerType1["HTTPINCOMINGMESSAGE"] = 17] = "HTTPINCOMINGMESSAGE";
    providerType1[providerType1["HTTPCLIENTREQUEST"] = 18] = "HTTPCLIENTREQUEST";
    providerType1[providerType1["JSSTREAM"] = 19] = "JSSTREAM";
    providerType1[providerType1["JSUDPWRAP"] = 20] = "JSUDPWRAP";
    providerType1[providerType1["MESSAGEPORT"] = 21] = "MESSAGEPORT";
    providerType1[providerType1["PIPECONNECTWRAP"] = 22] = "PIPECONNECTWRAP";
    providerType1[providerType1["PIPESERVERWRAP"] = 23] = "PIPESERVERWRAP";
    providerType1[providerType1["PIPEWRAP"] = 24] = "PIPEWRAP";
    providerType1[providerType1["PROCESSWRAP"] = 25] = "PROCESSWRAP";
    providerType1[providerType1["PROMISE"] = 26] = "PROMISE";
    providerType1[providerType1["QUERYWRAP"] = 27] = "QUERYWRAP";
    providerType1[providerType1["SHUTDOWNWRAP"] = 28] = "SHUTDOWNWRAP";
    providerType1[providerType1["SIGNALWRAP"] = 29] = "SIGNALWRAP";
    providerType1[providerType1["STATWATCHER"] = 30] = "STATWATCHER";
    providerType1[providerType1["STREAMPIPE"] = 31] = "STREAMPIPE";
    providerType1[providerType1["TCPCONNECTWRAP"] = 32] = "TCPCONNECTWRAP";
    providerType1[providerType1["TCPSERVERWRAP"] = 33] = "TCPSERVERWRAP";
    providerType1[providerType1["TCPWRAP"] = 34] = "TCPWRAP";
    providerType1[providerType1["TTYWRAP"] = 35] = "TTYWRAP";
    providerType1[providerType1["UDPSENDWRAP"] = 36] = "UDPSENDWRAP";
    providerType1[providerType1["UDPWRAP"] = 37] = "UDPWRAP";
    providerType1[providerType1["SIGINTWATCHDOG"] = 38] = "SIGINTWATCHDOG";
    providerType1[providerType1["WORKER"] = 39] = "WORKER";
    providerType1[providerType1["WORKERHEAPSNAPSHOT"] = 40] = "WORKERHEAPSNAPSHOT";
    providerType1[providerType1["WRITEWRAP"] = 41] = "WRITEWRAP";
    providerType1[providerType1["ZLIB"] = 42] = "ZLIB";
})(providerType || (providerType = {}));
const kInvalidAsyncId = -1;
class AsyncWrap {
    provider = providerType.NONE;
    asyncId = kInvalidAsyncId;
    constructor(provider){
        this.provider = provider;
        this.getAsyncId();
    }
    getAsyncId() {
        this.asyncId = this.asyncId === kInvalidAsyncId ? newAsyncId() : this.asyncId;
        return this.asyncId;
    }
    getProviderType() {
        return this.provider;
    }
}
const mod8 = {
    async_hook_fields: asyncHookFields,
    asyncIdFields: asyncIdFields,
    registerDestroyHook: registerDestroyHook,
    constants: constants1,
    newAsyncId: newAsyncId,
    UidFields: UidFields,
    providerType: providerType,
    AsyncWrap: AsyncWrap
};
const mod9 = {};
const v4Seg = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
const v4Str = `(${v4Seg}[.]){3}${v4Seg}`;
const IPv4Reg = new RegExp(`^${v4Str}$`);
const v6Seg = "(?:[0-9a-fA-F]{1,4})";
const IPv6Reg = new RegExp("^(" + `(?:${v6Seg}:){7}(?:${v6Seg}|:)|` + `(?:${v6Seg}:){6}(?:${v4Str}|:${v6Seg}|:)|` + `(?:${v6Seg}:){5}(?::${v4Str}|(:${v6Seg}){1,2}|:)|` + `(?:${v6Seg}:){4}(?:(:${v6Seg}){0,1}:${v4Str}|(:${v6Seg}){1,3}|:)|` + `(?:${v6Seg}:){3}(?:(:${v6Seg}){0,2}:${v4Str}|(:${v6Seg}){1,4}|:)|` + `(?:${v6Seg}:){2}(?:(:${v6Seg}){0,3}:${v4Str}|(:${v6Seg}){1,5}|:)|` + `(?:${v6Seg}:){1}(?:(:${v6Seg}){0,4}:${v4Str}|(:${v6Seg}){1,6}|:)|` + `(?::((?::${v6Seg}){0,5}:${v4Str}|(?::${v6Seg}){1,7}|:))` + ")(%[0-9a-zA-Z-.:]{1,})?$");
function isIPv4(ip) {
    return RegExp.prototype.test.call(IPv4Reg, ip);
}
function isIPv6(ip) {
    return RegExp.prototype.test.call(IPv6Reg, ip);
}
function isIP(ip) {
    if (isIPv4(ip)) {
        return 4;
    }
    if (isIPv6(ip)) {
        return 6;
    }
    return 0;
}
Symbol("normalizedArgs");
function ares_strerror(code) {
    const errorText = [
        "Successful completion",
        "DNS server returned answer with no data",
        "DNS server claims query was misformatted",
        "DNS server returned general failure",
        "Domain name not found",
        "DNS server does not implement requested operation",
        "DNS server refused query",
        "Misformatted DNS query",
        "Misformatted domain name",
        "Unsupported address family",
        "Misformatted DNS reply",
        "Could not contact DNS servers",
        "Timeout while contacting DNS servers",
        "End of file",
        "Error reading file",
        "Out of memory",
        "Channel is being destroyed",
        "Misformatted string",
        "Illegal flags specified",
        "Given hostname is not numeric",
        "Illegal hints flags specified",
        "c-ares library initialization not yet performed",
        "Error loading iphlpapi.dll",
        "Could not find GetNetworkParams function",
        "DNS query cancelled", 
    ];
    if (code >= 0 && code < errorText.length) {
        return errorText[code];
    } else {
        return "unknown";
    }
}
class GetAddrInfoReqWrap extends AsyncWrap {
    family;
    hostname;
    callback;
    resolve;
    reject;
    oncomplete;
    constructor(){
        super(providerType.GETADDRINFOREQWRAP);
    }
}
function getaddrinfo(req, hostname, family, _hints, verbatim) {
    let addresses = [];
    const recordTypes = [];
    if (family === 0 || family === 4) {
        recordTypes.push("A");
    }
    if (family === 0 || family === 6) {
        recordTypes.push("AAAA");
    }
    (async ()=>{
        await Promise.allSettled(recordTypes.map((recordType)=>Deno.resolveDns(hostname, recordType).then((records)=>{
                records.forEach((record)=>addresses.push(record)
                );
            })
        ));
        const error21 = addresses.length ? 0 : codeMap.get("EAI_NODATA");
        if (!verbatim) {
            addresses.sort((a, b)=>{
                if (isIPv4(a)) {
                    return -1;
                } else if (isIPv4(b)) {
                    return 1;
                }
                return 0;
            });
        }
        if (isWindows && hostname === "localhost") {
            addresses = addresses.filter((address)=>isIPv4(address)
            );
        }
        req.oncomplete(error21, addresses);
    })();
    return 0;
}
class QueryReqWrap extends AsyncWrap {
    bindingName;
    hostname;
    ttl;
    callback;
    resolve;
    reject;
    oncomplete;
    constructor(){
        super(providerType.QUERYWRAP);
    }
}
function fqdnToHostname(fqdn) {
    return fqdn.replace(/\.$/, "");
}
function compressIPv6(address) {
    const formatted = address.replace(/\b(?:0+:){2,}/, ":");
    const finalAddress = formatted.split(":").map((octet)=>{
        if (octet.match(/^\d+\.\d+\.\d+\.\d+$/)) {
            return Number(octet.replaceAll(".", "")).toString(16);
        }
        return octet.replace(/\b0+/g, "");
    }).join(":");
    return finalAddress;
}
class ChannelWrap extends AsyncWrap {
    #servers = [];
    #timeout;
    #tries;
    constructor(timeout, tries){
        super(providerType.DNSCHANNEL);
        this.#timeout = timeout;
        this.#tries = tries;
    }
    async #query(query, recordType) {
        let code;
        let ret;
        if (this.#servers.length) {
            for (const [ipAddr, port] of this.#servers){
                const resolveOptions = {
                    nameServer: {
                        ipAddr,
                        port
                    }
                };
                ({ code , ret  } = await this.#resolve(query, recordType, resolveOptions));
                if (code === 0 || code === codeMap.get("EAI_NODATA")) {
                    break;
                }
            }
        } else {
            ({ code , ret  } = await this.#resolve(query, recordType));
        }
        return {
            code: code,
            ret: ret
        };
    }
    async #resolve(query1, recordType1, resolveOptions) {
        let ret = [];
        let code = 0;
        try {
            ret = await Deno.resolveDns(query1, recordType1, resolveOptions);
        } catch (e) {
            if (e instanceof Deno.errors.NotFound) {
                code = codeMap.get("EAI_NODATA");
            } else {
                code = codeMap.get("UNKNOWN");
            }
        }
        return {
            code,
            ret
        };
    }
    queryAny(req, name37) {
        (async ()=>{
            const records = [];
            await Promise.allSettled([
                this.#query(name37, "A").then(({ ret  })=>{
                    ret.forEach((record)=>records.push({
                            type: "A",
                            address: record
                        })
                    );
                }),
                this.#query(name37, "AAAA").then(({ ret  })=>{
                    ret.forEach((record)=>records.push({
                            type: "AAAA",
                            address: compressIPv6(record)
                        })
                    );
                }),
                this.#query(name37, "CAA").then(({ ret  })=>{
                    ret.forEach(({ critical , tag , value  })=>records.push({
                            type: "CAA",
                            [tag]: value,
                            critical: +critical && 128
                        })
                    );
                }),
                this.#query(name37, "CNAME").then(({ ret  })=>{
                    ret.forEach((record)=>records.push({
                            type: "CNAME",
                            value: record
                        })
                    );
                }),
                this.#query(name37, "MX").then(({ ret  })=>{
                    ret.forEach(({ preference , exchange  })=>records.push({
                            type: "MX",
                            priority: preference,
                            exchange: fqdnToHostname(exchange)
                        })
                    );
                }),
                this.#query(name37, "NAPTR").then(({ ret  })=>{
                    ret.forEach(({ order , preference , flags , services , regexp , replacement  })=>records.push({
                            type: "NAPTR",
                            order,
                            preference,
                            flags,
                            service: services,
                            regexp,
                            replacement
                        })
                    );
                }),
                this.#query(name37, "NS").then(({ ret  })=>{
                    ret.forEach((record)=>records.push({
                            type: "NS",
                            value: fqdnToHostname(record)
                        })
                    );
                }),
                this.#query(name37, "PTR").then(({ ret  })=>{
                    ret.forEach((record)=>records.push({
                            type: "PTR",
                            value: fqdnToHostname(record)
                        })
                    );
                }),
                this.#query(name37, "SOA").then(({ ret  })=>{
                    ret.forEach(({ mname , rname , serial , refresh , retry , expire , minimum  })=>records.push({
                            type: "SOA",
                            nsname: fqdnToHostname(mname),
                            hostmaster: fqdnToHostname(rname),
                            serial,
                            refresh,
                            retry,
                            expire,
                            minttl: minimum
                        })
                    );
                }),
                this.#query(name37, "SRV").then(({ ret  })=>{
                    ret.forEach(({ priority , weight , port , target  })=>records.push({
                            type: "SRV",
                            priority,
                            weight,
                            port,
                            name: target
                        })
                    );
                }),
                this.#query(name37, "TXT").then(({ ret  })=>{
                    ret.forEach((record)=>records.push({
                            type: "TXT",
                            entries: record
                        })
                    );
                }), 
            ]);
            const err = records.length ? 0 : codeMap.get("EAI_NODATA");
            req.oncomplete(err, records);
        })();
        return 0;
    }
    queryA(req, name38) {
        this.#query(name38, "A").then(({ code , ret  })=>{
            req.oncomplete(code, ret);
        });
        return 0;
    }
    queryAaaa(req, name39) {
        this.#query(name39, "AAAA").then(({ code , ret  })=>{
            const records = ret.map((record)=>compressIPv6(record)
            );
            req.oncomplete(code, records);
        });
        return 0;
    }
    queryCaa(req, name40) {
        this.#query(name40, "CAA").then(({ code , ret  })=>{
            const records = ret.map(({ critical , tag , value  })=>({
                    [tag]: value,
                    critical: +critical && 128
                })
            );
            req.oncomplete(code, records);
        });
        return 0;
    }
    queryCname(req, name41) {
        this.#query(name41, "CNAME").then(({ code , ret  })=>{
            req.oncomplete(code, ret);
        });
        return 0;
    }
    queryMx(req, name42) {
        this.#query(name42, "MX").then(({ code , ret  })=>{
            const records = ret.map(({ preference , exchange  })=>({
                    priority: preference,
                    exchange: fqdnToHostname(exchange)
                })
            );
            req.oncomplete(code, records);
        });
        return 0;
    }
    queryNaptr(req, name43) {
        this.#query(name43, "NAPTR").then(({ code , ret  })=>{
            const records = ret.map(({ order , preference , flags , services , regexp , replacement  })=>({
                    flags,
                    service: services,
                    regexp,
                    replacement,
                    order,
                    preference
                })
            );
            req.oncomplete(code, records);
        });
        return 0;
    }
    queryNs(req, name44) {
        this.#query(name44, "NS").then(({ code , ret  })=>{
            const records = ret.map((record)=>fqdnToHostname(record)
            );
            req.oncomplete(code, records);
        });
        return 0;
    }
    queryPtr(req, name45) {
        this.#query(name45, "PTR").then(({ code , ret  })=>{
            const records = ret.map((record)=>fqdnToHostname(record)
            );
            req.oncomplete(code, records);
        });
        return 0;
    }
    querySoa(req, name46) {
        this.#query(name46, "SOA").then(({ code , ret  })=>{
            let record = {};
            if (ret.length) {
                const { mname , rname , serial , refresh , retry , expire , minimum  } = ret[0];
                record = {
                    nsname: fqdnToHostname(mname),
                    hostmaster: fqdnToHostname(rname),
                    serial,
                    refresh,
                    retry,
                    expire,
                    minttl: minimum
                };
            }
            req.oncomplete(code, record);
        });
        return 0;
    }
    querySrv(req, name47) {
        this.#query(name47, "SRV").then(({ code , ret  })=>{
            const records = ret.map(({ priority , weight , port , target  })=>({
                    priority,
                    weight,
                    port,
                    name: target
                })
            );
            req.oncomplete(code, records);
        });
        return 0;
    }
    queryTxt(req, name48) {
        this.#query(name48, "TXT").then(({ code , ret  })=>{
            req.oncomplete(code, ret);
        });
        return 0;
    }
    getHostByAddr(_req, _name) {
        notImplemented("cares.ChannelWrap.prototype.getHostByAddr");
    }
    getServers() {
        return this.#servers;
    }
    setServers(servers) {
        if (typeof servers === "string") {
            const tuples = [];
            for(let i116 = 0; i116 < servers.length; i116 += 2){
                tuples.push([
                    servers[i116],
                    parseInt(servers[i116 + 1])
                ]);
            }
            this.#servers = tuples;
        } else {
            this.#servers = servers.map(([_ipVersion, ip, port])=>[
                    ip,
                    port
                ]
            );
        }
        return 0;
    }
    setLocalAddress(_addr0, _addr1) {
        notImplemented("cares.ChannelWrap.prototype.setLocalAddress");
    }
    cancel() {
        notImplemented("cares.ChannelWrap.prototype.cancel");
    }
}
const DNS_ESETSRVPENDING = -1000;
const EMSG_ESETSRVPENDING = "There are pending queries.";
function strerror(code) {
    return code === DNS_ESETSRVPENDING ? EMSG_ESETSRVPENDING : ares_strerror(code);
}
const mod10 = {
    GetAddrInfoReqWrap: GetAddrInfoReqWrap,
    getaddrinfo: getaddrinfo,
    QueryReqWrap: QueryReqWrap,
    ChannelWrap: ChannelWrap,
    strerror: strerror
};
const mod11 = {};
function timingSafeEqual(a, b) {
    if (a.byteLength !== b.byteLength) {
        return false;
    }
    if (!(a instanceof DataView)) {
        a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
    }
    if (!(b instanceof DataView)) {
        b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
    }
    assert(a instanceof DataView);
    assert(b instanceof DataView);
    const length = a.byteLength;
    let out = 0;
    let i117 = -1;
    while(++i117 < length){
        out |= a.getUint8(i117) ^ b.getUint8(i117);
    }
    return out === 0;
}
const timingSafeEqual1 = (a, b)=>{
    if (a instanceof Buffer) a = new DataView(a.buffer);
    if (a instanceof Buffer) b = new DataView(a.buffer);
    return timingSafeEqual(a, b);
};
function getFipsCrypto() {
    notImplemented("crypto.getFipsCrypto");
}
function setFipsCrypto(_fips) {
    notImplemented("crypto.setFipsCrypto");
}
const mod12 = {
    timingSafeEqual: timingSafeEqual1,
    getFipsCrypto: getFipsCrypto,
    setFipsCrypto: setFipsCrypto
};
const mod13 = {};
const mod14 = {};
const mod15 = {};
const mod16 = {};
const mod17 = {};
const mod18 = {};
const mod19 = {};
const mod20 = {};
const mod21 = {};
const mod22 = {};
const mod23 = {};
const mod24 = {};
const mod25 = {};
const mod26 = {};
const mod27 = {};
const mod28 = {};
class HandleWrap extends AsyncWrap {
    constructor(provider){
        super(provider);
    }
    close(cb = ()=>{}) {
        this._onClose();
        queueMicrotask(cb);
    }
    ref() {
        unreachable();
    }
    unref() {
        unreachable();
    }
    _onClose() {}
}
async function writeAll(w, arr) {
    let nwritten = 0;
    while(nwritten < arr.length){
        nwritten += await w.write(arr.subarray(nwritten));
    }
}
function writeAllSync(w, arr) {
    let nwritten = 0;
    while(nwritten < arr.length){
        nwritten += w.writeSync(arr.subarray(nwritten));
    }
}
var StreamBaseStateFields;
(function(StreamBaseStateFields1) {
    StreamBaseStateFields1[StreamBaseStateFields1["kReadBytesOrError"] = 0] = "kReadBytesOrError";
    StreamBaseStateFields1[StreamBaseStateFields1["kArrayBufferOffset"] = 1] = "kArrayBufferOffset";
    StreamBaseStateFields1[StreamBaseStateFields1["kBytesWritten"] = 2] = "kBytesWritten";
    StreamBaseStateFields1[StreamBaseStateFields1["kLastWriteWasAsync"] = 3] = "kLastWriteWasAsync";
    StreamBaseStateFields1[StreamBaseStateFields1["kNumStreamBaseStateFields"] = 4] = "kNumStreamBaseStateFields";
})(StreamBaseStateFields || (StreamBaseStateFields = {}));
const kReadBytesOrError = StreamBaseStateFields.kReadBytesOrError;
const kArrayBufferOffset = StreamBaseStateFields.kArrayBufferOffset;
const kBytesWritten = StreamBaseStateFields.kBytesWritten;
const kLastWriteWasAsync = StreamBaseStateFields.kLastWriteWasAsync;
const kNumStreamBaseStateFields = StreamBaseStateFields.kNumStreamBaseStateFields;
const streamBaseState = new Uint8Array(5);
streamBaseState[kLastWriteWasAsync] = 1;
class WriteWrap extends AsyncWrap {
    handle;
    oncomplete;
    async;
    bytes;
    buffer;
    callback;
    _chunks;
    constructor(){
        super(providerType.WRITEWRAP);
    }
}
class ShutdownWrap extends AsyncWrap {
    handle;
    oncomplete;
    callback;
    constructor(){
        super(providerType.SHUTDOWNWRAP);
    }
}
const kStreamBaseField = Symbol("kStreamBaseField");
const SUGGESTED_SIZE = 64 * 1024;
class LibuvStreamWrap extends HandleWrap {
    [kStreamBaseField];
    reading;
    #reading = false;
    destroyed = false;
    writeQueueSize = 0;
    bytesRead = 0;
    bytesWritten = 0;
    onread;
    constructor(provider, stream){
        super(provider);
        this.#attachToObject(stream);
    }
    readStart() {
        if (!this.#reading) {
            this.#reading = true;
            this.#read();
        }
        return 0;
    }
    readStop() {
        this.#reading = false;
        return 0;
    }
    shutdown(req) {
        const status = this._onClose();
        try {
            req.oncomplete(status);
        } catch  {}
        return 0;
    }
    useUserBuffer(_userBuf) {
        notImplemented("LibuvStreamWrap.prototype.useUserBuffer");
    }
    writeBuffer(req, data) {
        this.#write(req, data);
        return 0;
    }
    writev(req, chunks, allBuffers) {
        const count = allBuffers ? chunks.length : chunks.length >> 1;
        const buffers = new Array(count);
        if (!allBuffers) {
            for(let i118 = 0; i118 < count; i118++){
                const chunk = chunks[i118 * 2];
                if (Buffer.isBuffer(chunk)) {
                    buffers[i118] = chunk;
                }
                const encoding = chunks[i118 * 2 + 1];
                buffers[i118] = Buffer.from(chunk, encoding);
            }
        } else {
            for(let i119 = 0; i119 < count; i119++){
                buffers[i119] = chunks[i119];
            }
        }
        return this.writeBuffer(req, Buffer.concat(buffers));
    }
    writeAsciiString(req, data) {
        const buffer = new TextEncoder().encode(data);
        return this.writeBuffer(req, buffer);
    }
    writeUtf8String(req, data) {
        const buffer = new TextEncoder().encode(data);
        return this.writeBuffer(req, buffer);
    }
    writeUcs2String(_req, _data) {
        notImplemented("LibuvStreamWrap.prototype.writeUcs2String");
    }
    writeLatin1String(req, data) {
        const buffer = Buffer.from(data, "latin1");
        return this.writeBuffer(req, buffer);
    }
    _onClose() {
        let status = 0;
        this.#reading = false;
        try {
            this[kStreamBaseField]?.close();
        } catch  {
            status = codeMap.get("ENOTCONN");
        }
        return status;
    }
     #attachToObject(stream) {
        this[kStreamBaseField] = stream;
    }
    async #read() {
        let buf = new Uint8Array(SUGGESTED_SIZE);
        let nread;
        try {
            nread = await this[kStreamBaseField].read(buf);
        } catch (e) {
            if (e instanceof Deno.errors.Interrupted || e instanceof Deno.errors.BadResource) {
                nread = codeMap.get("EOF");
            } else if (e instanceof Deno.errors.ConnectionReset || e instanceof Deno.errors.ConnectionAborted) {
                nread = codeMap.get("ECONNRESET");
            } else {
                nread = codeMap.get("UNKNOWN");
            }
            buf = new Uint8Array(0);
        }
        nread ??= codeMap.get("EOF");
        streamBaseState[kReadBytesOrError] = nread;
        if (nread > 0) {
            this.bytesRead += nread;
        }
        buf = buf.slice(0, nread);
        streamBaseState[kArrayBufferOffset] = 0;
        try {
            this.onread(buf, nread);
        } catch  {}
        if (nread >= 0 && this.#reading) {
            this.#read();
        }
    }
    async #write(req, data) {
        const { byteLength  } = data;
        try {
            await writeAll(this[kStreamBaseField], data);
        } catch (e) {
            let status;
            if (e instanceof Deno.errors.BadResource || e instanceof Deno.errors.BrokenPipe) {
                status = codeMap.get("EBADF");
            } else {
                status = codeMap.get("UNKNOWN");
            }
            try {
                req.oncomplete(status);
            } catch  {}
            return;
        }
        streamBaseState[kBytesWritten] = byteLength;
        this.bytesWritten += byteLength;
        try {
            req.oncomplete(0);
        } catch  {}
        return;
    }
}
const mod29 = {
    kReadBytesOrError: kReadBytesOrError,
    kArrayBufferOffset: kArrayBufferOffset,
    kBytesWritten: kBytesWritten,
    kLastWriteWasAsync: kLastWriteWasAsync,
    kNumStreamBaseStateFields: kNumStreamBaseStateFields,
    streamBaseState: streamBaseState,
    WriteWrap: WriteWrap,
    ShutdownWrap: ShutdownWrap,
    kStreamBaseField: kStreamBaseField,
    LibuvStreamWrap: LibuvStreamWrap
};
class ConnectionWrap extends LibuvStreamWrap {
    onconnection = null;
    constructor(provider, object){
        super(provider, object);
    }
    afterConnect(req1, status) {
        const isSuccessStatus = !status;
        const readable = isSuccessStatus;
        const writable = isSuccessStatus;
        try {
            req1.oncomplete(status, this, req1, readable, writable);
        } catch  {}
        return;
    }
}
function delay(ms, options = {}) {
    const { signal , persistent  } = options;
    if (signal?.aborted) {
        return Promise.reject(new DOMException("Delay was aborted.", "AbortError"));
    }
    return new Promise((resolve10, reject)=>{
        const abort = ()=>{
            clearTimeout(i120);
            reject(new DOMException("Delay was aborted.", "AbortError"));
        };
        const done = ()=>{
            signal?.removeEventListener("abort", abort);
            resolve10();
        };
        const i120 = setTimeout(done, ms);
        signal?.addEventListener("abort", abort, {
            once: true
        });
        if (persistent === false) {
            try {
                Deno.unrefTimer(i120);
            } catch (error22) {
                if (!(error22 instanceof ReferenceError)) {
                    throw error22;
                }
                console.error("`persistent` option is only available in Deno");
            }
        }
    });
}
function ceilPowOf2(n) {
    const roundPowOf2 = 1 << 31 - Math.clz32(n);
    return roundPowOf2 < n ? roundPowOf2 * 2 : roundPowOf2;
}
const INITIAL_ACCEPT_BACKOFF_DELAY = 5;
const MAX_ACCEPT_BACKOFF_DELAY = 1000;
var socketType;
(function(socketType2) {
    socketType2[socketType2["SOCKET"] = 0] = "SOCKET";
    socketType2[socketType2["SERVER"] = 1] = "SERVER";
    socketType2[socketType2["IPC"] = 2] = "IPC";
})(socketType || (socketType = {}));
class Pipe extends ConnectionWrap {
    reading = false;
    ipc;
    #pendingInstances = 4;
    #address;
    #backlog;
    #listener;
    #connections = 0;
    #closed = false;
    #acceptBackoffDelay;
    constructor(type, conn){
        let provider;
        let ipc;
        switch(type){
            case socketType.SOCKET:
                {
                    provider = providerType.PIPEWRAP;
                    ipc = false;
                    break;
                }
            case socketType.SERVER:
                {
                    provider = providerType.PIPESERVERWRAP;
                    ipc = false;
                    break;
                }
            case socketType.IPC:
                {
                    provider = providerType.PIPEWRAP;
                    ipc = true;
                    break;
                }
            default:
                {
                    unreachable();
                }
        }
        super(provider, conn);
        this.ipc = ipc;
        if (conn && provider === providerType.PIPEWRAP) {
            const localAddr = conn.localAddr;
            this.#address = localAddr.path;
        }
    }
    open(_fd) {
        notImplemented("Pipe.prototype.open");
    }
    bind(name49) {
        this.#address = name49;
        return 0;
    }
    connect(req2, address) {
        if (isWindows) {
            notImplemented("Pipe.prototype.connect - Windows");
        }
        const connectOptions = {
            path: address,
            transport: "unix"
        };
        Deno.connect(connectOptions).then((conn)=>{
            const localAddr = conn.localAddr;
            this.#address = req2.address = localAddr.path;
            this[kStreamBaseField] = conn;
            try {
                this.afterConnect(req2, 0);
            } catch  {}
        }, (e)=>{
            let code;
            if (e instanceof Deno.errors.NotFound) {
                code = codeMap.get("ENOENT");
            } else if (e instanceof Deno.errors.PermissionDenied) {
                code = codeMap.get("EACCES");
            } else {
                code = codeMap.get("ECONNREFUSED");
            }
            try {
                this.afterConnect(req2, code);
            } catch  {}
        });
        return 0;
    }
    listen(backlog) {
        if (isWindows) {
            notImplemented("Pipe.prototype.listen - Windows");
        }
        this.#backlog = isWindows ? this.#pendingInstances : ceilPowOf2(backlog + 1);
        const listenOptions = {
            path: this.#address,
            transport: "unix"
        };
        let listener;
        try {
            listener = Deno.listen(listenOptions);
        } catch (e) {
            if (e instanceof Deno.errors.AddrInUse) {
                return codeMap.get("EADDRINUSE");
            } else if (e instanceof Deno.errors.AddrNotAvailable) {
                return codeMap.get("EADDRNOTAVAIL");
            }
            return codeMap.get("UNKNOWN");
        }
        const address = listener.addr;
        this.#address = address.path;
        this.#listener = listener;
        this.#accept();
        return 0;
    }
    ref() {
        if (this.#listener) {
            this.#listener.ref();
        }
    }
    unref() {
        if (this.#listener) {
            this.#listener.unref();
        }
    }
    setPendingInstances(instances) {
        this.#pendingInstances = instances;
    }
    fchmod(mode) {
        if (mode != constants2.UV_READABLE && mode != constants2.UV_WRITABLE && mode != (constants2.UV_WRITABLE | constants2.UV_READABLE)) {
            return codeMap.get("EINVAL");
        }
        let desired_mode = 0;
        if (mode & constants2.UV_READABLE) {
            desired_mode |= fs.S_IRUSR | fs.S_IRGRP | fs.S_IROTH;
        }
        if (mode & constants2.UV_WRITABLE) {
            desired_mode |= fs.S_IWUSR | fs.S_IWGRP | fs.S_IWOTH;
        }
        try {
            Deno.chmodSync(this.#address, desired_mode);
        } catch  {
            return codeMap.get("UNKNOWN");
        }
        return 0;
    }
    async #acceptBackoff() {
        if (!this.#acceptBackoffDelay) {
            this.#acceptBackoffDelay = INITIAL_ACCEPT_BACKOFF_DELAY;
        } else {
            this.#acceptBackoffDelay *= 2;
        }
        if (this.#acceptBackoffDelay >= 1000) {
            this.#acceptBackoffDelay = MAX_ACCEPT_BACKOFF_DELAY;
        }
        await delay(this.#acceptBackoffDelay);
        this.#accept();
    }
    async #accept() {
        if (this.#closed) {
            return;
        }
        if (this.#connections > this.#backlog) {
            this.#acceptBackoff();
            return;
        }
        let connection;
        try {
            connection = await this.#listener.accept();
        } catch (e) {
            if (e instanceof Deno.errors.BadResource && this.#closed) {
                return;
            }
            try {
                this.onconnection(codeMap.get("UNKNOWN"), undefined);
            } catch  {}
            this.#acceptBackoff();
            return;
        }
        this.#acceptBackoffDelay = undefined;
        const connectionHandle = new Pipe(socketType.SOCKET, connection);
        this.#connections++;
        try {
            this.onconnection(0, connectionHandle);
        } catch  {}
        return this.#accept();
    }
    _onClose() {
        this.#closed = true;
        this.reading = false;
        this.#address = undefined;
        this.#backlog = undefined;
        this.#connections = 0;
        this.#acceptBackoffDelay = undefined;
        if (this.provider === providerType.PIPESERVERWRAP) {
            try {
                this.#listener.close();
            } catch  {}
        }
        return LibuvStreamWrap.prototype._onClose.call(this);
    }
}
class PipeConnectWrap extends AsyncWrap {
    oncomplete;
    address;
    constructor(){
        super(providerType.PIPECONNECTWRAP);
    }
}
var constants2;
(function(constants5) {
    constants5[constants5["SOCKET"] = socketType.SOCKET] = "SOCKET";
    constants5[constants5["SERVER"] = socketType.SERVER] = "SERVER";
    constants5[constants5["IPC"] = socketType.IPC] = "IPC";
    constants5[constants5["UV_READABLE"] = 1] = "UV_READABLE";
    constants5[constants5["UV_WRITABLE"] = 2] = "UV_WRITABLE";
})(constants2 || (constants2 = {}));
const mod30 = {
    socketType: socketType,
    Pipe: Pipe,
    PipeConnectWrap: PipeConnectWrap,
    constants: constants2
};
const mod31 = {};
const mod32 = {};
const mod33 = {};
const mod34 = {};
const mod35 = {};
const mod36 = {};
const asyncIdSymbol = Symbol("asyncIdSymbol");
const ownerSymbol = Symbol("ownerSymbol");
const mod37 = {
    asyncIdSymbol: asyncIdSymbol,
    ownerSymbol: ownerSymbol
};
const mod38 = {};
var socketType1;
(function(socketType3) {
    socketType3[socketType3["SOCKET"] = 0] = "SOCKET";
    socketType3[socketType3["SERVER"] = 1] = "SERVER";
})(socketType1 || (socketType1 = {}));
class TCPConnectWrap extends AsyncWrap {
    oncomplete;
    address;
    port;
    localAddress;
    localPort;
    constructor(){
        super(providerType.TCPCONNECTWRAP);
    }
}
var constants3;
(function(constants6) {
    constants6[constants6["SOCKET"] = socketType1.SOCKET] = "SOCKET";
    constants6[constants6["SERVER"] = socketType1.SERVER] = "SERVER";
    constants6[constants6["UV_TCP_IPV6ONLY"] = 0] = "UV_TCP_IPV6ONLY";
})(constants3 || (constants3 = {}));
class TCP extends ConnectionWrap {
    [ownerSymbol] = null;
    reading = false;
    #address;
    #port;
    #remoteAddress;
    #remoteFamily;
    #remotePort;
    #backlog;
    #listener;
    #connections = 0;
    #closed = false;
    #acceptBackoffDelay;
    constructor(type, conn){
        let provider;
        switch(type){
            case socketType1.SOCKET:
                {
                    provider = providerType.TCPWRAP;
                    break;
                }
            case socketType1.SERVER:
                {
                    provider = providerType.TCPSERVERWRAP;
                    break;
                }
            default:
                {
                    unreachable();
                }
        }
        super(provider, conn);
        if (conn && provider === providerType.TCPWRAP) {
            const localAddr = conn.localAddr;
            this.#address = localAddr.hostname;
            this.#port = localAddr.port;
            const remoteAddr = conn.remoteAddr;
            this.#remoteAddress = remoteAddr.hostname;
            this.#remotePort = remoteAddr.port;
            this.#remoteFamily = isIP(remoteAddr.hostname);
        }
    }
    open(_fd) {
        notImplemented("TCP.prototype.open");
    }
    bind(address, port) {
        return this.#bind(address, port, 0);
    }
    bind6(address, port, flags) {
        return this.#bind(address, port, flags);
    }
    connect(req3, address, port) {
        return this.#connect(req3, address, port);
    }
    connect6(req4, address, port) {
        return this.#connect(req4, address, port);
    }
    listen(backlog) {
        this.#backlog = ceilPowOf2(backlog + 1);
        const listenOptions = {
            hostname: this.#address,
            port: this.#port,
            transport: "tcp"
        };
        let listener;
        try {
            listener = Deno.listen(listenOptions);
        } catch (e) {
            if (e instanceof Deno.errors.AddrInUse) {
                return codeMap.get("EADDRINUSE");
            } else if (e instanceof Deno.errors.AddrNotAvailable) {
                return codeMap.get("EADDRNOTAVAIL");
            }
            return codeMap.get("UNKNOWN");
        }
        const address = listener.addr;
        this.#address = address.hostname;
        this.#port = address.port;
        this.#listener = listener;
        this.#accept();
        return 0;
    }
    ref() {
        if (this.#listener) {
            this.#listener.ref();
        }
        if (this[kStreamBaseField]) {
            this[kStreamBaseField].ref();
        }
    }
    unref() {
        if (this.#listener) {
            this.#listener.unref();
        }
        if (this[kStreamBaseField]) {
            this[kStreamBaseField].unref();
        }
    }
    getsockname(sockname) {
        if (typeof this.#address === "undefined" || typeof this.#port === "undefined") {
            return codeMap.get("EADDRNOTAVAIL");
        }
        sockname.address = this.#address;
        sockname.port = this.#port;
        sockname.family = isIP(this.#address);
        return 0;
    }
    getpeername(peername) {
        if (typeof this.#remoteAddress === "undefined" || typeof this.#remotePort === "undefined") {
            return codeMap.get("EADDRNOTAVAIL");
        }
        peername.address = this.#remoteAddress;
        peername.port = this.#remotePort;
        peername.family = this.#remoteFamily;
        return 0;
    }
    setNoDelay(_noDelay) {
        return 0;
    }
    setKeepAlive(_enable, _initialDelay) {
        return 0;
    }
    setSimultaneousAccepts(_enable) {
        notImplemented("TCP.prototype.setSimultaneousAccepts");
    }
     #bind(address, port, _flags) {
        this.#address = address;
        this.#port = port;
        return 0;
    }
     #connect(req5, address1, port1) {
        this.#remoteAddress = address1;
        this.#remotePort = port1;
        this.#remoteFamily = isIP(address1);
        const connectOptions = {
            hostname: address1,
            port: port1,
            transport: "tcp"
        };
        Deno.connect(connectOptions).then((conn)=>{
            const localAddr = conn.localAddr;
            this.#address = req5.localAddress = localAddr.hostname;
            this.#port = req5.localPort = localAddr.port;
            this[kStreamBaseField] = conn;
            try {
                this.afterConnect(req5, 0);
            } catch  {}
        }, ()=>{
            try {
                this.afterConnect(req5, codeMap.get("ECONNREFUSED"));
            } catch  {}
        });
        return 0;
    }
    async #acceptBackoff() {
        if (!this.#acceptBackoffDelay) {
            this.#acceptBackoffDelay = INITIAL_ACCEPT_BACKOFF_DELAY;
        } else {
            this.#acceptBackoffDelay *= 2;
        }
        if (this.#acceptBackoffDelay >= 1000) {
            this.#acceptBackoffDelay = MAX_ACCEPT_BACKOFF_DELAY;
        }
        await delay(this.#acceptBackoffDelay);
        this.#accept();
    }
    async #accept() {
        if (this.#closed) {
            return;
        }
        if (this.#connections > this.#backlog) {
            this.#acceptBackoff();
            return;
        }
        let connection;
        try {
            connection = await this.#listener.accept();
        } catch (e) {
            if (e instanceof Deno.errors.BadResource && this.#closed) {
                return;
            }
            try {
                this.onconnection(codeMap.get("UNKNOWN"), undefined);
            } catch  {}
            this.#acceptBackoff();
            return;
        }
        this.#acceptBackoffDelay = undefined;
        const connectionHandle = new TCP(socketType1.SOCKET, connection);
        this.#connections++;
        try {
            this.onconnection(0, connectionHandle);
        } catch  {}
        return this.#accept();
    }
    _onClose() {
        this.#closed = true;
        this.reading = false;
        this.#address = undefined;
        this.#port = undefined;
        this.#remoteAddress = undefined;
        this.#remoteFamily = undefined;
        this.#remotePort = undefined;
        this.#backlog = undefined;
        this.#connections = 0;
        this.#acceptBackoffDelay = undefined;
        if (this.provider === providerType.TCPSERVERWRAP) {
            try {
                this.#listener.close();
            } catch  {}
        }
        return LibuvStreamWrap.prototype._onClose.call(this);
    }
}
const mod39 = {
    TCPConnectWrap: TCPConnectWrap,
    constants: constants3,
    TCP: TCP
};
const mod40 = {};
const mod41 = {};
const mod42 = {};
const mod43 = {};
const DenoListenDatagram = Deno[Deno.internal]?.nodeUnstable?.listenDatagram || Deno.listenDatagram;
const AF_INET6 = 10;
const UDP_DGRAM_MAXSIZE = 64 * 1024;
class SendWrap extends AsyncWrap {
    list;
    address;
    port;
    callback;
    oncomplete;
    constructor(){
        super(providerType.UDPSENDWRAP);
    }
}
class UDP extends HandleWrap {
    [ownerSymbol] = null;
    #address;
    #family;
    #port;
    #remoteAddress;
    #remoteFamily;
    #remotePort;
    #listener;
    #receiving = false;
    #recvBufferSize = UDP_DGRAM_MAXSIZE;
    #sendBufferSize = UDP_DGRAM_MAXSIZE;
    onmessage;
    lookup;
    constructor(){
        super(providerType.UDPWRAP);
    }
    addMembership(_multicastAddress, _interfaceAddress) {
        notImplemented("udp.UDP.prototype.addMembership");
    }
    addSourceSpecificMembership(_sourceAddress, _groupAddress, _interfaceAddress) {
        notImplemented("udp.UDP.prototype.addSourceSpecificMembership");
    }
    bind(ip, port2, flags) {
        return this.#doBind(ip, port2, flags, 2);
    }
    bind6(ip, port3, flags) {
        return this.#doBind(ip, port3, flags, 10);
    }
    bufferSize(size, buffer, ctx) {
        let err;
        if (size > UDP_DGRAM_MAXSIZE) {
            err = "EINVAL";
        } else if (!this.#address) {
            err = isWindows ? "ENOTSOCK" : "EBADF";
        }
        if (err) {
            ctx.errno = codeMap.get(err);
            ctx.code = err;
            ctx.message = errorMap.get(ctx.errno)[1];
            ctx.syscall = buffer ? "uv_recv_buffer_size" : "uv_send_buffer_size";
            return;
        }
        if (size !== 0) {
            size = isLinux ? size * 2 : size;
            if (buffer) {
                return this.#recvBufferSize = size;
            }
            return this.#sendBufferSize = size;
        }
        return buffer ? this.#recvBufferSize : this.#sendBufferSize;
    }
    connect(ip, port4) {
        return this.#doConnect(ip, port4, 2);
    }
    connect6(ip, port5) {
        return this.#doConnect(ip, port5, 10);
    }
    disconnect() {
        this.#remoteAddress = undefined;
        this.#remotePort = undefined;
        this.#remoteFamily = undefined;
        return 0;
    }
    dropMembership(_multicastAddress, _interfaceAddress) {
        notImplemented("udp.UDP.prototype.dropMembership");
    }
    dropSourceSpecificMembership(_sourceAddress, _groupAddress, _interfaceAddress) {
        notImplemented("udp.UDP.prototype.dropSourceSpecificMembership");
    }
    getpeername(peername) {
        if (this.#remoteAddress === undefined) {
            return codeMap.get("EBADF");
        }
        peername.address = this.#remoteAddress;
        peername.port = this.#remotePort;
        peername.family = this.#remoteFamily;
        return 0;
    }
    getsockname(sockname) {
        if (this.#address === undefined) {
            return codeMap.get("EBADF");
        }
        sockname.address = this.#address;
        sockname.port = this.#port;
        sockname.family = this.#family;
        return 0;
    }
    open(_fd) {
        notImplemented("udp.UDP.prototype.open");
    }
    recvStart() {
        if (!this.#receiving) {
            this.#receiving = true;
            this.#receive();
        }
        return 0;
    }
    recvStop() {
        this.#receiving = false;
        return 0;
    }
    ref() {
        notImplemented("udp.UDP.prototype.ref");
    }
    send(req6, bufs, count, ...args) {
        return this.#doSend(req6, bufs, count, args, 2);
    }
    send6(req7, bufs, count, ...args) {
        return this.#doSend(req7, bufs, count, args, 10);
    }
    setBroadcast(_bool) {
        notImplemented("udp.UDP.prototype.setBroadcast");
    }
    setMulticastInterface(_interfaceAddress) {
        notImplemented("udp.UDP.prototype.setMulticastInterface");
    }
    setMulticastLoopback(_bool) {
        notImplemented("udp.UDP.prototype.setMulticastLoopback");
    }
    setMulticastTTL(_ttl) {
        notImplemented("udp.UDP.prototype.setMulticastTTL");
    }
    setTTL(_ttl) {
        notImplemented("udp.UDP.prototype.setTTL");
    }
    unref() {
        notImplemented("udp.UDP.prototype.unref");
    }
     #doBind(ip, port6, _flags1, family) {
        const listenOptions = {
            port: port6,
            hostname: ip,
            transport: "udp"
        };
        let listener;
        try {
            listener = DenoListenDatagram(listenOptions);
        } catch (e) {
            if (e instanceof Deno.errors.AddrInUse) {
                return codeMap.get("EADDRINUSE");
            } else if (e instanceof Deno.errors.AddrNotAvailable) {
                return codeMap.get("EADDRNOTAVAIL");
            }
            return codeMap.get("UNKNOWN");
        }
        const address = listener.addr;
        this.#address = address.hostname;
        this.#port = address.port;
        this.#family = family === AF_INET6 ? "IPv6" : "IPv4";
        this.#listener = listener;
        return 0;
    }
     #doConnect(ip1, port11, family1) {
        this.#remoteAddress = ip1;
        this.#remotePort = port11;
        this.#remoteFamily = family1 === AF_INET6 ? "IPv6" : "IPv4";
        return 0;
    }
     #doSend(req8, bufs, _count, args, _family) {
        let hasCallback;
        if (args.length === 3) {
            this.#remotePort = args[0];
            this.#remoteAddress = args[1];
            hasCallback = args[2];
        } else {
            hasCallback = args[0];
        }
        const addr = {
            hostname: this.#remoteAddress,
            port: this.#remotePort,
            transport: "udp"
        };
        const payload = new Uint8Array(Buffer.concat(bufs.map((buf)=>{
            if (typeof buf === "string") {
                return Buffer.from(buf);
            }
            return Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
        })));
        (async ()=>{
            let sent;
            let err = null;
            try {
                sent = await this.#listener.send(payload, addr);
            } catch (e) {
                if (e instanceof Deno.errors.BadResource) {
                    err = codeMap.get("EBADF");
                } else if (e instanceof Error && e.message.match(/os error (40|90|10040)/)) {
                    err = codeMap.get("EMSGSIZE");
                } else {
                    err = codeMap.get("UNKNOWN");
                }
                sent = 0;
            }
            if (hasCallback) {
                try {
                    req8.oncomplete(err, sent);
                } catch  {}
            }
        })();
        return 0;
    }
    async #receive() {
        if (!this.#receiving) {
            return;
        }
        const p = new Uint8Array(this.#recvBufferSize);
        let buf;
        let remoteAddr;
        let nread;
        try {
            [buf, remoteAddr] = await this.#listener.receive(p);
            nread = buf.length;
        } catch (e) {
            if (e instanceof Deno.errors.Interrupted || e instanceof Deno.errors.BadResource) {
                nread = 0;
            } else {
                nread = codeMap.get("UNKNOWN");
            }
            buf = new Uint8Array(0);
            remoteAddr = null;
        }
        nread ??= 0;
        const rinfo = remoteAddr ? {
            address: remoteAddr.hostname,
            port: remoteAddr.port,
            family: isIP(remoteAddr.hostname) === 6 ? "IPv6" : "IPv4"
        } : undefined;
        try {
            this.onmessage(nread, this, Buffer.from(buf), rinfo);
        } catch  {}
        this.#receive();
    }
    _onClose() {
        this.#receiving = false;
        this.#address = undefined;
        this.#port = undefined;
        this.#family = undefined;
        try {
            this.#listener.close();
        } catch  {}
        this.#listener = undefined;
        return 0;
    }
}
const mod44 = {
    SendWrap: SendWrap,
    UDP: UDP
};
const mod45 = {};
const mod46 = {};
const mod47 = {};
const mod48 = {};
const modules = {
    "async_wrap": mod8,
    buffer: mod7,
    "cares_wrap": mod10,
    config: mod9,
    constants: mod3,
    contextify: mod11,
    credentials: mod13,
    crypto: mod12,
    errors: mod14,
    fs: mod15,
    "fs_dir": mod16,
    "fs_event_wrap": mod17,
    "heap_utils": mod18,
    "http_parser": mod19,
    icu: mod20,
    inspector: mod21,
    "js_stream": mod22,
    messaging: mod23,
    "module_wrap": mod24,
    "native_module": mod25,
    natives: mod26,
    options: mod27,
    os: mod28,
    performance: mod31,
    "pipe_wrap": mod30,
    "process_methods": mod32,
    report: mod33,
    serdes: mod34,
    "signal_wrap": mod35,
    "spawn_sync": mod36,
    "stream_wrap": mod29,
    "string_decoder": mod6,
    symbols: mod37,
    "task_queue": mod38,
    "tcp_wrap": mod39,
    timers: mod40,
    "tls_wrap": mod41,
    "trace_events": mod42,
    "tty_wrap": mod43,
    types: mod1,
    "udp_wrap": mod44,
    url: mod45,
    util: mod2,
    uv: mod,
    v8: mod46,
    worker: mod47,
    zlib: mod48
};
function getBinding(name50) {
    const mod53 = modules[name50];
    if (!mod53) {
        throw new Error(`No such module: ${name50}`);
    }
    return mod53;
}
const kInternal = Symbol("internal properties");
const replaceUnderscoresRegex = /_/g;
const leadingDashesRegex = /^--?/;
const trailingValuesRegex = /=.*$/;
function buildAllowedFlags() {
    const allowedNodeEnvironmentFlags = [
        "--track-heap-objects",
        "--no-track-heap-objects",
        "--node-snapshot",
        "--no-node-snapshot",
        "--require",
        "--max-old-space-size",
        "--trace-exit",
        "--no-trace-exit",
        "--disallow-code-generation-from-strings",
        "--experimental-json-modules",
        "--no-experimental-json-modules",
        "--interpreted-frames-native-stack",
        "--inspect-brk",
        "--no-inspect-brk",
        "--trace-tls",
        "--no-trace-tls",
        "--stack-trace-limit",
        "--experimental-repl-await",
        "--no-experimental-repl-await",
        "--preserve-symlinks",
        "--no-preserve-symlinks",
        "--report-uncaught-exception",
        "--no-report-uncaught-exception",
        "--experimental-modules",
        "--no-experimental-modules",
        "--report-signal",
        "--jitless",
        "--inspect-port",
        "--heapsnapshot-near-heap-limit",
        "--tls-keylog",
        "--force-context-aware",
        "--no-force-context-aware",
        "--napi-modules",
        "--abort-on-uncaught-exception",
        "--diagnostic-dir",
        "--verify-base-objects",
        "--no-verify-base-objects",
        "--unhandled-rejections",
        "--perf-basic-prof",
        "--trace-atomics-wait",
        "--no-trace-atomics-wait",
        "--deprecation",
        "--no-deprecation",
        "--perf-basic-prof-only-functions",
        "--perf-prof",
        "--max-http-header-size",
        "--report-on-signal",
        "--no-report-on-signal",
        "--throw-deprecation",
        "--no-throw-deprecation",
        "--warnings",
        "--no-warnings",
        "--force-fips",
        "--no-force-fips",
        "--pending-deprecation",
        "--no-pending-deprecation",
        "--input-type",
        "--tls-max-v1.3",
        "--no-tls-max-v1.3",
        "--tls-min-v1.2",
        "--no-tls-min-v1.2",
        "--inspect",
        "--no-inspect",
        "--heapsnapshot-signal",
        "--trace-warnings",
        "--no-trace-warnings",
        "--trace-event-categories",
        "--experimental-worker",
        "--tls-max-v1.2",
        "--no-tls-max-v1.2",
        "--perf-prof-unwinding-info",
        "--preserve-symlinks-main",
        "--no-preserve-symlinks-main",
        "--policy-integrity",
        "--experimental-wasm-modules",
        "--no-experimental-wasm-modules",
        "--node-memory-debug",
        "--inspect-publish-uid",
        "--tls-min-v1.3",
        "--no-tls-min-v1.3",
        "--experimental-specifier-resolution",
        "--secure-heap",
        "--tls-min-v1.0",
        "--no-tls-min-v1.0",
        "--redirect-warnings",
        "--experimental-report",
        "--trace-event-file-pattern",
        "--trace-uncaught",
        "--no-trace-uncaught",
        "--experimental-loader",
        "--http-parser",
        "--dns-result-order",
        "--trace-sigint",
        "--no-trace-sigint",
        "--secure-heap-min",
        "--enable-fips",
        "--no-enable-fips",
        "--enable-source-maps",
        "--no-enable-source-maps",
        "--insecure-http-parser",
        "--no-insecure-http-parser",
        "--use-openssl-ca",
        "--no-use-openssl-ca",
        "--tls-cipher-list",
        "--experimental-top-level-await",
        "--no-experimental-top-level-await",
        "--openssl-config",
        "--icu-data-dir",
        "--v8-pool-size",
        "--report-on-fatalerror",
        "--no-report-on-fatalerror",
        "--title",
        "--tls-min-v1.1",
        "--no-tls-min-v1.1",
        "--report-filename",
        "--trace-deprecation",
        "--no-trace-deprecation",
        "--report-compact",
        "--no-report-compact",
        "--experimental-policy",
        "--experimental-import-meta-resolve",
        "--no-experimental-import-meta-resolve",
        "--zero-fill-buffers",
        "--no-zero-fill-buffers",
        "--report-dir",
        "--use-bundled-ca",
        "--no-use-bundled-ca",
        "--experimental-vm-modules",
        "--no-experimental-vm-modules",
        "--force-async-hooks-checks",
        "--no-force-async-hooks-checks",
        "--frozen-intrinsics",
        "--no-frozen-intrinsics",
        "--huge-max-old-generation-size",
        "--disable-proto",
        "--debug-arraybuffer-allocations",
        "--no-debug-arraybuffer-allocations",
        "--conditions",
        "--experimental-wasi-unstable-preview1",
        "--no-experimental-wasi-unstable-preview1",
        "--trace-sync-io",
        "--no-trace-sync-io",
        "--use-largepages",
        "--experimental-abortcontroller",
        "--debug-port",
        "--es-module-specifier-resolution",
        "--prof-process",
        "-C",
        "--loader",
        "--report-directory",
        "-r",
        "--trace-events-enabled", 
    ];
    const trimLeadingDashes = (flag)=>flag.replace(leadingDashesRegex, "")
    ;
    const nodeFlags = allowedNodeEnvironmentFlags.map(trimLeadingDashes);
    class NodeEnvironmentFlagsSet extends Set {
        constructor(array){
            super();
            this[kInternal] = {
                array
            };
        }
        add() {
            return this;
        }
        delete() {
            return false;
        }
        clear() {}
        has(key) {
            if (typeof key === "string") {
                key = key.replace(replaceUnderscoresRegex, "-");
                if (leadingDashesRegex.test(key)) {
                    key = key.replace(trailingValuesRegex, "");
                    return this[kInternal].array.includes(key);
                }
                return nodeFlags.includes(key);
            }
            return false;
        }
        entries() {
            this[kInternal].set ??= new Set(this[kInternal].array);
            return this[kInternal].set.entries();
        }
        forEach(callback, thisArg = undefined) {
            this[kInternal].array.forEach((v6)=>Reflect.apply(callback, thisArg, [
                    v6,
                    v6,
                    this
                ])
            );
        }
        get size() {
            return this[kInternal].array.length;
        }
        values() {
            this[kInternal].set ??= new Set(this[kInternal].array);
            return this[kInternal].set.values();
        }
    }
    NodeEnvironmentFlagsSet.prototype.keys = NodeEnvironmentFlagsSet.prototype[Symbol.iterator] = NodeEnvironmentFlagsSet.prototype.values;
    Object.freeze(NodeEnvironmentFlagsSet.prototype.constructor);
    Object.freeze(NodeEnvironmentFlagsSet.prototype);
    return Object.freeze(new NodeEnvironmentFlagsSet(allowedNodeEnvironmentFlags));
}
const DenoCommand = Deno[Deno.internal]?.nodeUnstable?.Command || Deno.Command;
const notImplementedEvents = [
    "disconnect",
    "message",
    "multipleResolves",
    "rejectionHandled",
    "worker", 
];
const argv = [
    "",
    "",
    ...Deno.args
];
Object.defineProperty(argv, "0", {
    get: Deno.execPath
});
Object.defineProperty(argv, "1", {
    get: ()=>{
        if (Deno.mainModule.startsWith("file:")) {
            return fromFileUrl2(Deno.mainModule);
        } else {
            return join4(Deno.cwd(), "$deno$node.js");
        }
    }
});
const exit = (code)=>{
    if (code || code === 0) {
        if (typeof code === "string") {
            const parsedCode = parseInt(code);
            process1.exitCode = isNaN(parsedCode) ? undefined : parsedCode;
        } else {
            process1.exitCode = code;
        }
    }
    if (!process1._exiting) {
        process1._exiting = true;
        process1.emit("exit", process1.exitCode || 0);
    }
    Deno.exit(process1.exitCode || 0);
};
function addReadOnlyProcessAlias(name51, option, enumerable = true) {
    const value = getOptionValue(option);
    if (value) {
        Object.defineProperty(process1, name51, {
            writable: true,
            configurable: true,
            enumerable,
            value
        });
    }
}
function createWarningObject(warning, type, code, ctor, detail) {
    assert(typeof warning === "string");
    const warningErr = new Error(warning);
    warningErr.name = String(type || "Warning");
    if (code !== undefined) {
        warningErr.code = code;
    }
    if (detail !== undefined) {
        warningErr.detail = detail;
    }
    Error.captureStackTrace(warningErr, ctor || process1.emitWarning);
    return warningErr;
}
function doEmitWarning(warning) {
    process1.emit("warning", warning);
}
function emitWarning(warning, type, code, ctor) {
    let detail;
    if (type !== null && typeof type === "object" && !Array.isArray(type)) {
        ctor = type.ctor;
        code = type.code;
        if (typeof type.detail === "string") {
            detail = type.detail;
        }
        type = type.type || "Warning";
    } else if (typeof type === "function") {
        ctor = type;
        code = undefined;
        type = "Warning";
    }
    if (type !== undefined) {
        validateString(type, "type");
    }
    if (typeof code === "function") {
        ctor = code;
        code = undefined;
    } else if (code !== undefined) {
        validateString(code, "code");
    }
    if (typeof warning === "string") {
        warning = createWarningObject(warning, type, code, ctor, detail);
    } else if (!(warning instanceof Error)) {
        throw new ERR_INVALID_ARG_TYPE("warning", [
            "Error",
            "string"
        ], warning);
    }
    if (warning.name === "DeprecationWarning") {
        if (process1.noDeprecation) {
            return;
        }
        if (process1.throwDeprecation) {
            return process1.nextTick(()=>{
                throw warning;
            });
        }
    }
    process1.nextTick(doEmitWarning, warning);
}
function hrtime(time) {
    const milli = performance.now();
    const sec = Math.floor(milli / 1000);
    const nano = Math.floor(milli * 1_000_000 - sec * 1_000_000_000);
    if (!time) {
        return [
            sec,
            nano
        ];
    }
    const [prevSec, prevNano] = time;
    return [
        sec - prevSec,
        nano - prevNano
    ];
}
hrtime.bigint = function() {
    const [sec, nano] = hrtime();
    return BigInt(sec) * 1_000_000_000n + BigInt(nano);
};
function memoryUsage() {
    return {
        ...Deno.memoryUsage(),
        arrayBuffers: 0
    };
}
memoryUsage.rss = function() {
    return memoryUsage().rss;
};
function _kill(pid1, sig) {
    let errCode;
    if (sig === 0) {
        let status;
        if (Deno.build.os === "windows") {
            status = new DenoCommand("powershell.exe", {
                args: [
                    "Get-Process",
                    "-pid",
                    pid1
                ]
            }).outputSync();
        } else {
            status = new DenoCommand("kill", {
                args: [
                    "-0",
                    pid1
                ]
            }).outputSync();
        }
        if (!status.success) {
            errCode = codeMap.get("ESRCH");
        }
    } else {
        const maybeSignal = Object.entries(os.signals).find(([_, numericCode])=>numericCode === sig
        );
        if (!maybeSignal) {
            errCode = codeMap.get("EINVAL");
        } else {
            try {
                Deno.kill(pid1, maybeSignal[0]);
            } catch (e) {
                if (e instanceof TypeError) {
                    throw notImplemented(maybeSignal[0]);
                }
                throw e;
            }
        }
    }
    if (!errCode) {
        return 0;
    } else {
        return errCode;
    }
}
function kill(pid2, sig = "SIGTERM") {
    if (pid2 != (pid2 | 0)) {
        throw new ERR_INVALID_ARG_TYPE("pid", "number", pid2);
    }
    let err;
    if (typeof sig === "number") {
        err = process1._kill(pid2, sig);
    } else {
        if (sig in os.signals) {
            err = process1._kill(pid2, os.signals[sig]);
        } else {
            throw new ERR_UNKNOWN_SIGNAL(sig);
        }
    }
    if (err) {
        throw errnoException(err, "kill");
    }
    return true;
}
function uncaughtExceptionHandler(err, origin) {
    process1.emit("uncaughtExceptionMonitor", err, origin);
    process1.emit("uncaughtException", err, origin);
}
let execPath = null;
class Process extends EventEmitter {
    constructor(){
        super();
        globalThis.addEventListener("unhandledrejection", (event)=>{
            if (process1.listenerCount("unhandledRejection") === 0) {
                if (process1.listenerCount("uncaughtException") === 0) {
                    throw event.reason;
                }
                event.preventDefault();
                uncaughtExceptionHandler(event.reason, "unhandledRejection");
                return;
            }
            event.preventDefault();
            process1.emit("unhandledRejection", event.reason, event.promise);
        });
        globalThis.addEventListener("error", (event)=>{
            if (process1.listenerCount("uncaughtException") > 0) {
                event.preventDefault();
            }
            uncaughtExceptionHandler(event.error, "uncaughtException");
        });
        globalThis.addEventListener("beforeunload", (e)=>{
            super.emit("beforeExit", process1.exitCode || 0);
            processTicksAndRejections();
            if (core.eventLoopHasMoreWork()) {
                e.preventDefault();
            }
        });
        globalThis.addEventListener("unload", ()=>{
            if (!process1._exiting) {
                process1._exiting = true;
                super.emit("exit", process1.exitCode || 0);
            }
        });
    }
    arch = arch;
    argv = argv;
    chdir = chdir;
    config = {
        target_defaults: {},
        variables: {}
    };
    cwd = cwd;
    env = env;
    execArgv = [];
    exit = exit;
    _exiting = _exiting;
    exitCode = undefined;
    mainModule = undefined;
    nextTick = nextTick1;
    on(event, listener) {
        if (notImplementedEvents.includes(event)) {
            warnNotImplemented(`process.on("${event}")`);
            super.on(event, listener);
        } else if (event.startsWith("SIG")) {
            if (event === "SIGBREAK" && Deno.build.os !== "windows") {} else if (event === "SIGTERM" && Deno.build.os === "windows") {} else {
                Deno.addSignalListener(event, listener);
            }
        } else {
            super.on(event, listener);
        }
        return this;
    }
    off(event, listener) {
        if (notImplementedEvents.includes(event)) {
            warnNotImplemented(`process.off("${event}")`);
            super.off(event, listener);
        } else if (event.startsWith("SIG")) {
            if (event === "SIGBREAK" && Deno.build.os !== "windows") {} else if (event === "SIGTERM" && Deno.build.os === "windows") {} else {
                Deno.removeSignalListener(event, listener);
            }
        } else {
            super.off(event, listener);
        }
        return this;
    }
    emit(event, ...args1) {
        if (event.startsWith("SIG")) {
            if (event === "SIGBREAK" && Deno.build.os !== "windows") {} else {
                Deno.kill(Deno.pid, event);
            }
        } else {
            return super.emit(event, ...args1);
        }
        return true;
    }
    prependListener(event, listener) {
        if (notImplementedEvents.includes(event)) {
            warnNotImplemented(`process.prependListener("${event}")`);
            super.prependListener(event, listener);
        } else if (event.startsWith("SIG")) {
            if (event === "SIGBREAK" && Deno.build.os !== "windows") {} else {
                Deno.addSignalListener(event, listener);
            }
        } else {
            super.prependListener(event, listener);
        }
        return this;
    }
    pid = pid;
    platform = platform;
    addListener(event, listener) {
        if (notImplementedEvents.includes(event)) {
            warnNotImplemented(`process.addListener("${event}")`);
        }
        return this.on(event, listener);
    }
    removeListener(event, listener) {
        if (notImplementedEvents.includes(event)) {
            warnNotImplemented(`process.removeListener("${event}")`);
        }
        return this.off(event, listener);
    }
    hrtime = hrtime;
    _kill = _kill;
    kill = kill;
    memoryUsage = memoryUsage;
    stderr = stderr;
    stdin = stdin;
    stdout = stdout;
    version = version;
    versions = versions;
    emitWarning = emitWarning;
    binding(name52) {
        return getBinding(name52);
    }
    umask() {
        return 0o22;
    }
    getgid() {
        return Deno.gid();
    }
    getuid() {
        return Deno.uid();
    }
    _eval = undefined;
    get execPath() {
        if (execPath) {
            return execPath;
        }
        execPath = Deno.execPath();
        return execPath;
    }
    set execPath(path30) {
        execPath = path30;
    }
    #startTime = Date.now();
    uptime() {
        return (Date.now() - this.#startTime) / 1000;
    }
    #allowedFlags = buildAllowedFlags();
    get allowedNodeEnvironmentFlags() {
        return this.#allowedFlags;
    }
    features = {
        inspector: false
    };
    noDeprecation = false;
}
if (Deno.build.os === "windows") {
    delete Process.prototype.getgid;
    delete Process.prototype.getuid;
}
const process1 = new Process();
Object.defineProperty(process1, Symbol.toStringTag, {
    enumerable: false,
    writable: true,
    configurable: false,
    value: "process"
});
addReadOnlyProcessAlias("noDeprecation", "--no-deprecation");
addReadOnlyProcessAlias("throwDeprecation", "--throw-deprecation");
process1.removeListener;
process1.removeAllListeners;
const { F_OK , R_OK , W_OK , X_OK , S_IRUSR , S_IWUSR , S_IXUSR , S_IRGRP , S_IWGRP , S_IXGRP , S_IROTH , S_IWOTH , S_IXOTH , COPYFILE_EXCL , COPYFILE_FICLONE , COPYFILE_FICLONE_FORCE , UV_FS_COPYFILE_EXCL , UV_FS_COPYFILE_FICLONE , UV_FS_COPYFILE_FICLONE_FORCE , O_RDONLY , O_WRONLY , O_RDWR , O_NOCTTY , O_TRUNC , O_APPEND , O_DIRECTORY , O_NOFOLLOW , O_SYNC , O_DSYNC , O_SYMLINK , O_NONBLOCK , O_CREAT , O_EXCL ,  } = fs;
const mod49 = {
    F_OK: F_OK,
    R_OK: R_OK,
    W_OK: W_OK,
    X_OK: X_OK,
    S_IRUSR: S_IRUSR,
    S_IWUSR: S_IWUSR,
    S_IXUSR: S_IXUSR,
    S_IRGRP: S_IRGRP,
    S_IWGRP: S_IWGRP,
    S_IXGRP: S_IXGRP,
    S_IROTH: S_IROTH,
    S_IWOTH: S_IWOTH,
    S_IXOTH: S_IXOTH,
    COPYFILE_EXCL: COPYFILE_EXCL,
    COPYFILE_FICLONE: COPYFILE_FICLONE,
    COPYFILE_FICLONE_FORCE: COPYFILE_FICLONE_FORCE,
    UV_FS_COPYFILE_EXCL: UV_FS_COPYFILE_EXCL,
    UV_FS_COPYFILE_FICLONE: UV_FS_COPYFILE_FICLONE,
    UV_FS_COPYFILE_FICLONE_FORCE: UV_FS_COPYFILE_FICLONE_FORCE,
    O_RDONLY: O_RDONLY,
    O_WRONLY: O_WRONLY,
    O_RDWR: O_RDWR,
    O_NOCTTY: O_NOCTTY,
    O_TRUNC: O_TRUNC,
    O_APPEND: O_APPEND,
    O_DIRECTORY: O_DIRECTORY,
    O_NOFOLLOW: O_NOFOLLOW,
    O_SYNC: O_SYNC,
    O_DSYNC: O_DSYNC,
    O_SYMLINK: O_SYMLINK,
    O_NONBLOCK: O_NONBLOCK,
    O_CREAT: O_CREAT,
    O_EXCL: O_EXCL
};
function isFileOptions(fileOptions) {
    if (!fileOptions) return false;
    return fileOptions.encoding != undefined || fileOptions.flag != undefined || fileOptions.signal != undefined || fileOptions.mode != undefined;
}
function getEncoding(optOrCallback) {
    if (!optOrCallback || typeof optOrCallback === "function") {
        return null;
    }
    const encoding = typeof optOrCallback === "string" ? optOrCallback : optOrCallback.encoding;
    if (!encoding) return null;
    return encoding;
}
function checkEncoding(encoding) {
    if (!encoding) return null;
    encoding = encoding.toLowerCase();
    if ([
        "utf8",
        "hex",
        "base64"
    ].includes(encoding)) return encoding;
    if (encoding === "utf-8") {
        return "utf8";
    }
    if (encoding === "binary") {
        return "binary";
    }
    const notImplementedEncodings = [
        "utf16le",
        "latin1",
        "ascii",
        "ucs2"
    ];
    if (notImplementedEncodings.includes(encoding)) {
        notImplemented(`"${encoding}" encoding`);
    }
    throw new Error(`The value "${encoding}" is invalid for option "encoding"`);
}
function getOpenOptions(flag) {
    if (!flag) {
        return {
            create: true,
            append: true
        };
    }
    let openOptions = {};
    if (typeof flag === "string") {
        switch(flag){
            case "a":
                {
                    openOptions = {
                        create: true,
                        append: true
                    };
                    break;
                }
            case "ax":
            case "xa":
                {
                    openOptions = {
                        createNew: true,
                        write: true,
                        append: true
                    };
                    break;
                }
            case "a+":
                {
                    openOptions = {
                        read: true,
                        create: true,
                        append: true
                    };
                    break;
                }
            case "ax+":
            case "xa+":
                {
                    openOptions = {
                        read: true,
                        createNew: true,
                        append: true
                    };
                    break;
                }
            case "r":
                {
                    openOptions = {
                        read: true
                    };
                    break;
                }
            case "r+":
                {
                    openOptions = {
                        read: true,
                        write: true
                    };
                    break;
                }
            case "w":
                {
                    openOptions = {
                        create: true,
                        write: true,
                        truncate: true
                    };
                    break;
                }
            case "wx":
            case "xw":
                {
                    openOptions = {
                        createNew: true,
                        write: true
                    };
                    break;
                }
            case "w+":
                {
                    openOptions = {
                        create: true,
                        write: true,
                        truncate: true,
                        read: true
                    };
                    break;
                }
            case "wx+":
            case "xw+":
                {
                    openOptions = {
                        createNew: true,
                        write: true,
                        read: true
                    };
                    break;
                }
            case "as":
            case "sa":
                {
                    openOptions = {
                        create: true,
                        append: true
                    };
                    break;
                }
            case "as+":
            case "sa+":
                {
                    openOptions = {
                        create: true,
                        read: true,
                        append: true
                    };
                    break;
                }
            case "rs+":
            case "sr+":
                {
                    openOptions = {
                        create: true,
                        read: true,
                        write: true
                    };
                    break;
                }
            default:
                {
                    throw new Error(`Unrecognized file system flag: ${flag}`);
                }
        }
    } else if (typeof flag === "number") {
        if ((flag & O_APPEND) === O_APPEND) {
            openOptions.append = true;
        }
        if ((flag & O_CREAT) === O_CREAT) {
            openOptions.create = true;
            openOptions.write = true;
        }
        if ((flag & O_EXCL) === O_EXCL) {
            openOptions.createNew = true;
            openOptions.read = true;
            openOptions.write = true;
        }
        if ((flag & O_TRUNC) === O_TRUNC) {
            openOptions.truncate = true;
        }
        if ((flag & O_RDONLY) === O_RDONLY) {
            openOptions.read = true;
        }
        if ((flag & O_WRONLY) === O_WRONLY) {
            openOptions.write = true;
        }
        if ((flag & O_RDWR) === O_RDWR) {
            openOptions.read = true;
            openOptions.write = true;
        }
    }
    return openOptions;
}
function maybeCallback(cb) {
    validateFunction(cb, "cb");
    return cb;
}
function makeCallback(cb) {
    validateFunction(cb, "cb");
    return (...args2)=>Reflect.apply(cb, this, args2)
    ;
}
var State;
(function(State1) {
    State1[State1["PASSTHROUGH"] = 0] = "PASSTHROUGH";
    State1[State1["PERCENT"] = 1] = "PERCENT";
    State1[State1["POSITIONAL"] = 2] = "POSITIONAL";
    State1[State1["PRECISION"] = 3] = "PRECISION";
    State1[State1["WIDTH"] = 4] = "WIDTH";
})(State || (State = {}));
var WorP;
(function(WorP1) {
    WorP1[WorP1["WIDTH"] = 0] = "WIDTH";
    WorP1[WorP1["PRECISION"] = 1] = "PRECISION";
})(WorP || (WorP = {}));
var F;
(function(F4) {
    F4[F4["sign"] = 1] = "sign";
    F4[F4["mantissa"] = 2] = "mantissa";
    F4[F4["fractional"] = 3] = "fractional";
    F4[F4["esign"] = 4] = "esign";
    F4[F4["exponent"] = 5] = "exponent";
})(F || (F = {}));
let debugImpls;
function initializeDebugEnv(debugEnv1) {
    debugImpls = Object.create(null);
    if (debugEnv1) {
        debugEnv1 = debugEnv1.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replaceAll("*", ".*").replaceAll(",", "$|^");
        new RegExp(`^${debugEnv1}$`, "i");
    } else {}
}
let debugEnv;
try {
    debugEnv = Deno.env.get("NODE_DEBUG") ?? "";
} catch (error23) {
    if (error23 instanceof Deno.errors.PermissionDenied) {
        debugEnv = "";
    } else {
        throw error23;
    }
}
initializeDebugEnv(debugEnv);
var valueType;
(function(valueType1) {
    valueType1[valueType1["noIterator"] = 0] = "noIterator";
    valueType1[valueType1["isArray"] = 1] = "isArray";
    valueType1[valueType1["isSet"] = 2] = "isSet";
    valueType1[valueType1["isMap"] = 3] = "isMap";
})(valueType || (valueType = {}));
let memo;
function innerDeepEqual(val1, val2, strict, memos = memo) {
    if (val1 === val2) {
        if (val1 !== 0) return true;
        return strict ? Object.is(val1, val2) : true;
    }
    if (strict) {
        if (typeof val1 !== "object") {
            return typeof val1 === "number" && Number.isNaN(val1) && Number.isNaN(val2);
        }
        if (typeof val2 !== "object" || val1 === null || val2 === null) {
            return false;
        }
        if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
            return false;
        }
    } else {
        if (val1 === null || typeof val1 !== "object") {
            if (val2 === null || typeof val2 !== "object") {
                return val1 == val2 || Number.isNaN(val1) && Number.isNaN(val2);
            }
            return false;
        }
        if (val2 === null || typeof val2 !== "object") {
            return false;
        }
    }
    const val1Tag = Object.prototype.toString.call(val1);
    const val2Tag = Object.prototype.toString.call(val2);
    if (val1Tag !== val2Tag) {
        return false;
    }
    if (Array.isArray(val1)) {
        if (!Array.isArray(val2) || val1.length !== val2.length) {
            return false;
        }
        const filter = strict ? 2 : 2 | 16;
        const keys1 = getOwnNonIndexProperties(val1, filter);
        const keys2 = getOwnNonIndexProperties(val2, filter);
        if (keys1.length !== keys2.length) {
            return false;
        }
        return keyCheck(val1, val2, strict, memos, valueType.isArray, keys1);
    } else if (val1Tag === "[object Object]") {
        return keyCheck(val1, val2, strict, memos, valueType.noIterator);
    } else if (val1 instanceof Date) {
        if (!(val2 instanceof Date) || val1.getTime() !== val2.getTime()) {
            return false;
        }
    } else if (val1 instanceof RegExp) {
        if (!(val2 instanceof RegExp) || !areSimilarRegExps(val1, val2)) {
            return false;
        }
    } else if (isNativeError1(val1) || val1 instanceof Error) {
        if (!isNativeError1(val2) && !(val2 instanceof Error) || val1.message !== val2.message || val1.name !== val2.name) {
            return false;
        }
    } else if (isArrayBufferView(val1)) {
        const TypedArrayPrototypeGetSymbolToStringTag = (val)=>Object.getOwnPropertySymbols(val).map((item)=>item.toString()
            ).toString()
        ;
        if (isTypedArray(val1) && isTypedArray(val2) && TypedArrayPrototypeGetSymbolToStringTag(val1) !== TypedArrayPrototypeGetSymbolToStringTag(val2)) {
            return false;
        }
        if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
            if (!areSimilarFloatArrays(val1, val2)) {
                return false;
            }
        } else if (!areSimilarTypedArrays(val1, val2)) {
            return false;
        }
        const filter = strict ? 2 : 2 | 16;
        const keysVal1 = getOwnNonIndexProperties(val1, filter);
        const keysVal2 = getOwnNonIndexProperties(val2, filter);
        if (keysVal1.length !== keysVal2.length) {
            return false;
        }
        return keyCheck(val1, val2, strict, memos, valueType.noIterator, keysVal1);
    } else if (isSet1(val1)) {
        if (!isSet1(val2) || val1.size !== val2.size) {
            return false;
        }
        return keyCheck(val1, val2, strict, memos, valueType.isSet);
    } else if (isMap1(val1)) {
        if (!isMap1(val2) || val1.size !== val2.size) {
            return false;
        }
        return keyCheck(val1, val2, strict, memos, valueType.isMap);
    } else if (isAnyArrayBuffer1(val1)) {
        if (!isAnyArrayBuffer1(val2) || !areEqualArrayBuffers(val1, val2)) {
            return false;
        }
    } else if (isBoxedPrimitive1(val1)) {
        if (!isEqualBoxedPrimitive(val1, val2)) {
            return false;
        }
    } else if (Array.isArray(val2) || isArrayBufferView(val2) || isSet1(val2) || isMap1(val2) || isDate1(val2) || isRegExp1(val2) || isAnyArrayBuffer1(val2) || isBoxedPrimitive1(val2) || isNativeError1(val2) || val2 instanceof Error) {
        return false;
    }
    return keyCheck(val1, val2, strict, memos, valueType.noIterator);
}
function keyCheck(val1, val2, strict, memos, iterationType, aKeys = []) {
    if (arguments.length === 5) {
        aKeys = Object.keys(val1);
        const bKeys = Object.keys(val2);
        if (aKeys.length !== bKeys.length) {
            return false;
        }
    }
    let i121 = 0;
    for(; i121 < aKeys.length; i121++){
        if (!val2.propertyIsEnumerable(aKeys[i121])) {
            return false;
        }
    }
    if (strict && arguments.length === 5) {
        const symbolKeysA = Object.getOwnPropertySymbols(val1);
        if (symbolKeysA.length !== 0) {
            let count = 0;
            for(i121 = 0; i121 < symbolKeysA.length; i121++){
                const key = symbolKeysA[i121];
                if (val1.propertyIsEnumerable(key)) {
                    if (!val2.propertyIsEnumerable(key)) {
                        return false;
                    }
                    aKeys.push(key.toString());
                    count++;
                } else if (val2.propertyIsEnumerable(key)) {
                    return false;
                }
            }
            const symbolKeysB = Object.getOwnPropertySymbols(val2);
            if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
                return false;
            }
        } else {
            const symbolKeysB = Object.getOwnPropertySymbols(val2);
            if (symbolKeysB.length !== 0 && getEnumerables(val2, symbolKeysB).length !== 0) {
                return false;
            }
        }
    }
    if (aKeys.length === 0 && (iterationType === valueType.noIterator || iterationType === valueType.isArray && val1.length === 0 || val1.size === 0)) {
        return true;
    }
    if (memos === undefined) {
        memos = {
            val1: new Map(),
            val2: new Map(),
            position: 0
        };
    } else {
        const val2MemoA = memos.val1.get(val1);
        if (val2MemoA !== undefined) {
            const val2MemoB = memos.val2.get(val2);
            if (val2MemoB !== undefined) {
                return val2MemoA === val2MemoB;
            }
        }
        memos.position++;
    }
    memos.val1.set(val1, memos.position);
    memos.val2.set(val2, memos.position);
    const areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
    memos.val1.delete(val1);
    memos.val2.delete(val2);
    return areEq;
}
function areSimilarRegExps(a, b) {
    return a.source === b.source && a.flags === b.flags && a.lastIndex === b.lastIndex;
}
function areSimilarFloatArrays(arr1, arr2) {
    if (arr1.byteLength !== arr2.byteLength) {
        return false;
    }
    for(let i122 = 0; i122 < arr1.byteLength; i122++){
        if (arr1[i122] !== arr2[i122]) {
            return false;
        }
    }
    return true;
}
function areSimilarTypedArrays(arr1, arr2) {
    if (arr1.byteLength !== arr2.byteLength) {
        return false;
    }
    return Buffer.compare(new Uint8Array(arr1.buffer, arr1.byteOffset, arr1.byteLength), new Uint8Array(arr2.buffer, arr2.byteOffset, arr2.byteLength)) === 0;
}
function areEqualArrayBuffers(buf1, buf2) {
    return buf1.byteLength === buf2.byteLength && Buffer.compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}
function isEqualBoxedPrimitive(a, b) {
    if (Object.getOwnPropertyNames(a).length !== Object.getOwnPropertyNames(b).length) {
        return false;
    }
    if (Object.getOwnPropertySymbols(a).length !== Object.getOwnPropertySymbols(b).length) {
        return false;
    }
    if (isNumberObject1(a)) {
        return isNumberObject1(b) && Object.is(Number.prototype.valueOf.call(a), Number.prototype.valueOf.call(b));
    }
    if (isStringObject1(a)) {
        return isStringObject1(b) && String.prototype.valueOf.call(a) === String.prototype.valueOf.call(b);
    }
    if (isBooleanObject1(a)) {
        return isBooleanObject1(b) && Boolean.prototype.valueOf.call(a) === Boolean.prototype.valueOf.call(b);
    }
    if (isBigIntObject1(a)) {
        return isBigIntObject1(b) && BigInt.prototype.valueOf.call(a) === BigInt.prototype.valueOf.call(b);
    }
    if (isSymbolObject1(a)) {
        return isSymbolObject1(b) && Symbol.prototype.valueOf.call(a) === Symbol.prototype.valueOf.call(b);
    }
    throw Error(`Unknown boxed type`);
}
function getEnumerables(val, keys) {
    return keys.filter((key)=>val.propertyIsEnumerable(key)
    );
}
function objEquiv(obj1, obj2, strict, keys, memos, iterationType) {
    let i123 = 0;
    if (iterationType === valueType.isSet) {
        if (!setEquiv(obj1, obj2, strict, memos)) {
            return false;
        }
    } else if (iterationType === valueType.isMap) {
        if (!mapEquiv(obj1, obj2, strict, memos)) {
            return false;
        }
    } else if (iterationType === valueType.isArray) {
        for(; i123 < obj1.length; i123++){
            if (obj1.hasOwnProperty(i123)) {
                if (!obj2.hasOwnProperty(i123) || !innerDeepEqual(obj1[i123], obj2[i123], strict, memos)) {
                    return false;
                }
            } else if (obj2.hasOwnProperty(i123)) {
                return false;
            } else {
                const keys1 = Object.keys(obj1);
                for(; i123 < keys1.length; i123++){
                    const key = keys1[i123];
                    if (!obj2.hasOwnProperty(key) || !innerDeepEqual(obj1[key], obj2[key], strict, memos)) {
                        return false;
                    }
                }
                if (keys1.length !== Object.keys(obj2).length) {
                    return false;
                }
                if (keys1.length !== Object.keys(obj2).length) {
                    return false;
                }
                return true;
            }
        }
    }
    for(i123 = 0; i123 < keys.length; i123++){
        const key = keys[i123];
        if (!innerDeepEqual(obj1[key], obj2[key], strict, memos)) {
            return false;
        }
    }
    return true;
}
function findLooseMatchingPrimitives(primitive) {
    switch(typeof primitive){
        case "undefined":
            return null;
        case "object":
            return undefined;
        case "symbol":
            return false;
        case "string":
            primitive = +primitive;
        case "number":
            if (Number.isNaN(primitive)) {
                return false;
            }
    }
    return true;
}
function setMightHaveLoosePrim(set1, set2, primitive) {
    const altValue = findLooseMatchingPrimitives(primitive);
    if (altValue != null) return altValue;
    return set2.has(altValue) && !set1.has(altValue);
}
function setHasEqualElement(set, val1, strict, memos) {
    for (const val2 of set){
        if (innerDeepEqual(val1, val2, strict, memos)) {
            set.delete(val2);
            return true;
        }
    }
    return false;
}
function setEquiv(set1, set2, strict, memos) {
    let set = null;
    for (const item of set1){
        if (typeof item === "object" && item !== null) {
            if (set === null) {
                set = new Set();
            }
            set.add(item);
        } else if (!set2.has(item)) {
            if (strict) return false;
            if (!setMightHaveLoosePrim(set1, set2, item)) {
                return false;
            }
            if (set === null) {
                set = new Set();
            }
            set.add(item);
        }
    }
    if (set !== null) {
        for (const item of set2){
            if (typeof item === "object" && item !== null) {
                if (!setHasEqualElement(set, item, strict, memos)) return false;
            } else if (!strict && !set1.has(item) && !setHasEqualElement(set, item, strict, memos)) {
                return false;
            }
        }
        return set.size === 0;
    }
    return true;
}
function mapMightHaveLoosePrimitive(map1, map2, primitive, item, memos) {
    const altValue = findLooseMatchingPrimitives(primitive);
    if (altValue != null) {
        return altValue;
    }
    const curB = map2.get(altValue);
    if (curB === undefined && !map2.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
        return false;
    }
    return !map1.has(altValue) && innerDeepEqual(item, curB, false, memos);
}
function mapEquiv(map1, map2, strict, memos) {
    let set = null;
    for (const { 0: key , 1: item1  } of map1){
        if (typeof key === "object" && key !== null) {
            if (set === null) {
                set = new Set();
            }
            set.add(key);
        } else {
            const item2 = map2.get(key);
            if (item2 === undefined && !map2.has(key) || !innerDeepEqual(item1, item2, strict, memos)) {
                if (strict) return false;
                if (!mapMightHaveLoosePrimitive(map1, map2, key, item1, memos)) {
                    return false;
                }
                if (set === null) {
                    set = new Set();
                }
                set.add(key);
            }
        }
    }
    if (set !== null) {
        for (const { 0: key , 1: item  } of map2){
            if (typeof key === "object" && key !== null) {
                if (!mapHasEqualEntry(set, map1, key, item, strict, memos)) {
                    return false;
                }
            } else if (!strict && (!map1.has(key) || !innerDeepEqual(map1.get(key), item, false, memos)) && !mapHasEqualEntry(set, map1, key, item, false, memos)) {
                return false;
            }
        }
        return set.size === 0;
    }
    return true;
}
function mapHasEqualEntry(set, map, key1, item1, strict, memos) {
    for (const key2 of set){
        if (innerDeepEqual(key1, key2, strict, memos) && innerDeepEqual(item1, map.get(key2), strict, memos)) {
            set.delete(key2);
            return true;
        }
    }
    return false;
}
const codesWarned = new Set();
function deprecate(fn, msg, code) {
    if (process1.noDeprecation === true) {
        return fn;
    }
    if (code !== undefined) {
        validateString(code, "code");
    }
    let warned = false;
    function deprecated(...args3) {
        if (!warned) {
            warned = true;
            if (code !== undefined) {
                if (!codesWarned.has(code)) {
                    process1.emitWarning(msg, "DeprecationWarning", code, deprecated);
                    codesWarned.add(code);
                }
            } else {
                process1.emitWarning(msg, "DeprecationWarning", deprecated);
            }
        }
        if (new.target) {
            return Reflect.construct(fn, args3, new.target);
        }
        return Reflect.apply(fn, this, args3);
    }
    Object.setPrototypeOf(deprecated, fn);
    if (fn.prototype) {
        deprecated.prototype = fn.prototype;
    }
    return deprecated;
}
const CHAR_FORWARD_SLASH1 = 47;
function assertPath1(path31) {
    if (typeof path31 !== "string") {
        throw new ERR_INVALID_ARG_TYPE("path", [
            "string"
        ], path31);
    }
}
function isPosixPathSeparator1(code) {
    return code === 47;
}
function isPathSeparator1(code) {
    return isPosixPathSeparator1(code) || code === 92;
}
function isWindowsDeviceRoot1(code) {
    return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function normalizeString1(path32, allowAboveRoot, separator, isPathSeparator11) {
    let res = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code;
    for(let i124 = 0, len = path32.length; i124 <= len; ++i124){
        if (i124 < len) code = path32.charCodeAt(i124);
        else if (isPathSeparator11(code)) break;
        else code = CHAR_FORWARD_SLASH1;
        if (isPathSeparator11(code)) {
            if (lastSlash === i124 - 1 || dots === 1) {} else if (lastSlash !== i124 - 1 && dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = "";
                            lastSegmentLength = 0;
                        } else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i124;
                        dots = 0;
                        continue;
                    } else if (res.length === 2 || res.length === 1) {
                        res = "";
                        lastSegmentLength = 0;
                        lastSlash = i124;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    if (res.length > 0) res += `${separator}..`;
                    else res = "..";
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += separator + path32.slice(lastSlash + 1, i124);
                else res = path32.slice(lastSlash + 1, i124);
                lastSegmentLength = i124 - lastSlash - 1;
            }
            lastSlash = i124;
            dots = 0;
        } else if (code === 46 && dots !== -1) {
            ++dots;
        } else {
            dots = -1;
        }
    }
    return res;
}
function _format1(sep7, pathObject) {
    const dir = pathObject.dir || pathObject.root;
    const base8 = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) return base8;
    if (dir === pathObject.root) return dir + base8;
    return dir + sep7 + base8;
}
const WHITESPACE_ENCODINGS1 = {
    "\u0009": "%09",
    "\u000A": "%0A",
    "\u000B": "%0B",
    "\u000C": "%0C",
    "\u000D": "%0D",
    "\u0020": "%20"
};
function encodeWhitespace1(string) {
    return string.replaceAll(/[\s]/g, (c)=>{
        return WHITESPACE_ENCODINGS1[c] ?? c;
    });
}
const sep3 = "\\";
const delimiter3 = ";";
function resolve3(...pathSegments) {
    let resolvedDevice = "";
    let resolvedTail = "";
    let resolvedAbsolute = false;
    for(let i125 = pathSegments.length - 1; i125 >= -1; i125--){
        let path33;
        const { Deno  } = globalThis;
        if (i125 >= 0) {
            path33 = pathSegments[i125];
        } else if (!resolvedDevice) {
            if (typeof Deno?.cwd !== "function") {
                throw new TypeError("Resolved a drive-letter-less path without a CWD.");
            }
            path33 = Deno.cwd();
        } else {
            if (typeof Deno?.env?.get !== "function" || typeof Deno?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path33 = Deno.cwd();
            if (path33 === undefined || path33.slice(0, 3).toLowerCase() !== `${resolvedDevice.toLowerCase()}\\`) {
                path33 = `${resolvedDevice}\\`;
            }
        }
        assertPath1(path33);
        const len = path33.length;
        if (len === 0) continue;
        let rootEnd = 0;
        let device = "";
        let isAbsolute11 = false;
        const code = path33.charCodeAt(0);
        if (len > 1) {
            if (isPathSeparator1(code)) {
                isAbsolute11 = true;
                if (isPathSeparator1(path33.charCodeAt(1))) {
                    let j11 = 2;
                    let last = j11;
                    for(; j11 < len; ++j11){
                        if (isPathSeparator1(path33.charCodeAt(j11))) break;
                    }
                    if (j11 < len && j11 !== last) {
                        const firstPart = path33.slice(last, j11);
                        last = j11;
                        for(; j11 < len; ++j11){
                            if (!isPathSeparator1(path33.charCodeAt(j11))) break;
                        }
                        if (j11 < len && j11 !== last) {
                            last = j11;
                            for(; j11 < len; ++j11){
                                if (isPathSeparator1(path33.charCodeAt(j11))) break;
                            }
                            if (j11 === len) {
                                device = `\\\\${firstPart}\\${path33.slice(last)}`;
                                rootEnd = j11;
                            } else if (j11 !== last) {
                                device = `\\\\${firstPart}\\${path33.slice(last, j11)}`;
                                rootEnd = j11;
                            }
                        }
                    }
                } else {
                    rootEnd = 1;
                }
            } else if (isWindowsDeviceRoot1(code)) {
                if (path33.charCodeAt(1) === 58) {
                    device = path33.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2) {
                        if (isPathSeparator1(path33.charCodeAt(2))) {
                            isAbsolute11 = true;
                            rootEnd = 3;
                        }
                    }
                }
            }
        } else if (isPathSeparator1(code)) {
            rootEnd = 1;
            isAbsolute11 = true;
        }
        if (device.length > 0 && resolvedDevice.length > 0 && device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            continue;
        }
        if (resolvedDevice.length === 0 && device.length > 0) {
            resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
            resolvedTail = `${path33.slice(rootEnd)}\\${resolvedTail}`;
            resolvedAbsolute = isAbsolute11;
        }
        if (resolvedAbsolute && resolvedDevice.length > 0) break;
    }
    resolvedTail = normalizeString1(resolvedTail, !resolvedAbsolute, "\\", isPathSeparator1);
    return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail || ".";
}
function normalize4(path34) {
    assertPath1(path34);
    const len = path34.length;
    if (len === 0) return ".";
    let rootEnd = 0;
    let device;
    let isAbsolute21 = false;
    const code = path34.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator1(code)) {
            isAbsolute21 = true;
            if (isPathSeparator1(path34.charCodeAt(1))) {
                let j12 = 2;
                let last = j12;
                for(; j12 < len; ++j12){
                    if (isPathSeparator1(path34.charCodeAt(j12))) break;
                }
                if (j12 < len && j12 !== last) {
                    const firstPart = path34.slice(last, j12);
                    last = j12;
                    for(; j12 < len; ++j12){
                        if (!isPathSeparator1(path34.charCodeAt(j12))) break;
                    }
                    if (j12 < len && j12 !== last) {
                        last = j12;
                        for(; j12 < len; ++j12){
                            if (isPathSeparator1(path34.charCodeAt(j12))) break;
                        }
                        if (j12 === len) {
                            return `\\\\${firstPart}\\${path34.slice(last)}\\`;
                        } else if (j12 !== last) {
                            device = `\\\\${firstPart}\\${path34.slice(last, j12)}`;
                            rootEnd = j12;
                        }
                    }
                }
            } else {
                rootEnd = 1;
            }
        } else if (isWindowsDeviceRoot1(code)) {
            if (path34.charCodeAt(1) === 58) {
                device = path34.slice(0, 2);
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator1(path34.charCodeAt(2))) {
                        isAbsolute21 = true;
                        rootEnd = 3;
                    }
                }
            }
        }
    } else if (isPathSeparator1(code)) {
        return "\\";
    }
    let tail;
    if (rootEnd < len) {
        tail = normalizeString1(path34.slice(rootEnd), !isAbsolute21, "\\", isPathSeparator1);
    } else {
        tail = "";
    }
    if (tail.length === 0 && !isAbsolute21) tail = ".";
    if (tail.length > 0 && isPathSeparator1(path34.charCodeAt(len - 1))) {
        tail += "\\";
    }
    if (device === undefined) {
        if (isAbsolute21) {
            if (tail.length > 0) return `\\${tail}`;
            else return "\\";
        } else if (tail.length > 0) {
            return tail;
        } else {
            return "";
        }
    } else if (isAbsolute21) {
        if (tail.length > 0) return `${device}\\${tail}`;
        else return `${device}\\`;
    } else if (tail.length > 0) {
        return device + tail;
    } else {
        return device;
    }
}
function isAbsolute3(path35) {
    assertPath1(path35);
    const len = path35.length;
    if (len === 0) return false;
    const code = path35.charCodeAt(0);
    if (isPathSeparator1(code)) {
        return true;
    } else if (isWindowsDeviceRoot1(code)) {
        if (len > 2 && path35.charCodeAt(1) === 58) {
            if (isPathSeparator1(path35.charCodeAt(2))) return true;
        }
    }
    return false;
}
function join5(...paths) {
    const pathsCount = paths.length;
    if (pathsCount === 0) return ".";
    let joined;
    let firstPart = null;
    for(let i126 = 0; i126 < pathsCount; ++i126){
        const path36 = paths[i126];
        assertPath1(path36);
        if (path36.length > 0) {
            if (joined === undefined) joined = firstPart = path36;
            else joined += `\\${path36}`;
        }
    }
    if (joined === undefined) return ".";
    let needsReplace = true;
    let slashCount = 0;
    assert(firstPart != null);
    if (isPathSeparator1(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1) {
            if (isPathSeparator1(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator1(firstPart.charCodeAt(2))) ++slashCount;
                    else {
                        needsReplace = false;
                    }
                }
            }
        }
    }
    if (needsReplace) {
        for(; slashCount < joined.length; ++slashCount){
            if (!isPathSeparator1(joined.charCodeAt(slashCount))) break;
        }
        if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
    }
    return normalize4(joined);
}
function relative3(from, to) {
    assertPath1(from);
    assertPath1(to);
    if (from === to) return "";
    const fromOrig = resolve3(from);
    const toOrig = resolve3(to);
    if (fromOrig === toOrig) return "";
    from = fromOrig.toLowerCase();
    to = toOrig.toLowerCase();
    if (from === to) return "";
    let fromStart = 0;
    let fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 92) break;
    }
    for(; fromEnd - 1 > fromStart; --fromEnd){
        if (from.charCodeAt(fromEnd - 1) !== 92) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 0;
    let toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 92) break;
    }
    for(; toEnd - 1 > toStart; --toEnd){
        if (to.charCodeAt(toEnd - 1) !== 92) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i127 = 0;
    for(; i127 <= length; ++i127){
        if (i127 === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i127) === 92) {
                    return toOrig.slice(toStart + i127 + 1);
                } else if (i127 === 2) {
                    return toOrig.slice(toStart + i127);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i127) === 92) {
                    lastCommonSep = i127;
                } else if (i127 === 2) {
                    lastCommonSep = 3;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i127);
        const toCode = to.charCodeAt(toStart + i127);
        if (fromCode !== toCode) break;
        else if (fromCode === 92) lastCommonSep = i127;
    }
    if (i127 !== length && lastCommonSep === -1) {
        return toOrig;
    }
    let out = "";
    if (lastCommonSep === -1) lastCommonSep = 0;
    for(i127 = fromStart + lastCommonSep + 1; i127 <= fromEnd; ++i127){
        if (i127 === fromEnd || from.charCodeAt(i127) === 92) {
            if (out.length === 0) out += "..";
            else out += "\\..";
        }
    }
    if (out.length > 0) {
        return out + toOrig.slice(toStart + lastCommonSep, toEnd);
    } else {
        toStart += lastCommonSep;
        if (toOrig.charCodeAt(toStart) === 92) ++toStart;
        return toOrig.slice(toStart, toEnd);
    }
}
function toNamespacedPath3(path37) {
    if (typeof path37 !== "string") return path37;
    if (path37.length === 0) return "";
    const resolvedPath = resolve3(path37);
    if (resolvedPath.length >= 3) {
        if (resolvedPath.charCodeAt(0) === 92) {
            if (resolvedPath.charCodeAt(1) === 92) {
                const code = resolvedPath.charCodeAt(2);
                if (code !== 63 && code !== 46) {
                    return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                }
            }
        } else if (isWindowsDeviceRoot1(resolvedPath.charCodeAt(0))) {
            if (resolvedPath.charCodeAt(1) === 58 && resolvedPath.charCodeAt(2) === 92) {
                return `\\\\?\\${resolvedPath}`;
            }
        }
    }
    return path37;
}
function dirname3(path38) {
    assertPath1(path38);
    const len = path38.length;
    if (len === 0) return ".";
    let rootEnd = -1;
    let end = -1;
    let matchedSlash = true;
    let offset = 0;
    const code = path38.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator1(code)) {
            rootEnd = offset = 1;
            if (isPathSeparator1(path38.charCodeAt(1))) {
                let j13 = 2;
                let last = j13;
                for(; j13 < len; ++j13){
                    if (isPathSeparator1(path38.charCodeAt(j13))) break;
                }
                if (j13 < len && j13 !== last) {
                    last = j13;
                    for(; j13 < len; ++j13){
                        if (!isPathSeparator1(path38.charCodeAt(j13))) break;
                    }
                    if (j13 < len && j13 !== last) {
                        last = j13;
                        for(; j13 < len; ++j13){
                            if (isPathSeparator1(path38.charCodeAt(j13))) break;
                        }
                        if (j13 === len) {
                            return path38;
                        }
                        if (j13 !== last) {
                            rootEnd = offset = j13 + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot1(code)) {
            if (path38.charCodeAt(1) === 58) {
                rootEnd = offset = 2;
                if (len > 2) {
                    if (isPathSeparator1(path38.charCodeAt(2))) rootEnd = offset = 3;
                }
            }
        }
    } else if (isPathSeparator1(code)) {
        return path38;
    }
    for(let i128 = len - 1; i128 >= offset; --i128){
        if (isPathSeparator1(path38.charCodeAt(i128))) {
            if (!matchedSlash) {
                end = i128;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) {
        if (rootEnd === -1) return ".";
        else end = rootEnd;
    }
    return path38.slice(0, end);
}
function basename3(path39, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new ERR_INVALID_ARG_TYPE("ext", [
            "string"
        ], ext);
    }
    assertPath1(path39);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i129;
    if (path39.length >= 2) {
        const drive = path39.charCodeAt(0);
        if (isWindowsDeviceRoot1(drive)) {
            if (path39.charCodeAt(1) === 58) start = 2;
        }
    }
    if (ext !== undefined && ext.length > 0 && ext.length <= path39.length) {
        if (ext.length === path39.length && ext === path39) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i129 = path39.length - 1; i129 >= start; --i129){
            const code = path39.charCodeAt(i129);
            if (isPathSeparator1(code)) {
                if (!matchedSlash) {
                    start = i129 + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i129 + 1;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i129;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path39.length;
        return path39.slice(start, end);
    } else {
        for(i129 = path39.length - 1; i129 >= start; --i129){
            if (isPathSeparator1(path39.charCodeAt(i129))) {
                if (!matchedSlash) {
                    start = i129 + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i129 + 1;
            }
        }
        if (end === -1) return "";
        return path39.slice(start, end);
    }
}
function extname3(path40) {
    assertPath1(path40);
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    if (path40.length >= 2 && path40.charCodeAt(1) === 58 && isWindowsDeviceRoot1(path40.charCodeAt(0))) {
        start = startPart = 2;
    }
    for(let i130 = path40.length - 1; i130 >= start; --i130){
        const code = path40.charCodeAt(i130);
        if (isPathSeparator1(code)) {
            if (!matchedSlash) {
                startPart = i130 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i130 + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i130;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path40.slice(startDot, end);
}
function format3(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new ERR_INVALID_ARG_TYPE("pathObject", [
            "Object"
        ], pathObject);
    }
    return _format1("\\", pathObject);
}
function parse4(path41) {
    assertPath1(path41);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    const len = path41.length;
    if (len === 0) return ret;
    let rootEnd = 0;
    let code = path41.charCodeAt(0);
    if (len > 1) {
        if (isPathSeparator1(code)) {
            rootEnd = 1;
            if (isPathSeparator1(path41.charCodeAt(1))) {
                let j14 = 2;
                let last = j14;
                for(; j14 < len; ++j14){
                    if (isPathSeparator1(path41.charCodeAt(j14))) break;
                }
                if (j14 < len && j14 !== last) {
                    last = j14;
                    for(; j14 < len; ++j14){
                        if (!isPathSeparator1(path41.charCodeAt(j14))) break;
                    }
                    if (j14 < len && j14 !== last) {
                        last = j14;
                        for(; j14 < len; ++j14){
                            if (isPathSeparator1(path41.charCodeAt(j14))) break;
                        }
                        if (j14 === len) {
                            rootEnd = j14;
                        } else if (j14 !== last) {
                            rootEnd = j14 + 1;
                        }
                    }
                }
            }
        } else if (isWindowsDeviceRoot1(code)) {
            if (path41.charCodeAt(1) === 58) {
                rootEnd = 2;
                if (len > 2) {
                    if (isPathSeparator1(path41.charCodeAt(2))) {
                        if (len === 3) {
                            ret.root = ret.dir = path41;
                            return ret;
                        }
                        rootEnd = 3;
                    }
                } else {
                    ret.root = ret.dir = path41;
                    return ret;
                }
            }
        }
    } else if (isPathSeparator1(code)) {
        ret.root = ret.dir = path41;
        return ret;
    }
    if (rootEnd > 0) ret.root = path41.slice(0, rootEnd);
    let startDot = -1;
    let startPart = rootEnd;
    let end = -1;
    let matchedSlash = true;
    let i131 = path41.length - 1;
    let preDotState = 0;
    for(; i131 >= rootEnd; --i131){
        code = path41.charCodeAt(i131);
        if (isPathSeparator1(code)) {
            if (!matchedSlash) {
                startPart = i131 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i131 + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i131;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            ret.base = ret.name = path41.slice(startPart, end);
        }
    } else {
        ret.name = path41.slice(startPart, startDot);
        ret.base = path41.slice(startPart, end);
        ret.ext = path41.slice(startDot, end);
    }
    if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = path41.slice(0, startPart - 1);
    } else ret.dir = ret.root;
    return ret;
}
function fromFileUrl3(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    let path42 = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
    if (url.hostname != "") {
        path42 = `\\\\${url.hostname}${path42}`;
    }
    return path42;
}
function toFileUrl3(path43) {
    if (!isAbsolute3(path43)) {
        throw new TypeError("Must be an absolute path.");
    }
    const [, hostname, pathname] = path43.match(/^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/);
    const url = new URL("file:///");
    url.pathname = encodeWhitespace1(pathname.replace(/%/g, "%25"));
    if (hostname != null && hostname != "localhost") {
        url.hostname = hostname;
        if (!url.hostname) {
            throw new TypeError("Invalid hostname.");
        }
    }
    return url;
}
const __default5 = {
    basename: basename3,
    delimiter: delimiter3,
    dirname: dirname3,
    extname: extname3,
    format: format3,
    fromFileUrl: fromFileUrl3,
    isAbsolute: isAbsolute3,
    join: join5,
    normalize: normalize4,
    parse: parse4,
    relative: relative3,
    resolve: resolve3,
    sep: sep3,
    toFileUrl: toFileUrl3,
    toNamespacedPath: toNamespacedPath3
};
const mod50 = {
    sep: sep3,
    delimiter: delimiter3,
    resolve: resolve3,
    normalize: normalize4,
    isAbsolute: isAbsolute3,
    join: join5,
    relative: relative3,
    toNamespacedPath: toNamespacedPath3,
    dirname: dirname3,
    basename: basename3,
    extname: extname3,
    format: format3,
    parse: parse4,
    fromFileUrl: fromFileUrl3,
    toFileUrl: toFileUrl3,
    default: __default5
};
const sep4 = "/";
const delimiter4 = ":";
function resolve4(...pathSegments) {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for(let i132 = pathSegments.length - 1; i132 >= -1 && !resolvedAbsolute; i132--){
        let path44;
        if (i132 >= 0) path44 = pathSegments[i132];
        else {
            const { Deno  } = globalThis;
            if (typeof Deno?.cwd !== "function") {
                throw new TypeError("Resolved a relative path without a CWD.");
            }
            path44 = Deno.cwd();
        }
        assertPath1(path44);
        if (path44.length === 0) {
            continue;
        }
        resolvedPath = `${path44}/${resolvedPath}`;
        resolvedAbsolute = path44.charCodeAt(0) === CHAR_FORWARD_SLASH1;
    }
    resolvedPath = normalizeString1(resolvedPath, !resolvedAbsolute, "/", isPosixPathSeparator1);
    if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return `/${resolvedPath}`;
        else return "/";
    } else if (resolvedPath.length > 0) return resolvedPath;
    else return ".";
}
function normalize5(path45) {
    assertPath1(path45);
    if (path45.length === 0) return ".";
    const isAbsolute12 = path45.charCodeAt(0) === 47;
    const trailingSeparator = path45.charCodeAt(path45.length - 1) === 47;
    path45 = normalizeString1(path45, !isAbsolute12, "/", isPosixPathSeparator1);
    if (path45.length === 0 && !isAbsolute12) path45 = ".";
    if (path45.length > 0 && trailingSeparator) path45 += "/";
    if (isAbsolute12) return `/${path45}`;
    return path45;
}
function isAbsolute4(path46) {
    assertPath1(path46);
    return path46.length > 0 && path46.charCodeAt(0) === 47;
}
function join6(...paths) {
    if (paths.length === 0) return ".";
    let joined;
    for(let i133 = 0, len = paths.length; i133 < len; ++i133){
        const path47 = paths[i133];
        assertPath1(path47);
        if (path47.length > 0) {
            if (!joined) joined = path47;
            else joined += `/${path47}`;
        }
    }
    if (!joined) return ".";
    return normalize5(joined);
}
function relative4(from, to) {
    assertPath1(from);
    assertPath1(to);
    if (from === to) return "";
    from = resolve4(from);
    to = resolve4(to);
    if (from === to) return "";
    let fromStart = 1;
    const fromEnd = from.length;
    for(; fromStart < fromEnd; ++fromStart){
        if (from.charCodeAt(fromStart) !== 47) break;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 1;
    const toEnd = to.length;
    for(; toStart < toEnd; ++toStart){
        if (to.charCodeAt(toStart) !== 47) break;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i134 = 0;
    for(; i134 <= length; ++i134){
        if (i134 === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i134) === 47) {
                    return to.slice(toStart + i134 + 1);
                } else if (i134 === 0) {
                    return to.slice(toStart + i134);
                }
            } else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i134) === 47) {
                    lastCommonSep = i134;
                } else if (i134 === 0) {
                    lastCommonSep = 0;
                }
            }
            break;
        }
        const fromCode = from.charCodeAt(fromStart + i134);
        const toCode = to.charCodeAt(toStart + i134);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i134;
    }
    let out = "";
    for(i134 = fromStart + lastCommonSep + 1; i134 <= fromEnd; ++i134){
        if (i134 === fromEnd || from.charCodeAt(i134) === 47) {
            if (out.length === 0) out += "..";
            else out += "/..";
        }
    }
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
    else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
    }
}
function toNamespacedPath4(path48) {
    return path48;
}
function dirname4(path49) {
    assertPath1(path49);
    if (path49.length === 0) return ".";
    const hasRoot = path49.charCodeAt(0) === 47;
    let end = -1;
    let matchedSlash = true;
    for(let i135 = path49.length - 1; i135 >= 1; --i135){
        if (path49.charCodeAt(i135) === 47) {
            if (!matchedSlash) {
                end = i135;
                break;
            }
        } else {
            matchedSlash = false;
        }
    }
    if (end === -1) return hasRoot ? "/" : ".";
    if (hasRoot && end === 1) return "//";
    return path49.slice(0, end);
}
function basename4(path50, ext = "") {
    if (ext !== undefined && typeof ext !== "string") {
        throw new ERR_INVALID_ARG_TYPE("ext", [
            "string"
        ], ext);
    }
    assertPath1(path50);
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    let i136;
    if (ext !== undefined && ext.length > 0 && ext.length <= path50.length) {
        if (ext.length === path50.length && ext === path50) return "";
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for(i136 = path50.length - 1; i136 >= 0; --i136){
            const code = path50.charCodeAt(i136);
            if (code === 47) {
                if (!matchedSlash) {
                    start = i136 + 1;
                    break;
                }
            } else {
                if (firstNonSlashEnd === -1) {
                    matchedSlash = false;
                    firstNonSlashEnd = i136 + 1;
                }
                if (extIdx >= 0) {
                    if (code === ext.charCodeAt(extIdx)) {
                        if (--extIdx === -1) {
                            end = i136;
                        }
                    } else {
                        extIdx = -1;
                        end = firstNonSlashEnd;
                    }
                }
            }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path50.length;
        return path50.slice(start, end);
    } else {
        for(i136 = path50.length - 1; i136 >= 0; --i136){
            if (path50.charCodeAt(i136) === 47) {
                if (!matchedSlash) {
                    start = i136 + 1;
                    break;
                }
            } else if (end === -1) {
                matchedSlash = false;
                end = i136 + 1;
            }
        }
        if (end === -1) return "";
        return path50.slice(start, end);
    }
}
function extname4(path51) {
    assertPath1(path51);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for(let i137 = path51.length - 1; i137 >= 0; --i137){
        const code = path51.charCodeAt(i137);
        if (code === 47) {
            if (!matchedSlash) {
                startPart = i137 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i137 + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i137;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
    }
    return path51.slice(startDot, end);
}
function format4(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
        throw new ERR_INVALID_ARG_TYPE("pathObject", [
            "Object"
        ], pathObject);
    }
    return _format1("/", pathObject);
}
function parse5(path52) {
    assertPath1(path52);
    const ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
    };
    if (path52.length === 0) return ret;
    const isAbsolute22 = path52.charCodeAt(0) === 47;
    let start;
    if (isAbsolute22) {
        ret.root = "/";
        start = 1;
    } else {
        start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i138 = path52.length - 1;
    let preDotState = 0;
    for(; i138 >= start; --i138){
        const code = path52.charCodeAt(i138);
        if (code === 47) {
            if (!matchedSlash) {
                startPart = i138 + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            matchedSlash = false;
            end = i138 + 1;
        }
        if (code === 46) {
            if (startDot === -1) startDot = i138;
            else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
            preDotState = -1;
        }
    }
    if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
            if (startPart === 0 && isAbsolute22) {
                ret.base = ret.name = path52.slice(1, end);
            } else {
                ret.base = ret.name = path52.slice(startPart, end);
            }
        }
    } else {
        if (startPart === 0 && isAbsolute22) {
            ret.name = path52.slice(1, startDot);
            ret.base = path52.slice(1, end);
        } else {
            ret.name = path52.slice(startPart, startDot);
            ret.base = path52.slice(startPart, end);
        }
        ret.ext = path52.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path52.slice(0, startPart - 1);
    else if (isAbsolute22) ret.dir = "/";
    return ret;
}
function fromFileUrl4(url) {
    url = url instanceof URL ? url : new URL(url);
    if (url.protocol != "file:") {
        throw new TypeError("Must be a file URL.");
    }
    return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function toFileUrl4(path53) {
    if (!isAbsolute4(path53)) {
        throw new TypeError("Must be an absolute path.");
    }
    const url = new URL("file:///");
    url.pathname = encodeWhitespace1(path53.replace(/%/g, "%25").replace(/\\/g, "%5C"));
    return url;
}
const __default6 = {
    basename: basename4,
    delimiter: delimiter4,
    dirname: dirname4,
    extname: extname4,
    format: format4,
    fromFileUrl: fromFileUrl4,
    isAbsolute: isAbsolute4,
    join: join6,
    normalize: normalize5,
    parse: parse5,
    relative: relative4,
    resolve: resolve4,
    sep: sep4,
    toFileUrl: toFileUrl4,
    toNamespacedPath: toNamespacedPath4
};
const mod51 = {
    sep: sep4,
    delimiter: delimiter4,
    resolve: resolve4,
    normalize: normalize5,
    isAbsolute: isAbsolute4,
    join: join6,
    relative: relative4,
    toNamespacedPath: toNamespacedPath4,
    dirname: dirname4,
    basename: basename4,
    extname: extname4,
    format: format4,
    parse: parse5,
    fromFileUrl: fromFileUrl4,
    toFileUrl: toFileUrl4,
    default: __default6
};
const SEP = isWindows ? "\\" : "/";
const SEP_PATTERN = isWindows ? /[\\/]+/ : /\/+/;
function common(paths, sep8 = SEP) {
    const [first = "", ...remaining] = paths;
    if (first === "" || remaining.length === 0) {
        return first.substring(0, first.lastIndexOf(sep8) + 1);
    }
    const parts = first.split(sep8);
    let endOfPrefix = parts.length;
    for (const path54 of remaining){
        const compare = path54.split(sep8);
        for(let i139 = 0; i139 < endOfPrefix; i139++){
            if (compare[i139] !== parts[i139]) {
                endOfPrefix = i139;
            }
        }
        if (endOfPrefix === 0) {
            return "";
        }
    }
    const prefix = parts.slice(0, endOfPrefix).join(sep8);
    return prefix.endsWith(sep8) ? prefix : `${prefix}${sep8}`;
}
const path2 = isWindows ? mod50 : mod51;
const { join: join7 , normalize: normalize6  } = path2;
const regExpEscapeChars = [
    "!",
    "$",
    "(",
    ")",
    "*",
    "+",
    ".",
    "=",
    "?",
    "[",
    "\\",
    "^",
    "{",
    "|", 
];
const rangeEscapeChars = [
    "-",
    "\\",
    "]"
];
function globToRegExp(glob, { extended =true , globstar: globstarOption = true , os: os1 = osType , caseInsensitive =false  } = {}) {
    if (glob == "") {
        return /(?!)/;
    }
    const sep9 = os1 == "windows" ? "(?:\\\\|/)+" : "/+";
    const sepMaybe = os1 == "windows" ? "(?:\\\\|/)*" : "/*";
    const seps = os1 == "windows" ? [
        "\\",
        "/"
    ] : [
        "/"
    ];
    const globstar = os1 == "windows" ? "(?:[^\\\\/]*(?:\\\\|/|$)+)*" : "(?:[^/]*(?:/|$)+)*";
    const wildcard = os1 == "windows" ? "[^\\\\/]*" : "[^/]*";
    const escapePrefix = os1 == "windows" ? "`" : "\\";
    let newLength = glob.length;
    for(; newLength > 1 && seps.includes(glob[newLength - 1]); newLength--);
    glob = glob.slice(0, newLength);
    let regExpString = "";
    for(let j15 = 0; j15 < glob.length;){
        let segment = "";
        const groupStack = [];
        let inRange = false;
        let inEscape = false;
        let endsWithSep = false;
        let i140 = j15;
        for(; i140 < glob.length && !seps.includes(glob[i140]); i140++){
            if (inEscape) {
                inEscape = false;
                const escapeChars = inRange ? rangeEscapeChars : regExpEscapeChars;
                segment += escapeChars.includes(glob[i140]) ? `\\${glob[i140]}` : glob[i140];
                continue;
            }
            if (glob[i140] == escapePrefix) {
                inEscape = true;
                continue;
            }
            if (glob[i140] == "[") {
                if (!inRange) {
                    inRange = true;
                    segment += "[";
                    if (glob[i140 + 1] == "!") {
                        i140++;
                        segment += "^";
                    } else if (glob[i140 + 1] == "^") {
                        i140++;
                        segment += "\\^";
                    }
                    continue;
                } else if (glob[i140 + 1] == ":") {
                    let k = i140 + 1;
                    let value = "";
                    while(glob[k + 1] != null && glob[k + 1] != ":"){
                        value += glob[k + 1];
                        k++;
                    }
                    if (glob[k + 1] == ":" && glob[k + 2] == "]") {
                        i140 = k + 2;
                        if (value == "alnum") segment += "\\dA-Za-z";
                        else if (value == "alpha") segment += "A-Za-z";
                        else if (value == "ascii") segment += "\x00-\x7F";
                        else if (value == "blank") segment += "\t ";
                        else if (value == "cntrl") segment += "\x00-\x1F\x7F";
                        else if (value == "digit") segment += "\\d";
                        else if (value == "graph") segment += "\x21-\x7E";
                        else if (value == "lower") segment += "a-z";
                        else if (value == "print") segment += "\x20-\x7E";
                        else if (value == "punct") {
                            segment += "!\"#$%&'()*+,\\-./:;<=>?@[\\\\\\]^_‘{|}~";
                        } else if (value == "space") segment += "\\s\v";
                        else if (value == "upper") segment += "A-Z";
                        else if (value == "word") segment += "\\w";
                        else if (value == "xdigit") segment += "\\dA-Fa-f";
                        continue;
                    }
                }
            }
            if (glob[i140] == "]" && inRange) {
                inRange = false;
                segment += "]";
                continue;
            }
            if (inRange) {
                if (glob[i140] == "\\") {
                    segment += `\\\\`;
                } else {
                    segment += glob[i140];
                }
                continue;
            }
            if (glob[i140] == ")" && groupStack.length > 0 && groupStack[groupStack.length - 1] != "BRACE") {
                segment += ")";
                const type = groupStack.pop();
                if (type == "!") {
                    segment += wildcard;
                } else if (type != "@") {
                    segment += type;
                }
                continue;
            }
            if (glob[i140] == "|" && groupStack.length > 0 && groupStack[groupStack.length - 1] != "BRACE") {
                segment += "|";
                continue;
            }
            if (glob[i140] == "+" && extended && glob[i140 + 1] == "(") {
                i140++;
                groupStack.push("+");
                segment += "(?:";
                continue;
            }
            if (glob[i140] == "@" && extended && glob[i140 + 1] == "(") {
                i140++;
                groupStack.push("@");
                segment += "(?:";
                continue;
            }
            if (glob[i140] == "?") {
                if (extended && glob[i140 + 1] == "(") {
                    i140++;
                    groupStack.push("?");
                    segment += "(?:";
                } else {
                    segment += ".";
                }
                continue;
            }
            if (glob[i140] == "!" && extended && glob[i140 + 1] == "(") {
                i140++;
                groupStack.push("!");
                segment += "(?!";
                continue;
            }
            if (glob[i140] == "{") {
                groupStack.push("BRACE");
                segment += "(?:";
                continue;
            }
            if (glob[i140] == "}" && groupStack[groupStack.length - 1] == "BRACE") {
                groupStack.pop();
                segment += ")";
                continue;
            }
            if (glob[i140] == "," && groupStack[groupStack.length - 1] == "BRACE") {
                segment += "|";
                continue;
            }
            if (glob[i140] == "*") {
                if (extended && glob[i140 + 1] == "(") {
                    i140++;
                    groupStack.push("*");
                    segment += "(?:";
                } else {
                    const prevChar = glob[i140 - 1];
                    let numStars = 1;
                    while(glob[i140 + 1] == "*"){
                        i140++;
                        numStars++;
                    }
                    const nextChar = glob[i140 + 1];
                    if (globstarOption && numStars == 2 && [
                        ...seps,
                        undefined
                    ].includes(prevChar) && [
                        ...seps,
                        undefined
                    ].includes(nextChar)) {
                        segment += globstar;
                        endsWithSep = true;
                    } else {
                        segment += wildcard;
                    }
                }
                continue;
            }
            segment += regExpEscapeChars.includes(glob[i140]) ? `\\${glob[i140]}` : glob[i140];
        }
        if (groupStack.length > 0 || inRange || inEscape) {
            segment = "";
            for (const c of glob.slice(j15, i140)){
                segment += regExpEscapeChars.includes(c) ? `\\${c}` : c;
                endsWithSep = false;
            }
        }
        regExpString += segment;
        if (!endsWithSep) {
            regExpString += i140 < glob.length ? sep9 : sepMaybe;
            endsWithSep = true;
        }
        while(seps.includes(glob[i140]))i140++;
        if (!(i140 > j15)) {
            throw new Error("Assertion failure: i > j (potential infinite loop)");
        }
        j15 = i140;
    }
    regExpString = `^${regExpString}$`;
    return new RegExp(regExpString, caseInsensitive ? "i" : "");
}
function isGlob(str) {
    const chars = {
        "{": "}",
        "(": ")",
        "[": "]"
    };
    const regex = /\\(.)|(^!|\*|\?|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
    if (str === "") {
        return false;
    }
    let match;
    while(match = regex.exec(str)){
        if (match[2]) return true;
        let idx = match.index + match[0].length;
        const open1 = match[1];
        const close2 = open1 ? chars[open1] : null;
        if (open1 && close2) {
            const n = str.indexOf(close2, idx);
            if (n !== -1) {
                idx = n + 1;
            }
        }
        str = str.slice(idx);
    }
    return false;
}
function normalizeGlob(glob, { globstar =false  } = {}) {
    if (glob.match(/\0/g)) {
        throw new Error(`Glob contains invalid characters: "${glob}"`);
    }
    if (!globstar) {
        return normalize6(glob);
    }
    const s = SEP_PATTERN.source;
    const badParentPattern = new RegExp(`(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`, "g");
    return normalize6(glob.replace(badParentPattern, "\0")).replace(/\0/g, "..");
}
function joinGlobs(globs, { extended =true , globstar =false  } = {}) {
    if (!globstar || globs.length == 0) {
        return join7(...globs);
    }
    if (globs.length === 0) return ".";
    let joined;
    for (const glob of globs){
        const path110 = glob;
        if (path110.length > 0) {
            if (!joined) joined = path110;
            else joined += `${SEP}${path110}`;
        }
    }
    if (!joined) return ".";
    return normalizeGlob(joined, {
        extended,
        globstar
    });
}
const path3 = isWindows ? __default5 : __default6;
const { basename: basename5 , delimiter: delimiter5 , dirname: dirname5 , extname: extname5 , format: format5 , fromFileUrl: fromFileUrl5 , isAbsolute: isAbsolute5 , join: join8 , normalize: normalize7 , parse: parse6 , relative: relative5 , resolve: resolve5 , sep: sep5 , toFileUrl: toFileUrl5 , toNamespacedPath: toNamespacedPath5 ,  } = path3;
const mod52 = {
    SEP: SEP,
    SEP_PATTERN: SEP_PATTERN,
    win32: __default5,
    posix: __default6,
    basename: basename5,
    delimiter: delimiter5,
    dirname: dirname5,
    extname: extname5,
    format: format5,
    fromFileUrl: fromFileUrl5,
    isAbsolute: isAbsolute5,
    join: join8,
    normalize: normalize7,
    parse: parse6,
    relative: relative5,
    resolve: resolve5,
    sep: sep5,
    toFileUrl: toFileUrl5,
    toNamespacedPath: toNamespacedPath5,
    common,
    globToRegExp,
    isGlob,
    normalizeGlob,
    joinGlobs
};
const __default7 = {
    ...mod52
};
"use strict";
const base = 36;
const damp = 700;
const delimiter6 = "-";
const regexNonASCII = /[^\0-\x7E]/;
const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
const errors = {
    "overflow": "Overflow: input needs wider integers to process",
    "not-basic": "Illegal input >= 0x80 (not a basic code point)",
    "invalid-input": "Invalid input"
};
const baseMinusTMin = 36 - 1;
function error(type) {
    throw new RangeError(errors[type]);
}
function mapDomain(str, fn) {
    const parts = str.split("@");
    let result = "";
    if (parts.length > 1) {
        result = parts[0] + "@";
        str = parts[1];
    }
    str = str.replace(regexSeparators, "\x2E");
    const labels = str.split(".");
    const encoded = labels.map(fn).join(".");
    return result + encoded;
}
function ucs2decode(str) {
    const output = [];
    let counter = 0;
    const length = str.length;
    while(counter < length){
        const value = str.charCodeAt(counter++);
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
            const extra = str.charCodeAt(counter++);
            if ((extra & 0xFC00) == 0xDC00) {
                output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
            } else {
                output.push(value);
                counter--;
            }
        } else {
            output.push(value);
        }
    }
    return output;
}
function digitToBasic(digit, flag) {
    return digit + 22 + 75 * Number(digit < 26) - (Number(flag != 0) << 5);
}
function adapt(delta, numPoints, firstTime) {
    let k = 0;
    delta = firstTime ? Math.floor(delta / damp) : delta >> 1;
    delta += Math.floor(delta / numPoints);
    for(; delta > baseMinusTMin * 26 >> 1; k += base){
        delta = Math.floor(delta / baseMinusTMin);
    }
    return Math.floor(k + (baseMinusTMin + 1) * delta / (delta + 38));
}
function encode2(str) {
    const output = [];
    const input = ucs2decode(str);
    const inputLength = input.length;
    let n = 128;
    let delta = 0;
    let bias = 72;
    for (const currentValue of input){
        if (currentValue < 0x80) {
            output.push(String.fromCharCode(currentValue));
        }
    }
    const basicLength = output.length;
    let handledCPCount = basicLength;
    if (basicLength) {
        output.push(delimiter6);
    }
    while(handledCPCount < inputLength){
        let m6 = 2147483647;
        for (const currentValue of input){
            if (currentValue >= n && currentValue < m6) {
                m6 = currentValue;
            }
        }
        const handledCPCountPlusOne = handledCPCount + 1;
        if (m6 - n > Math.floor((2147483647 - delta) / handledCPCountPlusOne)) {
            error("overflow");
        }
        delta += (m6 - n) * handledCPCountPlusOne;
        n = m6;
        for (const currentValue1 of input){
            if (currentValue1 < n && ++delta > 2147483647) {
                error("overflow");
            }
            if (currentValue1 == n) {
                let q = delta;
                for(let k = 36;; k += base){
                    const t = k <= bias ? 1 : k >= bias + 26 ? 26 : k - bias;
                    if (q < t) {
                        break;
                    }
                    const qMinusT = q - t;
                    const baseMinusT = 36 - t;
                    output.push(String.fromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                    q = Math.floor(qMinusT / baseMinusT);
                }
                output.push(String.fromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
            }
        }
        ++delta;
        ++n;
    }
    return output.join("");
}
function toASCII(input) {
    return mapDomain(input, function(str) {
        return regexNonASCII.test(str) ? "xn--" + encode2(str) : str;
    });
}
const hexTable = new Array(256);
for(let i1 = 0; i1 < 256; ++i1){
    hexTable[i1] = "%" + ((i1 < 16 ? "0" : "") + i1.toString(16)).toUpperCase();
}
new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
]);
function encodeStr(str, noEscapeTable, hexTable1) {
    const len = str.length;
    if (len === 0) return "";
    let out = "";
    let lastPos = 0;
    for(let i141 = 0; i141 < len; i141++){
        let c = str.charCodeAt(i141);
        if (c < 0x80) {
            if (noEscapeTable[c] === 1) continue;
            if (lastPos < i141) out += str.slice(lastPos, i141);
            lastPos = i141 + 1;
            out += hexTable1[c];
            continue;
        }
        if (lastPos < i141) out += str.slice(lastPos, i141);
        if (c < 0x800) {
            lastPos = i141 + 1;
            out += hexTable1[0xc0 | c >> 6] + hexTable1[0x80 | c & 0x3f];
            continue;
        }
        if (c < 0xd800 || c >= 0xe000) {
            lastPos = i141 + 1;
            out += hexTable1[0xe0 | c >> 12] + hexTable1[0x80 | c >> 6 & 0x3f] + hexTable1[0x80 | c & 0x3f];
            continue;
        }
        ++i141;
        if (i141 >= len) throw new ERR_INVALID_URI();
        const c2 = str.charCodeAt(i141) & 0x3ff;
        lastPos = i141 + 1;
        c = 0x10000 + ((c & 0x3ff) << 10 | c2);
        out += hexTable1[0xf0 | c >> 18] + hexTable1[0x80 | c >> 12 & 0x3f] + hexTable1[0x80 | c >> 6 & 0x3f] + hexTable1[0x80 | c & 0x3f];
    }
    if (lastPos === 0) return str;
    if (lastPos < len) return out + str.slice(lastPos);
    return out;
}
const decode2 = parse7;
const encode3 = stringify;
function qsEscape(str) {
    if (typeof str !== "string") {
        if (typeof str === "object") {
            str = String(str);
        } else {
            str += "";
        }
    }
    return encodeStr(str, noEscape, hexTable);
}
const escape = qsEscape;
const isHexTable = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
]);
function charCodes(str) {
    const ret = new Array(str.length);
    for(let i142 = 0; i142 < str.length; ++i142){
        ret[i142] = str.charCodeAt(i142);
    }
    return ret;
}
function addKeyVal(obj, key, value, keyEncoded, valEncoded, decode11) {
    if (key.length > 0 && keyEncoded) {
        key = decode11(key);
    }
    if (value.length > 0 && valEncoded) {
        value = decode11(value);
    }
    if (obj[key] === undefined) {
        obj[key] = value;
    } else {
        const curValue = obj[key];
        if (curValue.pop) {
            curValue[curValue.length] = value;
        } else {
            obj[key] = [
                curValue,
                value
            ];
        }
    }
}
function parse7(str, sep10 = "&", eq = "=", { decodeURIComponent =unescape , maxKeys =1000  } = {}) {
    const obj = Object.create(null);
    if (typeof str !== "string" || str.length === 0) {
        return obj;
    }
    const sepCodes = !sep10 ? [
        38
    ] : charCodes(String(sep10));
    const eqCodes = !eq ? [
        61
    ] : charCodes(String(eq));
    const sepLen = sepCodes.length;
    const eqLen = eqCodes.length;
    let pairs = 1000;
    if (typeof maxKeys === "number") {
        pairs = maxKeys > 0 ? maxKeys : -1;
    }
    let decode21 = unescape;
    if (decodeURIComponent) {
        decode21 = decodeURIComponent;
    }
    const customDecode = decode21 !== unescape;
    let lastPos = 0;
    let sepIdx = 0;
    let eqIdx = 0;
    let key = "";
    let value = "";
    let keyEncoded = customDecode;
    let valEncoded = customDecode;
    const plusChar = customDecode ? "%20" : " ";
    let encodeCheck = 0;
    for(let i143 = 0; i143 < str.length; ++i143){
        const code = str.charCodeAt(i143);
        if (code === sepCodes[sepIdx]) {
            if (++sepIdx === sepLen) {
                const end = i143 - sepIdx + 1;
                if (eqIdx < eqLen) {
                    if (lastPos < end) {
                        key += str.slice(lastPos, end);
                    } else if (key.length === 0) {
                        if (--pairs === 0) {
                            return obj;
                        }
                        lastPos = i143 + 1;
                        sepIdx = eqIdx = 0;
                        continue;
                    }
                } else if (lastPos < end) {
                    value += str.slice(lastPos, end);
                }
                addKeyVal(obj, key, value, keyEncoded, valEncoded, decode21);
                if (--pairs === 0) {
                    return obj;
                }
                key = value = "";
                encodeCheck = 0;
                lastPos = i143 + 1;
                sepIdx = eqIdx = 0;
            }
        } else {
            sepIdx = 0;
            if (eqIdx < eqLen) {
                if (code === eqCodes[eqIdx]) {
                    if (++eqIdx === eqLen) {
                        const end = i143 - eqIdx + 1;
                        if (lastPos < end) {
                            key += str.slice(lastPos, end);
                        }
                        encodeCheck = 0;
                        lastPos = i143 + 1;
                    }
                    continue;
                } else {
                    eqIdx = 0;
                    if (!keyEncoded) {
                        if (code === 37) {
                            encodeCheck = 1;
                            continue;
                        } else if (encodeCheck > 0) {
                            if (isHexTable[code] === 1) {
                                if (++encodeCheck === 3) {
                                    keyEncoded = true;
                                }
                                continue;
                            } else {
                                encodeCheck = 0;
                            }
                        }
                    }
                }
                if (code === 43) {
                    if (lastPos < i143) {
                        key += str.slice(lastPos, i143);
                    }
                    key += plusChar;
                    lastPos = i143 + 1;
                    continue;
                }
            }
            if (code === 43) {
                if (lastPos < i143) {
                    value += str.slice(lastPos, i143);
                }
                value += plusChar;
                lastPos = i143 + 1;
            } else if (!valEncoded) {
                if (code === 37) {
                    encodeCheck = 1;
                } else if (encodeCheck > 0) {
                    if (isHexTable[code] === 1) {
                        if (++encodeCheck === 3) {
                            valEncoded = true;
                        }
                    } else {
                        encodeCheck = 0;
                    }
                }
            }
        }
    }
    if (lastPos < str.length) {
        if (eqIdx < eqLen) {
            key += str.slice(lastPos);
        } else if (sepIdx < sepLen) {
            value += str.slice(lastPos);
        }
    } else if (eqIdx === 0 && key.length === 0) {
        return obj;
    }
    addKeyVal(obj, key, value, keyEncoded, valEncoded, decode21);
    return obj;
}
const noEscape = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
]);
function stringifyPrimitive(v7) {
    if (typeof v7 === "string") {
        return v7;
    }
    if (typeof v7 === "number" && isFinite(v7)) {
        return "" + v7;
    }
    if (typeof v7 === "bigint") {
        return "" + v7;
    }
    if (typeof v7 === "boolean") {
        return v7 ? "true" : "false";
    }
    return "";
}
function encodeStringifiedCustom(v8, encode11) {
    return encode11(stringifyPrimitive(v8));
}
function encodeStringified(v9, encode21) {
    if (typeof v9 === "string") {
        return v9.length ? encode21(v9) : "";
    }
    if (typeof v9 === "number" && isFinite(v9)) {
        return Math.abs(v9) < 1e21 ? "" + v9 : encode21("" + v9);
    }
    if (typeof v9 === "bigint") {
        return "" + v9;
    }
    if (typeof v9 === "boolean") {
        return v9 ? "true" : "false";
    }
    return "";
}
function stringify(obj, sep11, eq, options) {
    sep11 ||= "&";
    eq ||= "=";
    const encode31 = options ? options.encodeURIComponent : qsEscape;
    const convert = options ? encodeStringifiedCustom : encodeStringified;
    if (obj !== null && typeof obj === "object") {
        const keys = Object.keys(obj);
        const len = keys.length;
        let fields = "";
        for(let i144 = 0; i144 < len; ++i144){
            const k = keys[i144];
            const v10 = obj[k];
            let ks = convert(k, encode31);
            ks += eq;
            if (Array.isArray(v10)) {
                const vlen = v10.length;
                if (vlen === 0) continue;
                if (fields) {
                    fields += sep11;
                }
                for(let j16 = 0; j16 < vlen; ++j16){
                    if (j16) {
                        fields += sep11;
                    }
                    fields += ks;
                    fields += convert(v10[j16], encode31);
                }
            } else {
                if (fields) {
                    fields += sep11;
                }
                fields += ks;
                fields += convert(v10, encode31);
            }
        }
        return fields;
    }
    return "";
}
const unhexTable = new Int8Array([
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    +0,
    +1,
    +2,
    +3,
    +4,
    +5,
    +6,
    +7,
    +8,
    +9,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    12,
    13,
    14,
    15,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    10,
    11,
    12,
    13,
    14,
    15,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
]);
function unescapeBuffer(s, decodeSpaces = false) {
    const out = Buffer.alloc(s.length);
    let index = 0;
    let outIndex = 0;
    let currentChar;
    let nextChar;
    let hexHigh;
    let hexLow;
    const maxLength = s.length - 2;
    let hasHex = false;
    while(index < s.length){
        currentChar = s.charCodeAt(index);
        if (currentChar === 43 && decodeSpaces) {
            out[outIndex++] = 32;
            index++;
            continue;
        }
        if (currentChar === 37 && index < maxLength) {
            currentChar = s.charCodeAt(++index);
            hexHigh = unhexTable[currentChar];
            if (!(hexHigh >= 0)) {
                out[outIndex++] = 37;
                continue;
            } else {
                nextChar = s.charCodeAt(++index);
                hexLow = unhexTable[nextChar];
                if (!(hexLow >= 0)) {
                    out[outIndex++] = 37;
                    index--;
                } else {
                    hasHex = true;
                    currentChar = hexHigh * 16 + hexLow;
                }
            }
        }
        out[outIndex++] = currentChar;
        index++;
    }
    return hasHex ? out.slice(0, outIndex) : out;
}
function qsUnescape(s) {
    try {
        return decodeURIComponent(s);
    } catch  {
        return unescapeBuffer(s).toString();
    }
}
const unescape = qsUnescape;
const __default8 = {
    parse: parse7,
    stringify,
    decode: decode2,
    encode: encode3,
    unescape,
    escape,
    unescapeBuffer
};
const forwardSlashRegEx = /\//g;
const protocolPattern = /^[a-z0-9.+-]+:/i;
const portPattern = /:[0-9]*$/;
const hostPattern = /^\/\/[^@/]+@[^@/]+/;
const simplePathPattern = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/;
const unsafeProtocol = new Set([
    "javascript",
    "javascript:"
]);
const hostlessProtocol = new Set([
    "javascript",
    "javascript:"
]);
const slashedProtocol = new Set([
    "http",
    "http:",
    "https",
    "https:",
    "ftp",
    "ftp:",
    "gopher",
    "gopher:",
    "file",
    "file:",
    "ws",
    "ws:",
    "wss",
    "wss:", 
]);
const noEscapeAuth = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
]);
const forbiddenHostChars = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
const forbiddenHostCharsIpv6 = /[\0\t\n\r #%/<>?@\\^|]/;
class Url {
    protocol;
    slashes;
    auth;
    host;
    port;
    hostname;
    hash;
    search;
    query;
    pathname;
    path;
    href;
    constructor(){
        this.protocol = null;
        this.slashes = null;
        this.auth = null;
        this.host = null;
        this.port = null;
        this.hostname = null;
        this.hash = null;
        this.search = null;
        this.query = null;
        this.pathname = null;
        this.path = null;
        this.href = null;
    }
     #parseHost() {
        let host = this.host || "";
        let port = portPattern.exec(host);
        if (port) {
            port = port[0];
            if (port !== ":") {
                this.port = port.slice(1);
            }
            host = host.slice(0, host.length - port.length);
        }
        if (host) this.hostname = host;
    }
    resolve(relative6) {
        return this.resolveObject(parse8(relative6, false, true)).format();
    }
    resolveObject(relative7) {
        if (typeof relative7 === "string") {
            const rel = new Url();
            rel.urlParse(relative7, false, true);
            relative7 = rel;
        }
        const result = new Url();
        const tkeys = Object.keys(this);
        for(let tk = 0; tk < tkeys.length; tk++){
            const tkey = tkeys[tk];
            result[tkey] = this[tkey];
        }
        result.hash = relative7.hash;
        if (relative7.href === "") {
            result.href = result.format();
            return result;
        }
        if (relative7.slashes && !relative7.protocol) {
            const rkeys = Object.keys(relative7);
            for(let rk = 0; rk < rkeys.length; rk++){
                const rkey = rkeys[rk];
                if (rkey !== "protocol") result[rkey] = relative7[rkey];
            }
            if (result.protocol && slashedProtocol.has(result.protocol) && result.hostname && !result.pathname) {
                result.path = result.pathname = "/";
            }
            result.href = result.format();
            return result;
        }
        if (relative7.protocol && relative7.protocol !== result.protocol) {
            if (!slashedProtocol.has(relative7.protocol)) {
                const keys = Object.keys(relative7);
                for(let v11 = 0; v11 < keys.length; v11++){
                    const k = keys[v11];
                    result[k] = relative7[k];
                }
                result.href = result.format();
                return result;
            }
            result.protocol = relative7.protocol;
            if (!relative7.host && !/^file:?$/.test(relative7.protocol) && !hostlessProtocol.has(relative7.protocol)) {
                const relPath = (relative7.pathname || "").split("/");
                while(relPath.length && !(relative7.host = relPath.shift() || null));
                if (!relative7.host) relative7.host = "";
                if (!relative7.hostname) relative7.hostname = "";
                if (relPath[0] !== "") relPath.unshift("");
                if (relPath.length < 2) relPath.unshift("");
                result.pathname = relPath.join("/");
            } else {
                result.pathname = relative7.pathname;
            }
            result.search = relative7.search;
            result.query = relative7.query;
            result.host = relative7.host || "";
            result.auth = relative7.auth;
            result.hostname = relative7.hostname || relative7.host;
            result.port = relative7.port;
            if (result.pathname || result.search) {
                const p = result.pathname || "";
                const s = result.search || "";
                result.path = p + s;
            }
            result.slashes = result.slashes || relative7.slashes;
            result.href = result.format();
            return result;
        }
        const isSourceAbs = result.pathname && result.pathname.charAt(0) === "/";
        const isRelAbs = relative7.host || relative7.pathname && relative7.pathname.charAt(0) === "/";
        let mustEndAbs = isRelAbs || isSourceAbs || result.host && relative7.pathname;
        const removeAllDots = mustEndAbs;
        let srcPath = result.pathname && result.pathname.split("/") || [];
        const relPath = relative7.pathname && relative7.pathname.split("/") || [];
        const noLeadingSlashes = result.protocol && !slashedProtocol.has(result.protocol);
        if (noLeadingSlashes) {
            result.hostname = "";
            result.port = null;
            if (result.host) {
                if (srcPath[0] === "") srcPath[0] = result.host;
                else srcPath.unshift(result.host);
            }
            result.host = "";
            if (relative7.protocol) {
                relative7.hostname = null;
                relative7.port = null;
                result.auth = null;
                if (relative7.host) {
                    if (relPath[0] === "") relPath[0] = relative7.host;
                    else relPath.unshift(relative7.host);
                }
                relative7.host = null;
            }
            mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
        }
        if (isRelAbs) {
            if (relative7.host || relative7.host === "") {
                if (result.host !== relative7.host) result.auth = null;
                result.host = relative7.host;
                result.port = relative7.port;
            }
            if (relative7.hostname || relative7.hostname === "") {
                if (result.hostname !== relative7.hostname) result.auth = null;
                result.hostname = relative7.hostname;
            }
            result.search = relative7.search;
            result.query = relative7.query;
            srcPath = relPath;
        } else if (relPath.length) {
            if (!srcPath) srcPath = [];
            srcPath.pop();
            srcPath = srcPath.concat(relPath);
            result.search = relative7.search;
            result.query = relative7.query;
        } else if (relative7.search !== null && relative7.search !== undefined) {
            if (noLeadingSlashes) {
                result.hostname = result.host = srcPath.shift() || null;
                const authInHost = result.host && result.host.indexOf("@") > 0 && result.host.split("@");
                if (authInHost) {
                    result.auth = authInHost.shift() || null;
                    result.host = result.hostname = authInHost.shift() || null;
                }
            }
            result.search = relative7.search;
            result.query = relative7.query;
            if (result.pathname !== null || result.search !== null) {
                result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
            }
            result.href = result.format();
            return result;
        }
        if (!srcPath.length) {
            result.pathname = null;
            if (result.search) {
                result.path = "/" + result.search;
            } else {
                result.path = null;
            }
            result.href = result.format();
            return result;
        }
        let last = srcPath.slice(-1)[0];
        const hasTrailingSlash = (result.host || relative7.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
        let up = 0;
        for(let i145 = srcPath.length - 1; i145 >= 0; i145--){
            last = srcPath[i145];
            if (last === ".") {
                srcPath.splice(i145, 1);
            } else if (last === "..") {
                srcPath.splice(i145, 1);
                up++;
            } else if (up) {
                srcPath.splice(i145, 1);
                up--;
            }
        }
        if (!mustEndAbs && !removeAllDots) {
            while(up--){
                srcPath.unshift("..");
            }
        }
        if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
            srcPath.unshift("");
        }
        if (hasTrailingSlash && srcPath.join("/").slice(-1) !== "/") {
            srcPath.push("");
        }
        const isAbsolute6 = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
        if (noLeadingSlashes) {
            result.hostname = result.host = isAbsolute6 ? "" : srcPath.length ? srcPath.shift() || null : "";
            const authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
            if (authInHost) {
                result.auth = authInHost.shift() || null;
                result.host = result.hostname = authInHost.shift() || null;
            }
        }
        mustEndAbs = mustEndAbs || result.host && srcPath.length;
        if (mustEndAbs && !isAbsolute6) {
            srcPath.unshift("");
        }
        if (!srcPath.length) {
            result.pathname = null;
            result.path = null;
        } else {
            result.pathname = srcPath.join("/");
        }
        if (result.pathname !== null || result.search !== null) {
            result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
        }
        result.auth = relative7.auth || result.auth;
        result.slashes = result.slashes || relative7.slashes;
        result.href = result.format();
        return result;
    }
    format() {
        let auth = this.auth || "";
        if (auth) {
            auth = encodeStr(auth, noEscapeAuth, hexTable);
            auth += "@";
        }
        let protocol = this.protocol || "";
        let pathname = this.pathname || "";
        let hash = this.hash || "";
        let host = "";
        let query2 = "";
        if (this.host) {
            host = auth + this.host;
        } else if (this.hostname) {
            host = auth + (this.hostname.includes(":") && !isIpv6Hostname(this.hostname) ? "[" + this.hostname + "]" : this.hostname);
            if (this.port) {
                host += ":" + this.port;
            }
        }
        if (this.query !== null && typeof this.query === "object") {
            query2 = __default8.stringify(this.query);
        }
        let search = this.search || query2 && "?" + query2 || "";
        if (protocol && protocol.charCodeAt(protocol.length - 1) !== 58) {
            protocol += ":";
        }
        let newPathname = "";
        let lastPos = 0;
        for(let i146 = 0; i146 < pathname.length; ++i146){
            switch(pathname.charCodeAt(i146)){
                case 35:
                    if (i146 - lastPos > 0) {
                        newPathname += pathname.slice(lastPos, i146);
                    }
                    newPathname += "%23";
                    lastPos = i146 + 1;
                    break;
                case 63:
                    if (i146 - lastPos > 0) {
                        newPathname += pathname.slice(lastPos, i146);
                    }
                    newPathname += "%3F";
                    lastPos = i146 + 1;
                    break;
            }
        }
        if (lastPos > 0) {
            if (lastPos !== pathname.length) {
                pathname = newPathname + pathname.slice(lastPos);
            } else pathname = newPathname;
        }
        if (this.slashes || slashedProtocol.has(protocol)) {
            if (this.slashes || host) {
                if (pathname && pathname.charCodeAt(0) !== 47) {
                    pathname = "/" + pathname;
                }
                host = "//" + host;
            } else if (protocol.length >= 4 && protocol.charCodeAt(0) === 102 && protocol.charCodeAt(1) === 105 && protocol.charCodeAt(2) === 108 && protocol.charCodeAt(3) === 101) {
                host = "//";
            }
        }
        search = search.replace(/#/g, "%23");
        if (hash && hash.charCodeAt(0) !== 35) {
            hash = "#" + hash;
        }
        if (search && search.charCodeAt(0) !== 63) {
            search = "?" + search;
        }
        return protocol + host + pathname + search + hash;
    }
    urlParse(url, parseQueryString, slashesDenoteHost) {
        validateString(url, "url");
        let hasHash = false;
        let start = -1;
        let end = -1;
        let rest = "";
        let lastPos = 0;
        for(let i147 = 0, inWs = false, split = false; i147 < url.length; ++i147){
            const code = url.charCodeAt(i147);
            const isWs = code === 32 || code === 9 || code === 13 || code === 10 || code === 12 || code === 160 || code === 65279;
            if (start === -1) {
                if (isWs) continue;
                lastPos = start = i147;
            } else if (inWs) {
                if (!isWs) {
                    end = -1;
                    inWs = false;
                }
            } else if (isWs) {
                end = i147;
                inWs = true;
            }
            if (!split) {
                switch(code){
                    case 35:
                        hasHash = true;
                    case 63:
                        split = true;
                        break;
                    case 92:
                        if (i147 - lastPos > 0) rest += url.slice(lastPos, i147);
                        rest += "/";
                        lastPos = i147 + 1;
                        break;
                }
            } else if (!hasHash && code === 35) {
                hasHash = true;
            }
        }
        if (start !== -1) {
            if (lastPos === start) {
                if (end === -1) {
                    if (start === 0) rest = url;
                    else rest = url.slice(start);
                } else {
                    rest = url.slice(start, end);
                }
            } else if (end === -1 && lastPos < url.length) {
                rest += url.slice(lastPos);
            } else if (end !== -1 && lastPos < end) {
                rest += url.slice(lastPos, end);
            }
        }
        if (!slashesDenoteHost && !hasHash) {
            const simplePath = simplePathPattern.exec(rest);
            if (simplePath) {
                this.path = rest;
                this.href = rest;
                this.pathname = simplePath[1];
                if (simplePath[2]) {
                    this.search = simplePath[2];
                    if (parseQueryString) {
                        this.query = __default8.parse(this.search.slice(1));
                    } else {
                        this.query = this.search.slice(1);
                    }
                } else if (parseQueryString) {
                    this.search = null;
                    this.query = Object.create(null);
                }
                return this;
            }
        }
        let proto = protocolPattern.exec(rest);
        let lowerProto = "";
        if (proto) {
            proto = proto[0];
            lowerProto = proto.toLowerCase();
            this.protocol = lowerProto;
            rest = rest.slice(proto.length);
        }
        let slashes;
        if (slashesDenoteHost || proto || hostPattern.test(rest)) {
            slashes = rest.charCodeAt(0) === CHAR_FORWARD_SLASH && rest.charCodeAt(1) === CHAR_FORWARD_SLASH;
            if (slashes && !(proto && hostlessProtocol.has(lowerProto))) {
                rest = rest.slice(2);
                this.slashes = true;
            }
        }
        if (!hostlessProtocol.has(lowerProto) && (slashes || proto && !slashedProtocol.has(proto))) {
            let hostEnd = -1;
            let atSign = -1;
            let nonHost = -1;
            for(let i148 = 0; i148 < rest.length; ++i148){
                switch(rest.charCodeAt(i148)){
                    case 9:
                    case 10:
                    case 13:
                    case 32:
                    case 34:
                    case 37:
                    case 39:
                    case 59:
                    case 60:
                    case 62:
                    case 92:
                    case 94:
                    case 96:
                    case 123:
                    case 124:
                    case 125:
                        if (nonHost === -1) nonHost = i148;
                        break;
                    case 35:
                    case 47:
                    case 63:
                        if (nonHost === -1) nonHost = i148;
                        hostEnd = i148;
                        break;
                    case 64:
                        atSign = i148;
                        nonHost = -1;
                        break;
                }
                if (hostEnd !== -1) break;
            }
            start = 0;
            if (atSign !== -1) {
                this.auth = decodeURIComponent(rest.slice(0, atSign));
                start = atSign + 1;
            }
            if (nonHost === -1) {
                this.host = rest.slice(start);
                rest = "";
            } else {
                this.host = rest.slice(start, nonHost);
                rest = rest.slice(nonHost);
            }
            this.#parseHost();
            if (typeof this.hostname !== "string") this.hostname = "";
            const hostname = this.hostname;
            const ipv6Hostname = isIpv6Hostname(hostname);
            if (!ipv6Hostname) {
                rest = getHostname(this, rest, hostname);
            }
            if (this.hostname.length > 255) {
                this.hostname = "";
            } else {
                this.hostname = this.hostname.toLowerCase();
            }
            if (this.hostname !== "") {
                if (ipv6Hostname) {
                    if (forbiddenHostCharsIpv6.test(this.hostname)) {
                        throw new ERR_INVALID_URL(url);
                    }
                } else {
                    this.hostname = toASCII(this.hostname);
                    if (this.hostname === "" || forbiddenHostChars.test(this.hostname)) {
                        throw new ERR_INVALID_URL(url);
                    }
                }
            }
            const p = this.port ? ":" + this.port : "";
            const h = this.hostname || "";
            this.host = h + p;
            if (ipv6Hostname) {
                this.hostname = this.hostname.slice(1, -1);
                if (rest[0] !== "/") {
                    rest = "/" + rest;
                }
            }
        }
        if (!unsafeProtocol.has(lowerProto)) {
            rest = autoEscapeStr(rest);
        }
        let questionIdx = -1;
        let hashIdx = -1;
        for(let i149 = 0; i149 < rest.length; ++i149){
            const code = rest.charCodeAt(i149);
            if (code === 35) {
                this.hash = rest.slice(i149);
                hashIdx = i149;
                break;
            } else if (code === 63 && questionIdx === -1) {
                questionIdx = i149;
            }
        }
        if (questionIdx !== -1) {
            if (hashIdx === -1) {
                this.search = rest.slice(questionIdx);
                this.query = rest.slice(questionIdx + 1);
            } else {
                this.search = rest.slice(questionIdx, hashIdx);
                this.query = rest.slice(questionIdx + 1, hashIdx);
            }
            if (parseQueryString) {
                this.query = __default8.parse(this.query);
            }
        } else if (parseQueryString) {
            this.search = null;
            this.query = Object.create(null);
        }
        const useQuestionIdx = questionIdx !== -1 && (hashIdx === -1 || questionIdx < hashIdx);
        const firstIdx = useQuestionIdx ? questionIdx : hashIdx;
        if (firstIdx === -1) {
            if (rest.length > 0) this.pathname = rest;
        } else if (firstIdx > 0) {
            this.pathname = rest.slice(0, firstIdx);
        }
        if (slashedProtocol.has(lowerProto) && this.hostname && !this.pathname) {
            this.pathname = "/";
        }
        if (this.pathname || this.search) {
            const p = this.pathname || "";
            const s = this.search || "";
            this.path = p + s;
        }
        this.href = this.format();
        return this;
    }
}
function isIpv6Hostname(hostname) {
    return hostname.charCodeAt(0) === 91 && hostname.charCodeAt(hostname.length - 1) === 93;
}
function getHostname(self, rest, hostname) {
    for(let i150 = 0; i150 < hostname.length; ++i150){
        const code = hostname.charCodeAt(i150);
        const isValid = code >= 97 && code <= 122 || code === 46 || code >= 65 && code <= 90 || code >= 48 && code <= 57 || code === 45 || code === 43 || code === 95 || code > 127;
        if (!isValid) {
            self.hostname = hostname.slice(0, i150);
            return `/${hostname.slice(i150)}${rest}`;
        }
    }
    return rest;
}
const escapedCodes = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "%09",
    "%0A",
    "",
    "",
    "%0D",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "%20",
    "",
    "%22",
    "",
    "",
    "",
    "",
    "%27",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "%3C",
    "",
    "%3E",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "%5C",
    "",
    "%5E",
    "",
    "%60",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "%7B",
    "%7C",
    "%7D"
];
function autoEscapeStr(rest) {
    let escaped = "";
    let lastEscapedPos = 0;
    for(let i151 = 0; i151 < rest.length; ++i151){
        const escapedChar = escapedCodes[rest.charCodeAt(i151)];
        if (escapedChar) {
            if (i151 > lastEscapedPos) {
                escaped += rest.slice(lastEscapedPos, i151);
            }
            escaped += escapedChar;
            lastEscapedPos = i151 + 1;
        }
    }
    if (lastEscapedPos === 0) {
        return rest;
    }
    if (lastEscapedPos < rest.length) {
        escaped += rest.slice(lastEscapedPos);
    }
    return escaped;
}
function parse8(url, parseQueryString, slashesDenoteHost) {
    if (url instanceof Url) return url;
    const urlObject = new Url();
    urlObject.urlParse(url, parseQueryString, slashesDenoteHost);
    return urlObject;
}
function fileURLToPath(path111) {
    if (typeof path111 === "string") path111 = new URL(path111);
    else if (!(path111 instanceof URL)) {
        throw new ERR_INVALID_ARG_TYPE("path", [
            "string",
            "URL"
        ], path111);
    }
    if (path111.protocol !== "file:") {
        throw new ERR_INVALID_URL_SCHEME("file");
    }
    return isWindows ? getPathFromURLWin(path111) : getPathFromURLPosix(path111);
}
function getPathFromURLWin(url) {
    const hostname = url.hostname;
    let pathname = url.pathname;
    for(let n = 0; n < pathname.length; n++){
        if (pathname[n] === "%") {
            const third = pathname.codePointAt(n + 2) | 0x20;
            if (pathname[n + 1] === "2" && third === 102 || pathname[n + 1] === "5" && third === 99) {
                throw new ERR_INVALID_FILE_URL_PATH("must not include encoded \\ or / characters");
            }
        }
    }
    pathname = pathname.replace(forwardSlashRegEx, "\\");
    pathname = decodeURIComponent(pathname);
    if (hostname !== "") {
        return `\\\\${hostname}${pathname}`;
    } else {
        const letter = pathname.codePointAt(1) | 0x20;
        const sep12 = pathname[2];
        if (letter < 97 || letter > 122 || sep12 !== ":") {
            throw new ERR_INVALID_FILE_URL_PATH("must be absolute");
        }
        return pathname.slice(1);
    }
}
function getPathFromURLPosix(url) {
    if (url.hostname !== "") {
        throw new ERR_INVALID_FILE_URL_HOST(osType);
    }
    const pathname = url.pathname;
    for(let n = 0; n < pathname.length; n++){
        if (pathname[n] === "%") {
            const third = pathname.codePointAt(n + 2) | 0x20;
            if (pathname[n + 1] === "2" && third === 102) {
                throw new ERR_INVALID_FILE_URL_PATH("must not include encoded / characters");
            }
        }
    }
    return decodeURIComponent(pathname);
}
Symbol("query");
function toPathIfFileURL(fileURLOrPath) {
    if (!(fileURLOrPath instanceof URL)) {
        return fileURLOrPath;
    }
    return fileURLToPath(fileURLOrPath);
}
function assert1(value, message) {
    if (!value) {
        throw new ERR_INTERNAL_ASSERTION(message);
    }
}
function fail(message) {
    throw new ERR_INTERNAL_ASSERTION(message);
}
assert1.fail = fail;
function convertFileInfoToStats(origin) {
    return {
        dev: origin.dev,
        ino: origin.ino,
        mode: origin.mode,
        nlink: origin.nlink,
        uid: origin.uid,
        gid: origin.gid,
        rdev: origin.rdev,
        size: origin.size,
        blksize: origin.blksize,
        blocks: origin.blocks,
        mtime: origin.mtime,
        atime: origin.atime,
        birthtime: origin.birthtime,
        mtimeMs: origin.mtime?.getTime() || null,
        atimeMs: origin.atime?.getTime() || null,
        birthtimeMs: origin.birthtime?.getTime() || null,
        isFile: ()=>origin.isFile
        ,
        isDirectory: ()=>origin.isDirectory
        ,
        isSymbolicLink: ()=>origin.isSymlink
        ,
        isBlockDevice: ()=>false
        ,
        isFIFO: ()=>false
        ,
        isCharacterDevice: ()=>false
        ,
        isSocket: ()=>false
        ,
        ctime: origin.mtime,
        ctimeMs: origin.mtime?.getTime() || null
    };
}
function toBigInt(number) {
    if (number === null || number === undefined) return null;
    return BigInt(number);
}
function convertFileInfoToBigIntStats(origin) {
    return {
        dev: toBigInt(origin.dev),
        ino: toBigInt(origin.ino),
        mode: toBigInt(origin.mode),
        nlink: toBigInt(origin.nlink),
        uid: toBigInt(origin.uid),
        gid: toBigInt(origin.gid),
        rdev: toBigInt(origin.rdev),
        size: toBigInt(origin.size) || 0n,
        blksize: toBigInt(origin.blksize),
        blocks: toBigInt(origin.blocks),
        mtime: origin.mtime,
        atime: origin.atime,
        birthtime: origin.birthtime,
        mtimeMs: origin.mtime ? BigInt(origin.mtime.getTime()) : null,
        atimeMs: origin.atime ? BigInt(origin.atime.getTime()) : null,
        birthtimeMs: origin.birthtime ? BigInt(origin.birthtime.getTime()) : null,
        mtimeNs: origin.mtime ? BigInt(origin.mtime.getTime()) * 1000000n : null,
        atimeNs: origin.atime ? BigInt(origin.atime.getTime()) * 1000000n : null,
        birthtimeNs: origin.birthtime ? BigInt(origin.birthtime.getTime()) * 1000000n : null,
        isFile: ()=>origin.isFile
        ,
        isDirectory: ()=>origin.isDirectory
        ,
        isSymbolicLink: ()=>origin.isSymlink
        ,
        isBlockDevice: ()=>false
        ,
        isFIFO: ()=>false
        ,
        isCharacterDevice: ()=>false
        ,
        isSocket: ()=>false
        ,
        ctime: origin.mtime,
        ctimeMs: origin.mtime ? BigInt(origin.mtime.getTime()) : null,
        ctimeNs: origin.mtime ? BigInt(origin.mtime.getTime()) * 1000000n : null
    };
}
function CFISBIS(fileInfo, bigInt) {
    if (bigInt) return convertFileInfoToBigIntStats(fileInfo);
    return convertFileInfoToStats(fileInfo);
}
function stat(path55, optionsOrCallback, maybeCallback1) {
    const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback1;
    const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {
        bigint: false
    };
    if (!callback) throw new Error("No callback function supplied");
    Deno.stat(path55).then((stat1)=>callback(null, CFISBIS(stat1, options.bigint))
    , (err)=>callback(denoErrorToNodeError(err, {
            syscall: "stat"
        }))
    );
}
const statPromise = promisify(stat);
function statSync(path56, options = {
    bigint: false,
    throwIfNoEntry: true
}) {
    try {
        const origin = Deno.statSync(path56);
        return CFISBIS(origin, options.bigint);
    } catch (err) {
        if (options?.throwIfNoEntry === false && err instanceof Deno.errors.NotFound) {
            return;
        }
        if (err instanceof Error) {
            throw denoErrorToNodeError(err, {
                syscall: "stat"
            });
        } else {
            throw err;
        }
    }
}
function lstat(path57, optionsOrCallback, maybeCallback2) {
    const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback2;
    const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {
        bigint: false
    };
    if (!callback) throw new Error("No callback function supplied");
    Deno.lstat(path57).then((stat2)=>callback(null, CFISBIS(stat2, options.bigint))
    , (err)=>callback(err)
    );
}
const lstatPromise = promisify(lstat);
function lstatSync(path58, options) {
    const origin = Deno.lstatSync(path58);
    return CFISBIS(origin, options?.bigint || false);
}
"use strict";
const kType = Symbol("type");
const kStats = Symbol("stats");
const { F_OK: F_OK1 = 0 , W_OK: W_OK1 = 0 , R_OK: R_OK1 = 0 , X_OK: X_OK1 = 0 , COPYFILE_EXCL: COPYFILE_EXCL1 , COPYFILE_FICLONE: COPYFILE_FICLONE1 , COPYFILE_FICLONE_FORCE: COPYFILE_FICLONE_FORCE1 , O_APPEND: O_APPEND1 , O_CREAT: O_CREAT1 , O_EXCL: O_EXCL1 , O_RDONLY: O_RDONLY1 , O_RDWR: O_RDWR1 , O_SYNC: O_SYNC1 , O_TRUNC: O_TRUNC1 , O_WRONLY: O_WRONLY1 , S_IFBLK , S_IFCHR , S_IFDIR , S_IFIFO , S_IFLNK , S_IFMT , S_IFREG , S_IFSOCK , UV_FS_SYMLINK_DIR , UV_FS_SYMLINK_JUNCTION , UV_DIRENT_UNKNOWN , UV_DIRENT_FILE , UV_DIRENT_DIR , UV_DIRENT_LINK , UV_DIRENT_FIFO , UV_DIRENT_SOCKET , UV_DIRENT_CHAR , UV_DIRENT_BLOCK ,  } = fs;
const { errno: { EISDIR ,  } ,  } = os;
const kMinimumAccessMode = Math.min(F_OK1, W_OK1, R_OK1, X_OK1);
const kMaximumAccessMode = F_OK1 | W_OK1 | R_OK1 | X_OK1;
const kDefaultCopyMode = 0;
const kMinimumCopyMode = Math.min(0, COPYFILE_EXCL1, COPYFILE_FICLONE1, COPYFILE_FICLONE_FORCE1);
const kMaximumCopyMode = COPYFILE_EXCL1 | COPYFILE_FICLONE1 | COPYFILE_FICLONE_FORCE1;
const kMaxUserId = 2 ** 32 - 1;
function assertEncoding(encoding) {
    if (encoding && !Buffer.isEncoding(encoding)) {
        const reason = "is invalid encoding";
        throw new ERR_INVALID_ARG_VALUE(encoding, "encoding", reason);
    }
}
class Dirent {
    constructor(name1, type){
        this.name = name1;
        this[kType] = type;
    }
    isDirectory() {
        return this[kType] === UV_DIRENT_DIR;
    }
    isFile() {
        return this[kType] === UV_DIRENT_FILE;
    }
    isBlockDevice() {
        return this[kType] === UV_DIRENT_BLOCK;
    }
    isCharacterDevice() {
        return this[kType] === UV_DIRENT_CHAR;
    }
    isSymbolicLink() {
        return this[kType] === UV_DIRENT_LINK;
    }
    isFIFO() {
        return this[kType] === UV_DIRENT_FIFO;
    }
    isSocket() {
        return this[kType] === UV_DIRENT_SOCKET;
    }
}
class DirentFromStats extends Dirent {
    constructor(name2, stats){
        super(name2, null);
        this[kStats] = stats;
    }
}
for (const name of Reflect.ownKeys(Dirent.prototype)){
    if (name === "constructor") {
        continue;
    }
    DirentFromStats.prototype[name] = function() {
        return this[kStats][name]();
    };
}
function copyObject(source) {
    const target = {};
    for(const key in source){
        target[key] = source[key];
    }
    return target;
}
Buffer.from(__default7.sep);
function getOptions1(options, defaultOptions) {
    if (options === null || options === undefined || typeof options === "function") {
        return defaultOptions;
    }
    if (typeof options === "string") {
        defaultOptions = {
            ...defaultOptions
        };
        defaultOptions.encoding = options;
        options = defaultOptions;
    } else if (typeof options !== "object") {
        throw new ERR_INVALID_ARG_TYPE("options", [
            "string",
            "Object"
        ], options);
    }
    if (options.encoding !== "buffer") {
        assertEncoding(options.encoding);
    }
    if (options.signal !== undefined) {
        validateAbortSignal(options.signal, "options.signal");
    }
    return options;
}
const nullCheck = hideStackFrames((path59, propName, throwError = true)=>{
    const pathIsString = typeof path59 === "string";
    const pathIsUint8Array = isUint8Array(path59);
    if (!pathIsString && !pathIsUint8Array || pathIsString && !path59.includes("\u0000") || pathIsUint8Array && !path59.includes(0)) {
        return;
    }
    const err = new ERR_INVALID_ARG_VALUE(propName, path59, "must be a string or Uint8Array without null bytes");
    if (throwError) {
        throw err;
    }
    return err;
});
function StatsBase(dev, mode, nlink, uid, gid, rdev, blksize, ino, size, blocks) {
    this.dev = dev;
    this.mode = mode;
    this.nlink = nlink;
    this.uid = uid;
    this.gid = gid;
    this.rdev = rdev;
    this.blksize = blksize;
    this.ino = ino;
    this.size = size;
    this.blocks = blocks;
}
StatsBase.prototype.isDirectory = function() {
    return this._checkModeProperty(S_IFDIR);
};
StatsBase.prototype.isFile = function() {
    return this._checkModeProperty(S_IFREG);
};
StatsBase.prototype.isBlockDevice = function() {
    return this._checkModeProperty(S_IFBLK);
};
StatsBase.prototype.isCharacterDevice = function() {
    return this._checkModeProperty(S_IFCHR);
};
StatsBase.prototype.isSymbolicLink = function() {
    return this._checkModeProperty(S_IFLNK);
};
StatsBase.prototype.isFIFO = function() {
    return this._checkModeProperty(S_IFIFO);
};
StatsBase.prototype.isSocket = function() {
    return this._checkModeProperty(S_IFSOCK);
};
const kNsPerMsBigInt = 10n ** 6n;
function dateFromMs(ms) {
    return new Date(Number(ms) + 0.5);
}
function BigIntStats(dev, mode, nlink, uid, gid, rdev, blksize, ino, size, blocks, atimeNs, mtimeNs, ctimeNs, birthtimeNs) {
    Reflect.apply(StatsBase, this, [
        dev,
        mode,
        nlink,
        uid,
        gid,
        rdev,
        blksize,
        ino,
        size,
        blocks, 
    ]);
    this.atimeMs = atimeNs / kNsPerMsBigInt;
    this.mtimeMs = mtimeNs / kNsPerMsBigInt;
    this.ctimeMs = ctimeNs / kNsPerMsBigInt;
    this.birthtimeMs = birthtimeNs / kNsPerMsBigInt;
    this.atimeNs = atimeNs;
    this.mtimeNs = mtimeNs;
    this.ctimeNs = ctimeNs;
    this.birthtimeNs = birthtimeNs;
    this.atime = dateFromMs(this.atimeMs);
    this.mtime = dateFromMs(this.mtimeMs);
    this.ctime = dateFromMs(this.ctimeMs);
    this.birthtime = dateFromMs(this.birthtimeMs);
}
Object.setPrototypeOf(BigIntStats.prototype, StatsBase.prototype);
Object.setPrototypeOf(BigIntStats, StatsBase);
BigIntStats.prototype._checkModeProperty = function(property) {
    if (isWindows && (property === S_IFIFO || property === S_IFBLK || property === S_IFSOCK)) {
        return false;
    }
    return (this.mode & BigInt(S_IFMT)) === BigInt(property);
};
function Stats(dev, mode, nlink, uid, gid, rdev, blksize, ino, size, blocks, atimeMs, mtimeMs, ctimeMs, birthtimeMs) {
    StatsBase.call(this, dev, mode, nlink, uid, gid, rdev, blksize, ino, size, blocks);
    this.atimeMs = atimeMs;
    this.mtimeMs = mtimeMs;
    this.ctimeMs = ctimeMs;
    this.birthtimeMs = birthtimeMs;
    this.atime = dateFromMs(atimeMs);
    this.mtime = dateFromMs(mtimeMs);
    this.ctime = dateFromMs(ctimeMs);
    this.birthtime = dateFromMs(birthtimeMs);
}
Object.setPrototypeOf(Stats.prototype, StatsBase.prototype);
Object.setPrototypeOf(Stats, StatsBase);
Stats.prototype.isFile = StatsBase.prototype.isFile;
Stats.prototype._checkModeProperty = function(property) {
    if (isWindows && (property === S_IFIFO || property === S_IFBLK || property === S_IFSOCK)) {
        return false;
    }
    return (this.mode & S_IFMT) === property;
};
hideStackFrames((type)=>{
    let flags = 0;
    if (typeof type === "string") {
        switch(type){
            case "dir":
                flags |= UV_FS_SYMLINK_DIR;
                break;
            case "junction":
                flags |= UV_FS_SYMLINK_JUNCTION;
                break;
            case "file":
                break;
            default:
                throw new ERR_FS_INVALID_SYMLINK_TYPE(type);
        }
    }
    return flags;
});
const validateOffsetLengthRead = hideStackFrames((offset, length, bufferLength)=>{
    if (offset < 0) {
        throw new ERR_OUT_OF_RANGE("offset", ">= 0", offset);
    }
    if (length < 0) {
        throw new ERR_OUT_OF_RANGE("length", ">= 0", length);
    }
    if (offset + length > bufferLength) {
        throw new ERR_OUT_OF_RANGE("length", `<= ${bufferLength - offset}`, length);
    }
});
const validateOffsetLengthWrite = hideStackFrames((offset, length, byteLength11)=>{
    if (offset > byteLength11) {
        throw new ERR_OUT_OF_RANGE("offset", `<= ${byteLength11}`, offset);
    }
    if (length > byteLength11 - offset) {
        throw new ERR_OUT_OF_RANGE("length", `<= ${byteLength11 - offset}`, length);
    }
    if (length < 0) {
        throw new ERR_OUT_OF_RANGE("length", ">= 0", length);
    }
    validateInt32(length, "length", 0);
});
const validatePath = hideStackFrames((path60, propName = "path")=>{
    if (typeof path60 !== "string" && !isUint8Array(path60)) {
        throw new ERR_INVALID_ARG_TYPE(propName, [
            "string",
            "Buffer",
            "URL"
        ], path60);
    }
    const err = nullCheck(path60, propName, false);
    if (err !== undefined) {
        throw err;
    }
});
const getValidatedPath = hideStackFrames((fileURLOrPath, propName = "path")=>{
    const path61 = toPathIfFileURL(fileURLOrPath);
    validatePath(path61, propName);
    return path61;
});
const getValidatedFd = hideStackFrames((fd, propName = "fd")=>{
    if (Object.is(fd, -0)) {
        return 0;
    }
    validateInt32(fd, propName, 0);
    return fd;
});
const validateBufferArray = hideStackFrames((buffers, propName = "buffers")=>{
    if (!Array.isArray(buffers)) {
        throw new ERR_INVALID_ARG_TYPE(propName, "ArrayBufferView[]", buffers);
    }
    for(let i152 = 0; i152 < buffers.length; i152++){
        if (!isArrayBufferView(buffers[i152])) {
            throw new ERR_INVALID_ARG_TYPE(propName, "ArrayBufferView[]", buffers);
        }
    }
    return buffers;
});
const defaultCpOptions = {
    dereference: false,
    errorOnExist: false,
    filter: undefined,
    force: true,
    preserveTimestamps: false,
    recursive: false
};
const defaultRmOptions = {
    recursive: false,
    force: false,
    retryDelay: 100,
    maxRetries: 0
};
const defaultRmdirOptions = {
    retryDelay: 100,
    maxRetries: 0,
    recursive: false
};
hideStackFrames((options)=>{
    if (options === undefined) {
        return {
            ...defaultCpOptions
        };
    }
    validateObject(options, "options");
    options = {
        ...defaultCpOptions,
        ...options
    };
    validateBoolean(options.dereference, "options.dereference");
    validateBoolean(options.errorOnExist, "options.errorOnExist");
    validateBoolean(options.force, "options.force");
    validateBoolean(options.preserveTimestamps, "options.preserveTimestamps");
    validateBoolean(options.recursive, "options.recursive");
    if (options.filter !== undefined) {
        validateFunction(options.filter, "options.filter");
    }
    return options;
});
const validateRmOptions = hideStackFrames((path62, options, expectDir, cb)=>{
    options = validateRmdirOptions(options, defaultRmOptions);
    validateBoolean(options.force, "options.force");
    stat(path62, (err, stats)=>{
        if (err) {
            if (options.force && err.code === "ENOENT") {
                return cb(null, options);
            }
            return cb(err, options);
        }
        if (expectDir && !stats.isDirectory()) {
            return cb(false);
        }
        if (stats.isDirectory() && !options.recursive) {
            return cb(new ERR_FS_EISDIR({
                code: "EISDIR",
                message: "is a directory",
                path: path62,
                syscall: "rm",
                errno: EISDIR
            }));
        }
        return cb(null, options);
    });
});
const validateRmOptionsSync = hideStackFrames((path63, options, expectDir)=>{
    options = validateRmdirOptions(options, defaultRmOptions);
    validateBoolean(options.force, "options.force");
    if (!options.force || expectDir || !options.recursive) {
        const isDirectory = statSync(path63, {
            throwIfNoEntry: !options.force
        })?.isDirectory();
        if (expectDir && !isDirectory) {
            return false;
        }
        if (isDirectory && !options.recursive) {
            throw new ERR_FS_EISDIR({
                code: "EISDIR",
                message: "is a directory",
                path: path63,
                syscall: "rm",
                errno: EISDIR
            });
        }
    }
    return options;
});
let recursiveRmdirWarned = process1.noDeprecation;
function emitRecursiveRmdirWarning() {
    if (!recursiveRmdirWarned) {
        process1.emitWarning("In future versions of Node.js, fs.rmdir(path, { recursive: true }) " + "will be removed. Use fs.rm(path, { recursive: true }) instead", "DeprecationWarning", "DEP0147");
        recursiveRmdirWarned = true;
    }
}
const validateRmdirOptions = hideStackFrames((options, defaults = defaultRmdirOptions)=>{
    if (options === undefined) {
        return defaults;
    }
    validateObject(options, "options");
    options = {
        ...defaults,
        ...options
    };
    validateBoolean(options.recursive, "options.recursive");
    validateInt32(options.retryDelay, "options.retryDelay", 0);
    validateUint32(options.maxRetries, "options.maxRetries");
    return options;
});
const getValidMode = hideStackFrames((mode, type)=>{
    let min = kMinimumAccessMode;
    let max = kMaximumAccessMode;
    let def = F_OK1;
    if (type === "copyFile") {
        min = kMinimumCopyMode;
        max = kMaximumCopyMode;
        def = mode || kDefaultCopyMode;
    } else {
        assert1(type === "access");
    }
    if (mode == null) {
        return def;
    }
    if (Number.isInteger(mode) && mode >= min && mode <= max) {
        return mode;
    }
    if (typeof mode !== "number") {
        throw new ERR_INVALID_ARG_TYPE("mode", "integer", mode);
    }
    throw new ERR_OUT_OF_RANGE("mode", `an integer >= ${min} && <= ${max}`, mode);
});
const validateStringAfterArrayBufferView = hideStackFrames((buffer, name8)=>{
    if (typeof buffer === "string") {
        return;
    }
    if (typeof buffer === "object" && buffer !== null && typeof buffer.toString === "function" && Object.prototype.hasOwnProperty.call(buffer, "toString")) {
        return;
    }
    throw new ERR_INVALID_ARG_TYPE(name8, [
        "string",
        "Buffer",
        "TypedArray",
        "DataView"
    ], buffer);
});
const validatePosition = hideStackFrames((position)=>{
    if (typeof position === "number") {
        validateInteger(position, "position");
    } else if (typeof position === "bigint") {
        if (!(position >= -(2n ** 63n) && position <= 2n ** 63n - 1n)) {
            throw new ERR_OUT_OF_RANGE("position", `>= ${-(2n ** 63n)} && <= ${2n ** 63n - 1n}`, position);
        }
    } else {
        throw new ERR_INVALID_ARG_TYPE("position", [
            "integer",
            "bigint"
        ], position);
    }
});
Symbol("realpathCacheKey");
const showStringCoercionDeprecation = deprecate(()=>{}, "Implicit coercion of objects with own toString property is deprecated.", "DEP0162");
function access(path64, mode, callback) {
    if (typeof mode === "function") {
        callback = mode;
        mode = fs.F_OK;
    }
    path64 = getValidatedPath(path64).toString();
    mode = getValidMode(mode, "access");
    const cb = makeCallback(callback);
    Deno.lstat(path64).then((info)=>{
        if (info.mode === null) {
            cb(null);
            return;
        }
        const m7 = +mode || 0;
        let fileMode = +info.mode || 0;
        if (Deno.build.os !== "windows" && info.uid === Deno.uid()) {
            fileMode >>= 6;
        }
        if ((m7 & fileMode) === m7) {
            cb(null);
        } else {
            const e = new Error(`EACCES: permission denied, access '${path64}'`);
            e.path = path64;
            e.syscall = "access";
            e.errno = codeMap.get("EACCES");
            e.code = "EACCES";
            cb(e);
        }
    }, (err)=>{
        if (err instanceof Deno.errors.NotFound) {
            const e = new Error(`ENOENT: no such file or directory, access '${path64}'`);
            e.path = path64;
            e.syscall = "access";
            e.errno = codeMap.get("ENOENT");
            e.code = "ENOENT";
            cb(e);
        } else {
            cb(err);
        }
    });
}
const accessPromise = promisify(access);
function accessSync(path65, mode) {
    path65 = getValidatedPath(path65).toString();
    mode = getValidMode(mode, "access");
    try {
        const info = Deno.lstatSync(path65.toString());
        if (info.mode === null) {
            return;
        }
        const m8 = +mode || 0;
        let fileMode = +info.mode || 0;
        if (Deno.build.os !== "windows" && info.uid === Deno.uid()) {
            fileMode >>= 6;
        }
        if ((m8 & fileMode) === m8) {} else {
            const e = new Error(`EACCES: permission denied, access '${path65}'`);
            e.path = path65;
            e.syscall = "access";
            e.errno = codeMap.get("EACCES");
            e.code = "EACCES";
            throw e;
        }
    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            const e = new Error(`ENOENT: no such file or directory, access '${path65}'`);
            e.path = path65;
            e.syscall = "access";
            e.errno = codeMap.get("ENOENT");
            e.code = "ENOENT";
            throw e;
        } else {
            throw err;
        }
    }
}
function writeFile(pathOrRid, data1, optOrCallback, callback) {
    const callbackFn = optOrCallback instanceof Function ? optOrCallback : callback;
    const options = optOrCallback instanceof Function ? undefined : optOrCallback;
    if (!callbackFn) {
        throw new TypeError("Callback must be a function.");
    }
    pathOrRid = pathOrRid instanceof URL ? fromFileUrl5(pathOrRid) : pathOrRid;
    const flag = isFileOptions(options) ? options.flag : undefined;
    const mode = isFileOptions(options) ? options.mode : undefined;
    const encoding = checkEncoding(getEncoding(options)) || "utf8";
    const openOptions = getOpenOptions(flag || "w");
    if (!ArrayBuffer.isView(data1)) {
        validateStringAfterArrayBufferView(data1, "data");
        if (typeof data1 !== "string") {
            showStringCoercionDeprecation();
        }
        data1 = Buffer.from(String(data1), encoding);
    }
    const isRid = typeof pathOrRid === "number";
    let file;
    let error24 = null;
    (async ()=>{
        try {
            file = isRid ? new Deno.FsFile(pathOrRid) : await Deno.open(pathOrRid, openOptions);
            if (!isRid && mode && !isWindows) {
                await Deno.chmod(pathOrRid, mode);
            }
            const signal = isFileOptions(options) ? options.signal : undefined;
            await writeAll1(file, data1, {
                signal
            });
        } catch (e) {
            error24 = e instanceof Error ? denoErrorToNodeError(e, {
                syscall: "write"
            }) : new Error("[non-error thrown]");
        } finally{
            if (!isRid && file) file.close();
            callbackFn(error24);
        }
    })();
}
const writeFilePromise = promisify(writeFile);
function writeFileSync(pathOrRid, data2, options) {
    pathOrRid = pathOrRid instanceof URL ? fromFileUrl5(pathOrRid) : pathOrRid;
    const flag = isFileOptions(options) ? options.flag : undefined;
    const mode = isFileOptions(options) ? options.mode : undefined;
    const encoding = checkEncoding(getEncoding(options)) || "utf8";
    const openOptions = getOpenOptions(flag || "w");
    if (!ArrayBuffer.isView(data2)) {
        validateStringAfterArrayBufferView(data2, "data");
        if (typeof data2 !== "string") {
            showStringCoercionDeprecation();
        }
        data2 = Buffer.from(String(data2), encoding);
    }
    const isRid = typeof pathOrRid === "number";
    let file;
    let error25 = null;
    try {
        file = isRid ? new Deno.FsFile(pathOrRid) : Deno.openSync(pathOrRid, openOptions);
        if (!isRid && mode && !isWindows) {
            Deno.chmodSync(pathOrRid, mode);
        }
        writeAllSync(file, data2);
    } catch (e) {
        error25 = e instanceof Error ? denoErrorToNodeError(e, {
            syscall: "write"
        }) : new Error("[non-error thrown]");
    } finally{
        if (!isRid && file) file.close();
    }
    if (error25) throw error25;
}
async function writeAll1(w, arr, options = {}) {
    const { offset =0 , length =arr.byteLength , signal  } = options;
    checkAborted(signal);
    const written = await w.write(arr.subarray(offset, offset + length));
    if (written === length) {
        return;
    }
    await writeAll1(w, arr, {
        offset: offset + written,
        length: length - written,
        signal
    });
}
function checkAborted(signal) {
    if (signal?.aborted) {
        throw new AbortError();
    }
}
function appendFile(path66, data3, options, callback) {
    callback = maybeCallback(callback || options);
    options = getOptions1(options, {
        encoding: "utf8",
        mode: 0o666,
        flag: "a"
    });
    options = copyObject(options);
    if (!options.flag || isUint32(path66)) {
        options.flag = "a";
    }
    writeFile(path66, data3, options, callback);
}
const appendFilePromise = promisify(appendFile);
function appendFileSync(path67, data4, options) {
    options = getOptions1(options, {
        encoding: "utf8",
        mode: 0o666,
        flag: "a"
    });
    options = copyObject(options);
    if (!options.flag || isUint32(path67)) {
        options.flag = "a";
    }
    writeFileSync(path67, data4, options);
}
function chmod(path68, mode, callback) {
    path68 = getValidatedPath(path68).toString();
    mode = parseFileMode(mode, "mode");
    Deno.chmod(toNamespacedPath2(path68), mode).catch((error26)=>{
        if (!(error26 instanceof Deno.errors.NotSupported)) {
            throw error26;
        }
    }).then(()=>callback(null)
    , callback);
}
const chmodPromise = promisify(chmod);
function chmodSync(path69, mode) {
    path69 = getValidatedPath(path69).toString();
    mode = parseFileMode(mode, "mode");
    try {
        Deno.chmodSync(toNamespacedPath2(path69), mode);
    } catch (error27) {
        if (!(error27 instanceof Deno.errors.NotSupported)) {
            throw error27;
        }
    }
}
function chown(path70, uid, gid, callback) {
    callback = makeCallback(callback);
    path70 = getValidatedPath(path70).toString();
    validateInteger(uid, "uid", -1, kMaxUserId);
    validateInteger(gid, "gid", -1, kMaxUserId);
    Deno.chown(toNamespacedPath2(path70), uid, gid).then(()=>callback(null)
    , callback);
}
const chownPromise = promisify(chown);
function chownSync(path71, uid, gid) {
    path71 = getValidatedPath(path71).toString();
    validateInteger(uid, "uid", -1, kMaxUserId);
    validateInteger(gid, "gid", -1, kMaxUserId);
    Deno.chownSync(toNamespacedPath2(path71), uid, gid);
}
function close(fd, callback) {
    fd = getValidatedFd(fd);
    setTimeout(()=>{
        let error28 = null;
        try {
            Deno.close(fd);
        } catch (err) {
            error28 = err instanceof Error ? err : new Error("[non-error thrown]");
        }
        callback(error28);
    }, 0);
}
function closeSync(fd) {
    fd = getValidatedFd(fd);
    Deno.close(fd);
}
function copyFile(src, dest, mode, callback) {
    if (typeof mode === "function") {
        callback = mode;
        mode = 0;
    }
    const srcStr = getValidatedPath(src, "src").toString();
    const destStr = getValidatedPath(dest, "dest").toString();
    const modeNum = getValidMode(mode, "copyFile");
    const cb = makeCallback(callback);
    if ((modeNum & fs.COPYFILE_EXCL) === fs.COPYFILE_EXCL) {
        Deno.lstat(destStr).then(()=>{
            const e = new Error(`EEXIST: file already exists, copyfile '${srcStr}' -> '${destStr}'`);
            e.syscall = "copyfile";
            e.errno = codeMap.get("EEXIST");
            e.code = "EEXIST";
            cb(e);
        }, (e)=>{
            if (e instanceof Deno.errors.NotFound) {
                Deno.copyFile(srcStr, destStr).then(()=>cb(null)
                , cb);
            }
            cb(e);
        });
    } else {
        Deno.copyFile(srcStr, destStr).then(()=>cb(null)
        , cb);
    }
}
const copyFilePromise = promisify(copyFile);
function copyFileSync(src, dest, mode) {
    const srcStr = getValidatedPath(src, "src").toString();
    const destStr = getValidatedPath(dest, "dest").toString();
    const modeNum = getValidMode(mode, "copyFile");
    if ((modeNum & fs.COPYFILE_EXCL) === fs.COPYFILE_EXCL) {
        try {
            Deno.lstatSync(destStr);
            throw new Error(`A file exists at the destination: ${destStr}`);
        } catch (e) {
            if (e instanceof Deno.errors.NotFound) {
                Deno.copyFileSync(srcStr, destStr);
            }
            throw e;
        }
    } else {
        Deno.copyFileSync(srcStr, destStr);
    }
}
class Dirent1 {
    constructor(entry){
        this.entry = entry;
    }
    isBlockDevice() {
        notImplemented("Deno does not yet support identification of block devices");
        return false;
    }
    isCharacterDevice() {
        notImplemented("Deno does not yet support identification of character devices");
        return false;
    }
    isDirectory() {
        return this.entry.isDirectory;
    }
    isFIFO() {
        notImplemented("Deno does not yet support identification of FIFO named pipes");
        return false;
    }
    isFile() {
        return this.entry.isFile;
    }
    isSocket() {
        notImplemented("Deno does not yet support identification of sockets");
        return false;
    }
    isSymbolicLink() {
        return this.entry.isSymlink;
    }
    get name() {
        return this.entry.name;
    }
    entry;
}
class Dir {
    #dirPath;
    #syncIterator;
    #asyncIterator;
    constructor(path72){
        if (!path72) {
            throw new ERR_MISSING_ARGS("path");
        }
        this.#dirPath = path72;
    }
    get path() {
        if (this.#dirPath instanceof Uint8Array) {
            return new TextDecoder().decode(this.#dirPath);
        }
        return this.#dirPath;
    }
    read(callback) {
        return new Promise((resolve11, reject)=>{
            if (!this.#asyncIterator) {
                this.#asyncIterator = Deno.readDir(this.path)[Symbol.asyncIterator]();
            }
            assert(this.#asyncIterator);
            this.#asyncIterator.next().then((iteratorResult)=>{
                resolve11(iteratorResult.done ? null : new Dirent1(iteratorResult.value));
                if (callback) {
                    callback(null, iteratorResult.done ? null : new Dirent1(iteratorResult.value));
                }
            }, (err)=>{
                if (callback) {
                    callback(err);
                }
                reject(err);
            });
        });
    }
    readSync() {
        if (!this.#syncIterator) {
            this.#syncIterator = Deno.readDirSync(this.path)[Symbol.iterator]();
        }
        const iteratorResult = this.#syncIterator.next();
        if (iteratorResult.done) {
            return null;
        } else {
            return new Dirent1(iteratorResult.value);
        }
    }
    close(callback) {
        return new Promise((resolve12)=>{
            if (callback) {
                callback(null);
            }
            resolve12();
        });
    }
    closeSync() {}
    async *[Symbol.asyncIterator]() {
        try {
            while(true){
                const dirent = await this.read();
                if (dirent === null) {
                    break;
                }
                yield dirent;
            }
        } finally{
            await this.close();
        }
    }
}
function exists(path73, callback) {
    path73 = path73 instanceof URL ? fromFileUrl5(path73) : path73;
    Deno.lstat(path73).then(()=>callback(true)
    , ()=>callback(false)
    );
}
const kCustomPromisifiedSymbol1 = Symbol.for("nodejs.util.promisify.custom");
Object.defineProperty(exists, kCustomPromisifiedSymbol1, {
    value: (path74)=>{
        return new Promise((resolve13)=>{
            exists(path74, (exists1)=>resolve13(exists1)
            );
        });
    }
});
function existsSync(path75) {
    path75 = path75 instanceof URL ? fromFileUrl5(path75) : path75;
    try {
        Deno.lstatSync(path75);
        return true;
    } catch (_err) {
        return false;
    }
}
function fdatasync(fd, callback) {
    Deno.fdatasync(fd).then(()=>callback(null)
    , callback);
}
function fdatasyncSync(fd) {
    Deno.fdatasyncSync(fd);
}
function fstat(fd, optionsOrCallback, maybeCallback3) {
    const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback3;
    const options = typeof optionsOrCallback === "object" ? optionsOrCallback : {
        bigint: false
    };
    if (!callback) throw new Error("No callback function supplied");
    Deno.fstat(fd).then((stat3)=>callback(null, CFISBIS(stat3, options.bigint))
    , (err)=>callback(err)
    );
}
function fstatSync(fd, options) {
    const origin = Deno.fstatSync(fd);
    return CFISBIS(origin, options?.bigint || false);
}
function fsync(fd, callback) {
    Deno.fsync(fd).then(()=>callback(null)
    , callback);
}
function fsyncSync(fd) {
    Deno.fsyncSync(fd);
}
function ftruncate(fd, lenOrCallback, maybeCallback4) {
    const len = typeof lenOrCallback === "number" ? lenOrCallback : undefined;
    const callback = typeof lenOrCallback === "function" ? lenOrCallback : maybeCallback4;
    if (!callback) throw new Error("No callback function supplied");
    Deno.ftruncate(fd, len).then(()=>callback(null)
    , callback);
}
function ftruncateSync(fd, len) {
    Deno.ftruncateSync(fd, len);
}
function getValidTime(time, name53) {
    if (typeof time === "string") {
        time = Number(time);
    }
    if (typeof time === "number" && (Number.isNaN(time) || !Number.isFinite(time))) {
        throw new Deno.errors.InvalidData(`invalid ${name53}, must not be infinity or NaN`);
    }
    return time;
}
function futimes(fd, atime, mtime, callback) {
    if (!callback) {
        throw new Deno.errors.InvalidData("No callback function supplied");
    }
    atime = getValidTime(atime, "atime");
    mtime = getValidTime(mtime, "mtime");
    Deno.futime(fd, atime, mtime).then(()=>callback(null)
    , callback);
}
function futimesSync(fd, atime, mtime) {
    atime = getValidTime(atime, "atime");
    mtime = getValidTime(mtime, "mtime");
    Deno.futimeSync(fd, atime, mtime);
}
function link(existingPath, newPath, callback) {
    existingPath = existingPath instanceof URL ? fromFileUrl5(existingPath) : existingPath;
    newPath = newPath instanceof URL ? fromFileUrl5(newPath) : newPath;
    Deno.link(existingPath, newPath).then(()=>callback(null)
    , callback);
}
const linkPromise = promisify(link);
function linkSync(existingPath, newPath) {
    existingPath = existingPath instanceof URL ? fromFileUrl5(existingPath) : existingPath;
    newPath = newPath instanceof URL ? fromFileUrl5(newPath) : newPath;
    Deno.linkSync(existingPath, newPath);
}
function mkdir(path76, options, callback) {
    path76 = getValidatedPath(path76);
    let mode = 0o777;
    let recursive = false;
    if (typeof options == "function") {
        callback = options;
    } else if (typeof options === "number") {
        mode = options;
    } else if (typeof options === "boolean") {
        recursive = options;
    } else if (options) {
        if (options.recursive !== undefined) recursive = options.recursive;
        if (options.mode !== undefined) mode = options.mode;
    }
    validateBoolean(recursive, "options.recursive");
    Deno.mkdir(path76, {
        recursive,
        mode
    }).then(()=>{
        if (typeof callback === "function") {
            callback(null);
        }
    }, (err)=>{
        if (typeof callback === "function") {
            callback(err);
        }
    });
}
const mkdirPromise = promisify(mkdir);
function mkdirSync(path77, options) {
    path77 = getValidatedPath(path77);
    let mode = 0o777;
    let recursive = false;
    if (typeof options === "number") {
        mode = options;
    } else if (typeof options === "boolean") {
        recursive = options;
    } else if (options) {
        if (options.recursive !== undefined) recursive = options.recursive;
        if (options.mode !== undefined) mode = options.mode;
    }
    validateBoolean(recursive, "options.recursive");
    try {
        Deno.mkdirSync(path77, {
            recursive,
            mode
        });
    } catch (err) {
        throw denoErrorToNodeError(err, {
            syscall: "mkdir",
            path: path77
        });
    }
}
function mkdtemp(prefix, optionsOrCallback, maybeCallback5) {
    const callback = typeof optionsOrCallback == "function" ? optionsOrCallback : maybeCallback5;
    if (!callback) {
        throw new ERR_INVALID_ARG_TYPE("callback", "function", callback);
    }
    const encoding = parseEncoding(optionsOrCallback);
    const path78 = tempDirPath(prefix);
    mkdir(path78, {
        recursive: false,
        mode: 0o700
    }, (err)=>{
        if (err) callback(err);
        else callback(null, decode3(path78, encoding));
    });
}
const mkdtempPromise = promisify(mkdtemp);
function mkdtempSync(prefix, options) {
    const encoding = parseEncoding(options);
    const path79 = tempDirPath(prefix);
    mkdirSync(path79, {
        recursive: false,
        mode: 0o700
    });
    return decode3(path79, encoding);
}
function parseEncoding(optionsOrCallback) {
    let encoding;
    if (typeof optionsOrCallback == "function") encoding = undefined;
    else if (optionsOrCallback instanceof Object) {
        encoding = optionsOrCallback?.encoding;
    } else encoding = optionsOrCallback;
    if (encoding) {
        try {
            new TextDecoder(encoding);
        } catch  {
            throw new ERR_INVALID_OPT_VALUE_ENCODING(encoding);
        }
    }
    return encoding;
}
function decode3(str, encoding) {
    if (!encoding) return str;
    else {
        const decoder2 = new TextDecoder(encoding);
        const encoder = new TextEncoder();
        return decoder2.decode(encoder.encode(str));
    }
}
const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function randomName() {
    return [
        ...Array(6)
    ].map(()=>CHARS[Math.floor(Math.random() * CHARS.length)]
    ).join("");
}
function tempDirPath(prefix) {
    let path80;
    do {
        path80 = prefix + randomName();
    }while (existsSync(path80))
    return path80;
}
function existsSync1(filePath) {
    try {
        Deno.lstatSync(filePath);
        return true;
    } catch (error29) {
        if (error29 instanceof Deno.errors.NotFound) {
            return false;
        }
        throw error29;
    }
}
const FLAGS_AX = O_APPEND | O_CREAT | O_WRONLY | O_EXCL;
const FLAGS_AX_PLUS = O_APPEND | O_CREAT | O_RDWR | O_EXCL;
const FLAGS_WX = O_TRUNC | O_CREAT | O_WRONLY | O_EXCL;
const FLAGS_WX_PLUS = O_TRUNC | O_CREAT | O_RDWR | O_EXCL;
function convertFlagAndModeToOptions(flag, mode) {
    if (!flag && !mode) return undefined;
    if (!flag && mode) return {
        mode
    };
    return {
        ...getOpenOptions(flag),
        mode
    };
}
function open(path81, flags, mode, callback) {
    if (flags === undefined) {
        throw new ERR_INVALID_ARG_TYPE("flags or callback", [
            "string",
            "function"
        ], flags);
    }
    path81 = getValidatedPath(path81);
    if (arguments.length < 3) {
        callback = flags;
        flags = "r";
        mode = 0o666;
    } else if (typeof mode === "function") {
        callback = mode;
        mode = 0o666;
    } else {
        mode = parseFileMode(mode, "mode", 0o666);
    }
    if (typeof callback !== "function") {
        throw new ERR_INVALID_ARG_TYPE("callback", "function", callback);
    }
    if (flags === undefined) {
        flags = "r";
    }
    if (existenceCheckRequired(flags) && existsSync1(path81)) {
        const err = new Error(`EEXIST: file already exists, open '${path81}'`);
        callback(err);
    } else {
        if (flags === "as" || flags === "as+") {
            let err = null, res;
            try {
                res = openSync(path81, flags, mode);
            } catch (error30) {
                err = error30 instanceof Error ? error30 : new Error("[non-error thrown]");
            }
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
            return;
        }
        Deno.open(path81, convertFlagAndModeToOptions(flags, mode)).then((file)=>callback(null, file.rid)
        , (err)=>callback(err)
        );
    }
}
const openPromise = promisify(open);
function openSync(path82, flags, maybeMode) {
    const mode = parseFileMode(maybeMode, "mode", 0o666);
    path82 = getValidatedPath(path82);
    if (flags === undefined) {
        flags = "r";
    }
    if (existenceCheckRequired(flags) && existsSync1(path82)) {
        throw new Error(`EEXIST: file already exists, open '${path82}'`);
    }
    return Deno.openSync(path82, convertFlagAndModeToOptions(flags, mode)).rid;
}
function existenceCheckRequired(flags) {
    return typeof flags === "string" && [
        "ax",
        "ax+",
        "wx",
        "wx+"
    ].includes(flags) || typeof flags === "number" && ((flags & FLAGS_AX) === FLAGS_AX || (flags & FLAGS_AX_PLUS) === FLAGS_AX_PLUS || (flags & FLAGS_WX) === FLAGS_WX || (flags & FLAGS_WX_PLUS) === FLAGS_WX_PLUS);
}
function _validateFunction(callback) {
    validateFunction(callback, "callback");
}
function opendir(path83, options, callback) {
    callback = typeof options === "function" ? options : callback;
    _validateFunction(callback);
    path83 = getValidatedPath(path83).toString();
    let err, dir;
    try {
        const { bufferSize  } = getOptions1(options, {
            encoding: "utf8",
            bufferSize: 32
        });
        validateInteger(bufferSize, "options.bufferSize", 1, 4294967295);
        Deno.readDirSync(path83);
        dir = new Dir(path83);
    } catch (error31) {
        err = denoErrorToNodeError(error31, {
            syscall: "opendir"
        });
    }
    if (err) {
        callback(err);
    } else {
        callback(null, dir);
    }
}
const opendirPromise = promisify(opendir);
function opendirSync(path84, options) {
    path84 = getValidatedPath(path84).toString();
    const { bufferSize  } = getOptions1(options, {
        encoding: "utf8",
        bufferSize: 32
    });
    validateInteger(bufferSize, "options.bufferSize", 1, 4294967295);
    try {
        Deno.readDirSync(path84);
        return new Dir(path84);
    } catch (err) {
        throw denoErrorToNodeError(err, {
            syscall: "opendir"
        });
    }
}
function read1(fd, optOrBufferOrCb, offsetOrCallback, length, position, callback) {
    let cb;
    let offset = 0, buffer;
    if (typeof fd !== "number") {
        throw new ERR_INVALID_ARG_TYPE("fd", "number", fd);
    }
    if (length == null) {
        length = 0;
    }
    if (typeof offsetOrCallback === "function") {
        cb = offsetOrCallback;
    } else if (typeof optOrBufferOrCb === "function") {
        cb = optOrBufferOrCb;
    } else {
        offset = offsetOrCallback;
        validateInteger(offset, "offset", 0);
        cb = callback;
    }
    if (optOrBufferOrCb instanceof Buffer || optOrBufferOrCb instanceof Uint8Array) {
        buffer = optOrBufferOrCb;
    } else if (typeof optOrBufferOrCb === "function") {
        offset = 0;
        buffer = Buffer.alloc(16384);
        length = buffer.byteLength;
        position = null;
    } else {
        const opt = optOrBufferOrCb;
        if (!(opt.buffer instanceof Buffer) && !(opt.buffer instanceof Uint8Array)) {
            if (opt.buffer === null) {
                length = opt.buffer.byteLength;
            }
            throw new ERR_INVALID_ARG_TYPE("buffer", [
                "Buffer",
                "TypedArray",
                "DataView", 
            ], optOrBufferOrCb);
        }
        offset = opt.offset ?? 0;
        buffer = opt.buffer ?? Buffer.alloc(16384);
        length = opt.length ?? buffer.byteLength;
        position = opt.position ?? null;
    }
    if (position == null) {
        position = -1;
    }
    validatePosition(position);
    validateOffsetLengthRead(offset, length, buffer.byteLength);
    if (!cb) throw new ERR_INVALID_ARG_TYPE("cb", "Callback", cb);
    (async ()=>{
        try {
            let nread;
            if (typeof position === "number" && position >= 0) {
                const currentPosition = await Deno.seek(fd, 0, Deno.SeekMode.Current);
                Deno.seekSync(fd, position, Deno.SeekMode.Start);
                nread = Deno.readSync(fd, buffer);
                Deno.seekSync(fd, currentPosition, Deno.SeekMode.Start);
            } else {
                nread = await Deno.read(fd, buffer);
            }
            cb(null, nread ?? 0, Buffer.from(buffer.buffer, offset, length));
        } catch (error32) {
            cb(error32, null);
        }
    })();
}
function readSync(fd, buffer, offsetOrOpt, length, position) {
    let offset = 0;
    if (typeof fd !== "number") {
        throw new ERR_INVALID_ARG_TYPE("fd", "number", fd);
    }
    validateBuffer(buffer);
    if (length == null) {
        length = 0;
    }
    if (typeof offsetOrOpt === "number") {
        offset = offsetOrOpt;
        validateInteger(offset, "offset", 0);
    } else {
        const opt = offsetOrOpt;
        offset = opt.offset ?? 0;
        length = opt.length ?? buffer.byteLength;
        position = opt.position ?? null;
    }
    if (position == null) {
        position = -1;
    }
    validatePosition(position);
    validateOffsetLengthRead(offset, length, buffer.byteLength);
    let currentPosition = 0;
    if (typeof position === "number" && position >= 0) {
        currentPosition = Deno.seekSync(fd, 0, Deno.SeekMode.Current);
        Deno.seekSync(fd, position, Deno.SeekMode.Start);
    }
    const numberOfBytesRead = Deno.readSync(fd, buffer);
    if (typeof position === "number" && position >= 0) {
        Deno.seekSync(fd, currentPosition, Deno.SeekMode.Start);
    }
    return numberOfBytesRead ?? 0;
}
const statPromisified = promisify(stat);
const statAsync = async (filename)=>{
    try {
        return await statPromisified(filename);
    } catch  {
        return emptyStats;
    }
};
const emptyStats = new Stats(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, Date.UTC(1970, 0, 1, 0, 0, 0), Date.UTC(1970, 0, 1, 0, 0, 0), Date.UTC(1970, 0, 1, 0, 0, 0), Date.UTC(1970, 0, 1, 0, 0, 0));
function asyncIterableToCallback(iter, callback, errCallback) {
    const iterator = iter[Symbol.asyncIterator]();
    function next() {
        iterator.next().then((obj)=>{
            if (obj.done) {
                callback(obj.value, true);
                return;
            }
            callback(obj.value);
            next();
        }, errCallback);
    }
    next();
}
function watch(filename, optionsOrListener, optionsOrListener2) {
    const listener = typeof optionsOrListener === "function" ? optionsOrListener : typeof optionsOrListener2 === "function" ? optionsOrListener2 : undefined;
    const options = typeof optionsOrListener === "object" ? optionsOrListener : typeof optionsOrListener2 === "object" ? optionsOrListener2 : undefined;
    const watchPath = getValidatedPath(filename).toString();
    let iterator;
    const timer = setTimeout(()=>{
        iterator = Deno.watchFs(watchPath, {
            recursive: options?.recursive || false
        });
        asyncIterableToCallback(iterator, (val, done)=>{
            if (done) return;
            fsWatcher.emit("change", convertDenoFsEventToNodeFsEvent(val.kind), basename5(val.paths[0]));
        }, (e)=>{
            fsWatcher.emit("error", e);
        });
    }, 5);
    const fsWatcher = new FSWatcher(()=>{
        clearTimeout(timer);
        try {
            iterator?.close();
        } catch (e) {
            if (e instanceof Deno.errors.BadResource) {
                return;
            }
            throw e;
        }
    });
    if (listener) {
        fsWatcher.on("change", listener.bind({
            _handle: fsWatcher
        }));
    }
    return fsWatcher;
}
const watchPromise = promisify(watch);
function watchFile(filename, listenerOrOptions, listener) {
    const watchPath = getValidatedPath(filename).toString();
    const handler = typeof listenerOrOptions === "function" ? listenerOrOptions : listener;
    validateFunction(handler, "listener");
    const { bigint =false , persistent =true , interval =5007 ,  } = typeof listenerOrOptions === "object" ? listenerOrOptions : {};
    let stat1 = statWatchers.get(watchPath);
    if (stat1 === undefined) {
        stat1 = new StatWatcher(bigint);
        stat1[kFSStatWatcherStart](watchPath, persistent, interval);
        statWatchers.set(watchPath, stat1);
    }
    stat1.addListener("change", listener);
    return stat1;
}
function unwatchFile(filename, listener) {
    const watchPath = getValidatedPath(filename).toString();
    const stat2 = statWatchers.get(watchPath);
    if (!stat2) {
        return;
    }
    if (typeof listener === "function") {
        const beforeListenerCount = stat2.listenerCount("change");
        stat2.removeListener("change", listener);
        if (stat2.listenerCount("change") < beforeListenerCount) {
            stat2[kFSStatWatcherAddOrCleanRef]("clean");
        }
    } else {
        stat2.removeAllListeners("change");
        stat2[kFSStatWatcherAddOrCleanRef]("cleanAll");
    }
    if (stat2.listenerCount("change") === 0) {
        stat2.stop();
        statWatchers.delete(watchPath);
    }
}
const statWatchers = new Map();
const kFSStatWatcherStart = Symbol("kFSStatWatcherStart");
const kFSStatWatcherAddOrCleanRef = Symbol("kFSStatWatcherAddOrCleanRef");
class StatWatcher extends EventEmitter {
    #bigint;
    #refCount = 0;
    #abortController = new AbortController();
    constructor(bigint){
        super();
        this.#bigint = bigint;
    }
    [kFSStatWatcherStart](filename, persistent, interval) {
        if (persistent) {
            this.#refCount++;
        }
        (async ()=>{
            let prev = await statAsync(filename);
            if (prev === emptyStats) {
                this.emit("change", prev, prev);
            }
            try {
                while(true){
                    await delay(interval, {
                        signal: this.#abortController.signal
                    });
                    const curr = await statAsync(filename);
                    if (curr?.mtime !== prev?.mtime) {
                        this.emit("change", curr, prev);
                        prev = curr;
                    }
                }
            } catch (e) {
                if (e instanceof DOMException && e.name === "AbortError") {
                    return;
                }
                this.emit("error", e);
            }
        })();
    }
    [kFSStatWatcherAddOrCleanRef](addOrClean) {
        if (addOrClean === "add") {
            this.#refCount++;
        } else if (addOrClean === "clean") {
            this.#refCount--;
        } else {
            this.#refCount = 0;
        }
    }
    stop() {
        if (this.#abortController.signal.aborted) {
            return;
        }
        this.#abortController.abort();
        this.emit("stop");
    }
    ref() {
        notImplemented("FSWatcher.ref() is not implemented");
    }
    unref() {
        notImplemented("FSWatcher.unref() is not implemented");
    }
}
class FSWatcher extends EventEmitter {
    #closer;
    #closed = false;
    constructor(closer){
        super();
        this.#closer = closer;
    }
    close() {
        if (this.#closed) {
            return;
        }
        this.#closed = true;
        this.emit("close");
        this.#closer();
    }
    ref() {
        notImplemented("FSWatcher.ref() is not implemented");
    }
    unref() {
        notImplemented("FSWatcher.unref() is not implemented");
    }
}
function convertDenoFsEventToNodeFsEvent(kind) {
    if (kind === "create" || kind === "remove") {
        return "rename";
    } else {
        return "change";
    }
}
function toDirent(val) {
    return new Dirent1(val);
}
function readdir(path85, optionsOrCallback, maybeCallback6) {
    const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback6;
    const options = typeof optionsOrCallback === "object" ? optionsOrCallback : null;
    const result = [];
    path85 = getValidatedPath(path85);
    if (!callback) throw new Error("No callback function supplied");
    if (options?.encoding) {
        try {
            new TextDecoder(options.encoding);
        } catch  {
            throw new Error(`TypeError [ERR_INVALID_OPT_VALUE_ENCODING]: The value "${options.encoding}" is invalid for option "encoding"`);
        }
    }
    try {
        asyncIterableToCallback(Deno.readDir(path85.toString()), (val, done)=>{
            if (typeof path85 !== "string") return;
            if (done) {
                callback(null, result);
                return;
            }
            if (options?.withFileTypes) {
                result.push(toDirent(val));
            } else result.push(decode4(val.name));
        }, (e)=>{
            callback(denoErrorToNodeError(e, {
                syscall: "readdir"
            }));
        });
    } catch (e) {
        callback(denoErrorToNodeError(e, {
            syscall: "readdir"
        }));
    }
}
function decode4(str, encoding) {
    if (!encoding) return str;
    else {
        const decoder3 = new TextDecoder(encoding);
        const encoder = new TextEncoder();
        return decoder3.decode(encoder.encode(str));
    }
}
const readdirPromise = promisify(readdir);
function readdirSync(path86, options) {
    const result = [];
    path86 = getValidatedPath(path86);
    if (options?.encoding) {
        try {
            new TextDecoder(options.encoding);
        } catch  {
            throw new Error(`TypeError [ERR_INVALID_OPT_VALUE_ENCODING]: The value "${options.encoding}" is invalid for option "encoding"`);
        }
    }
    try {
        for (const file of Deno.readDirSync(path86.toString())){
            if (options?.withFileTypes) {
                result.push(toDirent(file));
            } else result.push(decode4(file.name));
        }
    } catch (e) {
        throw denoErrorToNodeError(e, {
            syscall: "readdir"
        });
    }
    return result;
}
function maybeDecode(data5, encoding) {
    const buffer = Buffer.from(data5.buffer, data5.byteOffset, data5.byteLength);
    if (encoding && encoding !== "binary") return buffer.toString(encoding);
    return buffer;
}
function readFile(path87, optOrCallback, callback) {
    path87 = path87 instanceof URL ? fromFileUrl5(path87) : path87;
    let cb;
    if (typeof optOrCallback === "function") {
        cb = optOrCallback;
    } else {
        cb = callback;
    }
    const encoding = getEncoding(optOrCallback);
    const p = Deno.readFile(path87);
    if (cb) {
        p.then((data6)=>{
            if (encoding && encoding !== "binary") {
                const text = maybeDecode(data6, encoding);
                return cb(null, text);
            }
            const buffer = maybeDecode(data6, encoding);
            cb(null, buffer);
        }, (err)=>cb && cb(err)
        );
    }
}
const readFilePromise = promisify(readFile);
function readFileSync(path88, opt) {
    path88 = path88 instanceof URL ? fromFileUrl5(path88) : path88;
    if (path88 == "https:/esm.sh/v106/web-tree-sitter@0.20.7/deno/tree-sitter.wasm") {
        return wasmBytes
    }
    const data7 = Deno.readFileSync(path88);
    const encoding = getEncoding(opt);
    if (encoding && encoding !== "binary") {
        const text = maybeDecode(data7, encoding);
        return text;
    }
    const buffer = maybeDecode(data7, encoding);
    return buffer;
}
function maybeEncode(data8, encoding) {
    if (encoding === "buffer") {
        return new TextEncoder().encode(data8);
    }
    return data8;
}
function getEncoding1(optOrCallback) {
    if (!optOrCallback || typeof optOrCallback === "function") {
        return null;
    } else {
        if (optOrCallback.encoding) {
            if (optOrCallback.encoding === "utf8" || optOrCallback.encoding === "utf-8") {
                return "utf8";
            } else if (optOrCallback.encoding === "buffer") {
                return "buffer";
            } else {
                notImplemented(`fs.readlink encoding=${optOrCallback.encoding}`);
            }
        }
        return null;
    }
}
function readlink(path89, optOrCallback, callback) {
    path89 = path89 instanceof URL ? fromFileUrl5(path89) : path89;
    let cb;
    if (typeof optOrCallback === "function") {
        cb = optOrCallback;
    } else {
        cb = callback;
    }
    const encoding = getEncoding1(optOrCallback);
    intoCallbackAPIWithIntercept(Deno.readLink, (data9)=>maybeEncode(data9, encoding)
    , cb, path89);
}
const readlinkPromise = promisify(readlink);
function readlinkSync(path90, opt) {
    path90 = path90 instanceof URL ? fromFileUrl5(path90) : path90;
    return maybeEncode(Deno.readLinkSync(path90), getEncoding1(opt));
}
function realpath(path112, options, callback) {
    if (typeof options === "function") {
        callback = options;
    }
    if (!callback) {
        throw new Error("No callback function supplied");
    }
    Deno.realPath(path112).then((path91)=>callback(null, path91)
    , (err)=>callback(err)
    );
}
realpath.native = realpath;
const realpathPromise = promisify(realpath);
function realpathSync(path92) {
    return Deno.realPathSync(path92);
}
realpathSync.native = realpathSync;
function rename(oldPath, newPath, callback) {
    oldPath = oldPath instanceof URL ? fromFileUrl5(oldPath) : oldPath;
    newPath = newPath instanceof URL ? fromFileUrl5(newPath) : newPath;
    if (!callback) throw new Error("No callback function supplied");
    Deno.rename(oldPath, newPath).then((_)=>callback()
    , callback);
}
const renamePromise = promisify(rename);
function renameSync(oldPath, newPath) {
    oldPath = oldPath instanceof URL ? fromFileUrl5(oldPath) : oldPath;
    newPath = newPath instanceof URL ? fromFileUrl5(newPath) : newPath;
    Deno.renameSync(oldPath, newPath);
}
function rmdir(path93, optionsOrCallback, maybeCallback7) {
    path93 = toNamespacedPath5(getValidatedPath(path93));
    const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback7;
    const options1 = typeof optionsOrCallback === "object" ? optionsOrCallback : undefined;
    if (!callback) throw new Error("No callback function supplied");
    if (options1?.recursive) {
        emitRecursiveRmdirWarning();
        validateRmOptions(path93, {
            ...options1,
            force: false
        }, true, (err, options)=>{
            if (err === false) {
                return callback(new ERR_FS_RMDIR_ENOTDIR(path93.toString()));
            }
            if (err) {
                return callback(err);
            }
            Deno.remove(path93, {
                recursive: options?.recursive
            }).then((_)=>callback()
            , callback);
        });
    } else {
        validateRmdirOptions(options1);
        Deno.remove(path93, {
            recursive: options1?.recursive
        }).then((_)=>callback()
        , (err)=>{
            callback(err instanceof Error ? denoErrorToNodeError(err, {
                syscall: "rmdir"
            }) : err);
        });
    }
}
const rmdirPromise = promisify(rmdir);
function rmdirSync(path94, options) {
    path94 = getValidatedPath(path94);
    if (options?.recursive) {
        emitRecursiveRmdirWarning();
        const optionsOrFalse = validateRmOptionsSync(path94, {
            ...options,
            force: false
        }, true);
        if (optionsOrFalse === false) {
            throw new ERR_FS_RMDIR_ENOTDIR(path94.toString());
        }
        options = optionsOrFalse;
    } else {
        validateRmdirOptions(options);
    }
    try {
        Deno.removeSync(toNamespacedPath5(path94), {
            recursive: options?.recursive
        });
    } catch (err) {
        throw err instanceof Error ? denoErrorToNodeError(err, {
            syscall: "rmdir"
        }) : err;
    }
}
function rm(path95, optionsOrCallback, maybeCallback8) {
    const callback = typeof optionsOrCallback === "function" ? optionsOrCallback : maybeCallback8;
    const options1 = typeof optionsOrCallback === "object" ? optionsOrCallback : undefined;
    if (!callback) throw new Error("No callback function supplied");
    validateRmOptions(path95, options1, false, (err1, options)=>{
        if (err1) {
            return callback(err1);
        }
        Deno.remove(path95, {
            recursive: options?.recursive
        }).then((_)=>callback(null)
        , (err)=>{
            if (options?.force && err instanceof Deno.errors.NotFound) {
                callback(null);
            } else {
                callback(err instanceof Error ? denoErrorToNodeError(err, {
                    syscall: "rm"
                }) : err);
            }
        });
    });
}
const rmPromise = promisify(rm);
function rmSync(path96, options) {
    options = validateRmOptionsSync(path96, options, false);
    try {
        Deno.removeSync(path96, {
            recursive: options?.recursive
        });
    } catch (err) {
        if (options?.force && err instanceof Deno.errors.NotFound) {
            return;
        }
        if (err instanceof Error) {
            throw denoErrorToNodeError(err, {
                syscall: "stat"
            });
        } else {
            throw err;
        }
    }
}
function symlink(target, path97, typeOrCallback, maybeCallback9) {
    target = target instanceof URL ? fromFileUrl5(target) : target;
    path97 = path97 instanceof URL ? fromFileUrl5(path97) : path97;
    const type = typeof typeOrCallback === "string" ? typeOrCallback : "file";
    const callback = typeof typeOrCallback === "function" ? typeOrCallback : maybeCallback9;
    if (!callback) throw new Error("No callback function supplied");
    Deno.symlink(target, path97, {
        type
    }).then(()=>callback(null)
    , callback);
}
const symlinkPromise = promisify(symlink);
function symlinkSync(target, path98, type) {
    target = target instanceof URL ? fromFileUrl5(target) : target;
    path98 = path98 instanceof URL ? fromFileUrl5(path98) : path98;
    type = type || "file";
    Deno.symlinkSync(target, path98, {
        type
    });
}
function truncate(path99, lenOrCallback, maybeCallback10) {
    path99 = path99 instanceof URL ? fromFileUrl5(path99) : path99;
    const len = typeof lenOrCallback === "number" ? lenOrCallback : undefined;
    const callback = typeof lenOrCallback === "function" ? lenOrCallback : maybeCallback10;
    if (!callback) throw new Error("No callback function supplied");
    Deno.truncate(path99, len).then(()=>callback(null)
    , callback);
}
const truncatePromise = promisify(truncate);
function truncateSync(path100, len) {
    path100 = path100 instanceof URL ? fromFileUrl5(path100) : path100;
    Deno.truncateSync(path100, len);
}
function unlink(path101, callback) {
    if (!callback) throw new Error("No callback function supplied");
    Deno.remove(path101).then((_)=>callback()
    , callback);
}
const unlinkPromise = promisify(unlink);
function unlinkSync(path102) {
    Deno.removeSync(path102);
}
function getValidTime1(time, name54) {
    if (typeof time === "string") {
        time = Number(time);
    }
    if (typeof time === "number" && (Number.isNaN(time) || !Number.isFinite(time))) {
        throw new Deno.errors.InvalidData(`invalid ${name54}, must not be infinity or NaN`);
    }
    return time;
}
function utimes(path103, atime, mtime, callback) {
    path103 = path103 instanceof URL ? fromFileUrl5(path103) : path103;
    if (!callback) {
        throw new Deno.errors.InvalidData("No callback function supplied");
    }
    atime = getValidTime1(atime, "atime");
    mtime = getValidTime1(mtime, "mtime");
    Deno.utime(path103, atime, mtime).then(()=>callback(null)
    , callback);
}
const utimesPromise = promisify(utimes);
function utimesSync(path104, atime, mtime) {
    path104 = path104 instanceof URL ? fromFileUrl5(path104) : path104;
    atime = getValidTime1(atime, "atime");
    mtime = getValidTime1(mtime, "mtime");
    Deno.utimeSync(path104, atime, mtime);
}
function writeSync(fd1, buffer1, offset1, length1, position1) {
    fd1 = getValidatedFd(fd1);
    const innerWriteSync = (fd, buffer, offset, length, position)=>{
        if (buffer instanceof DataView) {
            buffer = new Uint8Array(buffer.buffer);
        }
        if (typeof position === "number") {
            Deno.seekSync(fd, position, Deno.SeekMode.Start);
        }
        let currentOffset = offset;
        const end = offset + length;
        while(currentOffset - offset < length){
            currentOffset += Deno.writeSync(fd, buffer.subarray(currentOffset, end));
        }
        return currentOffset - offset;
    };
    if (isArrayBufferView(buffer1)) {
        if (position1 === undefined) {
            position1 = null;
        }
        if (offset1 == null) {
            offset1 = 0;
        } else {
            validateInteger(offset1, "offset", 0);
        }
        if (typeof length1 !== "number") {
            length1 = buffer1.byteLength - offset1;
        }
        validateOffsetLengthWrite(offset1, length1, buffer1.byteLength);
        return innerWriteSync(fd1, buffer1, offset1, length1, position1);
    }
    validateStringAfterArrayBufferView(buffer1, "buffer");
    validateEncoding(buffer1, length1);
    if (offset1 === undefined) {
        offset1 = null;
    }
    buffer1 = Buffer.from(buffer1, length1);
    return innerWriteSync(fd1, buffer1, 0, buffer1.length, position1);
}
function write(fd2, buffer2, offset2, length2, position2, callback) {
    fd2 = getValidatedFd(fd2);
    const innerWrite = async (fd, buffer, offset, length, position)=>{
        if (buffer instanceof DataView) {
            buffer = new Uint8Array(buffer.buffer);
        }
        if (typeof position === "number") {
            await Deno.seek(fd, position, Deno.SeekMode.Start);
        }
        let currentOffset = offset;
        const end = offset + length;
        while(currentOffset - offset < length){
            currentOffset += await Deno.write(fd, buffer.subarray(currentOffset, end));
        }
        return currentOffset - offset;
    };
    if (isArrayBufferView(buffer2)) {
        callback = maybeCallback(callback || position2 || length2 || offset2);
        if (offset2 == null || typeof offset2 === "function") {
            offset2 = 0;
        } else {
            validateInteger(offset2, "offset", 0);
        }
        if (typeof length2 !== "number") {
            length2 = buffer2.byteLength - offset2;
        }
        if (typeof position2 !== "number") {
            position2 = null;
        }
        validateOffsetLengthWrite(offset2, length2, buffer2.byteLength);
        innerWrite(fd2, buffer2, offset2, length2, position2).then((nwritten)=>{
            callback(null, nwritten, buffer2);
        }, (err)=>callback(err)
        );
        return;
    }
    validateStringAfterArrayBufferView(buffer2, "buffer");
    if (typeof buffer2 !== "string") {
        showStringCoercionDeprecation();
    }
    if (typeof position2 !== "function") {
        if (typeof offset2 === "function") {
            position2 = offset2;
            offset2 = null;
        } else {
            position2 = length2;
        }
        length2 = "utf-8";
    }
    const str = String(buffer2);
    validateEncoding(str, length2);
    callback = maybeCallback(position2);
    buffer2 = Buffer.from(str, length2);
    innerWrite(fd2, buffer2, 0, buffer2.length, offset2, callback).then((nwritten)=>{
        callback(null, nwritten, buffer2);
    }, (err)=>callback(err)
    );
}
function writev(fd1, buffers1, position1, callback) {
    const innerWritev = async (fd, buffers, position)=>{
        const chunks = [];
        for(let i153 = 0; i153 < buffers.length; i153++){
            if (Buffer.isBuffer(buffers[i153])) {
                chunks.push(buffers[i153]);
            } else {
                chunks.push(Buffer.from(buffers[i153]));
            }
        }
        if (typeof position === "number") {
            await Deno.seekSync(fd, position, Deno.SeekMode.Start);
        }
        const buffer = Buffer.concat(chunks);
        let currentOffset = 0;
        while(currentOffset < buffer.byteLength){
            currentOffset += await Deno.writeSync(fd, buffer.subarray(currentOffset));
        }
        return currentOffset - 0;
    };
    fd1 = getValidatedFd(fd1);
    validateBufferArray(buffers1);
    callback = maybeCallback(callback || position1);
    if (buffers1.length === 0) {
        process.nextTick(callback, null, 0, buffers1);
        return;
    }
    if (typeof position1 !== "number") position1 = null;
    innerWritev(fd1, buffers1, position1).then((nwritten)=>{
        callback(null, nwritten, buffers1);
    }, (err)=>callback(err)
    );
}
function writevSync(fd2, buffers2, position2) {
    const innerWritev = (fd, buffers, position)=>{
        const chunks = [];
        for(let i154 = 0; i154 < buffers.length; i154++){
            if (Buffer.isBuffer(buffers[i154])) {
                chunks.push(buffers[i154]);
            } else {
                chunks.push(Buffer.from(buffers[i154]));
            }
        }
        if (typeof position === "number") {
            Deno.seekSync(fd, position, Deno.SeekMode.Start);
        }
        const buffer = Buffer.concat(chunks);
        let currentOffset = 0;
        while(currentOffset < buffer.byteLength){
            currentOffset += Deno.writeSync(fd, buffer.subarray(currentOffset));
        }
        return currentOffset - 0;
    };
    fd2 = getValidatedFd(fd2);
    validateBufferArray(buffers2);
    if (buffers2.length === 0) {
        return 0;
    }
    if (typeof position2 !== "number") position2 = null;
    return innerWritev(fd2, buffers2, position2);
}
const kIoDone = Symbol("kIoDone");
const kIsPerformingIO = Symbol("kIsPerformingIO");
const kFs = Symbol("kFs");
function _construct(callback) {
    const stream1 = this;
    if (typeof stream1.fd === "number") {
        callback();
        return;
    }
    if (stream1.open !== openWriteFs && stream1.open !== openReadFs) {
        const orgEmit = stream1.emit;
        stream1.emit = function(...args4) {
            if (args4[0] === "open") {
                this.emit = orgEmit;
                callback();
                Reflect.apply(orgEmit, this, args4);
            } else if (args4[0] === "error") {
                this.emit = orgEmit;
                callback(args4[1]);
            } else {
                Reflect.apply(orgEmit, this, args4);
            }
        };
        stream1.open();
    } else {
        stream1[kFs].open(stream1.path.toString(), stream1.flags, stream1.mode, (er, fd)=>{
            if (er) {
                callback(er);
            } else {
                stream1.fd = fd;
                callback();
                stream1.emit("open", stream1.fd);
                stream1.emit("ready");
            }
        });
    }
}
function close1(stream2, err, cb) {
    if (!stream2.fd) {
        cb(err);
    } else {
        stream2[kFs].close(stream2.fd, (er)=>{
            cb(er || err);
        });
        stream2.fd = null;
    }
}
function importFd(stream3, options) {
    if (typeof options.fd === "number") {
        if (stream3 instanceof ReadStream) {
            stream3[kFs] = options.fs || {
                read: read1,
                close: close
            };
        }
        if (stream3 instanceof WriteStream) {
            stream3[kFs] = options.fs || {
                write: write,
                writev: writev,
                close: close
            };
        }
        return options.fd;
    }
    throw new ERR_INVALID_ARG_TYPE("options.fd", [
        "number"
    ], options.fd);
}
function ReadStream(path105, options) {
    if (!(this instanceof ReadStream)) {
        return new ReadStream(path105, options);
    }
    options = copyObject(getOptions1(options, kEmptyObject));
    if (options.highWaterMark === undefined) {
        options.highWaterMark = 64 * 1024;
    }
    if (options.autoDestroy === undefined) {
        options.autoDestroy = false;
    }
    if (options.fd == null) {
        this.fd = null;
        this[kFs] = options.fs || {
            open: open,
            read: read1,
            close: close
        };
        validateFunction(this[kFs].open, "options.fs.open");
        this.path = toPathIfFileURL(path105);
        this.flags = options.flags === undefined ? "r" : options.flags;
        this.mode = options.mode === undefined ? 0o666 : options.mode;
        validatePath(this.path);
    } else {
        this.fd = getValidatedFd(importFd(this, options));
    }
    options.autoDestroy = options.autoClose === undefined ? true : options.autoClose;
    validateFunction(this[kFs].read, "options.fs.read");
    if (options.autoDestroy) {
        validateFunction(this[kFs].close, "options.fs.close");
    }
    this.start = options.start;
    this.end = options.end ?? Infinity;
    this.pos = undefined;
    this.bytesRead = 0;
    this[kIsPerformingIO] = false;
    if (this.start !== undefined) {
        validateInteger(this.start, "start", 0);
        this.pos = this.start;
    }
    if (this.end !== Infinity) {
        validateInteger(this.end, "end", 0);
        if (this.start !== undefined && this.start > this.end) {
            throw new ERR_OUT_OF_RANGE("start", `<= "end" (here: ${this.end})`, this.start);
        }
    }
    Reflect.apply(Au, this, [
        options
    ]);
}
Object.setPrototypeOf(ReadStream.prototype, Au.prototype);
Object.setPrototypeOf(ReadStream, Au);
Object.defineProperty(ReadStream.prototype, "autoClose", {
    get () {
        return this._readableState.autoDestroy;
    },
    set (val) {
        this._readableState.autoDestroy = val;
    }
});
const openReadFs = deprecate(function() {}, "ReadStream.prototype.open() is deprecated", "DEP0135");
ReadStream.prototype.open = openReadFs;
ReadStream.prototype._construct = _construct;
ReadStream.prototype._read = async function(n) {
    n = this.pos !== undefined ? Math.min(this.end - this.pos + 1, n) : Math.min(this.end - this.bytesRead + 1, n);
    if (n <= 0) {
        this.push(null);
        return;
    }
    const buf = Buffer.allocUnsafeSlow(n);
    let error33 = null;
    let bytesRead = null;
    let buffer = undefined;
    this[kIsPerformingIO] = true;
    await new Promise((resolve14)=>{
        this[kFs].read(this.fd, buf, 0, n, this.pos ?? null, (_er, _bytesRead, _buf)=>{
            error33 = _er;
            bytesRead = _bytesRead;
            buffer = _buf;
            return resolve14(true);
        });
    });
    this[kIsPerformingIO] = false;
    if (this.destroyed) {
        this.emit(kIoDone, error33);
        return;
    }
    if (error33) {
        errorOrDestroy(this, error33);
    } else if (typeof bytesRead === "number" && bytesRead > 0) {
        if (this.pos !== undefined) {
            this.pos += bytesRead;
        }
        this.bytesRead += bytesRead;
        if (bytesRead !== buffer.length) {
            const dst = Buffer.allocUnsafeSlow(bytesRead);
            buffer.copy(dst, 0, 0, bytesRead);
            buffer = dst;
        }
        this.push(buffer);
    } else {
        this.push(null);
    }
};
ReadStream.prototype._destroy = function(err, cb) {
    if (this[kIsPerformingIO]) {
        this.once(kIoDone, (er)=>close1(this, err || er, cb)
        );
    } else {
        close1(this, err, cb);
    }
};
ReadStream.prototype.close = function(cb) {
    if (typeof cb === "function") Du(this, cb);
    this.destroy();
};
Object.defineProperty(ReadStream.prototype, "pending", {
    get () {
        return this.fd === null;
    },
    configurable: true
});
function WriteStream(path106, options) {
    if (!(this instanceof WriteStream)) {
        return new WriteStream(path106, options);
    }
    options = copyObject(getOptions1(options, kEmptyObject));
    options.decodeStrings = true;
    if (options.fd == null) {
        this.fd = null;
        this[kFs] = options.fs || {
            open: open,
            write: write,
            writev: writev,
            close: close
        };
        validateFunction(this[kFs].open, "options.fs.open");
        this.path = toPathIfFileURL(path106);
        this.flags = options.flags === undefined ? "w" : options.flags;
        this.mode = options.mode === undefined ? 0o666 : options.mode;
        validatePath(this.path);
    } else {
        this.fd = getValidatedFd(importFd(this, options));
    }
    options.autoDestroy = options.autoClose === undefined ? true : options.autoClose;
    if (!this[kFs].write && !this[kFs].writev) {
        throw new ERR_INVALID_ARG_TYPE("options.fs.write", "function", this[kFs].write);
    }
    if (this[kFs].write) {
        validateFunction(this[kFs].write, "options.fs.write");
    }
    if (this[kFs].writev) {
        validateFunction(this[kFs].writev, "options.fs.writev");
    }
    if (options.autoDestroy) {
        validateFunction(this[kFs].close, "options.fs.close");
    }
    if (!this[kFs].write) {
        this._write = null;
    }
    if (!this[kFs].writev) {
        this._writev = null;
    }
    this.start = options.start;
    this.pos = undefined;
    this.bytesWritten = 0;
    this[kIsPerformingIO] = false;
    if (this.start !== undefined) {
        validateInteger(this.start, "start", 0);
        this.pos = this.start;
    }
    Reflect.apply(mu, this, [
        options
    ]);
    if (options.encoding) {
        this.setDefaultEncoding(options.encoding);
    }
}
Object.setPrototypeOf(WriteStream.prototype, mu.prototype);
Object.setPrototypeOf(WriteStream, mu);
Object.defineProperty(WriteStream.prototype, "autoClose", {
    get () {
        return this._writableState.autoDestroy;
    },
    set (val) {
        this._writableState.autoDestroy = val;
    }
});
const openWriteFs = deprecate(function() {}, "WriteStream.prototype.open() is deprecated", "DEP0135");
WriteStream.prototype.open = openWriteFs;
WriteStream.prototype._construct = _construct;
WriteStream.prototype._write = function(data10, _encoding, cb) {
    this[kIsPerformingIO] = true;
    this[kFs].write(this.fd, data10, 0, data10.length, this.pos, (er, bytes)=>{
        this[kIsPerformingIO] = false;
        if (this.destroyed) {
            cb(er);
            return this.emit(kIoDone, er);
        }
        if (er) {
            return cb(er);
        }
        this.bytesWritten += bytes;
        cb();
    });
    if (this.pos !== undefined) {
        this.pos += data10.length;
    }
};
WriteStream.prototype._writev = function(data11, cb) {
    const len = data11.length;
    const chunks = new Array(len);
    let size = 0;
    for(let i155 = 0; i155 < len; i155++){
        const chunk = data11[i155].chunk;
        chunks[i155] = chunk;
        size += chunk.length;
    }
    this[kIsPerformingIO] = true;
    this[kFs].writev(this.fd, chunks, this.pos ?? null, (er, bytes)=>{
        this[kIsPerformingIO] = false;
        if (this.destroyed) {
            cb(er);
            return this.emit(kIoDone, er);
        }
        if (er) {
            return cb(er);
        }
        this.bytesWritten += bytes;
        cb();
    });
    if (this.pos !== undefined) {
        this.pos += size;
    }
};
WriteStream.prototype._destroy = function(err, cb) {
    if (this[kIsPerformingIO]) {
        this.once(kIoDone, (er)=>close1(this, err || er, cb)
        );
    } else {
        close1(this, err, cb);
    }
};
WriteStream.prototype.close = function(cb) {
    if (cb) {
        if (this.closed) {
            nextTick1(cb);
            return;
        }
        this.on("close", cb);
    }
    if (!this.autoClose) {
        this.on("finish", this.destroy);
    }
    this.end();
};
WriteStream.prototype.destroySoon = WriteStream.prototype.end;
Object.defineProperty(WriteStream.prototype, "pending", {
    get () {
        return this.fd === null;
    },
    configurable: true
});
function createReadStream(path107, options) {
    return new ReadStream(path107, options);
}
function createWriteStream(path108, options) {
    return new WriteStream(path108, options);
}
const { F_OK: F_OK2 , R_OK: R_OK2 , W_OK: W_OK2 , X_OK: X_OK2 , O_RDONLY: O_RDONLY2 , O_WRONLY: O_WRONLY2 , O_RDWR: O_RDWR2 , O_NOCTTY: O_NOCTTY1 , O_TRUNC: O_TRUNC2 , O_APPEND: O_APPEND2 , O_DIRECTORY: O_DIRECTORY1 , O_NOFOLLOW: O_NOFOLLOW1 , O_SYNC: O_SYNC2 , O_DSYNC: O_DSYNC1 , O_SYMLINK: O_SYMLINK1 , O_NONBLOCK: O_NONBLOCK1 , O_CREAT: O_CREAT2 , O_EXCL: O_EXCL2 ,  } = mod49;
const promises = {
    access: accessPromise,
    copyFile: copyFilePromise,
    open: openPromise,
    opendir: opendirPromise,
    rename: renamePromise,
    truncate: truncatePromise,
    rm: rmPromise,
    rmdir: rmdirPromise,
    mkdir: mkdirPromise,
    readdir: readdirPromise,
    readlink: readlinkPromise,
    symlink: symlinkPromise,
    lstat: lstatPromise,
    stat: statPromise,
    link: linkPromise,
    unlink: unlinkPromise,
    chmod: chmodPromise,
    chown: chownPromise,
    utimes: utimesPromise,
    realpath: realpathPromise,
    mkdtemp: mkdtempPromise,
    writeFile: writeFilePromise,
    appendFile: appendFilePromise,
    readFile: readFilePromise,
    watch: watchPromise
};
const __default9 = {
    access,
    accessSync,
    appendFile,
    appendFileSync,
    chmod,
    chmodSync,
    chown,
    chownSync,
    close,
    closeSync,
    constants: mod49,
    copyFile,
    copyFileSync,
    createReadStream,
    createWriteStream,
    Dir,
    Dirent: Dirent1,
    exists,
    existsSync,
    F_OK: F_OK2,
    fdatasync,
    fdatasyncSync,
    fstat,
    fstatSync,
    fsync,
    fsyncSync,
    ftruncate,
    ftruncateSync,
    futimes,
    futimesSync,
    link,
    linkSync,
    lstat,
    lstatSync,
    mkdir,
    mkdirSync,
    mkdtemp,
    mkdtempSync,
    O_APPEND: O_APPEND2,
    O_CREAT: O_CREAT2,
    O_DIRECTORY: O_DIRECTORY1,
    O_DSYNC: O_DSYNC1,
    O_EXCL: O_EXCL2,
    O_NOCTTY: O_NOCTTY1,
    O_NOFOLLOW: O_NOFOLLOW1,
    O_NONBLOCK: O_NONBLOCK1,
    O_RDONLY: O_RDONLY2,
    O_RDWR: O_RDWR2,
    O_SYMLINK: O_SYMLINK1,
    O_SYNC: O_SYNC2,
    O_TRUNC: O_TRUNC2,
    O_WRONLY: O_WRONLY2,
    open,
    openSync,
    opendir,
    opendirSync,
    read: read1,
    readSync,
    promises,
    R_OK: R_OK2,
    readdir,
    readdirSync,
    readFile,
    readFileSync,
    readlink,
    readlinkSync,
    ReadStream,
    realpath,
    realpathSync,
    rename,
    renameSync,
    rmdir,
    rmdirSync,
    rm,
    rmSync,
    stat,
    Stats,
    statSync,
    symlink,
    symlinkSync,
    truncate,
    truncateSync,
    unlink,
    unlinkSync,
    unwatchFile,
    utimes,
    utimesSync,
    W_OK: W_OK2,
    watch,
    watchFile,
    write,
    writeFile,
    writev,
    writevSync,
    writeFileSync,
    WriteStream,
    writeSync,
    X_OK: X_OK2
};
var xn1 = Object.create;
var Qt = Object.defineProperty;
var Nn = Object.getOwnPropertyDescriptor;
var Pn = Object.getOwnPropertyNames;
var kn = Object.getPrototypeOf, Fn = Object.prototype.hasOwnProperty;
const thisZe = { exports: {} }
var P,
    k =
        typeof window == "object" && window.document && window.document.currentScript
            ? {
                  currentScript: window.document.currentScript,
              }
            : import.meta
var e = {}
class ParserClass {
    constructor() {
        this.initialize()
    }
    initialize() {
        throw new Error("cannot construct a Parser before calling `init()`")
    }
    static init(Q) {
        return (
            P ||
            ((e = Object.assign({}, e, Q)),
            (P = new Promise((nn) => {
                var K,
                    ce = {}
                for (K in e) e.hasOwnProperty(K) && (ce[K] = e[K])
                var Ie,
                    mt,
                    me = [],
                    De = "./this.program",
                    de = function (n, t) {
                        throw t
                    },
                    xe = !1,
                    Y1 = !1
                ;(xe = typeof window == "object"), (Y1 = typeof importScripts == "function"), (Ie = typeof process1 == "object" && typeof process1.versions == "object" && typeof process1.versions.node == "string"), (mt = !xe && !Ie && !Y1)
                var Ne,
                    ze,
                    ee,
                    Ue,
                    He,
                    j17 = ""
                Ie
                    ? ((j17 = Y1 ? __default7.dirname(j17) + "/" : "https://esm.sh/v106/web-tree-sitter@0.20.7/deno/"),
                      (Ne = function (n, t) {
                          return Ue || (Ue = __default9), He || (He = __default7), (n = He.normalize(n)), Ue.readFileSync(n, t ? null : "utf8")
                      }),
                      (ee = function (n) {
                          var t = Ne(n, !0)
                          return t.buffer || (t = new Uint8Array(t)), R(t.buffer), t
                      }),
                      process1.argv.length > 1 && (De = process1.argv[1].replace(/\\/g, "/")),
                      (me = process1.argv.slice(2)),
                      typeof thisZe < "u" && (thisZe.exports = e),
                      (de = function (n) {
                          process1.exit(n)
                      }),
                      (e.inspect = function () {
                          return "[Emscripten Module object]"
                      }))
                    : mt
                    ? (typeof read < "u" &&
                          (Ne = function (n) {
                              return read(n)
                          }),
                      (ee = function (n) {
                          var t
                          return typeof readbuffer == "function" ? new Uint8Array(readbuffer(n)) : (R(typeof (t = read(n, "binary")) == "object"), t)
                      }),
                      typeof scriptArgs < "u" ? (me = scriptArgs) : arguments !== void 0 && (me = arguments),
                      typeof quit == "function" &&
                          (de = function (n) {
                              quit(n)
                          }),
                      typeof print < "u" && (typeof console > "u" && (console = {}), (console.log = print), (console.warn = console.error = typeof printErr < "u" ? printErr : print)))
                    : (xe || Y1) &&
                      (Y1 ? (j17 = self.location.href) : k !== void 0 && k.currentScript && (j17 = k.currentScript.src),
                      (j17 = j17.indexOf("blob:") !== 0 ? j17.substr(0, j17.lastIndexOf("/") + 1) : ""),
                      (Ne = function (n) {
                          var t = new XMLHttpRequest()
                          return t.open("GET", n, !1), t.send(null), t.responseText
                      }),
                      Y1 &&
                          (ee = function (n) {
                              var t = new XMLHttpRequest()
                              return t.open("GET", n, !1), (t.responseType = "arraybuffer"), t.send(null), new Uint8Array(t.response)
                          }),
                      (ze = function (n, t, r) {
                          var s = new XMLHttpRequest()
                          s.open("GET", n, !0),
                              (s.responseType = "arraybuffer"),
                              (s.onload = function () {
                                  s.status == 200 || (s.status == 0 && s.response) ? t(s.response) : r()
                              }),
                              (s.onerror = r),
                              s.send(null)
                      })),
                    e.print || console.log.bind(console)
                var te = e.printErr || console.warn.bind(console)
                for (K in ce) ce.hasOwnProperty(K) && (e[K] = ce[K])
                ;(ce = null), e.arguments && (me = e.arguments), e.thisProgram && (De = e.thisProgram), e.quit && (de = e.quit)
                var dt = 16,
                    ne,
                    ft = []
                function pt(n, t) {
                    if (!ne) {
                        ne = new WeakMap()
                        for (var r = 0; r < q.length; r++) {
                            var s = q.get(r)
                            s && ne.set(s, r)
                        }
                    }
                    if (ne.has(n)) return ne.get(n)
                    var a = (function () {
                        if (ft.length) return ft.pop()
                        try {
                            q.grow(1)
                        } catch (i156) {
                            throw i156 instanceof RangeError ? "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH." : i156
                        }
                        return q.length - 1
                    })()
                    try {
                        q.set(a, n)
                    } catch (i157) {
                        if (!(i157 instanceof TypeError)) throw i157
                        var _ = (function (o, l) {
                            if (typeof WebAssembly.Function == "function") {
                                for (
                                    var w = {
                                            i: "i32",
                                            j: "i64",
                                            f: "f32",
                                            d: "f64",
                                        },
                                        m9 = {
                                            parameters: [],
                                            results: l[0] == "v" ? [] : [w[l[0]]],
                                        },
                                        y = 1;
                                    y < l.length;
                                    ++y
                                )
                                    m9.parameters.push(w[l[y]])
                                return new WebAssembly.Function(m9, o)
                            }
                            var S = [1, 0, 1, 96],
                                N = l.slice(0, 1),
                                M = l.slice(1),
                                g1 = {
                                    i: 127,
                                    j: 126,
                                    f: 125,
                                    d: 124,
                                }
                            for (S.push(M.length), y = 0; y < M.length; ++y) S.push(g1[M[y]])
                            N == "v" ? S.push(0) : (S = S.concat([1, g1[N]])), (S[1] = S.length - 2)
                            var b = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0].concat(S, [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0])),
                                v12 = new WebAssembly.Module(b)
                            return new WebAssembly.Instance(v12, {
                                e: {
                                    f: o,
                                },
                            }).exports.f
                        })(n, t)
                        q.set(a, _)
                    }
                    return ne.set(n, a), a
                }
                var fe,
                    rn = function (n) {},
                    pe = e.dynamicLibraries || []
                e.wasmBinary && (fe = e.wasmBinary)
                var ge,
                    sn = e.noExitRuntime || !0
                function I(n, t, r, s) {
                    switch (((r = r || "i8").charAt(r.length - 1) === "*" && (r = "i32"), r)) {
                        case "i1":
                        case "i8":
                            z[n >> 0] = t
                            break
                        case "i16":
                            we1[n >> 1] = t
                            break
                        case "i32":
                            h[n >> 2] = t
                            break
                        case "i64":
                            ;(O1 = [t >>> 0, ((A = t), +Math.abs(A) >= 1 ? (A > 0 ? (0 | Math.min(+Math.floor(A / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0) : 0)]), (h[n >> 2] = O1[0]), (h[(n + 4) >> 2] = O1[1])
                            break
                        case "float":
                            Be[n >> 2] = t
                            break
                        case "double":
                            Ke[n >> 3] = t
                            break
                        default:
                            $("invalid type for setValue: " + r)
                    }
                }
                function getValue(n, t, r) {
                    switch (((t = t || "i8").charAt(t.length - 1) === "*" && (t = "i32"), t)) {
                        case "i1":
                        case "i8":
                            return z[n >> 0]
                        case "i16":
                            return we1[n >> 1]
                        case "i32":
                        case "i64":
                            return h[n >> 2]
                        case "float":
                            return Be[n >> 2]
                        case "double":
                            return Ke[n >> 3]
                        default:
                            $("invalid type for getValue: " + t)
                    }
                    return null
                }
                typeof WebAssembly != "object" && $("no native wasm support detected")
                var Ge = !1
                function R(n, t) {
                    n || $("Assertion failed: " + t)
                }
                var an = 1,
                    he,
                    z,
                    U,
                    we1,
                    h,
                    Be,
                    Ke,
                    gt = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0
                function ht(n, t, r) {
                    for (var s = t + r, a = t; n[a] && !(a >= s); ) ++a
                    if (a - t > 16 && n.subarray && gt) return gt.decode(n.subarray(t, a))
                    for (var _ = ""; t < a; ) {
                        var i158 = n[t++]
                        if (128 & i158) {
                            var o = 63 & n[t++]
                            if ((224 & i158) != 192) {
                                var l = 63 & n[t++]
                                if ((i158 = (240 & i158) == 224 ? ((15 & i158) << 12) | (o << 6) | l : ((7 & i158) << 18) | (o << 12) | (l << 6) | (63 & n[t++])) < 65536) _ += String.fromCharCode(i158)
                                else {
                                    var w = i158 - 65536
                                    _ += String.fromCharCode(55296 | (w >> 10), 56320 | (1023 & w))
                                }
                            } else _ += String.fromCharCode(((31 & i158) << 6) | o)
                        } else _ += String.fromCharCode(i158)
                    }
                    return _
                }
                function UTF8ToString(n, t) {
                    return n ? ht(U, n, t) : ""
                }
                function wt(n, t, r, s) {
                    if (!(s > 0)) return 0
                    for (var a = r, _ = r + s - 1, i159 = 0; i159 < n.length; ++i159) {
                        var o = n.charCodeAt(i159)
                        if ((o >= 55296 && o <= 57343 && (o = (65536 + ((1023 & o) << 10)) | (1023 & n.charCodeAt(++i159))), o <= 127)) {
                            if (r >= _) break
                            t[r++] = o
                        } else if (o <= 2047) {
                            if (r + 1 >= _) break
                            ;(t[r++] = 192 | (o >> 6)), (t[r++] = 128 | (63 & o))
                        } else if (o <= 65535) {
                            if (r + 2 >= _) break
                            ;(t[r++] = 224 | (o >> 12)), (t[r++] = 128 | ((o >> 6) & 63)), (t[r++] = 128 | (63 & o))
                        } else {
                            if (r + 3 >= _) break
                            ;(t[r++] = 240 | (o >> 18)), (t[r++] = 128 | ((o >> 12) & 63)), (t[r++] = 128 | ((o >> 6) & 63)), (t[r++] = 128 | (63 & o))
                        }
                    }
                    return (t[r] = 0), r - a
                }
                function stringToUTF8(n, t, r) {
                    return wt(n, U, t, r)
                }
                function lengthBytesUTF8(n) {
                    for (var t = 0, r = 0; r < n.length; ++r) {
                        var s = n.charCodeAt(r)
                        s >= 55296 && s <= 57343 && (s = (65536 + ((1023 & s) << 10)) | (1023 & n.charCodeAt(++r))), s <= 127 ? ++t : (t += s <= 2047 ? 2 : s <= 65535 ? 3 : 4)
                    }
                    return t
                }
                function yt(n) {
                    var t = lengthBytesUTF8(n) + 1,
                        r = Te(t)
                    return wt(n, z, r, t), r
                }
                function bt(n) {
                    ;(he = n), (e.HEAP8 = z = new Int8Array(n)), (e.HEAP16 = we1 = new Int16Array(n)), (e.HEAP32 = h = new Int32Array(n)), (e.HEAPU8 = U = new Uint8Array(n)), (e.HEAPU16 = new Uint16Array(n)), (e.HEAPU32 = new Uint32Array(n)), (e.HEAPF32 = Be = new Float32Array(n)), (e.HEAPF64 = Ke = new Float64Array(n))
                }
                var vt1 = e.INITIAL_MEMORY || 33554432
                ;(ge = e.wasmMemory
                    ? e.wasmMemory
                    : new WebAssembly.Memory({
                          initial: vt1 / 65536,
                          maximum: 32768,
                      })) && (he = ge.buffer),
                    (vt1 = he.byteLength),
                    bt(he)
                var q = new WebAssembly.Table({
                        initial: 20,
                        element: "anyfunc",
                    }),
                    Et = [],
                    Xe = [],
                    _n = [],
                    St = [],
                    Je = !1,
                    X = 0,
                    Qe = null,
                    ye = null
                function At(n) {
                    X++, e.monitorRunDependencies && e.monitorRunDependencies(X)
                }
                function It(n) {
                    if ((X--, e.monitorRunDependencies && e.monitorRunDependencies(X), X == 0 && (Qe !== null && (clearInterval(Qe), (Qe = null)), ye))) {
                        var t = ye
                        ;(ye = null), t()
                    }
                }
                function $(n) {
                    console.log(n.stack)
                    throw (e.onAbort && e.onAbort(n), te((n += "")), (Ge = !0), (n = "abort(" + n + "). Build with -s ASSERTIONS=1 for more info."), new WebAssembly.RuntimeError(n))
                }
                ;(e.preloadedImages = {}), (e.preloadedAudios = {}), (e.preloadedWasm = {})
                var T,
                    A,
                    O1,
                    on2 = "data:application/octet-stream;base64,"
                function xt1(n) {
                    return n.startsWith(on2)
                }
                function Nt(n) {
                    return n.startsWith("file://")
                }
                function Pt1(n) {
                    try {
                        if (n == T && fe) return new Uint8Array(fe)
                        if (ee) return ee(n)
                        throw "both async and sync fetching of the wasm failed"
                    } catch (t) {
                        $(t)
                    }
                }
                xt1((T = "tree-sitter.wasm")) ||
                    (T = (function (n) {
                        return e.locateFile ? e.locateFile(n, j17) : j17 + n
                    })(T))
                var W = {},
                    ke1 = {
                        get: function (n, t) {
                            return (
                                W[t] ||
                                    (W[t] = new WebAssembly.Global({
                                        value: "i32",
                                        mutable: !0,
                                    })),
                                W[t]
                            )
                        },
                    }
                function Fe(n) {
                    for (; n.length > 0; ) {
                        var t = n.shift()
                        if (typeof t != "function") {
                            var r = t.func
                            typeof r == "number" ? (t.arg === void 0 ? q.get(r)() : q.get(r)(t.arg)) : r(t.arg === void 0 ? null : t.arg)
                        } else t(e)
                    }
                }
                function kt(n) {
                    var t = 0
                    function r() {
                        for (var m10 = 0, y = 1; ; ) {
                            var S = n[t++]
                            if (((m10 += (127 & S) * y), (y *= 128), !(128 & S))) break
                        }
                        return m10
                    }
                    if (n instanceof WebAssembly.Module) {
                        var s = WebAssembly.Module.customSections(n, "dylink")
                        R(s.length != 0, "need dylink section"), (n = new Int8Array(s[0]))
                    } else R(new Uint32Array(new Uint8Array(n.subarray(0, 24)).buffer)[0] == 1836278016, "need to see wasm magic number"), R(n[8] === 0, "need the dylink section to be first"), (t = 9), r(), R(n[t] === 6), R(n[++t] === "d".charCodeAt(0)), R(n[++t] === "y".charCodeAt(0)), R(n[++t] === "l".charCodeAt(0)), R(n[++t] === "i".charCodeAt(0)), R(n[++t] === "n".charCodeAt(0)), R(n[++t] === "k".charCodeAt(0)), t++
                    var a = {}
                    ;(a.memorySize = r()), (a.memoryAlign = r()), (a.tableSize = r()), (a.tableAlign = r())
                    var _ = r()
                    a.neededDynlibs = []
                    for (var i160 = 0; i160 < _; ++i160) {
                        var o = r(),
                            l = n.subarray(t, t + o)
                        t += o
                        var w = ht(l, 0)
                        a.neededDynlibs.push(w)
                    }
                    return a
                }
                var un = 0
                function Ft() {
                    return sn || un > 0
                }
                function Ct(n) {
                    return n.indexOf("dynCall_") == 0 || ["stackAlloc", "stackSave", "stackRestore"].includes(n) ? n : "_" + n
                }
                function Ye1(n, t) {
                    for (var r in n)
                        if (n.hasOwnProperty(r)) {
                            Z1.hasOwnProperty(r) || (Z1[r] = n[r])
                            var s = Ct(r)
                            e.hasOwnProperty(s) || (e[s] = n[r])
                        }
                }
                var J = {
                    nextHandle: 1,
                    loadedLibs: {},
                    loadedLibNames: {},
                }
                function ln(n, t, r) {
                    return n.includes("j")
                        ? (function (s, a, _) {
                              var i161 = e["dynCall_" + s]
                              return _ && _.length ? i161.apply(null, [a].concat(_)) : i161.call(null, a)
                          })(n, t, r)
                        : q.get(t).apply(null, r)
                }
                var Ce1 = 5251072
                function cn(n) {
                    return ["__cpp_exception", "__wasm_apply_data_relocs", "__dso_handle", "__set_stack_limits"].includes(n)
                }
                function Mt(n, t) {
                    var r = {}
                    for (var s in n) {
                        var a = n[s]
                        typeof a == "object" && (a = a.value), typeof a == "number" && (a += t), (r[s] = a)
                    }
                    return (
                        (function (_) {
                            for (var i162 in _)
                                if (!cn(i162)) {
                                    var o = !1,
                                        l = _[i162]
                                    i162.startsWith("orig$") && ((i162 = i162.split("$")[1]), (o = !0)),
                                        W[i162] ||
                                            (W[i162] = new WebAssembly.Global({
                                                value: "i32",
                                                mutable: !0,
                                            })),
                                        (o || W[i162].value == 0) && (typeof l == "function" ? (W[i162].value = pt(l)) : typeof l == "number" ? (W[i162].value = l) : te("unhandled export type for `" + i162 + "`: " + typeof l))
                                }
                        })(r),
                        r
                    )
                }
                function qt(n, t) {
                    var r, s
                    return (
                        t && (r = Z1["orig$" + n]),
                        r || (r = Z1[n]),
                        r || (r = e[Ct(n)]),
                        !r &&
                            n.startsWith("invoke_") &&
                            ((s = n.split("_")[1]),
                            (r = function () {
                                var a = Zt()
                                try {
                                    return ln(s, arguments[0], Array.prototype.slice.call(arguments, 1))
                                } catch (_) {
                                    if ((Dt(a), _ !== _ + 0 && _ !== "longjmp")) throw _
                                    zt(1, 0)
                                }
                            })),
                        r
                    )
                }
                function et(n, t) {
                    var r = kt(n)
                    function s() {
                        var a = Math.pow(2, r.memoryAlign)
                        a = Math.max(a, dt)
                        var _,
                            i163,
                            o,
                            l =
                                ((_ = (function (b) {
                                    if (Je) return nt(b)
                                    var v13 = Ce1,
                                        c = (v13 + b + 15) & -16
                                    return (Ce1 = c), (W.__heap_base.value = c), v13
                                })(r.memorySize + a)),
                                (i163 = a) || (i163 = dt),
                                Math.ceil(_ / i163) * i163),
                            w = q.length
                        q.grow(r.tableSize)
                        for (var m11 = l; m11 < l + r.memorySize; m11++) z[m11] = 0
                        for (m11 = w; m11 < w + r.tableSize; m11++) q.set(m11, null)
                        var y = new Proxy(
                                {},
                                {
                                    get: function (b, v14) {
                                        switch (v14) {
                                            case "__memory_base":
                                                return l
                                            case "__table_base":
                                                return w
                                        }
                                        if (v14 in Z1) return Z1[v14]
                                        var c
                                        return (
                                            v14 in b ||
                                                (b[v14] = function () {
                                                    return (
                                                        c ||
                                                            (c = (function (x) {
                                                                var oe = qt(x, !1)
                                                                return oe || (oe = o[x]), oe
                                                            })(v14)),
                                                        c.apply(null, arguments)
                                                    )
                                                }),
                                            b[v14]
                                        )
                                    },
                                }
                            ),
                            S = {
                                "GOT.mem": new Proxy({}, ke1),
                                "GOT.func": new Proxy({}, ke1),
                                env: y,
                                wasi_snapshot_preview1: y,
                            }
                        function N(b) {
                            for (var v15 = 0; v15 < r.tableSize; v15++) {
                                var c = q.get(w + v15)
                                c && ne.set(c, w + v15)
                            }
                            ;(o = Mt(b.exports, l)), t.allowUndefined || qe()
                            var x = o.__wasm_call_ctors
                            return x || (x = o.__post_instantiate), x && (Je ? x() : Xe.push(x)), o
                        }
                        if (t.loadAsync) {
                            if (n instanceof WebAssembly.Module) {
                                var M = new WebAssembly.Instance(n, S)
                                return Promise.resolve(N(M))
                            }
                            return WebAssembly.instantiate(n, S).then(function (b) {
                                return N(b.instance)
                            })
                        }
                        var g2 = n instanceof WebAssembly.Module ? n : new WebAssembly.Module(n)
                        return N((M = new WebAssembly.Instance(g2, S)))
                    }
                    return t.loadAsync
                        ? r.neededDynlibs
                              .reduce(function (a, _) {
                                  return a.then(function () {
                                      return Me(_, t)
                                  })
                              }, Promise.resolve())
                              .then(function () {
                                  return s()
                              })
                        : (r.neededDynlibs.forEach(function (a) {
                              Me(a, t)
                          }),
                          s())
                }
                function Me(n, t) {
                    n != "__main__" ||
                        J.loadedLibNames[n] ||
                        ((J.loadedLibs[-1] = {
                            refcount: 1 / 0,
                            name: "__main__",
                            module: e.asm,
                            global: !0,
                        }),
                        (J.loadedLibNames.__main__ = -1)),
                        (t = t || {
                            global: !0,
                            nodelete: !0,
                        })
                    var r,
                        s = J.loadedLibNames[n]
                    if (s) return (r = J.loadedLibs[s]), t.global && !r.global && ((r.global = !0), r.module !== "loading" && Ye1(r.module)), t.nodelete && r.refcount !== 1 / 0 && (r.refcount = 1 / 0), r.refcount++, t.loadAsync ? Promise.resolve(s) : s
                    function a(o) {
                        if (t.fs) {
                            var l = t.fs.readFile(o, {
                                encoding: "binary",
                            })
                            return l instanceof Uint8Array || (l = new Uint8Array(l)), t.loadAsync ? Promise.resolve(l) : l
                        }
                        return t.loadAsync
                            ? ((w = o),
                              fetch(w, {
                                  credentials: "same-origin",
                              })
                                  .then(function (m12) {
                                      if (!m12.ok) throw "failed to load binary file at '" + w + "'"
                                      return m12.arrayBuffer()
                                  })
                                  .then(function (m13) {
                                      return new Uint8Array(m13)
                                  }))
                            : ee(o)
                        var w
                    }
                    function _() {
                        if (e.preloadedWasm !== void 0 && e.preloadedWasm[n] !== void 0) {
                            var o = e.preloadedWasm[n]
                            return t.loadAsync ? Promise.resolve(o) : o
                        }
                        return t.loadAsync
                            ? a(n).then(function (l) {
                                  return et(l, t)
                              })
                            : et(a(n), t)
                    }
                    function i164(o) {
                        r.global && Ye1(o), (r.module = o)
                    }
                    return (
                        (s = J.nextHandle++),
                        (r = {
                            refcount: t.nodelete ? 1 / 0 : 1,
                            name: n,
                            module: "loading",
                            global: t.global,
                        }),
                        (J.loadedLibNames[n] = s),
                        (J.loadedLibs[s] = r),
                        t.loadAsync
                            ? _().then(function (o) {
                                  return i164(o), s
                              })
                            : (i164(_()), s)
                    )
                }
                function qe() {
                    for (var n in W)
                        if (W[n].value == 0) {
                            var t = qt(n, !0)
                            typeof t == "function" ? (W[n].value = pt(t, t.sig)) : typeof t == "number" ? (W[n].value = t) : R(!1, "bad export type for `" + n + "`: " + typeof t)
                        }
                }
                e.___heap_base = Ce1
                var Rt,
                    mn = new WebAssembly.Global(
                        {
                            value: "i32",
                            mutable: !0,
                        },
                        5251072
                    )
                function tt() {
                    $()
                }
                ;(e._abort = tt),
                    (tt.sig = "v"),
                    (Rt = Ie
                        ? function () {
                              var n = process1.hrtime()
                              return 1e3 * n[0] + n[1] / 1e6
                          }
                        : typeof dateNow < "u"
                        ? dateNow
                        : function () {
                              return performance.now()
                          })
                var dn = !0
                function Tt1(n, t) {
                    var r, s
                    if (n === 0) r = Date.now()
                    else {
                        if ((n !== 1 && n !== 4) || !dn) return (s = 28), (h[$t() >> 2] = s), -1
                        r = Rt()
                    }
                    return (h[t >> 2] = (r / 1e3) | 0), (h[(t + 4) >> 2] = ((r % 1e3) * 1e3 * 1e3) | 0), 0
                }
                function fn(n) {
                    try {
                        return ge.grow((n - he.byteLength + 65535) >>> 16), bt(ge.buffer), 1
                    } catch {}
                }
                function Wt(n) {
                    Gt(n)
                }
                ;(Tt1.sig = "iii"), (Wt.sig = "vi")
                var se = {
                    mappings: {},
                    DEFAULT_POLLMASK: 5,
                    umask: 511,
                    calculateAt: function (n, t, r) {
                        if (t[0] === "/") return t
                        var s
                        if (n === -100) s = FS.cwd()
                        else {
                            var a = FS.getStream(n)
                            if (!a) throw new FS.ErrnoError(8)
                            s = a.path
                        }
                        if (t.length == 0) {
                            if (!r) throw new FS.ErrnoError(44)
                            return s
                        }
                        return PATH.join2(s, t)
                    },
                    doStat: function (n, t, r) {
                        try {
                            var s = n(t)
                        } catch (a) {
                            if (a && a.node && PATH.normalize(t) !== PATH.normalize(FS.getPath(a.node))) return -54
                            throw a
                        }
                        return (h[r >> 2] = s.dev), (h[(r + 4) >> 2] = 0), (h[(r + 8) >> 2] = s.ino), (h[(r + 12) >> 2] = s.mode), (h[(r + 16) >> 2] = s.nlink), (h[(r + 20) >> 2] = s.uid), (h[(r + 24) >> 2] = s.gid), (h[(r + 28) >> 2] = s.rdev), (h[(r + 32) >> 2] = 0), (O1 = [s.size >>> 0, ((A = s.size), +Math.abs(A) >= 1 ? (A > 0 ? (0 | Math.min(+Math.floor(A / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0) : 0)]), (h[(r + 40) >> 2] = O1[0]), (h[(r + 44) >> 2] = O1[1]), (h[(r + 48) >> 2] = 4096), (h[(r + 52) >> 2] = s.blocks), (h[(r + 56) >> 2] = (s.atime.getTime() / 1e3) | 0), (h[(r + 60) >> 2] = 0), (h[(r + 64) >> 2] = (s.mtime.getTime() / 1e3) | 0), (h[(r + 68) >> 2] = 0), (h[(r + 72) >> 2] = (s.ctime.getTime() / 1e3) | 0), (h[(r + 76) >> 2] = 0), (O1 = [s.ino >>> 0, ((A = s.ino), +Math.abs(A) >= 1 ? (A > 0 ? (0 | Math.min(+Math.floor(A / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0) : 0)]), (h[(r + 80) >> 2] = O1[0]), (h[(r + 84) >> 2] = O1[1]), 0
                    },
                    doMsync: function (n, t, r, s, a) {
                        var _ = U.slice(n, n + r)
                        FS.msync(t, _, a, r, s)
                    },
                    doMkdir: function (n, t) {
                        return (n = PATH.normalize(n))[n.length - 1] === "/" && (n = n.substr(0, n.length - 1)), FS.mkdir(n, t, 0), 0
                    },
                    doMknod: function (n, t, r) {
                        switch (61440 & t) {
                            case 32768:
                            case 8192:
                            case 24576:
                            case 4096:
                            case 49152:
                                break
                            default:
                                return -28
                        }
                        return FS.mknod(n, t, r), 0
                    },
                    doReadlink: function (n, t, r) {
                        if (r <= 0) return -28
                        var s = FS.readlink(n),
                            a = Math.min(r, lengthBytesUTF8(s)),
                            _ = z[t + a]
                        return stringToUTF8(s, t, r + 1), (z[t + a] = _), a
                    },
                    doAccess: function (n, t) {
                        if (-8 & t) return -28
                        var r
                        if (
                            !(r = FS.lookupPath(n, {
                                follow: !0,
                            }).node)
                        )
                            return -44
                        var s = ""
                        return 4 & t && (s += "r"), 2 & t && (s += "w"), 1 & t && (s += "x"), s && FS.nodePermissions(r, s) ? -2 : 0
                    },
                    doDup: function (n, t, r) {
                        var s = FS.getStream(r)
                        return s && FS.close(s), FS.open(n, t, 0, r, r).fd
                    },
                    doReadv: function (n, t, r, s) {
                        for (var a = 0, _ = 0; _ < r; _++) {
                            var i165 = h[(t + 8 * _) >> 2],
                                o = h[(t + (8 * _ + 4)) >> 2],
                                l = FS.read(n, z, i165, o, s)
                            if (l < 0) return -1
                            if (((a += l), l < o)) break
                        }
                        return a
                    },
                    doWritev: function (n, t, r, s) {
                        for (var a = 0, _ = 0; _ < r; _++) {
                            var i166 = h[(t + 8 * _) >> 2],
                                o = h[(t + (8 * _ + 4)) >> 2],
                                l = FS.write(n, z, i166, o, s)
                            if (l < 0) return -1
                            a += l
                        }
                        return a
                    },
                    varargs: void 0,
                    get: function () {
                        return (se.varargs += 4), h[(se.varargs - 4) >> 2]
                    },
                    getStr: function (n) {
                        return UTF8ToString(n)
                    },
                    getStreamFromFD: function (n) {
                        var t = FS.getStream(n)
                        if (!t) throw new FS.ErrnoError(8)
                        return t
                    },
                    get64: function (n, t) {
                        return n
                    },
                }
                function Lt(n) {
                    try {
                        var t = se.getStreamFromFD(n)
                        return FS.close(t), 0
                    } catch (r) {
                        return (typeof FS < "u" && r instanceof FS.ErrnoError) || $(r), r.errno
                    }
                }
                function Ot(n, t, r, s) {
                    try {
                        var a = se.getStreamFromFD(n),
                            _ = se.doWritev(a, t, r)
                        return (h[s >> 2] = _), 0
                    } catch (i167) {
                        return (typeof FS < "u" && i167 instanceof FS.ErrnoError) || $(i167), i167.errno
                    }
                }
                function jt(n) {
                    rn(n)
                }
                ;(Lt.sig = "ii"), (Ot.sig = "iiiii"), (jt.sig = "vi")
                var Re,
                    Z1 = {
                        __heap_base: Ce1,
                        __indirect_function_table: q,
                        __memory_base: 1024,
                        __stack_pointer: mn,
                        __table_base: 1,
                        abort: tt,
                        clock_gettime: Tt1,
                        emscripten_memcpy_big: function (n, t, r) {
                            U.copyWithin(n, t, t + r)
                        },
                        emscripten_resize_heap: function (n) {
                            var t,
                                r,
                                s = U.length
                            if ((n >>>= 0) > 2147483648) return !1
                            for (var a = 1; a <= 4; a *= 2) {
                                var _ = s * (1 + 0.2 / a)
                                if (((_ = Math.min(_, n + 100663296)), fn(Math.min(2147483648, ((t = Math.max(n, _)) % (r = 65536) > 0 && (t += r - (t % r)), t))))) return !0
                            }
                            return !1
                        },
                        exit: Wt,
                        fd_close: Lt,
                        fd_seek: function (n, t, r, s, a) {
                            try {
                                var _ = se.getStreamFromFD(n),
                                    i168 = 4294967296 * r + (t >>> 0)
                                return i168 <= -9007199254740992 || i168 >= 9007199254740992 ? -61 : (FS.llseek(_, i168, s), (O1 = [_.position >>> 0, ((A = _.position), +Math.abs(A) >= 1 ? (A > 0 ? (0 | Math.min(+Math.floor(A / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((A - +(~~A >>> 0)) / 4294967296) >>> 0) : 0)]), (h[a >> 2] = O1[0]), (h[(a + 4) >> 2] = O1[1]), _.getdents && i168 === 0 && s === 0 && (_.getdents = null), 0)
                            } catch (o) {
                                return (typeof FS < "u" && o instanceof FS.ErrnoError) || $(o), o.errno
                            }
                        },
                        fd_write: Ot,
                        memory: ge,
                        setTempRet0: jt,
                        tree_sitter_log_callback: function (n, t) {
                            if (ie) {
                                let r = UTF8ToString(t)
                                ie(r, n !== 0)
                            }
                        },
                        tree_sitter_parse_callback: function (n, t, r, s, a) {
                            var _ = _e1(t, {
                                row: r,
                                column: s,
                            })
                            typeof _ == "string"
                                ? (I(a, _.length, "i32"),
                                  (function (i169, o, l) {
                                      if ((l === void 0 && (l = 2147483647), l < 2)) return 0
                                      for (var w = (l -= 2) < 2 * i169.length ? l / 2 : i169.length, m14 = 0; m14 < w; ++m14) {
                                          var y = i169.charCodeAt(m14)
                                          ;(we1[o >> 1] = y), (o += 2)
                                      }
                                      we1[o >> 1] = 0
                                  })(_, n, 10240))
                                : I(a, 0, "i32")
                        },
                    },
                    nt =
                        ((function () {
                            var n = {
                                env: Z1,
                                wasi_snapshot_preview1: Z1,
                                "GOT.mem": new Proxy(Z1, ke1),
                                "GOT.func": new Proxy(Z1, ke1),
                            }
                            function t(a, _) {
                                var i170 = a.exports
                                ;(i170 = Mt(i170, 1024)), (e.asm = i170)
                                var o,
                                    l = kt(_)
                                l.neededDynlibs && (pe = l.neededDynlibs.concat(pe)), Ye1(i170), (o = e.asm.__wasm_call_ctors), Xe.unshift(o), It()
                            }
                            function r(a) {
                                t(a.instance, a.module)
                            }
                            function s(a) {
                                return (function () {
                                    if (!fe && (xe || Y1)) {
                                        if (typeof fetch == "function" && !Nt(T))
                                            return fetch(T, {
                                                credentials: "same-origin",
                                            })
                                                .then(function (_) {
                                                    if (!_.ok) throw "failed to load wasm binary file at '" + T + "'"
                                                    return _.arrayBuffer()
                                                })
                                                .catch(function () {
                                                    return Pt1(T)
                                                })
                                        if (ze)
                                            return new Promise(function (_, i171) {
                                                ze(
                                                    T,
                                                    function (o) {
                                                        _(new Uint8Array(o))
                                                    },
                                                    i171
                                                )
                                            })
                                    }
                                    return Promise.resolve().then(function () {
                                        return Pt1(T)
                                    })
                                })()
                                    .then(function (_) {
                                        return WebAssembly.instantiate(_, n)
                                    })
                                    .then(a, function (_) {
                                        te("failed to asynchronously prepare wasm: " + _.stack), $(_)
                                    })
                            }
                            if ((At(), e.instantiateWasm))
                                try {
                                    return e.instantiateWasm(n, t)
                                } catch (a1) {
                                    return te("Module.instantiateWasm callback failed with error: " + a1), !1
                                }
                            fe || typeof WebAssembly.instantiateStreaming != "function" || xt1(T) || Nt(T) || typeof fetch != "function"
                                ? s(r)
                                : fetch(T, {
                                      credentials: "same-origin",
                                  }).then(function (a) {
                                      return WebAssembly.instantiateStreaming(a, n).then(r, async function (_) {
                                          try {
                                              return te("wasm streaming compile failed: " + _), te("falling back to ArrayBuffer instantiation"), s(r)
                                          } catch (error) {
                                              console.debug(`error is:`, error)
                                          }
                                      })
                                  })
                        })(),
                        (e.___wasm_call_ctors = function () {
                            return (e.___wasm_call_ctors = e.asm.__wasm_call_ctors).apply(null, arguments)
                        }),
                        (e._malloc = function () {
                            return (nt = e._malloc = e.asm.malloc).apply(null, arguments)
                        })),
                    $t =
                        ((e._calloc = function () {
                            return (e._calloc = e.asm.calloc).apply(null, arguments)
                        }),
                        (e._realloc = function () {
                            return (e._realloc = e.asm.realloc).apply(null, arguments)
                        }),
                        (e._free = function () {
                            return (e._free = e.asm.free).apply(null, arguments)
                        }),
                        (e._ts_language_symbol_count = function () {
                            return (e._ts_language_symbol_count = e.asm.ts_language_symbol_count).apply(null, arguments)
                        }),
                        (e._ts_language_version = function () {
                            return (e._ts_language_version = e.asm.ts_language_version).apply(null, arguments)
                        }),
                        (e._ts_language_field_count = function () {
                            return (e._ts_language_field_count = e.asm.ts_language_field_count).apply(null, arguments)
                        }),
                        (e._ts_language_symbol_name = function () {
                            return (e._ts_language_symbol_name = e.asm.ts_language_symbol_name).apply(null, arguments)
                        }),
                        (e._ts_language_symbol_for_name = function () {
                            return (e._ts_language_symbol_for_name = e.asm.ts_language_symbol_for_name).apply(null, arguments)
                        }),
                        (e._ts_language_symbol_type = function () {
                            return (e._ts_language_symbol_type = e.asm.ts_language_symbol_type).apply(null, arguments)
                        }),
                        (e._ts_language_field_name_for_id = function () {
                            return (e._ts_language_field_name_for_id = e.asm.ts_language_field_name_for_id).apply(null, arguments)
                        }),
                        (e._memcpy = function () {
                            return (e._memcpy = e.asm.memcpy).apply(null, arguments)
                        }),
                        (e._ts_parser_delete = function () {
                            return (e._ts_parser_delete = e.asm.ts_parser_delete).apply(null, arguments)
                        }),
                        (e._ts_parser_reset = function () {
                            return (e._ts_parser_reset = e.asm.ts_parser_reset).apply(null, arguments)
                        }),
                        (e._ts_parser_set_language = function () {
                            return (e._ts_parser_set_language = e.asm.ts_parser_set_language).apply(null, arguments)
                        }),
                        (e._ts_parser_timeout_micros = function () {
                            return (e._ts_parser_timeout_micros = e.asm.ts_parser_timeout_micros).apply(null, arguments)
                        }),
                        (e._ts_parser_set_timeout_micros = function () {
                            return (e._ts_parser_set_timeout_micros = e.asm.ts_parser_set_timeout_micros).apply(null, arguments)
                        }),
                        (e._memmove = function () {
                            return (e._memmove = e.asm.memmove).apply(null, arguments)
                        }),
                        (e._memcmp = function () {
                            return (e._memcmp = e.asm.memcmp).apply(null, arguments)
                        }),
                        (e._ts_query_new = function () {
                            return (e._ts_query_new = e.asm.ts_query_new).apply(null, arguments)
                        }),
                        (e._ts_query_delete = function () {
                            return (e._ts_query_delete = e.asm.ts_query_delete).apply(null, arguments)
                        }),
                        (e._iswspace = function () {
                            return (e._iswspace = e.asm.iswspace).apply(null, arguments)
                        }),
                        (e._iswalnum = function () {
                            return (e._iswalnum = e.asm.iswalnum).apply(null, arguments)
                        }),
                        (e._ts_query_pattern_count = function () {
                            return (e._ts_query_pattern_count = e.asm.ts_query_pattern_count).apply(null, arguments)
                        }),
                        (e._ts_query_capture_count = function () {
                            return (e._ts_query_capture_count = e.asm.ts_query_capture_count).apply(null, arguments)
                        }),
                        (e._ts_query_string_count = function () {
                            return (e._ts_query_string_count = e.asm.ts_query_string_count).apply(null, arguments)
                        }),
                        (e._ts_query_capture_name_for_id = function () {
                            return (e._ts_query_capture_name_for_id = e.asm.ts_query_capture_name_for_id).apply(null, arguments)
                        }),
                        (e._ts_query_string_value_for_id = function () {
                            return (e._ts_query_string_value_for_id = e.asm.ts_query_string_value_for_id).apply(null, arguments)
                        }),
                        (e._ts_query_predicates_for_pattern = function () {
                            return (e._ts_query_predicates_for_pattern = e.asm.ts_query_predicates_for_pattern).apply(null, arguments)
                        }),
                        (e._ts_tree_copy = function () {
                            return (e._ts_tree_copy = e.asm.ts_tree_copy).apply(null, arguments)
                        }),
                        (e._ts_tree_delete = function () {
                            return (e._ts_tree_delete = e.asm.ts_tree_delete).apply(null, arguments)
                        }),
                        (e._ts_init = function () {
                            return (e._ts_init = e.asm.ts_init).apply(null, arguments)
                        }),
                        (e._ts_parser_new_wasm = function () {
                            return (e._ts_parser_new_wasm = e.asm.ts_parser_new_wasm).apply(null, arguments)
                        }),
                        (e._ts_parser_enable_logger_wasm = function () {
                            return (e._ts_parser_enable_logger_wasm = e.asm.ts_parser_enable_logger_wasm).apply(null, arguments)
                        }),
                        (e._ts_parser_parse_wasm = function () {
                            return (e._ts_parser_parse_wasm = e.asm.ts_parser_parse_wasm).apply(null, arguments)
                        }),
                        (e._ts_language_type_is_named_wasm = function () {
                            return (e._ts_language_type_is_named_wasm = e.asm.ts_language_type_is_named_wasm).apply(null, arguments)
                        }),
                        (e._ts_language_type_is_visible_wasm = function () {
                            return (e._ts_language_type_is_visible_wasm = e.asm.ts_language_type_is_visible_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_root_node_wasm = function () {
                            return (e._ts_tree_root_node_wasm = e.asm.ts_tree_root_node_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_edit_wasm = function () {
                            return (e._ts_tree_edit_wasm = e.asm.ts_tree_edit_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_get_changed_ranges_wasm = function () {
                            return (e._ts_tree_get_changed_ranges_wasm = e.asm.ts_tree_get_changed_ranges_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_new_wasm = function () {
                            return (e._ts_tree_cursor_new_wasm = e.asm.ts_tree_cursor_new_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_delete_wasm = function () {
                            return (e._ts_tree_cursor_delete_wasm = e.asm.ts_tree_cursor_delete_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_reset_wasm = function () {
                            return (e._ts_tree_cursor_reset_wasm = e.asm.ts_tree_cursor_reset_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_goto_first_child_wasm = function () {
                            return (e._ts_tree_cursor_goto_first_child_wasm = e.asm.ts_tree_cursor_goto_first_child_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_goto_next_sibling_wasm = function () {
                            return (e._ts_tree_cursor_goto_next_sibling_wasm = e.asm.ts_tree_cursor_goto_next_sibling_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_goto_parent_wasm = function () {
                            return (e._ts_tree_cursor_goto_parent_wasm = e.asm.ts_tree_cursor_goto_parent_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_current_node_type_id_wasm = function () {
                            return (e._ts_tree_cursor_current_node_type_id_wasm = e.asm.ts_tree_cursor_current_node_type_id_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_current_node_is_named_wasm = function () {
                            return (e._ts_tree_cursor_current_node_is_named_wasm = e.asm.ts_tree_cursor_current_node_is_named_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_current_node_is_missing_wasm = function () {
                            return (e._ts_tree_cursor_current_node_is_missing_wasm = e.asm.ts_tree_cursor_current_node_is_missing_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_current_node_id_wasm = function () {
                            return (e._ts_tree_cursor_current_node_id_wasm = e.asm.ts_tree_cursor_current_node_id_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_start_position_wasm = function () {
                            return (e._ts_tree_cursor_start_position_wasm = e.asm.ts_tree_cursor_start_position_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_end_position_wasm = function () {
                            return (e._ts_tree_cursor_end_position_wasm = e.asm.ts_tree_cursor_end_position_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_start_index_wasm = function () {
                            return (e._ts_tree_cursor_start_index_wasm = e.asm.ts_tree_cursor_start_index_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_end_index_wasm = function () {
                            return (e._ts_tree_cursor_end_index_wasm = e.asm.ts_tree_cursor_end_index_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_current_field_id_wasm = function () {
                            return (e._ts_tree_cursor_current_field_id_wasm = e.asm.ts_tree_cursor_current_field_id_wasm).apply(null, arguments)
                        }),
                        (e._ts_tree_cursor_current_node_wasm = function () {
                            return (e._ts_tree_cursor_current_node_wasm = e.asm.ts_tree_cursor_current_node_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_symbol_wasm = function () {
                            return (e._ts_node_symbol_wasm = e.asm.ts_node_symbol_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_child_count_wasm = function () {
                            return (e._ts_node_child_count_wasm = e.asm.ts_node_child_count_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_named_child_count_wasm = function () {
                            return (e._ts_node_named_child_count_wasm = e.asm.ts_node_named_child_count_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_child_wasm = function () {
                            return (e._ts_node_child_wasm = e.asm.ts_node_child_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_named_child_wasm = function () {
                            return (e._ts_node_named_child_wasm = e.asm.ts_node_named_child_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_child_by_field_id_wasm = function () {
                            return (e._ts_node_child_by_field_id_wasm = e.asm.ts_node_child_by_field_id_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_next_sibling_wasm = function () {
                            return (e._ts_node_next_sibling_wasm = e.asm.ts_node_next_sibling_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_prev_sibling_wasm = function () {
                            return (e._ts_node_prev_sibling_wasm = e.asm.ts_node_prev_sibling_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_next_named_sibling_wasm = function () {
                            return (e._ts_node_next_named_sibling_wasm = e.asm.ts_node_next_named_sibling_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_prev_named_sibling_wasm = function () {
                            return (e._ts_node_prev_named_sibling_wasm = e.asm.ts_node_prev_named_sibling_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_parent_wasm = function () {
                            return (e._ts_node_parent_wasm = e.asm.ts_node_parent_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_descendant_for_index_wasm = function () {
                            return (e._ts_node_descendant_for_index_wasm = e.asm.ts_node_descendant_for_index_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_named_descendant_for_index_wasm = function () {
                            return (e._ts_node_named_descendant_for_index_wasm = e.asm.ts_node_named_descendant_for_index_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_descendant_for_position_wasm = function () {
                            return (e._ts_node_descendant_for_position_wasm = e.asm.ts_node_descendant_for_position_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_named_descendant_for_position_wasm = function () {
                            return (e._ts_node_named_descendant_for_position_wasm = e.asm.ts_node_named_descendant_for_position_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_start_point_wasm = function () {
                            return (e._ts_node_start_point_wasm = e.asm.ts_node_start_point_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_end_point_wasm = function () {
                            return (e._ts_node_end_point_wasm = e.asm.ts_node_end_point_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_start_index_wasm = function () {
                            return (e._ts_node_start_index_wasm = e.asm.ts_node_start_index_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_end_index_wasm = function () {
                            return (e._ts_node_end_index_wasm = e.asm.ts_node_end_index_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_to_string_wasm = function () {
                            return (e._ts_node_to_string_wasm = e.asm.ts_node_to_string_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_children_wasm = function () {
                            return (e._ts_node_children_wasm = e.asm.ts_node_children_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_named_children_wasm = function () {
                            return (e._ts_node_named_children_wasm = e.asm.ts_node_named_children_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_descendants_of_type_wasm = function () {
                            return (e._ts_node_descendants_of_type_wasm = e.asm.ts_node_descendants_of_type_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_is_named_wasm = function () {
                            return (e._ts_node_is_named_wasm = e.asm.ts_node_is_named_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_has_changes_wasm = function () {
                            return (e._ts_node_has_changes_wasm = e.asm.ts_node_has_changes_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_has_error_wasm = function () {
                            return (e._ts_node_has_error_wasm = e.asm.ts_node_has_error_wasm).apply(null, arguments)
                        }),
                        (e._ts_node_is_missing_wasm = function () {
                            return (e._ts_node_is_missing_wasm = e.asm.ts_node_is_missing_wasm).apply(null, arguments)
                        }),
                        (e._ts_query_matches_wasm = function () {
                            return (e._ts_query_matches_wasm = e.asm.ts_query_matches_wasm).apply(null, arguments)
                        }),
                        (e._ts_query_captures_wasm = function () {
                            return (e._ts_query_captures_wasm = e.asm.ts_query_captures_wasm).apply(null, arguments)
                        }),
                        (e._iswdigit = function () {
                            return (e._iswdigit = e.asm.iswdigit).apply(null, arguments)
                        }),
                        (e._iswalpha = function () {
                            return (e._iswalpha = e.asm.iswalpha).apply(null, arguments)
                        }),
                        (e._iswlower = function () {
                            return (e._iswlower = e.asm.iswlower).apply(null, arguments)
                        }),
                        (e._towupper = function () {
                            return (e._towupper = e.asm.towupper).apply(null, arguments)
                        }),
                        (e.___errno_location = function () {
                            return ($t = e.___errno_location = e.asm.__errno_location).apply(null, arguments)
                        })),
                    Zt =
                        ((e._memchr = function () {
                            return (e._memchr = e.asm.memchr).apply(null, arguments)
                        }),
                        (e._strlen = function () {
                            return (e._strlen = e.asm.strlen).apply(null, arguments)
                        }),
                        (e.stackSave = function () {
                            return (Zt = e.stackSave = e.asm.stackSave).apply(null, arguments)
                        })),
                    Dt = (e.stackRestore = function () {
                        return (Dt = e.stackRestore = e.asm.stackRestore).apply(null, arguments)
                    }),
                    Te = (e.stackAlloc = function () {
                        return (Te = e.stackAlloc = e.asm.stackAlloc).apply(null, arguments)
                    }),
                    zt = (e._setThrew = function () {
                        return (zt = e._setThrew = e.asm.setThrew).apply(null, arguments)
                    })
                ;(e.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev = function () {
                    return (e.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev = e.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev).apply(null, arguments)
                }),
                    (e.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm = function () {
                        return (e.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm = e.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm).apply(null, arguments)
                    }),
                    (e.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm = function () {
                        return (e.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm = e.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm).apply(null, arguments)
                    }),
                    (e.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm = function () {
                        return (e.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm = e.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm).apply(null, arguments)
                    }),
                    (e.__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm = function () {
                        return (e.__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm = e.asm._ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm).apply(null, arguments)
                    }),
                    (e.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc = function () {
                        return (e.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc = e.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc).apply(null, arguments)
                    }),
                    (e.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev = function () {
                        return (e.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev = e.asm._ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev).apply(null, arguments)
                    }),
                    (e.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw = function () {
                        return (e.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw = e.asm._ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw).apply(null, arguments)
                    }),
                    (e.__Znwm = function () {
                        return (e.__Znwm = e.asm._Znwm).apply(null, arguments)
                    }),
                    (e.__ZdlPv = function () {
                        return (e.__ZdlPv = e.asm._ZdlPv).apply(null, arguments)
                    }),
                    (e.dynCall_jiji = function () {
                        return (e.dynCall_jiji = e.asm.dynCall_jiji).apply(null, arguments)
                    }),
                    (e._orig$ts_parser_timeout_micros = function () {
                        return (e._orig$ts_parser_timeout_micros = e.asm.orig$ts_parser_timeout_micros).apply(null, arguments)
                    }),
                    (e._orig$ts_parser_set_timeout_micros = function () {
                        return (e._orig$ts_parser_set_timeout_micros = e.asm.orig$ts_parser_set_timeout_micros).apply(null, arguments)
                    })
                function Ut(n) {
                    ;(this.name = "ExitStatus"), (this.message = "Program terminated with exit(" + n + ")"), (this.status = n)
                }
                ;(e.allocate = function (n, t) {
                    var r
                    return (r = t == an ? Te(n.length) : nt(n.length)), n.subarray || n.slice ? U.set(n, r) : U.set(new Uint8Array(n), r), r
                }),
                    (ye = function n() {
                        Re || rt(), Re || (ye = n)
                    })
                var Ht = !1
                function rt(n) {
                    function t() {
                        Re ||
                            ((Re = !0),
                            (e.calledRun = !0),
                            Ge ||
                                ((Je = !0),
                                Fe(Xe),
                                Fe(_n),
                                e.onRuntimeInitialized && e.onRuntimeInitialized(),
                                Bt1 &&
                                    (function (r) {
                                        var s = e._main
                                        if (s) {
                                            var a = (r = r || []).length + 1,
                                                _ = Te(4 * (a + 1))
                                            h[_ >> 2] = yt(De)
                                            for (var i172 = 1; i172 < a; i172++) h[(_ >> 2) + i172] = yt(r[i172 - 1])
                                            h[(_ >> 2) + a] = 0
                                            try {
                                                Gt(s(a, _), !0)
                                            } catch (l) {
                                                if (l instanceof Ut || l == "unwind") return
                                                var o = l
                                                l && typeof l == "object" && l.stack && (o = [l, l.stack]), te("exception thrown: " + o), de(1, l)
                                            } finally {
                                            }
                                        }
                                    })(n),
                                (function () {
                                    if (e.postRun) for (typeof e.postRun == "function" && (e.postRun = [e.postRun]); e.postRun.length; ) (r = e.postRun.shift()), St.unshift(r)
                                    var r
                                    Fe(St)
                                })()))
                    }
                    ;(n = n || me),
                        X > 0 ||
                            (!Ht &&
                                ((function () {
                                    if (pe.length) {
                                        if (!ee)
                                            return (
                                                At(),
                                                void pe
                                                    .reduce(function (r, s) {
                                                        return r.then(function () {
                                                            return Me(s, {
                                                                loadAsync: !0,
                                                                global: !0,
                                                                nodelete: !0,
                                                                allowUndefined: !0,
                                                            })
                                                        })
                                                    }, Promise.resolve())
                                                    .then(function () {
                                                        It(), qe()
                                                    })
                                            )
                                        pe.forEach(function (r) {
                                            Me(r, {
                                                global: !0,
                                                nodelete: !0,
                                                allowUndefined: !0,
                                            })
                                        }),
                                            qe()
                                    } else qe()
                                })(),
                                (Ht = !0),
                                X > 0)) ||
                            ((function () {
                                if (e.preRun) for (typeof e.preRun == "function" && (e.preRun = [e.preRun]); e.preRun.length; ) (r = e.preRun.shift()), Et.unshift(r)
                                var r
                                Fe(Et)
                            })(),
                            X > 0 ||
                                (e.setStatus
                                    ? (e.setStatus("Running..."),
                                      setTimeout(function () {
                                          setTimeout(function () {
                                              e.setStatus("")
                                          }, 1),
                                              t()
                                      }, 1))
                                    : t()))
                }
                function Gt(n, t) {
                    ;(t && Ft() && n === 0) || (Ft() || (e.onExit && e.onExit(n), (Ge = !0)), de(n, new Ut(n)))
                }
                if (((e.run = rt), e.preInit)) for (typeof e.preInit == "function" && (e.preInit = [e.preInit]); e.preInit.length > 0; ) e.preInit.pop()()
                var Bt1 = !0
                e.noInitialRun && (Bt1 = !1), rt()
                let C = e,
                    re = {},
                    d = 4,
                    H = 5 * d,
                    D = 2 * d,
                    st = 2 * d + 2 * D,
                    ZERO_POINT = {
                        row: 0,
                        column: 0,
                    },
                    pn = /[\w-.]*/g,
                    gn = 1,
                    hn = 2,
                    wn = /^_?tree_sitter_\w+/
                var at, _t, treeSitterId, _e1, ie
                class ParserImpl {
                    static init() {
                        ;(treeSitterId = C._ts_init()), (at = getValue(treeSitterId, "i32")), (_t = getValue(treeSitterId + d, "i32"))
                    }
                    initialize() {
                        C._ts_parser_new_wasm(), (this[0] = getValue(treeSitterId, "i32")), (this[1] = getValue(treeSitterId + d, "i32"))
                    }
                    delete() {
                        C._ts_parser_delete(this[0]), C._free(this[1]), (this[0] = 0), (this[1] = 0)
                    }
                    setLanguage(t) {
                        let r
                        if (t) {
                            if (t.constructor !== Language) throw new Error("Argument must be a Language")
                            {
                                r = t[0]
                                let s = C._ts_language_version(r)
                                if (s < _t || at < s) throw new Error(`Incompatible language version ${s}. Compatibility range ${_t} through ${at}.`)
                            }
                        } else (r = 0), (t = null)
                        return (this.language = t), C._ts_parser_set_language(this[0], r), this
                    }
                    getLanguage() {
                        return this.language
                    }
                    parse(t, r, s) {
                        if (typeof t == "string") _e1 = (l, w, m15) => t.slice(l, m15)
                        else {
                            if (typeof t != "function") throw new Error("Argument must be a string or a function")
                            _e1 = t
                        }
                        this.logCallback ? ((ie = this.logCallback), C._ts_parser_enable_logger_wasm(this[0], 1)) : ((ie = null), C._ts_parser_enable_logger_wasm(this[0], 0))
                        let a = 0,
                            _ = 0
                        if (s && s.includedRanges) {
                            a = s.includedRanges.length
                            let l = (_ = C._calloc(a, st))
                            for (let w = 0; w < a; w++) En(l, s.includedRanges[w]), (l += st)
                        }
                        let i173 = C._ts_parser_parse_wasm(this[0], this[1], r ? r[0] : 0, _, a)
                        if (!i173) throw ((_e1 = null), (ie = null), new Error("Parsing failed"))
                        let o = new Tree(re, i173, this.language, _e1)
                        return (_e1 = null), (ie = null), o
                    }
                    reset() {
                        C._ts_parser_reset(this[0])
                    }
                    setTimeoutMicros(t) {
                        C._ts_parser_set_timeout_micros(this[0], t)
                    }
                    getTimeoutMicros() {
                        return C._ts_parser_timeout_micros(this[0])
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
                class Tree {
                    constructor(internal, address, language, textCallback) {
                        assertInternal(internal), (this[0] = address), (this.language = language), (this.textCallback = textCallback)
                    }
                    copy() {
                        let t = C._ts_tree_copy(this[0])
                        return new Tree(re, t, this.language, this.textCallback)
                    }
                    delete() {
                        C._ts_tree_delete(this[0]), (this[0] = 0)
                    }
                    edit(t) {
                        ;(function (r) {
                            let s = treeSitterId
                            G(s, r.startPosition), G((s += D), r.oldEndPosition), G((s += D), r.newEndPosition), I((s += D), r.startIndex, "i32"), I((s += d), r.oldEndIndex, "i32"), I((s += d), r.newEndIndex, "i32"), (s += d)
                        })(t),
                            C._ts_tree_edit_wasm(this[0])
                    }
                    get rootNode() {
                        return C._ts_tree_root_node_wasm(this[0]), F5(this)
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
                        let r = getValue(treeSitterId, "i32"),
                            s = getValue(treeSitterId + d, "i32"),
                            a = new Array(r)
                        if (r > 0) {
                            let _ = s
                            for (let i174 = 0; i174 < r; i174++) (a[i174] = Sn(_)), (_ += st)
                            C._free(s)
                        }
                        return a
                    }
                }
                class Node {
                    constructor(t, r) {
                        assertInternal(t), (this.tree = r)
                    }
                    get typeId() {
                        return marshalNode(this), C._ts_node_symbol_wasm(this.tree[0])
                    }
                    get type() {
                        return this.tree.language.types[this.typeId] || "ERROR"
                    }
                    get endPosition() {
                        return marshalNode(this), C._ts_node_end_point_wasm(this.tree[0]), Ee(treeSitterId)
                    }
                    get endIndex() {
                        return marshalNode(this), C._ts_node_end_index_wasm(this.tree[0])
                    }
                    get text() {
                        return this.textOverride ?? Kt(this.tree, this.startIndex, this.endIndex)
                    }
                    isNamed() {
                        return marshalNode(this), C._ts_node_is_named_wasm(this.tree[0]) === 1
                    }
                    hasError() {
                        return marshalNode(this), C._ts_node_has_error_wasm(this.tree[0]) === 1
                    }
                    hasChanges() {
                        return marshalNode(this), C._ts_node_has_changes_wasm(this.tree[0]) === 1
                    }
                    isMissing() {
                        return marshalNode(this), C._ts_node_is_missing_wasm(this.tree[0]) === 1
                    }
                    equals(t) {
                        return this.id === t.id
                    }
                    child(t) {
                        return marshalNode(this), C._ts_node_child_wasm(this.tree[0], t), F5(this.tree)
                    }
                    namedChild(t) {
                        return marshalNode(this), C._ts_node_named_child_wasm(this.tree[0], t), F5(this.tree)
                    }
                    childForFieldId(t) {
                        return marshalNode(this), C._ts_node_child_by_field_id_wasm(this.tree[0], t), F5(this.tree)
                    }
                    childForFieldName(t) {
                        let r = this.tree.language.fields.indexOf(t)
                        if (r !== -1) return this.childForFieldId(r)
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
                        if (this._children == null) {
                            marshalNode(this), C._ts_node_children_wasm(this.tree[0])
                            let t = getValue(treeSitterId, "i32"),
                                r = getValue(treeSitterId + d, "i32")
                            if (((this._children = new Array(t)), t > 0)) {
                                let s = r
                                for (let a = 0; a < t; a++) (this._children[a] = F5(this.tree, s)), (s += H)
                                C._free(r)
                            }
                        }
                        return this._children
                    }
                    get namedChildren() {
                        if (!this._namedChildren) {
                            marshalNode(this), C._ts_node_named_children_wasm(this.tree[0])
                            let t = getValue(treeSitterId, "i32"),
                                r = getValue(treeSitterId + d, "i32")
                            if (((this._namedChildren = new Array(t)), t > 0)) {
                                let s = r
                                for (let a = 0; a < t; a++) (this._namedChildren[a] = F5(this.tree, s)), (s += H)
                                C._free(r)
                            }
                        }
                        return this._namedChildren
                    }
                    descendantsOfType(t, r, s) {
                        Array.isArray(t) || (t = [t]), r || (r = ZERO_POINT), s || (s = ZERO_POINT)
                        let a = [],
                            _ = this.tree.language.types
                        for (let m16 = 0, y = _.length; m16 < y; m16++) t.includes(_[m16]) && a.push(m16)
                        let i175 = C._malloc(d * a.length)
                        for (let m1 = 0, y1 = a.length; m1 < y1; m1++) I(i175 + m1 * d, a[m1], "i32")
                        marshalNode(this), C._ts_node_descendants_of_type_wasm(this.tree[0], i175, a.length, r.row, r.column, s.row, s.column)
                        let o = getValue(treeSitterId, "i32"),
                            l = getValue(treeSitterId + d, "i32"),
                            w = new Array(o)
                        if (o > 0) {
                            let m17 = l
                            for (let y = 0; y < o; y++) (w[y] = F5(this.tree, m17)), (m17 += H)
                        }
                        return C._free(l), C._free(i175), w
                    }
                    get nextSibling() {
                        return marshalNode(this), C._ts_node_next_sibling_wasm(this.tree[0]), F5(this.tree)
                    }
                    get previousSibling() {
                        return marshalNode(this), C._ts_node_prev_sibling_wasm(this.tree[0]), F5(this.tree)
                    }
                    get nextNamedSibling() {
                        return marshalNode(this), C._ts_node_next_named_sibling_wasm(this.tree[0]), F5(this.tree)
                    }
                    get previousNamedSibling() {
                        return marshalNode(this), C._ts_node_prev_named_sibling_wasm(this.tree[0]), F5(this.tree)
                    }
                    get parent() {
                        return marshalNode(this), C._ts_node_parent_wasm(this.tree[0]), F5(this.tree)
                    }
                    descendantForIndex(t, r = t) {
                        if (typeof t != "number" || typeof r != "number") throw new Error("Arguments must be numbers")
                        marshalNode(this)
                        let s = treeSitterId + H
                        return I(s, t, "i32"), I(s + d, r, "i32"), C._ts_node_descendant_for_index_wasm(this.tree[0]), F5(this.tree)
                    }
                    namedDescendantForIndex(t, r = t) {
                        if (typeof t != "number" || typeof r != "number") throw new Error("Arguments must be numbers")
                        marshalNode(this)
                        let s = treeSitterId + H
                        return I(s, t, "i32"), I(s + d, r, "i32"), C._ts_node_named_descendant_for_index_wasm(this.tree[0]), F5(this.tree)
                    }
                    descendantForPosition(t, r = t) {
                        if (!Oe(t) || !Oe(r)) throw new Error("Arguments must be {row, column} objects")
                        marshalNode(this)
                        let s = treeSitterId + H
                        return G(s, t), G(s + D, r), C._ts_node_descendant_for_position_wasm(this.tree[0]), F5(this.tree)
                    }
                    namedDescendantForPosition(t, r = t) {
                        if (!Oe(t) || !Oe(r)) throw new Error("Arguments must be {row, column} objects")
                        marshalNode(this)
                        let s = treeSitterId + H
                        return G(s, t), G(s + D, r), C._ts_node_named_descendant_for_position_wasm(this.tree[0]), F5(this.tree)
                    }
                    walk() {
                        return marshalNode(this), C._ts_tree_cursor_new_wasm(this.tree[0]), new TreeCursor(re, this.tree)
                    }
                    toString() {
                        marshalNode(this)
                        let t = C._ts_node_to_string_wasm(this.tree[0]),
                            r = (function (s) {
                                for (var a = ""; ; ) {
                                    var _ = U[s++ >> 0]
                                    if (!_) return a
                                    a += String.fromCharCode(_)
                                }
                            })(t)
                        return C._free(t), r
                    }
                    get hasChildren() {
                        return (this.children?.length || 0) > 0
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
                     * import { Parser, parserFromWasm } from "https://deno.land/x/deno_tree_sitter@0.1.0.1/main.js"
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
                     * @returns {[Object]} output
                     *
                     */
                    query(queryString, options) {
                        const { matchLimit, startPosition, endPosition } = { ...options }
                        return this.tree.language.query(queryString).matches(this, startPosition || this.startPosition, endPosition || this.endPosition, matchLimit)
                    }
                    quickQuery(queryString, options) {
                        let thereIsOnlyUnderscore = false
                        let numberOfAtSymbols = 0
                        let thereAreQuotes = false
                        for (const each of queryString) {
                            if (each == "@") {
                                numberOfAtSymbols += 1
                            }
                            if (each == `"`) {
                                thereAreQuotes = true
                            }
                        }
                        // if there's no @'s theres no vars, so add the default one
                        if (numberOfAtSymbols == 0) {
                            queryString = `${queryString} @_`
                            thereIsOnlyUnderscore = true
                        // if there's no quotes, then number of @'s == number of vars
                        } else if (!thereAreQuotes) {
                            if (numberOfAtSymbols == 1 && queryString.match(/@_\b/)) {
                                thereIsOnlyUnderscore = true
                            }
                        // if there are quotes and @'s then we need a full parse to determine
                        } else {
                            // yes I am calling the tree sitter inside of the tree sitter
                            const tree = treeSitterQueryParser.parse(queryString)
                            let cleanupMemoryHook = {}
                            const matchesIter = iter(tree.language.query(`("@") @_`).iterMatches(tree.rootNode, undefined, undefined, undefined, cleanupMemoryHook))
                            let varCount = 0
                            let lastMatch
                            while (1) {
                                const match = next(matchesIter)
                                if (match == Stop) {
                                    break
                                }
                                lastMatch = match
                                if (++varCount > 1) {
                                    break
                                }
                            }
                            cleanupMemoryHook.cleanupMemory() // done iterating
                            // const thereIsMoreThanOneMatch = varCount > 1
                            // const thereIsOnlyOneMatch = varCount == 1
                            if (varCount == 0) {
                                queryString = `${queryString} @_`
                                thereIsOnlyUnderscore = true
                            } else if (varCount == 1) {
                                if (lastMatch.captures[0]?.nextNamedSibling?.text == "_") {
                                    thereIsOnlyUnderscore = true
                                }
                            }
                        }
                        let output = this.query(queryString, options).map((each) => Object.fromEntries(each.captures.map((each) => [each.name, each.node])))
                        if (thereIsOnlyUnderscore) {
                            return output.map((each) => each._)
                        }
                        return output
                    }
                    quickQueryFirst(queryString, options) {
                        return this.quickQuery(queryString, options)[0]
                    }
                }
                class TreeCursor {
                    constructor(t, r) {
                        assertInternal(t), (this.tree = r), ve(this)
                    }
                    delete() {
                        C1293(this), C._ts_tree_cursor_delete_wasm(this.tree[0]), (this[0] = this[1] = this[2] = 0)
                    }
                    reset(t) {
                        marshalNode(t), C1293(this, treeSitterId + H), C._ts_tree_cursor_reset_wasm(this.tree[0]), ve(this)
                    }
                    get nodeType() {
                        return this.tree.language.types[this.nodeTypeId] || "ERROR"
                    }
                    get nodeTypeId() {
                        return C1293(this), C._ts_tree_cursor_current_node_type_id_wasm(this.tree[0])
                    }
                    get nodeId() {
                        return C1293(this), C._ts_tree_cursor_current_node_id_wasm(this.tree[0])
                    }
                    get nodeIsNamed() {
                        return C1293(this), C._ts_tree_cursor_current_node_is_named_wasm(this.tree[0]) === 1
                    }
                    get nodeIsMissing() {
                        return C1293(this), C._ts_tree_cursor_current_node_is_missing_wasm(this.tree[0]) === 1
                    }
                    get nodeText() {
                        C1293(this)
                        let t = C._ts_tree_cursor_start_index_wasm(this.tree[0]),
                            r = C._ts_tree_cursor_end_index_wasm(this.tree[0])
                        return Kt(this.tree, t, r)
                    }
                    get startPosition() {
                        return C1293(this), C._ts_tree_cursor_start_position_wasm(this.tree[0]), Ee(treeSitterId)
                    }
                    get endPosition() {
                        return C1293(this), C._ts_tree_cursor_end_position_wasm(this.tree[0]), Ee(treeSitterId)
                    }
                    get startIndex() {
                        return C1293(this), C._ts_tree_cursor_start_index_wasm(this.tree[0])
                    }
                    get endIndex() {
                        return C1293(this), C._ts_tree_cursor_end_index_wasm(this.tree[0])
                    }
                    currentNode() {
                        return C1293(this), C._ts_tree_cursor_current_node_wasm(this.tree[0]), F5(this.tree)
                    }
                    currentFieldId() {
                        return C1293(this), C._ts_tree_cursor_current_field_id_wasm(this.tree[0])
                    }
                    currentFieldName() {
                        return this.tree.language.fields[this.currentFieldId()]
                    }
                    gotoFirstChild() {
                        C1293(this)
                        let t = C._ts_tree_cursor_goto_first_child_wasm(this.tree[0])
                        return ve(this), t === 1
                    }
                    gotoNextSibling() {
                        C1293(this)
                        let t = C._ts_tree_cursor_goto_next_sibling_wasm(this.tree[0])
                        return ve(this), t === 1
                    }
                    gotoParent() {
                        C1293(this)
                        let t = C._ts_tree_cursor_goto_parent_wasm(this.tree[0])
                        return ve(this), t === 1
                    }
                }
                class Language {
                    constructor(t, r) {
                        assertInternal(t), (this[0] = r), (this.types = new Array(C._ts_language_symbol_count(this[0])))
                        for (let s = 0, a = this.types.length; s < a; s++) C._ts_language_symbol_type(this[0], s) < 2 && (this.types[s] = UTF8ToString(C._ts_language_symbol_name(this[0], s)))
                        this.fields = new Array(C._ts_language_field_count(this[0]) + 1)
                        for (let s1 = 0, a2 = this.fields.length; s1 < a2; s1++) {
                            let _ = C._ts_language_field_name_for_id(this[0], s1)
                            this.fields[s1] = _ !== 0 ? UTF8ToString(_) : null
                        }
                    }
                    get version() {
                        return C._ts_language_version(this[0])
                    }
                    get fieldCount() {
                        return this.fields.length - 1
                    }
                    fieldIdForName(t) {
                        let r = this.fields.indexOf(t)
                        return r !== -1 ? r : null
                    }
                    fieldNameForId(t) {
                        return this.fields[t] || null
                    }
                    idForNodeType(t, r) {
                        let s = lengthBytesUTF8(t),
                            a = C._malloc(s + 1)
                        stringToUTF8(t, a, s + 1)
                        let _ = C._ts_language_symbol_for_name(this[0], a, s, r)
                        return C._free(a), _ || null
                    }
                    get nodeTypeCount() {
                        return C._ts_language_symbol_count(this[0])
                    }
                    nodeTypeForId(t) {
                        let r = C._ts_language_symbol_name(this[0], t)
                        return r ? UTF8ToString(r) : null
                    }
                    nodeTypeIsNamed(t) {
                        return !!C._ts_language_type_is_named_wasm(this[0], t)
                    }
                    nodeTypeIsVisible(t) {
                        return !!C._ts_language_type_is_visible_wasm(this[0], t)
                    }
                    query(queryString) {
                        let sourceLength = lengthBytesUTF8(queryString),
                            sourceAddress = C._malloc(sourceLength + 1)
                        stringToUTF8(queryString, sourceAddress, sourceLength + 1)
                        let address = C._ts_query_new(this[0], sourceAddress, sourceLength, treeSitterId, treeSitterId + d)
                        if (!address) {
                            let errorId = getValue(treeSitterId + d, "i32"),
                                b = UTF8ToString(sourceAddress, getValue(treeSitterId, "i32")).length,
                                v16 = queryString.substr(b, 100).split(`
`)[0],
                                error,
                                x = v16.match(pn)[0]
                            switch (errorId) {
                                case 2:
                                    error = new RangeError(`Bad node name '${x}'`)
                                    break
                                case 3:
                                    error = new RangeError(`Bad field name '${x}'`)
                                    break
                                case 4:
                                    error = new RangeError(`Bad capture name @${x}`)
                                    break
                                case 5:
                                    ;(error = new TypeError(`Bad pattern structure at offset ${b}: '${v16}'...`)), (x = "")
                                    break
                                default:
                                    ;(error = new SyntaxError(`Bad syntax at offset ${b}: '${v16}'...`)), (x = "")
                            }
                            throw ((error.index = b), (error.length = x.length), C._free(sourceAddress), error)
                        }
                        let queryStringCount = C._ts_query_string_count(address),
                            queryCaptureCount = C._ts_query_capture_count(address),
                            o = C._ts_query_pattern_count(address),
                            queryCaptures = new Array(queryCaptureCount),
                            queryStrings = new Array(queryStringCount)
                        for (let queryCaptureIndex = 0; queryCaptureIndex < queryCaptureCount; queryCaptureIndex++) {
                            let nameAddress = C._ts_query_capture_name_for_id(address, queryCaptureIndex, treeSitterId),
                                nameLength = getValue(treeSitterId, "i32")
                            queryCaptures[queryCaptureIndex] = UTF8ToString(nameAddress, nameLength)
                        }
                        for (let queryStringIndex = 0; queryStringIndex < queryStringCount; queryStringIndex++) {
                            let b = C._ts_query_string_value_for_id(address, queryStringIndex, treeSitterId),
                                v18 = getValue(treeSitterId, "i32")
                            queryStrings[queryStringIndex] = UTF8ToString(b, v18)
                        }
                        let m18 = new Array(o),
                            y = new Array(o),
                            S = new Array(o),
                            N = new Array(o),
                            M = new Array(o)
                        for (let g2 = 0; g2 < o; g2++) {
                            let b = C._ts_query_predicates_for_pattern(address, g2, treeSitterId),
                                v19 = getValue(treeSitterId, "i32")
                            ;(N[g2] = []), (M[g2] = [])
                            let c = [],
                                x = b
                            for (let oe = 0; oe < v19; oe++) {
                                let Xt = getValue(x, "i32"),
                                    Jt = getValue((x += d), "i32")
                                if (((x += d), Xt === gn))
                                    c.push({
                                        type: "capture",
                                        name: queryCaptures[Jt],
                                    })
                                else if (Xt === hn)
                                    c.push({
                                        type: "string",
                                        value: queryStrings[Jt],
                                    })
                                else if (c.length > 0) {
                                    if (c[0].type !== "string") throw new Error("Predicates must begin with a literal value")
                                    let Se = c[0].value,
                                        Ae = !0
                                    switch (Se) {
                                        case "not-eq?":
                                            Ae = !1
                                        case "eq?":
                                            if (c.length !== 3) throw new Error(`Wrong number of arguments to \`#eq?\` predicate. Expected 2, got ${c.length - 1}`)
                                            if (c[1].type !== "capture") throw new Error(`First argument of \`#eq?\` predicate must be a capture. Got "${c[1].value}"`)
                                            if (c[2].type === "capture") {
                                                let B = c[1].name,
                                                    ue = c[2].name
                                                M[g2].push(function (ut) {
                                                    let le, lt
                                                    for (let je of ut) je.name === B && (le = je.node), je.name === ue && (lt = je.node)
                                                    return le === void 0 || lt === void 0 || (le.text === lt.text) === Ae
                                                })
                                            } else {
                                                let B = c[1].name,
                                                    ue = c[2].value
                                                M[g2].push(function (ut) {
                                                    for (let le of ut) if (le.name === B) return (le.node.text === ue) === Ae
                                                    return !0
                                                })
                                            }
                                            break
                                        case "not-match?":
                                            Ae = !1
                                        case "match?":
                                            if (c.length !== 3) throw new Error(`Wrong number of arguments to \`#match?\` predicate. Expected 2, got ${c.length - 1}.`)
                                            if (c[1].type !== "capture") throw new Error(`First argument of \`#match?\` predicate must be a capture. Got "${c[1].value}".`)
                                            if (c[2].type !== "string") throw new Error(`Second argument of \`#match?\` predicate must be a string. Got @${c[2].value}.`)
                                            let An = c[1].name,
                                                In = new RegExp(c[2].value)
                                            M[g2].push(function (B) {
                                                for (let ue of B) if (ue.name === An) return In.test(ue.node.text) === Ae
                                                return !0
                                            })
                                            break
                                        case "set!":
                                            if (c.length < 2 || c.length > 3) throw new Error(`Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${c.length - 1}.`)
                                            if (c.some((B) => B.type !== "string")) throw new Error('Arguments to `#set!` predicate must be a strings.".')
                                            m18[g2] || (m18[g2] = {}), (m18[g2][c[1].value] = c[2] ? c[2].value : null)
                                            break
                                        case "is?":
                                        case "is-not?":
                                            if (c.length < 2 || c.length > 3) throw new Error(`Wrong number of arguments to \`#${Se}\` predicate. Expected 1 or 2. Got ${c.length - 1}.`)
                                            if (c.some((B) => B.type !== "string")) throw new Error(`Arguments to \`#${Se}\` predicate must be a strings.".`)
                                            let ot = Se === "is?" ? y : S
                                            ot[g2] || (ot[g2] = {}), (ot[g2][c[1].value] = c[2] ? c[2].value : null)
                                            break
                                        default:
                                            N[g2].push({
                                                operator: Se,
                                                operands: c.slice(1),
                                            })
                                    }
                                    c.length = 0
                                }
                            }
                            Object.freeze(m18[g2]), Object.freeze(y[g2]), Object.freeze(S[g2])
                        }
                        return C._free(sourceAddress), new Query(re, address, queryCaptures, M, N, Object.freeze(m18), Object.freeze(y), Object.freeze(S))
                    }
                    static load(t) {
                        let r
                        if (t instanceof Uint8Array) r = Promise.resolve(t)
                        else {
                            let a = t
                            if (typeof process1 < "u" && process1.versions && process1.versions.node) {
                                let _ = __default9
                                r = Promise.resolve(_.readFileSync(a))
                            } else
                                r = fetch(a).then((_) =>
                                    _.arrayBuffer().then((i177) => {
                                        if (_.ok) return new Uint8Array(i177)
                                        {
                                            let o = new TextDecoder("utf-8").decode(i177)
                                            throw new Error(`Language.load failed with status ${_.status}.

${o}`)
                                        }
                                    })
                                )
                        }
                        let s = typeof loadSideModule == "function" ? loadSideModule : et
                        return r
                            .then((a) =>
                                s(a, {
                                    loadAsync: !0,
                                })
                            )
                            .then((a) => {
                                let _ = Object.keys(a),
                                    i178 = _.find((l) => wn.test(l) && !l.includes("external_scanner_"))
                                i178 ||
                                    console.log(`Couldn't find language function in WASM file. Symbols:
${JSON.stringify(_, null, 2)}`)
                                let o = a[i178]()
                                return new Language(re, o)
                            })
                    }
                }
                class Query {
                    constructor(treeNode, r, captureNames, textPredicates, predicates, setProperties, assertedProperties, refutedProperties) {
                        assertInternal(treeNode), (this[0] = r), (this.captureNames = captureNames), (this.textPredicates = textPredicates), (this.predicates = predicates), (this.setProperties = setProperties), (this.assertedProperties = assertedProperties), (this.refutedProperties = refutedProperties), (this.exceededMatchLimit = !1)
                    }
                    delete() {
                        C._ts_query_delete(this[0]), (this[0] = 0)
                    }
                    matches(treeNode, startPosition, endPosition, options) {
                        startPosition || (startPosition = ZERO_POINT), endPosition || (endPosition = ZERO_POINT), options || (options = {})
                        let matchLimit = options.matchLimit
                        if (matchLimit === void 0) matchLimit = 0
                        else if (typeof matchLimit != "number") throw new Error("Arguments must be numbers")
                        marshalNode(treeNode), C._ts_query_matches_wasm(this[0], treeNode.tree[0], startPosition.row, startPosition.column, endPosition.row, endPosition.column, matchLimit)
                        let i180 = getValue(treeSitterId, "i32"),
                            o = getValue(treeSitterId + d, "i32"),
                            l = getValue(treeSitterId + 2 * d, "i32"),
                            theMatches = new Array(i180)
                        this.exceededMatchLimit = !!l
                        let filteredCount = 0,
                            y = o
                        for (let S = 0; S < i180; S++) {
                            let N = getValue(y, "i32"),
                                M = getValue((y += d), "i32")
                            y += d
                            let captures = new Array(M)
                            if (((y = Vt(this, treeNode.tree, y, captures)), this.textPredicates[N].every((b) => b(captures)))) {
                                const filteredIndex = filteredCount++
                                theMatches[filteredIndex] = {
                                    pattern: N,
                                    captures: captures,
                                }
                                let b = this.setProperties[N]
                                b && (theMatches[filteredIndex].setProperties = b)
                                let v20 = this.assertedProperties[N]
                                v20 && (theMatches[filteredIndex].assertedProperties = v20)
                                let c = this.refutedProperties[N]
                                c && (theMatches[filteredIndex].refutedProperties = c)
                            }
                        }
                        return (theMatches.length = filteredCount), C._free(o), theMatches
                    }
                    *iterMatches(treeNode, startPosition, endPosition, options, cleanupMemoryHook) {
                        startPosition || (startPosition = ZERO_POINT), endPosition || (endPosition = ZERO_POINT), options || (options = {})
                        let matchLimit = options.matchLimit
                        if (matchLimit === void 0) matchLimit = 0
                        else if (typeof matchLimit != "number") throw new Error("Arguments must be numbers")
                        marshalNode(treeNode), C._ts_query_matches_wasm(this[0], treeNode.tree[0], startPosition.row, startPosition.column, endPosition.row, endPosition.column, matchLimit)
                        let i180 = getValue(treeSitterId, "i32"),
                            memoryThatGetsFreed = getValue(treeSitterId + d, "i32"),
                            l = getValue(treeSitterId + 2 * d, "i32")
                        this.exceededMatchLimit = !!l
                        let filteredCount = 0,
                            y = memoryThatGetsFreed
                        let hasBeenCleaned = false
                        if (cleanupMemoryHook instanceof Object) {
                            cleanupMemoryHook.cleanupMemory = () => {
                                if (!hasBeenCleaned) {
                                    C._free(memoryThatGetsFreed)
                                }
                                hasBeenCleaned = true
                            }
                        }
                        for (let S = 0; S < i180; S++) {
                            let N = getValue(y, "i32"),
                                M = getValue((y += d), "i32")
                            y += d
                            let captures = new Array(M)
                            if (((y = Vt(this, treeNode.tree, y, captures)), this.textPredicates[N].every((b) => b(captures)))) {
                                const filteredIndex = filteredCount++
                                const output = {
                                    pattern: N,
                                    captures: captures,
                                }
                                let b = this.setProperties[N]
                                b && (output.setProperties = b)
                                let v20 = this.assertedProperties[N]
                                v20 && (output.assertedProperties = v20)
                                let c = this.refutedProperties[N]
                                c && (output.refutedProperties = c)
                                yield output
                            }
                        }
                        if (!hasBeenCleaned) {
                            C._free(memoryThatGetsFreed)
                        }
                    }
                    captures(treeNode, startNode, endNode, options) {
                        startNode || (startNode = ZERO_POINT), endNode || (endNode = ZERO_POINT), options || (options = {})
                        let matchLimit = options.matchLimit
                        if (matchLimit === void 0) matchLimit = 0
                        else if (typeof matchLimit != "number") throw new Error("Arguments must be numbers")
                        marshalNode(treeNode), C._ts_query_captures_wasm(this[0], treeNode.tree[0], startNode.row, startNode.column, endNode.row, endNode.column, matchLimit)
                        let i181 = getValue(treeSitterId, "i32"),
                            o = getValue(treeSitterId + d, "i32"),
                            l = getValue(treeSitterId + 2 * d, "i32"),
                            w = []
                        this.exceededMatchLimit = !!l
                        let m20 = [],
                            y = o
                        for (let S = 0; S < i181; S++) {
                            let N = getValue(y, "i32"),
                                M = getValue((y += d), "i32"),
                                g6 = getValue((y += d), "i32")
                            if (((y += d), (m20.length = M), (y = Vt(this, treeNode.tree, y, m20)), this.textPredicates[N].every((b) => b(m20)))) {
                                let b = m20[g6],
                                    v21 = this.setProperties[N]
                                v21 && (b.setProperties = v21)
                                let c = this.assertedProperties[N]
                                c && (b.assertedProperties = c)
                                let x = this.refutedProperties[N]
                                x && (b.refutedProperties = x), w.push(b)
                            }
                        }
                        return C._free(o), w
                    }
                    predicatesForPattern(t) {
                        return this.predicates[t]
                    }
                    didExceedMatchLimit() {
                        return this.exceededMatchLimit
                    }
                }
                function Kt(n, t, r) {
                    let s = r - t,
                        a = n.textCallback(t, null, r)
                    for (t += a.length; t < r; ) {
                        let _ = n.textCallback(t, null, r)
                        if (!(_ && _.length > 0)) break
                        ;(t += _.length), (a += _)
                    }
                    return t > r && (a = a.slice(0, s)), a
                }
                function Vt(n, t, r, s) {
                    for (let a = 0, _ = s.length; a < _; a++) {
                        let i182 = getValue(r, "i32"),
                            o = F5(t, (r += d))
                        ;(r += H),
                            (s[a] = {
                                name: n.captureNames[i182],
                                node: o,
                            })
                    }
                    return r
                }
                function assertInternal(n) {
                    if (n !== re) throw new Error("Illegal constructor")
                }
                function Oe(n) {
                    return n && typeof n.row == "number" && typeof n.column == "number"
                }
                function marshalNode(n) {
                    let t = treeSitterId
                    I(t, n.id, "i32"), I((t += d), n.startIndex, "i32"), I((t += d), n.startPosition.row, "i32"), I((t += d), n.startPosition.column, "i32"), I((t += d), n[0], "i32")
                }
                function F5(n, t = treeSitterId) {
                    let r = getValue(t, "i32")
                    if (r === 0) return null
                    let s = getValue((t += d), "i32"),
                        a = getValue((t += d), "i32"),
                        _ = getValue((t += d), "i32"),
                        i183 = getValue((t += d), "i32"),
                        o = new Node(re, n)
                    return (
                        (o.id = r),
                        (o.startIndex = s),
                        (o.startPosition = {
                            row: a,
                            column: _,
                        }),
                        (o[0] = i183),
                        o
                    )
                }
                function C1293(n, t = treeSitterId) {
                    I(t + 0 * d, n[0], "i32"), I(t + 1 * d, n[1], "i32"), I(t + 2 * d, n[2], "i32")
                }
                function ve(n) {
                    ;(n[0] = getValue(treeSitterId + 0 * d, "i32")), (n[1] = getValue(treeSitterId + 1 * d, "i32")), (n[2] = getValue(treeSitterId + 2 * d, "i32"))
                }
                function G(n, t) {
                    I(n, t.row, "i32"), I(n + d, t.column, "i32")
                }
                function Ee(n) {
                    return {
                        row: getValue(n, "i32"),
                        column: getValue(n + d, "i32"),
                    }
                }
                function En(n, t) {
                    G(n, t.startPosition), G((n += D), t.endPosition), I((n += D), t.startIndex, "i32"), I((n += d), t.endIndex, "i32"), (n += d)
                }
                function Sn(n) {
                    let t = {}
                    return (t.startPosition = Ee(n)), (n += D), (t.endPosition = Ee(n)), (n += D), (t.startIndex = getValue(n, "i32")), (n += d), (t.endIndex = getValue(n, "i32")), t
                }
                for (let n1 of Object.getOwnPropertyNames(ParserImpl.prototype))
                    Object.defineProperty(ParserClass.prototype, n1, {
                        value: ParserImpl.prototype[n1],
                        enumerable: !1,
                        writable: !1,
                        configurable: true,
                    })
                ;(ParserClass.Language = Language),
                    (e.onRuntimeInitialized = () => {
                        ParserImpl.init(), nn()
                    })
            })))
        )
    }
}

export default ParserClass

// this is to get around .parse being unwritable by default
class ParserWrapper extends ParserClass {
    parse = ParserClass.prototype.parse
}

await ParserClass.init()

export const Parser = (...args)=>ParserClass.init(...args).then(_=>{
    return new ParserClass()
})


/**
 * Create a parser
 *
 * @returns {ParserClass} output 
 *
 */
export const parserFromWasm = async (wasmUint8ArrayOrFilePath)=>{
    let bytes = wasmUint8ArrayOrFilePath
    if (typeof wasmUint8ArrayOrFilePath == 'string') {
        bytes = await Deno.readFile(wasmUint8ArrayOrFilePath)
    }
    const language = await ParserClass.Language.load(bytes)
    const parser = new ParserWrapper()
    parser.setLanguage(language)
    const realParceFunction = parser.parse.bind(parser)
    
    /**
     * parse
     *
     * @example
     *     var tree = parser.parse("blah blah")
     *     var treeWithWhitespace = parser.parse({string: "blah blah", withWhitespace: true })
     *     // for efficient updates (see tree.edit() documentation)
     *     var parser.parse(newSourceCode, tree)
     *     // for Custom Data Structure (see full docs)
     *     var tree = parser.parse((index, position) => line.slice(position.column))
     * 
     * @returns output - a Tree object
     *
     */
    parser.parse = (arg1, ...args)=>{
        let tree
        if (arg1.withWhitespace) {
            tree = addWhitespaceNodes({
                tree: realParceFunction(arg1.string, ...args),
                string: arg1.string,
            })
        } else {
            tree = realParceFunction(typeof arg1.string == 'string' ? arg1.string : arg1)
        }
        return tree
    }
    return parser
}

export function flatNodeList(node) {
    return [ node, ...(node.children||[]).map(flatNodeList) ].flat(Infinity)
}

export class WhitespaceNode {
    constructor(data) {
        Object.assign(this, data)
    }
    toJSON() {
        const optionalData = {}
        if (typeof this.rootLeadingWhitespace == 'string') {
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
                ...optionalData,
                children: this.children.map(each=>each.toJSON()),
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
                ...optionalData,
                text: this.text,
                children: [],
            }
        }
    }
}

export const addWhitespaceNodes = ({tree, string})=>{
    const rootNode = tree.rootNode
    Object.defineProperties(tree, {
        rootNode: {
            configurable: true,
            get() {
                return rootNode
            }
        },
    })
    const allNodes = flatNodeList(tree.rootNode)
    rootNode.rootLeadingWhitespace = string.slice(0,tree.rootNode.startIndex)
    rootNode.indent = (rootNode.rootLeadingWhitespace.split("\n")||[""]).slice(-1)[0]
    // get the indent of the root
    let indent = rootNode.indent
    // mutate nodes
    for (const eachNode of allNodes) {
        if (eachNode.hasChildren) {
            const newChildren = []
            const childrenCopy = [...eachNode.children]
            let firstChild = childrenCopy.shift()
            // preceding whitespace
            if (eachNode.startIndex != firstChild.startIndex) {
                const whitespaceText = string.slice(eachNode.startIndex, firstChild.startIndex)
                if (whitespaceText.match(/\n/)) {
                    indent = whitespaceText.split(/\n/).slice(-1)[0]
                }
                newChildren.push(new WhitespaceNode({
                    typeId: -1,
                    type: "whitespace",
                    text: whitespaceText,
                    startIndex: eachNode.startIndex,
                    endIndex: firstChild.startIndex,
                    indent,
                    hasChildren: false,
                    children: [],
                }))
            }
            firstChild.indent = indent
            newChildren.push(firstChild)
            // gaps between sibilings
            let prevChild = firstChild
            for (const eachSecondaryNode of childrenCopy) {
                if (prevChild.endIndex != eachSecondaryNode.startIndex) {
                    const whitespaceText = string.slice(prevChild.endIndex, eachSecondaryNode.startIndex)
                    if (whitespaceText.match(/\n/)) {
                        indent = whitespaceText.split(/\n/).slice(-1)[0]
                    }
                    newChildren.push(new WhitespaceNode({
                        typeId: -1,
                        type: "whitespace",
                        text: whitespaceText,
                        startIndex: prevChild.endIndex,
                        endIndex: eachSecondaryNode.startIndex,
                        indent,
                        hasChildren: false,
                        children: [],
                    }))
                }
                eachSecondaryNode.indent = indent
                newChildren.push(eachSecondaryNode)
                prevChild = eachSecondaryNode
            }
            
            // 
            // inject whitespace "nodes"
            // 
            Object.defineProperties(eachNode, {
                children: {
                    configurable: true,
                    get() {
                        return newChildren
                    },
                },
            })
        }
    }
    return tree
}

export var treeSitterQueryParser = await parserFromWasm(treeSitterQuery)