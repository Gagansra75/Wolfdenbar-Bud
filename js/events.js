// Events Page Interactive Features - DJ Trivia Night

document.addEventListener('DOMContentLoaded', function() {
    // Initialize trivia-themed animations
    initTriviaAnimations();
    
    // Animate elements on scroll
    animateOnScroll();
    
    // Game card interactions
    initGameCards();
    
    // Offer card effects
    initOfferCards();
    
    // Initialize countdown to next Friday
    initNextFridayCountdown();
});

// Countdown to Next Friday Trivia
function initNextFridayCountdown() {
    function getNextFriday() {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
        const nextFriday = new Date(now);
        nextFriday.setDate(now.getDate() + daysUntilFriday);
        nextFriday.setHours(17, 0, 0, 0); // 5:00 PM
        return nextFriday;
    }
    
    const nextFriday = getNextFriday();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = nextFriday.getTime() - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            if (days > 0) {
                console.log(`🎤 Next DJ Trivia in: ${days} day${days > 1 ? 's' : ''} ${hours}h ${minutes}m`);
            } else {
                console.log(`🎤 DJ Trivia starts in: ${hours}h ${minutes}m! 🎯`);
            }
        } else {
            console.log('🎤 DJ Trivia Night is LIVE NOW! 🎯');
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// Trivia-themed Canvas Animations
function initTriviaAnimations() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector('.christmas-hero').offsetHeight;
    
    const particles = [];
    
    // Trivia-themed colors (vibrant and fun)
    const colors = [
        '#FFD700', // Gold
        '#FF6B35', // Orange
        '#4CAF50', // Green
        '#2196F3', // Blue
        '#E91E63', // Pink
        '#9C27B0', // Purple
        '#00BCD4', // Cyan
        '#FFC107', // Amber
        '#f7b731', // Yellow
        '#5f27cd'  // Deep Purple
    ];
    
    // Question mark and music note particles
    class TriviaParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 20 + 10;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.symbol = Math.random() > 0.5 ? '?' : '♪';
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = Math.random() * 0.05 - 0.025;
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.font = `bold ${this.size}px Arial`;
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.symbol, 0, 0);
            ctx.restore();
        }
    }
    
    // Create particles
    for (let i = 0; i < 25; i++) {
        particles.push(new TriviaParticle());
    }
    
    // Glowing orbs
    class GlowOrb {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 3 + 2;
            this.speedX = Math.random() * 1.5 - 0.75;
            this.speedY = Math.random() * 1.5 - 0.75;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.pulseSpeed = Math.random() * 0.05 + 0.02;
            this.pulsePhase = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulsePhase += this.pulseSpeed;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius * (1 + pulse)
            );
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'transparent');
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * (1 + pulse), 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.globalAlpha = 0.6 + pulse * 0.4;
            ctx.fill();
        }
    }
    
    // Add glowing orbs
    for (let i = 0; i < 40; i++) {
        particles.push(new GlowOrb());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
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
        trackEventInteraction('click', 'reserve_trivia_event');
    });
});

// Call button tracking
const callButtons = document.querySelectorAll('.btn-call');
callButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        trackEventInteraction('click', 'call_trivia_event');
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
    const hasSeenNotification = sessionStorage.getItem('triviaEventNotification');
    
    if (!hasSeenNotification) {
        console.log('🎤 Join us for DJ Trivia Night every Friday! 🎯');
        sessionStorage.setItem('triviaEventNotification', 'true');
    }
}

showWelcomeNotification();

// Console easter egg
console.log('%c🎤 DJ TRIVIA NIGHT 🎯', 'font-size: 24px; font-weight: bold; color: #8e24aa; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🎵 Every Friday | 5PM - 7PM', 'font-size: 16px; color: #ff6b35; font-weight: bold;');
console.log('%cTest Your Knowledge, Win Prizes & Have Fun!', 'font-size: 14px; color: #ffd700; font-weight: bold;');
console.log('%cThe Wolf Den Bar & Grill - 501 Ralston Street, Reno, NV', 'font-size: 12px; color: #666;');

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

// Add time-sensitive messaging for next Friday
function addNextFridayMessage() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    
    if (dayOfWeek === 5) { // Friday
        const currentHour = now.getHours();
        if (currentHour < 17) {
            console.log('🎤 DJ Trivia Night TONIGHT at 5PM! See you there! 🎯');
        } else if (currentHour >= 17 && currentHour < 19) {
            console.log('🎤 DJ Trivia Night is LIVE NOW! 🎯');
        }
    } else {
        const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
        console.log(`Only ${daysUntilFriday} days until DJ Trivia Night!`);
    }
}

addNextFridayMessage();
