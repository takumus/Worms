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