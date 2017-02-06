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
	var Matthew;
	(function (Matthew) {
	    Matthew.PI = Math.PI;
	    Matthew.H_PI = Math.PI / 2;
	    Matthew.D_PI = Math.PI * 2;
	    Matthew.normalize = function (r) {
	        r = r % Matthew.D_PI;
	        if (r < 0)
	            return Matthew.D_PI + r;
	        return r;
	    };
	    Matthew.abs = function (v) {
	        return v < 0 ? -v : v;
	    };
	})(Matthew || (Matthew = {}));
	window["UTILS"] = UTILS;
	window["Matthew"] = Matthew;


/***/ }
/******/ ]);