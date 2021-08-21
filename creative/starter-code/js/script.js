//hamburger menu consts
const navigation = document.querySelector(".nav-inner-container");
const hamburger = document.querySelector(".hamburger");
//slider consts
const prev = document.querySelector(".previous");
const next = document.querySelector(".next");
//slider tablet or higher
const projectName = document.querySelector(".preview-name");
const projectDesc = document.querySelector(".preview-desc");
const projectPreview = document.querySelectorAll(".img");
//slider mobile
const projectSmallName = document.querySelector(".preview-small-name");
const projectSmallDesc = document.querySelector(".preview-small-desc");
const projectSmallPreview = document.querySelectorAll(".preview-small-img");

const smallProjects = [
  {
    name: "Lead Product Roadmap",
    year: "2019 Project",
    image: "./assets/mobile/image-slide-1.jpg",
  },
  {
    name: "New Majestic Hotel",
    year: "2018 Project",
    image: "./assets/mobile/image-slide-2.jpg",
  },
  {
    name: "Crypto Dashboard",
    year: "2016 Project",
    image: "./assets/mobile/image-slide-3.jpg",
  },
];

const projects = [
  {
    name: "Lead Product Roadmap",
    year: "2019 Project",
    image: "./assets/tablet/image-slide-1.jpg",
    imageDesktop: "./assets/desktop/image-slide-1.jpg",
  },
  {
    name: "New Majestic Hotel",
    year: "2018 Project",
    image: "./assets/tablet/image-slide-2.jpg",
    imageDesktop: "./assets/desktop/image-slide-2.jpg",
  },
  {
    name: "Crypto Dashboard",
    year: "2016 Project",
    image: "./assets/tablet/image-slide-3.jpg",
    imageDesktop: "./assets/desktop/image-slide-3.jpg",
  },
];

let index = 0;

// HAMBURGER menu, class toggle

hamburger.addEventListener("click", function () {
  navigation.classList.toggle("open");
});

// SLIDER TABLET or HIGHER
prev.addEventListener("click", function () {
  index--;
  if (index < 0) {
    index = 2;
  }
  //mobile
  projectSmallName.innerText = smallProjects[index].name;
  projectSmallDesc.innerText = smallProjects[index].year;
  projectSmallPreview[0].src = smallProjects[index].image;
  //tablet or higher
  projectName.innerText = projects[index].name;
  projectDesc.innerText = projects[index].year;
  if (window.innerWidth < 1280) {
    projectPreview[0].src = projects[index].image;
  } else {
    projectPreview[1].src = projects[index].imageDesktop;
  }
});

next.addEventListener("click", function () {
  index++;
  if (index > 2) {
    index = 0;
  }
  //mobile
  projectSmallName.innerText = smallProjects[index].name;
  projectSmallDesc.innerText = smallProjects[index].year;
  projectSmallPreview[0].src = smallProjects[index].image;
  //tablet or higher
  projectName.innerText = projects[index].name;
  projectDesc.innerText = projects[index].year;
  if (window.innerWidth < 1280) {
    projectPreview[0].src = projects[index].image;
  } else {
    projectPreview[1].src = projects[index].imageDesktop;
  }
});
