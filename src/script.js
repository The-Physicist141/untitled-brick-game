

let ballImg, brickImg;
let square, triangle;


function setup() {
  createCanvas(500, 500);

	paddle= new Paddle();
  ball= new Ball();
	generator= new Generator();
	abilityBar= new Bar();

	abilityBar.setPos(width * 2/3, 50);

	diedAnim= new Animation();
	square= new p5.Oscillator("square");
	triangle= new p5.TriOsc();
	
	square.amp(0.1); // Volume, essentially.
	triangle.amp(0.13);

	for(let i= 0; i < 20; i ++) {
		powers.push(new Power());
	}
	
	generateDiedAnim();
}

function draw() {
	background(0);
	
	switch(page) {
		case "title":
			title();
			break;

		case "game":
			game();
			break;
	}
}

function generateBricks(l) {
	switch(l) {
    case 0:
			generator.level0();
			break;

		case 1:
			generator.level1();
			break;

		case 2:
			generator.level2();
			break;
      
    case 3:
      generator.level3();
      break;

		default:
			throw new Error("No level at index " + l);
	}
}

function preload() {
	ballImg= loadImage("img/ball.png");
	brickImg= loadImage("img/brick.png");
}

