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
	var stageWidth = 0, stageHeight = 0;
	var mouse = new UTILS.Pos();
	var prevMouse = new UTILS.Pos();
	var worms = [];
	var wormsGraphic = [];
	var pressing = false;
	var init = function () {
	    //window.devicePixelRatio;
	    renderer = PIXI.autoDetectRenderer(800, 800, { antialias: true, resolution: 2 });
	    canvas = document.getElementById("content");
	    canvas.appendChild(renderer.view);
	    renderer.view.style.width = "100%";
	    renderer.view.style.height = "100%";
	    window.addEventListener("resize", resize);
	    window.addEventListener('resize', resize);
	    window.addEventListener('orientationchange', resize);
	    window.addEventListener("mousemove", function (e) {
	        move(e.clientX, e.clientY);
	    });
	    window.addEventListener("mousedown", function (e) {
	        begin(e.clientX, e.clientY);
	    });
	    window.addEventListener("mouseup", function () {
	        end();
	    });
	    window.addEventListener("touchmove", function (e) {
	        move(e.touches[0].clientX, e.touches[0].clientY);
	    });
	    window.addEventListener("touchstart", function (e) {
	        begin(e.touches[0].clientX, e.touches[0].clientY);
	    });
	    window.addEventListener("touchend", function (e) {
	        end();
	    });
	    var begin = function (x, y) {
	        pressing = true;
	        prevMouse.x = mouse.x = x;
	        prevMouse.y = mouse.y = y;
	    };
	    var move = function (x, y) {
	        var dx = prevMouse.x - mouse.x;
	        var dy = prevMouse.y - mouse.y;
	        if (dx * dx + dy * dy > 2000) {
	            prevMouse.x = mouse.x;
	            prevMouse.y = mouse.y;
	        }
	        mouse.x = x;
	        mouse.y = y;
	    };
	    var end = function () {
	        pressing = false;
	    };
	    for (var i = 0; i < 10; i++) {
	        var w = new WORMS.Nasty2(50, { headLength: 10, tailLength: 30, thickness: 20 }, 0x000000, 0xffffff);
	        worms.push(w);
	        stage.addChild(w);
	        w.setStep(1);
	        var g = new PIXI.Graphics();
	        wormsGraphic.push(g);
	    }
	    wormsGraphic.forEach(function (g) {
	        stage.addChild(g);
	    });
	    stage.addChild(new PIXI.Text("タッチ中はついてくる。", { fill: 0xffffff, fontSize: 60 }));
	    draw();
	    resize();
	};
	var wave = 0.12;
	var draw = function () {
	    requestAnimationFrame(draw);
	    var target = mouse;
	    var mouseRadian = Math.atan2(target.y - prevMouse.y, target.x - prevMouse.x);
	    for (var i = 0; i < worms.length; i++) {
	        var w = worms[i];
	        var g = wormsGraphic[i];
	        if (w.getStep() == 1 || pressing && !w.getRoute().tail().equals(target)) {
	            var pos = new UTILS.VecPos(pressing ? target.x : stageWidth * Math.random(), pressing ? target.y : stageHeight * Math.random(), Math.PI * 2 * Math.random());
	            //w.reverse();
	            var r = ROUTES.RouteGenerator.getMinimumRoute(w.getHeadVecPos(), pos, pressing ? 100 : 100 * Math.random() + 100, pressing ? 100 : 100 * Math.random() + 100, 5);
	            //r.pop();
	            r.wave(16, wave, true);
	            w.addRouteFromCurrent(r);
	            w.setStep(0);
	        }
	        w.addStep(pressing ? 5 : 2);
	        w.render();
	    }
	    TWEEN.update();
	    renderer.render(stage);
	    //stage.x = -w.getCurrentLine().getTailVecPos().pos.x + stageWidth/2;
	    //stage.y = -w.getCurrentLine().getTailVecPos().pos.y + stageHeight/2;
	};
	window["setWave"] = function (w) {
	    wave = w;
	};
	var resize = function () {
	    var width = canvas.offsetWidth;
	    var height = canvas.offsetHeight;
	    stageWidth = width;
	    stageHeight = height;
	    renderer.resize(width, height);
	};
	window.onload = init;
	//100コミット
	console.log("call function 'setWave(freq)' to set wave frequency.");


/***/ }
/******/ ]);