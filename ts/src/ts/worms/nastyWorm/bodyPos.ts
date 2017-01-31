import {Pos} from '../../utils';
export default class BodyPos{
    public left:Pos;
    public right:Pos;
    constructor(){
        this.left = new Pos();
        this.right = new Pos();
    }
}