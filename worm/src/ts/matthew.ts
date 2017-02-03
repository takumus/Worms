export default class Matthew {
	public static PI:number = Math.PI;
	public static H_PI:number = Math.PI / 2;
	public static D_PI:number = Math.PI * 2;

	public static normalize(r:number):number {
		r = r % this.D_PI;
		if (r < 0) return this.D_PI + r;
		return r;
	}
	
	public static abs(v:number):number {
		return v < 0 ? -v : v;
	}
}