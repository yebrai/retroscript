class BossBullet {
    imgBossBullet: HTMLImageElement
    bossBullet: {
        x: number[]
        y: number
        w: number
        h: number
    }
    action: {
        x: number
        y: number
        w: number
        h: number
    }
    speed: number
    img: HTMLImageElement
    originX: number
    originY: number
    spriteBossBullet: number
    constructor(originX: number, originY: number) {
        //bossBullet image
        this.imgBossBullet = new Image(),
            this.imgBossBullet.src = "../../../../images/enemies/boss/bulletBoss.png",
            this.bossBullet = {
                x: [4, 101, 198, 294, 397, 495, 591], 
                y: 0, 
                w: 76,
                h: 81,
            }
        this.action = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
        }

        this.speed = 6
        this.originX = originX + 75
        this.originY = originY
        this.spriteBossBullet = 0

    }
    drawBossBullet = () => {
        ctx.drawImage(this.imgBossBullet, this.action.x, this.action.y, this.action.w, this.action.h, this.originX, this.originY, this.bossBullet.w, this.bossBullet.h)
    }

    moveBossBullet = () => {
        this.originY -= this.speed
    }

    animateBossBullet = (frames: number) => {
        this.img = this.imgBossBullet
        this.action.y = this.bossBullet.y
        this.action.h = this.bossBullet.h
        this.action.w = this.bossBullet.w
        if (frames % 10 === 0) {
            if (this.spriteBossBullet > 6) {
                this.spriteBossBullet = 0
            }
            this.action.x = this.bossBullet.x[this.spriteBossBullet]
            this.spriteBossBullet++
        }
    }

}