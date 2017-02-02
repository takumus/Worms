import {Pos} from '../utils';
import Worm from './worm';
export default class SimpleWorm extends Worm{
    private thickness:number;
    constructor(length:number, thickness:number){
        super(length);
        this.thickness = thickness;
    }
    public render(){
        const bbone = this.bone.at(0);
        const ebone = this.bone.at(this.bone.getLength() - 1);
        this.clear();
        this.beginFill(0xffffff);
        this.drawCircle(bbone.x, bbone.y, this.thickness / 2);
        this.endFill();
        this.lineStyle(this.thickness, 0xffffff);
        this.moveTo(bbone.x, bbone.y);
        for(let i = 1; i < this.bone.getLength()  - 1; i ++){
            const nbone = this.bone.at(i);
            this.lineTo(nbone.x, nbone.y);
        }
        this.lineTo(ebone.x, ebone.y);
        this.lineStyle();
        this.beginFill(0xffffff);
        this.drawCircle(ebone.x, ebone.y, this.thickness / 2);
        this.endFill();
    }
}