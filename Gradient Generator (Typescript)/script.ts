const generateBtn = document.querySelector(".generate-btn") as HTMLButtonElement; // prettier-ignore
const colorL = document.querySelector(".left-color") as HTMLInputElement;
const colorR = document.querySelector(".right-color") as HTMLInputElement;
const arrows = document.querySelectorAll(".direction-btn") as NodeListOf<HTMLButtonElement>; // prettier-ignore
const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
const copyBtn = document.querySelector(".copy-btn") as HTMLButtonElement;

const activateClickedArrows = (e: Event): void => {
  arrows.forEach((arrow) => arrow.classList.remove("active"));
  const target = e.target as HTMLElement;
  const direction = target.closest(".direction-btn") as HTMLButtonElement;
  if (direction) {
    direction.classList.add("active");
  }
};

const generateBackgroundColor = (): void => {
  const arrowClicked = document.querySelector(
    ".direction-btn.active"
  ) as HTMLButtonElement;
  const direction = arrowClicked.dataset.direction;
  const gradient = `linear-gradient(${direction}, ${colorL.value}, ${colorR.value})`;
  document.body.style.background = gradient;
  textarea.textContent = gradient;
};

const copiedTextMessage = (): void => {
  navigator.clipboard.writeText(textarea.value);
  const copyMsg = document.querySelector(".copy-msg") as HTMLParagraphElement;
  copyMsg.style.visibility = "visible";
  copyBtn.disabled = true;
  setTimeout(() => {
    copyMsg.style.visibility = "hidden";
    copyBtn.disabled = false;
  }, 2000);
};

window.addEventListener("load", generateBackgroundColor);
generateBtn.addEventListener("click", generateBackgroundColor);
copyBtn.addEventListener("click", copiedTextMessage);
arrows.forEach((arrow) => {
  arrow.addEventListener("click", activateClickedArrows);
});
