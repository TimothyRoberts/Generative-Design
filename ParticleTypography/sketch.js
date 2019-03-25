let font;
let textImg;
let tileResolution = 100;
let tileWidth;
let fontSize = 250;
let textArrayIndex = 0;
let sw = 4;
let alpha = 112;

let incrementX = 0.05;
let incrementY = 0.05;
let incrementZ = 0.0001;
let scale = 40;
let cols, rows;
let magnitude = 0.2;
let magnitude2 = 0.1;
let f;

let particles = [];
let textCoordinates = [];
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

  //create default colors (lerps from 1 to 2)
  particleColor = color(239,104,32, random(150, 255));
  particleColor2 = color(197,124,91, random(200, 255));


  input = createInput('').addClass('input is-medium is-rounded inputBox');
  input.parent('textBox');
  input.changed(newText);

  fontSizeSlider = createSlider(0, 30, 15);
  fontSizeSlider.parent('fontSizeController');
  fontSizeSlider.mouseReleased(newText);

  pointSizeSlider = createSlider(1, 15, sw);
  pointSizeSlider.parent('pointSizeController');
  pointSizeSlider.mouseReleased(newText);

  alphaSlider = createSlider(1, 20, 5);
  alphaSlider.parent('alphaController');
  alphaSlider.mouseReleased(newText);

  colour1Slider = createInput("#AA5139", "color");
  colour1Slider.parent('colour1Controller');
  colour1Slider.changed(newText);

  colour2Slider = createInput("#D16F23", "color");
  colour2Slider.parent('colour2Controller');
  colour2Slider.changed(newText);

  tileWidth = Math.floor(width/tileResolution);

  //Creates text graphic
  setUpText();
  setParticles();

  f = new Flowfield(scale, magnitude, magnitude2, incrementX, incrementY, incrementZ);
  f.updateFlowfield();

}

//if parameters change from html elements, update text here
function newText() {

  fontSize = map(fontSizeSlider.value(), 0, 30, 150, 350);
  sw = pointSizeSlider.value();
  alpha = map(alphaSlider.value(), 0, 20, 250, 10);
  console.log(colour1Slider.value());
  // particleColor = hexToRgb(colour1Slider.value());

  particleColor = color(
    hexToRgb(colour1Slider.value()).r,
    hexToRgb(colour1Slider.value()).g,
    hexToRgb(colour1Slider.value()).b
  );

  particleColor2 = color(
    hexToRgb(colour2Slider.value()).r,
    hexToRgb(colour2Slider.value()).g,
    hexToRgb(colour2Slider.value()).b
  )

  if(input.value().length == 0) {
    drawText = false;
  } else {drawText = true;}

  particles = [];
  setUpText();
  setParticles();

}


//sets particle amount and target coordinates for each particle
function setParticles() {

  for(let y = 0; y < height; y+=tileWidth) {
    for(let x = 0; x < width; x+=tileWidth) {
      let index = (x + y * textImg.width) * 4;

      //save details if within text graphic
      if(textImg.pixels[index] < 128) {
        colorLerp = random(0, 1);
        particles.push(new Particle(particleColor, particleColor2, colorLerp, x, y, sw));
        textCoordinates.push(createVector(x, y));

      }
    }
  }
}

//draws particles and updates flowfield each frame
function draw() {
  background(0, alpha);

  for(let i = 0; i < particles.length; i++) {
    //if drawText is true, particles follow text coordinates
    if(drawText) {
      particles[i].showText();
    }
    //otherwise particles follow flowfield
    else {
      particles[i].follow(flowfield);
    }
    //ensures the particles are within the canvas
    particles[i].edges();
    //displays particles
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
  //if there's no text, it defaults to "TYPE"
  if(input.value().length == 0) {
    textImg.text("TYPE", width/2, height/2 - 50);
  } else {
    textImg.text(input.value(), width/2, height/2 - 50);
  }
  textImg.loadPixels();

  console.log("Created text graphic");

}

//Resizes canvas when window is resized
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}


//forms and breaks apart text
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    drawText = false;
  } else if (keyCode === RIGHT_ARROW) {
    drawText = true;
  }
}

//Converts hex values to rgb
function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

//launches when form and break buttons are clicked
function leftPressed() {drawText = false;}
function rightPressed() {drawText = true;}
