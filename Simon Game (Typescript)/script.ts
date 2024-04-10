const colorBlocks = document.querySelectorAll(".block") as NodeListOf<HTMLDivElement>; // prettier-ignore
const startGameScreen = document.querySelector(".start-game-screen-show") as HTMLElement; // prettier-ignore
const finalScore = document.querySelector(".final-score") as HTMLParagraphElement; // prettier-ignore
const startBtn = document.querySelector(".start") as HTMLButtonElement;
const gameScreen = document.querySelector(".container") as HTMLElement;
const scoreCount = document.querySelector(".counter-block") as HTMLDivElement;

// Convert node list into array, so for of loop works with it
const colorBlocksArray = Array.from(colorBlocks);
const ranNumsArr: Number[] = [];
let isPathGenerating = false;
let clicks = 0;
let score = 0;

// Async delay function to delay displaying of colors one by one and cresate gap before last color flash and player's turn
const delay = async (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const generateColorNumber = (): number => {
  const ranNum = Math.floor(Math.random() * 4) + 1;
  return ranNum;
};

const generateRandomColorPath = (): void => {
  isPathGenerating = true;
  gameScreen.classList.add("container-show");
  gameScreen.classList.remove("container-hide");
  ranNumsArr.push(generateColorNumber());
  colorFlashPath();
};

// Iterate over array of color nubmers and flash all the respective colors with delay
const colorFlashPath = async (): Promise<void> => {
  for (const num of ranNumsArr) {
    const currEl = document.querySelector(
      `[data-value="${num}"]`
    ) as HTMLDivElement;
    await delay(500);
    currEl.style.opacity = "1";
    await delay(500);
    currEl.style.opacity = "0.5";
    await delay(500);
  }
  isPathGenerating = false;
};

const handleClick = (e: Event): void => {
  const target = e.target as HTMLDivElement;
  if (target.classList.contains("block")) {
    if (!isPathGenerating) {
      if (Number(target.dataset.value) != ranNumsArr[clicks]) {
        gameOver();
      } else {
        clicks++;
      }
    }
  }

  if (clicks == ranNumsArr.length) {
    score = clicks;
    clicks = 0;
    scoreCount.textContent = `${score}`;
    generateRandomColorPath();
  }
};

const gameOver = (): void => {
  finalScore.textContent = `You final score is ${score}`;
  startBtn.textContent = "Play again";
  startGameScreen.classList.add("start-game-screen-show");
  startGameScreen.classList.remove("start-game-screen-hide");
};

const resetGame = (): void => {
  ranNumsArr.length = 0;
  clicks = 0;
  scoreCount.textContent = "0";
  startGameScreen.classList.add("start-game-screen-hide");
  startGameScreen.classList.remove("start-game-screen-show");
  generateRandomColorPath();
};

gameScreen.addEventListener("click", handleClick);
startBtn.addEventListener("click", resetGame);
