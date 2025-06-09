lucide.createIcons();

const exploreBtn = document.getElementById("exploreBtn");
const hiddenContent = document.getElementById("hiddenContent");

exploreBtn.addEventListener("click", () => {
  hiddenContent.classList.add("active");
  exploreBtn.style.transform = "scale(0.95)";
  setTimeout(() => {
    exploreBtn.style.transform = "scale(1)";
  }, 150);

  setTimeout(() => {
    hiddenContent.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 200);
});

function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.className =
    "fixed w-1 h-1 bg-yellow-400 rounded-full pointer-events-none z-50 sparkle";
  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";

  document.body.appendChild(sparkle);

  setTimeout(() => {
    if (document.body.contains(sparkle)) {
      document.body.removeChild(sparkle);
    }
  }, 1000);
}

document.addEventListener("mouseover", (e) => {
  if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
    const target =
      e.target.tagName === "BUTTON" ? e.target : e.target.closest("button");
    const rect = target.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        createSparkle(
          rect.left + Math.random() * rect.width,
          rect.top + Math.random() * rect.height
        );
      }, i * 150);
    }
  }
});
