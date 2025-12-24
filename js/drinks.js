// Drinks Page Category Filter
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedCategory = this.getAttribute('data-category');
                
                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter menu categories
                if (selectedCategory === 'all') {
                    // Show all categories
                    menuCategories.forEach(category => {
                        category.classList.remove('hidden');
                        // Fade in animation
                        category.style.opacity = '0';
                        setTimeout(() => {
                            category.style.opacity = '1';
                        }, 100);
                    });
                } else {
                    // Show only selected category
                    menuCategories.forEach(category => {
                        const categoryType = category.getAttribute('data-category');
                        if (categoryType === selectedCategory) {
                            category.classList.remove('hidden');
                            // Fade in animation
                            category.style.opacity = '0';
                            setTimeout(() => {
                                category.style.opacity = '1';
                            }, 100);
                        } else {
                            category.classList.add('hidden');
                        }
                    });
                }
                
                // Smooth scroll to drinks menu section
                const drinksMenuSection = document.querySelector('.drinks-menu-section');
                if (drinksMenuSection) {
                    const headerOffset = 150;
                    const elementPosition = drinksMenuSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Animate drink items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const drinkItemObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                drinkItemObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply animation to drink items
    const drinkItems = document.querySelectorAll('.drink-item');
    drinkItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        drinkItemObserver.observe(item);
    });
    
    // Add featured badge animation
    const featuredItems = document.querySelectorAll('.drink-item.featured');
    featuredItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
    
    console.log('Drinks menu loaded successfully!');
});
