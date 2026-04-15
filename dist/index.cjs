"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@pgsql/types/types.js
var require_types = __commonJS({
  "node_modules/@pgsql/types/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@pgsql/types/enums.js
var require_enums = __commonJS({
  "node_modules/@pgsql/types/enums.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@pgsql/types/index.js
var require_types2 = __commonJS({
  "node_modules/@pgsql/types/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_types(), exports2);
    __exportStar(require_enums(), exports2);
  }
});

// node_modules/libpg-query/wasm/libpg-query.js
var require_libpg_query = __commonJS({
  "node_modules/libpg-query/wasm/libpg-query.js"(exports2, module2) {
    var PgQueryModule = (() => {
      var _scriptName = typeof document != "undefined" ? document.currentScript?.src : void 0;
      return (async function(moduleArg = {}) {
        var moduleRtn;
        var Module = moduleArg;
        var ENVIRONMENT_IS_WEB = typeof window == "object";
        var ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope != "undefined";
        var ENVIRONMENT_IS_NODE = typeof process == "object" && process.versions?.node && process.type != "renderer";
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = (status, toThrow) => {
          throw toThrow;
        };
        if (typeof __filename != "undefined") {
          _scriptName = __filename;
        } else if (ENVIRONMENT_IS_WORKER) {
          _scriptName = self.location.href;
        }
        var scriptDirectory = "";
        function locateFile(path) {
          if (Module["locateFile"]) {
            return Module["locateFile"](path, scriptDirectory);
          }
          return scriptDirectory + path;
        }
        var readAsync, readBinary;
        if (ENVIRONMENT_IS_NODE) {
          var fs = require("fs");
          scriptDirectory = __dirname + "/";
          readBinary = (filename) => {
            filename = isFileURI(filename) ? new URL(filename) : filename;
            var ret = fs.readFileSync(filename);
            return ret;
          };
          readAsync = async (filename, binary = true) => {
            filename = isFileURI(filename) ? new URL(filename) : filename;
            var ret = fs.readFileSync(filename, binary ? void 0 : "utf8");
            return ret;
          };
          if (process.argv.length > 1) {
            thisProgram = process.argv[1].replace(/\\/g, "/");
          }
          arguments_ = process.argv.slice(2);
          quit_ = (status, toThrow) => {
            process.exitCode = status;
            throw toThrow;
          };
        } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
          try {
            scriptDirectory = new URL(".", _scriptName).href;
          } catch {
          }
          {
            if (ENVIRONMENT_IS_WORKER) {
              readBinary = (url) => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, false);
                xhr.responseType = "arraybuffer";
                xhr.send(null);
                return new Uint8Array(xhr.response);
              };
            }
            readAsync = async (url) => {
              var response = await fetch(url, { credentials: "same-origin" });
              if (response.ok) {
                return response.arrayBuffer();
              }
              throw new Error(response.status + " : " + response.url);
            };
          }
        } else {
        }
        var out = console.log.bind(console);
        var err = console.error.bind(console);
        var wasmBinary;
        var ABORT = false;
        var EXITSTATUS;
        var isFileURI = (filename) => filename.startsWith("file://");
        var readyPromiseResolve, readyPromiseReject;
        var wasmMemory;
        var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
        var HEAP64, HEAPU64;
        var runtimeInitialized = false;
        function updateMemoryViews() {
          var b = wasmMemory.buffer;
          HEAP8 = new Int8Array(b);
          HEAP16 = new Int16Array(b);
          Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
          HEAPU16 = new Uint16Array(b);
          HEAP32 = new Int32Array(b);
          Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
          HEAPF32 = new Float32Array(b);
          HEAPF64 = new Float64Array(b);
          HEAP64 = new BigInt64Array(b);
          HEAPU64 = new BigUint64Array(b);
        }
        function preRun() {
          if (Module["preRun"]) {
            if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
            while (Module["preRun"].length) {
              addOnPreRun(Module["preRun"].shift());
            }
          }
          callRuntimeCallbacks(onPreRuns);
        }
        function initRuntime() {
          runtimeInitialized = true;
          if (!Module["noFSInit"] && !FS.initialized) FS.init();
          TTY.init();
          wasmExports["q"]();
          FS.ignorePermissions = false;
        }
        function postRun() {
          if (Module["postRun"]) {
            if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
            while (Module["postRun"].length) {
              addOnPostRun(Module["postRun"].shift());
            }
          }
          callRuntimeCallbacks(onPostRuns);
        }
        var runDependencies = 0;
        var dependenciesFulfilled = null;
        function addRunDependency(id) {
          runDependencies++;
          Module["monitorRunDependencies"]?.(runDependencies);
        }
        function removeRunDependency(id) {
          runDependencies--;
          Module["monitorRunDependencies"]?.(runDependencies);
          if (runDependencies == 0) {
            if (dependenciesFulfilled) {
              var callback = dependenciesFulfilled;
              dependenciesFulfilled = null;
              callback();
            }
          }
        }
        function abort(what) {
          Module["onAbort"]?.(what);
          what = "Aborted(" + what + ")";
          err(what);
          ABORT = true;
          what += ". Build with -sASSERTIONS for more info.";
          var e = new WebAssembly.RuntimeError(what);
          readyPromiseReject?.(e);
          throw e;
        }
        var wasmBinaryFile;
        function findWasmBinary() {
          return locateFile("libpg-query.wasm");
        }
        function getBinarySync(file) {
          if (file == wasmBinaryFile && wasmBinary) {
            return new Uint8Array(wasmBinary);
          }
          if (readBinary) {
            return readBinary(file);
          }
          throw "both async and sync fetching of the wasm failed";
        }
        async function getWasmBinary(binaryFile) {
          if (!wasmBinary) {
            try {
              var response = await readAsync(binaryFile);
              return new Uint8Array(response);
            } catch {
            }
          }
          return getBinarySync(binaryFile);
        }
        async function instantiateArrayBuffer(binaryFile, imports) {
          try {
            var binary = await getWasmBinary(binaryFile);
            var instance = await WebAssembly.instantiate(binary, imports);
            return instance;
          } catch (reason) {
            err(`failed to asynchronously prepare wasm: ${reason}`);
            abort(reason);
          }
        }
        async function instantiateAsync(binary, binaryFile, imports) {
          if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !ENVIRONMENT_IS_NODE) {
            try {
              var response = fetch(binaryFile, { credentials: "same-origin" });
              var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
              return instantiationResult;
            } catch (reason) {
              err(`wasm streaming compile failed: ${reason}`);
              err("falling back to ArrayBuffer instantiation");
            }
          }
          return instantiateArrayBuffer(binaryFile, imports);
        }
        function getWasmImports() {
          return { a: wasmImports };
        }
        async function createWasm() {
          function receiveInstance(instance, module3) {
            wasmExports = instance.exports;
            wasmMemory = wasmExports["p"];
            updateMemoryViews();
            wasmTable = wasmExports["t"];
            assignWasmExports(wasmExports);
            removeRunDependency("wasm-instantiate");
            return wasmExports;
          }
          addRunDependency("wasm-instantiate");
          function receiveInstantiationResult(result2) {
            return receiveInstance(result2["instance"]);
          }
          var info = getWasmImports();
          if (Module["instantiateWasm"]) {
            return new Promise((resolve, reject) => {
              Module["instantiateWasm"](info, (mod, inst) => {
                resolve(receiveInstance(mod, inst));
              });
            });
          }
          wasmBinaryFile ??= findWasmBinary();
          var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
          var exports3 = receiveInstantiationResult(result);
          return exports3;
        }
        class ExitStatus {
          name = "ExitStatus";
          constructor(status) {
            this.message = `Program terminated with exit(${status})`;
            this.status = status;
          }
        }
        var callRuntimeCallbacks = (callbacks) => {
          while (callbacks.length > 0) {
            callbacks.shift()(Module);
          }
        };
        var onPostRuns = [];
        var addOnPostRun = (cb) => onPostRuns.push(cb);
        var onPreRuns = [];
        var addOnPreRun = (cb) => onPreRuns.push(cb);
        function getValue(ptr, type = "i8") {
          if (type.endsWith("*")) type = "*";
          switch (type) {
            case "i1":
              return HEAP8[ptr];
            case "i8":
              return HEAP8[ptr];
            case "i16":
              return HEAP16[ptr >> 1];
            case "i32":
              return HEAP32[ptr >> 2];
            case "i64":
              return HEAP64[ptr >> 3];
            case "float":
              return HEAPF32[ptr >> 2];
            case "double":
              return HEAPF64[ptr >> 3];
            case "*":
              return HEAPU32[ptr >> 2];
            default:
              abort(`invalid type for getValue: ${type}`);
          }
        }
        var noExitRuntime = true;
        var stackRestore = (val) => __emscripten_stack_restore(val);
        var stackSave = () => _emscripten_stack_get_current();
        var __abort_js = () => abort("");
        var runtimeKeepaliveCounter = 0;
        var __emscripten_runtime_keepalive_clear = () => {
          noExitRuntime = false;
          runtimeKeepaliveCounter = 0;
        };
        var __emscripten_throw_longjmp = () => {
          throw Infinity;
        };
        var timers = {};
        var handleException = (e) => {
          if (e instanceof ExitStatus || e == "unwind") {
            return EXITSTATUS;
          }
          quit_(1, e);
        };
        var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
        var _proc_exit = (code) => {
          EXITSTATUS = code;
          if (!keepRuntimeAlive()) {
            Module["onExit"]?.(code);
            ABORT = true;
          }
          quit_(code, new ExitStatus(code));
        };
        var exitJS = (status, implicit) => {
          EXITSTATUS = status;
          _proc_exit(status);
        };
        var _exit = exitJS;
        var maybeExit = () => {
          if (!keepRuntimeAlive()) {
            try {
              _exit(EXITSTATUS);
            } catch (e) {
              handleException(e);
            }
          }
        };
        var callUserCallback = (func) => {
          if (ABORT) {
            return;
          }
          try {
            func();
            maybeExit();
          } catch (e) {
            handleException(e);
          }
        };
        var _emscripten_get_now = () => performance.now();
        var __setitimer_js = (which, timeout_ms) => {
          if (timers[which]) {
            clearTimeout(timers[which].id);
            delete timers[which];
          }
          if (!timeout_ms) return 0;
          var id = setTimeout(() => {
            delete timers[which];
            callUserCallback(() => __emscripten_timeout(which, _emscripten_get_now()));
          }, timeout_ms);
          timers[which] = { id, timeout_ms };
          return 0;
        };
        var getHeapMax = () => 1073741824;
        var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
        var growMemory = (size) => {
          var b = wasmMemory.buffer;
          var pages = (size - b.byteLength + 65535) / 65536 | 0;
          try {
            wasmMemory.grow(pages);
            updateMemoryViews();
            return 1;
          } catch (e) {
          }
        };
        var _emscripten_resize_heap = (requestedSize) => {
          var oldSize = HEAPU8.length;
          requestedSize >>>= 0;
          var maxHeapSize = getHeapMax();
          if (requestedSize > maxHeapSize) {
            return false;
          }
          for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
            var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
            overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
            var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
            var replacement = growMemory(newSize);
            if (replacement) {
              return true;
            }
          }
          return false;
        };
        var PATH = { isAbs: (path) => path.charAt(0) === "/", splitPath: (filename) => {
          var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
          return splitPathRe.exec(filename).slice(1);
        }, normalizeArray: (parts, allowAboveRoot) => {
          var up = 0;
          for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];
            if (last === ".") {
              parts.splice(i, 1);
            } else if (last === "..") {
              parts.splice(i, 1);
              up++;
            } else if (up) {
              parts.splice(i, 1);
              up--;
            }
          }
          if (allowAboveRoot) {
            for (; up; up--) {
              parts.unshift("..");
            }
          }
          return parts;
        }, normalize: (path) => {
          var isAbsolute = PATH.isAbs(path), trailingSlash = path.slice(-1) === "/";
          path = PATH.normalizeArray(path.split("/").filter((p) => !!p), !isAbsolute).join("/");
          if (!path && !isAbsolute) {
            path = ".";
          }
          if (path && trailingSlash) {
            path += "/";
          }
          return (isAbsolute ? "/" : "") + path;
        }, dirname: (path) => {
          var result = PATH.splitPath(path), root = result[0], dir = result[1];
          if (!root && !dir) {
            return ".";
          }
          if (dir) {
            dir = dir.slice(0, -1);
          }
          return root + dir;
        }, basename: (path) => path && path.match(/([^\/]+|\/)\/*$/)[1], join: (...paths) => PATH.normalize(paths.join("/")), join2: (l, r) => PATH.normalize(l + "/" + r) };
        var initRandomFill = () => {
          if (ENVIRONMENT_IS_NODE) {
            var nodeCrypto = require("crypto");
            return (view) => nodeCrypto.randomFillSync(view);
          }
          return (view) => crypto.getRandomValues(view);
        };
        var randomFill = (view) => {
          (randomFill = initRandomFill())(view);
        };
        var PATH_FS = { resolve: (...args) => {
          var resolvedPath = "", resolvedAbsolute = false;
          for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path = i >= 0 ? args[i] : FS.cwd();
            if (typeof path != "string") {
              throw new TypeError("Arguments to path.resolve must be strings");
            } else if (!path) {
              return "";
            }
            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = PATH.isAbs(path);
          }
          resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p) => !!p), !resolvedAbsolute).join("/");
          return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
        }, relative: (from, to) => {
          from = PATH_FS.resolve(from).slice(1);
          to = PATH_FS.resolve(to).slice(1);
          function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
              if (arr[start] !== "") break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== "") break;
            }
            if (start > end) return [];
            return arr.slice(start, end - start + 1);
          }
          var fromParts = trim(from.split("/"));
          var toParts = trim(to.split("/"));
          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
              samePartsLength = i;
              break;
            }
          }
          var outputParts = [];
          for (var i = samePartsLength; i < fromParts.length; i++) {
            outputParts.push("..");
          }
          outputParts = outputParts.concat(toParts.slice(samePartsLength));
          return outputParts.join("/");
        } };
        var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder() : void 0;
        var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
          var endIdx = idx + maxBytesToRead;
          var endPtr = idx;
          while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
          if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
            return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
          }
          var str = "";
          while (idx < endPtr) {
            var u0 = heapOrArray[idx++];
            if (!(u0 & 128)) {
              str += String.fromCharCode(u0);
              continue;
            }
            var u1 = heapOrArray[idx++] & 63;
            if ((u0 & 224) == 192) {
              str += String.fromCharCode((u0 & 31) << 6 | u1);
              continue;
            }
            var u2 = heapOrArray[idx++] & 63;
            if ((u0 & 240) == 224) {
              u0 = (u0 & 15) << 12 | u1 << 6 | u2;
            } else {
              u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
            }
            if (u0 < 65536) {
              str += String.fromCharCode(u0);
            } else {
              var ch = u0 - 65536;
              str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            }
          }
          return str;
        };
        var FS_stdin_getChar_buffer = [];
        var lengthBytesUTF8 = (str) => {
          var len = 0;
          for (var i = 0; i < str.length; ++i) {
            var c = str.charCodeAt(i);
            if (c <= 127) {
              len++;
            } else if (c <= 2047) {
              len += 2;
            } else if (c >= 55296 && c <= 57343) {
              len += 4;
              ++i;
            } else {
              len += 3;
            }
          }
          return len;
        };
        var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
          if (!(maxBytesToWrite > 0)) return 0;
          var startIdx = outIdx;
          var endIdx = outIdx + maxBytesToWrite - 1;
          for (var i = 0; i < str.length; ++i) {
            var u = str.codePointAt(i);
            if (u <= 127) {
              if (outIdx >= endIdx) break;
              heap[outIdx++] = u;
            } else if (u <= 2047) {
              if (outIdx + 1 >= endIdx) break;
              heap[outIdx++] = 192 | u >> 6;
              heap[outIdx++] = 128 | u & 63;
            } else if (u <= 65535) {
              if (outIdx + 2 >= endIdx) break;
              heap[outIdx++] = 224 | u >> 12;
              heap[outIdx++] = 128 | u >> 6 & 63;
              heap[outIdx++] = 128 | u & 63;
            } else {
              if (outIdx + 3 >= endIdx) break;
              heap[outIdx++] = 240 | u >> 18;
              heap[outIdx++] = 128 | u >> 12 & 63;
              heap[outIdx++] = 128 | u >> 6 & 63;
              heap[outIdx++] = 128 | u & 63;
              i++;
            }
          }
          heap[outIdx] = 0;
          return outIdx - startIdx;
        };
        var intArrayFromString = (stringy, dontAddNull, length) => {
          var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
          var u8array = new Array(len);
          var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
          if (dontAddNull) u8array.length = numBytesWritten;
          return u8array;
        };
        var FS_stdin_getChar = () => {
          if (!FS_stdin_getChar_buffer.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              var BUFSIZE = 256;
              var buf = Buffer.alloc(BUFSIZE);
              var bytesRead = 0;
              var fd = process.stdin.fd;
              try {
                bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
              } catch (e) {
                if (e.toString().includes("EOF")) bytesRead = 0;
                else throw e;
              }
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString("utf-8");
              }
            } else if (typeof window != "undefined" && typeof window.prompt == "function") {
              result = window.prompt("Input: ");
              if (result !== null) {
                result += "\n";
              }
            } else {
            }
            if (!result) {
              return null;
            }
            FS_stdin_getChar_buffer = intArrayFromString(result, true);
          }
          return FS_stdin_getChar_buffer.shift();
        };
        var TTY = { ttys: [], init() {
        }, shutdown() {
        }, register(dev, ops) {
          TTY.ttys[dev] = { input: [], output: [], ops };
          FS.registerDevice(dev, TTY.stream_ops);
        }, stream_ops: { open(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        }, close(stream) {
          stream.tty.ops.fsync(stream.tty);
        }, fsync(stream) {
          stream.tty.ops.fsync(stream.tty);
        }, read(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === void 0 && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === void 0) break;
            bytesRead++;
            buffer[offset + i] = result;
          }
          if (bytesRead) {
            stream.node.atime = Date.now();
          }
          return bytesRead;
        }, write(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.mtime = stream.node.ctime = Date.now();
          }
          return i;
        } }, default_tty_ops: { get_char(tty) {
          return FS_stdin_getChar();
        }, put_char(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        }, fsync(tty) {
          if (tty.output?.length > 0) {
            out(UTF8ArrayToString(tty.output));
            tty.output = [];
          }
        }, ioctl_tcgets(tty) {
          return { c_iflag: 25856, c_oflag: 5, c_cflag: 191, c_lflag: 35387, c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
        }, ioctl_tcsets(tty, optional_actions, data) {
          return 0;
        }, ioctl_tiocgwinsz(tty) {
          return [24, 80];
        } }, default_tty1_ops: { put_char(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        }, fsync(tty) {
          if (tty.output?.length > 0) {
            err(UTF8ArrayToString(tty.output));
            tty.output = [];
          }
        } } };
        var mmapAlloc = (size) => {
          abort();
        };
        var MEMFS = { ops_table: null, mount(mount) {
          return MEMFS.createNode(null, "/", 16895, 0);
        }, createNode(parent, name, mode, dev) {
          if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
            throw new FS.ErrnoError(63);
          }
          MEMFS.ops_table ||= { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } };
          var node = FS.createNode(parent, name, mode, dev);
          if (FS.isDir(node.mode)) {
            node.node_ops = MEMFS.ops_table.dir.node;
            node.stream_ops = MEMFS.ops_table.dir.stream;
            node.contents = {};
          } else if (FS.isFile(node.mode)) {
            node.node_ops = MEMFS.ops_table.file.node;
            node.stream_ops = MEMFS.ops_table.file.stream;
            node.usedBytes = 0;
            node.contents = null;
          } else if (FS.isLink(node.mode)) {
            node.node_ops = MEMFS.ops_table.link.node;
            node.stream_ops = MEMFS.ops_table.link.stream;
          } else if (FS.isChrdev(node.mode)) {
            node.node_ops = MEMFS.ops_table.chrdev.node;
            node.stream_ops = MEMFS.ops_table.chrdev.stream;
          }
          node.atime = node.mtime = node.ctime = Date.now();
          if (parent) {
            parent.contents[name] = node;
            parent.atime = parent.mtime = parent.ctime = node.atime;
          }
          return node;
        }, getFileDataAsTypedArray(node) {
          if (!node.contents) return new Uint8Array(0);
          if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
          return new Uint8Array(node.contents);
        }, expandFileStorage(node, newCapacity) {
          var prevCapacity = node.contents ? node.contents.length : 0;
          if (prevCapacity >= newCapacity) return;
          var CAPACITY_DOUBLING_MAX = 1024 * 1024;
          newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
          if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
          var oldContents = node.contents;
          node.contents = new Uint8Array(newCapacity);
          if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
        }, resizeFileStorage(node, newSize) {
          if (node.usedBytes == newSize) return;
          if (newSize == 0) {
            node.contents = null;
            node.usedBytes = 0;
          } else {
            var oldContents = node.contents;
            node.contents = new Uint8Array(newSize);
            if (oldContents) {
              node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
            }
            node.usedBytes = newSize;
          }
        }, node_ops: { getattr(node) {
          var attr = {};
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.atime);
          attr.mtime = new Date(node.mtime);
          attr.ctime = new Date(node.ctime);
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        }, setattr(node, attr) {
          for (const key of ["mode", "atime", "mtime", "ctime"]) {
            if (attr[key] != null) {
              node[key] = attr[key];
            }
          }
          if (attr.size !== void 0) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        }, lookup(parent, name) {
          throw MEMFS.doesNotExistError;
        }, mknod(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        }, rename(old_node, new_dir, new_name) {
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e) {
          }
          if (new_node) {
            if (FS.isDir(old_node.mode)) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
            FS.hashRemoveNode(new_node);
          }
          delete old_node.parent.contents[old_node.name];
          new_dir.contents[new_name] = old_node;
          old_node.name = new_name;
          new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
        }, unlink(parent, name) {
          delete parent.contents[name];
          parent.ctime = parent.mtime = Date.now();
        }, rmdir(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.ctime = parent.mtime = Date.now();
        }, readdir(node) {
          return [".", "..", ...Object.keys(node.contents)];
        }, symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
          node.link = oldpath;
          return node;
        }, readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        } }, stream_ops: { read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          if (size > 8 && contents.subarray) {
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        }, write(stream, buffer, offset, length, position, canOwn) {
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
          if (!length) return 0;
          var node = stream.node;
          node.mtime = node.ctime = Date.now();
          if (buffer.subarray && (!node.contents || node.contents.subarray)) {
            if (canOwn) {
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) {
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) {
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
          MEMFS.expandFileStorage(node, position + length);
          if (node.contents.subarray && buffer.subarray) {
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
              node.contents[position + i] = buffer[offset + i];
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        }, llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        }, mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            if (contents) {
              if (position > 0 || position + length < contents.length) {
                if (contents.subarray) {
                  contents = contents.subarray(position, position + length);
                } else {
                  contents = Array.prototype.slice.call(contents, position, position + length);
                }
              }
              HEAP8.set(contents, ptr);
            }
          }
          return { ptr, allocated };
        }, msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          return 0;
        } } };
        var asyncLoad = async (url) => {
          var arrayBuffer = await readAsync(url);
          return new Uint8Array(arrayBuffer);
        };
        var FS_createDataFile = (...args) => FS.createDataFile(...args);
        var getUniqueRunDependency = (id) => id;
        var preloadPlugins = [];
        var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
          if (typeof Browser != "undefined") Browser.init();
          var handled = false;
          preloadPlugins.forEach((plugin) => {
            if (handled) return;
            if (plugin["canHandle"](fullname)) {
              plugin["handle"](byteArray, fullname, finish, onerror);
              handled = true;
            }
          });
          return handled;
        };
        var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
          var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
          var dep = getUniqueRunDependency(`cp ${fullname}`);
          function processData(byteArray) {
            function finish(byteArray2) {
              preFinish?.();
              if (!dontCreateFile) {
                FS_createDataFile(parent, name, byteArray2, canRead, canWrite, canOwn);
              }
              onload?.();
              removeRunDependency(dep);
            }
            if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
              onerror?.();
              removeRunDependency(dep);
            })) {
              return;
            }
            finish(byteArray);
          }
          addRunDependency(dep);
          if (typeof url == "string") {
            asyncLoad(url).then(processData, onerror);
          } else {
            processData(url);
          }
        };
        var FS_modeStringToFlags = (str) => {
          var flagModes = { r: 0, "r+": 2, w: 512 | 64 | 1, "w+": 512 | 64 | 2, a: 1024 | 64 | 1, "a+": 1024 | 64 | 2 };
          var flags = flagModes[str];
          if (typeof flags == "undefined") {
            throw new Error(`Unknown file open mode: ${str}`);
          }
          return flags;
        };
        var FS_getMode = (canRead, canWrite) => {
          var mode = 0;
          if (canRead) mode |= 292 | 73;
          if (canWrite) mode |= 146;
          return mode;
        };
        var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, filesystems: null, syncFSRequests: 0, readFiles: {}, ErrnoError: class {
          name = "ErrnoError";
          constructor(errno) {
            this.errno = errno;
          }
        }, FSStream: class {
          shared = {};
          get object() {
            return this.node;
          }
          set object(val) {
            this.node = val;
          }
          get isRead() {
            return (this.flags & 2097155) !== 1;
          }
          get isWrite() {
            return (this.flags & 2097155) !== 0;
          }
          get isAppend() {
            return this.flags & 1024;
          }
          get flags() {
            return this.shared.flags;
          }
          set flags(val) {
            this.shared.flags = val;
          }
          get position() {
            return this.shared.position;
          }
          set position(val) {
            this.shared.position = val;
          }
        }, FSNode: class {
          node_ops = {};
          stream_ops = {};
          readMode = 292 | 73;
          writeMode = 146;
          mounted = null;
          constructor(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.rdev = rdev;
            this.atime = this.mtime = this.ctime = Date.now();
          }
          get read() {
            return (this.mode & this.readMode) === this.readMode;
          }
          set read(val) {
            val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
          }
          get write() {
            return (this.mode & this.writeMode) === this.writeMode;
          }
          set write(val) {
            val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
          }
          get isFolder() {
            return FS.isDir(this.mode);
          }
          get isDevice() {
            return FS.isChrdev(this.mode);
          }
        }, lookupPath(path, opts = {}) {
          if (!path) {
            throw new FS.ErrnoError(44);
          }
          opts.follow_mount ??= true;
          if (!PATH.isAbs(path)) {
            path = FS.cwd() + "/" + path;
          }
          linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
            var parts = path.split("/").filter((p) => !!p);
            var current = FS.root;
            var current_path = "/";
            for (var i = 0; i < parts.length; i++) {
              var islast = i === parts.length - 1;
              if (islast && opts.parent) {
                break;
              }
              if (parts[i] === ".") {
                continue;
              }
              if (parts[i] === "..") {
                current_path = PATH.dirname(current_path);
                if (FS.isRoot(current)) {
                  path = current_path + "/" + parts.slice(i + 1).join("/");
                  continue linkloop;
                } else {
                  current = current.parent;
                }
                continue;
              }
              current_path = PATH.join2(current_path, parts[i]);
              try {
                current = FS.lookupNode(current, parts[i]);
              } catch (e) {
                if (e?.errno === 44 && islast && opts.noent_okay) {
                  return { path: current_path };
                }
                throw e;
              }
              if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
                current = current.mounted.root;
              }
              if (FS.isLink(current.mode) && (!islast || opts.follow)) {
                if (!current.node_ops.readlink) {
                  throw new FS.ErrnoError(52);
                }
                var link = current.node_ops.readlink(current);
                if (!PATH.isAbs(link)) {
                  link = PATH.dirname(current_path) + "/" + link;
                }
                path = link + "/" + parts.slice(i + 1).join("/");
                continue linkloop;
              }
            }
            return { path: current_path, node: current };
          }
          throw new FS.ErrnoError(32);
        }, getPath(node) {
          var path;
          while (true) {
            if (FS.isRoot(node)) {
              var mount = node.mount.mountpoint;
              if (!path) return mount;
              return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
            }
            path = path ? `${node.name}/${path}` : node.name;
            node = node.parent;
          }
        }, hashName(parentid, name) {
          var hash = 0;
          for (var i = 0; i < name.length; i++) {
            hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
          }
          return (parentid + hash >>> 0) % FS.nameTable.length;
        }, hashAddNode(node) {
          var hash = FS.hashName(node.parent.id, node.name);
          node.name_next = FS.nameTable[hash];
          FS.nameTable[hash] = node;
        }, hashRemoveNode(node) {
          var hash = FS.hashName(node.parent.id, node.name);
          if (FS.nameTable[hash] === node) {
            FS.nameTable[hash] = node.name_next;
          } else {
            var current = FS.nameTable[hash];
            while (current) {
              if (current.name_next === node) {
                current.name_next = node.name_next;
                break;
              }
              current = current.name_next;
            }
          }
        }, lookupNode(parent, name) {
          var errCode = FS.mayLookup(parent);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          var hash = FS.hashName(parent.id, name);
          for (var node = FS.nameTable[hash]; node; node = node.name_next) {
            var nodeName = node.name;
            if (node.parent.id === parent.id && nodeName === name) {
              return node;
            }
          }
          return FS.lookup(parent, name);
        }, createNode(parent, name, mode, rdev) {
          var node = new FS.FSNode(parent, name, mode, rdev);
          FS.hashAddNode(node);
          return node;
        }, destroyNode(node) {
          FS.hashRemoveNode(node);
        }, isRoot(node) {
          return node === node.parent;
        }, isMountpoint(node) {
          return !!node.mounted;
        }, isFile(mode) {
          return (mode & 61440) === 32768;
        }, isDir(mode) {
          return (mode & 61440) === 16384;
        }, isLink(mode) {
          return (mode & 61440) === 40960;
        }, isChrdev(mode) {
          return (mode & 61440) === 8192;
        }, isBlkdev(mode) {
          return (mode & 61440) === 24576;
        }, isFIFO(mode) {
          return (mode & 61440) === 4096;
        }, isSocket(mode) {
          return (mode & 49152) === 49152;
        }, flagsToPermissionString(flag) {
          var perms = ["r", "w", "rw"][flag & 3];
          if (flag & 512) {
            perms += "w";
          }
          return perms;
        }, nodePermissions(node, perms) {
          if (FS.ignorePermissions) {
            return 0;
          }
          if (perms.includes("r") && !(node.mode & 292)) {
            return 2;
          } else if (perms.includes("w") && !(node.mode & 146)) {
            return 2;
          } else if (perms.includes("x") && !(node.mode & 73)) {
            return 2;
          }
          return 0;
        }, mayLookup(dir) {
          if (!FS.isDir(dir.mode)) return 54;
          var errCode = FS.nodePermissions(dir, "x");
          if (errCode) return errCode;
          if (!dir.node_ops.lookup) return 2;
          return 0;
        }, mayCreate(dir, name) {
          if (!FS.isDir(dir.mode)) {
            return 54;
          }
          try {
            var node = FS.lookupNode(dir, name);
            return 20;
          } catch (e) {
          }
          return FS.nodePermissions(dir, "wx");
        }, mayDelete(dir, name, isdir) {
          var node;
          try {
            node = FS.lookupNode(dir, name);
          } catch (e) {
            return e.errno;
          }
          var errCode = FS.nodePermissions(dir, "wx");
          if (errCode) {
            return errCode;
          }
          if (isdir) {
            if (!FS.isDir(node.mode)) {
              return 54;
            }
            if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
              return 10;
            }
          } else {
            if (FS.isDir(node.mode)) {
              return 31;
            }
          }
          return 0;
        }, mayOpen(node, flags) {
          if (!node) {
            return 44;
          }
          if (FS.isLink(node.mode)) {
            return 32;
          } else if (FS.isDir(node.mode)) {
            if (FS.flagsToPermissionString(flags) !== "r" || flags & (512 | 64)) {
              return 31;
            }
          }
          return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
        }, checkOpExists(op, err2) {
          if (!op) {
            throw new FS.ErrnoError(err2);
          }
          return op;
        }, MAX_OPEN_FDS: 4096, nextfd() {
          for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
            if (!FS.streams[fd]) {
              return fd;
            }
          }
          throw new FS.ErrnoError(33);
        }, getStreamChecked(fd) {
          var stream = FS.getStream(fd);
          if (!stream) {
            throw new FS.ErrnoError(8);
          }
          return stream;
        }, getStream: (fd) => FS.streams[fd], createStream(stream, fd = -1) {
          stream = Object.assign(new FS.FSStream(), stream);
          if (fd == -1) {
            fd = FS.nextfd();
          }
          stream.fd = fd;
          FS.streams[fd] = stream;
          return stream;
        }, closeStream(fd) {
          FS.streams[fd] = null;
        }, dupStream(origStream, fd = -1) {
          var stream = FS.createStream(origStream, fd);
          stream.stream_ops?.dup?.(stream);
          return stream;
        }, doSetAttr(stream, node, attr) {
          var setattr = stream?.stream_ops.setattr;
          var arg = setattr ? stream : node;
          setattr ??= node.node_ops.setattr;
          FS.checkOpExists(setattr, 63);
          setattr(arg, attr);
        }, chrdev_stream_ops: { open(stream) {
          var device = FS.getDevice(stream.node.rdev);
          stream.stream_ops = device.stream_ops;
          stream.stream_ops.open?.(stream);
        }, llseek() {
          throw new FS.ErrnoError(70);
        } }, major: (dev) => dev >> 8, minor: (dev) => dev & 255, makedev: (ma, mi) => ma << 8 | mi, registerDevice(dev, ops) {
          FS.devices[dev] = { stream_ops: ops };
        }, getDevice: (dev) => FS.devices[dev], getMounts(mount) {
          var mounts = [];
          var check = [mount];
          while (check.length) {
            var m = check.pop();
            mounts.push(m);
            check.push(...m.mounts);
          }
          return mounts;
        }, syncfs(populate, callback) {
          if (typeof populate == "function") {
            callback = populate;
            populate = false;
          }
          FS.syncFSRequests++;
          if (FS.syncFSRequests > 1) {
            err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
          }
          var mounts = FS.getMounts(FS.root.mount);
          var completed = 0;
          function doCallback(errCode) {
            FS.syncFSRequests--;
            return callback(errCode);
          }
          function done(errCode) {
            if (errCode) {
              if (!done.errored) {
                done.errored = true;
                return doCallback(errCode);
              }
              return;
            }
            if (++completed >= mounts.length) {
              doCallback(null);
            }
          }
          mounts.forEach((mount) => {
            if (!mount.type.syncfs) {
              return done(null);
            }
            mount.type.syncfs(mount, populate, done);
          });
        }, mount(type, opts, mountpoint) {
          var root = mountpoint === "/";
          var pseudo = !mountpoint;
          var node;
          if (root && FS.root) {
            throw new FS.ErrnoError(10);
          } else if (!root && !pseudo) {
            var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
            mountpoint = lookup.path;
            node = lookup.node;
            if (FS.isMountpoint(node)) {
              throw new FS.ErrnoError(10);
            }
            if (!FS.isDir(node.mode)) {
              throw new FS.ErrnoError(54);
            }
          }
          var mount = { type, opts, mountpoint, mounts: [] };
          var mountRoot = type.mount(mount);
          mountRoot.mount = mount;
          mount.root = mountRoot;
          if (root) {
            FS.root = mountRoot;
          } else if (node) {
            node.mounted = mount;
            if (node.mount) {
              node.mount.mounts.push(mount);
            }
          }
          return mountRoot;
        }, unmount(mountpoint) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
          if (!FS.isMountpoint(lookup.node)) {
            throw new FS.ErrnoError(28);
          }
          var node = lookup.node;
          var mount = node.mounted;
          var mounts = FS.getMounts(mount);
          Object.keys(FS.nameTable).forEach((hash) => {
            var current = FS.nameTable[hash];
            while (current) {
              var next = current.name_next;
              if (mounts.includes(current.mount)) {
                FS.destroyNode(current);
              }
              current = next;
            }
          });
          node.mounted = null;
          var idx = node.mount.mounts.indexOf(mount);
          node.mount.mounts.splice(idx, 1);
        }, lookup(parent, name) {
          return parent.node_ops.lookup(parent, name);
        }, mknod(path, mode, dev) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          var name = PATH.basename(path);
          if (!name) {
            throw new FS.ErrnoError(28);
          }
          if (name === "." || name === "..") {
            throw new FS.ErrnoError(20);
          }
          var errCode = FS.mayCreate(parent, name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.mknod) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.mknod(parent, name, mode, dev);
        }, statfs(path) {
          return FS.statfsNode(FS.lookupPath(path, { follow: true }).node);
        }, statfsStream(stream) {
          return FS.statfsNode(stream.node);
        }, statfsNode(node) {
          var rtn = { bsize: 4096, frsize: 4096, blocks: 1e6, bfree: 5e5, bavail: 5e5, files: FS.nextInode, ffree: FS.nextInode - 1, fsid: 42, flags: 2, namelen: 255 };
          if (node.node_ops.statfs) {
            Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
          }
          return rtn;
        }, create(path, mode = 438) {
          mode &= 4095;
          mode |= 32768;
          return FS.mknod(path, mode, 0);
        }, mkdir(path, mode = 511) {
          mode &= 511 | 512;
          mode |= 16384;
          return FS.mknod(path, mode, 0);
        }, mkdirTree(path, mode) {
          var dirs = path.split("/");
          var d = "";
          for (var dir of dirs) {
            if (!dir) continue;
            if (d || PATH.isAbs(path)) d += "/";
            d += dir;
            try {
              FS.mkdir(d, mode);
            } catch (e) {
              if (e.errno != 20) throw e;
            }
          }
        }, mkdev(path, mode, dev) {
          if (typeof dev == "undefined") {
            dev = mode;
            mode = 438;
          }
          mode |= 8192;
          return FS.mknod(path, mode, dev);
        }, symlink(oldpath, newpath) {
          if (!PATH_FS.resolve(oldpath)) {
            throw new FS.ErrnoError(44);
          }
          var lookup = FS.lookupPath(newpath, { parent: true });
          var parent = lookup.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var newname = PATH.basename(newpath);
          var errCode = FS.mayCreate(parent, newname);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.symlink) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.symlink(parent, newname, oldpath);
        }, rename(old_path, new_path) {
          var old_dirname = PATH.dirname(old_path);
          var new_dirname = PATH.dirname(new_path);
          var old_name = PATH.basename(old_path);
          var new_name = PATH.basename(new_path);
          var lookup, old_dir, new_dir;
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
          if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
          if (old_dir.mount !== new_dir.mount) {
            throw new FS.ErrnoError(75);
          }
          var old_node = FS.lookupNode(old_dir, old_name);
          var relative = PATH_FS.relative(old_path, new_dirname);
          if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(28);
          }
          relative = PATH_FS.relative(new_path, old_dirname);
          if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(55);
          }
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e) {
          }
          if (old_node === new_node) {
            return;
          }
          var isdir = FS.isDir(old_node.mode);
          var errCode = FS.mayDelete(old_dir, old_name, isdir);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!old_dir.node_ops.rename) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
            throw new FS.ErrnoError(10);
          }
          if (new_dir !== old_dir) {
            errCode = FS.nodePermissions(old_dir, "w");
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          FS.hashRemoveNode(old_node);
          try {
            old_dir.node_ops.rename(old_node, new_dir, new_name);
            old_node.parent = new_dir;
          } catch (e) {
            throw e;
          } finally {
            FS.hashAddNode(old_node);
          }
        }, rmdir(path) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          var name = PATH.basename(path);
          var node = FS.lookupNode(parent, name);
          var errCode = FS.mayDelete(parent, name, true);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.rmdir) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          parent.node_ops.rmdir(parent, name);
          FS.destroyNode(node);
        }, readdir(path) {
          var lookup = FS.lookupPath(path, { follow: true });
          var node = lookup.node;
          var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
          return readdir(node);
        }, unlink(path) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var name = PATH.basename(path);
          var node = FS.lookupNode(parent, name);
          var errCode = FS.mayDelete(parent, name, false);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.unlink) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          parent.node_ops.unlink(parent, name);
          FS.destroyNode(node);
        }, readlink(path) {
          var lookup = FS.lookupPath(path);
          var link = lookup.node;
          if (!link) {
            throw new FS.ErrnoError(44);
          }
          if (!link.node_ops.readlink) {
            throw new FS.ErrnoError(28);
          }
          return link.node_ops.readlink(link);
        }, stat(path, dontFollow) {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          var node = lookup.node;
          var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
          return getattr(node);
        }, fstat(fd) {
          var stream = FS.getStreamChecked(fd);
          var node = stream.node;
          var getattr = stream.stream_ops.getattr;
          var arg = getattr ? stream : node;
          getattr ??= node.node_ops.getattr;
          FS.checkOpExists(getattr, 63);
          return getattr(arg);
        }, lstat(path) {
          return FS.stat(path, true);
        }, doChmod(stream, node, mode, dontFollow) {
          FS.doSetAttr(stream, node, { mode: mode & 4095 | node.mode & ~4095, ctime: Date.now(), dontFollow });
        }, chmod(path, mode, dontFollow) {
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doChmod(null, node, mode, dontFollow);
        }, lchmod(path, mode) {
          FS.chmod(path, mode, true);
        }, fchmod(fd, mode) {
          var stream = FS.getStreamChecked(fd);
          FS.doChmod(stream, stream.node, mode, false);
        }, doChown(stream, node, dontFollow) {
          FS.doSetAttr(stream, node, { timestamp: Date.now(), dontFollow });
        }, chown(path, uid, gid, dontFollow) {
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doChown(null, node, dontFollow);
        }, lchown(path, uid, gid) {
          FS.chown(path, uid, gid, true);
        }, fchown(fd, uid, gid) {
          var stream = FS.getStreamChecked(fd);
          FS.doChown(stream, stream.node, false);
        }, doTruncate(stream, node, len) {
          if (FS.isDir(node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!FS.isFile(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          var errCode = FS.nodePermissions(node, "w");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          FS.doSetAttr(stream, node, { size: len, timestamp: Date.now() });
        }, truncate(path, len) {
          if (len < 0) {
            throw new FS.ErrnoError(28);
          }
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, { follow: true });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doTruncate(null, node, len);
        }, ftruncate(fd, len) {
          var stream = FS.getStreamChecked(fd);
          if (len < 0 || (stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(28);
          }
          FS.doTruncate(stream, stream.node, len);
        }, utime(path, atime, mtime) {
          var lookup = FS.lookupPath(path, { follow: true });
          var node = lookup.node;
          var setattr = FS.checkOpExists(node.node_ops.setattr, 63);
          setattr(node, { atime, mtime });
        }, open(path, flags, mode = 438) {
          if (path === "") {
            throw new FS.ErrnoError(44);
          }
          flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
          if (flags & 64) {
            mode = mode & 4095 | 32768;
          } else {
            mode = 0;
          }
          var node;
          var isDirPath;
          if (typeof path == "object") {
            node = path;
          } else {
            isDirPath = path.endsWith("/");
            var lookup = FS.lookupPath(path, { follow: !(flags & 131072), noent_okay: true });
            node = lookup.node;
            path = lookup.path;
          }
          var created = false;
          if (flags & 64) {
            if (node) {
              if (flags & 128) {
                throw new FS.ErrnoError(20);
              }
            } else if (isDirPath) {
              throw new FS.ErrnoError(31);
            } else {
              node = FS.mknod(path, mode | 511, 0);
              created = true;
            }
          }
          if (!node) {
            throw new FS.ErrnoError(44);
          }
          if (FS.isChrdev(node.mode)) {
            flags &= ~512;
          }
          if (flags & 65536 && !FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
          if (!created) {
            var errCode = FS.mayOpen(node, flags);
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          if (flags & 512 && !created) {
            FS.truncate(node, 0);
          }
          flags &= ~(128 | 512 | 131072);
          var stream = FS.createStream({ node, path: FS.getPath(node), flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false });
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
          if (created) {
            FS.chmod(node, mode & 511);
          }
          if (Module["logReadFiles"] && !(flags & 1)) {
            if (!(path in FS.readFiles)) {
              FS.readFiles[path] = 1;
            }
          }
          return stream;
        }, close(stream) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (stream.getdents) stream.getdents = null;
          try {
            if (stream.stream_ops.close) {
              stream.stream_ops.close(stream);
            }
          } catch (e) {
            throw e;
          } finally {
            FS.closeStream(stream.fd);
          }
          stream.fd = null;
        }, isClosed(stream) {
          return stream.fd === null;
        }, llseek(stream, offset, whence) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (!stream.seekable || !stream.stream_ops.llseek) {
            throw new FS.ErrnoError(70);
          }
          if (whence != 0 && whence != 1 && whence != 2) {
            throw new FS.ErrnoError(28);
          }
          stream.position = stream.stream_ops.llseek(stream, offset, whence);
          stream.ungotten = [];
          return stream.position;
        }, read(stream, buffer, offset, length, position) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.read) {
            throw new FS.ErrnoError(28);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
          if (!seeking) stream.position += bytesRead;
          return bytesRead;
        }, write(stream, buffer, offset, length, position, canOwn) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.write) {
            throw new FS.ErrnoError(28);
          }
          if (stream.seekable && stream.flags & 1024) {
            FS.llseek(stream, 0, 2);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
          if (!seeking) stream.position += bytesWritten;
          return bytesWritten;
        }, mmap(stream, length, position, prot, flags) {
          if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
            throw new FS.ErrnoError(2);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(2);
          }
          if (!stream.stream_ops.mmap) {
            throw new FS.ErrnoError(43);
          }
          if (!length) {
            throw new FS.ErrnoError(28);
          }
          return stream.stream_ops.mmap(stream, length, position, prot, flags);
        }, msync(stream, buffer, offset, length, mmapFlags) {
          if (!stream.stream_ops.msync) {
            return 0;
          }
          return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
        }, ioctl(stream, cmd, arg) {
          if (!stream.stream_ops.ioctl) {
            throw new FS.ErrnoError(59);
          }
          return stream.stream_ops.ioctl(stream, cmd, arg);
        }, readFile(path, opts = {}) {
          opts.flags = opts.flags || 0;
          opts.encoding = opts.encoding || "binary";
          if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
            throw new Error(`Invalid encoding type "${opts.encoding}"`);
          }
          var stream = FS.open(path, opts.flags);
          var stat = FS.stat(path);
          var length = stat.size;
          var buf = new Uint8Array(length);
          FS.read(stream, buf, 0, length, 0);
          if (opts.encoding === "utf8") {
            buf = UTF8ArrayToString(buf);
          }
          FS.close(stream);
          return buf;
        }, writeFile(path, data, opts = {}) {
          opts.flags = opts.flags || 577;
          var stream = FS.open(path, opts.flags, opts.mode);
          if (typeof data == "string") {
            data = new Uint8Array(intArrayFromString(data, true));
          }
          if (ArrayBuffer.isView(data)) {
            FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
          } else {
            throw new Error("Unsupported data type");
          }
          FS.close(stream);
        }, cwd: () => FS.currentPath, chdir(path) {
          var lookup = FS.lookupPath(path, { follow: true });
          if (lookup.node === null) {
            throw new FS.ErrnoError(44);
          }
          if (!FS.isDir(lookup.node.mode)) {
            throw new FS.ErrnoError(54);
          }
          var errCode = FS.nodePermissions(lookup.node, "x");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          FS.currentPath = lookup.path;
        }, createDefaultDirectories() {
          FS.mkdir("/tmp");
          FS.mkdir("/home");
          FS.mkdir("/home/web_user");
        }, createDefaultDevices() {
          FS.mkdir("/dev");
          FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (stream, buffer, offset, length, pos) => length, llseek: () => 0 });
          FS.mkdev("/dev/null", FS.makedev(1, 3));
          TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
          TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
          FS.mkdev("/dev/tty", FS.makedev(5, 0));
          FS.mkdev("/dev/tty1", FS.makedev(6, 0));
          var randomBuffer = new Uint8Array(1024), randomLeft = 0;
          var randomByte = () => {
            if (randomLeft === 0) {
              randomFill(randomBuffer);
              randomLeft = randomBuffer.byteLength;
            }
            return randomBuffer[--randomLeft];
          };
          FS.createDevice("/dev", "random", randomByte);
          FS.createDevice("/dev", "urandom", randomByte);
          FS.mkdir("/dev/shm");
          FS.mkdir("/dev/shm/tmp");
        }, createSpecialDirectories() {
          FS.mkdir("/proc");
          var proc_self = FS.mkdir("/proc/self");
          FS.mkdir("/proc/self/fd");
          FS.mount({ mount() {
            var node = FS.createNode(proc_self, "fd", 16895, 73);
            node.stream_ops = { llseek: MEMFS.stream_ops.llseek };
            node.node_ops = { lookup(parent, name) {
              var fd = +name;
              var stream = FS.getStreamChecked(fd);
              var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => stream.path }, id: fd + 1 };
              ret.parent = ret;
              return ret;
            }, readdir() {
              return Array.from(FS.streams.entries()).filter(([k, v]) => v).map(([k, v]) => k.toString());
            } };
            return node;
          } }, {}, "/proc/self/fd");
        }, createStandardStreams(input, output, error) {
          if (input) {
            FS.createDevice("/dev", "stdin", input);
          } else {
            FS.symlink("/dev/tty", "/dev/stdin");
          }
          if (output) {
            FS.createDevice("/dev", "stdout", null, output);
          } else {
            FS.symlink("/dev/tty", "/dev/stdout");
          }
          if (error) {
            FS.createDevice("/dev", "stderr", null, error);
          } else {
            FS.symlink("/dev/tty1", "/dev/stderr");
          }
          var stdin = FS.open("/dev/stdin", 0);
          var stdout = FS.open("/dev/stdout", 1);
          var stderr = FS.open("/dev/stderr", 1);
        }, staticInit() {
          FS.nameTable = new Array(4096);
          FS.mount(MEMFS, {}, "/");
          FS.createDefaultDirectories();
          FS.createDefaultDevices();
          FS.createSpecialDirectories();
          FS.filesystems = { MEMFS };
        }, init(input, output, error) {
          FS.initialized = true;
          input ??= Module["stdin"];
          output ??= Module["stdout"];
          error ??= Module["stderr"];
          FS.createStandardStreams(input, output, error);
        }, quit() {
          FS.initialized = false;
          for (var stream of FS.streams) {
            if (stream) {
              FS.close(stream);
            }
          }
        }, findObject(path, dontResolveLastLink) {
          var ret = FS.analyzePath(path, dontResolveLastLink);
          if (!ret.exists) {
            return null;
          }
          return ret.object;
        }, analyzePath(path, dontResolveLastLink) {
          try {
            var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
            path = lookup.path;
          } catch (e) {
          }
          var ret = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null };
          try {
            var lookup = FS.lookupPath(path, { parent: true });
            ret.parentExists = true;
            ret.parentPath = lookup.path;
            ret.parentObject = lookup.node;
            ret.name = PATH.basename(path);
            lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
            ret.exists = true;
            ret.path = lookup.path;
            ret.object = lookup.node;
            ret.name = lookup.node.name;
            ret.isRoot = lookup.path === "/";
          } catch (e) {
            ret.error = e.errno;
          }
          return ret;
        }, createPath(parent, path, canRead, canWrite) {
          parent = typeof parent == "string" ? parent : FS.getPath(parent);
          var parts = path.split("/").reverse();
          while (parts.length) {
            var part = parts.pop();
            if (!part) continue;
            var current = PATH.join2(parent, part);
            try {
              FS.mkdir(current);
            } catch (e) {
              if (e.errno != 20) throw e;
            }
            parent = current;
          }
          return current;
        }, createFile(parent, name, properties, canRead, canWrite) {
          var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
          var mode = FS_getMode(canRead, canWrite);
          return FS.create(path, mode);
        }, createDataFile(parent, name, data, canRead, canWrite, canOwn) {
          var path = name;
          if (parent) {
            parent = typeof parent == "string" ? parent : FS.getPath(parent);
            path = name ? PATH.join2(parent, name) : parent;
          }
          var mode = FS_getMode(canRead, canWrite);
          var node = FS.create(path, mode);
          if (data) {
            if (typeof data == "string") {
              var arr = new Array(data.length);
              for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
              data = arr;
            }
            FS.chmod(node, mode | 146);
            var stream = FS.open(node, 577);
            FS.write(stream, data, 0, data.length, 0, canOwn);
            FS.close(stream);
            FS.chmod(node, mode);
          }
        }, createDevice(parent, name, input, output) {
          var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
          var mode = FS_getMode(!!input, !!output);
          FS.createDevice.major ??= 64;
          var dev = FS.makedev(FS.createDevice.major++, 0);
          FS.registerDevice(dev, { open(stream) {
            stream.seekable = false;
          }, close(stream) {
            if (output?.buffer?.length) {
              output(10);
            }
          }, read(stream, buffer, offset, length, pos) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === void 0 && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === void 0) break;
              bytesRead++;
              buffer[offset + i] = result;
            }
            if (bytesRead) {
              stream.node.atime = Date.now();
            }
            return bytesRead;
          }, write(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset + i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.mtime = stream.node.ctime = Date.now();
            }
            return i;
          } });
          return FS.mkdev(path, mode, dev);
        }, forceLoadFile(obj) {
          if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
          if (typeof XMLHttpRequest != "undefined") {
            throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
          } else {
            try {
              obj.contents = readBinary(obj.url);
              obj.usedBytes = obj.contents.length;
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
          }
        }, createLazyFile(parent, name, url, canRead, canWrite) {
          class LazyUint8Array {
            lengthKnown = false;
            chunks = [];
            get(idx) {
              if (idx > this.length - 1 || idx < 0) {
                return void 0;
              }
              var chunkOffset = idx % this.chunkSize;
              var chunkNum = idx / this.chunkSize | 0;
              return this.getter(chunkNum)[chunkOffset];
            }
            setDataGetter(getter) {
              this.getter = getter;
            }
            cacheLength() {
              var xhr = new XMLHttpRequest();
              xhr.open("HEAD", url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
              var chunkSize = 1024 * 1024;
              if (!hasByteServing) chunkSize = datalength;
              var doXHR = (from, to) => {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
                var xhr2 = new XMLHttpRequest();
                xhr2.open("GET", url, false);
                if (datalength !== chunkSize) xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
                xhr2.responseType = "arraybuffer";
                if (xhr2.overrideMimeType) {
                  xhr2.overrideMimeType("text/plain; charset=x-user-defined");
                }
                xhr2.send(null);
                if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr2.status);
                if (xhr2.response !== void 0) {
                  return new Uint8Array(xhr2.response || []);
                }
                return intArrayFromString(xhr2.responseText || "", true);
              };
              var lazyArray2 = this;
              lazyArray2.setDataGetter((chunkNum) => {
                var start = chunkNum * chunkSize;
                var end = (chunkNum + 1) * chunkSize - 1;
                end = Math.min(end, datalength - 1);
                if (typeof lazyArray2.chunks[chunkNum] == "undefined") {
                  lazyArray2.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof lazyArray2.chunks[chunkNum] == "undefined") throw new Error("doXHR failed!");
                return lazyArray2.chunks[chunkNum];
              });
              if (usesGzip || !datalength) {
                chunkSize = datalength = 1;
                datalength = this.getter(0).length;
                chunkSize = datalength;
                out("LazyFiles on gzip forces download of the whole file when length is accessed");
              }
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
            }
            get length() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._length;
            }
            get chunkSize() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._chunkSize;
            }
          }
          if (typeof XMLHttpRequest != "undefined") {
            if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var lazyArray = new LazyUint8Array();
            var properties = { isDevice: false, contents: lazyArray };
          } else {
            var properties = { isDevice: false, url };
          }
          var node = FS.createFile(parent, name, properties, canRead, canWrite);
          if (properties.contents) {
            node.contents = properties.contents;
          } else if (properties.url) {
            node.contents = null;
            node.url = properties.url;
          }
          Object.defineProperties(node, { usedBytes: { get: function() {
            return this.contents.length;
          } } });
          var stream_ops = {};
          var keys = Object.keys(node.stream_ops);
          keys.forEach((key) => {
            var fn = node.stream_ops[key];
            stream_ops[key] = (...args) => {
              FS.forceLoadFile(node);
              return fn(...args);
            };
          });
          function writeChunks(stream, buffer, offset, length, position) {
            var contents = stream.node.contents;
            if (position >= contents.length) return 0;
            var size = Math.min(contents.length - position, length);
            if (contents.slice) {
              for (var i = 0; i < size; i++) {
                buffer[offset + i] = contents[position + i];
              }
            } else {
              for (var i = 0; i < size; i++) {
                buffer[offset + i] = contents.get(position + i);
              }
            }
            return size;
          }
          stream_ops.read = (stream, buffer, offset, length, position) => {
            FS.forceLoadFile(node);
            return writeChunks(stream, buffer, offset, length, position);
          };
          stream_ops.mmap = (stream, length, position, prot, flags) => {
            FS.forceLoadFile(node);
            var ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            writeChunks(stream, HEAP8, ptr, length, position);
            return { ptr, allocated: true };
          };
          node.stream_ops = stream_ops;
          return node;
        } };
        var UTF8ToString = (ptr, maxBytesToRead) => ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
        var SYSCALLS = { DEFAULT_POLLMASK: 5, calculateAt(dirfd, path, allowEmpty) {
          if (PATH.isAbs(path)) {
            return path;
          }
          var dir;
          if (dirfd === -100) {
            dir = FS.cwd();
          } else {
            var dirstream = SYSCALLS.getStreamFromFD(dirfd);
            dir = dirstream.path;
          }
          if (path.length == 0) {
            if (!allowEmpty) {
              throw new FS.ErrnoError(44);
            }
            return dir;
          }
          return dir + "/" + path;
        }, writeStat(buf, stat) {
          HEAP32[buf >> 2] = stat.dev;
          HEAP32[buf + 4 >> 2] = stat.mode;
          HEAPU32[buf + 8 >> 2] = stat.nlink;
          HEAP32[buf + 12 >> 2] = stat.uid;
          HEAP32[buf + 16 >> 2] = stat.gid;
          HEAP32[buf + 20 >> 2] = stat.rdev;
          HEAP64[buf + 24 >> 3] = BigInt(stat.size);
          HEAP32[buf + 32 >> 2] = 4096;
          HEAP32[buf + 36 >> 2] = stat.blocks;
          var atime = stat.atime.getTime();
          var mtime = stat.mtime.getTime();
          var ctime = stat.ctime.getTime();
          HEAP64[buf + 40 >> 3] = BigInt(Math.floor(atime / 1e3));
          HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3 * 1e3;
          HEAP64[buf + 56 >> 3] = BigInt(Math.floor(mtime / 1e3));
          HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3 * 1e3;
          HEAP64[buf + 72 >> 3] = BigInt(Math.floor(ctime / 1e3));
          HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3 * 1e3;
          HEAP64[buf + 88 >> 3] = BigInt(stat.ino);
          return 0;
        }, writeStatFs(buf, stats) {
          HEAP32[buf + 4 >> 2] = stats.bsize;
          HEAP32[buf + 40 >> 2] = stats.bsize;
          HEAP32[buf + 8 >> 2] = stats.blocks;
          HEAP32[buf + 12 >> 2] = stats.bfree;
          HEAP32[buf + 16 >> 2] = stats.bavail;
          HEAP32[buf + 20 >> 2] = stats.files;
          HEAP32[buf + 24 >> 2] = stats.ffree;
          HEAP32[buf + 28 >> 2] = stats.fsid;
          HEAP32[buf + 44 >> 2] = stats.flags;
          HEAP32[buf + 36 >> 2] = stats.namelen;
        }, doMsync(addr, stream, len, flags, offset) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (flags & 2) {
            return 0;
          }
          var buffer = HEAPU8.slice(addr, addr + len);
          FS.msync(stream, buffer, offset, len, flags);
        }, getStreamFromFD(fd) {
          var stream = FS.getStreamChecked(fd);
          return stream;
        }, varargs: void 0, getStr(ptr) {
          var ret = UTF8ToString(ptr);
          return ret;
        } };
        function _fd_close(fd) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            FS.close(stream);
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var doReadv = (stream, iov, iovcnt, offset) => {
          var ret = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            var curr = FS.read(stream, HEAP8, ptr, len, offset);
            if (curr < 0) return -1;
            ret += curr;
            if (curr < len) break;
            if (typeof offset != "undefined") {
              offset += curr;
            }
          }
          return ret;
        };
        function _fd_read(fd, iov, iovcnt, pnum) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = doReadv(stream, iov, iovcnt);
            HEAPU32[pnum >> 2] = num;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var INT53_MAX = 9007199254740992;
        var INT53_MIN = -9007199254740992;
        var bigintToI53Checked = (num) => num < INT53_MIN || num > INT53_MAX ? NaN : Number(num);
        function _fd_seek(fd, offset, whence, newOffset) {
          offset = bigintToI53Checked(offset);
          try {
            if (isNaN(offset)) return 61;
            var stream = SYSCALLS.getStreamFromFD(fd);
            FS.llseek(stream, offset, whence);
            HEAP64[newOffset >> 3] = BigInt(stream.position);
            if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var doWritev = (stream, iov, iovcnt, offset) => {
          var ret = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAPU32[iov >> 2];
            var len = HEAPU32[iov + 4 >> 2];
            iov += 8;
            var curr = FS.write(stream, HEAP8, ptr, len, offset);
            if (curr < 0) return -1;
            ret += curr;
            if (curr < len) {
              break;
            }
            if (typeof offset != "undefined") {
              offset += curr;
            }
          }
          return ret;
        };
        function _fd_write(fd, iov, iovcnt, pnum) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = doWritev(stream, iov, iovcnt);
            HEAPU32[pnum >> 2] = num;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var wasmTableMirror = [];
        var wasmTable;
        var getWasmTableEntry = (funcPtr) => {
          var func = wasmTableMirror[funcPtr];
          if (!func) {
            wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
          }
          return func;
        };
        var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
        FS.createPreloadedFile = FS_createPreloadedFile;
        FS.staticInit();
        MEMFS.doesNotExistError = new FS.ErrnoError(44);
        MEMFS.doesNotExistError.stack = "<generic error, no stack>";
        {
          if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
          if (Module["preloadPlugins"]) preloadPlugins = Module["preloadPlugins"];
          if (Module["print"]) out = Module["print"];
          if (Module["printErr"]) err = Module["printErr"];
          if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
          if (Module["arguments"]) arguments_ = Module["arguments"];
          if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
        }
        Module["getValue"] = getValue;
        Module["UTF8ToString"] = UTF8ToString;
        Module["stringToUTF8"] = stringToUTF8;
        Module["lengthBytesUTF8"] = lengthBytesUTF8;
        var _wasm_parse_query_raw, _malloc, _free, _wasm_free_parse_result, __emscripten_timeout, _setThrew, __emscripten_stack_restore, _emscripten_stack_get_current;
        function assignWasmExports(wasmExports2) {
          Module["_wasm_parse_query_raw"] = _wasm_parse_query_raw = wasmExports2["r"];
          Module["_malloc"] = _malloc = wasmExports2["s"];
          Module["_free"] = _free = wasmExports2["u"];
          Module["_wasm_free_parse_result"] = _wasm_free_parse_result = wasmExports2["v"];
          __emscripten_timeout = wasmExports2["w"];
          _setThrew = wasmExports2["x"];
          __emscripten_stack_restore = wasmExports2["y"];
          _emscripten_stack_get_current = wasmExports2["z"];
        }
        var wasmImports = { g: __abort_js, k: __emscripten_runtime_keepalive_clear, m: __emscripten_throw_longjmp, l: __setitimer_js, n: _emscripten_resize_heap, b: _exit, f: _fd_close, c: _fd_read, d: _fd_seek, e: _fd_write, i: invoke_i, a: invoke_ii, o: invoke_iii, h: invoke_v, j: _proc_exit };
        var wasmExports = await createWasm();
        function invoke_iii(index, a1, a2) {
          var sp = stackSave();
          try {
            return getWasmTableEntry(index)(a1, a2);
          } catch (e) {
            stackRestore(sp);
            if (e !== e + 0) throw e;
            _setThrew(1, 0);
          }
        }
        function invoke_ii(index, a1) {
          var sp = stackSave();
          try {
            return getWasmTableEntry(index)(a1);
          } catch (e) {
            stackRestore(sp);
            if (e !== e + 0) throw e;
            _setThrew(1, 0);
          }
        }
        function invoke_i(index) {
          var sp = stackSave();
          try {
            return getWasmTableEntry(index)();
          } catch (e) {
            stackRestore(sp);
            if (e !== e + 0) throw e;
            _setThrew(1, 0);
          }
        }
        function invoke_v(index) {
          var sp = stackSave();
          try {
            getWasmTableEntry(index)();
          } catch (e) {
            stackRestore(sp);
            if (e !== e + 0) throw e;
            _setThrew(1, 0);
          }
        }
        function run2() {
          if (runDependencies > 0) {
            dependenciesFulfilled = run2;
            return;
          }
          preRun();
          if (runDependencies > 0) {
            dependenciesFulfilled = run2;
            return;
          }
          function doRun() {
            Module["calledRun"] = true;
            if (ABORT) return;
            initRuntime();
            readyPromiseResolve?.(Module);
            Module["onRuntimeInitialized"]?.();
            postRun();
          }
          if (Module["setStatus"]) {
            Module["setStatus"]("Running...");
            setTimeout(() => {
              setTimeout(() => Module["setStatus"](""), 1);
              doRun();
            }, 1);
          } else {
            doRun();
          }
        }
        function preInit() {
          if (Module["preInit"]) {
            if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
            while (Module["preInit"].length > 0) {
              Module["preInit"].shift()();
            }
          }
        }
        preInit();
        run2();
        if (runtimeInitialized) {
          moduleRtn = Module;
        } else {
          moduleRtn = new Promise((resolve, reject) => {
            readyPromiseResolve = resolve;
            readyPromiseReject = reject;
          });
        }
        return moduleRtn;
      });
    })();
    if (typeof exports2 === "object" && typeof module2 === "object") {
      module2.exports = PgQueryModule;
      module2.exports.default = PgQueryModule;
    } else if (typeof define === "function" && define["amd"])
      define([], () => PgQueryModule);
  }
});

// node_modules/libpg-query/wasm/index.cjs
var require_wasm = __commonJS({
  "node_modules/libpg-query/wasm/index.cjs"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parse = exports2.SqlError = void 0;
    exports2.formatSqlError = formatSqlError;
    exports2.hasSqlDetails = hasSqlDetails;
    exports2.loadModule = loadModule4;
    exports2.parseSync = parseSync3;
    __exportStar(require_types2(), exports2);
    var libpg_query_js_1 = __importDefault(require_libpg_query());
    var wasmModule;
    var SqlError = class extends Error {
      sqlDetails;
      constructor(message, details) {
        super(message);
        this.name = "SqlError";
        this.sqlDetails = details;
      }
    };
    exports2.SqlError = SqlError;
    function formatSqlError(error, query, options = {}) {
      const { showPosition = true, showQuery = true, color = false, maxQueryLength } = options;
      const lines = [];
      const red = color ? "\x1B[31m" : "";
      const yellow = color ? "\x1B[33m" : "";
      const reset = color ? "\x1B[0m" : "";
      lines.push(`${red}Error: ${error.message}${reset}`);
      if (error.sqlDetails) {
        const { cursorPosition, fileName, functionName, lineNumber } = error.sqlDetails;
        if (cursorPosition !== void 0 && cursorPosition >= 0) {
          lines.push(`Position: ${cursorPosition}`);
        }
        if (fileName || functionName || lineNumber) {
          const details = [];
          if (fileName)
            details.push(`file: ${fileName}`);
          if (functionName)
            details.push(`function: ${functionName}`);
          if (lineNumber)
            details.push(`line: ${lineNumber}`);
          lines.push(`Source: ${details.join(", ")}`);
        }
        if (showQuery && showPosition && cursorPosition !== void 0 && cursorPosition >= 0) {
          let displayQuery = query;
          if (maxQueryLength && query.length > maxQueryLength) {
            const start = Math.max(0, cursorPosition - Math.floor(maxQueryLength / 2));
            const end = Math.min(query.length, start + maxQueryLength);
            displayQuery = (start > 0 ? "..." : "") + query.substring(start, end) + (end < query.length ? "..." : "");
            const adjustedPosition = cursorPosition - start + (start > 0 ? 3 : 0);
            lines.push(displayQuery);
            lines.push(" ".repeat(adjustedPosition) + `${yellow}^${reset}`);
          } else {
            lines.push(displayQuery);
            lines.push(" ".repeat(cursorPosition) + `${yellow}^${reset}`);
          }
        }
      } else if (showQuery) {
        let displayQuery = query;
        if (maxQueryLength && query.length > maxQueryLength) {
          displayQuery = query.substring(0, maxQueryLength) + "...";
        }
        lines.push(`Query: ${displayQuery}`);
      }
      return lines.join("\n");
    }
    function hasSqlDetails(error) {
      return error instanceof Error && "sqlDetails" in error && typeof error.sqlDetails === "object" && error.sqlDetails !== null && "message" in error.sqlDetails && "cursorPosition" in error.sqlDetails;
    }
    var initPromise = (0, libpg_query_js_1.default)().then((module3) => {
      wasmModule = module3;
    });
    function ensureLoaded() {
      if (!wasmModule)
        throw new Error("WASM module not initialized. Call `loadModule()` first.");
    }
    async function loadModule4() {
      if (!wasmModule) {
        await initPromise;
      }
    }
    function awaitInit(fn) {
      return (async (...args) => {
        await initPromise;
        return fn(...args);
      });
    }
    function stringToPtr(str) {
      ensureLoaded();
      if (typeof str !== "string") {
        throw new TypeError(`Expected a string, got ${typeof str}`);
      }
      const len = wasmModule.lengthBytesUTF8(str) + 1;
      const ptr = wasmModule._malloc(len);
      try {
        wasmModule.stringToUTF8(str, ptr, len);
        return ptr;
      } catch (error) {
        wasmModule._free(ptr);
        throw error;
      }
    }
    exports2.parse = awaitInit(async (query) => {
      if (query === null || query === void 0) {
        throw new Error("Query cannot be null or undefined");
      }
      if (typeof query !== "string") {
        throw new Error(`Query must be a string, got ${typeof query}`);
      }
      if (query.trim() === "") {
        throw new Error("Query cannot be empty");
      }
      const queryPtr = stringToPtr(query);
      let resultPtr = 0;
      try {
        resultPtr = wasmModule._wasm_parse_query_raw(queryPtr);
        if (!resultPtr) {
          throw new Error("Failed to allocate memory for parse result");
        }
        const parseTreePtr = wasmModule.getValue(resultPtr, "i32");
        const stderrBufferPtr = wasmModule.getValue(resultPtr + 4, "i32");
        const errorPtr = wasmModule.getValue(resultPtr + 8, "i32");
        if (errorPtr) {
          const messagePtr = wasmModule.getValue(errorPtr, "i32");
          const funcnamePtr = wasmModule.getValue(errorPtr + 4, "i32");
          const filenamePtr = wasmModule.getValue(errorPtr + 8, "i32");
          const lineno = wasmModule.getValue(errorPtr + 12, "i32");
          const cursorpos = wasmModule.getValue(errorPtr + 16, "i32");
          const contextPtr = wasmModule.getValue(errorPtr + 20, "i32");
          const message = messagePtr ? wasmModule.UTF8ToString(messagePtr) : "Unknown error";
          const filename = filenamePtr ? wasmModule.UTF8ToString(filenamePtr) : null;
          const errorDetails = {
            message,
            cursorPosition: cursorpos > 0 ? cursorpos - 1 : 0,
            // Convert to 0-based
            fileName: filename || void 0,
            functionName: funcnamePtr ? wasmModule.UTF8ToString(funcnamePtr) : void 0,
            lineNumber: lineno > 0 ? lineno : void 0,
            context: contextPtr ? wasmModule.UTF8ToString(contextPtr) : void 0
          };
          throw new SqlError(message, errorDetails);
        }
        if (!parseTreePtr) {
          throw new Error("Parse result is null");
        }
        const parseTree = wasmModule.UTF8ToString(parseTreePtr);
        return JSON.parse(parseTree);
      } finally {
        wasmModule._free(queryPtr);
        if (resultPtr) {
          wasmModule._wasm_free_parse_result(resultPtr);
        }
      }
    });
    function parseSync3(query) {
      if (query === null || query === void 0) {
        throw new Error("Query cannot be null or undefined");
      }
      if (typeof query !== "string") {
        throw new Error(`Query must be a string, got ${typeof query}`);
      }
      if (query.trim() === "") {
        throw new Error("Query cannot be empty");
      }
      const queryPtr = stringToPtr(query);
      let resultPtr = 0;
      try {
        resultPtr = wasmModule._wasm_parse_query_raw(queryPtr);
        if (!resultPtr) {
          throw new Error("Failed to allocate memory for parse result");
        }
        const parseTreePtr = wasmModule.getValue(resultPtr, "i32");
        const stderrBufferPtr = wasmModule.getValue(resultPtr + 4, "i32");
        const errorPtr = wasmModule.getValue(resultPtr + 8, "i32");
        if (errorPtr) {
          const messagePtr = wasmModule.getValue(errorPtr, "i32");
          const funcnamePtr = wasmModule.getValue(errorPtr + 4, "i32");
          const filenamePtr = wasmModule.getValue(errorPtr + 8, "i32");
          const lineno = wasmModule.getValue(errorPtr + 12, "i32");
          const cursorpos = wasmModule.getValue(errorPtr + 16, "i32");
          const contextPtr = wasmModule.getValue(errorPtr + 20, "i32");
          const message = messagePtr ? wasmModule.UTF8ToString(messagePtr) : "Unknown error";
          const filename = filenamePtr ? wasmModule.UTF8ToString(filenamePtr) : null;
          const errorDetails = {
            message,
            cursorPosition: cursorpos > 0 ? cursorpos - 1 : 0,
            // Convert to 0-based
            fileName: filename || void 0,
            functionName: funcnamePtr ? wasmModule.UTF8ToString(funcnamePtr) : void 0,
            lineNumber: lineno > 0 ? lineno : void 0,
            context: contextPtr ? wasmModule.UTF8ToString(contextPtr) : void 0
          };
          throw new SqlError(message, errorDetails);
        }
        if (!parseTreePtr) {
          throw new Error("Parse result is null");
        }
        const parseTree = wasmModule.UTF8ToString(parseTreePtr);
        return JSON.parse(parseTree);
      } finally {
        wasmModule._free(queryPtr);
        if (resultPtr) {
          wasmModule._wasm_free_parse_result(resultPtr);
        }
      }
    }
  }
});

// verify/scripts/mvp-migration/schema-loader.ts
function createEmptySchema() {
  return { tables: /* @__PURE__ */ new Map() };
}
function ensureTable(schema, name) {
  const norm = normalizeName(name);
  let table = schema.tables.get(norm);
  if (!table) {
    table = {
      columns: /* @__PURE__ */ new Map(),
      pk: void 0,
      uniqueConstraints: [],
      fkOut: [],
      fkIn: [],
      indexes: []
    };
    schema.tables.set(norm, table);
  }
  return table;
}
function normalizeName(name) {
  let n = name.replace(/^"|"$/g, "").toLowerCase();
  if (n.startsWith("public.")) n = n.slice(7);
  return n;
}
function formatRangeVar(rel) {
  if (!rel) return "(unknown)";
  const schema = rel.schemaname ? `${rel.schemaname}.` : "";
  return normalizeName(`${schema}${rel.relname}`);
}
function extractTypeName(tn) {
  if (!tn) return "unknown";
  const names = (tn.TypeName?.names || tn.names || []).map((n) => n.String?.sval || "?").filter((n) => n !== "pg_catalog");
  return names.join(".") || "unknown";
}
function applyStatement(schema, stmt) {
  const stmtType = Object.keys(stmt)[0];
  const detail = stmt[stmtType];
  switch (stmtType) {
    case "CreateStmt":
      applyCreateTable(schema, detail);
      break;
    case "AlterTableStmt":
      applyAlterTable(schema, detail);
      break;
    case "DropStmt":
      applyDrop(schema, detail);
      break;
    case "RenameStmt":
      applyRename(schema, detail);
      break;
    case "IndexStmt":
      applyCreateIndex(schema, detail);
      break;
  }
}
function applyCreateTable(schema, detail) {
  const tableName = formatRangeVar(detail.relation);
  const table = ensureTable(schema, tableName);
  for (const elt of detail.tableElts || []) {
    if (elt.ColumnDef) {
      const col = elt.ColumnDef;
      const colName = normalizeName(col.colname);
      const colType = extractTypeName(col.typeName);
      const constraints = col.constraints || [];
      const nullable = !constraints.some((c) => c.Constraint?.contype === "CONSTR_NOTNULL");
      const hasDefault = constraints.some((c) => c.Constraint?.contype === "CONSTR_DEFAULT");
      const identity = constraints.some((c) => c.Constraint?.contype === "CONSTR_IDENTITY");
      table.columns.set(colName, { type: colType, nullable: nullable && !identity, hasDefault: hasDefault || identity });
      if (constraints.some((c) => c.Constraint?.contype === "CONSTR_PRIMARY")) {
        table.pk = table.pk ? [...table.pk, colName] : [colName];
      }
      if (constraints.some((c) => c.Constraint?.contype === "CONSTR_UNIQUE")) {
        table.uniqueConstraints.push({ columns: [colName] });
      }
      for (const c of constraints) {
        if (c.Constraint?.contype === "CONSTR_FOREIGN") {
          addForeignKey(schema, tableName, table, c.Constraint);
        }
      }
    }
    if (elt.Constraint) {
      const con = elt.Constraint;
      switch (con.contype) {
        case "CONSTR_PRIMARY": {
          const cols = (con.keys || []).map((k) => normalizeName(k.String?.sval || ""));
          table.pk = cols;
          break;
        }
        case "CONSTR_UNIQUE": {
          const cols = (con.keys || []).map((k) => normalizeName(k.String?.sval || ""));
          table.uniqueConstraints.push({ name: con.conname, columns: cols });
          break;
        }
        case "CONSTR_FOREIGN": {
          addForeignKey(schema, tableName, table, con);
          break;
        }
      }
    }
  }
}
function addForeignKey(schema, tableName, table, con) {
  const refTable = formatRangeVar(con.pktable);
  const fkCols = (con.fk_attrs || []).map((a) => normalizeName(a.String?.sval || ""));
  const pkCols = (con.pk_attrs || []).map((a) => normalizeName(a.String?.sval || ""));
  const onDelete = con.fk_del_action ? fkActionName(con.fk_del_action) : void 0;
  table.fkOut.push({
    name: con.conname,
    columns: fkCols,
    refTable,
    refColumns: pkCols,
    onDelete
  });
  const refTableSchema = ensureTable(schema, refTable);
  refTableSchema.fkIn.push({
    name: con.conname,
    fromTable: normalizeName(tableName),
    fromColumns: fkCols,
    columns: pkCols
  });
}
function fkActionName(action) {
  switch (action) {
    case "FKCONSTR_ACTION_CASCADE":
      return "CASCADE";
    case "FKCONSTR_ACTION_SETNULL":
      return "SET NULL";
    case "FKCONSTR_ACTION_SETDEFAULT":
      return "SET DEFAULT";
    case "FKCONSTR_ACTION_RESTRICT":
      return "RESTRICT";
    case "FKCONSTR_ACTION_NOACTION":
      return "NO ACTION";
    default:
      return void 0;
  }
}
function applyAlterTable(schema, detail) {
  const tableName = formatRangeVar(detail.relation);
  for (const cmd of detail.cmds || []) {
    const at = cmd.AlterTableCmd;
    if (!at) continue;
    switch (at.subtype) {
      case "AT_AddColumn": {
        if (at.def?.ColumnDef) {
          const col = at.def.ColumnDef;
          const colName = normalizeName(col.colname);
          const colType = extractTypeName(col.typeName);
          const constraints = col.constraints || [];
          const nullable = !constraints.some((c) => c.Constraint?.contype === "CONSTR_NOTNULL");
          const hasDefault = constraints.some((c) => c.Constraint?.contype === "CONSTR_DEFAULT");
          const table = ensureTable(schema, tableName);
          table.columns.set(colName, { type: colType, nullable, hasDefault });
        }
        break;
      }
      case "AT_DropColumn": {
        const colName = normalizeName(at.name);
        const normTable = normalizeName(tableName);
        const table = schema.tables.get(normTable);
        if (table) {
          table.columns.delete(colName);
          if (table.pk) table.pk = table.pk.filter((c) => c !== colName);
          const removedFks = table.fkOut.filter((fk) => fk.columns.includes(colName));
          table.fkOut = table.fkOut.filter((fk) => !fk.columns.includes(colName));
          for (const fk of removedFks) {
            const refTable = schema.tables.get(normalizeName(fk.refTable));
            if (refTable) {
              refTable.fkIn = refTable.fkIn.filter(
                (r) => !(r.fromTable === normTable && r.fromColumns.some((c) => c === colName))
              );
            }
          }
          for (const fkIn of table.fkIn.filter((r) => r.columns.includes(colName))) {
            const fromTable = schema.tables.get(normalizeName(fkIn.fromTable));
            if (fromTable) {
              fromTable.fkOut = fromTable.fkOut.filter(
                (fk) => !(normalizeName(fk.refTable) === normTable && fk.refColumns.includes(colName))
              );
            }
          }
          table.fkIn = table.fkIn.filter((r) => !r.columns.includes(colName));
        }
        break;
      }
      case "AT_AlterColumnType": {
        const colName = normalizeName(at.name);
        const table = schema.tables.get(normalizeName(tableName));
        if (table) {
          const existing = table.columns.get(colName);
          if (existing && at.def?.ColumnDef?.typeName) {
            existing.type = extractTypeName(at.def.ColumnDef.typeName);
          }
        }
        break;
      }
      case "AT_SetNotNull": {
        const colName = normalizeName(at.name);
        const table = schema.tables.get(normalizeName(tableName));
        if (table) {
          const existing = table.columns.get(colName);
          if (existing) existing.nullable = false;
        }
        break;
      }
      case "AT_DropNotNull": {
        const colName = normalizeName(at.name);
        const table = schema.tables.get(normalizeName(tableName));
        if (table) {
          const existing = table.columns.get(colName);
          if (existing) existing.nullable = true;
        }
        break;
      }
      case "AT_ColumnDefault":
      case "AT_SetDefault": {
        const colName = normalizeName(at.name);
        const table = schema.tables.get(normalizeName(tableName));
        if (table) {
          const existing = table.columns.get(colName);
          if (existing) existing.hasDefault = true;
        }
        break;
      }
      case "AT_DropDefault": {
        const colName = normalizeName(at.name);
        const table = schema.tables.get(normalizeName(tableName));
        if (table) {
          const existing = table.columns.get(colName);
          if (existing) existing.hasDefault = false;
        }
        break;
      }
      case "AT_AddConstraint": {
        if (at.def?.Constraint) {
          const con = at.def.Constraint;
          const table = ensureTable(schema, tableName);
          switch (con.contype) {
            case "CONSTR_PRIMARY": {
              const cols = (con.keys || []).map((k) => normalizeName(k.String?.sval || ""));
              table.pk = cols;
              break;
            }
            case "CONSTR_UNIQUE": {
              const cols = (con.keys || []).map((k) => normalizeName(k.String?.sval || ""));
              table.uniqueConstraints.push({ name: con.conname, columns: cols });
              break;
            }
            case "CONSTR_FOREIGN": {
              addForeignKey(schema, tableName, table, con);
              break;
            }
          }
        }
        break;
      }
      case "AT_DropConstraint": {
        const conName = at.name;
        const normT = normalizeName(tableName);
        const table = schema.tables.get(normT);
        if (table && conName) {
          let removedFk = table.fkOut.find((fk) => fk.name === conName);
          if (!removedFk) {
            const fkeyMatch = conName.match(/^.+_(.+)_fkey$/i);
            if (fkeyMatch) {
              const colName = normalizeName(fkeyMatch[1]);
              removedFk = table.fkOut.find((fk) => !fk.name && fk.columns.length === 1 && fk.columns[0] === colName);
            }
          }
          if (removedFk) {
            table.fkOut = table.fkOut.filter((fk) => fk !== removedFk);
            const refTable = schema.tables.get(normalizeName(removedFk.refTable));
            if (refTable) {
              refTable.fkIn = refTable.fkIn.filter(
                (fk) => !(fk.fromTable === normT && fk.fromColumns.length === removedFk.columns.length && fk.fromColumns.every((c, i) => c === removedFk.columns[i]))
              );
            }
          } else {
            table.fkOut = table.fkOut.filter((fk) => fk.name !== conName);
          }
          table.uniqueConstraints = table.uniqueConstraints.filter((u) => u.name !== conName);
        }
        break;
      }
    }
  }
}
function applyDrop(schema, detail) {
  if (detail.removeType === "OBJECT_TABLE") {
    for (const obj of detail.objects || []) {
      const items = obj.List?.items || (Array.isArray(obj) ? obj : []);
      const name = items.map((n) => n.String?.sval || "?").join(".");
      const norm = normalizeName(name);
      const table = schema.tables.get(norm);
      if (table) {
        for (const fk of table.fkOut) {
          const refTable = schema.tables.get(normalizeName(fk.refTable));
          if (refTable) {
            refTable.fkIn = refTable.fkIn.filter((r) => r.fromTable !== norm);
          }
        }
        for (const fk of table.fkIn) {
          const fromTable = schema.tables.get(normalizeName(fk.fromTable));
          if (fromTable) {
            fromTable.fkOut = fromTable.fkOut.filter((f) => f.refTable !== norm);
          }
        }
        schema.tables.delete(norm);
      }
    }
  }
  if (detail.removeType === "OBJECT_INDEX") {
    for (const [, table] of schema.tables) {
      for (const obj of detail.objects || []) {
        const items = obj.List?.items || (Array.isArray(obj) ? obj : []);
        const idxName = items.map((n) => n.String?.sval || "?").join(".");
        table.indexes = table.indexes.filter((idx) => idx.name !== normalizeName(idxName));
      }
    }
  }
}
function applyRename(schema, detail) {
  const renameType = detail.renameType;
  if (renameType === "OBJECT_TABLE") {
    const oldName = formatRangeVar(detail.relation);
    const newName = normalizeName(detail.newname);
    const table = schema.tables.get(normalizeName(oldName));
    if (table) {
      schema.tables.delete(normalizeName(oldName));
      schema.tables.set(newName, table);
      for (const [, t] of schema.tables) {
        for (const fk of t.fkOut) {
          if (normalizeName(fk.refTable) === normalizeName(oldName)) fk.refTable = newName;
        }
        for (const fk of t.fkIn) {
          if (normalizeName(fk.fromTable) === normalizeName(oldName)) fk.fromTable = newName;
        }
      }
    }
  } else if (renameType === "OBJECT_COLUMN") {
    const tableName = formatRangeVar(detail.relation);
    const normTable = normalizeName(tableName);
    const oldCol = normalizeName(detail.subname);
    const newCol = normalizeName(detail.newname);
    const table = schema.tables.get(normTable);
    if (table) {
      const colDef = table.columns.get(oldCol);
      if (colDef) {
        table.columns.delete(oldCol);
        table.columns.set(newCol, colDef);
      }
      if (table.pk) table.pk = table.pk.map((c) => c === oldCol ? newCol : c);
      for (const fk of table.fkOut) {
        const changed = fk.columns.includes(oldCol);
        fk.columns = fk.columns.map((c) => c === oldCol ? newCol : c);
        if (changed) {
          const refTable = schema.tables.get(normalizeName(fk.refTable));
          if (refTable) {
            for (const fkIn of refTable.fkIn) {
              if (fkIn.fromTable === normTable) {
                fkIn.fromColumns = fkIn.fromColumns.map((c) => c === oldCol ? newCol : c);
              }
            }
          }
        }
      }
      for (const fkIn of table.fkIn) {
        const changed = fkIn.columns.includes(oldCol);
        fkIn.columns = fkIn.columns.map((c) => c === oldCol ? newCol : c);
        if (changed) {
          const fromTable = schema.tables.get(normalizeName(fkIn.fromTable));
          if (fromTable) {
            for (const fk of fromTable.fkOut) {
              if (normalizeName(fk.refTable) === normTable) {
                fk.refColumns = fk.refColumns.map((c) => c === oldCol ? newCol : c);
              }
            }
          }
        }
      }
      for (const u of table.uniqueConstraints) {
        u.columns = u.columns.map((c) => c === oldCol ? newCol : c);
      }
      for (const idx of table.indexes) {
        idx.columns = idx.columns.map((c) => c === oldCol ? newCol : c);
      }
    }
  }
}
function applyCreateIndex(schema, detail) {
  const tableName = formatRangeVar(detail.relation);
  const table = schema.tables.get(normalizeName(tableName));
  if (table) {
    const idxName = detail.idxname ? normalizeName(detail.idxname) : void 0;
    const cols = (detail.indexParams || []).map((p) => normalizeName(p.IndexElem?.name || "")).filter(Boolean);
    table.indexes.push({
      name: idxName,
      columns: cols,
      unique: !!detail.unique
    });
  }
}
function applyMigrationSQL(schema, sql) {
  const ast = (0, import_libpg_query.parseSync)(sql);
  for (const s of ast.stmts || []) {
    applyStatement(schema, s.stmt);
  }
}
function applyOp(schema, op) {
  const n = normalizeName;
  switch (op.op) {
    case "create_table": {
      const table = ensureTable(schema, op.table);
      for (const col of op.columns) {
        table.columns.set(n(col.name), { type: col.type, nullable: col.nullable, hasDefault: col.hasDefault });
      }
      for (const con of op.constraints) {
        if (con.type === "primary_key" && con.columns) table.pk = con.columns.map(n);
        if (con.type === "unique" && con.columns) table.uniqueConstraints.push({ name: con.name, columns: con.columns.map(n) });
        if (con.type === "foreign_key" && con.fk) {
          const fk = con.fk;
          table.fkOut.push({ name: con.name, columns: fk.columns.map(n), refTable: n(fk.refTable), refColumns: fk.refColumns.map(n), onDelete: fk.onDelete });
          const ref = ensureTable(schema, fk.refTable);
          ref.fkIn.push({ name: con.name, fromTable: n(op.table), fromColumns: fk.columns.map(n), columns: fk.refColumns.map(n) });
        }
      }
      break;
    }
    case "drop_table": {
      const normT = n(op.table);
      const table = schema.tables.get(normT);
      if (table) {
        for (const fk of table.fkOut) {
          const ref = schema.tables.get(n(fk.refTable));
          if (ref) ref.fkIn = ref.fkIn.filter((r) => r.fromTable !== normT);
        }
        for (const fk of table.fkIn) {
          const from = schema.tables.get(n(fk.fromTable));
          if (from) from.fkOut = from.fkOut.filter((f) => n(f.refTable) !== normT);
        }
        schema.tables.delete(normT);
      }
      break;
    }
    case "add_column": {
      const table = schema.tables.get(n(op.table));
      if (table) table.columns.set(n(op.column.name), { type: op.column.type, nullable: op.column.nullable, hasDefault: op.column.hasDefault });
      break;
    }
    case "drop_column": {
      const normT = n(op.table);
      const table = schema.tables.get(normT);
      if (table) {
        const colN = n(op.column);
        table.columns.delete(colN);
        if (table.pk) table.pk = table.pk.filter((c) => c !== colN);
        const removedFks = table.fkOut.filter((fk) => fk.columns.includes(colN));
        table.fkOut = table.fkOut.filter((fk) => !fk.columns.includes(colN));
        for (const fk of removedFks) {
          const ref = schema.tables.get(n(fk.refTable));
          if (ref) ref.fkIn = ref.fkIn.filter((r) => !(r.fromTable === normT && r.fromColumns.some((c) => c === colN)));
        }
        for (const fkIn of table.fkIn.filter((r) => r.columns.includes(colN))) {
          const from = schema.tables.get(n(fkIn.fromTable));
          if (from) from.fkOut = from.fkOut.filter((fk) => !(n(fk.refTable) === normT && fk.refColumns.includes(colN)));
        }
        table.fkIn = table.fkIn.filter((r) => !r.columns.includes(colN));
      }
      break;
    }
    case "add_constraint": {
      const table = schema.tables.get(n(op.table));
      if (table && op.constraint.type === "foreign_key" && op.constraint.fk) {
        const fk = op.constraint.fk;
        table.fkOut.push({ name: op.constraint.name, columns: fk.columns.map(n), refTable: n(fk.refTable), refColumns: fk.refColumns.map(n), onDelete: fk.onDelete });
        const ref = ensureTable(schema, fk.refTable);
        ref.fkIn.push({ name: op.constraint.name, fromTable: n(op.table), fromColumns: fk.columns.map(n), columns: fk.refColumns.map(n) });
      }
      if (table && op.constraint.type === "primary_key" && op.constraint.columns) {
        table.pk = op.constraint.columns.map(n);
      }
      if (table && op.constraint.type === "unique" && op.constraint.columns) {
        table.uniqueConstraints.push({ name: op.constraint.name, columns: op.constraint.columns.map(n) });
      }
      break;
    }
    case "drop_constraint": {
      const normT = n(op.table);
      const table = schema.tables.get(normT);
      if (table) {
        let removed = table.fkOut.find((fk) => fk.name === op.name);
        if (!removed) {
          const fkeyMatch = op.name.match(/^.+_(.+)_fkey$/i);
          if (fkeyMatch) {
            const colName = n(fkeyMatch[1]);
            removed = table.fkOut.find((fk) => !fk.name && fk.columns.length === 1 && fk.columns[0] === colName);
          }
        }
        if (removed) {
          table.fkOut = table.fkOut.filter((fk) => fk !== removed);
          const ref = schema.tables.get(n(removed.refTable));
          if (ref) {
            ref.fkIn = ref.fkIn.filter(
              (fk) => !(fk.fromTable === normT && fk.fromColumns.length === removed.columns.length && fk.fromColumns.every((c, i) => c === removed.columns[i]))
            );
          }
        } else {
          table.fkOut = table.fkOut.filter((fk) => fk.name !== op.name);
        }
        table.uniqueConstraints = table.uniqueConstraints.filter((u) => u.name !== op.name);
      }
      break;
    }
    case "rename_table": {
      const oldN = n(op.table);
      const newN = n(op.newName);
      const table = schema.tables.get(oldN);
      if (table) {
        schema.tables.delete(oldN);
        schema.tables.set(newN, table);
        for (const [, t] of schema.tables) {
          for (const fk of t.fkOut) {
            if (n(fk.refTable) === oldN) fk.refTable = newN;
          }
          for (const fk of t.fkIn) {
            if (n(fk.fromTable) === oldN) fk.fromTable = newN;
          }
        }
      }
      break;
    }
    case "rename_column": {
      const table = schema.tables.get(n(op.table));
      if (table) {
        const oldC = n(op.column), newC = n(op.newName);
        const colDef = table.columns.get(oldC);
        if (colDef) {
          table.columns.delete(oldC);
          table.columns.set(newC, colDef);
        }
        if (table.pk) table.pk = table.pk.map((c) => c === oldC ? newC : c);
        for (const fk of table.fkOut) fk.columns = fk.columns.map((c) => c === oldC ? newC : c);
        for (const fkIn of table.fkIn) fkIn.columns = fkIn.columns.map((c) => c === oldC ? newC : c);
      }
      break;
    }
    case "alter_column_type": {
      const table = schema.tables.get(n(op.table));
      if (table) {
        const col = table.columns.get(n(op.column));
        if (col) col.type = op.newType;
      }
      break;
    }
    case "alter_column_set_not_null": {
      const table = schema.tables.get(n(op.table));
      if (table) {
        const col = table.columns.get(n(op.column));
        if (col) col.nullable = false;
      }
      break;
    }
    case "alter_column_drop_not_null": {
      const table = schema.tables.get(n(op.table));
      if (table) {
        const col = table.columns.get(n(op.column));
        if (col) col.nullable = true;
      }
      break;
    }
    case "alter_column_set_default": {
      const table = schema.tables.get(n(op.table));
      if (table) {
        const col = table.columns.get(n(op.column));
        if (col) col.hasDefault = true;
      }
      break;
    }
    case "alter_column_drop_default": {
      const table = schema.tables.get(n(op.table));
      if (table) {
        const col = table.columns.get(n(op.column));
        if (col) col.hasDefault = false;
      }
      break;
    }
    case "create_index": {
      const table = schema.tables.get(n(op.table));
      if (table) table.indexes.push({ name: op.name ? n(op.name) : void 0, columns: op.columns.map(n), unique: !!op.unique });
      break;
    }
  }
}
var import_libpg_query;
var init_schema_loader = __esm({
  "verify/scripts/mvp-migration/schema-loader.ts"() {
    "use strict";
    import_libpg_query = __toESM(require_wasm(), 1);
  }
});

// verify/scripts/mvp-migration/spec-from-ast.ts
function formatRangeVar2(rel) {
  if (!rel) return "(unknown)";
  const schema = rel.schemaname ? `${rel.schemaname}.` : "";
  return normalizeName(`${schema}${rel.relname}`);
}
function extractTypeName2(tn) {
  if (!tn) return "unknown";
  const names = (tn.TypeName?.names || tn.names || []).map((n) => n.String?.sval || "?").filter((n) => n !== "pg_catalog");
  return names.join(".") || "unknown";
}
function extractColumnDef(colAst) {
  const constraints = colAst.constraints || [];
  return {
    name: normalizeName(colAst.colname),
    type: extractTypeName2(colAst.typeName),
    nullable: !constraints.some((c) => c.Constraint?.contype === "CONSTR_NOTNULL"),
    hasDefault: constraints.some((c) => c.Constraint?.contype === "CONSTR_DEFAULT"),
    identity: constraints.some((c) => c.Constraint?.contype === "CONSTR_IDENTITY")
  };
}
function extractForeignKey(con) {
  return {
    columns: (con.fk_attrs || []).map((a) => normalizeName(a.String?.sval || "")),
    refTable: formatRangeVar2(con.pktable),
    refColumns: (con.pk_attrs || []).map((a) => normalizeName(a.String?.sval || "")),
    onDelete: con.fk_del_action ? fkActionName2(con.fk_del_action) : void 0,
    onUpdate: con.fk_upd_action ? fkActionName2(con.fk_upd_action) : void 0
  };
}
function fkActionName2(action) {
  switch (action) {
    case "FKCONSTR_ACTION_CASCADE":
      return "CASCADE";
    case "FKCONSTR_ACTION_SETNULL":
      return "SET NULL";
    case "FKCONSTR_ACTION_SETDEFAULT":
      return "SET DEFAULT";
    case "FKCONSTR_ACTION_RESTRICT":
      return "RESTRICT";
    case "FKCONSTR_ACTION_NOACTION":
      return "NO ACTION";
    default:
      return void 0;
  }
}
function extractConstraint(con) {
  switch (con.contype) {
    case "CONSTR_PRIMARY": {
      const cols = (con.keys || []).map((k) => normalizeName(k.String?.sval || ""));
      return { type: "primary_key", name: con.conname, columns: cols };
    }
    case "CONSTR_UNIQUE": {
      const cols = (con.keys || []).map((k) => normalizeName(k.String?.sval || ""));
      return { type: "unique", name: con.conname, columns: cols };
    }
    case "CONSTR_FOREIGN": {
      return { type: "foreign_key", name: con.conname, fk: extractForeignKey(con) };
    }
    case "CONSTR_CHECK": {
      return { type: "check", name: con.conname };
    }
    case "CONSTR_EXCLUSION": {
      return { type: "exclusion", name: con.conname };
    }
    default:
      return null;
  }
}
function translateCreateStmt(detail) {
  const tableName = formatRangeVar2(detail.relation);
  const columns = [];
  const constraints = [];
  for (const elt of detail.tableElts || []) {
    if (elt.ColumnDef) {
      columns.push(extractColumnDef(elt.ColumnDef));
      for (const c of elt.ColumnDef.constraints || []) {
        if (c.Constraint) {
          const con = extractConstraint(c.Constraint);
          if (con) constraints.push(con);
        }
      }
    }
    if (elt.Constraint) {
      const con = extractConstraint(elt.Constraint);
      if (con) constraints.push(con);
    }
  }
  let partitionBy;
  if (detail.partspec) {
    partitionBy = detail.partspec.strategy || "unknown";
  }
  return {
    op: "create_table",
    table: tableName,
    columns,
    constraints,
    partitionBy,
    ifNotExists: !!detail.if_not_exists
  };
}
function translateAlterTableStmt(detail) {
  const tableName = formatRangeVar2(detail.relation);
  const ops = [];
  for (const cmd of detail.cmds || []) {
    const at = cmd.AlterTableCmd;
    if (!at) continue;
    switch (at.subtype) {
      case "AT_AddColumn": {
        if (at.def?.ColumnDef) {
          ops.push({
            op: "add_column",
            table: tableName,
            column: extractColumnDef(at.def.ColumnDef)
          });
        }
        break;
      }
      case "AT_DropColumn": {
        ops.push({
          op: "drop_column",
          table: tableName,
          column: normalizeName(at.name),
          cascade: at.behavior === "DROP_CASCADE"
        });
        break;
      }
      case "AT_AlterColumnType": {
        const newType = at.def?.ColumnDef?.typeName ? extractTypeName2(at.def.ColumnDef.typeName) : "unknown";
        ops.push({
          op: "alter_column_type",
          table: tableName,
          column: normalizeName(at.name),
          newType
        });
        break;
      }
      case "AT_SetNotNull": {
        ops.push({
          op: "alter_column_set_not_null",
          table: tableName,
          column: normalizeName(at.name)
        });
        break;
      }
      case "AT_DropNotNull": {
        ops.push({
          op: "alter_column_drop_not_null",
          table: tableName,
          column: normalizeName(at.name)
        });
        break;
      }
      case "AT_ColumnDefault":
      case "AT_SetDefault": {
        ops.push({
          op: "alter_column_set_default",
          table: tableName,
          column: normalizeName(at.name),
          expr: "(expression)"
          // TODO: deparse the default expression
        });
        break;
      }
      case "AT_DropDefault": {
        ops.push({
          op: "alter_column_drop_default",
          table: tableName,
          column: normalizeName(at.name)
        });
        break;
      }
      case "AT_AddConstraint": {
        if (at.def?.Constraint) {
          const con = extractConstraint(at.def.Constraint);
          if (con) {
            ops.push({ op: "add_constraint", table: tableName, constraint: con });
          }
        }
        break;
      }
      case "AT_DropConstraint": {
        ops.push({
          op: "drop_constraint",
          table: tableName,
          name: at.name || "(unnamed)",
          cascade: at.behavior === "DROP_CASCADE"
        });
        break;
      }
      default: {
        ops.push({ op: "unsupported", stmtType: `AlterTableCmd:${at.subtype}` });
      }
    }
  }
  return ops;
}
function translateDropStmt(detail) {
  const ops = [];
  const cascade = detail.behavior === "DROP_CASCADE";
  const ifExists = !!detail.missing_ok;
  if (detail.removeType === "OBJECT_TABLE") {
    for (const obj of detail.objects || []) {
      const items = obj.List?.items || (Array.isArray(obj) ? obj : []);
      const name = normalizeName(items.map((n) => n.String?.sval || "?").join("."));
      ops.push({ op: "drop_table", table: name, cascade, ifExists });
    }
  } else if (detail.removeType === "OBJECT_INDEX") {
    for (const obj of detail.objects || []) {
      const items = obj.List?.items || (Array.isArray(obj) ? obj : []);
      const name = normalizeName(items.map((n) => n.String?.sval || "?").join("."));
      ops.push({ op: "drop_index", name, cascade });
    }
  } else {
    ops.push({ op: "unsupported", stmtType: `DropStmt:${detail.removeType}` });
  }
  return ops;
}
function translateRenameStmt(detail) {
  if (detail.renameType === "OBJECT_TABLE") {
    return {
      op: "rename_table",
      table: formatRangeVar2(detail.relation),
      newName: normalizeName(detail.newname)
    };
  } else if (detail.renameType === "OBJECT_COLUMN") {
    return {
      op: "rename_column",
      table: formatRangeVar2(detail.relation),
      column: normalizeName(detail.subname),
      newName: normalizeName(detail.newname)
    };
  }
  return { op: "unsupported", stmtType: `RenameStmt:${detail.renameType}` };
}
function translateIndexStmt(detail) {
  return {
    op: "create_index",
    table: formatRangeVar2(detail.relation),
    name: detail.idxname ? normalizeName(detail.idxname) : void 0,
    columns: (detail.indexParams || []).map((p) => normalizeName(p.IndexElem?.name || "")).filter(Boolean),
    unique: !!detail.unique
  };
}
function translateSimple(stmtType, detail) {
  switch (stmtType) {
    case "CreateSchemaStmt":
      return { op: "create_schema", name: normalizeName(detail.schemaname || "") };
    case "CreateExtensionStmt":
      return { op: "create_extension", name: detail.extname || "" };
    case "CreateFunctionStmt": {
      const fname = (detail.funcname || []).map((n) => n.String?.sval || "?").join(".");
      return { op: "create_function", name: fname };
    }
    default:
      return { op: "unsupported", stmtType };
  }
}
function byteOffsetToLine(sql, offset) {
  let line = 1;
  for (let i = 0; i < offset && i < sql.length; i++) {
    if (sql[i] === "\n") line++;
  }
  return line;
}
function parseMigration(sql, file) {
  const operations = [];
  const parseErrors = [];
  let totalStatements = 0;
  let supportedStatements = 0;
  let opIndex = 0;
  let ast;
  try {
    ast = (0, import_libpg_query2.parseSync)(sql);
  } catch (err) {
    parseErrors.push(err.message);
    return {
      file,
      operations: [],
      raw: sql,
      meta: { totalStatements: 0, supportedStatements: 0, unsupportedStatements: 0, parseErrors }
    };
  }
  function addOps(stmtIndex, line, ops) {
    for (const op of ops) {
      operations.push({ opIndex: opIndex++, stmtIndex, line, op });
    }
  }
  for (let si = 0; si < (ast.stmts || []).length; si++) {
    const s = ast.stmts[si];
    totalStatements++;
    const stmt = s.stmt;
    const stmtType = Object.keys(stmt)[0];
    const detail = stmt[stmtType];
    const line = byteOffsetToLine(sql, s.stmt_location || 0);
    switch (stmtType) {
      case "CreateStmt": {
        addOps(si, line, [translateCreateStmt(detail)]);
        supportedStatements++;
        break;
      }
      case "AlterTableStmt": {
        addOps(si, line, translateAlterTableStmt(detail));
        supportedStatements++;
        break;
      }
      case "DropStmt": {
        addOps(si, line, translateDropStmt(detail));
        supportedStatements++;
        break;
      }
      case "RenameStmt": {
        addOps(si, line, [translateRenameStmt(detail)]);
        supportedStatements++;
        break;
      }
      case "IndexStmt": {
        addOps(si, line, [translateIndexStmt(detail)]);
        supportedStatements++;
        break;
      }
      case "CreateSchemaStmt":
      case "CreateExtensionStmt":
      case "CreateFunctionStmt": {
        addOps(si, line, [translateSimple(stmtType, detail)]);
        supportedStatements++;
        break;
      }
      default: {
        addOps(si, line, [{ op: "unsupported", stmtType }]);
      }
    }
  }
  return {
    file,
    operations,
    raw: sql,
    meta: {
      totalStatements,
      supportedStatements,
      unsupportedStatements: totalStatements - supportedStatements,
      parseErrors
    }
  };
}
var import_libpg_query2;
var init_spec_from_ast = __esm({
  "verify/scripts/mvp-migration/spec-from-ast.ts"() {
    "use strict";
    import_libpg_query2 = __toESM(require_wasm(), 1);
    init_schema_loader();
  }
});

// verify/scripts/mvp-migration/grounding-gate.ts
function isPlatformTable(tableName) {
  const norm = normalizeName(tableName);
  return PLATFORM_SCHEMA_PREFIXES.some((prefix) => norm.startsWith(prefix));
}
function runGroundingGate(spec, schema) {
  const findings = [];
  const workingSchema = cloneSchema(schema);
  for (const located of spec.operations) {
    const loc = { stmtIndex: located.stmtIndex, opIndex: located.opIndex, line: located.line };
    for (const f of checkOp(located.op, workingSchema)) {
      f.location = loc;
      findings.push(f);
    }
    try {
      applyOp(workingSchema, located.op);
    } catch {
    }
  }
  return findings;
}
function cloneSchema(schema) {
  const clone = { tables: /* @__PURE__ */ new Map() };
  for (const [name, table] of schema.tables) {
    clone.tables.set(name, {
      columns: new Map(table.columns),
      pk: table.pk ? [...table.pk] : void 0,
      uniqueConstraints: table.uniqueConstraints.map((u) => ({ ...u, columns: [...u.columns] })),
      fkOut: table.fkOut.map((fk) => ({ ...fk, columns: [...fk.columns], refColumns: [...fk.refColumns] })),
      fkIn: table.fkIn.map((fk) => ({ ...fk, fromColumns: [...fk.fromColumns], columns: [...fk.columns] })),
      indexes: table.indexes.map((idx) => ({ ...idx, columns: [...idx.columns] }))
    });
  }
  return clone;
}
function checkOp(op, schema) {
  switch (op.op) {
    case "create_table":
      return checkCreateTable(op, schema);
    case "drop_table":
      return checkDropTable(op, schema);
    case "add_column":
      return checkAddColumn(op, schema);
    case "drop_column":
      return checkDropColumn(op, schema);
    case "alter_column_type":
      return checkAlterColumnType(op, schema);
    case "alter_column_set_not_null":
      return checkColumnExists(op, schema, op.table, op.column);
    case "alter_column_drop_not_null":
      return checkColumnExists(op, schema, op.table, op.column);
    case "alter_column_set_default":
      return checkColumnExists(op, schema, op.table, op.column);
    case "alter_column_drop_default":
      return checkColumnExists(op, schema, op.table, op.column);
    case "add_constraint":
      return checkAddConstraint(op, schema);
    case "drop_constraint":
      return checkDropConstraint(op, schema);
    case "create_index":
      return checkCreateIndex(op, schema);
    case "drop_index":
      return checkDropIndex(op, schema);
    case "rename_table":
      return checkRenameTable(op, schema);
    case "rename_column":
      return checkRenameColumn(op, schema);
    default:
      return [];
  }
}
function tableExists(schema, name) {
  return schema.tables.has(normalizeName(name));
}
function columnExists(schema, table, column) {
  const t = schema.tables.get(normalizeName(table));
  return t ? t.columns.has(normalizeName(column)) : false;
}
function findClosestTable(schema, name) {
  const norm = normalizeName(name);
  let best;
  let bestDist = Infinity;
  for (const key of schema.tables.keys()) {
    const d = levenshtein(norm, key);
    if (d < bestDist && d <= 3) {
      bestDist = d;
      best = key;
    }
  }
  return best;
}
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}
function finding(shapeId, message, op, severity = "error") {
  return { shapeId, message, operation: op, severity };
}
function checkCreateTable(op, schema) {
  const findings = [];
  if (op.ifNotExists) return findings;
  if (tableExists(schema, op.table)) {
    findings.push(finding("DM-04", `CREATE TABLE ${op.table}: table already exists`, op));
  }
  for (const con of op.constraints) {
    if (con.type === "foreign_key" && con.fk) {
      findings.push(...checkFkTarget(op, con.fk, schema));
    }
  }
  return findings;
}
function checkDropTable(op, schema) {
  const findings = [];
  if (op.ifExists) return findings;
  if (!tableExists(schema, op.table)) {
    const closest = findClosestTable(schema, op.table);
    const hint = closest ? ` Closest match: '${closest}'.` : "";
    findings.push(finding("DM-01", `DROP TABLE ${op.table}: table not found in schema.${hint}`, op));
  }
  return findings;
}
function checkAddColumn(op, schema) {
  const findings = [];
  if (!tableExists(schema, op.table)) {
    const closest = findClosestTable(schema, op.table);
    const hint = closest ? ` Closest match: '${closest}'.` : "";
    findings.push(finding("DM-01", `ADD COLUMN to ${op.table}: table not found.${hint}`, op));
    return findings;
  }
  if (columnExists(schema, op.table, op.column.name)) {
    findings.push(finding("DM-04", `ADD COLUMN ${op.table}.${op.column.name}: column already exists`, op));
  }
  return findings;
}
function checkDropColumn(op, schema) {
  const findings = [];
  if (!tableExists(schema, op.table)) {
    findings.push(finding("DM-01", `DROP COLUMN on ${op.table}: table not found`, op));
    return findings;
  }
  if (!columnExists(schema, op.table, op.column)) {
    findings.push(finding("DM-02", `DROP COLUMN ${op.table}.${op.column}: column not found`, op));
  }
  return findings;
}
function checkAlterColumnType(op, schema) {
  return checkColumnExists(op, schema, op.table, op.column);
}
function checkColumnExists(op, schema, table, column) {
  const findings = [];
  if (!tableExists(schema, table)) {
    findings.push(finding("DM-01", `${op.op} on ${table}: table not found`, op));
    return findings;
  }
  if (!columnExists(schema, table, column)) {
    findings.push(finding("DM-02", `${op.op} ${table}.${column}: column not found`, op));
  }
  return findings;
}
function checkAddConstraint(op, schema) {
  const findings = [];
  if (!tableExists(schema, op.table)) {
    findings.push(finding("DM-01", `ADD CONSTRAINT on ${op.table}: table not found`, op));
    return findings;
  }
  if (op.constraint.type === "foreign_key" && op.constraint.fk) {
    findings.push(...checkFkTarget(op, op.constraint.fk, schema));
  }
  if (op.constraint.columns) {
    for (const col of op.constraint.columns) {
      if (!columnExists(schema, op.table, col)) {
        findings.push(finding("DM-02", `ADD CONSTRAINT on ${op.table}: column '${col}' not found`, op));
      }
    }
  }
  return findings;
}
function checkDropConstraint(op, schema) {
  const findings = [];
  if (!tableExists(schema, op.table)) {
    findings.push(finding("DM-01", `DROP CONSTRAINT on ${op.table}: table not found`, op));
  }
  return findings;
}
function checkCreateIndex(op, schema) {
  const findings = [];
  if (!tableExists(schema, op.table)) {
    findings.push(finding("DM-01", `CREATE INDEX on ${op.table}: table not found`, op));
    return findings;
  }
  for (const col of op.columns) {
    if (!columnExists(schema, op.table, col)) {
      findings.push(finding("DM-02", `CREATE INDEX on ${op.table}: column '${col}' not found`, op));
    }
  }
  return findings;
}
function checkDropIndex(op, schema) {
  return [];
}
function checkRenameTable(op, schema) {
  const findings = [];
  if (!tableExists(schema, op.table)) {
    findings.push(finding("DM-05", `RENAME TABLE ${op.table}: source table not found`, op));
  }
  if (tableExists(schema, op.newName)) {
    findings.push(finding("DM-05", `RENAME TABLE ${op.table} TO ${op.newName}: target already exists`, op));
  }
  return findings;
}
function checkRenameColumn(op, schema) {
  const findings = [];
  if (!tableExists(schema, op.table)) {
    findings.push(finding("DM-01", `RENAME COLUMN on ${op.table}: table not found`, op));
    return findings;
  }
  if (!columnExists(schema, op.table, op.column)) {
    findings.push(finding("DM-02", `RENAME COLUMN ${op.table}.${op.column}: source column not found`, op));
  }
  if (columnExists(schema, op.table, op.newName)) {
    findings.push(finding("DM-05", `RENAME COLUMN ${op.table}.${op.column} TO ${op.newName}: target already exists`, op));
  }
  return findings;
}
function checkFkTarget(op, fk, schema) {
  const findings = [];
  if (isPlatformTable(fk.refTable)) return findings;
  if (!tableExists(schema, fk.refTable)) {
    const closest = findClosestTable(schema, fk.refTable);
    const hint = closest ? ` Closest match: '${closest}'.` : "";
    findings.push(finding(
      "DM-03",
      `FK references table '${fk.refTable}' which does not exist.${hint}`,
      op
    ));
    return findings;
  }
  for (const col of fk.refColumns) {
    if (!columnExists(schema, fk.refTable, col)) {
      findings.push(finding(
        "DM-03",
        `FK references column '${fk.refTable}.${col}' which does not exist`,
        op
      ));
    }
  }
  return findings;
}
var PLATFORM_SCHEMA_PREFIXES;
var init_grounding_gate = __esm({
  "verify/scripts/mvp-migration/grounding-gate.ts"() {
    "use strict";
    init_schema_loader();
    PLATFORM_SCHEMA_PREFIXES = [
      "auth.",
      // Supabase Auth
      "storage.",
      // Supabase Storage
      "realtime.",
      // Supabase Realtime
      "extensions.",
      // Supabase Extensions
      "pgbouncer.",
      // PgBouncer
      "pg_catalog.",
      // Postgres system catalog
      "information_schema."
      // Postgres info schema
    ];
  }
});

// verify/scripts/mvp-migration/safety-gate.ts
function isNarrowing(fromType, toType) {
  const from = fromType.toLowerCase();
  const to = toType.toLowerCase();
  return NARROWING_PAIRS.some(([f, t]) => from === f && to === t);
}
function parseAcks(sql) {
  const acks = /* @__PURE__ */ new Set();
  const pattern = /--\s*verify:\s*ack\s+(DM-\d+)/gi;
  let match;
  while ((match = pattern.exec(sql)) !== null) {
    acks.add(match[1].toUpperCase());
  }
  return acks;
}
function runSafetyGate(spec, schema) {
  const acks = parseAcks(spec.raw);
  const allFindings = [];
  const workingSchema = cloneSchema2(schema);
  for (const located of spec.operations) {
    const loc = { stmtIndex: located.stmtIndex, opIndex: located.opIndex, line: located.line };
    const findings = checkSafety(located.op, workingSchema);
    for (const f of findings) {
      f.location = loc;
      if (acks.has(f.shapeId)) {
        f.severity = "warning";
        f.message += " [ACKED]";
      }
      allFindings.push(f);
    }
    try {
      applyOp(workingSchema, located.op);
    } catch {
    }
  }
  return allFindings;
}
function cloneSchema2(schema) {
  const clone = { tables: /* @__PURE__ */ new Map() };
  for (const [name, table] of schema.tables) {
    clone.tables.set(name, {
      columns: new Map(table.columns),
      pk: table.pk ? [...table.pk] : void 0,
      uniqueConstraints: table.uniqueConstraints.map((u) => ({ ...u, columns: [...u.columns] })),
      fkOut: table.fkOut.map((fk) => ({ ...fk, columns: [...fk.columns], refColumns: [...fk.refColumns] })),
      fkIn: table.fkIn.map((fk) => ({ ...fk, fromColumns: [...fk.fromColumns], columns: [...fk.columns] })),
      indexes: table.indexes.map((idx) => ({ ...idx, columns: [...idx.columns] }))
    });
  }
  return clone;
}
function finding2(shapeId, message, op, severity = "error") {
  return {
    shapeId,
    message,
    operation: op,
    severity,
    ackPattern: `-- verify: ack ${shapeId} <reason>`
  };
}
function checkSafety(op, schema) {
  switch (op.op) {
    case "drop_column":
      return checkDropColumnSafety(op, schema);
    case "drop_table":
      return checkDropTableSafety(op, schema);
    case "alter_column_type":
      return checkAlterTypeSafety(op, schema);
    case "alter_column_set_not_null":
      return checkSetNotNullSafety(op, schema);
    case "add_column":
      return checkAddColumnNotNull(op, schema);
    case "drop_index":
      return checkDropIndexSafety(op, schema);
    default:
      return [];
  }
}
function checkDropColumnSafety(op, schema) {
  const findings = [];
  const table = schema.tables.get(normalizeName(op.table));
  if (!table) return findings;
  const colNorm = normalizeName(op.column);
  const dependents = table.fkIn.filter((fk) => fk.columns.includes(colNorm));
  if (dependents.length > 0) {
    const refs = dependents.map((fk) => `${fk.fromTable}(${fk.fromColumns.join(", ")})`).join(", ");
    findings.push(finding2(
      "DM-15",
      `DROP COLUMN ${op.table}.${op.column} has ${dependents.length} incoming FK reference(s): [${refs}]. DROP will cascade or fail at runtime.`,
      op
    ));
  }
  const outgoing = table.fkOut.filter((fk) => fk.columns.includes(colNorm));
  if (outgoing.length > 0 && !op.cascade) {
    const refs = outgoing.map((fk) => `-> ${fk.refTable}(${fk.refColumns.join(", ")})`).join(", ");
    findings.push(finding2(
      "DM-15",
      `DROP COLUMN ${op.table}.${op.column} is part of outgoing FK [${refs}] but CASCADE not specified. The constraint must be dropped first or CASCADE used.`,
      op,
      "warning"
    ));
  }
  return findings;
}
function checkDropTableSafety(op, schema) {
  const findings = [];
  const table = schema.tables.get(normalizeName(op.table));
  if (!table) return findings;
  if (table.fkIn.length > 0 && !op.cascade) {
    const refs = table.fkIn.map((fk) => `${fk.fromTable}(${fk.fromColumns.join(", ")})`).join(", ");
    findings.push(finding2(
      "DM-16",
      `DROP TABLE ${op.table} has ${table.fkIn.length} incoming FK reference(s): [${refs}]. DROP will fail without CASCADE or prior constraint removal.`,
      op
    ));
  }
  return findings;
}
function checkAlterTypeSafety(op, schema) {
  const findings = [];
  const table = schema.tables.get(normalizeName(op.table));
  if (!table) return findings;
  const col = table.columns.get(normalizeName(op.column));
  if (!col) return findings;
  if (isNarrowing(col.type, op.newType)) {
    findings.push(finding2(
      "DM-17",
      `ALTER COLUMN ${op.table}.${op.column} TYPE ${col.type} \u2192 ${op.newType}: narrowing conversion may cause silent data loss.`,
      op
    ));
  }
  const colNorm = normalizeName(op.column);
  const dependents = table.fkIn.filter((fk) => fk.columns.includes(colNorm));
  if (dependents.length > 0) {
    const refs = dependents.map((fk) => `${fk.fromTable}(${fk.fromColumns.join(", ")})`).join(", ");
    findings.push(finding2(
      "DM-17",
      `ALTER COLUMN TYPE on ${op.table}.${op.column}: column has ${dependents.length} incoming FK reference(s) [${refs}]. Type change may break referencing columns.`,
      op,
      "warning"
    ));
  }
  return findings;
}
function checkSetNotNullSafety(op, schema) {
  const findings = [];
  const table = schema.tables.get(normalizeName(op.table));
  if (!table) return findings;
  const col = table.columns.get(normalizeName(op.column));
  if (!col) return findings;
  if (col.nullable && !col.hasDefault) {
    findings.push(finding2(
      "DM-18",
      `SET NOT NULL on ${op.table}.${op.column}: column is currently nullable with no default. Will fail if any existing rows contain NULL.`,
      op,
      "warning"
    ));
  }
  return findings;
}
function checkAddColumnNotNull(op, schema) {
  const findings = [];
  if (!op.column.nullable && !op.column.hasDefault && !op.column.identity) {
    findings.push(finding2(
      "DM-18",
      `ADD COLUMN ${op.table}.${op.column.name} NOT NULL without DEFAULT. Will fail on any non-empty table.`,
      op
    ));
  }
  return findings;
}
function checkDropIndexSafety(op, schema) {
  const findings = [];
  const idxNorm = normalizeName(op.name);
  for (const [tableName, table] of schema.tables) {
    if (table.pk && idxNorm === `${tableName}_pkey`) {
      findings.push(finding2(
        "DM-19",
        `DROP INDEX ${op.name}: backs PRIMARY KEY on ${tableName}(${table.pk.join(", ")})`,
        op
      ));
    }
    for (const u of table.uniqueConstraints) {
      if (u.name && normalizeName(u.name) === idxNorm) {
        findings.push(finding2(
          "DM-19",
          `DROP INDEX ${op.name}: backs UNIQUE constraint on ${tableName}(${u.columns.join(", ")})`,
          op
        ));
      }
    }
  }
  return findings;
}
var NARROWING_PAIRS;
var init_safety_gate = __esm({
  "verify/scripts/mvp-migration/safety-gate.ts"() {
    "use strict";
    init_schema_loader();
    NARROWING_PAIRS = [
      ["text", "varchar"],
      ["varchar", "char"],
      ["int8", "int4"],
      ["int8", "int2"],
      ["int4", "int2"],
      ["float8", "float4"],
      ["numeric", "int4"],
      ["numeric", "int8"],
      ["numeric", "float4"],
      ["timestamptz", "timestamp"],
      ["timestamptz", "date"],
      ["timestamp", "date"],
      ["text", "int4"],
      ["text", "int8"],
      ["text", "bool"],
      ["jsonb", "json"],
      ["json", "text"]
      // loses structure
    ];
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  applyDm18Filter: () => applyDm18Filter,
  isAcked: () => isAcked
});
module.exports = __toCommonJS(index_exports);

// verify/src/action/migration-check.ts
function detectMigrationFiles(changedFiles) {
  const patterns = [
    /migrations?\/.*\.sql$/i,
    /migrate\/.*\.sql$/i,
    /db\/migrate\/.*\.sql$/i,
    /supabase\/migrations\/.*\.sql$/i
  ];
  const excludes = [
    /^scripts\//i,
    /^fixtures\//i,
    /^tests?\//i,
    /corpus\//i
  ];
  return changedFiles.filter(
    (f) => patterns.some((p) => p.test(f)) && !excludes.some((e) => e.test(f))
  );
}

// verify/src/action/github.ts
async function getPRMetadata(token, owner, repo, prNumber) {
  const prRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json"
    }
  });
  if (!prRes.ok) throw new Error(`Failed to get PR: ${prRes.status}`);
  const pr = await prRes.json();
  const commitsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/commits?per_page=50`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json"
    }
  });
  const commits = commitsRes.ok ? await commitsRes.json() : [];
  const commitMessages = commits.map((c) => c.commit?.message ?? "").filter(Boolean);
  let issueTitle;
  const issueMatch = pr.body?.match(/(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s+#(\d+)/i);
  if (issueMatch) {
    try {
      const issueRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${issueMatch[1]}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json" }
      });
      if (issueRes.ok) {
        const issue = await issueRes.json();
        issueTitle = issue.title;
      }
    } catch {
    }
  }
  return {
    title: pr.title ?? "",
    body: pr.body ?? "",
    number: prNumber,
    headSha: pr.head?.sha ?? "",
    baseSha: pr.base?.sha ?? "",
    baseBranch: pr.base?.ref ?? "main",
    headBranch: pr.head?.ref ?? "",
    issueTitle,
    commitMessages
  };
}
async function getPRFiles(token, owner, repo, prNumber) {
  const files = [];
  let page = 1;
  while (true) {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files?per_page=100&page=${page}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json" }
    });
    if (!res.ok) throw new Error(`Failed to get PR files: ${res.status}`);
    const batch = await res.json();
    if (batch.length === 0) break;
    files.push(...batch.map((f) => ({ filename: f.filename, status: f.status })));
    if (batch.length < 100) break;
    page++;
  }
  return files;
}
async function getFileContent(token, owner, repo, path, ref) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${ref}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json" }
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (data.encoding === "base64" && data.content) {
    return Buffer.from(data.content, "base64").toString("utf-8");
  }
  return null;
}
async function postPRComment(token, owner, repo, prNumber, body) {
  const marker = "<!-- verify-action -->";
  const fullBody = `${marker}
${body}`;
  const commentsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments?per_page=100`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json" }
  });
  if (commentsRes.ok) {
    const comments = await commentsRes.json();
    const existing = comments.find((c) => c.body?.includes(marker));
    if (existing) {
      await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/comments/${existing.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ body: fullBody })
      });
      return;
    }
  }
  await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ body: fullBody })
  });
}

