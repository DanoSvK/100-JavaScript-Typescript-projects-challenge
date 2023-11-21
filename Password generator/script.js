const mainBtn = document.querySelector(".generate-pass-btn-wrapper");
const displayText = document.querySelector(".pass-display__text");
const lengthPass = document.querySelector(".pass-len-input");
console.log(lengthPass.value);

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!-$^+";

mainBtn.addEventListener("click", () => {
  displayText.textContent = "";
  for (i = 1; i < lengthPass.value; i++) {
    let n = Math.floor(Math.random() * characters.length);
    displayText.textContent += characters[n];
  }
});
