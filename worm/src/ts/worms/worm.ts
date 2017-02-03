import {Pos, VecPos, Circle} from '../routes/utils';
import {Line} from '../routes/';
export default class Worm extends PIXI.Graphics{
    protected bone:Line;
    protected length:number;
    private line:Line;
    private routeIndex:number;
    private step:number;
    constructor(length:number){
        super();
        this.length = Math.floor(length);
        this.bone = new Line();
        for(let i = 0; i < length; i ++){
            this.bone.push(new Pos());
        }
        this.routeIndex = 0;
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
    public addRouteFromCurrent(line:Line){
        this.setRoute(
            this.getCurrentLine().pushLine(line)
        );
    }
    public setRoute(line:Line){
        if(line.getLength() < this.length) return;
        this.line = line;
    }
    public addStep(step:number):boolean{
        const p = 1 / this.line.getLength() * step;
        return this.setStep(this.step + p);
    }
    public setStep(step:number):boolean{
        if(step < 0) step = 0;
        if(step > 1) step = 1;
        this.step = step;
        if(!this.line) return false;
        const beginIndex = this.length - 1;
        const length = this.line.getLength() - beginIndex - 1;
        const posIndex = Math.floor(length * step);
        const offset = (length * step - posIndex);
        for(let i = 0; i < this.bone.getLength(); i ++){
            const id = beginIndex-i + posIndex;
            const b = this.bone.at(i);
            const l = this.line.at(id);
            const nl = this.line.at(id+1);
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
    public getCurrentLine():Line{
        //console.log(this.bone);
        return this.bone.clone().reverse();
    }
    public getHeadVecPos():VecPos{
        return this.bone.getHeadVecPos().add(Math.PI);
    }
    public getTailVecPos():VecPos{
        return this.bone.getTailVecPos().add(Math.PI);
    }
}