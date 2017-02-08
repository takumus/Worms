let renderer:PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage:PIXI.Container = new PIXI.Container();
let canvas:HTMLCanvasElement;
let stageWidth:number = 0, stageHeight:number = 0;
const mouse:UTILS.Pos = new UTILS.Pos();
const prevMouse:UTILS.Pos = new UTILS.Pos();
const worms:Array<WORMS.Base> = [];
const wormsGraphic:Array<PIXI.Graphics> = [];
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
		move(e.clientX, e.clientY);
	});
	window.addEventListener("mousedown", (e)=>{
		begin(e.clientX, e.clientY);
	});
	window.addEventListener("mouseup", ()=>{
		end();
	});
	window.addEventListener("touchmove", (e:TouchEvent)=>{
		move(e.touches[0].clientX, e.touches[0].clientY)
	});
	window.addEventListener("touchstart", (e:TouchEvent)=>{
		begin(e.touches[0].clientX, e.touches[0].clientY);
	});
	window.addEventListener("touchend", (e:TouchEvent)=>{
		end();
	});
	const begin = (x:number, y:number)=>{
		pressing = true;
		prevMouse.x = mouse.x = x;
		prevMouse.y = mouse.y = y;
	}
	const move = (x:number, y:number)=>{
		if(!pressing) return;
		const dx = prevMouse.x - mouse.x;
		const dy = prevMouse.y - mouse.y;
		if(dx*dx + dy*dy > 2000){
			prevMouse.x = mouse.x;
			prevMouse.y = mouse.y;
		}
		mouse.x = x;
		mouse.y = y;
	}
	const end = ()=>{
		pressing = false;
	}
	for(let i = 0; i < 10; i ++){
		const w = new WORMS.Simple(80, 60);
		worms.push(w);
		stage.addChild(w);
		w.setStep(1);
		const g = new PIXI.Graphics();
		wormsGraphic.push(g);
	}
	wormsGraphic.forEach((g)=>{
		stage.addChild(g);
	})
	stage.addChild(new PIXI.Text("タッチ中はついてくる。", {fill:0xffffff, fontSize:60}));
	draw();
	resize();
}
let wave:number = 0.2;
const draw = ()=> {
	requestAnimationFrame(draw);
	const target = mouse;
	const mouseRadian = Math.atan2(target.y - prevMouse.y, target.x - prevMouse.x);
	for(let i = 0; i < worms.length; i ++){
		const w = worms[i];
		const g = wormsGraphic[i];
		if(w.getStep() == 1 || pressing && !w.getRoute().tail().equals(target)){
			
			const pos = new UTILS.VecPos(
				pressing?target.x:stageWidth*Math.random(),
				pressing?target.y:stageHeight*Math.random(),
				Math.PI*2*Math.random()
			);
			//w.reverse();
			const r = ROUTES.RouteGenerator.getMinimumRoute(
				w.getHeadVecPos(),
				pos,
				pressing?100:100*Math.random()+100,
				pressing?100:100*Math.random()+100,
				5
			);
			//r.pop();
			r.wave(pressing?10:10, wave, true);
			w.addRouteFromCurrent(r);
			w.setStep(0);

			g.clear();
			g.lineStyle(1, 0xff0000);
			const L = r.getLength();
			const h = r.head();
			const t = r.tail();
			g.drawCircle(h.x, h.y, 10);
			g.moveTo(h.x, h.y);
			for(let n = 1; n < L; n ++){
				const p = r.at(n);
				g.lineTo(p.x, p.y);
			}
			g.drawCircle(t.x, t.y, 10);
		}
		w.addStep(pressing?4:4);
		w.render();
	}

	TWEEN.update();
	renderer.render(stage);

	//stage.x = -w.getCurrentLine().getTailVecPos().pos.x + stageWidth/2;
	//stage.y = -w.getCurrentLine().getTailVecPos().pos.y + stageHeight/2;
}
window["setWave"] = (w:number) => {
	wave = w;
}
const resize = () => {
	const width:number = canvas.offsetWidth;
	const height:number = canvas.offsetHeight;
	stageWidth = width;
	stageHeight = height;
	renderer.resize(width, height);
}
window.onload = init;
//100コミット