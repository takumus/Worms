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
	            _this.length = Math.floor(length);
	            _this.bone = new ROUTES.Line();
	            for (var i = 0; i < length; i++) {
	                _this.bone.push(new UTILS.Pos());
	            }
	            _this.routeIndex = 0;
	            return _this;
	        }
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
	            var p = 1 / this.line.getLength() * step;
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
	        return Base;
	    }(PIXI.Graphics));
	    WORMS.Base = Base;
	})(WORMS || (WORMS = {}));
	///<reference path="@base.ts" />
	var WORMS;
	(function (WORMS) {
	    var Nasty = (function (_super) {
	        __extends(Nasty, _super);
	        function Nasty(length, thickness) {
	            var _this = _super.call(this, length) || this;
	            _this.thickness = thickness / 2;
	            _this.body = [];
	            for (var i = 0; i < length; i++) {
	                _this.body.push(new BodyPos());
	            }
	            return _this;
	        }
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
	            this.lineStyle(3, 0);
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
	        function Simple(length, thickness) {
	            var _this = _super.call(this, length) || this;
	            _this.thickness = thickness;
	            return _this;
	        }
	        Simple.prototype.render = function () {
	            this.clear();
	            this.renderWith(0xffffff, this.thickness);
	            this.renderWith(0x000000, this.thickness * 0.7);
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


/***/ }
/******/ ]);