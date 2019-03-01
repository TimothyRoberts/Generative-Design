
class Flowfield {
  constructor(scale, magnitude, magnitude2, incrementX, incrementY, incrementZ) {
    this.scl = scale;
    this.mag = magnitude;
    this.mag2 = magnitude2;
    this.incX = incrementX;
    this.incY = incrementY;
    this.incZ = incrementZ;
    this.cols = floor(width/scale);
    this.rows = floor(height/scale);
    this.zOff = 0.005;
  }

  updateFlowfield() {
    this.yOff = 0;
    for(let y = 0; y < this.rows; y++) {
      this.xOff = 0;
      for(let x = 0; x < this.cols; x++) {

        this.index = x + y * cols;
        // Creates noise angle between 0 and 180 * 2 (360)
        this.angle = noise(this.xOff, this.yOff, this.zOff) * TWO_PI * 4;
        this.vec = p5.Vector.fromAngle(this.angle);

        this.vec.setMag(random(this.mag, this.mag2));
        flowfield[this.index] = this.vec;
        this.xOff += this.incX;

        // push();
        // translate(x * this.scl, y * this.scl);
        // rotate(this.vec.heading());
        // stroke(0);
        // strokeWeight(1);
        // line(0, 0, this.scl, 0);
        // pop();

      }
      this.yOff += this.incY;
      this.zOff += this.incZ;
    }
  }

}
