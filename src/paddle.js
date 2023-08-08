class Paddle {
	constructor() {
    // start the paddle in the middle of the screen on the bottom
		this.pos = createVector(width/2, height * 0.75);
		this.vel = createVector(5, 0);
		this.size = createVector(75, 20);
	}

	update() {
		
    // check keys for movement
    if(keyIsDown(LEFT_ARROW)) {
      this.vel.x= -5;
    } else if(keyIsDown(RIGHT_ARROW)) {
      this.vel.x= 5;
    } else this.vel.x= 0;

		this.pos.add(this.vel);

    // do not allow paddle to move offscreen
    if(this.pos.x < 0) {
      this.pos.x = 0;
    } else if (this.pos.x + this.size.x > width) {
      this.pos.x = width - this.size.x;
    }
	}

	draw() {
		fill(255);
		stroke(0);
		strokeWeight(1);

		rect(this.pos.x, this.pos.y, this.size.x, this.size.y, 5);
	}
}