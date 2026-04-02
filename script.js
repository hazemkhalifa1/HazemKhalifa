// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const mobileMenuIcon = mobileMenuBtn.querySelector('i');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Toggle between bars and xmark icons
    if (navLinks.classList.contains('active')) {
        mobileMenuIcon.classList.remove('fa-bars');
        mobileMenuIcon.classList.add('fa-xmark');
    } else {
        mobileMenuIcon.classList.remove('fa-xmark');
        mobileMenuIcon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuIcon.classList.remove('fa-xmark');
        mobileMenuIcon.classList.add('fa-bars');
    });
});

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Sticky Navbar Logic
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Logic
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => revealOnScroll.observe(el));
