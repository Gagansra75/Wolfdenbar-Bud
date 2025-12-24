// ===================================
// Mobile Menu Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // ===================================
    // Slideshow Functionality
    // ===================================
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slide-nav.prev');
    const nextBtn = document.querySelector('.slide-nav.next');
    const dotsContainer = document.querySelector('.slide-dots');
    
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slide-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slide-dot');

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            if (n >= slides.length) currentSlide = 0;
            if (n < 0) currentSlide = slides.length - 1;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            currentSlide++;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide--;
            showSlide(currentSlide);
        }

        function goToSlide(n) {
            currentSlide = n;
            showSlide(currentSlide);
            resetInterval();
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        // Auto-play slideshow
        slideInterval = setInterval(nextSlide, 5000);

        // Pause on hover
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });

            slideshowContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }

    // ===================================
    // Reviews Carousel
    // ===================================
    const reviews = document.querySelectorAll('.review-item');
    const reviewPrevBtn = document.querySelector('.review-nav.prev');
    const reviewNextBtn = document.querySelector('.review-nav.next');
    
    let currentReview = 0;
    let reviewInterval;

    if (reviews.length > 0) {
        function showReview(n) {
            reviews.forEach(review => review.classList.remove('active'));
            
            if (n >= reviews.length) currentReview = 0;
            if (n < 0) currentReview = reviews.length - 1;
            
            reviews[currentReview].classList.add('active');
        }

        function nextReview() {
            currentReview++;
            showReview(currentReview);
        }

        function prevReview() {
            currentReview--;
            showReview(currentReview);
        }

        function resetReviewInterval() {
            clearInterval(reviewInterval);
            reviewInterval = setInterval(nextReview, 6000);
        }

        // Event listeners
        if (reviewNextBtn) reviewNextBtn.addEventListener('click', () => {
            nextReview();
            resetReviewInterval();
        });

        if (reviewPrevBtn) reviewPrevBtn.addEventListener('click', () => {
            prevReview();
            resetReviewInterval();
        });

        // Auto-play reviews
        reviewInterval = setInterval(nextReview, 6000);

        // Pause on hover
        const reviewsCarousel = document.querySelector('.reviews-carousel');
        if (reviewsCarousel) {
            reviewsCarousel.addEventListener('mouseenter', () => {
                clearInterval(reviewInterval);
            });

            reviewsCarousel.addEventListener('mouseleave', () => {
                reviewInterval = setInterval(nextReview, 6000);
            });
        }
    }

    // ===================================
    // Newsletter Form Submission
    // ===================================
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to your backend
            // For now, we'll just show a success message
            alert('Thank you for subscribing! We\'ll keep you updated with our latest offers and events.');
            
            // Reset form
            this.reset();
        });
    }

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Lazy Loading Images
    // ===================================
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ===================================
    // Scroll Animation for Sections
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add animation styles to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    // Make hero section immediately visible
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }

    // ===================================
    // Gallery Item Hover Effect
    // ===================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });

        // Add click event for lightbox
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const imgSrc = img.getAttribute('src');
            openLightbox(imgSrc);
        });
    });

    // ===================================
    // Lightbox for Gallery Images
    // ===================================
    function openLightbox(imageSrc) {
        // Create lightbox if it doesn't exist
        let lightbox = document.getElementById('lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const img = document.createElement('img');
            img.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
            `;
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 30px;
                background: transparent;
                border: none;
                color: white;
                font-size: 60px;
                cursor: pointer;
                transition: transform 0.3s ease;
            `;
            closeBtn.onmouseover = () => closeBtn.style.transform = 'scale(1.2)';
            closeBtn.onmouseout = () => closeBtn.style.transform = 'scale(1)';
            
            lightbox.appendChild(img);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);
            
            // Close lightbox on click
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target === closeBtn) {
                    closeLightbox();
                }
            });
            
            // Close lightbox on ESC key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                    closeLightbox();
                }
            });
        }
        
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.src = imageSrc;
        lightbox.style.display = 'flex';
        
        // Trigger animation
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        }
    }

    // ===================================
    // Video Controls
    // ===================================
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        // Ensure video plays on mobile devices
        heroVideo.play().catch(error => {
            console.log('Video autoplay failed:', error);
        });

        // Pause video when not in viewport to save resources
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play();
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.5 });

        videoObserver.observe(heroVideo);
    }

    // ===================================
    // Header Scroll Effect
    // ===================================
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.padding = '0';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // Form Validation Enhancement
    // ===================================
    const emailInput = document.querySelector('input[type="email"]');
    
    if (emailInput) {
        emailInput.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.setCustomValidity('Please enter a valid email address.');
        });

        emailInput.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    }

    // ===================================
    // Accessibility: Keyboard Navigation
    // ===================================
    document.addEventListener('keydown', function(e) {
        // Allow ESC key to close mobile menu
        if (e.key === 'Escape') {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }

        // Arrow keys for slideshow navigation
        if (e.key === 'ArrowLeft' && slides.length > 0) {
            prevSlide();
            resetInterval();
        }
        if (e.key === 'ArrowRight' && slides.length > 0) {
            nextSlide();
            resetInterval();
        }
    });

    // ===================================
    // Performance: Debounce Scroll Events
    // ===================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll-heavy operations
    const debouncedScrollHandler = debounce(() => {
        // Any scroll-heavy operations can go here
    }, 100);

    window.addEventListener('scroll', debouncedScrollHandler);

    console.log('Wolf Den Bar & Grill website loaded successfully!');
});
