/// <reference types="pixi.js" />
declare namespace WORMS {
    class Base extends PIXI.Graphics {
        protected bone: ROUTES.Line;
        protected length: number;
        private line;
        private routeIndex;
        private step;
        constructor(length: number);
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
        constructor(length: number, thickness: number);
        render(): void;
    }
}
declare namespace WORMS {
    class Simple extends Base {
        private thickness;
        constructor(length: number, thickness: number);
        render(): void;
        private renderWith(color, thickness);
    }
}
