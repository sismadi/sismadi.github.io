window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;

  // Semakin kecil angka pengali (0.1, 0.2), semakin lambat gerakannya (efek jauh)
  const layerWA = document.querySelector('.icon-wa');
  const layerFB = document.querySelector('.icon-fb');
  const layerTW = document.querySelector('.icon-tw');

  layerWA.style.transform = `translateY(${scrolled * 0.2}px)`;
  layerFB.style.transform = `translateY(${scrolled * 0.5}px)`;
  layerTW.style.transform = `translateY(${scrolled * 0.3}px)`;
});
