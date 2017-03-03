/// <reference types="pixi.js" />
declare namespace WF {
    interface SimpleLightOption {
        fillColor?: number;
        thickness: number;
    }
    class FigureWorm extends WORMS.Base {
        static graphics: PIXI.Graphics;
        private static worms;
        private option;
        private static _id;
        id: number;
        constructor(length: number, option: SimpleLightOption);
        static render(): void;
        static getWorms(): FigureWorm[];
        setOption(option: SimpleLightOption): void;
        getOption(): SimpleLightOption;
        render(): void;
        dispose(): void;
        private renderWith(graphics, color, thickness, offsetX, offsetY);
    }
}
declare namespace WF {
    class Figure {
        private lines;
        private length;
        constructor();
        initWithOject(data: {
            x: number;
            y: number;
        }[][]): void;
        initWithLines(data: ROUTES.Line[]): void;
        getLength(): number;
        at(id: number): ROUTES.Line;
        clone(): Figure;
        setPositionOffset(pos: UTILS.Pos): Figure;
    }
}
declare namespace WF {
    class Holder {
        worms: WF.FigureWorm[];
        figure: Figure;
        animating: boolean;
        constructor();
        setFigure(figure: Figure): void;
        generate(): void;
        clear(): void;
    }
}
declare namespace WF {
    class HolderMaster {
        private holders;
        private step;
        private animating;
        private autoTweening;
        transformMe(me: Holder[]): boolean;
        transform(from: Holder[], to: Holder[]): boolean;
        private setRoute(worm, target);
        endMovement(): void;
        autoTween(time: number, complete?: () => void): void;
        setStep(step: number): void;
    }
}
