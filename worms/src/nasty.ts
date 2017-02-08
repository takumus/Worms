///<reference path="@base.ts" />
namespace WORMS{
    export class Nasty extends Base{
        private thickness:number;
        private body:Array<BodyPos>;
        private fillColor:number;
        private borderColor:number;
        constructor(length:number, thickness:number, fillColor:number = 0xffffff, borderColor:number = 0x000000){
            super(length);
            this.thickness = thickness/2;
            this.body = [];
            for(let i = 0; i < length; i ++){
                this.body.push(new BodyPos());
            }
            this.setColor(fillColor, borderColor);
        }
        public setColor(fillColor:number, borderColor:number):void{
            this.fillColor = fillColor;
            this.borderColor = borderColor;
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
            this.lineStyle(3, this.borderColor);
            this.beginFill(this.fillColor);
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