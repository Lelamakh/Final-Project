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

// second section

// recommendations section

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

// latest projects section

function showProjectDetails(selectedCard) {
  // Get all project cards and the navbar links
  const projectCards = document.querySelectorAll(".projectcard");
  const navbarLinks = document.querySelectorAll(".navbar a");

  // Reset all cards to default state (unblurred, visible, and no info shown)
  projectCards.forEach((card) => {
    card.classList.remove("show-info", "blurred", "hidden");
  });

  // Reset all navbar links to default state (remove active class)
  navbarLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Handle 'All' option: show all cards without blurring
  if (selectedCard === "all") {
    projectCards.forEach((card) => {
      card.classList.remove("hidden"); // Make all cards visible
      card.classList.remove("blurred"); // Remove blur from all cards
      card.classList.remove("show-info"); // Hide any info if 'All' is selected
    });
  } else {
    // For other selections, only show the selected card and hide/blurr the others
    projectCards.forEach((card) => {
      if (card.id === selectedCard) {
        card.classList.add("show-info"); // Show info on the selected card
        card.classList.add("blurred"); // Apply blur effect on the card's background image
      } else {
        card.classList.add("hidden"); // Hide non-selected cards
      }
    });
  }

  // Add 'active' class to the clicked navbar link
  navbarLinks.forEach((link) => {
    if (
      link.textContent.toLowerCase() ===
      selectedCard.replace("card-", "").replace("-", " ")
    ) {
      link.classList.add("active");
    }
  });
}

// Event listeners for navbar links
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default link action
    const selectedCard = link.getAttribute("onclick").split("'")[1]; // Extract the card ID
    showProjectDetails(selectedCard);
  });
});

// contactsection

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const form = event.target;
    const formData = new FormData(form);

    // Send the form data using fetch
    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("Response:", response); // Log the response object
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data); // Log the JSON response from the server
        // Check if the response indicates success
        if (data.status === 1) {
          showModal();
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Log the error if there is one
        alert("There was an error submitting the form.");
      });
  });
