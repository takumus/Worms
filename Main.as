package {

    import flash.display.Sprite;
    import flash.display.StageAlign;
    import flash.display.StageScaleMode;
import flash.events.Event;
import flash.events.MouseEvent;
    import flash.text.TextField;
    [SWF(backgroundColor="0", frameRate="60")]
    public class Main extends Sprite {
        public function Main() {
            stage.align = StageAlign.TOP_LEFT;
            stage.scaleMode = StageScaleMode.NO_SCALE;
            var textField:TextField = new TextField();
            textField.text = "Hello, World";
            addChild(textField);
            var px:Number = 0;
            var py:Number = 0;
            var a1:Arrow = new Arrow(50, 0xffff00);
            var a2:Arrow = new Arrow(50, 0x00ffff);
            var a3:Arrow = new Arrow(50, 0xff00ff);
            this.addChild(a1);
            this.addChild(a2);
            this.addChild(a3);
            var n:int = 0;
            this.stage.addEventListener(MouseEvent.CLICK, function(e:MouseEvent):void{
               n = 0;
            });
            this.stage.addEventListener(Event.ENTER_FRAME, function(e:Event):void{
                a2.x = stage.stageWidth/2;
                a2.y = stage.stageHeight/2;
                //a2.rotation ++;
                if(Matthew.abs(px-mouseX) + Matthew.abs(py-mouseY) < 3) return;
                graphics.clear();
                graphics.lineStyle(1,0x666666);
                var tr:Number = Math.atan2(mouseY - a1.y, mouseX - a1.x);
                a1.x = mouseX - Math.cos(tr)*a1.length;
                a1.y = mouseY - Math.sin(tr)*a1.length;
                a1.rotation = tr/Matthew.PI*180;
                var routes:Vector.<Route> = getAllRoute(
                        new VecPos(a1.x, a1.y, tr),
                        new VecPos(a2.x, a2.y, a2.rotation/180*Math.PI),
                        60,
                        80
                );
                graphics.lineStyle();
                var colors:Array =[
                        0xff0000,
                        0x00ff00,
                        0x00ffff,
                        0xffff00
                ];
                var minLength:uint = int.MAX_VALUE;
                var route:Route;
                for(var i:int = 0; i < routes.length; i ++){
                    if(minLength > routes[i].length){
                        minLength = routes[i].length;
                        route = routes[i];
                    }
                    var r:Vector.<VecPos> = routes[i].generateRoute(1);
                    //trace(r.length);
                    graphics.lineStyle(3, 0x0000ff, 0.3);
                    for(var ii:int = 0; ii < r.length; ii++){
                        var vpos:VecPos = r[ii];
                        if(ii == 0){
                            graphics.moveTo(vpos.pos.x, vpos.pos.y);
                        }else{
                            graphics.lineTo(vpos.pos.x, vpos.pos.y);
                        }
                    }
                }
                var r:Vector.<VecPos> = route.generateRoute(1);
                //trace(r.length);
                graphics.lineStyle(3, 0xff0000);
                for(var ii:int = 0; ii < r.length; ii++){
                    var vpos:VecPos = r[ii];
                    if(ii == 0){
                        graphics.moveTo(vpos.pos.x, vpos.pos.y);
                    }else{
                        graphics.lineTo(vpos.pos.x, vpos.pos.y);
                    }
                }
                if(n < r.length){
                    if(n >= 0){
                        a3.x =r[n].pos.x;
                        a3.y =r[n].pos.y;
                        a3.rotation = r[n].r/Math.PI*180;
                        n+=4;
                    }
                }else{
                    n = r.length - 1;
                    a3.x =r[n].pos.x;
                    a3.y =r[n].pos.y;
                    a3.rotation = r[n].r/Math.PI*180;
                    n = -1;
                }
            });
        }
        private function getAllRoute(vposB:VecPos, vposE:VecPos, rB:Number, rE:Number):Vector.<Route>{
            var cB1:Circle;
            var cB2:Circle;
            var cE1:Circle;
            var cE2:Circle;

            var tx:Number;
            var ty:Number;
            var tr:Number;
            tx = Math.cos(vposB.r + Matthew.H_PI) * rB + vposB.pos.x;
            ty = Math.sin(vposB.r + Matthew.H_PI) * rB + vposB.pos.y;
            cB1 = new Circle(tx, ty, rB, 1, vposB.r - Matthew.H_PI);
            tx = Math.cos(vposB.r - Matthew.H_PI) * rB + vposB.pos.x;
            ty = Math.sin(vposB.r - Matthew.H_PI) * rB + vposB.pos.y;
            cB2 = new Circle(tx, ty, rB, -1, vposB.r + Matthew.H_PI);

            tx = Math.cos(vposE.r + Matthew.H_PI) * rE + vposE.pos.x;
            ty = Math.sin(vposE.r + Matthew.H_PI) * rE + vposE.pos.y;
            cE1 = new Circle(tx, ty, rE, 1, vposE.r - Matthew.H_PI);
            tx = Math.cos(vposE.r - Matthew.H_PI) * rE + vposE.pos.x;
            ty = Math.sin(vposE.r - Matthew.H_PI) * rE + vposE.pos.y;
            cE2 = new Circle(tx, ty, rE, -1, vposE.r + Matthew.H_PI);
            var routes:Vector.<Route> = new Vector.<Route>();
            var route:Route;
            route = getRoute(cB1, cE1);
            if(route) routes.push(route);
            route = getRoute(cB1, cE2);
            if(route) routes.push(route);
            route = getRoute(cB2, cE1);
            if(route) routes.push(route);
            route = getRoute(cB2, cE2);
            if(route) routes.push(route);
            return routes;
        }
        private function getRoute(c1:Circle, c2:Circle):Route{
            var dx:Number = c2.pos.x - c1.pos.x;
            var dy:Number = c2.pos.y - c1.pos.y;
            var l:Number = dx * dx + dy * dy;
            var a1 = new Pos(),a2 = new Pos(),b1 = new Pos(),b2 = new Pos();
            var br:Number = Math.atan2(c2.pos.y - c1.pos.y, c2.pos.x - c1.pos.x);
            var r:Number;
            var D:Number;
            var c1tr:Number = c1.tr;
            var c2tr:Number = c2.tr;
            var c1r:Number;
            var c2r:Number;
            var c1dr:Number;
            var c2dr:Number;
            circle(c1.pos.x+Math.cos(c1tr)*c1.r, c1.pos.y+Math.sin(c1tr)*c1.r, 3);
            circle(c2.pos.x+Math.cos(c2tr)*c2.r, c2.pos.y+Math.sin(c2tr)*c2.r, 3);

            if(c1.d == c2.d){
                D = l - (c2.r - c1.r) * (c2.r - c1.r);
                if (D < 0) return null;
                D = Math.sqrt(D);
                a1.x = c1.r * ((c1.r - c2.r) * dx + D * dy) / l + c1.pos.x;
                a1.y = c1.r * ((c1.r - c2.r) * dy - D * dx) / l + c1.pos.y;
                a2.x = c1.r * ((c1.r - c2.r) * dx - D * dy) / l + c1.pos.x;
                a2.y = c1.r * ((c1.r - c2.r) * dy + D * dx) / l + c1.pos.y;
                b1.x = c2.r * ((c2.r - c1.r) * -dx - D * -dy) / l + c2.pos.x;
                b1.y = c2.r * ((c2.r - c1.r) * -dy + D * -dx) / l + c2.pos.y;
                b2.x = c2.r * ((c2.r - c1.r) * -dx + D * -dy) / l + c2.pos.x;
                b2.y = c2.r * ((c2.r - c1.r) * -dy - D * -dx) / l + c2.pos.y;

                r = Math.atan2(a1.y - c1.pos.y, a1.x - c1.pos.x) - br;
                if(c1.d > 0){
                    c2r = c1r = Matthew.normalize(r+br);
                    line(a1.x, a1.y, b1.x, b1.y);
                }else{
                    c2r = c1r = Matthew.normalize(-r+br);
                    line(a2.x, a2.y, b2.x, b2.y);
                }
                line(
                        c1.pos.x,
                        c1.pos.y,
                        Math.cos(c1r)*c1.r+c1.pos.x,
                        Math.sin(c1r)*c1.r+c1.pos.y
                );
                line(
                        c2.pos.x,
                        c2.pos.y,
                        Math.cos(c2r)*c2.r+c2.pos.x,
                        Math.sin(c2r)*c2.r+c2.pos.y
                );
            }else if(c1.d != c2.d){
                D = l - (c2.r + c1.r) * (c2.r + c1.r);
                if(D < 0) return null;
                D = Math.sqrt(D);
                a1.x = c1.r * ((c2.r + c1.r) * dx + D * dy) / l + c1.pos.x;
                a1.y = c1.r * ((c2.r + c1.r) * dy - D * dx) / l + c1.pos.y;
                a2.x = c1.r * ((c2.r + c1.r) * dx - D * dy) / l + c1.pos.x;
                a2.y = c1.r * ((c2.r + c1.r) * dy + D * dx) / l + c1.pos.y;
                b1.x = c2.r * ((c1.r + c2.r) * -dx + D * -dy) / l + c2.pos.x;
                b1.y = c2.r * ((c1.r + c2.r) * -dy - D * -dx) / l + c2.pos.y;
                b2.x = c2.r * ((c1.r + c2.r) * -dx - D * -dy) / l + c2.pos.x;
                b2.y = c2.r * ((c1.r + c2.r) * -dy + D * -dx) / l + c2.pos.y;

                r = Math.atan2(a1.y - c1.pos.y, a1.x - c1.pos.x) - br;
                if(c1.d > 0) {
                    c1r = Matthew.normalize(r + br);
                    c2r = Matthew.normalize(r + br + Matthew.PI);
                    line(a1.x, a1.y, b1.x, b1.y);
                }else{
                    c1r = Matthew.normalize(-r+br);
                    c2r = Matthew.normalize(-r+br+Matthew.PI);
                    line(a2.x, a2.y, b2.x, b2.y);
                }
                line(
                        c1.pos.x,
                        c1.pos.y,
                        Math.cos(c1r)*c1.r+c1.pos.x,
                        Math.sin(c1r)*c1.r+c1.pos.y
                );
                line(
                        c2.pos.x,
                        c2.pos.y,
                        Math.cos(c2r)*c2.r+c2.pos.x,
                        Math.sin(c2r)*c2.r+c2.pos.y
                );
            }
            if(c1.d > 0){
                if(c1.tr < c1r){
                    c1dr = c1r - c1.tr;
                }else{
                    c1dr = Matthew.D_PI - (c1.tr - c1r);
                }
            }else{
                if(c1.tr < c1r){
                    c1dr = Matthew.D_PI - (c1r - c1.tr);
                }else{
                    c1dr = c1.tr - c1r;
                }
            }
            if(c2.d > 0){
                if(c2r < c2.tr){
                    c2dr = c2.tr - c2r;
                }else{
                    c2dr = Matthew.D_PI - (c2r - c2.tr);
                }
            }else{
                if(c2r < c2.tr){
                    c2dr = Matthew.D_PI - (c2.tr - c2r);
                }else{
                    c2dr =  c2r - c2.tr;
                }
            }

            circle(c1.pos.x, c1.pos.y, 2);
            circle(c2.pos.x, c2.pos.y, 2);
            circle(c1.pos.x, c1.pos.y, c1.r);
            circle(c2.pos.x, c2.pos.y, c2.r);
            return new Route(c1, c2, c1.tr, c2r, c1dr*c1.d, c2dr*c2.d);
        }
        function line(x1:Number, y1:Number, x2:Number, y2:Number) {
            this.graphics.moveTo(x1, y1);
            this.graphics.lineTo(x2, y2);
        }

        function circle(x:Number, y:Number, r:Number) {
            this.graphics.drawCircle(x, y, r);
        }
    }
}

