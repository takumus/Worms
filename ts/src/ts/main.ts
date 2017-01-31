import {Pos, VecPos, Circle} from './utils';
import {Route, RouteGenerator, Line} from './routes/';
import {Worm} from './worms/';
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

	for(let i = 0; i < 1; i ++){
		const w:Worm = new Worm(100, 120);
		stage.addChild(w);
	const t = new TWEEN.Tween({s:0}).to({s:1}, 1000)
		.onUpdate(function(){
			w.setStep(this.s);
			w.render();
		}).easing(TWEEN.Easing.Sinusoidal.InOut).onStart(()=>{
			const pos = new VecPos(
				stageWidth*Math.random(),
				stageHeight*Math.random(),
				Math.PI*2*Math.random()
			);
			w.reverse();
			const r = RouteGenerator.getMinimumRoute(
				w.getHeadVecPos(),
				pos,
				200*Math.random()+200,
				200*Math.random()+200,
				10
			);
			r.wave(50*Math.random()+20, 0.1*Math.random());
			w.setRoute(w.getCurrentLine().pushLine(r));
		}).delay(0).onComplete(function(){
			this.s = 0;
			t.start();
		});
		t.start();
	}
}
let ppos = 0;
const draw = ()=> {
	requestAnimationFrame(draw);
	TWEEN.update();
	renderer.render(stage);

	//stage.x = -w.getCurrentLine().getTailVecPos().pos.x + stageWidth/2;
	//stage.y = -w.getCurrentLine().getTailVecPos().pos.y + stageHeight/2;
}
const resize = ()=> {
	const width:number = canvas.offsetWidth*dpr;
	const height:number = canvas.offsetHeight*dpr;
	stageWidth = width;
	stageHeight = height;
	renderer.resize(width, height);
}

window.onload = init;