import { Rect, Vec2 } from "./commonTypes";
import { Context } from "./main";
import Powerup from "./powerup";

export default class Block implements Rect {
	private hp: number;

	public readonly powerup: Powerup | null;

	constructor(
		public readonly position: Vec2,
		public readonly w: number,
		public readonly h: number
	) {
		this.hp = Math.round(Math.random() * 2) + 2;

		if (Math.random() < 0.1) {
			this.powerup = new Powerup({ ...this.position });
		}
	}

	draw(ctx: Context) {
		if (this.powerup) ctx.fillStyle = "rgb(128,128,255)";
		else ctx.fillStyle = `rgb(0,${Math.round(255 / this.hp)},20)`;

		ctx.fillRect(
			this.position.x - this.w / 2,
			this.position.y - this.h / 2,
			this.w,
			this.h,
		);
	}

	loseHp(): void {
		this.hp--;
	}

	isNotBroken(): boolean {
		return this.hp > 0;
	}
}
