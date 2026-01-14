"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText;
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "All") {
      filterItems[i].classList.add("active");
    } else if (filterItems[i].dataset.category.includes(selectedValue)) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText;
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// "Let's connect" button functionality
const connectBtn = document.querySelector("[data-connect-btn]");
if (connectBtn) {
  connectBtn.addEventListener("click", function () {
    // Find the contact navigation link and trigger it
    navigationLinks.forEach((link) => {
      if (link.innerHTML.toLowerCase() === "contact") {
        link.click();
      }
    });
  });
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
    // Re-initialize animations after page change
    setTimeout(() => {
      initAnimations();
    }, 300);
  });
}

//-----------------------------------*\
// INTERACTION FEEDBACK & ANIMATIONS
//-----------------------------------*\

// Scroll-triggered animations using Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
  
  // Observe all elements with animate-stagger class
  document.querySelectorAll('.animate-stagger').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
}

// Add stagger delays to grid items
function addStaggerAnimations() {
  // Service items
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.15}s`;
    item.classList.add('animate-stagger');
  });
  
  // Portfolio items
  const portfolioItems = document.querySelectorAll('.project-item');
  portfolioItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Blog items
  const blogItems = document.querySelectorAll('.blog-post-item');
  blogItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Skills items
  const skillItems = document.querySelectorAll('.skills-item');
  skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Tools items
  const toolItems = document.querySelectorAll('.tools-item');
  toolItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.05}s`;
  });
  
  // Testimonial items
  const testimonialItems = document.querySelectorAll('.testimonials-item');
  testimonialItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
}

// Initialize animations after page load
function initAnimations() {
  // Add animation classes to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('animate-on-scroll');
  });
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Add stagger animations
  setTimeout(() => {
    addStaggerAnimations();
  }, 100);
  
  // Re-initialize on page navigation
  const activePage = document.querySelector('[data-page].active');
  if (activePage) {
    setTimeout(() => {
      initScrollAnimations();
      addStaggerAnimations();
    }, 300);
  }
}

// Enhanced hover effects for cards
function initCardHovers() {
  const cards = document.querySelectorAll('.service-item, .content-card, .blog-post-item, .project-item');
  cards.forEach(card => {
    card.classList.add('card-hover');
  });
}


// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initAnimations();
  initCardHovers();
  
  // Re-initialize animations when page becomes visible
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      setTimeout(() => {
        initScrollAnimations();
      }, 100);
    }
  });
});

// Re-initialize animations after filter changes
const originalFilterFunc = filterFunc;
filterFunc = function(selectedValue) {
  originalFilterFunc(selectedValue);
  setTimeout(() => {
    addStaggerAnimations();
    initScrollAnimations();
  }, 100);
};
