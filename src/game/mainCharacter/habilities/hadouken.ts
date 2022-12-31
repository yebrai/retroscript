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
        this.imgHadouken = new Image(),
            this.imgHadouken.src = "../../../images/player/hadoukenImg.png",
            this.hadouken = {
                x: originX + 50, 
                y: originY + 25,
                w: 34, 
                h: 25,  
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