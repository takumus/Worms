namespace Matthew {
    export const PI: number = Math.PI;
    export const H_PI: number = Math.PI / 2;
    export const D_PI: number = Math.PI * 2;

    export function normalize(r: number): number {
        r = r % D_PI;
        if (r < 0) return D_PI + r;
        return r;
    }
    export function abs(v: number): number {
        return v < 0 ? -v : v;
    }
}
namespace UTILS {
    export class Pos {
        public x: number = 0;
        public y: number = 0;
        constructor(x: number = 0, y: number = 0) {
            this.x = x;
            this.y = y;
        }
        public clone(): Pos {
            return new Pos(this.x, this.y);
        }
        public equals(pos: Pos, diff: number = 1): boolean {
            const dx = pos.x - this.x;
            const dy = pos.y - this.y;
            return dx * dx + dy * dy < diff;
        }
        public round(n: number) {
            n = Math.pow(10, n);
            this.x = Math.floor(this.x * n) / n;
            this.y = Math.floor(this.y * n) / n;
        }
    }
    export class VecPos {
        public pos: Pos;
        public r: number = 0;

        constructor(x: number = 0, y: number = 0, r: number = 0) {
            this.pos = new Pos(x, y);
            this.r = r;
        }
        public clone(): VecPos {
            return new VecPos(this.pos.x, this.pos.y, this.r);
        }
        public add(radius: number): VecPos {
            this.r += radius;
            return this;
        }
    }
    export class Circle {
        public pos: Pos;
        public r: number;
        public d: number;
        public tr: number;

        constructor(x: number, y: number, r: number, d: number, tr: number) {
            this.pos = new Pos(x, y);
            this.r = r;
            this.d = d;
            this.tr = Matthew.normalize(tr);
        }
    }
    export function def<T>(value: T, defValue: T): T {
        if (typeof value === 'undefined') return defValue;
        return value;
    }
    export class Color {
        private color: number;
        private h: number;
        private s: number;
        private v: number;
        private r: number;
        private g: number;
        private b: number;
        private old: Color;
        constructor(color: number = 0) {
            this.setColor(color);
        }
        public clone(): Color {
            return new Color(this.color);
        }
        public setColor(color: number): void {
            const r = color >> 16 & 0xff;
            const g = color >> 8 & 0xff;
            const b = color & 0xff;
            this.color = color;
            this.setRGB(r, g, b);
        }
        /*
            setHSV and setRGB -> https://gist.github.com/mjackson/5311256
        */
        public setHSV(h: number = -1, s: number = -1, v: number = -1) {
            h = h < 0 ? this.h : h;
            s = s < 0 ? this.s : s;
            v = v < 0 ? this.v : v;
            let r: number, g: number, b: number;
            const i = Math.floor(h * 6);
            const f = h * 6 - i;
            const p = v * (1 - s);
            const q = v * (1 - f * s);
            const t = v * (1 - (1 - f) * s);
            switch (i % 6) {
                case 0: r = v, g = t, b = p; break;
                case 1: r = q, g = v, b = p; break;
                case 2: r = p, g = v, b = t; break;
                case 3: r = p, g = q, b = v; break;
                case 4: r = t, g = p, b = v; break;
                case 5: r = v, g = p, b = q; break;
            }
            this.r = r * 255;
            this.g = g * 255;
            this.b = b * 255;
            this.h = h;
            this.s = s;
            this.v = v;
            this.rgbToDecimal();
        }
        public setRGB(r: number = -1, g: number = -1, b: number = -1) {
            r = r < 0 ? this.r : r;
            g = g < 0 ? this.g : g;
            b = b < 0 ? this.b : b;
            this.r = r;
            this.g = g;
            this.b = b;
            r /= 255, g /= 255, b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h: number;
            const v = max;
            const d = max - min;
            const s = max === 0 ? 0 : d / max;
            if (max === min) {
                h = 0;
            } else {
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            this.h = h;
            this.s = s;
            this.v = v;
            this.rgbToDecimal();
        }
        private rgbToDecimal(): void {
            this.color = (this.r << 16) + (this.g << 8) + (this.b);
        }
        public getColor = () => this.color;
        public getR = () => this.r;
        public getG = () => this.g;
        public getB = () => this.b;
        public getH = () => this.h;
        public getS = () => this.s;
        public getV = () => this.v;

        public static transformRGB(color: Color, to: Color, p: number): void {
            p = 1 - p;
            const r = color.getR() - to.getR();
            const g = color.getG() - to.getG();
            const b = color.getB() - to.getB();
            color.setRGB(
                to.getR() + r * p,
                to.getG() + g * p,
                to.getB() + b * p
            );
        }
        public static transformHSV(color: Color, to: Color, p: number): void {
            p = 1 - p;
            const h = color.getH() - to.getH();
            const s = color.getS() - to.getS();
            const v = color.getV() - to.getV();
            color.setHSV(
                to.getH() + h * p,
                to.getS() + s * p,
                to.getV() + v * p
            );
        }
    }
}
window['UTILS'] = UTILS;
window['Matthew'] = Matthew;