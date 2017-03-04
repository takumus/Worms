namespace UTILS {
    export function shuffle<T>(array: T[]): T[] {
        let n = array.length, t, i;
        while (n) {
            i = Math.floor(Math.random() * n--);
            t = array[n];
            array[n] = array[i];
            array[i] = t;
        }
        return array;
    }
    export function clone<T>(array: T[]): T[] {
        const newArray: T[] = [];
        array.forEach((value) => {
            newArray.push(value);
        });
        return newArray;
    }
    export function def<T>(value: T, defValue: T): T {
        if (typeof value === 'undefined') return defValue;
        return value;
    }
}