import {Pos, VecPos, Circle} from '../utils';
import {Line} from '../routes/';
export default class Worm extends PIXI.Graphics{
    protected bone:Line;
    protected length:number;
    private line:Line;
    private routeIndex:number;
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
    public setStep(pos:number):void{
        if(!this.line) return;
        if(pos < 0) pos = 0;
        if(pos > 1) pos = 1;
        const beginIndex = this.length - 1;
        const length = this.line.getLength() - beginIndex - 1;
        const posIndex = Math.floor(length * pos);
        const offset = (length * pos - posIndex);
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