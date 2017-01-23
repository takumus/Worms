/**
 * Created by takumus on 2017/01/23.
 */
package {
    public class Circle{
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
}
