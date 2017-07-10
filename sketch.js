"use strict";

/* Super Powered Pong created by Charlie Grimshaw, made with p5.js, p5.sound
and p5.gui.js. It is hosted at https://super-powered-pong.herokuapp.com/ 

The vanilla game is a port of the coding train's pong in Processing (Java), 
link: https://github.com/CodingTrain/Rainbow-Code/tree/master/CodingChallenges
/CC_67_Pong 

The music, sounds and favicon are created by Jacob Morgan. 
His github: https://github.com/S010 */

var puck, left, right, paddleSpeed, onePlayer, gui, reset, song, paddleHit;
var pointScore, font, rightscore, leftscore;

leftscore = 0
rightscore = 0

/* With p5, if you make a p5 error it gives a custom error. For example when 
you use a p5 variable before setup, it gives an error. This can affect
performance so I have disabled it. */
p5.disableFriendlyErrors = true;

// The game is single-player by default
onePlayer = true;

/* When reset is true the game resets and the paddle's positions are set back
to their default. */
reset = false;

// Here I preload the sounds for the game so they are fully loaded before use.
function preload() {
    song = loadSound("assets/BGM.wav");
    paddleHit = loadSound("assets/paddleHit.wav");
    pointScore = loadSound("assets/pointScore.wav");
    font = loadFont("assets/OpenSans.ttf");
    song.setVolume(0.5);
    paddleHit.setVolume(0.8);

}

function setup() {
    song.loop();

    // The speed of the paddles are changed based on the height of the canvas.
    paddleSpeed = floor(height / 20);

    // Creates a canvas the size of browser window.
    createCanvas(windowWidth, windowHeight);

    // Creates variables for the objects, left and right are the paddles.
    puck = new Puck();

    /* Left is true to tell the paddle object that it is the left one and 
    vise-versa. */
    left = new Paddle(true);
    right = new Paddle(false);

    /* Here a create a P5 GUI (using p5.gui) to change the variables:
    "onePlayer", "reset", "paddleSpeed". */
    gui = createGui("Settings");

    // Here I make the sliders go from 0-100 with 1 being the steps.
    sliderRange(0, 100, 1);
    gui.addGlobals("onePlayer", "reset", "paddleSpeed");

    // The GUI is hidden by default.
    gui.hide();
}

function draw() {

    // Every frame the background is made black.
    background(0);

    /* Every frame the puck checks if it is touching a paddle, if it is, it
    will bounce off. */
    puck.checkPaddleLeft(left);
    puck.checkPaddleRight(right);

    /* Here I display update the paddles positions then display them on the
    screen */
    left.update();
    right.update();
    left.show();
    right.show();

    /* Here I check if the puck is touching the edge and if it is, it will
    bounce off */
    puck.edges();
    puck.update();
    puck.show();

    /* Here I draw the score text for both paddles, where the text position
    is changed depending on the size of the canvas */
    fill(255);
    textSize(floor(height * 0.02 + width * 0.02));
    textFont(font);
    textAlign(CENTER);
    text(leftscore, floor(left.w + width * 0.03), floor(height * 0.1));
    text(rightscore, floor(width - (left.w + width * 0.03)), floor(height * 0.1));

    /* This moves the paddles depending on the keys that are pressed, if
    reset is true then the paddles can't be moved */
    if (!reset) {
        // If the left paddle is AI, users won't be able to move it.
        if (!left.ai) {
            if (keyIsDown(87)) {
                left.move(-paddleSpeed);
            } else if (keyIsDown(83)) {
                left.move(paddleSpeed);
            }
        }
        if (keyIsDown(38)) {
            right.move(-paddleSpeed);
        } else if (keyIsDown(40)) {
            right.move(paddleSpeed);
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

    // When you press G, the GUI shows up.
    if (keyIsDown(71)) {
        gui.show();
    }

    // When you press H or try to move a paddle, the GUI hides.
    if (keyIsDown(72) || keyIsDown(87) || keyIsDown(83) || keyIsDown(38) || keyIsDown(40)) {
        gui.hide();
    }

    /* Here it writes help text for the user that says what keys you need to
    press */
    textSize(floor(width / 50));;
    textAlign(CENTER);
    text("UP/DOWN for right paddle, W/S for left paddle.", width / 2, height * 0.9);
    text("G to show GUI, H to hide GUI.", width / 2, height * 0.95);

    // When the game is reset, the scores are reset.
    if (reset) {
        rightscore = 0;
        leftscore = 0;
    }
}

// When a key is released the paddles stop moving, this smoothes the movement.
function keyReleased() {
    if (!left.ai) {
        left.move(0);
    }
    right.move(0);
}

/* When the window is resized the objects are created again giving them new
positions */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    puck = new Puck();
    left = new Paddle(true);
    right = new Paddle(false);
}