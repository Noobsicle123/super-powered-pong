function Puck() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = width / 50;
    this.rightscore = 0;
    this.leftscore = 0;

    this.checkPaddleLeft = function(p) {
        if (this.y - this.r < p.y + p.h / 2 && this.y + this.r > p.y - p.h / 2 && this.x - this.r < p.x + p.w / 2) {
            if (this.x > p.x) {
                this.diff = this.y - (p.y - p.h / 2);
                this.rad = radians(45);
                this.angle = map(this.diff, 0, p.h, -this.rad, this.rad);
                this.xspeed = 5 * cos(this.angle);
                this.yspeed = 5 * sin(this.angle);
                this.x = p.x + p.w / 2 + this.r;
            }
        }
    }

    this.checkPaddleRight = function(p) {
        if (this.y - this.r < p.y + p.h / 2 && this.y + this.r > p.y - p.h / 2 && this.x + this.r > p.x - p.w / 2) {
            if (this.x < p.x) {
                this.diff = this.y - (p.y - p.h / 2);
                this.angle = map(this.diff, 0, p.h, radians(225), radians(135));
                this.xspeed = 5 * cos(this.angle);
                this.yspeed = 5 * sin(this.angle);
                this.x = p.x - p.w / 2 - this.r;
            }
        }
    }

    this.update = function() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    this.edges = function() {
        if (this.y < 0 || this.y > height) {
            this.yspeed *= -1;
        }

        if (this.x - this.r > width) {
            this.leftscore += 1;
            this.reset();
        }

        if (this.x + this.r < 0) {
            this.rightscore += 1;
            this.reset();
        }
    }

    this.reset = function() {
        this.x = width / 2;
        this.y = height / 2;
        this.angle = random(-PI / 4, PI / 4);
        this.xspeed = (width/120) * cos(this.angle);
        this.yspeed = (width/120) * sin(this.angle);

        if (random(1) < 0.5) {
            this.xspeed *= -1;
        }
    }

    this.show = function() {
        fill(255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2)
    }
    this.reset();
}