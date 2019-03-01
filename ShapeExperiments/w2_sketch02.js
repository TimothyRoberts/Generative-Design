const gridResolution = 25;
let tileW;
let ang = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(600, 500);
  background(0);
  ellipseMode(CORNER);
  rectMode(CENTER);
  angleMode(DEGREES);
  tileW = width/gridResolution;

}

function draw() {
  ang++;
  for(let i = 0; i < gridResolution; i++) {
    for(let j = 0; j < gridResolution; j++){
      push();
      translate(i*tileW + tileW/2, j*tileW + tileW/2);
      // rotate(-i * tileW);
      rotate(45);
      // rotate(2);
      stroke(0);
      // strokeWidth(1);
      fill(252, 189, 42);
      rect(0, 0, tileW, tileW);
      pop();
    }
  }

}
