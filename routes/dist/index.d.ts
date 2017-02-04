declare namespace ROUTES {
    class Line {
        protected data: Array<Pos>;
        private length;
        constructor(data?: Array<Pos>);
        reverse(): Line;
        getHeadVecPos(): VecPos;
        getTailVecPos(): VecPos;
        head(): Pos;
        tail(): Pos;
        at(id: number): Pos;
        push(pos: Pos): void;
        pop(): Pos;
        shift(): Pos;
        pushLine(line: Line): Line;
        getLength(): number;
        clone(): Line;
        wave(amp: number, freq: number): Line;
    }
}
declare namespace ROUTES {
    class RouteGenerator {
        static getMinimumRoute(vposB: VecPos, vposE: VecPos, rB: number, rE: number, res: number): Line;
        static getAllRoute(vposB: VecPos, vposE: VecPos, rB: number, rE: number): Array<Route>;
        private static getRoute(c1, c2);
        private static line(x1, y1, x2, y2);
        private static circle(x, y, r);
    }
}
declare namespace ROUTES {
    class Route {
        c1: Circle;
        c2: Circle;
        c1rb: number;
        c2rb: number;
        c1rl: number;
        c2rl: number;
        constructor(c1: Circle, c2: Circle, c1rb: number, c2rb: number, c1rl: number, c2rl: number);
        generateRoute(res: number, line?: Line): Line;
        getLength(): number;
        private getLineRoot(bp, ep, res, line);
    }
}
declare namespace ROUTES {
    class Pos {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        clone(): Pos;
        equals(pos: Pos, diff?: number): boolean;
    }
    class VecPos {
        pos: Pos;
        r: number;
        constructor(x?: number, y?: number, r?: number);
        clone(): VecPos;
        add(radius: number): VecPos;
    }
    class Circle {
        pos: Pos;
        r: number;
        d: number;
        tr: number;
        constructor(x: number, y: number, r: number, d: number, tr: number);
    }
    class Matthew {
        static PI: number;
        static H_PI: number;
        static D_PI: number;
        static normalize(r: number): number;
        static abs(v: number): number;
    }
}
