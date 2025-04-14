// Navigation functionality for mobile
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Toggle navigation
    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('nav-active');
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger animation
        burger.classList.toggle('toggle');
    });
};

// Smooth scrolling for navigation links
const smoothScroll = () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Offset for the fixed navbar
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const nav = document.querySelector('.nav-links');
                const burger = document.querySelector('.burger');
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    // Reset animations
                    document.querySelectorAll('.nav-links li').forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
};

// Stats animation
const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    // Function to animate counting up
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const count = +element.innerText;
        const increment = target / 100; // Speed of count animation
        
        if (count < target) {
            element.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(element), 20);
        } else {
            element.innerText = target;
        }
    };
    
    // Start animation when scrolled into view
    const handleScroll = () => {
        statNumbers.forEach(statNumber => {
            if (isInViewport(statNumber) && statNumber.innerText === '0') {
                countUp(statNumber);
            }
        });
    };
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Initial check on page load
    handleScroll();
};

// Intersection Observer for fade-in animations
const setupFadeInObserver = () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.2,
        rootMargin: '0px'
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
};

// Sticky navigation
const stickyNav = () => {
    const navbar = document.getElementById('navbar');
    const sticky = navbar.offsetTop;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > sticky) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
};

// Initialize all functions on page load
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    smoothScroll();
    animateStats();
    setupFadeInObserver();
    stickyNav();
});