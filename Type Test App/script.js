const quoteText = document.querySelector(".quote").textContent;
const textArea = document.querySelector("#quote-input");
const textEl = document.querySelector(".quote-text");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const mistakesEl = document.querySelector(".mistake-count");
const displayResults = document.querySelector(".results");
const displayAccuracy = document.querySelector(".accuracy");
const displaySpeed = document.querySelector(".speed");
const resultsMessage = document.querySelector(".results-conclusion");
const restartBtn = document.querySelector(".restart-btn");

// App logic variables
textArea.disabled = true;
let intervalID;
let oneMinute = 60;
let i = 0;
let previousValue = "";
let correctKeyPressed = 0;
let incorrectKeyPressed = 0;
let text = "";

// Quote API to generate random quotes
const fetchQuote = async () => {
  const res = await fetch(
    "https://api.quotable.io/random?minLength=80&maxLength=100"
  );
  const data = await res.json();
  text = data.content;

  // Create a span element fir each character and render it with a class inside DOM
  textEl.innerHTML = "";
  for (j = 0; j < text.length; j++) {
    const el = document.createElement("span");
    el.classList.add("quote-char");
    el.textContent = `${text.trim()[j]}`;
    textEl.appendChild(el);
  }
};
fetchQuote();

// Start app and timer
startBtn.addEventListener("click", () => {
  intervalID = setInterval(flashText, 1000);
  textArea.disabled = false;

  startBtn.classList.toggle("active");
  stopBtn.classList.toggle("active");
});

const evalResults = () => {
  const oneWord = 5;
  const percentage = 100;
  const totalTime = 60;
  const timeLeft = oneMinute;
  // prettier-ignore
  const accuracyFormula = Math.round(correctKeyPressed > text.length ? 100: (correctKeyPressed / text.length) * percentage);
  // prettier-ignore
  const speedFormula = oneMinute === 60? 0: Math.round(((correctKeyPressed + incorrectKeyPressed) / oneWord) *(totalTime / (totalTime - timeLeft)));

  clearInterval(intervalID);
  displayAccuracy.textContent = accuracyFormula;
  displaySpeed.textContent = speedFormula;
  resultsMessage.textContent = `Your accuracy at the speed of ${displaySpeed.textContent}wpm is ${displayAccuracy.textContent}%.`;
  displayResults.style.display = "flex";
  stopBtn.classList.toggle("active");
  restartBtn.classList.toggle("active");
};

restartBtn.addEventListener("click", () => {
  // Variables to default states
  textArea.disabled = true;
  oneMinute = 60;
  i = 0;
  previousValue = "";
  correctKeyPressed = 0;

  // Elements to default states
  textArea.value = "";
  textArea.disabled = true;
  restartBtn.classList.toggle("active");
  startBtn.classList.toggle("active");
  displayResults.style.display = "none";

  // Generate a new quote
  fetchQuote();
});

// Stop app, timer and calculate and display results
stopBtn.addEventListener("click", evalResults);

const flashText = () => {
  oneMinute--;
  document.querySelector(".time-count").textContent = oneMinute;
  if (oneMinute === 0) {
    evalResults();
  }
};

// Main app's logic
textArea.addEventListener("input", (e) => {
  const test = document.querySelectorAll(".quote-char");
  let currentValue = e.target.value;

  // i value set to  and icnrements after a key being pressed and compared everytime with the last char of textArea value.
  // If backspace is pressed, i is substracted by 1. Backspace is recognized by comparing previous and current value after each input
  // Set char colors accordingly
  if (text.trim()[i] == textArea.value.slice(-1)) {
    test[i].style.color = "green";
    i++;
    correctKeyPressed++;
  } else if (currentValue.length < previousValue.length) {
    i--;
    test[i].style.color = "black";
  } else {
    test[i].style.color = "red";
    i++;
    incorrectKeyPressed++;
  }
  mistakesEl.textContent = incorrectKeyPressed;
  previousValue = currentValue;
});
