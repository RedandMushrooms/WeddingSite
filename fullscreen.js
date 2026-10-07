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

  const newImage = image.cloneNode();

  newImage.src = cards[index].src;

  newImage.style.position = "absolute";
  newImage.style.maxWidth = "70vw";
  newImage.style.maxHeight = "85vh";
  newImage.style.objectFit = "contain";
  newImage.style.borderRadius = "4px";
  newImage.style.boxShadow = "1px 1px 10px -5px black";

  newImage.style.clipPath =
    direction > 0
      ? "inset(0 0 0 100%)"
      : "inset(0 100% 0 0)";

  newImage.style.transition = "clip-path 1s ease";

  image.parentElement.appendChild(newImage);

  newImage.offsetWidth;

  newImage.style.clipPath = "inset(0)";

  setTimeout(() => {
    image.src = newImage.src;
    newImage.remove();
    animating = false;
  }, 1000);
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