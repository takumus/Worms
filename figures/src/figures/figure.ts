namespace WF {
    export class Figure {
        private lines: Array<ROUTES.Line>;
        private _length: number;
        constructor() {
            this.lines = [];
        }
        public initWithOject(data: {x: number, y: number}[][]): void {
            this.lines = [];
            data.forEach((lo) => this.lines.push(new ROUTES.Line(lo)));
            this._length = this.lines.length;
        }
        public initWithLines(data: ROUTES.Line[]): void {
            this.lines = [];
            data.forEach((line) => this.lines.push(line.clone()));
            this._length = this.lines.length;
        }
        public get length(): number {
            return this.length;
        }
        public at(id: number): ROUTES.Line {
            return this.lines[id];
        }
        public clone(): Figure {
            const figure = new Figure();
            figure.initWithLines(this.lines);
            return figure;
        }
        public setPositionOffset(pos: UTILS.Pos): Figure {
            for (let i = 0; i < this._length; i ++) {
                this.at(i).setPositionOffset(pos);
            }
            return this;
        }
    }
}