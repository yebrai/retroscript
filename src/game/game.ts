class Game {

    fondo: HTMLImageElement
    frames: number
   // mainCharacter: Ryu
    isGameOn: boolean
    score: number
    x: number
    y: number
    w: number
    h: number
  
      constructor() {
          // todas nuestras propiedades o elementos del juego
          // fondo
          this.fondo = new Image()
          this.fondo.src = "../../images/Canvas-Background.png"
          

          this.x = 1; // posición en eje x
          this.y = 0; // posición en eje y
          this.w = 40; // ancho 
          this.h = 35; // alto 
        //  this.mainCharacter = new Ryu() // creando un nuevo obj de la clase pollo

          this.frames = 0 // aumentará 60 veces por segundo
          this.isGameOn = true
  
          this.score = 0
  
      }
  
      drawFondo = () => {
        //ctx.drawImage(this.fondo, 0, 0, canvas.width, canvas.height)
        ctx.drawImage(this.fondo, this.x, this.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
      };
    
      gameOver = () => {
        // detener el juego
        this.isGameOn = false
    
        // ocultar el canvas
        canvas.style.display = "none"
    
        // mostrar la pantalla de fin
        gameOverScreen.style.display = "flex"
      }
  
  
  
  
  
      // * BONUS 
      drawScore = () => {
          ctx.font = "30px Arial"
          // (elTexto, posX, posY)
          let scoreStr = `Score: ${this.score}`
          ctx.fillText(scoreStr, canvas.width * 0.4, 50)
      }
  

    
  
      gameLoop = () => {
        this.frames = this.frames + 1
        console.log(this.frames)
    
        // 1. limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // 2. acciones y movimientos de los elementos
    
        // 3. dibujado de los elementos
        this.drawFondo();
        this.drawScore()
    
        // 4. control de la recursion
        if (this.isGameOn === true) {
          requestAnimationFrame(this.gameLoop);
        }
      };
    }