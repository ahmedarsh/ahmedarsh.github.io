"use strict";

// Pagination variables
const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let filteredProjects = [];

// Portfolio data (embedded directly to avoid fetch issues)
const portfolioData = [
  {
    "id": 1,
    "title": "Bus Mania - Car Parking Jam",
    "category": "Mobile",
    "image": "./assets/images/busMania.png",
    "alt": "Bus Mania - Car Parking Jam",
    "link": "https://play.google.com/store/apps/details?id=com.together.CrazyBus&hl=en_AU",
    "description": "A challenging parking puzzle game where players navigate through colorful parking lots, solve puzzles, and ensure every passenger gets to their matching ride. Features unique gameplay mechanics and brain-teasing challenges."
  },
  {
    "id": 2,
    "title": "Idle Construction 3D",
    "category": "Mobile",
    "image": "./assets/images/construction.png",
    "alt": "Idle Construction 3D",
    "link": "https://apps.apple.com/us/app/idle-construction-3d/id1473951944",
    "description": "3D construction simulation game with idle mechanics and progression systems. Players build and manage construction projects with realistic 3D graphics and engaging gameplay."
  },
  {
    "id": 3,
    "title": "Dive Fever",
    "category": "Mobile",
    "image": "./assets/images/dive.png",
    "alt": "Dive Fever",
    "link": "https://play.google.com/store/apps/details?id=com.together.DiveFever",
    "description": "Fish & Sushi Time! Explore the sea, catch clown fishes, sharks, and even narwhals! Make them into sushi and sell to hungry customers. Earn lots of money and become the most successful billionaire!"
  },
  {
    "id": 4,
    "title": "Mini Chef",
    "category": "Mobile",
    "image": "./assets/images/sushi.png",
    "alt": "Mini Chef",
    "link": "https://play.google.com/store/apps/details?id=com.together.MiniChef&hl=en_AU",
    "description": "Have the most satisfying cooking animation. Manage the pocket kitchen, and earn lots of money with your mini chefs! Features smooth animations and engaging cooking mechanics."
  },
  {
    "id": 5,
    "title": "Screw Mania - Tool Box Jam",
    "category": "Mobile",
    "image": "./assets/images/screw.png",
    "alt": "Screw Mania - Tool Box Jam",
    "link": "http://play.google.com/store/apps/details?id=com.together.ScrewManiaGP&hl=en",
    "description": "A puzzle game where players solve tool box jams by strategically moving screws and tools. Features challenging puzzles and satisfying mechanics."
  },
  {
    "id": 6,
    "title": "Wood Carve",
    "category": "Mobile",
    "image": "./assets/images/wood.png",
    "alt": "Wood Carve",
    "link": "https://apps.apple.com/us/app/wood-carve/id1493179554",
    "description": "Wood Carving Creative Artwork - An ornamental objects carving concept where you can craft beautiful wooden artwork. Features realistic physics for woodcarving and thousands of levels from simple designs to complex timber artifacts."
  },
  {
    "id": 7,
    "title": "Incognito Popstar",
    "category": "Mobile",
    "image": "./assets/images/popstar.png",
    "alt": "Incognito Popstar",
    "link": "https://apps.apple.com/us/app/incognito-popstar/id1607998853",
    "description": "Will they recognize you? Get to your car without getting caught by your fans! Change your clothes and try not to be recognized while fulfilling Popstar's wishes."
  },
  {
    "id": 8,
    "title": "Blobby Rush",
    "category": "Mobile",
    "image": "./assets/images/blobly.png",
    "alt": "Blobby Rush",
    "link": "https://apps.apple.com/us/app/blobby-rush/id1592305740",
    "description": "Created realistic Jelly simulation for the Blobby Rush game with advanced physics and fluid dynamics. Features unique blob mechanics and smooth animations."
  },
  {
    "id": 9,
    "title": "Pearl Rush",
    "category": "Mobile",
    "image": "./assets/images/pearl.png",
    "alt": "Pearl Rush",
    "link": "https://apps.apple.com/us/app/pearl-rush/id1579854104",
    "description": "Exciting pearl collection game with beautiful underwater graphics and engaging gameplay mechanics. Features smooth controls and challenging levels."
  },
  {
    "id": 10,
    "title": "Stuffed Toy 3D",
    "category": "Mobile",
    "image": "./assets/images/stuffed.png",
    "alt": "Stuffed Toy 3D",
    "link": "https://apps.apple.com/us/app/stuffed-toy-3d/id1509452305",
    "description": "3D stuffed toy simulation game with realistic physics and engaging gameplay. Features beautiful graphics and satisfying toy interactions."
  },
  {
    "id": 11,
    "title": "Idle Home Makeover",
    "category": "Mobile",
    "image": "./assets/images/home.png",
    "alt": "Idle Home Makeover",
    "link": "https://apps.apple.com/us/app/idle-home-makeover/id1510732870",
    "description": "Idle home renovation game where players transform houses with beautiful makeovers. Features progression systems and satisfying renovation mechanics."
  },
  {
    "id": 12,
    "title": "Dragon Match 3D",
    "category": "Mobile",
    "image": "./assets/images/dragon.png",
    "alt": "Dragon Match 3D",
    "link": "https://apps.apple.com/au/app/dragon-match-3d/id6502593603",
    "description": "3D matching puzzle game with dragon-themed graphics and engaging gameplay mechanics. Features stunning visuals and challenging levels."
  },
  {
    "id": 13,
    "title": "Town Demolish",
    "category": "Mobile",
    "image": "./assets/images/town.png",
    "alt": "Town Demolish",
    "link": "https://play.google.com/store/apps/details?id=com.zplayhc.monstertown&hl=en_AU",
    "description": "The most enjoyable destruction experience! Smash all the buildings, destroy the whole world! Features casual gameplay with satisfying destruction mechanics."
  },
  {
    "id": 14,
    "title": "Sentiment-Driven NPC Interaction System",
    "category": "AI/ML",
    "image": "./assets/images/npc.png",
    "alt": "Sentiment-Driven NPC Interaction System",
    "description": `<b>Developed a dynamic NPC interaction system for a Unity-based game, enhancing immersion through voice-driven, emotionally intelligent NPCs.</b><br><ul><li><b>Emotionally Responsive NPCs:</b> NPCs analyze player dialogue sentiment and adapt their behavior (friendly, angry, neutral), triggering quests, clues, or challenges.</li><li><b>Voice Integration:</b> NPCs speak directly to the player using speech synthesis, making interactions more natural and immersive.</li><li><b>Dynamic Quest System:</b> NPCs offer quests based on the emotional tone of conversations, such as guiding players to treasures or solving puzzles.</li><li><b>Replayability:</b> Player reputation affects future NPC responses, enabling multiple outcomes based on prior choices.</li><li><b>Technologies:</b> Unity3D, Python (NLP & RL), Text-to-Speech (Speech Synthesis), Unity NavMesh.</li></ul>`
  },
  {
    "id": 15,
    "title": "AI Agent for University Application Assessment",
    "category": "AI/ML",
    "image": "./assets/images/grade.png",
    "alt": "AI Agent for University Application Assessment",
    "description": `<b>Build an AI agent for automating the initial assessment of university applications.</b><br><ul><li>Developed a rule-based and ML-powered agent to classify applications as Unqualified, Conditional, or Unconditional based on historical data and admission criteria.</li><li>Integrated evaluation of personal statements using lightweight NLP models to assess "genuine student" intent.</li><li>Implemented and tested the solution in Databricks; built a dashboard for admissions teams to review and interpret decisions.</li><li>Delivered a scalable, fair, and energy-efficient system that significantly reduced manual workload and processing time.</li></ul>`
  },
  {
    "id": 16,
    "title": "Interactive Crime Data Visualization (Python)",
    "category": "AI/ML",
    "image": "./assets/images/visualisation.png",
    "alt": "Interactive Crime Data Visualization (Python)",
    "description": `<b>Developed an interactive dashboard to analyze Los Angeles crime data (2020–2024) using Python.</b><br><ul><li>Used Pandas, Plotly, and Dash to explore trends by time, location, and demographics.</li><li>Identified high-risk regions, highlighting the impact of HIV co-infection on TB spread.</li><li>Focused on data storytelling to support public safety insights for policymakers, journalists, and law enforcement.</li></ul>`
  },
  {
    "id": 17,
    "title": "Global Tuberculosis (TB) Burden Analysis (Tableau)",
    "category": "AI/ML",
    "image": "./assets/images/tb.png",
    "alt": "Global Tuberculosis (TB) Burden Analysis (Tableau)",
    "description": `<b>Designed an interactive Tableau dashboard to analyze global TB trends, regional disparities, and healthcare gaps.</b><br><ul><li>Visualized TB incidence, mortality rates, and case detection variations across countries.</li><li>Built geospatial heatmaps and time-series charts for identifying crime hotspots and victim patterns.</li><li>Provided data-driven recommendations to support public health interventions and policy decisions.</li></ul>`
  },
  {
    "id": 18,
    "title": "Data Mining for Phishing Detection & Student Dropout Prediction",
    "category": "AI/ML",
    "image": "./assets/images/mining.png",
    "alt": "Data Mining for Phishing Detection & Student Dropout Prediction",
    "description": `<b>Explored real-world applications of data mining using two datasets: phishing website detection and student dropout prediction.</b><br><ul><li>Applied algorithms like Random Forest, Decision Trees, and SVM to classify phishing websites and predict academic outcomes.</li><li>Analyzed key features influencing student success, identifying academic performance as the strongest predictor of retention.</li><li>Demonstrated how machine learning can support cybersecurity and educational interventions through data-driven insights.</li></ul>`
  },
  {
    "id": 19,
    "title": "Scary Teacher 3D",
    "category": "AAA Titles",
    "image": "./assets/images/teacher.png",
    "alt": "Scary Teacher 3D",
    "link": "https://store.steampowered.com/app/971470/Scary_Teacher_3D/",
    "description": "Steam-based 3D adventure game featuring interactive gameplay with a unique teacher character and immersive environments."
  },
  {
    "id": 20,
    "title": "Amelie And The Lost Spirit",
    "category": "AAA Titles",
    "image": "./assets/images/amilia.jpg",
    "alt": "Amelie And The Lost Spirit",
    "link": "https://store.steampowered.com/app/2848950/Amelie_And_The_Lost_Spirit/",
    "description": "Steam adventure game with captivating storytelling and exploration mechanics in a mystical world."
  },
  {
    "id": 21,
    "title": "Mini Car Racing Game",
    "category": "AAA Titles",
    "image": "./assets/images/minicar.png",
    "alt": "Mini Car Racing Game",
    "link": "https://play.google.com/store/apps/details?id=com.ht.mini.car.raceway.endless.drive",
    "description": "Endless driving mobile racing game with mini cars and challenging raceway environments."
  },
  {
    "id": 22,
    "title": "FPS Shooting Games - Gun Game",
    "category": "AAA Titles",
    "image": "./assets/images/fpsShooter.png",
    "alt": "FPS Shooting Games - Gun Game",
    "link": "https://play.google.com/store/apps/details?id=com.fun.games.commando.black.shadow",
    "description": "First-person shooter mobile game featuring gun combat mechanics and tactical gameplay."
  },
  {
    "id": 23,
    "title": "Real Highway Car Racing Game",
    "category": "AAA Titles",
    "image": "./assets/images/car.png",
    "alt": "Real Highway Car Racing Game",
    "link": "https://play.google.com/store/apps/details?id=com.gamexis.racing.ferocity.apps&hl=en_US",
    "description": "High-speed car racing game with luxury cars, multiple game modes, and stunning 3D environments. Features traffic rush, challenges, time trials, and police chase modes."
  },
  {
    "id": 24,
    "title": "Bike Stunt Game: Tricks Master",
    "category": "AAA Titles",
    "image": "./assets/images/bike.png",
    "alt": "Bike Stunt Game: Tricks Master",
    "link": "https://play.google.com/store/apps/details?id=com.knights.bikesstunt.motomaster",
    "description": "Award-winning bike stunt game with 250+ million downloads. Features freeride quests, light trigger modes, party fun, and multiplayer challenges with stunning visuals."
  },
  {
    "id": 25,
    "title": "Sniper Shooter Mission Games",
    "category": "AAA Titles",
    "image": "./assets/images/sniper.png",
    "alt": "Sniper Shooter Mission Games",
    "link": "https://play.google.com/store/apps/details?id=com.lf.sniper.gun.shooter.free.apps",
    "description": "Sniper shooting mission game with precision targeting mechanics and challenging mission-based gameplay."
  },
  {
    "id": 26,
    "title": "Kung Fu Karate Boxing Games 3D",
    "category": "AAA Titles",
    "image": "./assets/images/krate.png",
    "alt": "Kung Fu Karate Boxing Games 3D",
    "link": "https://play.google.com/store/apps/details?id=com.gxs.karatefighting.superhero.king.fighting.games&hl=en_US",
    "description": "Epic kung fu fighting game with 17 skilled fighters, 12 diverse zones, and PVP battles. Features unique abilities, dynamic weather conditions, and intense martial arts combat mechanics."
  },
  {
    "id": 27,
    "title": "Scary Teacher",
    "category": "Videos",
    "type": "video",
    "video": "./assets/videos/video1.mp4",
    "alt": "Scary Teacher",
    "description": "Gameplay showcase of the Scary Teacher 3D adventure game with interactive mechanics and immersive environments."
  },
  {
    "id": 28,
    "title": "Amelie & The Lost Spirit",
    "category": "Videos",
    "type": "video",
    "video": "./assets/videos/video2.mp4",
    "alt": "Amelie & The Lost Spirit",
    "description": "Mystical adventure gameplay featuring Amelie's journey through captivating storytelling and exploration mechanics."
  },
  {
    "id": 29,
    "title": "Phantom Ascension",
    "category": "Videos",
    "type": "video",
    "video": "./assets/videos/video3.mp4",
    "alt": "Phantom Ascension",
    "description": "Thrilling gameplay demonstration of Phantom Ascension with stunning visuals and engaging mechanics."
  },
  {
    "id": 30,
    "title": "Racing Ferocity",
    "category": "Videos",
    "type": "video",
    "video": "./assets/videos/video4.mp4",
    "alt": "Racing Ferocity",
    "description": "High-speed racing action showcasing the Real Highway Car Racing Game with luxury cars and multiple game modes."
  },
  {
    "id": 31,
    "title": "Street's Rebel",
    "category": "Videos",
    "type": "video",
    "video": "./assets/videos/video5.mp4",
    "alt": "Street's Rebel",
    "description": "Urban street racing and stunt gameplay featuring dynamic environments and challenging missions."
  },
  {
    "id": 32,
    "title": "Karate Legends",
    "category": "Videos",
    "type": "video",
    "video": "./assets/videos/video6.mp4",
    "alt": "Karate Legends",
    "description": "Martial arts fighting game showcase featuring intense combat mechanics and legendary karate masters."
  }
];

