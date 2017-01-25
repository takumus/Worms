import {Pos, VecPos, Circle} from './routes/utils';
import {Route, RouteGenerator} from './routes/route';

let renderer:PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage:PIXI.Container = new PIXI.Container();
let canvas:HTMLCanvasElement;
let sw:number, sh:number;
const init = ()=> {
	renderer = PIXI.autoDetectRenderer(800, 800, {antialias: true});
	canvas = <HTMLCanvasElement>document.getElementById("content");
	canvas.appendChild(renderer.view);
	renderer.view.style.width = "100%";
	renderer.view.style.height = "100%";
	window.addEventListener("resize", resize);
	const shape:PIXI.Graphics = new PIXI.Graphics();
	shape.lineStyle(2, 0xffffff);
	shape.moveTo(0, 0);
	shape.lineTo(100, 100);
	shape.drawCircle(50, 50, 50);
	stage.addChild(shape);
	window.onresize = ()=>{
		resize();
	}
	draw();
	resize();
	stage.addChild(g);
	window.addEventListener("mousemove", (e)=>{
		mouse.x = e.clientX*2;
		mouse.y = e.clientY*2;
	});
}
const g:PIXI.Graphics = new PIXI.Graphics();
const rg:RouteGenerator = new RouteGenerator(g);
const mouse:Pos = new Pos();
const draw = ()=> {
	g.clear();
	g.lineStyle(2, 0xff0000);
	rg.getAllRoute(
		new VecPos(mouse.x , mouse.y, 0),
		new VecPos(250, 300, 0),
		50,
		50
	);
	renderer.render(stage);
	requestAnimationFrame(draw);
}
const resize = ()=> {
	const width:number = canvas.offsetWidth*2;
	const height:number = canvas.offsetHeight*2;
	sw = width;
	sh = height;
	renderer.resize(width, height);
}

window.onload = init;