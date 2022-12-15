class KenFace {
    img: HTMLImageElement
    x: number
    y: number
    w: number
    h: number
    imgEmptyLife: HTMLImageElement
    imgFullLife: HTMLImageElement

    constructor() {
        this.img = new Image()
        this.img.src = "../../../images/player/kenOk.png"
        this.x = 5
        this.y = 20
        this.imgEmptyLife = new Image()
        this.imgEmptyLife.src = "../../../images/player/emptyLife.png"
        this.imgFullLife = new Image()
        this.imgFullLife.src = "../../../images/player/fullLife.png"

    }

    drawKenFace = () => {
        ctx.drawImage(this.img, this.x, this.y, 70, 70)
      }

      drawEmptyLife = () => {
        ctx.drawImage(this.imgEmptyLife, this.x +80, this.y + 25, 150, 15)
      }

      drawLife = () => {
        ctx.drawImage(this.imgFullLife, this.x +80, this.y + 25, 150, 15)
      }

}