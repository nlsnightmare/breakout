import Player from "./player";
import Counter from "./counter";
import Powerup from "./powerup";
import Block from "./block";
import { Vec2 } from "./commonTypes";
import Ball, { CollisionResult } from "./ball";
import { clamp, Context } from "./main";

const DELTA_TIME = 1000 / 60; // 60FPS

export class Game {
	player: Player;
	ball: Ball;
	counter: Counter | undefined;
	blocks: { [key: string]: Block };
	powerups: Powerup[];

	screenWidth: number;
	screenHeight: number;
	toRemove: any;

	constructor(private readonly context: Context) {
		this.ball = new Ball(this.context);
		this.player = new Player(this.context);

		this.powerups = [];
		this.counter = undefined;

		this.screenWidth = this.context.canvas.width;
		this.screenHeight = this.context.canvas.height;

		this.blocks = {};


		const NUM_COLUMNS = 8;
		const NUM_ROWS = 5;
		const BLOCK_WIDTH = this.screenWidth / NUM_COLUMNS * 0.95;
		const BLOCK_HEIGHT = this.screenHeight * 0.3 / NUM_ROWS * 0.95;

		const X_OFFSET = (0.5 * BLOCK_WIDTH);
		const Y_OFFSET = (0.5 * BLOCK_HEIGHT);
		for (var column = 0; column < NUM_COLUMNS; column++) {
			for (var row = 0; row < NUM_ROWS; row++) {
				let position = {
					x: (1.05 * column * BLOCK_WIDTH) + X_OFFSET + (0.025 * BLOCK_WIDTH),
					y: (1.05 * row * BLOCK_HEIGHT) + Y_OFFSET,
				};
				const id = column + "" + row;

				this.blocks[id] = new Block(context, position, BLOCK_WIDTH, BLOCK_HEIGHT);
			}
		}
	}

	tick() {
		this.draw();

		for (let id in this.blocks) {
			const block = this.blocks[id];
			const result = this.ball.checkCollision(block);
			if (result) this.handleBallCollision(result, block, id);
		}

		let data = this.ball.checkCollision(this.player);
		if (data) {
			this.ball.velocity.x = clamp(0.8 * (this.player.velocity + this.ball.velocity.x), -6, 6);
			this.ball.velocity.y = -Math.abs(this.ball.velocity.y);
		}

		// for (let powerup of this.powerups) {
		// 	if (powerup.checkCollision(this.player).hasCollided) {
		// 		this.powerups.splice(i, 1);
		// 		this.player.getPowerup(p.type);
		// 		this.counter = new Counter(this.context, 15 * 1000);
		// 		setTimeout(() => (this.counter = undefined));
		// 	}

		// 	if (p.position.y - p.r > this.context.canvas.height) {
		// 		this.powerups.splice(i, 1);
		// 	}
		// };
		//
		window.requestAnimationFrame(() => this.tick());
	}

	handleBallCollision(data: CollisionResult, b: Block, name: string) {
		//reposition the ball
		const disX = this.ball.position.x - b.position.x;
		const disY = this.ball.position.y - b.position.y;
		const collisionPoint: Vec2 = {
			x: data.x!,
			y: data.y!,
		};

		if (Math.abs(disX) > Math.abs(disY)) {
			this.ball.position.x -= Math.sign(disX) * collisionPoint.x!;
		} else {
			this.ball.position.y -= Math.sign(disY) * collisionPoint.y!;
		}

		if (b.loseLife()) {
			if (b.hasPowerUp) {
				this.powerups.push(new Powerup(this.context, b.position.x, b.position.y));
			}
			this.toRemove.push(name);
		} else {
			if (collisionPoint.x > collisionPoint.y) this.ball.velocity.x *= -1;
			else this.ball.velocity.y *= -1;
		}
	}

	draw(): void {
		this.context.fillStyle = "lightblue";
		this.context.fillRect(0, 0, this.screenWidth, this.screenHeight);
		this.player.move();
		this.player.draw();
		this.ball.move();

		this.counter?.draw(DELTA_TIME);

		for (let id in this.blocks) {
			this.blocks[id].draw(DELTA_TIME);
		}


		for (var i = 0; i < this.powerups.length; i++) {
			let p = this.powerups[i];
			p.move();
			p.draw();
		}

		this.ball.draw();
		// if (this.ball.position.y + 2 * this.ball.r > this.context.canvas.width) {
		// 	clearInterval(drawCall);
		// 	ShowMessage("Game Over!");
		// }
		// if (Object.keys(blocks).length == 0) {
		// 	clearInterval(drawCall);
		// 	ShowMessage("You Win!");
		// }
	}


	ShowMessage(msg: string) {
		this.context.fillStyle = "black";
		this.context.font = "30px Arial";
		this.context.fillText(msg, (this.context.canvas.width - msg.length * 15) / 2, this.context.canvas.height / 2);
	}
}


