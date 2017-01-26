import {Pos, VecPos, Circle} from './routes/utils';
import {Route, RouteGenerator, Line} from './routes/route';
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
		const vp:Pos = new Pos(p.x + 800, p.y + 800);
		testRouteVecs.push(vp);
	});
	testRouteVecs.reverse();
	RouteGenerator.graphics = g;
	draw();
	resize();
}
const g:PIXI.Graphics = new PIXI.Graphics();
const mouse:Pos = new Pos();
const L = 80;
const w:FollowWorm = new FollowWorm(L);
const testRouteStr:string = '{"lines":[[{"x":0.35,"y":0},{"x":0.88,"y":4.97},{"x":0.51,"y":9.95},{"x":0.82,"y":14.94},{"x":0.55,"y":19.94},{"x":0.81,"y":24.93},{"x":0.56,"y":29.92},{"x":0.81,"y":34.92},{"x":0.56,"y":39.91},{"x":0.14,"y":44.89},{"x":0.24,"y":49.89},{"x":0.78,"y":54.86},{"x":0.29,"y":59.84},{"x":0.1,"y":64.83},{"x":0.2,"y":69.83},{"x":0.92,"y":74.78},{"x":0.31,"y":79.74},{"x":0.24,"y":84.74},{"x":0.42,"y":89.74},{"x":0.33,"y":94.74},{"x":0.37,"y":99.74},{"x":0.35,"y":104.74},{"x":0.36,"y":109.74},{"x":0.36,"y":114.74},{"x":0.22,"y":119.74},{"x":0.26,"y":124.74},{"x":0.4,"y":129.73},{"x":0.34,"y":134.73},{"x":0.37,"y":139.73},{"x":0.35,"y":144.73},{"x":1.06,"y":149.68},{"x":1.02,"y":154.68},{"x":1.02,"y":159.68},{"x":0,"y":164.58},{"x":0.76,"y":169.52},{"x":0.83,"y":174.52},{"x":2.44,"y":179.25},{"x":3.99,"y":184},{"x":6.78,"y":188.16},{"x":9.86,"y":192.1},{"x":13.05,"y":195.95},{"x":17.05,"y":198.94},{"x":21.15,"y":201.8},{"x":25.83,"y":203.57},{"x":30.53,"y":205.29},{"x":35.43,"y":206.26},{"x":40.34,"y":207.22},{"x":45.24,"y":208.18},{"x":50.19,"y":208.92},{"x":55.19,"y":208.85},{"x":60.19,"y":208.88},{"x":65.04,"y":207.67},{"x":69.91,"y":206.52},{"x":74.71,"y":205.14},{"x":79.26,"y":203.07},{"x":84.24,"y":202.57},{"x":88.65,"y":200.22}]],"height":208.92,"width":88.65}';
const testRoute = JSON.parse(testRouteStr);
let testRouteVecs:Line = new Line();
let r = 0;
const draw = ()=> {
	requestAnimationFrame(draw);

	g.clear();
	g.lineStyle(2, 0xff0000);
	const b:Pos = new Pos(testRouteVecs.at(0).x, testRouteVecs.at(0).y);
	const dx = testRouteVecs.at(1).x - testRouteVecs.at(0).x;
	const dy = testRouteVecs.at(1).y - testRouteVecs.at(0).y;
	const br = Math.atan2(dy, dx);
	b.x -= dx;
	b.y -= dy;
	const routes = RouteGenerator.getAllRoute(
		new VecPos(mouse.x , mouse.y, 0.5),
		new VecPos(b.x, b.y, br),
		400,
		400
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
	let vecs = route.generateRoute(5);//.pushLine(testRouteVecs);
	//vecs.forEach((v)=>{
	//	//g.drawCircle(v.x, v.y, 10);
	//});
	w.setRoute(vecs);
	w.setStep((Math.sin(r)+1)/2);
	w.render();
	renderer.render(stage);
	r+=0.04;
}
const resize = ()=> {
	const width:number = canvas.offsetWidth*2;
	const height:number = canvas.offsetHeight*2;
	sw = width;
	sh = height;
	renderer.resize(width, height);
}

window.onload = init;