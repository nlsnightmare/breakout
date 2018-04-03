!function(t){var i={};function e(s){if(i[s])return i[s].exports;var h=i[s]={i:s,l:!1,exports:{}};return t[s].call(h.exports,h,h.exports,e),h.l=!0,h.exports}e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";e.r(i);class s{constructor(t){this.ctx=t,this.r=20,this.r2=Math.pow(this.r,2),this.pos={x:300,y:200},this.velocity={x:0,y:3}}draw(){this.ctx.fillStyle="grey",this.ctx.beginPath(),this.ctx.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI),this.ctx.fill()}checkCollision(t){let i={};if(i.x=Math.abs(this.pos.x-t.pos.x),i.y=Math.abs(this.pos.y-t.pos.y),i.x>t.w/2+this.r)return{hasCollided:!1};if(i.y>t.h/2+this.r)return{hasCollided:!1};if(i.x<=t.w/2)return{hasCollided:!0,x:i.x,y:i.y};if(i.y<=t.h/2)return{hasCollided:!0,x:i.x,y:i.y};return{hasCollided:Math.pow(i.x-t.w/2,2)+Math.pow(i.y-t.h/2,2)<=this.r2,x:i.x,y:i.y}}move(t=!1){if(t)return this.pos.x+=2*this.velocity.x,void(this.pos.y+=2*this.velocity.y);this.pos.x+=this.velocity.x,this.pos.y+=this.velocity.y,(this.pos.x+this.r>this.ctx.width||this.pos.x-this.r<0)&&(this.velocity.x*=-1),this.pos.y-this.r<0&&(this.velocity.y*=-1)}}class h{constructor(t,i,e){this.ctx=t,this.h=25,this.w=75,this.lives=Math.round(2*Math.random())+2,this.pos={x:i,y:e},this.hasPowerUp=Math.random()<.1}draw(){this.hasPowerUp?this.ctx.fillStyle="rgb(128,128,255)":this.ctx.fillStyle="rgb(0,"+Math.round(255/this.lives)+",20)",this.ctx.fillRect(this.pos.x-this.w/2,this.pos.y-this.h/2,this.w,this.h)}loseLife(){return console.log("i lost a life!"),this.lives--,this.lives<=0}}class l{constructor(t,i){this.ctx=t,this.w=40,this.duration=i,this.remaining=this.duration}draw(){this.remaining-=dt;let t=this.ctx;t.fillStyle="black",t.fillRect(20,t.height-22,100,20),t.fillStyle="yellow",t.fillRect(20,t.height-22,this.remaining/this.duration*100,20)}}class o extends s{constructor(t,i,e){super(t,i,e),this.fallspeed=Math.random(3,6);let s=Math.random();this.type="",this.type=s<.15?"enlarge":s<.3?"shrink":s<.6?"slower":"faster"}draw(){this.ctx.fillStyle="rgb(123,43,255)",this.ctx.beginPath(),this.ctx.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI),this.ctx.fill()}move(){this.pos.y+=this.fallspeed}}let r,n,a,c={},d=[],y=[];const p=document.getElementById("canvas");let x,u=p.getContext("2d");u.width=p.width,u.height=p.height;function f(){var t,i,e;u.fillStyle="lightblue",u.fillRect(0,0,p.width,p.height),n.move(),n.draw(),r.move(),void 0!==a&&a.draw(),r.checkCollision(n).hasCollided&&(r.velocity.x=(t=.8*(n.vel+r.velocity.x),i=-6,e=6,Math.min(Math.max(i,t),e)),r.velocity.y=-Math.abs(r.velocity.y)),function(){for(let t in c){let i=c[t],e=r.checkCollision(i);i=i,t=t,(e=e).hasCollided&&(i.loseLife()?(i.hasPowerUp&&d.push(new o(u,i.pos.x,i.pos.y)),y.push(t)):(e.x>e.y?r.velocity.x*=-1:r.velocity.y*=-1,r.move(!0))),i.draw()}var t,i,e;for(let t=0;t<y.length;t++)delete c[y[t]];y=[]}();for(var s=0;s<d.length;s++){let t=d[s];t.move(),t.draw(),t.checkCollision(n).hasCollided&&(d.splice(s,1),n.getPowerup(t.type),a=new l(u,15e3),setTimeout(()=>a=void 0)),t.pos.y-t.r>u.height&&d.splice(s,1)}r.draw(),r.pos.y+2*r.r>u.width&&(clearInterval(x),w("Game Over!")),0==Object.keys(c).length&&(clearInterval(x),w("You Win!"))}function w(t){u.fillStyle="black",u.font="30px Arial",u.fillText(t,(u.width-15*t.length)/2,u.height/2)}window.onload=(()=>{for(var t=0;t<8;t++)for(var i=1;i<5;i++){c[t+""+i]=new h(u,79*t+45,30*i)}r=new s(u),n=new class{constructor(t){this.ctx=t,this.h=25,this.w=100,this.speed=6,this.pos={x:this.ctx.width/2,y:this.ctx.height-(20+this.h)},this.vel=0,document.onkeydown=(t=>{"a"==t.key&&(this.vel=-this.speed),"d"==t.key&&(this.vel=this.speed)}),document.onkeyup=(t=>{"a"==t.key&&this.vel==-this.speed?this.vel=0:"d"==t.key&&this.vel==this.speed&&(this.vel=0)})}draw(){this.ctx.fillStyle="blue",this.ctx.fillRect(this.pos.x-this.w/2,this.pos.y-this.h/2,this.w,this.h)}move(){this.pos.x+=this.vel}getPowerup(t){"enlarge"==t?(this.w*=2,setTimeout(()=>this.w/=2,15e3)):"shrink"==t?(this.w/=2,setTimeout(()=>this.w*=2,1e4)):"slower"==t?(this.speed/=2,setTimeout(()=>this.speed*=2,1e4)):"faster"==t&&(this.speed*=1.5,setTimeout(()=>this.speed/=1.5,1e4))}}(u),x=setInterval(f,1e3/60)})}]);