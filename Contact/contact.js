const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('showa');
    }
  });
});


const hiddenElements = document.querySelectorAll('.hidden, .downward, .upward');
hiddenElements.forEach((el) => observer.observe(el));

