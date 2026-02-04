//web page about section animation start
const handleBallAnimation = () => {
  const triggerElement = document.querySelector("#about-us .icon");
  const section = document.querySelector("#about-us");

  if (!triggerElement || !section) return;

  const rect = triggerElement.getBoundingClientRect();
  const screenHeight = window.innerHeight;
  if (rect.top < screenHeight * 0.85 && rect.bottom > 0) {
    const bubbles = section.querySelectorAll(
      '[class*="wrapper"], [class*="container"], [class*="frame"]',
    );

    bubbles.forEach((bubble) => {
      bubble.classList.add("animate-fall");
    });

    window.removeEventListener("scroll", handleBallAnimation);
  }
};
window.addEventListener("scroll", handleBallAnimation);
window.addEventListener("load", handleBallAnimation);
handleBallAnimation();
// web page about section animation end

// mobile page about section animation start
const initMobileAnimation = () => {
  const mobileContainer = document.querySelector(".mobile-parent28");

  if (!mobileContainer) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Find all bubble wrappers inside the mobile container
          const allBubbles = mobileContainer.querySelectorAll(
            ".youth-program-wrapper",
          );

          allBubbles.forEach((bubble) => {
            bubble.classList.add("animate-slide");
          });

          // Stop observing once animated
          observer.unobserve(mobileContainer);
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of the container is visible
    },
  );

  observer.observe(mobileContainer);
};

// Run on Refresh & Initial Load
window.addEventListener("load", initMobileAnimation);

// Safety check if script loads after window load
if (document.readyState === "complete") {
  initMobileAnimation();
}
// mobile page about section animation end

// web page faq section animation start
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const header = item.querySelector(".faq-header");
    const icon = item.querySelector(".faq-toggle-icon");

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close all other items (Optional: remove this part if you want multiple open at once)
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".faq-toggle-icon").src =
          "https://img.icons8.com/?size=100&id=3220&format=png&color=000000";
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add("active");
        icon.src = "https://img.icons8.com/?size=100&id=85458&format=png&color=000000";
      } else {
        item.classList.remove("active");
        icon.src = "https://img.icons8.com/?size=100&id=3220&format=png&color=000000";
      }
    });
  });
});
// web page faq section animation start

// mobile page faq section animation start
document.addEventListener("DOMContentLoaded", () => {
  const mobileFaqItems = document.querySelectorAll(".mobile-parent10");

  mobileFaqItems.forEach((item) => {
    const header = item.querySelector(".full-access-to-practice-tests-parent");
    const icon = item.querySelector(".plus-large-svgrepocom-mobile-icon");

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close all other items
      mobileFaqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherIcon = otherItem.querySelector(
            ".plus-large-svgrepocom-mobile-icon",
          );
          if (otherIcon) {
            otherIcon.src = "https://img.icons8.com/?size=100&id=3220&format=png&color=000000";
          }
        }
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add("active");
        icon.src = "https://img.icons8.com/?size=100&id=85458&format=png&color=000000";
      } else {
        item.classList.remove("active");
        icon.src = "https://img.icons8.com/?size=100&id=3220&format=png&color=000000";
      }
    });
  });
});
// mobile page faq section animation end

// web page testimonial section animation start
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".testimonial-item");
  if (items.length === 0) return;

  // 1. Automatically wrap items in a 'track' without changing your source HTML
  const container = items[0].parentElement;
  const track = document.createElement("div");
  track.className = "testimonial-track";

  // Move items into the track
  items.forEach((item) => track.appendChild(item));
  container.appendChild(track);

  // 2. Slider Logic
  const prevBtn = document.querySelector(".pagination-arrow[alt='Previous']");
  const nextBtn = document.querySelector(".pagination-arrow[alt='Next']");

  let currentIndex = 0;
  const totalSlides = items.length;

  const updateSlider = (index) => {
    track.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  };

  const showNext = () => {
    let nextIndex = (currentIndex + 1) % totalSlides;
    updateSlider(nextIndex);
  };

  const showPrev = () => {
    let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider(prevIndex);
  };

  // 3. Event Listeners
  nextBtn.addEventListener("click", () => {
    showNext();
    resetTimer();
  });

  prevBtn.addEventListener("click", () => {
    showPrev();
    resetTimer();
  });

  // 4. Auto Slide (5 Seconds)
  let autoPlay = setInterval(showNext, 5000);

  function resetTimer() {
    clearInterval(autoPlay);
    autoPlay = setInterval(showNext, 5000);
  }
});
// web page testimonial section animation end

