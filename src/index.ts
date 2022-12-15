const canvas = document.querySelector("#my-canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
const startScreen = document.querySelector("#splash-screen") as HTMLDivElement
const startBtn = document.querySelector("#start-btn") as HTMLButtonElement
const gameOverScreen = document.querySelector("#gameover-screen") as HTMLDivElement
const restartBtn = document.querySelector("#restart-btn") as HTMLButtonElement

let gameObj: Game | undefined

gameOverScreen.style.display = "none"

const startGame = () => {
    console.log("iniciando el juego")
    
    // ocultar la pantalla de inicio
    startScreen.style.display = "none"
    
    // mostrar el canvas
    canvas.style.display = "block"
    // "block" el elemento toma todo el tamaño del ancho de la pantalla
    
    // crear una nueva version del juego
    
    
    gameObj = new Game()
    // iniciará el juego. ejecutar el metodo gameLoop
    // en esta seccion se agregarian setTimeout o setIntervals

    gameObj.gameLoop()
}

// * ADD EVENT LISTENERS
startBtn.addEventListener("click", startGame)
restartBtn.addEventListener("click", startGame)

window.addEventListener("keydown", (event) => {
    if (event.code === "KeyA") {
      gameObj.movement["left"] = true;
    } else if (event.code === "KeyD") {
      gameObj.movement["right"] = true;
    } else if (event.code === "KeyW") {
        gameObj.movement["isJumping"] = true;
      }
  });

  window.addEventListener("keyup", (event) => {
     if (event.code === "KeyA") {
      gameObj.movement["left"] = false;
    } else if (event.code === "KeyD") {
      gameObj.movement["right"] = false;
    } else if (event.code === "KeyW") {
        gameObj.movement["isJumping"] = false;
      }
  });

