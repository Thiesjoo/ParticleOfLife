function generateTypes() {
  for (var i = 0; i < amountOfTypes; i++) {
    let newType = {
      forces: {}
    }
    types.push(newType)
  }
  generateForces()
}

function generateForces() {
  types.forEach((type, index) => {
    types.forEach((newType, newIndex) => {
      type.forces[newIndex] = {
        minR: 0,
        maxR: 0,
        attraction: 0
      }

      if (index === newIndex) {
        type.forces[newIndex].attraction = -Math.abs(randomAttraction())
        type.forces[newIndex].minR = particleDiameter
      } else {
        type.forces[newIndex].attraction = randomAttraction()
        type.forces[newIndex].minR = Math.max(particleDiameter, ranNum(0, minInteractionRadius))
      }

      type.forces[newIndex].maxR = Math.max(type.forces[newIndex].minR, ranNum(minInteractionRadius, maxInteractionRadius))

    })
  })
}