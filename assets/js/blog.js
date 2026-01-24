"use strict";

// Blog modal variables
const blogModalContainer = document.querySelector("[data-blog-modal-container]");
const blogModalCloseBtn = document.querySelector("[data-blog-modal-close-btn]");
const blogOverlay = document.querySelector("[data-blog-overlay]");
const blogModalImg = document.querySelector("[data-blog-modal-img]");
const blogModalTitle = document.querySelector("[data-blog-modal-title]");
const blogModalMeta = document.querySelector("[data-blog-modal-meta]");
const blogModalText = document.querySelector("[data-blog-modal-text]");
const blogModalFullText = document.querySelector("[data-blog-modal-full-text]");
const blogReadMoreBtn = document.querySelector("[data-blog-read-more]");

// Fallback blog posts (embedded data)
const BLOG_FALLBACK = [
  {
    "id": 1,
    "title": "The Invisible Hand: How Optimisation Makes Games Feel Amazing",
    "category": "Game Development",
    "date": "2024-01-15",
    "image": "./assets/images/optimzation.png",
    "excerpt": "Ever wondered why some games feel right? They're smooth, responsive, and don't make your computer sound like a jet engine taking off. A considerable part of that magic comes down to game optimisation...",
    "content": "Ever wondered why some games feel right? They're smooth, responsive, and don't make your computer sound like a jet engine taking off. A considerable part of that magic comes down to game optimisation. It's the art and science of making a game run as efficiently as possible, delivering a stellar experience without demanding top-tier hardware from every player.\n\nSo, what does optimisation involve?\n\n**Squeezing Every Drop from Your Hardware:** This isn't just about faster frame rates, though that's a big part. It's about reducing load times, minimising memory usage, and ensuring the game logic runs smoothly even during chaotic moments. Techniques like Level of Detail (LOD), where simpler versions of models are loaded for distant objects, and occlusion culling, which avoids rendering things the player can't see, are crucial for keeping the GPU happy.\n\n**Lean, Mean Code Machines:** The code must be efficient beyond visuals. Using appropriate data structures, avoiding redundant calculations, and even employing multi-threading to distribute tasks across multiple CPU cores can dramatically improve performance. Think of it like a well-oiled machine where every part works in harmony.\n\n**Intelligent Asset Management:** Game assets (textures, models, audio) can be huge. Optimisation involves clever ways to handle them, like texture compression to reduce file sizes without noticeable quality loss, and asynchronous loading to stream assets in the background so the gameplay isn't interrupted by jarring loading screens.\n\nUltimately, good optimisation isn't about cutting corners; it's about intelligent design and development choices that lead to a polished, immersive, and truly enjoyable gaming experience for everyone. It's the invisible hand that makes the virtual world feel real."
  },
  {
    "id": 2,
    "title": "Beyond the Pixels: Crafting Visually Stunning Games with Smart Rendering",
    "category": "Graphics & Rendering",
    "date": "2024-01-20",
    "image": "./assets/images/Smart Rendering.jpeg",
    "excerpt": "In game development, 'good rendering' isn't just throwing the most polygons on screen. It's about using rendering techniques strategically to create immersive, believable, and visually striking worlds...",
    "content": "In game development, 'good rendering' isn't just throwing the most polygons on screen. It's about using rendering techniques strategically to create immersive, believable, and visually striking worlds that captivate players. It's a blend of artistic vision and technical mastery.\n\nHere's how brilliant rendering elevates a game:\n\n**The Illusion of Light:** Lighting is paramount. Techniques like Physically-Based Rendering (PBR) simulate how light interacts with real-world materials, resulting in incredibly lifelike surfaces, from shiny metal to rough concrete. Beyond realism, dynamic lighting systems and global illumination can create dramatic moods, guide player attention, and enhance gameplay by illuminating hidden pathways.\n\n**Efficiency Meets Beauty:** Modern games are complex, but rendering pipelines have evolved to handle this complexity efficiently. Deferred rendering, for example, separates the geometry rendering from the lighting calculations, allowing for many more lights in a scene without a huge performance hit. This lets artists create richer, more detailed environments.\n\n**Detail Where It Matters:** Not every blade of grass needs to be rendered with microscopic detail if the player is hurtling past it at high speed. Techniques like terrain tessellation and foliage rendering dynamically adjust the level of detail based on the camera's perspective, ensuring visual fidelity where it counts and optimising performance elsewhere.\n\n**The Power of Shaders:** Shaders are small programs that run on the GPU, dictating how objects look. Masterful shader programming can create everything from realistic water reflections and volumetric fog to stylised, hand-painted effects, adding immense character and atmosphere to a game.\n\nGood rendering isn't about pushing hardware to its absolute limit; it's about intelligent choices that deliver maximum visual impact while maintaining smooth performance. It's the canvas on which game worlds come to life."
  },
  {
    "id": 3,
    "title": "The Player's Journey: Designing for Unforgettable User Experience in Games",
    "category": "UX Design",
    "date": "2024-01-25",
    "image": "./assets/images/ux.png",
    "excerpt": "Forget flashy graphics for a moment. At the core of every truly beloved game lies an exceptional User Experience (UX). UX in games is about how players feel when interacting with your creation...",
    "content": "Forget flashy graphics for a moment. At the core of every truly beloved game lies an exceptional User Experience (UX). UX in games is about how players feel when interacting with your creation – is it intuitive, engaging, frustrating, or delightful? Crafting a positive UX is paramount for a game's success and longevity.\n\nHere's what goes into building that incredible player journey:\n\n**Intuitive Immersion:** A good game should feel natural to play. This means clear, consistent UI (User Interface) elements that don't overwhelm, responsive and easy to grasp controls, and tutorials that gently guide rather than bombard. Players want to get into the game, not spend ages deciphering menus or button combinations.\n\n**Meaningful Feedback:** Every player's action should have a clear and immediate response. Visual cues, sound effects, and haptic feedback – these subtle (and sometimes not-so-subtle) signals confirm actions, convey success or failure, and keep players engaged. This constant dialogue between the game and the player creates a sense of agency and responsiveness.\n\n**Progression and Reward:** Humans are wired for progress. Games that provide clear progression paths, whether levelling up, unlocking new abilities, or achieving challenging goals, keep players motivated. Thoughtful reward systems, from points and achievements to new content, reinforce positive behaviour and encourage continued play.\n\n**Accessibility for All:** A truly great game is one that many people can enjoy. This means considering accessibility features like customizable controls, scalable text, and colorblind modes. Designing for inclusivity broadens your audience and enriches the gaming community.\n\n**The Unseen Hand of UX Research:** The best UX isn't guessed; it's discovered through user testing. Observing how real players interact with your game, identifying their pain points, and iterating based on their feedback is critical for refining the experience and ensuring it truly resonates.\n\nA fantastic user experience isn't just a feature; it's the foundation upon which memorable and lasting games are built. It's about designing with the player at every decision's heart."
  },
  {
    "id": 4,
    "title": "The Next Frontier: How AI and ML Will Revolutionise Game Development",
    "category": "AI & Machine Learning",
    "date": "2024-01-30",
    "image": "./assets/images/mlai2.jpeg",
    "excerpt": "The role of Artificial Intelligence (AI) and Machine Learning (ML) in game development is rapidly evolving beyond simple enemy pathfinding. Shortly, these technologies aren't just improving existing systems...",
    "content": "The role of Artificial Intelligence (AI) and Machine Learning (ML) in game development is rapidly evolving beyond simple enemy pathfinding. Shortly, these technologies aren't just improving existing systems; they're set to fundamentally innovate how games are made, played, and experienced.\n\nGet ready for a new era of gaming:\n\n**Dynamic, Living Worlds:** Imagine open worlds that evolve based on player actions. AI and ML will power sophisticated procedural content generation (PCG), creating static landscapes and dynamic environments, quests, and storylines that adapt and unfold uniquely for each player. No two playthroughs will ever be truly alike.\n\n**Intelligent NPCs, Beyond Belief:** NPCs will move past repetitive dialogue and predictable behaviours. Powered by advanced ML models, they'll learn from player interactions, remember past events, exhibit genuine emotional responses, and even engage in natural language conversations. This will create unparalleled immersion and believable, reactive characters.\n\n**Personalised Gameplay Experiences:** AI will analyse player behaviour in real-time, adapting difficulty, enemy types, and even narrative branches to suit individual playstyles and skill levels. Whether you prefer exploration, intense combat, or puzzle-solving, the game will dynamically tailor itself to your preferences, keeping engagement at an all-time high.\n\n**Automated Art and Design Assistance:** AI will become a mighty co-pilot for artists and designers, from generating realistic textures and 3D models to suggesting level layouts and even composing adaptive music. This will significantly reduce repetitive tasks, freeing human creativity for more complex, innovative challenges.\n\n**Hyper-Efficient Game Testing:** ML algorithms can learn to play games, identifying bugs, balance issues, and performance bottlenecks far more rapidly and thoroughly than human testers ever could. This will lead to more polished releases and faster iteration during development.\n\nIntegrating AI and ML isn't just about making games 'smarter.' It's about unlocking entirely new dimensions of creativity, replayability, and personalisation, ushering in a future where virtual worlds are more alive, responsive, and deeply engaging."
  }
];

