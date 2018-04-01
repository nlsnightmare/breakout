class Powerup extends Ball {
    constructor(ctx,x,y) {
	super(ctx,x,y);
	
	this.fallspeed = Math.random(3,6);

	let t = Math.random();
	this.type = '';
	if (t < 0.15) 
	    this.type = 'enlarge';
	else if(t < 0.3)
	    this.type = 'shrink';
	else if(t < 0.6)
	    this.type = 'slower';
	else
	    this.type = 'faster';
    }

    draw(){
	this.ctx.fillStyle = "rgb(123,43,255)";
	this.ctx.beginPath();
	this.ctx.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI);
	this.ctx.fill();
    }

    move(){
	this.pos.y += this.fallspeed;
    }

    
}
