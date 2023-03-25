import { Rect, Vec2 } from "./commonTypes";
import { Context } from "./main";
import { PowerupType } from "./powerup";

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
		this.velocity = 0;


		/**
		 * TODO: clear all these events
		 */
		document.addEventListener('keydown', e => {
			const isLeft = (e.key == 'a' || e.key == 'ArrowLeft');
			const isRight = (e.key == 'd' || e.key == 'ArrowRight');

			if (isLeft) this.velocity = -this.speed;
			if (isRight) this.velocity = this.speed;
		});

		document.addEventListener('keyup', e => {
			const isLeft = (e.key == 'a' || e.key == 'ArrowLeft');
			const isRight = (e.key == 'd' || e.key == 'ArrowRight');

			if (isLeft && this.velocity == -this.speed) {
				this.velocity = 0;
			} else if (isRight && this.velocity == this.speed) {
				this.velocity = 0;
			}
		});
	}

	draw() {
		this.ctx.fillStyle = "blue";
		this.ctx.fillRect(this.position.x - this.w / 2, this.position.y - this.h / 2, this.w, this.h);
	}

	move() {
		this.position.x += this.velocity;
	}


	getPowerup(type: PowerupType) {
		if (type == 'enlarge') {
			this.w *= 2;
			setTimeout(() => this.w /= 2, 15 * 1000);
		}
		else if (type == 'shrink') {
			this.w /= 2;
			setTimeout(() => this.w *= 2, 10 * 1000);
		}
		else if (type == 'slower') {
			this.speed /= 2;
			setTimeout(() => this.speed *= 2, 10 * 1000);
		}
		else if (type == 'faster') {
			this.speed *= 1.5;
			setTimeout(() => this.speed /= 1.5, 10 * 1000);
		}
	}
}
