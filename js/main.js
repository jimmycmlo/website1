/*
 * Seapines AI - Main JavaScript
 * Author: Seapines AI Team
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Handle loader
    const loader = document.querySelector('.loader-container');
    
    if (loader) {
        // Hide loader after page is fully loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 500); // Short delay for smoother transition
        });
        
        // Fallback to hide loader if load event doesn't fire
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 2000);
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    let scrollPosition = window.scrollY;
    
    function handleScroll() {
        scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if not a "#" link
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                    }
                    
                    // Calculate header height for offset
                    const headerHeight = header.offsetHeight;
                    
                    // Scroll to element with offset for fixed header
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Simple validation before allowing Formspree submission
            let isValid = true;
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            const requiredFields = ['name', 'email', 'message'];
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!formValues[field] || formValues[field].trim() === '') {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            // Prevent submission only if validation fails
            if (!isValid) {
                e.preventDefault();
                console.log('Form validation failed');
            } else {
                // Form is valid, let Formspree handle the submission
                console.log('Form validated, submitting to Formspree');
                // The form will naturally submit to Formspree
            }
        });
    }
    
    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.solution-card, .tech-item, .team-member, .stat-box');
    
    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Add visible class to elements
    window.addEventListener('scroll', checkIfInView);
    
    // Check on initial load
    checkIfInView();
    
    // Update copyright year
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.textContent = copyrightYear.textContent.replace('2023', currentYear);
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const isActive = this.classList.contains('active');
                
                // Close all other answers
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = null;
                });
                
                // Toggle current answer
                if (!isActive) {
                    this.classList.add('active');
                    answer.style.maxHeight = (answer.scrollHeight + 100) + 'px';
                }
            });
        });
        
        // Open the first FAQ item by default
        faqQuestions[0].click();
    }
}); 