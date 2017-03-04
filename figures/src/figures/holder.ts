namespace WF {
    export class Holder {
        private _worms: HoldableWorm[];
        private _figure: Figure;
        private _animating: boolean;
        public get worms(): HoldableWorm[] {return this._worms; }
        public get figure(): Figure {return this._figure; }
        public get animating(): boolean {return this._animating; }
        public set animating(val: boolean) {this._animating = val; }
        constructor() {
            this._worms = [];
        }
        public setFigure(figure: Figure): void {
            if (this._animating) {
                console.error('Cannnot call "Holder.prototype.setFigure" while animating');
                return;
            }
            this._figure = figure;
        }
        public generate(): void {
            if (this._animating) {
                console.error('Cannnot call "Holder.prototype.generate" while animating');
                return;
            }
            this.dispose();
            for (let i = 0; i < this._figure.length; i ++) {
                const l = this._figure.lines[i];
                const w = createWorm(l.length, this);
                w.setRoute(l);
                this._worms.push(w);
            }
        }
        public dispose(): void {
            if (this._animating) {
                console.error('Cannnot call "Holder.prototype.clear" while animating');
                return;
            }
            this._worms.forEach((worm) => worm.dispose());
            this.clear();
        }
        public clear(): void {
            this._worms = [];
        }
        public setStepToAll(step: number): void {
            if (!this._animating) {
                console.error('Cannnot call "Holder.prototype.setStep" after completed animation');
                return;
            }
            this._worms.forEach((worm) => this.setStep(worm, step));
        }
        public setStep(worm: HoldableWorm, step: number): void {
            worm.setStep(step);
        }
    }
}