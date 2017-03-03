namespace WF {
    export class Holder {
        public worms: WORMS.Figure[];
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
                const w = new WORMS.Figure(l.getLength(), {thickness: 30});
                w.setRoute(l);
                this.worms.push(w);
            }
        }
        public clear(): void {
            if (this.animating) {
                console.error('Cannnot call "Holder.prototype.clear" while animating');
                return;
            }
            this.worms.forEach((worm) => {
                worm.dispose();
            });
            this.worms = [];
        }
    }
}