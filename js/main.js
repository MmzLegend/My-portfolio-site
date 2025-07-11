document.addEventListener('DOMContentLoaded', function() {
    try {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }

    } catch (error) {
        console.error("Menu Error:", error);
    }
});
    
    // Dropdown Toggle for Mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Change button text and disable it
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Message sent successfully!');
                    this.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                alert('There was a problem sending your message. Please try again later.');
                console.error('Error:', error);
            })
            .finally(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            });
        });
    }
    
    // Add animation class when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .about-image, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
;
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Handle dropdowns on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
});
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const rect = dropdown.getBoundingClientRect();
    if (rect.right + 200 > window.innerWidth) {
        dropdown.classList.add('right-edge');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    function adjustDropdownPositions() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            // Reset any previous adjustments
            dropdown.classList.remove('right-edge');
            
            // Only calculate for desktop view
            if (window.innerWidth > 768) {
                const dropdownRect = dropdown.getBoundingClientRect();
                const menuWidth = 200; // Same as min-width
                
                // Check if dropdown would go off-screen
                if (dropdownRect.left + menuWidth > window.innerWidth) {
                    dropdown.classList.add('right-edge');
                }
            }
        });
    }
    
    // Run initially and on window resize
    adjustDropdownPositions();
    window.addEventListener('resize', adjustDropdownPositions);
});
document.addEventListener('DOMContentLoaded', function() {
    const firstVideo = document.querySelector('.video-container iframe:first-of-type');
    const secondVideo = document.querySelector('.video-container iframe:last-of-type');
    
    // YouTube iframes need special handling for detecting when they end
    // You'll need to use the YouTube IFrame API for proper detection
    // This is a simplified version that may need adjustment
    
    // For demo purposes, we'll just show the basic structure
    firstVideo.addEventListener('load', function() {
        // This would need YouTube API implementation to properly detect end
        console.log("First video loaded - would need YouTube API for end detection");
    });
    
    // You would need to implement proper YouTube API handling here
    // See: https://developers.google.com/youtube/iframe_api_reference
});