var puck, left, right, paddleSpeed;

function setup() {
  createCanvas(windowWidth - 4, windowHeight - 4);
  puck = new Puck();
  left = new Paddle(true);
  right = new Paddle(false);
  paddleSpeed = width / 60;
}

function draw() {
    background(0);

    puck.checkPaddleLeft(left);
    puck.checkPaddleRight(right);

    left.show();
    right.show();
    left.update();
    right.update();

    puck.update();
    puck.edges();
    puck.show();

    fill(255);
    textSize(32);
    text(puck.leftscore, 10, 40);
    text(puck.rightscore, width-20, 40);

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

