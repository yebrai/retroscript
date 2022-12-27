class Game {
  fondo: HTMLImageElement
  frames: number
  isGameOn: boolean
  score: number
  x: number
  y: number
  w: number
  h: number
  direction: string
  movement: { left: boolean, right: boolean, isJumping: boolean, hadouken: boolean }
  player: Ken
  sonicArr: Sonic[]
  gravity: number
  fallSpeed: number
  ground: number
  playerFace: KenFace
  bgPadding: number
  bgHeight: number
  canvasBgRelation: number

  constructor() {
    // background
    this.fondo = new Image()
    this.fondo.src = "../../images/Canvas-Background.png"
    this.player = new Ken()
    this.playerFace = new KenFace()
    this.sonicArr = []
    this.x = 1;
    this.y = 0;
    //  this.mainCharacter = new Ryu() // 
    this.frames = 0 //
    this.isGameOn = true
    this.direction = ""
    this.movement = { left: false, right: false, isJumping: false, hadouken: false };


    this.score = 0
    this.gravity = 0.1
    //this.fallSpeed = 0
    //background adjustment
    //this.ground = 300
    this.bgPadding = 100
    this.bgHeight = 336

    this.canvasBgRelation = canvas.height / (this.bgHeight)

  }

  drawFondo = () => {
    ctx.drawImage(this.fondo, this.x, this.y + this.bgPadding, canvas.width, this.bgHeight, 0, 0, canvas.width, canvas.height)
  };


  gravityFunction = () => {
    this.player.gravity(this.gravity, this.mapping(this.player.bgPositionX, this.player.bgPositionY))
    this.sonicArr.forEach((eachSonic) => {
      eachSonic.gravity(this.gravity, this.mapping(eachSonic.bgPositionX, eachSonic.bgPositionY))
    })
  }

  gameOver = () => {
    // stop game
    this.isGameOn = false

    // hide canvas
    canvas.style.display = "none"

    // show gameover screen
    gameOverScreen.style.display = "flex"
  }
  //move right
  moveRight = () => {
    this.x = this.x + this.player.walkSpeed;
    this.direction = "right";
    this.player.bgPositionX = this.player.bgPositionX + this.player.walkSpeed
    this.sonicArr.forEach((eachSonic) => {
      eachSonic.positionX = eachSonic.positionX - this.player.walkSpeed
    })
  };
  //move left
  moveLeft = () => {
    if (this.x > 0) {
      this.x = this.x - this.player.walkSpeed;
      this.direction = "left";
      this.player.bgPositionX = this.player.bgPositionX - this.player.walkSpeed
      this.sonicArr.forEach((eachSonic) => {
        eachSonic.positionX = eachSonic.positionX + this.player.walkSpeed
      })
    }
  };

  createSonic = () => {
    if (this.frames % 20 === 0) {
      this.sonicArr.push(new Sonic(this.x))
    }
  }

  eliminateSonic = () => {
    if (this.sonicArr.length > 0 && this.sonicArr[0].bgPositionX <= 0) {
      this.sonicArr.shift()
    }
  }
  

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
        if ((eachPlatfom[1][0] - this.bgPadding) * this.canvasBgRelation >= Math.floor(movingElementPositionY)) {
          return eachPlatfom
        }
      }
    })
    if (platform.length > 1) {
      platform.sort((elem2: number[][], elem1: number[][]): number => {
        if (elem2[1][0] > elem1[1][0]) {
          return 1
        } else if (elem1[1][0] > elem2[1][0]) {
          return -1
        } else {
          return 0
        }
      })
    }
    if (platform.length === 0) {
      return canvas.height
    } else {
      return Math.floor((platform[0][1][0] - this.bgPadding) * this.canvasBgRelation)
    }
  }

  //dev purposes only
  drawPlatforms = (deltaX: number) => {
    mapPrint.map((eachPlatform) => {
      if (eachPlatform[1][0] < canvas.height / 2) {
        ctx.drawImage(this.playerFace.imgFullLife, eachPlatform[0][0] + deltaX, (eachPlatform[1][0] - this.bgPadding) * this.canvasBgRelation, eachPlatform[0][1] - eachPlatform[0][0], 2)
      } else {
        ctx.drawImage(this.playerFace.imgEmptyLife, eachPlatform[0][0] + deltaX, (eachPlatform[1][0] - this.bgPadding) * this.canvasBgRelation, eachPlatform[0][1] - eachPlatform[0][0], 2)
      }
    })
  }

  //dev purposes only
  drawMapElements = () => {
    this.drawPlatforms(-this.x)
  }


  moving = () => {
    this.moveBackground()
    this.player.movingKen(this.movement["right"], this.movement["left"], this.movement.isJumping, this.mapping(this.player.bgPositionX, this.player.bgPositionY))
    this.sonicArr.forEach((eachSonic) => {
      eachSonic.movingSonic(this.frames, this.mapping(eachSonic.bgPositionX, eachSonic.bgPositionY))
    })
  }


  // * BONUS 
  drawScore = () => {
    ctx.font = "30px Arial"
    let scoreStr = `Score: ${this.score}`
    ctx.fillText(scoreStr, canvas.width * 0.4, 50)
  }

  gameLoop = () => {
    this.frames = this.frames + 1

    // 1. clean canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. actions&movements of elements
    this.moving()
    this.createSonic()
    this.eliminateSonic()
    this.player.animateKen(this.frames, this.movement.right, this.movement.left, this.mapping(this.player.bgPositionX, this.player.bgPositionY))
    this.sonicArr.forEach((eachSonic) => {
      eachSonic.animateSonicRunning(this.frames)
    })

    this.gravityFunction()
    // 3. drawing elements
    this.drawFondo();
    this.drawScore()
    this.player.drawKen()
    this.playerFace.drawKenFace()
    this.playerFace.drawEmptyLife()
    this.playerFace.drawLife()
    this.sonicArr.forEach((eachSonic) => {
      eachSonic.drawSonic()
    })
     this.drawMapElements()//dev purposes only
    // 4. recursion
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }

  };
}