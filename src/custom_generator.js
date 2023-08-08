/** 
 * Generates a level using a 2D array of numbers which
 * specifies the hitpoint of bricks. Draws the bricks
 * and also add them to out_array.
 * @param {array} in_array - 2D array representing brick placement
 * @param {number} width - width of blocks
 * @param {number} height - height of blocks
 */
function generate(in_array, width, height) {
  // positioning
  let startx = 20;
  let x = 20;
  let y = 120;

  // we might want a dict of hitpoints to colors
  const colors = color(255, 255, 0);

  // read the array
  for (let row of in_array) {
    for (const i of row) {
      if (i > 0) {
        let brick = new Brick(x, y, width, height, colors, i);
        bricks.push(brick);
      }
      x += width;
    }
    // increment row
    y += height;
    // reset column
    x = startx;
  }
}

function testGenerate() {
  in_array = [[0, 1, 0, 1, 0, 0, 1],
              [0, 1, 2, 1, 0, 0, 0],
              [0, 1, 0, 1, 0, 0, 1]];
  generate(in_array, 50, 30);
}

function titleScreen() {
  in_array = [[1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1],
              [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
              [1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
              [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
              [1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0]];
  generate(in_array, 22, 15);
}

function levelGenerate() {
  in_array = [[0, 2, 2, 2, 0, 0, 2, 2, 2, 0],
              [0, 2, 1, 2, 0, 0, 2, 1, 2, 0],
              [0, 2, 2, 2, 0, 0, 2, 2, 2, 0]
              [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
              [0, 1, 1, 1, 1, 1, 1, 1, 1, 0]];
  generate(in_array, 50, 30);
}