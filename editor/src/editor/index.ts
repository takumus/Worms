export default class Editor extends PIXI.Container{
    private mouse:UTILS.Pos;
    private drawerCanvas:PIXI.Graphics;
    private lineCanvas:PIXI.Graphics;
    private editingLineCanvas:PIXI.Graphics;
    private wormsContainer:PIXI.Container;
    private res:number = 5;
    private nextPos:UTILS.Pos;
    private prevPos:UTILS.Pos;
    private pressing:boolean;
    private editingLine:ROUTES.Line;
    private lines:Array<ROUTES.Line> = [];
    private LINE_COLOR:number = 0x0000ff;
    private EDITING_LINE_COLOR:number = 0xff0000;
    private DRAWER_COLOR:number = 0x00ff00;
    private DRAWER_CIRCLE_COLOR:number = 0x0000ff;
    constructor(){
        super();
        this.mouse = new UTILS.Pos();
        this.drawerCanvas = new PIXI.Graphics();
        this.lineCanvas = new PIXI.Graphics();
        this.editingLineCanvas = new PIXI.Graphics();
        this.wormsContainer = new PIXI.Container();
        this.addChild(this.wormsContainer);
        this.addChild(this.drawerCanvas);
        this.addChild(this.lineCanvas);
        this.addChild(this.editingLineCanvas);
        this.initMouse();
        this.nextPos = new UTILS.Pos();
        this.prevPos = new UTILS.Pos();
    }

    private initMouse():void{
        window.addEventListener("mousedown", (e)=>{
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.begin(this.mouse.x, this.mouse.y);
        });
        window.addEventListener("mousemove", (e)=>{
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
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
        if(this.editingLine && this.editingLine.getLength() > 1){
            this.lineCanvas.lineStyle(1, this.LINE_COLOR);
            for(let ii = 0; ii < this.editingLine.getLength(); ii ++){
                const p = this.editingLine.at(ii);
                if(ii == 0){
                    this.lineCanvas.moveTo(p.x, p.y);
                }else{
                    this.lineCanvas.lineTo(p.x, p.y);
                }
            }
            this.lines.push(this.editingLine.clone());
            const w = new WORMS.Simple(this.editingLine.getLength(), 30, 0xffffff, 0x000000);
            w.setRoute(this.editingLine);
            w.setStep(0);
            w.render();
            this.wormsContainer.addChild(w);
        }
        //this.editingLine = null;
    }
    private next():void{
        if(!this.pressing) return;
        this.editingLineCanvas.lineStyle(2, this.EDITING_LINE_COLOR);
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
        this.drawerCanvas.lineStyle(1, this.DRAWER_COLOR);

        const dx = this.mouse.x - this.prevPos.x;
        const dy = this.mouse.y - this.prevPos.y;
        let d = Math.sqrt(dx*dx + dy*dy);
        this.nextPos.x = this.prevPos.x + dx / d * this.res;
        this.nextPos.y = this.prevPos.y + dy / d * this.res;

        this.drawerCanvas.moveTo(this.prevPos.x - dx, this.prevPos.y - dy);
        this.drawerCanvas.lineTo(this.mouse.x, this.mouse.y);

        this.drawerCanvas.lineStyle(1, this.DRAWER_CIRCLE_COLOR);
        this.drawerCanvas.drawCircle(this.prevPos.x, this.prevPos.y, 1);
        this.drawerCanvas.drawCircle(this.nextPos.x, this.nextPos.y, 1);
    }
}