let renderer: PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage: PIXI.Container = new PIXI.Container();
let canvas: HTMLCanvasElement;
let stageWidth: number = 0, stageHeight: number = 0;
const mouse: UTILS.Pos = new UTILS.Pos();
const prevMouse: UTILS.Pos = new UTILS.Pos();
const worms: Array<WORMS.Nasty> = [];
const wormsGuide: Array<PIXI.Graphics> = [];
const wormsGuideContainer: PIXI.Container = new PIXI.Container();
let pressing = false;
let guide: boolean = true;
let props = {
    parent: {
        waveFreq: 0.12,
        waveAmp: 16,
        thickness: 15,
        length: 30,
        radius: 100,
        radiusRandom: 100,
        speed: 1.8
    },
    child: {
        waveFreq: 0.2,
        waveAmp: 10,
        thickness: 13,
        length: 25,
        radius: 50,
        radiusRandom: 60,
        targetOffset: 200,
        speed: 1.9
    },
    global: {
        guide: false,
        speed: 1,
        color: 0x519aa4,
        bodyBalance: 0.3
    }
}
const defaultProps = {};
function initGUI(): void {
    const gui = new dat.GUI();
    const parent = gui.addFolder('Parent worm');
    const parentThickness = () => {
        worms[0].getOption().thickness = props.parent.thickness;
    }
    const parentLength = () => {
        worms[0].setLength(props.parent.length);
    }
    const child = gui.addFolder('Child worm');
    const childThickness = () => {
        for (let i = 1; i < worms.length; i ++) {
            worms[i].getOption().thickness = props.child.thickness;
        }
    }
    const childLength = () => {
        for (let i = 1; i < worms.length; i ++) {
            worms[i].setLength(props.child.length);
        }
    }
    const guide = () => {
        wormsGuideContainer.visible = props.global.guide;
    }
    const bodyBalance = () => {
        for (let i = 0; i < worms.length; i ++) {
            worms[i].getOption().headLength = props.global.bodyBalance;
            worms[i].getOption().tailLength = 1 - props.global.bodyBalance;
        }
    }
    parent.add(props.parent, 'speed', 0.1, 10);
    parent.add(props.parent, 'waveFreq', 0, 0.5);
    parent.add(props.parent, 'waveAmp', 0, 100);
    parent.add(props.parent, 'thickness', 1, 400).onChange(parentThickness);
    parent.add(props.parent, 'length', 2, 200).onChange(parentLength);
    const parentTurn = parent.addFolder('turn');
    parentTurn.add(props.parent, 'radius', 0, 500);
    parentTurn.add(props.parent, 'radiusRandom', 0, 500);
    parent.open();
    child.add(props.child, 'speed', 0.1, 20);
    child.add(props.child, 'waveFreq', 0, 0.5);
    child.add(props.child, 'waveAmp', 0, 100);
    child.add(props.child, 'thickness', 1, 200).onChange(childThickness);
    child.add(props.child, 'length', 2, 200).onChange(childLength);
    child.add(props.child, 'targetOffset', 0, 500);
    const childTurn = child.addFolder('turn');
    childTurn.add(props.child, 'radius', 0, 500);
    childTurn.add(props.child, 'radiusRandom', 0, 500);
    child.open();
    gui.add(props.global, 'guide').onChange(guide);
    gui.add(props.global, 'speed', 0, 10);
    gui.addColor(props.global, 'color');
    gui.add(props.global, 'bodyBalance', 0, 1).onChange(bodyBalance);
    gui.add({data: () => {
        try {
            const newPropsStr =　 window.prompt('your data', JSON.stringify(props));
            if (!newPropsStr) return;
            setProps(JSON.parse(newPropsStr));
            gui.updateDisplay();
            parentThickness();
            parentLength();
            childThickness();
            childLength();
            guide();
            bodyBalance();
        }catch (e) {

        }
    }}, 'data');
    gui.add({reset: () => {
        gui.revert(gui);
    }}, 'reset');
    wormsGuideContainer.visible = props.global.guide;
}
function initPIXI(): void {
    renderer = PIXI.autoDetectRenderer(800, 800, {antialias: true, resolution: 2, transparent: false});
    canvas = <HTMLCanvasElement>document.getElementById('content');
    canvas.appendChild(renderer.view);
    renderer.view.style.width = '100%';
    renderer.view.style.height = '100%';
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
}
function init(): void {
    initGUI();
    initPIXI();
    window.addEventListener('mousedown', (e) => {
        if ((<HTMLElement>e.target).tagName != 'CANVAS') return;
        pressing = true;
        prevMouse.x = mouse.x = e.clientX;
        prevMouse.y = mouse.y = e.clientY;
    });
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseup', () => {
        pressing = false;
    });
    stage.addChild(wormsGuideContainer);
    // generate worms
    for (let i = 0; i < 40; i ++) {
        const length = i == 0 ? props.parent.length : props.child.length;
        const headLength = props.global.bodyBalance;
        const tailLength = 1 - props.global.bodyBalance;
        const thickness = i == 0 ? props.parent.thickness : props.child.thickness;
        const fillColor = i != 0 ? props.global.color : 0x000000;
        const borderColor = i != 0 ? 0x000000 : props.global.color;
        const borderThickness = i != 0 ? 0 : 2;
        const w = new WORMS.Nasty(
            length,
            {
                headLength : headLength,
                tailLength : tailLength,
                thickness : thickness,
                fillColor : fillColor,
                borderColor : borderColor,
                borderThickness : borderThickness
            }
        );
        w.graphics.blendMode = PIXI.BLEND_MODES.ADD;
        w.setStep(1);
        worms.push(w);
        stage.addChild(w.graphics);
        const g = new PIXI.Graphics();
        wormsGuide.push(g);
        wormsGuideContainer.addChild(g);
    }
    draw();
    resize();
}
function draw(): void {
    requestAnimationFrame(draw);
    for (let i = 0; i < worms.length; i ++) {
        const w = worms[i];
        const g = wormsGuide[i];
        const opt = w.getOption();
        opt.fillColor = i != 0 ? props.global.color : 0x000000;
        opt.borderColor = i != 0 ? 0x000000 : props.global.color;
        if (w.getStep() == 1 || (i == 0 && pressing)) {
            let vpos: UTILS.VecPos;
            let route: ROUTES.Line;
            if (i != 0) {
                // child
                vpos = worms[0].getTailVecPos().clone();
                vpos.pos.x += Math.random() * props.child.targetOffset - props.child.targetOffset / 2;
                vpos.pos.y += Math.random() * props.child.targetOffset - props.child.targetOffset / 2;
                vpos.add(Math.PI);
                route = ROUTES.RouteGenerator.getMinimumRoute(
                    w.getHeadVecPos(),
                    vpos,
                    props.child.radiusRandom * Math.random() + props.child.radius,
                    props.child.radiusRandom * Math.random() + props.child.radius,
                    5
                );
                route.wave(props.child.waveAmp, props.child.waveFreq, true);
            }else {
                // parent
                if (pressing) {
                    const dx = mouse.x - w.getHeadVecPos().pos.x;
                    const dy = mouse.y - w.getHeadVecPos().pos.y;
                    route = ROUTES.RouteGenerator.getMinimumRoute(
                        w.getHeadVecPos(),
                        new UTILS.VecPos(
                            mouse.x,
                            mouse.y,
                            Math.atan2(dy, dx)
                        ),
                        props.parent.radiusRandom * Math.random() + props.parent.radius,
                        props.parent.radiusRandom * Math.random() + props.parent.radius,
                        5
                    );
                }else {
                    const p = 0.7;
                    vpos = new UTILS.VecPos(
                        stageWidth * (1 - p) / 2 + stageWidth * p * Math.random(),
                        stageHeight * (1 - p) / 2 + stageHeight * p * Math.random(),
                        Matthew.D_PI * Math.random()
                    );
                    const routes = ROUTES.RouteGenerator.getAllRoute(
                        w.getHeadVecPos(),
                        vpos,
                        props.parent.radiusRandom * Math.random() + props.parent.radius,
                        props.parent.radiusRandom * Math.random() + props.parent.radius,
                    );
                    route = routes[Math.floor(routes.length * Math.random())].generateRoute(5);
                }
                route.wave(props.parent.waveAmp, props.parent.waveFreq, true);
            }
            w.setRoute(w.getCurrentLine().pushLine(route));
            w.setStep(0);
            const r = w.getRoute();
            const h = r.head();
            const t = r.tail();
            const c = i != 0 ? 0x666666 : 0xCCCCCC;
            g.clear();
            g.beginFill(c)
            g.drawCircle(t.x, t.y, 2);
            g.endFill();
            g.lineStyle(1, c, 0);
            g.moveTo(h.x, h.y);
            for (let n = 1; n < r.getLength(); n ++) {
                const p = r.at(n);
                g.lineStyle(n / r.getLength() * 2, c);
                g.lineTo(p.x, p.y);
            }
            pressing = false;
        }
        w.addStep((i != 0 ? props.child.speed : props.parent.speed) * props.global.speed);
        w.render();
    }
    renderer.render(stage);
}
function resize(): void {
    stageWidth = canvas.offsetWidth;
    stageHeight = canvas.offsetHeight;
    renderer.resize(stageWidth, stageHeight);
}
function setProps(newProps): void {
    Object.keys(newProps).forEach((k) => {
        Object.keys(newProps[k]).forEach((kk) => {
            props[k][kk] = newProps[k][kk];
        });
    });
}
window.onload = init;

// 100コミット