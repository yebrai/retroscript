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
  movement: { left: boolean, right: boolean, isJumping: boolean }
  player: Ken
  gravity: number
  fallSpeed: number
  ground: number
  playerFace: KenFace
  bgPadding: number
  bgHeight: number
  canvasBgRelation: number

  constructor() {
    // todas nuestras propiedades o elementos del juego
    // fondo
    this.fondo = new Image()
    this.fondo.src = "../../images/Canvas-Background.png"
    this.player = new Ken()
    this.playerFace = new KenFace()
    this.x = 1; // posición en eje x
    this.y = 0; // posición en eje y
    //this.w = 40; // ancho 
    //this.h = 35; // alto 
    //  this.mainCharacter = new Ryu() // creando un nuevo obj de la clase pollo
    this.frames = 0 // aumentará 60 veces por segundo
    this.isGameOn = true
    this.direction = ""
    this.movement = { left: false, right: false, isJumping: false };

    this.score = 0
    this.gravity = 0.1
    //this.fallSpeed = 0
    //background adjustment
    //this.ground = 300
    this.bgPadding = 100
    this.bgHeight = 336

    this.canvasBgRelation = canvas.height / (this.bgHeight - this.bgPadding)

  }

  drawFondo = () => {
    //ctx.drawImage(this.fondo, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(this.fondo, this.x, this.y + this.bgPadding, canvas.width, this.bgHeight, 0, 0, canvas.width, canvas.height)
  };


  gravityFunction = () => {
    this.player.gravity(this.frames, this.gravity, this.mapping(gameObj.player.bgPositionX, gameObj.player.bgPositionY)) //
  }

  // gravityFunct = () => {
  //   if (this.player.positionY < this.ground) {
  //     if (this.frames % 5 === 0) {
  //       this.fallSpeed += this.gravity
  //     }
  //     this.player.positionY += this.fallSpeed
  //   } else { this.fallSpeed = 0 }


  // }

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
    this.x = this.x + this.player.walkSpeed;
    this.direction = "right";
    this.player.bgPositionX = this.player.bgPositionX + this.player.walkSpeed

  };
  //movimiento izquierda
  moveLeft = () => {
    if (this.x > 0) {
      this.x = this.x - this.player.walkSpeed;
      this.direction = "left";
      this.player.bgPositionX = this.player.bgPositionX - this.player.walkSpeed
    }
  };

  moveBackground = () => {
    if ((this.player.positionX >= (canvas.width / 2)) && this.movement["right"]) {
      this.moveRight();

    } else if ((this.player.positionX <= 0) && this.movement["left"]) {
      this.moveLeft();

    }
  }

  mapping = (movingElementPositionX: number, movingElementPositionY: number): number => {
    let platform: number[][][] = mapPrint.filter((eachPlatfom) => {
      if ((eachPlatfom[0][0] < movingElementPositionX && movingElementPositionX < eachPlatfom[0][1])) {
        if ( Math.floor(eachPlatfom[1][0] ) >= movingElementPositionY) {
          return eachPlatfom
        }
    }})
    if (platform.length>1) {
      platform.sort((elem2: number[][], elem1: number[][]) : number=> {
        if(elem2[1][0]> elem1[1][0]) {
          return 1
        } else if (elem1[1][0]> elem2[1][0]) {
          return -1
        }else{
          return 0
        }
      })
    }
    if (platform.length === 0) {
      return canvas.height
    } else {
      return platform[0][1][0] * this.canvasBgRelation
    }
  }

  moving = () => {
    this.moveBackground()
    this.player.movingKen(this.movement["right"], this.movement["left"], this.movement.isJumping, this.mapping(gameObj.player.bgPositionX, gameObj.player.bgPositionY))

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

    // 1. limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. acciones y movimientos de los elementos
    this.moving()
    this.player.animateKen(this.frames, this.movement.right, this.movement.left, this.mapping(gameObj.player.bgPositionX, gameObj.player.bgPositionY))

    this.gravityFunction()
    // 3. dibujado de los elementos
    this.drawFondo();
    this.drawScore()
    this.player.drawKen()
    this.playerFace.drawKenFace()
    this.playerFace.drawEmptyLife()
    this.playerFace.drawLife()

    // 4. control de la recursion
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }

  };
}