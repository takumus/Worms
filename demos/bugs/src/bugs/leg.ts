import {LegPos} from './legPos';
import {Bug} from '.';
export interface PosSet {
    begin: UTILS.Pos,
    middle: UTILS.Pos,
    end: UTILS.Pos
}
export class Leg {
    private _legPos: LegPos;
    private _length1: number;
    private _length2: number;
    private _bug: Bug;
    private _index: number;
    private _flip: boolean;
    constructor(
        bug: Bug,
        flip: boolean,
        length1: number,
        length2: number,
        span: number,
        spanOffset: number,
        radius: number,
        rotationOffset: number,
        index: number) {
            this._bug = bug;
            this._flip = flip;
            this._index = Math.floor(index);
            this._length1 = length1;
            this._length2 = length2;
            this._legPos = new LegPos(bug, span, radius, rotationOffset, spanOffset, index);
    }
    public getPos(): PosSet {
        const fromPos = this._bug.bone[this._index];
        const toPos = this._legPos.getPos();
        const r = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
        const a = fromPos.distance(toPos);
        let b = this._length1;
        let c = this._length2;
        const minA = a * 1.02;
        if (b + c < minA) {
            const ratio = b / (b + c);
            b = ratio * minA;
            c = minA - b;
        }
        const ra = Math.acos((b * b + c * c - a * a) / (2 * b * c));
        const rb = Math.acos((a * a + c * c - b * b) / (2 * a * c));
        const rc = Math.acos((a * a + b * b - c * c) / (2 * a * b));
        const rr = r + (this._flip ? rc : -rc);
        const x = Math.cos(rr) * b + fromPos.x;
        const y = Math.sin(rr) * b + fromPos.y;
        return {
            begin: fromPos,
            middle: new UTILS.Pos(x, y),
            end: toPos
        };
    }
    public get legPos(): LegPos {
        return this._legPos;
    }
    public set index(value: number) {
        this._legPos.beginOffset = value;
        this._index = value;
    }
}