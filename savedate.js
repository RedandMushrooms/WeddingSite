const calendarLink = document.getElementById('calendarLink');

const calendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Bryan%20%26%20Jerlyn's%20Wedding&dates=20261228T020000Z/20261228T033000Z&details=Ceremony%20and%20Reception%20at%20Ang%20Hiraya%20ni%20Lina,%20Purok%207,%20Upper%20Sipi,%20Daraga%20Albay&location=Ang%20Hiraya%20ni%20Lina,%20Purok%207,%20Upper%20Sipi,%20Daraga%20Albay";

calendarLink.addEventListener('click', function() {
  window.open(calendarUrl, '_blank');
});