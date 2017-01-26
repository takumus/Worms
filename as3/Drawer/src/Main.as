package {
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	[SWF(frameRate="60")]
    public class Main extends Sprite {
        private var drawing:Boolean;
		private var forceMode:Boolean;
        private var prevPoint:Point;
        private var sketch:BitmapData;
        private var sketchBitmap:Bitmap;
		private var canvas:Shape;
		private var lines:Vector.<Vector.<Point>>;
		private var nowPoint:Point;
		private var nowId:int;
        public function Main() {
			stage.align = StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
            this.stage.addEventListener(MouseEvent.MOUSE_DOWN, begin);
            this.stage.addEventListener(Event.ENTER_FRAME, loop);
			this.stage.addEventListener(MouseEvent.RIGHT_MOUSE_DOWN, rightMouseDown);
			this.stage.addEventListener(MouseEvent.RIGHT_MOUSE_UP, rightMouseUp);
			this.stage.addEventListener(KeyboardEvent.KEY_DOWN, showData);
			var s:Sketch = new Sketch();
			drawing = false;
            prevPoint = new Point(0, 0);
			nowPoint = new Point(0, 0);
            sketch = new BitmapData(s.width*1.5, s.height*1.5, false, 0xffffff);
            sketchBitmap = new Bitmap(sketch);
			canvas = new Shape();
			sketch.draw(s);
			this.addChild(sketchBitmap);
			this.addChild(canvas);
			stage.stageWidth = sketch.width;
			stage.stageHeight = sketch.height;
			lines = new Vector.<Vector.<Point>>();
			nowId = -1;
        }
        private function begin(e:MouseEvent):void{
            this.drawing = !drawing;
			if(this.drawing && nowPoint) {
				lines.push(new Vector.<Point>());
				nowId++;
				lines[nowId].push(nowPoint.clone());
				prevPoint = nowPoint.clone();
			}
        }
        private function loop(e:Event):void{
			canvas.graphics.clear();
			canvas.graphics.lineStyle(1, drawing?0x0000ff:0x00ff00);
			canvas.graphics.drawCircle(mouseX, mouseY, 30);
			canvas.graphics.lineStyle(1, 0xff0000);
			if(!drawing) {
				nowPoint = findFit(new Point(mouseX, mouseY), 30);
				if (nowPoint) {
					canvas.graphics.drawCircle(nowPoint.x, nowPoint.y, 5);
				}
			}else{
				if(forceMode){
					nowPoint.x = mouseX;
					nowPoint.y = mouseY;
					canvas.graphics.lineStyle(1, 0x00ff00);
					canvas.graphics.drawCircle(nowPoint.x, nowPoint.y, 5);
				}else {
					var r:Number = Math.atan2(mouseY - prevPoint.y, mouseX - prevPoint.x);
					var br:Number = r - Math.PI / 4;
					var er:Number = r + Math.PI / 4;
					var p:Point = findFitByRadius(prevPoint, 20, br, er);
					if (p) {
						var tx:Number = p.x - mouseX;
						var ty:Number = p.y - mouseY;
						if (p) {
							canvas.graphics.lineStyle(1, 0x00ff00);
							canvas.graphics.drawCircle(p.x, p.y, 5);
							if (Math.sqrt(tx * tx + ty * ty) < 5) {
								lines[nowId].push(p.clone());
								prevPoint = p.clone();
							}
						}
					}
				}
			}
			var minPos:Point = new Point(Number.MAX_VALUE, Number.MAX_VALUE);
			var maxPos:Point = new Point(Number.MIN_VALUE, Number.MIN_VALUE);
			for(var i:int = 0; i < lines.length; i ++){
				canvas.graphics.lineStyle(3, 0xff0000);
				for(var ii:int = 0; ii < lines[i].length; ii++){
					var x:Number = lines[i][ii].x;
					var y:Number = lines[i][ii].y;
					if(ii == 0){
						canvas.graphics.moveTo(x, y);
					}else{
						canvas.graphics.lineTo(x, y);
					}
					if(minPos.x > x) minPos.x = x;
					if(minPos.y > y) minPos.y = y;
					if(maxPos.x < x) maxPos.x = x;
					if(maxPos.y < y) maxPos.y = y;
				}
			}
			canvas.graphics.lineStyle(1, 0x00ff00);
			canvas.graphics.drawRect(minPos.x, minPos.y, maxPos.x - minPos.x, maxPos.y - minPos.y);
        }
		private function showData(e:*):void{
			
		}
		private function rightMouseDown(e:MouseEvent):void{
			if(!drawing){
				return;
			}
			forceMode = true;
		}
		private function rightMouseUp(e:MouseEvent):void{
			if(!drawing){
				return;
			}
			forceMode = false;
			lines[nowId].push(nowPoint.clone());
			prevPoint = nowPoint.clone();
		}
		private function findFit(basePoint:Point, maxR:Number):Point{
			for(var r:Number = 1; r < maxR; r++){
                var p:Point = findFitByRadius(basePoint, r);
                if(p) return p;
			}
            return null;
		}
        private function findFitByRadius(basePoint:Point, r:Number, br:Number = 0, er:Number = Math.PI*2):Point{
            var res:Number = 1;
            var rres:Number = res/(r*2*Math.PI)*Math.PI*2;
            var pColor:int = -1;
            for(var i:Number = br; i < er; i += rres){
                var x:Number = basePoint.x + Math.cos(i)*r;
                var y:Number = basePoint.y + Math.sin(i)*r;
				var color:uint = sketch.getPixel(x, y);
                if(pColor < 0)pColor = color;
                if(pColor != color) return new Point(x, y);
            }
            return null;
        }
    }
}