// Lightweight markdown renderer (no external dependencies)
function renderMarkdown(text) {
  if (!text) return '';
  
  // Convert double line breaks to paragraphs
  let html = text.split(/\n\n+/).map(para => {
    para = para.trim();
    if (!para) return '';
    
    // Convert **bold** to <strong>
    para = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Convert lists starting with - to <ul><li>
    if (para.startsWith('- ')) {
      const items = para.split(/\n(?=- )/).map(item => {
        item = item.replace(/^-\s*/, '');
        // Convert **bold** in list items
        item = item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        return `<li>${item}</li>`;
      }).join('');
      return `<ul>${items}</ul>`;
    }
    
    return `<p>${para}</p>`;
  }).join('');
  
  return html;
}

// Sanitize HTML - allow only safe tags
function sanitizeHTML(html) {
  if (!html) return '';
  
  // Remove script tags and event handlers
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  html = html.replace(/on\w+="[^"]*"/gi, '');
  html = html.replace(/on\w+='[^']*'/gi, '');
  
  // Allow only safe tags
  const allowedTags = ['p', 'strong', 'em', 'ul', 'ol', 'li', 'h3', 'h4', 'blockquote', 'br'];
  const tagPattern = new RegExp(`<(?!\/?(?:${allowedTags.join('|')})(?:\s|>))[^>]+>`, 'gi');
  html = html.replace(tagPattern, '');
  
  return html;
}

