/// <reference types="pixi.js" />
declare namespace WORMS {
    class Base extends PIXI.Graphics {
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
    class Nasty extends Base {
        private thickness;
        private body;
        private colors;
        constructor(length: number, thickness: number, fillColor?: number, borderColor?: number);
        setColor(fillColor: number, borderColor: number): void;
        render(): void;
    }
}
declare namespace WORMS {
    class Simple extends Base {
        private thickness;
        private colors;
        constructor(length: number, thickness: number, fillColor?: number, borderColor?: number);
        setColor(fillColor: number, borderColor: number): void;
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
    class Nasty2 extends Base {
        private body;
        private _option;
        constructor(length: number, option?: NastyOption);
        setLength(length: number): void;
        setOption(option: NastyOption): void;
        getOption(): NastyOption;
        render(): void;
    }
}
