/**
 * Created by takumus on 2017/01/19.
 */
package routes {
    public class Matthew {
        public static const PI:Number = Math.PI;
        public static const H_PI:Number = Math.PI/2;
        public static const D_PI:Number = Math.PI*2;
        public function Matthew() {
        }
        public static function normalize(r:Number):Number{
            r = r%(D_PI);
            if(r < 0) return D_PI + r;
            return r;
        }
        public static function abs(v:Number):Number{
            return v<0?-v:v;
        }
    }
}
