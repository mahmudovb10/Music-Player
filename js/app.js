const playBtn = document.querySelector("#play");
const forwardBtn = document.querySelector("#forward");
const backgwordBtn = document.querySelector("#backward");
const progressContainer = document.querySelector(".progress-container");
const progressEl = document.querySelector(".progress");
const volumeChanger = document.querySelector("#volumeChanger");
const volumeEl = document.querySelector("audio");
const cover = document.getElementById("cover");
const musicTitle = document.querySelector("#musicTitle");
const audio = document.querySelector("audio");
const container = document.querySelector(".container");
const durationEl = document.getElementById("duration");
const currentTimeEl = document.getElementById("current-duration");

audio.addEventListener("loadeddata", () => {
  const duration = audio.duration;
  const minutes = String(Math.floor(duration / 60));
  const seconds = String(Math.floor(duration % 60));
  let time = `${+minutes < 10 ? `${minutes.padStart(2, 0)}` : minutes}:${
    +seconds < 10 ? `${seconds.padStart(2, 0)}` : seconds
  }`;
  durationEl.textContent = time;
  audio.playbackRate = 2;
});

const songs = [
  "Weeknd - Blinding Lights",
  "Konsta - Odamlar Nima Deydi",
  "Konsta - Insonlar",
];

let currentPlayingSong = 0;

function changeSong(current) {
  audio.src = `./audios/${songs[current]}.mp3`;
  cover.src = `./images/${songs[current]}.png`;
  musicTitle.textContent = songs[current];
}

changeSong(currentPlayingSong);

function play() {
  audio.play();
  container.classList.add("play");
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function nextSong() {
  if (currentPlayingSong < songs.length - 1) {
    currentPlayingSong++;
  } else {
    currentPlayingSong = 0;
  }

  changeSong(currentPlayingSong);
  play();
}

function prevSong() {
  if (currentPlayingSong > 0) {
    currentPlayingSong--;
  } else {
    currentPlayingSong = songs.length - 1;
  }

  changeSong(currentPlayingSong);
  play();
}

function pause() {
  audio.pause();
  container.classList.remove("play");
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

function musicPlay() {
  const isPlaying = container.classList.contains("play");
  if (isPlaying) {
    pause();
  } else {
    play();
  }
}

function progress() {
  const duration = audio.duration;
  const currentTime = audio.currentTime;

  const IncreaseTime = isNaN(duration - currentTime)
    ? 0
    : duration + currentTime;

  const minutes = String(Math.floor(currentTime / 60)).padStart(2, "0");
  const seconds = String(Math.floor(currentTime % 60)).padStart(2, "0");
  let time = `${+minutes > 10 ? `${minutes.padStart(2, 0)}` : minutes}:${
    +seconds < 10 ? `${seconds.padStart(2, 0)}` : seconds
  }`;
  currentTimeEl.textContent = `${minutes}:${seconds}`;

  const p = (currentTime / IncreaseTime) * 100;
  progressEl.style.width = `${p}%`;
}

function changeTime(e) {
  const p = (e.offsetX / this.clientWidth) * 100;
  const currentTime = (audio.duration / 100) * p;
  audio.currentTime = currentTime;
}

playBtn.addEventListener("click", musicPlay);
audio.addEventListener("timeupdate", progress);
progressContainer.addEventListener("click", changeTime);
volumeChanger.addEventListener("input", () => {
  audio.volume = +volumeChanger.value / 100;
});
function rangeSlide(value) {
  document.getElementById("rangeValue").innerHTML = value;
}
audio.addEventListener("ended", nextSong);
backgwordBtn.addEventListener("click", prevSong);
forwardBtn.addEventListener("click", nextSong);
