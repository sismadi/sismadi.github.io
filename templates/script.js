window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;

  const parallaxItems = [
    { selector: '.icon-wa', speed: 0.2 },
    { selector: '.icon-fb', speed: 0.5 },
    { selector: '.icon-tw', speed: 0.3 }
  ];

  parallaxItems.forEach(item => {
    const el = document.querySelector(item.selector);
    if (el) {
      el.style.transform = `translateY(${scrolled * item.speed}px)`;
    }
  });
});
