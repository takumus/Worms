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

	var ROUTES;
	(function (ROUTES) {
	    var Line = (function () {
	        function Line(data) {
	            if (data === void 0) { data = []; }
	            this.data = data;
	            this.length = this.data.length;
	        }
	        Line.prototype.reverse = function () {
	            this.data.reverse();
	            return this;
	        };
	        Line.prototype.getHeadVecPos = function () {
	            var fp = this.at(0);
	            var sp = this.at(1);
	            var dx = sp.x - fp.x;
	            var dy = sp.y - fp.y;
	            return new ROUTES.VecPos(fp.x, fp.y, Math.atan2(dy, dx));
	        };
	        Line.prototype.getTailVecPos = function () {
	            var fp = this.at(this.length - 1);
	            var sp = this.at(this.length - 2);
	            var dx = sp.x - fp.x;
	            var dy = sp.y - fp.y;
	            return new ROUTES.VecPos(fp.x, fp.y, Math.atan2(dy, dx));
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
	        Line.prototype.wave = function (amp, freq) {
	            var newData = [];
	            var rad = 0;
	            newData.push(this.at(0).clone());
	            for (var i = 1; i < this.length - 1; i++) {
	                var p = this.at(i);
	                var vx = this.at(i - 1).x - p.x;
	                var vy = this.at(i - 1).y - p.y;
	                var np = new ROUTES.Pos();
	                var all = Math.sin(i / (this.length - 1) * Math.PI);
	                //all * allで開始、終了を極端にする。(先端への影響を少なく)
	                var offset = all * all * Math.sin(rad) * amp;
	                var vr = Math.sqrt(vx * vx + vy * vy);
	                rad += freq;
	                vx = vx / vr * offset;
	                vy = vy / vr * offset;
	                np.x = p.x + -vy;
	                np.y = p.y + vx;
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
	            var route = null;
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
	            var cB1 = new ROUTES.Circle(Math.cos(vposB.r + ROUTES.Matthew.H_PI) * rB + vposB.pos.x, Math.sin(vposB.r + ROUTES.Matthew.H_PI) * rB + vposB.pos.y, rB, 1, vposB.r - ROUTES.Matthew.H_PI);
	            var cB2 = new ROUTES.Circle(Math.cos(vposB.r - ROUTES.Matthew.H_PI) * rB + vposB.pos.x, Math.sin(vposB.r - ROUTES.Matthew.H_PI) * rB + vposB.pos.y, rB, -1, vposB.r + ROUTES.Matthew.H_PI);
	            var cE1 = new ROUTES.Circle(Math.cos(vposE.r + ROUTES.Matthew.H_PI) * rE + vposE.pos.x, Math.sin(vposE.r + ROUTES.Matthew.H_PI) * rE + vposE.pos.y, rE, 1, vposE.r - ROUTES.Matthew.H_PI);
	            var cE2 = new ROUTES.Circle(Math.cos(vposE.r - ROUTES.Matthew.H_PI) * rE + vposE.pos.x, Math.sin(vposE.r - ROUTES.Matthew.H_PI) * rE + vposE.pos.y, rE, -1, vposE.r + ROUTES.Matthew.H_PI);
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
	            var a1 = new ROUTES.Pos(), a2 = new ROUTES.Pos(), b1 = new ROUTES.Pos(), b2 = new ROUTES.Pos();
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
	                    c2r = c1r = ROUTES.Matthew.normalize(r + br);
	                    this.line(a1.x, a1.y, b1.x, b1.y);
	                }
	                else {
	                    c2r = c1r = ROUTES.Matthew.normalize(-r + br);
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
	                    c1r = ROUTES.Matthew.normalize(r + br);
	                    c2r = ROUTES.Matthew.normalize(r + br + ROUTES.Matthew.PI);
	                    this.line(a1.x, a1.y, b1.x, b1.y);
	                }
	                else {
	                    c1r = ROUTES.Matthew.normalize(-r + br);
	                    c2r = ROUTES.Matthew.normalize(-r + br + ROUTES.Matthew.PI);
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
	                    c1dr = ROUTES.Matthew.D_PI - (c1.tr - c1r);
	                }
	            }
	            else {
	                if (c1.tr < c1r) {
	                    c1dr = ROUTES.Matthew.D_PI - (c1r - c1.tr);
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
	                    c2dr = ROUTES.Matthew.D_PI - (c2r - c2.tr);
	                }
	            }
	            else {
	                if (c2r < c2.tr) {
	                    c2dr = ROUTES.Matthew.D_PI - (c2.tr - c2r);
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
	        RouteGenerator.line = function (x1, y1, x2, y2) {
	            //if(!this.graphics) return;
	            //this.graphics.moveTo(x1, y1);
	            //this.graphics.lineTo(x2, y2);
	        };
	        RouteGenerator.circle = function (x, y, r) {
	            //if(!this.graphics) return;
	            //this.graphics.drawCircle(x, y, r);
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
	            var c1rres = res / (this.c1.r * 2 * ROUTES.Matthew.PI) * ROUTES.Matthew.D_PI;
	            var c2rres = res / (this.c2.r * 2 * ROUTES.Matthew.PI) * ROUTES.Matthew.D_PI;
	            var _x = Math.cos(this.c1rb) * this.c1.r + this.c1.pos.x;
	            var _y = Math.sin(this.c1rb) * this.c1.r + this.c1.pos.y;
	            var tr;
	            var L = ROUTES.Matthew.abs(this.c1rl);
	            for (var r = 0; r < L; r += c1rres) {
	                tr = this.c1rb + r * this.c1.d;
	                _x = Math.cos(tr) * this.c1.r + this.c1.pos.x;
	                _y = Math.sin(tr) * this.c1.r + this.c1.pos.y;
	                line.push(new ROUTES.Pos(_x, _y));
	            }
	            line.pop();
	            this.getLineRoot(new ROUTES.Pos(_x, _y), new ROUTES.Pos(Math.cos(this.c2rb) * this.c2.r + this.c2.pos.x, Math.sin(this.c2rb) * this.c2.r + this.c2.pos.y), res, line);
	            //trace(_x, _y, Math.cos(c2rb) * c2.r + c2.pos.x, Math.sin(c2rb) * c2.r + c2.pos.y)
	            var LL = ROUTES.Matthew.abs(this.c2rl) - c2rres;
	            for (var r = 0; r < LL; r += c2rres) {
	                tr = this.c2rb + r * this.c2.d;
	                _x = Math.cos(tr) * this.c2.r + this.c2.pos.x;
	                _y = Math.sin(tr) * this.c2.r + this.c2.pos.y;
	                line.push(new ROUTES.Pos(_x, _y));
	            }
	            line.push(new ROUTES.Pos(Math.cos(this.c2rb + (ROUTES.Matthew.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.pos.x, Math.sin(this.c2rb + (ROUTES.Matthew.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.pos.y));
	            return line;
	        };
	        Route.prototype.getLength = function () {
	            var l = 0;
	            l += this.c1.r * 2 * ROUTES.Matthew.PI * (ROUTES.Matthew.abs(this.c1rl) / (ROUTES.Matthew.D_PI));
	            l += this.c2.r * 2 * ROUTES.Matthew.PI * (ROUTES.Matthew.abs(this.c2rl) / (ROUTES.Matthew.D_PI));
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
	                line.push(new ROUTES.Pos(dx * i + bp.x, dy * i + bp.y));
	            }
	        };
	        return Route;
	    }());
	    ROUTES.Route = Route;
	})(ROUTES || (ROUTES = {}));
	var ROUTES;
	(function (ROUTES) {
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
	        return Pos;
	    }());
	    ROUTES.Pos = Pos;
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
	    ROUTES.VecPos = VecPos;
	    var Circle = (function () {
	        function Circle(x, y, r, d, tr) {
	            this.pos = new Pos(x, y);
	            this.r = r;
	            this.d = d;
	            this.tr = Matthew.normalize(tr);
	        }
	        return Circle;
	    }());
	    ROUTES.Circle = Circle;
	    var Matthew = (function () {
	        function Matthew() {
	        }
	        Matthew.normalize = function (r) {
	            r = r % this.D_PI;
	            if (r < 0)
	                return this.D_PI + r;
	            return r;
	        };
	        Matthew.abs = function (v) {
	            return v < 0 ? -v : v;
	        };
	        return Matthew;
	    }());
	    Matthew.PI = Math.PI;
	    Matthew.H_PI = Math.PI / 2;
	    Matthew.D_PI = Math.PI * 2;
	    ROUTES.Matthew = Matthew;
	})(ROUTES || (ROUTES = {}));
	///<reference path="line.ts"/>
	///<reference path="generator.ts"/>
	///<reference path="route.ts"/>
	///<reference path="utils.ts"/>
	window["ROUTES"] = ROUTES;


/***/ }
/******/ ]);