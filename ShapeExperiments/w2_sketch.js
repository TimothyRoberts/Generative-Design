const gridResolution = 50;
let tileW;
let ang = 0;
let roll;
let seedValue = 0;


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
  randomSeed(seedValue);
  ang++;

  for(let i = 0; i < gridResolution; i++) {
    for(let j = 0; j < gridResolution; j++){
      roll = Math.floor(random(2));

      push();
      translate(i*tileW, j*tileW);
      rotate(0);
      strokeWeight(10);
      stroke(252, 189, 42);
      fill(252, 189, 42);

      if(roll == 0) {
        line(-tileW/2, tileW/2, tileW/2, -tileW/2);
      } else if(roll == 1) {
        rotate(90);
        line(-tileW/2, tileW/2, tileW/2, -tileW/2);
      }
      pop();
    }
  }

}

function mousePressed() {
  background(0);
  seedValue = Math.floor(random(100));
}
