"use strict";
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
//Screens
const startScreen = document.querySelector("#splash-screen");
const winScreen = document.querySelector("#win-screen");
const gameOverScreen = document.querySelector("#gameover-screen");
//Buttons
const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");
const tryAgainBtn = document.querySelector("#try-again-btn");
//Audio
const hadouken = new Audio('./sounds/hadouken.mp3');
let gameObj;
//Hide at start
gameOverScreen.style.display = "none";
canvas.style.display = "none";
winScreen.style.display = "none";
const startGame = () => {
    //hide
    startScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    winScreen.style.display = "none";
    //show
    canvas.style.display = "block";
    gameObj = new Game();
    gameObj.gameLoop();
};
const restartGame = () => {
    gameObj.isGameOn = false;
    startGame();
};
// Events
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
tryAgainBtn.addEventListener("click", restartGame);
window.addEventListener("keydown", (event) => {
    if (event.code === "KeyA") {
        gameObj.movement["left"] = true;
    }
    else if (event.code === "KeyD") {
        gameObj.movement["right"] = true;
    }
    else if (event.code === "KeyW") {
        gameObj.movement["isJumping"] = true;
    }
    else if (event.code === "KeyS") {
        gameObj.movement["down"] = true;
    }
    else if (event.code === "Space") {
        hadouken.play();
        hadouken.volume = 0.1;
        gameObj.player.hadoukenAnimation = true;
    }
});
window.addEventListener("keyup", (event) => {
    if (event.code === "KeyA") {
        gameObj.movement["left"] = false;
    }
    else if (event.code === "KeyD") {
        gameObj.movement["right"] = false;
    }
    else if (event.code === "KeyW") {
        gameObj.movement["isJumping"] = false;
    }
    else if (event.code === "KeyS") {
        gameObj.movement["down"] = false;
    }
});
