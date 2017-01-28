import {Pos, VecPos, Circle} from './utils';
import {Route, RouteGenerator, Line} from './routes/';
import {Worm} from './worms/';
let renderer:PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage:PIXI.Container = new PIXI.Container();
let canvas:HTMLCanvasElement;
let stageWidth:number = 0, stageHeight:number = 0;
const g:PIXI.Graphics = new PIXI.Graphics();
const mouse:Pos = new Pos(0, 0);
const w = new Worm(190, 80);
const w2 = new Worm(100, 40);
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
	//RouteGenerator.graphics = g;
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
	const r1to2 = RouteGenerator.getMinimumRoute(
		pos1,
		pos2,
		200,
		500,
		5
	);

	stage.addChild(w);
	stage.addChild(w2);
	w.setRoute(r1to2.clone().wave(20, 0.08));
	w2.setRoute(r1to2.clone().wave(20, 0.08));
	new TWEEN.Tween({s:0}).to({s:1}, 1000)
	.onUpdate(function(){
		w.setStep(this.s);
		w.render();
		w2.setStep(this.s);
		w2.render();
	}).easing(TWEEN.Easing.Sinusoidal.InOut).onComplete(()=>{
		const t = new TWEEN.Tween({s:0}).to({s:1}, 2000)
		.onUpdate(function(){
			w.setStep(this.s);
			w.render();
			w2.setStep(this.s);
			w2.render();
		}).easing(TWEEN.Easing.Sinusoidal.InOut).onStart(()=>{
			const pos = new VecPos(
				stageWidth/4+stageWidth/2*Math.random(),
				stageHeight/4+stageHeight/2*Math.random(),
				Math.PI*2*Math.random()
			);
			w.reverse();
			const r = RouteGenerator.getMinimumRoute(
				w.getHeadVecPos(),
				pos,
				500*Math.random()+200,
				500*Math.random()+200,
				5
			);
			r.wave(80*Math.random(), 0.1*Math.random());
			w.setRoute(w.getCurrentLine().pushLine(r));
			let pos2 = new VecPos(
				stageWidth/4+stageWidth/2*Math.random(),
				stageHeight/4+stageHeight/2*Math.random(),
				Math.PI*2*Math.random()
			);
			if(Math.random()<2){
				pos2 = pos.clone();
				pos2.add(Math.PI);
			}
			w2.reverse();
			const r2 = RouteGenerator.getMinimumRoute(
				w2.getHeadVecPos(),
				pos2,
				500*Math.random()+200,
				500*Math.random()+200,
				5
			);
			r2.wave(80*Math.random(), 0.1*Math.random());
			w2.setRoute(w2.getCurrentLine().pushLine(r2));
		}).onComplete(function(){
			g.clear();
			g.lineStyle(2, 0x666666);
			this.s = 0;
			t.start();
		});
		t.start();
	}).start();
}
let ppos = 0;
const draw = ()=> {
	requestAnimationFrame(draw);
	renderer.render(stage);
	TWEEN.update();
	//stage.x = -w.getCurrentLine().getTailVecPos().pos.x + stageWidth/2;
	//stage.y = -w.getCurrentLine().getTailVecPos().pos.y + stageHeight/2;
}
const resize = ()=> {
	const width:number = canvas.offsetWidth*2;
	const height:number = canvas.offsetHeight*2;
	stageWidth = width;
	stageHeight = height;
	renderer.resize(width, height);
}

window.onload = init;