// src/index.ts
init_spec_from_ast();
init_schema_loader();
init_grounding_gate();
init_safety_gate();
var import_libpg_query3 = __toESM(require_wasm(), 1);

// src/dm18-comment.ts
var METHODOLOGY_URL = "https://github.com/Born14/verify/blob/main/scripts/mvp-migration/MEASURED-CLAIMS.md";
var REPRODUCE_URL = "https://github.com/Born14/verify/blob/main/scripts/mvp-migration/README.md";
function parseDm18Target(message) {
  const m = message.match(/(?:ADD COLUMN|SET NOT NULL on)\s+([\w.]+)\.(\w+)/i);
  if (m && m[1] && m[2]) return { table: m[1], column: m[2] };
  return null;
}
function findingRow(f) {
  const file = f.file;
  const line = f.location?.line ?? "";
  const target = parseDm18Target(f.message);
  const desc = target ? `\`${target.table}.${target.column}\` NOT NULL without safe preconditions \u2014 will fail on any non-empty table` : f.message;
  return `| \`${file}\` | ${line} | ${desc} |`;
}
function formatDm18Comment(findings, filesScanned) {
  if (filesScanned.length === 0) return null;
  if (findings.length === 0) {
    return [
      "### \u2705 DM-18: NOT NULL migration safety",
      "",
      `Checked ${filesScanned.length} migration file${filesScanned.length === 1 ? "" : "s"}. No DM-18 violations found.`,
      "",
      `DM-18 precision: **100%** (19 TP / 0 FP on 761 public production migrations). [Methodology](${METHODOLOGY_URL}) \xB7 [Reproduce](${REPRODUCE_URL})`
    ].join("\n");
  }
  const header = [
    "### \u274C DM-18: NOT NULL migration safety",
    "",
    `**This PR contains ${findings.length === 1 ? "a migration" : `${findings.length} migrations`} that would fail against a non-empty table.**`,
    "",
    `DM-18 precision: **100%** (19 TP / 0 FP on 761 public production migrations). [Methodology](${METHODOLOGY_URL}) \xB7 [Reproduce](${REPRODUCE_URL})`,
    "",
    "| File | Line | Finding |",
    "|------|------|---------|"
  ];
  const rows = findings.map(findingRow);
  const fix = [
    "",
    "**To fix:** add a `DEFAULT` clause, or split into three steps (ADD nullable \u2192 backfill \u2192 SET NOT NULL).",
    "",
    "<details>",
    "<summary>Suppress this finding</summary>",
    "",
    "If this migration runs against a known-empty table, add a SQL comment to acknowledge the risk:",
    "",
    "```sql",
    "-- verify: ack DM-18 <reason>",
    "```",
    "",
    "</details>"
  ];
  return [...header, ...rows, ...fix].join("\n");
}

