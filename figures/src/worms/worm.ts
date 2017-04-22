namespace WF {
    export class HoldableWorm<T extends WF.Holder> extends WORMS.Base {
        public holder: T;
        public prevHolder: T;
        constructor(length: number) {
            super(length);
        }
        public dispose(): void {
            this.holder = null;
            this.prevHolder = null;
        }
        public setHolder(holder: T, def: boolean = false): void {
            if (def) this.holder = holder;
            this.prevHolder = this.holder;
            this.holder = holder;
        }
    }
}