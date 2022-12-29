class BossBullet {
    
    img: HTMLImageElement
    imgBossBullet: HTMLImageElement
    imgBulletImpact: HTMLImageElement
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
    originX: number
    originY: number
    spriteBossBullet: number
    spriteBulletImpact: number
    guidedBullet: boolean
    bulletImpact: {
        x: number
        y: number
        w: number
        h: number[]
    }
    constructor(originX: number, originY: number) {
        //bossBullet image
        this.img
        this.imgBossBullet = new Image(),
        this.imgBossBullet.src = "../../../../images/enemies/boss/bulletBoss.png",
        this.imgBulletImpact = new Image()
        this.imgBulletImpact.src = "../../../../images/enemies/boss/bulletBossImpact.png"
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
        this.bulletImpact = {
            x: 0, 
            y: 397, 
            w: 68,
            h: [77, 87, 86, 80, 67, 52],
        }

        this.speed = 6
        this.originX = originX + 75
        this.originY = originY
        this.spriteBossBullet = 0
        this.spriteBulletImpact = 6
        this.guidedBullet = false
    }
    drawBossBullet = () => {
        ctx.drawImage(this.img, this.action.x, this.action.y, this.action.w, this.action.h, this.originX, this.originY, this.action.w, this.action.h)
    }

    moveBossBullet = (frames: number, kenPosition: number) => {
        if (!this.guidedBullet && this.originY > -200) {
            this.originY -= this.speed
        } else {
            this.guidedBullet = true
            this.originY += this.speed
            if (this.originY <= -100) {
            this.originX = kenPosition
            }
        }
    }

    bossBulletEffect = (frames: number) => {
        if (this.originY > mapPrint[19][1][0] - 60 ) {
            this.bossBulletImpact(frames)
        } else {
            this.animateBossBullet(frames)
        }
    }

    bossBulletImpact = (frames: number) => {
        if (this.spriteBulletImpact === 6) {
            this.action.y = this.bulletImpact.y
            this.spriteBulletImpact--
            console.log("test")
        }
        this.speed = 0
        this.img = this.imgBulletImpact
        this.action.w = this.bulletImpact.w
        this.action.x = this.bulletImpact.x
        this.action.h = this.bulletImpact.h[this.spriteBulletImpact]
        if (frames % 10 === 0) {
            console.log("YYYYY",this.action.y)
            this.action.y -= this.bulletImpact.h[this.spriteBulletImpact - 1]
                this.spriteBulletImpact--
            }
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