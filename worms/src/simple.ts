///<reference path="@base.ts" />
namespace WORMS{
    export interface SimpleOption{
        fillColor?:number,
        thickness:number,
        borderThickness?:number,
        borderColor?:number
    }
    export class Simple extends Base{
        public body:PIXI.Sprite;
        public graphics:PIXI.Graphics;
        private option:SimpleOption;
        constructor(length:number, option:SimpleOption){
            super(length);
            this.body = new PIXI.Sprite();
            this.graphics = new PIXI.Graphics();
            this.body.addChild(this.graphics);
            this.setOption(option);
        }
        public setOption(option:SimpleOption):void{
            this.option = option;
            option.fillColor = UTILS.def<number>(option.fillColor, 0xff0000);
            option.borderColor = UTILS.def<number>(option.borderColor, 0x0000ff);
            option.borderThickness = UTILS.def<number>(option.borderThickness, 5);
        }
        public getOption():SimpleOption{
            return this.option;
        }
        public render(){
            this.graphics.clear();
            this.renderWith(this.option.borderColor, this.option.thickness + this.option.borderThickness*2);
            this.renderWith(this.option.fillColor, this.option.thickness);
        }
        private renderWith(color:number, thickness:number):void{
            const bbone = this.bone.at(0);
            const ebone = this.bone.at(this.bone.getLength() - 1);
            this.graphics.beginFill(color);
            this.graphics.drawCircle(bbone.x, bbone.y, thickness / 2);
            this.graphics.endFill();
            this.graphics.lineStyle(thickness, color);
            this.graphics.moveTo(bbone.x, bbone.y);
            for(let i = 1; i < this.bone.getLength()  - 1; i ++){
                const nbone = this.bone.at(i);
                this.graphics.lineTo(nbone.x, nbone.y);
            }
            this.graphics.lineTo(ebone.x, ebone.y);
            this.graphics.lineStyle();
            this.graphics.beginFill(color);
            this.graphics.drawCircle(ebone.x, ebone.y, thickness / 2);
            this.graphics.endFill();
        }
    }
}