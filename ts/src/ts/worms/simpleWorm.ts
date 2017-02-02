import {Pos} from '../utils';
import Worm from './worm';
export default class SimpleWorm extends Worm{
    private thickness:number;
    constructor(length:number, thickness:number){
        super(length);
        this.thickness = thickness;
    }
    public render(){
        this.clear();
        this.renderWith(0xffffff, this.thickness);
        this.renderWith(0x000000, this.thickness*0.7);
    }
    private renderWith(color:number, thickness:number):void{
        const bbone = this.bone.at(0);
        const ebone = this.bone.at(this.bone.getLength() - 1);
        this.beginFill(color);
        this.drawCircle(bbone.x, bbone.y, thickness / 2);
        this.endFill();
        this.lineStyle(thickness, color);
        this.moveTo(bbone.x, bbone.y);
        for(let i = 1; i < this.bone.getLength()  - 1; i ++){
            const nbone = this.bone.at(i);
            this.lineTo(nbone.x, nbone.y);
        }
        this.lineTo(ebone.x, ebone.y);
        this.lineStyle();
        this.beginFill(color);
        this.drawCircle(ebone.x, ebone.y, thickness / 2);
        this.endFill();
    }
}