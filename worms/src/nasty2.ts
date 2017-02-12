///<reference path="@base.ts" />
namespace WORMS{
    export interface NastyOption{
        headLength?:number;
        tailLength?:number;
        thickness:number;
        fillColor?:number;
        borderColor?:number;
        borderThickness?:number;
    }
    export class Nasty2 extends Base{
        private body:Array<BodyPos>;
        private _option:NastyOption;
        constructor(length:number, option:NastyOption = {thickness:10}){
            super(length);
            this.setOption(option);
        }
        public setLength(length:number){
            super.setLength(length);
            this.body = [];
            for(let i = 0; i < length; i ++){
                this.body.push(new BodyPos());
            }
        }
        public setOption(option:NastyOption):void{
            this._option = option;
            option.headLength = UTILS.def<number>(option.headLength, 0);
            option.tailLength = UTILS.def<number>(option.tailLength, 0);
            option.fillColor = UTILS.def<number>(option.fillColor, 0xff0000);
            option.borderColor = UTILS.def<number>(option.borderColor, 0x0000ff);
            option.borderThickness = UTILS.def<number>(option.borderThickness, 5);
        }
        public getOption():NastyOption{
            return this._option;
        }
        public render(){
            const bbone = this.bone.at(0);
            //ワームの外殻を生成
            const ebone = this.bone.at(this.bone.getLength() - 1);
            const bbody = this.body[0];
            const ebody = this.body[this.body.length - 1];
            bbody.left.x = bbone.x;
            bbody.left.y = bbone.y;
            const L = this.bone.getLength()  - 1;
            for(let i = 1; i < L; i ++){
                const nbone = this.bone.at(i);
                const nbody = this.body[i];
                let vx = this.bone.at(i-1).x - nbone.x;
                let vy = this.bone.at(i-1).y - nbone.y;
                let radian:number = Matthew.H_PI;
                if(i < this._option.headLength){
                    radian = i/this._option.headLength*Matthew.H_PI;
                }else if(i > L-this._option.tailLength){
                    radian = (i-(L-this._option.tailLength))/this._option.tailLength*Matthew.H_PI + Matthew.H_PI;
                }
                const r = Math.sin(radian)*this._option.thickness;
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
            this.lineStyle(this._option.borderThickness, this._option.borderColor);
            this.beginFill(this._option.fillColor);
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
    class BodyPos{
        public left:UTILS.Pos;
        public right:UTILS.Pos;
        constructor(){
            this.left = new UTILS.Pos();
            this.right = new UTILS.Pos();
        }
    }
}