const radius = 150;
const circleRes = 10;
let ang = 360/circleRes;

function setup() {
  angleMode(DEGREES);
  ellipseMode(CENTER);
  createCanvas(600, 600);
}

function draw() {
  background(252, 189, 42);
  stroke(252, 129, 42);
  strokeWeight(5);
  translate(width/2, height/2);
  push();
  strokeWeight(10);
  fill(252, 159, 42);
  ellipse(0, 0, radius*2, radius*2);
  pop();


  for(let i = 0; i <= circleRes; i++) {
    let pointX = cos(ang*i) * radius;
    let pointY = sin(ang*i) * radius;
    //0, 0, Opposite, Adjecent
    line(0, 0, pointX, pointY);

  }

}
