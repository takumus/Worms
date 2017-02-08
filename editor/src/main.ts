import Editor from './editor';
let renderer:PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage:PIXI.Container = new PIXI.Container();
let canvas:HTMLCanvasElement;
let stageWidth:number = 0, stageHeight:number = 0;
let editor:Editor;
const init = ()=> {
	renderer = PIXI.autoDetectRenderer(800, 800, {antialias: true, resolution:2});
	canvas = <HTMLCanvasElement>document.getElementById("content");
	canvas.appendChild(renderer.view);
	renderer.view.style.width = "100%";
	renderer.view.style.height = "100%";
	window.addEventListener("resize", resize);
	window.addEventListener('resize', resize);
	window.addEventListener('orientationchange', resize);
	
	editor = new Editor();
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
	const width:number = canvas.offsetWidth;
	const height:number = canvas.offsetHeight;
	stageWidth = width;
	stageHeight = height;
	renderer.resize(width, height);
}

window.onload = init;