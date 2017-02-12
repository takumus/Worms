let renderer:PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage:PIXI.Container = new PIXI.Container();
let canvas:HTMLCanvasElement;
let stageWidth:number = 0, stageHeight:number = 0;
const mouse:UTILS.Pos = new UTILS.Pos();
const prevMouse:UTILS.Pos = new UTILS.Pos();
const worms:Array<WORMS.Nasty2> = [];
const wormsGuide:Array<PIXI.Graphics> = [];
const wormsGuideContainer:PIXI.Container = new PIXI.Container();
let pressing = false;
let guide:boolean = true;
const parentProps = {
	waveFreq:0.12,
	waveAmp:16,
	thickness:15,
	length:30,
	speed:1.8
};
const childProps = {
	waveFreq:0.2,
	waveAmp:10,
	thickness:13,
	length:25,
	speed:1.9
};
const globalProps = {
	guide:false,
	speed:1
}
const init = ()=> {
	{
		const gui = new dat.GUI();
		const parent = gui.addFolder("Parent worm");
		parent.add(parentProps, 'waveFreq', 0, 1);
		parent.add(parentProps, 'waveAmp', 0, 100);
		parent.add(parentProps, 'thickness', 1, 100).onChange(()=>{
			worms[0].getOption().thickness = parentProps.thickness;
		});
		parent.add(parentProps, 'length', 2, 100).onChange(()=>{
			worms[0].setLength(parentProps.length);
			worms[0].getOption().headLength = parentProps.length*0.3;
			worms[0].getOption().tailLength = parentProps.length*0.7;
		});
		parent.add(parentProps, 'speed', 0.1, 10);
		parent.open();
		const child = gui.addFolder("Child worm");
		child.add(childProps, 'waveFreq', 0, 1);
		child.add(childProps, 'waveAmp', 0, 100);
		child.add(childProps, 'thickness', 1, 100).onChange(()=>{
			for(let i = 1; i < worms.length; i ++){
				worms[i].getOption().thickness = childProps.thickness;
			}
		});
		child.add(childProps, 'length', 2, 100).onChange(()=>{
			for(let i = 1; i < worms.length; i ++){
				worms[i].setLength(childProps.length);
				worms[i].getOption().headLength = childProps.length*0.3;
				worms[i].getOption().tailLength = childProps.length*0.7;
			}
		});
		child.add(childProps, 'speed', 0.1, 10);
		child.open();

		gui.add(globalProps, 'guide').onChange(()=>{
			wormsGuideContainer.visible = globalProps.guide;
		});
		gui.add(globalProps, 'speed', 0, 10);
	}
	wormsGuideContainer.visible = false;
	//window.devicePixelRatio;
	renderer = PIXI.autoDetectRenderer(800, 800, {antialias: true, resolution:2, transparent:false});
	canvas = <HTMLCanvasElement>document.getElementById("content");
	canvas.appendChild(renderer.view);
	renderer.view.style.width = "100%";
	renderer.view.style.height = "100%";
	window.addEventListener("resize", resize);
	window.addEventListener('orientationchange', resize);
	window.addEventListener("mousedown", (e)=>{
		if((<HTMLElement>e.target).tagName != "CANVAS") return;
		pressing = true;
		prevMouse.x = mouse.x = e.clientX;
		prevMouse.y = mouse.y = e.clientY;
		const c = 0xffffff*Math.random()
		for(let i = 0; i < worms.length; i ++){
			const opt = worms[i].getOption();
			opt.fillColor = i!=0?c:0x000000;
			opt.borderColor = i!=0?0x000000:c;
		}
	});
	window.addEventListener("mousemove", (e)=>{
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	});
	window.addEventListener("mouseup", ()=>{
		pressing = false;
	});

	stage.addChild(wormsGuideContainer);
	for(let i = 0; i < 18; i ++){
		const l = i==0?parentProps.length:childProps.length;
		const t = i==0?parentProps.thickness:childProps.thickness;
		const w = new WORMS.Nasty2(
			l,
			{
				headLength:l*0.3,
				tailLength:l*0.7,
				thickness:t,
				fillColor:i!=0?0xffffff*Math.random():0x000000,
				borderColor:i!=0?0x000000:0xffffff*Math.random(),
				borderThickness:i!=0?0:2
			}
		);
		worms.push(w);
		stage.addChild(w);
		w.blendMode = PIXI.BLEND_MODES.ADD;
		w.setStep(1);
		const g = new PIXI.Graphics();
		wormsGuide.push(g);
		wormsGuideContainer.addChild(g);
	}
	draw();
	resize();
}
const draw = ()=> {
	requestAnimationFrame(draw);
	const target = mouse;
	const mouseRadian = Math.atan2(target.y - prevMouse.y, target.x - prevMouse.x);
	for(let i = 0; i < worms.length; i ++){
		const w = worms[i];
		const g = wormsGuide[i];
		if(w.getStep() == 1 || i == 0 && pressing && !w.getRoute().tail().equals(target)){
			let pos:UTILS.VecPos;
			if(i!=0){
				pos = worms[0].getTailVecPos().clone();
				pos.pos.x += Math.random()*300-150;
				pos.pos.y += Math.random()*300-150;
				
				pos.add(Math.PI);
			}else{
				const p = 0.5;
				const dx = mouse.x - w.getHeadVecPos().pos.x;
				const dy = mouse.y - w.getHeadVecPos().pos.y;
				pos = new UTILS.VecPos(
					pressing?target.x:stageWidth*(1-p)/2 + stageWidth*p*Math.random(),
					pressing?target.y:stageHeight*(1-p)/2 + stageHeight*p*Math.random(),
					Math.atan2(dy, dx)
				);
			}
			//w.reverse();
			const r = ROUTES.RouteGenerator.getMinimumRoute(
				w.getHeadVecPos(),
				pos,
				i==0?200:50*Math.random()+60,
				i==0?200:50*Math.random()+60,
				5
			);
			//r.pop();
			
			r.wave(i==0?parentProps.waveAmp:childProps.waveAmp, i==0?parentProps.waveFreq:childProps.waveFreq, i!=0);
			w.addRouteFromCurrent(r);
			w.setStep(0);

			g.clear();
			if(guide){
				const L = r.getLength();
				const h = r.head();
				const t = r.tail();
				const gc = i!=0?0x333333:0x999999;
				g.lineStyle(1, gc);
				g.drawCircle(h.x, h.y, 10);
				g.drawCircle(t.x, t.y, 10);
				g.moveTo(h.x, h.y);
				for(let n = 1; n < L; n ++){
					const p = r.at(n);
					g.lineTo(p.x, p.y);
				}
			}
			pressing = false;
		}
		w.addStep((i!=0?childProps.speed:parentProps.speed) * globalProps.speed);
		const add = Math.sin(w.getHeadVecPos().r)*2;
		//w.addStep(add > 0?add:0);
		w.render();
	}
	TWEEN.update();
	renderer.render(stage);

	//stage.x = -w.getCurrentLine().getTailVecPos().pos.x + stageWidth/2;
	//stage.y = -w.getCurrentLine().getTailVecPos().pos.y + stageHeight/2;
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
console.log("call function 'setWave(freq)' to set wave frequency.");