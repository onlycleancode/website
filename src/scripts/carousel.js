
// Carousel Logic
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-nav.prev');
const nextBtn = document.querySelector('.carousel-nav.next');
const items = document.querySelectorAll('.carousel-item');

if (track && prevBtn && nextBtn && items.length > 0) {
    let currentIndex = 0;

    const updateCarousel = () => {
        const itemWidth = items[0].getBoundingClientRect().width;
        // Gap is handled by flex gap in CSS, but for transform translate we need to account for it or just scroll by percentage if using 100% width items.
        // Simpler approach for "one at a time": scrollIntoView or strictly translating by 100%.
        // To keep it perfectly centered single file, let's assume we show one item at a time.

        // Using scrollLeft on container is smoother/easier for "scroll-snap" CSS, but buttons need to trigger it.
        // Let's use the track container scroll.
        const container = document.querySelector('.carousel-track-container');
        const scrollAmount = currentIndex * container.offsetWidth;
        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    });
}

// Construction Popup Logic
const constructionPopup = document.getElementById('construction-popup');
const closeConstructionBtn = document.querySelector('.construction-popup-close');
const constructionTriggers = document.querySelectorAll('[data-action="construction-popup"]');

function openConstructionPopup() {
    constructionPopup.classList.add('active');
    constructionPopup.setAttribute('aria-hidden', 'false');
}

function closeConstructionPopup() {
    constructionPopup.classList.remove('active');
    constructionPopup.setAttribute('aria-hidden', 'true');
}

constructionTriggers.forEach(trigger => {
    trigger.addEventListener('click', openConstructionPopup);
});

if (closeConstructionBtn) {
    closeConstructionBtn.addEventListener('click', closeConstructionPopup);
}

// Close on outside click
if (constructionPopup) {
    constructionPopup.addEventListener('click', (e) => {
        if (e.target === constructionPopup) {
            closeConstructionPopup();
        }
    });
}