// Blog modal toggle function
const blogModalFunc = function () {
  if (!blogModalContainer) return;
  
  const isActive = blogModalContainer.style.display !== 'none' && blogModalContainer.style.display !== '';
  
  if (isActive) {
    blogModalContainer.style.display = 'none';
    document.body.style.overflow = '';
    if (blogOverlay) blogOverlay.classList.remove('active');
  } else {
    blogModalContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (blogOverlay) blogOverlay.classList.add('active');
  }
  
  // Reset content state when closing
  if (isActive && blogModalText && blogModalFullText && blogReadMoreBtn) {
    blogModalText.style.display = 'block';
    blogModalFullText.style.display = 'none';
    const span = blogReadMoreBtn.querySelector('span:first-child');
    const icon = blogReadMoreBtn.querySelector('.material-symbols-outlined');
    if (span) span.textContent = 'Click to read full story';
    if (icon) icon.textContent = 'expand_more';
  }
};

// Close modal handlers
if (blogModalCloseBtn) {
  blogModalCloseBtn.addEventListener('click', blogModalFunc);
}

if (blogOverlay) {
  blogOverlay.addEventListener('click', blogModalFunc);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && blogModalContainer && blogModalContainer.style.display !== 'none') {
    blogModalFunc();
  }
});

