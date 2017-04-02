namespace ROUTES {
    export class PointRouteGenerator {
        public static getRoute(points: UTILS.Pos[], radius: number, res: number): Line {
            const line = new Line();
            let ppos = new UTILS.Pos();
            points.forEach((pos, id) => {
                if (id == points.length - 1) {
                    if (!ppos) ppos = points[0];
                    line.pushLine(RouteGenerator.getLine(ppos, pos, res));
                }
                if (id > 0 && id < points.length - 1) {
                    const pp = ppos ? ppos : points[id - 1];
                    const np = points[id + 1];
                    let r1 = Math.atan2(pp.y - pos.y, pp.x - pos.x);
                    let r2 = Math.atan2(np.y - pos.y, np.x - pos.x);
                    const pos1 = new UTILS.Pos(
                        Math.cos(r1) * radius + pos.x,
                        Math.sin(r1) * radius + pos.y
                    );
                    const pos2 = new UTILS.Pos(
                        Math.cos(r2) * radius + pos.x,
                        Math.sin(r2) * radius + pos.y
                    );
                    ppos = pos2;
                    const rr1 = r1 + Math.PI / 2;
                    const rr2 = r2 - Math.PI / 2;
                    const pos11 = new UTILS.Pos(
                        Math.cos(rr1) + pos1.x,
                        Math.sin(rr1) + pos1.y
                    );
                    const pos22 = new UTILS.Pos(
                        Math.cos(rr2) + pos2.x,
                        Math.sin(rr2) + pos2.y
                    );
                    const cp = this.cross(pos2, pos22, pos1, pos22);
                    if (!cp) {
                        console.error('PointRouteGenerator error : points are wrong!');
                        return null;
                    }
                    const dx = cp.x - pos2.x;
                    const dy = cp.y - pos2.y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    line.pushLine(RouteGenerator.getLine(pp, pos1, res));
                    const br = Matthew.normalize(Math.atan2(pos2.y - cp.y, pos2.x - cp.x));
                    const er = Matthew.normalize(Math.atan2(pos1.y - cp.y, pos1.x - cp.x));
                    let rd = 0;
                    if (br > er) {
                        rd = br - er;
                    }else {
                        rd = Math.PI * 2 - (er - br);
                    }
                    r2 = Matthew.normalize(r2);
                    r1 = Matthew.normalize(r1);
                    let r = 0;
                    if (r1 > r2) {
                        r = r1 - r2;
                    }else {
                        r = Math.PI * 2 - (r2 - r1);
                    }
                    const di = r > Math.PI ? -1 : 1;
                    rd = di < 0 ? Math.PI * 2 - rd : rd;
                    const rres = res / (d * 2 * Math.PI) * Math.PI * 2;
                    for (let ii = 0; ii < rd; ii += rres) {
                        const rr = ii * di + er;
                        const xx = Math.cos(rr) * d + cp.x;
                        const yy = Math.sin(rr) * d + cp.y;
                        line.push(new UTILS.Pos(xx, yy));
                    }
                }
            });
            return line;
        }
        private static cross(p1: UTILS.Pos, p2: UTILS.Pos, p3: UTILS.Pos, p4: UTILS.Pos): UTILS.Pos {
            const d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
            if (d == 0) return null;
            const u = ((p3.x - p1.x) * (p4.y - p3.y) - (p3.y - p1.y) * (p4.x - p3.x)) / d;
            const v = ((p3.x - p1.x) * (p2.y - p1.y) - (p3.y - p1.y) * (p2.x - p1.x)) / d;
            return new UTILS.Pos(
                p1.x + u * (p2.x - p1.x),
                p1.y + u * (p2.y - p1.y)
            );
        }
    }
    export class RouteGenerator {
        public static getMinimumRoute(vposB: UTILS.VecPos, vposE: UTILS.VecPos, rB: number, rE: number, res: number): Line {
            const routes = this.getAllRoute(vposB, vposE, rB, rE);
            let min = Number.MAX_VALUE;
            let route: Route;
            for (let i = 0; i < routes.length; i ++) {
                const r = routes[i];
                if (r.getLength() < min) {
                    min = r.getLength();
                    route = r;
                }
            };
            return route.generateRoute(res);
        }
        public static getAllRoute(vposB: UTILS.VecPos, vposE: UTILS.VecPos, rB: number, rE: number): Array<Route> {
            const cB1 = new UTILS.Circle(
                Math.cos(vposB.r + Matthew.H_PI) * rB + vposB.pos.x,
                Math.sin(vposB.r + Matthew.H_PI) * rB + vposB.pos.y,
                rB,
                1,
                vposB.r - Matthew.H_PI
            );
            const cB2 = new UTILS.Circle(
                Math.cos(vposB.r - Matthew.H_PI) * rB + vposB.pos.x,
                Math.sin(vposB.r - Matthew.H_PI) * rB + vposB.pos.y,
                rB,
                -1,
                vposB.r + Matthew.H_PI
            );
            const cE1 = new UTILS.Circle(
                Math.cos(vposE.r + Matthew.H_PI) * rE + vposE.pos.x,
                Math.sin(vposE.r + Matthew.H_PI) * rE + vposE.pos.y,
                rE,
                1,
                vposE.r - Matthew.H_PI
            );
            const cE2 = new UTILS.Circle(
                Math.cos(vposE.r - Matthew.H_PI) * rE + vposE.pos.x,
                Math.sin(vposE.r - Matthew.H_PI) * rE + vposE.pos.y,
                rE,
                -1,
                vposE.r + Matthew.H_PI
            );
            const allRoute: Array<Route> = [];
            let route: Route;
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

        private static getRoute(c1: UTILS.Circle, c2: UTILS.Circle): Route {
            const dx = c2.pos.x - c1.pos.x;
            const dy = c2.pos.y - c1.pos.y;
            const l = dx * dx + dy * dy;
            const a1 = new UTILS.Pos(), a2 = new UTILS.Pos(), b1 = new UTILS.Pos(), b2 = new UTILS.Pos();
            const br = Math.atan2(c2.pos.y - c1.pos.y, c2.pos.x - c1.pos.x);
            const c1tr = c1.tr;
            const c2tr = c2.tr;
            let c1r: number;
            let c2r: number;
            let c1dr: number;
            let c2dr: number;
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
        public static getLine(bp: UTILS.Pos, ep: UTILS.Pos, res: number): Line {
            const line: Line = new Line();
            const tx = ep.x - bp.x;
            const ty = ep.y - bp.y;
            const r = Math.atan2(ty, tx);
            const dx = Math.cos(r) * res;
            const dy = Math.sin(r) * res;
            const l = Math.sqrt(tx * tx + ty * ty) - res;
            const L = l / res;
            for (let i = 0; i < L; i++) {
                line.push(new UTILS.Pos(
                    dx * i + bp.x,
                    dy * i + bp.y
                ));
            }
            return line;
        }
        private static line(x1: number, y1: number, x2: number, y2: number) {
            // if(!this.graphics) return;
            // this.graphics.moveTo(x1, y1);
            // this.graphics.lineTo(x2, y2);
        }

        private static circle(x: number, y: number, r: number) {
            // if(!this.graphics) return;
            // this.graphics.drawCircle(x, y, r);
        }
    }
}