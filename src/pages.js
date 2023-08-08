
let paddle;
let ball;
// Important objects

let bricks= [];
let levelIndex= 0;
let generator;
let powers= [];
let extraLifeThreshold= 500;

let frequencies= [65.41, 73.42, 82.41, 92.5, 103.83, 116.54, 130.81];

function getFreq(i) {
	let note= i % frequencies.length;
	let octave= Math.trunc(i/frequencies.length + 1);

	console.log(note + ", " + octave);
	
	return frequencies[note] * octave;
}
// Level management

let lives= 4;
let multiplier= 1;
let score= 0;
const boostStart= 10;
const cooldownStart= 200;

let cooldownTime= 0;
let boostTime= 0;

const NONE= "none";
const MAGNET= "magnet";
const BOMB= "bomb";
let ability= NONE;
// Hud elements & player data

let diedAnim;
// Animations

let page= "title";

let abilityBar;

function title() {	
  // title screen using bricks
  titleScreen();
  for (const brick of bricks) {
    // brick.draw();
  }
  
	textSize(50);
	fill(255);
	textSize(40);
	textFont("monospace");
	textAlign(CENTER);
	text("Press Enter to Begin", width/2, height/2);

  // start the game when pressing enter
	if(keyCode == 13) {
    bricks.length = 0;
    page = "game";
  }
	return;
}

// called inside draw() many times
function game() {
  // generate level and hud
	generateBricks(levelIndex);
	hud();

	if (lives <= 0) {
		gameOver();
		return;
	}

  // are there any bricks left on the field?
	let brickExists = false;

	strokeWeight(1);
	stroke(0);
  // checking over bricks
	for (let i in bricks) {
		const brick = bricks[i];

    // brick is destroyed
		if (!brick) continue;

    // discard offscreen bricks
    // should we place checks like this in the level generation function?
		if (brick.pos.x + brick.size.x > width) {
      bricks[i]= null;
    }

    // discard bricks with no health left and increase score
		if (brick.hits <= 0) {
			bricks[i]= null;
			score += multiplier * 10;
			continue;
		}
		
    if (ball.isColliding(brick)) {
      // reflect ball
      ball.vel.y *= -1;
      // reduce brick lifepoint
			brick.hits -= ball.damage;
			// Remember to ask Ivan about where this is used later - Reign
      // this is used in case we decide to add +damage ability

      // play sound

			square.freq(getFreq(multiplier-1));
			square.start();
			square.stop(0.1);

			multiplier++;
			continue;
    }
		brick.draw();

		brickExists= true;
	}
	// Brick updates
	
	if (!brickExists && generator.phase == POSTGEN) {
		generator.phase= PREGEN;
		levelIndex ++;
	}
	// Generate next level once current one is complete

	if(keyIsDown(83) && cooldownTime <= 0) {
		boostTime= boostStart;
		console.log("Boosting");
	}
	// When cooldown is over, start boost countdown

	if(boostTime > 0) {
		textSize(20);
		text("Boost: " + boostTime, width - 100, 100);
		boostTime --;

		if(boostTime == 0) cooldownTime= cooldownStart;
	}
	// Continue boost countdown
	
	if(cooldownTime > 0) {
		textSize(20);
		text("Cooldown: " + cooldownTime, width - 100, 100);

		cooldownTime --;
		// Continue cooldown counter
	} else {
		if(ball.vel.x < 0) ball.vel.x= -ball.standardVel.x;
		if(ball.vel.x > 0) ball.vel.x= ball.standardVel.x;
		// Reset velocity when cooldown ends
	}
	// You can press S to boost if you time it right.


  // paddle ball collision
	if(ball.isColliding(paddle)) {
    // bounce ball and disable ghost mode
		ball.vel.y *= -1;
		ball.ghost= false;

    // reset multiplier
		multiplier= 1;

		let b= 1;

		if(boostTime > 0) {
			b= 2;
			boostTime= 0;
			cooldownTime= cooldownStart;
			// If collides in boostTime, a boost is created
		}
		
		if(paddle.vel.x < 0) ball.vel.x= -Math.abs(ball.vel.x);
		else if(paddle.vel.x > 0) ball.vel.x= Math.abs(ball.vel.x);

		ball.vel.x *= b;
	}

  // extra life when reaching certain scores
	if(score > extraLifeThreshold) {
		lives ++;
		extraLifeThreshold *= 2.5;
	}

  // available index in power array
	let freeIndex= -1;

  // generate power dots
	for(let i in powers) {		
		let power= powers[i];

		if(!power) continue;

    // discard offscreen dots
		if(power.isOffScreen()) {
			powers[i]= null;
			freeIndex= i;
			continue;
		}
		
		power.update();
		power.draw();

    // disable ability when ability bar is 0
		if(ability != NONE && abilityBar.percent <= 0) {
      // reset ball's velocity to its base speed
			ball.vel= ball.standardVel.copy();
			abilityBar.percent= 0;
			ability= NONE;
		}

    // increase abilityBar when collecting dots
		if(power.isColliding(paddle) && ability == NONE) {
			powers[i]= null;
			abilityBar.percent += 0.025;
			freeIndex= i;

      // get ability upon filling ability bar
			if(abilityBar.percent >= 1) ability= MAGNET;
		}

    // decrease ability bar when an ability is in use
		if(ability != NONE) {
			abilityBar.percent -= 0.0005;
		}
	}

  // make a new power dot at the next available index
	if(freeIndex > -1) {
		powers[freeIndex]= new Power();
	}
	
	paddle.update();
	paddle.draw();

  ball.update();
  ball.draw();
};

