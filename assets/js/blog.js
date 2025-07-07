"use strict";

// blog modal variables
const blogModalContainer = document.querySelector(
  "[data-blog-modal-container]"
);
const blogModalCloseBtn = document.querySelector("[data-blog-modal-close-btn]");
const blogOverlay = document.querySelector("[data-blog-overlay]");
const blogModalImg = document.querySelector("[data-blog-modal-img]");
const blogModalTitle = document.querySelector("[data-blog-modal-title]");
const blogModalMeta = document.querySelector("[data-blog-modal-meta]");
const blogModalText = document.querySelector("[data-blog-modal-text]");
const blogModalFullText = document.querySelector("[data-blog-modal-full-text]");
const blogReadMoreBtn = document.querySelector("[data-blog-read-more]");

// Configure marked.js for security
marked.setOptions({
  sanitize: true,
  breaks: true,
  gfm: true,
});

// blog modal toggle function
const blogModalFunc = function () {
  blogModalContainer.classList.toggle("active");
  blogOverlay.classList.toggle("active");

  // Reset content state when closing
  if (!blogModalContainer.classList.contains("active")) {
    blogModalText.style.display = "block";
    blogModalFullText.style.display = "none";
    blogReadMoreBtn.querySelector("span").textContent =
      "Click to read full story";
    blogReadMoreBtn
      .querySelector("ion-icon")
      .setAttribute("name", "chevron-down-outline");
  }
};

// Function to set up blog item click events
const setupBlogItems = function () {
  const blogItems = document.querySelectorAll(".blog-post-item");

  blogItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // Set modal content
      blogModalImg.src = this.querySelector(".blog-banner-box img").src;
      blogModalImg.alt = this.querySelector(".blog-banner-box img").alt;
      blogModalTitle.innerHTML =
        this.querySelector(".blog-item-title").innerHTML;
      blogModalMeta.innerHTML = this.querySelector(".blog-meta").innerHTML;

      // Get the full content from the data attribute or use excerpt as fallback
      const fullText = this.dataset.fullContent || this.querySelector(".blog-text").innerHTML;
      
      // For HTML content, we'll show a preview and full content
      if (fullText.includes('<h2>')) {
        // This is HTML content, extract first paragraph for preview
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = fullText;
        const firstParagraph = tempDiv.querySelector('p');
        const preview = firstParagraph ? firstParagraph.textContent.substring(0, 150) + '...' : fullText.substring(0, 150) + '...';
        
        blogModalText.innerHTML = `<p>${preview}</p>`;
        
        // Remove the h2 heading from the content since the modal already shows the title
        const contentWithoutHeading = fullText.replace(/<h2>.*?<\/h2>/s, '').trim();
        blogModalFullText.innerHTML = contentWithoutHeading;
      } else {
        // This is markdown content, convert it
        const firstSentence = fullText.split(".")[0] + ".";
        blogModalText.innerHTML = marked.parse(firstSentence);
        blogModalFullText.innerHTML = marked.parse(fullText);
      }

      // Always show read more button since we're only showing one sentence
      blogReadMoreBtn.style.display = "flex";

      blogModalFunc();
    });
  });
};

// Toggle between preview and full text
blogReadMoreBtn.addEventListener("click", function () {
  const isShowingPreview = blogModalText.style.display !== "none";

  if (isShowingPreview) {
    blogModalText.style.display = "none";
    blogModalFullText.style.display = "block";
    this.querySelector("span").textContent = "Show less";
    this.querySelector("ion-icon").setAttribute("name", "chevron-up-outline");
  } else {
    blogModalText.style.display = "block";
    blogModalFullText.style.display = "none";
    this.querySelector("span").textContent = "Click to read full story";
    this.querySelector("ion-icon").setAttribute("name", "chevron-down-outline");
  }
});

// add click event to blog modal close button
blogModalCloseBtn.addEventListener("click", blogModalFunc);
blogOverlay.addEventListener("click", blogModalFunc);

