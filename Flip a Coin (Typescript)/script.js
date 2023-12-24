var flipButton = document.querySelector(".flip");
var tailsScore = document.querySelector(".tails-score");
var headsScore = document.querySelector(".heads-score");
var resetButton = document.querySelector(".reset");
var headsCoin = document.querySelector(".heads");
var tailsCoin = document.querySelector(".tails");
// Animation option object
var Options = {
    duration: 3000,
    iterations: 1,
    easing: "ease-in-out",
};
// Function to handle animations
var animateCoin = function (coin, startRotation, endRotation) {
    coin.animate([
        // key frames
        { transform: "rotateX(".concat(startRotation, "deg)") },
        { transform: "rotateX(".concat(endRotation, "deg)") },
    ], Options);
};
// Function to trigger animation that ends on Tails
function resultIsTailsAnimation() {
    animateCoin(headsCoin, 0, 2340);
    animateCoin(tailsCoin, 180, 2520);
}
// Function to trigger animation that ends on Heads
function resultIsHeadsAnimation() {
    animateCoin(headsCoin, 0, 2520);
    animateCoin(tailsCoin, 180, 2700);
}
// Heads-Tails points
var tailsPoints = 1;
var headsPoints = 1;
var animationDuration = 3000;
// 50% chance to trigger either result and adding a point to the respective side of the coin
function headsOrTailsResult() {
    var n = Math.random() < 0.5 ? 0 : 1;
    // Starting animation and adding a point after the animation is done
    if (n === 0) {
        resultIsTailsAnimation();
        setTimeout(function () {
            tailsScore.textContent = "".concat(tailsPoints++);
        }, animationDuration);
    }
    else {
        resultIsHeadsAnimation();
        setTimeout(function () {
            headsScore.textContent = "".concat(headsPoints++);
        }, animationDuration);
    }
}
// Main function
flipButton.addEventListener("click", function () {
    // Visually disabling the button
    flipButton.classList.toggle("active");
    // Porgrammatically disabling button to not trigger the function > 1 time in a row
    flipButton.disabled = true;
    headsOrTailsResult();
    // Visually and programmatically enabling the button after the animation is done
    setTimeout(function () {
        flipButton.classList.toggle("active");
        flipButton.disabled = false;
    }, animationDuration);
});
// Reset points
resetButton.addEventListener("click", function () {
    tailsPoints = 1;
    headsPoints = 1;
    tailsScore.textContent = "0";
    headsScore.textContent = "0";
});