// src/index.ts
async function runDm18OnGroups(groups) {
  await (0, import_libpg_query3.loadModule)();
  const findings = [];
  const filesChecked = [];
  for (const group of groups) {
    const schema = createEmptySchema();
    let priorIdx = 0;
    for (const priorSql of group.priorMigrationsSql) {
      priorIdx++;
      try {
        applyMigrationSQL(schema, priorSql);
      } catch (err) {
        console.log(
          `::warning::Schema bootstrap incomplete in ${group.root}: prior migration ${priorIdx}/${group.priorMigrationsSql.length} failed to apply (${err?.message ?? "unknown error"}). Findings on this group may be incomplete.`
        );
      }
    }
    for (const file of group.newFiles) {
      filesChecked.push(file.path);
      try {
        const spec = parseMigration(file.sql, file.path);
        if (spec.meta.parseErrors.length > 0) {
          console.log(
            `::warning::Could not parse ${file.path}: ${spec.meta.parseErrors[0]}. Skipping this file \u2014 DM-18 not checked here.`
          );
          continue;
        }
        const grounding = runGroundingGate(spec, schema);
        const safety = runSafetyGate(spec, schema);
        for (const f of [...grounding, ...safety]) {
          findings.push({ ...f, file: file.path });
        }
        try {
          applyMigrationSQL(schema, file.sql);
        } catch (err) {
          console.log(
            `::warning::Schema state could not advance after ${file.path} (${err?.message ?? "unknown error"}). Subsequent files in this group may produce incomplete findings.`
          );
        }
      } catch (err) {
        console.log(
          `::warning::Failed to check ${file.path}: ${err?.message ?? "unknown error"}. DM-18 not checked here.`
        );
      }
    }
  }
  return { findings, filesChecked };
}
function isAcked(f) {
  return f.message.includes("[ACKED]");
}
function applyDm18Filter(taggedFindings) {
  const dm18Raw = taggedFindings.filter((f) => f.shapeId === "DM-18");
  const visible = dm18Raw.filter((f) => !isAcked(f));
  return { visible, ackedCount: dm18Raw.length - visible.length };
}
function env(name, fallback = "") {
  return process.env[name] ?? fallback;
}
function boolEnv(name, fallback) {
  const v = process.env[name];
  if (v === void 0) return fallback;
  return v === "true" || v === "1";
}
function migrationRoot(p) {
  if (/\/migration\.sql$/i.test(p)) {
    return { root: p.replace(/\/[^/]+\/migration\.sql$/i, ""), isPrisma: true };
  }
  return { root: p.replace(/\/[^/]+$/, ""), isPrisma: false };
}
async function run() {
  const token = env("GITHUB_TOKEN") || env("INPUT_TOKEN") || "";
  const commentEnabled = boolEnv("INPUT_COMMENT", true);
  const failOn = (env("INPUT_FAIL_ON") || "error").toLowerCase();
  const eventPath = env("GITHUB_EVENT_PATH");
  if (!eventPath) {
    console.log("::error::Not running in GitHub Actions context (GITHUB_EVENT_PATH not set)");
    process.exit(1);
  }
  const { readFileSync } = await import("node:fs");
  const event = JSON.parse(readFileSync(eventPath, "utf-8"));
  const prNumber = event.pull_request?.number ?? event.number;
  const [owner, repo] = (env("GITHUB_REPOSITORY") || "").split("/");
  if (!prNumber || !owner || !repo) {
    console.log("::error::Could not determine PR number or repository");
    process.exit(1);
  }
  if (!token) {
    console.log(
      "::error::No GitHub token provided. Set GITHUB_TOKEN or use permissions: pull-requests: write, contents: read"
    );
    process.exit(1);
  }
  console.log(`dm18-migration-check: PR #${prNumber} in ${owner}/${repo}`);
  let migrationPaths = [];
  try {
    const prFiles = await getPRFiles(token, owner, repo, prNumber);
    migrationPaths = detectMigrationFiles(prFiles.map((f) => f.filename));
  } catch (err) {
    console.log(`::error::Could not list PR files: ${err.message}`);
    process.exit(1);
  }
  if (migrationPaths.length === 0) {
    console.log("No migration files in this PR. Nothing to check.");
    return;
  }
  console.log(`Found ${migrationPaths.length} migration file(s)`);
  let taggedFindings = [];
  try {
    const metadata = await getPRMetadata(token, owner, repo, prNumber);
    const baseRef = metadata.baseSha || metadata.baseBranch;
    console.log(
      `Schema pin: ${metadata.baseSha ? `base SHA ${metadata.baseSha.slice(0, 7)}` : `base branch ${metadata.baseBranch}`}`
    );
    const rootMap = /* @__PURE__ */ new Map();
    for (const p of migrationPaths) {
      const { root, isPrisma } = migrationRoot(p);
      const existing = rootMap.get(root);
      if (existing) existing.paths.push(p);
      else rootMap.set(root, { isPrisma, paths: [p] });
    }
    console.log(`Detected ${rootMap.size} migration root(s)`);
    const groups = [];
    for (const [root, info] of rootMap) {
      const priorSql = [];
      try {
        const dirRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(root)}?ref=${baseRef}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json"
            }
          }
        );
        if (dirRes.ok) {
          const dirContents = await dirRes.json();
          if (info.isPrisma) {
            const priorDirs = dirContents.filter((f) => f.type === "dir").map((f) => f.path).sort();
            for (const subdir of priorDirs) {
              const sqlPath = `${subdir}/migration.sql`;
              if (info.paths.includes(sqlPath)) continue;
              const sql = await getFileContent(token, owner, repo, sqlPath, baseRef);
              if (sql) priorSql.push(sql);
            }
          } else {
            const priorFiles = dirContents.filter((f) => f.name.endsWith(".sql") && f.type === "file").map((f) => f.path).filter((p) => !info.paths.includes(p)).sort();
            for (const pf of priorFiles) {
              const sql = await getFileContent(token, owner, repo, pf, baseRef);
              if (sql) priorSql.push(sql);
            }
          }
        }
      } catch {
      }
      const sortedPaths = [...info.paths].sort();
      const newFiles = [];
      for (const path of sortedPaths) {
        const content = await getFileContent(token, owner, repo, path, metadata.headSha);
        if (content) newFiles.push({ path, sql: content });
      }
      groups.push({ root, priorMigrationsSql: priorSql, newFiles });
      console.log(`  ${root}: ${priorSql.length} prior migration(s) for bootstrap`);
    }
    const runResult = await runDm18OnGroups(groups);
    taggedFindings = runResult.findings;
    console.log(
      `Gate run: ${taggedFindings.length} total finding(s) across all shapes`
    );
  } catch (err) {
    console.log(`::error::Migration verifier failed to run: ${err.message}`);
    if (err.stack) console.log(err.stack);
    process.exit(1);
  }
  const { visible: dm18, ackedCount } = applyDm18Filter(taggedFindings);
  console.log(
    `dm18-migration-check: ${dm18.length} DM-18 finding(s) after filter` + (ackedCount > 0 ? ` (${ackedCount} suppressed by ack comment)` : "")
  );
  if (commentEnabled) {
    const body = formatDm18Comment(dm18, migrationPaths);
    if (body) {
      try {
        await postPRComment(token, owner, repo, prNumber, body);
        console.log("Comment posted.");
      } catch (err) {
        console.log(`::warning::Could not post PR comment: ${err.message}`);
      }
    }
  }
  if (failOn === "none") {
    process.exit(0);
  }
  const hasError = dm18.some((f) => f.severity === "error");
  const hasWarning = dm18.some((f) => f.severity === "warning");
  if (failOn === "error" && hasError) {
    console.log("::error::DM-18 error-severity findings present \u2014 failing check");
    process.exit(1);
  }
  if (failOn === "warning" && (hasError || hasWarning)) {
    console.log("::error::DM-18 findings present \u2014 failing check (fail-on: warning)");
    process.exit(1);
  }
  process.exit(0);
}
if (!process.env.DM18_SUPPRESS_AUTORUN) {
  run().catch((err) => {
    console.log(`::error::Unhandled: ${err?.message ?? err}`);
    if (err?.stack) console.log(err.stack);
    process.exit(1);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  applyDm18Filter,
  isAcked
});
