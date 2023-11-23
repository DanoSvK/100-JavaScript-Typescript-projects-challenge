const mainBtn = document.querySelector(".generate-pass-btn-wrapper");
const displayText = document.querySelector(".pass-display__text");
const lengthPass = document.querySelector(".pass-len-input");
const passLengthCounter = document.querySelector(".pass-counter");
const copyCheck = document.querySelector(".copy-check");

// Password length counter
passLengthCounter.textContent = lengthPass.value;

// Initial value of lowercase option
let lowercaseCheck = true;

// Function argument
let fnArg = {
  lowercase: lowercaseCheck,
  uppercase: false,
  digits: false,
  symbols: false,
  spaces: false,
};

// Clipboard API
document.querySelector(".clipboard").addEventListener("click", () => {
  navigator.clipboard.writeText(displayText.value);
  // Self-dissapearing password copied notification
  copyCheck.style.opacity = 1;
  setTimeout(() => {
    copyCheck.style.opacity = 0;
  }, 2000);
});

// Main pass generating function
const generatePass = (options) => {
  // Object with all possible characters
  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    digits: "0123456789",
    symbols: "!-$^+",
    spaces: " ",
  };

  // Selecting those options that are checked (set to true) nd putting them into one single string
  const selectedChars = Object.keys(charSets).filter((set) => options[set]);
  const allChar = selectedChars.map((set) => charSets[set]).join("");

  displayText.value = "";

  // Randomly selecting and concatenating the cahracters to form a random password
  for (i = 0; i < lengthPass.value; i++) {
    let n = Math.floor(Math.random() * allChar.length);
    displayText.value += allChar[n];
  }
};

// Updating pass length counter and generating new password accordingly
lengthPass.addEventListener("change", () => {
  document.querySelector(".pass-counter").textContent = lengthPass.value;
  generatePass(fnArg);
});

// Updating boolean values of function argument object keys to include only checked types of characters
document.querySelector(".uppercase-check").addEventListener("change", () => {
  fnArg.uppercase = document.querySelector(".uppercase-check").checked;
});

document.querySelector(".lowercase-check").addEventListener("change", () => {
  fnArg.lowercase = document.querySelector(".lowercase-check").checked;
});

document.querySelector(".digits-check").addEventListener("change", () => {
  fnArg.digits = document.querySelector(".digits-check").checked;
});

document.querySelector(".symbols-check").addEventListener("change", () => {
  fnArg.symbols = document.querySelector(".symbols-check").checked;
});

document.querySelector(".spaces-check").addEventListener("change", () => {
  fnArg.spaces = document.querySelector(".spaces-check").checked;
});

mainBtn.addEventListener("click", () => {
  generatePass(fnArg);
});

window.addEventListener("load", () => {
  generatePass(fnArg);
});
