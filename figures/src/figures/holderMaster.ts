namespace WF {
    export class HolderMaster {
        private holders: Holder[];
        private step: number;
        private animating: boolean;
        private autoTweening: boolean;
        public transformMe(me: Holder[]): boolean {
            return this.transform(me, me);
        }
        public transform(from: Holder[], to: Holder[]): boolean {
            if (this.animating) {
                console.error('Cannnot call "HolderMaster.prototype.transform" while animating');
                return false;
            }
            let animatingHolders = false;
            from.forEach((holder) => {if (holder.animating) animatingHolders = true});
            to.forEach((holder) => {if (holder.animating) animatingHolders = true});
            if (animatingHolders) {
                console.error('Cannnot call "HolderMaster.prototype.transform" while Holder[] is animating');
                return false;
            }
            this.holders = to;
            this.step = 0;
            const worms: WF.FigureWorm[] = [];
            from.forEach((holder) => {
                holder.worms.forEach((worm) => {
                    worms.push(worm);
                });
                holder.worms = [];
            });
            // create init worms
            if (worms.length == 0) {
                to.forEach((holder) => {
                    holder.generate();
                });
                return true;
            }
            let lineCount = 0;
            to.forEach((holder) => lineCount += holder.figure.getLength());
            // create if need more worms
            if (worms.length < lineCount) {
                const prevWorms = worms.concat();
                const prevWormsLength = prevWorms.length;
                for (let i = prevWormsLength; i <= lineCount; i ++) {
                    const pw = prevWorms[Math.floor(Math.random() * prevWormsLength)];
                    const w = new WF.FigureWorm(pw.getLength(), {thickness: 26});
                    w.setRoute(pw.getCurrentLine());
                    worms.push(w);
                }
            }
            // shuffle
            UTILS.shuffle<WF.FigureWorm>(worms);
            UTILS.shuffle<Holder>(to);
            // generate route to figures
            to.forEach((holder) => {
                for (let i = 0; i < holder.figure.getLength(); i ++) {
                    const line = holder.figure.at(i);
                    const worm = worms.pop();
                    this.setRoute(worm, line);
                    holder.worms.push(worm);
                }
                holder.animating = true;
            });
            worms.forEach((worm) => {
                const holder = to[Math.floor(Math.random() * to.length)];
                const figure = holder.figure;
                const target = figure.at(Math.floor(Math.random() * figure.getLength()));
                this.setRoute(worm, target);
                holder.worms.push(worm);
            });
            this.animating = true;
            return true;
        }
        private setRoute(worm: WF.FigureWorm, target: ROUTES.Line): void {
            target = target.clone();
            if (Math.random() < 0.5) worm.reverse();
            if (Math.random() < 0.5) target.reverse();
            const route = ROUTES.RouteGenerator.getMinimumRoute(
                worm.getHeadVecPos(),
                target.getHeadVecPos(),
                80, 80, 5
            );
            route.wave(10, 0.08);
            worm.setRoute(
                worm.getCurrentLine()
                    .pushLine(route)
                    .pushLine(target),
                target.getLength()
            );
        }
        public endMovement(): void {
            if (!this.animating) {
                console.error('Cannnot call "HolderMaster.prototype.endMovement" after completed animation');
                return;
            }
            this.holders.forEach((holder) => {
                if (this.step == 1) {
                    // completely complete
                    const removedWorms = holder.worms.splice(holder.figure.getLength());
                    holder.worms.forEach((worm) => {
                        worm.setStep(1);
                        worm.updateLength();
                    });
                    removedWorms.forEach((worm) => {
                        worm.dispose();
                    });
                    // console.log('completely complete!!');
                }else {
                    // force complete
                    holder.worms.forEach((worm) => {
                        worm.updateLength();
                    });
                    // console.log('force complete!!');
                }
                holder.animating = false;
            });
            this.autoTweening = false;
            this.animating = false;
            console.log('all worms:' + WF.FigureWorm.getWorms().length);
        }
        public autoTween(time: number, complete?: () => void): void {
            if (!this.animating) {
                console.error('Cannnot call "HolderMaster.prototype.autoTween" while not animating');
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
            .start();
        }
        public setStep(step: number): void {
            if (!this.animating) {
                console.error('Cannnot call "HolderMaster.prototype.setStep" after completed animation');
                return;
            }
            this.step = step;
            this.holders.forEach((holder) => {
                if (!holder.animating) {
                    console.error('already ended');
                    return;
                }
                holder.worms.forEach((worm) => {
                    worm.setStep(step);
                });
            });
        }
    }
}