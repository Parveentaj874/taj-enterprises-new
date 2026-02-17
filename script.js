// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    // Check if coming from hash navigation (back from service pages)
    if (window.location.hash) {
        loader.classList.add('hidden');
    } else {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    }
});

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Navigation sections
const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "blog", label: "Blog" },
    { id: "reviews", label: "Reviews" },
    { id: "contact", label: "Contact" }
];

let activeSection = "home";

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Scroll to section function
function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// Update progress bar and active navigation
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / docHeight) * 100;
    
    // Update progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    // Update active navigation
    let currentSection = "home";
    
    sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
            currentSection = id;
        }
    });
    
    if (currentSection !== activeSection) {
        activeSection = currentSection;
        updateActiveNavLink();
    }
}

// Update active navigation link
function updateActiveNavLink() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSection}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', updateScrollProgress, { passive: true });

// Add click event listeners to navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            // Close mobile menu
            navMenu?.classList.remove('active');
            mobileMenuToggle?.classList.remove('active');
        });
    });
    
    // CTA button
    document.querySelector('.cta-button')?.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection('services');
    });
    
    // Initialize scroll spy
    updateScrollProgress();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .feature, .contact-item, .mission, .vision, .client-type');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects for cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-glow');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});
