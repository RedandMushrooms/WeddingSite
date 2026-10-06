const galleryImages = document.querySelectorAll('.gallery img');

const fullscreenContainer = document.getElementById('fullscreenContainer');

const fullscreenImage = document.getElementById('fullscreenImage');

let liveImageObserver;

const screenClose = document.getElementById('screenClose');

let currentIndex = 0;

galleryImages.forEach((image, index) => {
  image.addEventListener('click', () => {
    currentIndex = index;

    fullscreenImage.src = image.src;

    fullscreenContainer.classList.add('active');

    liveImageObserver = new MutationObserver(() => {
      fullscreenImage.src = image.src;
    });
    liveImageObserver.observe(image, { attributes: true, attributeFilter: ['src'] });
  });
});

function showFullscreenImage(index) {
  if (index >= galleryImages.length) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = galleryImages.length - 1;
  } else {
    currentIndex = index;
  }
  fullscreenImage.src = galleryImages[currentIndex].src;
}

let startX = 0;

fullscreenContainer.addEventListener('touchstart', (event) => {
  startX = event.touches[0].clientX;
});

fullscreenContainer.addEventListener('touchend', (event) => {
  const endX = event.changedTouches[0].clientX;
  const difference = startX - endX;

  if (Math.abs(difference) > 50) {
    if (difference > 0) {
      showFullscreenImage(currentIndex + 1);
    } else {
      showFullscreenImage(currentIndex - 1);
    }
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    showFullscreenImage(currentIndex + 1);
  }
});

screenClose.addEventListener('click', () => {
  fullscreenContainer.classList.remove('active');
});