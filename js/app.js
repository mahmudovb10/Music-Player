const playBtn = document.querySelector("#play");
const forwardBtn = document.querySelector("#forward");
const backgwordBtn = document.querySelector("#backward");
const progressContainer = document.querySelector(".progress-container");
const progressEl = document.querySelector(".progress");
const volumeChanger = document.querySelector("#volumeChanger");
const volumeEl = document.querySelector("audio");
const cover = document.getElementById("cover");
const musicTitle = document.querySelector("#musicTitle");
const audio = document.querySelector("audio"); // AVVAL audio aniqlanadi!
const container = document.querySelector(".container");

const songs = [
  "Weeknd - Blinding Lights",
  "Konsta - Insonlar",
  "Konsta - Odamlar Nima Deydi",
];

let currentPlayingSong = 0;
audio.volume = +volumeChanger.value / 100;

function changeSong(current) {
  audio.src = `./audios/${songs[current]}.mp3`;
  cover.src = `./images/${songs[current]}.png`;
  musicTitle.textContent = songs[current];
}

changeSong(currentPlayingSong); // KEYIN chaqiriladi

function play() {
  audio.play();
  container.classList.add("play");
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
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
  const p = (currentTime / duration) * 100;
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
