import {Bug} from './bugs';
let renderer: PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage: PIXI.Container = new PIXI.Container();
let canvas: HTMLCanvasElement;
let stageWidth: number = 0, stageHeight: number = 0;
const mouse: UTILS.Pos = new UTILS.Pos();
const props = {
    speed: 1
}
const bugs: Bug[] = [];
const guide = new ROUTES.Debugger();
function initBugs(): void {
    guide.setOption(0xCCCCCC, 1, false, false);
    stage.addChild(guide);

    for (let i = 0; i < 1; i ++) {
        const bug = new Bug(40, 20);
        bugs.push(bug);
        bug.setStep(1);
        stage.addChild(bug.graphics);
    }
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    })
}
function draw(): void {
    requestAnimationFrame(draw);
    bugs.forEach((bug) => {
        if (bug.step == 1) {
            const nVecPos = new UTILS.VecPos(stageWidth / 2 + Math.random() * 800 - 400, stageHeight / 2 + Math.random() * 800 - 400, Math.PI * 2 * Math.random());
            const route = ROUTES.RouteGenerator.getMinimumRoute(
                bug.getHeadVecPos(),
                nVecPos,
                50 * Math.random() + 70,
                50 * Math.random() + 70,
                5
            ).wave(20, 0.1);
            // 仕方ないおまじない
            while (route.length % Math.floor(20) != 0) {
                const p1 = route[route.length - 2];
                const p2 = route[route.length - 1].clone();
                const d = p1.distance(p2);
                p2.x += (p2.x - p1.x) / d * 5;
                p2.y += (p2.y - p1.y) / d * 5;
                route.push(p2.clone());
            }
            bug.setRoute(bug.getCurrentLine().pushLine(route));
            bug.setStep(0);
        }
        bug.addStep(props.speed);
        bug.render();
    });

    TWEEN.update();
    renderer.render(stage);
}

function initGUI(): void {
    const gui = new dat.GUI();
    gui.add(props, 'speed', 0, 10);
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
function resize(): void {
    stageWidth = canvas.offsetWidth;
    stageHeight = canvas.offsetHeight;
    renderer.resize(stageWidth, stageHeight);
}
window.onload = init;