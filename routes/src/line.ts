namespace ROUTES {
    export class Line {
        protected data: Array<UTILS.Pos>;
        private length: number;
        private prevOffset: UTILS.Pos;
        constructor(data: Array<UTILS.Pos>|Array<{x: number, y: number}> = []) {
            this.data = [];
            for (let i = 0; i < data.length; i ++) {
                const p = data[i];
                this.data.push(new UTILS.Pos(p.x, p.y));
            }
            this.length = this.data.length;
            this.prevOffset = new UTILS.Pos();
        }
        public setOffsetToAll(pos: UTILS.Pos): void {
            for (let i = 0; i < this.length; i ++) {
                const p = this.at(i);
                p.x += pos.x - this.prevOffset.x;
                p.y += pos.y - this.prevOffset.y;
            }
            this.prevOffset = pos.clone();
        }
        public getWidth(): number {
            let min = Number.MAX_VALUE;
            let max = Number.MIN_VALUE;
            for (let i = 0; i < this.length; i ++) {
                const p = this.at(i);
                if (min > p.x) min = p.x;
                else if (max < p.x) max = p.x;
            }
            return max - min;
        }
        public getHeight(): number {
            let min = Number.MAX_VALUE;
            let max = Number.MIN_VALUE;
            for (let i = 0; i < this.length; i ++) {
                const p = this.at(i);
                if (min > p.y) min = p.y;
                else if (max < p.y) max = p.y;
            }
            return max - min;
        }
        public reverse(): Line {
            this.data.reverse();
            return this;
        }
        public getHeadVecPos(): UTILS.VecPos {
            return this.getVecPos(
                this.at(0),
                this.at(1)
            );
        }
        public getTailVecPos(): UTILS.VecPos {
            return this.getVecPos(
                this.at(this.length - 1),
                this.at(this.length - 2)
            );
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
        public head(): UTILS.Pos {
            return this.at(0);
        }
        public tail(): UTILS.Pos {
            return this.at(this.length - 1);
        }
        public at(id: number): UTILS.Pos {
            return this.data[id];
        }
        public push(pos: UTILS.Pos): void {
            this.data.push(pos);
            this.length = this.data.length;
        }
        public pop(): UTILS.Pos {
            this.length --;
            return this.data.pop();
        }
        public shift(): UTILS.Pos {
            this.length --;
            return this.data.shift();
        }
        public pushLine(line: Line): Line {
            if (line.head().equals(this.tail())) line.shift();
            const L = line.data.length;
            for (let i = 0; i < L; i ++) {
                this.push(line.data[i].clone());
            }
            this.length = this.data.length;
            return this;
        }
        public getLength(): number {
            return this.length;
        }
        public clone(): Line {
            const data: Array<UTILS.Pos> = [];
            for (let i = 0; i < this.length; i ++) {
                data.push(this.data[i].clone());
            }
            return new Line(data);
        }
        public clear(): void {
            this.data = [];
            this.length = 0;
        }
        public wave(amp: number, freq: number, randomBegin: boolean = false): Line {
            const newData: Array<UTILS.Pos> = [];
            let rad = randomBegin ? Math.random() * (Math.PI * 2) : 0;
            newData.push(this.at(0).clone());
            for (let i = 1; i < this.length  - 1; i ++) {
                const p = this.at(i);
                const vx = this.at(i - 1).x - p.x;
                const vy = this.at(i - 1).y - p.y;
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
            newData.push(this.at(this.length - 1).clone());
            this.data = newData;
            return this;
        }
    }
}