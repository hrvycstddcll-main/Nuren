// --- 1. Gooey Cursor Logic ---
const cursor = document.querySelector("#cursor");
const amount = 20;

for (let i = 0; i < amount; i++) {
    const span = document.createElement("span");
    cursor.appendChild(span);
}

const dots = document.querySelectorAll("#cursor span");

window.addEventListener("mousemove", (e) => {
    gsap.to(dots, {
        x: e.clientX,
        y: e.clientY,
        stagger: 0.05,
        ease: "power2.out",
        duration: 0.6
    });

    // --- 2. Parallax Interaction for Background ---
    const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.02;

    gsap.to(".heart", {
        x: moveX,
        y: moveY,
        duration: 1.5
    });

    gsap.to(".love-tag", {
        x: -moveX,
        y: -moveY,
        duration: 2
    });
});

// --- 3. Message Card Interaction (Sparkle Effect) ---
const messageCard = document.querySelector('.message-card');

messageCard.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('span');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '100';
    document.body.appendChild(sparkle);

    gsap.to(sparkle, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        onComplete: () => sparkle.remove()
    });
});

// Add this to the bottom of your existing album.js

gsap.registerPlugin(ScrollTrigger);

// Magazine Reveal Animations
const magItems = document.querySelectorAll(".mag-item");

magItems.forEach((item, index) => {
    const xOffset = index % 2 === 0 ? -50 : 50; // Alternates left and right entrance

    gsap.fromTo(item, 
        { 
            opacity: 0, 
            x: xOffset,
            y: 30 
        }, 
        {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
        }
    );
});

// Add to your existing album.js
gsap.registerPlugin(ScrollTrigger);

const magReveals = document.querySelectorAll(".reveal");

magReveals.forEach((el, i) => {
    gsap.fromTo(el, 
        { opacity: 0, y: 50 }, 
        {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: i % 2 * 0.2, // Stagger effect for items next to each other
            ease: "power2.out"
        }
    );
});

// --- Magazine Slider Interaction (Vanilla JS) ---
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.magazine-slider-spread .slider-img');

    slides.forEach(slide => {
        slide.addEventListener('click', function() {
            if (this.classList.contains('active')) return;

            // Deactivate others
            slides.forEach(s => s.classList.remove('active'));
            
            // Activate this one
            this.classList.add('active');

            // GSAP Animation for the inner content
            gsap.fromTo(this.querySelector('img'), 
                { filter: "brightness(2) contrast(1.5)" }, 
                { filter: "brightness(1) contrast(1)", duration: 1, ease: "power2.out" }
            );

            gsap.fromTo(this.querySelector('.details'), 
                { opacity: 0, y: 40 }, 
                { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
            );
        });
    });
});