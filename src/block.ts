import { Rect, Vec2 } from "./commonTypes";
import { Context } from "./main";

export default class Block implements Rect {
	lives: number;
	hasPowerUp: boolean;

	constructor(
		private ctx: Context,
		public readonly position: Vec2,
		public readonly w: number,
		public readonly h: number
	) {
		this.ctx = ctx;

		this.lives = Math.round(Math.random() * 2) + 2;

		this.hasPowerUp = Math.random() < 0.1;
	}

	draw(_dt: number) {
		if (this.hasPowerUp) this.ctx.fillStyle = "rgb(128,128,255)";
		else this.ctx.fillStyle = `rgb(0,${Math.round(255 / this.lives)},20)`;

		this.ctx.fillRect(
			this.position.x - this.w / 2,
			this.position.y - this.h / 2,
			this.w,
			this.h,
		);
	}

	loseLife(): boolean {
		this.lives--;
		return this.lives <= 0;
	}
}