// Blog posts data (embedded directly to avoid fetch issues)
const blogPostsData = [
  {
    "id": 1,
    "title": "The Invisible Hand: How Optimisation Makes Games Feel Amazing",
    "category": "Game Development",
    "date": "2024-01-15",
    "image": "./assets/images/optimzation.png",
    "excerpt": "Ever wondered why some games feel amazing? They're smooth, responsive, and don't make your computer sound like a jet engine taking off. A considerable part of that magic comes down to game optimisation...",
    "content": `
      <h2>The Invisible Hand: How Optimisation Makes Games Feel Amazing</h2>
      
      <p>Ever wondered why some games feel <strong>just right</strong>? They're smooth, responsive, and don't make your computer sound like a jet engine taking off. A considerable part of that magic comes down to <em>game optimisation</em>. It's the art and science of making a game run as efficiently as possible, delivering a stellar experience without demanding top-tier hardware from every player.</p>
      
      <h3>So, what does optimisation involve?</h3>
      
      <h4>Squeezing Every Drop from Your Hardware</h4>
      <p>This isn't just about faster frame rates, though that's a big part. It's about:</p>
      <ul>
        <li><strong>Reducing load times</strong> and minimising memory usage</li>
        <li><strong>Ensuring game logic runs smoothly</strong> even during chaotic moments</li>
        <li><strong>Level of Detail (LOD):</strong> Simpler versions of models for distant objects</li>
        <li><strong>Occlusion culling:</strong> Avoiding rendering things the player can't see</li>
      </ul>
      
      <h4>Lean, Mean Code Machines</h4>
      <p>The code must be efficient beyond visuals:</p>
      <ol>
        <li><em>Using appropriate data structures</em> and avoiding redundant calculations</li>
        <li><em>Employing multi-threading</em> to distribute tasks across multiple CPU cores</li>
        <li><em>Optimising algorithms</em> for better performance</li>
        <li><em>Memory management</em> to prevent leaks and fragmentation</li>
      </ol>
      
      <blockquote>
        "Good optimisation isn't about cutting corners; it's about intelligent design and development choices that lead to a polished, immersive, and truly enjoyable gaming experience for everyone."
      </blockquote>
      
      <h4>Intelligent Asset Management</h4>
      <p>Game assets (textures, models, audio) can be huge. Optimisation involves:</p>
      <ul>
        <li><strong>Texture compression:</strong> Reduce file sizes without noticeable quality loss</li>
        <li><strong>Asynchronous loading:</strong> Stream assets in the background</li>
        <li><strong>Asset pooling:</strong> Reuse objects instead of creating new ones</li>
        <li><strong>LOD systems:</strong> Different quality levels based on distance</li>
      </ul>
      
      <p>Ultimately, good optimisation is the <strong>invisible hand</strong> that makes the virtual world feel real.</p>
    `
  },
  {
    "id": 2,
    "title": "Beyond the Pixels: Crafting Visually Stunning Games with Smart Rendering",
    "category": "Graphics & Rendering",
    "date": "2024-01-20",
    "image": "./assets/images/Smart Rendering.jpeg",
    "excerpt": "In game development, 'good rendering' isn't just throwing the most polygons on screen. It's about using rendering techniques strategically to create immersive, believable, and visually striking worlds...",
    "content": `
      <h2>Beyond the Pixels: Crafting Visually Stunning Games with Smart Rendering</h2>
      
      <p>In game development, 'good rendering' isn't just throwing the most polygons on screen. It's about using rendering techniques <strong>strategically</strong> to create immersive, believable, and visually striking worlds that captivate players. It's a blend of <em>artistic vision</em> and <em>technical mastery</em>.</p>
      
      <h3>Here's how brilliant rendering elevates a game:</h3>
      
      <h4>The Illusion of Light</h4>
      <p>Lighting is paramount. Techniques like <strong>Physically-Based Rendering (PBR)</strong> simulate how light interacts with real-world materials, resulting in incredibly lifelike surfaces. Key features include:</p>
      <ul>
        <li><strong>Dynamic lighting systems</strong> that create dramatic moods</li>
        <li><strong>Global illumination</strong> for realistic light bouncing</li>
        <li><strong>Real-time shadows</strong> that enhance depth perception</li>
        <li><strong>Volumetric lighting</strong> for atmospheric effects</li>
      </ul>
      
      <h4>Efficiency Meets Beauty</h4>
      <p>Modern rendering pipelines have evolved to handle complexity efficiently:</p>
      <ol>
        <li><em>Deferred rendering:</em> Separates geometry from lighting calculations</li>
        <li><em>Forward rendering:</em> Efficient for scenes with few lights</li>
        <li><em>Tile-based rendering:</em> Optimises memory bandwidth usage</li>
        <li><em>Instanced rendering:</em> Draws many similar objects efficiently</li>
      </ol>
      
      <blockquote>
        "Good rendering isn't about pushing hardware to its absolute limit; it's about intelligent choices that deliver maximum visual impact while maintaining smooth performance."
      </blockquote>
      
      <h4>The Power of Shaders</h4>
      <p>Shaders are small programs that run on the GPU, dictating how objects look. They can create:</p>
      <ul>
        <li><strong>Realistic water reflections</strong> and volumetric fog</li>
        <li><strong>Stylised, hand-painted effects</strong> for unique art styles</li>
        <li><strong>Procedural textures</strong> that save memory</li>
        <li><strong>Post-processing effects</strong> like bloom and motion blur</li>
      </ul>
      
      <p>Rendering is the <strong>canvas</strong> on which game worlds come to life.</p>
    `
  },
  {
    "id": 3,
    "title": "The Player's Journey: Designing for Unforgettable User Experience in Games",
    "category": "UX Design",
    "date": "2024-01-25",
    "image": "./assets/images/ux.png",
    "excerpt": "Forget flashy graphics for a moment. At the core of every truly beloved game lies an exceptional User Experience (UX). UX in games is about how players feel when interacting with your creation...",
    "content": `
      <h2>The Player's Journey: Designing for Unforgettable User Experience in Games</h2>
      
      <p>Forget flashy graphics for a moment. At the core of every truly beloved game lies an <strong>exceptional User Experience (UX)</strong>. UX in games is about how players feel when interacting with your creation – is it intuitive, engaging, frustrating, or delightful? Crafting a positive UX is paramount for a game's success and longevity.</p>
      
      <h3>Here's what goes into building that incredible player journey:</h3>
      
      <h4>Intuitive Immersion</h4>
      <p>A good game should feel natural to play. This means:</p>
      <ul>
        <li><strong>Clear, consistent UI elements</strong> that don't overwhelm</li>
        <li><strong>Responsive and easy to grasp controls</strong> that feel natural</li>
        <li><strong>Tutorials that gently guide</strong> rather than bombard</li>
        <li><strong>Logical menu structures</strong> that are easy to navigate</li>
      </ul>
      
      <h4>Meaningful Feedback</h4>
      <p>Every player's action should have a clear and immediate response:</p>
      <ol>
        <li><em>Visual cues:</em> Screen effects, animations, and color changes</li>
        <li><em>Sound effects:</em> Audio feedback for actions and events</li>
        <li><em>Haptic feedback:</em> Controller vibrations and tactile responses</li>
        <li><em>Progress indicators:</em> Clear signs of advancement and achievement</li>
      </ol>
      
      <blockquote>
        "A fantastic user experience isn't just a feature; it's the foundation upon which memorable and lasting games are built."
      </blockquote>
      
      <h4>Progression and Reward</h4>
      <p>Humans are wired for progress. Games should provide:</p>
      <ul>
        <li><strong>Clear progression paths</strong> whether levelling up or unlocking abilities</li>
        <li><strong>Challenging but achievable goals</strong> that keep players motivated</li>
        <li><strong>Thoughtful reward systems</strong> from points to new content</li>
        <li><strong>Meaningful achievements</strong> that feel rewarding to unlock</li>
      </ul>
      
      <h4>Accessibility for All</h4>
      <p>A truly great game is one that many people can enjoy:</p>
      <ul>
        <li><strong>Customizable controls</strong> for different input methods</li>
        <li><strong>Scalable text</strong> for readability</li>
        <li><strong>Colorblind modes</strong> for visual accessibility</li>
        <li><strong>Difficulty options</strong> for different skill levels</li>
      </ul>
      
      <p>It's about designing with the <strong>player at every decision's heart</strong>.</p>
    `
  },
  {
    "id": 4,
    "title": "The Next Frontier: How AI and ML Will Revolutionise Game Development",
    "category": "AI & Machine Learning",
    "date": "2024-01-30",
    "image": "./assets/images/mlai2.jpeg",
    "excerpt": "The role of Artificial Intelligence (AI) and Machine Learning (ML) in game development is rapidly evolving beyond simple enemy pathfinding. Shortly, these technologies aren't just improving existing systems...",
    "content": `
      <h2>The Next Frontier: How AI and ML Will Revolutionise Game Development</h2>
      
      <p>The role of <strong>Artificial Intelligence (AI)</strong> and <strong>Machine Learning (ML)</strong> in game development is rapidly evolving beyond simple enemy pathfinding. Shortly, these technologies aren't just improving existing systems; they're set to fundamentally innovate how games are made, played, and experienced.</p>
      
      <h3>Get ready for a new era of gaming:</h3>
      
      <h4>Dynamic, Living Worlds</h4>
      <p>Imagine open worlds that evolve based on player actions. AI and ML will power:</p>
      <ul>
        <li><strong>Sophisticated procedural content generation (PCG)</strong> for unique experiences</li>
        <li><strong>Dynamic environments</strong> that change based on player choices</li>
        <li><strong>Adaptive quests and storylines</strong> that unfold uniquely for each player</li>
        <li><strong>No two playthroughs will ever be truly alike</strong></li>
      </ul>
      
      <h4>Intelligent NPCs, Beyond Belief</h4>
      <p>NPCs will move past repetitive dialogue and predictable behaviours:</p>
      <ol>
        <li><em>Advanced ML models</em> that learn from player interactions</li>
        <li><em>Memory systems</em> that remember past events and conversations</li>
        <li><em>Emotional responses</em> that feel genuine and contextual</li>
        <li><em>Natural language conversations</em> powered by large language models</li>
      </ol>
      
      <blockquote>
        "Integrating AI and ML isn't just about making games 'smarter.' It's about unlocking entirely new dimensions of creativity, replayability, and personalisation."
      </blockquote>
      
      <h4>Personalised Gameplay Experiences</h4>
      <p>AI will analyse player behaviour in real-time, adapting:</p>
      <ul>
        <li><strong>Difficulty levels</strong> to match player skill</li>
        <li><strong>Enemy types and behaviors</strong> based on player preferences</li>
        <li><strong>Narrative branches</strong> that suit individual playstyles</li>
        <li><strong>Content recommendations</strong> for maximum engagement</li>
      </ul>
      
      <h4>Automated Art and Design Assistance</h4>
      <p>AI will become a mighty co-pilot for creators:</p>
      <ul>
        <li><strong>Generating realistic textures</strong> and 3D models</li>
        <li><strong>Suggesting level layouts</strong> based on gameplay requirements</li>
        <li><strong>Composing adaptive music</strong> that responds to game events</li>
        <li><strong>Automating repetitive tasks</strong> to free human creativity</li>
      </ul>
      
      <p>This ushers in a future where virtual worlds are more <strong>alive, responsive, and deeply engaging</strong> than ever before.</p>
    `
  }
];

