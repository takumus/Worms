/**
 * Created by takumus on 2017/01/19.
 */
package {
    public class Utils {
        public function Utils() {
        }
        public static function normalize(r:Number):Number{
            r = r%(Math.PI*2);
            if(r < 0) return Math.PI*2 + r;
            return r;
        }
    }
}
