"use strict";

// Pagination variables
const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let filteredProjects = [];

// Video mapping: Map existing videos to projects
const videoMapping = {
  "Scary Teacher 3D": "./assets/videos/video1.mp4",
  "Amelie And The Lost Spirit": "./assets/videos/video2.mp4",
  "FPS Shooting Games - Gun Game": "./assets/videos/video3.mp4",
  "Real Highway Car Racing Game": "./assets/videos/video4.mp4",
  "Sniper Shooter Mission Games": "./assets/videos/video5.mp4",
  "Kung Fu Karate Boxing Games 3D": "./assets/videos/video6.mp4",
  "Bus Mania - Car Parking Jam": "./assets/videos/BusMania.mp4",
  "Fit Sort": "./assets/videos/FitSort.mp4"
};

// Helper: Extract platforms from link(s) - supports multiple platforms
function extractPlatforms(link, additionalLinks) {
  const platforms = { ios: null, android: null, playstore: null, steam: null };
  
  // Handle single link (backward compatibility)
  if (link) {
    if (link.includes('apps.apple.com')) {
      platforms.ios = link;
    } else if (link.includes('play.google.com')) {
      platforms.android = link;
      platforms.playstore = link; // Also set playstore for consistency
    } else if (link.includes('store.steampowered.com')) {
      platforms.steam = link;
    }
  }
  
  // Handle additional links object
  if (additionalLinks) {
    if (additionalLinks.playstore) platforms.playstore = additionalLinks.playstore;
    if (additionalLinks.steam) platforms.steam = additionalLinks.steam;
    if (additionalLinks.ios) platforms.ios = additionalLinks.ios;
    if (additionalLinks.android) {
      platforms.android = additionalLinks.android;
      if (!platforms.playstore) platforms.playstore = additionalLinks.android; // PlayStore = Android
    }
  }
  
  return platforms;
}

