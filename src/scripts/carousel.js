
// Carousel Logic
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-nav.prev');
const nextBtn = document.querySelector('.carousel-nav.next');
// Get initial items before cloning
let items = Array.from(document.querySelectorAll('.carousel-item'));

if (track && prevBtn && nextBtn && items.length > 0) {
    // 1. Clone First and Last Items
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);

    // Tag them for debugging/styling if needed
    firstClone.dataset.clone = 'first';
    lastClone.dataset.clone = 'last';

    // 2. Append/Prepend Clones
    track.appendChild(firstClone);
    track.insertBefore(lastClone, items[0]);

    // 3. Re-select all items including clones
    let allItems = document.querySelectorAll('.carousel-item');

    // 4. State
    let currentIndex = 1; // Start at the first REAL item (index 1)
    let isTransitioning = false;
    const transitionSpeed = 300; // ms, matches CSS

    // 5. Initial Position
    const updatePosition = (jump = false) => {
        const itemWidth = allItems[0].getBoundingClientRect().width;
        // If we want a gap, we must include it. global.css shows no gap on .carousel-track?
        // Actually .carousel-container has gap: 1rem, but track is flex.
        // Let's assume the item width is the full slide distance for now.
        // Wait, .carousel-track has display: flex.
        // If there are gaps logic might be off, but usually carousel items are 100% width.
        // .carousel-item has flex: 0 0 100%. So width is reliable.

        const offset = -currentIndex * itemWidth;

        if (jump) {
            track.style.transition = 'none';
        } else {
            track.style.transition = `transform ${transitionSpeed}ms ease-out`;
        }

        track.style.transform = `translateX(${offset}px)`;
    };

    // Set initial position immediately (no animation)
    updatePosition(true);

    // 6. Navigation Logic
    const nextSlide = () => {
        if (isTransitioning) return;
        if (currentIndex >= allItems.length - 1) return;

        isTransitioning = true;
        currentIndex++;
        updatePosition();
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        if (currentIndex <= 0) return;

        isTransitioning = true;
        currentIndex--;
        updatePosition();
    };

    // 7. Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // 8. Handle "Teleporting" on Transition End
    track.addEventListener('transitionend', () => {
        isTransitioning = false;

        // If we are at the "first clone" (end of list), jump to start
        if (allItems[currentIndex].dataset.clone === 'first') {
            currentIndex = 1;
            updatePosition(true);
        }

        // If we are at the "last clone" (start of list), jump to end
        if (allItems[currentIndex].dataset.clone === 'last') {
            currentIndex = allItems.length - 2;
            updatePosition(true);
        }
    });

    // 9. Resize Handler
    window.addEventListener('resize', () => {
        updatePosition(true);
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
