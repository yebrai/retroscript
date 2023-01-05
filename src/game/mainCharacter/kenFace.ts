class KenFace {
  private img: HTMLImageElement
  private readonly imgInjured: HTMLImageElement
  private x: number
  private y: number
  private readonly imgEmptyLife: HTMLImageElement
  private readonly imgFullLife: HTMLImageElement
  private hpDraw: number[]

  constructor() {
    this.img = new Image()
    this.img.src = "./images/player/kenOk.png"
    this.imgInjured = new Image()
    this.imgInjured.src = "./images/player/kenDmg.png"
    this.imgEmptyLife = new Image()
    this.imgEmptyLife.src = "./images/player/emptyLife.png"
    this.imgFullLife = new Image()
    this.imgFullLife.src = "./images/player/fullLife.png"
    
    this.x = 5
    this.y = 20
    this.hpDraw = [50, 100, 150]
  }

  drawKenFace = (health: number) => {
    this.drawEmptyLife()
    this.drawLife(health)
    if (health > 2) {
      ctx.drawImage(this.img, this.x, this.y, 70, 70)
    } else {
      ctx.drawImage(this.imgInjured, this.x, this.y, 70, 70)
    }
  }

  drawEmptyLife = () => {
    ctx.drawImage(this.imgEmptyLife, this.x + 80, this.y + 25, 150, 15)
  }

  drawLife = (health: number) => {
    ctx.drawImage(
      this.imgFullLife,
      this.x + 80,
      this.y + 25,
      this.hpDraw[health - 1],
      15
    )
  }
}
