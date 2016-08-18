var Note = require('./note');
var Key = require('./key');
var Score = require('./score')

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
