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
	    draw();
	    resize();
	};
	var draw = function () {
	    TWEEN.update();
	    renderer.render(stage);
	    requestAnimationFrame(draw);
	};
	var resize = function () {
	    var width = canvas.offsetWidth * 2;
	    var height = canvas.offsetHeight * 2;
	    sw = width;
	    sh = height;
	    renderer.resize(width, height);
	};
	window.onload = init;


/***/ }
/******/ ]);