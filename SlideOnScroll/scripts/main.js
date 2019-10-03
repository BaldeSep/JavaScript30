// All images on this page
const images = document.querySelectorAll("img");

// Debounce function to limit the amount of time a
// functions runs through time
// Source: https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function checkSlide(e) {
  images.forEach(img => {
    const windowTop = window.scrollY;
    const windowBottom = windowTop + window.innerHeight;
    const imgBoundClient = img.getBoundingClientRect();
    const imgHeight = imgBoundClient.height;
    const imgBottom = imgBoundClient.bottom + windowTop;

    let imgMiddlePosition = imgBottom - imgHeight / 2;

    if (windowTop < imgMiddlePosition && windowBottom >= imgMiddlePosition) {
      if (!img.classList.contains("active")) {
        img.classList.add("active");
      }
    } else {
      if (img.classList.contains("active")) {
        img.classList.remove("active");
      }
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));
