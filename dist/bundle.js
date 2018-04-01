/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Ball; });\nclass Ball {\n    constructor(ctx){\n\tthis.ctx = ctx;\n\tthis.r = 20;\n\tthis.r2 = Math.pow(this.r,2);\n\tthis.pos = {\n\t    x: 300,\n\t    y: 200\n\t};\n\n\tthis.velocity = {\n\t    x: 0,\n\t    y: 3\n\t};\n\n    }\n\n    draw(){\n\tthis.ctx.fillStyle = 'grey';\n\tthis.ctx.beginPath();\n\tthis.ctx.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI);\n\tthis.ctx.fill();\n    }\n\n    checkCollision(rect){\n\tlet dist = {};\n\n\tdist.x = Math.abs(this.pos.x - rect.pos.x);\n\tdist.y = Math.abs(this.pos.y - rect.pos.y);\n\n\tif (dist.x > (rect.w/2 + this.r)) { return {hasCollided: false}; }\n\tif (dist.y > (rect.h/2 + this.r)) { return {hasCollided: false}; }\n\n\tif (dist.x <= (rect.w/2)) { return {hasCollided: true, x:dist.x, y:dist.y}; } \n\tif (dist.y <= (rect.h/2)) { return {hasCollided: true, x:dist.x, y:dist.y}; }\n\n\tlet cornerDistance_sq = Math.pow((dist.x - rect.w/2), 2) +\n\t    Math.pow((dist.y - rect.h/2),2);\n\n\tconst ret = {\n\t    hasCollided: (cornerDistance_sq <= this.r2),\n\t    x: dist.x,\n\t    y: dist.y\n\t};\n\treturn ret;\n    }\n\n    move(isforced = false){\n\tif (isforced) {\n\t    this.pos.x += 2 * this.velocity.x;\n\t    this.pos.y += 2 * this.velocity.y;\n\t    return;\n\t}\n\tthis.pos.x += this.velocity.x;\n\tthis.pos.y += this.velocity.y;\n\tif (this.pos.x + this.r > this.ctx.width || this.pos.x - this.r < 0) {\n\t    this.velocity.x *= -1;\n\t}\n\tif (this.pos.y - this.r < 0) {\n\t    this.velocity.y *= -1;\n\t}\n    }\n\n}\n\n\n//# sourceURL=webpack:///./src/ball.js?");

/***/ }),

/***/ "./src/block.js":
/*!**********************!*\
  !*** ./src/block.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Block; });\nclass Block {\n    constructor(ctx,x,y) {\n\tthis.ctx = ctx;\n\t\n\tthis.h = 25;\n\tthis.w = 75;\n\tthis.lives = Math.round(Math.random()*2) + 2;\n\n\tthis.pos = {x,y};\n\tthis.hasPowerUp = Math.random() < 0.1;\n\n    }\n    draw(){\n\tif (this.hasPowerUp) \n\t    this.ctx.fillStyle = \"rgb(128,128,255)\";\n\telse\n\t    this.ctx.fillStyle = \"rgb(0,\" + Math.round(255 / this.lives) + \",20)\";\n\n\tthis.ctx.fillRect(this.pos.x- this.w/2,this.pos.y - this.h/2,this.w,this.h);\n    }\n\n    loseLife(){\n\tconsole.log('i lost a life!');\n\tthis.lives--;\n\tif (this.lives <= 0) {\n\t    return true;\n\t}\n\treturn false;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/block.js?");

/***/ }),

/***/ "./src/code.js":
/*!*********************!*\
  !*** ./src/code.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ball */ \"./src/ball.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block */ \"./src/block.js\");\n/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./counter */ \"./src/counter.js\");\n/* harmony import */ var _powerup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./powerup */ \"./src/powerup.js\");\n\n\n\n\n\n\n\nconst debug = false;\nlet ball;\nlet player;\nlet counter;\n\nlet blocks = {};\nlet powerups = [];\n\nlet toRemove = [];\n\nconst canvas = document.getElementById(\"canvas\");\nlet ctx = canvas.getContext(\"2d\");\nlet drawCall;\n\nctx.width = canvas.width;\nctx.height = canvas.height;\n\nconst dt = 1000 / 60; // 60FPS\n\nfunction handleCollision(data,b, name) {\n    if (data.hasCollided) {\n\tif (b.loseLife()) {\n\t    if (b.hasPowerUp) {\n\t\tpowerups.push(new _powerup__WEBPACK_IMPORTED_MODULE_4__[\"default\"](ctx, b.pos.x,b.pos.y));\n\t    }\n\t    toRemove.push(name);\n\t}\n\telse {\n\t    if (data.x > data.y)\n\t\tball.velocity.x *= -1;\n\t    else\n\t\tball.velocity.y *= -1;\n\t    ball.move(true);\n\t}\n    }\n}\n\n\nfunction handleBlocks(){\n    for (let name in blocks) {\n\tlet b = blocks[name];\n\tconst data = ball.checkCollision(b);\n\thandleCollision(data,b,name);\n\tb.draw();\n    }\n\n    for (let i = 0; i < toRemove.length; i++) {\n\tdelete blocks[toRemove[i]];\n    }\n    toRemove = [];\n}\n\nwindow.onload = () => {\n    for (var i = 0; i < 8; i++) {\n\tfor (var j = 1; j < 5; j++) {\n\t    let name = i + \"\" + j;\n\t    blocks[name] = new _block__WEBPACK_IMPORTED_MODULE_2__[\"default\"](ctx, i* 79 + 45, 30*j);\n\t}\n    }\n\n    ball = new _ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx);\n    player = new _player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ctx);\n\n    drawCall = setInterval(draw,dt);\n};\n\nfunction draw(){\n    ctx.fillStyle = \"lightblue\";\n    ctx.fillRect(0,0, canvas.width, canvas.height);\n    player.move();\n    player.draw();\n    ball.move();\n\n    if (counter !== undefined) {\n\tcounter.draw();\n    }\n    let data = ball.checkCollision(player);\n    if (data.hasCollided) {\n\tball.velocity.x = clamp(0.8 * ( player.vel + ball.velocity.x ), -6,6);\n\tball.velocity.y = -Math.abs(ball.velocity.y);\n    }\n\n    handleBlocks();\n\n    for (var i = 0; i < powerups.length; i++) {\n\tlet p = powerups[i];\n\tp.move();\n\tp.draw();\n\tif (p.checkCollision(player).hasCollided) {\n\t    powerups.splice(i,1);\n\t    player.getPowerup(p.type);\n\t    counter = new _counter__WEBPACK_IMPORTED_MODULE_3__[\"default\"](ctx,15 * 1000);\n\t    setTimeout(() => counter = undefined );\n\t}\n\n\tif (p.pos.y - p.r > ctx.height) {\n\t    powerups.splice(i,1);\n\t}\n    }\n\n    ball.draw();\n    if (ball.pos.y + 2 * ball.r > ctx.width) {\n\tclearInterval(drawCall);\n\tShowMessage(\"Game Over!\");\n    }\n    if (Object.keys(blocks).length == 0) {\n\tclearInterval(drawCall);\n\tShowMessage(\"You Win!\");\n    }\n}\n\nfunction clamp(val, min,max) {\n    return Math.min(Math.max(min, val), max);\n}\n\n\nfunction ShowMessage(msg){\n    ctx.fillStyle = 'black';\n    ctx.font = \"30px Arial\";\n    ctx.fillText(msg,( ctx.width - msg.length * 15 ) / 2, ctx.height / 2);\n}\n\n\n//# sourceURL=webpack:///./src/code.js?");

