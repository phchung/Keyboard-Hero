var Game = require('./game.js')
var GameView = require('./gameView')

document.addEventListener("DOMContentLoaded", function(){
  // Lower audio volume
  var music = document.getElementById('music');
  music.volume = 0.1

  var canvasEl = document.getElementById("canvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  var ctx = canvasEl.getContext("2d");
  var game = new Game();
  new GameView(game,ctx).startScreen();
})

window.GameView = GameView;
