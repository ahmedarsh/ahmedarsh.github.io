/**
 * Main JavaScript for Game Developer Portfolio
 * Handles: Navigation, Mobile Menu, Active Section Highlighting, Smooth Scroll
 */

"use strict";

// ============================================
// NAVIGATION & MOBILE MENU
// ============================================

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('span');
        if (mobileMenu.classList.contains('hidden')) {
            icon.textContent = 'menu';
        } else {
            icon.textContent = 'close';
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('span');
            icon.textContent = 'menu';
            // Also close mobile home submenu
            const mobileHomeSubmenu = document.getElementById('mobile-home-submenu');
            const mobileHomeBtn = document.getElementById('mobile-home-btn');
            if (mobileHomeSubmenu) {
                mobileHomeSubmenu.classList.add('hidden');
            }
            if (mobileHomeBtn) {
                mobileHomeBtn.setAttribute('aria-expanded', 'false');
                const arrow = mobileHomeBtn.querySelector('.material-symbols-outlined');
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
}

// ============================================
// HOME DROPDOWN - DESKTOP
// ============================================

const homeDropdownBtn = document.getElementById('home-dropdown-btn');
const homeDropdownMenu = document.getElementById('home-dropdown-menu');
const homeDropdown = document.getElementById('home-dropdown');

if (homeDropdownBtn && homeDropdownMenu) {
    // Toggle dropdown on click
    homeDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = homeDropdownBtn.getAttribute('aria-expanded') === 'true';
        homeDropdownBtn.setAttribute('aria-expanded', !isExpanded);
        
        // Rotate arrow icon
        const arrow = homeDropdownBtn.querySelector('.material-symbols-outlined');
        
        if (isExpanded) {
            homeDropdownMenu.classList.add('opacity-0', 'invisible');
            homeDropdownMenu.classList.remove('opacity-100', 'visible');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
            }
        } else {
            homeDropdownMenu.classList.remove('opacity-0', 'invisible');
            homeDropdownMenu.classList.add('opacity-100', 'visible');
            if (arrow) {
                arrow.style.transform = 'rotate(180deg)';
            }
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!homeDropdown.contains(e.target)) {
            homeDropdownMenu.classList.add('opacity-0', 'invisible');
            homeDropdownMenu.classList.remove('opacity-100', 'visible');
            homeDropdownBtn.setAttribute('aria-expanded', 'false');
            const arrow = homeDropdownBtn.querySelector('.material-symbols-outlined');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
            }
        }
    });

    // Close dropdown when clicking a submenu link
    const homeSubmenuLinks = homeDropdownMenu.querySelectorAll('.nav-link');
    homeSubmenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            homeDropdownMenu.classList.add('opacity-0', 'invisible');
            homeDropdownMenu.classList.remove('opacity-100', 'visible');
            homeDropdownBtn.setAttribute('aria-expanded', 'false');
            const arrow = homeDropdownBtn.querySelector('.material-symbols-outlined');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// ============================================
// HOME DROPDOWN - MOBILE
// ============================================

const mobileHomeBtn = document.getElementById('mobile-home-btn');
const mobileHomeSubmenu = document.getElementById('mobile-home-submenu');

