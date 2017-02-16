/// <reference types="pixi.js" />
declare namespace WORMS {
    class Base {
        protected bone: ROUTES.Line;
        protected length: number;
        private route;
        private step;
        constructor(length: number);
        setLength(length: number): void;
        push(x: number, y: number): void;
        render(): void;
        addRouteFromCurrent(line: ROUTES.Line): void;
        setRoute(line: ROUTES.Line): void;
        addStep(step: number): boolean;
        setStep(step: number): boolean;
        getStep(): number;
        reverse(): void;
        getCurrentLine(): ROUTES.Line;
        getHeadVecPos(): UTILS.VecPos;
        getTailVecPos(): UTILS.VecPos;
        getRoute(): ROUTES.Line;
    }
}
declare namespace WORMS {
    interface SimpleOption {
        fillColor?: number;
        thickness: number;
        borderThickness?: number;
        borderColor?: number;
    }
    class Simple extends Base {
        body: PIXI.Sprite;
        graphics: PIXI.Graphics;
        private option;
        constructor(length: number, option: SimpleOption);
        setOption(option: SimpleOption): void;
        getOption(): SimpleOption;
        render(): void;
        private renderWith(color, thickness);
    }
}
declare namespace WORMS {
    interface NastyOption {
        headLength?: number;
        tailLength?: number;
        thickness: number;
        fillColor?: number;
        borderColor?: number;
        borderThickness?: number;
    }
    class Nasty extends Base {
        private bodyPos;
        private _option;
        graphics: PIXI.Graphics;
        constructor(length: number, option?: NastyOption);
        setLength(length: number): void;
        setOption(option: NastyOption): void;
        getOption(): NastyOption;
        render(): void;
    }
}
