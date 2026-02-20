window.addEventListener('load', function () {
    const loaderWrapper = document.getElementById('loader-wrapper');

    // Wait 2 seconds, then fade out
    setTimeout(() => {
        loaderWrapper.style.transition = 'opacity 0.5s ease';
        loaderWrapper.style.opacity = '0';
        
        // Wait for the fade to finish before removing it and unlocking scroll
        setTimeout(() => {
            loaderWrapper.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling!
        }, 500); 
    }, 2000); 
});

// Typewriter Effect for Hero Section
const roles = ["Web Developer.", "Community Builder.", "Problem Solver." ];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");


// --- Mobile Navbar Toggle ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    // Toggle the active class on both the hamburger and the nav menu
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close the mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at the end of the word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
}

// Start typing effect
document.addEventListener("DOMContentLoaded", () => {
    if(typewriterElement) type();
});

// Subtle Particles Background
particlesJS("particles-js", {
    particles: {
        number: { value: 40, density: { enable: true, value_area: 800 } },
        color: { value: "#C9FF6A" }, // Acid Matcha color
        shape: { type: "circle" },
        opacity: { value: 0.2, random: true },
        size: { value: 2, random: true },
        line_linked: { enable: false }, // Removed lines for a cleaner, star-like minimal look
        move: { enable: true, speed: 0.5, direction: "top", random: true, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "bubble" },
            onclick: { enable: false },
            resize: true
        },
        modes: {
            bubble: { distance: 200, size: 4, duration: 2, opacity: 0.8, speed: 3 }
        }
    },
    retina_detect: true
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
});

// --- Interactive 3D Mouse Tilt Effect ---
const tiltElements = document.querySelectorAll('.hero-image-wrapper, .skill-category');
    
tiltElements.forEach(el => {
    el.classList.add('tilt-element');

    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; 
        const rotateY = ((x - centerX) / centerX) * 10;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.transition = 'transform 0.1s ease-out';
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        el.style.transition = 'transform 0.5s ease-out';
    });
});

// --- Unified Contact Form UX & Submission ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        btn.textContent = 'Loading...';
        btn.style.opacity = '0.8';
        btn.disabled = true;

        const formData = new FormData(contactForm);
        formData.append("access_key", "8cb82224-a62f-440a-bfe8-fe0f5f77e7ef"); 

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                // Success Animation
                btn.textContent = 'Message Sent! ✨';
                btn.style.background = 'var(--accent-secondary)'; // Turns Lilac
                btn.style.color = '#fff';
                contactForm.reset();
            } else {
                btn.textContent = 'Something went wrong.';
                btn.style.background = '#ef4444'; // Turns Red
            }
        } catch (error) {
            btn.textContent = 'Network Error.';
            btn.style.background = '#ef4444'; // Turns Red
        } finally {
            btn.style.opacity = '1';
            
            // Reset button back to normal after 3.5 seconds
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'var(--accent-primary)';
                btn.style.color = '#000';
                btn.disabled = false;
            }, 3500);
        }
    });
}
