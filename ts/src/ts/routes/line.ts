import {Circle, Pos, VecPos} from '../utils';
import Matthew from '../matthew';
export default class Line{
	protected data:Array<Pos>;
	private length:number;
	constructor(data:Array<Pos> = []){
		this.data = data;
		this.length = this.data.length;
	}
	public reverse():void{
		this.data.reverse();
	}
	public getHeadVecPos():VecPos{
		const fp = this.at(0);
		const sp = this.at(1);
		const dx = sp.x - fp.x;
		const dy = sp.y - fp.y;
		return new VecPos(
			fp.x - dx,
			fp.y - dy,
			Math.atan2(dy, dx)
		);
	}
	public at(id:number):Pos{
		return this.data[id];
	}
	public push(pos:Pos):void{
		this.data.push(pos);
		this.length = this.data.length;
	}
	public pop():Pos{
		return this.data.pop();
	}
	public pushLine(line:Line):Line{
		this.data = this.data.concat(line.data);
		this.length = this.data.length;
		return this;
	}
	public getLength():number{
		return this.length;
	}
	public clone():Line{
		const data:Array<Pos> = [];
		for(let i = 0; i < this.length; i ++){
			data.push(data[i].clone());
		}
		return new Line(data);
	}
}