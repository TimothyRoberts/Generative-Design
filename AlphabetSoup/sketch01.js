'use strict'

var textTyped = "";

var font;
var fontSize = 250;
var textImg;

var pointDensity = 8;

var letters = [];

function preload() {
  font = loadFont("data/VarelaRound-Regular.ttf");
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    ellipseMode(CENTER);
    textAlign(CENTER, CENTER);
  }


  function draw() {
    background(255);

    fill(230);
    ellipse(width/2, height/2, 550, 550);

    // fill(85);
    // rect(width/2, height/2, mouseX, mouseY);

    fill(243, 119, 42);
    ellipse(width/2, height/2, 500, 500);

    fill(0);
    noStroke();

    for (let i = 0; i < letters.length; i++) {
        letters[i].draw();
    }

  }


  function keyTyped() {
    if (keyCode >= 32) {
    //   textTyped += key;
    //   setupText();
        //createNewLetter(key);
        var posX = floor(randomGaussian(width/2, 85));
        var posY = floor(randomGaussian(height/2, 35));
        letters.push(new Letter(key, posX, posY, 0, random(-38, 38)));
    }
  }

//   function createNewLetter(k) {
//     // textTyped += k;
//     // setupText();
//     console.log(k)
//     fill(0);
//     textSize(32);
//     text(k, width/2, height/2);
//   }

class Letter {
    constructor(k, x, y, opac, rotate) {
        this.letter = k.toUpperCase();
        this.x = x;
        this.y = y;
        this.vx = random(-3, 3);
        this.vy = random(-4, 4);
        this.opac = opac;
        this.rotate = rotate;
    }

    draw() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;


        var mvx = mouseX - pmouseX;
        var mvy = mouseY - pmouseY;
        var mdist = dist(this.x, this.y, mouseX, mouseY)
        var fac = 0.1 / (mdist / 5 + 1);

        this.vx += mvx * fac;
        this.vy += mvy * fac;

        // check if (x, y) is outside circle
        if (dist(this.x, this.y, width/2, height/2) > 250-25) {
            var a = atan2(this.y - height/2, this.x - width/2);
            var vxn = this.vx * cos(-a) - this.vy * sin(-a);
            var vyn = this.vy * cos(-a) + this.vx * sin(-a);

            vxn = -vxn;

            this.vx = vxn * cos(a) - vyn * sin(a);
            this.vy = vyn * cos(a) + vxn * sin(a);
        }






        fill(243, 164, 42, this.opac);
        textSize(64);
        strokeWeight(0);

        push();
        translate(this.x, this.y);
        rotate(radians(this.rotate * 1.98));
        text(this.letter, 0, 0);
        pop();

        this.opac += 3;
        // if (this.opac > 250) {
        //     this.opac  ++;
        // } else {this.opac  = 251;}
    }
}
