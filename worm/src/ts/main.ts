import {Pos, VecPos, Circle} from './utils';
import {Route, RouteGenerator, Line} from './routes/';
import Worm from './worms/worm';
import SimpleWorm from './worms/simpleWorm';
import NastyWorm from './worms/nastyWorm';
let renderer:PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage:PIXI.Container = new PIXI.Container();
let canvas:HTMLCanvasElement;
let stageWidth:number = 0, stageHeight:number = 0;
const targets:Array<Pos> = [];
let dpr:number;
const worms:Array<Worm> = [];
let pressing = false;
const init = ()=> {
	dpr = 2;//window.devicePixelRatio;
	renderer = PIXI.autoDetectRenderer(800, 800, {antialias: true});
	canvas = <HTMLCanvasElement>document.getElementById("content");
	canvas.appendChild(renderer.view);
	renderer.view.style.width = "100%";
	renderer.view.style.height = "100%";
	window.addEventListener("resize", resize);
	window.addEventListener('resize', resize);
	window.addEventListener('orientationchange', resize);
	window.addEventListener("mousemove", (e)=>{
		if(!pressing) return;
		targets.length = 0;
		targets[0] = new Pos(e.clientX*dpr, e.clientY*dpr);
	});
	window.addEventListener("mousedown", (e)=>{
		pressing = true;
		targets.length = 0;
		targets[0] = new Pos(e.clientX*dpr, e.clientY*dpr);
	});
	window.addEventListener("mouseup", ()=>{
		pressing = false;
	});
	window.addEventListener("touchmove", (e:TouchEvent)=>{
		if(!pressing) return;
		targets.length = 0;
		for(let i = 0; i < e.touches.length; i ++){
			const t = e.touches[i];
			targets.push(new Pos(t.clientX*dpr, t.clientY*dpr));
		}
	});
	window.addEventListener("touchstart", (e:TouchEvent)=>{
		pressing = true;
		targets.length = 0;
		for(let i = 0; i < e.touches.length; i ++){
			const t = e.touches[i];
			targets.push(new Pos(t.clientX*dpr, t.clientY*dpr));
		}
	});
	window.addEventListener("touchend", (e:TouchEvent)=>{
		targets.length = 0;
		for(let i = 0; i < e.touches.length; i ++){
			const t = e.touches[i];
			targets.push(new Pos(t.clientX*dpr, t.clientY*dpr));
		}
		if(targets.length<1)pressing = false;
	});
	for(let i = 0; i < 20; i ++){
		const w = new SimpleWorm(30, 60);
		worms.push(w);
		stage.addChild(w);
		w.setStep(1);
	}
	stage.addChild(new PIXI.Text("タッチ中はついてくる。", {fill:0xffffff, fontSize:60}));
	draw();
	resize();
}
let ppos = 0;
const draw = ()=> {
	requestAnimationFrame(draw);

	for(let i = 0; i < worms.length; i ++){
		const w = worms[i];
		if(w.getStep() == 1){
			const target = pressing?targets[Math.floor(Math.random()*targets.length)].clone():null;
			const pos = new VecPos(
				target?target.x:stageWidth*Math.random(),
				target?target.y:stageHeight*Math.random(),
				Math.PI*2*Math.random()
			);
			//w.reverse();
			const r = RouteGenerator.getMinimumRoute(
				w.getHeadVecPos(),
				pos,
				pressing?80:200,
				pressing?80:200,
				10
			);
			r.pop();
			r.wave(pressing?10:30, 0.2);
			w.addRouteFromCurrent(r);
			w.setStep(0);
		}
		w.addStep(pressing?2:1);
		w.render();
	}

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