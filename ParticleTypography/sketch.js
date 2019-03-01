let font;
let textImg;
let tileResolution = 150;
let tileWidth;
let fontSize = 135;
let textArrayIndex = 0;

let incrementX = 0.05;
let incrementY = 0.05;
let incrementZ = 0.0001;
let scale = 40;
let cols, rows;
let magnitude = 0.2;
let magnitude2 = 0.1;
let f;

const particles = [];
const textCoordinates = [];
const flowfield = [];
let particleColor, particleColor2, colorLerp;
let drawText = false;


function preload() {
  font = loadFont('data/FreeSansBold.ttf');
}


function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('canvasContainer');
  cols = floor(width / scale);
  rows = floor(width / scale);
  textAlign(CENTER, CENTER);
  background(0);
  // particleColor = color(239,104,32, random(50, 255));
  particleColor2 = color(255,247,183, random(200, 255));
  particleColor = color(255,0,0, random(140, 255));
  // particleColor2 = color(197,124,91, random(150, 255));

  tileWidth = Math.floor(width/tileResolution);

  //Creates text graphic
  setUpText();
  setParticles();

  f = new Flowfield(scale, magnitude, magnitude2, incrementX, incrementY, incrementZ);
  f.updateFlowfield();

  for(let i = 0; i < 580; i++) {
  }
}



function setParticles() {

  for(let y = 0; y < height; y+=tileWidth) {
    for(let x = 0; x < width; x+=tileWidth) {
      let index = (x + y * textImg.width) * 4;

      //save details if within text graphic
      if(textImg.pixels[index] < 128) {
        colorLerp = random(0, 1);
        particles.push(new Particle(particleColor, particleColor2, colorLerp, x, y));
        textCoordinates.push(createVector(x, y));

      }

    }
  }
}


function draw() {
  background(253, 190, 0, 150);
  for(let i = 0; i < particles.length; i++) {
    // f.updateFlowfield();
    if(drawText) {
      particles[i].showText();
    } else {
      particles[i].follow(flowfield);
    }
    // particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  f.updateFlowfield();
}



function setUpText() {
  textImg = createGraphics(windowWidth, windowHeight);
  textImg.pixelDensity(1);
  textImg.background(225);
  textImg.textFont(font);
  textImg.textAlign(CENTER, CENTER);
  textImg.textSize(fontSize);
  textImg.text("CHARLOTTE", width/2, height/2);
  textImg.loadPixels();

  console.log("Created text graphic");

  //POPULATES COORDINATE ARRAYS FOR ANIMATING
  // calculateCoordinates();

}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    drawText = true;
  } else if (keyCode === RIGHT_ARROW) {
    drawText = false;
  }
}
