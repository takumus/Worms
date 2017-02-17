namespace UTILS{
    export class Pos {
        public x:number = 0;
        public y:number = 0;

        constructor(x:number = 0, y:number = 0) {
            this.x = x;
            this.y = y;
        }
        public clone():Pos{
            return new Pos(this.x, this.y);
        }
        public equals(pos:Pos, diff:number = 1):boolean{
            const dx = pos.x - this.x;
            const dy = pos.y - this.y;
            return dx*dx+dy*dy < diff
        }
        public round(n:number){
            n = Math.pow(10, n);
            this.x = Math.floor(this.x*n)/n;
            this.y = Math.floor(this.y*n)/n;
        }
    }
    export class VecPos {
        public pos:Pos;
        public r:number = 0;

        constructor(x:number = 0, y:number = 0, r:number = 0) {
            this.pos = new Pos(x, y);
            this.r = r;
        }
        public clone():VecPos{
            return new VecPos(this.pos.x, this.pos.y, this.r);
        }
        public add(radius:number):VecPos{
            this.r += radius;
            return this;
        }
    }
    export class Circle {
        public pos:Pos;
        public r:number;
        public d:number;
        public tr:number;
        
        constructor(x:number, y:number, r:number, d:number, tr:number) {
            this.pos = new Pos(x, y);
            this.r = r;
            this.d = d;
            this.tr = Matthew.normalize(tr);
        }
    }
    export function def<T>(value:T, defValue:T):T{
        if(typeof value == "undefined") return defValue;
        return value;
    }
    export class Color{
        private color:number;
        private h:number;
        private s:number;
        private v:number;
        private r:number;
        private g:number;
        private b:number;
        constructor(color:number){
            this.setColor(color);
        }
        public setColor(color:number):void{
            const r = color>>16&0xff;
            const g = color>>8&0xff;
            const b = color&0xff;
            this.color = color;
            this.setRGB(r, g, b);
        }
        /*
            setHSV and setRGB -> https://gist.github.com/mjackson/5311256
        */
        public setHSV(h:number, s:number, v:number){
            let r:number, g:number, b:number;
            const i = Math.floor(h * 6);
            const f = h * 6 - i;
            const p = v * (1 - s);
            const q = v * (1 - f * s);
            const t = v * (1 - (1 - f) * s);
            switch(i % 6){
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
        }
        public setRGB(r:number, g:number, b:number){
            r /= 255, g /= 255, b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h:number;
            const v = max;
            const d = max - min;
            const s = max == 0 ? 0 : d / max;
            if(max == min) {
                h = 0;
            }else{
                switch(max){
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            this.h = h;
            this.s = s;
            this.v = v;
            this.r = r;
            this.g = g;
            this.b = b;
        }
        public getColor = () => this.color;
        public getR = () => this.r;
        public getG = () => this.g;
        public getB = () => this.b;
        public getH = () => this.h;
        public getS = () => this.s;
        public getV = () => this.v;
    }
}
namespace Matthew{
    export const PI:number = Math.PI;
    export const H_PI:number = Math.PI / 2;
    export const D_PI:number = Math.PI * 2;

    export const normalize = (r:number):number => {
        r = r % D_PI;
        if (r < 0) return D_PI + r;
        return r;
    }
    export const abs = (v:number):number => {
        return v < 0 ? -v : v;
    }
}
window["UTILS"] = UTILS;
window["Matthew"] = Matthew;