const observer = new IntersectionObserver(
  (entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("show");
      obs.unobserve(entry.target);
    }
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(".hidden, .downward, .upward")
  .forEach((el) => observer.observe(el));
