import { Rect, Vec2 } from "./commonTypes";
import { Context } from "./main";

const DEFAULT_RADIUS = 20;

class Ball {
	public r: number = DEFAULT_RADIUS;
	protected rSquared: number = Math.pow(DEFAULT_RADIUS, 2);
	position: Vec2 = { x: 300, y: 200 };
	velocity: Vec2 = { x: 0, y: 3 };

	draw(ctx: Context): void {
		ctx.fillStyle = "grey";
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
		ctx.fill();
	}

	checkCollision(rect: Rect): Vec2 | null {
		let dist: Vec2 = {
			x: Math.abs(this.position.x - rect.position.x),
			y: Math.abs(this.position.y - rect.position.y),
		};

		const minDistX = rect.w / 2 + this.r;
		const minDistY = rect.h / 2 + this.r;

		if (dist.x > minDistX || dist.y > minDistY) {
			return null;
		}

		if (dist.x <= rect.w / 2 || dist.y <= rect.h / 2) {
			return {
				x: dist.x - minDistX,
				y: dist.y - minDistY,
			};
		}

		let cornerDistance_sq =
			Math.pow(dist.x - rect.w / 2, 2) + Math.pow(dist.y - rect.h / 2, 2);

		if (cornerDistance_sq > this.rSquared) {
			return null;
		}

		return dist;
	}

	move(constraints: Vec2) {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		// Bounce on right
		if (this.position.x + this.r >= constraints.x) {
			this.position.x = constraints.y - this.r;
			this.bounceX();
		}

		// Bounce on left
		if (this.position.x - this.r <= 0) {
			this.position.x = this.r;
			this.bounceX();
		}

		// Bounce on top
		if (this.position.y - this.r <= 0) {
			this.bounceY();
		}
	}

	bounceX(): void { this.velocity.x *= -1; }
	bounceY(): void { this.velocity.y *= -1; }
}

export default Ball;
