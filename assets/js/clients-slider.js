"use strict";

// Setup clients slider navigation
document.addEventListener("DOMContentLoaded", function () {
  const clientsSliderContainer = document.querySelector('.clients-slider-container');
  const clientsSliderLeft = document.querySelector('.clients-slider-left');
  const clientsSliderRight = document.querySelector('.clients-slider-right');
  
  if (!clientsSliderContainer || !clientsSliderLeft || !clientsSliderRight) {
    return;
  }
  
  const updateButtons = () => {
    const scrollLeft = clientsSliderContainer.scrollLeft;
    const scrollWidth = clientsSliderContainer.scrollWidth;
    const clientWidth = clientsSliderContainer.clientWidth;
    
    clientsSliderLeft.disabled = scrollLeft <= 0;
    clientsSliderRight.disabled = scrollLeft >= scrollWidth - clientWidth - 10;
  };
  
  updateButtons();
  clientsSliderContainer.addEventListener('scroll', updateButtons);
  
  clientsSliderLeft.addEventListener('click', () => {
    clientsSliderContainer.scrollBy({ left: -344, behavior: 'smooth' });
  });
  
  clientsSliderRight.addEventListener('click', () => {
    clientsSliderContainer.scrollBy({ left: 344, behavior: 'smooth' });
  });
  
  // Show arrows on mobile
  if (window.innerWidth <= 768) {
    clientsSliderLeft.style.opacity = '1';
    clientsSliderRight.style.opacity = '1';
  }
});
