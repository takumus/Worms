import {Pos} from '../utils';
import {Line} from '../routes/';
export default class Editor extends PIXI.Container{
    private mouse:Pos;
    private drawerCanvas:PIXI.Graphics;
    private lineCanvas:PIXI.Container;
    private dpr:number;
    private res:number = 20;
    private nextPos:Pos;
    private prevPos:Pos;
    private pressing:boolean;
    private editingLine:Line;
    private lines:Array<Line> = [];
    constructor(dpr:number){
        super();
        this.dpr = dpr;
        this.mouse = new Pos();
        this.drawerCanvas = new PIXI.Graphics();
        this.lineCanvas = new PIXI.Container();
        this.addChild(this.drawerCanvas);
        this.addChild(this.lineCanvas);
        this.initMouse();
        this.nextPos = new Pos();
        this.prevPos = new Pos();
    }

    private initMouse():void{
        window.addEventListener("mousedown", (e)=>{
            this.mouse.x = e.clientX * this.dpr;
            this.mouse.y = e.clientY * this.dpr;
            this.begin(this.mouse.x, this.mouse.y);
        });
        window.addEventListener("mousemove", (e)=>{
            this.mouse.x = e.clientX * this.dpr;
            this.mouse.y = e.clientY * this.dpr;
            this.move(this.mouse.x, this.mouse.y);
        });
        window.addEventListener("mouseup", (e)=>{
            //this.end();
        });
        window.addEventListener("keydown", (e)=>{
            if(e.keyCode == 17){
                this.next();
            }else if(e.keyCode == 13){
                this.end();
            }
        });
    }
    private begin(x:number, y:number):void{
        this.prevPos.x = x;
        this.prevPos.y = y;
        this.pressing = true;
        this.move(x, y);
        this.editingLine = new Line();
        this.editingLine.push(this.prevPos.clone());
    }
    private move(x:number, y:number):void{
        
    }
    private end():void{
        this.pressing = false;
    }
    private next():void{

        this.prevPos.x = this.nextPos.x;
        this.prevPos.y = this.nextPos.y;
    }
    public update():void{
        this.drawerCanvas.clear();
        this.drawerCanvas.lineStyle(1, 0xffffff);
        this.drawerCanvas.drawCircle(this.prevPos.x, this.prevPos.y, 5);

        let dx = this.mouse.x - this.prevPos.x;
        let dy = this.mouse.y - this.prevPos.y;
        let d = Math.sqrt(dx*dx + dy*dy);
        dx /= d;
        dy /= d;
        dx *= this.res;
        dy *= this.res;
        this.nextPos.x = this.prevPos.x + dx;
        this.nextPos.y = this.prevPos.y + dy;
        this.drawerCanvas.drawCircle(this.nextPos.x, this.nextPos.y, 5);

        this.drawerCanvas.moveTo(this.prevPos.x, this.prevPos.y);
        this.drawerCanvas.lineTo(this.mouse.x, this.mouse.y);
    }
}