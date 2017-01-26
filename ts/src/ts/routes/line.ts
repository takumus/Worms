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
		const L = line.data.length;
		for(let i = 0; i < L; i ++){
			this.push(line.data[i].clone());
		}
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
	public wave(amp:number, freq:number):Line{
		const newData:Array<Pos> = [];
		let rad = 0;
		newData.push(this.at(0).clone());
		for(let i = 1; i < this.length  - 1; i ++){
			const p = this.at(i);
			let vx = this.at(i-1).x - p.x;
			let vy = this.at(i-1).y - p.y;
			const np = new Pos();
			const all = Math.sin(i　/　(this.length　-　1)　*　Math.PI);
			//all * allで開始、終了を極端にする。(先端への影響を少なく)
			const offset = all　*　all　*　Math.sin(rad)　*　amp;
			const vr = Math.sqrt(vx　*　vx　+　vy　*　vy);
			rad += freq;
			vx = vx / vr * offset;
			vy = vy / vr * offset;
			np.x = p.x + -vy;
			np.y = p.y + vx;
			newData.push(np);
		}
		newData.push(this.at(this.length - 1).clone());
		this.data = newData;
		return this;
	}
}