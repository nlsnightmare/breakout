import Player from "./player";
import Counter from "./counter";
import Powerup from "./powerup";
import Block from "./block";
import { Vec2 } from "./commonTypes";
import Ball from "./ball";
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
	removalBuffer: string[];

	constructor(private readonly context: Context) {
		this.ball = new Ball();
		this.player = new Player(this.context);

		this.powerups = [];
		this.removalBuffer = [];
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

				// const id = column + "" + row;
				const id = `${column}:${row}`;
				this.blocks[id] = new Block(position, BLOCK_WIDTH, BLOCK_HEIGHT);
			}
		}
	}

	tick() {
		console.log('tick')
		this.draw();

		this.counter?.tick(DELTA_TIME);

		for (const id in this.blocks) {
			const block = this.blocks[id];
			const result = this.ball.checkCollision(block);

			if (result) this.handleBallCollision(result, block, id);
		}

		const data = this.ball.checkCollision(this.player);
		if (data) {
			this.ball.velocity.x = clamp(0.8 * (this.player.velocity + this.ball.velocity.x), -6, 6);
			this.ball.velocity.y = -Math.abs(this.ball.velocity.y);
		}

		/**
		 * We modify the array while looping,
		 * therefore it's better to loop end-to-start
		 */
		for (let index = this.powerups.length; index < 0; index--) {
			let realIndex= index - 1;
			const powerup = this.powerups[realIndex];

			if (powerup.position.y - powerup.r > this.context.canvas.height) {
				this.powerups.splice(realIndex, 1);
			}

			if (powerup.checkCollision(this.player)) {
				this.powerups.splice(realIndex, 1);
				this.player.applyPowerup(powerup);
				this.counter = new Counter(15 * 1000);
				setTimeout(() => (this.counter = undefined));
			}
		};
		for (let id in this.removalBuffer) {
			delete this.blocks[id];
		};
		this.removalBuffer = [];

		// for (let index = 0; index < this.powerups.length; index++) {
		// 	const powerup = this.powerups[realIndex];

		// 	if (powerup.position.y - powerup.r > this.context.canvas.height) {
		// 		this.powerups.splice(index, 1);
		// 	}

		// 	if (powerup.checkCollision(this.player)) {
		// 		this.powerups.splice(index, 1);
		// 		this.player.applyPowerup(powerup);
		// 		this.counter = new Counter(this.context, 15 * 1000);
		// 		setTimeout(() => (this.counter = undefined));
		// 	}

		// }

		window.requestAnimationFrame(() => this.tick());
	}

	handleBallCollision(point: Vec2, block: Block, name: string) {
		console.log({point, block, name});
		// Step 1. reposition the ball
		const disX = this.ball.position.x - block.position.x;
		const disY = this.ball.position.y - block.position.y;

		if (Math.abs(disX) > Math.abs(disY)) {
			this.ball.position.x -= Math.sign(disX) * point.x;
		} else {
			this.ball.position.y -= Math.sign(disY) * point.y;
		}

		// Step 2. make sure the block loses one hp
		block.loseHp();

		if (block.isNotBroken()) {
			if (point.x > point.y) this.ball.bounceX();
			else this.ball.bounceY();

			return;
		}

		if (block.powerup) this.powerups.push(block.powerup);

		this.removalBuffer.push(name);
	}

	draw(): void {
		this.context.fillStyle = "lightblue";
		this.context.fillRect(0, 0, this.screenWidth, this.screenHeight);
		this.player.move();
		this.player.draw(this.context);
		this.ball.move({ x: this.screenWidth, y: this.screenHeight });

		this.counter?.draw(this.context);
		this.ball.draw(this.context);

		for (let id in this.blocks) {
			this.blocks[id].draw(this.context);
		}

		for (const powerup of this.powerups) {
			powerup.move();
			powerup.draw(this.context);
		}


		// Ball fell down
		if (this.ball.position.y + 2 * this.ball.r > this.context.canvas.width) {
			this.showMessage("Game Over!");
		}

		if (Object.keys(this.blocks).length == 0) {
			this.showMessage("You Win!");
		}
	}


	showMessage(msg: string) {
		this.context.fillStyle = "black";
		this.context.font = "30px Arial";
		this.context.fillText(msg, (this.context.canvas.width - msg.length * 15) / 2, this.context.canvas.height / 2);
	}
}


