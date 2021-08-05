const burger = document.querySelector(".burger");
const mobileLinks = document.querySelector(".links-mobile-container");

burger.addEventListener("click", function () {
  this.classList.toggle("open");
  mobileLinks.classList.toggle("open");
});
