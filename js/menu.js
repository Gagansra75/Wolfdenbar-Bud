// Menu Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll to sections
    initSmoothScroll();
    
    // Highlight active category on scroll
    highlightActiveCategory();
    
    // Animate menu items on scroll
    animateMenuItems();
    
    // Add special effects to featured items
    addFeaturedEffects();
});

// Smooth scroll for category navigation
function initSmoothScroll() {
    const categoryLinks = document.querySelectorAll('.category-link');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for sticky header
                const headerOffset = 180; // Account for both headers
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Highlight active category based on scroll position
function highlightActiveCategory() {
    const sections = document.querySelectorAll('.menu-section');
    const categoryLinks = document.querySelectorAll('.category-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });
        
        categoryLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animate menu items when they come into view
function animateMenuItems() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.5s ease ${(index % 12) * 0.05}s`;
        observer.observe(item);
    });
}

// Add special effects to featured items
function addFeaturedEffects() {
    const featuredItems = document.querySelectorAll('.menu-item.featured');
    
    featuredItems.forEach(item => {
        // Add shimmer effect on hover
        item.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.featured-badge');
            if (badge) {
                badge.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.featured-badge');
            if (badge) {
                badge.style.transform = 'scale(1)';
            }
        });
    });
}

// Add pulse effect to section icons
const sectionIcons = document.querySelectorAll('.section-icon');
const iconObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'bounce 2s ease-in-out infinite';
        }
    });
}, {
    threshold: 0.5
});

sectionIcons.forEach(icon => {
    iconObserver.observe(icon);
});

// Search functionality (optional enhancement)
function addSearchFeature() {
    const searchInput = document.getElementById('menu-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            const itemName = item.querySelector('h3').textContent.toLowerCase();
            const itemDesc = item.querySelector('.item-description')?.textContent.toLowerCase() || '';
            
            if (itemName.includes(searchTerm) || itemDesc.includes(searchTerm)) {
                item.style.display = 'block';
                
                // Highlight matching text
                if (searchTerm) {
                    item.style.border = '2px solid #ff8a00';
                } else {
                    item.style.border = '2px solid transparent';
                }
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Price formatting (ensure consistency)
function formatPrices() {
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        let text = price.textContent;
        // Ensure dollar signs are present
        if (!text.includes('$')) {
            price.textContent = '$' + text;
        }
    });
}

// Call price formatting on load
formatPrices();

// Console easter egg
console.log('%c🐺 THE WOLF DEN MENU 🐺', 'font-size: 24px; font-weight: bold; color: #1e3a5f; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🍕 Fresh Pizzas | 🍔 Juicy Burgers | 🍗 Crispy Wings', 'font-size: 14px; color: #ff8a00;');
console.log('%cOrder online or visit us at 501 Ralston Street, Reno, NV 89503', 'font-size: 12px; color: #666;');

// Add keyboard navigation for category links
document.addEventListener('keydown', function(e) {
    const categoryLinks = Array.from(document.querySelectorAll('.category-link'));
    const activeLink = document.querySelector('.category-link.active');
    
    if (!activeLink) return;
    
    const currentIndex = categoryLinks.indexOf(activeLink);
    
    // Arrow right - next category
    if (e.key === 'ArrowRight' && currentIndex < categoryLinks.length - 1) {
        e.preventDefault();
        categoryLinks[currentIndex + 1].click();
        categoryLinks[currentIndex + 1].focus();
    }
    
    // Arrow left - previous category
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        categoryLinks[currentIndex - 1].click();
        categoryLinks[currentIndex - 1].focus();
    }
});

// Track most viewed items (analytics placeholder)
function trackItemViews() {
    const menuItems = document.querySelectorAll('.menu-item');
    const viewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const itemName = entry.target.querySelector('h3')?.textContent;
                // In production, send to analytics
                console.log('Viewed:', itemName);
            }
        });
    }, {
        threshold: 0.8
    });
    
    menuItems.forEach(item => {
        viewObserver.observe(item);
    });
}

// Initialize tracking (optional)
// trackItemViews();
