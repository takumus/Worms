///<reference path='line.ts'/>
namespace ROUTES {
    export class Debugger extends PIXI.Container {
        private graphics: PIXI.Graphics = new PIXI.Graphics();
        private color: number;
        private thickness: number;
        private circle: boolean;
        private gradient: boolean;
        constructor() {
            super();
            this.addChild(this.graphics);
            this.setOption();
        }
        public setOption(color: number = 0xCCCCCC, thickness: number = 1, circle: boolean = true, gradient: boolean = true): void {
            this.color = color;
            this.thickness = thickness;
            this.circle = circle;
            this.gradient = gradient;
        }
        public render(line: Line): void {
            const bp: UTILS.Pos = line[0];
            const ep: UTILS.Pos = line[line.length - 1];
            this.graphics.lineStyle(this.thickness, this.color, this.gradient ? 0 : 1);
            this.graphics.moveTo(bp.x, bp.y);
            for (let i = 1; i < line.length; i ++) {
                const p = line[i];
                const a = i / (line.length - 1);
                this.graphics.lineStyle(this.thickness, this.color, this.gradient ? a : 1);
                this.graphics.lineTo(p.x, p.y);
            }
            if (this.circle) {
                this.graphics.drawCircle(bp.x, bp.y, 5);
                this.graphics.drawCircle(ep.x, ep.y, 5);
            }
        }
        public clear(): void {
            this.graphics.clear();
        }
    }
}