import Editor from './editor';
let renderer:PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage:PIXI.Container = new PIXI.Container();
let canvas:HTMLCanvasElement;
let stageWidth:number = 0, stageHeight:number = 0;
let editor:Editor;
let dpr:number;
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
	
	editor = new Editor(dpr);
	stage.addChild(editor);

	draw();
	resize();
}
let ppos = 0;
const draw = ()=> {
	requestAnimationFrame(draw);
	editor.update();
	TWEEN.update();
	renderer.render(stage);
}
const resize = ()=> {
	const width:number = canvas.offsetWidth*dpr;
	const height:number = canvas.offsetHeight*dpr;
	stageWidth = width;
	stageHeight = height;
	renderer.resize(width, height);
}

window.onload = init;