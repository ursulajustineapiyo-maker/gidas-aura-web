// Initialize Lucide Icons
lucide.createIcons();

// tsParticles starfield background
tsParticles.load("tsparticles", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                area: 800
            }
        },
        color: {
            value: ["#ffffff", "#1E90FF", "#F5A623", "#ffcc00"]
        },
        shape: {
            type: "star"
        },
        opacity: {
            value: { min: 0.1, max: 0.8 },
            animation: {
                enable: true,
                speed: 1,
                sync: false
            }
        },
        size: {
            value: { min: 1, max: 4 },
            random: true,
            animation: {
                enable: true,
                speed: 3,
                sync: false
            }
        },
        move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
                default: "out"
            }
        }
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "bubble"
            }
        },
        modes: {
            bubble: {
                distance: 200,
                duration: 2,
                size: 6,
                opacity: 0.8
            }
        }
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation (Simple AOS alternative)
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight / 5 * 4;

    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;

        if (revealTop < triggerBottom) {
            reveal.classList.add('active');
        } else {
            // Optional: remove to keep visible after scroll up
            // reveal.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger once on load

// Testimonial Carousel Auto-Scroll
const carousel = document.getElementById('testimonial-carousel');
let scrollAmount = 0;
const step = 2; // Speed

const autoScroll = () => {
    if (carousel) {
        scrollAmount += step;
        if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount = 0;
        }
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'auto'
        });
    }
};

let carouselInterval = setInterval(autoScroll, 50);

carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
carousel.addEventListener('mouseleave', () => carouselInterval = setInterval(autoScroll, 50));

// EmailJS Initialization — Replace with your own keys from emailjs.com
// (1) Sign up at https://emailjs.com
// (2) Create a service (Gmail) and a template
// (3) Replace 'YOUR_PUBLIC_KEY', 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID' below
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';




if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Form Submission Handling
document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnText = document.getElementById('btn-text');
    const submitBtn = document.getElementById('submit-btn');
    const form = e.target;
    
    // Sanitize and Validate Inputs
    const formData = new FormData(form);
    const userName = formData.get('user_name')?.trim();
    const userEmail = formData.get('user_email')?.trim();
    const userPhone = formData.get('user_phone')?.trim();
    const message = formData.get('message')?.trim();

    // 1. Strict Type Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,15}$/; // Standard phone validation
    
    if (!userName || userName.length < 2) {
        alert("Please enter a valid name.");
        return;
    }

    if (!emailRegex.test(userEmail)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!phoneRegex.test(userPhone)) {
        alert("Please enter a valid phone number (digits only).");
        return;
    }

    // 2. Reject potential injection characters (Standard Sanitization)
    const injectionRegex = /[<>"/\\;]/;
    if (injectionRegex.test(userName) || injectionRegex.test(message)) {
        alert("Invalid characters detected in form fields.");
        return;
    }

    // Loading state
    if (btnText) btnText.textContent = 'Sending...';
    if (submitBtn) submitBtn.disabled = true;

    try {
        // Only send via EmailJS if keys are configured
        if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
            await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
        }

        // Trigger Confetti & show success state
        triggerSuccessConfetti();

        const formContainer = document.getElementById('form-wrapper');
        const successMessage = document.getElementById('success-message');
        
        if (formContainer) formContainer.classList.add('hidden');
        if (successMessage) {
            successMessage.classList.remove('hidden');
            // Ensure no innerHTML usage for user feedback if we were to show their name
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

    } catch (error) {
        console.error('Submission error:', error);
        if (btnText) btnText.textContent = 'Error — Try Again';
        if (submitBtn) submitBtn.disabled = false;
    }
});

function triggerSuccessConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Multi-burst
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#0D1B2A', '#FFB800', '#FFFFFF', '#E0E1DD'],
            shapes: ['square', 'circle', 'star']
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#0D1B2A', '#FFB800', '#FFFFFF', '#E0E1DD'],
            shapes: ['square', 'circle', 'star']
        }));
    }, 250);
}

