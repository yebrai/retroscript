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
  movement: { left: boolean, right: boolean, isJumping: boolean, down: boolean }
  player: Ken
  sonicArr: Sonic[]
  hadoukenArr: Hadouken[]
  bossBulletArr: BossBullet[]
  boss: Boss
  gravity: number
  fallSpeed: number
  ground: number
  playerFace: KenFace
  bossFace: BossFace
  bgPadding: number
  bgHeight: number
  canvasBgRelation: number
  isBossStage: boolean
  gameOverSound: HTMLAudioElement
  themeSound: HTMLAudioElement

  constructor() {
    // background
    this.fondo = new Image()
    this.fondo.src = "../../images/Canvas-Background.png"
    this.player = new Ken()
    this.playerFace = new KenFace()
    this.boss = new Boss()
    this.bossFace = new BossFace()
    this.sonicArr = []
    this.hadoukenArr = []
    this.bossBulletArr = []
    this.x = 1;
    this.y = 0;
    this.frames = 0
    this.isGameOn = true
    this.direction = ""
    this.movement = { left: false, right: false, isJumping: false, down: false };

    this.score = 0
    this.gravity = 0.1
    //background adjustment
    this.bgPadding = 112
    this.bgHeight = 224

    this.canvasBgRelation = canvas.height / (this.bgHeight)

    this.isBossStage = false
    this.gameOverSound = new Audio('../../sounds/gameOverSound.mp3')
    this.themeSound = new Audio('../../sounds/kenTheme.mp3')

  }

  drawFondo = () => {
    ctx.drawImage(this.fondo, this.x, this.y + this.bgPadding, canvas.width, this.bgHeight, 0, 0, canvas.width, canvas.height)
  };


  gravityFunction = () => {
    this.player.gravity(this.gravity, this.mapping(this.player.bgPositionX, this.player.bgPositionY))
    this.sonicArr.forEach((eachSonic) => {
      eachSonic.gravity(this.gravity, this.mapping(eachSonic.bgPositionX, eachSonic.bgPositionY))
    })
    this.boss.gravity(this.gravity, this.mapping(this.boss.bgPositionX, this.boss.bgPositionY))
  }

  gameOver = () => {
    // stop game
    this.isGameOn = false
    this.gameOverSound.play()
    this.gameOverSound.volume = 0.1
    this.themeSound.pause()
    // hide canvas
    canvas.style.display = "none"
    // show gameover screen
    gameOverScreen.style.display = "flex"
  }

  mainTheme = () => {
    this.themeSound.play()
    this.themeSound.volume = 0.1
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
    if (this.frames % 80 === 0) {
      this.sonicArr.push(new Sonic(this.x))
    }
  }

  eliminateSonic = () => {
    this.sonicArr.forEach((eachSonic) => {
      if (eachSonic.positionY > 400 || eachSonic.bgPositionX <= 0) {
        let deadEnemy = this.sonicArr.indexOf(eachSonic)
        this.sonicArr.splice(deadEnemy, 1);
      }
    })
  }

  eliminateBossBullet = () => {
    this.bossBulletArr.forEach((eachBossBullet) => {
      if (eachBossBullet.spriteBulletImpact < 0) {
        let impactedBullet = this.bossBulletArr.indexOf(eachBossBullet)
        this.bossBulletArr.splice(impactedBullet, 1);
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
      this.isBossStage = true

      //needs boss theme music, more drama ;)
    }
    if (this.isBossStage) {
      this.boss.drawBoss()
      this.bossFace.drawBossFace(this.boss.health)
    }
  }

  moveBackground = () => {
    if ((this.player.positionX >= (canvas.width / 2)) && this.movement["right"] && !this.isBossStage && this.player.health > 0) {
      this.moveRight()
      this.moveBulletBackground(-this.player.walkSpeed)
      this.moveHadoukenBackground(-this.player.walkSpeed)
    } else if ((this.player.positionX <= 0) && this.movement["left"] && !this.isBossStage && this.player.health > 0) {
      this.moveLeft();
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

  //collision Sonic-Ken
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
        let deadEnemy = this.sonicArr.indexOf(eachSonic);
        this.sonicArr.splice(deadEnemy, 1);
        if (this.player.img !== this.player.imgLowPunch) {
          console.log("health -1")
        }
        //this.player.health--
        if (this.player.health <= 0) {
          //this.gameOver()

        }
      }
    });
  };

  //collision Sonic-Hadouken
  colisionSonicHadouken = () => {
    this.hadoukenArr.forEach((eachHadouken) => {
      this.sonicArr.forEach((eachSonic) => {
        if (
          eachSonic.positionX < eachHadouken.hadouken.x + eachHadouken.hadouken.w &&
          eachSonic.positionX + eachSonic.action.w > eachHadouken.hadouken.x &&
          eachSonic.positionY < eachHadouken.hadouken.y + eachHadouken.hadouken.h &&
          eachSonic.action.h + eachSonic.positionY > eachHadouken.hadouken.y
        ) {
          let deadHadouken = this.hadoukenArr.indexOf(eachHadouken);
          this.hadoukenArr.splice(deadHadouken, 1);
          this.score++
          eachSonic.health--
        }
      })
    });
  };

  //collision bossBullet-Ken
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
        this.player.health--
        eachBossBullet.isFlying = false
        if (this.player.health <= 0) {
          //this.gameOver()
        }
      }
    });
  };

  colisionBossHadouken = () => {
    this.hadoukenArr.forEach((eachHadouken) => {
      if (
        this.boss.positionX < eachHadouken.hadouken.x + eachHadouken.hadouken.w &&
        this.boss.positionX + this.boss.action.w > eachHadouken.hadouken.x &&
        this.boss.positionY < eachHadouken.hadouken.y + eachHadouken.hadouken.h &&
        this.boss.action.h + this.boss.positionY > eachHadouken.hadouken.y
      ) {
        let deadHadouken = this.hadoukenArr.indexOf(eachHadouken);
        this.hadoukenArr.splice(deadHadouken, 1);
        this.score++
        this.boss.health--
      }
    });
  };

  moving = () => {
    this.moveBackground()
    this.player.movingKen(this.movement["right"], this.movement["left"], this.movement.isJumping, this.mapping(this.player.bgPositionX, this.player.bgPositionY), this.isBossStage)
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

  // * BONUS 
  drawScore = () => {
    ctx.font = "30px Arial"
    ctx.fillStyle = "white";
    let scoreStr = `Score: ${this.score}`
    ctx.fillText(scoreStr, canvas.width * 0.4, 50)
  }

  gameLoop = () => {
    this.frames = this.frames + 1

    // 1. clean canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. actions&movements of elements
    this.mainTheme()
    this.moving()
    this.createSonic()
    this.createHadouken()
    this.createBossBullet()
    this.eliminateSonic()
    this.eliminateBossBullet()
    this.player.animateKen(this.frames, this.movement.right, this.movement.left, this.boss.health, this.mapping(this.player.bgPositionX, this.player.bgPositionY), this.movement.down)
    this.sonicArr.forEach((eachSonic) => {
      eachSonic.animateSonic(this.frames)
    })
    this.boss.animateBoss(this.frames)
    this.bossBulletArr.forEach((eachBossBullet) => {
      eachBossBullet.bossBulletEffect(this.frames)
    })
    this.colisionSonicKen()
    this.colisionSonicHadouken()
    this.colisionBossBulletKen()
    this.colisionBossHadouken()
    this.gravityFunction()
    // 3. drawing elements
    this.drawFondo();
    this.drawScore()
    this.player.drawKen()
    this.playerFace.drawKenFace(this.player.health)
    this.sonicArr.forEach((eachSonic) => {
      eachSonic.drawSonic()
    })
    this.hadoukenArr.forEach((eachHadouken) => {
      eachHadouken.drawHadouken()
    })
    this.bossStage()
    // this.drawMapElements()//dev purposes only
    // 4. recursion
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }

  };
}