/***/ }),

/***/ "./src/counter.js":
/*!************************!*\
  !*** ./src/counter.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Counter; });\nclass Counter {\n    constructor(ctx, duration) {\n\tthis.ctx = ctx;\n\tthis.w = 40;\n\n\tthis.duration = duration;\n\tthis.remaining = this.duration;\n    }\n\n    draw(){\n\tthis.remaining -= dt;\n\n\tlet ctx = this.ctx;\n\tctx.fillStyle = 'black';\n\tctx.fillRect(20, ctx.height-22,100,20);\n\tctx.fillStyle = 'yellow';\n\tctx.fillRect(20, ctx.height-22,this.remaining / this.duration * 100,20);\n    }\n\n    \n}\n\n\n//# sourceURL=webpack:///./src/counter.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\nconst KEY_D = 68;\nconst KEY_A = 65;\n\nclass Player {\n    constructor(ctx) {\n\tthis.ctx = ctx;\n\tthis.h = 25;\n\tthis.w = 100;\n\n\tthis.speed = 6;\n\n\tthis.pos = {\n\t    x: this.ctx.width / 2,\n\t    y: this.ctx.height - (20 + this.h)\n\t};\n\tthis.vel = 0;\n\n\n\tdocument.onkeydown = (e) => {\n\t    if (e.key == 'a') {\n\t\tthis.vel = -this.speed;\n\t    }\n\t    if (e.key == 'd') {\n\t\tthis.vel = this.speed;\n\t    }\n\t};\n\n\tdocument.onkeyup = (e) => {\n\t    if (e.key == 'a' && this.vel == -this.speed) {\n\t\tthis.vel = 0;\n\t    }\n\t    else if (e.key == 'd' && this.vel == this.speed) {\n\t\tthis.vel = 0;\n\t    }\n\t};\n    }\n\n    draw(){\n\tthis.ctx.fillStyle = \"blue\";\n\tthis.ctx.fillRect(this.pos.x- this.w/2,this.pos.y - this.h/2,this.w,this.h);\n    }\n\n    move(){\n\t// this.vel = 0;\n\tthis.pos.x += this.vel;\n\n    }\n\n\n    getPowerup(type){\n\tif (type == 'enlarge') {\n\t    this.w *= 2;\n\t    setTimeout(() => this.w /= 2,15 * 1000);\n\t}\n\telse if (type == 'shrink') {\n\t    this.w /= 2;\n\t    setTimeout(() => this.w *= 2,10 * 1000);\n\t}\n\telse if (type == 'slower') {\n\t    this.speed /= 2;\n\t    setTimeout(() => this.speed *= 2,10 * 1000);\n\t}\n\telse if (type == 'faster') {\n\t    this.speed *= 1.5;\n\t    setTimeout(() => this.speed /= 1.5,10 * 1000);\n\t}\n    }\n}\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/powerup.js":
/*!************************!*\
  !*** ./src/powerup.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Powerup; });\n/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ball */ \"./src/ball.js\");\n\n\nclass Powerup extends _ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(ctx,x,y) {\n\tsuper(ctx,x,y);\n\t\n\tthis.fallspeed = Math.random(3,6);\n\n\tlet t = Math.random();\n\tthis.type = '';\n\tif (t < 0.15) \n\t    this.type = 'enlarge';\n\telse if(t < 0.3)\n\t    this.type = 'shrink';\n\telse if(t < 0.6)\n\t    this.type = 'slower';\n\telse\n\t    this.type = 'faster';\n    }\n\n    draw(){\n\tthis.ctx.fillStyle = \"rgb(123,43,255)\";\n\tthis.ctx.beginPath();\n\tthis.ctx.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI);\n\tthis.ctx.fill();\n    }\n\n    move(){\n\tthis.pos.y += this.fallspeed;\n    }\n\n    \n}\n\n\n//# sourceURL=webpack:///./src/powerup.js?");

/***/ })

/******/ });