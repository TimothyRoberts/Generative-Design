let font;
let textImg;
let tileResolution = 30;
let tileWidth = 10;
let fontSize = 300;
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
const flowfield = [];
let particleColor, particleColor2, colorLerp;


function preload() {
  font = loadFont('data/FreeSansBold.ttf');
}


function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('canvasContainer');
  cols = floor(width / scale);
  rows = floor(width / scale);
  background(0);
  particleColor = color(76,16,1, random(100, 255));
  particleColor2 = color(197,124,91, random(100, 255));


  //Creates text graphic
  setUpText();
  // calculateHighlight();


  f = new Flowfield(scale, magnitude, magnitude2, incrementX, incrementY, incrementZ);
  f.updateFlowfield();

  for(let i = 0; i < 580; i++) {
    colorLerp = random(0, 1);
    particles[i] = new Particle(particleColor, particleColor2, colorLerp);
  }
}


// function calculateHighlight() {
  // for(let y = 0; y < height; y+=tileWidth) {
  //   for(let x = 0; x < width; x+=tileWidth) {
  //     let index = (x + y * textImg.width) * 4;
      // textArrayIndex++;
      // if(textArrayIndex < particles.length) {
      //   if(textImg.pixels[index] < 128) {
      //     console.log(particles[]);
      //     console.log("White");
      //     particles[x].fill = 255;
      //   }
      // }


      //save details if within text graphic
//       if(textImg.pixels[index] < 128) {
//         stroke(255);
//       } else {stroke(40);}
//     }
//   }
// }


function draw() {
  // background(0, 90);
  background(0, 90)
  // for(let y = 0; y < height; y+=tileWidth) {
  //   for(let x = 0; x < width; x+=tileWidth) {
  //     let index = (x + y * textImg.width) * 4;
  //
  //     //save details if within text graphic
  //     if(textImg.pixels[index] < 128) {
  //       stroke(255);
  //     } else {stroke(40);}


      for(let i = 0; i < particles.length - 1; i++) {
        // f.updateFlowfield();
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
      }
      f.updateFlowfield();
    }
//   }
// }


function setUpText() {
  textImg = createGraphics(750, 500);
  textImg.pixelDensity(1);
  textImg.background(225);
  textImg.textFont(font);
  textImg.textAlign(CENTER, CENTER);
  textImg.textSize(fontSize);
  textImg.text("FLOWFIELD", width/2, height/2 - fontSize/4);
  textImg.loadPixels();

  console.log("Created text graphic");

  //POPULATES COORDINATE ARRAYS FOR ANIMATING
  // calculateCoordinates();

}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
