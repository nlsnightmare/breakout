export default class Block {
    constructor(ctx,x,y) {
	this.ctx = ctx;
	
	this.h = 25;
	this.w = 75;
	this.lives = Math.round(Math.random()*2) + 2;

	this.pos = {x,y};
	this.hasPowerUp = Math.random() < 0.1;

    }
    draw(){
	if (this.hasPowerUp) 
	    this.ctx.fillStyle = "rgb(128,128,255)";
	else
	    this.ctx.fillStyle = "rgb(0," + Math.round(255 / this.lives) + ",20)";

	this.ctx.fillRect(this.pos.x- this.w/2,this.pos.y - this.h/2,this.w,this.h);
    }

    loseLife(){
	console.log('i lost a life!');
	this.lives--;
	if (this.lives <= 0) {
	    return true;
	}
	return false;
    }
}
