import { reactive as Jn, computed as $e, openBlock as Fr, createElementBlock as Hr, Fragment as wt, renderList as _t, normalizeClass as Kr, createElementVNode as ar, toDisplayString as zr, createCommentVNode as Zn, resolveComponent as Oe, normalizeStyle as ze, createVNode as Yn, createBlock as Qn, defineComponent as al, h as Kn, createApp as ol } from "vue";
var il = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Fe(a) {
  throw new Error('Could not dynamically require "' + a + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var ra = { exports: {} };
(function(a, v) {
  (function(p) {
    a.exports = p();
  })(function() {
    return function p(m, E, C) {
      function U(L, H) {
        if (!E[L]) {
          if (!m[L]) {
            var K = typeof Fe == "function" && Fe;
            if (!H && K)
              return K(L, !0);
            if (X)
              return X(L, !0);
            throw new Error("Cannot find module '" + L + "'");
          }
          H = E[L] = { exports: {} }, m[L][0].call(H.exports, function(Q) {
            var Y = m[L][1][Q];
            return U(Y || Q);
          }, H, H.exports, p, m, E, C);
        }
        return E[L].exports;
      }
      for (var X = typeof Fe == "function" && Fe, A = 0; A < C.length; A++)
        U(C[A]);
      return U;
    }({ 1: [function(p, m, E) {
      (function(C, U, X, A, L, H, K, Q, Y) {
        var T = p("crypto");
        function $(d, I) {
          I = R(d, I);
          var s;
          return (s = I.algorithm !== "passthrough" ? T.createHash(I.algorithm) : new Z()).write === void 0 && (s.write = s.update, s.end = s.update), N(I, s).dispatch(d), s.update || s.end(""), s.digest ? s.digest(I.encoding === "buffer" ? void 0 : I.encoding) : (d = s.read(), I.encoding !== "buffer" ? d.toString(I.encoding) : d);
        }
        (E = m.exports = $).sha1 = function(d) {
          return $(d);
        }, E.keys = function(d) {
          return $(d, { excludeValues: !0, algorithm: "sha1", encoding: "hex" });
        }, E.MD5 = function(d) {
          return $(d, { algorithm: "md5", encoding: "hex" });
        }, E.keysMD5 = function(d) {
          return $(d, { algorithm: "md5", encoding: "hex", excludeValues: !0 });
        };
        var y = T.getHashes ? T.getHashes().slice() : ["sha1", "md5"], B = (y.push("passthrough"), ["buffer", "hex", "binary", "base64"]);
        function R(d, I) {
          var s = {};
          if (s.algorithm = (I = I || {}).algorithm || "sha1", s.encoding = I.encoding || "hex", s.excludeValues = !!I.excludeValues, s.algorithm = s.algorithm.toLowerCase(), s.encoding = s.encoding.toLowerCase(), s.ignoreUnknown = I.ignoreUnknown === !0, s.respectType = I.respectType !== !1, s.respectFunctionNames = I.respectFunctionNames !== !1, s.respectFunctionProperties = I.respectFunctionProperties !== !1, s.unorderedArrays = I.unorderedArrays === !0, s.unorderedSets = I.unorderedSets !== !1, s.unorderedObjects = I.unorderedObjects !== !1, s.replacer = I.replacer || void 0, s.excludeKeys = I.excludeKeys || void 0, d === void 0)
            throw new Error("Object argument required.");
          for (var f = 0; f < y.length; ++f)
            y[f].toLowerCase() === s.algorithm.toLowerCase() && (s.algorithm = y[f]);
          if (y.indexOf(s.algorithm) === -1)
            throw new Error('Algorithm "' + s.algorithm + '"  not supported. supported values: ' + y.join(", "));
          if (B.indexOf(s.encoding) === -1 && s.algorithm !== "passthrough")
            throw new Error('Encoding "' + s.encoding + '"  not supported. supported values: ' + B.join(", "));
          return s;
        }
        function O(d) {
          if (typeof d == "function")
            return /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(d)) != null;
        }
        function N(d, I, s) {
          s = s || [];
          function f(l) {
            return I.update ? I.update(l, "utf8") : I.write(l, "utf8");
          }
          return { dispatch: function(l) {
            return this["_" + ((l = d.replacer ? d.replacer(l) : l) === null ? "null" : typeof l)](l);
          }, _object: function(l) {
            var k, x = Object.prototype.toString.call(l), tr = /\[object (.*)\]/i.exec(x);
            if (tr = (tr = tr ? tr[1] : "unknown:[" + x + "]").toLowerCase(), 0 <= (x = s.indexOf(l)))
              return this.dispatch("[CIRCULAR:" + x + "]");
            if (s.push(l), X !== void 0 && X.isBuffer && X.isBuffer(l))
              return f("buffer:"), f(l);
            if (tr === "object" || tr === "function" || tr === "asyncfunction")
              return x = Object.keys(l), d.unorderedObjects && (x = x.sort()), d.respectType === !1 || O(l) || x.splice(0, 0, "prototype", "__proto__", "constructor"), d.excludeKeys && (x = x.filter(function(er) {
                return !d.excludeKeys(er);
              })), f("object:" + x.length + ":"), k = this, x.forEach(function(er) {
                k.dispatch(er), f(":"), d.excludeValues || k.dispatch(l[er]), f(",");
              });
            if (!this["_" + tr]) {
              if (d.ignoreUnknown)
                return f("[" + tr + "]");
              throw new Error('Unknown object type "' + tr + '"');
            }
            this["_" + tr](l);
          }, _array: function(l, er) {
            er = er !== void 0 ? er : d.unorderedArrays !== !1;
            var x = this;
            if (f("array:" + l.length + ":"), !er || l.length <= 1)
              return l.forEach(function(nr) {
                return x.dispatch(nr);
              });
            var tr = [], er = l.map(function(nr) {
              var J = new Z(), br = s.slice();
              return N(d, J, br).dispatch(nr), tr = tr.concat(br.slice(s.length)), J.read().toString();
            });
            return s = s.concat(tr), er.sort(), this._array(er, !1);
          }, _date: function(l) {
            return f("date:" + l.toJSON());
          }, _symbol: function(l) {
            return f("symbol:" + l.toString());
          }, _error: function(l) {
            return f("error:" + l.toString());
          }, _boolean: function(l) {
            return f("bool:" + l.toString());
          }, _string: function(l) {
            f("string:" + l.length + ":"), f(l.toString());
          }, _function: function(l) {
            f("fn:"), O(l) ? this.dispatch("[native]") : this.dispatch(l.toString()), d.respectFunctionNames !== !1 && this.dispatch("function-name:" + String(l.name)), d.respectFunctionProperties && this._object(l);
          }, _number: function(l) {
            return f("number:" + l.toString());
          }, _xml: function(l) {
            return f("xml:" + l.toString());
          }, _null: function() {
            return f("Null");
          }, _undefined: function() {
            return f("Undefined");
          }, _regexp: function(l) {
            return f("regex:" + l.toString());
          }, _uint8array: function(l) {
            return f("uint8array:"), this.dispatch(Array.prototype.slice.call(l));
          }, _uint8clampedarray: function(l) {
            return f("uint8clampedarray:"), this.dispatch(Array.prototype.slice.call(l));
          }, _int8array: function(l) {
            return f("int8array:"), this.dispatch(Array.prototype.slice.call(l));
          }, _uint16array: function(l) {
            return f("uint16array:"), this.dispatch(Array.prototype.slice.call(l));
          }, _int16array: function(l) {
            return f("int16array:"), this.dispatch(Array.prototype.slice.call(l));
          }, _uint32array: function(l) {
            return f("uint32array:"), this.dispatch(Array.prototype.slice.call(l));
          }, _int32array: function(l) {
            return f("int32array:"), this.dispatch(Array.prototype.slice.call(l));
          }, _float32array: function(l) {
            return f("float32array:"), this.dispatch(Array.prototype.slice.call(l));
          }, _float64array: function(l) {
            return f("float64array:"), this.dispatch(Array.prototype.slice.call(l));
          }, _arraybuffer: function(l) {
            return f("arraybuffer:"), this.dispatch(new Uint8Array(l));
          }, _url: function(l) {
            return f("url:" + l.toString());
          }, _map: function(l) {
            return f("map:"), l = Array.from(l), this._array(l, d.unorderedSets !== !1);
          }, _set: function(l) {
            return f("set:"), l = Array.from(l), this._array(l, d.unorderedSets !== !1);
          }, _file: function(l) {
            return f("file:"), this.dispatch([l.name, l.size, l.type, l.lastModfied]);
          }, _blob: function() {
            if (d.ignoreUnknown)
              return f("[blob]");
            throw Error(`Hashing Blob objects is currently not supported
(see https://github.com/puleos/object-hash/issues/26)
Use "options.replacer" or "options.ignoreUnknown"
`);
          }, _domwindow: function() {
            return f("domwindow");
          }, _bigint: function(l) {
            return f("bigint:" + l.toString());
          }, _process: function() {
            return f("process");
          }, _timer: function() {
            return f("timer");
          }, _pipe: function() {
            return f("pipe");
          }, _tcp: function() {
            return f("tcp");
          }, _udp: function() {
            return f("udp");
          }, _tty: function() {
            return f("tty");
          }, _statwatcher: function() {
            return f("statwatcher");
          }, _securecontext: function() {
            return f("securecontext");
          }, _connection: function() {
            return f("connection");
          }, _zlib: function() {
            return f("zlib");
          }, _context: function() {
            return f("context");
          }, _nodescript: function() {
            return f("nodescript");
          }, _httpparser: function() {
            return f("httpparser");
          }, _dataview: function() {
            return f("dataview");
          }, _signal: function() {
            return f("signal");
          }, _fsevent: function() {
            return f("fsevent");
          }, _tlswrap: function() {
            return f("tlswrap");
          } };
        }
        function Z() {
          return { buf: "", write: function(d) {
            this.buf += d;
          }, end: function(d) {
            this.buf += d;
          }, read: function() {
            return this.buf;
          } };
        }
        E.writeToStream = function(d, I, s) {
          return s === void 0 && (s = I, I = {}), N(I = R(d, I), s).dispatch(d);
        };
      }).call(this, p("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, p("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_9a5aa49d.js", "/");
    }, { buffer: 3, crypto: 5, lYpoI2: 11 }], 2: [function(p, m, E) {
      (function(C, U, X, A, L, H, K, Q, Y) {
        (function(T) {
          var $ = typeof Uint8Array < "u" ? Uint8Array : Array, y = "+".charCodeAt(0), B = "/".charCodeAt(0), R = "0".charCodeAt(0), O = "a".charCodeAt(0), N = "A".charCodeAt(0), Z = "-".charCodeAt(0), d = "_".charCodeAt(0);
          function I(s) {
            return s = s.charCodeAt(0), s === y || s === Z ? 62 : s === B || s === d ? 63 : s < R ? -1 : s < R + 10 ? s - R + 26 + 26 : s < N + 26 ? s - N : s < O + 26 ? s - O + 26 : void 0;
          }
          T.toByteArray = function(s) {
            var f, l;
            if (0 < s.length % 4)
              throw new Error("Invalid string. Length must be a multiple of 4");
            var k = s.length, k = s.charAt(k - 2) === "=" ? 2 : s.charAt(k - 1) === "=" ? 1 : 0, x = new $(3 * s.length / 4 - k), tr = 0 < k ? s.length - 4 : s.length, er = 0;
            function nr(J) {
              x[er++] = J;
            }
            for (f = 0; f < tr; f += 4, 0)
              nr((16711680 & (l = I(s.charAt(f)) << 18 | I(s.charAt(f + 1)) << 12 | I(s.charAt(f + 2)) << 6 | I(s.charAt(f + 3)))) >> 16), nr((65280 & l) >> 8), nr(255 & l);
            return k == 2 ? nr(255 & (l = I(s.charAt(f)) << 2 | I(s.charAt(f + 1)) >> 4)) : k == 1 && (nr((l = I(s.charAt(f)) << 10 | I(s.charAt(f + 1)) << 4 | I(s.charAt(f + 2)) >> 2) >> 8 & 255), nr(255 & l)), x;
          }, T.fromByteArray = function(s) {
            var f, l, k, x, tr = s.length % 3, er = "";
            function nr(J) {
              return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(J);
            }
            for (f = 0, k = s.length - tr; f < k; f += 3)
              l = (s[f] << 16) + (s[f + 1] << 8) + s[f + 2], er += nr((x = l) >> 18 & 63) + nr(x >> 12 & 63) + nr(x >> 6 & 63) + nr(63 & x);
            switch (tr) {
              case 1:
                er = (er += nr((l = s[s.length - 1]) >> 2)) + nr(l << 4 & 63) + "==";
                break;
              case 2:
                er = (er = (er += nr((l = (s[s.length - 2] << 8) + s[s.length - 1]) >> 10)) + nr(l >> 4 & 63)) + nr(l << 2 & 63) + "=";
            }
            return er;
          };
        })(E === void 0 ? this.base64js = {} : E);
      }).call(this, p("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, p("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js", "/node_modules/gulp-browserify/node_modules/base64-js/lib");
    }, { buffer: 3, lYpoI2: 11 }], 3: [function(p, m, E) {
      (function(C, U, y, A, L, H, K, Q, Y) {
        var T = p("base64-js"), $ = p("ieee754");
        function y(n, u, b) {
          if (!(this instanceof y))
            return new y(n, u, b);
          var D, z, j, lr, _r = typeof n;
          if (u === "base64" && _r == "string")
            for (n = (lr = n).trim ? lr.trim() : lr.replace(/^\s+|\s+$/g, ""); n.length % 4 != 0; )
              n += "=";
          if (_r == "number")
            D = xr(n);
          else if (_r == "string")
            D = y.byteLength(n, u);
          else {
            if (_r != "object")
              throw new Error("First argument needs to be a number, array or string.");
            D = xr(n.length);
          }
          if (y._useTypedArrays ? z = y._augment(new Uint8Array(D)) : ((z = this).length = D, z._isBuffer = !0), y._useTypedArrays && typeof n.byteLength == "number")
            z._set(n);
          else if (wr(lr = n) || y.isBuffer(lr) || lr && typeof lr == "object" && typeof lr.length == "number")
            for (j = 0; j < D; j++)
              y.isBuffer(n) ? z[j] = n.readUInt8(j) : z[j] = n[j];
          else if (_r == "string")
            z.write(n, 0, u);
          else if (_r == "number" && !y._useTypedArrays && !b)
            for (j = 0; j < D; j++)
              z[j] = 0;
          return z;
        }
        function B(n, u, b, D) {
          return y._charsWritten = ne(function(z) {
            for (var j = [], lr = 0; lr < z.length; lr++)
              j.push(255 & z.charCodeAt(lr));
            return j;
          }(u), n, b, D);
        }
        function R(n, u, b, D) {
          return y._charsWritten = ne(function(z) {
            for (var j, lr, _r = [], $r = 0; $r < z.length; $r++)
              lr = z.charCodeAt($r), j = lr >> 8, lr = lr % 256, _r.push(lr), _r.push(j);
            return _r;
          }(u), n, b, D);
        }
        function O(n, u, b) {
          var D = "";
          b = Math.min(n.length, b);
          for (var z = u; z < b; z++)
            D += String.fromCharCode(n[z]);
          return D;
        }
        function N(n, u, b, j) {
          j || (V(typeof b == "boolean", "missing or invalid endian"), V(u != null, "missing offset"), V(u + 1 < n.length, "Trying to read beyond buffer length"));
          var z, j = n.length;
          if (!(j <= u))
            return b ? (z = n[u], u + 1 < j && (z |= n[u + 1] << 8)) : (z = n[u] << 8, u + 1 < j && (z |= n[u + 1])), z;
        }
        function Z(n, u, b, j) {
          j || (V(typeof b == "boolean", "missing or invalid endian"), V(u != null, "missing offset"), V(u + 3 < n.length, "Trying to read beyond buffer length"));
          var z, j = n.length;
          if (!(j <= u))
            return b ? (u + 2 < j && (z = n[u + 2] << 16), u + 1 < j && (z |= n[u + 1] << 8), z |= n[u], u + 3 < j && (z += n[u + 3] << 24 >>> 0)) : (u + 1 < j && (z = n[u + 1] << 16), u + 2 < j && (z |= n[u + 2] << 8), u + 3 < j && (z |= n[u + 3]), z += n[u] << 24 >>> 0), z;
        }
        function d(n, u, b, D) {
          if (D || (V(typeof b == "boolean", "missing or invalid endian"), V(u != null, "missing offset"), V(u + 1 < n.length, "Trying to read beyond buffer length")), !(n.length <= u))
            return D = N(n, u, b, !0), 32768 & D ? -1 * (65535 - D + 1) : D;
        }
        function I(n, u, b, D) {
          if (D || (V(typeof b == "boolean", "missing or invalid endian"), V(u != null, "missing offset"), V(u + 3 < n.length, "Trying to read beyond buffer length")), !(n.length <= u))
            return D = Z(n, u, b, !0), 2147483648 & D ? -1 * (4294967295 - D + 1) : D;
        }
        function s(n, u, b, D) {
          return D || (V(typeof b == "boolean", "missing or invalid endian"), V(u + 3 < n.length, "Trying to read beyond buffer length")), $.read(n, u, b, 23, 4);
        }
        function f(n, u, b, D) {
          return D || (V(typeof b == "boolean", "missing or invalid endian"), V(u + 7 < n.length, "Trying to read beyond buffer length")), $.read(n, u, b, 52, 8);
        }
        function l(n, u, b, D, z) {
          if (z || (V(u != null, "missing value"), V(typeof D == "boolean", "missing or invalid endian"), V(b != null, "missing offset"), V(b + 1 < n.length, "trying to write beyond buffer length"), pe(u, 65535)), z = n.length, !(z <= b))
            for (var j = 0, lr = Math.min(z - b, 2); j < lr; j++)
              n[b + j] = (u & 255 << 8 * (D ? j : 1 - j)) >>> 8 * (D ? j : 1 - j);
        }
        function k(n, u, b, D, z) {
          if (z || (V(u != null, "missing value"), V(typeof D == "boolean", "missing or invalid endian"), V(b != null, "missing offset"), V(b + 3 < n.length, "trying to write beyond buffer length"), pe(u, 4294967295)), z = n.length, !(z <= b))
            for (var j = 0, lr = Math.min(z - b, 4); j < lr; j++)
              n[b + j] = u >>> 8 * (D ? j : 3 - j) & 255;
        }
        function x(n, u, b, D, z) {
          z || (V(u != null, "missing value"), V(typeof D == "boolean", "missing or invalid endian"), V(b != null, "missing offset"), V(b + 1 < n.length, "Trying to write beyond buffer length"), be(u, 32767, -32768)), n.length <= b || l(n, 0 <= u ? u : 65535 + u + 1, b, D, z);
        }
        function tr(n, u, b, D, z) {
          z || (V(u != null, "missing value"), V(typeof D == "boolean", "missing or invalid endian"), V(b != null, "missing offset"), V(b + 3 < n.length, "Trying to write beyond buffer length"), be(u, 2147483647, -2147483648)), n.length <= b || k(n, 0 <= u ? u : 4294967295 + u + 1, b, D, z);
        }
        function er(n, u, b, D, z) {
          z || (V(u != null, "missing value"), V(typeof D == "boolean", "missing or invalid endian"), V(b != null, "missing offset"), V(b + 3 < n.length, "Trying to write beyond buffer length"), Ie(u, 34028234663852886e22, -34028234663852886e22)), n.length <= b || $.write(n, u, b, D, 23, 4);
        }
        function nr(n, u, b, D, z) {
          z || (V(u != null, "missing value"), V(typeof D == "boolean", "missing or invalid endian"), V(b != null, "missing offset"), V(b + 7 < n.length, "Trying to write beyond buffer length"), Ie(u, 17976931348623157e292, -17976931348623157e292)), n.length <= b || $.write(n, u, b, D, 52, 8);
        }
        E.Buffer = y, E.SlowBuffer = y, E.INSPECT_MAX_BYTES = 50, y.poolSize = 8192, y._useTypedArrays = function() {
          try {
            var n = new ArrayBuffer(0), u = new Uint8Array(n);
            return u.foo = function() {
              return 42;
            }, u.foo() === 42 && typeof u.subarray == "function";
          } catch {
            return !1;
          }
        }(), y.isEncoding = function(n) {
          switch (String(n).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "raw":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }, y.isBuffer = function(n) {
          return !(n == null || !n._isBuffer);
        }, y.byteLength = function(n, u) {
          var b;
          switch (n += "", u || "utf8") {
            case "hex":
              b = n.length / 2;
              break;
            case "utf8":
            case "utf-8":
              b = Ur(n).length;
              break;
            case "ascii":
            case "binary":
            case "raw":
              b = n.length;
              break;
            case "base64":
              b = xe(n).length;
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              b = 2 * n.length;
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return b;
        }, y.concat = function(n, u) {
          if (V(wr(n), `Usage: Buffer.concat(list, [totalLength])
list should be an Array.`), n.length === 0)
            return new y(0);
          if (n.length === 1)
            return n[0];
          if (typeof u != "number")
            for (z = u = 0; z < n.length; z++)
              u += n[z].length;
          for (var b = new y(u), D = 0, z = 0; z < n.length; z++) {
            var j = n[z];
            j.copy(b, D), D += j.length;
          }
          return b;
        }, y.prototype.write = function(n, u, b, D) {
          isFinite(u) ? isFinite(b) || (D = b, b = void 0) : ($r = D, D = u, u = b, b = $r), u = Number(u) || 0;
          var z, j, lr, _r, $r = this.length - u;
          switch ((!b || $r < (b = Number(b))) && (b = $r), D = String(D || "utf8").toLowerCase()) {
            case "hex":
              z = function(Nr, Br, Mr, Cr) {
                Mr = Number(Mr) || 0;
                var kr = Nr.length - Mr;
                (!Cr || kr < (Cr = Number(Cr))) && (Cr = kr), V((kr = Br.length) % 2 == 0, "Invalid hex string"), kr / 2 < Cr && (Cr = kr / 2);
                for (var Vr = 0; Vr < Cr; Vr++) {
                  var me = parseInt(Br.substr(2 * Vr, 2), 16);
                  V(!isNaN(me), "Invalid hex string"), Nr[Mr + Vr] = me;
                }
                return y._charsWritten = 2 * Vr, Vr;
              }(this, n, u, b);
              break;
            case "utf8":
            case "utf-8":
              j = this, lr = u, _r = b, z = y._charsWritten = ne(Ur(n), j, lr, _r);
              break;
            case "ascii":
            case "binary":
              z = B(this, n, u, b);
              break;
            case "base64":
              j = this, lr = u, _r = b, z = y._charsWritten = ne(xe(n), j, lr, _r);
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              z = R(this, n, u, b);
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return z;
        }, y.prototype.toString = function(n, u, b) {
          var D, z, j, lr, _r = this;
          if (n = String(n || "utf8").toLowerCase(), u = Number(u) || 0, (b = b !== void 0 ? Number(b) : _r.length) === u)
            return "";
          switch (n) {
            case "hex":
              D = function($r, Nr, Br) {
                var Mr = $r.length;
                (!Nr || Nr < 0) && (Nr = 0), (!Br || Br < 0 || Mr < Br) && (Br = Mr);
                for (var Cr = "", kr = Nr; kr < Br; kr++)
                  Cr += mr($r[kr]);
                return Cr;
              }(_r, u, b);
              break;
            case "utf8":
            case "utf-8":
              D = function($r, Nr, Br) {
                var Mr = "", Cr = "";
                Br = Math.min($r.length, Br);
                for (var kr = Nr; kr < Br; kr++)
                  $r[kr] <= 127 ? (Mr += ae(Cr) + String.fromCharCode($r[kr]), Cr = "") : Cr += "%" + $r[kr].toString(16);
                return Mr + ae(Cr);
              }(_r, u, b);
              break;
            case "ascii":
            case "binary":
              D = O(_r, u, b);
              break;
            case "base64":
              z = _r, lr = b, D = (j = u) === 0 && lr === z.length ? T.fromByteArray(z) : T.fromByteArray(z.slice(j, lr));
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              D = function($r, Nr, Br) {
                for (var Mr = $r.slice(Nr, Br), Cr = "", kr = 0; kr < Mr.length; kr += 2)
                  Cr += String.fromCharCode(Mr[kr] + 256 * Mr[kr + 1]);
                return Cr;
              }(_r, u, b);
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return D;
        }, y.prototype.toJSON = function() {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        }, y.prototype.copy = function(n, u, b, D) {
          if (u = u || 0, (D = D || D === 0 ? D : this.length) !== (b = b || 0) && n.length !== 0 && this.length !== 0) {
            V(b <= D, "sourceEnd < sourceStart"), V(0 <= u && u < n.length, "targetStart out of bounds"), V(0 <= b && b < this.length, "sourceStart out of bounds"), V(0 <= D && D <= this.length, "sourceEnd out of bounds"), D > this.length && (D = this.length);
            var z = (D = n.length - u < D - b ? n.length - u + b : D) - b;
            if (z < 100 || !y._useTypedArrays)
              for (var j = 0; j < z; j++)
                n[j + u] = this[j + b];
            else
              n._set(this.subarray(b, b + z), u);
          }
        }, y.prototype.slice = function(n, u) {
          var b = this.length;
          if (n = br(n, b, 0), u = br(u, b, b), y._useTypedArrays)
            return y._augment(this.subarray(n, u));
          for (var D = u - n, z = new y(D, void 0, !0), j = 0; j < D; j++)
            z[j] = this[j + n];
          return z;
        }, y.prototype.get = function(n) {
          return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(n);
        }, y.prototype.set = function(n, u) {
          return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(n, u);
        }, y.prototype.readUInt8 = function(n, u) {
          if (u || (V(n != null, "missing offset"), V(n < this.length, "Trying to read beyond buffer length")), !(n >= this.length))
            return this[n];
        }, y.prototype.readUInt16LE = function(n, u) {
          return N(this, n, !0, u);
        }, y.prototype.readUInt16BE = function(n, u) {
          return N(this, n, !1, u);
        }, y.prototype.readUInt32LE = function(n, u) {
          return Z(this, n, !0, u);
        }, y.prototype.readUInt32BE = function(n, u) {
          return Z(this, n, !1, u);
        }, y.prototype.readInt8 = function(n, u) {
          if (u || (V(n != null, "missing offset"), V(n < this.length, "Trying to read beyond buffer length")), !(n >= this.length))
            return 128 & this[n] ? -1 * (255 - this[n] + 1) : this[n];
        }, y.prototype.readInt16LE = function(n, u) {
          return d(this, n, !0, u);
        }, y.prototype.readInt16BE = function(n, u) {
          return d(this, n, !1, u);
        }, y.prototype.readInt32LE = function(n, u) {
          return I(this, n, !0, u);
        }, y.prototype.readInt32BE = function(n, u) {
          return I(this, n, !1, u);
        }, y.prototype.readFloatLE = function(n, u) {
          return s(this, n, !0, u);
        }, y.prototype.readFloatBE = function(n, u) {
          return s(this, n, !1, u);
        }, y.prototype.readDoubleLE = function(n, u) {
          return f(this, n, !0, u);
        }, y.prototype.readDoubleBE = function(n, u) {
          return f(this, n, !1, u);
        }, y.prototype.writeUInt8 = function(n, u, b) {
          b || (V(n != null, "missing value"), V(u != null, "missing offset"), V(u < this.length, "trying to write beyond buffer length"), pe(n, 255)), u >= this.length || (this[u] = n);
        }, y.prototype.writeUInt16LE = function(n, u, b) {
          l(this, n, u, !0, b);
        }, y.prototype.writeUInt16BE = function(n, u, b) {
          l(this, n, u, !1, b);
        }, y.prototype.writeUInt32LE = function(n, u, b) {
          k(this, n, u, !0, b);
        }, y.prototype.writeUInt32BE = function(n, u, b) {
          k(this, n, u, !1, b);
        }, y.prototype.writeInt8 = function(n, u, b) {
          b || (V(n != null, "missing value"), V(u != null, "missing offset"), V(u < this.length, "Trying to write beyond buffer length"), be(n, 127, -128)), u >= this.length || (0 <= n ? this.writeUInt8(n, u, b) : this.writeUInt8(255 + n + 1, u, b));
        }, y.prototype.writeInt16LE = function(n, u, b) {
          x(this, n, u, !0, b);
        }, y.prototype.writeInt16BE = function(n, u, b) {
          x(this, n, u, !1, b);
        }, y.prototype.writeInt32LE = function(n, u, b) {
          tr(this, n, u, !0, b);
        }, y.prototype.writeInt32BE = function(n, u, b) {
          tr(this, n, u, !1, b);
        }, y.prototype.writeFloatLE = function(n, u, b) {
          er(this, n, u, !0, b);
        }, y.prototype.writeFloatBE = function(n, u, b) {
          er(this, n, u, !1, b);
        }, y.prototype.writeDoubleLE = function(n, u, b) {
          nr(this, n, u, !0, b);
        }, y.prototype.writeDoubleBE = function(n, u, b) {
          nr(this, n, u, !1, b);
        }, y.prototype.fill = function(n, u, b) {
          if (u = u || 0, b = b || this.length, V(typeof (n = typeof (n = n || 0) == "string" ? n.charCodeAt(0) : n) == "number" && !isNaN(n), "value is not a number"), V(u <= b, "end < start"), b !== u && this.length !== 0) {
            V(0 <= u && u < this.length, "start out of bounds"), V(0 <= b && b <= this.length, "end out of bounds");
            for (var D = u; D < b; D++)
              this[D] = n;
          }
        }, y.prototype.inspect = function() {
          for (var n = [], u = this.length, b = 0; b < u; b++)
            if (n[b] = mr(this[b]), b === E.INSPECT_MAX_BYTES) {
              n[b + 1] = "...";
              break;
            }
          return "<Buffer " + n.join(" ") + ">";
        }, y.prototype.toArrayBuffer = function() {
          if (typeof Uint8Array > "u")
            throw new Error("Buffer.toArrayBuffer not supported in this browser");
          if (y._useTypedArrays)
            return new y(this).buffer;
          for (var n = new Uint8Array(this.length), u = 0, b = n.length; u < b; u += 1)
            n[u] = this[u];
          return n.buffer;
        };
        var J = y.prototype;
        function br(n, u, b) {
          return typeof n != "number" ? b : u <= (n = ~~n) ? u : 0 <= n || 0 <= (n += u) ? n : 0;
        }
        function xr(n) {
          return (n = ~~Math.ceil(+n)) < 0 ? 0 : n;
        }
        function wr(n) {
          return (Array.isArray || function(u) {
            return Object.prototype.toString.call(u) === "[object Array]";
          })(n);
        }
        function mr(n) {
          return n < 16 ? "0" + n.toString(16) : n.toString(16);
        }
        function Ur(n) {
          for (var u = [], b = 0; b < n.length; b++) {
            var D = n.charCodeAt(b);
            if (D <= 127)
              u.push(n.charCodeAt(b));
            else
              for (var z = b, j = (55296 <= D && D <= 57343 && b++, encodeURIComponent(n.slice(z, b + 1)).substr(1).split("%")), lr = 0; lr < j.length; lr++)
                u.push(parseInt(j[lr], 16));
          }
          return u;
        }
        function xe(n) {
          return T.toByteArray(n);
        }
        function ne(n, u, b, D) {
          for (var z = 0; z < D && !(z + b >= u.length || z >= n.length); z++)
            u[z + b] = n[z];
          return z;
        }
        function ae(n) {
          try {
            return decodeURIComponent(n);
          } catch {
            return String.fromCharCode(65533);
          }
        }
        function pe(n, u) {
          V(typeof n == "number", "cannot write a non-number as a number"), V(0 <= n, "specified a negative value for writing an unsigned value"), V(n <= u, "value is larger than maximum value for type"), V(Math.floor(n) === n, "value has a fractional component");
        }
        function be(n, u, b) {
          V(typeof n == "number", "cannot write a non-number as a number"), V(n <= u, "value larger than maximum allowed value"), V(b <= n, "value smaller than minimum allowed value"), V(Math.floor(n) === n, "value has a fractional component");
        }
        function Ie(n, u, b) {
          V(typeof n == "number", "cannot write a non-number as a number"), V(n <= u, "value larger than maximum allowed value"), V(b <= n, "value smaller than minimum allowed value");
        }
        function V(n, u) {
          if (!n)
            throw new Error(u || "Failed assertion");
        }
        y._augment = function(n) {
          return n._isBuffer = !0, n._get = n.get, n._set = n.set, n.get = J.get, n.set = J.set, n.write = J.write, n.toString = J.toString, n.toLocaleString = J.toString, n.toJSON = J.toJSON, n.copy = J.copy, n.slice = J.slice, n.readUInt8 = J.readUInt8, n.readUInt16LE = J.readUInt16LE, n.readUInt16BE = J.readUInt16BE, n.readUInt32LE = J.readUInt32LE, n.readUInt32BE = J.readUInt32BE, n.readInt8 = J.readInt8, n.readInt16LE = J.readInt16LE, n.readInt16BE = J.readInt16BE, n.readInt32LE = J.readInt32LE, n.readInt32BE = J.readInt32BE, n.readFloatLE = J.readFloatLE, n.readFloatBE = J.readFloatBE, n.readDoubleLE = J.readDoubleLE, n.readDoubleBE = J.readDoubleBE, n.writeUInt8 = J.writeUInt8, n.writeUInt16LE = J.writeUInt16LE, n.writeUInt16BE = J.writeUInt16BE, n.writeUInt32LE = J.writeUInt32LE, n.writeUInt32BE = J.writeUInt32BE, n.writeInt8 = J.writeInt8, n.writeInt16LE = J.writeInt16LE, n.writeInt16BE = J.writeInt16BE, n.writeInt32LE = J.writeInt32LE, n.writeInt32BE = J.writeInt32BE, n.writeFloatLE = J.writeFloatLE, n.writeFloatBE = J.writeFloatBE, n.writeDoubleLE = J.writeDoubleLE, n.writeDoubleBE = J.writeDoubleBE, n.fill = J.fill, n.inspect = J.inspect, n.toArrayBuffer = J.toArrayBuffer, n;
        };
      }).call(this, p("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, p("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/buffer/index.js", "/node_modules/gulp-browserify/node_modules/buffer");
    }, { "base64-js": 2, buffer: 3, ieee754: 10, lYpoI2: 11 }], 4: [function(p, m, E) {
      (function(C, U, T, A, L, H, K, Q, Y) {
        var T = p("buffer").Buffer, $ = 4, y = new T($);
        y.fill(0), m.exports = { hash: function(B, R, O, N) {
          for (var Z = R(function(l, k) {
            l.length % $ != 0 && (x = l.length + ($ - l.length % $), l = T.concat([l, y], x));
            for (var x, tr = [], er = k ? l.readInt32BE : l.readInt32LE, nr = 0; nr < l.length; nr += $)
              tr.push(er.call(l, nr));
            return tr;
          }(B = T.isBuffer(B) ? B : new T(B), N), 8 * B.length), R = N, d = new T(O), I = R ? d.writeInt32BE : d.writeInt32LE, s = 0; s < Z.length; s++)
            I.call(d, Z[s], 4 * s, !0);
          return d;
        } };
      }).call(this, p("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, p("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { buffer: 3, lYpoI2: 11 }], 5: [function(p, m, E) {
      (function(C, U, T, A, L, H, K, Q, Y) {
        var T = p("buffer").Buffer, $ = p("./sha"), y = p("./sha256"), B = p("./rng"), R = { sha1: $, sha256: y, md5: p("./md5") }, O = 64, N = new T(O);
        function Z(l, k) {
          var x = R[l = l || "sha1"], tr = [];
          return x || d("algorithm:", l, "is not yet supported"), { update: function(er) {
            return T.isBuffer(er) || (er = new T(er)), tr.push(er), er.length, this;
          }, digest: function(er) {
            var nr = T.concat(tr), nr = k ? function(J, br, xr) {
              T.isBuffer(br) || (br = new T(br)), T.isBuffer(xr) || (xr = new T(xr)), br.length > O ? br = J(br) : br.length < O && (br = T.concat([br, N], O));
              for (var wr = new T(O), mr = new T(O), Ur = 0; Ur < O; Ur++)
                wr[Ur] = 54 ^ br[Ur], mr[Ur] = 92 ^ br[Ur];
              return xr = J(T.concat([wr, xr])), J(T.concat([mr, xr]));
            }(x, k, nr) : x(nr);
            return tr = null, er ? nr.toString(er) : nr;
          } };
        }
        function d() {
          var l = [].slice.call(arguments).join(" ");
          throw new Error([l, "we accept pull requests", "http://github.com/dominictarr/crypto-browserify"].join(`
`));
        }
        N.fill(0), E.createHash = function(l) {
          return Z(l);
        }, E.createHmac = Z, E.randomBytes = function(l, k) {
          if (!k || !k.call)
            return new T(B(l));
          try {
            k.call(this, void 0, new T(B(l)));
          } catch (x) {
            k(x);
          }
        };
        var I, s = ["createCredentials", "createCipher", "createCipheriv", "createDecipher", "createDecipheriv", "createSign", "createVerify", "createDiffieHellman", "pbkdf2"], f = function(l) {
          E[l] = function() {
            d("sorry,", l, "is not implemented yet");
          };
        };
        for (I in s)
          f(s[I]);
      }).call(this, p("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, p("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./md5": 6, "./rng": 7, "./sha": 8, "./sha256": 9, buffer: 3, lYpoI2: 11 }], 6: [function(p, m, E) {
      (function(C, U, X, A, L, H, K, Q, Y) {
        var T = p("./helpers");
        function $(d, I) {
          d[I >> 5] |= 128 << I % 32, d[14 + (I + 64 >>> 9 << 4)] = I;
          for (var s = 1732584193, f = -271733879, l = -1732584194, k = 271733878, x = 0; x < d.length; x += 16) {
            var tr = s, er = f, nr = l, J = k, s = B(s, f, l, k, d[x + 0], 7, -680876936), k = B(k, s, f, l, d[x + 1], 12, -389564586), l = B(l, k, s, f, d[x + 2], 17, 606105819), f = B(f, l, k, s, d[x + 3], 22, -1044525330);
            s = B(s, f, l, k, d[x + 4], 7, -176418897), k = B(k, s, f, l, d[x + 5], 12, 1200080426), l = B(l, k, s, f, d[x + 6], 17, -1473231341), f = B(f, l, k, s, d[x + 7], 22, -45705983), s = B(s, f, l, k, d[x + 8], 7, 1770035416), k = B(k, s, f, l, d[x + 9], 12, -1958414417), l = B(l, k, s, f, d[x + 10], 17, -42063), f = B(f, l, k, s, d[x + 11], 22, -1990404162), s = B(s, f, l, k, d[x + 12], 7, 1804603682), k = B(k, s, f, l, d[x + 13], 12, -40341101), l = B(l, k, s, f, d[x + 14], 17, -1502002290), s = R(s, f = B(f, l, k, s, d[x + 15], 22, 1236535329), l, k, d[x + 1], 5, -165796510), k = R(k, s, f, l, d[x + 6], 9, -1069501632), l = R(l, k, s, f, d[x + 11], 14, 643717713), f = R(f, l, k, s, d[x + 0], 20, -373897302), s = R(s, f, l, k, d[x + 5], 5, -701558691), k = R(k, s, f, l, d[x + 10], 9, 38016083), l = R(l, k, s, f, d[x + 15], 14, -660478335), f = R(f, l, k, s, d[x + 4], 20, -405537848), s = R(s, f, l, k, d[x + 9], 5, 568446438), k = R(k, s, f, l, d[x + 14], 9, -1019803690), l = R(l, k, s, f, d[x + 3], 14, -187363961), f = R(f, l, k, s, d[x + 8], 20, 1163531501), s = R(s, f, l, k, d[x + 13], 5, -1444681467), k = R(k, s, f, l, d[x + 2], 9, -51403784), l = R(l, k, s, f, d[x + 7], 14, 1735328473), s = O(s, f = R(f, l, k, s, d[x + 12], 20, -1926607734), l, k, d[x + 5], 4, -378558), k = O(k, s, f, l, d[x + 8], 11, -2022574463), l = O(l, k, s, f, d[x + 11], 16, 1839030562), f = O(f, l, k, s, d[x + 14], 23, -35309556), s = O(s, f, l, k, d[x + 1], 4, -1530992060), k = O(k, s, f, l, d[x + 4], 11, 1272893353), l = O(l, k, s, f, d[x + 7], 16, -155497632), f = O(f, l, k, s, d[x + 10], 23, -1094730640), s = O(s, f, l, k, d[x + 13], 4, 681279174), k = O(k, s, f, l, d[x + 0], 11, -358537222), l = O(l, k, s, f, d[x + 3], 16, -722521979), f = O(f, l, k, s, d[x + 6], 23, 76029189), s = O(s, f, l, k, d[x + 9], 4, -640364487), k = O(k, s, f, l, d[x + 12], 11, -421815835), l = O(l, k, s, f, d[x + 15], 16, 530742520), s = N(s, f = O(f, l, k, s, d[x + 2], 23, -995338651), l, k, d[x + 0], 6, -198630844), k = N(k, s, f, l, d[x + 7], 10, 1126891415), l = N(l, k, s, f, d[x + 14], 15, -1416354905), f = N(f, l, k, s, d[x + 5], 21, -57434055), s = N(s, f, l, k, d[x + 12], 6, 1700485571), k = N(k, s, f, l, d[x + 3], 10, -1894986606), l = N(l, k, s, f, d[x + 10], 15, -1051523), f = N(f, l, k, s, d[x + 1], 21, -2054922799), s = N(s, f, l, k, d[x + 8], 6, 1873313359), k = N(k, s, f, l, d[x + 15], 10, -30611744), l = N(l, k, s, f, d[x + 6], 15, -1560198380), f = N(f, l, k, s, d[x + 13], 21, 1309151649), s = N(s, f, l, k, d[x + 4], 6, -145523070), k = N(k, s, f, l, d[x + 11], 10, -1120210379), l = N(l, k, s, f, d[x + 2], 15, 718787259), f = N(f, l, k, s, d[x + 9], 21, -343485551), s = Z(s, tr), f = Z(f, er), l = Z(l, nr), k = Z(k, J);
          }
          return Array(s, f, l, k);
        }
        function y(d, I, s, f, l, k) {
          return Z((I = Z(Z(I, d), Z(f, k))) << l | I >>> 32 - l, s);
        }
        function B(d, I, s, f, l, k, x) {
          return y(I & s | ~I & f, d, I, l, k, x);
        }
        function R(d, I, s, f, l, k, x) {
          return y(I & f | s & ~f, d, I, l, k, x);
        }
        function O(d, I, s, f, l, k, x) {
          return y(I ^ s ^ f, d, I, l, k, x);
        }
        function N(d, I, s, f, l, k, x) {
          return y(s ^ (I | ~f), d, I, l, k, x);
        }
        function Z(d, I) {
          var s = (65535 & d) + (65535 & I);
          return (d >> 16) + (I >> 16) + (s >> 16) << 16 | 65535 & s;
        }
        m.exports = function(d) {
          return T.hash(d, $, 16);
        };
      }).call(this, p("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, p("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 7: [function(p, m, E) {
      (function(C, U, X, A, L, H, K, Q, Y) {
        m.exports = function(T) {
          for (var $, y = new Array(T), B = 0; B < T; B++)
            (3 & B) == 0 && ($ = 4294967296 * Math.random()), y[B] = $ >>> ((3 & B) << 3) & 255;
          return y;
        };
      }).call(this, p("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, p("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { buffer: 3, lYpoI2: 11 }], 8: [function(p, m, E) {
      (function(C, U, X, A, L, H, K, Q, Y) {
        var T = p("./helpers");
        function $(R, O) {
          R[O >> 5] |= 128 << 24 - O % 32, R[15 + (O + 64 >> 9 << 4)] = O;
          for (var N, Z, d, I = Array(80), s = 1732584193, f = -271733879, l = -1732584194, k = 271733878, x = -1009589776, tr = 0; tr < R.length; tr += 16) {
            for (var er = s, nr = f, J = l, br = k, xr = x, wr = 0; wr < 80; wr++) {
              I[wr] = wr < 16 ? R[tr + wr] : B(I[wr - 3] ^ I[wr - 8] ^ I[wr - 14] ^ I[wr - 16], 1);
              var mr = y(y(B(s, 5), (mr = f, Z = l, d = k, (N = wr) < 20 ? mr & Z | ~mr & d : !(N < 40) && N < 60 ? mr & Z | mr & d | Z & d : mr ^ Z ^ d)), y(y(x, I[wr]), (N = wr) < 20 ? 1518500249 : N < 40 ? 1859775393 : N < 60 ? -1894007588 : -899497514)), x = k, k = l, l = B(f, 30), f = s, s = mr;
            }
            s = y(s, er), f = y(f, nr), l = y(l, J), k = y(k, br), x = y(x, xr);
          }
          return Array(s, f, l, k, x);
        }
        function y(R, O) {
          var N = (65535 & R) + (65535 & O);
          return (R >> 16) + (O >> 16) + (N >> 16) << 16 | 65535 & N;
        }
        function B(R, O) {
          return R << O | R >>> 32 - O;
        }
        m.exports = function(R) {
          return T.hash(R, $, 20, !0);
        };
      }).call(this, p("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, p("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 9: [function(p, m, E) {
      (function(C, U, X, A, L, H, K, Q, Y) {
        function T(O, N) {
          var Z = (65535 & O) + (65535 & N);
          return (O >> 16) + (N >> 16) + (Z >> 16) << 16 | 65535 & Z;
        }
        function $(O, N) {
          var Z, d = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298), I = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225), s = new Array(64);
          O[N >> 5] |= 128 << 24 - N % 32, O[15 + (N + 64 >> 9 << 4)] = N;
          for (var f, l, k = 0; k < O.length; k += 16) {
            for (var x = I[0], tr = I[1], er = I[2], nr = I[3], J = I[4], br = I[5], xr = I[6], wr = I[7], mr = 0; mr < 64; mr++)
              s[mr] = mr < 16 ? O[mr + k] : T(T(T((l = s[mr - 2], B(l, 17) ^ B(l, 19) ^ R(l, 10)), s[mr - 7]), (l = s[mr - 15], B(l, 7) ^ B(l, 18) ^ R(l, 3))), s[mr - 16]), Z = T(T(T(T(wr, B(l = J, 6) ^ B(l, 11) ^ B(l, 25)), J & br ^ ~J & xr), d[mr]), s[mr]), f = T(B(f = x, 2) ^ B(f, 13) ^ B(f, 22), x & tr ^ x & er ^ tr & er), wr = xr, xr = br, br = J, J = T(nr, Z), nr = er, er = tr, tr = x, x = T(Z, f);
            I[0] = T(x, I[0]), I[1] = T(tr, I[1]), I[2] = T(er, I[2]), I[3] = T(nr, I[3]), I[4] = T(J, I[4]), I[5] = T(br, I[5]), I[6] = T(xr, I[6]), I[7] = T(wr, I[7]);
          }
          return I;
        }
        var y = p("./helpers"), B = function(O, N) {
          return O >>> N | O << 32 - N;
        }, R = function(O, N) {
          return O >>> N;
        };
        m.exports = function(O) {
          return y.hash(O, $, 32, !0);
        };
      }).call(this, p("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, p("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 10: [function(p, m, E) {
      (function(C, U, X, A, L, H, K, Q, Y) {
        E.read = function(T, $, y, B, k) {
          var O, N, Z = 8 * k - B - 1, d = (1 << Z) - 1, I = d >> 1, s = -7, f = y ? k - 1 : 0, l = y ? -1 : 1, k = T[$ + f];
          for (f += l, O = k & (1 << -s) - 1, k >>= -s, s += Z; 0 < s; O = 256 * O + T[$ + f], f += l, s -= 8)
            ;
          for (N = O & (1 << -s) - 1, O >>= -s, s += B; 0 < s; N = 256 * N + T[$ + f], f += l, s -= 8)
            ;
          if (O === 0)
            O = 1 - I;
          else {
            if (O === d)
              return N ? NaN : 1 / 0 * (k ? -1 : 1);
            N += Math.pow(2, B), O -= I;
          }
          return (k ? -1 : 1) * N * Math.pow(2, O - B);
        }, E.write = function(T, $, y, B, R, x) {
          var N, Z, d = 8 * x - R - 1, I = (1 << d) - 1, s = I >> 1, f = R === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = B ? 0 : x - 1, k = B ? 1 : -1, x = $ < 0 || $ === 0 && 1 / $ < 0 ? 1 : 0;
          for ($ = Math.abs($), isNaN($) || $ === 1 / 0 ? (Z = isNaN($) ? 1 : 0, N = I) : (N = Math.floor(Math.log($) / Math.LN2), $ * (B = Math.pow(2, -N)) < 1 && (N--, B *= 2), 2 <= ($ += 1 <= N + s ? f / B : f * Math.pow(2, 1 - s)) * B && (N++, B /= 2), I <= N + s ? (Z = 0, N = I) : 1 <= N + s ? (Z = ($ * B - 1) * Math.pow(2, R), N += s) : (Z = $ * Math.pow(2, s - 1) * Math.pow(2, R), N = 0)); 8 <= R; T[y + l] = 255 & Z, l += k, Z /= 256, R -= 8)
            ;
          for (N = N << R | Z, d += R; 0 < d; T[y + l] = 255 & N, l += k, N /= 256, d -= 8)
            ;
          T[y + l - k] |= 128 * x;
        };
      }).call(this, p("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, p("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/ieee754/index.js", "/node_modules/gulp-browserify/node_modules/ieee754");
    }, { buffer: 3, lYpoI2: 11 }], 11: [function(p, m, E) {
      (function(C, U, X, A, L, H, K, Q, Y) {
        var T, $, y;
        function B() {
        }
        (C = m.exports = {}).nextTick = ($ = typeof window < "u" && window.setImmediate, y = typeof window < "u" && window.postMessage && window.addEventListener, $ ? function(R) {
          return window.setImmediate(R);
        } : y ? (T = [], window.addEventListener("message", function(R) {
          var O = R.source;
          O !== window && O !== null || R.data !== "process-tick" || (R.stopPropagation(), 0 < T.length && T.shift()());
        }, !0), function(R) {
          T.push(R), window.postMessage("process-tick", "*");
        }) : function(R) {
          setTimeout(R, 0);
        }), C.title = "browser", C.browser = !0, C.env = {}, C.argv = [], C.on = B, C.addListener = B, C.once = B, C.off = B, C.removeListener = B, C.removeAllListeners = B, C.emit = B, C.binding = function(R) {
          throw new Error("process.binding is not supported");
        }, C.cwd = function() {
          return "/";
        }, C.chdir = function(R) {
          throw new Error("process.chdir is not supported");
        };
      }).call(this, p("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, p("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/process/browser.js", "/node_modules/gulp-browserify/node_modules/process");
    }, { buffer: 3, lYpoI2: 11 }] }, {}, [1])(1);
  });
})(ra);
const Gn = ra.exports, Ce = {
  secondToTime: (a) => {
    const v = (C) => C < 10 ? "0" + C : "" + C, p = Math.floor(a / 3600), m = Math.floor((a - p * 3600) / 60), E = Math.floor(a - p * 3600 - m * 60);
    return (p > 0 ? [p, m, E] : [m, E]).map(v).join(":");
  },
  isMobile: /mobile/i.test(window.navigator.userAgent),
  shuffleArray(a) {
    const v = JSON.parse(JSON.stringify(a));
    for (let p = v.length - 1; p >= 0; p--) {
      const m = Math.floor(Math.random() * (p + 1)), E = v[m];
      v[m] = v[p], v[p] = E;
    }
    return v;
  },
  parseLrc(a) {
    if (a) {
      a = a.replace(/([^\]^\n])\[/g, (E, C) => C + `
[`);
      const v = a.split(`
`);
      let p = [];
      const m = v.length;
      for (let E = 0; E < m; E++) {
        const C = v[E].match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g), U = v[E].replace(/.*\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g, "").replace(/<(\d{2}):(\d{2})(\.(\d{2,3}))?>/g, "").replace(/^\s+|\s+$/g, "");
        if (C) {
          const X = C.length;
          for (let A = 0; A < X; A++) {
            const L = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(C[A]), H = L[1] * 60, K = parseInt(L[2]), Q = L[4] ? parseInt(L[4]) / ((L[4] + "").length === 2 ? 100 : 1e3) : 0, Y = H + K + Q;
            p.push([Y, U]);
          }
        }
      }
      return p = p.filter((E) => E[1]), p.sort((E, C) => E[0] - C[0]), p;
    } else
      return [];
  }
};
/*! js-cookie v3.0.1 | MIT */
function Ue(a) {
  for (var v = 1; v < arguments.length; v++) {
    var p = arguments[v];
    for (var m in p)
      a[m] = p[m];
  }
  return a;
}
var sl = {
  read: function(a) {
    return a[0] === '"' && (a = a.slice(1, -1)), a.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(a) {
    return encodeURIComponent(a).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function kt(a, v) {
  function p(E, C, U) {
    if (!(typeof document > "u")) {
      U = Ue({}, v, U), typeof U.expires == "number" && (U.expires = new Date(Date.now() + U.expires * 864e5)), U.expires && (U.expires = U.expires.toUTCString()), E = encodeURIComponent(E).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var X = "";
      for (var A in U)
        !U[A] || (X += "; " + A, U[A] !== !0 && (X += "=" + U[A].split(";")[0]));
      return document.cookie = E + "=" + a.write(C, E) + X;
    }
  }
  function m(E) {
    if (!(typeof document > "u" || arguments.length && !E)) {
      for (var C = document.cookie ? document.cookie.split("; ") : [], U = {}, X = 0; X < C.length; X++) {
        var A = C[X].split("="), L = A.slice(1).join("=");
        try {
          var H = decodeURIComponent(A[0]);
          if (U[H] = a.read(L, H), E === H)
            break;
        } catch {
        }
      }
      return E ? U[E] : U;
    }
  }
  return Object.create(
    {
      set: p,
      get: m,
      remove: function(E, C) {
        p(
          E,
          "",
          Ue({}, C, {
            expires: -1
          })
        );
      },
      withAttributes: function(E) {
        return kt(this.converter, Ue({}, this.attributes, E));
      },
      withConverter: function(E) {
        return kt(Ue({}, this.converter, E), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(v) },
      converter: { value: Object.freeze(a) }
    }
  );
}
var pt = kt(sl, { path: "/" });
const bt = (a) => `AlicePlayer__${a}`, ke = {
  set: (a, v) => {
    pt.set(bt(a), v, { expires: 7 });
  },
  get: (a) => pt.get(bt(a)),
  remove: (a) => {
    pt.remove(bt(a));
  }
};
if (!Gr)
  var Gr = { map: function(a, v) {
    var p = {};
    return v ? a.map(function(m, E) {
      return p.index = E, v.call(p, m);
    }) : a.slice();
  }, naturalOrder: function(a, v) {
    return a < v ? -1 : a > v ? 1 : 0;
  }, sum: function(a, v) {
    var p = {};
    return a.reduce(v ? function(m, E, C) {
      return p.index = C, m + v.call(p, E);
    } : function(m, E) {
      return m + E;
    }, 0);
  }, max: function(a, v) {
    return Math.max.apply(null, v ? Gr.map(a, v) : a);
  } };
var ll = function() {
  var a = 5, v = 8 - a, p = 1e3;
  function m(A, L, H) {
    return (A << 2 * a) + (L << a) + H;
  }
  function E(A) {
    var L = [], H = !1;
    function K() {
      L.sort(A), H = !0;
    }
    return { push: function(Q) {
      L.push(Q), H = !1;
    }, peek: function(Q) {
      return H || K(), Q === void 0 && (Q = L.length - 1), L[Q];
    }, pop: function() {
      return H || K(), L.pop();
    }, size: function() {
      return L.length;
    }, map: function(Q) {
      return L.map(Q);
    }, debug: function() {
      return H || K(), L;
    } };
  }
  function C(A, L, H, K, Q, Y, T) {
    this.r1 = A, this.r2 = L, this.g1 = H, this.g2 = K, this.b1 = Q, this.b2 = Y, this.histo = T;
  }
  function U() {
    this.vboxes = new E(function(A, L) {
      return Gr.naturalOrder(A.vbox.count() * A.vbox.volume(), L.vbox.count() * L.vbox.volume());
    });
  }
  function X(A, L) {
    if (L.count()) {
      var H = L.r2 - L.r1 + 1, K = L.g2 - L.g1 + 1, Q = Gr.max([H, K, L.b2 - L.b1 + 1]);
      if (L.count() == 1)
        return [L.copy()];
      var Y, T, $, y, B = 0, R = [], O = [];
      if (Q == H)
        for (Y = L.r1; Y <= L.r2; Y++) {
          for (y = 0, T = L.g1; T <= L.g2; T++)
            for ($ = L.b1; $ <= L.b2; $++)
              y += A[m(Y, T, $)] || 0;
          R[Y] = B += y;
        }
      else if (Q == K)
        for (Y = L.g1; Y <= L.g2; Y++) {
          for (y = 0, T = L.r1; T <= L.r2; T++)
            for ($ = L.b1; $ <= L.b2; $++)
              y += A[m(T, Y, $)] || 0;
          R[Y] = B += y;
        }
      else
        for (Y = L.b1; Y <= L.b2; Y++) {
          for (y = 0, T = L.r1; T <= L.r2; T++)
            for ($ = L.g1; $ <= L.g2; $++)
              y += A[m(T, $, Y)] || 0;
          R[Y] = B += y;
        }
      return R.forEach(function(N, Z) {
        O[Z] = B - N;
      }), function(N) {
        var Z, d, I, s, f, l = N + "1", k = N + "2", x = 0;
        for (Y = L[l]; Y <= L[k]; Y++)
          if (R[Y] > B / 2) {
            for (I = L.copy(), s = L.copy(), f = (Z = Y - L[l]) <= (d = L[k] - Y) ? Math.min(L[k] - 1, ~~(Y + d / 2)) : Math.max(L[l], ~~(Y - 1 - Z / 2)); !R[f]; )
              f++;
            for (x = O[f]; !x && R[f - 1]; )
              x = O[--f];
            return I[k] = f, s[l] = I[k] + 1, [I, s];
          }
      }(Q == H ? "r" : Q == K ? "g" : "b");
    }
  }
  return C.prototype = { volume: function(A) {
    return this._volume && !A || (this._volume = (this.r2 - this.r1 + 1) * (this.g2 - this.g1 + 1) * (this.b2 - this.b1 + 1)), this._volume;
  }, count: function(A) {
    var L = this.histo;
    if (!this._count_set || A) {
      var H, K, Q, Y = 0;
      for (H = this.r1; H <= this.r2; H++)
        for (K = this.g1; K <= this.g2; K++)
          for (Q = this.b1; Q <= this.b2; Q++)
            Y += L[m(H, K, Q)] || 0;
      this._count = Y, this._count_set = !0;
    }
    return this._count;
  }, copy: function() {
    return new C(this.r1, this.r2, this.g1, this.g2, this.b1, this.b2, this.histo);
  }, avg: function(A) {
    var L = this.histo;
    if (!this._avg || A) {
      var H, K, Q, Y, T = 0, $ = 1 << 8 - a, y = 0, B = 0, R = 0;
      for (K = this.r1; K <= this.r2; K++)
        for (Q = this.g1; Q <= this.g2; Q++)
          for (Y = this.b1; Y <= this.b2; Y++)
            T += H = L[m(K, Q, Y)] || 0, y += H * (K + 0.5) * $, B += H * (Q + 0.5) * $, R += H * (Y + 0.5) * $;
      this._avg = T ? [~~(y / T), ~~(B / T), ~~(R / T)] : [~~($ * (this.r1 + this.r2 + 1) / 2), ~~($ * (this.g1 + this.g2 + 1) / 2), ~~($ * (this.b1 + this.b2 + 1) / 2)];
    }
    return this._avg;
  }, contains: function(A) {
    var L = A[0] >> v;
    return gval = A[1] >> v, bval = A[2] >> v, L >= this.r1 && L <= this.r2 && gval >= this.g1 && gval <= this.g2 && bval >= this.b1 && bval <= this.b2;
  } }, U.prototype = { push: function(A) {
    this.vboxes.push({ vbox: A, color: A.avg() });
  }, palette: function() {
    return this.vboxes.map(function(A) {
      return A.color;
    });
  }, size: function() {
    return this.vboxes.size();
  }, map: function(A) {
    for (var L = this.vboxes, H = 0; H < L.size(); H++)
      if (L.peek(H).vbox.contains(A))
        return L.peek(H).color;
    return this.nearest(A);
  }, nearest: function(A) {
    for (var L, H, K, Q = this.vboxes, Y = 0; Y < Q.size(); Y++)
      ((H = Math.sqrt(Math.pow(A[0] - Q.peek(Y).color[0], 2) + Math.pow(A[1] - Q.peek(Y).color[1], 2) + Math.pow(A[2] - Q.peek(Y).color[2], 2))) < L || L === void 0) && (L = H, K = Q.peek(Y).color);
    return K;
  }, forcebw: function() {
    var A = this.vboxes;
    A.sort(function(Q, Y) {
      return Gr.naturalOrder(Gr.sum(Q.color), Gr.sum(Y.color));
    });
    var L = A[0].color;
    L[0] < 5 && L[1] < 5 && L[2] < 5 && (A[0].color = [0, 0, 0]);
    var H = A.length - 1, K = A[H].color;
    K[0] > 251 && K[1] > 251 && K[2] > 251 && (A[H].color = [255, 255, 255]);
  } }, { quantize: function(A, L) {
    if (!A.length || L < 2 || L > 256)
      return !1;
    var H = function(y) {
      var B, R = new Array(1 << 3 * a);
      return y.forEach(function(O) {
        B = m(O[0] >> v, O[1] >> v, O[2] >> v), R[B] = (R[B] || 0) + 1;
      }), R;
    }(A);
    H.forEach(function() {
    });
    var K = function(y, B) {
      var R, O, N, Z = 1e6, d = 0, I = 1e6, s = 0, f = 1e6, l = 0;
      return y.forEach(function(k) {
        (R = k[0] >> v) < Z ? Z = R : R > d && (d = R), (O = k[1] >> v) < I ? I = O : O > s && (s = O), (N = k[2] >> v) < f ? f = N : N > l && (l = N);
      }), new C(Z, d, I, s, f, l, B);
    }(A, H), Q = new E(function(y, B) {
      return Gr.naturalOrder(y.count(), B.count());
    });
    function Y(y, B) {
      for (var R, O = y.size(), N = 0; N < p; ) {
        if (O >= B || N++ > p)
          return;
        if ((R = y.pop()).count()) {
          var Z = X(H, R), d = Z[0], I = Z[1];
          if (!d)
            return;
          y.push(d), I && (y.push(I), O++);
        } else
          y.push(R), N++;
      }
    }
    Q.push(K), Y(Q, 0.75 * L);
    for (var T = new E(function(y, B) {
      return Gr.naturalOrder(y.count() * y.volume(), B.count() * B.volume());
    }); Q.size(); )
      T.push(Q.pop());
    Y(T, L);
    for (var $ = new U(); T.size(); )
      $.push(T.pop());
    return $;
  } };
}().quantize, ea = function(a) {
  this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.width = this.canvas.width = a.naturalWidth, this.height = this.canvas.height = a.naturalHeight, this.context.drawImage(a, 0, 0, this.width, this.height);
};
ea.prototype.getImageData = function() {
  return this.context.getImageData(0, 0, this.width, this.height);
};
var ge = function() {
};
ge.prototype.getColor = function(a, v) {
  return v === void 0 && (v = 10), this.getPalette(a, 5, v)[0];
}, ge.prototype.getPalette = function(a, v, p) {
  var m = function(X) {
    var A = X.colorCount, L = X.quality;
    if (A !== void 0 && Number.isInteger(A)) {
      if (A === 1)
        throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");
      A = Math.max(A, 2), A = Math.min(A, 20);
    } else
      A = 10;
    return (L === void 0 || !Number.isInteger(L) || L < 1) && (L = 10), { colorCount: A, quality: L };
  }({ colorCount: v, quality: p }), E = new ea(a), C = function(X, A, L) {
    for (var H = X, K = [], Q = 0, Y = void 0, T = void 0, $ = void 0, y = void 0, B = void 0; Q < A; Q += L)
      T = H[0 + (Y = 4 * Q)], $ = H[Y + 1], y = H[Y + 2], ((B = H[Y + 3]) === void 0 || B >= 125) && (T > 250 && $ > 250 && y > 250 || K.push([T, $, y]));
    return K;
  }(E.getImageData().data, E.width * E.height, m.quality), U = ll(C, m.colorCount);
  return U ? U.palette() : null;
}, ge.prototype.getColorFromUrl = function(a, v, p) {
  var m = this, E = document.createElement("img");
  E.addEventListener("load", function() {
    var C = m.getPalette(E, 5, p);
    v(C[0], a);
  }), E.src = a;
}, ge.prototype.getImageData = function(a, v) {
  var p = new XMLHttpRequest();
  p.open("GET", a, !0), p.responseType = "arraybuffer", p.onload = function() {
    if (this.status == 200) {
      var m = new Uint8Array(this.response);
      i = m.length;
      for (var E = new Array(i), C = 0; C < m.length; C++)
        E[C] = String.fromCharCode(m[C]);
      var U = E.join(""), X = window.btoa(U);
      v("data:image/png;base64," + X);
    }
  }, p.send();
}, ge.prototype.getColorAsync = function(a, v, p) {
  var m = this;
  this.getImageData(a, function(E) {
    var C = document.createElement("img");
    C.addEventListener("load", function() {
      var U = m.getPalette(C, 5, p);
      v(U[0], this);
    }), C.src = E;
  });
};
var ta = { exports: {} };
/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */
(function(a, v) {
  (function(p, m) {
    a.exports = m();
  })(il, function() {
    for (var p = function(r, e, t) {
      return e === void 0 && (e = 0), t === void 0 && (t = 1), r < e ? e : r > t ? t : r;
    }, m = p, E = function(r) {
      r._clipped = !1, r._unclipped = r.slice(0);
      for (var e = 0; e <= 3; e++)
        e < 3 ? ((r[e] < 0 || r[e] > 255) && (r._clipped = !0), r[e] = m(r[e], 0, 255)) : e === 3 && (r[e] = m(r[e], 0, 1));
      return r;
    }, C = {}, U = 0, X = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Undefined", "Null"]; U < X.length; U += 1) {
      var A = X[U];
      C["[object " + A + "]"] = A.toLowerCase();
    }
    var L = function(r) {
      return C[Object.prototype.toString.call(r)] || "object";
    }, H = L, K = function(r, e) {
      return e === void 0 && (e = null), r.length >= 3 ? Array.prototype.slice.call(r) : H(r[0]) == "object" && e ? e.split("").filter(function(t) {
        return r[0][t] !== void 0;
      }).map(function(t) {
        return r[0][t];
      }) : r[0];
    }, Q = L, Y = function(r) {
      if (r.length < 2)
        return null;
      var e = r.length - 1;
      return Q(r[e]) == "string" ? r[e].toLowerCase() : null;
    }, T = Math.PI, $ = {
      clip_rgb: E,
      limit: p,
      type: L,
      unpack: K,
      last: Y,
      PI: T,
      TWOPI: T * 2,
      PITHIRD: T / 3,
      DEG2RAD: T / 180,
      RAD2DEG: 180 / T
    }, y = {
      format: {},
      autodetect: []
    }, B = $.last, R = $.clip_rgb, O = $.type, N = y, Z = function() {
      for (var e = [], t = arguments.length; t--; )
        e[t] = arguments[t];
      var o = this;
      if (O(e[0]) === "object" && e[0].constructor && e[0].constructor === this.constructor)
        return e[0];
      var h = B(e), g = !1;
      if (!h) {
        g = !0, N.sorted || (N.autodetect = N.autodetect.sort(function(P, q) {
          return q.p - P.p;
        }), N.sorted = !0);
        for (var c = 0, w = N.autodetect; c < w.length; c += 1) {
          var _ = w[c];
          if (h = _.test.apply(_, e), h)
            break;
        }
      }
      if (N.format[h]) {
        var M = N.format[h].apply(null, g ? e : e.slice(0, -1));
        o._rgb = R(M);
      } else
        throw new Error("unknown format: " + e);
      o._rgb.length === 3 && o._rgb.push(1);
    };
    Z.prototype.toString = function() {
      return O(this.hex) == "function" ? this.hex() : "[" + this._rgb.join(",") + "]";
    };
    var d = Z, I = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(I.Color, [null].concat(r)))();
    };
    I.Color = d, I.version = "2.4.2";
    var s = I, f = $.unpack, l = Math.max, k = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = f(r, "rgb"), o = t[0], h = t[1], g = t[2];
      o = o / 255, h = h / 255, g = g / 255;
      var c = 1 - l(o, l(h, g)), w = c < 1 ? 1 / (1 - c) : 0, _ = (1 - o - c) * w, M = (1 - h - c) * w, P = (1 - g - c) * w;
      return [_, M, P, c];
    }, x = k, tr = $.unpack, er = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      r = tr(r, "cmyk");
      var t = r[0], o = r[1], h = r[2], g = r[3], c = r.length > 4 ? r[4] : 1;
      return g === 1 ? [0, 0, 0, c] : [
        t >= 1 ? 0 : 255 * (1 - t) * (1 - g),
        o >= 1 ? 0 : 255 * (1 - o) * (1 - g),
        h >= 1 ? 0 : 255 * (1 - h) * (1 - g),
        c
      ];
    }, nr = er, J = s, br = d, xr = y, wr = $.unpack, mr = $.type, Ur = x;
    br.prototype.cmyk = function() {
      return Ur(this._rgb);
    }, J.cmyk = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(br, [null].concat(r, ["cmyk"])))();
    }, xr.format.cmyk = nr, xr.autodetect.push({
      p: 2,
      test: function() {
        for (var r = [], e = arguments.length; e--; )
          r[e] = arguments[e];
        if (r = wr(r, "cmyk"), mr(r) === "array" && r.length === 4)
          return "cmyk";
      }
    });
    var xe = $.unpack, ne = $.last, ae = function(r) {
      return Math.round(r * 100) / 100;
    }, pe = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = xe(r, "hsla"), o = ne(r) || "lsa";
      return t[0] = ae(t[0] || 0), t[1] = ae(t[1] * 100) + "%", t[2] = ae(t[2] * 100) + "%", o === "hsla" || t.length > 3 && t[3] < 1 ? (t[3] = t.length > 3 ? t[3] : 1, o = "hsla") : t.length = 3, o + "(" + t.join(",") + ")";
    }, be = pe, Ie = $.unpack, V = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      r = Ie(r, "rgba");
      var t = r[0], o = r[1], h = r[2];
      t /= 255, o /= 255, h /= 255;
      var g = Math.min(t, o, h), c = Math.max(t, o, h), w = (c + g) / 2, _, M;
      return c === g ? (_ = 0, M = Number.NaN) : _ = w < 0.5 ? (c - g) / (c + g) : (c - g) / (2 - c - g), t == c ? M = (o - h) / (c - g) : o == c ? M = 2 + (h - t) / (c - g) : h == c && (M = 4 + (t - o) / (c - g)), M *= 60, M < 0 && (M += 360), r.length > 3 && r[3] !== void 0 ? [M, _, w, r[3]] : [M, _, w];
    }, n = V, u = $.unpack, b = $.last, D = be, z = n, j = Math.round, lr = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = u(r, "rgba"), o = b(r) || "rgb";
      return o.substr(0, 3) == "hsl" ? D(z(t), o) : (t[0] = j(t[0]), t[1] = j(t[1]), t[2] = j(t[2]), (o === "rgba" || t.length > 3 && t[3] < 1) && (t[3] = t.length > 3 ? t[3] : 1, o = "rgba"), o + "(" + t.slice(0, o === "rgb" ? 3 : 4).join(",") + ")");
    }, _r = lr, $r = $.unpack, Nr = Math.round, Br = function() {
      for (var r, e = [], t = arguments.length; t--; )
        e[t] = arguments[t];
      e = $r(e, "hsl");
      var o = e[0], h = e[1], g = e[2], c, w, _;
      if (h === 0)
        c = w = _ = g * 255;
      else {
        var M = [0, 0, 0], P = [0, 0, 0], q = g < 0.5 ? g * (1 + h) : g + h - g * h, S = 2 * g - q, W = o / 360;
        M[0] = W + 1 / 3, M[1] = W, M[2] = W - 1 / 3;
        for (var G = 0; G < 3; G++)
          M[G] < 0 && (M[G] += 1), M[G] > 1 && (M[G] -= 1), 6 * M[G] < 1 ? P[G] = S + (q - S) * 6 * M[G] : 2 * M[G] < 1 ? P[G] = q : 3 * M[G] < 2 ? P[G] = S + (q - S) * (2 / 3 - M[G]) * 6 : P[G] = S;
        r = [Nr(P[0] * 255), Nr(P[1] * 255), Nr(P[2] * 255)], c = r[0], w = r[1], _ = r[2];
      }
      return e.length > 3 ? [c, w, _, e[3]] : [c, w, _, 1];
    }, Mr = Br, Cr = Mr, kr = y, Vr = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/, me = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/, Ct = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/, $t = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/, Et = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/, xt = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/, It = Math.round, Lt = function(r) {
      r = r.toLowerCase().trim();
      var e;
      if (kr.format.named)
        try {
          return kr.format.named(r);
        } catch {
        }
      if (e = r.match(Vr)) {
        for (var t = e.slice(1, 4), o = 0; o < 3; o++)
          t[o] = +t[o];
        return t[3] = 1, t;
      }
      if (e = r.match(me)) {
        for (var h = e.slice(1, 5), g = 0; g < 4; g++)
          h[g] = +h[g];
        return h;
      }
      if (e = r.match(Ct)) {
        for (var c = e.slice(1, 4), w = 0; w < 3; w++)
          c[w] = It(c[w] * 2.55);
        return c[3] = 1, c;
      }
      if (e = r.match($t)) {
        for (var _ = e.slice(1, 5), M = 0; M < 3; M++)
          _[M] = It(_[M] * 2.55);
        return _[3] = +_[3], _;
      }
      if (e = r.match(Et)) {
        var P = e.slice(1, 4);
        P[1] *= 0.01, P[2] *= 0.01;
        var q = Cr(P);
        return q[3] = 1, q;
      }
      if (e = r.match(xt)) {
        var S = e.slice(1, 4);
        S[1] *= 0.01, S[2] *= 0.01;
        var W = Cr(S);
        return W[3] = +e[4], W;
      }
    };
    Lt.test = function(r) {
      return Vr.test(r) || me.test(r) || Ct.test(r) || $t.test(r) || Et.test(r) || xt.test(r);
    };
    var na = Lt, aa = s, Mt = d, At = y, oa = $.type, ia = _r, Tt = na;
    Mt.prototype.css = function(r) {
      return ia(this._rgb, r);
    }, aa.css = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(Mt, [null].concat(r, ["css"])))();
    }, At.format.css = Tt, At.autodetect.push({
      p: 5,
      test: function(r) {
        for (var e = [], t = arguments.length - 1; t-- > 0; )
          e[t] = arguments[t + 1];
        if (!e.length && oa(r) === "string" && Tt.test(r))
          return "css";
      }
    });
    var Bt = d, sa = s, la = y, ua = $.unpack;
    la.format.gl = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = ua(r, "rgba");
      return t[0] *= 255, t[1] *= 255, t[2] *= 255, t;
    }, sa.gl = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(Bt, [null].concat(r, ["gl"])))();
    }, Bt.prototype.gl = function() {
      var r = this._rgb;
      return [r[0] / 255, r[1] / 255, r[2] / 255, r[3]];
    };
    var ca = $.unpack, fa = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = ca(r, "rgb"), o = t[0], h = t[1], g = t[2], c = Math.min(o, h, g), w = Math.max(o, h, g), _ = w - c, M = _ * 100 / 255, P = c / (255 - _) * 100, q;
      return _ === 0 ? q = Number.NaN : (o === w && (q = (h - g) / _), h === w && (q = 2 + (g - o) / _), g === w && (q = 4 + (o - h) / _), q *= 60, q < 0 && (q += 360)), [q, M, P];
    }, ha = fa, da = $.unpack, va = Math.floor, ga = function() {
      for (var r, e, t, o, h, g, c = [], w = arguments.length; w--; )
        c[w] = arguments[w];
      c = da(c, "hcg");
      var _ = c[0], M = c[1], P = c[2], q, S, W;
      P = P * 255;
      var G = M * 255;
      if (M === 0)
        q = S = W = P;
      else {
        _ === 360 && (_ = 0), _ > 360 && (_ -= 360), _ < 0 && (_ += 360), _ /= 60;
        var or = va(_), ur = _ - or, fr = P * (1 - M), dr = fr + G * (1 - ur), Ar = fr + G * ur, Lr = fr + G;
        switch (or) {
          case 0:
            r = [Lr, Ar, fr], q = r[0], S = r[1], W = r[2];
            break;
          case 1:
            e = [dr, Lr, fr], q = e[0], S = e[1], W = e[2];
            break;
          case 2:
            t = [fr, Lr, Ar], q = t[0], S = t[1], W = t[2];
            break;
          case 3:
            o = [fr, dr, Lr], q = o[0], S = o[1], W = o[2];
            break;
          case 4:
            h = [Ar, fr, Lr], q = h[0], S = h[1], W = h[2];
            break;
          case 5:
            g = [Lr, fr, dr], q = g[0], S = g[1], W = g[2];
            break;
        }
      }
      return [q, S, W, c.length > 3 ? c[3] : 1];
    }, pa = ga, ba = $.unpack, ma = $.type, ya = s, Nt = d, Pt = y, wa = ha;
    Nt.prototype.hcg = function() {
      return wa(this._rgb);
    }, ya.hcg = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(Nt, [null].concat(r, ["hcg"])))();
    }, Pt.format.hcg = pa, Pt.autodetect.push({
      p: 1,
      test: function() {
        for (var r = [], e = arguments.length; e--; )
          r[e] = arguments[e];
        if (r = ba(r, "hcg"), ma(r) === "array" && r.length === 3)
          return "hcg";
      }
    });
    var _a = $.unpack, ka = $.last, Le = Math.round, Ca = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = _a(r, "rgba"), o = t[0], h = t[1], g = t[2], c = t[3], w = ka(r) || "auto";
      c === void 0 && (c = 1), w === "auto" && (w = c < 1 ? "rgba" : "rgb"), o = Le(o), h = Le(h), g = Le(g);
      var _ = o << 16 | h << 8 | g, M = "000000" + _.toString(16);
      M = M.substr(M.length - 6);
      var P = "0" + Le(c * 255).toString(16);
      switch (P = P.substr(P.length - 2), w.toLowerCase()) {
        case "rgba":
          return "#" + M + P;
        case "argb":
          return "#" + P + M;
        default:
          return "#" + M;
      }
    }, St = Ca, $a = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, Ea = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/, xa = function(r) {
      if (r.match($a)) {
        (r.length === 4 || r.length === 7) && (r = r.substr(1)), r.length === 3 && (r = r.split(""), r = r[0] + r[0] + r[1] + r[1] + r[2] + r[2]);
        var e = parseInt(r, 16), t = e >> 16, o = e >> 8 & 255, h = e & 255;
        return [t, o, h, 1];
      }
      if (r.match(Ea)) {
        (r.length === 5 || r.length === 9) && (r = r.substr(1)), r.length === 4 && (r = r.split(""), r = r[0] + r[0] + r[1] + r[1] + r[2] + r[2] + r[3] + r[3]);
        var g = parseInt(r, 16), c = g >> 24 & 255, w = g >> 16 & 255, _ = g >> 8 & 255, M = Math.round((g & 255) / 255 * 100) / 100;
        return [c, w, _, M];
      }
      throw new Error("unknown hex color: " + r);
    }, Rt = xa, Ia = s, zt = d, La = $.type, Ft = y, Ma = St;
    zt.prototype.hex = function(r) {
      return Ma(this._rgb, r);
    }, Ia.hex = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(zt, [null].concat(r, ["hex"])))();
    }, Ft.format.hex = Rt, Ft.autodetect.push({
      p: 4,
      test: function(r) {
        for (var e = [], t = arguments.length - 1; t-- > 0; )
          e[t] = arguments[t + 1];
        if (!e.length && La(r) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(r.length) >= 0)
          return "hex";
      }
    });
    var Aa = $.unpack, Ut = $.TWOPI, Ta = Math.min, Ba = Math.sqrt, Na = Math.acos, Pa = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = Aa(r, "rgb"), o = t[0], h = t[1], g = t[2];
      o /= 255, h /= 255, g /= 255;
      var c, w = Ta(o, h, g), _ = (o + h + g) / 3, M = _ > 0 ? 1 - w / _ : 0;
      return M === 0 ? c = NaN : (c = (o - h + (o - g)) / 2, c /= Ba((o - h) * (o - h) + (o - g) * (h - g)), c = Na(c), g > h && (c = Ut - c), c /= Ut), [c * 360, M, _];
    }, Sa = Pa, Ra = $.unpack, He = $.limit, oe = $.TWOPI, Ve = $.PITHIRD, ie = Math.cos, za = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      r = Ra(r, "hsi");
      var t = r[0], o = r[1], h = r[2], g, c, w;
      return isNaN(t) && (t = 0), isNaN(o) && (o = 0), t > 360 && (t -= 360), t < 0 && (t += 360), t /= 360, t < 1 / 3 ? (w = (1 - o) / 3, g = (1 + o * ie(oe * t) / ie(Ve - oe * t)) / 3, c = 1 - (w + g)) : t < 2 / 3 ? (t -= 1 / 3, g = (1 - o) / 3, c = (1 + o * ie(oe * t) / ie(Ve - oe * t)) / 3, w = 1 - (g + c)) : (t -= 2 / 3, c = (1 - o) / 3, w = (1 + o * ie(oe * t) / ie(Ve - oe * t)) / 3, g = 1 - (c + w)), g = He(h * g * 3), c = He(h * c * 3), w = He(h * w * 3), [g * 255, c * 255, w * 255, r.length > 3 ? r[3] : 1];
    }, Fa = za, Ua = $.unpack, Oa = $.type, Da = s, Ot = d, Dt = y, ja = Sa;
    Ot.prototype.hsi = function() {
      return ja(this._rgb);
    }, Da.hsi = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(Ot, [null].concat(r, ["hsi"])))();
    }, Dt.format.hsi = Fa, Dt.autodetect.push({
      p: 2,
      test: function() {
        for (var r = [], e = arguments.length; e--; )
          r[e] = arguments[e];
        if (r = Ua(r, "hsi"), Oa(r) === "array" && r.length === 3)
          return "hsi";
      }
    });
    var Ha = $.unpack, Va = $.type, qa = s, jt = d, Ht = y, Ya = n;
    jt.prototype.hsl = function() {
      return Ya(this._rgb);
    }, qa.hsl = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(jt, [null].concat(r, ["hsl"])))();
    }, Ht.format.hsl = Mr, Ht.autodetect.push({
      p: 2,
      test: function() {
        for (var r = [], e = arguments.length; e--; )
          r[e] = arguments[e];
        if (r = Ha(r, "hsl"), Va(r) === "array" && r.length === 3)
          return "hsl";
      }
    });
    var Ga = $.unpack, Wa = Math.min, Xa = Math.max, Ja = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      r = Ga(r, "rgb");
      var t = r[0], o = r[1], h = r[2], g = Wa(t, o, h), c = Xa(t, o, h), w = c - g, _, M, P;
      return P = c / 255, c === 0 ? (_ = Number.NaN, M = 0) : (M = w / c, t === c && (_ = (o - h) / w), o === c && (_ = 2 + (h - t) / w), h === c && (_ = 4 + (t - o) / w), _ *= 60, _ < 0 && (_ += 360)), [_, M, P];
    }, Za = Ja, Qa = $.unpack, Ka = Math.floor, ro = function() {
      for (var r, e, t, o, h, g, c = [], w = arguments.length; w--; )
        c[w] = arguments[w];
      c = Qa(c, "hsv");
      var _ = c[0], M = c[1], P = c[2], q, S, W;
      if (P *= 255, M === 0)
        q = S = W = P;
      else {
        _ === 360 && (_ = 0), _ > 360 && (_ -= 360), _ < 0 && (_ += 360), _ /= 60;
        var G = Ka(_), or = _ - G, ur = P * (1 - M), fr = P * (1 - M * or), dr = P * (1 - M * (1 - or));
        switch (G) {
          case 0:
            r = [P, dr, ur], q = r[0], S = r[1], W = r[2];
            break;
          case 1:
            e = [fr, P, ur], q = e[0], S = e[1], W = e[2];
            break;
          case 2:
            t = [ur, P, dr], q = t[0], S = t[1], W = t[2];
            break;
          case 3:
            o = [ur, fr, P], q = o[0], S = o[1], W = o[2];
            break;
          case 4:
            h = [dr, ur, P], q = h[0], S = h[1], W = h[2];
            break;
          case 5:
            g = [P, ur, fr], q = g[0], S = g[1], W = g[2];
            break;
        }
      }
      return [q, S, W, c.length > 3 ? c[3] : 1];
    }, eo = ro, to = $.unpack, no = $.type, ao = s, Vt = d, qt = y, oo = Za;
    Vt.prototype.hsv = function() {
      return oo(this._rgb);
    }, ao.hsv = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(Vt, [null].concat(r, ["hsv"])))();
    }, qt.format.hsv = eo, qt.autodetect.push({
      p: 2,
      test: function() {
        for (var r = [], e = arguments.length; e--; )
          r[e] = arguments[e];
        if (r = to(r, "hsv"), no(r) === "array" && r.length === 3)
          return "hsv";
      }
    });
    var Me = {
      Kn: 18,
      Xn: 0.95047,
      Yn: 1,
      Zn: 1.08883,
      t0: 0.137931034,
      t1: 0.206896552,
      t2: 0.12841855,
      t3: 8856452e-9
    }, se = Me, io = $.unpack, Yt = Math.pow, so = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = io(r, "rgb"), o = t[0], h = t[1], g = t[2], c = lo(o, h, g), w = c[0], _ = c[1], M = c[2], P = 116 * _ - 16;
      return [P < 0 ? 0 : P, 500 * (w - _), 200 * (_ - M)];
    }, qe = function(r) {
      return (r /= 255) <= 0.04045 ? r / 12.92 : Yt((r + 0.055) / 1.055, 2.4);
    }, Ye = function(r) {
      return r > se.t3 ? Yt(r, 1 / 3) : r / se.t2 + se.t0;
    }, lo = function(r, e, t) {
      r = qe(r), e = qe(e), t = qe(t);
      var o = Ye((0.4124564 * r + 0.3575761 * e + 0.1804375 * t) / se.Xn), h = Ye((0.2126729 * r + 0.7151522 * e + 0.072175 * t) / se.Yn), g = Ye((0.0193339 * r + 0.119192 * e + 0.9503041 * t) / se.Zn);
      return [o, h, g];
    }, Gt = so, le = Me, uo = $.unpack, co = Math.pow, fo = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      r = uo(r, "lab");
      var t = r[0], o = r[1], h = r[2], g, c, w, _, M, P;
      return c = (t + 16) / 116, g = isNaN(o) ? c : c + o / 500, w = isNaN(h) ? c : c - h / 200, c = le.Yn * We(c), g = le.Xn * We(g), w = le.Zn * We(w), _ = Ge(3.2404542 * g - 1.5371385 * c - 0.4985314 * w), M = Ge(-0.969266 * g + 1.8760108 * c + 0.041556 * w), P = Ge(0.0556434 * g - 0.2040259 * c + 1.0572252 * w), [_, M, P, r.length > 3 ? r[3] : 1];
    }, Ge = function(r) {
      return 255 * (r <= 304e-5 ? 12.92 * r : 1.055 * co(r, 1 / 2.4) - 0.055);
    }, We = function(r) {
      return r > le.t1 ? r * r * r : le.t2 * (r - le.t0);
    }, Wt = fo, ho = $.unpack, vo = $.type, go = s, Xt = d, Jt = y, po = Gt;
    Xt.prototype.lab = function() {
      return po(this._rgb);
    }, go.lab = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(Xt, [null].concat(r, ["lab"])))();
    }, Jt.format.lab = Wt, Jt.autodetect.push({
      p: 2,
      test: function() {
        for (var r = [], e = arguments.length; e--; )
          r[e] = arguments[e];
        if (r = ho(r, "lab"), vo(r) === "array" && r.length === 3)
          return "lab";
      }
    });
    var bo = $.unpack, mo = $.RAD2DEG, yo = Math.sqrt, wo = Math.atan2, _o = Math.round, ko = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = bo(r, "lab"), o = t[0], h = t[1], g = t[2], c = yo(h * h + g * g), w = (wo(g, h) * mo + 360) % 360;
      return _o(c * 1e4) === 0 && (w = Number.NaN), [o, c, w];
    }, Zt = ko, Co = $.unpack, $o = Gt, Eo = Zt, xo = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = Co(r, "rgb"), o = t[0], h = t[1], g = t[2], c = $o(o, h, g), w = c[0], _ = c[1], M = c[2];
      return Eo(w, _, M);
    }, Io = xo, Lo = $.unpack, Mo = $.DEG2RAD, Ao = Math.sin, To = Math.cos, Bo = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = Lo(r, "lch"), o = t[0], h = t[1], g = t[2];
      return isNaN(g) && (g = 0), g = g * Mo, [o, To(g) * h, Ao(g) * h];
    }, Qt = Bo, No = $.unpack, Po = Qt, So = Wt, Ro = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      r = No(r, "lch");
      var t = r[0], o = r[1], h = r[2], g = Po(t, o, h), c = g[0], w = g[1], _ = g[2], M = So(c, w, _), P = M[0], q = M[1], S = M[2];
      return [P, q, S, r.length > 3 ? r[3] : 1];
    }, Kt = Ro, zo = $.unpack, Fo = Kt, Uo = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = zo(r, "hcl").reverse();
      return Fo.apply(void 0, t);
    }, Oo = Uo, Do = $.unpack, jo = $.type, rn = s, Ae = d, Xe = y, en = Io;
    Ae.prototype.lch = function() {
      return en(this._rgb);
    }, Ae.prototype.hcl = function() {
      return en(this._rgb).reverse();
    }, rn.lch = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(Ae, [null].concat(r, ["lch"])))();
    }, rn.hcl = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(Ae, [null].concat(r, ["hcl"])))();
    }, Xe.format.lch = Kt, Xe.format.hcl = Oo, ["lch", "hcl"].forEach(function(r) {
      return Xe.autodetect.push({
        p: 2,
        test: function() {
          for (var e = [], t = arguments.length; t--; )
            e[t] = arguments[t];
          if (e = Do(e, r), jo(e) === "array" && e.length === 3)
            return r;
        }
      });
    });
    var Ho = {
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedalmond: "#ffebcd",
      blue: "#0000ff",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflower: "#6495ed",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkgrey: "#a9a9a9",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkslategrey: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      gold: "#ffd700",
      goldenrod: "#daa520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#adff2f",
      grey: "#808080",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      indianred: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      laserlemon: "#ffff54",
      lavender: "#e6e6fa",
      lavenderblush: "#fff0f5",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrod: "#fafad2",
      lightgoldenrodyellow: "#fafad2",
      lightgray: "#d3d3d3",
      lightgreen: "#90ee90",
      lightgrey: "#d3d3d3",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      maroon2: "#7f0000",
      maroon3: "#b03060",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370db",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      navy: "#000080",
      oldlace: "#fdf5e6",
      olive: "#808000",
      olivedrab: "#6b8e23",
      orange: "#ffa500",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#db7093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      purple: "#800080",
      purple2: "#7f007f",
      purple3: "#a020f0",
      rebeccapurple: "#663399",
      red: "#ff0000",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whitesmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowgreen: "#9acd32"
    }, tn = Ho, Vo = d, nn = y, qo = $.type, ye = tn, Yo = Rt, Go = St;
    Vo.prototype.name = function() {
      for (var r = Go(this._rgb, "rgb"), e = 0, t = Object.keys(ye); e < t.length; e += 1) {
        var o = t[e];
        if (ye[o] === r)
          return o.toLowerCase();
      }
      return r;
    }, nn.format.named = function(r) {
      if (r = r.toLowerCase(), ye[r])
        return Yo(ye[r]);
      throw new Error("unknown color name: " + r);
    }, nn.autodetect.push({
      p: 5,
      test: function(r) {
        for (var e = [], t = arguments.length - 1; t-- > 0; )
          e[t] = arguments[t + 1];
        if (!e.length && qo(r) === "string" && ye[r.toLowerCase()])
          return "named";
      }
    });
    var Wo = $.unpack, Xo = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = Wo(r, "rgb"), o = t[0], h = t[1], g = t[2];
      return (o << 16) + (h << 8) + g;
    }, Jo = Xo, Zo = $.type, Qo = function(r) {
      if (Zo(r) == "number" && r >= 0 && r <= 16777215) {
        var e = r >> 16, t = r >> 8 & 255, o = r & 255;
        return [e, t, o, 1];
      }
      throw new Error("unknown num color: " + r);
    }, Ko = Qo, ri = s, an = d, on = y, ei = $.type, ti = Jo;
    an.prototype.num = function() {
      return ti(this._rgb);
    }, ri.num = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(an, [null].concat(r, ["num"])))();
    }, on.format.num = Ko, on.autodetect.push({
      p: 5,
      test: function() {
        for (var r = [], e = arguments.length; e--; )
          r[e] = arguments[e];
        if (r.length === 1 && ei(r[0]) === "number" && r[0] >= 0 && r[0] <= 16777215)
          return "num";
      }
    });
    var ni = s, Je = d, sn = y, ln = $.unpack, un = $.type, cn = Math.round;
    Je.prototype.rgb = function(r) {
      return r === void 0 && (r = !0), r === !1 ? this._rgb.slice(0, 3) : this._rgb.slice(0, 3).map(cn);
    }, Je.prototype.rgba = function(r) {
      return r === void 0 && (r = !0), this._rgb.slice(0, 4).map(function(e, t) {
        return t < 3 ? r === !1 ? e : cn(e) : e;
      });
    }, ni.rgb = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(Je, [null].concat(r, ["rgb"])))();
    }, sn.format.rgb = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = ln(r, "rgba");
      return t[3] === void 0 && (t[3] = 1), t;
    }, sn.autodetect.push({
      p: 3,
      test: function() {
        for (var r = [], e = arguments.length; e--; )
          r[e] = arguments[e];
        if (r = ln(r, "rgba"), un(r) === "array" && (r.length === 3 || r.length === 4 && un(r[3]) == "number" && r[3] >= 0 && r[3] <= 1))
          return "rgb";
      }
    });
    var Te = Math.log, ai = function(r) {
      var e = r / 100, t, o, h;
      return e < 66 ? (t = 255, o = e < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (o = e - 2) + 104.49216199393888 * Te(o), h = e < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (h = e - 10) + 115.67994401066147 * Te(h)) : (t = 351.97690566805693 + 0.114206453784165 * (t = e - 55) - 40.25366309332127 * Te(t), o = 325.4494125711974 + 0.07943456536662342 * (o = e - 50) - 28.0852963507957 * Te(o), h = 255), [t, o, h, 1];
    }, fn = ai, oi = fn, ii = $.unpack, si = Math.round, li = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      for (var t = ii(r, "rgb"), o = t[0], h = t[2], g = 1e3, c = 4e4, w = 0.4, _; c - g > w; ) {
        _ = (c + g) * 0.5;
        var M = oi(_);
        M[2] / M[0] >= h / o ? c = _ : g = _;
      }
      return si(_);
    }, ui = li, Ze = s, Be = d, Qe = y, ci = ui;
    Be.prototype.temp = Be.prototype.kelvin = Be.prototype.temperature = function() {
      return ci(this._rgb);
    }, Ze.temp = Ze.kelvin = Ze.temperature = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(Be, [null].concat(r, ["temp"])))();
    }, Qe.format.temp = Qe.format.kelvin = Qe.format.temperature = fn;
    var fi = $.unpack, Ke = Math.cbrt, hi = Math.pow, di = Math.sign, vi = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = fi(r, "rgb"), o = t[0], h = t[1], g = t[2], c = [rt(o / 255), rt(h / 255), rt(g / 255)], w = c[0], _ = c[1], M = c[2], P = Ke(0.4122214708 * w + 0.5363325363 * _ + 0.0514459929 * M), q = Ke(0.2119034982 * w + 0.6806995451 * _ + 0.1073969566 * M), S = Ke(0.0883024619 * w + 0.2817188376 * _ + 0.6299787005 * M);
      return [
        0.2104542553 * P + 0.793617785 * q - 0.0040720468 * S,
        1.9779984951 * P - 2.428592205 * q + 0.4505937099 * S,
        0.0259040371 * P + 0.7827717662 * q - 0.808675766 * S
      ];
    }, hn = vi;
    function rt(r) {
      var e = Math.abs(r);
      return e < 0.04045 ? r / 12.92 : (di(r) || 1) * hi((e + 0.055) / 1.055, 2.4);
    }
    var gi = $.unpack, Ne = Math.pow, pi = Math.sign, bi = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      r = gi(r, "lab");
      var t = r[0], o = r[1], h = r[2], g = Ne(t + 0.3963377774 * o + 0.2158037573 * h, 3), c = Ne(t - 0.1055613458 * o - 0.0638541728 * h, 3), w = Ne(t - 0.0894841775 * o - 1.291485548 * h, 3);
      return [
        255 * et(4.0767416621 * g - 3.3077115913 * c + 0.2309699292 * w),
        255 * et(-1.2684380046 * g + 2.6097574011 * c - 0.3413193965 * w),
        255 * et(-0.0041960863 * g - 0.7034186147 * c + 1.707614701 * w),
        r.length > 3 ? r[3] : 1
      ];
    }, dn = bi;
    function et(r) {
      var e = Math.abs(r);
      return e > 31308e-7 ? (pi(r) || 1) * (1.055 * Ne(e, 1 / 2.4) - 0.055) : r * 12.92;
    }
    var mi = $.unpack, yi = $.type, wi = s, vn = d, gn = y, _i = hn;
    vn.prototype.oklab = function() {
      return _i(this._rgb);
    }, wi.oklab = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(vn, [null].concat(r, ["oklab"])))();
    }, gn.format.oklab = dn, gn.autodetect.push({
      p: 3,
      test: function() {
        for (var r = [], e = arguments.length; e--; )
          r[e] = arguments[e];
        if (r = mi(r, "oklab"), yi(r) === "array" && r.length === 3)
          return "oklab";
      }
    });
    var ki = $.unpack, Ci = hn, $i = Zt, Ei = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      var t = ki(r, "rgb"), o = t[0], h = t[1], g = t[2], c = Ci(o, h, g), w = c[0], _ = c[1], M = c[2];
      return $i(w, _, M);
    }, xi = Ei, Ii = $.unpack, Li = Qt, Mi = dn, Ai = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      r = Ii(r, "lch");
      var t = r[0], o = r[1], h = r[2], g = Li(t, o, h), c = g[0], w = g[1], _ = g[2], M = Mi(c, w, _), P = M[0], q = M[1], S = M[2];
      return [P, q, S, r.length > 3 ? r[3] : 1];
    }, Ti = Ai, Bi = $.unpack, Ni = $.type, Pi = s, pn = d, bn = y, Si = xi;
    pn.prototype.oklch = function() {
      return Si(this._rgb);
    }, Pi.oklch = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      return new (Function.prototype.bind.apply(pn, [null].concat(r, ["oklch"])))();
    }, bn.format.oklch = Ti, bn.autodetect.push({
      p: 3,
      test: function() {
        for (var r = [], e = arguments.length; e--; )
          r[e] = arguments[e];
        if (r = Bi(r, "oklch"), Ni(r) === "array" && r.length === 3)
          return "oklch";
      }
    });
    var mn = d, Ri = $.type;
    mn.prototype.alpha = function(r, e) {
      return e === void 0 && (e = !1), r !== void 0 && Ri(r) === "number" ? e ? (this._rgb[3] = r, this) : new mn([this._rgb[0], this._rgb[1], this._rgb[2], r], "rgb") : this._rgb[3];
    };
    var zi = d;
    zi.prototype.clipped = function() {
      return this._rgb._clipped || !1;
    };
    var re = d, Fi = Me;
    re.prototype.darken = function(r) {
      r === void 0 && (r = 1);
      var e = this, t = e.lab();
      return t[0] -= Fi.Kn * r, new re(t, "lab").alpha(e.alpha(), !0);
    }, re.prototype.brighten = function(r) {
      return r === void 0 && (r = 1), this.darken(-r);
    }, re.prototype.darker = re.prototype.darken, re.prototype.brighter = re.prototype.brighten;
    var Ui = d;
    Ui.prototype.get = function(r) {
      var e = r.split("."), t = e[0], o = e[1], h = this[t]();
      if (o) {
        var g = t.indexOf(o) - (t.substr(0, 2) === "ok" ? 2 : 0);
        if (g > -1)
          return h[g];
        throw new Error("unknown channel " + o + " in mode " + t);
      } else
        return h;
    };
    var ue = d, Oi = $.type, Di = Math.pow, ji = 1e-7, Hi = 20;
    ue.prototype.luminance = function(r) {
      if (r !== void 0 && Oi(r) === "number") {
        if (r === 0)
          return new ue([0, 0, 0, this._rgb[3]], "rgb");
        if (r === 1)
          return new ue([255, 255, 255, this._rgb[3]], "rgb");
        var e = this.luminance(), t = "rgb", o = Hi, h = function(c, w) {
          var _ = c.interpolate(w, 0.5, t), M = _.luminance();
          return Math.abs(r - M) < ji || !o-- ? _ : M > r ? h(c, _) : h(_, w);
        }, g = (e > r ? h(new ue([0, 0, 0]), this) : h(this, new ue([255, 255, 255]))).rgb();
        return new ue(g.concat([this._rgb[3]]));
      }
      return Vi.apply(void 0, this._rgb.slice(0, 3));
    };
    var Vi = function(r, e, t) {
      return r = tt(r), e = tt(e), t = tt(t), 0.2126 * r + 0.7152 * e + 0.0722 * t;
    }, tt = function(r) {
      return r /= 255, r <= 0.03928 ? r / 12.92 : Di((r + 0.055) / 1.055, 2.4);
    }, Rr = {}, yn = d, wn = $.type, Pe = Rr, _n = function(r, e, t) {
      t === void 0 && (t = 0.5);
      for (var o = [], h = arguments.length - 3; h-- > 0; )
        o[h] = arguments[h + 3];
      var g = o[0] || "lrgb";
      if (!Pe[g] && !o.length && (g = Object.keys(Pe)[0]), !Pe[g])
        throw new Error("interpolation mode " + g + " is not defined");
      return wn(r) !== "object" && (r = new yn(r)), wn(e) !== "object" && (e = new yn(e)), Pe[g](r, e, t).alpha(r.alpha() + t * (e.alpha() - r.alpha()));
    }, kn = d, qi = _n;
    kn.prototype.mix = kn.prototype.interpolate = function(r, e) {
      e === void 0 && (e = 0.5);
      for (var t = [], o = arguments.length - 2; o-- > 0; )
        t[o] = arguments[o + 2];
      return qi.apply(void 0, [this, r, e].concat(t));
    };
    var Cn = d;
    Cn.prototype.premultiply = function(r) {
      r === void 0 && (r = !1);
      var e = this._rgb, t = e[3];
      return r ? (this._rgb = [e[0] * t, e[1] * t, e[2] * t, t], this) : new Cn([e[0] * t, e[1] * t, e[2] * t, t], "rgb");
    };
    var nt = d, Yi = Me;
    nt.prototype.saturate = function(r) {
      r === void 0 && (r = 1);
      var e = this, t = e.lch();
      return t[1] += Yi.Kn * r, t[1] < 0 && (t[1] = 0), new nt(t, "lch").alpha(e.alpha(), !0);
    }, nt.prototype.desaturate = function(r) {
      return r === void 0 && (r = 1), this.saturate(-r);
    };
    var $n = d, En = $.type;
    $n.prototype.set = function(r, e, t) {
      t === void 0 && (t = !1);
      var o = r.split("."), h = o[0], g = o[1], c = this[h]();
      if (g) {
        var w = h.indexOf(g) - (h.substr(0, 2) === "ok" ? 2 : 0);
        if (w > -1) {
          if (En(e) == "string")
            switch (e.charAt(0)) {
              case "+":
                c[w] += +e;
                break;
              case "-":
                c[w] += +e;
                break;
              case "*":
                c[w] *= +e.substr(1);
                break;
              case "/":
                c[w] /= +e.substr(1);
                break;
              default:
                c[w] = +e;
            }
          else if (En(e) === "number")
            c[w] = e;
          else
            throw new Error("unsupported value for Color.set");
          var _ = new $n(c, h);
          return t ? (this._rgb = _._rgb, this) : _;
        }
        throw new Error("unknown channel " + g + " in mode " + h);
      } else
        return c;
    };
    var Gi = d, Wi = function(r, e, t) {
      var o = r._rgb, h = e._rgb;
      return new Gi(
        o[0] + t * (h[0] - o[0]),
        o[1] + t * (h[1] - o[1]),
        o[2] + t * (h[2] - o[2]),
        "rgb"
      );
    };
    Rr.rgb = Wi;
    var Xi = d, at = Math.sqrt, ce = Math.pow, Ji = function(r, e, t) {
      var o = r._rgb, h = o[0], g = o[1], c = o[2], w = e._rgb, _ = w[0], M = w[1], P = w[2];
      return new Xi(
        at(ce(h, 2) * (1 - t) + ce(_, 2) * t),
        at(ce(g, 2) * (1 - t) + ce(M, 2) * t),
        at(ce(c, 2) * (1 - t) + ce(P, 2) * t),
        "rgb"
      );
    };
    Rr.lrgb = Ji;
    var Zi = d, Qi = function(r, e, t) {
      var o = r.lab(), h = e.lab();
      return new Zi(
        o[0] + t * (h[0] - o[0]),
        o[1] + t * (h[1] - o[1]),
        o[2] + t * (h[2] - o[2]),
        "lab"
      );
    };
    Rr.lab = Qi;
    var xn = d, fe = function(r, e, t, o) {
      var h, g, c, w;
      o === "hsl" ? (c = r.hsl(), w = e.hsl()) : o === "hsv" ? (c = r.hsv(), w = e.hsv()) : o === "hcg" ? (c = r.hcg(), w = e.hcg()) : o === "hsi" ? (c = r.hsi(), w = e.hsi()) : o === "lch" || o === "hcl" ? (o = "hcl", c = r.hcl(), w = e.hcl()) : o === "oklch" && (c = r.oklch().reverse(), w = e.oklch().reverse());
      var _, M, P, q, S, W;
      (o.substr(0, 1) === "h" || o === "oklch") && (h = c, _ = h[0], P = h[1], S = h[2], g = w, M = g[0], q = g[1], W = g[2]);
      var G, or, ur, fr;
      return !isNaN(_) && !isNaN(M) ? (M > _ && M - _ > 180 ? fr = M - (_ + 360) : M < _ && _ - M > 180 ? fr = M + 360 - _ : fr = M - _, or = _ + t * fr) : isNaN(_) ? isNaN(M) ? or = Number.NaN : (or = M, (S == 1 || S == 0) && o != "hsv" && (G = q)) : (or = _, (W == 1 || W == 0) && o != "hsv" && (G = P)), G === void 0 && (G = P + t * (q - P)), ur = S + t * (W - S), o === "oklch" ? new xn([ur, G, or], o) : new xn([or, G, ur], o);
    }, Ki = fe, In = function(r, e, t) {
      return Ki(r, e, t, "lch");
    };
    Rr.lch = In, Rr.hcl = In;
    var rs = d, es = function(r, e, t) {
      var o = r.num(), h = e.num();
      return new rs(o + t * (h - o), "num");
    };
    Rr.num = es;
    var ts = fe, ns = function(r, e, t) {
      return ts(r, e, t, "hcg");
    };
    Rr.hcg = ns;
    var as = fe, os = function(r, e, t) {
      return as(r, e, t, "hsi");
    };
    Rr.hsi = os;
    var is = fe, ss = function(r, e, t) {
      return is(r, e, t, "hsl");
    };
    Rr.hsl = ss;
    var ls = fe, us = function(r, e, t) {
      return ls(r, e, t, "hsv");
    };
    Rr.hsv = us;
    var cs = d, fs = function(r, e, t) {
      var o = r.oklab(), h = e.oklab();
      return new cs(
        o[0] + t * (h[0] - o[0]),
        o[1] + t * (h[1] - o[1]),
        o[2] + t * (h[2] - o[2]),
        "oklab"
      );
    };
    Rr.oklab = fs;
    var hs = fe, ds = function(r, e, t) {
      return hs(r, e, t, "oklch");
    };
    Rr.oklch = ds;
    var ot = d, vs = $.clip_rgb, it = Math.pow, st = Math.sqrt, lt = Math.PI, Ln = Math.cos, Mn = Math.sin, gs = Math.atan2, ps = function(r, e, t) {
      e === void 0 && (e = "lrgb"), t === void 0 && (t = null);
      var o = r.length;
      t || (t = Array.from(new Array(o)).map(function() {
        return 1;
      }));
      var h = o / t.reduce(function(or, ur) {
        return or + ur;
      });
      if (t.forEach(function(or, ur) {
        t[ur] *= h;
      }), r = r.map(function(or) {
        return new ot(or);
      }), e === "lrgb")
        return bs(r, t);
      for (var g = r.shift(), c = g.get(e), w = [], _ = 0, M = 0, P = 0; P < c.length; P++)
        if (c[P] = (c[P] || 0) * t[0], w.push(isNaN(c[P]) ? 0 : t[0]), e.charAt(P) === "h" && !isNaN(c[P])) {
          var q = c[P] / 180 * lt;
          _ += Ln(q) * t[0], M += Mn(q) * t[0];
        }
      var S = g.alpha() * t[0];
      r.forEach(function(or, ur) {
        var fr = or.get(e);
        S += or.alpha() * t[ur + 1];
        for (var dr = 0; dr < c.length; dr++)
          if (!isNaN(fr[dr]))
            if (w[dr] += t[ur + 1], e.charAt(dr) === "h") {
              var Ar = fr[dr] / 180 * lt;
              _ += Ln(Ar) * t[ur + 1], M += Mn(Ar) * t[ur + 1];
            } else
              c[dr] += fr[dr] * t[ur + 1];
      });
      for (var W = 0; W < c.length; W++)
        if (e.charAt(W) === "h") {
          for (var G = gs(M / w[W], _ / w[W]) / lt * 180; G < 0; )
            G += 360;
          for (; G >= 360; )
            G -= 360;
          c[W] = G;
        } else
          c[W] = c[W] / w[W];
      return S /= o, new ot(c, e).alpha(S > 0.99999 ? 1 : S, !0);
    }, bs = function(r, e) {
      for (var t = r.length, o = [0, 0, 0, 0], h = 0; h < r.length; h++) {
        var g = r[h], c = e[h] / t, w = g._rgb;
        o[0] += it(w[0], 2) * c, o[1] += it(w[1], 2) * c, o[2] += it(w[2], 2) * c, o[3] += w[3] * c;
      }
      return o[0] = st(o[0]), o[1] = st(o[1]), o[2] = st(o[2]), o[3] > 0.9999999 && (o[3] = 1), new ot(vs(o));
    }, Or = s, he = $.type, ms = Math.pow, ut = function(r) {
      var e = "rgb", t = Or("#ccc"), o = 0, h = [0, 1], g = [], c = [0, 0], w = !1, _ = [], M = !1, P = 0, q = 1, S = !1, W = {}, G = !0, or = 1, ur = function(F) {
        if (F = F || ["#fff", "#000"], F && he(F) === "string" && Or.brewer && Or.brewer[F.toLowerCase()] && (F = Or.brewer[F.toLowerCase()]), he(F) === "array") {
          F.length === 1 && (F = [F[0], F[0]]), F = F.slice(0);
          for (var rr = 0; rr < F.length; rr++)
            F[rr] = Or(F[rr]);
          g.length = 0;
          for (var sr = 0; sr < F.length; sr++)
            g.push(sr / (F.length - 1));
        }
        return Pr(), _ = F;
      }, fr = function(F) {
        if (w != null) {
          for (var rr = w.length - 1, sr = 0; sr < rr && F >= w[sr]; )
            sr++;
          return sr - 1;
        }
        return 0;
      }, dr = function(F) {
        return F;
      }, Ar = function(F) {
        return F;
      }, Lr = function(F, rr) {
        var sr, ir;
        if (rr == null && (rr = !1), isNaN(F) || F === null)
          return t;
        if (rr)
          ir = F;
        else if (w && w.length > 2) {
          var Tr = fr(F);
          ir = Tr / (w.length - 2);
        } else
          q !== P ? ir = (F - P) / (q - P) : ir = 1;
        ir = Ar(ir), rr || (ir = dr(ir)), or !== 1 && (ir = ms(ir, or)), ir = c[0] + ir * (1 - c[0] - c[1]), ir = Math.min(1, Math.max(0, ir));
        var yr = Math.floor(ir * 1e4);
        if (G && W[yr])
          sr = W[yr];
        else {
          if (he(_) === "array")
            for (var hr = 0; hr < g.length; hr++) {
              var vr = g[hr];
              if (ir <= vr) {
                sr = _[hr];
                break;
              }
              if (ir >= vr && hr === g.length - 1) {
                sr = _[hr];
                break;
              }
              if (ir > vr && ir < g[hr + 1]) {
                ir = (ir - vr) / (g[hr + 1] - vr), sr = Or.interpolate(_[hr], _[hr + 1], ir, e);
                break;
              }
            }
          else
            he(_) === "function" && (sr = _(ir));
          G && (W[yr] = sr);
        }
        return sr;
      }, Pr = function() {
        return W = {};
      };
      ur(r);
      var cr = function(F) {
        var rr = Or(Lr(F));
        return M && rr[M] ? rr[M]() : rr;
      };
      return cr.classes = function(F) {
        if (F != null) {
          if (he(F) === "array")
            w = F, h = [F[0], F[F.length - 1]];
          else {
            var rr = Or.analyze(h);
            F === 0 ? w = [rr.min, rr.max] : w = Or.limits(rr, "e", F);
          }
          return cr;
        }
        return w;
      }, cr.domain = function(F) {
        if (!arguments.length)
          return h;
        P = F[0], q = F[F.length - 1], g = [];
        var rr = _.length;
        if (F.length === rr && P !== q)
          for (var sr = 0, ir = Array.from(F); sr < ir.length; sr += 1) {
            var Tr = ir[sr];
            g.push((Tr - P) / (q - P));
          }
        else {
          for (var yr = 0; yr < rr; yr++)
            g.push(yr / (rr - 1));
          if (F.length > 2) {
            var hr = F.map(function(gr, pr) {
              return pr / (F.length - 1);
            }), vr = F.map(function(gr) {
              return (gr - P) / (q - P);
            });
            vr.every(function(gr, pr) {
              return hr[pr] === gr;
            }) || (Ar = function(gr) {
              if (gr <= 0 || gr >= 1)
                return gr;
              for (var pr = 0; gr >= vr[pr + 1]; )
                pr++;
              var jr = (gr - vr[pr]) / (vr[pr + 1] - vr[pr]), Zr = hr[pr] + jr * (hr[pr + 1] - hr[pr]);
              return Zr;
            });
          }
        }
        return h = [P, q], cr;
      }, cr.mode = function(F) {
        return arguments.length ? (e = F, Pr(), cr) : e;
      }, cr.range = function(F, rr) {
        return ur(F), cr;
      }, cr.out = function(F) {
        return M = F, cr;
      }, cr.spread = function(F) {
        return arguments.length ? (o = F, cr) : o;
      }, cr.correctLightness = function(F) {
        return F == null && (F = !0), S = F, Pr(), S ? dr = function(rr) {
          for (var sr = Lr(0, !0).lab()[0], ir = Lr(1, !0).lab()[0], Tr = sr > ir, yr = Lr(rr, !0).lab()[0], hr = sr + (ir - sr) * rr, vr = yr - hr, gr = 0, pr = 1, jr = 20; Math.abs(vr) > 0.01 && jr-- > 0; )
            (function() {
              return Tr && (vr *= -1), vr < 0 ? (gr = rr, rr += (pr - rr) * 0.5) : (pr = rr, rr += (gr - rr) * 0.5), yr = Lr(rr, !0).lab()[0], vr = yr - hr;
            })();
          return rr;
        } : dr = function(rr) {
          return rr;
        }, cr;
      }, cr.padding = function(F) {
        return F != null ? (he(F) === "number" && (F = [F, F]), c = F, cr) : c;
      }, cr.colors = function(F, rr) {
        arguments.length < 2 && (rr = "hex");
        var sr = [];
        if (arguments.length === 0)
          sr = _.slice(0);
        else if (F === 1)
          sr = [cr(0.5)];
        else if (F > 1) {
          var ir = h[0], Tr = h[1] - ir;
          sr = ys(0, F, !1).map(function(pr) {
            return cr(ir + pr / (F - 1) * Tr);
          });
        } else {
          r = [];
          var yr = [];
          if (w && w.length > 2)
            for (var hr = 1, vr = w.length, gr = 1 <= vr; gr ? hr < vr : hr > vr; gr ? hr++ : hr--)
              yr.push((w[hr - 1] + w[hr]) * 0.5);
          else
            yr = h;
          sr = yr.map(function(pr) {
            return cr(pr);
          });
        }
        return Or[rr] && (sr = sr.map(function(pr) {
          return pr[rr]();
        })), sr;
      }, cr.cache = function(F) {
        return F != null ? (G = F, cr) : G;
      }, cr.gamma = function(F) {
        return F != null ? (or = F, cr) : or;
      }, cr.nodata = function(F) {
        return F != null ? (t = Or(F), cr) : t;
      }, cr;
    };
    function ys(r, e, t) {
      for (var o = [], h = r < e, g = t ? h ? e + 1 : e - 1 : e, c = r; h ? c < g : c > g; h ? c++ : c--)
        o.push(c);
      return o;
    }
    var we = d, ws = ut, _s = function(r) {
      for (var e = [1, 1], t = 1; t < r; t++) {
        for (var o = [1], h = 1; h <= e.length; h++)
          o[h] = (e[h] || 0) + e[h - 1];
        e = o;
      }
      return e;
    }, ks = function(r) {
      var e, t, o, h, g, c, w;
      if (r = r.map(function(S) {
        return new we(S);
      }), r.length === 2)
        e = r.map(function(S) {
          return S.lab();
        }), g = e[0], c = e[1], h = function(S) {
          var W = [0, 1, 2].map(function(G) {
            return g[G] + S * (c[G] - g[G]);
          });
          return new we(W, "lab");
        };
      else if (r.length === 3)
        t = r.map(function(S) {
          return S.lab();
        }), g = t[0], c = t[1], w = t[2], h = function(S) {
          var W = [0, 1, 2].map(function(G) {
            return (1 - S) * (1 - S) * g[G] + 2 * (1 - S) * S * c[G] + S * S * w[G];
          });
          return new we(W, "lab");
        };
      else if (r.length === 4) {
        var _;
        o = r.map(function(S) {
          return S.lab();
        }), g = o[0], c = o[1], w = o[2], _ = o[3], h = function(S) {
          var W = [0, 1, 2].map(function(G) {
            return (1 - S) * (1 - S) * (1 - S) * g[G] + 3 * (1 - S) * (1 - S) * S * c[G] + 3 * (1 - S) * S * S * w[G] + S * S * S * _[G];
          });
          return new we(W, "lab");
        };
      } else if (r.length >= 5) {
        var M, P, q;
        M = r.map(function(S) {
          return S.lab();
        }), q = r.length - 1, P = _s(q), h = function(S) {
          var W = 1 - S, G = [0, 1, 2].map(function(or) {
            return M.reduce(function(ur, fr, dr) {
              return ur + P[dr] * Math.pow(W, q - dr) * Math.pow(S, dr) * fr[or];
            }, 0);
          });
          return new we(G, "lab");
        };
      } else
        throw new RangeError("No point in running bezier with only one color.");
      return h;
    }, Cs = function(r) {
      var e = ks(r);
      return e.scale = function() {
        return ws(e);
      }, e;
    }, ct = s, Dr = function(r, e, t) {
      if (!Dr[t])
        throw new Error("unknown blend mode " + t);
      return Dr[t](r, e);
    }, Xr = function(r) {
      return function(e, t) {
        var o = ct(t).rgb(), h = ct(e).rgb();
        return ct.rgb(r(o, h));
      };
    }, Jr = function(r) {
      return function(e, t) {
        var o = [];
        return o[0] = r(e[0], t[0]), o[1] = r(e[1], t[1]), o[2] = r(e[2], t[2]), o;
      };
    }, $s = function(r) {
      return r;
    }, Es = function(r, e) {
      return r * e / 255;
    }, xs = function(r, e) {
      return r > e ? e : r;
    }, Is = function(r, e) {
      return r > e ? r : e;
    }, Ls = function(r, e) {
      return 255 * (1 - (1 - r / 255) * (1 - e / 255));
    }, Ms = function(r, e) {
      return e < 128 ? 2 * r * e / 255 : 255 * (1 - 2 * (1 - r / 255) * (1 - e / 255));
    }, As = function(r, e) {
      return 255 * (1 - (1 - e / 255) / (r / 255));
    }, Ts = function(r, e) {
      return r === 255 ? 255 : (r = 255 * (e / 255) / (1 - r / 255), r > 255 ? 255 : r);
    };
    Dr.normal = Xr(Jr($s)), Dr.multiply = Xr(Jr(Es)), Dr.screen = Xr(Jr(Ls)), Dr.overlay = Xr(Jr(Ms)), Dr.darken = Xr(Jr(xs)), Dr.lighten = Xr(Jr(Is)), Dr.dodge = Xr(Jr(Ts)), Dr.burn = Xr(Jr(As));
    for (var Bs = Dr, ft = $.type, Ns = $.clip_rgb, Ps = $.TWOPI, Ss = Math.pow, Rs = Math.sin, zs = Math.cos, An = s, Fs = function(r, e, t, o, h) {
      r === void 0 && (r = 300), e === void 0 && (e = -1.5), t === void 0 && (t = 1), o === void 0 && (o = 1), h === void 0 && (h = [0, 1]);
      var g = 0, c;
      ft(h) === "array" ? c = h[1] - h[0] : (c = 0, h = [h, h]);
      var w = function(_) {
        var M = Ps * ((r + 120) / 360 + e * _), P = Ss(h[0] + c * _, o), q = g !== 0 ? t[0] + _ * g : t, S = q * P * (1 - P) / 2, W = zs(M), G = Rs(M), or = P + S * (-0.14861 * W + 1.78277 * G), ur = P + S * (-0.29227 * W - 0.90649 * G), fr = P + S * (1.97294 * W);
        return An(Ns([or * 255, ur * 255, fr * 255, 1]));
      };
      return w.start = function(_) {
        return _ == null ? r : (r = _, w);
      }, w.rotations = function(_) {
        return _ == null ? e : (e = _, w);
      }, w.gamma = function(_) {
        return _ == null ? o : (o = _, w);
      }, w.hue = function(_) {
        return _ == null ? t : (t = _, ft(t) === "array" ? (g = t[1] - t[0], g === 0 && (t = t[1])) : g = 0, w);
      }, w.lightness = function(_) {
        return _ == null ? h : (ft(_) === "array" ? (h = _, c = _[1] - _[0]) : (h = [_, _], c = 0), w);
      }, w.scale = function() {
        return An.scale(w);
      }, w.hue(t), w;
    }, Us = d, Os = "0123456789abcdef", Ds = Math.floor, js = Math.random, Hs = function() {
      for (var r = "#", e = 0; e < 6; e++)
        r += Os.charAt(Ds(js() * 16));
      return new Us(r, "hex");
    }, ht = L, Tn = Math.log, Vs = Math.pow, qs = Math.floor, Ys = Math.abs, Bn = function(r, e) {
      e === void 0 && (e = null);
      var t = {
        min: Number.MAX_VALUE,
        max: Number.MAX_VALUE * -1,
        sum: 0,
        values: [],
        count: 0
      };
      return ht(r) === "object" && (r = Object.values(r)), r.forEach(function(o) {
        e && ht(o) === "object" && (o = o[e]), o != null && !isNaN(o) && (t.values.push(o), t.sum += o, o < t.min && (t.min = o), o > t.max && (t.max = o), t.count += 1);
      }), t.domain = [t.min, t.max], t.limits = function(o, h) {
        return Nn(t, o, h);
      }, t;
    }, Nn = function(r, e, t) {
      e === void 0 && (e = "equal"), t === void 0 && (t = 7), ht(r) == "array" && (r = Bn(r));
      var o = r.min, h = r.max, g = r.values.sort(function(vt, gt) {
        return vt - gt;
      });
      if (t === 1)
        return [o, h];
      var c = [];
      if (e.substr(0, 1) === "c" && (c.push(o), c.push(h)), e.substr(0, 1) === "e") {
        c.push(o);
        for (var w = 1; w < t; w++)
          c.push(o + w / t * (h - o));
        c.push(h);
      } else if (e.substr(0, 1) === "l") {
        if (o <= 0)
          throw new Error("Logarithmic scales are only possible for values > 0");
        var _ = Math.LOG10E * Tn(o), M = Math.LOG10E * Tn(h);
        c.push(o);
        for (var P = 1; P < t; P++)
          c.push(Vs(10, _ + P / t * (M - _)));
        c.push(h);
      } else if (e.substr(0, 1) === "q") {
        c.push(o);
        for (var q = 1; q < t; q++) {
          var S = (g.length - 1) * q / t, W = qs(S);
          if (W === S)
            c.push(g[W]);
          else {
            var G = S - W;
            c.push(g[W] * (1 - G) + g[W + 1] * G);
          }
        }
        c.push(h);
      } else if (e.substr(0, 1) === "k") {
        var or, ur = g.length, fr = new Array(ur), dr = new Array(t), Ar = !0, Lr = 0, Pr = null;
        Pr = [], Pr.push(o);
        for (var cr = 1; cr < t; cr++)
          Pr.push(o + cr / t * (h - o));
        for (Pr.push(h); Ar; ) {
          for (var F = 0; F < t; F++)
            dr[F] = 0;
          for (var rr = 0; rr < ur; rr++)
            for (var sr = g[rr], ir = Number.MAX_VALUE, Tr = void 0, yr = 0; yr < t; yr++) {
              var hr = Ys(Pr[yr] - sr);
              hr < ir && (ir = hr, Tr = yr), dr[Tr]++, fr[rr] = Tr;
            }
          for (var vr = new Array(t), gr = 0; gr < t; gr++)
            vr[gr] = null;
          for (var pr = 0; pr < ur; pr++)
            or = fr[pr], vr[or] === null ? vr[or] = g[pr] : vr[or] += g[pr];
          for (var jr = 0; jr < t; jr++)
            vr[jr] *= 1 / dr[jr];
          Ar = !1;
          for (var Zr = 0; Zr < t; Zr++)
            if (vr[Zr] !== Pr[Zr]) {
              Ar = !0;
              break;
            }
          Pr = vr, Lr++, Lr > 200 && (Ar = !1);
        }
        for (var Qr = {}, de = 0; de < t; de++)
          Qr[de] = [];
        for (var ve = 0; ve < ur; ve++)
          or = fr[ve], Qr[or].push(g[ve]);
        for (var Yr = [], ee = 0; ee < t; ee++)
          Yr.push(Qr[ee][0]), Yr.push(Qr[ee][Qr[ee].length - 1]);
        Yr = Yr.sort(function(vt, gt) {
          return vt - gt;
        }), c.push(Yr[0]);
        for (var _e = 1; _e < Yr.length; _e += 2) {
          var te = Yr[_e];
          !isNaN(te) && c.indexOf(te) === -1 && c.push(te);
        }
      }
      return c;
    }, Pn = { analyze: Bn, limits: Nn }, Sn = d, Gs = function(r, e) {
      r = new Sn(r), e = new Sn(e);
      var t = r.luminance(), o = e.luminance();
      return t > o ? (t + 0.05) / (o + 0.05) : (o + 0.05) / (t + 0.05);
    }, Rn = d, qr = Math.sqrt, Er = Math.pow, Ws = Math.min, Xs = Math.max, zn = Math.atan2, Fn = Math.abs, Se = Math.cos, Un = Math.sin, Js = Math.exp, On = Math.PI, Zs = function(r, e, t, o, h) {
      t === void 0 && (t = 1), o === void 0 && (o = 1), h === void 0 && (h = 1);
      var g = function(te) {
        return 360 * te / (2 * On);
      }, c = function(te) {
        return 2 * On * te / 360;
      };
      r = new Rn(r), e = new Rn(e);
      var w = Array.from(r.lab()), _ = w[0], M = w[1], P = w[2], q = Array.from(e.lab()), S = q[0], W = q[1], G = q[2], or = (_ + S) / 2, ur = qr(Er(M, 2) + Er(P, 2)), fr = qr(Er(W, 2) + Er(G, 2)), dr = (ur + fr) / 2, Ar = 0.5 * (1 - qr(Er(dr, 7) / (Er(dr, 7) + Er(25, 7)))), Lr = M * (1 + Ar), Pr = W * (1 + Ar), cr = qr(Er(Lr, 2) + Er(P, 2)), F = qr(Er(Pr, 2) + Er(G, 2)), rr = (cr + F) / 2, sr = g(zn(P, Lr)), ir = g(zn(G, Pr)), Tr = sr >= 0 ? sr : sr + 360, yr = ir >= 0 ? ir : ir + 360, hr = Fn(Tr - yr) > 180 ? (Tr + yr + 360) / 2 : (Tr + yr) / 2, vr = 1 - 0.17 * Se(c(hr - 30)) + 0.24 * Se(c(2 * hr)) + 0.32 * Se(c(3 * hr + 6)) - 0.2 * Se(c(4 * hr - 63)), gr = yr - Tr;
      gr = Fn(gr) <= 180 ? gr : yr <= Tr ? gr + 360 : gr - 360, gr = 2 * qr(cr * F) * Un(c(gr) / 2);
      var pr = S - _, jr = F - cr, Zr = 1 + 0.015 * Er(or - 50, 2) / qr(20 + Er(or - 50, 2)), Qr = 1 + 0.045 * rr, de = 1 + 0.015 * rr * vr, ve = 30 * Js(-Er((hr - 275) / 25, 2)), Yr = 2 * qr(Er(rr, 7) / (Er(rr, 7) + Er(25, 7))), ee = -Yr * Un(2 * c(ve)), _e = qr(Er(pr / (t * Zr), 2) + Er(jr / (o * Qr), 2) + Er(gr / (h * de), 2) + ee * (jr / (o * Qr)) * (gr / (h * de)));
      return Xs(0, Ws(100, _e));
    }, Dn = d, Qs = function(r, e, t) {
      t === void 0 && (t = "lab"), r = new Dn(r), e = new Dn(e);
      var o = r.get(t), h = e.get(t), g = 0;
      for (var c in o) {
        var w = (o[c] || 0) - (h[c] || 0);
        g += w * w;
      }
      return Math.sqrt(g);
    }, Ks = d, rl = function() {
      for (var r = [], e = arguments.length; e--; )
        r[e] = arguments[e];
      try {
        return new (Function.prototype.bind.apply(Ks, [null].concat(r)))(), !0;
      } catch {
        return !1;
      }
    }, jn = s, Hn = ut, el = {
      cool: function() {
        return Hn([jn.hsl(180, 1, 0.9), jn.hsl(250, 0.7, 0.4)]);
      },
      hot: function() {
        return Hn(["#000", "#f00", "#ff0", "#fff"]).mode("rgb");
      }
    }, Re = {
      OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
      PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
      BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
      Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
      BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
      YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
      YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
      Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
      RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
      Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
      YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
      Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
      GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
      Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
      YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
      PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
      Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
      PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
      Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
      Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
      RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
      RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
      PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
      PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
      RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
      BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
      RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
      PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
      Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
      Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
      Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
      Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
      Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
      Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
      Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
      Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
    }, dt = 0, Vn = Object.keys(Re); dt < Vn.length; dt += 1) {
      var qn = Vn[dt];
      Re[qn.toLowerCase()] = Re[qn];
    }
    var tl = Re, Ir = s;
    Ir.average = ps, Ir.bezier = Cs, Ir.blend = Bs, Ir.cubehelix = Fs, Ir.mix = Ir.interpolate = _n, Ir.random = Hs, Ir.scale = ut, Ir.analyze = Pn.analyze, Ir.contrast = Gs, Ir.deltaE = Zs, Ir.distance = Qs, Ir.limits = Pn.limits, Ir.valid = rl, Ir.scales = el, Ir.colors = tn, Ir.brewer = tl;
    var nl = Ir;
    return nl;
  });
})(ta);
const Sr = ta.exports, Ee = "https://blog.pengfeima.cn/img/\u7A7A\u6D1E\u9A91\u58EB-\u9EC4\u8702\u5973.png";
const je = (a, v) => {
  const p = a.__vccOpts || a;
  for (const [m, E] of v)
    p[m] = E;
  return p;
}, ul = {
  props: {
    lrc: {
      type: Array,
      default() {
        return [["00:00", "Not available"]];
      }
    },
    currentTime: { type: Number, default: NaN }
  },
  setup(a) {
    const v = Jn({
      currentIndex: NaN,
      containerRef: null,
      rowRefs: [],
      timeSeries: $e(() => {
        const p = a.currentTime, m = {};
        return a.lrc.forEach((E, C) => {
          const U = E[0];
          if (C === a.lrc.length - 1)
            return U <= p ? (m[U] = "now", v.currentIndex = C) : m[U] = "new", m;
          const X = a.lrc[C + 1], A = X ? X[0] : void 0;
          U < p && A <= p ? m[U] = "old" : U <= p && A > p ? (m[U] = "now", v.currentIndex = C) : m[U] = "new";
        }), m;
      }),
      offsetTop: $e(() => {
        let p;
        v.currentIndex && v.currentIndex >= 0 && v.rowRefs[v.currentIndex] ? p = v.rowRefs[v.currentIndex].offsetTop : p = 0;
        const m = v.containerRef;
        return m && (m.scrollTop = p), p;
      }),
      parsedLrc: $e(() => {
        let p = [];
        return p = a.lrc.map((m, E) => {
          const C = m[1], U = /^(.*?)(?:\s\((.*)\))?$/, X = C.match(U);
          return {
            content: X[1],
            translation: X[2]
          };
        }), p;
      })
    });
    return {
      state: v
    };
  },
  methods: {
    setRowRefs(a, v) {
      a && (this.state.rowRefs[v] = a.children[v]);
    },
    setContainerRef(a) {
      a && (this.state.containerRef = a);
    },
    handleSeekClick(a) {
      this.$emit("seek", a);
    }
  }
}, cl = ["data"], fl = ["onClick"], hl = { class: "content" }, dl = {
  key: 0,
  class: "translation"
};
function vl(a, v, p, m, E, C) {
  return Fr(), Hr("div", {
    class: "lrc__container",
    ref: C.setContainerRef,
    data: m.state.offsetTop
  }, [
    (Fr(!0), Hr(wt, null, _t(a.$props.lrc, (U, X) => (Fr(), Hr("div", {
      key: X,
      class: Kr(["lrc", m.state.timeSeries[U[0]]]),
      ref_for: !0,
      ref: C.setRowRefs(a.$el, X),
      onClick: (A) => C.handleSeekClick(U[0])
    }, [
      ar("span", hl, zr(m.state.parsedLrc[X].content), 1),
      m.state.parsedLrc[X].translation ? (Fr(), Hr("em", dl, zr(m.state.parsedLrc[X].translation), 1)) : Zn("", !0)
    ], 10, fl))), 128))
  ], 8, cl);
}
const gl = /* @__PURE__ */ je(ul, [["render", vl], ["__scopeId", "data-v-eb3c1ca0"]]);
const pl = {
  name: "Track",
  components: { Lrc: gl },
  props: {
    duration: { type: Number, default: 0 },
    durationReadable: { type: String, default: "00:00" },
    currentTimeReadable: { type: String, default: "00:00" },
    currentTimeRatio: { type: Number, default: 0 },
    currentTime: { type: Number, default: 0 },
    isPlaying: { type: Boolean, default: !1 },
    volume: { type: Number, default: 1 },
    currentIndex: { type: Number, default: 0 },
    playMode: { type: Number, default: 0 },
    playList: {
      type: Array,
      required: !0
    }
  },
  data() {
    return {
      primaryColor: "#333333",
      secondaryColor: "#5c5c5c",
      lightColor: "#a1a1a1",
      darkColor: "#0c0c0c",
      isMobile: !1,
      display: "thumb"
    };
  },
  computed: {
    buttons() {
      const a = () => this.$props.volume === 0 || !this.$props.volume ? "volume-mute" : this.$props.volume < 0.33 ? "volume-down" : this.$props.volume < 0.66 ? "volume" : "volume-up", v = () => {
        if (this.$props.playMode === 0)
          return "repeat";
        if (this.$props.playMode === 1)
          return "random";
        if (this.$props.playMode === 2)
          return "repeat-1";
      };
      return [
        {
          classes: ["list"],
          icon: this.display === "list" ? "times" : "bars",
          event: () => {
            this.display === "list" ? this.display = "thumb" : this.display = "list";
          }
        },
        {
          classes: ["shuffle"],
          icon: v(),
          event: () => this.$emit("changePlayMode")
        },
        {
          classes: ["previous"],
          icon: "backward",
          event: () => this.$emit("prev")
        },
        {
          classes: [this.$props.isPlaying ? "pause" : "play"],
          icon: this.$props.isPlaying ? "pause" : "play",
          event: () => this.$emit("togglePlayPause")
        },
        {
          classes: ["next"],
          icon: "forward",
          event: () => this.$emit("next")
        },
        {
          volume: !0,
          classes: ["volume"],
          icon: a(),
          event: () => this.$emit("toggleMute")
        },
        {
          classes: ["lrc"],
          icon: this.display === "lrc" ? "times" : "scroll-old",
          event: () => {
            this.display === "lrc" ? this.display = "thumb" : this.display = "lrc";
          }
        }
      ];
    },
    cssVars() {
      return {
        "--primary": this.primaryColor,
        "--secondary": this.secondaryColor,
        "--light": this.lightColor,
        "--dark": this.darkColor,
        "--dark-lighten-15": Sr(this.darkColor).brighten(1.5),
        "--light-alpha-1": Sr(this.lightColor).alpha(0.1),
        "--light-alpha-4": Sr(this.lightColor).alpha(0.4),
        "--primary-lighten-20": Sr(this.secondaryColor).brighten(2),
        "--secondary-lighten-20": Sr(this.secondaryColor).brighten(2),
        "--secondary-darken-10": Sr(this.secondaryColor).darken(1)
      };
    },
    currentTrack() {
      const a = this.$props.playList[this.$props.currentIndex];
      return a || {
        cover: Ee,
        name: "Track Loading",
        artist: "",
        lrc: [["00:00", "Loading"]],
        color: "#333333"
      };
    }
  },
  watch: {
    currentTrack: {
      handler() {
        this.colorThief(this.currentTrack.cover, this.currentTrack.color);
      },
      deep: !0,
      immediate: !0
    }
  },
  methods: {
    setAltImg(a) {
      a.target.src = Ee, this.colorThief(Ee, null);
    },
    handleSeekEvent(a) {
      this.$emit("seek", a);
    },
    handlePlaySpecifiedTrackEvent(a) {
      a === this.$props.currentIndex ? this.$emit("togglePlayPause") : this.$emit("playTrack", a);
    },
    handleClickCloseListEvent() {
      this.displayList = !this.displayList;
    },
    handleClickProgressBarEvent(a, v) {
      const p = this.$refs[v].getBoundingClientRect(), m = a.pageX - p.x, E = p.right - p.left, U = m / E * this.$props.duration;
      this.$emit("seek", U);
    },
    handleClickVolumeBarEvent(a) {
      const v = this.$refs.volume.getBoundingClientRect(), p = v.bottom - v.top, m = a.pageY - v.y;
      let E;
      this.display === "thumb" ? E = 1 - m / p : E = m / p, this.$emit("changeVolume", E);
    },
    handleButtonClickEvent(a) {
      a.event && a.event();
    },
    async colorThief(a, v) {
      const p = a;
      let m;
      if (v)
        m = v;
      else {
        const E = new Image();
        E.crossOrigin = "anonymous", E.src = p, await new Promise((C) => {
          E.addEventListener("load", async (U) => {
            const X = new ge();
            try {
              m = Sr(...await X.getColor(E)).hex();
            } catch {
              m = "#333333";
            }
            Sr.contrast(Sr(m).hex(), "#ffffff") < 4 && (m = Sr(m).darken(3).hex()), C();
          });
        });
      }
      this.primaryColor = Sr(m).hex(), this.secondaryColor = Sr(m).brighten().hex(), this.darkColor = Sr(m).darken().hex(), this.lightColor = Sr(m).brighten(2.5).hex();
    }
  },
  mounted() {
    this.isMobile = Ce.isMobile;
  }
}, bl = { class: "cover" }, ml = ["src"], yl = { class: "progress" }, wl = { class: "time current" }, _l = { class: "bar__wrapper" }, kl = { class: "bar" }, Cl = { class: "time total" }, $l = { class: "meta" }, El = { class: "name song" }, xl = { class: "name artist" }, Il = { class: "controls" }, Ll = { class: "volume-control" }, Ml = { class: "bar" }, Al = {
  class: /* @__PURE__ */ Kr(["popup"])
}, Tl = { class: "wrapper" }, Bl = { class: "track-item float" }, Nl = { class: "thumb" }, Pl = ["src"], Sl = { class: "info" }, Rl = { class: "name" }, zl = { class: "artist" }, Fl = { class: "progress" }, Ul = { class: "time" }, Ol = { class: "text" }, Dl = { class: "text" }, jl = { class: "bar" }, Hl = ["onClick"], Vl = { class: "thumb" }, ql = ["src"], Yl = { class: "info" }, Gl = { class: "name" }, Wl = { class: "artist" };
function Xl(a, v, p, m, E, C) {
  const U = Oe("icon"), X = Oe("Lrc");
  return Fr(), Hr("div", {
    class: Kr(["player"]),
    style: ze(C.cssVars)
  }, [
    ar("div", bl, [
      ar("img", {
        class: "image",
        src: C.currentTrack.cover,
        alt: "cover",
        draggable: "false",
        loading: "lazy",
        onError: v[0] || (v[0] = (...A) => C.setAltImg && C.setAltImg(...A))
      }, null, 40, ml)
    ]),
    ar("div", {
      class: Kr(["info", E.display === "thumb" ? "thumb" : "popup"])
    }, [
      ar("div", yl, [
        ar("div", wl, zr(a.$props.currentTimeReadable), 1),
        ar("div", _l, [
          ar("div", {
            class: "bar__toucharea",
            ref: "progress",
            onClick: v[1] || (v[1] = (A) => C.handleClickProgressBarEvent(A, "progress"))
          }, [
            ar("div", kl, [
              ar("div", {
                class: "fill",
                style: ze({
                  width: `calc(${100 * a.$props.currentTimeRatio}% + ${a.$props.currentTimeRatio > 0 ? 6 : 0}px)`
                })
              }, null, 4)
            ])
          ], 512)
        ]),
        ar("div", Cl, zr(a.$props.durationReadable), 1)
      ]),
      ar("div", $l, [
        ar("div", El, zr(C.currentTrack.name), 1),
        ar("div", xl, zr(C.currentTrack.artist), 1)
      ]),
      ar("div", Il, [
        (Fr(!0), Hr(wt, null, _t(C.buttons, (A, L) => (Fr(), Hr("div", {
          key: L,
          class: Kr(["button", ...A.classes])
        }, [
          ar("div", Ll, [
            A.volume ? (Fr(), Hr("div", {
              key: 0,
              class: "toucharea",
              ref_for: !0,
              ref: "volume",
              onClick: v[2] || (v[2] = (...H) => C.handleClickVolumeBarEvent && C.handleClickVolumeBarEvent(...H))
            }, [
              ar("div", Ml, [
                ar("div", {
                  class: "fill",
                  style: ze({
                    height: `calc(${100 * a.$props.volume}% + ${a.$props.volume > 0 ? 6 : 0}px)`
                  })
                }, null, 4)
              ])
            ], 512)) : Zn("", !0)
          ]),
          Yn(U, {
            name: A.icon,
            onClick: (H) => C.handleButtonClickEvent(A)
          }, null, 8, ["name", "onClick"])
        ], 2))), 128))
      ]),
      ar("div", Al, [
        ar("div", Tl, [
          ar("div", Bl, [
            ar("div", Nl, [
              ar("img", {
                class: "image",
                src: C.currentTrack.cover,
                alt: "thumb",
                loading: "lazy",
                onError: v[3] || (v[3] = (...A) => C.setAltImg && C.setAltImg(...A))
              }, null, 40, Pl)
            ]),
            ar("div", Sl, [
              ar("div", Rl, zr(C.currentTrack.name), 1),
              ar("div", zl, zr(C.currentTrack.artist), 1),
              ar("div", Fl, [
                ar("div", Ul, [
                  ar("div", Ol, zr(a.$props.currentTimeReadable), 1),
                  ar("div", Dl, zr(a.$props.durationReadable), 1)
                ]),
                ar("div", {
                  class: "toucharea",
                  ref: "progressMini",
                  onClick: v[4] || (v[4] = (A) => C.handleClickProgressBarEvent(A, "progressMini"))
                }, [
                  ar("div", jl, [
                    ar("div", {
                      class: "fill",
                      style: ze({
                        width: `calc(${100 * a.$props.currentTimeRatio}% + ${a.$props.currentTimeRatio > 0 ? 6 : 0}px)`
                      })
                    }, null, 4)
                  ])
                ], 512)
              ])
            ])
          ]),
          ar("div", {
            class: Kr(["list", E.display === "list" ? "display" : "hide"])
          }, [
            (Fr(!0), Hr(wt, null, _t(a.$props.playList, (A, L) => (Fr(), Hr("div", {
              key: L,
              class: Kr([
                "track-item",
                L === a.$props.currentIndex ? "current" : "",
                L === a.$props.currentIndex - 1 ? "last-counterpart" : ""
              ]),
              onClick: (H) => C.handlePlaySpecifiedTrackEvent(L)
            }, [
              ar("div", Vl, [
                ar("img", {
                  class: "image",
                  src: A.cover,
                  alt: "thumb",
                  loading: "lazy",
                  onError: v[5] || (v[5] = (...H) => C.setAltImg && C.setAltImg(...H))
                }, null, 40, ql)
              ]),
              ar("div", Yl, [
                ar("div", Gl, zr(A.name), 1),
                ar("div", Wl, zr(A.artist), 1)
              ])
            ], 10, Hl))), 128))
          ], 2),
          ar("div", {
            class: Kr(["lrc", E.display === "lrc" ? "display" : "hide"])
          }, [
            Yn(X, {
              lrc: C.currentTrack.lrc,
              currentTime: a.$props.currentTime,
              onSeek: C.handleSeekEvent
            }, null, 8, ["lrc", "currentTime", "onSeek"])
          ], 2)
        ])
      ])
    ], 2)
  ], 4);
}
const Jl = /* @__PURE__ */ je(pl, [["render", Xl], ["__scopeId", "data-v-c1cb4050"]]), mt = [["0", "Pending"]], Zl = [["0", "Loading"]], yt = [["0", "Not available"]], Ql = {
  name: "Player",
  components: { Track: Jl },
  props: {
    playList: {
      type: Array,
      required: !0
    },
    options: {
      type: Object,
      default() {
        return {
          preload: "metadata",
          autoplay: !0
        };
      }
    }
  },
  setup(a) {
    const v = Jn({
      history: {},
      order: [],
      playListHash: [],
      trackData: {},
      currentIndex: 0,
      playList: $e(() => a.playList.map((p) => {
        const m = Gn(p);
        let E;
        return v.trackData[m] && v.trackData[m].lrc ? E = v.trackData[m].lrc : E = mt, {
          hash: m,
          audio: p.audio,
          cover: p.cover,
          name: p.name,
          artist: p.artist,
          lrc: E,
          color: p.color
        };
      })),
      currentPlayListIndex: $e(() => v.playListHash.indexOf(v.history[v.currentIndex]))
    });
    return {
      state: v
    };
  },
  data() {
    return {
      audio: null,
      duration: NaN,
      durationReadable: "00:00",
      progress: 0,
      currentTime: NaN,
      currentTimeReadable: "00:00",
      currentTimeRatio: 0,
      isPlaying: !1,
      isLoading: !1,
      pendingPlay: !1,
      canPlay: !1,
      volume: Number(ke.get("volume")) ? Number(ke.get("volume")) : 0.5,
      eventRemovers: [],
      playMode: 0
    };
  },
  watch: {
    playList: {
      handler(a) {
        a.forEach((v) => {
          const p = Gn(v);
          this.state.trackData[p] = {
            audio: v.audio,
            info: {
              audio: v.audio,
              cover: v.cover,
              name: v.name,
              artist: v.artist,
              lrc: v.lrc,
              color: v.color
            },
            lrc: mt
          }, this.state.order.push(p), this.state.playListHash.push(p);
        });
      },
      deep: !0,
      immediate: !0
    }
  },
  methods: {
    resetPlayerState() {
      this.eventRemovers.forEach((a) => a()), this.audio && (this.audio.removeAttribute("src"), this.audio.load()), this.audio = null, this.duration = NaN, this.durationReadable = "00:00", this.progress = 0, this.currentTime = NaN, this.currentTimeReadable = "00:00", this.currentTimeRatio = 0, this.isPlaying = !1, this.isLoading = !1, this.pendingPlay = !1, this.canPlay = !1, this.eventRemovers = [];
    },
    async load(a) {
      this.resetPlayerState(), this.audio = new Audio(this.state.trackData[a].info.audio), this.audio.preload = this.$props.options.preload, this.audio.volume = this.volume, this.loadLrc(a, this.state.trackData[a].info.lrc), this.customAddEventListener(this.audio, "loadstart", this.handleLoadstartEvent), this.customAddEventListener(this.audio, "progress", this.handleProgressEvent), this.customAddEventListener(this.audio, "durationchange", this.handleDurationchangeEvent), this.customAddEventListener(this.audio, "canplay", this.handleCanplayEvent), this.customAddEventListener(this.audio, "canplaythrough", this.handleCanplaythroughEvent), this.customAddEventListener(this.audio, "timeupdate", this.handleTimeupdateEvent), this.customAddEventListener(this.audio, "ended", this.handleEndedEvent);
    },
    async loadLrc(a, v) {
      if (!v) {
        this.state.trackData[a].lrc = yt;
        return;
      }
      this.state.trackData[a].lrc = Zl;
      let p;
      if (/^(http|https):\/\//.test(v)) {
        const m = v;
        await new Promise((E) => {
          const C = new XMLHttpRequest();
          C.onload = () => {
            p = C.response, E();
          }, C.onerror = () => {
            console.warn(`** An error occurred during fetching ${m}`), p = `[00:00.000]${yt[0][1]}`, E();
          }, C.open("GET", m, !0), C.responseType = "text", C.send();
        });
      } else
        p = v;
      try {
        this.state.trackData[a].lrc = Ce.parseLrc(p);
      } catch (m) {
        console.warn(m), this.state.trackData[a].lrc = yt;
      }
    },
    playSpecifiedSong(a) {
      this.state.history[this.state.currentIndex] = a, this.load(a);
    },
    playUserSelectedSong(a) {
      Object.keys(this.state.history).forEach((v) => {
        v > this.state.currentIndex && delete this.state.history[v];
      }), this.state.currentIndex, this.state.currentIndex += 1, this.state.history[this.state.currentIndex] = a, this.load(a);
    },
    next() {
      this.state.currentIndex += 1;
      let a;
      if (this.state.history[this.state.currentIndex])
        a = this.state.history[this.state.currentIndex];
      else {
        const v = this.state.order.indexOf(
          this.state.history[this.state.currentIndex - 1]
        );
        v + 1 < this.state.order.length ? a = this.state.order[v + 1] : a = this.state.order[0];
      }
      this.playSpecifiedSong(a), this.pendingPlay = !0;
    },
    prev() {
      this.state.currentIndex -= 1;
      let a;
      if (this.state.history[this.state.currentIndex])
        a = this.state.history[this.state.currentIndex];
      else {
        const v = this.state.order.indexOf(
          this.state.history[this.state.currentIndex + 1]
        );
        v - 1 > -1 ? a = this.state.order[v - 1] : a = this.state.order[this.state.order.length - 1];
      }
      this.playSpecifiedSong(a), this.pendingPlay = !0;
    },
    init() {
      const a = this.state.order[this.state.currentIndex];
      this.playSpecifiedSong(a);
    },
    handleLoadstartEvent(a) {
      this.isLoading = !0;
    },
    handleCanplayEvent(a) {
      this.canPlay = !0, this.pendingPlay && (this.play(), this.pendingPlay = !1);
    },
    handleCanplaythroughEvent(a) {
      this.audio.removeEventListener("progress", this.handleProgressEvent), this.progress = 1, this.isLoading = !1;
    },
    handleProgressEvent(a) {
      this.progress = this.audio.buffered.length ? this.audio.buffered.end(this.audio.buffered.length - 1) / this.duration : 0;
    },
    handleDurationchangeEvent(a) {
      this.duration = this.audio.duration, this.durationReadable = Ce.secondToTime(this.duration);
    },
    handleTimeupdateEvent(a) {
      this.currentTime = this.audio.currentTime, this.currentTimeReadable = Ce.secondToTime(this.currentTime), this.currentTimeRatio = this.currentTime / this.duration;
    },
    handleEndedEvent(a) {
      this.next();
    },
    handleTogglePlayPauseEvent() {
      this.canPlay || this.audio.load(), this.isPlaying ? this.pause() : this.play();
    },
    handleSeekEvent(a) {
      !this.canPlay || this.seek(a);
    },
    handleChangeVolumeEvent(a) {
      this.setVolume(a);
    },
    handleNextEvent() {
      this.next();
    },
    handlePrevEvent() {
      this.prev();
    },
    handleToggleMuteEvent() {
      if (this.volume > 0)
        ke.set("volume_mute_save", this.volume), this.setVolume(0);
      else {
        const a = ke.get("volume_mute_save");
        a ? this.setVolume(a) : this.setVolume(0.5);
      }
    },
    handlePlayTrackEvent(a) {
      const v = this.state.playListHash[a];
      this.playUserSelectedSong(v), this.pendingPlay = !0;
    },
    handleChangePlayModeEvent() {
      this.playMode = this.playMode < 2 ? this.playMode + 1 : 0, this.playMode === 0 ? this.state.order = this.state.playListHash : this.playMode === 1 ? this.state.order = Ce.shuffleArray(this.state.playListHash) : this.playMode === 2 && (this.state.order = [this.state.playListHash[this.state.currentPlayListIndex]]);
    },
    seek(a) {
      if (!this.canPlay)
        return;
      let v = a;
      v = Math.max(a, 0), v = Math.min(a, this.duration), this.audio.currentTime = v;
    },
    setVolume(a) {
      let v = a;
      v = Math.max(a, 0), v = Math.min(a, 1), this.volume = v, ke.set("volume", v), this.audio.volume = this.volume;
    },
    async play() {
      this.audio || this.init(), this.canPlay ? (this.isPlaying = !0, await this.audio.play()) : this.pendingPlay = !0;
    },
    async pause() {
      this.isPlaying = !1, await this.audio.pause();
    },
    customAddEventListener(a, v, p) {
      a.addEventListener(v, p), this.eventRemovers.push(() => a.removeEventListener("loadstart", p));
    }
  },
  mounted() {
    this.init(), this.$props.options.autoplay && this.play();
  }
};
function Kl(a, v, p, m, E, C) {
  const U = Oe("Track");
  return Fr(), Qn(U, {
    playList: m.state.playList,
    currentIndex: m.state.currentPlayListIndex,
    duration: E.duration,
    durationReadable: E.durationReadable,
    currentTime: E.currentTime,
    currentTimeRatio: E.currentTimeRatio,
    currentTimeReadable: E.currentTimeReadable,
    isPlaying: E.isPlaying,
    volume: E.volume,
    playMode: E.playMode,
    onTogglePlayPause: C.handleTogglePlayPauseEvent,
    onNext: C.handleNextEvent,
    onPrev: C.handlePrevEvent,
    onSeek: C.handleSeekEvent,
    onChangeVolume: C.handleChangeVolumeEvent,
    onToggleMute: C.handleToggleMuteEvent,
    onPlayTrack: C.handlePlayTrackEvent,
    onChangePlayMode: C.handleChangePlayModeEvent
  }, null, 8, ["playList", "currentIndex", "duration", "durationReadable", "currentTime", "currentTimeRatio", "currentTimeReadable", "isPlaying", "volume", "playMode", "onTogglePlayPause", "onNext", "onPrev", "onSeek", "onChangeVolume", "onToggleMute", "onPlayTrack", "onChangePlayMode"]);
}
const ru = /* @__PURE__ */ je(Ql, [["render", Kl]]);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var De = function() {
  return De = Object.assign || function(v) {
    for (var p, m = 1, E = arguments.length; m < E; m++) {
      p = arguments[m];
      for (var C in p)
        Object.prototype.hasOwnProperty.call(p, C) && (v[C] = p[C]);
    }
    return v;
  }, De.apply(this, arguments);
};
function eu(a, v) {
  return a = Math.ceil(a), v = Math.floor(v), Math.floor(Math.random() * (v - a)) + a;
}
var Wn = 0, Xn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", tu = {
  genUID: function() {
    return Wn++, Wn + "_" + [1, 2, 3, 4, 5].map(function() {
      return Xn[eu(0, Xn.length)];
    }).join("");
  }
}, Wr = {
  defaultWidth: "",
  defaultHeight: "",
  classPrefix: "svg",
  isStroke: !1,
  isOriginalDefault: !1
};
function nu(a) {
  return a = De({}, a), Object.keys(a).forEach(function(v) {
    a[v] === void 0 && delete a[v];
  }), typeof a.original == "string" && (a.original = !0), typeof a.fill == "string" && (a.fill = !0), De({
    width: Wr.defaultWidth,
    height: Wr.defaultHeight,
    fill: !Wr.isStroke,
    original: !!Wr.isOriginalDefault
  }, a);
}
function au(a) {
  return Array.isArray(a.color) ? a.color : a.color ? a.color.split(" ") : [];
}
function ou(a) {
  var v = Wr.classPrefix + "-icon";
  return a.fill && (v += " " + Wr.classPrefix + "-fill"), a.dir && (v += " " + Wr.classPrefix + "-" + a.dir), v;
}
function iu(a, v) {
  if (v.title) {
    var p = v.title.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/&/g, "&amp;");
    return "<title>" + p + "</title>" + a;
  }
  return a;
}
function su(a) {
  var v = /_fill="|_stroke="/gi;
  return a.replace(v, function(p) {
    return p && p.slice(1);
  });
}
function lu(a, v, p) {
  if (v.original && p.length > 0) {
    var m = /<(path|rect|circle|polygon|line|polyline|ellipse)(\sfill|\sstroke)([="\w\s.\-+#$&>]+)(fill|stroke)/gi;
    a = a.replace(m, function(E, C, U, X, A) {
      return "<" + C + U + X + "_" + A;
    });
  }
  return a;
}
function uu(a, v, p) {
  var m = /<(path|rect|circle|polygon|line|polyline|ellipse)\s/gi, E = 0;
  return a.replace(m, function(C) {
    var U = p[E++] || p[p.length - 1], X = v.fill;
    if (U && U === "_")
      return C;
    U && /^r-/.test(U) && (X = !X, U = U.substr(2));
    var A = X ? "fill" : "stroke", L = X ? "stroke" : "fill";
    return C + (A + '="' + U + '" ' + L + '="none" ');
  });
}
function cu(a, v) {
  var p = /stop-color="([\w,#\s'()-_]+)"/gi, m = v.stopColors || [], E = 0;
  return a.replace(p, function(C, U) {
    return U = m[E++] || U, 'stop-color="' + U + '"';
  });
}
function fu(a, v, p) {
  var m, E = tu.genUID(), C = "";
  if (p) {
    C = p.data, C = iu(C, a), a.original && (C = su(C)), v.length > 0 && (C = uu(C, a, v)), !((m = a.stopColors) === null || m === void 0) && m.length && (C = cu(C, a));
    var U = /svgiconid([\w-/\\]+)/g;
    C = C.replace(U, function(X, A) {
      return "svgiconid" + A + "_" + E;
    });
  }
  return lu(C, a, v);
}
function hu(a, v) {
  if (v)
    return v.viewBox ? v.viewBox : "0 0 " + v.width + " " + v.height;
  var p = typeof a.width == "number" ? a.width : parseFloat(a.width || "16"), m = typeof a.height == "number" ? a.height : parseFloat(a.height || "16");
  return "0 0 " + p + " " + m;
}
function du(a, v) {
  var p = /^\d+$/, m = a.scale, E = m !== "" && m !== void 0 && m !== null, C, U;
  E && v && v.width && v.height ? (C = Number(v.width) * Number(m) + "px", U = Number(v.height) * Number(m) + "px") : (C = p.test(String(a.width || "")) ? a.width + "px" : a.width || Wr.defaultWidth, U = p.test(String(a.height || "")) ? a.height + "px" : a.height || Wr.defaultHeight);
  var X = {};
  return C && (X.width = C), U && (X.height = U), X;
}
function vu() {
  return [
    "data",
    "color",
    "stopColors",
    "dir",
    "fill",
    "height",
    "width",
    "title",
    "scale",
    "original"
  ];
}
function gu(a) {
  a = nu(a);
  var v = au(a), p = a.data && a.data.data ? a.data.data : null, m = fu(a, v, p), E = ou(a), C = hu(a, p), U = du(a, p);
  return {
    path: m,
    box: C,
    className: E,
    style: U
  };
}
var pu = al({
  props: vu(),
  render: function() {
    var a = gu(this.$props);
    return Kn("svg", {
      viewBox: a.box,
      style: a.style,
      class: a.className,
      innerHTML: a.path
    });
  }
}), bu = {
  install: function(a, v) {
    a.component(v.tagName, pu);
  }
};
const mu = { name: "src/assets/icons/backward", data: { viewBox: "0 0 512 512", data: '<path pid="0" d="m11.5 280.6 192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0 192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z"/>', originalColors: [], stopColors: [] } }, yu = { name: "src/assets/icons/bars", data: { viewBox: "0 0 448 512", data: '<path pid="0" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/>', originalColors: [], stopColors: [] } }, wu = { name: "src/assets/icons/forward", data: { viewBox: "0 0 512 512", data: '<path pid="0" d="m500.5 231.4-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"/>', originalColors: [], stopColors: [] } }, _u = { name: "src/assets/icons/pause", data: { viewBox: "0 0 448 512", data: '<path pid="0" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"/>', originalColors: [], stopColors: [] } }, ku = { name: "src/assets/icons/play", data: { viewBox: "0 0 448 512", data: '<path pid="0" d="M424.4 214.7 72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/>', originalColors: [], stopColors: [] } }, Cu = { name: "src/assets/icons/plus", data: { viewBox: "0 0 448 512", data: '<path pid="0" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>', originalColors: [], stopColors: [] } }, $u = { name: "src/assets/icons/random", data: { viewBox: "0 0 512 512", data: '<path pid="0" d="M504.971 359.029c9.373 9.373 9.373 24.569 0 33.941l-80 79.984c-15.01 15.01-40.971 4.49-40.971-16.971V416h-58.785a12.004 12.004 0 0 1-8.773-3.812l-70.556-75.596 53.333-57.143L352 336h32v-39.981c0-21.438 25.943-31.998 40.971-16.971l80 79.981zM12 176h84l52.781 56.551 53.333-57.143-70.556-75.596A11.999 11.999 0 0 0 122.785 96H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12zm372 0v39.984c0 21.46 25.961 31.98 40.971 16.971l80-79.984c9.373-9.373 9.373-24.569 0-33.941l-80-79.981C409.943 24.021 384 34.582 384 56.019V96h-58.785a12.004 12.004 0 0 0-8.773 3.812L96 336H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h110.785c3.326 0 6.503-1.381 8.773-3.812L352 176h32z"/>', originalColors: [], stopColors: [] } }, Eu = { name: "src/assets/icons/repeat-1", data: { viewBox: "0 0 512 512", data: '<path pid="0" d="M512 256c0 88.224-71.775 160-160 160H170.067l34.512 32.419c9.875 9.276 10.119 24.883.539 34.464l-10.775 10.775c-9.373 9.372-24.568 9.372-33.941 0l-92.686-92.686c-9.373-9.373-9.373-24.568 0-33.941l80.269-80.27c9.373-9.373 24.568-9.373 33.941 0l10.775 10.775c9.581 9.581 9.337 25.187-.539 34.464l-22.095 20H352c52.935 0 96-43.065 96-96 0-13.958-2.996-27.228-8.376-39.204-4.061-9.039-2.284-19.626 4.723-26.633l12.183-12.183c11.499-11.499 30.965-8.526 38.312 5.982C505.814 205.624 512 230.103 512 256zM72.376 295.204C66.996 283.228 64 269.958 64 256c0-52.935 43.065-96 96-96h181.933l-22.095 20.002c-9.875 9.276-10.119 24.883-.539 34.464l10.775 10.775c9.373 9.372 24.568 9.372 33.941 0l80.269-80.27c9.373-9.373 9.373-24.568 0-33.941l-92.686-92.686c-9.373-9.373-24.568-9.373-33.941 0l-10.775 10.775c-9.581 9.581-9.337 25.187.539 34.464L341.933 96H160C71.775 96 0 167.776 0 256c0 25.897 6.186 50.376 17.157 72.039 7.347 14.508 26.813 17.481 38.312 5.982l12.183-12.183c7.008-7.008 8.786-17.595 4.724-26.634zm154.887 4.323c0-7.477 3.917-11.572 11.573-11.572h15.131v-39.878c0-5.163.534-10.503.534-10.503h-.356s-1.779 2.67-2.848 3.738c-4.451 4.273-10.504 4.451-15.666-1.068l-5.518-6.231c-5.342-5.341-4.984-11.216.534-16.379l21.72-19.939c4.449-4.095 8.366-5.697 14.42-5.697h12.105c7.656 0 11.749 3.916 11.749 11.572v84.384h15.488c7.655 0 11.572 4.094 11.572 11.572v8.901c0 7.477-3.917 11.572-11.572 11.572h-67.293c-7.656 0-11.573-4.095-11.573-11.572v-8.9z"/>', originalColors: [], stopColors: [] } }, xu = { name: "src/assets/icons/repeat", data: { viewBox: "0 0 512 512", data: '<path pid="0" d="M512 256c0 88.224-71.775 160-160 160H170.067l34.512 32.419c9.875 9.276 10.119 24.883.539 34.464l-10.775 10.775c-9.373 9.372-24.568 9.372-33.941 0l-92.686-92.686c-9.373-9.373-9.373-24.568 0-33.941l92.686-92.686c9.373-9.373 24.568-9.373 33.941 0l10.775 10.775c9.581 9.581 9.337 25.187-.539 34.464L170.067 352H352c52.935 0 96-43.065 96-96 0-13.958-2.996-27.228-8.376-39.204-4.061-9.039-2.284-19.626 4.723-26.633l12.183-12.183c11.499-11.499 30.965-8.526 38.312 5.982C505.814 205.624 512 230.103 512 256zM72.376 295.204C66.996 283.228 64 269.958 64 256c0-52.935 43.065-96 96-96h181.933l-34.512 32.419c-9.875 9.276-10.119 24.883-.539 34.464l10.775 10.775c9.373 9.372 24.568 9.372 33.941 0l92.686-92.686c9.373-9.373 9.373-24.568 0-33.941l-92.686-92.686c-9.373-9.373-24.568-9.373-33.941 0L306.882 29.12c-9.581 9.581-9.337 25.187.539 34.464L341.933 96H160C71.775 96 0 167.776 0 256c0 25.897 6.186 50.376 17.157 72.039 7.347 14.508 26.813 17.481 38.312 5.982l12.183-12.183c7.008-7.008 8.786-17.595 4.724-26.634z"/>', originalColors: [], stopColors: [] } }, Iu = { name: "src/assets/icons/scroll-old", data: { viewBox: "0 0 640 512", data: '<path pid="0" d="M48 0C21.53 0 0 21.53 0 48v64c0 8.84 7.16 16 16 16h80V48C96 21.53 74.47 0 48 0zm208 412.57V352h288v-57.37c0-4.24-1.69-8.31-4.69-11.31L512 256l27.31-27.31c3-3 4.69-7.07 4.69-11.31v-50.75c0-4.24-1.69-8.31-4.69-11.31L512 128l26.86-26.86c3.27-3.27 5.21-7.84 4.86-12.45C539.98 39.15 498.48 0 448 0H111.59C121.74 13.41 128 29.92 128 48v137.37c0 4.24 1.69 8.31 4.69 11.31L160 224l-27.31 27.31c-3 3-4.69 7.07-4.69 11.31V416c0 38.87 34.65 69.65 74.75 63.12C234.22 474 256 444.46 256 412.57zm187.31-23.88L416 416l-27.31-27.31c-3-3-7.07-4.69-11.31-4.69H288v32c0 52.93-43.06 96-96 96h336c61.86 0 112-50.14 112-112 0-8.84-7.16-16-16-16H454.63c-4.25 0-8.32 1.69-11.32 4.69z"/>', originalColors: [], stopColors: [] } }, Lu = { name: "src/assets/icons/times", data: { viewBox: "0 0 352 512", data: '<path pid="0" d="m242.72 256 100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>', originalColors: [], stopColors: [] } }, Mu = { name: "src/assets/icons/volume-down", data: { viewBox: "0 0 576 512", data: '<path pid="0" d="M215.03 72.04 126.06 161H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V89.02c0-21.47-25.96-31.98-40.97-16.98zm123.2 108.08c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 229.28 336 242.62 336 257c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.87z"/>', originalColors: [], stopColors: [] } }, Au = { name: "src/assets/icons/volume-mute", data: { viewBox: "0 0 576 512", data: '<path pid="0" d="M215.03 71.05 126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"/>', originalColors: [], stopColors: [] } }, Tu = { name: "src/assets/icons/volume-off", data: { viewBox: "0 0 576 512", data: '<path pid="0" d="m215 71-89 89H24a24 24 0 0 0-24 24v144a24 24 0 0 0 24 24h102.06L215 441c15 15 41 4.47 41-17V88c0-21.47-26-32-41-17z"/>', originalColors: [], stopColors: [] } }, Bu = { name: "src/assets/icons/volume-up", data: { viewBox: "0 0 576 512", data: '<path pid="0" d="M215.03 71.05 126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"/>', originalColors: [], stopColors: [] } }, Nu = { name: "src/assets/icons/volume", data: { viewBox: "0 0 576 512", data: '<path pid="0" d="M215.03 71.05 126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.53 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"/>', originalColors: [], stopColors: [] } }, Pu = {
  name: "Icon",
  props: {
    name: { type: String }
  },
  data() {
    return {
      svg: {
        backward: mu,
        bars: yu,
        forward: wu,
        pause: _u,
        play: ku,
        plus: Cu,
        random: $u,
        "repeat-1": Eu,
        repeat: xu,
        "scroll-old": Iu,
        times: Lu,
        "volume-down": Mu,
        "volume-mute": Au,
        "volume-off": Tu,
        "volume-up": Bu,
        volume: Nu
      }
    };
  }
};
function Su(a, v, p, m, E, C) {
  const U = Oe("svg-icon");
  return Fr(), Qn(U, {
    data: E.svg[a.$props.name],
    original: ""
  }, null, 8, ["data"]);
}
const Ru = /* @__PURE__ */ je(Pu, [["render", Su]]), zu = (a, v) => {
  const p = {
    container: v.container || "#app",
    autoplay: !1,
    preload: "metadata",
    color: null,
    playMode: "order",
    volume: 0.7,
    storageName: "alice-player-setting"
  };
  for (const m in p)
    p.hasOwnProperty(m) && !v.hasOwnProperty(m) ? p[m] = p[m] : p[m] = v[m];
  return a = a || v.playList, a = a.map((m) => ({
    name: m.name || m.title || m.song || "Audio name",
    artist: m.artist || m.author || m.singer || "Audio artist",
    cover: m.cover || m.pic || m.thumb || m.thumbnail || Ee,
    thumbnail: m.thumb || m.thumbnail || m.cover || m.pic || Ee,
    audio: m.audio || m.src,
    lrc: m.lrc,
    color: m.color || v.color || null
  })), { playList: a, options: p };
};
class Uu {
  constructor(v, p) {
    const m = zu(v, p);
    this.playList = m.playList, this.options = m.options, this.createPlayer();
  }
  createPlayer() {
    const { playList: v, options: p } = this, E = ol({
      render() {
        return Kn(ru, { playList: v, options: p });
      }
    });
    E.use(bu, {
      tagName: "svg-icon"
    }), E.component("Icon", Ru), window.vm = E.mount(this.options.container);
  }
}
export {
  Uu as default
};
//# sourceMappingURL=alice-player.es.js.map
