namespace WORMS{
    export class Base extends PIXI.Graphics{
        protected bone:ROUTES.Line;
        protected length:number;
        private route:ROUTES.Line;
        private step:number = 0;
        constructor(length:number){
            super();
            this.bone = new ROUTES.Line();
            this.setLength(length);
        }
        public setLength(length:number){
            this.length = Math.floor(length);
            this.bone.clear();
            for(let i = 0; i < length; i ++){
                this.bone.push(new UTILS.Pos());
            }
            //re set bones
            this.setStep(this.step);
        }
        public push(x:number, y:number){
            //先頭に加えて、１つずつずらす。
            let i = this.bone.getLength()-1;
            for(; i >= 1; i --){
                this.bone.at(i).x = this.bone.at(i-1).x;
                this.bone.at(i).y = this.bone.at(i-1).y;
            }
            const bbone = this.bone.at(0);
            bbone.x = x;
            bbone.y = y;
        }
        public render(){
        }
        public addRouteFromCurrent(line:ROUTES.Line){
            this.setRoute(
                this.getCurrentLine().pushLine(line)
            );
        }
        public setRoute(line:ROUTES.Line){
            if(line.getLength() < this.length) return;
            this.route = line;
        }
        public addStep(step:number):boolean{
            const length = this.route.getLength() - this.length;
            const p = step / length;
            if(p < 0) {
                this.setStep(1);
                return false;
            }
            return this.setStep(this.step + p);
        }
        public setStep(step:number):boolean{
            if(step < 0) step = 0;
            if(step > 1) step = 1;
            this.step = step;
            if(!this.route) return false;
            const beginIndex = this.length;
            const length = this.route.getLength() - beginIndex - 1;
            const posIndex = Math.floor(length * step);
            const offset = (length * step - posIndex);
            for(let i = 0; i < this.bone.getLength(); i ++){
                const id = beginIndex-i + posIndex;
                const b = this.bone.at(i);
                const l = this.route.at(id);
                const nl = this.route.at(id+1);
                if(!l) continue;
                let dx = 0;
                let dy = 0;
                if(nl){
                    dx = (nl.x - l.x) * offset;
                    dy = (nl.y - l.y) * offset;
                }
                b.x = l.x + dx;
                b.y = l.y + dy;
            }
            return true;
        }
        public getStep():number{
            return this.step;
        }
        public reverse():void{
            this.bone.reverse();
        }
        public getCurrentLine():ROUTES.Line{
            //console.log(this.bone);
            return this.bone.clone().reverse();
        }
        public getHeadVecPos():UTILS.VecPos{
            return this.bone.getHeadVecPos().add(Math.PI);
        }
        public getTailVecPos():UTILS.VecPos{
            return this.bone.getTailVecPos().add(Math.PI);
        }
        public getRoute():ROUTES.Line{
            return this.route;
        }
    }
}
