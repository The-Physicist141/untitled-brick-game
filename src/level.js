/*
	Level generation. Each function can generate a level in an
 	independent way. The only thing that matters is that
	variables are reset in PREGEN and level generation is
 	prevented by POSTGEN.
*/

const PREGEN= "pregen";
const GEN= "generating";
const POSTGEN= "postgen";

class Generator {
	constructor() {
		this.phase= PREGEN;
		/* Generates levels in two phases: perperation, then generation */
		this.blockWidth= random(30, 50);
	}
}

Generator.prototype.level0= function() {

	if(this.phase == POSTGEN) return;
	
	if(this.phase == PREGEN) {
		this.i= 0;
		this.phase= GEN;
		console.log("Beginning level 0 generation");
	}
	
	
	let col= color(0, 100, 0);

	let x= this.i * this.blockWidth + 20;

	if(x + this.blockWidth < width) {
		let b= new Brick(x, 120, this.blockWidth, 30, col);
		bricks.push(b);
		this.i ++;
	} else {
		this.phase= POSTGEN;
		console.log("Level 0 generation complete");
	}
}

Generator.prototype.level1= function() {
	if(this.phase == POSTGEN) {
		return;
	}
	
	if(this.phase == PREGEN) {
		this.i= 0;
		this.j= 0;
		this.phase= GEN;
		console.log("Beginning level 1 generation");
	}

	if(this.i > 2) {
		this.phase= POSTGEN;
		console.log("Level 1 generation complete");
		return;
	}

	if(this.j < width/this.blockWidth) {
		let x= this.j * this.blockWidth + 20;
		let y= 120 + this.i * 30;

		if(this.i == 1) x += 24;

		if(this.i == 1 && this.j + 3 >= width/this.blockWidth) {
			this.j ++;
			return;
		}

		let b= new Brick(x, y, this.blockWidth, 30);
		bricks.push(b);
		
		this.j ++;
	} else {
		this.j= 0;
		this.i ++;
	}
}

Generator.prototype.level2= function() {
	if(this.phase == POSTGEN) {
		return;
	}
	
	if(this.phase == PREGEN) {
		this.i= 0;
		this.j= 0;
		this.phase= GEN;
		console.log("Beginning level 2 generation");
	}

	if(this.i > 1) {
		console.log("Level 2 generation complete");
		this.phase= POSTGEN;
	}

	if(this.j < width/this.blockWidth) {
		let x= this.j * this.blockWidth + 20;
		let y= 120 + this.i * 30;

		if(this.i == 1) x += 24;

		if(this.i == 1 && this.j + 3 >= width/this.blockWidth) {
			this.j ++;
			return;
		}

		let b= new Brick(x, y, this.blockWidth, 30);
		b.hits= 2;
		bricks.push(b);
		
		this.j ++;
	} else {
		this.j= 0;
		this.i ++;
	}
}

Generator.prototype.level3= function() {
	if(this.phase == POSTGEN) {
		return;
	}
	
	if(this.phase == PREGEN) {
    testGenerate();
	}
  
	this.phase = POSTGEN;
}