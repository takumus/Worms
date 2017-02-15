///<reference path="@base.ts" />
namespace WORMS{
    export class Simple extends Base{
        private thickness:number;
        private colors:{fill:number, border:number};
        public body:PIXI.Sprite;
        public graphics:PIXI.Graphics;
        constructor(length:number, thickness:number, fillColor:number = 0x000000, borderColor:number = 0xffffff){
            super(length);
            this.thickness = thickness;
            this.setColor(fillColor, borderColor);
            this.body = new PIXI.Sprite();
            this.graphics = new PIXI.Graphics();
            this.body.addChild(this.graphics);
        }
        public setColor(fillColor:number, borderColor:number):void{
            this.colors = {
                fill : fillColor,
                border : borderColor
            }
        }
        public render(){
            this.graphics.clear();
            this.renderWith(this.colors.border, this.thickness);
            this.renderWith(this.colors.fill, this.thickness*0.7);
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