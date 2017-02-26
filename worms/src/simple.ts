///<reference path='@base.ts' />
namespace WORMS {
    export interface SimpleOption {
        fillColor?: number,
        thickness: number,
        shadow?: boolean,
        shadowColor?: number,
        shadowPosition?: UTILS.Pos,
        shadowThickness?: number
    }
    export class Simple extends Base {
        public bodyGraphics: PIXI.Graphics;
        public shadowGraphics: PIXI.Graphics;
        private option: SimpleOption;
        private visible: boolean;
        constructor(length: number, option: SimpleOption) {
            super(length);
            this.bodyGraphics = new PIXI.Graphics();
            this.shadowGraphics = new PIXI.Graphics();
            this.setOption(option);
            this.setVisible(true);
        }
        public setOption(option: SimpleOption): void {
            this.option = option;
            option.fillColor = UTILS.def<number>(option.fillColor, 0xff0000);
            option.shadow = UTILS.def<boolean>(option.shadow, false);
            option.shadowColor = UTILS.def<number>(option.shadowColor, 0xCCCCCC);
            option.shadowPosition = UTILS.def<UTILS.Pos>(option.shadowPosition, new UTILS.Pos());
            option.shadowThickness = UTILS.def<number>(option.shadowThickness, option.thickness);
        }
        public getOption(): SimpleOption {
            return this.option;
        }
        public render() {
            if (this.option.shadow) {
                this.renderWith(
                    this.shadowGraphics,
                    this.option.shadowColor,
                    this.option.shadowThickness,
                    this.option.shadowPosition.x,
                    this.option.shadowPosition.y
                );
            }
            this.renderWith(
                this.bodyGraphics,
                this.option.fillColor,
                this.option.thickness,
                0, 0
            );
        }
        private renderWith(graphics: PIXI.Graphics, color: number, thickness: number, offsetX: number, offsetY: number): void {
            graphics.clear();
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
        public setVisible(visible: boolean): void {
            this.visible = visible;
            this.bodyGraphics.visible = this.shadowGraphics.visible = visible;
        }
        public getVisible(): boolean {
            return this.visible;
        }
    }
}