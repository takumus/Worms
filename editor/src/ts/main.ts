import {Pos} from './utils';
let renderer:PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage:PIXI.Container = new PIXI.Container();
let canvas:HTMLCanvasElement;
let stageWidth:number = 0, stageHeight:number = 0;
const mouse:Pos = new Pos(0, 0);
let dpr:number;
const init = ()=> {
	dpr = 2;//window.devicePixelRatio;
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
	window.addEventListener('resize', resize);
	window.addEventListener('orientationchange', resize);
	window.addEventListener("mousemove", (e)=>{
		mouse.x = e.clientX*dpr;
		mouse.y = e.clientY*dpr;
	});
	draw();
	resize();
}
let ppos = 0;
const draw = ()=> {
	requestAnimationFrame(draw);
	TWEEN.update();
	renderer.render(stage);
}
const resize = ()=> {
	const width:number = canvas.offsetWidth*dpr;
	const height:number = canvas.offsetHeight*dpr;
	stageWidth = width;
	stageHeight = height;
	renderer.resize(width, height);
}

window.onload = init;