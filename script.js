// Initialize slide state
let currentLang = 'english';
let currentSlideIndex = 0;
const slides = {
    english: [],
    french: []
};

// Generate slides dynamically
function generateSlides() {
    const englishContainer = document.getElementById('englishSlidesContainer');
    const frenchContainer = document.getElementById('frenchSlidesContainer');
    
    // Generate English slides (1-96)
    for (let i = 1; i <= 96; i++) {
        const pageNum = i.toString().padStart(4, '0');
        const slideNum = i + 1;
        
        const slideHTML = `
            <div class="slide english-slide">
                <img src="slides/eng/Talk__ECOWAS_Togo_Day_1_page-${pageNum}.jpg" 
                     alt="Slide ${slideNum}" 
                     class="slide-image">
                <div class="slide-caption">
                    <h3>Slide ${slideNum}</h3>
                </div>
            </div>
        `;
        englishContainer.innerHTML += slideHTML;
    }
    
    // Generate French slides (1-96)
    for (let i = 1; i <= 96; i++) {
        const pageNum = i.toString().padStart(4, '0');
        const slideNum = i + 1;
        
        const slideHTML = `
            <div class="slide french-slide">
                <img src="slides2/fra/Talk__ECOWAS_Togo_Day_1_French-images-${slideNum}.jpg"
                     alt="Diapositive ${slideNum}" 
                     class="slide-image">
                <div class="slide-caption">
                    <h3>Diapositive ${slideNum}</h3>
                </div>
            </div>
        `;
        frenchContainer.innerHTML += slideHTML;
    }
    
    // Store references to the generated slides
    slides.english = document.querySelectorAll('.english-slide');
    slides.french = document.querySelectorAll('.french-slide');
}

// Update button text based on language
function updateButtonText() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (currentLang === 'french') {
        prevBtn.textContent = 'Précédent';
        nextBtn.textContent = 'Suivant';
    } else {
        prevBtn.textContent = 'Previous';
        nextBtn.textContent = 'Next';
    }
}

// Show slides based on language
function showSlides(lang) {
    currentLang = lang;
    currentSlideIndex = 0;
    updateSlides();
    updateButtonText();
}

// Update visible slide
function updateSlides() {
    // Hide all slides
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide
    if (slides[currentLang][currentSlideIndex]) {
        slides[currentLang][currentSlideIndex].classList.add('active');
    }
}

// Navigation functions
function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateSlides();
    }
}

function nextSlide() {
    if (currentSlideIndex < slides[currentLang].length - 1) {
        currentSlideIndex++;
        updateSlides();
    }
}

// Mobile menu toggle
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    generateSlides();
    updateSlides();
    updateButtonText();
});