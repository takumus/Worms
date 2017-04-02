import {LegPos} from './legPos';
import {Leg, PosSet} from './leg';
export class Bug extends WORMS.Base {
    private _graphics: PIXI.Graphics;
    private lp: Leg;
    private lp2: Leg;
    private lp3: Leg;
    private lp4: Leg;
    constructor(length: number, span: number) {
        super(length);
        this._graphics = new PIXI.Graphics();
        const scale = 0.4;
        this.lp  = new Leg(this, false, 100 * scale, 100 * scale, span, span * 0.5 , 110 * scale, -Math.PI / 2 + 0.8, 0);
        this.lp2 = new Leg(this, true,  100 * scale, 100 * scale, span, 0          , 110 * scale, Math.PI / 2 - 0.8, 0);
        this.lp3 = new Leg(this, true,  100 * scale, 120 * scale, span, span * 0.05, 120 * scale, -Math.PI / 2 - 0.8, 0);
        this.lp4 = new Leg(this, false, 100 * scale, 120 * scale, span, span * 0.55, 120 * scale, Math.PI / 2 + 0.8, 0);
    }
    public get graphics(): PIXI.Graphics {
        return this._graphics;
    }
    public render() {
        const g = this._graphics;
        g.clear();
        g.lineStyle(16, 0x333333);
        for (let i = Math.floor(this.currentLength * 0.2); i < Math.floor(this.currentLength * 0.6); i ++) {
            const pos = this.bone[i];
            if (i == Math.floor(this.currentLength * 0.2)) {
                g.moveTo(pos.x, pos.y);
            }else {
                g.lineTo(pos.x, pos.y);
            }
        };
        this.lp.index = this.lp2.index = Math.floor(this.currentLength * 0.3);
        this.lp.legPos.beginOffset = this.lp2.legPos.beginOffset = Math.floor(this.currentLength * 0.1);

        this.lp3.index = this.lp4.index = Math.floor(this.currentLength * 0.5);
        this.lp3.legPos.beginOffset = this.lp4.legPos.beginOffset = Math.floor(this.currentLength * 0.45);
        this.renderP(this.lp.getPos());
        this.renderP(this.lp2.getPos());
        this.renderP(this.lp3.getPos());
        this.renderP(this.lp4.getPos());
        ///*
        this.renderGuide(this.lp);
        this.renderGuide(this.lp2);
        this.renderGuide(this.lp3);
        this.renderGuide(this.lp4);//*/
    }
    public setRoute(route: ROUTES.Line, nextLength?: number): void {
        super.setRoute(route, nextLength);
    }
    private renderP(p: PosSet): void {
        const g = this._graphics;
        g.lineStyle(16, 0x333333);
        g.moveTo(p.begin.x, p.begin.y);
        g.lineTo(p.middle.x, p.middle.y);
        g.lineStyle(8, 0x333333);
        g.moveTo(p.middle.x, p.middle.y);
        g.lineTo(p.end.x, p.end.y);

        g.lineStyle();
        g.beginFill(0x333333);
        g.drawCircle(p.middle.x, p.middle.y, 8);
        g.drawCircle(p.end.x, p.end.y, 4);
        g.endFill();
    }
    private renderGuide(leg: Leg): void {
        const g = this._graphics;
        g.lineStyle(1, 0xff0000);
        const pp = leg.legPos.prevPos;
        const np = leg.legPos.nextPos;

        g.moveTo(pp.x, pp.y);
        g.lineTo(np.x, np.y);
        g.drawCircle(np.x, np.y, 10);
    }
}