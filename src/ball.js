/** Represents the ball of the game */
class Ball {
  constructor() {
    this.pos= createVector(width/2, height + 100);
		// The reason it is below is to trigger the 
    // animation without requiring a failure

    // standard vel to reset to after boosting
		this.standardVel= createVector(3, 5);
    // velocity of the ball
    this.vel= createVector(3, 5);

    this.color= color(255, 0, 0);
    this.size= 20;
    
    // whether to trigger collision against bricks
		this.ghost = true;
    // damage done towards bricks
    this.damage = 1;
  }

  update() {
    this.pos.add(this.vel);

    // reflect vel when it hits the edge of the screen
    if (this.pos.x - this.size/2 < 0) {
      this.vel.x *= -1;
    } else if (this.pos.x + this.size/2 > width) {
			// This ensures the direction. If the direction is not ensured, 
      // the ball may get stuck at unpredictable intervals.
      this.vel.x= Math.abs(this.vel.x) * -1;
    }

    if(this.pos.y - this.size/2 < 0) {
      this.vel.y= Math.abs(this.vel.x);
    }

    // ball is out of bounds
		if (this.pos.y + this.size/2 > height) {
    	diedAnim.play();

      // reset velocity
			if (ball.vel.x < 0) ball.vel.x= -ball.standardVel.x;
			if (ball.vel.x > 0) ball.vel.x= ball.standardVel.x;

      // reset abilitiy
			abilityBar.percent= 0;
			ability= NONE;
    }

		this.ability();
  }

	ability() {
    // ball seeks the nearest brick
		if (ability == MAGNET) {
			this.ghost = false;

      // position of closest brick
			let brickPos;
      // current shortest distance
			let distance = Infinity;
			
      // find the closest brick to ball
			for (const brick of bricks) {
				if (!brick) continue;
        
				let d = dist(this.pos.x, this.pos.y, brick.pos.x + brick.size.x/2, brick.pos.y + brick.size.y/2);
        
        // lock onto the brick's position
				if (d < distance) {
          distance = d;
          brickPos = brick.pos;
        }
			}

      // change velocity to go after the brick
			let seekVel = p5.Vector.sub(brickPos, this.pos);
			seekVel.normalize();

			ball.vel.add(seekVel);
      // limit speed
			ball.vel.limit(2);
		}
    //else if (ability == DAMAGE) {
    //  this.damage = 2
    //}
	}

  isColliding(other) {
    // ball does not collide if in ghost mode unless other is a paddle
		if (this.ghost && other.constructor.name != "Paddle") {
      return false;
    }
		
    return (this.pos.x > other.pos.x &&
        this.pos.x < other.pos.x + other.size.x &&
        this.pos.y > other.pos.y &&
        this.pos.y < other.pos.y + other.size.y);
  }
  
  draw() {
    // make ball more transparent if it is a ghost
		if (this.ghost) this.color.setAlpha(100);
		else this.color.setAlpha(255);
		
		/* Credit to Ivan for teaching me about the
		p5.Color.setAlpha method; I wouldn't have known about 
		it. */
		
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}