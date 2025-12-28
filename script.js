// ===========================
// DARK MODE TOGGLE
// ===========================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===========================
// SMOOTH SCROLL & ACTIVE NAV
// ===========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href && href.startsWith("#") && href === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ===========================
// MOBILE MENU TOGGLE
// ===========================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
});

// ===========================
// NAMASTE SOUND EFFECT
// ===========================
const namasteIcon = document.getElementById("namaste-icon");
const namasteSound = document.getElementById("namaste-sound");

namasteIcon.addEventListener("click", () => {
    namasteSound.currentTime = 0;
    namasteSound.volume = 1.0;
    namasteSound.play().catch(err => {
        console.log("Audio play failed:", err);
    });
    
    // Add animation
    namasteIcon.style.animation = "none";
    setTimeout(() => {
        namasteIcon.style.animation = "";
    }, 10);
});

// ===========================
// TYPING EFFECT
// ===========================
const typedTextElement = document.querySelector(".typed-text");
const texts = [
    "Full Stack Developer",
    "Problem Solver",
    "Coding Enthusiast",
    "Creative Designer",
    "Tech Enthusiast"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function type() {
    if (!typedTextElement) return;
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 100;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing effect
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
});

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================
const revealElements = document.querySelectorAll(".reveal");

function reveal() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal(); // Initial check

// ===========================
// SKILL BAR ANIMATION
// ===========================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barTop < windowHeight - 100) {
            bar.style.width = progress + '%';
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// ===========================
// FORM VALIDATION & SUBMISSION
// ===========================
const contactForm = document.getElementById("contactForm");
const formResponse = document.getElementById("formResponse");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Reset previous errors
        const formGroups = contactForm.querySelectorAll(".form-group");
        formGroups.forEach(group => {
            group.classList.remove("error", "success");
        });
        
        // Get form values
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");
        
        let isValid = true;
        
        // Validate name
        if (name.value.trim() === "") {
            setError(name, "Name is required");
            isValid = false;
        } else if (name.value.trim().length < 2) {
            setError(name, "Name must be at least 2 characters");
            isValid = false;
        } else {
            setSuccess(name);
        }
        
        // Validate email
        if (email.value.trim() === "") {
            setError(email, "Email is required");
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            setError(email, "Please enter a valid email");
            isValid = false;
        } else {
            setSuccess(email);
        }
        
        // Validate subject
        if (subject.value.trim() === "") {
            setError(subject, "Subject is required");
            isValid = false;
        } else if (subject.value.trim().length < 3) {
            setError(subject, "Subject must be at least 3 characters");
            isValid = false;
        } else {
            setSuccess(subject);
        }
        
        // Validate message
        if (message.value.trim() === "") {
            setError(message, "Message is required");
            isValid = false;
        } else if (message.value.trim().length < 10) {
            setError(message, "Message must be at least 10 characters");
            isValid = false;
        } else {
            setSuccess(message);
        }
        
        // If valid, submit form
        if (isValid) {
            submitForm(name.value, email.value, subject.value, message.value);
        }
    });
}

function setError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector(".error-message");
    
    formGroup.classList.add("error");
    errorMessage.textContent = message;
}

function setSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.classList.add("success");
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function submitForm(name, email, subject, message) {
    // Show loading state
    const submitBtn = contactForm.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual backend call)
    setTimeout(() => {
        // Success
        showFormResponse("success", `Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon! 🎉`);
        
        // Reset form
        contactForm.reset();
        const formGroups = contactForm.querySelectorAll(".form-group");
        formGroups.forEach(group => {
            group.classList.remove("success");
        });
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formResponse.style.display = "none";
        }, 5000);
        
    }, 1500);
}

function showFormResponse(type, message) {
    formResponse.className = `form-response ${type}`;
    formResponse.textContent = message;
    formResponse.style.display = "block";
    
    // Scroll to response
    formResponse.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ===========================
// SCROLL TO TOP BUTTON
// ===========================
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ===========================
// SMOOTH NAVBAR ON SCROLL
// ===========================
let lastScroll = 0;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = "translateY(-100%)";
    } else {
        navbar.style.transform = "translateY(0)";
    }
    
    lastScroll = currentScroll;
});

// ===========================
// PRELOADER
// ===========================
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    
    // Trigger initial animations
    reveal();
    animateSkillBars();
});