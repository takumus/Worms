package {

    import flash.display.Sprite;
import flash.events.MouseEvent;
import flash.text.TextField;

    public class Main extends Sprite {
        public function Main() {
            var textField:TextField = new TextField();
            textField.text = "Hello, World";
            addChild(textField);
            //getRoute(new Circle(50, 200, 80, -1, Math.PI), new Circle(200, 80, 30, -1, Math.PI));
            //getRoute(new Circle(50, 200, 80, -1, Math.PI), new Circle(200, 80, 30, 1, Math.PI));
            this.stage.addEventListener(MouseEvent.MOUSE_MOVE, function(e:MouseEvent):void{
                graphics.clear();
                graphics.lineStyle(1);
                getRoute(new Circle(mouseX, mouseY, 80, 1, 0), new Circle(200, 80, 30, 1, Math.PI));
            });
        }
        private function getRoute(c1:Circle, c2:Circle){
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
                if (D < 0) return;
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
                if(D < 0) return;
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
            this.graphics.lineStyle(3, 0xff0000);
            for(var _r:Number = 0; _r < Math.abs(c1dr); _r+=0.1){
                var _x:Number = Math.cos(c1.tr+_r*c1.d) * c1.r + c1.pos.x;
                var _y:Number = Math.sin(c1.tr+_r*c1.d) * c1.r + c1.pos.y;
                if(_r == 0){
                    this.graphics.moveTo(_x, _y);
                }else{
                    this.graphics.lineTo(_x, _y);
                }
            }
            for(_r = 0; _r < Math.abs(c2dr); _r+=0.1){
                var _x:Number = Math.cos(c2r+_r*c2.d) * c2.r + c2.pos.x;
                var _y:Number = Math.sin(c2r+_r*c2.d) * c2.r + c2.pos.y;
                this.graphics.lineTo(_x, _y);
            }
            this.graphics.lineStyle(1, 0);
            circle(c1.pos.x, c1.pos.y, 2);
            circle(c2.pos.x, c2.pos.y, 2);
            circle(c1.pos.x, c1.pos.y, c1.r);
            circle(c2.pos.x, c2.pos.y, c2.r);
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