import {Pos} from '../utils';
export default class Editor extends PIXI.Container{
    private mouse:Pos;
    private canvas:PIXI.Graphics;
    private dpr:number;
    constructor(dpr:number){
        super();
        this.dpr = dpr;
        this.mouse = new Pos();
        this.canvas = new PIXI.Graphics();
        this.addChild(this.canvas);
        this.initMouse();
    }

    private initMouse():void{
        window.addEventListener("mousedown", (e)=>{
            this.mouse.x = e.clientX * this.dpr;
            this.mouse.y = e.clientY * this.dpr;
        });
        window.addEventListener("mousemove", (e)=>{
            this.mouse.x = e.clientX * this.dpr;
            this.mouse.y = e.clientY * this.dpr;
        });
        window.addEventListener("mouseup", (e)=>{

        });
    }
    public update():void{
        this.canvas.clear();
        this.canvas.lineStyle(1, 0xffffff);
        this.canvas.drawCircle(this.mouse.x, this.mouse.y, 10);
    }
}