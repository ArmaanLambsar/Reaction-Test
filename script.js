const box = document.getElementById("box");
const result = document.getElementById("result");
const startBtn = document.getElementById("startBtn");
const prompt = document.getElementById("prompt");
const bestTimeEl = document.getElementById("bestTime");

let timerId = null;
let isWaiting = false;
let isActive = false;
let startTime = 0;
let bestTime = null;

function resetBoxState() {
    box.classList.remove("waiting", "go");
}

function updatePrompt(text) {
    prompt.textContent = text;
}

function updateBestTime(time) {
    if (bestTime === null || time < bestTime) {
        bestTime = time;
        bestTimeEl.textContent = `Best: ${bestTime} ms`;
    }
}

function setButtonState(enabled) {
    startBtn.disabled = !enabled;
}

function startGame() {
    clearTimeout(timerId);
    resetBoxState();
    result.textContent = "";
    isActive = false;
    isWaiting = true;
    updatePrompt("Get ready...");
    setButtonState(false);
    box.classList.add("waiting");

    const delay = Math.random() * 1800 + 1200;
    timerId = setTimeout(() => {
        isActive = true;
        isWaiting = false;
        startTime = performance.now();
        updatePrompt("Tap now!");
        box.classList.remove("waiting");
        box.classList.add("go");
    }, delay);
}

function handleBoxClick() {
    if (isActive) {
        const reactionTime = Math.round(performance.now() - startTime);
        updatePrompt("Nice shot!");
        result.textContent = `Reaction time: ${reactionTime} ms`;
        updateBestTime(reactionTime);
        isActive = false;
        setButtonState(true);
        resetBoxState();
    } else if (isWaiting) {
        clearTimeout(timerId);
        timerId = null;
        isWaiting = false;
        updatePrompt("Too early!");
        result.textContent = "Wait for the green square.";
        setButtonState(true);
        resetBoxState();
    } else {
        updatePrompt("Press Start to begin");
        result.textContent = "";
    }
}

box.addEventListener("click", handleBoxClick);
startBtn.addEventListener("click", startGame);

window.addEventListener("load", () => {
    setButtonState(true);
    updatePrompt("Press Start to begin");
});