if (mobileHomeBtn && mobileHomeSubmenu) {
    mobileHomeBtn.addEventListener('click', () => {
        const isExpanded = mobileHomeBtn.getAttribute('aria-expanded') === 'true';
        mobileHomeBtn.setAttribute('aria-expanded', !isExpanded);
        
        if (isExpanded) {
            mobileHomeSubmenu.classList.add('hidden');
        } else {
            mobileHomeSubmenu.classList.remove('hidden');
        }
        
        // Rotate arrow icon
        const arrow = mobileHomeBtn.querySelector('.material-symbols-outlined');
        if (arrow) {
            arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ACTIVE SECTION HIGHLIGHTING (IntersectionObserver)
// ============================================

const sections = document.querySelectorAll('section[id]');
const navLinksArray = Array.from(navLinks);

function updateActiveNavLink() {
    let current = '';
    const scrollY = window.pageYOffset;
    const offset = 150; // Offset for better UX

    sections.forEach(section => {
        const sectionTop = section.offsetTop - offset;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Throttle scroll events for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
});

// Initial call
updateActiveNavLink();

// ============================================
// CALL MODAL FUNCTIONALITY
// ============================================

const callBtn = document.getElementById('call-btn');
const callModal = document.getElementById('call-modal');
const callModalClose = document.getElementById('call-modal-close');
const callCloseBtn = document.getElementById('call-close-btn');
const callCopyBtn = document.getElementById('call-copy-btn');
const phoneNumber = '+61 429 639 836';

// Check if mobile device
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (callBtn) {
    callBtn.addEventListener('click', () => {
        if (isMobile) {
            // Open dialer on mobile
            window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
        } else {
            // Show modal on desktop
            callModal.classList.remove('hidden');
            callModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
    });
}

// Close modal handlers
const closeCallModal = () => {
    callModal.classList.add('hidden');
    callModal.classList.remove('flex');
    document.body.style.overflow = '';
};

if (callModalClose) {
    callModalClose.addEventListener('click', closeCallModal);
}

if (callCloseBtn) {
    callCloseBtn.addEventListener('click', closeCallModal);
}

// Close on overlay click
if (callModal) {
    callModal.addEventListener('click', (e) => {
        if (e.target === callModal) {
            closeCallModal();
        }
    });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && callModal && !callModal.classList.contains('hidden')) {
        closeCallModal();
    }
});

// Copy phone number
if (callCopyBtn) {
    callCopyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(phoneNumber);
            const originalText = callCopyBtn.textContent;
            callCopyBtn.textContent = 'Copied!';
            callCopyBtn.classList.add('bg-green-600');
            setTimeout(() => {
                callCopyBtn.textContent = originalText;
                callCopyBtn.classList.remove('bg-green-600');
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = phoneNumber;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                const originalText = callCopyBtn.textContent;
                callCopyBtn.textContent = 'Copied!';
                callCopyBtn.classList.add('bg-green-600');
                setTimeout(() => {
                    callCopyBtn.textContent = originalText;
                    callCopyBtn.classList.remove('bg-green-600');
                }, 2000);
            } catch (fallbackErr) {
                alert('Failed to copy. Phone number: ' + phoneNumber);
            }
            document.body.removeChild(textArea);
        }
    });
}

// ============================================
// PORTFOLIO MODAL HANDLING
// ============================================

const portfolioModal = document.getElementById('portfolio-modal-container');
const portfolioModalClose = document.getElementById('portfolio-modal-close');
const portfolioModalOverlay = document.getElementById('portfolio-modal-overlay');

if (portfolioModalClose) {
    portfolioModalClose.addEventListener('click', () => {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (portfolioModalOverlay) {
    portfolioModalOverlay.addEventListener('click', () => {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && portfolioModal && portfolioModal.classList.contains('active')) {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const emailInput = contactForm.querySelector('#email');
    const projectTypeSelect = contactForm.querySelector('#project-type');
    const messageTextarea = contactForm.querySelector('#message');
    const submitBtn = contactForm.querySelector('button[type="submit"][data-form-btn]');
    
    // Function to validate form and enable/disable submit button
    function validateForm() {
        if (!submitBtn) return;
        
        const isEmailValid = emailInput && emailInput.value.trim() !== '' && emailInput.checkValidity();
        const hasProjectType = projectTypeSelect && projectTypeSelect.value !== '';
        const hasMessage = messageTextarea && messageTextarea.value.trim().length > 0;
        
        submitBtn.disabled = !(isEmailValid && hasProjectType && hasMessage);
    }
    
    // Add event listeners to form inputs
    if (emailInput) {
        emailInput.addEventListener('input', validateForm);
        emailInput.addEventListener('change', validateForm);
    }
    
    if (projectTypeSelect) {
        projectTypeSelect.addEventListener('change', validateForm);
    }
    
    if (messageTextarea) {
        messageTextarea.addEventListener('input', validateForm);
        messageTextarea.addEventListener('change', validateForm);
    }
    
    // Initial validation (button should be disabled by default)
    validateForm();
    
    // Handle form submission
    contactForm.addEventListener('submit', (e) => {
        // Form will submit to Formspree
        // You can add custom validation or loading states here
        if (submitBtn) {
            submitBtn.disabled = true;
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="material-symbols-outlined">send</span>Sending...';
            
            // Re-enable after a delay (Formspree will handle the actual submission)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHTML;
                validateForm(); // Re-validate to restore proper disabled state
            }, 3000);
        }
    });
}

// ============================================
// PORTFOLIO FILTER BUTTONS
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // The actual filtering is handled by portfolio.js
        // This just updates the UI state
    });
});

// ============================================
// INITIALIZATION
// ============================================

// ============================================
// SKILLS TOGGLE (View more / Show less)
// ============================================

// Skills section now uses scrollable panel - no toggle needed

// ============================================
// TOOLS SLIDER NAVIGATION
// ============================================

const toolsSliderContainer = document.querySelector('.tools-slider-container');
const toolsSliderLeft = document.querySelector('.tools-slider-left');
const toolsSliderRight = document.querySelector('.tools-slider-right');

if (toolsSliderContainer && toolsSliderLeft && toolsSliderRight) {
    const updateToolsButtons = () => {
        const scrollLeft = toolsSliderContainer.scrollLeft;
        const scrollWidth = toolsSliderContainer.scrollWidth;
        const clientWidth = toolsSliderContainer.clientWidth;
        
        toolsSliderLeft.disabled = scrollLeft <= 0;
        toolsSliderRight.disabled = scrollLeft >= scrollWidth - clientWidth - 10;
    };
    
    updateToolsButtons();
    toolsSliderContainer.addEventListener('scroll', updateToolsButtons);
    
    toolsSliderLeft.addEventListener('click', () => {
        toolsSliderContainer.scrollBy({ left: -120, behavior: 'smooth' });
    });
    
    toolsSliderRight.addEventListener('click', () => {
        toolsSliderContainer.scrollBy({ left: 120, behavior: 'smooth' });
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized');
    
    // Set first filter button as active
    const firstFilter = document.querySelector('.filter-btn[data-filter="all"]');
    if (firstFilter) {
        firstFilter.classList.add('active');
    }
});
