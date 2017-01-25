import {Circle, Pos, VecPos} from './utils';
import Matthew from './matthew';
class Route {
	public c1:Circle;
	public c2:Circle;
	public c1rb:number;
	public c2rb:number;
	public c1rl:number;
	public c2rl:number;
	
	constructor(c1:Circle, c2:Circle, c1rb:number, c2rb:number, c1rl:number, c2rl:number) {
		this.c1 = c1;
		this.c2 = c2;
		this.c1rb = c1rb;
		this.c2rb = c2rb;
		this.c1rl = c1rl;
		this.c2rl = c2rl;
	}
	
	public generateRoute(res:number, route:Array<VecPos> = null):Array<VecPos> {
		var _route:Array<VecPos>;
		if (route) {
			_route = route;
			_route.length = 0;
		} else {
			_route = new Array<VecPos>();
		}
		var c1rres:number = res / (this.c1.r * 2 * Matthew.PI) * Matthew.D_PI;
		var c2rres:number = res / (this.c2.r * 2 * Matthew.PI) * Matthew.D_PI;
		var _x:number = Math.cos(this.c1rb) * this.c1.r + this.c1.pos.x;
		var _y:number = Math.sin(this.c1rb) * this.c1.r + this.c1.pos.y;
		var tr:number;
		for (var _r:number = 0; _r < Matthew.abs(this.c1rl); _r += c1rres) {
			tr = this.c1rb + _r * this.c1.d;
			_x = Math.cos(tr) * this.c1.r + this.c1.pos.x;
			_y = Math.sin(tr) * this.c1.r + this.c1.pos.y;
			_route.push(new VecPos(_x, _y, tr + Matthew.H_PI * this.c1.d));
		}
		_route.pop();
		this.getLineRoot(
				new Pos(_x, _y),
				new Pos(
						Math.cos(this.c2rb) * this.c2.r + this.c2.pos.x,
						Math.sin(this.c2rb) * this.c2.r + this.c2.pos.y
				),
				res,
				_route
		);
		//trace(_x, _y, Math.cos(c2rb) * c2.r + c2.pos.x, Math.sin(c2rb) * c2.r + c2.pos.y)
		for (_r = 0; _r < Matthew.abs(this.c2rl) - c2rres; _r += c2rres) {
			tr = this.c2rb + _r * this.c2.d;
			_x = Math.cos(tr) * this.c2.r + this.c2.pos.x;
			_y = Math.sin(tr) * this.c2.r + this.c2.pos.y;
			_route.push(new VecPos(_x, _y, tr + Matthew.H_PI * this.c2.d));
		}
		_route.push(
				new VecPos(
						Math.cos(this.c2rb + (Matthew.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.pos.x,
						Math.sin(this.c2rb + (Matthew.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.pos.y,
						this.c2rb + Matthew.abs(this.c2rl) * this.c2.d + Matthew.H_PI * this.c2.d
				)
		);
		return _route;
	}
	
	public getLength():number {
		var t1x:number, t1y:number;
		var t2x:number, t2y:number;
		var dx:number, dy:number;
		var l:number = 0;
		l += this.c1.r * 2 * Matthew.PI * (Matthew.abs(this.c1rl) / (Matthew.D_PI));
		l += this.c2.r * 2 * Matthew.PI * (Matthew.abs(this.c2rl) / (Matthew.D_PI));
		t1x = Math.cos(this.c1rb + this.c1rl) * this.c1.r + this.c1.pos.x;
		t1y = Math.sin(this.c1rb + this.c1rl) * this.c1.r + this.c1.pos.y;
		t2x = Math.cos(this.c2rb) * this.c2.r + this.c2.pos.x;
		t2y = Math.sin(this.c2rb) * this.c2.r + this.c2.pos.y;
		dx = t1x - t2x;
		dy = t1y - t2y;
		l += Math.sqrt(dx * dx + dy * dy);
		return l;
	}
	
	private getLineRoot(bp:Pos, ep:Pos, res:number, vector:Array<VecPos>):void {
		var tx:number = ep.x - bp.x;
		var ty:number = ep.y - bp.y;
		var r:number = Math.atan2(ty, tx);
		var dx:number = Math.cos(r) * res;
		var dy:number = Math.sin(r) * res;
		var l:number = Math.sqrt(tx * tx + ty * ty) - res;
		for (var i = 0; i < l / res; i++) {
			var x:number = dx * i + bp.x;
			var y:number = dy * i + bp.y;
			vector.push(new VecPos(x, y, r));
		}
	}
}

class RouteGenerator{
	public graphics:PIXI.Graphics;
	constructor(graphics:PIXI.Graphics){
		this.graphics = graphics;
	}
	public getAllRoute(vposB:VecPos, vposE:VecPos, rB:number, rE:number):Array<Route> {
		var cB1:Circle;
		var cB2:Circle;
		var cE1:Circle;
		var cE2:Circle;
		
		var tx:number;
		var ty:number;
		var tr:number;
		tx = Math.cos(vposB.r + Matthew.H_PI) * rB + vposB.pos.x;
		ty = Math.sin(vposB.r + Matthew.H_PI) * rB + vposB.pos.y;
		cB1 = new Circle(tx, ty, rB, 1, vposB.r - Matthew.H_PI);
		tx = Math.cos(vposB.r - Matthew.H_PI) * rB + vposB.pos.x;
		ty = Math.sin(vposB.r - Matthew.H_PI) * rB + vposB.pos.y;
		cB2 = new Circle(tx, ty, rB, -1, vposB.r + Matthew.H_PI);
		
		tx = Math.cos(vposE.r + Matthew.H_PI) * rE + vposE.pos.x;
		ty = Math.sin(vposE.r + Matthew.H_PI) * rE + vposE.pos.y;
		cE1 = new Circle(tx, ty, rE, 1, vposE.r - Matthew.H_PI);
		tx = Math.cos(vposE.r - Matthew.H_PI) * rE + vposE.pos.x;
		ty = Math.sin(vposE.r - Matthew.H_PI) * rE + vposE.pos.y;
		cE2 = new Circle(tx, ty, rE, -1, vposE.r + Matthew.H_PI);
		var allRoute:Array<Route> = [];
		var route:Route;
		route = this.getRoute(cB1, cE1);
		if (route) allRoute.push(route);
		route = this.getRoute(cB1, cE2);
		if (route) allRoute.push(route);
		route = this.getRoute(cB2, cE1);
		if (route) allRoute.push(route);
		route = this.getRoute(cB2, cE2);
		if (route) allRoute.push(route);
		return allRoute;
	}
	
	private getRoute(c1:Circle, c2:Circle):Route {
		var dx:number = c2.pos.x - c1.pos.x;
		var dy:number = c2.pos.y - c1.pos.y;
		var l:number = dx * dx + dy * dy;
		var a1 = new Pos(), a2 = new Pos(), b1 = new Pos(), b2 = new Pos();
		var br:number = Math.atan2(c2.pos.y - c1.pos.y, c2.pos.x - c1.pos.x);
		var r:number;
		var D:number;
		var c1tr:number = c1.tr;
		var c2tr:number = c2.tr;
		var c1r:number;
		var c2r:number;
		var c1dr:number;
		var c2dr:number;
		this.circle(c1.pos.x + Math.cos(c1tr) * c1.r, c1.pos.y + Math.sin(c1tr) * c1.r, 3);
		this.circle(c2.pos.x + Math.cos(c2tr) * c2.r, c2.pos.y + Math.sin(c2tr) * c2.r, 3);
		
		if (c1.d == c2.d) {
			D = l - (c2.r - c1.r) * (c2.r - c1.r);
			if (D < 0) return null;
			D = Math.sqrt(D);
			a1.x = c1.r * ((c1.r - c2.r) * dx + D * dy) / l + c1.pos.x;
			a1.y = c1.r * ((c1.r - c2.r) * dy - D * dx) / l + c1.pos.y;
			a2.x = c1.r * ((c1.r - c2.r) * dx - D * dy) / l + c1.pos.x;
			a2.y = c1.r * ((c1.r - c2.r) * dy + D * dx) / l + c1.pos.y;
			b1.x = c2.r * ((c2.r - c1.r) * -dx - D * -dy) / l + c2.pos.x;
			b1.y = c2.r * ((c2.r - c1.r) * -dy + D * -dx) / l + c2.pos.y;
			b2.x = c2.r * ((c2.r - c1.r) * -dx + D * -dy) / l + c2.pos.x;
			b2.y = c2.r * ((c2.r - c1.r) * -dy - D * -dx) / l + c2.pos.y;
			
			r = Math.atan2(a1.y - c1.pos.y, a1.x - c1.pos.x) - br;
			if (c1.d > 0) {
				c2r = c1r = Matthew.normalize(r + br);
				this.line(a1.x, a1.y, b1.x, b1.y);
			} else {
				c2r = c1r = Matthew.normalize(-r + br);
				this.line(a2.x, a2.y, b2.x, b2.y);
			}
			this.line(
					c1.pos.x,
					c1.pos.y,
					Math.cos(c1r) * c1.r + c1.pos.x,
					Math.sin(c1r) * c1.r + c1.pos.y
			);
			this.line(
					c2.pos.x,
					c2.pos.y,
					Math.cos(c2r) * c2.r + c2.pos.x,
					Math.sin(c2r) * c2.r + c2.pos.y
			);
		} else if (c1.d != c2.d) {
			D = l - (c2.r + c1.r) * (c2.r + c1.r);
			if (D < 0) return null;
			D = Math.sqrt(D);
			a1.x = c1.r * ((c2.r + c1.r) * dx + D * dy) / l + c1.pos.x;
			a1.y = c1.r * ((c2.r + c1.r) * dy - D * dx) / l + c1.pos.y;
			a2.x = c1.r * ((c2.r + c1.r) * dx - D * dy) / l + c1.pos.x;
			a2.y = c1.r * ((c2.r + c1.r) * dy + D * dx) / l + c1.pos.y;
			b1.x = c2.r * ((c1.r + c2.r) * -dx + D * -dy) / l + c2.pos.x;
			b1.y = c2.r * ((c1.r + c2.r) * -dy - D * -dx) / l + c2.pos.y;
			b2.x = c2.r * ((c1.r + c2.r) * -dx - D * -dy) / l + c2.pos.x;
			b2.y = c2.r * ((c1.r + c2.r) * -dy + D * -dx) / l + c2.pos.y;
			
			r = Math.atan2(a1.y - c1.pos.y, a1.x - c1.pos.x) - br;
			if (c1.d > 0) {
				c1r = Matthew.normalize(r + br);
				c2r = Matthew.normalize(r + br + Matthew.PI);
				this.line(a1.x, a1.y, b1.x, b1.y);
			} else {
				c1r = Matthew.normalize(-r + br);
				c2r = Matthew.normalize(-r + br + Matthew.PI);
				this.line(a2.x, a2.y, b2.x, b2.y);
			}
			this.line(
					c1.pos.x,
					c1.pos.y,
					Math.cos(c1r) * c1.r + c1.pos.x,
					Math.sin(c1r) * c1.r + c1.pos.y
			);
			this.line(
					c2.pos.x,
					c2.pos.y,
					Math.cos(c2r) * c2.r + c2.pos.x,
					Math.sin(c2r) * c2.r + c2.pos.y
			);
		}
		if (c1.d > 0) {
			if (c1.tr < c1r) {
				c1dr = c1r - c1.tr;
			} else {
				c1dr = Matthew.D_PI - (c1.tr - c1r);
			}
		} else {
			if (c1.tr < c1r) {
				c1dr = Matthew.D_PI - (c1r - c1.tr);
			} else {
				c1dr = c1.tr - c1r;
			}
		}
		if (c2.d > 0) {
			if (c2r < c2.tr) {
				c2dr = c2.tr - c2r;
			} else {
				c2dr = Matthew.D_PI - (c2r - c2.tr);
			}
		} else {
			if (c2r < c2.tr) {
				c2dr = Matthew.D_PI - (c2.tr - c2r);
			} else {
				c2dr = c2r - c2.tr;
			}
		}
		
		this.circle(c1.pos.x, c1.pos.y, 2);
		this.circle(c2.pos.x, c2.pos.y, 2);
		this.circle(c1.pos.x, c1.pos.y, c1.r);
		this.circle(c2.pos.x, c2.pos.y, c2.r);
		return new Route(c1, c2, c1.tr, c2r, c1dr * c1.d, c2dr * c2.d);
	}
	
	private line(x1:number, y1:number, x2:number, y2:number) {
		this.graphics.moveTo(x1, y1);
		this.graphics.lineTo(x2, y2);
	}
	
	private circle(x:number, y:number, r:number) {
		this.graphics.drawCircle(x, y, r);
	}
}

export{
	Route,
	RouteGenerator
}