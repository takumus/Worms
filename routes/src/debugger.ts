///<reference path='line.ts'/>
namespace ROUTES {
    export class Debugger extends PIXI.Container {
        private graphics: PIXI.Graphics = new PIXI.Graphics();
        constructor() {
            super();
            this.addChild(this.graphics);
        }
        public render(line: Line): void {
            const bp: UTILS.Pos = line.head();
            const ep: UTILS.Pos = line.tail();
            this.graphics.lineStyle(1, 0xCCCCCC);
            this.graphics.moveTo(bp.x, bp.y);
            for (let i = 1; i < line.getLength(); i ++) {
                const p = line.at(i);
                this.graphics.lineTo(p.x, p.y);
            }
            this.graphics.drawCircle(bp.x, bp.y, 5);
            this.graphics.drawCircle(ep.x, ep.y, 5);
        }
        public clear(): void {
            this.graphics.clear();
        }
    }
}