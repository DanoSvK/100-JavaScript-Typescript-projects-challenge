const inputs = document.querySelectorAll("input")!;
const progressLine = document.querySelector(".line") as HTMLDivElement;
const allInputs = document.querySelectorAll(".input")!;
const form = document.querySelector(".container")!;
const welcomeMsg = document.querySelector(".welcome") as HTMLDivElement;
const dataInfoList = document.querySelector(".list")!;
const confirmPassInput = document.getElementById("confirm-password") as HTMLInputElement;
const passInput = document.getElementById("password") as HTMLInputElement;
// prettier-ignore
const confirmPassErrorMessage = document.getElementById("confirm-password-error-message") as HTMLInputElement;

inputs.forEach((input) =>
  input.addEventListener("change", (e: Event) => {
    console.log(e.target as HTMLInputElement)
    if (input.value != "") {
      (e.target as HTMLInputElement).nextElementSibling!.classList.add("filled");
    }
    if (input.value == "") {
      (e.target as HTMLInputElement).nextElementSibling!.classList.remove("filled");
    }
  })
);

document
  .querySelectorAll(".step")
  .forEach((el, index) => ((el as HTMLElement).style.transform = `translateX(${index * 150}%)`));

let index: number;
let currSlide = 0;

const fn = (slide: number) => {
  document
    .querySelectorAll(".step")
    .forEach(
      (el, index) =>
        ((el as HTMLInputElement).style.transform = `translateX(${(index - slide) * 150}%)`)
    );
};

const moveStepsLine = () => {
  if (currSlide === 0) {
    progressLine.classList.remove("line-step-2");
    progressLine.classList.remove("line-step-3");
  } else if (currSlide === 1) {
    progressLine.classList.add("line-step-2");
    progressLine.classList.remove("line-step-3");
  } else if (currSlide === 2) {
    progressLine.classList.add("line-step-3");
    progressLine.classList.remove("line-step-2");
  }
};

document.querySelectorAll(".next").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    if (checkRequiredValues(e)) {
      e.preventDefault();
      currSlide++;
      fn(currSlide);
      moveStepsLine();
    } else {
      return;
    }
  })
);

document.querySelectorAll(".back").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    currSlide--;
    fn(currSlide);
    moveStepsLine();
  })
);

const checkRequiredValues = (e: Event) => {
  const form = (e.target as HTMLFormElement).form;
  const inputs = form.querySelectorAll("input[required]");
  const hasValue: boolean = Array.from(inputs).every((input: any) => input.value.trim() !== '');
  return hasValue;
};

let isInputModified = false;

document.querySelectorAll("input").forEach((input) =>
  input.addEventListener("input", (e) => {
    isInputModified = true;
    const targetElement = (e.target as HTMLInputElement)
    // Validate email
    if (targetElement.id === "email") {
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const emailErrorMessage = document.getElementById("email-error-message")!;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (isInputModified && targetElement.value.trim() === "") {
        emailErrorMessage.textContent = "Please, enter an email address";
      } else if (emailPattern.test(emailInput.value)) {
        emailErrorMessage.textContent = ""; // Clear error message
      } else {
        emailErrorMessage.textContent = "Please enter a valid email address";
      }
    }
    // Validate password
    else if (targetElement.id === "password") {
      const passErrorMessage = document.getElementById(
        "password-error-message"
      ) as HTMLDivElement;
      

      if (isInputModified && passInput.value.trim() === "") {
        passErrorMessage.textContent = "Please, enter a password";
      } else if (passInput.value.length < 8) {
        passErrorMessage.textContent =
          "Your password must contain eight characters";
      } else {
        passErrorMessage.textContent = "";
      }
      if (confirmPassInput.value === passInput.value) {
        confirmPassErrorMessage.textContent = "";
      } else if (confirmPassInput.value != passInput.value) {
        confirmPassErrorMessage.textContent =
          "The entered passwords do not match";
      }
    }
    // Validate password confirmation
    else if (targetElement.id === "confirm-password") {
      
      if (confirmPassInput.value != passInput.value) {
        confirmPassErrorMessage.textContent =
          "The entered passwords do not match";
      } else if (passInput.value === "") {
        confirmPassErrorMessage.textContent = "";
      } else if (confirmPassInput.value === passInput.value) {
        confirmPassErrorMessage.textContent = "";
      } else if (confirmPassInput.value === "" && passInput.value === "") {
        confirmPassErrorMessage.textContent = "";
      }
    }

    // Validate others
    else {
      const errorMessage = document.querySelector(
        `#${targetElement.id}-error-message`
      ) as HTMLDivElement;

      if (isInputModified && targetElement.value.trim() === "") {
        errorMessage.textContent = "This field is required  ";
      } else if (targetElement.value.trim() != "") {
        errorMessage.textContent = ""; // Clear error message
      }
    }
  })
);

/// Hide sign up form and show welcome message with all data entered except password
document.querySelector(".submit")?.addEventListener("click", (e: Event) => {
  e.preventDefault();
  (form as HTMLFormElement).style.display = "none";
  welcomeMsg.style.display = "block";
  const newArr = Array.from(allInputs);
  let html: string = newArr
    .map(
      (el: any) =>
        `<li class="list-item">${
          el.id.charAt(0).toUpperCase() + el.id.slice(1)
        }: <span>${el.value}</span></li>`
    )
    .join("");
  console.log(typeof newArr[0].id[0]);
  dataInfoList.insertAdjacentHTML("afterbegin", html);
});
