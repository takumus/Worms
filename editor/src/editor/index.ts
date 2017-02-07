export default class Editor extends PIXI.Container{
    private mouse:UTILS.Pos;
    private drawerCanvas:PIXI.Graphics;
    private lineCanvas:PIXI.Graphics;
    private editingLineCanvas:PIXI.Graphics;
    private dpr:number;
    private res:number = 20;
    private nextPos:UTILS.Pos;
    private prevPos:UTILS.Pos;
    private pressing:boolean;
    private editingLine:ROUTES.Line;
    private lines:Array<ROUTES.Line> = [];
    constructor(dpr:number){
        super();
        this.dpr = dpr;
        this.mouse = new UTILS.Pos();
        this.drawerCanvas = new PIXI.Graphics();
        this.lineCanvas = new PIXI.Graphics();
        this.editingLineCanvas = new PIXI.Graphics();
        this.addChild(this.drawerCanvas);
        this.addChild(this.lineCanvas);
        this.addChild(this.editingLineCanvas);
        this.initMouse();
        this.nextPos = new UTILS.Pos();
        this.prevPos = new UTILS.Pos();
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
        });
        window.addEventListener("mouseup", (e)=>{
            //this.end();
        });
        window.addEventListener("keydown", (e)=>{
            if(e.keyCode == 17){
                this.next();
            }else if(e.keyCode == 13){
                console.log(JSON.stringify(this.lines));
            }else if(e.keyCode == 27){
                this.end();
            }
        });
    }
    private begin(x:number, y:number):void{
        if(this.pressing) return;
        this.prevPos.x = x;
        this.prevPos.y = y;
        this.pressing = true;
        this.editingLine = new ROUTES.Line();
        this.prevPos.round(2);
        this.editingLine.push(this.prevPos.clone());
    }
    private end():void{
        if(!this.pressing) return;
        this.pressing = false;
        this.drawerCanvas.clear();
        this.editingLineCanvas.clear();
        this.lineCanvas.lineStyle(3, 0x999999);
        if(this.editingLine && this.editingLine.getLength() > 1){
            for(let ii = 0; ii < this.editingLine.getLength(); ii ++){
                const p = this.editingLine.at(ii);
                if(ii == 0){
                    this.lineCanvas.moveTo(p.x, p.y);
                }else{
                    this.lineCanvas.lineTo(p.x, p.y);
                }
            }
            this.lines.push(this.editingLine.clone());
        }
        this.editingLine = null;
    }
    private next():void{
        if(!this.pressing) return;
        this.editingLineCanvas.lineStyle(2, 0xffffff);
        this.nextPos.round(2);
        this.editingLineCanvas.moveTo(this.prevPos.x, this.prevPos.y);
        this.editingLineCanvas.lineTo(this.nextPos.x, this.nextPos.y);
        this.prevPos.x = this.nextPos.x;
        this.prevPos.y = this.nextPos.y;
        this.editingLine.push(this.nextPos.clone());
    }
    public update():void{
        if(!this.pressing) return;
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