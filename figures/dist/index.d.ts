/// <reference types="pixi.js" />
declare namespace WF {
    class HoldableWorm extends WORMS.Base {
        holder: WF.Holder;
        prevHolder: WF.Holder;
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
        private _option;
        private static _id;
        private _id;
        constructor(length: number, option: SimpleLightOption);
        static render(): void;
        static getWorms(): FigureWorm[];
        setOption(option: SimpleLightOption): void;
        readonly option: SimpleLightOption;
        render(): void;
        dispose(): void;
        private renderWith(graphics, color, thickness, offsetX, offsetY);
    }
    function createWorm(length: number, holder: Holder): HoldableWorm;
}
declare namespace WF {
    class Figure extends UTILS.ArrayWrapper<Figure, ROUTES.Line> {
        private _length;
        constructor();
        initWithOject(data: {
            x: number;
            y: number;
        }[][]): void;
        initWithLines(data: ROUTES.Line[]): void;
        clone(): Figure;
        setPositionOffset(pos: UTILS.Pos): Figure;
    }
}
declare namespace WF {
    class Holder {
        private _worms;
        private _figure;
        private _animating;
        private _positionOffset;
        readonly worms: HoldableWorm[];
        readonly figure: Figure;
        animating: boolean;
        constructor();
        setPositionOffset(pos: UTILS.Pos): void;
        setFigure(figure: Figure): void;
        generate(): void;
        dispose(): void;
        clear(): void;
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
    class HolderMaster<T extends Holder> {
        private _holders;
        private step;
        private animating;
        private autoTweening;
        readonly holders: T[];
        transformMe(me: T[] | T, option: TransformOption): boolean;
        transform(fromHolders: T[] | T, toHolders: T[] | T, option: TransformOption): boolean;
        private setRoute(worm, target, option);
        endMovement(): void;
        autoTween(time: number, delay: number, complete?: () => void): void;
        setStep(step: number): void;
        protected setStepToWorm(worm: WF.HoldableWorm, step: number, prevHolder: T, nextHolder: T): void;
        dispose(): void;
    }
}
