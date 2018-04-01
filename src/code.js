const debug = false;
let ball;
let player;
let counter;

let blocks = {};
let powerups = [];

let toRemove = [];

const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let drawCall;

ctx.width = canvas.width;
ctx.height = canvas.height;

const dt = 1000 / 60; // 60FPS

function handleCollision(data,b, name) {
    if (data.hasCollided) {
	if (b.loseLife()) {
	    if (b.hasPowerUp) {
		powerups.push(new Powerup(ctx, b.pos.x,b.pos.y));
	    }
	    toRemove.push(name);
	}
	else {
	    if (data.x > data.y)
		ball.velocity.x *= -1;
	    else
		ball.velocity.y *= -1;
	    ball.move(true);
	}
    }
}


function handleBlocks(){
    for (let name in blocks) {
	let b = blocks[name];
	const data = ball.checkCollision(b);
	handleCollision(data,b,name);
	b.draw();
    }

    for (let i = 0; i < toRemove.length; i++) {
	delete blocks[toRemove[i]];
    }
    toRemove = [];
}

window.onload = () => {
    for (var i = 0; i < 8; i++) {
	for (var j = 1; j < 5; j++) {
	    let name = i + "" + j;
	    blocks[name] = new Block(ctx, i* 79 + 45, 30*j);
	}
    }

    ball = new Ball(ctx);
    player = new Player(ctx);

    drawCall = setInterval(draw,dt);
};

function draw(){
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    player.move();
    player.draw();
    ball.move();

    if (counter !== undefined) {
	counter.draw();
    }
    let data = ball.checkCollision(player);
    if (data.hasCollided) {
	ball.velocity.x = clamp(0.8 * ( player.vel + ball.velocity.x ), -6,6);
	ball.velocity.y = -Math.abs(ball.velocity.y);
    }

    handleBlocks();

    for (var i = 0; i < powerups.length; i++) {
	let p = powerups[i];
	p.move();
	p.draw();
	if (p.checkCollision(player).hasCollided) {
	    powerups.splice(i,1);
	    player.getPowerup(p.type);
	    counter = new Counter(ctx,15 * 1000);
	    setTimeout(() => delete counter);
	}

	if (p.pos.y - p.r > ctx.height) {
	    powerups.splice(i,1);
	}
    }

    ball.draw();
    if (ball.pos.y + 2 * ball.r > ctx.width) {
	clearInterval(drawCall);
	ShowMessage("Game Over!");
    }
    if (Object.keys(blocks).length == 0) {
	clearInterval(drawCall);
	ShowMessage("You Win!");
    }
}

function clamp(val, min,max) {
    return Math.min(Math.max(min, val), max);
}


function ShowMessage(msg){
    ctx.fillStyle = 'black';
    ctx.font = "30px Arial";
    ctx.fillText(msg,( ctx.width - msg.length * 15 ) / 2, ctx.height / 2);
}
