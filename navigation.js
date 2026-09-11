const hamburger = document.getElementById("hamburger");

const headerContent = document.querySelector(".header-content");

hamburger.addEventListener("click", function () {
  headerContent.classList.toggle("active");
});