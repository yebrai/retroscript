class Game {
  private readonly fondo: HTMLImageElement
  private frames: number
  public isGameOn: boolean
  private score: number
  private x: number
  private y: number
  public movement: { left: boolean, right: boolean, isJumping: boolean, down: boolean }
  public player: Ken
  private sonicArr: Sonic[]
  private hadoukenArr: Hadouken[]
  private bossBulletArr: BossBullet[]
  private boss: Boss
  private readonly gravity: number
  private playerFace: KenFace
  private bossFace: BossFace
  private readonly bgPadding: number
  private readonly bgHeight: number
  private canvasBgRelation: number
  private isBossStage: boolean
  private readonly gameOverSound: HTMLAudioElement
  private readonly themeSound: HTMLAudioElement
  private readonly winSound: HTMLAudioElement
  private readonly bossTheme: HTMLAudioElement
  private winGame: boolean

  constructor() {
    // background
    this.fondo = new Image()
    this.fondo.src = "./images/Canvas-Background.png"
    this.x = 1
    this.y = 0
    this.score = 0

    //Classes
    this.player = new Ken()
    this.playerFace = new KenFace()
    this.boss = new Boss()
    this.bossFace = new BossFace()
    this.sonicArr = []
    this.hadoukenArr = []
    this.bossBulletArr = []
    this.frames = 0
    this.movement = { left: false, right: false, isJumping: false, down: false }
    
    //background adjustment
    this.gravity = 0.1
    this.bgPadding = 112
    this.bgHeight = 224
    this.canvasBgRelation = canvas.height / (this.bgHeight)
    
    //Controllers
    this.winGame = false
    this.isGameOn = true
    this.isBossStage = false

    //Sounds
    this.gameOverSound = new Audio('../../sounds/gameOverSound.mp3')
    this.themeSound = new Audio('../../sounds/kenTheme.mp3')
    this.winSound = new Audio('../../sounds/winAudio.mp3')
    this.bossTheme = new Audio ('../../sounds/bossTheme.mp3')
  }

  drawFondo = () => {
    ctx.drawImage(this.fondo, this.x, this.y + this.bgPadding, canvas.width, this.bgHeight, 0, 0, canvas.width, canvas.height)
  }


  gravityFunction = () => {
    this.player.gravity(this.gravity, this.mapping(this.player.bgPositionX, this.player.bgPositionY))
    this.sonicArr.forEach((eachSonic) => {
      eachSonic.gravity(this.gravity, this.mapping(eachSonic.bgPositionX, eachSonic.bgPositionY))
    })
    this.boss.gravity(this.gravity, this.mapping(this.boss.bgPositionX, this.boss.bgPositionY))
  }

  gameOver = () => {
    //Stop game
    this.isGameOn = false
    this.gameOverSound.play()
    this.gameOverSound.volume = 0.1
    //Hide canvas
    canvas.style.display = "none"
    //Show gameover screen
    gameOverScreen.style.display = "flex"
  }

  loser = () => {
    if (this.player.health <= 0) {
      this.gameOver()
    }
  }

  winner = () => {
    winScreen.style.display = "flex"
      this.winSound.play()
      this.winSound.volume = 0.1
      this.winGame = true  
  }

  mainTheme = () => {
    if (!this.winGame && !this.isBossStage)
    this.themeSound.play()
    this.themeSound.volume = 0.1
  }

  moveRight = () => {
    this.x = this.x + this.player.walkSpeed
    this.player.bgPositionX = this.player.bgPositionX + this.player.walkSpeed
    this.sonicArr.forEach((eachSonic) => {
      eachSonic.positionX = eachSonic.positionX - this.player.walkSpeed
    })
  }

  moveLeft = () => {
    if (this.x > 0) {
      this.x = this.x - this.player.walkSpeed
      this.player.bgPositionX = this.player.bgPositionX - this.player.walkSpeed
      this.sonicArr.forEach((eachSonic) => {
        eachSonic.positionX = eachSonic.positionX + this.player.walkSpeed
      })
    }

  }

  createSonic = () => {
    if (this.frames % 80 === 0 && !this.isBossStage && this.player.img !== this.player.imgWinning) {
      this.sonicArr.push(new Sonic(this.x))
    }
  }

  eliminateSonic = () => {
    this.sonicArr.forEach((eachSonic) => {
      if (eachSonic.positionY > 400 || eachSonic.bgPositionX <= 0) {
        const deadEnemy = this.sonicArr.indexOf(eachSonic)
        this.sonicArr.splice(deadEnemy, 1)
      }
    })
  }

  eliminateBossBullet = () => {
    this.bossBulletArr.forEach((eachBossBullet) => {
      if (eachBossBullet.spriteBulletImpact < 0) {
        const impactedBullet = this.bossBulletArr.indexOf(eachBossBullet)
        this.bossBulletArr.splice(impactedBullet, 1)
      }
    })
  }

  createHadouken = () => {
    if (!this.player.hadoukenCreated) {
      this.hadoukenArr.push(new Hadouken(this.player.positionX, this.player.positionY))
      this.player.hadoukenCreated = true
    }
  }

  createBossBullet = () => {
    if (!this.boss.bossBulletCreated) {
      this.bossBulletArr.push(new BossBullet(this.boss.positionX, this.boss.positionY))
      this.boss.bossBulletCreated = true
    }
  }

  bossStage = () => {
    this.bossBulletArr.forEach((eachBossBullet) => {
      if (eachBossBullet.guidedBullet || this.isBossStage) {
        eachBossBullet.drawBossBullet()
      }
    })
    if (this.player.bgPositionX > 3050) {
      this.themeSound.pause()
      this.bossTheme.play()
      this.bossTheme.volume = 0.2
      this.isBossStage = true
    }
    if (this.isBossStage) {
      this.boss.drawBoss()
      this.bossFace.drawBossFace(this.boss.health)
    }
    if(this.boss.health < 1 && this.boss.bgPositionY < 500) {
      this.winner()
    }
  }

  moveBackground = () => {
    if ((this.player.positionX >= (canvas.width / 2)) && this.movement["right"] && !this.isBossStage && this.player.health > 0) {
      this.moveRight()
      this.moveBulletBackground(-this.player.walkSpeed)
      this.moveHadoukenBackground(-this.player.walkSpeed)
    } else if ((this.player.positionX <= 0) && this.movement["left"] && !this.isBossStage && this.player.health > 0) {
      this.moveLeft()
      this.moveBulletBackground(this.player.walkSpeed)
      this.moveHadoukenBackground(this.player.walkSpeed)
    }
  }

  moveBulletBackground = (velocity: number) => {
    this.bossBulletArr.forEach((eachBullet) => {
      eachBullet.originX += velocity
    })
  }

  moveHadoukenBackground = (velocity: number) => {
    this.hadoukenArr.forEach((eachHadouken) => {
      eachHadouken.hadouken.x += velocity
    })
  }

  //Background (Plataforms and ground)
  mapping = (movingElementPositionX: number, movingElementPositionY: number): number => {
    const platform: number[][][] = mapPrint.filter((eachPlatfom) => {
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

  //Collision Sonic-Ken
  colisionSonicKen = () => {
    this.sonicArr.forEach((eachSonic) => {
      if (eachSonic.health < 1) {
        return
      }
      if (
        eachSonic.positionX < this.player.positionX + this.player.action.w &&
        eachSonic.positionX + eachSonic.action.w > this.player.positionX &&
        eachSonic.positionY < this.player.positionY + this.player.action.h &&
        eachSonic.action.h + eachSonic.positionY > this.player.positionY
       ) {
        if (this.player.img !== this.player.imgLowPunch) {
          this.player.health--
          const deadEnemy = this.sonicArr.indexOf(eachSonic)
          this.sonicArr.splice(deadEnemy, 1)
        } else {
          eachSonic.health--
          this.score++
        }

      }
    })
  }

  //Collision Sonic-Hadouken
  colisionSonicHadouken = () => {
    this.hadoukenArr.forEach((eachHadouken) => {
      this.sonicArr.forEach((eachSonic) => {
        if (
          eachSonic.positionX < eachHadouken.hadouken.x + eachHadouken.hadouken.w &&
          eachSonic.positionX + eachSonic.action.w > eachHadouken.hadouken.x &&
          eachSonic.positionY < eachHadouken.hadouken.y + eachHadouken.hadouken.h &&
          eachSonic.action.h + eachSonic.positionY > eachHadouken.hadouken.y
        ) {
          const deadHadouken = this.hadoukenArr.indexOf(eachHadouken)
          this.hadoukenArr.splice(deadHadouken, 1)
          this.score++
          eachSonic.health--
        }
      })
    })
  }

  //Collision bossBullet-Ken
  colisionBossBulletKen = () => {
    this.bossBulletArr.forEach((eachBossBullet) => {
      if (eachBossBullet.spriteBulletImpact < 6) {
        return
      }
      if (
        eachBossBullet.originX < this.player.positionX + this.player.action.w &&
        eachBossBullet.originX + eachBossBullet.action.w > this.player.positionX &&
        eachBossBullet.originY < this.player.positionY + this.player.action.h &&
        eachBossBullet.action.h + eachBossBullet.originY > this.player.positionY &&
        eachBossBullet.isFlying
      ) {
        if (this.player.img !== this.player.imgWinning) {
        this.player.health--
        eachBossBullet.isFlying = false
        }

      }
    })
  }

  colisionBossHadouken = () => {
    if (!this.isBossStage) {
      return
    }
    this.hadoukenArr.forEach((eachHadouken) => {
      if (
          this.boss.positionX < eachHadouken.hadouken.x + eachHadouken.hadouken.w &&
          this.boss.positionX + this.boss.action.w > eachHadouken.hadouken.x &&
          this.boss.positionY < eachHadouken.hadouken.y + eachHadouken.hadouken.h &&
          this.boss.bossHeight + this.boss.positionY > eachHadouken.hadouken.y
      ) {
        const deadHadouken = this.hadoukenArr.indexOf(eachHadouken)
        this.hadoukenArr.splice(deadHadouken, 1)
        this.score++
        this.boss.health--
      }
    })
  }

  moving = () => {
    this.moveBackground()
    this.player.movingKen(this.movement["right"], this.movement["left"], this.movement.isJumping, this.mapping(this.player.bgPositionX, this.player.bgPositionY), this.isBossStage, this.boss.health)
    this.sonicArr.forEach((eachSonic) => {
      eachSonic.movingSonic(this.frames, this.mapping(eachSonic.bgPositionX, eachSonic.bgPositionY))
    })
    this.hadoukenArr.forEach((eachHadouken) => {
      eachHadouken.moveHadouken()
    })
    this.bossBulletArr.forEach((eachBossBullet) => {
      eachBossBullet.moveBossBullet(this.frames, this.player.positionX)
    })
  }

  drawScore = () => {
    ctx.font = "30px Arial"
    ctx.fillStyle = "white"
    const scoreStr = `Score: ${this.score}`
    ctx.fillText(scoreStr, canvas.width * 0.4, 50)
  }

  createEliminateElements = () => {
    this.createSonic()
    this.createHadouken()
    this.createBossBullet()
    this.eliminateSonic()
    this.eliminateBossBullet()
  }

  animations = () => {
    this.player.animateKen(this.frames, this.movement.right, this.movement.left, this.boss.health, this.mapping(this.player.bgPositionX, this.player.bgPositionY), this.movement.down)
    this.sonicArr.forEach((eachSonic) => {
      eachSonic.animateSonic(this.frames)
    })
    this.boss.animateBoss(this.frames)
    this.bossBulletArr.forEach((eachBossBullet) => {
      eachBossBullet.bossBulletEffect(this.frames)
    })
  }

  collisions = () => {
    this.colisionSonicKen()
    this.colisionSonicHadouken()
    this.colisionBossBulletKen()
    this.colisionBossHadouken()
  }

  drawingElements = () => {
    this.player.drawKen()
    this.playerFace.drawKenFace(this.player.health)
    this.sonicArr.forEach((eachSonic) => {
      eachSonic.drawSonic()
    })
    this.hadoukenArr.forEach((eachHadouken) => {
      eachHadouken.drawHadouken()
    })
  }

  gameLoop = () => {
    this.frames = this.frames + 1
    // Clean canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // Actions&movements of elements
    this.mainTheme()
    this.moving()
    this.createEliminateElements()
    this.animations()
    this.collisions()
    this.gravityFunction()
    //Drawing elements
    this.drawFondo()
    this.drawScore()
    this.drawingElements()
    this.bossStage()
    this.loser()
    //Recursion
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop)
    } else {
      this.bossTheme.pause()
      this.themeSound.pause()
    }
  }
}