"use strict";
class Sonic {
    constructor() {
        this.drawSonic = () => {
            ctx.drawImage(this.img, this.action.x, this.action.y, this.action.w, this.action.h, this.positionX, this.positionY, this.action.w, this.action.h);
        };
        this.img = new Image();
        this.img.src = '../../../images/enemies/sonic.png';
        this.x = 5;
        this.y = 20;
        this.w = 50;
        this.h = 100;
        this.action = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
        };
        this.positionX = 800;
        this.positionY = 0;
    }
}
