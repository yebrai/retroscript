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
    direction: string
    movement: {left: boolean, right: boolean, isJumping: boolean}
    player: Ken
  
      constructor() {
          // todas nuestras propiedades o elementos del juego
          // fondo
          this.fondo = new Image()
          this.fondo.src = "../../images/Canvas-Background.png"

          this.player = new Ken()

          this.x = 1; // posición en eje x
          this.y = 0; // posición en eje y
          this.w = 40; // ancho 
          this.h = 35; // alto 
        //  this.mainCharacter = new Ryu() // creando un nuevo obj de la clase pollo

          this.frames = 0 // aumentará 60 veces por segundo
          this.isGameOn = true

          this.direction = ""

          this.movement = { left: false, right: false, isJumping: false };
  
          this.score = 0
  
      }

  
      drawFondo = () => {
        //ctx.drawImage(this.fondo, 0, 0, canvas.width, canvas.height)
        ctx.drawImage(this.fondo, this.x, this.y +100, canvas.width, 336, 0, 0, canvas.width, canvas.height)
      };
    
      gameOver = () => {
        // detener el juego
        this.isGameOn = false
    
        // ocultar el canvas
        canvas.style.display = "none"
    
        // mostrar la pantalla de fin
        gameOverScreen.style.display = "flex"
      }

        //movimiento derecha
  moveRight = () => {

      this.x = this.x + 1;
      this.direction = "right";
    
  };

  //movimiento izquierda
    moveLeft = () => {
    if (this.x > 0) {
        this.x = this.x - 1;
      this.direction = "left";
    }
  };

    moveBackground = () => {
      if (this.player.positionX > (canvas.width / 2)){
        if (this.movement["right"]) {
          this.moveRight();
        } else if (this.movement["left"]) {
          this.moveLeft();
        }
      }
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
        //console.log(this.frames)
    
        // 1. limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // 2. acciones y movimientos de los elementos
        this.moveBackground()
        this.player.animateKen(this.frames, this.movement.right, this.movement.left, this.movement.isJumping)
        this.player.movingKen(this.movement["right"], this.movement["left"])
        // 3. dibujado de los elementos
        this.drawFondo();
        this.drawScore()
        this.player.drawKen()
    
        // 4. control de la recursion
        if (this.isGameOn === true) {
          requestAnimationFrame(this.gameLoop);
        }

        //delete me
      };
    }