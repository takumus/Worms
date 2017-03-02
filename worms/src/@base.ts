namespace WORMS {
    export class Base {
        protected bone: ROUTES.Line;
        protected prevLength: number;
        protected length: number;
        private diffLength: number;
        private route: ROUTES.Line;
        private step: number = 0;
        constructor(length: number) {
            this.bone = new ROUTES.Line();
            this.setLength(length);
        }
        public setLength(length: number) {
            this.prevLength = Math.floor(length);
            this.allocLength(length);
        }
        public updateLength(): void {
            const pl = this.route.getLength() - this.prevLength;
            this.setLength(this.length);
            const nl = this.route.getLength() - this.prevLength;
            if (pl > 0 && nl > 0) {
                const pdf = pl - pl * this.step;
                const p = (nl - pdf) / nl;
                this.setStep(p);
            }
        }
        protected allocLength(length: number) {
            length = Math.floor(length);
            this.diffLength = length - this.prevLength;
            this.bone.clear();
            const L = this.prevLength > length ? this.prevLength : length;
            for (let i = 0; i < L; i ++) {
                this.bone.push(new UTILS.Pos());
            }
            // re set bones
            this.setStep(this.step);
        }
        public push(x: number, y: number) {
            // 先頭に加えて、１つずつずらす。
            let i = this.bone.getLength() - 1;
            for (; i >= 1; i --) {
                this.bone.at(i).x = this.bone.at(i - 1).x;
                this.bone.at(i).y = this.bone.at(i - 1).y;
            }
            const bbone = this.bone.at(0);
            bbone.x = x;
            bbone.y = y;
        }
        public render() {
        }
        public setRoute(line: ROUTES.Line, nextLength?: number) {
            if (line.getLength() < this.prevLength) return;
            this.step = 0;
            this.route = line;
            this.allocLength(UTILS.def<number>(nextLength, this.length));
        }
        public addStep(step: number): boolean {
            const length = this.route.getLength() - this.prevLength;
            const p = step / length;
            if (p < 0) {
                this.setStep(1);
                return false;
            }
            return this.setStep(this.step + p);
        }
        public setStep(step: number): boolean {
            if (step < 0) step = 0;
            if (step > 1) step = 1;
            let s = step * 1.2;
            s = s > 1 ? 1 : s;
            this.length = Math.floor(s * this.diffLength + this.prevLength);
            this.step = step;
            if (!this.route) return false;
            const beginIndex = this.prevLength - 1;
            const length = this.route.getLength() - beginIndex - 1;
            const posIndex = Math.floor(length * step);
            const offset = (length * step - posIndex);
            for (let i = 0; i < this.bone.getLength(); i ++) {
                const id = beginIndex - i + posIndex;
                const b = this.bone.at(i);
                const l = this.route.at(id);
                const nl = this.route.at(id + 1);
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
        public getStep(): number {
            return this.step;
        }
        public reverse(): void {
            this.bone.reverse();
        }
        public getCurrentLine(): ROUTES.Line {
            // console.log(this.bone);
            const line = new ROUTES.Line();
            const current = this.bone.clone();
            for (let i = 0; i < this.length; i ++) {
                line.push(current.at(i).clone());
            }
            return line.reverse();
        }
        public getHeadVecPos(): UTILS.VecPos {
            return this.bone.getHeadVecPos().add(Math.PI);
        }
        public getTailVecPos(): UTILS.VecPos {
            return this.bone.getTailVecPos().add(Math.PI);
        }
        public getRoute(): ROUTES.Line {
            return this.route;
        }
        public getLength(): number {
            return this.prevLength;
        }
        public getCurrentLength(): number {
            return this.length;
        }
    }
}
