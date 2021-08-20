const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");

burger.addEventListener("click", function(e) {
    nav.classList.toggle("open");
});