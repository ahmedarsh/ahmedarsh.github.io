document.addEventListener("DOMContentLoaded", function () {
  const clientsSection = document.querySelector(".clients");
  const clientsList = document.querySelector(".clients-list");
  if (!clientsList || !clientsSection) return;

  // Create navigation buttons
  const leftBtn = document.createElement("button");
  leftBtn.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
  leftBtn.className = "clients-nav-btn left";
  leftBtn.setAttribute("aria-label", "Scroll left");

  const rightBtn = document.createElement("button");
  rightBtn.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
  rightBtn.className = "clients-nav-btn right";
  rightBtn.setAttribute("aria-label", "Scroll right");

  // Insert buttons before and after the list
  clientsSection.insertBefore(leftBtn, clientsList);
  clientsSection.insertBefore(rightBtn, clientsList.nextSibling);

  // Scroll amount per click
  const scrollStep = 200;

  leftBtn.addEventListener("click", function () {
    clientsList.scrollBy({ left: -scrollStep, behavior: "smooth" });
  });
  rightBtn.addEventListener("click", function () {
    clientsList.scrollBy({ left: scrollStep, behavior: "smooth" });
  });
});
