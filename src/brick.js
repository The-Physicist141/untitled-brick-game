/** Represents bricks */
class Brick {
	constructor(x, y, w, h, c, hits) {
		this.pos= createVector(x, y);
		this.size= createVector(w, h);
		this.col= c || color(255, 255, 0);
    
    // how many hits to destroy the brick
    this.hits = hits || 1;
    
    // some bricks can move
		this.speed= 0;

    // color mapping for health
    this.colors = [
			color(255, 255, 0),
      color(0, 100, 0),
			color(0, 255, 255),
    ]
	}

	draw() {
		tint(this.colors[this.hits-1]);
    //fill(this.colors[this.hits]);
		
		// rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		imageMode(CORNER);
		image(brickImg, this.pos.x, this.pos.y, this.size.x, this.size.y);

    // brick movement
		this.pos.x += this.speed;
		if(this.pos.x > width) { this.pos.x= -this.size.x; }
		if(this.pos.x < -this.size.x) { this.pos.x= width; }
	}
}