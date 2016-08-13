function Key(pos,move,idx){
  this.pos = [pos,600];
  this.move = move;
  this.dim_y = 10;
  this.idx = idx
}

Key.CANVAS_POS = [0,215,445,660];
var progress = 0;

Key.prototype.draw = function(ctx){
  var arrow = document.getElementById("arrow");
  ctx.drawImage(arrow,Key.CANVAS_POS[this.idx],0,210,210,this.pos[0],this.pos[1],100,100);
}

module.exports = Key;
