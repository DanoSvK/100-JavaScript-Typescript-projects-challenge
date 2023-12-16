const quoteText = document.querySelector(".quote").textContent;
const textArea = document.querySelector("#quote-input");
const textEl = document.querySelector(".quote-text");
const text =
  "Wisdom cannot come by railroad or automobile or airplane or be hurried up by telegraph or telephone.";
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const mistakesEl = document.querySelector(".mistake-count");

textArea.disabled = true;

startBtn.addEventListener("click", () => {
  textArea.disabled = false;
  setInterval(() => {
    oneMinute--;
    document.querySelector(".time-count").textContent = oneMinute;
  }, 1000);
  startBtn.classList.toggle("active");
  stopBtn.classList.toggle("active");
});

for (j = 0; j < text.length; j++) {
  const el = document.createElement("span");
  el.classList.add("quote-char");
  el.textContent = `${text.trim()[j]}`;
  textEl.appendChild(el);
}

let i = 0;
let previousValue = "";
let mistakeCount = 0;
textArea.addEventListener("input", (e) => {
  const test = document.querySelectorAll(".quote-char");
  let currentValue = e.target.value;

  if (text.trim()[i] == textArea.value.slice(-1)) {
    test[i].style.color = "green";
    i++;
  } else if (currentValue.length < previousValue.length) {
    i--;
    test[i].style.color = "black";
  } else {
    test[i].style.color = "red";
    i++;
    mistakeCount++;
  }
  mistakesEl.textContent = mistakeCount;
  previousValue = currentValue;
});

let oneMinute = 60;
