let circleRes = 10;
let radius;
let ang;

function setup() {
  angleMode(DEGREES);
  noFill();
  createCanvas(windowWidth, windowHeight);
  background(252, 189, 42);
}

function draw() {
  if (mouseIsPressed) {
    stroke(252, random(0, 255), random(30, 80), random(30, 80));
    strokeWeight(random(0, 150));
    circleRes = int(map(mouseY, 0, height, 2, 8));
    radius = map(mouseX, 0, width, 0 - width/2, width/2);
    ang = 360/circleRes;
    // constrain(radius, 0, width);

    translate(width/2, height/2);
    rotate(mouseY);
    beginShape();
    for(let i = 0; i <= circleRes; i++) {
      let pointX = cos(ang*i) * abs(radius);
      let pointY = sin(ang*i) * abs(radius);
      //0, 0, Opposite, Adjecent
      // line(0, 0, pointX, pointY);
      vertex(random(pointX, pointX + 200), random(pointY, pointY + 100));
      // rect(0, 0, random(pointX, pointX + 200), random(pointY, pointY + 100));
    }
    endShape(CLOSE);

  }
}

function keyPressed(){
    if(key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}

