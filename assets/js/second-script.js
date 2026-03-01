const openBtn = document.getElementById("mobile-menu-open");
const closeBtn = document.getElementById("mobile-menu-close");
const sidebar = document.getElementById("mobile-sidebar");
const links = document.querySelectorAll(".mobile-link");

openBtn.addEventListener("click", () => {
    sidebar.classList.remove("translate-x-full");
});

const closeMenu = () => {
    sidebar.classList.add("translate-x-full");
};

closeBtn.addEventListener("click", closeMenu);
links.forEach((link) => link.addEventListener("click", closeMenu));


///////////////////////////////////////////////////////////////////////

// FAQ Accordion Logic
document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-button');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    btn.addEventListener('click', () => {
        const isExpanded = content.classList.contains('grid-rows-[1fr]');

        if (isExpanded) {
            // Collapse
            content.classList.remove('grid-rows-[1fr]', 'opacity-100');
            content.classList.add('grid-rows-[0fr]', 'opacity-0');
            icon.textContent = '+';
            icon.classList.remove('rotate-180');
        } else {
            // Expand
            content.classList.remove('grid-rows-[0fr]', 'opacity-0');
            content.classList.add('grid-rows-[1fr]', 'opacity-100');
            icon.textContent = '−';
            icon.classList.add('rotate-180');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById('testimonial-track');
    const items = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const triggerSection = document.querySelector(".testimonial-section-wrapper");
    
    let currentIndex = 0;
    let slideInterval;

    // --- PART A: SLIDING LOGIC ---
    function updateSlider() {
        const offset = currentIndex * -100;
        track.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateSlider();
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    // --- PART B: ENTRY ANIMATION (Intersection Observer) ---
    if (triggerSection) {
        track.style.opacity = "0";
        track.style.transition = "none"; 

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    track.style.transition = "transform 0.5s ease-in-out, opacity 0.8s ease-out";
                    track.style.opacity = "1";
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        observer.observe(triggerSection);
    }

    startAutoSlide();
});

document.addEventListener('mousemove', (e) => {
    const pupils = document.querySelectorAll('.pupil');
    pupils.forEach(pupil => {
        // Get the center of the eye
        const rect = pupil.parentElement.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        
        // Calculate angle between mouse and eye center
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const distance = 6; // How far the pupil moves from center
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        pupil.style.transform = `translate(${x}px, ${y}px)`;
    });
});
	window.addEventListener('scroll', function() {
    const nav = document.querySelector('.main-nav-wrapper');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && window.innerWidth >= 768) {
            const el = entry.target;
            const delay = el.getAttribute('data-delay') || '0.2s';
            const animType = el.getAttribute('data-anim');
            const direction = el.getAttribute('data-dir') || 'left'; // left or right
            
            el.style.animationDelay = delay;
            
            // 1. Trigger direction (animate-ghostly-left OR animate-ghostly-right)
            el.classList.add(`animate-ghostly-${direction}`);

            // 2. Trigger eye bounce
            if (animType === 'bounce') {
                el.querySelectorAll('.pupil-bounce').forEach(pupil => {
                    pupil.style.animationDelay = delay; 
                    pupil.classList.add('animate-bounce-settle');
                });
            }
            
            observer.unobserve(el);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevents the #hash from being added to the URL

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Smooth scroll to the section
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // If it's a mobile link, close the sidebar after clicking
            if (this.classList.contains('mobile-link')) {
                const sidebar = document.getElementById('mobile-sidebar');
                sidebar.classList.add('translate-x-full');
            }
        }
    });
});

const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Only trigger on desktop and when visible
        if (entry.isIntersecting && window.innerWidth >= 768) {
            const container = entry.target;
            const items = container.querySelectorAll('.stagger-item');
            
            items.forEach((item, index) => {
                // Add a staggered delay (0.1s, 0.2s, 0.3s...)
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('animate-item');
            });
            
            // Stop observing once the animation has triggered
            gridObserver.unobserve(container);
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the grid is visible

// Start observing all grids
document.querySelectorAll('.reveal-grid-items').forEach(grid => {
    gridObserver.observe(grid);
});

document.addEventListener('DOMContentLoaded', function() {
    // Select the parent container of the bubbles
    const bubbleContainer = document.querySelector('.relative.min-h-\\[300px\\]');
    
    if (bubbleContainer && window.innerWidth >= 768) {
        const observerOptions = {
            root: null,
            threshold: 0.3 // Trigger when 30% of the section is visible
        };

        const bubbleObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add class to parent to trigger children animations
                    entry.target.classList.add('animate-bubbles-active');
                    // Stop observing once animation has triggered
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        bubbleObserver.observe(bubbleContainer);
    }
});