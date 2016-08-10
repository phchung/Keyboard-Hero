var Note = require('./note');
var Game = require('./game');

function Score(game){
  this.bar = 0;
  this.game = game;
}

Score.NOTELANE = [100,215,330,445];

var array = [5.8, 7.1, 8.4, 9.8, 11.1, 12.5, 13.9, 15.2, 16.6, 17.9, 19.3, 20.6, 21.4,
  22.1, 22.8, 23.5, 24.1, 24.8, 25.6, 26.2, 26.9, 27.6, 28.3, 29.6, 30.3,
  31, 31.6, 32.3, 33.1, 33.8, 34.4, 35, 35.8, 36.5, 37.1, 37.1, 37.8, 37.8,
  38.5, 38.5, 39.2, 39.2]

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

// [time,lane]
Score.SONG = [
  [5.8,1],
  [7.1,1],
  [8.4,1],
  [9.8,1],
  [11.1,1],
  [12.5,1],
  [13.9,1],
  [15.2,1],
  [16.6,1],
  [17.9,1],
  [19.3,1],
  [20.6,1],
  [21.4,1],
  [21.1,1],
  [22.8,1],
  [23.5,1]
]

// Score.prototype.addNotes = function(){
//   var collection = []
//   for (n=0;n<4;n++){
//     var noteIndex = Score.SONG[this.bar].indexOf(Score.SONG[this.bar][n])
//     debugger;
//     var lane = Score.NOTELANE[n]
//     if (Score.SONG[this.bar][n] === '1')
//     collection.push(new Note(lane,n))
//   }
//   this.game.notes = this.game.notes.concat(collection)
//     if(this.bar === 3){
//       this.bar = 0
//     } else {
//       this.bar++
//     }
// }

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
