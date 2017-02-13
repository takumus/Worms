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
	var props = {
	    parent: {
	        waveFreq: 0.12,
	        waveAmp: 16,
	        thickness: 15,
	        length: 30,
	        radius: 150,
	        radiusRandom: 50,
	        speed: 1.8
	    },
	    child: {
	        waveFreq: 0.2,
	        waveAmp: 10,
	        thickness: 13,
	        length: 25,
	        radius: 50,
	        radiusRandom: 60,
	        speed: 1.9
	    },
	    global: {
	        guide: false,
	        speed: 1,
	        color: 2392462
	    }
	};
	var defaultProps = {};
	function initGUI() {
	    var gui = new dat.GUI();
	    var parent = gui.addFolder("Parent worm");
	    parent.add(props.parent, 'speed', 0.1, 10);
	    parent.add(props.parent, 'waveFreq', 0, 0.5);
	    parent.add(props.parent, 'waveAmp', 0, 100);
	    parent.add(props.parent, 'thickness', 1, 400).onChange(function () {
	        worms[0].getOption().thickness = props.parent.thickness;
	    });
	    parent.add(props.parent, 'length', 2, 200).onChange(function () {
	        worms[0].setLength(props.parent.length);
	        worms[0].getOption().headLength = props.parent.length * 0.3;
	        worms[0].getOption().tailLength = props.parent.length * 0.7;
	    });
	    var parentTurn = parent.addFolder("turn");
	    parentTurn.add(props.parent, 'radius', 0, 500);
	    parentTurn.add(props.parent, 'radiusRandom', 0, 500);
	    parent.open();
	    var child = gui.addFolder("Child worm");
	    child.add(props.child, 'speed', 0.1, 20);
	    child.add(props.child, 'waveFreq', 0, 0.5);
	    child.add(props.child, 'waveAmp', 0, 100);
	    child.add(props.child, 'thickness', 1, 200).onChange(function () {
	        for (var i = 1; i < worms.length; i++) {
	            worms[i].getOption().thickness = props.child.thickness;
	        }
	    });
	    child.add(props.child, 'length', 2, 200).onChange(function () {
	        for (var i = 1; i < worms.length; i++) {
	            worms[i].setLength(props.child.length);
	            worms[i].getOption().headLength = props.child.length * 0.3;
	            worms[i].getOption().tailLength = props.child.length * 0.7;
	        }
	    });
	    var childTurn = child.addFolder("turn");
	    childTurn.add(props.child, 'radius', 0, 500);
	    childTurn.add(props.child, 'radiusRandom', 0, 500);
	    child.open();
	    gui.add(props.global, 'guide').onChange(function () {
	        wormsGuideContainer.visible = props.global.guide;
	    });
	    gui.add(props.global, 'speed', 0, 10);
	    gui.addColor(props.global, 'color');
	    gui.add({ reset: function () {
	            gui.revert(gui);
	        } }, "reset");
	    wormsGuideContainer.visible = props.global.guide;
	}
	function initPIXI() {
	    renderer = PIXI.autoDetectRenderer(800, 800, { antialias: true, resolution: 2, transparent: false });
	    canvas = document.getElementById("content");
	    canvas.appendChild(renderer.view);
	    renderer.view.style.width = "100%";
	    renderer.view.style.height = "100%";
	    window.addEventListener("resize", resize);
	    window.addEventListener('orientationchange', resize);
	}
	function init() {
	    initGUI();
	    initPIXI();
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
	    //generate worms
	    for (var i = 0; i < 18; i++) {
	        var length_1 = i == 0 ? props.parent.length : props.child.length;
	        var headLength = length_1 * 0.3;
	        var tailLength = length_1 * 0.7;
	        var thickness = i == 0 ? props.parent.thickness : props.child.thickness;
	        var fillColor = i != 0 ? props.global.color : 0x000000;
	        var borderColor = i != 0 ? 0x000000 : props.global.color;
	        var borderThickness = i != 0 ? 0 : 2;
	        var w = new WORMS.Nasty2(length_1, {
	            headLength: headLength,
	            tailLength: tailLength,
	            thickness: thickness,
	            fillColor: fillColor,
	            borderColor: borderColor,
	            borderThickness: borderThickness
	        });
	        w.blendMode = PIXI.BLEND_MODES.ADD;
	        w.setStep(1);
	        worms.push(w);
	        stage.addChild(w);
	        var g = new PIXI.Graphics();
	        wormsGuide.push(g);
	        wormsGuideContainer.addChild(g);
	    }
	    draw();
	    resize();
	}
	function draw() {
	    requestAnimationFrame(draw);
	    for (var i = 0; i < worms.length; i++) {
	        var w = worms[i];
	        var g = wormsGuide[i];
	        var opt = w.getOption();
	        opt.fillColor = i != 0 ? props.global.color : 0x000000;
	        opt.borderColor = i != 0 ? 0x000000 : props.global.color;
	        if (w.getStep() == 1 || (i == 0 && pressing)) {
	            var vpos = void 0;
	            var route = void 0;
	            if (i != 0) {
	                //child
	                vpos = worms[0].getTailVecPos().clone();
	                vpos.pos.x += Math.random() * 300 - 150;
	                vpos.pos.y += Math.random() * 300 - 150;
	                vpos.add(Math.PI);
	                route = ROUTES.RouteGenerator.getMinimumRoute(w.getHeadVecPos(), vpos, props.child.radiusRandom * Math.random() + props.child.radius, props.child.radiusRandom * Math.random() + props.child.radius, 5);
	                route.wave(props.child.waveAmp, props.child.waveFreq, true);
	            }
	            else {
	                //parent
	                if (pressing) {
	                    var dx = mouse.x - w.getHeadVecPos().pos.x;
	                    var dy = mouse.y - w.getHeadVecPos().pos.y;
	                    vpos = new UTILS.VecPos(mouse.x, mouse.y, Math.atan2(dy, dx));
	                }
	                else {
	                    var p = 0.8;
	                    vpos = new UTILS.VecPos(stageWidth * (1 - p) / 2 + stageWidth * p * Math.random(), stageHeight * (1 - p) / 2 + stageHeight * p * Math.random(), Matthew.D_PI * Math.random());
	                }
	                route = ROUTES.RouteGenerator.getMinimumRoute(w.getHeadVecPos(), vpos, props.parent.radiusRandom * Math.random() + props.parent.radius, props.parent.radiusRandom * Math.random() + props.parent.radius, 5);
	                route.wave(props.parent.waveAmp, props.parent.waveFreq, true);
	            }
	            w.addRouteFromCurrent(route);
	            w.setStep(0);
	            if (props.global.guide) {
	                var h = route.head();
	                var t = route.tail();
	                g.clear();
	                g.lineStyle(1, i != 0 ? 0x333333 : 0x999999);
	                g.drawCircle(h.x, h.y, 10);
	                g.drawCircle(t.x, t.y, 10);
	                g.moveTo(h.x, h.y);
	                for (var n = 1; n < route.getLength(); n++) {
	                    var p = route.at(n);
	                    g.lineTo(p.x, p.y);
	                }
	            }
	            pressing = false;
	        }
	        w.addStep((i != 0 ? props.child.speed : props.parent.speed) * props.global.speed);
	        w.render();
	    }
	    renderer.render(stage);
	}
	function resize() {
	    stageWidth = canvas.offsetWidth;
	    stageHeight = canvas.offsetHeight;
	    renderer.resize(stageWidth, stageHeight);
	}
	window.onload = init;
	//100コミット 


/***/ }
/******/ ]);