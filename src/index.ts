const canvas = document.querySelector("#my-canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
//Screens
const startScreen = document.querySelector("#splash-screen") as HTMLDivElement
const winScreen = document.querySelector("#win-screen") as HTMLButtonElement
const gameOverScreen = document.querySelector("#gameover-screen") as HTMLDivElement
//Buttons
const startBtn = document.querySelector("#start-btn") as HTMLButtonElement
const restartBtn = document.querySelector("#restart-btn") as HTMLButtonElement
const tryAgainBtn = document.querySelector("#try-again-btn") as HTMLButtonElement
//Audio
const hadouken = new Audio('../sounds/hadouken.mp3')

let gameObj: Game | undefined
//Hide at start
gameOverScreen.style.display = "none"
canvas.style.display = "none"
winScreen.style.display = "none"

const startGame = () => {
  //hide
  startScreen.style.display = "none"
  gameOverScreen.style.display = "none"
  winScreen.style.display = "none"
  //show
  canvas.style.display = "block"
  gameObj = new Game()
  gameObj.gameLoop()
}

// Events
startBtn.addEventListener("click", startGame)
restartBtn.addEventListener("click", startGame)
tryAgainBtn.addEventListener("click", startGame)

window.addEventListener("keydown", (event) => {
  if (event.code === "KeyA") {
    gameObj.movement["left"] = true
  } else if (event.code === "KeyD") {
    gameObj.movement["right"] = true
  } else if (event.code === "KeyW") {
    gameObj.movement["isJumping"] = true
  } else if (event.code === "KeyS") {
    gameObj.movement["down"] = true
  } else if (event.code === "Space") {
    hadouken.play()
    hadouken.volume = 0.1
    gameObj.player.hadoukenAnimation = true
  }
})

window.addEventListener("keyup", (event) => {
  if (event.code === "KeyA") {
    gameObj.movement["left"] = false
  } else if (event.code === "KeyD") {
    gameObj.movement["right"] = false
  } else if (event.code === "KeyW") {
    gameObj.movement["isJumping"] = false
  } else if (event.code === "KeyS") {
    gameObj.movement["down"] = false
  }
})

