package {

    import flash.display.Sprite;
    import flash.events.MouseEvent;
    import flash.text.TextField;

    public class Main extends Sprite {
        public function Main() {
            var textField:TextField = new TextField();
            textField.text = "Hello, World";
            addChild(textField);
            var px:Number = 0;
            var py:Number = 0;
            this.stage.addEventListener(MouseEvent.MOUSE_MOVE, function(e:MouseEvent):void{
                if(Math.abs(px-mouseX) + Math.abs(py-mouseY) < 10) return;
                graphics.clear();
                graphics.lineStyle(1);
                var r:Number = Math.atan2(mouseY - py, mouseX - px);
                px = mouseX;
                py = mouseY;
                var routes:Vector.<Route> = getAllRoute(new VecPos(mouseX, mouseY, r), new VecPos(200, 150, Math.PI), 50, 50, 10);
                for(var i:int = 0; i < routes.length; i ++){
                    var route:Route = routes[i];
                    
                }
            });
        }
        private function getAllRoute(vposB:VecPos, vposE:VecPos, rB:Number, rE:Number, res:Number):Vector.<Route>{
            var cB1:Circle;
            var cB2:Circle;
            var cE1:Circle;
            var cE2:Circle;

            var tx:Number;
            var ty:Number;
            var tr:Number;
            this.graphics.lineStyle(1, 0xff0000);
            tx = Math.cos(vposB.r + Math.PI/2) * rB + vposB.x;
            ty = Math.sin(vposB.r + Math.PI/2) * rB + vposB.y;
            cB1 = new Circle(tx, ty, rB, 1, vposB.r - Math.PI/2);
            tx = Math.cos(vposB.r - Math.PI/2) * rB + vposB.x;
            ty = Math.sin(vposB.r - Math.PI/2) * rB + vposB.y;
            cB2 = new Circle(tx, ty, rB, -1, vposB.r + Math.PI/2);

            tx = Math.cos(vposE.r + Math.PI/2) * rE + vposE.x;
            ty = Math.sin(vposE.r + Math.PI/2) * rE + vposE.y;
            cE1 = new Circle(tx, ty, rE, 1, vposE.r - Math.PI/2);
            tx = Math.cos(vposE.r - Math.PI/2) * rE + vposE.x;
            ty = Math.sin(vposE.r - Math.PI/2) * rE + vposE.y;
            cE2 = new Circle(tx, ty, rE, -1, vposE.r + Math.PI/2);
            var routes:Vector.<Route> = new Vector.<Route>();
            routes.push(getRoute(cB1, cE1, res));
            routes.push(getRoute(cB1, cE2, res));
            routes.push(getRoute(cB2, cE1, res));
            routes.push(getRoute(cB2, cE2, res));
            return routes;
        }
        private function getRoute(c1:Circle, c2:Circle, res:Number):Route{
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
                    c2r = c1r = Utils.normalize(r+br);
                    line(a1.x, a1.y, b1.x, b1.y);
                }else{
                    c2r = c1r = Utils.normalize(-r+br);
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
                    c1r = Utils.normalize(r + br);
                    c2r = Utils.normalize(r + br + Math.PI);
                    line(a1.x, a1.y, b1.x, b1.y);
                }else{
                    c1r = Utils.normalize(-r+br);
                    c2r = Utils.normalize(-r+br+Math.PI);
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
                    c1dr = Math.PI*2 - (c1.tr - c1r);
                }
            }else{
                if(c1.tr < c1r){
                    c1dr = Math.PI*2 - (c1r - c1.tr);
                }else{
                    c1dr = c1.tr - c1r;
                }
            }
            if(c2.d > 0){
                if(c2r < c2.tr){
                    c2dr = c2.tr - c2r;
                }else{
                    c2dr = Math.PI*2 - (c2r - c2.tr);
                }
            }else{
                if(c2r < c2.tr){
                    c2dr = Math.PI*2 - (c2.tr - c2r);
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

class Circle{
    public var pos:Pos;
    public var r:Number;
    public var d:int;
    public var tr:Number;
    public function Circle(x:Number, y:Number, r:Number, d:int, tr:Number){
        this.pos = new Pos(x, y);
        this.r = r;
        this.d = d;
        this.tr = Utils.normalize(tr);
    }
}
class Pos{
    public var x = 0;
    public var y = 0;
    public function Pos(x:Number = 0, y:Number = 0){
        this.x = x;
        this.y = y;
    }
}
class VecPos{
    public var x = 0;
    public var y = 0;
    public var r = 0;
    public function VecPos(x:Number = 0, y:Number = 0, r:Number = 0){
        this.x = x;
        this.y = y;
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
    public function generateRoute(res:Number, route:Vector.<Pos> = null):Vector.<Pos>{
        var _route:Vector.<Pos>;
        if(route){
            _route = route;
        }else{
            _route = new Vector.<Pos>();
        }
        var c1rres:Number = res / (c1.r*2 * Math.PI) * Math.PI*2;
        var c2rres:Number = res / (c2.r*2 * Math.PI) * Math.PI*2;
        for(var _r:Number = 0; _r < Math.abs(c1rl); _r+=c1rres){
            var _x:Number = Math.cos(c1rb+_r*c1.d) * c1.r + c1.pos.x;
            var _y:Number = Math.sin(c1rb+_r*c1.d) * c1.r + c1.pos.y;
            _route.push(new Pos(_x, _y));
        }
        getLineRoot(
                new Pos(_x, _y),
                new Pos(
                        Math.cos(c2rb) * c2.r + c2.pos.x,
                        Math.sin(c2rb) * c2.r + c2.pos.y
                ),
                res,
                _route
        );
        for(_r = 0; _r < Math.abs(c2rl) - c2rres; _r+=c2rres){
            var _x:Number = Math.cos(c2rb+_r*c2.d) * c2.r + c2.pos.x;
            var _y:Number = Math.sin(c2rb+_r*c2.d) * c2.r + c2.pos.y;
            _route.push(new Pos(_x, _y));
        }
        _route.push(
                new Pos(
                        Math.cos(c2rb+c2rl*c2.d) * c2.r + c2.pos.x,
                        Math.sin(c2rb+c2rl*c2.d) * c2.r + c2.pos.y
                )
        );
        return _route;
    }
    public function get length():uint{
        var t1x:Number, t1y:Number;
        var t2x:Number, t2y:Number;
        var dx:Number, dy:Number;
        var l:Number = 0;
        l += c1.r*2*Math.PI*(Math.abs(c1rl)/(Math.PI*2));
        l += c2.r*2*Math.PI*(Math.abs(c2rl)/(Math.PI*2));
        t1x = Math.cos(c1rb + c1rl)*c1.r + c1.pos.x;
        t1y = Math.sin(c1rb + c1rl)*c1.r + c1.pos.y;
        t2x = Math.cos(c2rb)*c2.r + c2.pos.x;
        t2y = Math.sin(c2rb)*c2.r + c2.pos.y;
        dx = t1x-t2x;
        dy = t1y-t2y;
        l += Math.sqrt(dx*dx + dy*dy);
        return l;
    }
    private function getLineRoot(bp:Pos, ep:Pos, res:Number, vector:Vector.<Pos>):void{
        var tx:Number = ep.x - bp.x;
        var ty:Number = ep.y - bp.y;
        var r:Number = Math.atan2(ty, tx);
        var dx:Number = Math.cos(r) * res;
        var dy:Number = Math.sin(r) * res;
        var l:Number = Math.sqrt(tx*tx+ty*ty) - res;
        for(var i:int = 1; i < l/res; i ++){
            var x:Number = dx * i + bp.x;
            var y:Number = dy * i + bp.y;
            vector.push(new Pos(x, y));
        }
    }
}