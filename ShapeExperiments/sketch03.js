let circleRes = 10;
let radius;
let ang;

function setup() {
  angleMode(DEGREES);
  ellipseMode(CENTER);
  createCanvas(600, 600);
}

function draw() {
  background(252, 189, 42);

  stroke(252, 129, 62);
  // strokeWeight(map(mouseY, 0, height, 0, 20));
  strokeWeight(2);
  circleRes = int(map(mouseY, 0, height, 2, 80));
  radius = map(mouseX, 0, width, 0 - width/2, width/2);
  ang = 360/circleRes;
  constrain(radius, 0, width);

  translate(width/2, height/2);
  push();
  strokeWeight(10);
  fill(252, 159, 42);
  ellipse(0, 0, radius*2, radius*2);
  pop();


  for(let i = 0; i <= circleRes; i++) {
    let pointX = cos(ang*i) * abs(radius);
    let pointY = sin(ang*i) * abs(radius);
    //0, 0, Opposite, Adjecent
    line(0, 0, pointX, pointY);

  }
}
