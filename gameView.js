var Game = require('./game')

function GameView(game,ctx){
  this.game = game;
  this.ctx = ctx;
  this.keys = this.game.keys;
  this.page = 1;
  this.startTime = 0;
  this.setUpListeners()
}
var array = []


GameView.MOVES = ["q","w","e","r"];
// window.array = array;

GameView.prototype.run = function(){
  var that = this;
  // window.setInterval(function(){
  //   songTime = new Date().getTime()/1000 - that.startTime
  //   songTime = Math.round(songTime*2)/2
  //   that.game.addNotes(songTime)
  // },500)

  // document.addEventListener("keydown",function(){array.push(new Date().getTime()/1000 - that.startTime)})
  window.setInterval(function(){
    songTime = new Date().getTime()/1000 - that.startTime
    songTime = Math.round(songTime*10)/10

    that.game.addNotes(songTime)
  },100)
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
  var that = this;
  if(this.page === 2){
      this.run();
        setTimeout(function(){
        var music = document.getElementById('music')
        that.songStarted();
        console.log('SONG STARTED')
        music.addEventListener('canplaythrough', music.play(), false)
      },5000)
      this.startButton.className = "hidden";
  }
}

GameView.prototype.songStarted = function(){
  this.startTime = new Date().getTime()/1000
}

module.exports = GameView
