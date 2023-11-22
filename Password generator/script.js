const mainBtn = document.querySelector(".generate-pass-btn-wrapper");
const displayText = document.querySelector(".pass-display__text");
const lengthPass = document.querySelector(".pass-len-input");
const passLengthCounter = document.querySelector(".pass-counter");

passLengthCounter.textContent = lengthPass.value;

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!-$^+";

mainBtn.addEventListener("click", () => {
  displayText.textContent = "";
  for (i = 0; i < lengthPass.value; i++) {
    let n = Math.floor(Math.random() * characters.length);
    displayText.textContent += characters[n];
  }
});

document.querySelector(".clipboard").addEventListener("click", () => {
  navigator.clipboard.writeText(displayText.textContent);
  document.querySelector(".copy-check").style.opacity = 1;
  setTimeout(() => {
    document.querySelector(".copy-check").style.opacity = 0;
  }, 2000);
});

lengthPass.addEventListener("change", () => {
  document.querySelector(".pass-counter").textContent = lengthPass.value;
});
