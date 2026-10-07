const fullscreen = document.getElementById("fullscreenContainer");
const image = document.getElementById("fullscreenImage");
const closeButton = document.getElementById("screenClose");

const cards = document.querySelectorAll(".group img");

let index = 0;
let animating = false;

cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    index = i;
    image.src = card.src;
    fullscreen.classList.add("active");
  });
});

closeButton.addEventListener("click", () => {
  fullscreen.classList.remove("active");
});

fullscreen.addEventListener("click", (event) => {
  if (event.target === fullscreen) {
    fullscreen.classList.remove("active");
  }
});

function flip(direction) {
  if (animating) return;

  animating = true;

  index += direction;

  if (index >= cards.length) {
    index = 0;
  }

  if (index < 0) {
    index = cards.length - 1;
  }

  const rect = image.getBoundingClientRect();

  const newImage = document.createElement("img");

  newImage.src = cards[index].src;

  newImage.style.position = "fixed";
  newImage.style.left = rect.left + "px";
  newImage.style.top = rect.top + "px";
  newImage.style.width = rect.width + "px";
  newImage.style.height = rect.height + "px";
  newImage.style.maxWidth = "none";
  newImage.style.maxHeight = "none";
  newImage.style.objectFit = "contain";
  newImage.style.display = "block";
  newImage.style.margin = "0";
  newImage.style.transform = "none";
  newImage.style.translate = "none";
  newImage.style.flex = "none";
  newImage.style.borderRadius = "4px";
  newImage.style.boxShadow = "1px 1px 10px -5px black";
  newImage.style.zIndex = "10000";
  newImage.style.pointerEvents = "none";

  if (direction > 0) {
    newImage.style.clipPath = "inset(0 0 0 100%)";
  } else {
    newImage.style.clipPath = "inset(0 100% 0 0)";
  }

  newImage.style.transition = "clip-path 1s ease";

  let started = false;

  function startAnimation() {
    if (started) return;

    started = true;

    fullscreen.appendChild(newImage);

    newImage.offsetWidth;

    newImage.style.clipPath = "inset(0)";

    setTimeout(() => {
      image.src = newImage.src;
      newImage.remove();
      animating = false;
    }, 1000);
  }

  newImage.onload = startAnimation;

  if (newImage.complete) {
    startAnimation();
  }
}

function fullscreenprevSlide() {
  flip(-1);
}

function fullscreennextSlide() {
  flip(1);
}