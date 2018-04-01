export default class Counter {
    constructor(ctx, duration) {
	this.ctx = ctx;
	this.w = 40;

	this.duration = duration;
	this.remaining = this.duration;
    }

    draw(){
	this.remaining -= dt;

	let ctx = this.ctx;
	ctx.fillStyle = 'black';
	ctx.fillRect(20, ctx.height-22,100,20);
	ctx.fillStyle = 'yellow';
	ctx.fillRect(20, ctx.height-22,this.remaining / this.duration * 100,20);
    }

    
}