// web page navbar section animation start

const nav = document.getElementById("main-nav");
let isDropped = false;

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    if (!nav.classList.contains("scrolled")) {
      nav.classList.add("scrolled");

      // force reflow so animation works
      nav.offsetHeight;

      nav.classList.add("drop");
    }
  } else {
    nav.classList.remove("drop");
    nav.classList.remove("scrolled");
  }
});

// percentage of total page height
const scrollPercents = [0, 80, 100, 92]; // in %

const navLinks = document.querySelectorAll(".button-parent .nav-link");

navLinks.forEach((link, index) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const percent = scrollPercents[index] || 0;

    const pageHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (pageHeight * percent) / 100;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  });
});

// web page navbar section animation end

// mobile page navbar section animation start
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const openBtn = document.getElementById("menu-open");
  const closeBtn = document.getElementById("menu-close");
  const links = document.querySelectorAll(".side-link");

  // Open Sidebar
  openBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Stop page scroll
  });

  // Close Sidebar function
  const closeMenu = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = ""; // Resume page scroll
  };

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  // Close when a link is clicked
  links.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".sidebar-links .side-link");

  // Define scroll positions in PERCENT of page height
  const scrollPercents = [0, 77, 95.8, 86.8]; // adjust as needed

  links.forEach((link, index) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const percent = scrollPercents[index] || 0;

      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const targetScroll = (pageHeight * percent) / 100;

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    });
  });
});

// mobile page navbar section animation end
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const cards = gsap.utils.toArray(".card-item");

  // 1. Initial State
  cards.forEach((card, i) => {
    gsap.set(card, { zIndex: i });
    if (i > 0) {
      gsap.set(card, {
        opacity: 0,
        yPercent: 120,
        rotationX: 90,
        xPercent: -50,
        left: "50%",
      });
    } else {
      gsap.set(card, {
        xPercent: -50,
        left: "50%",
        opacity: 1,
        yPercent: 0,
        rotationX: 0,
      });
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".stack-container",
      start: "top top",
      // Keep it snappy
      end: `+=${cards.length * 70}%`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
    },
  });

  cards.forEach((card, i) => {
    if (i < cards.length - 1) {
      const nextCard = cards[i + 1];
      const currentStack = cards.slice(0, i + 1);

      // STEP 1: Incoming card comes from 90 to 0
      tl.fromTo(
        nextCard,
        { yPercent: 120, rotationX: 90, opacity: 0 },
        {
          yPercent: 0,
          rotationX: 0,
          opacity: 1,
          duration: 1,
          ease: "none",
        },
        i,
      );

      // STEP 2: The current stack BENDS while moving
      // We use a sub-timeline or a small duration to bend and then straighten
      tl.to(
        currentStack,
        {
          // First half of the move: Bend deep (-45)
          rotationX: -45,
          z: (index) => -150 * (i - index + 1),
          y: (index) => -40 * (i - index + 1),
          scale: (index) => 1 - 0.06 * (i - index + 1),
          duration: 0.5, // Occurs in first half of scroll step
          ease: "power1.inOut",
        },
        i,
      );

      tl.to(
        currentStack,
        {
          // Second half of the move: Straighten back to 0
          rotationX: 0,
          duration: 0.5, // Returns to straight as the next card settles
          ease: "power1.inOut",
        },
        i + 0.5,
      );
    }
  });

  // 3. EXIT: All layers move UP TOGETHER as a single stack
  tl.to(
    cards,
    {
      yPercent: -150, // Moves the entire stack out of view
      opacity: 0, // Optional: fades the stack out
      rotationX: 0, // Ensures they stay straight while leaving
      duration: 1.2, // Slightly longer duration for a smoother "lifting" feel
      stagger: 0, // Set to 0 so they move at the exact same time
      ease: "power2.inOut",
    },
    "+=0.1",
  );
});