// Portfolio data (embedded directly to avoid fetch issues)
const portfolioData = [
  {
    "id": 1,
    "title": "Bus Mania - Car Parking Jam",
    "category": "Mobile",
    "image": "./assets/images/busMania.png",
    "alt": "Bus Mania - Car Parking Jam",
    "link": "https://play.google.com/store/apps/details?id=com.together.CrazyBus&hl=en_AU",
    "links": {
      "playstore": "https://play.google.com/store/apps/details?id=com.together.CrazyBus&hl=en_AU",
      "ios": "https://apps.apple.com/us/app/bus-mania-car-parking-jam/id6587552527"
    },
    "description": "A challenging parking puzzle game where players navigate through colorful parking lots, solve puzzles, and ensure every passenger gets to their matching ride. Features unique gameplay mechanics and brain-teasing challenges."
  },
  {
    "id": 33,
    "title": "Fit Sort",
    "category": "Mobile",
    "image": "./assets/images/FitsortIcon.png",
    "alt": "Fit Sort",
    "link": "https://play.google.com/store/apps/details?id=com.hcgames.fitsortgp",
    "description": "Can you perfectly mix, match, and blend your way to victory?"
  },
  {
    "id": 2,
    "title": "Idle Construction 3D",
    "category": "Mobile",
    "image": "./assets/images/construction.png",
    "alt": "Idle Construction 3D",
    "link": "https://apps.apple.com/us/app/idle-construction-3d/id1473951944",
    "links": {
      "ios": "https://apps.apple.com/us/app/idle-construction-3d/id1473951944",
      "playstore": "https://play.google.com/store/apps/details?id=com.gpp.idleconstruction&hl=en_AU"
    },
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
    "id": 0,
    "title": "Custom LLM",
    "category": "AI/ML",
    "order": 0,
    "image": "./assets/images/llm.png",
    "alt": "Custom LLM",
    "description": "Built a custom LLM pipeline from scratch, covering data preparation, training workflow, evaluation, and integration into real-world tooling—focused on controllability, latency, and product-ready deployment."
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
    "links": {
      "playstore": "https://play.google.com/store/apps/details?id=com.zakg.scaryteacher.hellgame&hl=en",
      "steam": "https://store.steampowered.com/app/971470/Scary_Teacher_3D/",
      "ios": "https://apps.apple.com/us/app/scary-teacher-3d/id1250783151"
    },
    "description": "Steam-based 3D adventure game featuring interactive gameplay with a unique teacher character and immersive environments."
  },
  {
    "id": 20,
    "title": "Amelie And The Lost Spirit",
    "category": "AAA Titles",
    "image": "./assets/images/amilia.jpg",
    "alt": "Amelie And The Lost Spirit",
    "link": "https://store.steampowered.com/app/2848950/Amelie_And_The_Lost_Spirit/",
    "links": {
      "playstore": "https://play.google.com/store/apps/details?id=com.zakg.scaryteacher.escape.games&hl=en_AU",
      "steam": "https://store.steampowered.com/app/2848950/Amelie_And_The_Lost_Spirit/"
    },
    "description": "Steam adventure game with captivating storytelling and exploration mechanics in a mystical world."
  },
  {
    "id": 21,
    "title": "Real Highway Car Racing Game",
    "category": "AAA Titles",
    "image": "./assets/images/car.png",
    "alt": "Real Highway Car Racing Game",
    "link": "https://play.google.com/store/apps/details?id=com.gamexis.racing.ferocity.apps&hl=en_US",
    "description": "High-speed car racing game with luxury cars, multiple game modes, and stunning 3D environments. Features traffic rush, challenges, time trials, and police chase modes."
  },
  {
    "id": 22,
    "title": "Sniper Shooter Mission Games",
    "category": "AAA Titles",
    "image": "./assets/images/sniper.png",
    "alt": "Sniper Shooter Mission Games",
    "link": "https://play.google.com/store/apps/details?id=com.lf.sniper.gun.shooter.free.apps",
    "description": "Sniper shooting mission game with precision targeting mechanics and challenging mission-based gameplay."
  },
  {
    "id": 23,
    "title": "Kung Fu Karate Boxing Games 3D",
    "category": "AAA Titles",
    "image": "./assets/images/krate.png",
    "alt": "Kung Fu Karate Boxing Games 3D",
    "link": "https://play.google.com/store/apps/details?id=com.gxs.karatefighting.superhero.king.fighting.games&hl=en_US",
    "description": "Epic kung fu fighting game with 17 skilled fighters, 12 diverse zones, and PVP battles. Features unique abilities, dynamic weather conditions, and intense martial arts combat mechanics."
  },
  {
    "id": 24,
    "title": "FPS Shooting Games - Gun Game",
    "category": "AAA Titles",
    "image": "./assets/images/fpsShooter.png",
    "alt": "FPS Shooting Games - Gun Game",
    "link": "https://play.google.com/store/apps/details?id=com.fun.games.commando.black.shadow",
    "description": "First-person shooter mobile game featuring gun combat mechanics and tactical gameplay."
  },
  
  {
    "id": 25,
    "title": "Bike Stunt Game: Tricks Master",
    "category": "AAA Titles",
    "image": "./assets/images/bike.png",
    "alt": "Bike Stunt Game: Tricks Master",
    "link": "https://play.google.com/store/apps/details?id=com.knights.bikesstunt.motomaster",
    "description": "Award-winning bike stunt game with 250+ million downloads. Features freeride quests, light trigger modes, party fun, and multiplayer challenges with stunning visuals."
  },
  {
    "id": 26,
    "title": "Mini Car Racing Game",
    "category": "AAA Titles",
    "image": "./assets/images/minicar.png",
    "alt": "Mini Car Racing Game",
    "link": "https://play.google.com/store/apps/details?id=com.ht.mini.car.raceway.endless.drive",
    "description": "Endless driving mobile racing game with mini cars and challenging raceway environments."
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

// Process and enrich project data
function processProjects() {
  // Filter out "Videos" category and map videos to projects
  const processed = portfolioData
    .filter(p => p.category !== "Videos")
    .map(project => {
      // Ensure order field exists (default to 100 if missing)
      if (project.order === undefined) {
        project.order = 100;
      }
      return project;
    })
    .map(project => {
      const enriched = { ...project };
      
      // Map video if title matches
      if (videoMapping[project.title]) {
        enriched.video = videoMapping[project.title];
      }
      
      // Extract platforms: use links object if exists, otherwise extract from link
      if (project.links) {
        // Project already has links object (e.g., Scary Teacher, Amelie)
        enriched.links = extractPlatforms(project.link, project.links);
      } else if (project.link) {
        // Extract from single link
        enriched.links = extractPlatforms(project.link);
      } else {
        enriched.links = { ios: null, android: null, playstore: null, steam: null };
      }
      
      return enriched;
    });
  
  return processed;
}

// Render platform button HTML
function renderPlatformButton(platform, url, label) {
  const icons = {
    playstore: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997 0-.5511.4482-.9993.9993-.9993.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997 0-.5511.4482-.9993.9993-.9993.551 0 .9993.4482.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1349 1.2297L4.8429 5.5775a.4161.4161 0 00-.5676-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.186.8535 12.3062.8535 13.7408v1.8265c0 1.4346 1.8354 2.5548 5.1691 3.2954 1.2818.3442 2.7616.5173 4.3774.5173 1.6158 0 3.0956-.1731 4.3774-.5173 3.3337-.7406 5.1691-1.8608 5.1691-3.2954v-1.8265c0-1.4346-1.8354-2.5548-5.1691-3.2954m-5.3774 8.1774c-1.5 0-2.9993-.1197-4.1691-.3031-2.5-.5017-3.8309-1.1992-3.8309-1.9056v-1.8265c0-.7064 1.3309-1.4039 3.8309-1.9056 2.3397-.4692 5.3386-.4692 7.6783 0 2.5.5017 3.8309 1.1992 3.8309 1.9056v1.8265c0 .7064-1.3309 1.4039-3.8309 1.9056-1.1698.1834-2.6691.3031-4.1691.3031m0-12.2805c-2.5 0-4.9993.1197-6.1691.3031C2.6889 9.7208.8535 10.4183.8535 11.1247v1.8265c0 .3526.5984.7006 1.8309 1.0038 1.5.3008 3.5.4692 5.5.4692s4-.1684 5.5-.4692c1.2325-.3032 1.8309-.6512 1.8309-1.0038v-1.8265c0-.7064-1.8354-1.4039-5.1691-1.9973-1.1698-.1834-2.6691-.3031-4.1691-.3031z"/></svg>`,
    steam: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.5-6.5v-1h3v1h-3zm-1-2v-1h5v1h-5zm-1-2v-1h7v1h-7z"/></svg>`,
    ios: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 4.23 5.87 9.95 5.87c1.67 0 2.89.6 3.89.6 1.01 0 2.72-.75 4.6-.6 1.25.1 3.82.5 5.63 3.75-4.87 2.73-4.15 9.99.98 10.66zm-5.27-17.1c.59-.68 1.07-1.63.95-2.58-.92.04-2.04.61-2.7 1.38-.59.68-1.12 1.78-.98 2.83 1.03.08 2.09-.48 2.73-1.63z"/></svg>`,
    android: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997 0-.5511.4482-.9993.9993-.9993.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997 0-.5511.4482-.9993.9993-.9993.551 0 .9993.4482.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1349 1.2297L4.8429 5.5775a.4161.4161 0 00-.5676-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.186.8535 12.3062.8535 13.7408v1.8265c0 1.4346 1.8354 2.5548 5.1691 3.2954 1.2818.3442 2.7616.5173 4.3774.5173 1.6158 0 3.0956-.1731 4.3774-.5173 3.3337-.7406 5.1691-1.8608 5.1691-3.2954v-1.8265c0-1.4346-1.8354-2.5548-5.1691-3.2954m-5.3774 8.1774c-1.5 0-2.9993-.1197-4.1691-.3031-2.5-.5017-3.8309-1.1992-3.8309-1.9056v-1.8265c0-.7064 1.3309-1.4039 3.8309-1.9056 2.3397-.4692 5.3386-.4692 7.6783 0 2.5.5017 3.8309 1.1992 3.8309 1.9056v1.8265c0 .7064-1.3309 1.4039-3.8309 1.9056-1.1698.1834-2.6691.3031-4.1691.3031m0-12.2805c-2.5 0-4.9993.1197-6.1691.3031C2.6889 9.7208.8535 10.4183.8535 11.1247v1.8265c0 .3526.5984.7006 1.8309 1.0038 1.5.3008 3.5.4692 5.5.4692s4-.1684 5.5-.4692c1.2325-.3032 1.8309-.6512 1.8309-1.0038v-1.8265c0-.7064-1.8354-1.4039-5.1691-1.9973-1.1698-.1834-2.6691-.3031-4.1691-.3031z"/></svg>`
  };
  
  const icon = icons[platform.toLowerCase()] || '';
  return `
    <a href="${url}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm font-medium transition-all">
      ${icon}
      ${label}
    </a>
  `;
}

// Render a single project card
function renderProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'flex-shrink-0 w-80 rounded-xl bg-surface-dark border border-gray-800 overflow-hidden card-hover-effect';
  card.setAttribute('data-project-id', project.id);

  const hasVideo = project.video;
  const posterSrc = project.image;
  const links = project.links || {};

  // Build platform buttons dynamically
  const platformButtons = [];
  
  // Order: Video first, then platforms
  if (hasVideo) {
    platformButtons.push(`
      <button class="project-video-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary text-sm font-medium transition-all" data-project-id="${project.id}" data-video-src="${project.video}">
        <span class="material-symbols-outlined text-base">play_circle</span>
        Video
      </button>
    `);
  }
  
  // Add platform buttons in priority order: PlayStore, Steam, iOS, Android
  if (links.playstore) {
    platformButtons.push(renderPlatformButton('playstore', links.playstore, 'PlayStore'));
  }
  if (links.steam) {
    platformButtons.push(renderPlatformButton('steam', links.steam, 'Steam'));
  }
  if (links.ios) {
    platformButtons.push(renderPlatformButton('ios', links.ios, 'iOS'));
  }
  if (links.android && !links.playstore) { // Only show Android if PlayStore not already shown
    platformButtons.push(renderPlatformButton('android', links.android, 'Android'));
  }

  card.innerHTML = `
    <div class="relative aspect-[4/3] w-full overflow-hidden bg-gray-900">
      ${hasVideo ? `
        <video 
          class="w-full h-full object-cover transition-opacity duration-300"
          preload="metadata"
          muted
          loop
          playsinline
          poster="${posterSrc}"
          data-video-src="${project.video}"
        >
          <source src="${project.video}" type="video/mp4">
        </video>
        <div class="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors flex items-center justify-center">
          <div class="video-play-icon absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity">
            <div class="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
              <span class="material-symbols-outlined text-white text-3xl">play_arrow</span>
            </div>
          </div>
        </div>
      ` : `
        <img 
          src="${project.image}" 
          alt="${project.alt || project.title}"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      `}
    </div>
    <div class="p-5">
      <h3 class="text-xl font-bold text-white mb-2">${project.title}</h3>
      <p class="text-gray-400 text-sm mb-4 line-clamp-2">${project.description ? project.description.replace(/<[^>]*>/g, '').substring(0, 120) + '...' : ''}</p>
      <div class="flex gap-2 flex-wrap">
        ${platformButtons.join('')}
      </div>
    </div>
  `;

  return card;
}

// Setup video hover (desktop) and button (mobile)
function setupVideoBehavior(container) {
  const videoElements = container.querySelectorAll('video[data-video-src]');
  const videoButtons = container.querySelectorAll('.project-video-btn');
  
  videoElements.forEach(video => {
    const card = video.closest('[data-project-id]');
    if (!card) return;
    
    let isPlaying = false;
    
    // Desktop hover
    if (window.innerWidth > 768) {
      card.addEventListener('mouseenter', () => {
        if (!isPlaying) {
          video.play().catch(() => {});
          isPlaying = true;
        }
      });
      
      card.addEventListener('mouseleave', () => {
        if (isPlaying) {
          video.pause();
          video.currentTime = 0;
          isPlaying = false;
        }
      });
    }
  });
  
  // Mobile video button
  videoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      const card = container.querySelector(`[data-project-id="${projectId}"]`);
      const video = card?.querySelector('video');
      
      if (video) {
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  });
}

