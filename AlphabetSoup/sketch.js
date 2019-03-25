/**
 * type using pixels of an invisibly draw text to draw a grid of dots 
 *
 * KEYS
 * a-z                  : text input (keyboard)
 * backspace            : delete last typed letter
 * ctrl                 : save png
 */

var textTyped = "ABC";

var font;
var fontSize = 250;
var textImg;

var pointDensity = 8;


function preload() {
  font = loadFont("data/FreeSansBold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupText();
}

function setupText() {
  // create an offscreen graphics object to draw the text into
  textImg = createGraphics(width, height);
  textImg.pixelDensity(1);
  textImg.background(255);
  textImg.textFont(font);
  textImg.textSize(fontSize)
  textImg.text(textTyped, 100, fontSize + 50);
  textImg.loadPixels();
}


function draw() {
  background(255);

  fill(0);
  noStroke();

  for (var x = 0; x < textImg.width; x += pointDensity) {
    for (var y = 0; y < textImg.height; y += pointDensity) {
      // Calculate the index for the pixels array from x and y
      var index = (x + y * textImg.width) * 4;
      // Get the red value from image
      var r = textImg.pixels[index];

      if (r < 128) {

        // This might be the place to change things. From here ... ---------

        ellipse(x, y, 5, 5);

        // ... to here -----------------------------------------------------

      }
    }
  }

}

function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
      setupText();
    }
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    setupText();
  }
}