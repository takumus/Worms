namespace ROUTES{
	export class RouteGenerator{
		public static getMinimumRoute(vposB:VecPos, vposE:VecPos, rB:number, rE:number, res:number):Line{
			const routes = this.getAllRoute(vposB, vposE, rB, rE);
			let min:number = Number.MAX_VALUE;
			let route:Route = null;
			for(let i = 0; i < routes.length; i ++){
				const r = routes[i];
				if(r.getLength() < min){
					min = r.getLength();
					route = r;
				}
			};
			return route.generateRoute(res);
		}
		public static getAllRoute(vposB:VecPos, vposE:VecPos, rB:number, rE:number):Array<Route> {
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
		
		private static getRoute(c1:Circle, c2:Circle):Route {
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
		
		private static line(x1:number, y1:number, x2:number, y2:number) {
			//if(!this.graphics) return;
			//this.graphics.moveTo(x1, y1);
			//this.graphics.lineTo(x2, y2);
		}
		
		private static circle(x:number, y:number, r:number) {
			//if(!this.graphics) return;
			//this.graphics.drawCircle(x, y, r);
		}
	}
}