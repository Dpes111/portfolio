// ============================================
// DEEPESH SUBEDI - PROFESSIONAL PROFILE
// Interactive JavaScript with Dark/Light Mode
// ============================================

console.log('🚀 Deepesh Subedi Profile - Initializing...');

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// ========== DARK/LIGHT MODE ==========
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        console.log('🌙 Dark mode initialized');
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        console.log('☀️ Light mode initialized');
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        console.log('🌙 Switched to Light Mode');
        
        // Add animation
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        console.log('☀️ Switched to Dark Mode');
        
        // Add animation
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }
}

// ========== MOBILE MENU ==========
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// ========== BACK TO TOP ==========
function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========== SKILLS ANIMATION ==========
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0';
                
                setTimeout(() => {
                    skillBar.style.transition = 'width 1.5s ease-out';
                    skillBar.style.width = width;
                }, 300);
                
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}


// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        border-left: 4px solid ${type === 'success' ? '#059669' : '#dc2626'};
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 14px;
        opacity: 0.8;
        transition: opacity 0.2s;
    `;
    
    closeBtn.onmouseover = () => closeBtn.style.opacity = '1';
    closeBtn.onmouseout = () => closeBtn.style.opacity = '0.8';
    closeBtn.onclick = () => notification.remove();
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ========== SMOOTH SCROLLING ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                closeMenu();
                
                // Smooth scroll
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== ACTIVE NAV LINK ==========
function initActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
}

// ========== NAVBAR SCROLL EFFECT ==========
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
}

// ========== INITIALIZE EVERYTHING ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 Initializing Deepesh Subedi Profile...');
    
    // Initialize theme
    initTheme();
    
    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    hamburger.addEventListener('click', toggleMenu);
    backToTop.addEventListener('click', scrollToTop);
    
    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.hamburger')) {
            closeMenu();
        }
    });
    
    // Contact form
    (function(){
        emailjs.init("zEbrs-JqVjMRNw6Uh"); // your public key
      })();
      
      document.getElementById("contactForm").addEventListener("submit", function(e) {
        e.preventDefault();
      
        emailjs.sendForm(
          "service_p72qbsq",
          "template_ftmqnib",
          this
        ).then(() => {
          alert("Message sent successfully!");
          this.reset();
        }).catch((error) => {
          alert("Failed to send message");
          console.error(error);
        });
      });
      
    
    // Initialize features
    initSmoothScroll();
    initNavbarScroll();
    animateSkills();
    
    // Back to top button
    window.addEventListener('scroll', toggleBackToTop);
    
    // Add CSS for smooth transitions
    const transitionStyles = document.createElement('style');
    transitionStyles.textContent = `
        * {
            transition: background-color 0.3s ease, 
                        color 0.3s ease, 
                        border-color 0.3s ease,
                        box-shadow 0.3s ease;
        }
        
        .skill-progress {
            transition: width 1.5s ease-out !important;
        }
    `;
    document.head.appendChild(transitionStyles);
    
    // Initialize scroll position
    toggleBackToTop();
    
    console.log('✅ Profile initialized successfully!');
    console.log(`
    %c🎓 Deepesh Subedi - Student Developer
    %c📍 Pokhara, Nepal
    %c📧 dpssubedi8@gmail.com
    %c📱 +977 9829132645
    %c🚀 All features are now active!
    `,
    'color: #7c3aed; font-size: 16px; font-weight: bold;',
    'color: #06b6d4; font-size: 14px;',
    'color: #10b981; font-size: 14px;',
    'color: #f59e0b; font-size: 14px;',
    'color: #7c3aed; font-size: 14px; font-weight: bold;'
    );
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Add typing animation effect for hero (optional)
function initTypingEffect() {
    const title = document.querySelector('.hero-title .name');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start after a delay
    setTimeout(typeWriter, 1000);
}

// Start typing effect
setTimeout(initTypingEffect, 500);

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Ignore typing inside inputs & textareas
    if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA'
    ) return;

    // Escape key closes menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }

    // T key toggles theme
    if (e.key === 't' || e.key === 'T') {
        toggleTheme();
    }

    // B key for back to top
    if (e.key === 'b' || e.key === 'B') {
        scrollToTop();
    }
});


// Print resume function
window.printResume = function() {
    const printContent = `
        <div style="padding: 40px; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
            <h1 style="color: #7c3aed; margin-bottom: 10px;">Deepesh Subedi</h1>
            <h3 style="color: #666; margin-bottom: 30px;">Aspiring Full Stack Developer</h3>
            
            <div style="margin-bottom: 20px;">
                <p><strong>Email:</strong> dpssubedi8@gmail.com</p>
                <p><strong>Phone:</strong> +977 9829132645</p>
                <p><strong>Location:</strong> Pokhara, Nepal</p>
            </div>
            
            <h4 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 5px;">Education</h4>
            <p><strong>BScIT / Computer Science & Engineering</strong><br>
            ISMT University<br>
            2022 - Present</p>
            
            <h4 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 5px;">Skills</h4>
            <ul>
                <li>HTML5, CSS3, JavaScript</li>
                <li>Python, C#</li>
                <li>Currently learning: React, Vue.js, MongoDB</li>
            </ul>
            
            <h4 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 5px;">Projects</h4>
            <p><strong>Fullstack Web Application</strong> - University assignment with authentication and database</p>
            <p><strong>Car Rental Management System</strong> - Windows Forms application in C#</p>
            
            <div style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
                <p>Generated from Deepesh Subedi's Portfolio - https://your-portfolio-url.com</p>
            </div>
        </div>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
};

