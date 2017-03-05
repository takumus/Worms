namespace WF {
    export class Figure extends UTILS.ArrayWrapper<Figure, ROUTES.Line> {
        private _length: number;
        constructor() {
            super();
            this['__proto__'] = Figure.prototype;
        }
        public initWithOject(data: {x: number, y: number}[][]): void {
            this.clear();
            data.forEach((lo) => this.push(new ROUTES.Line(lo)));
            this._length = this.length;
        }
        public initWithLines(data: ROUTES.Line[]): void {
            this.clear();
            data.forEach((line) => this.push(line.clone()));
            this._length = this.length;
        }
        public clone(): Figure {
            const figure = new Figure();
            figure.initWithLines(this);
            return figure;
        }
        public setPositionOffset(pos: UTILS.Pos): Figure {
            this.forEach((l) => {
                l.setPositionOffset(pos);
            })
            return this;
        }
        public clear(): void {
            this.length = 0;
        }
    }
}