"use strict";
class Sonic {
    constructor(bgTraveled) {
        this.drawSonic = () => {
            ctx.drawImage(this.img, this.action.x, this.action.y, this.action.w, this.action.h, this.positionX, this.positionY, 40, 60);
        };
        this.animateSonic = (frames) => {
            if (this.health > 0) {
                this.animateSonicRunning(frames);
            }
            else {
                this.animateSonicLose(frames);
            }
        };
        this.animateSonicRunning = (frames) => {
            this.img = this.imgRunning;
            this.action.y = this.run.y;
            this.action.h = this.run.h;
            this.action.w = this.run.w;
            if (frames % 15 === 0) {
                this.action.x = this.action.x + this.run.w;
                if (this.action.x > 295) {
                    this.action.x = 0;
                }
            }
        };
        this.animateSonicLose = (frames) => {
            if (this.action.x % this.lose.w !== 0) {
                this.action.x = this.lose.x;
            }
            this.img = this.imgLosing;
            this.action.y = this.lose.y;
            this.action.h = this.lose.h;
            this.action.w = this.lose.w;
            if (frames % 13 === 0 && this.action.x > 0) {
                this.action.x = this.action.x - this.lose.w;
            }
        };
        this.gravity = (gravity, ground) => {
            if (this.health <= 0) {
                ground = 1000;
            }
            this.positionY = this.positionY + Math.floor(this.speedY);
            this.bgPositionY = this.positionY + this.action.h - this.groundFeetDistance;
            if (Math.floor(this.bgPositionY) < ground - this.groundMargin) {
                this.speedY += gravity;
                this.groundMargin = this.speedY + 2;
            }
            if ((Math.floor(this.bgPositionY) > ground - this.groundMargin || Math.floor(this.bgPositionY) > ground) && this.speedY > 0) {
                this.speedY = 0;
                this.positionY = ground - this.action.h + this.groundFeetDistance;
            }
        };
        //
        this.movingSonic = (frames, ground) => {
            if (this.health < 1) {
                this.positionY--;
                return;
            }
            else if (frames % this.randomJump <= 10 && Math.floor(this.bgPositionY) > ground - this.groundMargin) {
                this.speedY = this.jumpPower;
            }
            this.bgPositionX = this.bgPositionX - this.walkSpeed;
            this.positionX = this.positionX - this.walkSpeed;
        };
        this.img = new Image();
        this.imgRunning = new Image();
        this.imgRunning.src = './images/enemies/sonic.png';
        this.imgLosing = new Image();
        this.imgLosing.src = './images/enemies/sonicDie.png';
        this.action = {
            x: 0,
            y: 0,
            w: 100,
            h: 100,
        };
        this.run = {
            x: 0,
            y: 0,
            w: 95,
            h: 95,
        };
        this.lose = {
            x: 247.5,
            y: 0,
            w: 82.5,
            h: 94,
        };
        this.health = 1;
        this.positionX = 1500;
        this.positionY = 0;
        this.bgPositionX = this.positionX + bgTraveled + 30;
        this.groundFeetDistance = 43;
        this.groundMargin = 10;
        this.bgPositionY = this.positionY + this.action.h - this.groundFeetDistance;
        //jumpSpeed
        this.speedY = 0;
        this.jumpPower = -4;
        //Speed
        this.walkSpeed = 4;
        //random jump
        this.randomJump = 72 + (Math.random() * 144);
    }
}
