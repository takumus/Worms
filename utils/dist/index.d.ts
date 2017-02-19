declare namespace Matthew {
    const PI: number;
    const H_PI: number;
    const D_PI: number;
    function normalize(r: number): number;
    function abs(v: number): number;
}
declare namespace UTILS {
    class Pos {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        clone(): Pos;
        equals(pos: Pos, diff?: number): boolean;
        round(n: number): void;
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
    function def<T>(value: T, defValue: T): T;
    class Color {
        private color;
        private h;
        private s;
        private v;
        private r;
        private g;
        private b;
        private old;
        constructor(color?: number);
        clone(): Color;
        setColor(color: number): void;
        setHSV(h?: number, s?: number, v?: number): void;
        setRGB(r?: number, g?: number, b?: number): void;
        private rgbToDecimal();
        getColor: () => number;
        getR: () => number;
        getG: () => number;
        getB: () => number;
        getH: () => number;
        getS: () => number;
        getV: () => number;
        static transformRGB(color: Color, to: Color, p: number): void;
        static transformHSV(color: Color, to: Color, p: number): void;
    }
}
