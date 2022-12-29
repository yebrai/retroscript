class Sonic {
  img: HTMLImageElement
  imgRunning: HTMLImageElement
  imgLosing: HTMLImageElement
  x: number
  y: number
  w: number
  h: number
  positionX: number
  positionY: number
  action: {
    x: number
    y: number
    w: number
    h: number
  }
  run: {
    x: number
    y: number
    w: number
    h: number
  }

  walkSpeed: number
  bgPositionX: number
  bgPositionY: number
  speedY: number
  groundFeetDistance: number
  groundMargin: number
  randomJump: number
  jumpPower: number

  lose: {
    x: number
    y: number
    w: number
    h: number
  }

  health: number

  constructor(bgTraveled: number) {
    this.img = new Image()
    this.imgRunning = new Image()
    this.imgRunning.src = '../../../images/enemies/sonic.png'

    this.imgLosing = new Image()
    this.imgLosing.src = '../../../images/enemies/sonicDie.png'

    this.action = {
      x: 0,
      y: 0,
      w: 100,
      h: 100,
    }

    this.run = {
      x: 0,
      y: 0,
      w: 95,
      h: 95,
    }

    this.lose = {
      x: 247.5,
      y: 0,
      w: 82.5,
      h: 94,
    }

    this.health = 1

    this.positionX = 1500
    this.positionY = 0

    this.bgPositionX = this.positionX + bgTraveled + 30 //35 to center sprite feet
    //speed
    this.groundFeetDistance = 43
    this.groundMargin = 10

    this.bgPositionY = this.positionY + this.action.h - this.groundFeetDistance


    //jumpSpeed
    this.speedY = 0
    this.jumpPower = -4

    this.walkSpeed = 4

    //random jump
    this.randomJump =  72 + (Math.random() * 144)
  }

  drawSonic = () => {
    ctx.drawImage(this.img, this.action.x, this.action.y, this.action.w, this.action.h, this.positionX, this.positionY, 40, 60)
  }

  animateSonicRunning = (frames: number) => {
    this.img = this.imgRunning
    this.action.y = this.run.y
    this.action.h = this.run.h
    this.action.w = this.run.w
    if (frames % 15 === 0) {
      this.action.x = this.action.x + this.run.w
      if (this.action.x > 295) {
        this.action.x = 0
      }
    }
  }

  animateSonicLose = (frames: number) => {
    if (this.action.x % this.lose.w !== 0) {
      this.action.x = this.lose.x
    }
    this.img = this.imgLosing
    this.action.y = this.lose.y
    this.action.h = this.lose.h
    this.action.w = this.lose.w
    if (frames % 13 === 0 && this.action.x > 0) {
      this.action.x = this.action.x - this.lose.w
    }
  }

  gravity = (gravity: number, ground: number) => { //
    if (!this.health) {
      ground = 1000
    }
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

  //
  movingSonic = (frames: number, ground: number) => {
    if (this.health < 1) {
      this.positionY--
      return
    }
    else if (frames % this.randomJump <= 10 && Math.floor(this.bgPositionY) > ground - this.groundMargin) {
      this.speedY = this.jumpPower
    }
    this.bgPositionX = this.bgPositionX - this.walkSpeed
    this.positionX = this.positionX - this.walkSpeed
    

  }



}