const section = document.querySelector("section");
const wrapper = document.querySelector(".content__wrapper");
const slideshow = document.querySelector(".start__slideshow");
const progressBar = document.querySelector(".progress__value");
const left = document.querySelector(".arrow--left");
const right = document.querySelector(".arrow--right");
const body = document.querySelector("body");

let isPlaying = false;
let slides = [];
let index = 0;

const getData = async () => {
  const res = await fetch("data.json");
  slides = await res.json();
  getPaintings(slides);
};

getData();

function getPaintings(slides) {
  for (let i = 0; i < slides.length; i++) {
    displayPaintings(slides, i);
  }
}

function displayPaintings(slides, index) {
  const slide = document.createElement("a");
  const img = document.createElement("img");
  const desc = document.createElement("div");
  const paintingName = document.createElement("h3");
  const paintingAuthor = document.createElement("h5");
  const link = `${
    slides[index].name.toLowerCase().replace(/\s/g, "-").replace("é", "e") +
    ".html"
  }`;

  slide.classList.add("slide__wrapper");
  slide.setAttribute("data-attribute", `${index}`);
  desc.classList.add("slide__desc");

  paintingName.innerText = `${slides[index].name}`;
  paintingAuthor.innerText = `${slides[index].artist.name}`;
  img.src = `${slides[index].images.thumbnail}`;
  slide.href = link;

  desc.appendChild(paintingName);
  desc.appendChild(paintingAuthor);
  slide.appendChild(img);
  slide.appendChild(desc);
  wrapper.appendChild(slide);
  section.appendChild(wrapper);
}

//Opens a specific slide after click event
section.addEventListener("click", (e) => {
  //adding slides class to body, so footer can show on screen
  body.classList.add("slides");
  //getting the slide number
  const targetAttr = e.target.parentElement.getAttribute("data-attribute");
  index = +targetAttr;

  //prevent functionality of other links but let the link to wiki still work
  if (e.target.classList.contains("source__link")) {
    console.log("link to wiki");
  } else {
    e.preventDefault();
  }
  //display the clicked slide and pass the number clicked
  if (targetAttr) {
    displayPainting(slides, targetAttr);
    progressBarAnimation(slides, targetAttr);
  }
});

function displayPainting(slides, index) {
  wrapper.classList.add("slide");
  wrapper.setAttribute("data-slide", `${index}`);
  const smallHero = slides[index].images.hero.small;
  const largeHero = slides[index].images.hero.large;
  const name = slides[index].name;
  const author = slides[index].artist.name;
  const authorImg = slides[index].artist.image;
  const description = slides[index].description;
  const year = slides[index].year;
  const source = slides[index].source;
  const controlPainting = document.querySelector("h6");
  const controlAuthor = document.querySelector(".p__author");
  controlPainting.innerText = name;
  controlAuthor.innerText = author;

  if (window.screen.width < 768) {
    wrapper.innerHTML = `
    
    <div class="img__container">
    <img id="img__small" src="${smallHero}" alt="">
    <div class="img__desc">
        <h3>${name}</h3>
        <h5>${author}</h5>
    </div>
    <div style="background-image: url('${authorImg}');" class="img__author"></div>
    </div>
    <div class="about__container">
    <div class="year--tag">${year}</div>
    <p class="painting__desc">
        ${description}
    </p>
    </div>

    <a href="${source}" class="source__link" target="_blank">Go to source</a>

    </section> <!-- end of section -->
  `;
  }

  if (window.screen.width >= 768) {
    wrapper.innerHTML = `
    
    <div class="img__container">
    <img id="img__small" src="${largeHero}" alt="">
    <div class="img__desc">
        <h3>${name}</h3>
        <h5>${author}</h5>
    </div>
    <div style="background-image: url('${authorImg}');" class="img__author"></div>
    </div>
    <div class="about__container">
    <div class="year--tag">${year}</div>

    <div class="desc__wrapper">
      <p class="painting__desc">
          ${description}
      </p>

      <a href="${source}" class="source__link" target="_blank">Go to source</a>
    </div> <!-- end of desc__wrapper -->
    </div>
    </section> <!-- end of section -->
  `;
  }
}
//when clicking on slideshow button prevent opening the link
slideshow.addEventListener("click", (e) => {
  e.preventDefault();
  //after clicking the btn change the text to STOP SLIDESHOW
  slideshow.innerText = "STOP SLIDESHOW";
  // if you click the link from within the slide go on with the slideshow from there
  if (body.classList.contains("slides")) {
    const targetAttr = wrapper.getAttribute("data-slide");

    if (isPlaying === false) {
      isPlaying = true;
      progressBarAnimation(slides, targetAttr);
      slideShowAnimation(slides, targetAttr, true);
    } else {
      slideshow.innerText = "START SLIDESHOW";
      isPlaying = false;
      slideShowAnimation(slides, targetAttr, false);
    }
    //if you click the link from the initial page start the slideshow from the first slide
  } else {
    const targetAttr = -1;
    body.classList.add("slides");

    if (isPlaying === false) {
      isPlaying = true;
      progressBarAnimation(slides, targetAttr);
      slideShowAnimation(slides, targetAttr, true);
    } else {
      slideshow.innerText = "START SLIDESHOW";
      isPlaying = false;
      slideShowAnimation(slides, targetAttr, false);
    }
  }
});

// Left , Right Arrow functionality
// when clicked on icon

left.addEventListener("click", () => {
  if (slideshow.innerText === "STOP SLIDESHOW") {
    return false;
  } else {
    index--;
    if (index < 0) {
      index = slides.length - 1;
    }
    displayPainting(slides, index);
    progressBarAnimation(slides, index);
  }
});

right.addEventListener("click", () => {
  if (slideshow.innerText === "STOP SLIDESHOW") {
    return false;
  } else {
    index++;
    if (index > slides.length - 1) {
      index = 0;
    }
    displayPainting(slides, index);
    progressBarAnimation(slides, index);
  }
});

//when clicked the keyboard key

window.addEventListener("keydown", (event) => {
  if (slideshow.innerText === "STOP SLIDESHOW") {
    return false;
  } else {
    if (event.keyCode === 37) {
      index--;
      if (index < 0) {
        index = slides.length - 1;
      }
      displayPainting(slides, index);
      progressBarAnimation(slides, index);
    }
  }
  if (slideshow.innerText === "STOP SLIDESHOW") {
    return false;
  } else {
    if (event.keyCode === 39) {
      index++;
      if (index > slides.length - 1) {
        index = 0;
      }
      displayPainting(slides, index);
      progressBarAnimation(slides, index);
    }
  }
});

// recalculating the progress bar width
function progressBarAnimation(slides, index) {
  index = +index + 1;
  const currentWidth = 100 / slides.length;
  progressBar.style.width = currentWidth * index + "%";
}
//Slides show functionality
const slideShowAnimation = (slides, index, boolean) => {
  this.index = index;
  this.state = boolean;
  this.interval;
  this.currentIndex;

  if (this.state === true) {
    this.interval = setInterval(() => {
      this.index++;
      this.currentIndex = this.index;
      if (this.index > slides.length - 1) {
        this.index = 0;
      }
      displayPainting(slides, this.index);
      progressBarAnimation(slides, this.index);
    }, 2000);
  } else {
    clearInterval(this.interval);
    displayPainting(slides, this.currentIndex);
  }
};
