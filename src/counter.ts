import { Context } from "./main";

export default class Counter {
	private readonly durationMs: number;
	private remainingMs: number;

	private readonly w: number;

	constructor(
		durationSeconds: number,
	) {
		this.w = 40;
		this.durationMs = durationSeconds * 1000;
		this.remainingMs = this.durationMs;
	}

	get percentage(): number {
		return (this.remainingMs / this.durationMs) * 100;
	}

	tick(dt: number) {
		this.remainingMs -= dt;
	}

	draw(context: Context) {
		const startY = context.canvas.height - 22;

		context.fillStyle = "black";
		context.fillRect(20, startY, 100, 20);
		context.fillStyle = "yellow";
		context.fillRect(20, startY, this.percentage, 20);
	}
}
