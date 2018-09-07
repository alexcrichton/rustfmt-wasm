
(function() {
    var wasm;
    const __exports = {};
    
    
    const __wbg_error_cc95a3d302735ca3_target = console.error;
    
    let cachedDecoder = new TextDecoder('utf-8');
    
    let cachegetUint8Memory = null;
    function getUint8Memory() {
        if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
            cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
        }
        return cachegetUint8Memory;
    }
    
    function getStringFromWasm(ptr, len) {
        return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
    }
    
    __exports.__wbg_error_cc95a3d302735ca3 = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        
        varg0 = varg0.slice();
        wasm.__wbindgen_free(arg0, arg1 * 1);
        
        __wbg_error_cc95a3d302735ca3_target(varg0);
    };
    
    let cachedEncoder = new TextEncoder('utf-8');
    
    function passStringToWasm(arg) {
        
        const buf = cachedEncoder.encode(arg);
        const ptr = wasm.__wbindgen_malloc(buf.length);
        getUint8Memory().set(buf, ptr);
        return [ptr, buf.length];
    }
    /**
    * @param {string} arg0
    * @returns {RustfmtResult}
    */
    __exports.rustfmt = function(arg0) {
        const [ptr0, len0] = passStringToWasm(arg0);
        try {
            return RustfmtResult.__construct(wasm.rustfmt(ptr0, len0));
            
        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);
            
        }
        
    };
    
    let cachedGlobalArgumentPtr = null;
    function globalArgumentPtr() {
        if (cachedGlobalArgumentPtr === null) {
            cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
        }
        return cachedGlobalArgumentPtr;
    }
    
    let cachegetUint32Memory = null;
    function getUint32Memory() {
        if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
            cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
        }
        return cachegetUint32Memory;
    }
    
    function freeRustfmtResult(ptr) {
        
        wasm.__wbg_rustfmtresult_free(ptr);
    }
    /**
    */
    class RustfmtResult {
        
        static __construct(ptr) {
            return new RustfmtResult(ptr);
        }
        
        constructor(ptr) {
            this.ptr = ptr;
            
        }
        
        free() {
            const ptr = this.ptr;
            this.ptr = 0;
            freeRustfmtResult(ptr);
        }
        /**
        * @returns {string}
        */
        code() {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            const retptr = globalArgumentPtr();
            wasm.rustfmtresult_code(retptr, this.ptr);
            const mem = getUint32Memory();
            const rustptr = mem[retptr / 4];
            const rustlen = mem[retptr / 4 + 1];
            
            const realRet = getStringFromWasm(rustptr, rustlen).slice();
            wasm.__wbindgen_free(rustptr, rustlen * 1);
            return realRet;
            
        }
        /**
        * @returns {string}
        */
        error() {
            if (this.ptr === 0) {
                throw new Error('Attempt to use a moved value');
            }
            const retptr = globalArgumentPtr();
            wasm.rustfmtresult_error(retptr, this.ptr);
            const mem = getUint32Memory();
            const rustptr = mem[retptr / 4];
            const rustlen = mem[retptr / 4 + 1];
            if (rustptr === 0) return;
            const realRet = getStringFromWasm(rustptr, rustlen).slice();
            wasm.__wbindgen_free(rustptr, rustlen * 1);
            return realRet;
            
        }
    }
    __exports.RustfmtResult = RustfmtResult;
    
    __exports.__wbindgen_throw = function(ptr, len) {
        throw new Error(getStringFromWasm(ptr, len));
    };
    
    function init(wasm_path) {
        const fetchPromise = fetch(wasm_path);
        let resultPromise;
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            resultPromise = WebAssembly.instantiateStreaming(fetchPromise, { './wasm_rustfmt': __exports });
        } else {
            resultPromise = fetchPromise
            .then(response => response.arrayBuffer())
            .then(buffer => WebAssembly.instantiate(buffer, { './wasm_rustfmt': __exports }));
        }
        return resultPromise.then(({instance}) => {
            wasm = init.wasm = instance.exports;
            return;
        });
    };
    self.wasm_bindgen = Object.assign(init, __exports);
})();

