"use strict";
var puck, left, right, paddleSpeed, onePlayer, gui, reset, song, paddleHit, pointScore, font;
p5.disableFriendlyErrors = true;
onePlayer = true;
reset = false;


function preload() {
    song = loadSound("assets/BGM.wav");
    paddleHit = loadSound("assets/paddleHit.wav");
    pointScore = loadSound("assets/pointScore.wav");
    font = loadFont("assets/OpenSans.ttf");
}

function setup() {
    frameRate(60);
    song.setVolume(0.5);
    song.loop();
    paddleSpeed = height / 20;

    //Creates a canvas the size of window, the -4 is to stop scroller from appearing
    createCanvas(windowWidth, windowHeight);

    //Creates variables for the objects, left and right are the paddles.
    puck = new Puck();
    left = new Paddle(true);
    right = new Paddle(false);

    //Paddle speed changes depending on the size of screen

    sliderRange(0, 100, 1);
    gui = createGui("Settings");
    gui.addGlobals("onePlayer", "reset");
    gui.hide();
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
    text(puck.rightscore, width - 110, 80);

    //checks for input then moves the paddle accordingly. a/z move left paddle, j/m move right paddle.
    if (!reset) {
        if (!left.ai) {
            if (keyIsDown(87)) {
                left.move(-paddleSpeed);
            } else if (keyIsDown(83)) {
                left.move(paddleSpeed);
            }
        }
        if (!right.ai) {
            if (keyIsDown(38)) {
                right.move(-paddleSpeed);
            } else if (keyIsDown(40)) {
                right.move(paddleSpeed);
            }
        }
        if (onePlayer) {
            left.AI();
        } else {
            left.ai = false;
        }
    } else {
        right.y = height / 2;
        left.y = height / 2;
    }

    if (keyIsDown(71)) {
        gui.show();
    }
    if (keyIsDown(72) || keyIsDown(87) || keyIsDown(83) || keyIsDown(38) || keyIsDown(40)) {
        gui.hide();
    }
    textSize(floor(width / 50));;
    textAlign(CENTER);
    text("UP/DOWN for right paddle, W/S for left paddle.", width / 2, height * 0.9)
    text("G to show GUI, H to hide GUI.", width / 2, height * 0.95)

    if (reset) {
        puck.rightscore = 0;
        puck.leftscore = 0;
    }
}

function keyReleased() {
    if (!left.ai) {
        left.move(0);
    }
    right.move(0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    puck = new Puck();
    left = new Paddle(true);
    right = new Paddle(false);
}