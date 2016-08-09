var Game = require('./game')

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

GameView.prototype.setUpListeners = function(){
  this.startButton = document.getElementById("start")
  this.startButton.addEventListener('click',this.changePage.bind(this,2))
}

GameView.prototype.changePage = function(page){
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