// Function to load and display portfolio projects
const loadPortfolioProjects = function () {
  try {
    console.log("Loading portfolio projects...");
    console.log("Projects available:", portfolioData.length);

    const projectList = document.querySelector(".project-list");
    console.log("Project list element:", projectList);
    console.log("Project list element found:", !!projectList);

    if (!projectList) {
      console.error("Project list element not found");
      console.log("Available elements with 'project' in class:", document.querySelectorAll('[class*="project"]'));
      return;
    }

    // Store all projects and sort by priority (AAA Titles first)
    const categoryOrder = ['AAA Titles', 'Mobile', 'AI/ML', 'Videos'];
    filteredProjects = portfolioData.slice().sort((a, b) => {
      const aIdx = categoryOrder.indexOf(a.category);
      const bIdx = categoryOrder.indexOf(b.category);
      return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
    });

    // Display first page
    displayProjects();

    // Add pagination controls
    addPaginationControls();

    // Initialize filters after loading projects
    initializeFilters(portfolioData);
    
    console.log("Portfolio loaded successfully!");
  } catch (error) {
    console.error("Error loading portfolio projects:", error);
  }
};

// Function to display projects for current page
const displayProjects = function () {
  const projectList = document.querySelector(".project-list");
  if (!projectList) {
    console.error("Project list element not found");
    return;
  }
  
  projectList.innerHTML = "";
  console.log("Displaying projects for page", currentPage);
  console.log("Total filtered projects:", filteredProjects.length);

  // Calculate start and end indices for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const projectsToShow = filteredProjects.slice(startIndex, endIndex);
  console.log("Projects to show on this page:", projectsToShow.length);

  // Create and append project items (projects are already sorted in filteredProjects)
  let projectsToShowOrdered = projectsToShow;
  projectsToShowOrdered.forEach((project) => {
    const projectItem = document.createElement("li");
    projectItem.className = "project-item active";
    projectItem.setAttribute("data-filter-item", "");
    projectItem.setAttribute("data-category", project.category);

    if (project.type === "video") {
      // Create video project item
      projectItem.innerHTML = `
        <div class="project-content-box">
          <div class="project-img">
            <video
              width="100%"
              height="200"
              controls
              preload="metadata"
              playsinline
              controlsList="nodownload"
            >
              <source src="${project.video}" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="project-title">${project.title}</div>
          <div class="project-category">Game Videos</div>
        </div>
      `;
    } else if (project.category === "AI/ML") {
      // AI/ML projects: show as post, open portfolio modal on click
      projectItem.innerHTML = `
        <div class="project-content-box ai-ml-post" style="cursor:pointer;">
          <figure class="project-img">
            <div class="project-item-icon-box">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img
              src="${project.image}"
              alt="${project.alt}"
              loading="lazy"
            />
          </figure>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-category">${project.category.split(" ").join(" ")}</p>
        </div>
      `;
      setTimeout(() => {
        projectItem.addEventListener("click", function (e) {
          e.preventDefault();
          // Use the dedicated portfolio modal
          const modalContainer = document.getElementById("portfolio-modal-container");
          const modalImg = document.getElementById("portfolio-modal-img");
          const modalTitle = document.getElementById("portfolio-modal-title");
          const modalDescription = document.getElementById("portfolio-modal-description");
          const modalClose = document.getElementById("portfolio-modal-close");
          const modalOverlay = document.getElementById("portfolio-modal-overlay");

          modalImg.src = project.image;
          modalImg.alt = project.alt;
          modalTitle.textContent = project.title;
          modalDescription.innerHTML = project.description;

          modalContainer.classList.add("active");
          document.body.style.overflow = "hidden";

          // Close modal on close button or overlay click
          function closeModal() {
            modalContainer.classList.remove("active");
            document.body.style.overflow = "";
          }
          modalClose.onclick = closeModal;
          modalOverlay.onclick = closeModal;
        });
      }, 0);
    } else {
      // Create image project item
      projectItem.innerHTML = `
        <a href="${project.link}" target="_blank">
          <figure class="project-img">
            <div class="project-item-icon-box">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img
              src="${project.image}"
              alt="${project.alt}"
              loading="lazy"
            />
          </figure>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-category">${project.category
            .split(" ")
            .join(" ")}</p>
        </a>
      `;
    }

    projectList.appendChild(projectItem);
  });
};

