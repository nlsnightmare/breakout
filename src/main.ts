import { Game } from './game';
export type Context = CanvasRenderingContext2D;


window.onload = () => {
	const canvas = document.getElementById("canvas") as HTMLCanvasElement;
	let ctx: Context = canvas.getContext("2d")!;
	let game = new Game(ctx);

	game.tick();
};

export function clamp(val: number, min: number, max: number) {
	return Math.min(Math.max(min, val), max);
}

