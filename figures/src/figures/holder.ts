namespace WF {
    export class Holder {
        public worms: WORMS.Base[];
        public figure: Figure;
        public animating: boolean;
        constructor() {
            this.worms = [];
        }
        public setFigure(figure: Figure): void {
            if (this.animating) {
                console.error('Cannnot call "Holder.prototype.setFigure" while animating');
                return;
            }
            this.figure = figure;
        }
        public generate(): void {
            if (this.animating) {
                console.error('Cannnot call "Holder.prototype.generate" while animating');
                return;
            }
            this.clear();
            for (let i = 0; i < this.figure.getLength(); i ++) {
                const l = this.figure.at(i);
                const w = createWorm(l.getLength());
                w.setRoute(l);
                this.worms.push(w);
            }
        }
        public clear(): void {
            if (this.animating) {
                console.error('Cannnot call "Holder.prototype.clear" while animating');
                return;
            }
            this.worms.forEach((worm) => worm.dispose());
            this.worms = [];
        }
        public setStepToAll(step: number): void {
            if (!this.animating) {
                console.error('Cannnot call "Holder.prototype.setStep" after completed animation');
                return;
            }
            this.worms.forEach((worm) => this.setStep(worm, step));
        }
        public setStep(worm: WORMS.Base, step: number): void {
            worm.setStep(step);
        }
    }
}