// Function to load and display blog posts
const loadBlogPosts = function () {
  try {
    console.log("Loading blog posts...");
    
    const blogList = document.querySelector(".blog-list");
    console.log("Blog list element:", blogList);

    if (!blogList) {
      console.error("Blog list element not found");
      return;
    }

    // Clear existing blog posts
    blogList.innerHTML = "";

    // Create and append blog post items
    blogPostsData.forEach((post, index) => {
      console.log(`Creating blog post ${index + 1}:`, post.title);
      const blogItem = document.createElement("li");
      blogItem.className = "blog-post-item";
      blogItem.dataset.fullContent = post.content;
      blogItem.innerHTML = `
        <a href="#">
          <figure class="blog-banner-box">
            <img
              src="${post.image}"
              alt="${post.title}"
              loading="lazy"
            />
          </figure>

          <div class="blog-content">
            <div class="blog-meta">
              <p class="blog-category">${post.category}</p>
              <span class="dot"></span>
              <time datetime="${post.date}">${new Date(
        post.date
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}</time>
            </div>

            <h3 class="h3 blog-item-title">
              ${post.title}
            </h3>

            <p class="blog-text">
              ${post.excerpt}
            </p>
          </div>
        </a>
      `;
      blogList.appendChild(blogItem);
      console.log(`Blog post ${index + 1} added to DOM`);
    });

    console.log("Setting up blog item click events...");
    // Set up click events for the new blog items
    setupBlogItems();
    console.log("Blog posts loading completed successfully");
  } catch (error) {
    console.error("Error loading blog posts:", error);
  }
};

// Track if blog posts have been loaded
let blogPostsLoaded = false;

// Function to check if blog section is active and load posts if needed
const checkAndLoadBlogPosts = function() {
  const blogSection = document.querySelector('.blog');
  if (blogSection && blogSection.classList.contains('active') && !blogPostsLoaded) {
    console.log("Blog section is active, loading posts...");
    loadBlogPosts();
    blogPostsLoaded = true;
  }
};

// Initialize blog functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing blog...");
  
  // Load blog posts immediately
  loadBlogPosts();
  
  // Also set up navigation detection for when blog button is clicked
  const blogNavLinks = document.querySelectorAll('[data-nav-link]');
  blogNavLinks.forEach(function(navLink) {
    navLink.addEventListener("click", function() {
      if (this.textContent.toLowerCase() === "blog") {
        console.log("Blog button clicked, ensuring posts are loaded...");
        setTimeout(() => {
          loadBlogPosts();
        }, 100);
      }
    });
  });
});
