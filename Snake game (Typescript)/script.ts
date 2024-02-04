const snake = document.querySelector(".snake") as HTMLDivElement;
const board = document.querySelector(".wrapper") as HTMLDivElement;

let lastRenderTime = 0;
let snakeSpeed = 5;

let newSegments = 0;
const EXPANSION_RATE = 1;

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

let isGameOver = false;
const snakeBody = [{ x: 8, y: 8 }];

const main = (currentTime: number): void => {
  if (isGameOver) {
    if (confirm("Game over. Press ok to restart.")) {
      window.location.href = "/";
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snakeSpeed) return;

  lastRenderTime = currentTime;

  update();
  draw();
};

window.requestAnimationFrame(main);

const getInputDirection = () => {
  lastInputDirection = inputDirection;
  return inputDirection;
};

const update = (): void => {
  updateSnake();
  updateFood();
  checkDeath();
};

const draw = (): void => {
  board.innerHTML = "";
  drawSnake(board);
  drawFood(board);
};

// Handling snake functions
const updateSnake = () => {
  addSegments();
  inputDirection = getInputDirection();

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
};

const drawSnake = (gameBoard: HTMLDivElement) => {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = `${segment.y}`;
    snakeElement.style.gridColumnStart = `${segment.x}`;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
};

// Handling food functions
const updateFood = () => {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
};

const drawFood = (gameBoard: HTMLDivElement) => {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = `${food.y}`;
  foodElement.style.gridColumnStart = `${food.x}`;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
};

// Handling eating food functionality
const expandSnake = (amount): void => {
  newSegments += amount;
};

const equalPositions = (pos1, pos2) => {
  return pos1.x == pos2.x && pos1.y == pos2.y;
};

const onSnake = (position, { ignoreSneakHead = false } = {}) => {
  return snakeBody.some((segment, index) => {
    if (ignoreSneakHead && index === 0) return false;
    return equalPositions(segment, position);
  });
};

const addSegments = () => {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegments = 0;
};

// Ganerating food randomly within the grid
const getRandomFoodPosition = () => {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
};

const GRID_SIZE = 15;

const randomGridPosition = () => {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
};
let food = getRandomFoodPosition();

// Game over functions
const outsideGrid = (position): boolean => {
  return (
    position.x < 1 ||
    position.x > GRID_SIZE ||
    position.y < 1 ||
    position.y > GRID_SIZE
  );
};

const getSnakeHead = () => {
  return snakeBody[0];
};

const snakeIntersection = (): boolean => {
  return onSnake(snakeBody[0], { ignoreSneakHead: true });
};

const checkDeath = (): void => {
  isGameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
};

// Handling snake by pressing arrows
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
