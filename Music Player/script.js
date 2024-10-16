var playBtn = document.querySelector(".btn-play");
var audioPlayer = document.getElementById("audioPlayer");
var volumeControl = document.getElementById("volumeControl"); //prettier-ignore
var timeControl = document.getElementById("timeControl");
var backwardBtn = document.querySelector(".fa-backward");
var forwardBtn = document.querySelector(".fa-forward");
var slider = document.querySelector('input[type="range"]'); //prettier-ignore
var audioSource = document.querySelector("source");
var backwardStepBtn = document.querySelector(".fa-backward-step"); //prettier-ignore
var forwardStepBtn = document.querySelector(".fa-forward-step"); //prettier-ignore
var imageContainer = document.querySelector(".image");
var overlay = document.querySelector(".overlay");
var songs = [
    {
        path: "./1.mp3",
        title: "Motion",
        author: "CardiB ft. Latto & Sexyy Red",
        image: "./1.jpg",
    },
    {
        path: "./2.mp3",
        title: "Lose Youeself",
        author: "Eminem",
        image: "./2.jpg",
    },
    {
        path: "./3.mp3",
        title: "Eyes Closed",
        author: "Imagine Dragons",
        image: "./3.jpg",
    },
];
var currSong = 0;
window.addEventListener("load", function () {
    audioSource.src = songs[currSong].path;
    imageContainer.style.backgroundImage = "url(".concat(songs[currSong].image, ")");
    overlay.style.backgroundImage = "url(".concat(songs[currSong].image, ")");
    console.log(songs[currSong].image);
    // Make sure the audio is loaded
    audioPlayer.load();
    // Waiting for metadata to get duration
    audioPlayer.addEventListener("loadedmetadata", function () {
        timeControl.max = "".concat(audioPlayer.duration);
    });
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
audioPlayer.addEventListener("timeupdate", function () {
    timeControl.value = "".concat(audioPlayer.currentTime);
    var value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    timeControl.style.background = "linear-gradient(to right, #fff ".concat(value, "%, #ddd ").concat(value, "%)");
});
backwardStepBtn.addEventListener("click", function () {
    if (currSong == 0) {
        currSong = songs.length - 1;
    }
    else {
        currSong -= 1;
    }
    audioSource.src = songs[currSong].path;
    imageContainer.style.backgroundImage = "url(".concat(songs[currSong].image, ")");
    overlay.style.backgroundImage = "url(".concat(songs[currSong].image, ")");
    // Make sure the audio is loaded
    audioPlayer.load();
    // Waiting for metadata to get duration
    audioPlayer.addEventListener("loadedmetadata", function () {
        timeControl.max = "".concat(audioPlayer.duration);
        console.log("Duration:", audioPlayer.duration); // Now this will print the correct duration
    });
    audioPlayer.play();
});
forwardStepBtn.addEventListener("click", function () {
    if (currSong == songs.length - 1) {
        currSong = 0;
    }
    else {
        currSong += 1;
    }
    audioSource.src = songs[currSong].path;
    imageContainer.style.backgroundImage = "url(".concat(songs[currSong].image, ")");
    overlay.style.backgroundImage = "url(".concat(songs[currSong].image, ")");
    // Make sure the audio is loaded
    audioPlayer.load();
    // Waiting for metadata to get duration
    audioPlayer.addEventListener("loadedmetadata", function () {
        timeControl.max = "".concat(audioPlayer.duration);
        console.log("Duration:", audioPlayer.duration); // Now this will print the correct duration
    });
    audioPlayer.play();
});
