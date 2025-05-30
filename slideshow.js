const IMAGE_COUNT = 11; //
const IMAGE_PATH = 'slideshow-images/'; //
const IMAGE_CAPTIONS = []; // // Still unused, consider removing if not planned

let slideIndex = 0; //
let slideInterval;
const slideshowContainer = document.getElementById('slideshow-container'); //
let slides = []; // To store references to slide elements

function loadImages() {
    if (!slideshowContainer) {
        console.error('Slideshow container not found!');
        return;
    }
    for (let i = 1; i <= IMAGE_COUNT; i++) {
        const slide = document.createElement('div');
        slide.className = 'slide'; //
        
        const img = document.createElement('img');
        // For the first image, set src immediately (as it's preloaded or should load ASAP)
        // For other images, store the intended src in data-src for lazy loading
        if (i === 1) {
            img.src = `${IMAGE_PATH}image${i}.jpg`;
        } else {
            img.dataset.src = `${IMAGE_PATH}image${i}.jpg`; // Store actual source for later
        }
        img.alt = `Slide ${i}`; //
        
        slide.appendChild(img);
        slideshowContainer.appendChild(slide);
        slides.push(slide); // Store the slide element
    }
    
    // Set initial opacity for all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0; //
    }
}

function showSlide(n) {
    // No need to getElementsByClassName every time, use the 'slides' array
    if (n >= slides.length) {slideIndex = 0} //
    if (n < 0) {slideIndex = slides.length - 1} //
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0; //
    }

    const currentSlideElement = slides[slideIndex];
    const imgElement = currentSlideElement.querySelector('img');

    // Lazy load: If the image hasn't had its src set yet (has data-src)
    if (imgElement && imgElement.dataset.src) {
        imgElement.src = imgElement.dataset.src;
        delete imgElement.dataset.src; // Remove data-src once loaded to prevent re-setting
    }
    
    currentSlideElement.style.opacity = 1; //
}

function changeSlide(n) {
    clearInterval(slideInterval); //
    slideIndex += n; //
    showSlide(slideIndex); //
    startSlideshow(); //
}

function startSlideshow() {
    showSlide(slideIndex); //
    slideInterval = setInterval(() => changeSlide(1), 15000); //
}

// Touch controls
let touchStartX = 0; //
let touchEndX = 0; //

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX; //
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX; //
    handleSwipe(); //
}

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe //
    if (!slideshowContainer) return; // Make sure container exists
    const slideWidth = slideshowContainer.offsetWidth; //
    const touchDiff = touchEndX - touchStartX; //

    if (Math.abs(touchDiff) > swipeThreshold) {
        if (touchDiff > 0) {
            // Swipe right
            changeSlide(-1); //
        } else {
            // Swipe left
            changeSlide(1); //
        }
    } else {
        // Tap control
        if (touchEndX < slideWidth / 2) {
            // Tap on left side
            changeSlide(-1); //
        } else {
            // Tap on right side
            changeSlide(1); //
        }
    }
}

// Add touch event listeners only if slideshowContainer exists
if (slideshowContainer) {
    slideshowContainer.addEventListener('touchstart', handleTouchStart, false); //
    slideshowContainer.addEventListener('touchend', handleTouchEnd, false); //
}

// Keyboard controls (for desktop)
document.addEventListener('keydown', (e) => {
    // Ensure we only change slides if the slideshow container is present on the page
    if (slideshowContainer && document.body.contains(slideshowContainer)) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1); //
        } else if (e.key === 'ArrowRight') {
            changeSlide(1); //
        }
    }
});


// --- Changed window.onload to DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on a page that actually has the slideshow container
    if (document.getElementById('slideshow-container')) { 
        loadImages();
        // The timeout might still be useful for CSS transitions to pick up correctly
        // after initial DOM manipulation and style settings.
        setTimeout(() => {
            startSlideshow();
        }, 100); //
    }
});