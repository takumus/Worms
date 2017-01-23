/**
 * Created by takumus on 2017/01/23.
 */
package routes {
    public class VecPos{
        public var pos:Pos;
        public var r = 0;
        public function VecPos(x:Number = 0, y:Number = 0, r:Number = 0){
            this.pos = new Pos(x, y);
            this.r = r;
        }
    }
}
