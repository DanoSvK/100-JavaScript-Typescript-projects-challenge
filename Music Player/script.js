var playBtn = document.querySelector(".btn-play");
var audioPlayer = document.getElementById("audioPlayer");
var volumeControl = document.getElementById("volumeControl"); //prettier-ignore
var timeControl = document.getElementById("timeControl");
var backwardTimeBtn = document.querySelector(".fa-backward");
var forwardTimeBtn = document.querySelector(".fa-forward");
var slider = document.querySelector('input[type="range"]'); //prettier-ignore
var audioSource = document.querySelector("source");
var previousSongBtn = document.querySelector(".fa-backward-step"); //prettier-ignore
var nextSongBtn = document.querySelector(".fa-forward-step"); //prettier-ignore
var imageContainer = document.querySelector(".image");
var overlay = document.querySelector(".overlay");
var currTime = document.querySelector(".currTime");
var totalTime = document.querySelector(".totalTime");
var songTitle = document.querySelector(".title");
var songAuthor = document.querySelector(".author");
var songs = [
    {
        path: "./assets/1.mp3",
        title: "Motion",
        author: "CardiB ft. Latto & Sexyy Red",
        image: "./assets/1.jpg",
    },
    {
        path: "./assets/2.mp3",
        title: "Lose Youeself",
        author: "Eminem",
        image: "./assets/2.jpg",
    },
    {
        path: "./assets/3.mp3",
        title: "Eyes Closed",
        author: "Imagine Dragons",
        image: "./assets/3.jpg",
    },
];
var currSong = 0;
// Helper functions
var formatTime = function (timeInSeconds) {
    var minutes = Math.floor(timeInSeconds / 60)
        .toString()
        .padStart(2, "0");
    var seconds = Math.floor(timeInSeconds % 60)
        .toString()
        .padStart(2, "0");
    return "".concat(minutes, ":").concat(seconds);
};
var updateAudioPlayerTimeDisplay = function (timeSliderProp, audioProp, dislpayTimeEl) {
    timeControl[timeSliderProp] = "".concat(audioPlayer[audioProp]);
    var minutes = audioPlayer[audioProp] / 60;
    var seconds = audioPlayer[audioProp] % 60;
    var formattedMins = "".concat(Math.floor(minutes)).padStart(2, "0");
    var formattedSecs = "".concat(Math.floor(seconds)).padStart(2, "0");
    dislpayTimeEl.innerHTML = "".concat(formattedMins, ":").concat(formattedSecs);
};
var loadNewSongData = function () {
    audioSource.src = songs[currSong].path;
    imageContainer.style.backgroundImage = "url(".concat(songs[currSong].image, ")");
    overlay.style.backgroundImage = "url(".concat(songs[currSong].image, ")");
    songTitle.innerHTML = songs[currSong].title;
    songAuthor.innerHTML = songs[currSong].author;
    audioPlayer.load();
};
var togglePlayButtonState = function (isPlaying) {
    if (isPlaying) {
        playBtn.classList.add("fa-pause");
        playBtn.classList.remove("fa-play", "btn-play");
    }
    else {
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play", "btn-play");
    }
};
var playSongOnManualTrackChange = function () {
    togglePlayButtonState(true);
    audioPlayer.play();
};
// Main logic
window.addEventListener("load", function () {
    loadNewSongData();
    // Make sure the audio is loaded
    audioPlayer.load();
    // Waiting for metadata to get duration and calculate + format times
    audioPlayer.addEventListener("loadedmetadata", function () {
        // Update value of total time each second and format time
        timeControl.max = "".concat(audioPlayer.duration);
        totalTime.innerHTML = formatTime(audioPlayer["duration"]);
    });
});
playBtn.addEventListener("click", function (e) {
    var isPaused = e.target.classList.contains("btn-play");
    togglePlayButtonState(isPaused);
    isPaused ? audioPlayer.play() : audioPlayer.pause();
});
forwardTimeBtn.addEventListener("click", function (e) {
    audioPlayer.currentTime += 10;
});
backwardTimeBtn.addEventListener("click", function (e) {
    audioPlayer.currentTime -= 10;
});
timeControl.addEventListener("input", function (e) {
    audioPlayer.currentTime = +e.target.value;
});
audioPlayer.addEventListener("timeupdate", function () {
    // Update value of current time input slider (the dot) each second and format time
    timeControl.value = "".concat(audioPlayer.currentTime);
    currTime.innerHTML = formatTime(audioPlayer["currentTime"]);
    // Create dynamic line on the audio slider following current time dot
    var value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    timeControl.style.background = "linear-gradient(to right, #fff ".concat(value, "%, #ddd ").concat(value, "%)");
    // Play next song automatically if the current one is over
    if (audioPlayer.currentTime === audioPlayer.duration) {
        // Check if it's the last song in the list
        if (currSong == songs.length - 1) {
            currSong = 0;
        }
        else {
            currSong += 1;
        }
        loadNewSongData();
        audioPlayer.play();
    }
});
previousSongBtn.addEventListener("click", function () {
    // Check if it's the first song in the list
    if (currSong == 0) {
        currSong = songs.length - 1;
    }
    else {
        currSong -= 1;
    }
    loadNewSongData();
    playSongOnManualTrackChange();
    // Waiting for metadata to get duration
    audioPlayer.addEventListener("loadedmetadata", function () {
        timeControl.max = "".concat(audioPlayer.duration);
    });
});
nextSongBtn.addEventListener("click", function () {
    // Check if it's the last song in the list
    if (currSong == songs.length - 1) {
        currSong = 0;
    }
    else {
        currSong += 1;
    }
    loadNewSongData();
    playSongOnManualTrackChange();
    // Waiting for metadata to get duration
    audioPlayer.addEventListener("loadedmetadata", function () {
        timeControl.max = "".concat(audioPlayer.duration);
    });
});
