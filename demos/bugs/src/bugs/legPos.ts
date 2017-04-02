import {Bug} from '.';
export class LegPos {
    public bug: Bug;
    public span: number;
    public radius: number;
    public radianOffset: number;
    public spanOffset: number;
    public beginOffset: number;
    private _nextPos: UTILS.Pos;
    private _prevPos: UTILS.Pos;
    constructor(bug: Bug, span: number, radius: number, radianOffset: number, spanOffset: number, beginOffset: number) {
        this.bug = bug;
        this.span = span;
        this.radius = radius;
        this.radianOffset = radianOffset;
        this.spanOffset = spanOffset % span;
        this.beginOffset = beginOffset;
        this._nextPos = new UTILS.Pos();
        this._prevPos = new UTILS.Pos();
    }
    public get prevPos() {return this._prevPos}
    public get nextPos() {return this._nextPos}
    public getPos() {
        const id = (this.bug.route.length - this.bug.currentLength) * this.bug.step;

        const fid = id + this.spanOffset;
        const nf = (fid) % (this.span / 2);
        const nf2 = (fid) % this.span;
        const pid = Math.floor(Math.floor(fid / this.span) * this.span - this.spanOffset + (this.bug.currentLength - this.beginOffset));
        this._prevPos = this._getPos(pid);
        if (nf < nf2) {
            this._nextPos = this._getPos(pid + this.span);
            let p = (Math.cos(nf / (this.span / 2) * Math.PI - Math.PI) + 1) / 2;
            p = Math.pow(p, 2);
            // p = nf / (this.span / 2);
            this._prevPos.x += (this._nextPos.x - this._prevPos.x) * p;
            this._prevPos.y += (this._nextPos.y - this._prevPos.y) * p;
            return this._prevPos;
        }
        return this._prevPos;
    }
    public _getPos(id: number): UTILS.Pos {
        id = Math.floor(id);
        if (id < 0) id = 0;
        if (id >= this.bug.route.length - 1) id = this.bug.route.length - 2;
        const p1 = this.bug.route[id];
        const p2 = this.bug.route[id + 1];
        const tx = p2.x - p1.x;
        const ty = p2.y - p1.y;
        const r = Math.atan2(ty, tx) + this.radianOffset;
        return new UTILS.Pos(
            Math.cos(r) * this.radius + p1.x,
            Math.sin(r) * this.radius + p1.y
        );
    }
}