// Function to add pagination controls
const addPaginationControls = function () {
  const projectsSection = document.querySelector(".projects");

  // Create pagination container
  const paginationContainer = document.createElement("div");
  paginationContainer.className = "pagination-container";

  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  // Create pagination HTML
  let paginationHTML = `
    <div class="pagination">
      <button class="pagination-btn" data-page="prev" ${
        currentPage === 1 ? "disabled" : ""
      }>
        <ion-icon name="chevron-back-outline"></ion-icon>
      </button>
      <div class="page-numbers">
        ${generatePageNumbers(currentPage, totalPages)}
      </div>
      <button class="pagination-btn" data-page="next" ${
        currentPage === totalPages ? "disabled" : ""
      }>
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </button>
    </div>
  `;

  paginationContainer.innerHTML = paginationHTML;
  projectsSection.appendChild(paginationContainer);

  // Add event listeners to pagination buttons
  const paginationBtns =
    paginationContainer.querySelectorAll(".pagination-btn");
  paginationBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.page === "prev" && currentPage > 1) {
        currentPage--;
      } else if (btn.dataset.page === "next" && currentPage < totalPages) {
        currentPage++;
      }
      displayProjects();
      updatePaginationControls();
    });
  });

  // Add event listeners to page numbers
  const pageNumbers = paginationContainer.querySelectorAll(".page-number");
  pageNumbers.forEach((page) => {
    page.addEventListener("click", () => {
      currentPage = parseInt(page.dataset.page);
      displayProjects();
      updatePaginationControls();
    });
  });
};

