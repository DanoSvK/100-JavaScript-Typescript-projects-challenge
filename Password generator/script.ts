const mainBtn = document.querySelector(".generate-pass-btn-wrapper") as HTMLDivElement;
const displayText = document.querySelector(".pass-display__text") as HTMLInputElement;
const lengthPass = document.querySelector(".pass-len-input") as HTMLInputElement;
const passLengthCounter = document.querySelector(".pass-counter") as HTMLParagraphElement;
const copyCheck = document.querySelector(".copy-check") as HTMLParagraphElement;
const closeBtn = document.querySelector(".close") as HTMLButtonElement;
const errorMessage = document.querySelector(".error-message") as HTMLDivElement;
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
  excludeDuplicates: false,
};

// Clipboard API
document.querySelector(".clipboard")?.addEventListener("click", () => {
  navigator.clipboard.writeText(displayText.value);
  // Self-dissapearing password copied notification
  copyCheck.style.opacity = "1";
  setTimeout(() => {
    copyCheck.style.opacity = "0";
  }, 2000);
});

closeBtn.addEventListener("click", () => {
  errorMessage.style.opacity = "0";
});

// Main pass generating function
const generatePass = (options) => {
  // Object with all possible characters
  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    digits: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~",
    spaces: " ",
  };

  // Selecting those options that are checked (set to true) nd putting them into one single string
  const selectedChars = Object.keys(charSets).filter((set) => options[set]);
  const allChar = selectedChars.map((set) => charSets[set]).join("");

  displayText.value = "";

  // Randomly selecting and concatenating the characters to form a random password
  for (let i = 0; i < +lengthPass.value; i++) {
    let n = Math.floor(Math.random() * allChar.length);
    if (!fnArg.excludeDuplicates) {
      displayText.value += allChar[n];
    } else if (fnArg.excludeDuplicates) {
      if (
        +lengthPass.value > 26 &&
        !fnArg.uppercase &&
        !fnArg.digits &&
        !fnArg.symbols &&
        !fnArg.spaces
      ) {
        errorMessage.style.opacity = "1";
        displayText.value = "Error!";
        break;
      }
      !displayText.value.includes(allChar[n])
        ? (displayText.value += allChar[n])
        : i--;
    }
  }
};

// Updating pass length counter and generating new password accordingly
lengthPass.addEventListener("change", () => {
  passLengthCounter.textContent = lengthPass.value;
  generatePass(fnArg);
});

// Updating boolean values of function argument object keys to include only checked types of characters
const uppercaseCheckEl = document.querySelector(".uppercase-check") as HTMLInputElement
uppercaseCheckEl.addEventListener("change", () => {
  fnArg.uppercase = uppercaseCheckEl.checked;
});

const lowercaseCheckEl = document.querySelector(".lowercase-check") as HTMLInputElement
lowercaseCheckEl.addEventListener("change", () => {
  fnArg.lowercase = lowercaseCheckEl.checked;
});

const digitsCheck = document.querySelector(".digits-check") as HTMLInputElement
digitsCheck.addEventListener("change", () => {
  fnArg.digits = digitsCheck.checked;
});

const symbolsCheck = document.querySelector(".symbols-check") as HTMLInputElement
symbolsCheck.addEventListener("change", () => {
  fnArg.symbols = symbolsCheck.checked;
});

const spaceCheck = document.querySelector(".spaces-check") as HTMLInputElement
spaceCheck.addEventListener("change", () => {
  fnArg.spaces = spaceCheck.checked;
});

const excludeDuplicatesCheckEl = document.querySelector(".exclude-duplicates-check") as HTMLInputElement
excludeDuplicatesCheckEl.addEventListener("change", () => {
    fnArg.excludeDuplicates = excludeDuplicatesCheckEl.checked;
    console.log(fnArg.excludeDuplicates);
  });
mainBtn.addEventListener("click", () => {
  generatePass(fnArg);
});

window.addEventListener("load", () => {
  generatePass(fnArg);
});
