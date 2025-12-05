// Typing Effect for Hero Subtitle
const typingText = document.getElementById('typingText');
const texts = [
    'Görsel İletişim Tasarımcı',
    'Proje Koordinatörü',
    'Yayın Editörü',
    'QA & Test Uzmanı',
    'Multidisipliner Yaratıcı'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Wait before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Wait before typing next
    }

    setTimeout(typeWriter, typingSpeed);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// CV Download Button (Placeholder)
const cvDownloadBtn = document.getElementById('cvDownloadBtn');
if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // TODO: CV hazır olduğunda aşağıdaki satırı uncomment edin ve linki güncelleyin
        // window.open('assets/bedirhan-tunc-cv.pdf', '_blank');

        // Şimdilik placeholder mesajı
        alert('CV dosyası yakında eklenecek!');
    });
}

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Update icon
    if (body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Smooth scroll for navigation links
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

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skill bars animation on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.width = bar.parentElement.parentElement.querySelector('.skill-progress').style.width;
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Enhanced Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const company = document.getElementById('company').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const projectType = document.getElementById('projectType').value;
        const budget = document.getElementById('budget').value;
        const timeline = document.getElementById('timeline').value;
        const message = document.getElementById('message').value;

        // Show professional success message
        alert(`🎉 Teşekkürler ${name}!\n\nProje teklifiniz başarıyla alındı. 24 saat içinde size dönüş yapacağım.\n\nİyi günler!`);

        // Reset form
        contactForm.reset();

        // In a real application, you would send this data to a server
        console.log('Project Proposal:', {
            name,
            company,
            email,
            phone,
            projectType,
            budget,
            timeline,
            message
        });
    });
}

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        const isDark = body.classList.contains('dark-mode');
        navbar.style.background = isDark ? 'rgba(26, 26, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '';
        navbar.style.backdropFilter = 'none';
    }
});

// Add fade-in animation to sections
const fadeElements = document.querySelectorAll(
    '.stat-item, .skill-badge, .timeline-item, .project-card, .expertise-item, .about-text, .quick-contact, .contact-form'
);

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for elements in the same section
            setTimeout(() => {
                entry.target.classList.add('fade-in-visible');
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    element.classList.add('fade-in-element');
    fadeObserver.observe(element);
});

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 800);
});

// Project Details Data
const projectDetails = {
    methodor: {
        title: 'METHODOR',
        description: 'Dijital eğitim platformu. Öğrencilerin online eğitim alabileceği, interaktif içerikler sunabilen modern bir platform.',
        role: 'Proje koordinasyonu ve QA süreçlerinde görev aldım. Platformun test süreçlerini yönettim, hata raporları oluşturdum ve geliştirme ekibiyle koordinasyon sağladım.',
        tools: ['Jira', 'Slack', 'Browser DevTools', 'Figma'],
        link: 'https://methodor.com/'
    },
    cokkolay: {
        title: 'COKKOLAY',
        description: 'Kapsamlı dijital eğitim platformu. Çoklu kullanıcı desteği, canlı dersler ve interaktif öğrenme modülleri sunuyor.',
        role: 'Takım liderliği ve operasyon yönetimi yaptım. AR-GE ekibinin koordinasyonunu sağladım, sprint planlaması ve proje yönetimi sorumluluğu üstlendim.',
        tools: ['Trello', 'Slack', 'Adobe XD', 'Analytics'],
        link: 'https://cokkolay.com/'
    },
    nlcortex: {
        title: 'NL CORTEX',
        description: 'Öğrenme engeli tespit sistemi. Yapay zeka destekli analiz ile öğrencilerin öğrenme zorluklarını tespit eden akıllı platform.',
        role: 'AR-GE ekibiyle proje koordinasyonunda yer aldım. Kalite kontrol süreçlerini yönettim ve test senaryoları oluşturdum.',
        tools: ['Jira', 'Git', 'Testing Tools', 'Documentation'],
        link: 'https://nlcortex.com/'
    }
};

// Project Modal Functionality
const projectModal = document.getElementById('projectModal');
const projectCards = document.querySelectorAll('[data-project]');

projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project');
        const project = projectDetails[projectId];

        if (project) {
            document.getElementById('projectTitle').textContent = project.title;
            document.getElementById('projectDescription').textContent = project.description;
            document.getElementById('projectRole').textContent = project.role;
            document.getElementById('projectLink').href = project.link;

            // Add tools
            const toolsContainer = document.getElementById('projectTools');
            toolsContainer.innerHTML = '';
            project.tools.forEach(tool => {
                const badge = document.createElement('span');
                badge.className = 'project-tool-badge';
                badge.textContent = tool;
                toolsContainer.appendChild(badge);
            });

            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close project modal
const projectModalClose = document.querySelector('.project-modal-close');
if (projectModalClose) {
    projectModalClose.addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Image Modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.modal-close');

// Add click event to all project cards (except PDF card and app cards)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Skip if this is the PDF card or app card
        if (this.classList.contains('portfolio-pdf-card') || this.classList.contains('app-card')) {
            return;
        }

        const img = this.querySelector('.project-image');
        const title = this.querySelector('.project-overlay h3').textContent;
        const description = this.querySelector('.project-overlay p').textContent;

        modal.classList.add('active');
        modalImg.src = img.src;
        modalCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close modal when clicking the X button
closeModal.addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the image
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

console.log('Portfolio website loaded successfully!');
