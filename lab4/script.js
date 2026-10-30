const menu = document.getElementById("menu");
const gameArea = document.getElementById("game-area");
const difficultySelect = document.getElementById("difficulty");
const colorSelect = document.getElementById("color");
const startBtn = document.getElementById("start-btn");
const scoreSpan = document.getElementById("score");
const timerSpan = document.getElementById("timer");
const target = document.getElementById("target");

let score = 0;
let timeLeft = 0;
let maxTime = 0;
let timerInterval = null;
let targetSize = 50;

// Налаштування складності: час на клік (у секундах) та розмір квадрата (у пікселях)
const settings = {
    lazy: { time: 4, size: 70 },
    normal: { time: 2, size: 50 },
    hard: { time: 1, size: 30 }
};

// Переміщення квадрата у випадкову точку екрана
function moveTarget() {
    const maxX = window.innerWidth - targetSize - 20;
    const maxY = window.innerHeight - targetSize - 100;

    const randomX = Math.floor(Math.random() * maxX) + 10;
    const randomY = Math.floor(Math.random() * maxY) + 80;

    target.style.left = randomX + "px";
    target.style.top = randomY + "px";
}

// Запуск та перезапуск таймера зворотного відліку
function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = maxTime;
    timerSpan.textContent = timeLeft;

    timerInterval = setInterval(function () {
        timeLeft--;
        timerSpan.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(`Game over! Your score is ${score}, congratulations!\nPlease, reload the page to start a new game.`);
            target.style.display = "none";
        }
    }, 1000);
}

// Клік по кнопці Start
startBtn.addEventListener("click", function () {
    const diff = difficultySelect.value;
    const color = colorSelect.value;

    // Якщо користувач не обрав складність або колір — нічого не робимо (або попереджуємо)
    if (!diff || !color) {
        alert("Please choose both difficulty and color!");
        return;
    }

    maxTime = settings[diff].time;
    targetSize = settings[diff].size;

    // Ховаємо початкове меню і показуємо ігрове поле
    menu.style.display = "none";
    gameArea.style.display = "block";

    // Задаємо розмір і колір нашому квадрату
    target.style.width = targetSize + "px";
    target.style.height = targetSize + "px";
    target.style.backgroundColor = color;
    target.style.display = "block";

    score = 0;
    scoreSpan.textContent = score;

    moveTarget();
    resetTimer();
});

// Клік по самому квадрату
target.addEventListener("click", function () {
    if (timeLeft > 0) {
        score++;
        scoreSpan.textContent = score;
        moveTarget();
        resetTimer();
    }
});