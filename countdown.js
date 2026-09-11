const weddingDate = new Date("December 28, 2026 10:00:00").getTime();

function updateCountdown(){
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if(distance <= 0) {
    document.getElementById("months").textContent = "0";
     document.getElementById("weeks").textContent = "0";
      document.getElementById("days").textContent = "0";
      return;
  }

  const totalDays = Math.floor(distance / (1000*60*60*24));

  const months = Math.floor(totalDays/30);
  const remainingDays = totalDays % 30;
  const weeks = Math.floor(remainingDays / 7);
  const days = remainingDays % 7;

  document.getElementById("months").textContent = months;
   document.getElementById("weeks").textContent = weeks;
    document.getElementById("days").textContent = days;
}

updateCountdown();
setInterval(updateCountdown, 1000);