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

function fullScreenPrevSlide() {
  flip(-1);
}

function fullScreenNextSlide() {
  flip(1);
}

let zoomLevel = 1;
let panX = 0;
let panY = 0;

function updateZoom() {
  image.style.setProperty("--zoom", zoomLevel);
  image.style.setProperty("--pan-x", panX + "px");
  image.style.setProperty("--pan-y", panY + "px");
}

function zoomIn() {
  zoomLevel += 0.25;

  if (zoomLevel > 10) {
    zoomLevel = 10;
  }

  updateZoom();
}

function zoomOut() {
  zoomLevel -= 0.25;

  if (zoomLevel < 1) {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
  }

  updateZoom();
}


let dragging = false;
let startX = 0;
let startY = 0;
let startPanX = 0;
let startPanY = 0;

let pinchStartDistance = 0;
let pinchStartZoom = 1;


function getDistance(touch1, touch2) {
  const x = touch2.clientX - touch1.clientX;
  const y = touch2.clientY - touch1.clientY;

  return Math.sqrt(x * x + y * y);
}


image.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "touch") {
    return;
  }

  if (zoomLevel <= 1) {
    return;
  }

  dragging = true;

  startX = event.clientX;
  startY = event.clientY;

  startPanX = panX;
  startPanY = panY;

  image.setPointerCapture(event.pointerId);
});


image.addEventListener("pointermove", (event) => {
  if (!dragging) {
    return;
  }

  panX = startPanX + (event.clientX - startX);
  panY = startPanY + (event.clientY - startY);

  updateZoom();
});


image.addEventListener("pointerup", (event) => {
  dragging = false;

  if (image.hasPointerCapture(event.pointerId)) {
    image.releasePointerCapture(event.pointerId);
  }
});


image.addEventListener("pointercancel", () => {
  dragging = false;
});


image.addEventListener("touchstart", (event) => {
  event.preventDefault();

  if (event.touches.length === 1) {
    dragging = true;

    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;

    startPanX = panX;
    startPanY = panY;
  }

  if (event.touches.length === 2) {
    dragging = false;

    pinchStartDistance = getDistance(
      event.touches[0],
      event.touches[1]
    );

    pinchStartZoom = zoomLevel;
  }
}, { passive: false });


image.addEventListener("touchmove", (event) => {
  event.preventDefault();

  if (event.touches.length === 1 && dragging) {
    panX = startPanX + (event.touches[0].clientX - startX);
    panY = startPanY + (event.touches[0].clientY - startY);

    updateZoom();
  }

  if (event.touches.length === 2) {
    const currentDistance = getDistance(
      event.touches[0],
      event.touches[1]
    );

    const scale = currentDistance / pinchStartDistance;

    zoomLevel = pinchStartZoom * scale;

    if (zoomLevel > 10) {
      zoomLevel = 10;
    }

    if (zoomLevel < 1) {
      zoomLevel = 1;
      panX = 0;
      panY = 0;
    }

    updateZoom();
  }
}, { passive: false });


image.addEventListener("touchend", (event) => {
  if (event.touches.length === 0) {
    dragging = false;
  }

  if (event.touches.length === 1) {
    dragging = true;

    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;

    startPanX = panX;
    startPanY = panY;
  }

  if (event.touches.length < 2) {
    pinchStartDistance = 0;
  }
});