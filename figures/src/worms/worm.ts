namespace WF {
    export let WormClass: typeof HoldableWorm;
    export class HoldableWorm extends WORMS.Base {
        public holder: WF.Holder;
        public prevHolder: WF.Holder;
        constructor(length: number) {
            super(length);
        }
        public dispose(): void {
            this.holder = null;
            this.prevHolder = null;
        }
        public setHolder(holder: Holder, def: boolean = false): void {
            if (def) this.holder = holder;
            this.prevHolder = this.holder;
            this.holder = holder;
        }
    }
    export interface SimpleLightOption {
        fillColor?: number,
        thickness: number
    }
    export function createWorm(length: number, holder: Holder): HoldableWorm {
        const worm = new WF.WormClass(length);
        worm.setHolder(holder, true);
        return worm;
    }
    export function setWormClass<T extends HoldableWorm>(wormClass: new (length: number) => T): void {
        WF.WormClass = wormClass;
    }
}