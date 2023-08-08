/**
	Floating dots that increase the powerup bar. If it reaches
  100%, you get a random powerup.
*/
class Power {
	constructor() {
		this.pos= createVector(random(width), random(height/2, height));
		this.vel= createVector(0, 0);
		this.col= color(random(255), random(255), random(255));
	}

	update() {
		this.pos.add(this.vel);
		this.vel.add(this.acc);

    // move in random directions
		this.acc = createVector(random(-1, 1), random(-1, 1));
		this.vel.limit(2);

		this.dist= p5.Vector.sub(paddle.pos, this.pos);

		// this.dist.rotate(Math.PI);
		this.dist.normalize();
		this.dist.mult(0.05);
		
		this.vel.add(this.dist);
	}

	isColliding(other) {
    // this is only allowed to collide with the paddle
		if (other.constructor.name != "Paddle") {
      return false;
    }
		
    return (this.pos.x > other.pos.x &&
        this.pos.x < other.pos.x + other.size.x &&
        this.pos.y > other.pos.y &&
        this.pos.y < other.pos.y + other.size.y);
  }

	isOffScreen() {
    // for discarding offscreen dots
		return this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0;
	}

	draw() {
		fill(this.col);
		ellipse(this.pos.x, this.pos.y, 10, 10);
	}
}