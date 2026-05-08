const textElement = document.getElementById("text");
const seeMoreLink = document.querySelector(".see-more");

seeMoreLink.addEventListener("click", () => {
  textElement.classList.toggle("expanded-text");
  textElement.classList.toggle("short-text");
  seeMoreLink.textContent = textElement.classList.contains("expanded-text")
    ? "See Less"
    : "See More";
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("showa");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden ,.downward ,.upward");
hiddenElements.forEach((el) => observer.observe(el));

///date setting
const dateSection = document.getElementById("footer-date-section");
const date = new Date();
console.log(date.getFullYear());

dateSection.textContent = `© ${date.getFullYear()} Ophycial Lense Photography. All Right Reserved.`;
