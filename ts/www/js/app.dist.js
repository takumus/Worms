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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(1);
	var _1 = __webpack_require__(3);
	var worm_1 = __webpack_require__(7);
	var renderer;
	var stage = new PIXI.Container();
	var canvas;
	var sw, sh;
	var init = function () {
	    renderer = PIXI.autoDetectRenderer(800, 800, { antialias: true });
	    canvas = document.getElementById("content");
	    canvas.appendChild(renderer.view);
	    renderer.view.style.width = "100%";
	    renderer.view.style.height = "100%";
	    window.addEventListener("resize", resize);
	    var shape = new PIXI.Graphics();
	    shape.lineStyle(2, 0xffffff);
	    shape.moveTo(0, 0);
	    shape.lineTo(100, 100);
	    shape.drawCircle(50, 50, 50);
	    stage.addChild(shape);
	    window.onresize = function () {
	        resize();
	    };
	    stage.addChild(g);
	    window.addEventListener("mousemove", function (e) {
	        mouse.x = e.clientX * 2;
	        mouse.y = e.clientY * 2;
	    });
	    testRoute.lines[0].forEach(function (p) {
	        var vp = new utils_1.Pos(p.x + 800, p.y + 800);
	        testRouteVecs.push(vp);
	        testRouteVecs2.push(vp.clone());
	    });
	    w = new worm_1.FollowWorm(testRouteVecs.getLength());
	    stage.addChild(w);
	    w2 = new worm_1.FollowWorm(testRouteVecs2.getLength());
	    stage.addChild(w2);
	    testRouteVecs.reverse();
	    _1.RouteGenerator.graphics = g;
	    draw();
	    resize();
	};
	var g = new PIXI.Graphics();
	var mouse = new utils_1.Pos();
	var testRouteStr = '{"lines":[[{"x":1.42,"y":0},{"x":1.87,"y":4.97},{"x":1.9,"y":9.97},{"x":1.9,"y":14.97},{"x":1.9,"y":19.97},{"x":1.9,"y":24.97},{"x":1.9,"y":29.97},{"x":1.9,"y":34.97},{"x":1.9,"y":39.97},{"x":1.99,"y":44.97},{"x":1.34,"y":49.93},{"x":1.84,"y":54.91},{"x":1.44,"y":59.89},{"x":1.66,"y":64.88},{"x":1.54,"y":69.88},{"x":1.02,"y":74.86},{"x":1.1,"y":79.85},{"x":1.94,"y":84.78},{"x":1.44,"y":89.76},{"x":1.68,"y":94.75},{"x":1.57,"y":99.75},{"x":1.62,"y":104.75},{"x":1.6,"y":109.75},{"x":0,"y":116.01},{"x":1.87,"y":120.64},{"x":1.77,"y":125.64},{"x":1.77,"y":130.64},{"x":1.77,"y":135.64},{"x":1.77,"y":140.64},{"x":1.77,"y":145.64},{"x":1.77,"y":150.64},{"x":1.77,"y":155.64},{"x":1.09,"y":160.6},{"x":1.87,"y":165.54},{"x":1.56,"y":170.53},{"x":1.68,"y":175.52},{"x":1.64,"y":180.52},{"x":1.65,"y":185.52},{"x":1.65,"y":190.52},{"x":1.84,"y":195.52},{"x":1.91,"y":200.52},{"x":1.96,"y":205.52},{"x":1.94,"y":210.52},{"x":1.95,"y":215.52},{"x":1.94,"y":220.52},{"x":1.94,"y":225.52},{"x":1.94,"y":230.52},{"x":1.54,"y":235.5},{"x":1.69,"y":240.5},{"x":1.82,"y":245.5},{"x":1.35,"y":250.48},{"x":1.82,"y":255.46},{"x":1.38,"y":260.43},{"x":1.84,"y":265.41},{"x":1.61,"y":270.41},{"x":1.69,"y":275.41},{"x":1.66,"y":280.41},{"x":1.67,"y":285.41},{"x":1.67,"y":290.41},{"x":1.67,"y":295.41},{"x":1.87,"y":300.4},{"x":1.61,"y":305.4},{"x":1.69,"y":310.4},{"x":1.67,"y":315.4},{"x":1.68,"y":320.4},{"x":1.67,"y":325.4},{"x":1.67,"y":330.4},{"x":2.86,"y":335.25},{"x":2.48,"y":340.24},{"x":3.88,"y":345.04},{"x":4.71,"y":349.97},{"x":5.75,"y":354.86},{"x":6.77,"y":359.76},{"x":8.85,"y":364.3},{"x":10.27,"y":369.1},{"x":12.75,"y":373.44},{"x":15.24,"y":377.78},{"x":17.6,"y":382.19},{"x":21.48,"y":385.34},{"x":24.21,"y":389.53},{"x":27.27,"y":393.48},{"x":31.59,"y":396},{"x":35.58,"y":399.01},{"x":39.47,"y":402.15},{"x":43.87,"y":404.53},{"x":48.36,"y":406.72},{"x":53.06,"y":408.44},{"x":57.45,"y":410.82},{"x":62.16,"y":412.53},{"x":66.95,"y":413.95},{"x":71.65,"y":415.66},{"x":76.61,"y":416.25},{"x":81.47,"y":417.42},{"x":86.47,"y":417.32},{"x":91.37,"y":418.35},{"x":96.33,"y":418.95},{"x":101.26,"y":418.11},{"x":106.26,"y":418.04},{"x":111.26,"y":418.04},{"x":116.26,"y":418.04},{"x":121.17,"y":417.1},{"x":126.16,"y":416.79},{"x":131.16,"y":416.86},{"x":135.83,"y":415.08},{"x":140.8,"y":414.52},{"x":145.67,"y":413.4},{"x":150.64,"y":412.89},{"x":155.16,"y":410.75},{"x":160.08,"y":409.87},{"x":164.9,"y":408.52},{"x":169.42,"y":406.39},{"x":174.11,"y":404.66},{"x":179.06,"y":403.91},{"x":183.15,"y":401.05}]],"height":418.95,"width":183.15}';
	var testRoute = JSON.parse(testRouteStr);
	var testRouteVecs = new _1.Line();
	var testRouteVecs2 = new _1.Line();
	var w;
	var w2;
	var r = 0;
	var draw = function () {
	    requestAnimationFrame(draw);
	    g.clear();
	    g.lineStyle(2, 0xff0000);
	    var route = _1.RouteGenerator.getMinimumRoute(new utils_1.VecPos(mouse.x, mouse.y, 0.5), testRouteVecs.getHeadVecPos(), 200, 400);
	    var route2 = _1.RouteGenerator.getMinimumRoute(new utils_1.VecPos(mouse.x + 500, mouse.y + 300, 0.5), testRouteVecs2.getHeadVecPos(), 200, 400);
	    if (route) {
	        var vecs = route.generateRoute(5).wave(20, 0.1).pushLine(testRouteVecs);
	        w.setRoute(vecs);
	        w.setStep((Math.sin(r) + 1) / 2);
	        w.render();
	    }
	    if (route2) {
	        var vecs = route2.generateRoute(5).wave(180, 0.03).pushLine(testRouteVecs2);
	        w2.setRoute(vecs);
	        w2.setStep((Math.sin(r) + 1) / 2);
	        w2.render();
	    }
	    //vecs.forEach((v)=>{
	    //	//g.drawCircle(v.x, v.y, 10);
	    //});
	    renderer.render(stage);
	    r += 0.03;
	};
	var resize = function () {
	    var width = canvas.offsetWidth * 2;
	    var height = canvas.offsetHeight * 2;
	    sw = width;
	    sh = height;
	    renderer.resize(width, height);
	};
	window.onload = init;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var matthew_1 = __webpack_require__(2);
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
	    return Pos;
	}());
	exports.Pos = Pos;
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
	    return VecPos;
	}());
	exports.VecPos = VecPos;
	var Circle = (function () {
	    function Circle(x, y, r, d, tr) {
	        this.pos = new Pos(x, y);
	        this.r = r;
	        this.d = d;
	        this.tr = matthew_1.default.normalize(tr);
	    }
	    return Circle;
	}());
	exports.Circle = Circle;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Matthew;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var route_1 = __webpack_require__(4);
	exports.Route = route_1.default;
	var line_1 = __webpack_require__(5);
	exports.Line = line_1.default;
	var generator_1 = __webpack_require__(6);
	exports.RouteGenerator = generator_1.default;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(1);
	var matthew_1 = __webpack_require__(2);
	var line_1 = __webpack_require__(5);
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
	        if (line === void 0) { line = new line_1.default(); }
	        var c1rres = res / (this.c1.r * 2 * matthew_1.default.PI) * matthew_1.default.D_PI;
	        var c2rres = res / (this.c2.r * 2 * matthew_1.default.PI) * matthew_1.default.D_PI;
	        var _x = Math.cos(this.c1rb) * this.c1.r + this.c1.pos.x;
	        var _y = Math.sin(this.c1rb) * this.c1.r + this.c1.pos.y;
	        var tr;
	        var L = matthew_1.default.abs(this.c1rl);
	        for (var r = 0; r < L; r += c1rres) {
	            tr = this.c1rb + r * this.c1.d;
	            _x = Math.cos(tr) * this.c1.r + this.c1.pos.x;
	            _y = Math.sin(tr) * this.c1.r + this.c1.pos.y;
	            line.push(new utils_1.Pos(_x, _y));
	        }
	        line.pop();
	        this.getLineRoot(new utils_1.Pos(_x, _y), new utils_1.Pos(Math.cos(this.c2rb) * this.c2.r + this.c2.pos.x, Math.sin(this.c2rb) * this.c2.r + this.c2.pos.y), res, line);
	        //trace(_x, _y, Math.cos(c2rb) * c2.r + c2.pos.x, Math.sin(c2rb) * c2.r + c2.pos.y)
	        var LL = matthew_1.default.abs(this.c2rl) - c2rres;
	        for (var r = 0; r < LL; r += c2rres) {
	            tr = this.c2rb + r * this.c2.d;
	            _x = Math.cos(tr) * this.c2.r + this.c2.pos.x;
	            _y = Math.sin(tr) * this.c2.r + this.c2.pos.y;
	            line.push(new utils_1.Pos(_x, _y));
	        }
	        line.push(new utils_1.Pos(Math.cos(this.c2rb + (matthew_1.default.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.pos.x, Math.sin(this.c2rb + (matthew_1.default.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.pos.y));
	        return line;
	    };
	    Route.prototype.getLength = function () {
	        var l = 0;
	        l += this.c1.r * 2 * matthew_1.default.PI * (matthew_1.default.abs(this.c1rl) / (matthew_1.default.D_PI));
	        l += this.c2.r * 2 * matthew_1.default.PI * (matthew_1.default.abs(this.c2rl) / (matthew_1.default.D_PI));
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
	            line.push(new utils_1.Pos(dx * i + bp.x, dy * i + bp.y));
	        }
	    };
	    return Route;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Route;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(1);
	var Line = (function () {
	    function Line(data) {
	        if (data === void 0) { data = []; }
	        this.data = data;
	        this.length = this.data.length;
	    }
	    Line.prototype.reverse = function () {
	        this.data.reverse();
	    };
	    Line.prototype.getHeadVecPos = function () {
	        var fp = this.at(0);
	        var sp = this.at(1);
	        var dx = sp.x - fp.x;
	        var dy = sp.y - fp.y;
	        return new utils_1.VecPos(fp.x - dx, fp.y - dy, Math.atan2(dy, dx));
	    };
	    Line.prototype.at = function (id) {
	        return this.data[id];
	    };
	    Line.prototype.push = function (pos) {
	        this.data.push(pos);
	        this.length = this.data.length;
	    };
	    Line.prototype.pop = function () {
	        return this.data.pop();
	    };
	    Line.prototype.pushLine = function (line) {
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
	            data.push(data[i].clone());
	        }
	        return new Line(data);
	    };
	    Line.prototype.wave = function (amp, freq) {
	        var newData = [];
	        var n = 0;
	        newData.push(this.at(0).clone());
	        for (var i = 1; i < this.length - 1; i++) {
	            var all = Math.sin(i / (this.length - 1) * Math.PI);
	            var r = all * all * Math.sin(n) * amp;
	            n += freq;
	            var p = this.at(i);
	            var np = new utils_1.Pos();
	            var vx = this.at(i - 1).x - p.x;
	            var vy = this.at(i - 1).y - p.y;
	            var vl = vx * vx + vy * vy;
	            var vr = Math.sqrt(vl);
	            vx = vx / vr * r;
	            vy = vy / vr * r;
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Line;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(1);
	var matthew_1 = __webpack_require__(2);
	var route_1 = __webpack_require__(4);
	var RouteGenerator = (function () {
	    function RouteGenerator() {
	    }
	    RouteGenerator.getMinimumRoute = function (vposB, vposE, rB, rE) {
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
	        return route;
	    };
	    RouteGenerator.getAllRoute = function (vposB, vposE, rB, rE) {
	        var cB1 = new utils_1.Circle(Math.cos(vposB.r + matthew_1.default.H_PI) * rB + vposB.pos.x, Math.sin(vposB.r + matthew_1.default.H_PI) * rB + vposB.pos.y, rB, 1, vposB.r - matthew_1.default.H_PI);
	        var cB2 = new utils_1.Circle(Math.cos(vposB.r - matthew_1.default.H_PI) * rB + vposB.pos.x, Math.sin(vposB.r - matthew_1.default.H_PI) * rB + vposB.pos.y, rB, -1, vposB.r + matthew_1.default.H_PI);
	        var cE1 = new utils_1.Circle(Math.cos(vposE.r + matthew_1.default.H_PI) * rE + vposE.pos.x, Math.sin(vposE.r + matthew_1.default.H_PI) * rE + vposE.pos.y, rE, 1, vposE.r - matthew_1.default.H_PI);
	        var cE2 = new utils_1.Circle(Math.cos(vposE.r - matthew_1.default.H_PI) * rE + vposE.pos.x, Math.sin(vposE.r - matthew_1.default.H_PI) * rE + vposE.pos.y, rE, -1, vposE.r + matthew_1.default.H_PI);
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
	        var a1 = new utils_1.Pos(), a2 = new utils_1.Pos(), b1 = new utils_1.Pos(), b2 = new utils_1.Pos();
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
	                c2r = c1r = matthew_1.default.normalize(r + br);
	                this.line(a1.x, a1.y, b1.x, b1.y);
	            }
	            else {
	                c2r = c1r = matthew_1.default.normalize(-r + br);
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
	                c1r = matthew_1.default.normalize(r + br);
	                c2r = matthew_1.default.normalize(r + br + matthew_1.default.PI);
	                this.line(a1.x, a1.y, b1.x, b1.y);
	            }
	            else {
	                c1r = matthew_1.default.normalize(-r + br);
	                c2r = matthew_1.default.normalize(-r + br + matthew_1.default.PI);
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
	                c1dr = matthew_1.default.D_PI - (c1.tr - c1r);
	            }
	        }
	        else {
	            if (c1.tr < c1r) {
	                c1dr = matthew_1.default.D_PI - (c1r - c1.tr);
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
	                c2dr = matthew_1.default.D_PI - (c2r - c2.tr);
	            }
	        }
	        else {
	            if (c2r < c2.tr) {
	                c2dr = matthew_1.default.D_PI - (c2.tr - c2r);
	            }
	            else {
	                c2dr = c2r - c2.tr;
	            }
	        }
	        this.circle(c1.pos.x, c1.pos.y, 2);
	        this.circle(c2.pos.x, c2.pos.y, 2);
	        this.circle(c1.pos.x, c1.pos.y, c1.r);
	        this.circle(c2.pos.x, c2.pos.y, c2.r);
	        return new route_1.default(c1, c2, c1.tr, c2r, c1dr * c1.d, c2dr * c2.d);
	    };
	    RouteGenerator.line = function (x1, y1, x2, y2) {
	        if (!this.graphics)
	            return;
	        this.graphics.moveTo(x1, y1);
	        this.graphics.lineTo(x2, y2);
	    };
	    RouteGenerator.circle = function (x, y, r) {
	        if (!this.graphics)
	            return;
	        this.graphics.drawCircle(x, y, r);
	    };
	    return RouteGenerator;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = RouteGenerator;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var utils_1 = __webpack_require__(1);
	var _1 = __webpack_require__(3);
	var Worm = (function (_super) {
	    __extends(Worm, _super);
	    function Worm(length) {
	        var _this = _super.call(this) || this;
	        _this.length = length;
	        _this.bone = new _1.Line();
	        _this.body = [];
	        for (var i = 0; i < length; i++) {
	            _this.bone.push(new utils_1.Pos());
	            _this.body.push(new BodyPos());
	        }
	        return _this;
	    }
	    Worm.prototype.push = function (x, y) {
	        //先頭に加えて、１つずつずらす。
	        var i = this.bone.getLength() - 1;
	        for (; i >= 1; i--) {
	            this.bone.at(i).x = this.bone.at(i - 1).x;
	            this.bone.at(i).y = this.bone.at(i - 1).y;
	        }
	        var bbone = this.bone.at(0);
	        bbone.x = x;
	        bbone.y = y;
	    };
	    Worm.prototype.render = function () {
	        var bbone = this.bone.at(0);
	        //ワームの外殻を生成
	        var ebone = this.bone.at(this.bone.getLength() - 1);
	        var bbody = this.body[0];
	        var ebody = this.body[this.body.length - 1];
	        bbody.left.x = bbone.x;
	        bbody.left.y = bbone.y;
	        for (var i = 1; i < this.bone.getLength() - 1; i++) {
	            var nbone = this.bone.at(i);
	            var nbody = this.body[i];
	            var vx = this.bone.at(i - 1).x - nbone.x;
	            var vy = this.bone.at(i - 1).y - nbone.y;
	            var r = ((Math.sin(i / (this.bone.getLength() - 1) * (Math.PI)))) * 40;
	            var vl = vx * vx + vy * vy;
	            var vr = Math.sqrt(vl);
	            vx = vx / vr * r;
	            vy = vy / vr * r;
	            nbody.left.x = nbone.x + -vy;
	            nbody.left.y = nbone.y + vx;
	            nbody.right.x = nbone.x + vy;
	            nbody.right.y = nbone.y + -vx;
	        }
	        ebody.left.x = ebone.x;
	        ebody.left.y = ebone.y;
	        this.clear();
	        this.lineStyle(2, 0xffffff);
	        this.beginFill(0xffffff);
	        this.moveTo(bbody.left.x, bbody.left.y);
	        for (var i = 1; i < this.body.length; i++) {
	            this.lineTo(this.body[i].left.x, this.body[i].left.y);
	        }
	        for (var i = this.body.length - 2; i >= 2; i--) {
	            this.lineTo(this.body[i].right.x, this.body[i].right.y);
	        }
	        this.lineTo(bbody.left.x, bbody.left.y);
	        this.endFill();
	    };
	    return Worm;
	}(PIXI.Graphics));
	exports.Worm = Worm;
	var FollowWorm = (function (_super) {
	    __extends(FollowWorm, _super);
	    function FollowWorm(length) {
	        var _this = _super.call(this, length) || this;
	        _this.routeIndex = 0;
	        return _this;
	    }
	    FollowWorm.prototype.setRoute = function (line) {
	        if (line.getLength() <= this.length)
	            return;
	        this.line = line;
	        //this.routeIndex = 0;
	        /*
	        let ri:number = 0;
	        for (let ii = 0; ii < this.line.length; ii++) {
	            let rr:number = Math.sin(ri)*(30*Math.sin(Math.PI*(ii/(this.routeLength))));
	            ri+=0.2;
	            var vpos:Pos = this.line[ii];
	            //vpos.x = vpos.x + Math.cos(vpos.r+Math.PI/2) * rr;
	            //vpos.y = vpos.y + Math.sin(vpos.r+Math.PI/2) * rr;
	        }
	        */
	    };
	    FollowWorm.prototype.gotoHead = function () {
	        this.routeIndex = 0;
	        for (var i = 0; i < this.length; i++) {
	            this.step();
	        }
	    };
	    FollowWorm.prototype.setStep = function (pos) {
	        if (pos === void 0) { pos = 0.5; }
	        if (!this.line)
	            return;
	        var beginIndex = this.length;
	        var length = this.line.getLength() - beginIndex - 1;
	        var posIndex = Math.floor(length * pos);
	        for (var i = 0; i < this.bone.getLength(); i++) {
	            var b = this.bone.at(i);
	            var l = this.line.at(beginIndex - i + posIndex);
	            if (!l)
	                continue;
	            b.x = l.x;
	            b.y = l.y;
	        }
	    };
	    FollowWorm.prototype.step = function (n) {
	        if (n === void 0) { n = 1; }
	        this._step();
	        if (n > 1)
	            this.step(n - 1);
	    };
	    FollowWorm.prototype._step = function () {
	        if (!this.line)
	            return;
	        if (this.routeIndex >= this.line.getLength()) {
	            this.routeIndex = 0;
	            this.gotoHead();
	            return;
	        }
	        var pos = this.line.at(this.routeIndex);
	        this.push(pos.x, pos.y);
	        this.routeIndex++;
	        return;
	    };
	    return FollowWorm;
	}(Worm));
	exports.FollowWorm = FollowWorm;
	var BodyPos = (function () {
	    function BodyPos() {
	        this.left = new utils_1.Pos();
	        this.right = new utils_1.Pos();
	    }
	    return BodyPos;
	}());


/***/ }
/******/ ]);