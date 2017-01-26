import Matthew from './matthew';
class Pos {
    public x:number = 0;
    public y:number = 0;

    constructor(x:number = 0, y:number = 0) {
        this.x = x;
        this.y = y;
    }
    public clone():Pos{
        return new Pos(this.x, this.y);
    }
}
class VecPos {
    public pos:Pos;
    public r:number = 0;

    constructor(x:number = 0, y:number = 0, r:number = 0) {
        this.pos = new Pos(x, y);
        this.r = r;
    }
    public clone():VecPos{
        return new VecPos(this.pos.x, this.pos.y, this.r);
    }
}
class Circle {
    public pos:Pos;
    public r:number;
    public d:number;
    public tr:number;
    
    constructor(x:number, y:number, r:number, d:number, tr:number) {
        this.pos = new Pos(x, y);
        this.r = r;
        this.d = d;
        this.tr = Matthew.normalize(tr);
    }
}
export{
    Pos,
    VecPos,
    Circle
}