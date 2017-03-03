/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var UTILS;
	(function (UTILS) {
	    var Pos = (function () {
	        function Pos(x, y) {
	            if (x === void 0) { x = 0; }
	            if (y === void 0) { y = 0; }
	            this.x = 0;
	            this.y = 0;
	            this.x = x;
	            this.y = y;
	        }
	        Pos.prototype.clone = function () {
	            return new Pos(this.x, this.y);
	        };
	        Pos.prototype.equals = function (pos, diff) {
	            if (diff === void 0) { diff = 1; }
	            var dx = pos.x - this.x;
	            var dy = pos.y - this.y;
	            return dx * dx + dy * dy < diff;
	        };
	        Pos.prototype.round = function (n) {
	            n = Math.pow(10, n);
	            this.x = Math.floor(this.x * n) / n;
	            this.y = Math.floor(this.y * n) / n;
	        };
	        return Pos;
	    }());
	    UTILS.Pos = Pos;
	    var VecPos = (function () {
	        function VecPos(x, y, r) {
	            if (x === void 0) { x = 0; }
	            if (y === void 0) { y = 0; }
	            if (r === void 0) { r = 0; }
	            this.r = 0;
	            this.pos = new Pos(x, y);
	            this.r = r;
	        }
	        VecPos.prototype.clone = function () {
	            return new VecPos(this.pos.x, this.pos.y, this.r);
	        };
	        VecPos.prototype.add = function (radius) {
	            this.r += radius;
	            return this;
	        };
	        return VecPos;
	    }());
	    UTILS.VecPos = VecPos;
	    var Circle = (function () {
	        function Circle(x, y, r, d, tr) {
	            this.pos = new Pos(x, y);
	            this.r = r;
	            this.d = d;
	            this.tr = Matthew.normalize(tr);
	        }
	        return Circle;
	    }());
	    UTILS.Circle = Circle;
	})(UTILS || (UTILS = {}));
	var UTILS;
	(function (UTILS) {
	    var Color = (function () {
	        function Color(color) {
	            if (color === void 0) { color = 0; }
	            var _this = this;
	            this.getColor = function () { return _this.color; };
	            this.getR = function () { return _this.r; };
	            this.getG = function () { return _this.g; };
	            this.getB = function () { return _this.b; };
	            this.getH = function () { return _this.h; };
	            this.getS = function () { return _this.s; };
	            this.getV = function () { return _this.v; };
	            this.setColor(color);
	        }
	        Color.prototype.clone = function () {
	            return new Color(this.color);
	        };
	        Color.prototype.setColor = function (color) {
	            var r = color >> 16 & 0xff;
	            var g = color >> 8 & 0xff;
	            var b = color & 0xff;
	            this.color = color;
	            this.setRGB(r, g, b);
	            return this;
	        };
	        /*
	            setHSV and setRGB -> https://gist.github.com/mjackson/5311256
	        */
	        Color.prototype.setHSV = function (h, s, v) {
	            if (h === void 0) { h = -1; }
	            if (s === void 0) { s = -1; }
	            if (v === void 0) { v = -1; }
	            h = h < 0 ? this.h : h;
	            s = s < 0 ? this.s : s;
	            v = v < 0 ? this.v : v;
	            var r, g, b;
	            var i = Math.floor(h * 6);
	            var f = h * 6 - i;
	            var p = v * (1 - s);
	            var q = v * (1 - f * s);
	            var t = v * (1 - (1 - f) * s);
	            switch (i % 6) {
	                case 0:
	                    r = v, g = t, b = p;
	                    break;
	                case 1:
	                    r = q, g = v, b = p;
	                    break;
	                case 2:
	                    r = p, g = v, b = t;
	                    break;
	                case 3:
	                    r = p, g = q, b = v;
	                    break;
	                case 4:
	                    r = t, g = p, b = v;
	                    break;
	                case 5:
	                    r = v, g = p, b = q;
	                    break;
	            }
	            this.r = r * 255;
	            this.g = g * 255;
	            this.b = b * 255;
	            this.h = h;
	            this.s = s;
	            this.v = v;
	            this.rgbToDecimal();
	            return this;
	        };
	        Color.prototype.setRGB = function (r, g, b) {
	            if (r === void 0) { r = -1; }
	            if (g === void 0) { g = -1; }
	            if (b === void 0) { b = -1; }
	            r = r < 0 ? this.r : r;
	            g = g < 0 ? this.g : g;
	            b = b < 0 ? this.b : b;
	            this.r = r;
	            this.g = g;
	            this.b = b;
	            r /= 255, g /= 255, b /= 255;
	            var max = Math.max(r, g, b), min = Math.min(r, g, b);
	            var h;
	            var v = max;
	            var d = max - min;
	            var s = max === 0 ? 0 : d / max;
	            if (max === min) {
	                h = 0;
	            }
	            else {
	                switch (max) {
	                    case r:
	                        h = (g - b) / d + (g < b ? 6 : 0);
	                        break;
	                    case g:
	                        h = (b - r) / d + 2;
	                        break;
	                    case b:
	                        h = (r - g) / d + 4;
	                        break;
	                }
	                h /= 6;
	            }
	            this.h = h;
	            this.s = s;
	            this.v = v;
	            this.rgbToDecimal();
	            return this;
	        };
	        Color.prototype.rgbToDecimal = function () {
	            this.color = (this.r << 16) + (this.g << 8) + (this.b);
	        };
	        Color.transformRGB = function (color, to, p) {
	            p = 1 - p;
	            var r = color.getR() - to.getR();
	            var g = color.getG() - to.getG();
	            var b = color.getB() - to.getB();
	            color.setRGB(to.getR() + r * p, to.getG() + g * p, to.getB() + b * p);
	        };
	        Color.transformHSV = function (color, to, p) {
	            p = 1 - p;
	            var h = color.getH() - to.getH();
	            var s = color.getS() - to.getS();
	            var v = color.getV() - to.getV();
	            color.setHSV(to.getH() + h * p, to.getS() + s * p, to.getV() + v * p);
	        };
	        return Color;
	    }());
	    UTILS.Color = Color;
	})(UTILS || (UTILS = {}));
	var Matthew;
	(function (Matthew) {
	    Matthew.PI = Math.PI;
	    Matthew.H_PI = Math.PI / 2;
	    Matthew.D_PI = Math.PI * 2;
	    function normalize(r) {
	        r = r % Matthew.D_PI;
	        if (r < 0)
	            return Matthew.D_PI + r;
	        return r;
	    }
	    Matthew.normalize = normalize;
	    function abs(v) {
	        return v < 0 ? -v : v;
	    }
	    Matthew.abs = abs;
	    function frandom(min, max) {
	        return min + (max - min) * Math.random();
	    }
	    Matthew.frandom = frandom;
	    function irandom(min, max) {
	        return Math.floor(min + (max - min + 1) * Math.random());
	    }
	    Matthew.irandom = irandom;
	})(Matthew || (Matthew = {}));
	var UTILS;
	(function (UTILS) {
	    function shuffle(array) {
	        var n = array.length, t, i;
	        while (n) {
	            i = Math.floor(Math.random() * n--);
	            t = array[n];
	            array[n] = array[i];
	            array[i] = t;
	        }
	        return array;
	    }
	    UTILS.shuffle = shuffle;
	    function def(value, defValue) {
	        if (typeof value === 'undefined')
	            return defValue;
	        return value;
	    }
	    UTILS.def = def;
	})(UTILS || (UTILS = {}));
	/// <reference path="./matthew.ts" />
	/// <reference path="./2d.ts" />
	/// <reference path="./color.ts" />
	/// <reference path="./others.ts" />
	window['UTILS'] = UTILS;
	window['Matthew'] = Matthew;


/***/ }
/******/ ]);