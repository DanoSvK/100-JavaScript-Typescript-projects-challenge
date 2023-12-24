var _a;
var inputs = document.querySelectorAll("input");
var progressLine = document.querySelector(".line");
var allInputs = document.querySelectorAll(".input");
var form = document.querySelector(".container");
var welcomeMsg = document.querySelector(".welcome");
var dataInfoList = document.querySelector(".list");
var confirmPassInput = document.getElementById("confirm-password");
var passInput = document.getElementById("password");
// prettier-ignore
var confirmPassErrorMessage = document.getElementById("confirm-password-error-message");
inputs.forEach(function (input) {
    return input.addEventListener("change", function (e) {
        console.log(e.target);
        if (input.value != "") {
            e.target.nextElementSibling.classList.add("filled");
        }
        if (input.value == "") {
            e.target.nextElementSibling.classList.remove("filled");
        }
    });
});
document
    .querySelectorAll(".step")
    .forEach(function (el, index) { return (el.style.transform = "translateX(".concat(index * 150, "%)")); });
var index;
var currSlide = 0;
var fn = function (slide) {
    document
        .querySelectorAll(".step")
        .forEach(function (el, index) {
        return (el.style.transform = "translateX(".concat((index - slide) * 150, "%)"));
    });
};
var moveStepsLine = function () {
    if (currSlide === 0) {
        progressLine.classList.remove("line-step-2");
        progressLine.classList.remove("line-step-3");
    }
    else if (currSlide === 1) {
        progressLine.classList.add("line-step-2");
        progressLine.classList.remove("line-step-3");
    }
    else if (currSlide === 2) {
        progressLine.classList.add("line-step-3");
        progressLine.classList.remove("line-step-2");
    }
};
document.querySelectorAll(".next").forEach(function (btn) {
    return btn.addEventListener("click", function (e) {
        if (checkRequiredValues(e)) {
            e.preventDefault();
            currSlide++;
            fn(currSlide);
            moveStepsLine();
        }
        else {
            return;
        }
    });
});
document.querySelectorAll(".back").forEach(function (btn) {
    return btn.addEventListener("click", function (e) {
        e.preventDefault();
        currSlide--;
        fn(currSlide);
        moveStepsLine();
    });
});
var checkRequiredValues = function (e) {
    var form = e.target.form;
    var inputs = form.querySelectorAll("input[required]");
    var hasValue = Array.from(inputs).every(function (input) { return input.value.trim() !== ''; });
    return hasValue;
};
var isInputModified = false;
document.querySelectorAll("input").forEach(function (input) {
    return input.addEventListener("input", function (e) {
        isInputModified = true;
        var targetElement = e.target;
        // Validate email
        if (targetElement.id === "email") {
            var emailInput = document.getElementById("email");
            var emailErrorMessage = document.getElementById("email-error-message");
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (isInputModified && targetElement.value.trim() === "") {
                emailErrorMessage.textContent = "Please, enter an email address";
            }
            else if (emailPattern.test(emailInput.value)) {
                emailErrorMessage.textContent = ""; // Clear error message
            }
            else {
                emailErrorMessage.textContent = "Please enter a valid email address";
            }
        }
        // Validate password
        else if (targetElement.id === "password") {
            var passErrorMessage = document.getElementById("password-error-message");
            if (isInputModified && passInput.value.trim() === "") {
                passErrorMessage.textContent = "Please, enter a password";
            }
            else if (passInput.value.length < 8) {
                passErrorMessage.textContent =
                    "Your password must contain eight characters";
            }
            else {
                passErrorMessage.textContent = "";
            }
            if (confirmPassInput.value === passInput.value) {
                confirmPassErrorMessage.textContent = "";
            }
            else if (confirmPassInput.value != passInput.value) {
                confirmPassErrorMessage.textContent =
                    "The entered passwords do not match";
            }
        }
        // Validate password confirmation
        else if (targetElement.id === "confirm-password") {
            if (confirmPassInput.value != passInput.value) {
                confirmPassErrorMessage.textContent =
                    "The entered passwords do not match";
            }
            else if (passInput.value === "") {
                confirmPassErrorMessage.textContent = "";
            }
            else if (confirmPassInput.value === passInput.value) {
                confirmPassErrorMessage.textContent = "";
            }
            else if (confirmPassInput.value === "" && passInput.value === "") {
                confirmPassErrorMessage.textContent = "";
            }
        }
        // Validate others
        else {
            var errorMessage = document.querySelector("#".concat(targetElement.id, "-error-message"));
            if (isInputModified && targetElement.value.trim() === "") {
                errorMessage.textContent = "This field is required  ";
            }
            else if (targetElement.value.trim() != "") {
                errorMessage.textContent = ""; // Clear error message
            }
        }
    });
});
/// Hide sign up form and show welcome message with all data entered except password
(_a = document.querySelector(".submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
    e.preventDefault();
    form.style.display = "none";
    welcomeMsg.style.display = "block";
    var newArr = Array.from(allInputs);
    var html = newArr
        .map(function (el) {
        return "<li class=\"list-item\">".concat(el.id.charAt(0).toUpperCase() + el.id.slice(1), ": <span>").concat(el.value, "</span></li>");
    })
        .join("");
    console.log(typeof newArr[0].id[0]);
    dataInfoList.insertAdjacentHTML("afterbegin", html);
});
