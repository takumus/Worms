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
	Object.defineProperty(exports, "__esModule", { value: true });
	var bugs_1 = __webpack_require__(1);
	var renderer;
	var stage = new PIXI.Container();
	var canvas;
	var stageWidth = 0, stageHeight = 0;
	var mouse = new UTILS.Pos();
	var props = {
	    speed: 24
	};
	function initBugs() {
	    var guide = new ROUTES.Debugger();
	    guide.setOption(0xCCCCCC, 1, false, false);
	    stage.addChild(guide);
	    var bug = new bugs_1.Bug(40, 20);
	    stage.addChild(bug.graphics);
	    var pVecPos = new UTILS.VecPos(200, 200, 0);
	    var mousePos = new UTILS.VecPos();
	    var next = function () {
	        var p = bug.bone[0];
	        var r = Math.atan2(mouse.y - p.y, mouse.x - p.x);
	        //const nVecPos = new UTILS.VecPos(mouse.x, mouse.y, r);
	        var nVecPos = new UTILS.VecPos(stageWidth / 2 + Math.random() * 400 - 200, stageHeight / 2 + Math.random() * 400 - 200, Math.PI * 2 * Math.random());
	        var route = ROUTES.RouteGenerator.getMinimumRoute(bug.getHeadVecPos(), nVecPos, 50 * Math.random() + 70, 50 * Math.random() + 70, 5).wave(20, 0.1);
	        while (route.length % Math.floor(20) != 0) {
	            var p1 = route[route.length - 2];
	            var p2 = route[route.length - 1].clone();
	            var d = p1.distance(p2);
	            p2.x += (p2.x - p1.x) / d * 5;
	            p2.y += (p2.y - p1.y) / d * 5;
	            route.push(p2.clone());
	        }
	        if (route.length == 0) {
	            next();
	            return;
	        }
	        pVecPos = nVecPos;
	        guide.clear();
	        guide.render(route);
	        bug.setRoute(bug.getCurrentLine().pushLine(route));
	        new TWEEN.Tween({ s: 0 })
	            .to({ s: 1 }, route.length * props.speed)
	            .onUpdate(function () {
	            bug.setStep(this.s);
	            bug.render();
	        })
	            .onComplete(function () {
	            next();
	        })
	            .start();
	    };
	    next();
	    window.addEventListener('mousemove', function (e) {
	        mouse.x = e.clientX;
	        mouse.y = e.clientY;
	    });
	}
	function initGUI() {
	    var gui = new dat.GUI();
	    gui.add(props, 'speed', 0, 100);
	}
	function initPIXI() {
	    renderer = PIXI.autoDetectRenderer(800, 800, { antialias: false, resolution: 2, transparent: false, backgroundColor: 0xFFFFFF });
	    canvas = document.getElementById('content');
	    canvas.appendChild(renderer.view);
	    renderer.view.style.width = '100%';
	    renderer.view.style.height = '100%';
	    window.addEventListener('resize', resize);
	    window.addEventListener('orientationchange', resize);
	}
	function init() {
	    var color = new UTILS.Color(0xffffff);
	    initGUI();
	    initPIXI();
	    draw();
	    resize();
	    initBugs();
	}
	function draw() {
	    requestAnimationFrame(draw);
	    TWEEN.update();
	    renderer.render(stage);
	}
	function resize() {
	    stageWidth = canvas.offsetWidth;
	    stageHeight = canvas.offsetHeight;
	    renderer.resize(stageWidth, stageHeight);
	}
	window.onload = init;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var leg_1 = __webpack_require__(2);
	var Bug = (function (_super) {
	    __extends(Bug, _super);
	    function Bug(length, span) {
	        var _this = _super.call(this, length) || this;
	        _this._graphics = new PIXI.Graphics();
	        var scale = 0.4;
	        _this.lp = new leg_1.Leg(_this, false, 100 * scale, 100 * scale, span, span * 0.5, 110 * scale, -Math.PI / 2 + 0.8, 0);
	        _this.lp2 = new leg_1.Leg(_this, true, 100 * scale, 100 * scale, span, 0, 110 * scale, Math.PI / 2 - 0.8, 0);
	        _this.lp3 = new leg_1.Leg(_this, true, 100 * scale, 120 * scale, span, span * 0.05, 120 * scale, -Math.PI / 2 - 0.8, 0);
	        _this.lp4 = new leg_1.Leg(_this, false, 100 * scale, 120 * scale, span, span * 0.55, 120 * scale, Math.PI / 2 + 0.8, 0);
	        return _this;
	    }
	    Object.defineProperty(Bug.prototype, "graphics", {
	        get: function () {
	            return this._graphics;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Bug.prototype.render = function () {
	        var g = this._graphics;
	        g.clear();
	        g.lineStyle(16, 0x333333);
	        for (var i = Math.floor(this.currentLength * 0.2); i < Math.floor(this.currentLength * 0.6); i++) {
	            var pos = this.bone[i];
	            if (i == Math.floor(this.currentLength * 0.2)) {
	                g.moveTo(pos.x, pos.y);
	            }
	            else {
	                g.lineTo(pos.x, pos.y);
	            }
	        }
	        ;
	        this.lp.index = this.lp2.index = Math.floor(this.currentLength * 0.3);
	        this.lp.legPos.beginOffset = this.lp2.legPos.beginOffset = Math.floor(this.currentLength * 0.1);
	        this.lp3.index = this.lp4.index = Math.floor(this.currentLength * 0.5);
	        this.lp3.legPos.beginOffset = this.lp4.legPos.beginOffset = Math.floor(this.currentLength * 0.45);
	        this.renderP(this.lp.getPos());
	        this.renderP(this.lp2.getPos());
	        this.renderP(this.lp3.getPos());
	        this.renderP(this.lp4.getPos());
	        ///*
	        this.renderGuide(this.lp);
	        this.renderGuide(this.lp2);
	        this.renderGuide(this.lp3);
	        this.renderGuide(this.lp4); //*/
	    };
	    Bug.prototype.setRoute = function (route, nextLength) {
	        _super.prototype.setRoute.call(this, route, nextLength);
	    };
	    Bug.prototype.renderP = function (p) {
	        var g = this._graphics;
	        g.lineStyle(16, 0x333333);
	        g.moveTo(p.begin.x, p.begin.y);
	        g.lineTo(p.middle.x, p.middle.y);
	        g.lineStyle(8, 0x333333);
	        g.moveTo(p.middle.x, p.middle.y);
	        g.lineTo(p.end.x, p.end.y);
	        g.lineStyle();
	        g.beginFill(0x333333);
	        g.drawCircle(p.middle.x, p.middle.y, 8);
	        g.drawCircle(p.end.x, p.end.y, 4);
	        g.endFill();
	    };
	    Bug.prototype.renderGuide = function (leg) {
	        var g = this._graphics;
	        g.lineStyle(1, 0xff0000);
	        var pp = leg.legPos.prevPos;
	        var np = leg.legPos.nextPos;
	        g.moveTo(pp.x, pp.y);
	        g.lineTo(np.x, np.y);
	        g.drawCircle(np.x, np.y, 10);
	    };
	    return Bug;
	}(WORMS.Base));
	exports.Bug = Bug;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var legPos_1 = __webpack_require__(3);
	var Leg = (function () {
	    function Leg(bug, flip, length1, length2, span, spanOffset, radius, rotationOffset, index) {
	        this._bug = bug;
	        this._flip = flip;
	        this._index = Math.floor(index);
	        this._length1 = length1;
	        this._length2 = length2;
	        this._legPos = new legPos_1.LegPos(bug, span, radius, rotationOffset, spanOffset, index);
	    }
	    Leg.prototype.getPos = function () {
	        var fromPos = this._bug.bone[this._index];
	        var toPos = this._legPos.getPos();
	        var r = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
	        var a = fromPos.distance(toPos);
	        var b = this._length1;
	        var c = this._length2;
	        var minA = a * 1.02;
	        if (b + c < minA) {
	            var ratio = b / (b + c);
	            b = ratio * minA;
	            c = minA - b;
	        }
	        var ra = Math.acos((b * b + c * c - a * a) / (2 * b * c));
	        var rb = Math.acos((a * a + c * c - b * b) / (2 * a * c));
	        var rc = Math.acos((a * a + b * b - c * c) / (2 * a * b));
	        var rr = r + (this._flip ? rc : -rc);
	        var x = Math.cos(rr) * b + fromPos.x;
	        var y = Math.sin(rr) * b + fromPos.y;
	        return {
	            begin: fromPos,
	            middle: new UTILS.Pos(x, y),
	            end: toPos
	        };
	    };
	    Object.defineProperty(Leg.prototype, "legPos", {
	        get: function () {
	            return this._legPos;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Leg.prototype, "index", {
	        set: function (value) {
	            this._legPos.beginOffset = value;
	            this._index = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Leg;
	}());
	exports.Leg = Leg;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var LegPos = (function () {
	    function LegPos(bug, span, radius, radianOffset, spanOffset, beginOffset) {
	        this.bug = bug;
	        this.span = span;
	        this.radius = radius;
	        this.radianOffset = radianOffset;
	        this.spanOffset = spanOffset % span;
	        this.beginOffset = beginOffset;
	        this._nextPos = new UTILS.Pos();
	        this._prevPos = new UTILS.Pos();
	    }
	    Object.defineProperty(LegPos.prototype, "prevPos", {
	        get: function () { return this._prevPos; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LegPos.prototype, "nextPos", {
	        get: function () { return this._nextPos; },
	        enumerable: true,
	        configurable: true
	    });
	    LegPos.prototype.getPos = function () {
	        var id = (this.bug.route.length - this.bug.currentLength) * this.bug.step;
	        var fid = id + this.spanOffset;
	        var nf = (fid) % (this.span / 2);
	        var nf2 = (fid) % this.span;
	        var pid = Math.floor(Math.floor(fid / this.span) * this.span - this.spanOffset + (this.bug.currentLength - this.beginOffset));
	        this._prevPos = this._getPos(pid);
	        if (nf < nf2) {
	            this._nextPos = this._getPos(pid + this.span);
	            var p = (Math.cos(nf / (this.span / 2) * Math.PI - Math.PI) + 1) / 2;
	            p = Math.pow(p, 2);
	            // p = nf / (this.span / 2);
	            this._prevPos.x += (this._nextPos.x - this._prevPos.x) * p;
	            this._prevPos.y += (this._nextPos.y - this._prevPos.y) * p;
	            return this._prevPos;
	        }
	        return this._prevPos;
	    };
	    LegPos.prototype._getPos = function (id) {
	        id = Math.floor(id);
	        if (id < 0)
	            id = 0;
	        if (id >= this.bug.route.length - 1)
	            id = this.bug.route.length - 2;
	        var p1 = this.bug.route[id];
	        var p2 = this.bug.route[id + 1];
	        var tx = p2.x - p1.x;
	        var ty = p2.y - p1.y;
	        var r = Math.atan2(ty, tx) + this.radianOffset;
	        return new UTILS.Pos(Math.cos(r) * this.radius + p1.x, Math.sin(r) * this.radius + p1.y);
	    };
	    return LegPos;
	}());
	exports.LegPos = LegPos;


/***/ }
/******/ ]);