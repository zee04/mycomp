// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Mobile dropdown toggle
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            this.classList.toggle('active');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 25px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.05)';
    }
});

// Parallax effect for vegetable chopping section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxImage = document.querySelector('.parallax-image');
    const shapes = document.querySelectorAll('.shape');
    
    // Parallax effect for vegetable chopping image
    if (parallaxImage) {
        const speed = 0.5;
        parallaxImage.style.transform = `translateY(${scrolled * speed}px)`;
    }
    
    // Parallax effect for hero shapes
    shapes.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Smooth scrolling for anchor links
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

// Contact form handling with Formspree integration
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Basic form validation
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Submit to Formspree
            const response = await fetch('https://formspree.io/f/mrblwabz', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success popup
                showSuccessPopup();
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            alert('There was an error sending your message. Please try again.');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Success popup functionality
function showSuccessPopup() {
    // Create popup elements if they don't exist
    let popup = document.querySelector('.success-popup');
    let backdrop = document.querySelector('.popup-backdrop');
    
    if (!popup) {
        // Create backdrop
        backdrop = document.createElement('div');
        backdrop.className = 'popup-backdrop';
        document.body.appendChild(backdrop);
        
        // Create popup
        popup = document.createElement('div');
        popup.className = 'success-popup';
        popup.innerHTML = `
            <h3>Thank You!</h3>
            <p>Thanks for checking us out, we will be in touch with you very soon!</p>
            <button class="close-popup">Close</button>
        `;
        document.body.appendChild(popup);
        
        // Add close functionality
        const closeBtn = popup.querySelector('.close-popup');
        closeBtn.addEventListener('click', hideSuccessPopup);
        backdrop.addEventListener('click', hideSuccessPopup);
    }
    
    // Show popup
    setTimeout(() => {
        backdrop.classList.add('show');
        popup.classList.add('show');
    }, 100);
}

function hideSuccessPopup() {
    const popup = document.querySelector('.success-popup');
    const backdrop = document.querySelector('.popup-backdrop');
    
    if (popup && backdrop) {
        popup.classList.remove('show');
        backdrop.classList.remove('show');
    }
}

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    .chopping-animation {
        animation: subtleFloat 4s ease-in-out infinite;
    }
    
    @keyframes subtleFloat {
        0%, 100% {
            transform: translateY(0px) scale(1);
        }
        50% {
            transform: translateY(-5px) scale(1.02);
        }
    }
`;
document.head.appendChild(style);

// Add typing effect to hero title
function typeWriter(element, text, speed = 150) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 100);
        }, 800);
    }
});

// Add scroll progress indicator
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #8B4513, #CD853F);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        indicator.style.width = scrollPercent + '%';
    });
}

// Initialize scroll indicator
createScrollIndicator();

// Add click ripple effect to buttons
function addRippleEffect() {
    document.querySelectorAll('.cta-button, .contact-button, .close-popup').forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize ripple effect
addRippleEffect();

// Enhanced parallax effects
function enhancedParallax() {
    const parallaxElements = document.querySelectorAll('[data-speed]');
    const scrollTop = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Throttle scroll events for better performance
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(enhancedParallax);
        ticking = true;
        setTimeout(() => {
            ticking = false;
        }, 16);
    }
}

window.addEventListener('scroll', requestTick);

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth transitions to all elements
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '1';
    
    // Initialize enhanced animations
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
            element.classList.add('animate-fade-in');
        });
    }, 500);
});
