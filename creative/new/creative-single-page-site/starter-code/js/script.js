const navigation = document.querySelector(".nav-inner-container");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", function () {
  navigation.classList.toggle("open");
});
