const img3 = document.getElementById('img3');
const img52 = document.getElementById('img52');
const img7 = document.getElementById('img7');
const img82 = document.getElementById('img82');

const images3 = ["img3.png", "img3swap.png"];
const images52 = ["img5.2.png", "img5.2swap.png"];
const images7 = ["img7.png", "img7swap.png"];
const images82 = ["img8.2.png", "img8.2swapone.png", "img8.2swaptwo.png"];

let index3 = 0;
let index52 = 0;
let index7 = 0;
let index82 = 0;

function preloadImages(){
  const allImages = [...images3, ...images52, ...images7, ...images82];
  allImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

preloadImages();

async function switchImage(element, nextIndex, imagesArray) {
  if(!element) return;

  const newImg = new Image();
  newImg.src = imagesArray[nextIndex];

  await newImg.decode();

  element.src = imagesArray[nextIndex];
}

async function switch3(){
  if(!img3) return;
  index3 = (index3 + 1) % images3.length;
  await switchImage(img3, index3, images3);
}


async function switch52(){
  index52 = (index52 + 1) % images52.length;
  await switchImage(img52, index52, images52);
}

async function switch7(){
  index7 = (index7 + 1) % images7.length;
  await switchImage(img7, index7, images7);
}

async function switch82(){
  if(!img82) return;
  index82 = (index82 + 1) % images82.length;
  await switchImage(img82, index82, images82);
}


async function switchAll(){
  await Promise.all([
    switch3(),
    switch52(),
    switch7(),
    switch82()
  ]);
}


setInterval(switchAll, 2000);