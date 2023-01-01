"use strict";
class Boss {
    constructor() {
        this.drawBoss = () => {
            ctx.drawImage(this.img, this.action.x, this.action.y, this.action.w, this.action.h, this.positionX, this.positionY, this.bossWide, this.bossHeight);
        };
        this.gravity = (gravity, ground) => {
            if (this.health <= 0) {
                ground = 1000;
            }
            this.positionY = this.positionY + Math.floor(this.speedY);
            this.bgPositionY = this.positionY + this.bossHeight - this.groundFeetDistance;
            if (Math.floor(this.bgPositionY) < ground - this.groundMargin) {
                this.speedY += gravity;
                this.groundMargin = this.speedY + 2;
            }
            if ((Math.floor(this.bgPositionY) > ground - this.groundMargin || Math.floor(this.bgPositionY) > ground) && this.speedY > 0) {
                this.speedY = 0;
                this.positionY = ground - this.bossHeight + this.groundFeetDistance;
            }
        };
        this.animateBoss = (frames) => {
            if (this.health > 0) {
                this.animateBossShooting(frames);
            }
            else {
                this.animateBossFalling(frames);
            }
        };
        this.animateBossShooting = (frames) => {
            this.img = this.imgBoss;
            this.action.y = this.boss.y;
            this.action.h = this.boss.h;
            if (frames % 14 === 0) {
                if (this.spriteBoss === 7) {
                    this.bossBulletCreated = false;
                }
                if (this.spriteBoss > 10) {
                    this.spriteBoss = 0;
                }
                this.action.x = this.boss.x[this.spriteBoss];
                this.action.w = this.boss.w;
                this.spriteBoss++;
            }
        };
        //Needs some improvements
        this.animateBossFalling = (frames) => {
            if (this.action.x % this.lose.w !== 0) {
                this.action.x = this.lose.x;
            }
            this.img = this.imgLosing;
            this.action.y = this.lose.y;
            this.action.h = this.lose.h;
            this.action.w = this.lose.w;
            if (frames % 25 === 0 && this.action.x > 0) {
                this.action.x = this.action.x - this.lose.w;
            }
        };
        this.img = new Image();
        this.imgBoss = new Image();
        this.imgBoss.src = "../../../images/enemies/boss/duoBoss.png",
            this.imgLosing = new Image();
        this.imgLosing.src = "../../../images/enemies/boss/bossFalling.png";
        this.boss = {
            x: [3, 106, 205, 295, 383, 474, 565, 650, 741, 826, 911],
            y: 0,
            w: 74,
            h: 80,
        };
        this.action = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
        };
        this.lose = {
            x: 167,
            y: 0,
            w: 83,
            h: 66,
        };
        this.positionX = 650;
        this.positionY = 0;
        this.bossWide = 150;
        this.bossHeight = 225;
        this.spriteBoss = 0;
        this.speedY = 0;
        this.groundMargin = 10;
        this.groundFeetDistance = 10;
        this.bgPositionX = 3000;
        this.bossBulletCreated = true;
        this.health = 5;
    }
}
