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
	  new GameView(game,ctx).startScreen();
	})
	
	window.GameView = GameView;


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
	  document.addEventListener("keydown", this.keyDownTextField.bind(this), false);
	}
	
	Game.DIM_X = 550;
	Game.DIM_Y = 800;
	Game.NOTELANE = [100,215,330,445];
	Game.KEY = [100,215,330,445];
	Game.MOVES = ["q","w","e","r"];
	Game.KEYCODE = [81,87,69,82]
	Game.COMBO = {81:"q",87:"w",69:"e",82:"r"}
	
	Game.prototype.draw = function(ctx){
	  ctx.clearRect(0,0,Game.DIM_X,Game.DIM_Y)
	  ctx.drawImage(bg,0,0,Game.DIM_X,Game.DIM_Y)
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
	Game.prototype.addNotes = function(songTime){
	  this.song.addNotes(songTime);
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
	  var nintypercent = note.diameter * .95
	  var tenpercent = note.diameter * .35
	  var note_index = Game.NOTELANE.indexOf(note.pos[0])
	    if(key_index === note_index){
	      if(note.pos[1] > 700 + tenpercent
	            || note.pos[1] > final_height - tenpercent){
	              that.score+=100
	              that.notes.splice(index,1)
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
	}
	
	Key.CANVAS_POS = [0,215,445,660];
	var progress = 0;
	
	Key.prototype.draw = function(ctx){
	  var arrow = document.getElementById("arrow");
	  ctx.drawImage(arrow,Key.CANVAS_POS[this.idx],0,210,210,this.pos[0],this.pos[1],100,100);
	}
	
	module.exports = Key;


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
	
	function sort(array){
	  var array2 = []
	  array.forEach(function(point){
	    array2.push(Math.round(point*10)/10)
	  })
	  array2.map(function(each){
	    return [each,1]
	  })
	  return array2
	}
	
	Score.SONG = [
	  [1.8,0],
	  [3.1,0],
	  [4.4,0],
	  [5.8,0],
	  [5.8,1],
	  [7.1,0],
	  [8.5,0],
	  [9.9,0],
	  [11.2,0],
	  [11.2,1],
	  [12.6,2],
	  [13.9,3],
	  [15.3,0],
	  [16.6,0],
	  [16.6,3],
	  [18.1,1],
	  [18.1,2],
	  [19.4,1],
	  [19.4,2],
	  [20.8,0],
	  [22.2,0],
	  [23.6,1],
	  [24.9,2],
	  [26.3,3],
	  [27.6,3],
	  [27.6,0],
	  [28.9,2],
	  [28.9,1],
	  [30.3,1],
	  [30.3,2],
	  [31.7,0],
	  [33.1,0],
	  [34.5,1],
	  [35.8,2],
	  [37.2,3],
	  [38.5,3],
	  [38.5,2],
	  [39.2,2],
	  [39.2,1],
	  [39.9,1],
	  [39.9,0],
	  [40.6,0],
	  [41.4,1],
	  [42.6,2],
	  [44,3],
	  [45.4,1],
	  [46.7,2],
	  [48.1,3],
	  [49.4,2],
	  [49.4,3],
	  [50.1,2],
	  [50.1,3],
	  [50.8,2],
	  [50.8,3],
	  [52.2,0],
	  [53.6,1],
	  [54.9,2],
	  [56.3,3],
	  [57.6,0],
	  [59,1],
	  [60.3,2],
	  [61,3],
	  [61.7,0],
	  [63.1,1],
	  [63.1,2],
	  [65.2,3],
	  [65.2,3],
	  [67.9,3]
	]
	
	Score.prototype.addNotes = function(songTime){
	  var collection = []
	  Score.SONG.forEach(function(pair){
	    if(pair[0] === songTime){
	      collection.push(new Note(Score.NOTELANE[pair[1]],pair[1]))
	    }
	  })
	  this.game.notes = this.game.notes.concat(collection)
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
	  this.startTime = 0;
	  this.setUpListeners()
	}
	
	GameView.MOVES = ["q","w","e","r"];
	
	GameView.prototype.run = function(){
	  var timer = window.setInterval(function(){
	    songTime = new Date().getTime()/1000 - this.startTime
	    songTime = Math.round(songTime*10)/10
	    this.game.addNotes(songTime)
	    if(songTime === 70){
	      this.page = 3;
	      clearInterval(timer)
	      document.getElementById('music').pause()
	      document.getElementById('music').currentTime = 0;
	    }
	  }.bind(this),100)
	  frameID = requestAnimationFrame(this.animate.bind(this));
	}
	
	GameView.prototype.animate = function(){
	  var that = this;
	  switch(this.page){
	    case 1:
	      cancelAnimationFrame(frameID)
	      return;
	      break;
	
	    case 2:
	        this.game.draw(this.ctx);
	        that.game.step()
	      break;
	
	    case 3:
	      this.ctx.clearRect(0, 0, 800, 900);
	      this.ctx.font = "40px Lato";
	      this.ctx.fillText("Thank You For Playing", 90, 250);
	      this.ctx.fillText("Your Score:",150,350)
	      this.ctx.fillText(this.game.score,350,350)
	      this.ctx.fillStyle = "black";
	      this.retryButton.className = "show";
	      this.game.notes = [];
	      break;
	  }
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.startScreen = function(){
	  this.ctx.clearRect(0, 0, 800, 900);
	  this.ctx.font = "64px Handlee";
	  this.ctx.fillStyle = "black";
	  this.ctx.fillText("Keyboard Hero", 80, 300);
	  this.retryButton.className = "hidden";
	  this.startButton.className= "show";
	}
	
	GameView.prototype.setUpListeners = function(){
	  this.startButton = document.getElementById("start")
	  this.retryButton = document.getElementById('retry')
	  this.startButton.addEventListener('click',this.changePage.bind(this,2))
	  this.retryButton.addEventListener('click',this.changePage.bind(this,1))
	  $('#myModal').on("hidden.bs.modal", this.togglePause.bind(this));
	}
	
	GameView.prototype.togglePause = function(){
	  this.run();
	  var music = document.getElementById('music')
	  this.songStarted();
	  music.addEventListener('canplaythrough', music.play(), false)
	  this.startButton.className = "hidden";
	}
	
	GameView.prototype.changePage = function(page){
	  this.page = page
	  var that = this;
	  if(this.page === 2){
	    $("#myModal").modal("show");
	  } else {
	    this.startScreen()
	  }
	}
	
	GameView.prototype.songStarted = function(){
	  this.startTime = new Date().getTime()/1000
	}
	
	module.exports = GameView


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map