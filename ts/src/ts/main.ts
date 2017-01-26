import {Pos, VecPos, Circle} from './routes/utils';
import {Route, RouteGenerator} from './routes/route';
import {FollowWorm} from './worms/worm';
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
	stage.addChild(g);
	window.addEventListener("mousemove", (e)=>{
		mouse.x = e.clientX*2;
		mouse.y = e.clientY*2;
	});
	stage.addChild(w);
	testRoute.lines[0].forEach((p)=>{
		const vp:VecPos = new VecPos(p.x + 800, p.y + 800, 0);
		testRouteVecs.push(vp);
	});

	draw();
	resize();
}
const g:PIXI.Graphics = new PIXI.Graphics();
const rg:RouteGenerator = new RouteGenerator(g);
const mouse:Pos = new Pos();
const L = 40;
const w:FollowWorm = new FollowWorm(L);
const testRouteStr:string = '{"lines":[[{"x":5.67,"y":20.53},{"x":23.37,"y":11.22},{"x":41.72,"y":3.28},{"x":61.45,"y":0},{"x":81.42,"y":1.18},{"x":100.14,"y":8.21},{"x":114.67,"y":21.96},{"x":121.06,"y":40.91},{"x":122.42,"y":60.86},{"x":121.82,"y":80.85},{"x":122.03,"y":100.85},{"x":121.99,"y":120.85},{"x":122.04,"y":140.85},{"x":121.45,"y":158.02}],[{"x":121.53,"y":62.42},{"x":101.55,"y":63.25},{"x":81.61,"y":64.84},{"x":65.45,"y":69.02},{"x":45.62,"y":71.62},{"x":27.95,"y":80.02},{"x":11.22,"y":90.98},{"x":0.73,"y":108.01},{"x":0,"y":127.99},{"x":11.21,"y":144.55},{"x":29.38,"y":152.91},{"x":49.27,"y":154.99},{"x":69.21,"y":153.35},{"x":88.02,"y":146.55},{"x":106,"y":137.8},{"x":120.88,"y":124.44}]],"height":158.02,"width":122.42}';
const testRoute = JSON.parse(testRouteStr);
let testRouteVecs:Array<VecPos> = [];
const draw = ()=> {
	requestAnimationFrame(draw);

	g.clear();
	g.lineStyle(2, 0xff0000);
	const b:Pos = new Pos(testRouteVecs[0].pos.x, testRouteVecs[0].pos.y);
	const dx = testRouteVecs[1].pos.x - testRouteVecs[0].pos.x;
	const dy = testRouteVecs[1].pos.y - testRouteVecs[0].pos.y;
	const br = Math.atan2(dy, dx);
	b.x -= dx;
	b.y -= dy;
	console.log(b.x, b.y);
	const routes = rg.getAllRoute(
		new VecPos(mouse.x , mouse.y, 0.5),
		new VecPos(b.x, b.y, br),
		200,
		200
	);
	let min:number = Number.MAX_VALUE;
	let route:Route;
	routes.forEach((r)=>{
		if(r.getLength() < min){
			min = r.getLength();
			route = r;
		}
	});
	if(!route) return;
	let vecs = route.generateRoute(20).concat(testRouteVecs);
	vecs.forEach((v)=>{
		g.drawCircle(v.pos.x, v.pos.y, 10);
	});
	w.setRoute(vecs);
	w.step();
	renderer.render(stage);
}
const resize = ()=> {
	const width:number = canvas.offsetWidth*2;
	const height:number = canvas.offsetHeight*2;
	sw = width;
	sh = height;
	renderer.resize(width, height);
}

window.onload = init;