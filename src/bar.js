/** Represents the powerup bar for the ball */
class Bar {
	constructor() {
		this.capacity= 50,
		this.percent= 0;
		this.x= 0;
		this.y= 0;
	}

	setPos(x, y) {
		this.x= x;
		this.y= y;
	}

	draw() {
    // Change color depending on how filled the bar is
		if(this.percent >= 1) fill(255, 0, 0);
		else if(this.percent > 0.9) fill(247, 84, 2);
		else if(this.percent > 0.5) fill(4, 154, 209);
		else fill(5, 9, 120);
		
		rect(this.x, this.y, this.capacity * this.percent, 20);

		stroke(255);
		strokeWeight(5);
		line(this.x + this.capacity, this.y, this.x + this.capacity, this.y + 20);
	}
}