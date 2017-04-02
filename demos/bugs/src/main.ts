import {Bug} from './bugs';
let renderer: PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage: PIXI.Container = new PIXI.Container();
let canvas: HTMLCanvasElement;
let stageWidth: number = 0, stageHeight: number = 0;
const mouse: UTILS.Pos = new UTILS.Pos();
const props = {
    speed: 24
}
function initBugs(): void {
    const guide = new ROUTES.Debugger();
    guide.setOption(0xCCCCCC, 1, false, false);
    stage.addChild(guide);
    const bug = new Bug(40, 20);
    stage.addChild(bug.graphics);

    let pVecPos: UTILS.VecPos = new UTILS.VecPos(200, 200, 0);
    let mousePos: UTILS.VecPos = new UTILS.VecPos();
    const next = () => {
        const p = bug.bone[0];
        const r = Math.atan2(mouse.y - p.y, mouse.x - p.x);
        //const nVecPos = new UTILS.VecPos(mouse.x, mouse.y, r);

        const nVecPos = new UTILS.VecPos(stageWidth / 2 + Math.random() * 400 - 200, stageHeight / 2 + Math.random() * 400 - 200, Math.PI * 2 * Math.random());
        const route = ROUTES.RouteGenerator.getMinimumRoute(
            bug.getHeadVecPos(),
            nVecPos,
            50 * Math.random() + 70,
            50 * Math.random() + 70,
            5
        ).wave(20, 0.1);
        
        while (route.length % Math.floor(20) != 0) {
            const p1 = route[route.length - 2];
            const p2 = route[route.length - 1].clone();
            const d = p1.distance(p2);
            p2.x += (p2.x - p1.x) / d * 5;
            p2.y += (p2.y - p1.y) / d * 5;
            route.push(p2.clone());
        }
        if (route.length == 0) {
            next();
            return;
        }
        pVecPos = nVecPos;
        guide.clear();
        guide.render(route);
        bug.setRoute(bug.getCurrentLine().pushLine(route));
        new TWEEN.Tween({s: 0})
        .to({s: 1}, route.length * props.speed)
        .onUpdate(function(): void {
            bug.setStep(this.s);
            bug.render();
        })
        .onComplete(function(): void {
            next();
        })
        .start();
    }
    next();
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    })
}
function initGUI(): void {
    const gui = new dat.GUI();
    gui.add(props, 'speed', 0, 100);
}
function initPIXI(): void {
    renderer = PIXI.autoDetectRenderer(800, 800, {antialias: false, resolution: 2, transparent: false, backgroundColor: 0xFFFFFF});
    canvas = <HTMLCanvasElement>document.getElementById('content');
    canvas.appendChild(renderer.view);
    renderer.view.style.width = '100%';
    renderer.view.style.height = '100%';
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
}
function init(): void {
    const color = new UTILS.Color(0xffffff);
    initGUI();
    initPIXI();
    draw();
    resize();
    initBugs();
}
function draw(): void {
    requestAnimationFrame(draw);
    TWEEN.update();
    renderer.render(stage);
}
function resize(): void {
    stageWidth = canvas.offsetWidth;
    stageHeight = canvas.offsetHeight;
    renderer.resize(stageWidth, stageHeight);
}
window.onload = init;