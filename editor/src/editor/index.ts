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
    private shift:boolean;
    constructor(){
        super();
        this.mouse = new UTILS.Pos();
        this.drawerCanvas = new PIXI.Graphics();
        this.lineCanvas = new PIXI.Graphics();
        this.editingLineCanvas = new PIXI.Graphics();
        this.wormsContainer = new PIXI.Container();
        this.addChild(this.wormsContainer);
        this.addChild(this.drawerCanvas);
        //this.addChild(this.lineCanvas);
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
            if(e.keyCode == 17 || e.keyCode == 18){
                this.next();
            }else if(e.keyCode == 13){
                console.log(JSON.stringify(this.lines));
                let maxX = Number.MIN_VALUE;
                let minX = Number.MAX_VALUE;
                let maxY = Number.MIN_VALUE;
                let minY = Number.MAX_VALUE;
                for (let i = 0; i < this.lines.length; i ++) {
                    const line = this.lines[i];
                    for (let ii = 0; ii < line.getLength(); ii ++) {
                        if (minX > line.at(ii).x) minX = line.at(ii).x;
                        if (minY > line.at(ii).y) minY = line.at(ii).y;
                        if (maxX < line.at(ii).x) maxX = line.at(ii).x;
                        if (maxY < line.at(ii).y) maxY = line.at(ii).y;
                    }
                }
                let width = maxX - minX;
                let height = maxY - minY;
                for (let i = 0; i < this.lines.length; i ++) {
                    const line = this.lines[i];
                    for (let ii = 0; ii < line.getLength(); ii ++) {
                        line.at(ii).x -= minX + width / 2;
                        line.at(ii).y -= minY + height / 2;
                        line.at(ii).round(2);
                    }
                }
                for (let i = 0; i < this.lines.length; i ++) {
                    const line = this.lines[i];
                    console.log(line.toString());
                }
            }else if(e.keyCode == 27){
                this.end();
            }else if(e.keyCode == 16){
                this.shift = true;
            }
            //console.log(e.keyCode);
        });
        window.addEventListener("keyup", (e)=>{
            if(e.keyCode == 16){
                this.shift = false;
            }
            //console.log(e.keyCode);
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
            const wormLength = this.editingLine.getLength()-1;
            /*
            const w = new WORMS.Nasty(
                wormLength,
                {
                    headLength:0.5,
                    tailLength:0.5,
                    thickness:5,
                    borderThickness:0,
                    borderColor:0x000000,
                    fillColor:0x000000

                }
            );*/
            const w = new WORMS.Simple(wormLength, {
                thickness: 2,
                borderColor:0,
                borderThickness:0,
                fillColor: 0xff0000
            });
            w.setRoute(this.editingLine);
            w.setStep(0);
            w.render();
            this.wormsContainer.addChild(w.graphics);
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
        this.update();
    }
    public update():void{
        if(!this.pressing) return;
        this.drawerCanvas.clear();
        this.drawerCanvas.lineStyle(1, this.DRAWER_COLOR);

        let dx = this.mouse.x - this.prevPos.x;
        let dy = this.mouse.y - this.prevPos.y;
        if(this.shift){
            if(dy*dy < dx*dx) {
                dx = dx > 0?1:-1;
                dy = 0;
            }else{
                dx = 0;
                dy = dy > 0?1:-1;
            }
        }
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