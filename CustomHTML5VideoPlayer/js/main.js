// Player Play State
let isPlaying = false;

// Video Player
const player = document.querySelector("video.video-player");

// Play Button
const playPauseButton = document.getElementById("video-play-button");

// Check button icon
function changeButtonIcon() {
  if (isPlaying) {
    playPauseButton.innerHTML = playPauseButton.dataset.pause;
  } else {
    playPauseButton.innerHTML = playPauseButton.dataset.play;
  }
}

// Playbutton event listener
playPauseButton.addEventListener("click", e => {
  if (isPlaying) {
    // If playing and click button pause
    player.pause();
  } else {
    // Else if not playing and click button play
    player.play();
  }
  // Switch state of player
  isPlaying = !isPlaying;
  // Change button icon
  changeButtonIcon();
});

// Volume Slider
const volumeSlider = document.getElementById("volume-controls");
volumeSlider.addEventListener("input", e => {
  player.volume = e.target.value;
});

// Playback speed slider
const playbackSpeedSlider = document.getElementById("playbackrate-controls");
playbackSpeedSlider.addEventListener("input", e => {
  player.playbackRate = e.target.value;
});

// Skip Back and Forward Buttons
const skipBackButton = document.getElementById("skip-back");
const skipForwardButton = document.getElementById("skip-forward");

skipBackButton.addEventListener("click", e => {
  player.currentTime -= parseFloat(e.target.dataset.skip);
});

skipForwardButton.addEventListener("click", e => {
  player.currentTime += parseFloat(e.target.dataset.skip);
});

// Progress Bar
const progressBarContainer = document.querySelector(".video-progress");
const progressBar = document.querySelector(".video-progress-filled");
player.addEventListener("timeupdate", e => {
  const percantageComplete = (e.target.currentTime / e.target.duration) * 100;
  progressBar.style.width = `${percantageComplete}%`;
  progressBar.style.flexBasis = `${percantageComplete}%`;
});
progressBarContainer.addEventListener("click", e => {
  progressBar.style.width = `${e.offsetX}px`;
  progressBar.style.flexBasis = `${e.offsetX}px`;
  const scrubPercentage = e.offsetX / progressBarContainer.clientWidth;
  player.currentTime = scrubPercentage * player.duration;
});
