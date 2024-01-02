import { Rect, Vec2 } from "./commonTypes";
import { Context } from "./main";
import Powerup from "./powerup";

export default class Player implements Rect {
	public position: Vec2;
	public h: number = 25;
	public w: number = 100;
	public velocity: number = 0;
	public speed: number = 6;

	constructor(private readonly ctx: Context) {
		this.position = {
			x: this.ctx.canvas.width / 2,
			y: this.ctx.canvas.height - (20 + this.h)
		};

		document.addEventListener('keydown', e => this.onKeydown(e));
		document.addEventListener('keyup', e => this.onKeyup(e));
	}

	die(): void {
		document.removeEventListener('keydown', e => this.onKeydown(e));
		document.removeEventListener('keyup', e => this.onKeyup(e));
	}

	private onKeydown(e: KeyboardEvent): void {
		const isLeft = (e.key == 'a' || e.key == 'ArrowLeft');
		if (isLeft) this.velocity = -this.speed;

		const isRight = (e.key == 'd' || e.key == 'ArrowRight');
		if (isRight) this.velocity = this.speed;
	}

	private onKeyup(e: KeyboardEvent): void {
		const isLeft = (e.key == 'a' || e.key == 'ArrowLeft');
		const isRight = (e.key == 'd' || e.key == 'ArrowRight');

		if (isLeft && this.velocity < 0 || isRight && this.velocity > 0) {
			this.velocity = 0;
		}
	}

	draw(context: Context) {
		context.fillStyle = "blue";
		context.fillRect(this.position.x - this.w / 2, this.position.y - this.h / 2, this.w, this.h);
	}

	move() {
		this.position.x += this.velocity;
	}


	applyPowerup({ type }: Powerup) {
		if (type == 'enlarge') {
			this.w *= 2;
			setTimeout(() => this.w /= 2, 15 * 1000);
		} else if (type == 'shrink') {
			this.w /= 2;
			setTimeout(() => this.w *= 2, 10 * 1000);
		} else if (type == 'slower') {
			this.speed /= 2;
			setTimeout(() => this.speed *= 2, 10 * 1000);
		} else if (type == 'faster') {
			this.speed *= 1.5;
			setTimeout(() => this.speed /= 1.5, 10 * 1000);
		}
	}
}
