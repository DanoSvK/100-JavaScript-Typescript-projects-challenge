const flipButton = document.querySelector(".flip") as HTMLButtonElement;
const tailsScore = document.querySelector(".tails-score")!;
const headsScore = document.querySelector(".heads-score")!;
const resetButton = document.querySelector(".reset")!;
const headsCoin = document.querySelector(".heads")!;
const tailsCoin = document.querySelector(".tails")!;

// Animation option object
const Options: {
  duration: number;
  iterations: number;
  easing: string;
} = {
  duration: 3000,
  iterations: 1,
  easing: "ease-in-out",
};

// Function to handle animations
const animateCoin = (coin: Element, startRotation: number, endRotation: number): void => {
  coin.animate(
    [
      // key frames
      { transform: `rotateX(${startRotation}deg)` },
      { transform: `rotateX(${endRotation}deg)` },
    ],
    Options
  );
}

// Function to trigger animation that ends on Tails
function resultIsTailsAnimation(): void {
  animateCoin(headsCoin, 0, 2340)
  animateCoin(tailsCoin, 180, 2520)
}


// Function to trigger animation that ends on Heads
function resultIsHeadsAnimation(): void {
  animateCoin(headsCoin, 0, 2520);
  animateCoin(tailsCoin, 180, 2700);
}

// Heads-Tails points
let tailsPoints = 1;
let headsPoints = 1;
let animationDuration = 3000;

// 50% chance to trigger either result and adding a point to the respective side of the coin
function headsOrTailsResult(): void {
  let n: number = Math.random() < 0.5 ? 0 : 1

  // Starting animation and adding a point after the animation is done
  if (n === 0) {
    resultIsTailsAnimation();
    setTimeout(() => {
      tailsScore.textContent = `${tailsPoints++}`;
    }, animationDuration);
  } else {
    resultIsHeadsAnimation();
    setTimeout(() => {
      headsScore.textContent = `${headsPoints++}`;
    }, animationDuration);
  }
}

// Main function
flipButton.addEventListener("click", (): void => {
  // Visually disabling the button
  flipButton.classList.toggle("active");

  // Porgrammatically disabling button to not trigger the function > 1 time in a row
  flipButton.disabled = true;

  headsOrTailsResult();

  // Visually and programmatically enabling the button after the animation is done
  setTimeout(() => {
    flipButton.classList.toggle("active");
    flipButton.disabled = false;
  }, animationDuration);
});

// Reset points
resetButton.addEventListener("click", (): void => {
  tailsPoints = 1;
  headsPoints = 1;
  tailsScore.textContent = `0`;
  headsScore.textContent = `0`;
});
