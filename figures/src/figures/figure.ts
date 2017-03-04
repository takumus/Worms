namespace WF {
    export class Figure {
        private _lines: Array<ROUTES.Line>;
        private _length: number;
        constructor() {
            this._lines = [];
        }
        public get lines(): Array<ROUTES.Line> {return this._lines; }
        public initWithOject(data: {x: number, y: number}[][]): void {
            this._lines = [];
            data.forEach((lo) => this._lines.push(new ROUTES.Line(lo)));
            this._length = this._lines.length;
        }
        public initWithLines(data: ROUTES.Line[]): void {
            this._lines = [];
            data.forEach((line) => this._lines.push(line.clone()));
            this._length = this._lines.length;
        }
        public get length(): number {
            return this._length;
        }
        public clone(): Figure {
            const figure = new Figure();
            figure.initWithLines(this._lines);
            return figure;
        }
        public setPositionOffset(pos: UTILS.Pos): Figure {
            for (let i = 0; i < this._length; i ++) {
                this._lines[i].setPositionOffset(pos);
            }
            return this;
        }
    }
}