import {Circle, Pos, VecPos, Matthew} from './utils';
import Line from './line';
export default class Route {
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
	
	public generateRoute(res:number, line:Line = new Line()):Line {
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
			line.push(new Pos(_x, _y));
		}
		line.pop();
		this.getLineRoot(
			new Pos(_x, _y),
			new Pos(
				Math.cos(this.c2rb) * this.c2.r + this.c2.pos.x,
				Math.sin(this.c2rb) * this.c2.r + this.c2.pos.y
			),
			res,
			line
		);
		//trace(_x, _y, Math.cos(c2rb) * c2.r + c2.pos.x, Math.sin(c2rb) * c2.r + c2.pos.y)
		const LL = Matthew.abs(this.c2rl) - c2rres;
		for (let r = 0; r < LL; r += c2rres) {
			tr = this.c2rb + r * this.c2.d;
			_x = Math.cos(tr) * this.c2.r + this.c2.pos.x;
			_y = Math.sin(tr) * this.c2.r + this.c2.pos.y;
			line.push(new Pos(_x, _y));
		}
		line.push(
			new Pos(
				Math.cos(this.c2rb + (Matthew.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.pos.x,
				Math.sin(this.c2rb + (Matthew.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.pos.y,
			)
		);
		return line;
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
	
	private getLineRoot(bp:Pos, ep:Pos, res:number, line:Line):void {
		const tx = ep.x - bp.x;
		const ty = ep.y - bp.y;
		const r = Math.atan2(ty, tx);
		const dx = Math.cos(r) * res;
		const dy = Math.sin(r) * res;
		const l = Math.sqrt(tx * tx + ty * ty) - res;
		const L = l / res;
		for (let i = 0; i < L; i++) {
			line.push(new Pos(
				dx * i + bp.x,
				dy * i + bp.y
			));
		}
	}
}