namespace WF {
    export interface WaveOption {
        enabled: boolean,
        amplitude: number,
        frequency: number
    }
    export interface RadiusOption {
        begin: number,
        end: number
    }
    export interface TransformOption {
        resolution: number,
        radius: number | RadiusOption,
        wave?: WaveOption
    }
    export class HolderMaster {
        private _holders: Holder[];
        private step: number;
        private animating: boolean;
        private autoTweening: boolean;
        public get holders(): Holder[] {return this._holders};
        public transformMe(me: Holder[] | Holder, option: TransformOption): boolean {
            return this.transform(me, me, option);
        }
        public transform(fromHolders: Holder[] | Holder, toHolders: Holder[] | Holder, option: TransformOption): boolean {
            if (this.animating) {
                console.error('Cannnot call "HolderMaster.prototype.transform" while animating');
                return false;
            }
            const from = Array.isArray(fromHolders) ? fromHolders : [fromHolders];
            const to = Array.isArray(toHolders) ? toHolders : [toHolders];
            option.wave = UTILS.def<WaveOption>(option.wave, {enabled: false, amplitude: 0, frequency: 0});
            if (typeof option.radius == 'number') {
                option.radius = {begin: option.radius, end: option.radius};
            }
            let animatingHolders = false;
            from.forEach((holder) => {if (holder.animating) animatingHolders = true});
            to.forEach((holder) => {if (holder.animating) animatingHolders = true});
            if (animatingHolders) {
                console.error('Cannnot call "HolderMaster.prototype.transform" while Holder[] is animating');
                return false;
            }
            this._holders = to;
            this.step = 0;
            const worms: HoldableWorm[] = [];
            from.forEach((holder) => {
                holder.worms.forEach((worm) => {
                    worms.push(worm);
                });
                holder.clear();
            });
            // create init worms
            if (worms.length == 0) {
                to.forEach((holder) => {
                    holder.generate();
                });
                return true;
            }
            let lineCount = 0;
            to.forEach((holder) => lineCount += holder.figure.length);
            // create if need more worms
            if (worms.length < lineCount) {
                const prevWorms = worms.concat();
                const prevWormsLength = prevWorms.length;
                for (let i = prevWormsLength; i <= lineCount; i ++) {
                    const pw = prevWorms[Math.floor(Math.random() * prevWormsLength)];
                    const w = createWorm(pw.currentLength, pw.holder);
                    w.setRoute(pw.getCurrentLine());
                    worms.push(w);
                }
            }
            // shuffle
            UTILS.shuffle(worms);
            UTILS.shuffle(to);
            // generate route to figures
            to.forEach((holder) => {
                for (let i = 0; i < holder.figure.length; i ++) {
                    const line = holder.figure[i];
                    const worm = worms.pop();
                    worm.setHolder(holder);
                    this.setRoute(worm, line, option);
                    holder.worms.push(worm);
                }
                holder.animating = true;
            });
            worms.forEach((worm) => {
                const holder = to[Math.floor(Math.random() * to.length)];
                const figure = holder.figure;
                const target = figure[Math.floor(Math.random() * figure.length)];
                worm.setHolder(holder);
                this.setRoute(worm, target, option);
                holder.worms.push(worm);
            });
            this.animating = true;
            return true;
        }
        private setRoute(worm: HoldableWorm, target: ROUTES.Line, option: TransformOption): void {
            target = target.clone();
            if (Math.random() < 0.5) worm.reverse();
            if (Math.random() < 0.5) target.reverse();
            const route = ROUTES.RouteGenerator.getMinimumRoute(
                worm.getHeadVecPos(),
                target.getHeadVecPos(),
                (<RadiusOption>option.radius).begin,
                (<RadiusOption>option.radius).end,
                option.resolution
            );
            if (option.wave.enabled) route.wave(option.wave.amplitude, option.wave.frequency);
            worm.setRoute(
                worm.getCurrentLine()
                    .pushLine(route)
                    .pushLine(target),
                target.length
            );
        }
        public endMovement(): void {
            if (!this.animating) {
                console.error('Cannnot call "HolderMaster.prototype.endMovement" after completed animation');
                return;
            }
            this._holders.forEach((holder) => {
                if (this.step == 1) {
                    // completely complete
                    const removedWorms = holder.worms.splice(holder.figure.length);
                    // holder.setStepToAll(1);
                    holder.worms.forEach((worm) => worm.updateLength());
                    removedWorms.forEach((worm) => worm.dispose());
                    // console.log('completely complete!!');
                }else {
                    // force complete
                    holder.worms.forEach((worm) => worm.updateLength());
                    // console.log('force complete!!');
                }
                holder.animating = false;
            });
            this.autoTweening = false;
            this.animating = false;
            console.log('all worms:' + WF.FigureWorm.getWorms().length);
        }
        public autoTween(time: number, delay: number, complete?: () => void): void {
            if (!this.animating) {
                // console.error('Cannnot call "HolderMaster.prototype.autoTween" while not animating');
                return;
            }
            if (this.autoTweening) {
                console.error('Cannnot call "HolderMaster.prototype.autoTween" while autoTweening');
                return;
            }
            this.autoTweening = true;
            const props = {s: 0};
            // move worms
            new TWEEN.Tween(props)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({s: 1}, time)
            .onUpdate(() => {
                this.setStep(props.s);
            })
            .onComplete(() => {
                this.endMovement();
                if (complete) complete();
            })
            .delay(delay)
            .start();
        }
        public setStep(step: number): void {
            if (!this.animating) {
                console.error('Cannnot call "HolderMaster.prototype.setStep" after completed animation');
                return;
            }
            this.step = step;
            this._holders.forEach((holder) => {
                if (!holder.animating) {
                    console.error('already ended');
                    return;
                }
                holder.setStepToAll(step);
            });
        }
    }
}