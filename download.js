const images = document.querySelectorAll('.download img');
const downloadButton = document.getElementById('buttondownload');

downloadButton.addEventListener('click', () => {

  images.forEach((image, index) => {

    const link = document.createElement('a');

    link.href = image.src;
    link.download = `entourage_image_${index + 1}.jpg`;
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  });

});