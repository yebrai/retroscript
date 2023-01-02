"use strict";
class KenFace {
    constructor() {
        this.drawKenFace = (health) => {
            this.drawEmptyLife();
            this.drawLife(health);
            if (health > 2) {
                ctx.drawImage(this.img, this.x, this.y, 70, 70);
            }
            else {
                ctx.drawImage(this.imgInjured, this.x, this.y, 70, 70);
            }
        };
        this.drawEmptyLife = () => {
            ctx.drawImage(this.imgEmptyLife, this.x + 80, this.y + 25, 150, 15);
        };
        this.drawLife = (health) => {
            ctx.drawImage(this.imgFullLife, this.x + 80, this.y + 25, this.hpDraw[health - 1], 15);
        };
        this.img = new Image();
        this.img.src = "../../../images/player/kenOk.png";
        this.imgInjured = new Image();
        this.imgInjured.src = "../../../images/player/kenDmg.png";
        this.imgEmptyLife = new Image();
        this.imgEmptyLife.src = "../../../images/player/emptyLife.png";
        this.imgFullLife = new Image();
        this.imgFullLife.src = "../../../images/player/fullLife.png";
        this.x = 5;
        this.y = 20;
        this.hpDraw = [50, 100, 150];
    }
}
