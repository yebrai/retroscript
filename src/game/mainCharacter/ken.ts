
class Ken {
  private readonly imgWalk: HTMLImageElement
  private readonly walk: Action
  private readonly imgJump: HTMLImageElement
  private readonly jump: ActionXWArr
  private readonly imgHadouken: HTMLImageElement
  private readonly hadouken: ActionXWArr
  private readonly imgFalling: HTMLImageElement
  private readonly falling: ActionXArr
  public readonly imgWinning: HTMLImageElement
  private readonly winning: Action
  public readonly imgLowPunch: HTMLImageElement
  public readonly lowPunch: ActionXArr
  public img: HTMLImageElement
  public action: Action
  private spriteJump: number
  private spriteHadouken: number
  private spriteFalling: number
  private spriteLowPunch: number
  public positionX: number
  public positionY: number
  public bgPositionX: number
  public bgPositionY: number
  private speedY: number
  private readonly jumpPower: number
  public readonly walkSpeed: number
  private readonly groundFeetDistance: number
  private groundMargin: number
  public health: number
  public hadoukenAnimation: boolean
  public hadoukenCreated: boolean

  constructor() {
    //Walking animation
    this.imgWalk = new Image(),
      this.imgWalk.src = "./images/player/kenWalking.png",
      this.walk = {
        x: 0,
        y: 0,
        w: 49, 
        h: 95, 
      }
    //Jumping animation
    this.imgJump = new Image()
    this.imgJump.src = "./images/player/kenJump.png"
    this.jump = {
      x: [0, 46, 88, 154, 194, 274, 324],
      y: 0,
      w: [46, 42, 64, 40, 80, 50, 40],
      h: 95
    }
    //Hadouken animation
    this.imgHadouken = new Image()
    this.imgHadouken.src = "./images/player/hadoukenSprite.png"
    this.hadouken = {
      x: [0, 55, 125, 196],
      y: 0,
      w: [55, 70, 71, 76],
      h: 95 //!85
    }
    //Falling animation
    this.imgFalling = new Image()
    this.imgFalling.src = "./images/player/kenFalling.png"
    this.falling = {
      x: [0, 56, 132, 208, 284, 366],
      y: 0,
      w: 0,
      h: 61 //!61
    }
    //Winning animation
    this.imgWinning = new Image()
    this.imgWinning.src = "./images/player/kenWin.png"
    this.winning = {
      x: 0,
      y: 0,
      w: 48.25,
      h: 114,
    }
    this.imgLowPunch = new Image()
    this.imgLowPunch.src = "./images/player/kenLowPunch.png"
    this.lowPunch = {
      x: [0, 53, 116],
      y: 0,
      w: 0,
      h: 95,  
    }
    this.img
    this.action = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    }

    //Sprite frame counter
    this.spriteJump = 0
    this.spriteHadouken = 0
    this.spriteFalling = 0
    this.spriteLowPunch = 0
    //Position x
    this.positionX = 0
    this.bgPositionX = 25
    //Speed
    this.positionY = 150
    this.groundFeetDistance = 18
    this.bgPositionY = this.positionY + this.action.h - this.groundFeetDistance

    //JumpSpeed
    this.speedY = 0
    this.jumpPower = -4 //-4

    //Walk speed
    this.walkSpeed = 4

    this.groundMargin = 20

