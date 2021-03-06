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
    private _distanceFromRoot: number;
    private _isLeft: boolean;
    constructor(
        bug: Bug,
        flip: boolean,
        length1: number,
        length2: number,
        span: number,
        spanOffset: number,
        radius: number,
        rotationOffset: number,
        isLeft: boolean = false,
        distanceFromRoot: number = 0,
        rootIndex: number = 0,
        targetIndex: number = 0) {
            this._bug = bug;
            this._flip = flip;
            this._length1 = length1;
            this._length2 = length2;
            this._distanceFromRoot = distanceFromRoot;
            this._legPos = new LegPos(
                bug,
                span,
                radius,
                rotationOffset,
                spanOffset,
                targetIndex
            );
            this._isLeft = isLeft;
    }
    public getPos(): PosSet {
        const fromVecPos = this._bug.bone.getVecPos(this._index);
        const fromPos = fromVecPos.pos.clone();

        const dr = fromVecPos.r + (this._isLeft ? Math.PI / 2 : -Math.PI / 2);
        fromPos.x += Math.cos(dr) * this._distanceFromRoot;
        fromPos.y += Math.sin(dr) * this._distanceFromRoot;

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
    public set rootIndex(value: number) {
        // this._legPos.beginOffset = value;
        this._index = value;
    }
    public set targetIndex(value: number) {
        this._legPos.beginOffset = value;
    }
}