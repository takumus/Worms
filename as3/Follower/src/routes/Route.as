/**
 * Created by takumus on 2017/01/23.
 */
package routes {
    public class Route{
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
}
