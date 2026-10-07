const cards = document.querySelectorAll(".group img");

const fullscreen = document.getElementById("fullscreenContainer");

const image = document.getElementById("fullscreenImage");

const close = document.getElementById("screenClose");

let index = 0;

let timer;

let animating = false;

cards.forEach((card, i) => {

  card.onclick = () => {

    index = i;

    image.src = card.src;

    fullscreen.classList.add("active");

    start();

  };

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

  // Get the exact position of the current image on the screen
  const rect = image.getBoundingClientRect();

  const newImage = document.createElement("img");

  newImage.style.position = "fixed";

  newImage.style.left = rect.left + "px";

  newImage.style.top = rect.top + "px";

  newImage.style.width = rect.width + "px";

  newImage.style.height = rect.height + "px";

  newImage.style.maxWidth = "none";

  newImage.style.maxHeight = "none";

  newImage.style.objectFit = "contain";

  newImage.style.borderRadius = "4px";

  newImage.style.boxShadow = "1px 1px 10px -5px black";

  newImage.style.zIndex = "10002";

  newImage.style.clipPath =
    direction > 0
      ? "inset(0 0 0 100%)"
      : "inset(0 100% 0 0)";

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

  // Wait until the new image has loaded
  newImage.onload = startAnimation;

  newImage.src = cards[index].src;

  // Handles already-cached images
  if (newImage.complete) {

    startAnimation();

  }

}

function start() {

  clearInterval(timer);

  timer = setInterval(() => {

    flip(1);

  }, 10000);

}

fullscreen.querySelector(".next").onclick = () => {

  flip(1);

  start();

};

fullscreen.querySelector(".prev").onclick = () => {

  flip(-1);

  start();

};

close.onclick = () => {

  fullscreen.classList.remove("active");

  clearInterval(timer);

};