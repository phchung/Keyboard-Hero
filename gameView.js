var Game = require('./game')

function GameView(game,ctx){
  this.game = game;
  this.ctx = ctx;
  this.keys = this.game.keys;
  this.page = 1;
  this.startTime = 0;
  this.pause = false;
  this.setUpListeners()
}

GameView.MOVES = ["q","w","e","r"];

GameView.prototype.run = function(){
  var that = this;
  var timer = window.setInterval(function(){
    songTime = new Date().getTime()/1000 - that.startTime
    songTime = Math.round(songTime*10)/10
    console.log(songTime)
    that.game.addNotes(songTime)
    if(songTime === 5){
      that.page = 3;
      clearInterval(timer)
      document.getElementById('music').pause()
      document.getElementById('music').currentTime = 0;
    }
  },100)
  frameID = requestAnimationFrame(function(){that.animate()});
}

GameView.prototype.animate = function(){
  var that = this;
  switch(this.page){
    case 1:
      cancelAnimationFrame(frameID)
      return;
      break;

    case 2:
      if(!this.pause){
        this.game.draw(this.ctx);
        that.game.step()
      }
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
  requestAnimationFrame(function(){that.animate()});
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
  // this.run();
  if(this.page === 2){
    $("#myModal").modal("show");
    // this.game.draw(this.ctx);
    // var music = document.getElementById('music')
    // that.songStarted();
    // music.addEventListener('canplaythrough', music.play(), false)
    // this.startButton.className = "hidden";
  } else {
    this.startScreen()
  }
}

GameView.prototype.songStarted = function(){
  this.startTime = new Date().getTime()/1000
}

module.exports = GameView