import flash.display.Shape;

class Pos{
    public var x = 0;
    public var y = 0;
    public function Pos(x:Number = 0, y:Number = 0){
        this.x = x;
        this.y = y;
    }
}
class Circle{
    public var pos:Pos;
    public var r:Number;
    public var d:int;
    public var tr:Number;
    public function Circle(x:Number, y:Number, r:Number, d:int, tr:Number){
        this.pos = new Pos(x, y);
        this.r = r;
        this.d = d;
        this.tr = Matthew.normalize(tr);
    }
}
class VecPos{
    public var pos:Pos;
    public var r = 0;
    public function VecPos(x:Number = 0, y:Number = 0, r:Number = 0){
        this.pos = new Pos(x, y);
        this.r = r;
    }
}
class Route{
    public var c1:Circle;
    public var c2:Circle;
    public var c1rb:Number;
    public var c2rb:Number;
    public var c1rl:Number;
    public var c2rl:Number;
    public function Route(c1:Circle, c2:Circle, c1rb:Number, c2rb:Number, c1rl:Number, c2rl:Number){
        this.c1 = c1;
        this.c2 = c2;
        this.c1rb = c1rb;
        this.c2rb = c2rb;
        this.c1rl = c1rl;
        this.c2rl = c2rl;
    }
    public function generateRoute(res:Number, route:Vector.<VecPos> = null):Vector.<VecPos>{
        var _route:Vector.<VecPos>;
        if(route){
            _route = route;
            _route.length = 0;
        }else{
            _route = new Vector.<VecPos>();
        }
        var c1rres:Number = res / (c1.r*2 * Matthew.PI) * Matthew.D_PI;
        var c2rres:Number = res / (c2.r*2 * Matthew.PI) * Matthew.D_PI;
        var _x:Number = Math.cos(c1rb) * c1.r + c1.pos.x;
        var _y:Number = Math.sin(c1rb) * c1.r + c1.pos.y;
        var tr:Number;
        for(var _r:Number = 0; _r < Matthew.abs(c1rl); _r+=c1rres){
            tr = c1rb+_r*c1.d;
            _x = Math.cos(tr) * c1.r + c1.pos.x;
            _y = Math.sin(tr) * c1.r + c1.pos.y;
            _route.push(new VecPos(_x, _y, tr + Matthew.H_PI * c1.d));
        }
        _route.pop();
        getLineRoot(
                new Pos(_x, _y),
                new Pos(
                        Math.cos(c2rb) * c2.r + c2.pos.x,
                        Math.sin(c2rb) * c2.r + c2.pos.y
                ),
                res,
                _route
        );
        //trace(_x, _y, Math.cos(c2rb) * c2.r + c2.pos.x, Math.sin(c2rb) * c2.r + c2.pos.y)
        for(_r = 0; _r < Matthew.abs(c2rl) - c2rres; _r+=c2rres){
            tr = c2rb+_r*c2.d;
            _x = Math.cos(tr) * c2.r + c2.pos.x;
            _y = Math.sin(tr) * c2.r + c2.pos.y;
            _route.push(new VecPos(_x, _y, tr + Matthew.H_PI * c2.d));
        }
        _route.push(
                new VecPos(
                        Math.cos(c2rb+(Matthew.abs(c2rl))*c2.d) * c2.r + c2.pos.x,
                        Math.sin(c2rb+(Matthew.abs(c2rl))*c2.d) * c2.r + c2.pos.y,
                        c2rb+Matthew.abs(c2rl)*c2.d+Matthew.H_PI*c2.d
                )
        );
        return _route;
    }
    public function get length():uint{
        var t1x:Number, t1y:Number;
        var t2x:Number, t2y:Number;
        var dx:Number, dy:Number;
        var l:Number = 0;
        l += c1.r*2*Matthew.PI*(Matthew.abs(c1rl)/(Matthew.D_PI));
        l += c2.r*2*Matthew.PI*(Matthew.abs(c2rl)/(Matthew.D_PI));
        t1x = Math.cos(c1rb + c1rl)*c1.r + c1.pos.x;
        t1y = Math.sin(c1rb + c1rl)*c1.r + c1.pos.y;
        t2x = Math.cos(c2rb)*c2.r + c2.pos.x;
        t2y = Math.sin(c2rb)*c2.r + c2.pos.y;
        dx = t1x-t2x;
        dy = t1y-t2y;
        l += Math.sqrt(dx*dx + dy*dy);
        return l;
    }
    private function getLineRoot(bp:Pos, ep:Pos, res:Number, vector:Vector.<VecPos>):void{
        var tx:Number = ep.x - bp.x;
        var ty:Number = ep.y - bp.y;
        var r:Number = Math.atan2(ty, tx);
        var dx:Number = Math.cos(r) * res;
        var dy:Number = Math.sin(r) * res;
        var l:Number = Math.sqrt(tx*tx+ty*ty) - res;
        for(var i:int = 0; i < l/res; i ++){
            var x:Number = dx * i + bp.x;
            var y:Number = dy * i + bp.y;
            vector.push(new VecPos(x, y, r));
        }
    }
}
class Arrow extends Shape{
    private var _length:Number;
    public function Arrow(length:Number, color:uint){
        this.graphics.lineStyle(3, color);
        this.graphics.drawCircle(0, 0, 3);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(length, 0);
        this.graphics.beginFill(color);
        this.graphics.moveTo(length, 0);
        this.graphics.lineTo(length-20, 10);
        this.graphics.lineTo(length-20, -10);
        this.graphics.lineTo(length, 0);
        this._length = length;
    }
    public function get length():Number{
        return this._length;
    }
}