// Setup slider navigation
function setupSliderNavigation(container, category) {
  const leftBtn = document.querySelector(`.slider-nav-left[data-category="${category}"]`);
  const rightBtn = document.querySelector(`.slider-nav-right[data-category="${category}"]`);
  
  if (!leftBtn || !rightBtn) return;
  
  const updateButtons = () => {
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    
    leftBtn.disabled = scrollLeft <= 0;
    rightBtn.disabled = scrollLeft >= scrollWidth - clientWidth - 10;
  };
  
  updateButtons();
  container.addEventListener('scroll', updateButtons);
  
  leftBtn.addEventListener('click', () => {
    container.scrollBy({ left: -344, behavior: 'smooth' });
  });
  
  rightBtn.addEventListener('click', () => {
    container.scrollBy({ left: 344, behavior: 'smooth' });
  });
}

// Render category row
function renderCategoryRow(category, projects) {
  const container = document.querySelector(`.slider-container[data-category="${category}"]`);
  if (!container) return;
  
  const innerContainer = container.querySelector('div');
  if (!innerContainer) return;
  
  innerContainer.innerHTML = '';
  
  // Update count
  const countId = category === 'AAA Titles' ? 'aaa-count' : category === 'Mobile' ? 'mobile-count' : 'aiml-count';
  const countEl = document.getElementById(countId);
  if (countEl) {
    countEl.textContent = `(${projects.length})`;
  }
  
  // Render cards
  projects.forEach(project => {
    const card = renderProjectCard(project);
    innerContainer.appendChild(card);
  });
  
  // Setup behaviors
  setupVideoBehavior(container);
  setupSliderNavigation(container, category);
}