// Toggle between preview and full text
if (blogReadMoreBtn) {
  blogReadMoreBtn.addEventListener('click', function () {
    if (!blogModalText || !blogModalFullText) return;
    
    const isShowingPreview = blogModalText.style.display !== 'none';
    
    if (isShowingPreview) {
      blogModalText.style.display = 'none';
      blogModalFullText.style.display = 'block';
      const span = this.querySelector('span:first-child');
      const icon = this.querySelector('.material-symbols-outlined');
      if (span) span.textContent = 'Show less';
      if (icon) icon.textContent = 'expand_less';
    } else {
      blogModalText.style.display = 'block';
      blogModalFullText.style.display = 'none';
      const span = this.querySelector('span:first-child');
      const icon = this.querySelector('.material-symbols-outlined');
      if (span) span.textContent = 'Click to read full story';
      if (icon) icon.textContent = 'expand_more';
    }
  });
}

// Function to set up blog item click events
const setupBlogItems = function () {
  const blogItems = document.querySelectorAll('article[data-full-content], li[data-full-content]');
  
  blogItems.forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      
      if (!blogModalContainer || !blogModalImg || !blogModalTitle || !blogModalMeta || !blogModalText || !blogModalFullText || !blogReadMoreBtn) {
        console.error('Blog modal elements not found');
        return;
      }
      
      // Get image
      const imgElement = this.querySelector('img') || this.querySelector('div[style*="background-image"]');
      if (imgElement) {
        if (imgElement.tagName === 'IMG') {
          blogModalImg.src = imgElement.src;
          blogModalImg.alt = imgElement.alt || '';
        } else {
          const bgImage = imgElement.style.backgroundImage;
          const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
          if (urlMatch) {
            blogModalImg.src = urlMatch[1];
            blogModalImg.alt = this.querySelector('h3')?.textContent || 'Blog post image';
          }
        }
      }
      
      // Get title
      const titleEl = this.querySelector('h3, .blog-item-title');
      if (titleEl) {
        blogModalTitle.textContent = titleEl.textContent;
      }
      
      // Get meta (date + category)
      const metaEl = this.querySelector('.blog-meta, [class*="meta"]');
      if (metaEl) {
        blogModalMeta.innerHTML = metaEl.innerHTML;
      } else {
        // Try to construct from date and category
        const dateEl = this.querySelector('time, [datetime]');
        const categoryEl = this.querySelector('[class*="category"]');
        if (dateEl || categoryEl) {
          blogModalMeta.innerHTML = `${categoryEl ? categoryEl.textContent : ''}${dateEl && categoryEl ? ' • ' : ''}${dateEl ? new Date(dateEl.getAttribute('datetime') || dateEl.textContent).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}`;
        }
      }
      
      // Get full content
      const fullText = this.dataset.fullContent || '';
      
      // Render markdown to HTML
      const rendered = renderMarkdown(fullText);
      const sanitized = sanitizeHTML(rendered);
      
      // Extract first paragraph for preview
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = sanitized;
      const firstParagraph = tempDiv.querySelector('p');
      const preview = firstParagraph ? firstParagraph.textContent.substring(0, 200) + '...' : sanitized.substring(0, 200) + '...';
      
      blogModalText.innerHTML = `<p>${preview}</p>`;
      blogModalFullText.innerHTML = sanitized;
      
      // Show read more button
      blogReadMoreBtn.style.display = 'flex';
      
      // Open modal
      blogModalFunc();
    });
  });
};

