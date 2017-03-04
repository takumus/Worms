/// <reference types="pixi.js" />
declare namespace ROUTES {
    class Line {
        protected points: Array<UTILS.Pos>;
        private prevPositionOffset;
        private prevScaleOffset;
        constructor(data?: Array<UTILS.Pos> | Array<{
            x: number;
            y: number;
        }>);
        setPositionOffset(pos: UTILS.Pos): void;
        setScaleOffset(scale: UTILS.Pos): void;
        getWidth(): number;
        getHeight(): number;
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
        readonly length: number;
        clone(): Line;
        clear(): void;
        wave(amp: number, freq: number, randomBegin?: boolean): Line;
        toString(): string;
    }
}
declare namespace ROUTES {
    class RouteGenerator {
        static getMinimumRoute(vposB: UTILS.VecPos, vposE: UTILS.VecPos, rB: number, rE: number, res: number): Line;
        static getAllRoute(vposB: UTILS.VecPos, vposE: UTILS.VecPos, rB: number, rE: number): Array<Route>;
        private static getRoute(c1, c2);
        static getLine(bp: UTILS.Pos, ep: UTILS.Pos, res: number): Line;
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
declare namespace ROUTES {
    class Debugger extends PIXI.Container {
        private graphics;
        private color;
        private thickness;
        private circle;
        private gradient;
        constructor();
        setOption(color?: number, thickness?: number, circle?: boolean, gradient?: boolean): void;
        render(line: Line): void;
        clear(): void;
    }
}
