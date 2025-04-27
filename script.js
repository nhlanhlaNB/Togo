// State variables
let currentLang = 'english'; // Default language
let currentSlide = 1; // Current slide index
const totalSlides = 3; // Total number of slides per language

// Function to show slides based on selected language
function showSlides(lang) {
    currentLang = lang; // Update language
    currentSlide = 1; // Reset to first slide
    updateSlides(); // Update displayed slide
}

// Function to update the displayed slide
function updateSlides() {
    // Hide all slides by removing 'active' class and setting display to none
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none'; // Explicitly hide
    });

    // Show the current slide by adding 'active' class and setting display to block
    const slideId = `${currentLang}-slide-${currentSlide}`;
    const slide = document.getElementById(slideId);
    if (slide) {
        slide.classList.add('active');
        slide.style.display = 'block'; // Explicitly show
    }
}

// Function to navigate to the previous slide
function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--; // Decrement slide index
        updateSlides(); // Update displayed slide
    }
}

// Function to navigate to the next slide
function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++; // Increment slide index
        updateSlides(); // Update displayed slide
    }
}

// Initialize with English slides on page load
document.addEventListener('DOMContentLoaded', () => {
    updateSlides(); // Ensure the first slide is displayed on load
});
