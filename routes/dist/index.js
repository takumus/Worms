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

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ROUTES;
	(function (ROUTES) {
	    var Line = (function () {
	        function Line(data) {
	            if (data === void 0) { data = []; }
	            this.data = [];
	            for (var i = 0; i < data.length; i++) {
	                var p = data[i];
	                this.data.push(new UTILS.Pos(p.x, p.y));
	            }
	            this.length = this.data.length;
	            this.prevOffset = new UTILS.Pos();
	        }
	        Line.prototype.setOffsetToAll = function (pos) {
	            for (var i = 0; i < this.length; i++) {
	                var p = this.at(i);
	                p.x += pos.x - this.prevOffset.x;
	                p.y += pos.y - this.prevOffset.y;
	            }
	            this.prevOffset = pos.clone();
	        };
	        Line.prototype.getWidth = function () {
	            var min = Number.MAX_VALUE;
	            var max = Number.MIN_VALUE;
	            for (var i = 0; i < this.length; i++) {
	                var p = this.at(i);
	                if (min > p.x)
	                    min = p.x;
	                else if (max < p.x)
	                    max = p.x;
	            }
	            return max - min;
	        };
	        Line.prototype.getHeight = function () {
	            var min = Number.MAX_VALUE;
	            var max = Number.MIN_VALUE;
	            for (var i = 0; i < this.length; i++) {
	                var p = this.at(i);
	                if (min > p.y)
	                    min = p.y;
	                else if (max < p.y)
	                    max = p.y;
	            }
	            return max - min;
	        };
	        Line.prototype.reverse = function () {
	            this.data.reverse();
	            return this;
	        };
	        Line.prototype.getHeadVecPos = function () {
	            return this.getVecPos(this.at(0), this.at(1));
	        };
	        Line.prototype.getTailVecPos = function () {
	            return this.getVecPos(this.at(this.length - 1), this.at(this.length - 2));
	        };
	        Line.prototype.getVecPos = function (fp, sp) {
	            return new UTILS.VecPos(fp.x, fp.y, Math.atan2(sp.y - fp.y, sp.x - fp.x));
	        };
	        Line.prototype.head = function () {
	            return this.at(0);
	        };
	        Line.prototype.tail = function () {
	            return this.at(this.length - 1);
	        };
	        Line.prototype.at = function (id) {
	            return this.data[id];
	        };
	        Line.prototype.push = function (pos) {
	            this.data.push(pos);
	            this.length = this.data.length;
	        };
	        Line.prototype.pop = function () {
	            this.length--;
	            return this.data.pop();
	        };
	        Line.prototype.shift = function () {
	            this.length--;
	            return this.data.shift();
	        };
	        Line.prototype.pushLine = function (line) {
	            if (line.head().equals(this.tail()))
	                line.shift();
	            var L = line.data.length;
	            for (var i = 0; i < L; i++) {
	                this.push(line.data[i].clone());
	            }
	            this.length = this.data.length;
	            return this;
	        };
	        Line.prototype.getLength = function () {
	            return this.length;
	        };
	        Line.prototype.clone = function () {
	            var data = [];
	            for (var i = 0; i < this.length; i++) {
	                data.push(this.data[i].clone());
	            }
	            return new Line(data);
	        };
	        Line.prototype.clear = function () {
	            this.data = [];
	            this.length = 0;
	        };
	        Line.prototype.wave = function (amp, freq, randomBegin) {
	            if (randomBegin === void 0) { randomBegin = false; }
	            var newData = [];
	            var rad = randomBegin ? Math.random() * (Math.PI * 2) : 0;
	            newData.push(this.at(0).clone());
	            for (var i = 1; i < this.length - 1; i++) {
	                var p = this.at(i);
	                var vx = this.at(i - 1).x - p.x;
	                var vy = this.at(i - 1).y - p.y;
	                var np = new UTILS.Pos();
	                var all = Math.sin(i / (this.length - 1) * Math.PI);
	                // all * allで開始、終了を極端にする。(先端への影響を少なく)
	                var offset = all * Math.sin(rad) * amp;
	                var vr = Math.sqrt(vx * vx + vy * vy);
	                rad += freq;
	                np.x = p.x + -(vy / vr * offset);
	                np.y = p.y + (vx / vr * offset);
	                newData.push(np);
	            }
	            newData.push(this.at(this.length - 1).clone());
	            this.data = newData;
	            return this;
	        };
	        return Line;
	    }());
	    ROUTES.Line = Line;
	})(ROUTES || (ROUTES = {}));
	var ROUTES;
	(function (ROUTES) {
	    var RouteGenerator = (function () {
	        function RouteGenerator() {
	        }
	        RouteGenerator.getMinimumRoute = function (vposB, vposE, rB, rE, res) {
	            var routes = this.getAllRoute(vposB, vposE, rB, rE);
	            var min = Number.MAX_VALUE;
	            var route;
	            for (var i = 0; i < routes.length; i++) {
	                var r = routes[i];
	                if (r.getLength() < min) {
	                    min = r.getLength();
	                    route = r;
	                }
	            }
	            ;
	            return route.generateRoute(res);
	        };
	        RouteGenerator.getAllRoute = function (vposB, vposE, rB, rE) {
	            var cB1 = new UTILS.Circle(Math.cos(vposB.r + Matthew.H_PI) * rB + vposB.pos.x, Math.sin(vposB.r + Matthew.H_PI) * rB + vposB.pos.y, rB, 1, vposB.r - Matthew.H_PI);
	            var cB2 = new UTILS.Circle(Math.cos(vposB.r - Matthew.H_PI) * rB + vposB.pos.x, Math.sin(vposB.r - Matthew.H_PI) * rB + vposB.pos.y, rB, -1, vposB.r + Matthew.H_PI);
	            var cE1 = new UTILS.Circle(Math.cos(vposE.r + Matthew.H_PI) * rE + vposE.pos.x, Math.sin(vposE.r + Matthew.H_PI) * rE + vposE.pos.y, rE, 1, vposE.r - Matthew.H_PI);
	            var cE2 = new UTILS.Circle(Math.cos(vposE.r - Matthew.H_PI) * rE + vposE.pos.x, Math.sin(vposE.r - Matthew.H_PI) * rE + vposE.pos.y, rE, -1, vposE.r + Matthew.H_PI);
	            var allRoute = [];
	            var route;
	            route = this.getRoute(cB1, cE1);
	            if (route)
	                allRoute.push(route);
	            route = this.getRoute(cB1, cE2);
	            if (route)
	                allRoute.push(route);
	            route = this.getRoute(cB2, cE1);
	            if (route)
	                allRoute.push(route);
	            route = this.getRoute(cB2, cE2);
	            if (route)
	                allRoute.push(route);
	            return allRoute;
	        };
	        RouteGenerator.getRoute = function (c1, c2) {
	            var dx = c2.pos.x - c1.pos.x;
	            var dy = c2.pos.y - c1.pos.y;
	            var l = dx * dx + dy * dy;
	            var a1 = new UTILS.Pos(), a2 = new UTILS.Pos(), b1 = new UTILS.Pos(), b2 = new UTILS.Pos();
	            var br = Math.atan2(c2.pos.y - c1.pos.y, c2.pos.x - c1.pos.x);
	            var c1tr = c1.tr;
	            var c2tr = c2.tr;
	            var c1r;
	            var c2r;
	            var c1dr;
	            var c2dr;
	            this.circle(c1.pos.x + Math.cos(c1tr) * c1.r, c1.pos.y + Math.sin(c1tr) * c1.r, 3);
	            this.circle(c2.pos.x + Math.cos(c2tr) * c2.r, c2.pos.y + Math.sin(c2tr) * c2.r, 3);
	            if (c1.d == c2.d) {
	                var d = l - (c2.r - c1.r) * (c2.r - c1.r);
	                if (d < 0)
	                    return null;
	                d = Math.sqrt(d);
	                a1.x = c1.r * ((c1.r - c2.r) * dx + d * dy) / l + c1.pos.x;
	                a1.y = c1.r * ((c1.r - c2.r) * dy - d * dx) / l + c1.pos.y;
	                a2.x = c1.r * ((c1.r - c2.r) * dx - d * dy) / l + c1.pos.x;
	                a2.y = c1.r * ((c1.r - c2.r) * dy + d * dx) / l + c1.pos.y;
	                b1.x = c2.r * ((c2.r - c1.r) * -dx - d * -dy) / l + c2.pos.x;
	                b1.y = c2.r * ((c2.r - c1.r) * -dy + d * -dx) / l + c2.pos.y;
	                b2.x = c2.r * ((c2.r - c1.r) * -dx + d * -dy) / l + c2.pos.x;
	                b2.y = c2.r * ((c2.r - c1.r) * -dy - d * -dx) / l + c2.pos.y;
	                var r = Math.atan2(a1.y - c1.pos.y, a1.x - c1.pos.x) - br;
	                if (c1.d > 0) {
	                    c2r = c1r = Matthew.normalize(r + br);
	                    this.line(a1.x, a1.y, b1.x, b1.y);
	                }
	                else {
	                    c2r = c1r = Matthew.normalize(-r + br);
	                    this.line(a2.x, a2.y, b2.x, b2.y);
	                }
	                this.line(c1.pos.x, c1.pos.y, Math.cos(c1r) * c1.r + c1.pos.x, Math.sin(c1r) * c1.r + c1.pos.y);
	                this.line(c2.pos.x, c2.pos.y, Math.cos(c2r) * c2.r + c2.pos.x, Math.sin(c2r) * c2.r + c2.pos.y);
	            }
	            else if (c1.d != c2.d) {
	                var d = l - (c2.r + c1.r) * (c2.r + c1.r);
	                if (d < 0)
	                    return null;
	                d = Math.sqrt(d);
	                a1.x = c1.r * ((c2.r + c1.r) * dx + d * dy) / l + c1.pos.x;
	                a1.y = c1.r * ((c2.r + c1.r) * dy - d * dx) / l + c1.pos.y;
	                a2.x = c1.r * ((c2.r + c1.r) * dx - d * dy) / l + c1.pos.x;
	                a2.y = c1.r * ((c2.r + c1.r) * dy + d * dx) / l + c1.pos.y;
	                b1.x = c2.r * ((c1.r + c2.r) * -dx + d * -dy) / l + c2.pos.x;
	                b1.y = c2.r * ((c1.r + c2.r) * -dy - d * -dx) / l + c2.pos.y;
	                b2.x = c2.r * ((c1.r + c2.r) * -dx - d * -dy) / l + c2.pos.x;
	                b2.y = c2.r * ((c1.r + c2.r) * -dy + d * -dx) / l + c2.pos.y;
	                var r = Math.atan2(a1.y - c1.pos.y, a1.x - c1.pos.x) - br;
	                if (c1.d > 0) {
	                    c1r = Matthew.normalize(r + br);
	                    c2r = Matthew.normalize(r + br + Matthew.PI);
	                    this.line(a1.x, a1.y, b1.x, b1.y);
	                }
	                else {
	                    c1r = Matthew.normalize(-r + br);
	                    c2r = Matthew.normalize(-r + br + Matthew.PI);
	                    this.line(a2.x, a2.y, b2.x, b2.y);
	                }
	                this.line(c1.pos.x, c1.pos.y, Math.cos(c1r) * c1.r + c1.pos.x, Math.sin(c1r) * c1.r + c1.pos.y);
	                this.line(c2.pos.x, c2.pos.y, Math.cos(c2r) * c2.r + c2.pos.x, Math.sin(c2r) * c2.r + c2.pos.y);
	            }
	            if (c1.d > 0) {
	                if (c1.tr < c1r) {
	                    c1dr = c1r - c1.tr;
	                }
	                else {
	                    c1dr = Matthew.D_PI - (c1.tr - c1r);
	                }
	            }
	            else {
	                if (c1.tr < c1r) {
	                    c1dr = Matthew.D_PI - (c1r - c1.tr);
	                }
	                else {
	                    c1dr = c1.tr - c1r;
	                }
	            }
	            if (c2.d > 0) {
	                if (c2r < c2.tr) {
	                    c2dr = c2.tr - c2r;
	                }
	                else {
	                    c2dr = Matthew.D_PI - (c2r - c2.tr);
	                }
	            }
	            else {
	                if (c2r < c2.tr) {
	                    c2dr = Matthew.D_PI - (c2.tr - c2r);
	                }
	                else {
	                    c2dr = c2r - c2.tr;
	                }
	            }
	            this.circle(c1.pos.x, c1.pos.y, 2);
	            this.circle(c2.pos.x, c2.pos.y, 2);
	            this.circle(c1.pos.x, c1.pos.y, c1.r);
	            this.circle(c2.pos.x, c2.pos.y, c2.r);
	            return new ROUTES.Route(c1, c2, c1.tr, c2r, c1dr * c1.d, c2dr * c2.d);
	        };
	        RouteGenerator.getLine = function (bp, ep, res) {
	            var line = new ROUTES.Line();
	            var tx = ep.x - bp.x;
	            var ty = ep.y - bp.y;
	            var r = Math.atan2(ty, tx);
	            var dx = Math.cos(r) * res;
	            var dy = Math.sin(r) * res;
	            var l = Math.sqrt(tx * tx + ty * ty) - res;
	            var L = l / res;
	            for (var i = 0; i < L; i++) {
	                line.push(new UTILS.Pos(dx * i + bp.x, dy * i + bp.y));
	            }
	            return line;
	        };
	        RouteGenerator.line = function (x1, y1, x2, y2) {
	            // if(!this.graphics) return;
	            // this.graphics.moveTo(x1, y1);
	            // this.graphics.lineTo(x2, y2);
	        };
	        RouteGenerator.circle = function (x, y, r) {
	            // if(!this.graphics) return;
	            // this.graphics.drawCircle(x, y, r);
	        };
	        return RouteGenerator;
	    }());
	    ROUTES.RouteGenerator = RouteGenerator;
	})(ROUTES || (ROUTES = {}));
	var ROUTES;
	(function (ROUTES) {
	    var Route = (function () {
	        function Route(c1, c2, c1rb, c2rb, c1rl, c2rl) {
	            this.c1 = c1;
	            this.c2 = c2;
	            this.c1rb = c1rb;
	            this.c2rb = c2rb;
	            this.c1rl = c1rl;
	            this.c2rl = c2rl;
	        }
	        Route.prototype.generateRoute = function (res, line) {
	            if (line === void 0) { line = new ROUTES.Line(); }
	            var c1rres = res / (this.c1.r * 2 * Matthew.PI) * Matthew.D_PI;
	            var c2rres = res / (this.c2.r * 2 * Matthew.PI) * Matthew.D_PI;
	            var _x = Math.cos(this.c1rb) * this.c1.r + this.c1.pos.x;
	            var _y = Math.sin(this.c1rb) * this.c1.r + this.c1.pos.y;
	            var tr;
	            var L = Matthew.abs(this.c1rl);
	            for (var r = 0; r < L; r += c1rres) {
	                tr = this.c1rb + r * this.c1.d;
	                _x = Math.cos(tr) * this.c1.r + this.c1.pos.x;
	                _y = Math.sin(tr) * this.c1.r + this.c1.pos.y;
	                line.push(new UTILS.Pos(_x, _y));
	            }
	            line.pop();
	            this.getLineRoot(new UTILS.Pos(_x, _y), new UTILS.Pos(Math.cos(this.c2rb) * this.c2.r + this.c2.pos.x, Math.sin(this.c2rb) * this.c2.r + this.c2.pos.y), res, line);
	            // trace(_x, _y, Math.cos(c2rb) * c2.r + c2.pos.x, Math.sin(c2rb) * c2.r + c2.pos.y)
	            var LL = Matthew.abs(this.c2rl) - c2rres;
	            for (var r = 0; r < LL; r += c2rres) {
	                tr = this.c2rb + r * this.c2.d;
	                _x = Math.cos(tr) * this.c2.r + this.c2.pos.x;
	                _y = Math.sin(tr) * this.c2.r + this.c2.pos.y;
	                line.push(new UTILS.Pos(_x, _y));
	            }
	            line.push(new UTILS.Pos(Math.cos(this.c2rb + (Matthew.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.pos.x, Math.sin(this.c2rb + (Matthew.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.pos.y));
	            return line;
	        };
	        Route.prototype.getLength = function () {
	            var l = 0;
	            l += this.c1.r * 2 * Matthew.PI * (Matthew.abs(this.c1rl) / (Matthew.D_PI));
	            l += this.c2.r * 2 * Matthew.PI * (Matthew.abs(this.c2rl) / (Matthew.D_PI));
	            var t1x = Math.cos(this.c1rb + this.c1rl) * this.c1.r + this.c1.pos.x;
	            var t1y = Math.sin(this.c1rb + this.c1rl) * this.c1.r + this.c1.pos.y;
	            var t2x = Math.cos(this.c2rb) * this.c2.r + this.c2.pos.x;
	            var t2y = Math.sin(this.c2rb) * this.c2.r + this.c2.pos.y;
	            var dx = t1x - t2x;
	            var dy = t1y - t2y;
	            l += Math.sqrt(dx * dx + dy * dy);
	            return l;
	        };
	        Route.prototype.getLineRoot = function (bp, ep, res, line) {
	            var tx = ep.x - bp.x;
	            var ty = ep.y - bp.y;
	            var r = Math.atan2(ty, tx);
	            var dx = Math.cos(r) * res;
	            var dy = Math.sin(r) * res;
	            var l = Math.sqrt(tx * tx + ty * ty) - res;
	            var L = l / res;
	            for (var i = 0; i < L; i++) {
	                line.push(new UTILS.Pos(dx * i + bp.x, dy * i + bp.y));
	            }
	        };
	        return Route;
	    }());
	    ROUTES.Route = Route;
	})(ROUTES || (ROUTES = {}));
	///<reference path='line.ts'/>
	var ROUTES;
	(function (ROUTES) {
	    var Debugger = (function (_super) {
	        __extends(Debugger, _super);
	        function Debugger() {
	            var _this = _super.call(this) || this;
	            _this.graphics = new PIXI.Graphics();
	            _this.addChild(_this.graphics);
	            return _this;
	        }
	        Debugger.prototype.render = function (line) {
	            var bp = line.head();
	            var ep = line.tail();
	            this.graphics.lineStyle(1, 0xCCCCCC);
	            this.graphics.moveTo(bp.x, bp.y);
	            for (var i = 1; i < line.getLength(); i++) {
	                var p = line.at(i);
	                this.graphics.lineTo(p.x, p.y);
	            }
	            this.graphics.drawCircle(bp.x, bp.y, 5);
	            this.graphics.drawCircle(ep.x, ep.y, 5);
	        };
	        Debugger.prototype.clear = function () {
	            this.graphics.clear();
	        };
	        return Debugger;
	    }(PIXI.Container));
	    ROUTES.Debugger = Debugger;
	})(ROUTES || (ROUTES = {}));
	///<reference path='line.ts'/>
	///<reference path='generator.ts'/>
	///<reference path='route.ts'/>
	///<reference path='debugger.ts'/>
	window['ROUTES'] = ROUTES;


/***/ }
/******/ ]);