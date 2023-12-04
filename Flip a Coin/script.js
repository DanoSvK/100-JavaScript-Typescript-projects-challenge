const flipButton = document.querySelector(".flip");
const tailsScore = document.querySelector(".tails-score");
const headsScore = document.querySelector(".heads-score");
const resetButton = document.querySelector(".reset");
const headsCoin = document.querySelector(".heads");
const tailsCoin = document.querySelector(".tails");
// Animation option object
const Options = {
  duration: 3000,
  iterations: 1,
  easing: "ease-in-out",
};

// Function to trigger animation that ends on Tails
function resultIsTailsAnimation() {
  headsCoin.animate(
    [
      // key frames
      { transform: "rotateX(0deg)" },
      { transform: "rotateX(2340deg)" },
    ],
    Options
  );

  tailsCoin.animate(
    [
      // key frames
      { transform: "rotateX(180deg)" },
      { transform: "rotateX(2520deg)" },
    ],
    Options
  );
}

// Function to trigger animation that ends on Heads
function resultIsHeadsAnimation() {
  headsCoin.animate(
    [
      // key frames
      { transform: "rotateX(0deg)" },
      { transform: "rotateX(2520deg)" },
    ],
    Options
  );

  tailsCoin.animate(
    [
      // key frames
      { transform: "rotateX(180deg)" },
      { transform: "rotateX(2700deg)" },
    ],
    Options
  );
}

// Heads-Tails points
let tailsPoints = 1;
let headsPoints = 1;
let animationDuration = 3000;
// 50% chance to trigger either result and adding a point to the respective side of the coin
function headsOrTailsResult() {
  let n = Math.random() < 0.5;

  // Starting animation and adding a point after the animation is done
  if (n < 0.5) {
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
flipButton.addEventListener("click", () => {
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
resetButton.addEventListener("click", () => {
  tailsPoints = 1;
  headsPoints = 1;
  tailsScore.textContent = `0`;
  headsScore.textContent = `0`;
});
