
class Ken {
  imgWalk: HTMLImageElement
  walk: {
    x: number
    y: number
    w: number[]
    h: number
  }
  imgJump: HTMLImageElement
  jump: {
    x: number[]
    y: number
    w: number[]
    h: number
  }
  img: HTMLImageElement
  action: {
    x: number
    y: number
    w: number
    h: number
  }
  spriteFrame: number
  positionX: number
  bgPositionX: number
  bgPositionY: number
  positionY: number
  speedY: number
  jumpPower: number
  mapRelationfactor: number
  walkSpeed = 1
  groundFeetDistance: number
  groundMargin: number

  constructor() {
    //walking animation
    this.imgWalk = new Image(),
      this.imgWalk.src = "../../../images/player/kenWalking.png",
      this.walk = {
        x: 0,
        y: 0,
        w: [49], // ancho
        h: 95, // alto //!87
      }
    //jumping animation
    this.imgJump = new Image()
    this.imgJump.src = "../../../images/player/kenJump.png"
    this.jump = {
      x: [0, 46, 88, 154, 194, 274, 324],
      y: 0,
      w: [46, 42, 64, 40, 80, 50, 40],
      h: 95
    }
    this.img //= this.imgWalk
    this.action = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    }//= this.walk
    //sprite frame counter
    this.spriteFrame = 0
    //position x
    this.positionX = 0
    this.bgPositionX = 25//this.walk.w[0] / 2
    //speed
    this.positionY = 200
    this.groundFeetDistance = 18
    this.bgPositionY = this.positionY + this.action.h - this.groundFeetDistance //player feet position

    //jumpSpeed
    this.speedY = 0
    this.jumpPower = -4 //-4

    //walk speed
    this.walkSpeed = 4 //1

    this.groundMargin = 10

    //this.mapRelationfactor = 1.65

  }

  drawKen = () => {
    ctx.drawImage(this.img, this.action.x, this.action.y, this.action.w, this.action.h, this.positionX, this.positionY, this.action.w, this.action.h)
    ctx.drawImage(this.img, this.positionX + 25, this.bgPositionY, 10, 10) //draw feet position dev purposes only
  }

  gravity = (gravity: number, ground: number, bgCanvasRelation: number) => { //
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

  animateKen = (frames: number, right: boolean, left: boolean, ground: number) => {
    if ((Math.floor(this.bgPositionY) > ground - this.groundMargin) && this.speedY === 0) {
      this.animateKenWalking(frames, right, left)
    } else {
      this.animateKenJumping(frames)
    }
  }

  animateKenWalking = (frames: number, right: boolean, left: boolean) => {
    this.img = this.imgWalk
    this.action.y = this.walk.y
    this.action.h = this.walk.h
    this.action.w = this.walk.w[0]
    if (this.action.x % 49 !== 0) {
      this.action.x = 0
    }
    if (frames % 29 === 0 && (right || left)) {
      this.action.x = this.action.x + this.walk.w[0]
      if (this.action.x > 196) {
        this.action.x = 0
      }
    }
  }

  animateKenJumping = (frames: number) => {
    this.img = this.imgJump
    this.action.y = this.jump.y
    this.action.h = this.jump.h
    if (frames % 29 === 0) {
      this.action.x = this.jump.x[this.spriteFrame]
      this.action.w = this.jump.w[this.spriteFrame]
      this.spriteFrame = this.spriteFrame + 1
    } if (this.spriteFrame > 5) {
      this.spriteFrame = 0
    }
  }


  movingKen = (right: boolean, left: boolean, isJumping: boolean, ground: number) => {
    if (isJumping && Math.floor(this.bgPositionY) > ground - this.groundMargin) {
      this.kenJumping()
    }
    if ((right || left)) {
      this.kenWalking(right, left)
    }
  }

  kenJumping = () => {
    this.speedY = this.jumpPower
  }


  kenWalking = (right: boolean, left: boolean) => {
    if (right && (this.positionX < (canvas.width / 2))) {
      this.positionX = this.positionX + this.walkSpeed;
      this.bgPositionX = this.bgPositionX + this.walkSpeed
    } else if (left && (this.positionX > 0)) {
      this.positionX = this.positionX - this.walkSpeed;
      this.bgPositionX = this.bgPositionX - this.walkSpeed
    }
  }
}