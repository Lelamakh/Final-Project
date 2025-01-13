const slides = document.querySelectorAll(".slide");
const prevSlideBtn = document.querySelector("#prev-slide");
const nextSlideBtn = document.querySelector("#next-slide");

const syncJsFns = () => {
  const logInfo = () => {
    console.log("logInfo");
  };

  const syncFn = () => {
    console.log("function start");
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }
    console.log("function end");
  };

  const asyncFn = () => {
    console.log("async function start");

    setTimeout(logInfo, 2000);

    console.log("async function after settiimeout");
  };
  syncFn();
  asyncFn();

  // setInterval(logInfo, 2000);

  let intervalId = null;
  timeoutId = null;

  startIntervalBtn.addEventListener("click", () => {
    intervalId = setInterval(logInfo, 2000);
  });

  stopIntervalBtn.addEventListener("click", () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    console.log("clear interval");
  });

  startTimeoutBtn.addEventListener("click", () => {
    timeoutId = setTimeout(logInfo, 2000);
  });
  stopTimeoutBtn.addEventListener("click", () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    console.log("clear timeout");
  });
};
const slideFn = () => {
  let currentSlide = 2;
  //   slides[currentSlide].classList.add("active");

  const showSlides = () => {
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  };
  const goToPrevSlide = () => {
    if (currentSlide <= 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide--;
      console.log(currentSlide);
    }
    showSlides();
  };
  const goToNextSlide = () => {
    if (currentSlide === slides.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
      console.log(currentSlide);
    }
    showSlides();
  };

  let slideInterval = setInterval(goToNextSlide, 5000);

  //  მაუსის მიტანისას სლაიდერის გაჩერება

  const slidesContainer = document.querySelector("#slides-container");
  slidesContainer.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
    console.log("slides paused");
  });

  // მაუსის გამოტანისას სლაიდერის გაგრძელება

  slidesContainer.addEventListener("mouseleave", () => {
    slideInterval = setInterval(goToNextSlide, 5000);
    console.log("Slides resumed");
  });

  showSlides();
};

slideFn();

// second-section

let indicator1 = document.querySelector(".line1");
let indicator2 = document.querySelector(".line2");
let indicator3 = document.querySelector(".line3");
let indicator4 = document.querySelector(".line4");

window.onscroll = function () {
  indicator1.classList.add("line-80");
  indicator2.classList.add("line-70");
  indicator3.classList.add("line-90");
  indicator4.classList.add("line-80");
};

// latest projects - section

function showProjectDetails(selectedCard) {
  const projectCards = document.querySelectorAll(".projectcard");
  const navbarLinks = document.querySelectorAll(".navbar a");

  projectCards.forEach((card) => {
    card.classList.remove("show-info", "blurred", "hidden");
  });
  navbarLinks.forEach((link) => {
    link.classList.remove("active");
  });

  if (selectedCard === "all") {
    projectCards.forEach((card) => {
      card.classList.remove("hidden");
      card.classList.remove("blurred");
      card.classList.remove("show-info");
    });
  } else {
    projectCards.forEach((card) => {
      if (card.id === selectedCard) {
        card.classList.add("show-info");
        card.classList.add("blurred");
      } else {
        card.classList.add("hidden");
      }
    });
  }

  navbarLinks.forEach((link) => {
    if (
      link.textContent.toLowerCase() ===
      selectedCard.replace("card-", "").replace("-", " ")
    ) {
      link.classList.add("active");
    }
  });
}

document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedCard = link.getAttribute("onclick").split("'")[1];
    showProjectDetails(selectedCard);
  });
});

// recommendations-section

const recomSlides = [
  document.getElementById("recomSlide1"),
  document.getElementById("recomSlide2"),
  document.getElementById("recomSlide3"),
];
const cubes = document.querySelectorAll(".cube");
let currentRecomSlide = 0;
function showRecomSlide(index) {
  recomSlides.forEach((recomSlide) => recomSlide.classList.remove("active"));
  cubes.forEach((cube) => cube.classList.remove("active-cube"));
  recomSlides[index].classList.add("active");
  cubes[index].classList.add("active-cube");
}
cubes.forEach((cube, index) => {
  cube.addEventListener("click", () => {
    currentRecomSlide = index;
    showRecomSlide(currentRecomSlide);
  });
});
showRecomSlide(currentRecomSlide);

// contact-section
