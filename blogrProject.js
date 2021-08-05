const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");
const mobileLinks = document.querySelector(".links-all-mobile");
const header = document.querySelector("header");

console.log(window.screen.width);

window.addEventListener("resize", function () {
  console.log(window.innerWidth);
  if (window.innerWidth > 768) {
    mobileLinks.style.display = "none";
    mobileLinks.style.height = "0";
    mobileLinks.style.visibility = "hidden";
    mobileLinks.classList.remove("open");
    nav.classList.remove("open");
    burger.children[0].src = "./blogr/icon-hamburger.svg";
  }
});

burger.addEventListener("click", function () {
  nav.classList.toggle("open");
  if (nav.classList.contains("open")) {
    mobileLinks.style.display = "block";
    mobileLinks.style.height = "auto";
    mobileLinks.style.visibility = "visible";
    mobileLinks.classList.add("open");
    burger.children[0].src = "./blogr/icon-close.svg";
  } else {
    mobileLinks.style.display = "none";
    mobileLinks.style.height = "0";
    mobileLinks.style.visibility = "hidden";
    mobileLinks.classList.remove("open");
    burger.children[0].src = "./blogr/icon-hamburger.svg";
  }
});
