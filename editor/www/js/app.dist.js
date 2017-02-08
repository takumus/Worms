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
	var editor_1 = __webpack_require__(1);
	var renderer;
	var stage = new PIXI.Container();
	var canvas;
	var stageWidth = 0, stageHeight = 0;
	var editor;
	var dpr;
	var init = function () {
	    dpr = 2; //window.devicePixelRatio;
	    renderer = PIXI.autoDetectRenderer(800, 800, { antialias: true });
	    canvas = document.getElementById("content");
	    canvas.appendChild(renderer.view);
	    renderer.view.style.width = "100%";
	    renderer.view.style.height = "100%";
	    window.addEventListener("resize", resize);
	    window.addEventListener('resize', resize);
	    window.addEventListener('orientationchange', resize);
	    editor = new editor_1.default(dpr);
	    stage.addChild(editor);
	    draw();
	    resize();
	};
	var ppos = 0;
	var draw = function () {
	    requestAnimationFrame(draw);
	    editor.update();
	    TWEEN.update();
	    renderer.render(stage);
	};
	var resize = function () {
	    var width = canvas.offsetWidth * dpr;
	    var height = canvas.offsetHeight * dpr;
	    stageWidth = width;
	    stageHeight = height;
	    renderer.resize(width, height);
	};
	window.onload = init;


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Editor = (function (_super) {
	    __extends(Editor, _super);
	    function Editor(dpr) {
	        var _this = _super.call(this) || this;
	        _this.res = 20;
	        _this.lines = [];
	        _this.dpr = dpr;
	        _this.mouse = new UTILS.Pos();
	        _this.drawerCanvas = new PIXI.Graphics();
	        _this.lineCanvas = new PIXI.Graphics();
	        _this.editingLineCanvas = new PIXI.Graphics();
	        _this.addChild(_this.drawerCanvas);
	        _this.addChild(_this.lineCanvas);
	        _this.addChild(_this.editingLineCanvas);
	        _this.initMouse();
	        _this.nextPos = new UTILS.Pos();
	        _this.prevPos = new UTILS.Pos();
	        return _this;
	    }
	    Editor.prototype.initMouse = function () {
	        var _this = this;
	        window.addEventListener("mousedown", function (e) {
	            _this.mouse.x = e.clientX * _this.dpr;
	            _this.mouse.y = e.clientY * _this.dpr;
	            _this.begin(_this.mouse.x, _this.mouse.y);
	        });
	        window.addEventListener("mousemove", function (e) {
	            _this.mouse.x = e.clientX * _this.dpr;
	            _this.mouse.y = e.clientY * _this.dpr;
	        });
	        window.addEventListener("mouseup", function (e) {
	            //this.end();
	        });
	        window.addEventListener("keydown", function (e) {
	            if (e.keyCode == 17) {
	                _this.next();
	            }
	            else if (e.keyCode == 13) {
	                console.log(JSON.stringify(_this.lines));
	            }
	            else if (e.keyCode == 27) {
	                _this.end();
	            }
	        });
	    };
	    Editor.prototype.begin = function (x, y) {
	        if (this.pressing)
	            return;
	        this.prevPos.x = x;
	        this.prevPos.y = y;
	        this.pressing = true;
	        this.editingLine = new ROUTES.Line();
	        this.prevPos.round(2);
	        this.editingLine.push(this.prevPos.clone());
	    };
	    Editor.prototype.end = function () {
	        if (!this.pressing)
	            return;
	        this.pressing = false;
	        this.drawerCanvas.clear();
	        this.editingLineCanvas.clear();
	        if (this.editingLine && this.editingLine.getLength() > 1) {
	            this.lineCanvas.lineStyle(3, 0x999999);
	            for (var ii = 0; ii < this.editingLine.getLength(); ii++) {
	                var p = this.editingLine.at(ii);
	                if (ii == 0) {
	                    this.lineCanvas.moveTo(p.x, p.y);
	                }
	                else {
	                    this.lineCanvas.lineTo(p.x, p.y);
	                }
	            }
	            this.lines.push(this.editingLine.clone());
	        }
	        //this.editingLine = null;
	    };
	    Editor.prototype.next = function () {
	        if (!this.pressing)
	            return;
	        this.editingLineCanvas.lineStyle(2, 0xffffff);
	        this.nextPos.round(2);
	        this.editingLineCanvas.moveTo(this.prevPos.x, this.prevPos.y);
	        this.editingLineCanvas.lineTo(this.nextPos.x, this.nextPos.y);
	        this.prevPos.x = this.nextPos.x;
	        this.prevPos.y = this.nextPos.y;
	        this.editingLine.push(this.nextPos.clone());
	    };
	    Editor.prototype.update = function () {
	        if (!this.pressing)
	            return;
	        this.drawerCanvas.clear();
	        this.drawerCanvas.lineStyle(1, 0xffffff);
	        this.drawerCanvas.drawCircle(this.prevPos.x, this.prevPos.y, 5);
	        var dx = this.mouse.x - this.prevPos.x;
	        var dy = this.mouse.y - this.prevPos.y;
	        var d = Math.sqrt(dx * dx + dy * dy);
	        dx /= d;
	        dy /= d;
	        dx *= this.res;
	        dy *= this.res;
	        this.nextPos.x = this.prevPos.x + dx;
	        this.nextPos.y = this.prevPos.y + dy;
	        this.drawerCanvas.drawCircle(this.nextPos.x, this.nextPos.y, 5);
	        this.drawerCanvas.moveTo(this.prevPos.x, this.prevPos.y);
	        this.drawerCanvas.lineTo(this.mouse.x, this.mouse.y);
	    };
	    return Editor;
	}(PIXI.Container));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Editor;


/***/ }
/******/ ]);