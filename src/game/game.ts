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
  gravity: number
  fallSpeed: number
  ground: number
  playerFace: KenFace

    constructor() {
        // todas nuestras propiedades o elementos del juego
        // fondo
        this.fondo = new Image()
        this.fondo.src = "../../images/Canvas-Background.png"
        this.player = new Ken()
        this.playerFace = new KenFace()
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
        this.gravity = 0.1
        this.fallSpeed = 0

        this.ground =300

    }

    drawFondo = () => {
      //ctx.drawImage(this.fondo, 0, 0, canvas.width, canvas.height)
      ctx.drawImage(this.fondo, this.x, this.y +100, canvas.width, 336, 0, 0, canvas.width, canvas.height)
    };

    gravityFunction = () => {
      this.player.gravity(this.frames, this.gravity, this.ground, this.mapping(gameObj.player.bgPositionX, gameObj.player.bgPositionY) ) //
    }

    gravityFunct = () => {
      if (this.player.positionY < this.ground){
        if (this.frames % 5 === 0) {
          this.fallSpeed += this.gravity
        }
        this.player.positionY += this.fallSpeed
      } else {this.fallSpeed = 0}
      
      
    }
  
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
    if ((this.player.positionX >= (canvas.width / 2)) && this.movement["right"]){
      this.moveRight();
      this.player.bgPositionX ++
} else if ((this.player.positionX <= 0) && this.movement["left"]) {
this.moveLeft();
this.player.bgPositionX --
}
}

mapping = (movingElementPositionX: number, movingElementPositionY: number) : number => {
  let platform = mapPrint.filter((eachPlatfom)=> {
      if (eachPlatfom[0][0] <= movingElementPositionX && movingElementPositionX <= eachPlatfom[0][1] && eachPlatfom[1][0] >= movingElementPositionY) {
        //console.log("platform is at",  eachPlatfom[1][0], "ken position", movingElementPositionX)
        return eachPlatfom[1][0]
      } else {
        return this.ground
      }
  })
  console.log("plataforma",platform[0][1][0], "posicionY", this.player.bgPositionY )
  return platform[0][1][0] - this.player.action.h
}

moving = ()=>{
  this.moveBackground()
  this.player.movingKen(this.movement["right"], this.movement["left"], this.movement.isJumping, this.ground)
  //this.player.kenJumping(this.movement.isJumping, this.ground)
  
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
      //this.moveBackground()
      this.moving()
      this.player.animateKen(this.frames, this.movement.right, this.movement.left, this.ground, this.mapping(gameObj.player.bgPositionX, gameObj.player.bgPositionY))
      //this.player.movingKen(this.movement["right"], this.movement["left"])
      //this.player.kenJumping(this.movement.isJumping, this.ground)
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
      //delete me
      //console.log("ground", this.ground, "positionY",this.player.positionY, "isJumping", this.movement.isJumping, "speedY", this.player.speedY)
    };
  }