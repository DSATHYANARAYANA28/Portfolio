const floatingBadge = document.getElementById('floating-badge');

let isDragging = false;
let offsetX, offsetY;

floatingBadge.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - floatingBadge.getBoundingClientRect().left;
    offsetY = e.clientY - floatingBadge.getBoundingClientRect().top;
    floatingBadge.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    floatingBadge.style.cursor = 'grab';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;

        // Keep the badge within viewport bounds
        const maxX = window.innerWidth - floatingBadge.offsetWidth;
        const maxY = window.innerHeight - floatingBadge.offsetHeight;
        x = Math.min(Math.max(0, x), maxX);
        y = Math.min(Math.max(0, y), maxY);

        floatingBadge.style.left = x + 'px';
        floatingBadge.style.top = y + 'px';
        floatingBadge.style.position = 'fixed';
    }
});

// Fade-in animation on scroll for sections
document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('section');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('fade-in', 'visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        fader.classList.add('fade-in');
        appearOnScroll.observe(fader);
    });
});

// Smooth scroll for internal links
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
