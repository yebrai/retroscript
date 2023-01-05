"use strict";
class Hadouken {
    constructor(originX, originY) {
        this.drawHadouken = () => {
            ctx.drawImage(this.imgHadouken, this.hadouken.x, this.hadouken.y, this.hadouken.w, this.hadouken.h);
        };
        this.moveHadouken = () => {
            this.hadouken.x += this.speed;
        };
        this.imgHadouken = new Image(),
            this.imgHadouken.src = "./images/player/hadoukenImg.png",
            this.hadouken = {
                x: originX + 50,
                y: originY + 25,
                w: 34,
                h: 25,
            };
        this.speed = 8;
    }
}
