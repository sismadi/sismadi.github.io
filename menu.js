const burger = document.getElementById('burgerBtn');
const nav = document.getElementById('navLinks');

// Toggle menu
burger.addEventListener('click', (e) => {
  nav.classList.toggle('active');
  e.stopPropagation(); // prevent event bubbling
});

// Hide menu when clicking outside
document.addEventListener('click', (e) => {
  if (nav.classList.contains('active') && !nav.contains(e.target) && e.target !== burger) {
    nav.classList.remove('active');
  }
});

// Optional: Hide menu after clicking a menu link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});
