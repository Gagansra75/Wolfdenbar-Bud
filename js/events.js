// Events Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Countdown to New Year's Eve
    initNewYearsCountdown();
    
    // Initialize animated fireworks
    initFireworks();
    
    // Animate elements on scroll
    animateOnScroll();
    
    // Game card interactions
    initGameCards();
    
    // Offer card effects
    initOfferCards();
});

// Countdown to New Year's Eve Event
function initNewYearsCountdown() {
    const newYearsEve = new Date('December 31, 2025 19:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = newYearsEve - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // You can add a countdown display if desired
            console.log(`New Year's Eve Party in: ${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
            console.log('🎉 Happy New Year! Ring in 2026 at The Wolf Den! 🎉');
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Animated Fireworks Effect
function initFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('.christmas-hero').offsetHeight;
    
    const fireworks = [];
    const particles = [];
    
    // Firework colors
    const colors = [
        '#FFD700', // Gold
        '#FF6B35', // Orange
        '#4CAF50', // Green
        '#2196F3', // Blue
        '#E91E63', // Pink
        '#9C27B0', // Purple
        '#00BCD4', // Cyan
        '#FFC107'  // Amber
    ];
    
    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * (canvas.height * 0.4) + 50;
            this.speed = Math.random() * 3 + 4;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.exploded = false;
        }
        
        update() {
            if (!this.exploded) {
                this.y -= this.speed;
                if (this.y <= this.targetY) {
                    this.explode();
                }
            }
        }
        
        draw() {
            if (!this.exploded) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }
        
        explode() {
            this.exploded = true;
            const particleCount = Math.random() * 50 + 50;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
        }
    }
    
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.015;
            this.gravity = 0.1;
            this.size = Math.random() * 3 + 2;
        }
        
        update() {
            this.vx *= 0.98;
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 46, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add new fireworks randomly
        if (Math.random() < 0.05) {
            fireworks.push(new Firework());
        }
        
        // Update and draw fireworks
        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();
            if (fireworks[i].exploded) {
                fireworks.splice(i, 1);
            }
        }
        
        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = document.querySelector('.christmas-hero').offsetHeight;
    });
}

// Animate elements when scrolled into view
function animateOnScroll() {
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
    
    // Animate offer cards
    const offerCards = document.querySelectorAll('.offer-card');
    offerCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Animate game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Game card interactions
function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Highlight effect
            this.style.transform = 'translateX(15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// Offer card sparkle effects
function initOfferCards() {
    const offerCards = document.querySelectorAll('.offer-card');
    
    offerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
}

function createSparkles(element) {
    const sparkleCount = 5;
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.animation = 'sparkle-fade 1s ease-out forwards';
            sparkle.style.zIndex = '10';
            
            element.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }, i * 100);
    }
}

// Add sparkle animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle-fade {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0.5);
        }
        100% {
            opacity: 0;
            transform: translateY(-30px) scale(1.5);
        }
    }
`;
document.head.appendChild(style);

// Highlight current time games
function highlightCurrentGames() {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Convert to PT time (rough approximation for demo)
    // In production, use proper timezone conversion
    
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        const timeText = card.querySelector('.game-time').textContent;
        // Parse game time and highlight if current
        // This is a placeholder - implement proper time checking
    });
}

// Track event interactions
function trackEventInteraction(action, label) {
    console.log('Event Interaction:', action, label);
    // In production, send to analytics
}

// Reserve button tracking
const reserveButtons = document.querySelectorAll('.btn-reserve');
reserveButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        trackEventInteraction('click', 'reserve_christmas_event');
    });
});

// Call button tracking
const callButtons = document.querySelectorAll('.btn-call');
callButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        trackEventInteraction('click', 'call_christmas_event');
    });
});

// Smooth scroll for internal links
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

// Show special notification on page load
function showWelcomeNotification() {
    const hasSeenNotification = sessionStorage.getItem('christmasEventNotification');
    
    if (!hasSeenNotification) {
        // You can add a modal or toast notification here
        console.log('🎅 Welcome to our Christmas Day Sports Party! 🎄');
        sessionStorage.setItem('christmasEventNotification', 'true');
    }
}

showWelcomeNotification();

// Console easter egg
console.log('%c🎄 CHRISTMAS DAY SPORTS PARTY 🏀🏈', 'font-size: 24px; font-weight: bold; color: #c41e3a; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🎅 December 25th | 9AM - 10:30PM', 'font-size: 16px; color: #165b33; font-weight: bold;');
console.log('%c$2 OFF All Drinks & Food | 15% OFF Bills Over $100', 'font-size: 14px; color: #ffd700; font-weight: bold;');
console.log('%cThe Wolf Den Bar & Grill - 501 Ralston Street, Reno, NV', 'font-size: 12px; color: #666;');

// Add snow effect (optional)
function createSnowEffect() {
    const snowContainer = document.querySelector('.hero-snow');
    if (!snowContainer) return;
    
    // Snow effect is already in CSS, but you could add more dynamic snow here
}

// Pulse animation for mega deal
const megaDeal = document.querySelector('.offer-card.mega');
if (megaDeal) {
    setInterval(() => {
        megaDeal.style.animation = 'none';
        setTimeout(() => {
            megaDeal.style.animation = '';
        }, 10);
    }, 5000);
}

// Add time-sensitive messaging
function addTimeMessage() {
    const now = new Date();
    const christmasDay = new Date('December 25, 2025');
    const daysUntil = Math.ceil((christmasDay - now) / (1000 * 60 * 60 * 24));
    
    if (daysUntil > 0 && daysUntil <= 7) {
        console.log(`Only ${daysUntil} days until our Christmas Sports Party!`);
    } else if (daysUntil === 0) {
        console.log('🎉 TODAY IS THE DAY! See you at The Wolf Den! 🎉');
    }
}

addTimeMessage();