// Setup blog slider navigation
function setupBlogSlider() {
  const blogSliderContainer = document.querySelector('.blog-slider-container');
  const blogSliderLeft = document.querySelector('.blog-slider-left');
  const blogSliderRight = document.querySelector('.blog-slider-right');
  
  if (!blogSliderContainer || !blogSliderLeft || !blogSliderRight) return;
  
  const updateButtons = () => {
    const scrollLeft = blogSliderContainer.scrollLeft;
    const scrollWidth = blogSliderContainer.scrollWidth;
    const clientWidth = blogSliderContainer.clientWidth;
    
    blogSliderLeft.disabled = scrollLeft <= 0;
    blogSliderRight.disabled = scrollLeft >= scrollWidth - clientWidth - 10;
  };
  
  updateButtons();
  blogSliderContainer.addEventListener('scroll', updateButtons);
  
  blogSliderLeft.addEventListener('click', () => {
    blogSliderContainer.scrollBy({ left: -344, behavior: 'smooth' });
  });
  
  blogSliderRight.addEventListener('click', () => {
    blogSliderContainer.scrollBy({ left: 344, behavior: 'smooth' });
  });
  
  // Show arrows on mobile
  if (window.innerWidth <= 768) {
    blogSliderLeft.style.opacity = '1';
    blogSliderRight.style.opacity = '1';
  }
}

// Function to load and display blog posts
const loadBlogPosts = function () {
  try {
    console.log('Loading blog posts...');
    
    const blogList = document.querySelector('.blog-list') || document.querySelector('#blog-grid');
    if (!blogList) {
      console.error('Blog list element not found');
      return;
    }
    
    // Clear existing posts
    blogList.innerHTML = '';
    
    // Try to fetch from JSON, fallback to embedded data
    fetch('./assets/json/blogs.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load blog posts');
        }
        return response.json();
      })
      .then(posts => {
        console.log(`Loaded ${posts.length} blog posts from JSON`);
        renderBlogPosts(posts, blogList);
      })
      .catch(error => {
        console.warn('Failed to fetch blogs.json, using fallback data:', error);
        renderBlogPosts(BLOG_FALLBACK, blogList);
      });
  } catch (error) {
    console.error('Error in loadBlogPosts:', error);
    const blogList = document.querySelector('.blog-list') || document.querySelector('#blog-grid');
    if (blogList) {
      renderBlogPosts(BLOG_FALLBACK, blogList);
    }
  }
};

// Render blog posts
function renderBlogPosts(posts, blogList) {
  if (!posts || posts.length === 0) {
    blogList.innerHTML = '<li class="text-gray-400">No blog posts available.</li>';
    return;
  }
  
  // Check if we're on blog.html (horizontal slider) or index.html (grid layout)
  const isBlogPage = blogList.classList.contains('horizontal-scroll') || blogList.closest('.blog-slider');
  
  posts.forEach((post, index) => {
    const blogItem = document.createElement('article');
    blogItem.className = isBlogPage 
      ? 'flex-shrink-0 w-80 flex flex-col gap-4 group cursor-pointer rounded-xl bg-surface-dark border border-gray-800 overflow-hidden card-hover-effect'
      : 'flex flex-col gap-4 group cursor-pointer rounded-xl bg-surface-dark border border-gray-800 overflow-hidden card-hover-effect';
    blogItem.dataset.fullContent = post.content || post.excerpt;
    
    blogItem.innerHTML = `
      <div class="overflow-hidden rounded-lg aspect-video w-full bg-gray-800">
        <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style="background-image: url('${post.image}');"></div>
      </div>
      <div class="flex flex-col gap-2 p-4">
        <div class="flex items-center gap-3 text-xs text-gray-400">
          <span>${new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span class="w-1 h-1 rounded-full bg-gray-600"></span>
          <span>${post.category}</span>
        </div>
        <h3 class="text-xl font-bold text-white group-hover:text-primary transition-colors blog-item-title">
          ${post.title}
        </h3>
        <p class="text-gray-400 text-sm line-clamp-3">
          ${post.excerpt}
        </p>
      </div>
    `;
    
    blogList.appendChild(blogItem);
  });
  
  // Setup click events
  setupBlogItems();
  
  // Setup slider navigation only if on blog.html (horizontal slider)
  if (isBlogPage) {
    setupBlogSlider();
  }
  
  console.log('Blog posts rendered successfully');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded, initializing blog...');
  
  // Load blog posts immediately
  setTimeout(() => {
    loadBlogPosts();
  }, 300);
});
