let startTime;
let gameActive = false;

const box = document.getElementById("box");
const result = document.getElementById("result");
const startBtn = document.getElementById("startBtn");

function makeGreen() {
    box.style.background = "#4dff4d";
    startTime = Date.now();
    gameActive = true;
}

function startGame() {
    result.innerText = "";
    box.style.display = "none";
    gameActive = false;

    const randomDelay = Math.random() * 3000 + 1000;

    setTimeout(() => {
        box.style.display = "block";
        box.style.background = "#ff4d4d";
        makeGreen();
    }, randomDelay);
}

box.addEventListener("click", () => {
    if (gameActive) {
        const reactionTime = Date.now() - startTime;
        result.innerText = `Your reaction time: ${reactionTime} ms`;
        gameActive = false;
        box.style.display = "none";
    } else {
        result.innerText = "Too early! Wait for green.";
    }
});

startBtn.addEventListener("click", startGame);