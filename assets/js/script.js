//============web page about section animation start=============
const handleBallAnimation = () => {
  // Keeping your exact trigger elements
  const triggerElement = document.querySelector("#about-us .icon");
  const section = document.querySelector("#about-us");

  if (!triggerElement || !section) return;

  const rect = triggerElement.getBoundingClientRect();
  const screenHeight = window.innerHeight;

  /* Logic Fix: Changing 0.85 to 0.95 
       This triggers the fall as soon as the icon enters the bottom of the screen
    */
  if (rect.top < screenHeight * 0.95 && rect.bottom > 0) {
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
//=============web page about section animation end=============

//=============web page faq section animation start=============
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
        icon.src =
          "https://img.icons8.com/?size=100&id=85458&format=png&color=000000";
      } else {
        item.classList.remove("active");
        icon.src =
          "https://img.icons8.com/?size=100&id=3220&format=png&color=000000";
      }
    });
  });
});
//=============web page faq section animation start=============

//=============mobile page faq section animation start=============
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
            otherIcon.src =
              "https://img.icons8.com/?size=100&id=3220&format=png&color=000000";
          }
        }
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add("active");
        icon.src =
          "https://img.icons8.com/?size=100&id=85458&format=png&color=000000";
      } else {
        item.classList.remove("active");
        icon.src =
          "https://img.icons8.com/?size=100&id=3220&format=png&color=000000";
      }
    });
  });
});
//=============mobile page faq section animation end=============

//=============web page testimonial section animation start=============
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
//=============web page testimonial section animation end=============

//=============web page navbar section animation start=============
const nav = document.getElementById("main-nav");

if (nav) {
  let isShown = false;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (y > 250 && !isShown) {
      nav.classList.add("scrolled", "visible");
      isShown = true;
    }

    if (y <= 150 && isShown) {
      nav.classList.remove("visible", "scrolled");
      isShown = false;
    }
  });
}

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
//=============web page navbar section animation end=============

//=============mobile page navbar section animation start=============
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

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".scroll-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const percent = parseFloat(this.dataset.scroll) || 0;

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
//=============mobile page navbar section animation end=============

//=============web page course section animation start=============
// document.addEventListener("DOMContentLoaded", function () {
//   gsap.registerPlugin(ScrollTrigger);

//   const cards = gsap.utils.toArray(".card-item");

//   // 1. Initial State
//   cards.forEach((card, i) => {
//     gsap.set(card, {
//       zIndex: i,
//       xPercent: -50,
//       left: "50%",
//     });

//     if (i > 0) {
//       gsap.set(card, {
//         opacity: 0,
//         yPercent: 120,
//       });
//     }
//   });

//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".stack-container",
//       start: "top top",
//       // FIX: End is based on viewport height * number of cards
//       // This makes the scroll feel consistent on all devices
//       end: () => `+=${cards.length * 100}%`,
//       pin: true,
//       pinSpacing: true, // This adds exactly enough space to finish the animation
//       scrub: 1,
//       invalidateOnRefresh: true, // Recalculates if the window is resized
//     },
//   });

//   cards.forEach((card, i) => {
//     if (i < cards.length - 1) {
//       const nextCard = cards[i + 1];
//       const currentStack = cards.slice(0, i + 1);

//       tl.to(
//         nextCard,
//         {
//           yPercent: 0,
//           opacity: 1,
//           duration: 1,
//           ease: "none",
//         },
//         i,
//       ).to(
//         currentStack,
//         {
//           z: (index) => -150 * (i - index + 1),
//           y: (index) => -40 * (i - index + 1),
//           scale: (index) => 1 - 0.06 * (i - index + 1),
//           duration: 1,
//           ease: "power1.inOut",
//         },
//         i,
//       );
//     }
//   });
// });
//=============web page course section animation end=============

