var playBtn = document.querySelector(".btn-play");
var audioPlayer = document.getElementById("audioPlayer");
var volumeControl = document.getElementById("volumeControl");
var timeControl = document.getElementById("timeControl");
var backwardBtn = document.querySelector(".fa-backward");
var forwardBtn = document.querySelector(".fa-forward");
window.addEventListener("load", function () {
    timeControl.max = "".concat(audioPlayer.duration);
    console.log(audioPlayer);
});
playBtn.addEventListener("click", function (e) {
    var isPaused = e.target.classList.contains("btn-play");
    if (isPaused) {
        e.target.classList.add("fa-pause");
        e.target.classList.remove("fa-play");
        e.target.classList.remove("btn-play");
        audioPlayer.play();
    }
    else {
        e.target.classList.remove("fa-pause");
        e.target.classList.add("fa-play");
        e.target.classList.add("btn-play");
        audioPlayer.pause();
    }
});
// volumeControl.addEventListener("input", (e: Event) => {
//   audioPlayer.volume = +(e.target as HTMLInputElement).value;
// });
forwardBtn.addEventListener("click", function (e) {
    audioPlayer.currentTime += 10;
});
backwardBtn.addEventListener("click", function (e) {
    audioPlayer.currentTime -= 10;
});
timeControl.addEventListener("input", function (e) {
    audioPlayer.currentTime = +e.target.value;
});
var slider = document.querySelector('input[type="range"]');
audioPlayer.addEventListener("timeupdate", function () {
    timeControl.value = "".concat(audioPlayer.currentTime);
    console.log(timeControl.max);
    var value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    timeControl.style.background = "linear-gradient(to right, #fff ".concat(value, "%, #ddd ").concat(value, "%)");
});
