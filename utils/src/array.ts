namespace UTILS {
    export class ArrayWrapper<T extends ArrayWrapper<T, V>, V> extends Array<V> {
        constructor() {
            super();
        }
        public shuffle() {
            UTILS.shuffle(this);
        }
        public clear() {
            this.length = 0;
        }
    }
    export interface ArrayWrapper<T extends ArrayWrapper<T, V>, V> extends Array<V>{
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