


class Ken {
  imgWalk: HTMLImageElement
  walk: {
    x: number
    y: number
    w: number
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

  constructor() {
    //walking animation
    this.imgWalk = new Image(),
      this.imgWalk.src = "../../../images/kenWalking.png",
      this.walk = {
        x: 0, // posición en eje x
        y: 0, // posición en eje y
        w: 49, // ancho
        h: 87, // alto
      }
    //jumping animation
    this.imgJump = new Image(),
      this.imgJump.src = "../../../images/kenJump.png"
    this.jump = {
      x: [0, 46, 88, 154, 194, 274, 324],
      y: 0,
      w: [46, 42, 64, 40, 80, 50, 40],
      h: 95
    }

    this.img = this.imgWalk
    this.action
    //sprite frame counter
    this.spriteFrame = 0

    //position x
    this.positionX = 0
  }

  


  drawKen = () => {
    ctx.drawImage(this.img, this.action.x, this.action.y, this.action.w, this.action.h, this.positionX, 200, this.action.w, this.action.h)
  }

  animateKen = (frames: number, right: boolean, left: boolean, isJumping: boolean) => {
    if (isJumping) {
      this.animateKenJumping(frames, isJumping)
    } else { 
      this.walk = {
        x: 0, // posición en eje x
        y: 0, // posición en eje y
        w: 49, // ancho
        h: 87, // alto
      }
      this.animateKenWalking(frames, right, left) 
    }

  }


  animateKenWalking = (frames: number, right: boolean, left: boolean) => {
    this.img = this.imgWalk
    this.action  = this.walk
    if (frames % 29 === 0 && (right || left)) {
      this.action.x = this.action.x + this.walk.w
      console.log("walking", this.walk, "action", this.action)
    }
    if (this.action.x > 196) {
      this.action.x = 0
    }
  }

  animateKenJumping = (frames: number, isJumping: boolean) => {
    this.img = this.imgJump
    this.action.y = this.jump.y
    this.action.h = this.jump.h
    if (frames % 29 === 0) {
      this.action.x = this.jump.x[this.spriteFrame]
      this.action.w = this.jump.w[this.spriteFrame]
      this.spriteFrame = this.spriteFrame + 1
      console.log("this.spriteFrame", this.spriteFrame)

    } if (this.spriteFrame > 5) {
      this.spriteFrame = 0
    }
  }

  movingKen = (right: boolean, left: boolean) => {
    if (right && (this.positionX < (canvas.width / 2))) {
      this.positionX = this.positionX + 1;
    } else if (left && (this.positionX > 0)) {

      this.positionX = this.positionX - 1;
    }

  
  }
  //delete me


}