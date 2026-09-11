
  const audio = document.getElementById('bg-audio');
  const musicBtn = document.getElementById('musicToggle');
  const musicIcon = document.querySelector('.music-icon');
  const muteIcon = document.querySelector('.mute-icon');


let isPlaying = true;
audio.volume = 1;
musicBtn.classList.add('playing');

musicBtn.addEventListener('click', function(){
  if(isPlaying) {
    audio.pause();
    musicIcon.style.display = 'none';
    muteIcon.style.display = 'block';
    musicBtn.classList.remove('playing');
    musicBtn.setAttribute('aria-label', 'Turn music on');
  } else {
    audio.play();
    musicIcon.style.display = 'block';
    muteIcon.style.display = 'none';
    musicBtn.classList.add('playing');
    musicBtn.setAttribute('aria-label', 'Turn music off');
  }
  isPlaying = !isPlaying;
});

audio.play().then(() => {
  isPlaying = true;
  musicIcon.style.display = 'block';
    muteIcon.style.display = 'none';
    musicBtn.classList.add('playing');
    musicBtn.setAttribute('aria-label', 'Turn music off');
}).catch(() => {
  isPlaying = false;
  musicIcon.style.display = 'none';
 muteIcon.style.display = 'block';
    musicBtn.classList.remove('playing');
    musicBtn.setAttribute('aria-label', 'Turn music on');
});