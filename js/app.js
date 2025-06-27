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
const speed = document.getElementById("speed");
const normalSpeed = document.getElementById("normalSpeed");
const mutedBtn = document.getElementById("mutedBtn");
const video = document.querySelector(".clips");
const slowSpeed = document.getElementById("slowSpeed");
const verySpeed = document.getElementById("verySpeed");

audio.addEventListener("loadeddata", () => {
  const duration = audio.duration;
  const minutes = String(Math.floor(duration / 60));
  const seconds = String(Math.floor(duration % 60));
  let time = `${+minutes < 10 ? `${minutes.padStart(2, 0)}` : minutes}:${
    +seconds < 10 ? `${seconds.padStart(2, 0)}` : seconds
  }`;
  durationEl.textContent = time;
});

speed.addEventListener("click", () => {
  const musicSpeed = (audio.playbackRate = 2);
});
normalSpeed.addEventListener("click", () => {
  const normSpeed = (audio.playbackRate = 1);
});
slowSpeed.addEventListener("click", () => {
  const slowSpeed = (audio.playbackRate = 0.5);
});
verySpeed.addEventListener("click", () => {
  const verySpeed = (audio.playbackRate = 3);
});
const clips = [
  "The Weeknd - Blinding Linding",
  "Konsta -  Odamlar Nima Deydi",
  "Konsta - Insonlar",
];
let currentClips = 0;

function changeClips(current) {
  audio.src = `./audios/${songs[current]}.mp3`;
  cover.src = `./images/${songs[current]}.png`;
  clips.src = `./videos/${songs[current]}.mp4`;
}

const songs = [
  "Weeknd - Blinding Lights",
  "Konsta - Odamlar Nima Deydi",
  "Konsta - Insonlar",
];

let currentPlayingSong = 0;

function changeSong(current) {
  const songName = songs[current];
  const clipName = clips[current];

  audio.src = `./audios/${songName}.mp3`;
  cover.src = `./images/${songName}.png`;
  video.src = `./videos/${clipName}.mp4`;

  musicTitle.textContent = songName;

  video.play();
}

changeSong(currentPlayingSong);

function play() {
  audio.play();
  video.play();
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
  video.pause();
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

  const minutes = String(Math.floor(currentTime / 60)).padStart(2, "0");
  const seconds = String(Math.floor(currentTime % 60)).padStart(2, "0");
  currentTimeEl.textContent = `${minutes}:${seconds}`;

  if (!isNaN(duration)) {
    const progressPercent = (currentTime / duration) * 100;
    progressEl.style.width = `${progressPercent}%`;
  }
}

function changeTime(e) {
  const clickX = e.offsetX;
  const width = this.clientWidth;
  const duration = audio.duration;

  if (!isNaN(duration)) {
    const newTime = (clickX / width) * duration;
    audio.currentTime = newTime;
    video.currentTime = newTime;
  }
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
mutedBtn.addEventListener("click", mute);
