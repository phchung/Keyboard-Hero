var Note = require('./note');
var Game = require('./game');

function Score(game){
  this.bar = 0;
  this.game = game;
}

Score.NOTELANE = [100,215,330,445];

var array = [[18.1,2], [19.4,2], [20.8,2], [22.2,2], [23.6,2], [24.9,2], [26.3,2], [27.6,2], [28.9,2], [30.3,2], [31.7,2],
[  33.1,2], [34.5,2], [35.8,2], [37.2,2], [38.5,2], [39.2,2], [39.9,2], [40.6,2], [41.4,2], [42.6,2], [44,2], [45.4,2], [46.7,2],
[  48.1,2], [49.4,2], [50.1,2], [50.8,2], [52.2,2], [53.6,2], [54.9,2], [56.3,2], [57.6,2], [59,2], [60.3,2], [61,2], [61.7,2], [63.1,2],
[  63.1,2], [65.2,2], [65.2,2], [67.9,2], [70.6,2]]

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
  [1.8,1],
  [3.1,1],
  [4.4,1],
  [5.8,1],
  [7.1,1],
  [8.5,1],
  [9.9,1],
  [11.2,1],
  [12.6,1],
  [13.9,1],
  [15.3,1],
  [16.6,1],
  // all good at this point
  [18.1,2],
  [19.4,2],
  [20.8,2],
  [22.2,2],
  [23.6,2],
  [24.9,2],
  [26.3,2],
  [27.6,2],
  [28.9,2],
  [30.3,2],
  [31.7,2],
  [33.1,2],
  [34.5,2],
  [35.8,2],
  [37.2,2],
  [38.5,2],
  [39.2,2],
  [39.9,2],
  [40.6,2],
  [41.4,2],
  [42.6,2],
  [44,2],
  [45.4,2],
  [46.7,2],
  [48.1,2],
  [49.4,2],
  [50.1,2],
  [50.8,2],
  [52.2,2],
  [53.6,2],
  [54.9,2],
  [56.3,2],
  [57.6,2],
  [59,2],
  [60.3,2],
  [61,2],
  [61.7,2],
  [63.1,2],
  [63.1,2],
  [65.2,2],
  [65.2,2],
  [67.9,2],
  [70.6,2],
  
  // 75second SONGTIME
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
