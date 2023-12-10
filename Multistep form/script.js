const inputs = document.querySelectorAll("input");
const progressLine = document.querySelector(".line");
const allInputs = document.querySelectorAll(".input");
const form = document.querySelector(".container");
const welcomeMsg = document.querySelector(".welcome");
const dataInfoList = document.querySelector(".list");

inputs.forEach((input) =>
  input.addEventListener("change", (e) => {
    if (input.value != "") {
      e.target.nextElementSibling.classList.add("filled");
    }
    if (input.value == "") {
      e.target.nextElementSibling.classList.remove("filled");
    }
  })
);

document
  .querySelectorAll(".step")
  .forEach((el, index) => (el.style.transform = `translateX(${index * 150}%)`));

let index;
let currSlide = 0;

const fn = (slide) => {
  document
    .querySelectorAll(".step")
    .forEach(
      (el, index) =>
        (el.style.transform = `translateX(${(index - slide) * 150}%)`)
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

const checkRequiredValues = (e) => {
  const form = e.target.form;
  const inputs = form.querySelectorAll("input[required]");
  const hasValue = Array.from(inputs).every(
    (input) => input.value.trim() != ""
  );
  return hasValue;
};

let isInputModified = false;

document.querySelectorAll("input").forEach((input) =>
  input.addEventListener("input", (e) => {
    isInputModified = true;
    // Validate email
    if (e.target.id === "email") {
      const emailInput = document.getElementById("email");
      const emailErrorMessage = document.getElementById("email-error-message");
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (isInputModified && e.target.value.trim() === "") {
        emailErrorMessage.textContent = "Please, enter an email address";
      } else if (emailPattern.test(emailInput.value)) {
        emailErrorMessage.textContent = ""; // Clear error message
      } else {
        emailErrorMessage.textContent = "Please enter a valid email address";
      }
    }
    // Validate password
    else if (e.target.id === "password") {
      const passErrorMessage = document.getElementById(
        "password-error-message"
      );
      const confirmPassErrorMessage = document.getElementById(
        "confirm-password-error-message"
      );
      const confirmPassInput = document.getElementById("confirm-password");
      const passInput = document.getElementById("password");

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
    else if (e.target.id === "confirm-password") {
      const passInput = document.getElementById("password");
      const confirmPassInput = document.getElementById("confirm-password");
      const confirmPassErrorMessage = document.getElementById(
        "confirm-password-error-message"
      );
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
        `#${e.target.id}-error-message`
      );

      if (isInputModified && e.target.value.trim() === "") {
        errorMessage.textContent = "This field is required  ";
      } else if (e.target.value.trim() != "") {
        errorMessage.textContent = ""; // Clear error message
      }
    }
  })
);

/// Hide sign up form and show welcome message with all data entered except password
document.querySelector(".submit").addEventListener("click", (e) => {
  e.preventDefault();
  form.style.display = "none";
  welcomeMsg.style.display = "block";
  const newArr = Array.from(allInputs);
  let html = newArr
    .map(
      (el) =>
        `<li class="list-item">${
          el.id.charAt(0).toUpperCase() + el.id.slice(1)
        }: <span>${el.value}</span></li>`
    )
    .join("");
  console.log(typeof newArr[0].id[0]);
  dataInfoList.insertAdjacentHTML("afterbegin", html);
});