// Function to generate page numbers
const generatePageNumbers = function (currentPage, totalPages) {
  let html = "";
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    html += `<button class="page-number" data-page="1">1</button>`;
    if (startPage > 2) {
      html += `<span class="page-dots">...</span>`;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="page-number ${
      i === currentPage ? "active" : ""
    }" data-page="${i}">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      html += `<span class="page-dots">...</span>`;
    }
    html += `<button class="page-number" data-page="${totalPages}">${totalPages}</button>`;
  }

  return html;
};

// Function to update pagination controls
const updatePaginationControls = function () {
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginationContainer = document.querySelector(".pagination-container");

  if (paginationContainer) {
    paginationContainer.innerHTML = `
      <div class="pagination">
        <button class="pagination-btn" data-page="prev" ${
          currentPage === 1 ? "disabled" : ""
        }>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <div class="page-numbers">
          ${generatePageNumbers(currentPage, totalPages)}
        </div>
        <button class="pagination-btn" data-page="next" ${
          currentPage === totalPages ? "disabled" : ""
        }>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </div>
    `;

    // Reattach event listeners
    const paginationBtns =
      paginationContainer.querySelectorAll(".pagination-btn");
    paginationBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.page === "prev" && currentPage > 1) {
          currentPage--;
        } else if (btn.dataset.page === "next" && currentPage < totalPages) {
          currentPage++;
        }
        displayProjects();
        updatePaginationControls();
      });
    });

    const pageNumbers = paginationContainer.querySelectorAll(".page-number");
    pageNumbers.forEach((page) => {
      page.addEventListener("click", () => {
        currentPage = parseInt(page.dataset.page);
        displayProjects();
        updatePaginationControls();
      });
    });
  }
};

