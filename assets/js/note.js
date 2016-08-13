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
