let renderer:PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage:PIXI.Container = new PIXI.Container();
let canvas:HTMLCanvasElement;
let stageWidth:number = 0, stageHeight:number = 0;
const targets:Array<UTILS.Pos> = [];
const worms:Array<WORMS.Base> = [];
let pressing = false;
const init = ()=> {
	//window.devicePixelRatio;
	renderer = PIXI.autoDetectRenderer(800, 800, {antialias: true, resolution:2});
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
		targets[0] = new UTILS.Pos(e.clientX, e.clientY);
	});
	window.addEventListener("mousedown", (e)=>{
		pressing = true;
		targets.length = 0;
		targets[0] = new UTILS.Pos(e.clientX, e.clientY);
	});
	window.addEventListener("mouseup", ()=>{
		pressing = false;
	});
	window.addEventListener("touchmove", (e:TouchEvent)=>{
		if(!pressing) return;
		targets.length = 0;
		targets.length = 0;
		targets.push(new UTILS.Pos(e.touches[0].clientX, e.touches[0].clientY));
	});
	window.addEventListener("touchstart", (e:TouchEvent)=>{
		pressing = true;
		targets.length = 0;
		targets.push(new UTILS.Pos(e.touches[0].clientX, e.touches[0].clientY));
	});
	window.addEventListener("touchend", (e:TouchEvent)=>{
		pressing = false;
	});
	for(let i = 0; i < 20; i ++){
		const w = new WORMS.Simple(30, 30);
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

	for(let i = 0; i < 20; i ++){
		const w = worms[i];
		const target = pressing?targets[0].clone():null;
		if(w.getStep() == 1 || pressing && !w.getRoute().tail().equals(new UTILS.Pos(target.x, target.y))){
			
			const pos = new UTILS.VecPos(
				target?target.x:stageWidth*Math.random(),
				target?target.y:stageHeight*Math.random(),
				Math.PI*2*Math.random()
			);
			//w.reverse();
			const r = ROUTES.RouteGenerator.getMinimumRoute(
				w.getHeadVecPos(),
				pos,
				100*Math.random()+100,
				100*Math.random()+100,
				10
			);
			//r.pop();
			r.wave(pressing?10:10, 0.3);
			w.addRouteFromCurrent(r);
			w.setStep(0);
		}
		w.addStep(pressing?1:0.5);
		w.render();
	}

	TWEEN.update();
	renderer.render(stage);

	//stage.x = -w.getCurrentLine().getTailVecPos().pos.x + stageWidth/2;
	//stage.y = -w.getCurrentLine().getTailVecPos().pos.y + stageHeight/2;
}
const resize = ()=> {
	const width:number = canvas.offsetWidth;
	const height:number = canvas.offsetHeight;
	stageWidth = width;
	stageHeight = height;
	renderer.resize(width, height);
}

window.onload = init;
//100コミット