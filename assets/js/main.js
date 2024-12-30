// const startIntervalBtn = document.querySelector("#start-interval");
// const stopIntervalBtn = document.querySelector("#stop-interval");
// const startTimeoutBtn = document.querySelector("#start-timeout");
// const stopTimeoutBtn = document.querySelector("#stop-timeout");

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
  //   prevSlideBtn.addEventListener("click", goToPrevSlide);
  //   nextSlideBtn.addEventListener("click", goToNextSlide);

  // დავალება 1) - საათი
  //   const realWatch = document.getElementById("watch");
  //   const updateWatch = () => {
  //     const now = new Date();
  //     const hours = now.getHours().toString().padStart(2, "0");
  //     const minutes = now.getMinutes().toString().padStart(2, "0");
  //     const seconds = now.getSeconds().toString().padStart(2, "0");
  //     realWatch.textContent = `${hours}:${minutes}:${seconds}`;
  //   };
  //   setInterval(updateWatch, 1000);

  // დავალება 2.1) სლაიდერის 5წმ-იანი ცვლილება!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  let slideInterval = setInterval(goToNextSlide, 5000);

  // დავალება 2.2) მაუსის მიტანისას სლაიდერის გაჩერება!!!!!!!!!!!!!!!!!!!!!

  const slidesContainer = document.querySelector("#slides-container");
  slidesContainer.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
    console.log("slides paused");
  });

  // დავალება 2.3) მაუსის გამოტანისას სლაიდერის გაგრძელება

  slidesContainer.addEventListener("mouseleave", () => {
    slideInterval = setInterval(goToNextSlide, 5000);
    console.log("Slides resumed");
  });

  showSlides();
};

slideFn();
