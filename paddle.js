function Paddle(left) {
  this.y = height / 2;
  this.w = width / 30;
  this.h = height / 4;

  this.ychange = 0;

  if (left) {
    this.x = this.w;
  } else {
    this.x = width - this.w;
  }

  this.update = function() {
    this.y += this.ychange;
    this.y = constrain(this.y, this.h / 2, height - this.h / 2);
  }

  this.move = function(steps) {
    this.ychange = steps;
  }

  this.show = function() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }

}