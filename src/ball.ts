import { Rect, Vec2 } from "./commonTypes";
import { Context } from "./main";

const DEFAULT_RADIUS = 20;

export type CollisionResult = Vec2;

class Ball {
	public r: number = DEFAULT_RADIUS;
	protected r2: number = Math.pow(DEFAULT_RADIUS, 2);
	position: Vec2 = { x: 300, y: 200 };
	velocity: Vec2 = { x: 0, y: 3 };

	constructor(protected readonly ctx: Context) { }

	draw() {
		this.ctx.fillStyle = "grey";
		this.ctx.beginPath();
		this.ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
		this.ctx.fill();
	}

	checkCollision(rect: Rect): CollisionResult | null {
		let dist = {
			x: Math.abs(this.position.x - rect.position.x),
			y: Math.abs(this.position.y - rect.position.y),
		};

		const min_dis_x = rect.w / 2 + this.r;
		const min_dis_y = rect.h / 2 + this.r;

		if (dist.x > min_dis_x || dist.y > min_dis_y) {
			return null;
		}

		if (dist.x <= rect.w / 2 || dist.y <= rect.h / 2) {
			return {
				x: dist.x - min_dis_x,
				y: dist.y - min_dis_y,
			};
		}

		let cornerDistance_sq =
			Math.pow(dist.x - rect.w / 2, 2) + Math.pow(dist.y - rect.h / 2, 2);

		if (cornerDistance_sq > this.r2) {
			return null;
		}

		return { x: dist.x, y: dist.y, };
	}

	move() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		if (this.position.x + this.r > this.ctx.width) {
			this.position.x = this.ctx.width - this.r;
			this.velocity.x *= -1;
		}
		if (this.position.x - this.r < 0) {
			this.position.x = this.r;
			this.velocity.x *= -1;
		}
		if (this.position.y - this.r < 0) {
			this.velocity.y *= -1;
		}
	}
}

export default Ball;
