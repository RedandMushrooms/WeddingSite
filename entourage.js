const group = document.querySelectorAll(".group img");

let cardIndex = 0;
let intervalId = null;
let isAnimating = false;

function initializeEntourage() {
  if (group.length > 0) {
    group[cardIndex].classList.add("displayCard");
    intervalId = setInterval(nextCard, 10000);
  }
}

function showCard(index, direction) {
  if (isAnimating) return;

  isAnimating = true;

  if (index >= group.length) {
    index = 0;
  } else if (index < 0) {
    index = group.length - 1;
  }

  const oldCard = group[cardIndex];
  const newCard = group[index];

  const isMobile = window.matchMedia(
    "(max-width: 480px) and (orientation: portrait)"
  ).matches;

  if (isMobile) {

    newCard.style.display = "block";
    newCard.style.zIndex = "2";

    oldCard.style.display = "block";
    oldCard.style.zIndex = "1";

    if (direction === "next") {
      newCard.style.clipPath = "inset(0 0 0 100%)";
    } else {
      newCard.style.clipPath = "inset(0 100% 0 0)";
    }

    newCard.offsetWidth;

    newCard.style.clipPath = "inset(0 0 0 0)";

    setTimeout(() => {
      oldCard.style.display = "none";
      oldCard.style.zIndex = "";
      newCard.style.zIndex = "";
      newCard.style.clipPath = "";

      oldCard.classList.remove("displayCard");
      newCard.classList.add("displayCard");

      cardIndex = index;
      isAnimating = false;
    }, 1000);

  } else {

    newCard.style.display = "block";

    if (direction === "next") {
      newCard.style.clipPath = "inset(0 0 0 100%)";
    } else {
      newCard.style.clipPath = "inset(0 100% 0 0)";
    }

    newCard.offsetWidth;

    newCard.style.clipPath = "inset(0 0 0 0)";

    setTimeout(() => {
      oldCard.style.display = "none";
      newCard.style.clipPath = "";
      newCard.classList.add("displayCard");

      cardIndex = index;
      isAnimating = false;
    }, 500);
  }
}

function prevSlide() {
  clearInterval(intervalId);

  showCard(cardIndex - 1, "prev");

  intervalId = setInterval(nextCard, 10000);
}

function nextSlide() {
  clearInterval(intervalId);

  showCard(cardIndex + 1, "next");

  intervalId = setInterval(nextCard, 10000);
}

function nextCard() {
  showCard(cardIndex + 1, "next");
}

initializeEntourage();