import { Context } from "./main";

export default class Counter {
	remaining: number;
	w: number;

	constructor(
		private readonly ctx: Context,
		private readonly duration: number,
	) {
		this.w = 40;
		this.remaining = this.duration;
	}

	draw(dt: number) {
		this.remaining -= dt;

		this.ctx.fillStyle = "black";
		this.ctx.fillRect(20, this.ctx.height - 22, 100, 20);
		this.ctx.fillStyle = "yellow";
		this.ctx.fillRect(
			20,
			this.ctx.height - 22,
			(this.remaining / this.duration) * 100,
			20,
		);
	}
}
