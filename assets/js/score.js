var Note = require('./note');
var Game = require('./game');

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
