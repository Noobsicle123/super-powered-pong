function Puck() {

    //Puck starts in the centre of the screen
    this.x = width / 2;
    this.y = height / 2;

    //puck size depends on the width of screen
    this.r = width / 160 + height / 100;
    this.rightscore = 0;
    this.leftscore = 0;

    //Checks to see if puck is hitting left paddle, if it is, it will bounce off at an angle depending on where it hits the paddle.
    this.checkPaddleLeft = function(p) {
        if (this.y - this.r < p.y + p.h / 2 && this.y + this.r > p.y - p.h / 2 && this.x - this.r < p.x + p.w / 2) {
            if (this.x > p.x) {
                this.diff = this.y - (p.y - p.h / 2);
                this.rad = radians(45);
                this.angle = map(this.diff, 0, p.h, -this.rad, this.rad);
                this.xspeed = (width/100) * cos(this.angle);
                this.yspeed = (width/100) * sin(this.angle);
                this.x = p.x + p.w / 2 + this.r;
                paddleHit.setVolume(0.8);
                paddleHit.play();
            }
        }
    }

    //Does the same as checkPaddleLeft put for the right paddle.
    this.checkPaddleRight = function(p) {
        if (this.y - this.r < p.y + p.h / 2 && this.y + this.r > p.y - p.h / 2 && this.x + this.r > p.x - p.w / 2) {
            if (this.x < p.x) {
                this.diff = this.y - (p.y - p.h / 2);
                this.angle = map(this.diff, 0, p.h, radians(225), radians(135));
                //dynamically changes the speed based off width
                this.xspeed = (width/100) * cos(this.angle);
                this.yspeed = (width/100) * sin(this.angle);
                this.x = p.x - p.w / 2 - this.r;
                paddleHit.setVolume(0.8);
                paddleHit.play();
            }
        }
    }

    //this changes the position of the puck based on it's speed
    this.update = function() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    //this checks if it has touched the top or bottom of the screen and if so, it will bounce off. Also checks if someone has scored.
    this.edges = function() {
        if (this.y < 0 || this.y > height) {
            this.yspeed *= -1;
        }

        if (this.x - this.r > width) {
            this.leftscore += 1;
            this.reset();
            pointScore.play();
        }

        if (this.x + this.r < 0) {
            this.rightscore += 1;
            this.reset();
            pointScore.play();
        }
    }

    //the reset function is called when the someone has scored and resets the ball too its origin with a random direction and angle
    this.reset = function() {
        this.x = width / 2;
        this.y = height / 2;
        this.angle = random(-PI / 4, PI / 4);

        //dynamically changes the speed based off width, 
        this.xspeed = (width/100) * cos(this.angle);
        this.yspeed = (width/100) * sin(this.angle);

        if (random(1) < 0.5) {
            this.xspeed *= -1;
        }
    }

    //this creates a ellipse for the puck to be displayed based off the radius (r) variable
    this.show = function() {
        fill(255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2)
    }
    this.reset();
}