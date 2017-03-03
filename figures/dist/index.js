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
	var WF;
	(function (WF) {
	    var HoldableWorm = (function (_super) {
	        __extends(HoldableWorm, _super);
	        function HoldableWorm(length) {
	            return _super.call(this, length) || this;
	        }
	        HoldableWorm.prototype.dispose = function () {
	            this.holder = null;
	            this.prevHolder = null;
	            this.holderMaster = null;
	        };
	        HoldableWorm.prototype.setHolder = function (holder, def) {
	            if (def === void 0) { def = false; }
	            if (def)
	                this.holder = holder;
	            this.prevHolder = this.holder;
	            this.holder = holder;
	        };
	        return HoldableWorm;
	    }(WORMS.Base));
	    WF.HoldableWorm = HoldableWorm;
	    var FigureWorm = (function (_super) {
	        __extends(FigureWorm, _super);
	        function FigureWorm(length, option) {
	            var _this = _super.call(this, length) || this;
	            _this.setOption(option);
	            _this._id = FigureWorm._id;
	            FigureWorm.worms[_this._id] = _this;
	            FigureWorm._id++;
	            return _this;
	        }
	        FigureWorm.render = function () {
	            this.graphics.clear();
	            for (var id in this.worms) {
	                var worm = this.worms[id];
	                worm.render();
	            }
	        };
	        FigureWorm.getWorms = function () {
	            var _this = this;
	            return Object.keys(this.worms).map(function (key) { return _this.worms[key]; });
	        };
	        FigureWorm.prototype.setOption = function (option) {
	            this.option = option;
	            option.fillColor = UTILS.def(option.fillColor, 0xff0000);
	        };
	        FigureWorm.prototype.getOption = function () {
	            return this.option;
	        };
	        FigureWorm.prototype.render = function () {
	            this.renderWith(FigureWorm.graphics, this.option.fillColor, this.option.thickness, 0, 0);
	        };
	        FigureWorm.prototype.dispose = function () {
	            this.option = null;
	            FigureWorm.worms[this._id] = null;
	            delete FigureWorm.worms[this._id];
	        };
	        FigureWorm.prototype.renderWith = function (graphics, color, thickness, offsetX, offsetY) {
	            var bbone = this.bone.at(0);
	            var ebone = this.bone.at(this.length - 1);
	            graphics.beginFill(color);
	            graphics.drawCircle(bbone.x + offsetX, bbone.y + offsetY, thickness / 2);
	            graphics.endFill();
	            graphics.lineStyle(thickness, color);
	            graphics.moveTo(bbone.x + offsetX, bbone.y + offsetY);
	            for (var i = 1; i < this.length - 1; i++) {
	                var nbone = this.bone.at(i);
	                graphics.lineTo(nbone.x + offsetX, nbone.y + offsetY);
	            }
	            graphics.lineTo(ebone.x + offsetX, ebone.y + offsetY);
	            graphics.lineStyle();
	            graphics.beginFill(color);
	            graphics.drawCircle(ebone.x + offsetX, ebone.y + offsetY, thickness / 2);
	            graphics.endFill();
	        };
	        return FigureWorm;
	    }(HoldableWorm));
	    FigureWorm.worms = {};
	    FigureWorm._id = 0;
	    WF.FigureWorm = FigureWorm;
	    function createWorm(length, holder) {
	        var worm = new FigureWorm(length, { thickness: 30 });
	        worm.setHolder(holder, true);
	        holder.setStep(worm, 0);
	        return worm;
	    }
	    WF.createWorm = createWorm;
	})(WF || (WF = {}));
	var WF;
	(function (WF) {
	    var Figure = (function () {
	        function Figure() {
	            this.lines = [];
	        }
	        Figure.prototype.initWithOject = function (data) {
	            var _this = this;
	            this.lines = [];
	            data.forEach(function (lo) { return _this.lines.push(new ROUTES.Line(lo)); });
	            this._length = this.lines.length;
	        };
	        Figure.prototype.initWithLines = function (data) {
	            var _this = this;
	            this.lines = [];
	            data.forEach(function (line) { return _this.lines.push(line.clone()); });
	            this._length = this.lines.length;
	        };
	        Object.defineProperty(Figure.prototype, "length", {
	            get: function () {
	                return this.length;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Figure.prototype.at = function (id) {
	            return this.lines[id];
	        };
	        Figure.prototype.clone = function () {
	            var figure = new Figure();
	            figure.initWithLines(this.lines);
	            return figure;
	        };
	        Figure.prototype.setPositionOffset = function (pos) {
	            for (var i = 0; i < this._length; i++) {
	                this.at(i).setPositionOffset(pos);
	            }
	            return this;
	        };
	        return Figure;
	    }());
	    WF.Figure = Figure;
	})(WF || (WF = {}));
	var WF;
	(function (WF) {
	    var Holder = (function () {
	        function Holder() {
	            this._worms = [];
	        }
	        Object.defineProperty(Holder.prototype, "worms", {
	            get: function () { return this._worms; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(Holder.prototype, "figure", {
	            get: function () { return this._figure; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(Holder.prototype, "animating", {
	            get: function () { return this._animating; },
	            set: function (val) { this._animating = val; },
	            enumerable: true,
	            configurable: true
	        });
	        Holder.prototype.setFigure = function (figure) {
	            if (this._animating) {
	                console.error('Cannnot call "Holder.prototype.setFigure" while animating');
	                return;
	            }
	            this._figure = figure;
	        };
	        Holder.prototype.generate = function () {
	            if (this._animating) {
	                console.error('Cannnot call "Holder.prototype.generate" while animating');
	                return;
	            }
	            this.dispose();
	            for (var i = 0; i < this._figure.length; i++) {
	                var l = this._figure.at(i);
	                var w = WF.createWorm(l.getLength(), this);
	                w.setRoute(l);
	                this._worms.push(w);
	            }
	        };
	        Holder.prototype.dispose = function () {
	            if (this._animating) {
	                console.error('Cannnot call "Holder.prototype.clear" while animating');
	                return;
	            }
	            this._worms.forEach(function (worm) { return worm.dispose(); });
	            this.clear();
	        };
	        Holder.prototype.clear = function () {
	            this._worms = [];
	        };
	        Holder.prototype.setStepToAll = function (step) {
	            var _this = this;
	            if (!this._animating) {
	                console.error('Cannnot call "Holder.prototype.setStep" after completed animation');
	                return;
	            }
	            this._worms.forEach(function (worm) { return _this.setStep(worm, step); });
	        };
	        Holder.prototype.setStep = function (worm, step) {
	            worm.setStep(step);
	        };
	        return Holder;
	    }());
	    WF.Holder = Holder;
	})(WF || (WF = {}));
	var WF;
	(function (WF) {
	    var HolderMaster = (function () {
	        function HolderMaster() {
	        }
	        Object.defineProperty(HolderMaster.prototype, "holders", {
	            get: function () { return this._holders; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        HolderMaster.prototype.transformMe = function (me, option) {
	            return this.transform(me, me, option);
	        };
	        HolderMaster.prototype.transform = function (from, to, option) {
	            var _this = this;
	            option.wave = UTILS.def(option.wave, { enabled: false, amplitude: 0, frequency: 0 });
	            if (typeof option.radius == 'number') {
	                option.radius = { begin: option.radius, end: option.radius };
	            }
	            if (this.animating) {
	                console.error('Cannnot call "HolderMaster.prototype.transform" while animating');
	                return false;
	            }
	            var animatingHolders = false;
	            from.forEach(function (holder) { if (holder.animating)
	                animatingHolders = true; });
	            to.forEach(function (holder) { if (holder.animating)
	                animatingHolders = true; });
	            if (animatingHolders) {
	                console.error('Cannnot call "HolderMaster.prototype.transform" while Holder[] is animating');
	                return false;
	            }
	            this._holders = to;
	            this.step = 0;
	            var worms = [];
	            from.forEach(function (holder) {
	                holder.worms.forEach(function (worm) {
	                    worms.push(worm);
	                });
	                holder.clear();
	            });
	            // create init worms
	            if (worms.length == 0) {
	                to.forEach(function (holder) {
	                    holder.generate();
	                });
	                return true;
	            }
	            var lineCount = 0;
	            to.forEach(function (holder) { return lineCount += holder.figure.length; });
	            // create if need more worms
	            if (worms.length < lineCount) {
	                var prevWorms = worms.concat();
	                var prevWormsLength = prevWorms.length;
	                for (var i = prevWormsLength; i <= lineCount; i++) {
	                    var pw = prevWorms[Math.floor(Math.random() * prevWormsLength)];
	                    var w = WF.createWorm(pw.getLength(), pw.holder);
	                    w.setRoute(pw.getCurrentLine());
	                    worms.push(w);
	                }
	            }
	            // shuffle
	            UTILS.shuffle(worms);
	            UTILS.shuffle(to);
	            // generate route to figures
	            to.forEach(function (holder) {
	                for (var i = 0; i < holder.figure.length; i++) {
	                    var line = holder.figure.at(i);
	                    var worm = worms.pop();
	                    worm.setHolder(holder);
	                    _this.setRoute(worm, line, option);
	                    holder.worms.push(worm);
	                }
	                holder.animating = true;
	            });
	            worms.forEach(function (worm) {
	                var holder = to[Math.floor(Math.random() * to.length)];
	                var figure = holder.figure;
	                var target = figure.at(Math.floor(Math.random() * figure.length));
	                worm.setHolder(holder);
	                _this.setRoute(worm, target, option);
	                holder.worms.push(worm);
	            });
	            this.animating = true;
	            return true;
	        };
	        HolderMaster.prototype.setRoute = function (worm, target, option) {
	            target = target.clone();
	            if (Math.random() < 0.5)
	                worm.reverse();
	            if (Math.random() < 0.5)
	                target.reverse();
	            var route = ROUTES.RouteGenerator.getMinimumRoute(worm.getHeadVecPos(), target.getHeadVecPos(), option.radius.begin, option.radius.end, option.resolution);
	            if (option.wave.enabled)
	                route.wave(option.wave.amplitude, option.wave.frequency);
	            worm.setRoute(worm.getCurrentLine()
	                .pushLine(route)
	                .pushLine(target), target.getLength());
	        };
	        HolderMaster.prototype.endMovement = function () {
	            var _this = this;
	            if (!this.animating) {
	                console.error('Cannnot call "HolderMaster.prototype.endMovement" after completed animation');
	                return;
	            }
	            this._holders.forEach(function (holder) {
	                if (_this.step == 1) {
	                    // completely complete
	                    var removedWorms = holder.worms.splice(holder.figure.length);
	                    // holder.setStepToAll(1);
	                    holder.worms.forEach(function (worm) { return worm.updateLength(); });
	                    removedWorms.forEach(function (worm) { return worm.dispose(); });
	                    // console.log('completely complete!!');
	                }
	                else {
	                    // force complete
	                    holder.worms.forEach(function (worm) { return worm.updateLength(); });
	                    // console.log('force complete!!');
	                }
	                holder.animating = false;
	            });
	            this.autoTweening = false;
	            this.animating = false;
	            console.log('all worms:' + WF.FigureWorm.getWorms().length);
	        };
	        HolderMaster.prototype.autoTween = function (time, complete) {
	            var _this = this;
	            if (!this.animating) {
	                console.error('Cannnot call "HolderMaster.prototype.autoTween" while not animating');
	                return;
	            }
	            if (this.autoTweening) {
	                console.error('Cannnot call "HolderMaster.prototype.autoTween" while autoTweening');
	                return;
	            }
	            this.autoTweening = true;
	            var props = { s: 0 };
	            // move worms
	            new TWEEN.Tween(props)
	                .easing(TWEEN.Easing.Sinusoidal.InOut)
	                .to({ s: 1 }, time)
	                .onUpdate(function () {
	                _this.setStep(props.s);
	            })
	                .onComplete(function () {
	                _this.endMovement();
	                if (complete)
	                    complete();
	            })
	                .start();
	        };
	        HolderMaster.prototype.setStep = function (step) {
	            if (!this.animating) {
	                console.error('Cannnot call "HolderMaster.prototype.setStep" after completed animation');
	                return;
	            }
	            this.step = step;
	            this._holders.forEach(function (holder) {
	                if (!holder.animating) {
	                    console.error('already ended');
	                    return;
	                }
	                holder.setStepToAll(step);
	            });
	        };
	        return HolderMaster;
	    }());
	    WF.HolderMaster = HolderMaster;
	})(WF || (WF = {}));
	/// <reference path="./worms/worm.ts" />
	/// <reference path="./figures/figure.ts" />
	/// <reference path="./figures/holder.ts" />
	/// <reference path="./figures/holderMaster.ts" />
	window['WF'] = WF;


/***/ }
/******/ ]);