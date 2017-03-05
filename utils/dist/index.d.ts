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
}
declare namespace UTILS {
    class ArrayWrapper<T extends ArrayWrapper<T, V>, V> extends Array<V> {
        constructor();
    }
    interface ArrayWrapper<T extends ArrayWrapper<T, V>, V> extends Array<V> {
        forEach(callbackfn: (value: V, index: number, array: T) => void, thisArg?: any): void;
        filter(callbackfn: (value: V, index: number, array: T) => any, thisArg?: any): T;
        every(callbackfn: (value: V, index: number, array: T) => boolean, thisArg?: any): boolean;
        concat(...items: T[]): T;
        concat(...items: (V | T)[]): T;
        lastIndexOf(searchElement: V, fromIndex?: number): number;
        map<U>(this: [V, V, V, V, V], callbackfn: (value: V, index: number, array: T) => U, thisArg?: any): [U, U, U, U, U];
        map<U>(this: [V, V, V, V], callbackfn: (value: V, index: number, array: T) => U, thisArg?: any): [U, U, U, U];
        map<U>(this: [V, V, V], callbackfn: (value: V, index: number, array: T) => U, thisArg?: any): [U, U, U];
        map<U>(this: [V, V], callbackfn: (value: V, index: number, array: T) => U, thisArg?: any): [U, U];
        map<U>(callbackfn: (value: V, index: number, array: T) => U, thisArg?: any): U[];
        pop(): V | undefined;
        push(...items: V[]): number;
        reduce(callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: T) => V, initialValue?: V): V;
        reduce<U>(callbackfn: (previousValue: U, currentValue: V, currentIndex: number, array: T) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: T) => V, initialValue?: V): V;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: V, currentIndex: number, array: T) => U, initialValue: U): U;
        reverse(): T;
        shift(): V | undefined;
        slice(start?: number, end?: number): T;
        some(callbackfn: (value: V, index: number, array: T) => boolean, thisArg?: any): boolean;
        sort(compareFn?: (a: V, b: V) => number): this;
        splice(start: number, deleteCount?: number): T;
        splice(start: number, deleteCount: number, ...items: V[]): T;
        unshift(...items: V[]): number;
    }
}
declare namespace UTILS {
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
        setColor(color: number): Color;
        setHSV(h?: number, s?: number, v?: number): Color;
        setRGB(r?: number, g?: number, b?: number): Color;
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
declare namespace Matthew {
    const PI: number;
    const H_PI: number;
    const D_PI: number;
    function normalize(r: number): number;
    function abs(v: number): number;
    function frandom(min: number, max: number): number;
    function irandom(min: number, max: number): number;
}
declare namespace UTILS {
    function shuffle<T>(array: T[]): T[];
    function clone<T>(array: T[]): T[];
    function def<T>(value: T, defValue: T): T;
}
