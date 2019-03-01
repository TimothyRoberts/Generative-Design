const incrementX = 0.1;
const incrementY = 0.1;
let incrementZ = 0.003;
// const scale = 60;
const scale = 48;
let cols, rows, f;
// let magnitude = -3.968;
let magnitude = -0.34;
let button;
let slider;
let flowfield = [];

let bgLayers;
let fgLayers;
let layerCount = 140;
let colourFrom, colourTo, colourHighlight, colourHighlight2, colourBG;
let incrementCol = 0.012;
let weight = 20;

// X POS & Y POS
// let xCoord = (420 / 4);
// let yCoord = 250/ 4;
let xCoord = 270 ;
let yCoord = 850;


// ------------------------------
// GENERATE FLOWFIELD AND COLOURS
// ------------------------------
function setup() {


  colorMode(HSB, 360, 100, 100, 100);

    colourBG = color(336, 88, 75);
    colourFrom = color(180, 62, 80, 100);
    colourTo = color(285, 30, 60, 100);
    colourHighlight = color(360, 90, 80, 40);
    colourHighlight2 = color(185, 10, 98, 60);

  button = createButton("Change Flowfield Magnitude!");
  button.mousePressed(changeMagnitude);
  slider = createSlider(-6.08, 6.08, -3.92);
  createP('');

  launchProgram();

}

function launchProgram() {

  createCanvas(1680, 1050);
  colorMode(HSB, 360, 100, 100, 100);
  background(colourBG);
  noiseSeed(10);
  randomSeed(100);
  randomGaussian(10);
  cols = floor(width/scale);
  rows = floor(height/scale);
  bgLayers = [];
  fgLayers = [];

  f = new Flowfield(scale, magnitude, incrementX, incrementY, incrementZ, colourTo);
  f.updateFlowfield();

  for(let i = 1; i < layerCount; i++) {

    bgLayers[i] = new Layer(colourFrom, colourTo, (incrementCol * i),
                            weight, i*0.030, randomGaussian(xCoord, 20),
                            randomGaussian(yCoord, 20));
  }
}


// -------------------------
// UPDATE AND DISPLAY LAYERS
// -------------------------
function draw() {
// Loop through background layers array to update and display
  for(let i = bgLayers.length-1; i > 0; i--) {
    bgLayers[i].follow(flowfield);
    bgLayers[i].update();
    bgLayers[i].updatePrev();
    bgLayers[i].display();
    bgLayers[i].checkEdges();

// When the background layer leaves the canvas, add foreground layer
    if(bgLayers[i].isVisible != true) {
      // f.updateFlowfield();
      // for(let j = 0; j < 2; j++) {
        fgLayers.push(new ForegroundLayer(colourTo, colourHighlight,
                                          incrementCol * i, weight/80,
                                          i, xCoord, yCoord));
      // }
      bgLayers.splice(i, 1);
    }
  }

  // Loop through background layers array to update and display
  for(let i = fgLayers.length-1; i > 0; i--) {
    fgLayers[i].follow(flowfield);
    fgLayers[i].update();
    fgLayers[i].updatePrev();
    fgLayers[i].display();
    fgLayers[i].checkEdges();

    if(fgLayers[i].isVisible != true) {
      fgLayers.splice(i, 1);
      if(i % 30 === 0) {
        fgLayers.push(new HighlightLayer(colourHighlight, colourHighlight2,
                                         incrementCol * (i*2), i*3, i,
                                         randomGaussian(xCoord, 25),
                                         randomGaussian(yCoord, 50)));
        // fgLayers.push(new HighlightLayer(colourHighlight, colourHighlight2,
        //                                  incrementCol * (i*2), i*5, i,
        //                                  randomGaussian(xCoord, 20),
        //                                  randomGaussian(yCoord, 40)));
      }
    }
  }
}

function changeMagnitude() {
  magnitude = slider.value();
  launchProgram();
}


function keyPressed(){
    if(key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');


    if(key == '1'){ // RED / PURPLE
      colourBG = color(340, 90, 80);
      colourFrom = color(328, 90, 80);
      colourTo = color(345, 90, 100);
      colourHighlight = color(130, 30, 80, 5);
      colourHighlight2 = color(130, 35, 80, 25);
      launchProgram();
    } else if(key == '2'){ // BLUE / TEAL
      colourBG = color(180, 90, 70);
      colourFrom = color(185, 90, 80);
      colourTo = color(175, 90, 80);
      colourHighlight = color(38, 65, 90, 5);
      colourHighlight2 = color(40, 70, 90, 35);
      launchProgram();
    } else if(key == '3'){ // YELLOW / ORANGE
      colourBG = color(60, 80, 75);
      colourFrom = color(65, 80, 80);
      colourTo = color(45, 100, 82);
      colourHighlight = color(320, 80, 80, 5);
      colourHighlight2 = color(320, 90, 90, 25);
      launchProgram();
    }  else if(key == '4'){ // GREEN / YELLOW-GREEN
      colourBG = color(120, 70, 75);
      colourFrom = color(140, 80, 80);
      colourTo = color(70, 100, 82);
      colourHighlight = color(30, 80, 80, 5);
      colourHighlight2 = color(30, 90, 90, 25);
      launchProgram();
    } else if(key == '5'){ // ORANGE / RED-ORANGE
      colourBG = color(30, 90, 85);
      colourFrom = color(25, 90, 88);
      colourTo = color(10, 90, 85);
      colourHighlight = color(150, 90, 85, 5);
      colourHighlight2 = color(140, 90, 85, 25);
      launchProgram();
    } else if(key == '6'){ // PINK / BLUE
      colourBG = color(336, 88, 80);
      colourFrom = color(180, 62, 80, 100);
      colourTo = color(115, 2, 60, 80);
      colourHighlight = color(360, 90, 80, 40);
      colourHighlight2 = color(185, 10, 98, 60);
      launchProgram();
    } else if(key == '7'){ // BLUE / PINK
      colourBG = color(182, 80, 80);
      colourFrom = color(330, 85, 80);
      colourTo = color(348, 30, 100);
      colourHighlight = color(130, 30, 30);
      colourHighlight2 = color(130, 35, 80);
      launchProgram();
    } else if(key == '8'){ // GREEN / YELLOW
      colourBG = color(80, 90, 85);
      colourFrom = color(140, 80, 80);
      colourTo = color(70, 100, 82);
      colourHighlight = color(30, 80, 80, 5);
      colourHighlight2 = color(30, 90, 90, 25);
      launchProgram();
    } else if(key == '9'){ // YELLOW / GREEN
      colourBG = color(120, 70, 75);
      colourFrom = color(65, 80, 80);
      colourTo = color(45, 100, 82);
      colourHighlight = color(320, 80, 80, 5);
      colourHighlight2 = color(320, 90, 90, 25);
      launchProgram();
    } else if(key == 'q' || key == 'Q'){ // PINK / PURPLE
      colourBG = color(330, 40, 90);
      colourFrom = color(330, 90, 80);
      colourTo = color(315, 90, 100);
      colourHighlight = color(130, 30, 80, 5);
      colourHighlight2 = color(130, 35, 80, 25);
      launchProgram();
    } else if(key == 'w' || key == 'W'){ // PINK / BLUE
      colourBG = color(334, 40, 95);
      colourFrom = color(195, 40, 90);
      colourTo = color(185, 43, 95);
      colourHighlight = color(130, 10, 95, 5);
      colourHighlight2 = color(130, 5, 100, 45);
      launchProgram();
    }
}
