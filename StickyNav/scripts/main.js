// Grab onto the navbar
const navbar = document.querySelector(".navbar");

// Header
const header = document.querySelector("header");

// Logo for animation
const logo = document.querySelector(".logo");

// Main
const article = document.querySelector(".paper");

// Listen for an scroll event
window.addEventListener("scroll", e => {
  const headerClientRect = header.getClientRects()[0];
  const navbarClientRect = navbar.getClientRects()[0];
  const navbarTop = navbarClientRect.top;
  const headerBottom = headerClientRect.bottom;
  if (navbarTop < 0) {
    navbar.style.position = "fixed";
    logo.style.maxWidth = "100%";
    article.style.marginTop = `${navbarClientRect.height}px`;
  }

  if (headerBottom >= 0) {
    navbar.style.position = "relative";
    logo.style.maxWidth = "0";
    article.style.marginTop = 0;
  }
});
