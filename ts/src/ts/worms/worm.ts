import {Pos, VecPos, Circle} from '../utils';
import {Line} from '../routes/';
import BodyPos from './bodyPos';
import WormBase from './wormBase';
export default class Worm extends WormBase{
    private line:Line;
    private routeIndex:number;
    constructor(length:number, thiskness:number){
        super(length, thiskness);
        this.routeIndex = 0;
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
        const beginIndex = this.length;
        const length = this.line.getLength() - beginIndex - 1;
        const posIndex = Math.floor(length * pos);
        for(let i = 0; i < this.bone.getLength(); i ++){
            const b = this.bone.at(i);
            const l = this.line.at(beginIndex-i + posIndex);
            if(!l) continue;
            b.x = l.x;
            b.y = l.y;
        }
    }
    public getCurrentLine():Line{
        //console.log(this.bone);
        return this.bone.clone().reverse();
    }
    public getHeadVecPos():VecPos{
        return this.bone.getHeadVecPos().clone().add(Math.PI);
    }
    public getTailVecPos():VecPos{
        return this.bone.getTailVecPos().clone().add(Math.PI);
    }
}