export default class Ball {
    constructor(ctx){
	this.ctx = ctx;
	this.r = 20;
	this.r2 = Math.pow(this.r,2);
	this.pos = {
	    x: 300,
	    y: 200
	};

	this.velocity = {
	    x: 0,
	    y: 3
	};

    }

    draw(){
	this.ctx.fillStyle = 'grey';
	this.ctx.beginPath();
	this.ctx.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI);
	this.ctx.fill();
    }

    checkCollision(rect){
	let dist = {};

	dist.x = Math.abs(this.pos.x - rect.pos.x);
	dist.y = Math.abs(this.pos.y - rect.pos.y);
	const min_dis_x = rect.w / 2 + this.r;
	const min_dis_y = rect.h / 2 + this.r;


	if (dist.x > min_dis_x || dist.y > min_dis_y) {
	    return {
		hasCollided: false
	    };
	}

	if (dist.x <= (rect.w/2) || dist.y <= (rect.h/2)) {
	    return {
		hasCollided: true,
		x:dist.x - min_dis_x,
		y:dist.y - min_dis_y
	    };
	} 

	let cornerDistance_sq = Math.pow((dist.x - rect.w/2), 2) +
	    Math.pow((dist.y - rect.h/2),2);

	const ret = {
	    hasCollided: (cornerDistance_sq <= this.r2),
	    x: dist.x,
	    y: dist.y
	};
	return ret;
    }

    move(){
	this.pos.x += this.velocity.x;
	this.pos.y += this.velocity.y;
	if (this.pos.x + this.r > this.ctx.width){
	    this.pos.x = this.ctx.width - this.r;
	    this.velocity.x *= -1;
	}
	if(this.pos.x - this.r < 0) {
	    this.pos.x = this.r;
	    this.velocity.x *= -1;
	}
	if (this.pos.y - this.r < 0) {
	    this.velocity.y *= -1;
	}
    }

}
