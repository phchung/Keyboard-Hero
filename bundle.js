/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1)
	var GameView = __webpack_require__(5)
	
	document.addEventListener("DOMContentLoaded", function(){
	var canvasEl = document.getElementById("canvas")
	canvasEl.width = Game.DIM_X;
	canvasEl.height = Game.DIM_Y;
	var ctx = canvasEl.getContext("2d");
	var game = new Game();
	// var music = document.getElementById('music');
	// music.addEventListener('canplaythrough', music.play(), false);
	new GameView(game,ctx).startScreen();
	
	})


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Note = __webpack_require__(2);
	var Key = __webpack_require__(3);
	var Score = __webpack_require__(4)
	
	function Game(){
	  this.keys = [];
	  this.notes = [];
	  this.score = 0;
	  this.song = new Score(this)
	  this.setUp();
	  // this.addNotes();
	  document.addEventListener("keydown", this.keyDownTextField.bind(this), false);
	}
	
	Game.DIM_X = 550;
	Game.DIM_Y = 800;
	// Game.NOTELANE = [200,350,500,650];
	Game.NOTELANE = [100,215,330,445];
	Game.KEY = [100,215,330,445];
	Game.MOVES = ["q","w","e","r"];
	Game.KEYCODE = [81,87,69,82]
	// Game.COMBO = { "q": 81, "w": 87, "e": 69, "r": 82 }
	Game.COMBO = {81:"q",87:"w",69:"e",82:"r"}
	
	Game.prototype.draw = function(ctx){
	  ctx.clearRect(0,0,Game.DIM_X,Game.DIM_Y)
	  // ctx.fillStyle = "#F8F8FF";
	  // ctx.fillRect(0,0,Game.DIM_X,Game.DIM_Y)
	  ctx.drawImage(bg,0,0,Game.DIM_X,Game.DIM_Y)
	  // ctx2.fillStyle = "#F8F8FF";
	  // ctx2.fillRect(0,0,Game.DIM_X,Game.DIM_Y)
	  var that = this;
	  ctx.font = "30px Lato"
	  ctx.fillStyle = '#ffffb3';
	  ctx.fillText("Score: " + this.score, 10, 30);
	  this.keys.forEach(function(key){
	    key.draw(ctx)
	    key.pos[1] = Game.DIM_Y - 100;
	  })
	  this.notes.forEach(function(notes){
	    notes.draw(ctx)
	  })
	}
	
	Game.prototype.move = function(){
	  this.notes.forEach(function(notes){
	    notes.move()
	  })
	}
	Game.prototype.setUp = function(ctx){
	  Game.KEY.forEach(function(pos,idx){
	    this.keys.push(new Key(pos,Game.MOVES[idx],idx))
	  }.bind(this))
	}
	Game.prototype.addNotes = function(){
	  this.song.addNotes();
	}
	
	Game.prototype.notesOutOfBound = function(){
	  var that = this;
	  this.notes.forEach(function(note,index){
	    if(note.pos[1]>Game.DIM_Y){
	      that.notes.splice(index,1)
	    }
	  })
	}
	Game.prototype.checkCollison = function(keyCode){
	  var buttonPressed = Game.COMBO[keyCode]
	  var key_index = Game.MOVES.indexOf(buttonPressed)
	  this.hit(key_index)
	}
	
	Game.prototype.hit = function(key_index){
	  var that = this;
	  var initial_height = this.keys[0].pos[1];
	  var final_height = initial_height + this.keys[0].dim_y;
	  this.notes.forEach(function(note,index){
	    var nintypercent = note.diameter * .90
	    var tenpercent = note.diameter * .30
	    var note_index = Game.NOTELANE.indexOf(note.pos[0])
	      if(key_index === note_index){
	        if(note.pos[1] > 700 + tenpercent
	              || note.pos[1] > final_height - tenpercent){
	                that.score+=100
	                that.notes.splice(index,1)
	          } else {
	            console.log('miss')
	        }
	      }
	    })
	  }
	
	Game.prototype.keyDownTextField = function(e){
	  var keyCode = e.keyCode;
	  if(Game.KEYCODE.includes(keyCode)){
	    var whichkey = Game.COMBO[keyCode]
	    this.keys.forEach(function(key){
	      if(key.move === whichkey){
	        key.pos[1] = key.pos[1] + 4
	      }
	    })
	    this.checkCollison(keyCode)
	  }
	}
	
	Game.prototype.step = function(){
	  this.move();
	  this.notesOutOfBound();
	}
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Note(pos,idx){
	  this.pos = [pos,0]
	  this.diameter = 40;
	  this.idx = idx;
	}
	
	Note.ARROW = ["left","down","right","up"]
	
	Note.prototype.draw = function(ctx){
	  var note = document.getElementById(Note.ARROW[this.idx])
	    ctx.drawImage(note,65,0,63,64,this.pos[0],this.pos[1],95,95);
	}
	// note one = ctx.drawImage(note,0,0,63,64,this.pos[0],this.pos[1],95,95);
	Note.prototype.move = function(){
	  this.pos[1] = this.pos[1] + 3;
	}
	
	module.exports = Note


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Key(pos,move,idx){
	  this.pos = [pos,600];
	  this.move = move;
	  this.dim_y = 10;
	  this.idx = idx
	  this.pressed = false;
	}
	
	Key.CANVAS_POS = [0,215,445,660]
	var progress = 0;
	
	Key.prototype.draw = function(ctx){
	  var arrow = document.getElementById("arrow");
	  ctx.drawImage(arrow,Key.CANVAS_POS[this.idx],0,210,210,this.pos[0],this.pos[1],100,100);
	}
	
	module.exports = Key


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Note = __webpack_require__(2);
	var Game = __webpack_require__(1);
	
	function Score(game){
	  this.bar = 0;
	  this.game = game;
	}
	
	Score.NOTELANE = [100,215,330,445];
	Score.SONG = [
	  "0000",
	  "1100",
	  "1000",
	  "0000",
	  "0000",
	  "0011",
	  "1001",
	  "0000",
	  "0110",
	  "0000"
	]
	
	Score.prototype.addNotes = function(){
	  var collection = []
	  for (n=0;n<4;n++){
	    var noteIndex = Score.SONG[this.bar].indexOf(Score.SONG[this.bar][n])
	    var lane = Score.NOTELANE[n]
	    if (Score.SONG[this.bar][n] === '1')
	    collection.push(new Note(lane,n))
	  }
	  this.game.notes = this.game.notes.concat(collection)
	    if(this.bar === 3){
	      this.bar = 0
	    }else{
	      this.bar++
	    }
	}
	
	module.exports = Score;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1)
	
	function GameView(game,ctx){
	  this.game = game;
	  this.ctx = ctx;
	  this.keys = this.game.keys;
	  this.page = 1;
	  this.setUpListeners()
	}
	
	GameView.MOVES = ["q","w","e","r"];
	
	GameView.prototype.run = function(){
	  var that = this;
	  window.setInterval(function(){that.game.addNotes()},500)
	  requestAnimationFrame(this.animate.bind(this));
	}
	
	GameView.prototype.animate = function(time){
	  this.game.draw(this.ctx);
	  this.game.step()
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.startScreen = function(){
	  this.ctx.clearRect(0, 0, 800, 900);
	  this.ctx.font = "64px Handlee";
	  this.ctx.fillStyle = "black";
	  this.ctx.fillText("NOT DDR", 110, 300);
	}
	
	GameView.prototype.setUpListeners= function(){
	  this.startButton = document.getElementById("start")
	  this.startButton.addEventListener('click',this.changePage.bind(this,2))
	}
	
	GameView.prototype.changePage= function(page){
	  this.page = page
	  if(this.page === 2){
	      this.run();
	        setTimeout(function(){
	        var music = document.getElementById('music')
	        music.addEventListener('canplaythrough', music.play(), false)
	      },4000)
	      this.startButton.className = "hidden";
	  }
	}
	
	
	module.exports = GameView


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map