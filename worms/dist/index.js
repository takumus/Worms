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
	var WORMS;
	(function (WORMS) {
	    var Base = (function () {
	        function Base(length) {
	            this._step = 0;
	            this._bone = new ROUTES.Line();
	            this.setLength(length);
	        }
	        Base.prototype.setLength = function (length) {
	            this.prevLength = Math.floor(length);
	            this.allocLength(length);
	        };
	        Base.prototype.updateLength = function () {
	            var pl = this._route.length - this.prevLength;
	            this.setLength(this._length);
	            var nl = this._route.length - this.prevLength;
	            if (pl > 0 && nl > 0) {
	                var pdf = pl - pl * this._step;
	                var p = (nl - pdf) / nl;
	                this.setStep(p);
	            }
	        };
	        Base.prototype.allocLength = function (length) {
	            length = Math.floor(length);
	            this.diffLength = length - this.prevLength;
	            this._bone.clear();
	            var L = this.prevLength > length ? this.prevLength : length;
	            for (var i = 0; i < L; i++) {
	                this._bone.push(new UTILS.Pos());
	            }
	            // re set bones
	            this.setStep(this._step);
	        };
	        Base.prototype.render = function () {
	        };
	        Base.prototype.setRoute = function (line, nextLength) {
	            if (line.length < this.prevLength)
	                return;
	            this._step = 0;
	            this._route = line;
	            this.allocLength(UTILS.def(nextLength, this._length));
	        };
	        Base.prototype.addStep = function (step) {
	            var length = this._route.length - this.prevLength;
	            var p = step / length;
	            if (p < 0) {
	                this.setStep(1);
	                return false;
	            }
	            return this.setStep(this._step + p);
	        };
	        Base.prototype.setStep = function (step) {
	            if (step < 0)
	                step = 0;
	            if (step > 1)
	                step = 1;
	            var s = step * 1.2;
	            s = s > 1 ? 1 : s;
	            this._length = Math.floor(s * this.diffLength + this.prevLength);
	            this._step = step;
	            if (!this._route)
	                return false;
	            var beginIndex = this.prevLength - 1;
	            var length = this._route.length - beginIndex - 1;
	            var posIndex = Math.floor(length * step);
	            var offset = (length * step - posIndex);
	            for (var i = 0; i < this._bone.length; i++) {
	                var id = beginIndex - i + posIndex;
	                var b = this._bone[i];
	                var l = this._route[id];
	                var nl = this._route[id + 1];
	                if (!l)
	                    continue;
	                var dx = 0;
	                var dy = 0;
	                if (nl) {
	                    dx = (nl.x - l.x) * offset;
	                    dy = (nl.y - l.y) * offset;
	                }
	                b.x = l.x + dx;
	                b.y = l.y + dy;
	            }
	            return true;
	        };
	        Object.defineProperty(Base.prototype, "step", {
	            get: function () {
	                return this._step;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Base.prototype.reverse = function () {
	            this._bone.reverse();
	        };
	        Base.prototype.getCurrentLine = function () {
	            // console.log(this._bone);
	            var line = new ROUTES.Line();
	            var current = this._bone.clone();
	            for (var i = 0; i < this._length; i++) {
	                line.push(current[i].clone());
	            }
	            line.reverse();
	            return line;
	        };
	        Base.prototype.getHeadVecPos = function () {
	            return this._bone.getHeadVecPos().add(Math.PI);
	        };
	        Base.prototype.getTailVecPos = function () {
	            return this._bone.getTailVecPos().add(Math.PI);
	        };
	        Object.defineProperty(Base.prototype, "route", {
	            get: function () {
	                return this._route;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(Base.prototype, "length", {
	            get: function () {
	                return this.prevLength;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(Base.prototype, "currentLength", {
	            get: function () {
	                return this._length;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(Base.prototype, "bone", {
	            get: function () {
	                return this._bone;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Base.prototype.dispose = function () {
	            this._bone = null;
	            this._route = null;
	        };
	        return Base;
	    }());
	    WORMS.Base = Base;
	})(WORMS || (WORMS = {}));
	///<reference path="@base.ts" />
	window['WORMS'] = WORMS;
	var WORMS;
	(function (WORMS) {
	    var Nasty = (function (_super) {
	        __extends(Nasty, _super);
	        function Nasty(length, option) {
	            if (option === void 0) { option = { thickness: 10 }; }
	            var _this = _super.call(this, length) || this;
	            _this.setOption(option);
	            _this.graphics = new PIXI.Graphics();
	            return _this;
	        }
	        Nasty.prototype.allocLength = function (length) {
	            _super.prototype.allocLength.call(this, length);
	            this.bodyPos = [];
	            for (var i = 0; i < this.bone.length; i++) {
	                this.bodyPos.push(new BodyPos());
	            }
	        };
	        Nasty.prototype.setOption = function (option) {
	            this._option = option;
	            option.headLength = UTILS.def(option.headLength, 0.5);
	            option.tailLength = UTILS.def(option.tailLength, 0.5);
	            option.fillColor = UTILS.def(option.fillColor, 0xff0000);
	            option.borderColor = UTILS.def(option.borderColor, 0x0000ff);
	            option.borderThickness = UTILS.def(option.borderThickness, 5);
	        };
	        Nasty.prototype.getOption = function () {
	            return this._option;
	        };
	        Nasty.prototype.render = function () {
	            var bbone = this.bone[0];
	            // ワームの外殻を生成
	            var ebone = this.bone[this.currentLength - 1];
	            var bbody = this.bodyPos[0];
	            var ebody = this.bodyPos[this.currentLength - 1];
	            bbody.left.x = bbone.x;
	            bbody.left.y = bbone.y;
	            var L = this.currentLength - 1;
	            for (var i = 1; i < L; i++) {
	                var nbone = this.bone[i];
	                var nbody = this.bodyPos[i];
	                var vx = this.bone[i - 1].x - nbone.x;
	                var vy = this.bone[i - 1].y - nbone.y;
	                var radian = Matthew.H_PI;
	                var headLength = this.currentLength * this._option.headLength;
	                var tailLength = this.currentLength * this._option.tailLength;
	                if (i < headLength) {
	                    radian = i / headLength * Matthew.H_PI;
	                }
	                else if (i > L - tailLength) {
	                    radian = (i - (L - tailLength)) / tailLength * Matthew.H_PI + Matthew.H_PI;
	                }
	                var r = Math.sin(radian) * this._option.thickness;
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
	            this.graphics.clear();
	            this.graphics.lineStyle(this._option.borderThickness, this._option.borderColor);
	            this.graphics.beginFill(this._option.fillColor);
	            this.graphics.moveTo(bbody.left.x, bbody.left.y);
	            for (var i = 1; i < this.currentLength; i++) {
	                this.graphics.lineTo(this.bodyPos[i].left.x, this.bodyPos[i].left.y);
	            }
	            for (var i = this.currentLength - 2; i >= 2; i--) {
	                this.graphics.lineTo(this.bodyPos[i].right.x, this.bodyPos[i].right.y);
	            }
	            this.graphics.lineTo(bbody.left.x, bbody.left.y);
	            this.graphics.endFill();
	        };
	        return Nasty;
	    }(WORMS.Base));
	    WORMS.Nasty = Nasty;
	    var BodyPos = (function () {
	        function BodyPos() {
	            this.left = new UTILS.Pos();
	            this.right = new UTILS.Pos();
	        }
	        return BodyPos;
	    }());
	})(WORMS || (WORMS = {}));
	var WORMS;
	(function (WORMS) {
	    var Simple = (function (_super) {
	        __extends(Simple, _super);
	        function Simple(length, option) {
	            var _this = _super.call(this, length) || this;
	            _this.bodyGraphics = new PIXI.Graphics();
	            _this.shadowGraphics = new PIXI.Graphics();
	            _this.setOption(option);
	            _this.setVisible(true);
	            return _this;
	        }
	        Simple.prototype.setOption = function (option) {
	            this.option = option;
	            option.fillColor = UTILS.def(option.fillColor, 0xff0000);
	            option.shadow = UTILS.def(option.shadow, false);
	            option.shadowColor = UTILS.def(option.shadowColor, 0xCCCCCC);
	            option.shadowPosition = UTILS.def(option.shadowPosition, new UTILS.Pos());
	            option.shadowThickness = UTILS.def(option.shadowThickness, option.thickness);
	        };
	        Simple.prototype.getOption = function () {
	            return this.option;
	        };
	        Simple.prototype.render = function () {
	            if (this.option.shadow) {
	                this.renderWith(this.shadowGraphics, this.option.shadowColor, this.option.shadowThickness, this.option.shadowPosition.x, this.option.shadowPosition.y);
	            }
	            this.renderWith(this.bodyGraphics, this.option.fillColor, this.option.thickness, 0, 0);
	        };
	        Simple.prototype.renderWith = function (graphics, color, thickness, offsetX, offsetY) {
	            graphics.clear();
	            var bbone = this.bone[0];
	            var ebone = this.bone[this.currentLength - 1];
	            graphics.beginFill(color);
	            graphics.drawCircle(bbone.x + offsetX, bbone.y + offsetY, thickness / 2);
	            graphics.endFill();
	            graphics.lineStyle(thickness, color);
	            graphics.moveTo(bbone.x + offsetX, bbone.y + offsetY);
	            for (var i = 1; i < this.currentLength - 1; i++) {
	                var nbone = this.bone[i];
	                graphics.lineTo(nbone.x + offsetX, nbone.y + offsetY);
	            }
	            graphics.lineTo(ebone.x + offsetX, ebone.y + offsetY);
	            graphics.lineStyle();
	            graphics.beginFill(color);
	            graphics.drawCircle(ebone.x + offsetX, ebone.y + offsetY, thickness / 2);
	            graphics.endFill();
	        };
	        Simple.prototype.setVisible = function (visible) {
	            this.visible = visible;
	            this.bodyGraphics.visible = this.shadowGraphics.visible = visible;
	        };
	        Simple.prototype.getVisible = function () {
	            return this.visible;
	        };
	        return Simple;
	    }(WORMS.Base));
	    WORMS.Simple = Simple;
	})(WORMS || (WORMS = {}));


/***/ }
/******/ ]);