    this.health = 3
    this.hadoukenAnimation = false
    this.hadoukenCreated = true
  }

  drawKen = () => {
    ctx.drawImage(this.img, this.action.x, this.action.y, this.action.w, this.action.h, this.positionX, this.positionY, this.action.w, this.action.h)
  }


  gravity = (gravity: number, ground: number) => { //
    this.positionY = this.positionY + Math.floor(this.speedY)
    this.bgPositionY = this.positionY + this.action.h - this.groundFeetDistance
    if (Math.floor(this.bgPositionY) < ground - this.groundMargin) {
      this.speedY += gravity
      this.groundMargin = this.speedY + 2
    }
    if ((Math.floor(this.bgPositionY) > ground - this.groundMargin || Math.floor(this.bgPositionY) > ground) && this.speedY > 0) {
      this.speedY = 0
      this.positionY = ground - this.action.h + this.groundFeetDistance
    }
  }

  animateKen = (frames: number, right: boolean, left: boolean, bossHealth: number, ground: number, down: boolean) => {
    if (this.health < 1) {
      this.animateKenFalling(frames)
    } else if (bossHealth < 1) {
      this.animateKenWinning(frames)
    }
    else {
      if (this.hadoukenAnimation) {
        this.animateKenHadouken(frames)
      } else {
        if ((Math.floor(this.bgPositionY) > ground - this.groundMargin) && this.speedY === 0) {
          if (down) {
            this.animateKenLowPunch(frames)
          } else {
            this.animateKenWalking(frames, right, left)
          }
        } else {
          this.animateKenJumping(frames)
        }
      }
    }
  }

  animateKenWalking = (frames: number, right: boolean, left: boolean) => {
    this.img = this.imgWalk
    this.action.y = this.walk.y
    this.action.h = this.walk.h
    this.action.w = this.walk.w
    if (this.action.x % 49 !== 0) {
      this.action.x = 0
    }
    if (frames % 29 === 0 && (right || left)) {
      this.action.x = this.action.x + this.walk.w
      if (this.action.x > 196) {
        this.action.x = 0
      }
    }
  }

  animateKenHadouken = (frames: number) => {
    this.img = this.imgHadouken
    this.action.y = this.hadouken.y
    this.action.h = this.hadouken.h
    if (frames % 10 === 0 && this.hadoukenAnimation) {
      if (this.spriteHadouken > 3) {
        this.action.x = 0
        this.hadoukenAnimation = false
        this.hadoukenCreated = false
        this.action.w = this.hadouken.w[this.spriteHadouken]
        this.spriteHadouken = 0
      }
      this.action.w = this.hadouken.w[this.spriteHadouken]
      this.action.x = this.hadouken.x[this.spriteHadouken]
      this.spriteHadouken++
    }
  }

  animateKenJumping = (frames: number) => {
    this.img = this.imgJump
    this.action.y = this.jump.y
    this.action.h = this.jump.h
    if (frames % 14 === 0) {
      this.action.x = this.jump.x[this.spriteJump]
      this.action.w = this.jump.w[this.spriteJump]
      this.spriteJump++
    } if (this.spriteJump > 5) {
      this.spriteJump = 0
    }
  }

  animateKenWinning = (frames: number) => {
    this.img = this.imgWinning
    this.action.y = this.winning.y
    this.action.h = this.winning.h
    this.action.w = this.winning.w
    if (frames % 15 === 0) {
      this.action.x = this.action.x + this.winning.w
      if (this.action.x >= 193) {
        this.action.x = 0
      }
    }
  }

  animateKenFalling = (frames: number) => {
    this.img = this.imgFalling
    this.action.y = this.falling.y
    this.action.h = this.falling.h
    if (frames % 14 === 0) {
      if (this.spriteFalling > 4) {
        return
      }
      this.action.x = this.falling.x[this.spriteFalling]
      this.action.w = this.falling.x[this.spriteFalling + 1] - this.falling.x[this.spriteFalling]
      this.spriteFalling++
    }
  }

  animateKenLowPunch = (frames: number) => {
    this.img = this.imgLowPunch
    this.action.y = this.lowPunch.y
    this.action.h = this.lowPunch.h
    if (frames % 10 === 0) {
      if (this.spriteLowPunch > 1) {
        this.spriteLowPunch = 0
      }
      this.action.x = this.lowPunch.x[this.spriteLowPunch]
      this.action.w = this.lowPunch.x[this.spriteLowPunch + 1] - this.lowPunch.x[this.spriteLowPunch]
      this.spriteLowPunch++
    }
  }

  movingKen = (right: boolean, left: boolean, isJumping: boolean, ground: number, bossStage: boolean, bossHealth: number) => {
    if (this.health > 0 && bossHealth > 0 && this.img !== this.imgLowPunch) {
      if (isJumping && Math.floor(this.bgPositionY) > ground - this.groundMargin) {
        this.kenJumping()
      }
      if ((right || left)) {
        this.kenWalking(right, left, bossStage)
      }
    }
  }

  kenJumping = () => {
    this.speedY = this.jumpPower
  }


  kenWalking = (right: boolean, left: boolean, bossStage: boolean) => {
    if (bossStage) { //needs refactorization
      if (right && (this.positionX < canvas.width - this.action.w)) {
        this.positionX = this.positionX + this.walkSpeed
        this.bgPositionX = this.bgPositionX + this.walkSpeed
      } else if (left && (this.positionX > 0)) {
        this.positionX = this.positionX - this.walkSpeed
        this.bgPositionX = this.bgPositionX - this.walkSpeed
      }
    } else {
      if (right && (this.positionX < (canvas.width / 2))) {
        this.positionX = this.positionX + this.walkSpeed
        this.bgPositionX = this.bgPositionX + this.walkSpeed
      } else if (left && (this.positionX > 0)) {
        this.positionX = this.positionX - this.walkSpeed
        this.bgPositionX = this.bgPositionX - this.walkSpeed
      }
    }
  }
}