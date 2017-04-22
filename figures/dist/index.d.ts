declare namespace WF {
    class HoldableWorm<T extends WF.Holder> extends WORMS.Base {
        holder: T;
        prevHolder: T;
        constructor(length: number);
        dispose(): void;
        setHolder(holder: T, def?: boolean): void;
    }
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
        readonly worms: HoldableWorm<Holder>[];
        readonly figure: Figure;
        animating: boolean;
        WormClass: typeof HoldableWorm;
        constructor(WormClass: typeof HoldableWorm);
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
        dispose(): void;
    }
}
