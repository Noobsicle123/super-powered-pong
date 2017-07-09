//constructor takes a boolean argument that decides whether it is the left paddle or not.
function Paddle(left) {
  //size of paddle is based off the size of the canvas
  this.y = height / 2;
  this.w = width / 50;
  this.h = height / 4;

  this.ychange = 0;

  //chooses positon of the paddle based off whether it's the right or the left one.
  if (left) {
    this.x = this.w;
  } else {
    this.x = width - this.w;
  }

  //this moves the paddle based off the ychange, can't go past the canvas
  this.update = function() {
    this.y += this.ychange;
    this.y = constrain(this.y, this.h / 2, height - this.h / 2);
  }

  //steps integer argument is passed through that determines speed then makes the paddles ychange the speed
  this.move = function(steps) {
    this.ychange = steps;
  }

  //creates a rectangle based off the size variables.
  this.show = function() {
    rectMode(CENTER);
    noStroke();
    fill(255, 255, 255, 65);
    rect(this.x, this.y, width / 40, height / 3.99 + 10, 25);
    stroke(1);
    fill(255, 255, 255, 255);
    rect(this.x, this.y, this.w, this.h, 25);

  }
  this.AI = function(){
    this.y = puck.y *damping
  }
 }
 