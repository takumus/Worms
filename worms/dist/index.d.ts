/// <reference types="pixi.js" />
declare namespace WORMS {
    class Base {
        protected bone: ROUTES.Line;
        protected prevLength: number;
        protected length: number;
        private diffLength;
        private route;
        private step;
        constructor(length: number);
        setLength(length: number): void;
        updateLength(): void;
        protected allocLength(length: number): void;
        push(x: number, y: number): void;
        render(): void;
        setRoute(line: ROUTES.Line, nextLength?: number): void;
        addStep(step: number): boolean;
        setStep(step: number): boolean;
        getStep(): number;
        reverse(): void;
        getCurrentLine(): ROUTES.Line;
        getHeadVecPos(): UTILS.VecPos;
        getTailVecPos(): UTILS.VecPos;
        getRoute(): ROUTES.Line;
        getLength(): number;
        getCurrentLength(): number;
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
        protected allocLength(length: number): void;
        setOption(option: NastyOption): void;
        getOption(): NastyOption;
        render(): void;
    }
}
declare namespace WORMS {
    interface SimpleOption {
        fillColor?: number;
        thickness: number;
        shadow?: boolean;
        shadowColor?: number;
        shadowPosition?: UTILS.Pos;
        shadowThickness?: number;
    }
    class Simple extends Base {
        bodyGraphics: PIXI.Graphics;
        shadowGraphics: PIXI.Graphics;
        private option;
        private visible;
        constructor(length: number, option: SimpleOption);
        setOption(option: SimpleOption): void;
        getOption(): SimpleOption;
        render(): void;
        private renderWith(graphics, color, thickness, offsetX, offsetY);
        setVisible(visible: boolean): void;
        getVisible(): boolean;
    }
}