function gameOver() {
	let response= "";
	multiplier= 1;

	strokeWeight(1);
	stroke(0);
	
	if(score < 500) response= "Nice attempt... At failure!";
	if(score > 1000) response= "Lucky shot.";
	if(score > 2000) response= "Alright, alright.\nYou're getting somewhere...";
	if(score > 3000) response= "This is getting out of hand.";
	if(score > 5000) response= "Alright, I give up. You're the champion.";
	
	fill(255);
	textSize(20);
	text(response, width/2, height/2);

	textSize(20);
	text("[R] to respawn", width/2, height/2 + 100);

  // go to title screen
	if(keyIsDown(82)) {
		page= "title";

    // reset game states
		lives= 3;
		multiplier= 1;
		score= 0;

		abilityBar.percent= 0;
		triangleStarted= false;
		ball.pos.y= height + 100;
		
		cooldownTime= 0;
		boostTime= 0;
		levelIndex= 0;
		generator= new Generator();
		bricks= [];
	}
}

function hud() {
	let livesX= width/3 - 50;
	textSize(30);
	fill(0, 230, 0);
	textFont("monospace");
	
	if(lives < 10) text("X0" + lives, livesX, 100);
	else text("X0" + lives, livesX, 100);

	textSize(15);
	text("Next: " + Math.ceil(extraLifeThreshold), livesX, 120);
 
	fill(255, 0, 0);
	ellipse(livesX - 45, 90, ball.size * 1.2, ball.size * 1.2);
	// Lives display
	

	let scoreX= width/2;
	let scoreY= 100;
	fill(255);
	textSize(30);
	text("Score\n" + score, scoreX, 50);
	// Score display

	function getSize(m) { return 3 ** (m/2) + 17; }

	let size;

	if(multiplier > 10) {
		size= getSize(10);
	} else {
		size= getSize(multiplier);
		fill(255, 255, 0);
	}

	if(multiplier > 8) {
		fill(255, 255, 0, 100);
		scoreY= width/2;
	}
	
	textSize(size);
	text("x" + multiplier,  scoreX + 25, scoreY);
	// Multiplier display

	abilityBar.draw();
}

// GAME SCREENS ABOVE

function generateDiedAnim() {
	diedAnim.addFrame(function(frame) {
		lives --;
	}, null, 0);

	diedAnim.addFrame(function(frame) {
		
	}, null, 1000);

	let drawBall= function(frame) {
		ellipse(width/2, height * 0.25, ball.size, ball.size);
	};

	let doNothing= function() {};

	for(let i= 0; i < 4; i ++) {
		if(i % 2 == 0) diedAnim.addFrame(drawBall, null, 500);
		else diedAnim.addFrame(doNothing, null, 500);
	}

	diedAnim.addFrame(function() {
		ball.pos= createVector(width/2, height * 0.25);
		ball.ghost= true;
		console.log("Relocating ball");
		diedAnim.frame= -1;
	}, null, 1);
}

// GAME ANIMATIONS ABOVE