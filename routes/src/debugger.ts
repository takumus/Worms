///<reference path='line.ts'/>
namespace ROUTES {
    export let graphics: PIXI.Graphics = new PIXI.Graphics();
    export function render(line: Line): void {
        const bp: UTILS.Pos = line.head();
        const ep: UTILS.Pos = line.tail();
        graphics.lineStyle(1, 0xCCCCCC);
        graphics.moveTo(bp.x, bp.y);
        for (let i = 1; i < line.getLength(); i ++) {
            const p = line.at(i);
            graphics.lineTo(p.x, p.y);
        }
        graphics.drawCircle(bp.x, bp.y, 5);
        graphics.drawCircle(ep.x, ep.y, 5);
    }
    export function clear(): void {
        graphics.clear();
    }
}