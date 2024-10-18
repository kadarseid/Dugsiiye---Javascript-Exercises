const audioEl = document.createElement("audio");
document.body.appendChild(audioEl);

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progressContainer = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const volumeSlider = document.getElementById("volume");
const speedSelect = document.getElementById("speed");

const songs = [
  {
    title: "Song One",
    artist: "Artist One",
    cover: "https://via.placeholder.com/250/4CAF50/FFFFFF?text=1",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    cover: "https://via.placeholder.com/250/2196F3/FFFFFF?text=2",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    cover: "https://via.placeholder.com/250/FFC107/FFFFFF?text=3",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

let songIndex = 0;
let isPlaying = false;
let speed = 1;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audioEl.src = song.src;
}

loadSong(songs[songIndex]);

function playSong() {
  playBtn.querySelector("i").classList.remove("fa-play");
  playBtn.querySelector("i").classList.add("fa-pause");
  audioEl.play();
  isPlaying = true;
}

function pauseSong() {
  playBtn.querySelector("i").classList.remove("fa-pause");
  playBtn.querySelector("i").classList.add("fa-play");
  audioEl.pause();
  isPlaying = false;
}

function nextSong() {
  pauseSong();
  setTimeout(() => {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
  }, 300);
}

function prevSong() {
  pauseSong();
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;

  if (isNaN(duration)) return;

  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;

  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);

  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }

  durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

  const currentTimeMinutes = Math.floor(currentTime / 60);
  let currentTimeSeconds = Math.floor(currentTime % 60);

  if (currentTimeSeconds < 10) {
    currentTimeSeconds = `0${currentTimeSeconds}`;
  }

  currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;

  audioEl.playbackRate = speed;
}

function setProgress(e) {
  const width = this.clientWidth;

  const clickX = e.offsetX;

  const duration = audioEl.duration;

  if (isNaN(duration)) return;

  const newTime = (clickX / width) * duration;

  audioEl.currentTime = newTime;
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", prevSong);

audioEl.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

volumeSlider.addEventListener("input", (e) => {
  audioEl.volume = e.target.value;
});

speedSelect.addEventListener("change", (e) => {
  speed = parseFloat(e.target.value);
  audioEl.playbackRate = speed;
});

audioEl.addEventListener("loadeddata", updateProgress);
