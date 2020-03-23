function createParticles() {

  types.forEach((type, index) => {
    for (var i = 0; i < particlePerType; i++) {
      let x = ranNum(spawnMargin, size[0] - spawnMargin)
      let y = ranNum(spawnMargin, size[1] - spawnMargin)
      let newParticle = {
        type: index,
        position: { x, y },
        velocity: { x: Math.random() * 20, y: Math.random() * 20 },
      }
      particles.push(newParticle)
    }
  })
}

function setup() {
  createCanvas(size[0], size[1]);
  colorMode(HSB, 255)
  generateTypes()
  createParticles()
}

function windowResized() {
  size = [window.innerWidth, window.innerHeight]
  resizeCanvas(size[0], size[1]);
}

function draw() {
  background(0);

  particles.forEach((particle, index) => {
    fill((particle.type) / amountOfTypes * 255, 255, 255, 255)
    circle(particle.position.x, particle.position.y, particleDiameter)
    if (drawDebug) {
      noFill()
      Object.values(types[particle.type].forces).forEach((x, index) => {
        if (index == particle.type) return
        stroke((index) / amountOfTypes * 255, 255, 255, 255)
        circle(particle.position.x, particle.position.y, x.minR)
        circle(particle.position.x, particle.position.y, x.maxR)
      })
    }
  })

  update()
}

function update() {
  for (var i = 0, n = particles.length; i < n; i++) {
    let particle = particles[i]
    //Gravity
    particle.velocity.x += gravityX
    particle.velocity.y += gravityY

    //Inner forces
    calculateForces(particle)

    checkEdges(particle)

    particle.position.x += particle.velocity.x
    particle.position.y += particle.velocity.y

    particle.velocity.x *= 1 - friction
    particle.velocity.y *= 1 - friction


  }
}



function calculateForces(particle) {
  if (interactions) {
    let p = particle
    for (var i = 0, n = particles.length; i < n; i++) {
      let q = particles[i]

      let dx = q.position.x - p.position.x;
      let dy = q.position.y - p.position.y;


      if (!walls) {
        if (dx > size[0] * 0.5) {
          dx -= size[0];
        } else if (dx < -size[0] * 0.5) {
          dx += size[0];
        }

        if (dy > size[1] * 0.5) {
          dy -= size[1];
        } else if (dy < -size[1] * 0.5) {
          dy += size[1];
        }
      }


      const r2 = dx * dx + dy * dy;
      const minR = types[p.type].forces[q.type].minR
      const maxR = types[p.type].forces[q.type].maxR;

      if (r2 > maxR * maxR || r2 < 0.01) {
        continue;
      }

      // Normalize displacement
      const r = Math.sqrt(r2);
      dx /= r;
      dy /= r;

      // // Calculate force
      let f = 0.0;
      if (r > minR) {

        if (flatForce) {
          f = types[p.type].forces[q.type].attraction;
        } else {
          const numer = 2.0 * Math.abs(r - 0.5 * (maxR + minR));
          const denom = maxR - minR;
          f = types[p.type].forces[q.type].attraction * (1.0 - numer / denom);

        }
      } else {
        f = forceDampening * minR * (1.0 / (minR + forceDampening) - 1.0 / (r + forceDampening));
      }

      p.velocity.x += f * dx
      p.velocity.y += f * dy
    }
  }
}




function checkEdges(particle) {
  if (walls) {
    if (particle.position.y > size[1] - particleDiameter) {
      particle.velocity.y *= -wallDampening
      particle.position.y = (size[1] - particleDiameter)
    } else if (particle.position.y < particleDiameter) {
      particle.velocity.y *= -wallDampening
      particle.position.y = particleDiameter
    }

    if (particle.position.x > size[0] - particleDiameter) {
      particle.velocity.x *= -wallDampening
      particle.position.x = (size[0] - particleDiameter)
    } else if (particle.position.x < particleDiameter) {
      particle.velocity.x *= -wallDampening
      particle.position.x = particleDiameter
    }
  } else {
    if (particle.position.y >= size[1]) {
      particle.position.y = particleDiameter
    } else if (particle.position.y < 0) {
      particle.position.y = size[1] - particleDiameter
    }
    if (particle.position.x >= size[0]) {
      particle.position.x = particleDiameter
    } else if (particle.position.x < 0) {
      particle.position.x = size[0] - particleDiameter
    }
  }
}


