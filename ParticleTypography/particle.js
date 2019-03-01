function Particle(pColor1, pColor2, pLerp, x, y) {
    this.pos = createVector(x, y);
    this.endPos = createVector(x, y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxspeed = 4;
    this.h = 0;
    this.pColor1 = pColor1;
    this.pColor2 = pColor2;
    this.pLerp = pLerp;
    this.prevPos = this.pos.copy();

    this.update = function(ms) {
        if(ms > 5) {
          this.maxspeed = 5;
        } else {
          this.maxspeed = ms;
        }
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.follow = function(vectors) {
        var x = floor(this.pos.x / scale);
        var y = floor(this.pos.y / scale);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
        this.update(4)
    }

    this.showText = function() {
      let dist = p5.Vector.sub(this.endPos, this.pos);
      let distSq = dist.magSq();

      let mag = 2;
      dist.setMag(mag);
      this.acc = dist;
      this.update(distSq * 0.004)



    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.showHighlight = function() {
      fill(0);
      // ellipse(this.pos.x, this.pos.y, 1, 1);
    }

    this.show = function() {
      // stroke(lerpColor(this.pColor1, this.pColor2, this.pLerp));
      stroke(255);
      strokeWeight(3);
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
      this.updatePrev();

      // fill(0);
      // ellipse(this.pos.x, this.pos.y, 1, 1);
    }

    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    this.edges = function() {
        if(this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if(this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if(this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if(this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    }

}
