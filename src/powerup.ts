import Ball from "./ball";
import { Context } from "./main";

export type PowerupType = "enlarge" | "shrink" | "slower" | "faster";

export default class Powerup extends Ball {
	private fallspeed: number;
	public readonly type: PowerupType;

	constructor(ctx: Context, x: number, y: number) {
		super(ctx);
		this.position.x = x;
		this.position.y = y;

		this.fallspeed = Math.random() * 6 - 3;

		let t = Math.random();
		if (t < 0.15) this.type = "enlarge";
		else if (t < 0.3) this.type = "shrink";
		else if (t < 0.6) this.type = "slower";
		else this.type = "faster";
	}

	draw() {
		this.ctx.fillStyle = "rgb(123,43,255)";
		this.ctx.beginPath();
		this.ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
		this.ctx.fill();
	}

	move() {
		this.position.y += this.fallspeed;
	}
}
