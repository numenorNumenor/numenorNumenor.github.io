const counter = document.getElementById("counter");

let startingMinutes = 80640;
let time = startingMinutes * 60;

const burger = document.querySelector(".burger");
const burgerLinks = document.querySelector(".burger-links");
const nav = document.querySelector("nav");
const select = document.querySelectorAll(".select");
const bookmark = document.querySelector(".bookmark");
const modal = document.querySelector(".modal");
const closeIcon = modal.querySelector(".close");
const backThis = document.querySelector(".back-this");
const body = document.querySelector("body");
const bambooBtn = document.querySelector(".bamboo-btn");
const blackBtn = document.querySelector(".black-btn");
const noRewardBtn = document.querySelector(".no-reward");
const bambooInput = document.querySelector(".bamboo-input");
const blackInput = document.querySelector(".black-input");
let customPledges = [];
let sum;
//modals
const modalBamboo = document.querySelector(".bamboo-left");
modalBamboo.innerText = 101;

const modalBlack = document.querySelector(".black-left");
modalBlack.innerText = 64;

const totalMoney = document.getElementById("total-money");
totalMoney.innerText = 0;

const desiredMoneyAmount = 10000;

const progressBar = document.querySelector(".progress");
progressBar.style.width = `0%`;

const totalBackers = document.getElementById("total-backers");
totalBackers.innerText = 0;

//bamboo start
let bambooMoney = 0;
let bambooMoneyCustom = 0;
let bambooClicks = 0;
let bambooClicksCustom = 0;
const bambooStand = document.getElementById("left-bamboo-stand");
bambooStand.innerText = 101;
//bamboo end

//black start
let blackMoney = 0;
let blackMoneyCustom = 0;
let blackClicks = 0;
let blackClicksCustom = 0;
const blackStand = document.getElementById("left-black-stand");
blackStand.innerText = 64;
//black start

burger.addEventListener("click", function () {
  nav.classList.toggle("closed");
});

select.forEach(function (button) {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    // const progressBarLength =
    //   (parseInt(totalMoney.innerText) / desiredMoneyAmount) * 100 + "%";
    // progressBar.style.width = progressBarLength;

    if (e.target.dataset.name === "bamboo") {
      let add = function (customPledges) {
        return customPledges.reduce((a, b) => a + b, 0);
      };
      sum = add(customPledges);

      modalBamboo.innerText--;
      bambooStand.innerText--;
      bambooClicks++;
      bambooMoney = bambooClicks * 25;
      totalMoney.innerText = bambooMoney + blackMoney + sum;

      totalBackers.innerText =
        bambooClicks + blackClicks + bambooClicksCustom + blackClicksCustom;

      let progressBarLength =
        (parseInt(totalMoney.innerText) / desiredMoneyAmount) * 100;
      progressBar.style.width = `${progressBarLength}%`;
      if (progressBarLength >= 100) {
        progressBarLength = 100;
        progressBar.style.width = `${progressBarLength}%`;
      }

      if (bambooStand.innerText <= 0) {
        bambooStand.innerText = 0;
        e.target.classList.add("out");
        e.target.parentElement.parentElement.classList.add("out-of-stock");
      }
    }
    if (e.target.dataset.name === "black") {
      let add = function (customPledges) {
        return customPledges.reduce((a, b) => a + b, 0);
      };
      sum = add(customPledges);

      modalBlack.innerText--;
      blackStand.innerText--;
      blackClicks++;
      blackMoney = blackClicks * 75;
      totalMoney.innerText = bambooMoney + blackMoney + sum;

      totalBackers.innerText =
        bambooClicks + blackClicks + bambooClicksCustom + blackClicksCustom;

      let progressBarLength =
        (parseInt(totalMoney.innerText) / desiredMoneyAmount) * 100;
      progressBar.style.width = `${progressBarLength}%`;
      if (progressBarLength >= 100) {
        progressBarLength = 100;
        progressBar.style.width = `${progressBarLength}%`;
      }

      if (blackStand.innerText <= 0) {
        blackStand.innerText = 0;
        e.target.classList.add("out");
        e.target.parentElement.parentElement.classList.add("out-of-stock");
      }
    }
  });
});

bookmark.addEventListener("click", function (e) {
  e.target.classList.toggle("booked");
});

closeIcon.addEventListener("click", function (e) {
  modal.classList.toggle("close");
});

backThis.addEventListener("click", function () {
  modal.classList.toggle("close");
});

noRewardBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("clicked no reward");
  modal.classList.toggle("close");
});

bambooBtn.addEventListener("click", function (e) {
  e.preventDefault();

  bambooStand.innerText--;
  modalBamboo.innerText--;
  console.log("clicked bamboo", bambooInput.value);
  if (bambooInput.value === "") {
    let add = function (customPledges) {
      return customPledges.reduce((a, b) => a + b, 0);
    };
    sum = add(customPledges);

    bambooClicks++;
    bambooMoney = bambooClicks * 25;
    totalMoney.innerText = bambooMoney + blackMoney + sum;

    totalBackers.innerText =
      bambooClicks + blackClicks + bambooClicksCustom + blackClicksCustom;
  } else {
    bambooClicksCustom++;

    customPledges.push(parseInt(bambooInput.value));
    let add = function (customPledges) {
      return customPledges.reduce((a, b) => a + b, 0);
    };
    sum = add(customPledges);

    totalMoney.innerText = bambooMoney + blackMoney + sum;
    totalBackers.innerText =
      bambooClicks + blackClicks + bambooClicksCustom + blackClicksCustom;
  }
  modal.classList.toggle("close");
});

blackBtn.addEventListener("click", function (e) {
  e.preventDefault();

  blackStand.innerText--;
  modalBlack.innerText--;
  console.log("clicked black", blackInput.value);
  if (blackInput.value === "") {
    let add = function (customPledges) {
      return customPledges.reduce((a, b) => a + b, 0);
    };
    sum = add(customPledges);

    blackClicks++;
    blackMoney = blackClicks * 75;
    totalMoney.innerText = bambooMoney + blackMoney + sum;
    totalBackers.innerText =
      bambooClicks + blackClicks + bambooClicksCustom + blackClicksCustom;
  } else {
    blackClicksCustom++;

    customPledges.push(parseInt(blackInput.value));
    let add = function (customPledges) {
      return customPledges.reduce((a, b) => a + b, 0);
    };
    sum = add(customPledges);

    totalMoney.innerText = bambooMoney + blackMoney + sum;
    totalBackers.innerText =
      bambooClicks + blackClicks + bambooClicksCustom + blackClicksCustom;
  }
  modal.classList.toggle("close");
});

setInterval(countingDown, 1000);

function countingDown() {
  //   let years = Math.floor(time / 60 / 60 / 24 / 365);
  let days = Math.floor(time / 60 / 60 / 24) % 365;
  let hours = Math.floor(time / 60 / 60) % 24;
  let minutes = Math.floor(time / 60) % 60;
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;
  days = days < 10 ? "0" + days : days;
  hours = hours === 60 ? "00" : hours;

  counter.innerHTML = `<h2><span id="total-days">${days}</span></h2><span class="small">days left</span>`;
  time--;
  time = time < 0 ? 0 : time;
  console.log(`days left => ${days} : ${hours} : ${minutes} : ${seconds}`);
}
