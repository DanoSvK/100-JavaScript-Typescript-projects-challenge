var _a;
var mainBtn = document.querySelector(".generate-pass-btn-wrapper");
var displayText = document.querySelector(".pass-display__text");
var lengthPass = document.querySelector(".pass-len-input");
var passLengthCounter = document.querySelector(".pass-counter");
var copyCheck = document.querySelector(".copy-check");
var closeBtn = document.querySelector(".close");
var errorMessage = document.querySelector(".error-message");
// Password length counter
passLengthCounter.textContent = lengthPass.value;
// Initial value of lowercase option
var lowercaseCheck = true;
// Function argument
var fnArg = {
    lowercase: lowercaseCheck,
    uppercase: false,
    digits: false,
    symbols: false,
    spaces: false,
    excludeDuplicates: false,
};
// Clipboard API
(_a = document.querySelector(".clipboard")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    navigator.clipboard.writeText(displayText.value);
    // Self-dissapearing password copied notification
    copyCheck.style.opacity = "1";
    setTimeout(function () {
        copyCheck.style.opacity = "0";
    }, 2000);
});
closeBtn.addEventListener("click", function () {
    errorMessage.style.opacity = "0";
});
// Main pass generating function
var generatePass = function (options) {
    // Object with all possible characters
    var charSets = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        digits: "0123456789",
        symbols: "!$%&|[](){}:;.,*+-#@<>~",
        spaces: " ",
    };
    // Selecting those options that are checked (set to true) nd putting them into one single string
    var selectedChars = Object.keys(charSets).filter(function (set) { return options[set]; });
    var allChar = selectedChars.map(function (set) { return charSets[set]; }).join("");
    displayText.value = "";
    // Randomly selecting and concatenating the characters to form a random password
    for (var i = 0; i < +lengthPass.value; i++) {
        var n = Math.floor(Math.random() * allChar.length);
        if (!fnArg.excludeDuplicates) {
            displayText.value += allChar[n];
        }
        else if (fnArg.excludeDuplicates) {
            if (+lengthPass.value > 26 &&
                !fnArg.uppercase &&
                !fnArg.digits &&
                !fnArg.symbols &&
                !fnArg.spaces) {
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
lengthPass.addEventListener("change", function () {
    passLengthCounter.textContent = lengthPass.value;
    generatePass(fnArg);
});
// Updating boolean values of function argument object keys to include only checked types of characters
var uppercaseCheckEl = document.querySelector(".uppercase-check");
uppercaseCheckEl.addEventListener("change", function () {
    fnArg.uppercase = uppercaseCheckEl.checked;
});
var lowercaseCheckEl = document.querySelector(".lowercase-check");
lowercaseCheckEl.addEventListener("change", function () {
    fnArg.lowercase = lowercaseCheckEl.checked;
});
var digitsCheck = document.querySelector(".digits-check");
digitsCheck.addEventListener("change", function () {
    fnArg.digits = digitsCheck.checked;
});
var symbolsCheck = document.querySelector(".symbols-check");
symbolsCheck.addEventListener("change", function () {
    fnArg.symbols = symbolsCheck.checked;
});
var spaceCheck = document.querySelector(".spaces-check");
spaceCheck.addEventListener("change", function () {
    fnArg.spaces = spaceCheck.checked;
});
var excludeDuplicatesCheckEl = document.querySelector(".exclude-duplicates-check");
excludeDuplicatesCheckEl.addEventListener("change", function () {
    fnArg.excludeDuplicates = excludeDuplicatesCheckEl.checked;
    console.log(fnArg.excludeDuplicates);
});
mainBtn.addEventListener("click", function () {
    generatePass(fnArg);
});
window.addEventListener("load", function () {
    generatePass(fnArg);
});
