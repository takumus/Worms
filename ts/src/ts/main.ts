import {Pos, VecPos, Circle} from './utils';
import {Route, RouteGenerator, Line} from './routes/';
import {Worm} from './worms/';
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
	testRoute.lines[0].forEach((p)=>{
		const vp:Pos = new Pos(p.x + 800, p.y + 800);
		testRouteVecs.push(vp);
		testRouteVecs2.push(vp.clone());
	});
	w = new Worm(testRouteVecs.getLength());
	stage.addChild(w);
	w2 = new Worm(testRouteVecs2.getLength());
	stage.addChild(w2);
	testRouteVecs.reverse();
	RouteGenerator.graphics = g;
	draw();
	resize();
}
const g:PIXI.Graphics = new PIXI.Graphics();
const mouse:Pos = new Pos();
const testRouteStr:string = '{"lines":[[{"x":1.42,"y":0},{"x":1.87,"y":4.97},{"x":1.9,"y":9.97},{"x":1.9,"y":14.97},{"x":1.9,"y":19.97},{"x":1.9,"y":24.97},{"x":1.9,"y":29.97},{"x":1.9,"y":34.97},{"x":1.9,"y":39.97},{"x":1.99,"y":44.97},{"x":1.34,"y":49.93},{"x":1.84,"y":54.91},{"x":1.44,"y":59.89},{"x":1.66,"y":64.88},{"x":1.54,"y":69.88},{"x":1.02,"y":74.86},{"x":1.1,"y":79.85},{"x":1.94,"y":84.78},{"x":1.44,"y":89.76},{"x":1.68,"y":94.75},{"x":1.57,"y":99.75},{"x":1.62,"y":104.75},{"x":1.6,"y":109.75},{"x":0,"y":116.01},{"x":1.87,"y":120.64},{"x":1.77,"y":125.64},{"x":1.77,"y":130.64},{"x":1.77,"y":135.64},{"x":1.77,"y":140.64},{"x":1.77,"y":145.64},{"x":1.77,"y":150.64},{"x":1.77,"y":155.64},{"x":1.09,"y":160.6},{"x":1.87,"y":165.54},{"x":1.56,"y":170.53},{"x":1.68,"y":175.52},{"x":1.64,"y":180.52},{"x":1.65,"y":185.52},{"x":1.65,"y":190.52},{"x":1.84,"y":195.52},{"x":1.91,"y":200.52},{"x":1.96,"y":205.52},{"x":1.94,"y":210.52},{"x":1.95,"y":215.52},{"x":1.94,"y":220.52},{"x":1.94,"y":225.52},{"x":1.94,"y":230.52},{"x":1.54,"y":235.5},{"x":1.69,"y":240.5},{"x":1.82,"y":245.5},{"x":1.35,"y":250.48},{"x":1.82,"y":255.46},{"x":1.38,"y":260.43},{"x":1.84,"y":265.41},{"x":1.61,"y":270.41},{"x":1.69,"y":275.41},{"x":1.66,"y":280.41},{"x":1.67,"y":285.41},{"x":1.67,"y":290.41},{"x":1.67,"y":295.41},{"x":1.87,"y":300.4},{"x":1.61,"y":305.4},{"x":1.69,"y":310.4},{"x":1.67,"y":315.4},{"x":1.68,"y":320.4},{"x":1.67,"y":325.4},{"x":1.67,"y":330.4},{"x":2.86,"y":335.25},{"x":2.48,"y":340.24},{"x":3.88,"y":345.04},{"x":4.71,"y":349.97},{"x":5.75,"y":354.86},{"x":6.77,"y":359.76},{"x":8.85,"y":364.3},{"x":10.27,"y":369.1},{"x":12.75,"y":373.44},{"x":15.24,"y":377.78},{"x":17.6,"y":382.19},{"x":21.48,"y":385.34},{"x":24.21,"y":389.53},{"x":27.27,"y":393.48},{"x":31.59,"y":396},{"x":35.58,"y":399.01},{"x":39.47,"y":402.15},{"x":43.87,"y":404.53},{"x":48.36,"y":406.72},{"x":53.06,"y":408.44},{"x":57.45,"y":410.82},{"x":62.16,"y":412.53},{"x":66.95,"y":413.95},{"x":71.65,"y":415.66},{"x":76.61,"y":416.25},{"x":81.47,"y":417.42},{"x":86.47,"y":417.32},{"x":91.37,"y":418.35},{"x":96.33,"y":418.95},{"x":101.26,"y":418.11},{"x":106.26,"y":418.04},{"x":111.26,"y":418.04},{"x":116.26,"y":418.04},{"x":121.17,"y":417.1},{"x":126.16,"y":416.79},{"x":131.16,"y":416.86},{"x":135.83,"y":415.08},{"x":140.8,"y":414.52},{"x":145.67,"y":413.4},{"x":150.64,"y":412.89},{"x":155.16,"y":410.75},{"x":160.08,"y":409.87},{"x":164.9,"y":408.52},{"x":169.42,"y":406.39},{"x":174.11,"y":404.66},{"x":179.06,"y":403.91},{"x":183.15,"y":401.05}]],"height":418.95,"width":183.15}';
const testRoute = JSON.parse(testRouteStr);
let testRouteVecs:Line = new Line();
let testRouteVecs2:Line = new Line();
let w:Worm;
let w2:Worm;
let r = 0;
const draw = ()=> {
	requestAnimationFrame(draw);

	g.clear();
	g.lineStyle(2, 0xff0000);
	const route = RouteGenerator.getMinimumRoute(
		new VecPos(mouse.x , mouse.y, 0.5),
		testRouteVecs.getHeadVecPos(),
		200,
		400
	);
	const route2 = RouteGenerator.getMinimumRoute(
		new VecPos(mouse.x+500 , mouse.y+300, 0.5+Math.PI),
		testRouteVecs2.getHeadVecPos(),
		200,
		400
	);
	let p = (Math.sin(r)+1)/2;
	p = p*p*p;
	if(route) {
		let vecs = route.generateRoute(5).wave(20, 0.1).pushLine(testRouteVecs);
		w.setRoute(vecs);
		w.setStep(p);
		w.render();
	}
	if(route2) {
		let vecs = route2.generateRoute(5).wave(180, 0.03).pushLine(testRouteVecs2);
		w2.setRoute(vecs);
		w2.setStep(p);
		w2.render();
	}
	//vecs.forEach((v)=>{
	//	//g.drawCircle(v.x, v.y, 10);
	//});
	renderer.render(stage);
	r+=0.03;
}
const resize = ()=> {
	const width:number = canvas.offsetWidth*2;
	const height:number = canvas.offsetHeight*2;
	sw = width;
	sh = height;
	renderer.resize(width, height);
}

window.onload = init;