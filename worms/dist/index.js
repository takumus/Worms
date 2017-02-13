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

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var WORMS;
	(function (WORMS) {
	    var Base = (function (_super) {
	        __extends(Base, _super);
	        function Base(length) {
	            var _this = _super.call(this) || this;
	            _this.step = 0;
	            _this.routeIndex = 0;
	            _this.bone = new ROUTES.Line();
	            _this.setLength(length);
	            return _this;
	        }
	        Base.prototype.setLength = function (length) {
	            this.length = Math.floor(length);
	            this.bone.clear();
	            for (var i = 0; i < length; i++) {
	                this.bone.push(new UTILS.Pos());
	            }
	            //re set bones
	            this.setStep(this.step);
	        };
	        Base.prototype.push = function (x, y) {
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
	        Base.prototype.render = function () {
	        };
	        Base.prototype.addRouteFromCurrent = function (line) {
	            this.setRoute(this.getCurrentLine().pushLine(line));
	        };
	        Base.prototype.setRoute = function (line) {
	            if (line.getLength() < this.length)
	                return;
	            this.line = line;
	        };
	        Base.prototype.addStep = function (step) {
	            var length = this.line.getLength() - this.length;
	            var p = step / length;
	            if (p <= 0) {
	                this.setStep(1);
	                return false;
	            }
	            return this.setStep(this.step + p);
	        };
	        Base.prototype.setStep = function (step) {
	            if (step < 0)
	                step = 0;
	            if (step > 1)
	                step = 1;
	            this.step = step;
	            if (!this.line)
	                return false;
	            var beginIndex = this.length - 1;
	            var length = this.line.getLength() - beginIndex - 1;
	            var posIndex = Math.floor(length * step);
	            var offset = (length * step - posIndex);
	            for (var i = 0; i < this.bone.getLength(); i++) {
	                var id = beginIndex - i + posIndex;
	                var b = this.bone.at(i);
	                var l = this.line.at(id);
	                var nl = this.line.at(id + 1);
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
	        Base.prototype.getStep = function () {
	            return this.step;
	        };
	        Base.prototype.reverse = function () {
	            this.bone.reverse();
	        };
	        Base.prototype.getCurrentLine = function () {
	            //console.log(this.bone);
	            return this.bone.clone().reverse();
	        };
	        Base.prototype.getHeadVecPos = function () {
	            return this.bone.getHeadVecPos().add(Math.PI);
	        };
	        Base.prototype.getTailVecPos = function () {
	            return this.bone.getTailVecPos().add(Math.PI);
	        };
	        Base.prototype.getRoute = function () {
	            return this.line;
	        };
	        return Base;
	    }(PIXI.Graphics));
	    WORMS.Base = Base;
	})(WORMS || (WORMS = {}));
	///<reference path="@base.ts" />
	var WORMS;
	(function (WORMS) {
	    var Nasty = (function (_super) {
	        __extends(Nasty, _super);
	        function Nasty(length, thickness, fillColor, borderColor) {
	            if (fillColor === void 0) { fillColor = 0xffffff; }
	            if (borderColor === void 0) { borderColor = 0x000000; }
	            var _this = _super.call(this, length) || this;
	            _this.thickness = thickness / 2;
	            _this.body = [];
	            for (var i = 0; i < length; i++) {
	                _this.body.push(new BodyPos());
	            }
	            _this.setColor(fillColor, borderColor);
	            return _this;
	        }
	        Nasty.prototype.setColor = function (fillColor, borderColor) {
	            this.colors = {
	                fill: fillColor,
	                border: borderColor
	            };
	        };
	        Nasty.prototype.render = function () {
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
	                var r = ((Math.sin(i / (this.bone.getLength() - 1) * (Math.PI)))) * this.thickness;
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
	            this.lineStyle(3, this.colors.border);
	            this.beginFill(this.colors.fill);
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
	///<reference path="@base.ts" />
	var WORMS;
	(function (WORMS) {
	    var Simple = (function (_super) {
	        __extends(Simple, _super);
	        function Simple(length, thickness, fillColor, borderColor) {
	            if (fillColor === void 0) { fillColor = 0x000000; }
	            if (borderColor === void 0) { borderColor = 0xffffff; }
	            var _this = _super.call(this, length) || this;
	            _this.thickness = thickness;
	            _this.setColor(fillColor, borderColor);
	            return _this;
	        }
	        Simple.prototype.setColor = function (fillColor, borderColor) {
	            this.colors = {
	                fill: fillColor,
	                border: borderColor
	            };
	        };
	        Simple.prototype.render = function () {
	            this.clear();
	            this.renderWith(this.colors.border, this.thickness);
	            this.renderWith(this.colors.fill, this.thickness * 0.7);
	        };
	        Simple.prototype.renderWith = function (color, thickness) {
	            var bbone = this.bone.at(0);
	            var ebone = this.bone.at(this.bone.getLength() - 1);
	            this.beginFill(color);
	            this.drawCircle(bbone.x, bbone.y, thickness / 2);
	            this.endFill();
	            this.lineStyle(thickness, color);
	            this.moveTo(bbone.x, bbone.y);
	            for (var i = 1; i < this.bone.getLength() - 1; i++) {
	                var nbone = this.bone.at(i);
	                this.lineTo(nbone.x, nbone.y);
	            }
	            this.lineTo(ebone.x, ebone.y);
	            this.lineStyle();
	            this.beginFill(color);
	            this.drawCircle(ebone.x, ebone.y, thickness / 2);
	            this.endFill();
	        };
	        return Simple;
	    }(WORMS.Base));
	    WORMS.Simple = Simple;
	})(WORMS || (WORMS = {}));
	///<reference path="@base.ts" />
	///<reference path="nasty.ts" />
	///<reference path="simple.ts" />
	window["WORMS"] = WORMS;
	///<reference path="@base.ts" />
	var WORMS;
	(function (WORMS) {
	    var Nasty2 = (function (_super) {
	        __extends(Nasty2, _super);
	        function Nasty2(length, option) {
	            if (option === void 0) { option = { thickness: 10 }; }
	            var _this = _super.call(this, length) || this;
	            _this.setOption(option);
	            return _this;
	        }
	        Nasty2.prototype.setLength = function (length) {
	            _super.prototype.setLength.call(this, length);
	            this.body = [];
	            for (var i = 0; i < length; i++) {
	                this.body.push(new BodyPos());
	            }
	        };
	        Nasty2.prototype.setOption = function (option) {
	            this._option = option;
	            option.headLength = UTILS.def(option.headLength, 0);
	            option.tailLength = UTILS.def(option.tailLength, 0);
	            option.fillColor = UTILS.def(option.fillColor, 0xff0000);
	            option.borderColor = UTILS.def(option.borderColor, 0x0000ff);
	            option.borderThickness = UTILS.def(option.borderThickness, 5);
	        };
	        Nasty2.prototype.getOption = function () {
	            return this._option;
	        };
	        Nasty2.prototype.render = function () {
	            var bbone = this.bone.at(0);
	            //ワームの外殻を生成
	            var ebone = this.bone.at(this.bone.getLength() - 1);
	            var bbody = this.body[0];
	            var ebody = this.body[this.body.length - 1];
	            bbody.left.x = bbone.x;
	            bbody.left.y = bbone.y;
	            var L = this.bone.getLength() - 1;
	            for (var i = 1; i < L; i++) {
	                var nbone = this.bone.at(i);
	                var nbody = this.body[i];
	                var vx = this.bone.at(i - 1).x - nbone.x;
	                var vy = this.bone.at(i - 1).y - nbone.y;
	                var radian = Matthew.H_PI;
	                if (i < this._option.headLength) {
	                    radian = i / this._option.headLength * Matthew.H_PI;
	                }
	                else if (i > L - this._option.tailLength) {
	                    radian = (i - (L - this._option.tailLength)) / this._option.tailLength * Matthew.H_PI + Matthew.H_PI;
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
	            this.clear();
	            this.lineStyle(this._option.borderThickness, this._option.borderColor);
	            this.beginFill(this._option.fillColor);
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
	        return Nasty2;
	    }(WORMS.Base));
	    WORMS.Nasty2 = Nasty2;
	    var BodyPos = (function () {
	        function BodyPos() {
	            this.left = new UTILS.Pos();
	            this.right = new UTILS.Pos();
	        }
	        return BodyPos;
	    }());
	})(WORMS || (WORMS = {}));


/***/ }
/******/ ]);