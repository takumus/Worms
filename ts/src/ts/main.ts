import {Pos, VecPos, Circle} from './utils';
import {Route, RouteGenerator, Line} from './routes/';
import {Worm} from './worms/';
let renderer:PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage:PIXI.Container = new PIXI.Container();
let canvas:HTMLCanvasElement;
let stageWidth:number = 0, stageHeight:number = 0;
const g:PIXI.Graphics = new PIXI.Graphics();
const mouse:Pos = new Pos(0, 0);
const w = new Worm(190, 60);
const w2 = new Worm(190, 60);
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
	stage.addChild(g);
	window.addEventListener("mousemove", (e)=>{
		mouse.x = e.clientX*2;
		mouse.y = e.clientY*2;
	});
	RouteGenerator.graphics = g;
	g.lineStyle(2, 0x666666);
	draw();
	resize();


	const pos1 = new VecPos(
		200*2,
		200*2,
		Math.PI
	);
	const pos2 = new VecPos(
		900*2,
		600*2,
		Math.PI
	);
	const pos3 = new VecPos(
		400*2,
		1200*2,
		-Math.PI/2
	);
	const r1to2 = RouteGenerator.getMinimumRoute(
		pos1,
		pos2,
		200,
		500,
		5
	);

	stage.addChild(w);
	stage.addChild(w2);
	w.setRoute(r1to2);
	new TWEEN.Tween({s:0}).to({s:1}, 4000)
	.easing(TWEEN.Easing.Cubic.InOut)
	.onUpdate(function(){
		w.setStep(this.s);
		w.render();
	}).easing(TWEEN.Easing.Cubic.InOut).onComplete(()=>{
		const r = RouteGenerator.getMinimumRoute(
			w.getCurrentLine().getTailVecPos().add(Math.PI),
			pos3,
			600,
			200,
			5
		);
		w.setRoute(w.getCurrentLine().pushLine(r));
		new TWEEN.Tween({s:0}).to({s:1}, 1000)
		.easing(TWEEN.Easing.Quartic.InOut)
		.onUpdate(function(){
			w.setStep(this.s);
			w.render();
		}).easing(TWEEN.Easing.Quartic.InOut).start();
	}).start();
}
let ppos = 0;
const draw = ()=> {
	requestAnimationFrame(draw);
	renderer.render(stage);
	TWEEN.update();
}
const resize = ()=> {
	const width:number = canvas.offsetWidth*2;
	const height:number = canvas.offsetHeight*2;
	stageWidth = width;
	stageHeight = height;
	renderer.resize(width, height);
}

window.onload = init;