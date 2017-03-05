namespace ROUTES {
    export class Line extends UTILS.ArrayWrapper<Line, UTILS.Pos> {
        private prevPositionOffset: UTILS.Pos;
        private prevScaleOffset: UTILS.Pos;
        constructor(data: Array<UTILS.Pos>|Array<{x: number, y: number}> = []) {
            super();
            this['__proto__'] = Line.prototype;
            for (let i = 0; i < data.length; i ++) {
                const p = data[i];
                this.push(new UTILS.Pos(p.x, p.y));
            }
            this.prevPositionOffset = new UTILS.Pos();
            this.prevScaleOffset = new UTILS.Pos();
        }
        public setPositionOffset(pos: UTILS.Pos): void {
            this.forEach((p) => {
                p.x += pos.x - this.prevPositionOffset.x;
                p.y += pos.y - this.prevPositionOffset.y;
            });
            this.prevPositionOffset = pos.clone();
        }
        public setScaleOffset(scale: UTILS.Pos): void {
            this.forEach((p) => {
                p.x /= this.prevScaleOffset.x;
                p.y /= this.prevScaleOffset.y;
                p.x *= scale.x;
                p.y *= scale.y;
            });
            this.prevScaleOffset = scale.clone();
        }
        public getWidth(): number {
            let min = Number.MAX_VALUE;
            let max = Number.MIN_VALUE;
            for (let i = 0; i < this.length; i ++) {
                const p = this[i];
                if (min > p.x) min = p.x;
                else if (max < p.x) max = p.x;
            }
            return max - min;
        }
        public getHeight(): number {
            let min = Number.MAX_VALUE;
            let max = Number.MIN_VALUE;
            this.forEach((p) => {
                if (min > p.y) min = p.y;
                else if (max < p.y) max = p.y;
            })
            return max - min;
        }
        public getHeadVecPos(): UTILS.VecPos {
            return this.getVecPos(
                this[0],
                this[1]
            );
        }
        public getTailVecPos(): UTILS.VecPos {
            return this.getVecPos(
                this[this.length - 1],
                this[this.length - 2]
            );
        }
        public pushLine(line: Line): Line {
            line = line.clone();
            if (line[0].equals(this[this.length - 1])) line.shift();
            line.forEach((p) => {
               this.push(p.clone());
            })
            return this;
        }
        public clone(): Line {
            const data: Line = new Line();
            this.forEach((p) => {
                data.push(p.clone());
            });
            return data;
        }
        public clear(): void {
            this.length = 0;
        }
        public wave(amp: number, freq: number, randomBegin: boolean = false): Line {
            const newData: Array<UTILS.Pos> = [];
            let rad = randomBegin ? Math.random() * (Math.PI * 2) : 0;
            newData.push(this[0].clone());
            for (let i = 1; i < this.length  - 1; i ++) {
                const p = this[i];
                const vx = this[i - 1].x - p.x;
                const vy = this[i - 1].y - p.y;
                const np = new UTILS.Pos();
                const all = Math.sin(i 　/ 　(this.length 　- 　1) 　* 　Math.PI);
                // all * allで開始、終了を極端にする。(先端への影響を少なく)
                const offset = all 　* 　Math.sin(rad) 　* 　amp;
                const vr = Math.sqrt(vx 　* 　vx 　+ 　vy 　* 　vy);
                rad += freq;
                np.x = p.x + -(vy / vr * offset);
                np.y = p.y +  (vx / vr * offset);
                newData.push(np);
            }
            newData.push(this[this.length - 1].clone());
            this.clear();
            newData.forEach((pos) => {
                this.push(pos);
            });
            return this;
        }
        public toString(): string {
            return JSON.stringify(this);
        }
        private getVecPos(fp: UTILS.Pos, sp: UTILS.Pos): UTILS.VecPos {
            return new UTILS.VecPos(
                fp.x,
                fp.y,
                Math.atan2(
                    sp.y - fp.y,
                    sp.x - fp.x
                )
            );
        }
    }
}