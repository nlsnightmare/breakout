const KEY_D = 68;
const KEY_A = 65;

class Player {
    constructor(ctx) {
	this.ctx = ctx;
	this.h = 25;
	this.w = 100;

	this.speed = 6;

	this.pos = {
	    x: this.ctx.width / 2,
	    y: this.ctx.height - (20 + this.h)
	};
	this.vel = 0;


	document.onkeydown = (e) => {
	    if (e.key == 'a') {
		this.vel = -this.speed;
	    }
	    if (e.key == 'd') {
		this.vel = this.speed;
	    }
	};

	document.onkeyup = (e) => {
	    if (e.key == 'a' && this.vel == -this.speed) {
		this.vel = 0;
	    }
	    else if (e.key == 'd' && this.vel == this.speed) {
		this.vel = 0;
	    }
	};
    }

    draw(){
	this.ctx.fillStyle = "blue";
	this.ctx.fillRect(this.pos.x- this.w/2,this.pos.y - this.h/2,this.w,this.h);
    }

    move(){
	// this.vel = 0;
	this.pos.x += this.vel;

    }


    getPowerup(type){
	if (type == 'enlarge') {
	    this.w *= 2;
	    setTimeout(() => this.w /= 2,15 * 1000);
	}
	else if (type == 'shrink') {
	    this.w /= 2;
	    setTimeout(() => this.w *= 2,10 * 1000);
	}
	else if (type == 'slower') {
	    this.speed /= 2;
	    setTimeout(() => this.speed *= 2,10 * 1000);
	}
	else if (type == 'faster') {
	    this.speed *= 1.5;
	    setTimeout(() => this.speed /= 1.5,10 * 1000);
	}
    }
}
