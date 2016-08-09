var Note = require('./note');
var Game = require('./game');

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
