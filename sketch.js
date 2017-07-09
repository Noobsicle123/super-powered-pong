var puck, left, right, paddleSpeed;

function preload () {
  song = loadSound('assets/BGM.wav');
  paddleHit = loadSound('assets/paddleHit.wav')
  pointScore = loadSound('assets/pointScore.wav')
  font = loadFont("assets/OpenSans.ttf");
}
function setup() {
  damping = 0.95
  song.setVolume(0.5);
  song.loop();

  //Creates a canvas the size of window, the -4 is to stop scroller from appearing
  createCanvas(windowWidth - 4, windowHeight - 4);

  //Creates variables for the objects, left and right are the paddles.
  puck = new Puck();
  left = new Paddle(true);
  right = new Paddle(false);

  //Paddle speed changes depending on the size of screen
  paddleSpeed = height / 100;
}

function draw() {

  //black background
  background(0);

  //every frame the puck checks if it is touching a paddle, if it is, it will bounce off.
  puck.checkPaddleLeft(left);
  puck.checkPaddleRight(right);

  //shows and changes position of the paddles
  left.show();
  right.show();
  left.update();
  right.update();

  //shows and changes position of the puck, every frame it checks if it is touching top and bottom edge of screens
  puck.edges();
  puck.update();
  puck.show();

  //white text, size 32, shows score for each paddle
  fill(255);
  textSize(48);
  textFont(font);
  text(puck.leftscore, 80, 80);
  text(puck.rightscore, width-110, 80);

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
  
  left.AI();
}

function keyReleased() {
  left.move(0);
  right.move(0);
}

