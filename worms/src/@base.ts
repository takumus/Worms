namespace WORMS {
    export class Base {
        private _bone: ROUTES.Line;
        protected prevLength: number;
        private _length: number;
        private diffLength: number;
        private _route: ROUTES.Line;
        private _step: number = 0;
        constructor(length: number) {
            this._bone = new ROUTES.Line();
            this.setLength(length);
        }
        public setLength(length: number) {
            this.prevLength = Math.floor(length);
            this.allocLength(length);
        }
        public updateLength(): void {
            const pl = this._route.length - this.prevLength;
            this.setLength(this._length);
            const nl = this._route.length - this.prevLength;
            if (pl > 0 && nl > 0) {
                const pdf = pl - pl * this._step;
                const p = (nl - pdf) / nl;
                this.setStep(p);
            }
        }
        protected allocLength(length: number) {
            length = Math.floor(length);
            this.diffLength = length - this.prevLength;
            this._bone.clear();
            const L = this.prevLength > length ? this.prevLength : length;
            for (let i = 0; i < L; i ++) {
                this._bone.push(new UTILS.Pos());
            }
            // re set bones
            this.setStep(this._step);
        }
        public render() {
        }
        public setRoute(line: ROUTES.Line, nextLength?: number) {
            if (line.length < this.prevLength) return;
            this._step = 0;
            this._route = line;
            this.allocLength(UTILS.def<number>(nextLength, this._length));
        }
        public addStep(step: number): boolean {
            if (!this._route) return false;
            const length = this._route.length - this.prevLength;
            const p = step / length;
            if (p < 0) {
                this.setStep(1);
                return false;
            }
            return this.setStep(this._step + p);
        }
        public setStep(step: number): boolean {
            if (step < 0) step = 0;
            if (step > 1) step = 1;
            let s = step * 1.2;
            s = s > 1 ? 1 : s;
            this._length = Math.floor(s * this.diffLength + this.prevLength);
            this._step = step;
            if (!this._route) return false;
            const beginIndex = this.prevLength - 1;
            const length = this._route.length - beginIndex - 1;
            const posIndex = Math.floor(length * step);
            const offset = (length * step - posIndex);
            for (let i = 0; i < this._bone.length; i ++) {
                const id = beginIndex - i + posIndex;
                const b = this._bone[i];
                const l = this._route[id];
                const nl = this._route[id + 1];
                if (!l) continue;
                let dx = 0;
                let dy = 0;
                if (nl) {
                    dx = (nl.x - l.x) * offset;
                    dy = (nl.y - l.y) * offset;
                }
                b.x = l.x + dx;
                b.y = l.y + dy;
            }
            return true;
        }
        public get step(): number {
            return this._step;
        }
        public reverse(): void {
            this._bone.reverse();
        }
        public getCurrentLine(): ROUTES.Line {
            // console.log(this._bone);
            const line = new ROUTES.Line();
            const current = this._bone.clone();
            for (let i = 0; i < this._length; i ++) {
                line.push(current[i].clone());
            }
            line.reverse();
            return line;
        }
        public getHeadVecPos(): UTILS.VecPos {
            return this._bone.getHeadVecPos().add(Math.PI);
        }
        public getTailVecPos(): UTILS.VecPos {
            return this._bone.getTailVecPos().add(Math.PI);
        }
        public get route(): ROUTES.Line {
            return this._route;
        }
        public get length(): number {
            return this.prevLength;
        }
        public get currentLength(): number {
            return this._length;
        }
        public get bone(): ROUTES.Line {
            return this._bone;
        }
        public dispose(): void {
            this._bone = null;
            this._route = null;
        }
    }
}
