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
		let _route:Array<VecPos>;
		if (route) {
			_route = route;
			_route.length = 0;
		} else {
			_route = new Array<VecPos>();
		}
		const c1rres = res / (this.c1.r * 2 * Matthew.PI) * Matthew.D_PI;
		const c2rres = res / (this.c2.r * 2 * Matthew.PI) * Matthew.D_PI;
		let _x = Math.cos(this.c1rb) * this.c1.r + this.c1.pos.x;
		let _y = Math.sin(this.c1rb) * this.c1.r + this.c1.pos.y;
		let tr:number;
		const L = Matthew.abs(this.c1rl);
		for (let r = 0; r < L; r += c1rres) {
			tr = this.c1rb + r * this.c1.d;
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
		const LL = Matthew.abs(this.c2rl) - c2rres;
		for (let r = 0; r < LL; r += c2rres) {
			tr = this.c2rb + r * this.c2.d;
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
		let l = 0;
		l += this.c1.r * 2 * Matthew.PI * (Matthew.abs(this.c1rl) / (Matthew.D_PI));
		l += this.c2.r * 2 * Matthew.PI * (Matthew.abs(this.c2rl) / (Matthew.D_PI));
		const t1x = Math.cos(this.c1rb + this.c1rl) * this.c1.r + this.c1.pos.x;
		const t1y = Math.sin(this.c1rb + this.c1rl) * this.c1.r + this.c1.pos.y;
		const t2x = Math.cos(this.c2rb) * this.c2.r + this.c2.pos.x;
		const t2y = Math.sin(this.c2rb) * this.c2.r + this.c2.pos.y;
		const dx = t1x - t2x;
		const dy = t1y - t2y;
		l += Math.sqrt(dx * dx + dy * dy);
		return l;
	}
	
	private getLineRoot(bp:Pos, ep:Pos, res:number, vector:Array<VecPos>):void {
		const tx = ep.x - bp.x;
		const ty = ep.y - bp.y;
		const r = Math.atan2(ty, tx);
		const dx = Math.cos(r) * res;
		const dy = Math.sin(r) * res;
		const l = Math.sqrt(tx * tx + ty * ty) - res;
		const L = l / res;
		for (let i = 0; i < L; i++) {
			vector.push(new VecPos(
				dx * i + bp.x,
				dy * i + bp.y,
				r
			));
		}
	}
}

class RouteGenerator{
	public graphics:PIXI.Graphics;
	constructor(graphics:PIXI.Graphics = null){
		this.graphics = graphics;
	}
	public getAllRoute(vposB:VecPos, vposE:VecPos, rB:number, rE:number):Array<Route> {
		const cB1 = new Circle(
			Math.cos(vposB.r + Matthew.H_PI) * rB + vposB.pos.x,
			Math.sin(vposB.r + Matthew.H_PI) * rB + vposB.pos.y,
			rB, 
			1,
			vposB.r - Matthew.H_PI
		);
		const cB2 = new Circle(
			Math.cos(vposB.r - Matthew.H_PI) * rB + vposB.pos.x,
			Math.sin(vposB.r - Matthew.H_PI) * rB + vposB.pos.y, 
			rB, 
			-1, 
			vposB.r + Matthew.H_PI
		);
		const cE1 = new Circle(
			Math.cos(vposE.r + Matthew.H_PI) * rE + vposE.pos.x, 
			Math.sin(vposE.r + Matthew.H_PI) * rE + vposE.pos.y, 
			rE, 
			1, 
			vposE.r - Matthew.H_PI
		);
		const cE2 = new Circle(
			Math.cos(vposE.r - Matthew.H_PI) * rE + vposE.pos.x, 
			Math.sin(vposE.r - Matthew.H_PI) * rE + vposE.pos.y, 
			rE, 
			-1, 
			vposE.r + Matthew.H_PI
		);
		const allRoute:Array<Route> = [];
		let route:Route;
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
		const dx = c2.pos.x - c1.pos.x;
		const dy = c2.pos.y - c1.pos.y;
		const l = dx * dx + dy * dy;
		const a1 = new Pos(), a2 = new Pos(), b1 = new Pos(), b2 = new Pos();
		const br = Math.atan2(c2.pos.y - c1.pos.y, c2.pos.x - c1.pos.x);
		let c1tr = c1.tr;
		let c2tr = c2.tr;
		let c1r:number;
		let c2r:number;
		let c1dr:number;
		let c2dr:number;
		this.circle(c1.pos.x + Math.cos(c1tr) * c1.r, c1.pos.y + Math.sin(c1tr) * c1.r, 3);
		this.circle(c2.pos.x + Math.cos(c2tr) * c2.r, c2.pos.y + Math.sin(c2tr) * c2.r, 3);
		
		if (c1.d == c2.d) {
			let d = l - (c2.r - c1.r) * (c2.r - c1.r);
			if (d < 0) return null;
			d = Math.sqrt(d);
			a1.x = c1.r * ((c1.r - c2.r) * dx + d * dy) / l + c1.pos.x;
			a1.y = c1.r * ((c1.r - c2.r) * dy - d * dx) / l + c1.pos.y;
			a2.x = c1.r * ((c1.r - c2.r) * dx - d * dy) / l + c1.pos.x;
			a2.y = c1.r * ((c1.r - c2.r) * dy + d * dx) / l + c1.pos.y;
			b1.x = c2.r * ((c2.r - c1.r) * -dx - d * -dy) / l + c2.pos.x;
			b1.y = c2.r * ((c2.r - c1.r) * -dy + d * -dx) / l + c2.pos.y;
			b2.x = c2.r * ((c2.r - c1.r) * -dx + d * -dy) / l + c2.pos.x;
			b2.y = c2.r * ((c2.r - c1.r) * -dy - d * -dx) / l + c2.pos.y;
			
			const r = Math.atan2(a1.y - c1.pos.y, a1.x - c1.pos.x) - br;
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
			let d = l - (c2.r + c1.r) * (c2.r + c1.r);
			if (d < 0) return null;
			d = Math.sqrt(d);
			a1.x = c1.r * ((c2.r + c1.r) * dx + d * dy) / l + c1.pos.x;
			a1.y = c1.r * ((c2.r + c1.r) * dy - d * dx) / l + c1.pos.y;
			a2.x = c1.r * ((c2.r + c1.r) * dx - d * dy) / l + c1.pos.x;
			a2.y = c1.r * ((c2.r + c1.r) * dy + d * dx) / l + c1.pos.y;
			b1.x = c2.r * ((c1.r + c2.r) * -dx + d * -dy) / l + c2.pos.x;
			b1.y = c2.r * ((c1.r + c2.r) * -dy - d * -dx) / l + c2.pos.y;
			b2.x = c2.r * ((c1.r + c2.r) * -dx - d * -dy) / l + c2.pos.x;
			b2.y = c2.r * ((c1.r + c2.r) * -dy + d * -dx) / l + c2.pos.y;
			
			const r = Math.atan2(a1.y - c1.pos.y, a1.x - c1.pos.x) - br;
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
		if(!this.graphics) return;
		this.graphics.moveTo(x1, y1);
		this.graphics.lineTo(x2, y2);
	}
	
	private circle(x:number, y:number, r:number) {
		if(!this.graphics) return;
		this.graphics.drawCircle(x, y, r);
	}
}

export{
	Route,
	RouteGenerator
}