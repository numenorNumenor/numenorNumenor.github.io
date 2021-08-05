const nav = document.querySelector("nav");
const hamburger = document.querySelector(".hamburger");
const navMobile = document.querySelector(".nav-links-mobile");

hamburger.addEventListener("click", function () {
  nav.classList.toggle("open");
  navMobile.classList.toggle("open");
});
