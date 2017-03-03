/// <reference types="pixi.js" />
declare namespace WF {
    class HoldableWorm extends WORMS.Base {
        holder: WF.Holder;
        prevHolder: WF.Holder;
        holderMaster: WF.HolderMaster;
        constructor(length: number);
        dispose(): void;
        setHolder(holder: Holder, def?: boolean): void;
    }
    interface SimpleLightOption {
        fillColor?: number;
        thickness: number;
    }
    class FigureWorm extends HoldableWorm {
        static graphics: PIXI.Graphics;
        private static worms;
        private option;
        private static _id;
        private _id;
        constructor(length: number, option: SimpleLightOption);
        static render(): void;
        static getWorms(): FigureWorm[];
        setOption(option: SimpleLightOption): void;
        getOption(): SimpleLightOption;
        render(): void;
        dispose(): void;
        private renderWith(graphics, color, thickness, offsetX, offsetY);
    }
    function createWorm(length: number, holder: Holder): HoldableWorm;
}
declare namespace WF {
    class Figure {
        private lines;
        private _length;
        constructor();
        initWithOject(data: {
            x: number;
            y: number;
        }[][]): void;
        initWithLines(data: ROUTES.Line[]): void;
        readonly length: number;
        at(id: number): ROUTES.Line;
        clone(): Figure;
        setPositionOffset(pos: UTILS.Pos): Figure;
    }
}
declare namespace WF {
    class Holder {
        private _worms;
        private _figure;
        private _animating;
        readonly worms: HoldableWorm[];
        readonly figure: Figure;
        animating: boolean;
        constructor();
        setFigure(figure: Figure): void;
        generate(): void;
        dispose(): void;
        clear(): void;
        setStepToAll(step: number): void;
        setStep(worm: HoldableWorm, step: number): void;
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
        private _holders;
        private step;
        private animating;
        private autoTweening;
        readonly holders: Holder[];
        transformMe(me: Holder[], option: TransformOption): boolean;
        transform(from: Holder[], to: Holder[], option: TransformOption): boolean;
        private setRoute(worm, target, option);
        endMovement(): void;
        autoTween(time: number, complete?: () => void): void;
        setStep(step: number): void;
    }
}