//=============web page header section animation start=============
document.addEventListener("DOMContentLoaded", function () {
  const elementsToAnimate = document.querySelectorAll(
    [
      ".achieve-your",
      ".dream-ielts-score",
      ".button-group",
      ".at-english-council-were-dedi-parent",
      ".eye-ball",
      ".eye-ball2",
    ].join(","),
  );

  elementsToAnimate.forEach((el) => el.classList.add("reveal-active"));

  const observerOptions = {
    threshold: 0.15, // Triggers slightly earlier for a better feel
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach((el) => observer.observe(el));
});
//=============web page header section animation end=============

//=============web page footer section animation end=============
document.addEventListener("DOMContentLoaded", function () {
  const triggerSection = document.querySelector(
    ".wanna-go-next-level-in-english-parent",
  );
  const firstLine = document.getElementById("wanna-go");
  const otherRows = document.querySelectorAll(
    ".lets-talk, .component-22, .frame-parent15",
  );

  if (triggerSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (firstLine) firstLine.classList.add("reveal-id");
            otherRows.forEach((el) => {
              el.classList.add("reveal-rows");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(triggerSection);
  }
});
//=============web page footer section animation start=============

//=============web page feature section animation start=============
document.addEventListener("DOMContentLoaded", function () {
  // Select your parent section
  const triggerSection = document.querySelector(".group-parent");

  // Select all elements that have animations in your CSS
  const animatedElements = document.querySelectorAll(
    ".line-1, .line-2, .line-3, .group-parent2",
  );

  if (triggerSection) {
    // 1. Force-stop animations on load so they don't auto-play
    animatedElements.forEach((el) => {
      el.style.animation = "none";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 2. Restore the animations from your CSS
            animatedElements.forEach((el) => {
              el.style.animation = "";
            });

            // Stop watching once triggered
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(triggerSection);
  }
});
//=============web page feature section animation start=============

//=============web page program section animation start=============
document.addEventListener("DOMContentLoaded", function () {
  const triggerSection = document.querySelector(".frame-parent22");

  const animatedElements = document.querySelectorAll(
    ".where-we-help, .helping-professionals, .students-achieve-parent, .their-ielts-dreams, .at-english-council2, .online-offline-live-class-parent, .with-practical-project-parent, .achieve-certificate-parent",
  );

  if (triggerSection) {
    // 1. Hide them immediately
    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.animation = "none";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 2. Restore everything
            animatedElements.forEach((el) => {
              el.style.opacity = ""; // Remove inline opacity
              el.style.animation = ""; // Remove "none" to let CSS take over
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger as soon as 10% is visible
        rootMargin: "0px 0px -50px 0px", // Triggers slightly before it hits the viewport
      },
    );

    observer.observe(triggerSection);
  }
});
//=============web page program section animation end=============

//=============web page testimonial section animation start=============
document.addEventListener("DOMContentLoaded", function () {
  // Select the parent container for testimonials
  const triggerSection = document.querySelector(".testimonials-parent");

  const animatedElements = document.querySelectorAll(
    ".testimonials, .what-are-saying, .frame-parent17, .average-49-rating",
  );

  if (triggerSection) {
    // 1. Force-stop animations on load
    animatedElements.forEach((el) => {
      el.style.animation = "none";
      el.style.opacity = "0";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 2. Restore animations from CSS
            animatedElements.forEach((el) => {
              el.style.animation = "";
              el.style.opacity = "";
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(triggerSection);
  }
});
//=============web page testimonial section animation end=============

//=============web page faq section animation start=============
document.addEventListener("DOMContentLoaded", function () {
  // Select the parent container for FAQ
  const triggerSection = document.querySelector(".frame-parent10");

  const animatedElements = document.querySelectorAll(
    ".faq-parent, .some-answer-that",
  );

  if (triggerSection) {
    // 1. Force-stop animations on load
    animatedElements.forEach((el) => {
      el.style.animation = "none";
      el.style.opacity = "0";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 2. Restore animations from CSS
            animatedElements.forEach((el) => {
              el.style.animation = "";
              el.style.opacity = "";
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(triggerSection);
  }
});
//=============web page faq section animation end=============
