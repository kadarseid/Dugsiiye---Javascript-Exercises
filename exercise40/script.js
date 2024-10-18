const videoContainer = document.querySelector(".video-container");
const videoEl = document.querySelector("video");

const prevBtn = document.querySelector(".prev-btn");
const playPauseBtn = document.querySelector(".play-pause-btn");
const nextBtn = document.querySelector(".next-btn");
const muteBtn = document.querySelector(".mute-btn");
const volumeSlider = document.querySelector(".volume-slider");
const currentTimeEl = document.querySelector(".current-time");
const totalTimeEl = document.querySelector(".total-time");
const speedBtn = document.querySelector(".speed-btn");
const theaterBtn = document.querySelector(".theater-btn");
const fullScreenBtn = document.querySelector(".full-screen-btn");
const miniPlayerBtn = document.querySelector(".mini-player-btn");

const videos = [
  { src: "videos/video1.mp4" },
  { src: "videos/video2.mp4" },
  { src: "videos/video3.mp4" },
  { src: "videos/video4.mp4" },
];

let videoIndex = 1;

function loadVideo(video) {
  videoEl.src = video.src;
}

loadVideo(videos[videoIndex]);

muteBtn.addEventListener("click", toggleMute);
volumeSlider.addEventListener("input", (e) => {
  videoEl.volume = e.target.value;
  videoEl.muted = e.target.value === 0;
});

function toggleMute() {
  videoEl.muted = !videoEl.muted;
}

videoEl.addEventListener("volumechange", () => {
  volumeSlider.value = videoEl.volume;
  let volumeLevel;
  if (videoEl.muted || videoEl.volume === 0) {
    volumeLevel = "muted";
  } else if (videoEl.volume >= 0.5) {
    volumeLevel = "high";
  } else {
    volumeLevel = "low";
  }

  videoContainer.dataset.volumeLevel = volumeLevel;
});

videoEl.addEventListener("loadeddata", () => {
  totalTimeEl.textContent = formatTime(videoEl.duration);
});

videoEl.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(videoEl.currentTime);
});

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

function formatTime(time) {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor((time / 60) % 60);
  const hours = Math.floor(time / 3600);
  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`;
  }
}

playPauseBtn.addEventListener("click", togglePlay);
videoEl.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevVideo);
nextBtn.addEventListener("click", nextVideo);

function togglePlay() {
  videoEl.paused ? videoEl.play() : videoEl.pause();
}

videoEl.addEventListener("play", () => {
  videoContainer.classList.remove("paused");
});

videoEl.addEventListener("pause", () => {
  videoContainer.classList.add("paused");
});

function prevVideo() {
  setTimeout(() => {
    videoIndex--;
    if (videoIndex < 0) {
      videoIndex = videos.length - 1;
    }
    loadVideo(videos[videoIndex]);
    if (videoEl.play) {
      videoEl.pause();
      videoContainer.classList.add("paused");
    }
  }, 300);
}

function nextVideo() {
  setTimeout(() => {
    videoIndex++;
    if (videoIndex > videos.length - 1) {
      videoIndex = 0;
    }
    loadVideo(videos[videoIndex]);
    if (videoEl.play) {
      videoEl.pause();
      videoContainer.classList.add("paused");
    }
  }, 300);
  loadVideo(videos[videoIndex]);
}

speedBtn.addEventListener("click", changePlayBackSpeed);
theaterBtn.addEventListener("click", toggleTheaterMode);
fullScreenBtn.addEventListener("click", toggleFullScreenMode);
miniPlayerBtn.addEventListener("click", toggleMiniPlayerMode);

function changePlayBackSpeed() {
  let newPlaybackRate = videoEl.playbackRate + 0.25;
  if (newPlaybackRate > 2) newPlaybackRate = 0.25;
  videoEl.playbackRate = newPlaybackRate;
  speedBtn.textContent = `${newPlaybackRate}x`;
}

function toggleTheaterMode() {
  videoContainer.classList.toggle("theater");
}

function toggleFullScreenMode() {
  if (document.fullscreenElement == null) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function toggleMiniPlayerMode() {
  if (videoContainer.classList.contains("mini-player")) {
    document.exitPictureInPicture();
  } else {
    videoEl.requestPictureInPicture();
  }
}

document.addEventListener("fullscreenchange", () => {
  videoContainer.classList.toggle("full-screen", document.fullscreenElement);
});

videoEl.addEventListener("enterpictureinpicture", () => {
  videoContainer.classList.add("mini-player");
});

videoEl.addEventListener("leavepictureinpicture", () => {
  videoContainer.classList.remove("mini-player");
});
