const snake = document.querySelector(".snake") as HTMLDivElement;
const board = document.querySelector(".wrapper") as HTMLDivElement;

let lastRenderTime = 0;
let snakeSpeed = 1;
const isGameOver = false;
const snakeBody = [
  { x: 8, y: 9 },
  { x: 9, y: 9 },
  { x: 10, y: 9 },
  { x: 11, y: 9 },
  { x: 12, y: 9 },
];

const main = (currentTime: number): void => {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snakeSpeed) return;

  lastRenderTime = currentTime;

  update();
  draw(board);
};

window.requestAnimationFrame(main);

const update = () => {
  if (snakeBody[0].y >= 15) {
    return;
  }
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += 0;
  snakeBody[0].y += 1;
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
