const snake = document.querySelector(".snake") as HTMLDivElement;
const board = document.querySelector(".wrapper") as HTMLDivElement;

let lastRenderTime = 0;
let snakeSpeed = 1;
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };
const isGameOver = false;
const snakeBody = [{ x: 8, y: 9 }];

const main = (currentTime: number): void => {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snakeSpeed) return;

  lastRenderTime = currentTime;

  update();
  draw(board);
};

window.requestAnimationFrame(main);

const getInputDirection = () => {
  lastInputDirection = inputDirection;
  return inputDirection;
};

const update = () => {
  inputDirection = getInputDirection();
  if (snakeBody[0].y >= 15) {
    return;
  }
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
};

const draw = (gameBoard: HTMLDivElement) => {
  board.innerHTML = "";
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = `${segment.y}`;
    snakeElement.style.gridColumnStart = `${segment.x}`;
    snakeElement.classList.add("white");
    gameBoard.appendChild(snakeElement);
  });
};

window.addEventListener("keydown", (e: KeyboardEvent) => {
  switch (e.key) {
    case "ArrowUp":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case "ArrowRight":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
    case "ArrowLeft":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
  }
});
