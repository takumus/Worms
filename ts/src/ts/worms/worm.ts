import {Pos, VecPos, Circle} from '../routes/utils';
import {Line} from '../routes/route';
class Worm extends PIXI.Graphics{
    private bone:Array<Pos>;
    private body:Array<BodyPos>;
    protected length:number;
    constructor(length:number){
        super();
        this.length = length;
        this.bone = [];
        this.body = [];
        for(let i = 0; i < length; i ++){
            this.bone.push(new Pos());
            this.body.push(new BodyPos());
        }
    }
    public push(x:number, y:number){
        //先頭に加えて、１つずつずらす。
        let i = this.bone.length-1;
        for(; i >= 1; i --){
            this.bone[i].x = this.bone[i-1].x;
            this.bone[i].y = this.bone[i-1].y;
        }
        const bbone = this.bone[0];
        bbone.x = x;
        bbone.y = y;
        //ワームの外殻を生成
        const ebone = this.bone[this.bone.length - 1];
        const bbody = this.body[0];
        const ebody = this.body[this.body.length - 1];
        bbody.left.x = bbone.x;
        bbody.left.y = bbone.y;
        for(i = 1; i < this.bone.length - 1; i ++){
            const nbone = this.bone[i];
            const nbody = this.body[i];
            let vx = this.bone[i-1].x - nbone.x;
            let vy = this.bone[i-1].y - nbone.y;
            const r = ((Math.sin(i/(this.bone.length - 1)*(Math.PI))))*30;
            const vl = vx*vx+vy*vy;
            const vr = Math.sqrt(vl);
            vx = vx / vr * r;
            vy = vy / vr * r;
            nbody.left.x = nbone.x + -vy;
            nbody.left.y = nbone.y + vx;
            nbody.right.x = nbone.x + vy;
            nbody.right.y = nbone.y + -vx;
        }
        ebody.left.x = ebone.x;
        ebody.left.y = ebone.y;
    }
    public render(){
        this.clear();
        this.lineStyle(2, 0xffffff);
        //this.beginFill(0xffffff);
        this.moveTo(this.body[0].left.x, this.body[0].left.y);
        for(let i = 1; i < this.body.length; i ++){
            this.lineTo(this.body[i].left.x, this.body[i].left.y);
        }
        for(let i = this.body.length - 2; i >= 2; i --){
            this.lineTo(this.body[i].right.x, this.body[i].right.y);
        }
        this.lineTo(this.body[0].left.x, this.body[0].left.y);
        this.endFill();
    }
}
class FollowWorm extends Worm{
    private line:Line;
    private routeIndex:number;
    constructor(length:number){
        super(length);
        this.routeIndex = 0;
    }
    public setRoute(line:Line){
        if(line.getLength() <= this.length) return;
        this.line = line;
        //this.routeIndex = 0;
        /*
        let ri:number = 0;
        for (let ii = 0; ii < this.line.length; ii++) {
            let rr:number = Math.sin(ri)*(30*Math.sin(Math.PI*(ii/(this.routeLength))));
            ri+=0.2;
            var vpos:Pos = this.line[ii];
            //vpos.x = vpos.x + Math.cos(vpos.r+Math.PI/2) * rr;
            //vpos.y = vpos.y + Math.sin(vpos.r+Math.PI/2) * rr;
        }
        */
    }
    public gotoHead(){
        this.routeIndex = 0;
        for(let i = 0; i < this.length; i ++){
            this.step();
        }
    }
    public setStep():void{

    }
    public step(n:number = 1):void{
        this._step();
        if(n > 1)this.step(n-1);
    }
    private _step():void{
        if(!this.line) return;
        if(this.routeIndex >= this.line.getLength()){
            this.routeIndex = 0;
            this.gotoHead();
            return;
        }
        const pos = this.line.at(this.routeIndex);
        this.push(pos.x, pos.y);
        this.routeIndex++;
        return;
    }
}
class BodyPos{
    public left:Pos;
    public right:Pos;
    constructor(){
        this.left = new Pos();
        this.right = new Pos();
    }
}
export {
    Worm,
    FollowWorm
}