// Function to load and display portfolio projects
const loadPortfolioProjects = function () {
  try {
    const processed = processProjects();
    
    // Sort function: by order (ascending), then by id (ascending)
    const sortProjects = (projects) => {
      return projects.sort((a, b) => {
        const orderA = a.order !== undefined ? a.order : 100;
        const orderB = b.order !== undefined ? b.order : 100;
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        return (a.id || 0) - (b.id || 0);
      });
    };
    
    // Group by category and sort
    const categories = {
      'AAA Titles': sortProjects(processed.filter(p => p.category === 'AAA Titles')),
      'Mobile': sortProjects(processed.filter(p => p.category === 'Mobile')),
      'AI/ML': sortProjects(processed.filter(p => p.category === 'AI/ML'))
    };
    
    // Render each category
    Object.keys(categories).forEach(category => {
      renderCategoryRow(category, categories[category]);
    });
    
    console.log("Portfolio loaded successfully!");
  } catch (error) {
    console.error("Error loading portfolio projects:", error);
  }
};

// Function to display projects for current page
const displayProjects = function () {
  // Support both old and new structure
  const projectList = document.querySelector(".project-list") || document.querySelector("#portfolio-grid");
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
  const isNewStructure = projectList.id === "portfolio-grid";
  
  projectsToShowOrdered.forEach((project) => {
    const projectItem = isNewStructure ? document.createElement("div") : document.createElement("li");
    projectItem.className = isNewStructure ? "group relative rounded-xl bg-surface-dark overflow-hidden border border-gray-800 card-hover-effect cursor-pointer" : "project-item active";
    projectItem.setAttribute("data-filter-item", "");
    projectItem.setAttribute("data-category", project.category);

    if (project.type === "video") {
      // Create video project item with Tailwind classes
      if (isNewStructure) {
        projectItem.innerHTML = `
          <div class="aspect-[4/3] w-full bg-cover bg-center rounded-t-xl overflow-hidden relative group">
            <video
              class="w-full h-full object-cover"
              muted
              loop
              preload="metadata"
              playsinline
              controlsList="nodownload"
            >
              <source src="${project.video}" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div class="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <button class="bg-white text-primary font-bold py-2 px-6 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                Watch Video
              </button>
            </div>
          </div>
          <div class="p-5">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold text-white">${project.title}</h3>
              <span class="text-xs font-semibold bg-gray-700 text-gray-300 px-2 py-1 rounded">Video</span>
            </div>
            <p class="text-gray-400 text-sm line-clamp-2">${project.description || 'Game development showcase video'}</p>
          </div>
        `;
      } else {
        projectItem.innerHTML = `
          <div class="project-content-box">
            <div class="project-img">
              <video
                width="100%"
                height="200"
                muted
                loop
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
      }
      
      // Add hover play/pause functionality after element is added to DOM
      setTimeout(() => {
        const videoElement = projectItem.querySelector('video');
        const videoContainer = isNewStructure ? projectItem.querySelector('.aspect-\\[4\\/3\\]') : projectItem.querySelector('.project-content-box');
        
        if (videoElement && videoContainer) {
          // Play video on hover/mouseenter
          videoContainer.addEventListener('mouseenter', () => {
            videoElement.play().catch(err => {
              console.log('Video play failed:', err);
            });
          });
          
          // Pause and reset video on mouseleave
          videoContainer.addEventListener('mouseleave', () => {
            videoElement.pause();
            videoElement.currentTime = 0;
          });
          
          // Also handle touch events for mobile
          videoContainer.addEventListener('touchstart', () => {
            if (videoElement.paused) {
              videoElement.play().catch(err => {
                console.log('Video play failed:', err);
              });
            } else {
              videoElement.pause();
              videoElement.currentTime = 0;
            }
          });
        }
      }, 0);
    } else if (project.category === "AI/ML") {
      // AI/ML projects: show as post, open portfolio modal on click
      if (isNewStructure) {
        projectItem.innerHTML = `
          <div class="aspect-[4/3] w-full bg-cover bg-center rounded-t-xl overflow-hidden relative group">
            <img
              src="${project.image}"
              alt="${project.alt}"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <button class="bg-white text-primary font-bold py-2 px-6 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                View Details
              </button>
            </div>
          </div>
          <div class="p-5">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold text-white">${project.title}</h3>
              <span class="text-xs font-semibold bg-gray-700 text-gray-300 px-2 py-1 rounded">${project.category}</span>
            </div>
            <p class="text-gray-400 text-sm line-clamp-2">${project.description ? project.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 'AI/ML project'}</p>
          </div>
        `;
      } else {
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
      }
      setTimeout(() => {
        projectItem.addEventListener("click", function (e) {
          // Only prevent default if it's not a link
          if (!e.target.closest('a')) {
            e.preventDefault();
          }
          
          // Use the dedicated portfolio modal
          const modalContainer = document.getElementById("portfolio-modal-container");
          const modalImg = document.getElementById("portfolio-modal-img");
          const modalTitle = document.getElementById("portfolio-modal-title");
          const modalDescription = document.getElementById("portfolio-modal-description");

          if (modalContainer && modalImg && modalTitle && modalDescription) {
            modalImg.src = project.image;
            modalImg.alt = project.alt;
            modalTitle.textContent = project.title;
            modalDescription.innerHTML = project.description || 'No description available.';

            modalContainer.classList.add("active");
            document.body.style.overflow = "hidden";
          }

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
      if (isNewStructure) {
        const hasLink = project.link && project.link.trim() !== '';
        const itemContent = `
          <div class="aspect-[4/3] w-full bg-cover bg-center rounded-t-xl overflow-hidden relative group">
            <img
              src="${project.image}"
              alt="${project.alt}"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <button class="bg-white text-primary font-bold py-2 px-6 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                ${hasLink ? 'View Project' : 'View Details'}
              </button>
            </div>
          </div>
          <div class="p-5">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold text-white">${project.title}</h3>
              <span class="text-xs font-semibold bg-gray-700 text-gray-300 px-2 py-1 rounded">${project.category}</span>
            </div>
            <p class="text-gray-400 text-sm line-clamp-2">${project.description || 'Game development project'}</p>
            ${hasLink ? `<div class="mt-4 flex gap-2">
              <a href="${project.link}" target="_blank" class="text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">open_in_new</span>
                Store
              </a>
            </div>` : ''}
          </div>
        `;
        
        if (hasLink) {
          projectItem.innerHTML = `<a href="${project.link}" target="_blank" class="block">${itemContent}</a>`;
        } else {
          projectItem.innerHTML = itemContent;
          // Add click handler for modal if no link
          setTimeout(() => {
            projectItem.addEventListener("click", function (e) {
              e.preventDefault();
              const modalContainer = document.getElementById("portfolio-modal-container");
              const modalImg = document.getElementById("portfolio-modal-img");
              const modalTitle = document.getElementById("portfolio-modal-title");
              const modalDescription = document.getElementById("portfolio-modal-description");

              if (modalContainer && modalImg && modalTitle && modalDescription) {
                modalImg.src = project.image;
                modalImg.alt = project.alt;
                modalTitle.textContent = project.title;
                modalDescription.innerHTML = project.description || 'No description available.';

                modalContainer.classList.add("active");
                document.body.style.overflow = "hidden";
              }
            });
          }, 0);
        }
      } else {
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
            <p class="project-category">${project.category.split(" ").join(" ")}</p>
          </a>
        `;
      }
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
  // Support both old and new filter structure
  const filterBtn = document.querySelectorAll("[data-filter-btn], .filter-btn[data-filter]");
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
      // Support both data-filter attribute and innerText
      let selectedValue = this.getAttribute('data-filter') || this.innerText;
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      filterFunc(selectedValue);

      // Update active state
      filterBtn.forEach(b => b.classList.remove("active"));
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

// Initialize portfolio on page load (for single-page structure)
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the portfolio section or if it's a single-page site
  const portfolioSection = document.getElementById('work');
  if (portfolioSection) {
    // Single-page structure - load immediately
    setTimeout(() => {
      loadPortfolioProjects();
    }, 300);
  } else {
    // Old tab-based structure - use the old logic
    setTimeout(checkAndLoadPortfolio, 500);
  }
});

// Listen for navigation changes (for old tab-based structure)
document.addEventListener('click', function(e) {
  if (e.target.matches('[data-nav-link]')) {
    // Wait a bit for the tab to become active, then check
    setTimeout(checkAndLoadPortfolio, 100);
  }
});
