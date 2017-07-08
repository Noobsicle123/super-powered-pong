var puck, left, right, paddleSpeed;

function preload () {
  BGM = loadSound('assets/BGM.wav');
}

function setup() {
  BGM.play();

  //Creates a canvas the size of window, the -4 is to stop scroller from appearing
  createCanvas(windowWidth - 4, windowHeight - 4);
  //Creates variables for the objects, left and right are the paddles.
  puck = new Puck();
  left = new Paddle(true);
  right = new Paddle(false);
  //Paddle speed changes depending on the size of screen TODO: change this to height (obviously)
  paddleSpeed = width / 60;
}

function draw() {
    //black background
    background(0);

    //every frame the puck checks if it is touching a paddle, if it is, it will bounce off. TODO: make this one method
    puck.checkPaddleLeft(left);
    puck.checkPaddleRight(right);

    //shows and changes position of the paddles
    left.show();
    right.show();
    left.update();
    right.update();

    //shows and changes position of the puck, every frame it checks if it is touching top and bottom edge of screens
    puck.update();
    puck.edges();
    puck.show();

    //white text, size 32, shows score for each paddle TODO: make this look waaayyy nicer
    fill(255);
    textSize(32);
    text(puck.leftscore, 10, 40);
    text(puck.rightscore, width-20, 40);

  //checks for input then moves the paddle accordingly. a/z move left paddle, j/m move right paddle.
  if (keyIsDown(65)) {
    left.move(-paddleSpeed);
  } else if (keyIsDown(90)) {
    left.move(paddleSpeed);
  }

  if (keyIsDown(74)) {
    right.move(-paddleSpeed);
  } else if (keyIsDown(77)) {
    right.move(paddleSpeed);
  }
}

function keyReleased() {
  left.move(0);
  right.move(0);
}

