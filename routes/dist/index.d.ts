declare namespace ROUTES {
    class Line {
        protected data: Array<UTILS.Pos>;
        private length;
        constructor(data?: Array<UTILS.Pos> | Array<{
            x: number;
            y: number;
        }>);
        reverse(): Line;
        getHeadVecPos(): UTILS.VecPos;
        getTailVecPos(): UTILS.VecPos;
        private getVecPos(fp, sp);
        head(): UTILS.Pos;
        tail(): UTILS.Pos;
        at(id: number): UTILS.Pos;
        push(pos: UTILS.Pos): void;
        pop(): UTILS.Pos;
        shift(): UTILS.Pos;
        pushLine(line: Line): Line;
        getLength(): number;
        clone(): Line;
        clear(): void;
        wave(amp: number, freq: number, randomBegin?: boolean): Line;
    }
}
declare namespace ROUTES {
    class RouteGenerator {
        static getMinimumRoute(vposB: UTILS.VecPos, vposE: UTILS.VecPos, rB: number, rE: number, res: number): Line;
        static getAllRoute(vposB: UTILS.VecPos, vposE: UTILS.VecPos, rB: number, rE: number): Array<Route>;
        private static getRoute(c1, c2);
        private static line(x1, y1, x2, y2);
        private static circle(x, y, r);
    }
}
declare namespace ROUTES {
    class Route {
        c1: UTILS.Circle;
        c2: UTILS.Circle;
        c1rb: number;
        c2rb: number;
        c1rl: number;
        c2rl: number;
        constructor(c1: UTILS.Circle, c2: UTILS.Circle, c1rb: number, c2rb: number, c1rl: number, c2rl: number);
        generateRoute(res: number, line?: Line): Line;
        getLength(): number;
        private getLineRoot(bp, ep, res, line);
    }
}
