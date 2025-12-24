// Specials Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Animate special cards on scroll
    animateOnScroll();
    
    // Add sparkle effect to happy hour card
    addSparkleEffect();
    
    // Countdown to next happy hour
    updateHappyHourCountdown();
});

// Animate elements when they come into view
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe special cards
    const specialCards = document.querySelectorAll('.special-card');
    specialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe food special items
    const foodItems = document.querySelectorAll('.food-special-item');
    foodItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe announcement items
    const announcements = document.querySelectorAll('.announcement-item');
    announcements.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });
}

// Add sparkle effect to happy hour card
function addSparkleEffect() {
    const happyHourCard = document.querySelector('.happy-hour-card');
    if (!happyHourCard) return;

    // Create sparkle container
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    sparkleContainer.style.position = 'absolute';
    sparkleContainer.style.top = '0';
    sparkleContainer.style.left = '0';
    sparkleContainer.style.width = '100%';
    sparkleContainer.style.height = '100%';
    sparkleContainer.style.pointerEvents = 'none';
    sparkleContainer.style.overflow = 'hidden';
    sparkleContainer.style.zIndex = '2';
    
    happyHourCard.appendChild(sparkleContainer);

    // Create sparkles
    setInterval(() => {
        createSparkle(sparkleContainer);
    }, 800);
}

function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = '✨';
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    sparkle.style.position = 'absolute';
    sparkle.style.left = x + '%';
    sparkle.style.top = y + '%';
    sparkle.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
    sparkle.style.opacity = '0';
    sparkle.style.transition = 'all 1.5s ease-out';
    sparkle.style.pointerEvents = 'none';
    
    container.appendChild(sparkle);
    
    // Trigger animation
    setTimeout(() => {
        sparkle.style.opacity = '1';
        sparkle.style.transform = 'translateY(-50px) scale(1.5)';
    }, 10);
    
    // Remove after animation
    setTimeout(() => {
        sparkle.style.opacity = '0';
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 500);
    }, 1000);
}

// Update happy hour countdown
function updateHappyHourCountdown() {
    const happyHourSection = document.querySelector('.happy-hour-featured');
    if (!happyHourSection) return;

    function checkHappyHourStatus() {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const hours = now.getHours();
        const minutes = now.getMinutes();
        
        // Happy hour is Mon-Thu (1-4), 3pm-6pm (15-18)
        const isHappyHourDay = day >= 1 && day <= 4;
        const isHappyHourTime = hours >= 15 && hours < 18;
        
        // Check if currently during happy hour
        if (isHappyHourDay && isHappyHourTime) {
            addLiveBadge();
        } else {
            removeLiveBadge();
        }
    }

    function addLiveBadge() {
        const badge = document.querySelector('.happy-hour-badge');
        if (badge && !badge.classList.contains('live')) {
            badge.classList.add('live');
            badge.innerHTML = '<span>🔴 LIVE NOW</span>';
            badge.style.background = '#ff0000';
            badge.style.animation = 'pulse 1.5s ease-in-out infinite';
            
            // Add pulse animation CSS if not exists
            if (!document.getElementById('pulse-animation')) {
                const style = document.createElement('style');
                style.id = 'pulse-animation';
                style.textContent = `
                    @keyframes pulse {
                        0%, 100% {
                            transform: scale(1);
                            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
                        }
                        50% {
                            transform: scale(1.05);
                            box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    function removeLiveBadge() {
        const badge = document.querySelector('.happy-hour-badge');
        if (badge && badge.classList.contains('live')) {
            badge.classList.remove('live');
            badge.innerHTML = '<span>Featured Deal</span>';
            badge.style.background = 'rgba(255,255,255,0.3)';
            badge.style.animation = 'none';
        }
    }

    // Check immediately
    checkHappyHourStatus();
    
    // Check every minute
    setInterval(checkHappyHourStatus, 60000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover sound effect (optional - can be removed if not desired)
const specialCards = document.querySelectorAll('.special-card:not(.closed)');
specialCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add scale effect
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Food items hover effect
const foodItems = document.querySelectorAll('.food-special-item');
foodItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.food-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.food-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Add floating animation to beer icons
const beerIcons = document.querySelectorAll('.beer-icon-left, .beer-icon-right');
beerIcons.forEach(icon => {
    icon.style.transition = 'transform 0.3s ease';
});

// Console easter egg
console.log('%c🍺 THE WOLF DEN 🍺', 'font-size: 24px; font-weight: bold; color: #ff8a00; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%cHappy Hour: Mon-Thu 3pm-6pm | $2 OFF Draft Beers & Select Cocktails!', 'font-size: 14px; color: #1e3a5f;');
console.log('%cVisit us at 501 Ralston Street, Reno, NV 89503', 'font-size: 12px; color: #666;');
