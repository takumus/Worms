///<reference path='@base.ts' />
namespace WORMS {
    export interface NastyOption {
        headLength?: number;
        tailLength?: number;
        thickness: number;
        fillColor?: number;
        borderColor?: number;
        borderThickness?: number;
    }
    export class Nasty extends Base {
        private bodyPos: Array<BodyPos>;
        private _option: NastyOption;
        public graphics: PIXI.Graphics;
        constructor(length: number, option: NastyOption = {thickness: 10}) {
            super(length);
            this.setOption(option);
            this.graphics = new PIXI.Graphics();
        }
        protected allocLength(length: number) {
            super.allocLength(length);
            this.bodyPos = [];
            for (let i = 0; i < this.bone.getLength(); i ++) {
                this.bodyPos.push(new BodyPos());
            }
        }
        public setOption(option: NastyOption): void {
            this._option = option;
            option.headLength = UTILS.def<number>(option.headLength, 0.5);
            option.tailLength = UTILS.def<number>(option.tailLength, 0.5);
            option.fillColor = UTILS.def<number>(option.fillColor, 0xff0000);
            option.borderColor = UTILS.def<number>(option.borderColor, 0x0000ff);
            option.borderThickness = UTILS.def<number>(option.borderThickness, 5);
        }
        public getOption(): NastyOption {
            return this._option;
        }
        public render() {
            const bbone = this.bone.at(0);
            // ワームの外殻を生成
            const ebone = this.bone.at(this.length - 1);
            const bbody = this.bodyPos[0];
            const ebody = this.bodyPos[this.length - 1];
            bbody.left.x = bbone.x;
            bbody.left.y = bbone.y;
            const L = this.length  - 1;
            for (let i = 1; i < L; i ++) {
                const nbone = this.bone.at(i);
                const nbody = this.bodyPos[i];
                let vx = this.bone.at(i - 1).x - nbone.x;
                let vy = this.bone.at(i - 1).y - nbone.y;
                let radian: number = Matthew.H_PI;
                const headLength = this.length * this._option.headLength;
                const tailLength = this.length * this._option.tailLength;
                if (i < headLength) {
                    radian = i / headLength * Matthew.H_PI;
                }else if (i > L - tailLength) {
                    radian = (i - (L - tailLength)) / tailLength * Matthew.H_PI + Matthew.H_PI;
                }
                const r = Math.sin(radian) * this._option.thickness;
                const vl = vx * vx + vy * vy;
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

            this.graphics.clear();
            this.graphics.lineStyle(this._option.borderThickness, this._option.borderColor);
            this.graphics.beginFill(this._option.fillColor);
            this.graphics.moveTo(bbody.left.x, bbody.left.y);
            for (let i = 1; i < this.length; i ++) {
                this.graphics.lineTo(this.bodyPos[i].left.x, this.bodyPos[i].left.y);
            }
            for (let i = this.length - 2; i >= 2; i --) {
                this.graphics.lineTo(this.bodyPos[i].right.x, this.bodyPos[i].right.y);
            }
            this.graphics.lineTo(bbody.left.x, bbody.left.y);
            this.graphics.endFill();
        }
    }
    class BodyPos {
        public left: UTILS.Pos;
        public right: UTILS.Pos;
        constructor() {
            this.left = new UTILS.Pos();
            this.right = new UTILS.Pos();
        }
    }
}