// Function to initialize filter functionality
const initializeFilters = function (projects) {
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const select = document.querySelector("[data-select]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  // Filter function
  const filterFunc = function (selectedValue) {
    // Reset to first page when filtering
    currentPage = 1;

    // Filter projects based on selected category
    let filtered;
    if (selectedValue === "All") {
      filtered = projects;
    } else {
      filtered = projects.filter((project) =>
        project.category.includes(selectedValue)
      );
    }

    // Sort filtered projects by priority (AAA Titles first)
    const categoryOrder = ['AAA Titles', 'Mobile', 'AI/ML', 'Videos'];
    filteredProjects = filtered.slice().sort((a, b) => {
      const aIdx = categoryOrder.indexOf(a.category);
      const bIdx = categoryOrder.indexOf(b.category);
      return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
    });

    // Update display and pagination
    displayProjects();
    updatePaginationControls();
  };

  // Add event to all select items
  selectItems.forEach((item) => {
    item.addEventListener("click", function () {
      let selectedValue = this.innerText;
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });

  // Add event to all filter button items for large screen
  let lastClickedBtn = filterBtn[0];

  filterBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      let selectedValue = this.innerText;
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });
};

// Initialize portfolio functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing portfolio...");
  // Don't load immediately, wait for portfolio tab to be active
});

// Function to check if portfolio tab is active and load projects
const checkAndLoadPortfolio = function() {
  const portfolioTab = document.querySelector('[data-page="portfolio"]');
  if (portfolioTab && portfolioTab.classList.contains('active')) {
    console.log("Portfolio tab is active, loading projects...");
    loadPortfolioProjects();
  }
};

// Listen for navigation changes
document.addEventListener('click', function(e) {
  if (e.target.matches('[data-nav-link]')) {
    // Wait a bit for the tab to become active, then check
    setTimeout(checkAndLoadPortfolio, 100);
  }
});

// Also check on initial load
setTimeout(checkAndLoadPortfolio, 500);
