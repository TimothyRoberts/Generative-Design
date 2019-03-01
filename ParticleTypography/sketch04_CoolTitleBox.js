let incrementX = 0.05;
let incrementY = 0.05;
let incrementZ = 0.0001;
let scale = 40;
let cols, rows;
let magnitude = 0.2;
let f;

const particles = [];
const flowfield = [];

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('canvasContainer');
  cols = floor(width / scale);
  rows = floor(width / scale);


    f = new Flowfield(scale, magnitude, incrementX, incrementY, incrementZ);
    f.updateFlowfield();

    for(let i = 0; i < 580; i++) {
      particles[i] = new Particle();
    }
}

function draw() {
  background(0, 90);
  for(let i = 0; i < particles.length - 1; i++) {
    // f.updateFlowfield();
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  f.updateFlowfield();
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
