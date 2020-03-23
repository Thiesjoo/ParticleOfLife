//Game data
let particles = []
let types = []

//Game Initalization
const amountOfTypes = 100
const particlePerType = 10


//Particle related
const minInteractionRadius = 1
const maxInteractionRadius = 100
const particleMass = 10
const particleDiameter = 10
const interactions = true

//Gravity
const gravityY = 0
const gravityX = 0
const walls = false
//Air friction
const friction = 0.1

//Wall bounce dampening
const wallDampening = 0.75

//Dunno
const forceDampening = 2

//Use attraction force without distance taken into account
const flatForce = false

//UI
let size = [window.innerWidth, window.innerHeight]
const spawnMargin = 20
let drawDebug = false
