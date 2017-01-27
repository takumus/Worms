import {Pos, VecPos, Circle} from '../utils';
import {Line} from '../routes/';
import BodyPos from './bodyPos';
export default class WormBase extends PIXI.Graphics{
    protected bone:Line;
    protected body:Array<BodyPos>;
    protected length:number;
    private thickness:number;
    constructor(length:number, thickness:number){
        super();
        this.length = length;
        this.bone = new Line();
        this.body = [];
        for(let i = 0; i < length; i ++){
            this.bone.push(new Pos());
            this.body.push(new BodyPos());
        }
        this.setThickness(thickness);
    }
    public setThickness(thickness:number):void{
        this.thickness = thickness;
    }
    public push(x:number, y:number){
        //先頭に加えて、１つずつずらす。
        let i = this.bone.getLength()-1;
        for(; i >= 1; i --){
            this.bone.at(i).x = this.bone.at(i-1).x;
            this.bone.at(i).y = this.bone.at(i-1).y;
        }
        const bbone = this.bone.at(0);
        bbone.x = x;
        bbone.y = y;
    }
    public render(){
        const bbone = this.bone.at(0);
        //ワームの外殻を生成
        const ebone = this.bone.at(this.bone.getLength() - 1);
        const bbody = this.body[0];
        const ebody = this.body[this.body.length - 1];
        bbody.left.x = bbone.x;
        bbody.left.y = bbone.y;
        for(let i = 1; i < this.bone.getLength()  - 1; i ++){
            const nbone = this.bone.at(i);
            const nbody = this.body[i];
            let vx = this.bone.at(i-1).x - nbone.x;
            let vy = this.bone.at(i-1).y - nbone.y;
            const r = ((Math.sin(i/(this.bone.getLength()  - 1)*(Math.PI))))*this.thickness;
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
        
        this.clear();
        this.lineStyle(2, 0xffffff);
        //this.beginFill(0xffffff);
        this.moveTo(bbody.left.x, bbody.left.y);
        for(let i = 1; i < this.body.length; i ++){
            this.lineTo(this.body[i].left.x, this.body[i].left.y);
        }
        for(let i = this.body.length - 2; i >= 2; i --){
            this.lineTo(this.body[i].right.x, this.body[i].right.y);
        }
        this.lineTo(bbody.left.x, bbody.left.y);
        this.endFill();
    }
}