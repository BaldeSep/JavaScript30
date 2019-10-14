// get entered seconds
let currentTimer = null;

// Timer Display
const timerDisplay = document.querySelector(".timer");

// Return time display
const returnTime = document.querySelector(".return-time");

//  Get buttons for user controlls
const timerButtons = document.querySelectorAll(".btn");

// Enter minues by form
const enterMinutes = document.querySelector(".timer-input");

// Event listeners
timerButtons.forEach(btn => {
  btn.addEventListener("click", setTimer);
});
enterMinutes.addEventListener("submit", setTimer);

function setTimer(e) {
  e.preventDefault();

  // if the user entered a time
  if (e.type === "submit") {
    const value = validateInput(this.firstElementChild.value);
    if (value) {
      timer(value * 60);
    }
    this.reset();
  } else if (e.type === "click") {
    // if the user clicked the button
    timer(this.dataset.secs);
  }
}

function validateInput(value) {
  if (value.match(/^\d+$/g)) {
    value = parseInt(value);
    if (value <= 60 && value > 0) {
      return value;
    }
  }
  return 0;
}

function timer(seconds) {
  // If a timer is already running clear
  clearInterval(currentTimer);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayReturnTime(then);

  currentTimer = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(currentTimer);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const display = `${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
  timerDisplay.innerText = display;
}

function displayReturnTime(seconds) {
  const endTime = new Date(seconds);
  let hour = endTime.getHours();
  hour = hour > 12 ? hour - 12 : hour;
  let minutes = endTime.getMinutes();
  returnTime.innerText = `Be Back at ${hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}
