class Layer {
  constructor(colFrom, colTo, colInc, weight, divideWeight, wPos, hPos) {
    this.hPos = 670;
    this.wPos = 275;
    this.colFrom = colFrom;
    this.colTo = colTo;
    this.colInc = colInc;
    this.weight = weight/divideWeight;
    this.bgTo = lerpColor(colourFrom, colourTo, 1);
    this.wOff = 0;
    this.pos = createVector(wPos, hPos);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxspeed = 30;
    this.isVisible = true;
    this.prevPos = this.pos.copy();
  }


    update() {
        this.vel.add(this.acc);
        // this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    follow(vectors) {
        var x = floor(this.pos.x / scale);
        var y = floor(this.pos.y / scale);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    display() {
        strokeWeight(map(noise(this.wOff), 0, 1, 0, this.weight));
        this.currentColour = lerpColor(this.colFrom, this.bgTo, this.colInc);
        stroke(this.currentColour, 0);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
        this.wOff += 0.01;
    }

    updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    checkEdges() {
      if(this.pos.x < 0) {
        this.isVisible = false;
      }
      if(this.pos.x > width) {
        this.isVisible = false;
      }
      if(this.pos.y < 0) {
        this.isVisible = false;
      }
      if(this.pos.y > height) {
        this.isVisible = false;
      }
    }
}

class ForegroundLayer extends Layer {
  constructor(colFrom, colTo, colInc, weight, divideWeight, hPos, wPos, incPosX) {
    super(colFrom, colTo, colInc, weight, divideWeight, hPos, wPos, incPosX);
    this.bgTo = lerpColor(colourFrom, colourTo, 0.33);
    // this.colHL = colourHighlight;
    this.fgTo = lerpColor(colourFrom, colourTo, 1);
    this.maxspeed = 50;
    this.prevPos = this.pos.copy();
  }

  display() {
      strokeWeight(map(noise(this.wOff), 0, 1, this.weight/2, this.weight));
      stroke(lerpColor(this.bgTo, this.colTo, this.colInc));
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
      this.wOff += 0.01;
  }
}

class HighlightLayer extends Layer {
  constructor(colFrom, colTo, colInc, weight, divideWeight, hPos, wPos, incPosX) {
    super(colFrom, colTo, colInc, weight, divideWeight, hPos, wPos, incPosX);
    this.colFrom = colFrom;
    this.colTo = colTo;
    this.maxspeed = 5;
    this.prevPos = this.pos.copy();
  }


  display() {
      strokeWeight(this.weight);
      stroke(lerpColor(this.colFrom, this.colTo, this.colInc));
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
      this.wOff += 0.01;
  }
}