function resetForm() {
    const formContainer = document.getElementById('form-wrapper');
    const successMessage = document.getElementById('success-message');
    const form = document.getElementById('booking-form');

    form.reset();
    successMessage.classList.add('hidden');
    formContainer.classList.remove('hidden');
}

// Attach event listener for the Return to Home button in the success message
document.getElementById('return-home-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    resetForm();
    window.location.hash = '#home';
});

// =============================================
// MOBILE NAVIGATION LOGIC
// =============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.getElementById('nav-overlay');
const navLinksItems = document.querySelectorAll('.nav-links a');

const toggleMenu = () => {
    hamburger.classList.toggle('toggle');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // Lock body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
};

const closeMenu = () => {
    hamburger.classList.remove('toggle');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
};

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
}

navLinksItems.forEach(item => {
    item.addEventListener('click', closeMenu);
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

// =============================================
// SPA NAVIGATION LOGIC (About vs Main View)
// =============================================
const mainView = document.getElementById('main-view');
const aboutUsView = document.getElementById('about-us-view');
const navLinksAnchors = document.querySelectorAll('.nav-links a');

const handleSPA = () => {
    if (!mainView || !aboutUsView) return;
    
    if (window.location.hash === '#about-us') {
        mainView.classList.add('hidden');
        aboutUsView.classList.remove('hidden');
        window.scrollTo(0, 0);
    } else {
        mainView.classList.remove('hidden');
        aboutUsView.classList.add('hidden');
    }
    updateActiveLink(); // Update active state on SPA change
};

window.addEventListener('hashchange', handleSPA);
window.addEventListener('load', handleSPA);

// =============================================
// ACTIVE NAVIGATION LINK LOGIC
// =============================================
function updateActiveLink() {
    const hash = window.location.hash;
    const scrollPos = window.scrollY;
    let activeSection = '';

    // If we are on the About Us "page"
    if (hash === '#about-us') {
        activeSection = '#about-us';
    } else {
        // Find which section is currently in view
        const sections = [
            { id: '#home', offset: document.getElementById('home')?.offsetTop - 100 },
            { id: '#services', offset: document.getElementById('services')?.offsetTop - 100 },
            { id: '#contact', offset: document.getElementById('contact')?.offsetTop - 150 }
        ];

        // Sort by offset descending to find the one we are "inside"
        const current = sections
            .filter(s => s.offset !== undefined && scrollPos >= s.offset)
            .pop();
        
        activeSection = current ? current.id : '#home';
        
        // Special case for footer/bottom to highlight contact
        if ((window.innerHeight + scrollPos) >= document.body.offsetHeight - 50) {
            activeSection = '#contact';
        }
    }

    // Apply active class
    navLinksAnchors.forEach(link => {
        if (link.getAttribute('href') === activeSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Listen for scroll and page events to update navbar
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// =============================================
// ABOUT US / VIDEO CONTROLS LOGIC
// =============================================
function showMainViewAndScrollToContact() {
    window.location.hash = '#contact';
}

// Attach event listener for the About Us CTA button
document.getElementById('about-cta-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    showMainViewAndScrollToContact();
});

function togglePlayPause(videoId, btn) {
    const video = document.getElementById(videoId);
    const playIcon = btn.querySelector('.play-icon');
    const pauseIcon = btn.querySelector('.pause-icon');
    
    if (video.paused) {
        video.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        video.pause();
        pauseIcon.classList.add('hidden');
        playIcon.classList.remove('hidden');
    }
}

function toggleMute(videoId, btn) {
    const video = document.getElementById(videoId);
    const mutedIcon = btn.querySelector('.muted-icon');
    const unmutedIcon = btn.querySelector('.unmuted-icon');
    
    if (video.muted) {
        video.muted = false;
        mutedIcon.classList.add('hidden');
        unmutedIcon.classList.remove('hidden');
    } else {
        video.muted = true;
        unmutedIcon.classList.add('hidden');
        mutedIcon.classList.remove('hidden');
    }
}

// Security: Ensure all external links have noopener noreferrer
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});
