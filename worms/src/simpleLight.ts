///<reference path='@base.ts' />
namespace WORMS {
    export interface SimpleLightOption {
        fillColor?: number,
        thickness: number
    }
    export class SimpleLight extends Base {
        public static graphics: PIXI.Graphics;
        private static worms: {[key: number]: SimpleLight} = {};
        private option: SimpleLightOption;
        private static _id: number = 0;
        public id: number;
        constructor(length: number, option: SimpleLightOption) {
            super(length);
            this.setOption(option);
            this.id = SimpleLight._id;
            SimpleLight.worms[this.id] = this;
            SimpleLight._id ++;
        }
        public static render(): void {
            //console.log('render');
            this.graphics.clear();
            for (const id in this.worms) {
                const worm = this.worms[id];
                worm.render();
                //console.log(worm.id);
            }
        }
        public setOption(option: SimpleLightOption): void {
            this.option = option;
            option.fillColor = UTILS.def<number>(option.fillColor, 0xff0000);
        }
        public getOption(): SimpleLightOption {
            return this.option;
        }
        public render() {
            this.renderWith(
                SimpleLight.graphics,
                this.option.fillColor,
                this.option.thickness,
                0, 0
            );
        }
        public dispose(): void {
            this.option = null;
            SimpleLight.worms[this.id] = null;
            delete SimpleLight.worms[this.id];
        }
        private renderWith(graphics: PIXI.Graphics, color: number, thickness: number, offsetX: number, offsetY: number): void {
            const bbone = this.bone.at(0);
            const ebone = this.bone.at(this.length - 1);
            graphics.beginFill(color);
            graphics.drawCircle(bbone.x + offsetX, bbone.y + offsetY, thickness / 2);
            graphics.endFill();
            graphics.lineStyle(thickness, color);
            graphics.moveTo(bbone.x + offsetX, bbone.y + offsetY);
            for (let i = 1; i < this.length  - 1; i ++) {
                const nbone = this.bone.at(i);
                graphics.lineTo(nbone.x + offsetX, nbone.y + offsetY);
            }
            graphics.lineTo(ebone.x + offsetX, ebone.y + offsetY);
            graphics.lineStyle();
            graphics.beginFill(color);
            graphics.drawCircle(ebone.x + offsetX, ebone.y + offsetY, thickness / 2);
            graphics.endFill();
        }
    }
}