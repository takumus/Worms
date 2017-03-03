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
    function createWorm(length: number): WORMS.Base;
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
        worms: WORMS.Base[];
        figure: Figure;
        animating: boolean;
        constructor();
        setFigure(figure: Figure): void;
        generate(): void;
        clear(): void;
        setStepToAll(step: number): void;
        setStep(worm: WORMS.Base, step: number): void;
    }
}
declare namespace WF {
    interface WaveOption {
        enabled: boolean;
        amplitude: number;
        frequency: number;
    }
    interface RadiusOption {
        begin: number;
        end: number;
    }
    interface TransformOption {
        resolution: number;
        radius: number | RadiusOption;
        wave?: WaveOption;
    }
    class HolderMaster {
        holders: Holder[];
        private step;
        private animating;
        private autoTweening;
        transformMe(me: Holder[], option: TransformOption): boolean;
        transform(from: Holder[], to: Holder[], option: TransformOption): boolean;
        private setRoute(worm, target, option);
        endMovement(): void;
        autoTween(time: number, complete?: () => void): void;
        setStep(step: number): void;
    }
}
