/* =========================================
   ELENA CARY — INTERACTIONS
   ========================================= */


/* -----------------------------------------
   Subtle reveal animation
   ----------------------------------------- */

const revealItems = document.querySelectorAll(
  ".section, .research-item, .experience-card, .life-item"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.08
  }
);

revealItems.forEach((item) => {
  item.classList.add("reveal");
  revealObserver.observe(item);
});


/* -----------------------------------------
   Smooth navigation
   ----------------------------------------- */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {

    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


/* -----------------------------------------
   Small rotating hero detail
   ----------------------------------------- */

const circleLink = document.querySelector(".circle-link");

if (circleLink) {
  circleLink.addEventListener("mouseenter", () => {
    circleLink.textContent = "↓";
  });

  circleLink.addEventListener("mouseleave", () => {
    circleLink.textContent = "↓";
  });
}