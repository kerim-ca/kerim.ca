const IMAGE_COUNT = 11;
const IMAGE_PATH = 'slideshow-images/';
const IMAGE_CAPTIONS = [];

let slideIndex = 0;
let slideInterval;
const slideshowContainer = document.getElementById('slideshow-container');

function loadImages() {
    for (let i = 1; i <= IMAGE_COUNT; i++) {
        const slide = document.createElement('div');
        slide.className = 'slide';
        
        const img = document.createElement('img');
        img.src = `${IMAGE_PATH}image${i}.jpg`;
        img.alt = `Slide ${i}`;
        
        slide.appendChild(img);
        slideshowContainer.appendChild(slide);
    }
    
    const slides = document.getElementsByClassName('slide');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0;
    }
}

function showSlide(n) {
    const slides = document.getElementsByClassName('slide');
    if (n >= slides.length) {slideIndex = 0}
    if (n < 0) {slideIndex = slides.length - 1}
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0;
    }
    slides[slideIndex].style.opacity = 1;
}

function changeSlide(n) {
    clearInterval(slideInterval);
    slideIndex += n;
    showSlide(slideIndex);
    startSlideshow();
}

function startSlideshow() {
    showSlide(slideIndex);
    slideInterval = setInterval(() => changeSlide(1), 15000);
}

// Touch controls
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    const slideWidth = slideshowContainer.offsetWidth;
    const touchDiff = touchEndX - touchStartX;

    if (Math.abs(touchDiff) > swipeThreshold) {
        if (touchDiff > 0) {
            // Swipe right
            changeSlide(-1);
        } else {
            // Swipe left
            changeSlide(1);
        }
    } else {
        // Tap control
        if (touchEndX < slideWidth / 2) {
            // Tap on left side
            changeSlide(-1);
        } else {
            // Tap on right side
            changeSlide(1);
        }
    }
}

// Keyboard controls (for desktop)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Add touch event listeners
slideshowContainer.addEventListener('touchstart', handleTouchStart, false);
slideshowContainer.addEventListener('touchend', handleTouchEnd, false);

// Load images and start the slideshow when the page loads
window.onload = () => {
    loadImages();
    setTimeout(() => {
        startSlideshow();
    }, 100);
};