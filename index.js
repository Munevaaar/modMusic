let songs = [];
let index = 0;

  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const title = document.getElementById("title");
  const artist = document.getElementById("artist");
  const progress = document.getElementById("progress");


// Cargar JSON
  fetch('data/songs.json')
    .then(res => res.json())
    .then(data => {
      songs = data;
      loadSong(index);
    })
    .catch(err => console.error("Error al cargar canciones", err));
  
function loadSong(i) {
  const song = songs[i];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

function nextSong() {
  index = (index + 1) % songs.length;
  loadSong(index);
  audio.play();
  playBtn.textContent = "⏸";
}

function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  audio.play();
  playBtn.textContent = "⏸";
}

    playBtn.addEventListener("click", playPause);
    nextBtn.addEventListener("click", nextSong);
    prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Inicial
loadSong(index);