/**
 * Created by takumus on 2017/01/19.
 */
package {
    public class Matthew {
        public static const PI:Number = Math.PI;
        public static const HPI:Number = Math.PI/2;
        public static const DPI:Number = Math.PI*2;
        public function Matthew() {
        }
        public static function normalize(r:Number):Number{
            r = r%(Math.PI*2);
            if(r < 0) return Math.PI*2 + r;
            return r;
        }
        public static function abs(v:Number):Number{
            return v<0?-v:v;
        }
    }
}
