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
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".card-item");

    // Only run the stacking effect on Desktop (md breakpoint and up)
    ScrollTrigger.matchMedia({
        "(min-width: 768px)": function() {
            cards.forEach((card, i) => {
                gsap.set(card, {
                    zIndex: i,
                    xPercent: -50,
                    left: "50%",
                    opacity: i === 0 ? 1 : 0,
                    yPercent: i === 0 ? 0 : 120,
                    position: "absolute" // Ensure absolute only on desktop
                });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#course",
                    start: "top top",
                    end: () => `+=${(cards.length - 1) * window.innerHeight}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });

            cards.forEach((card, i) => {
                if (i < cards.length - 1) {
                    const nextCard = cards[i + 1];
                    const currentStack = cards.slice(0, i + 1);

                    tl.fromTo(nextCard,
                        { yPercent: 120, opacity: 1 },
                        { yPercent: 0, opacity: 1, duration: 1, ease: "none" },
                        i
                    );

                    tl.to(currentStack, {
                        z: (index) => -150 * (i - index + 1),
                        y: (index) => -40 * (i - index + 1),
                        scale: (index) => 1 - 0.06 * (i - index + 1),
                        duration: 1,
                        ease: "power1.inOut"
                    }, i);
                }
            });
        },
        // On Mobile, kill any existing triggers or styles if window is resized
        "(max-width: 767px)": function() {
            gsap.set(cards, { clearProps: "all" });
        }
    });
});
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