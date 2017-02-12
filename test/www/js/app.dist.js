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
	var wormsGuide = [];
	var wormsGuideContainer = new PIXI.Container();
	var pressing = false;
	var guide = true;
	var parentProps = {
	    waveFreq: 0.12,
	    waveAmp: 16,
	    thickness: 15,
	    length: 30,
	    speed: 1.8
	};
	var childProps = {
	    waveFreq: 0.2,
	    waveAmp: 10,
	    thickness: 13,
	    length: 25,
	    speed: 1.9
	};
	var globalProps = {
	    guide: false,
	    speed: 1,
	    color: 2392462
	};
	var init = function () {
	    {
	        var gui = new dat.GUI();
	        var parent_1 = gui.addFolder("Parent worm");
	        parent_1.add(parentProps, 'waveFreq', 0, 1);
	        parent_1.add(parentProps, 'waveAmp', 0, 100);
	        parent_1.add(parentProps, 'thickness', 1, 200).onChange(function () {
	            worms[0].getOption().thickness = parentProps.thickness;
	        });
	        parent_1.add(parentProps, 'length', 2, 200).onChange(function () {
	            worms[0].setLength(parentProps.length);
	            worms[0].getOption().headLength = parentProps.length * 0.3;
	            worms[0].getOption().tailLength = parentProps.length * 0.7;
	        });
	        parent_1.add(parentProps, 'speed', 0.1, 10);
	        parent_1.open();
	        var child = gui.addFolder("Child worm");
	        child.add(childProps, 'waveFreq', 0, 1);
	        child.add(childProps, 'waveAmp', 0, 100);
	        child.add(childProps, 'thickness', 1, 200).onChange(function () {
	            for (var i = 1; i < worms.length; i++) {
	                worms[i].getOption().thickness = childProps.thickness;
	            }
	        });
	        child.add(childProps, 'length', 2, 200).onChange(function () {
	            for (var i = 1; i < worms.length; i++) {
	                worms[i].setLength(childProps.length);
	                worms[i].getOption().headLength = childProps.length * 0.3;
	                worms[i].getOption().tailLength = childProps.length * 0.7;
	            }
	        });
	        child.add(childProps, 'speed', 0.1, 10);
	        child.open();
	        gui.add(globalProps, 'guide').onChange(function () {
	            wormsGuideContainer.visible = globalProps.guide;
	        });
	        gui.add(globalProps, 'speed', 0, 10);
	        gui.addColor(globalProps, 'color');
	    }
	    wormsGuideContainer.visible = false;
	    //window.devicePixelRatio;
	    renderer = PIXI.autoDetectRenderer(800, 800, { antialias: true, resolution: 2, transparent: false });
	    canvas = document.getElementById("content");
	    canvas.appendChild(renderer.view);
	    renderer.view.style.width = "100%";
	    renderer.view.style.height = "100%";
	    window.addEventListener("resize", resize);
	    window.addEventListener('orientationchange', resize);
	    window.addEventListener("mousedown", function (e) {
	        if (e.target.tagName != "CANVAS")
	            return;
	        pressing = true;
	        prevMouse.x = mouse.x = e.clientX;
	        prevMouse.y = mouse.y = e.clientY;
	    });
	    window.addEventListener("mousemove", function (e) {
	        mouse.x = e.clientX;
	        mouse.y = e.clientY;
	    });
	    window.addEventListener("mouseup", function () {
	        pressing = false;
	    });
	    stage.addChild(wormsGuideContainer);
	    for (var i = 0; i < 18; i++) {
	        var l = i == 0 ? parentProps.length : childProps.length;
	        var t = i == 0 ? parentProps.thickness : childProps.thickness;
	        var w = new WORMS.Nasty2(l, {
	            headLength: l * 0.3,
	            tailLength: l * 0.7,
	            thickness: t,
	            fillColor: i != 0 ? globalProps.color : 0x000000,
	            borderColor: i != 0 ? 0x000000 : globalProps.color,
	            borderThickness: i != 0 ? 0 : 2
	        });
	        worms.push(w);
	        stage.addChild(w);
	        w.blendMode = PIXI.BLEND_MODES.ADD;
	        w.setStep(1);
	        var g = new PIXI.Graphics();
	        wormsGuide.push(g);
	        wormsGuideContainer.addChild(g);
	    }
	    draw();
	    resize();
	};
	var draw = function () {
	    requestAnimationFrame(draw);
	    var target = mouse;
	    var mouseRadian = Math.atan2(target.y - prevMouse.y, target.x - prevMouse.x);
	    for (var i = 0; i < worms.length; i++) {
	        var w = worms[i];
	        var g = wormsGuide[i];
	        var opt = w.getOption();
	        opt.fillColor = i != 0 ? globalProps.color : 0x000000;
	        opt.borderColor = i != 0 ? 0x000000 : globalProps.color;
	        if (w.getStep() == 1 || i == 0 && pressing && !w.getRoute().tail().equals(target)) {
	            var pos = void 0;
	            if (i != 0) {
	                pos = worms[0].getTailVecPos().clone();
	                pos.pos.x += Math.random() * 300 - 150;
	                pos.pos.y += Math.random() * 300 - 150;
	                pos.add(Math.PI);
	            }
	            else {
	                var p = 0.5;
	                var dx = mouse.x - w.getHeadVecPos().pos.x;
	                var dy = mouse.y - w.getHeadVecPos().pos.y;
	                pos = new UTILS.VecPos(pressing ? target.x : stageWidth * (1 - p) / 2 + stageWidth * p * Math.random(), pressing ? target.y : stageHeight * (1 - p) / 2 + stageHeight * p * Math.random(), Math.atan2(dy, dx));
	            }
	            //w.reverse();
	            var r = ROUTES.RouteGenerator.getMinimumRoute(w.getHeadVecPos(), pos, i == 0 ? 200 : 50 * Math.random() + 60, i == 0 ? 200 : 50 * Math.random() + 60, 5);
	            //r.pop();
	            r.wave(i == 0 ? parentProps.waveAmp : childProps.waveAmp, i == 0 ? parentProps.waveFreq : childProps.waveFreq, i != 0);
	            w.addRouteFromCurrent(r);
	            w.setStep(0);
	            g.clear();
	            if (guide) {
	                var L = r.getLength();
	                var h = r.head();
	                var t = r.tail();
	                var gc = i != 0 ? 0x333333 : 0x999999;
	                g.lineStyle(1, gc);
	                g.drawCircle(h.x, h.y, 10);
	                g.drawCircle(t.x, t.y, 10);
	                g.moveTo(h.x, h.y);
	                for (var n = 1; n < L; n++) {
	                    var p = r.at(n);
	                    g.lineTo(p.x, p.y);
	                }
	            }
	            pressing = false;
	        }
	        w.addStep((i != 0 ? childProps.speed : parentProps.speed) * globalProps.speed);
	        var add = Math.sin(w.getHeadVecPos().r) * 2;
	        //w.addStep(add > 0?add:0);
	        w.render();
	    }
	    TWEEN.update();
	    renderer.render(stage);
	    //stage.x = -w.getCurrentLine().getTailVecPos().pos.x + stageWidth/2;
	    //stage.y = -w.getCurrentLine().getTailVecPos().pos.y + stageHeight/2;
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