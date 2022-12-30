class BossFace {
    img: HTMLImageElement
    imgInjured: HTMLImageElement
    x: number
    y: number
    w: number
    h: number
    imgEmptyLife: HTMLImageElement
    imgFullLife: HTMLImageElement
    hpDraw: number[]

    constructor() {
        this.img = new Image()
        this.img.src = "../../../images/enemies/boss/duoFace.png"
        this.imgInjured = new Image()
        this.imgInjured.src = "../../../images/enemies/boss/duoFaceInjured.png"
        this.x = 720
        this.y = 20
        this.imgEmptyLife = new Image()
        this.imgEmptyLife.src = "../../../images/player/emptyLife.png"
        this.imgFullLife = new Image()
        this.imgFullLife.src = "../../../images/player/fullLife.png"
        this.hpDraw = [30, 60, 90, 120, 150]

    }

    drawBossFace = (health:number) => {
        this.drawEmptyLife()
        this.drawLife(health)
        console.log(health)
      if (health > 4) {
        ctx.drawImage(this.img, this.x, this.y, 70, 70)
      } else{
        ctx.drawImage(this.imgInjured, this.x, this.y, 70, 70)
      }
      }

      drawEmptyLife = () => {
        ctx.drawImage(this.imgEmptyLife, this.x -160, this.y + 25, 150, 15)
      }

      drawLife = (health: number) => {
          ctx.drawImage(this.imgFullLife, this.x -160, this.y + 25, this.hpDraw[health - 1], 15)
      }

}