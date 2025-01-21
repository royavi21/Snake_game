const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
let snake = [{ x: 8 * boxSize, y: 10 * boxSize }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
};
let score = 0;
let speed = 5; // Initial speed
let game;

const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restartButton");
const speedElement = document.getElementById("speed");
const increaseSpeedButton = document.getElementById("increaseSpeed");
const decreaseSpeedButton = document.getElementById("decreaseSpeed");

function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "lime" : "green";
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);

        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    if (direction === "RIGHT") head.x += boxSize;
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "UP") head.y -= boxSize;
    if (direction === "DOWN") head.y += boxSize;

    snake.unshift(head);

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        food = {
            x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
            y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
        };
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvas.width ||
        head.y >= canvas.height
    ) {
        endGame();
    }

    // Self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

function endGame() {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
}

function restartGame() {
    clearInterval(game);
    snake = [{ x: 8 * boxSize, y: 10 * boxSize }];
    direction = "RIGHT";
    score = 0;
    scoreElement.textContent = score;
    food = {
        x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
    };
    game = setInterval(drawGame, 1000 / speed);
}

function adjustSpeed(amount) {
    speed = Math.max(1, speed + amount);
    speedElement.textContent = speed;
    restartGame();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

restartButton.addEventListener("click", restartGame);
increaseSpeedButton.addEventListener("click", () => adjustSpeed(1));
decreaseSpeedButton.addEventListener("click", () => adjustSpeed(-1));

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    moveSnake();
    checkCollision();
}

game = setInterval(drawGame, 1000 / speed);
