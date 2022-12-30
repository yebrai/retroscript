class Hadouken {
    imgHadouken: HTMLImageElement
    hadouken: {
        x: number
        y: number
        w: number
        h: number
    }
    speed: number
    constructor(originX: number, originY: number) {
        //hadouken image
        this.imgHadouken = new Image(),
            this.imgHadouken.src = "../../../images/player/hadoukenImg.png",
            this.hadouken = {
                x: originX + 50, //50 to create hadouken on Ken's hands
                y: originY + 25, //25 to create hadouken on Ken's hands
                w: 34, // ancho
                h: 25, // alto 
            }

        this.speed = 8
    }
    drawHadouken = () => {
        ctx.drawImage(this.imgHadouken, this.hadouken.x, this.hadouken.y, this.hadouken.w, this.hadouken.h)
    }

    moveHadouken = () => {
        this.hadouken.x += this.speed
    }

}