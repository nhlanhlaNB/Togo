// Initialize slide state
let currentLang = 'english';
let currentSlideIndex = 0;
const slides = {
    english: [],
    french: []
};

// Generate slides dynamically
// Generate slides dynamically
function generateSlides() {
    const englishContainer = document.getElementById('englishSlidesContainer');
    const frenchContainer = document.getElementById('frenchSlidesContainer');
    
    if (!englishContainer || !frenchContainer) {
        console.error('Slide containers not found');
        return;
    }
    
    // Generate English slides (1-96)
    for (let i = 1; i <= 96; i++) {
        const pageNum = i.toString().padStart(4, '0'); 
        const slideNum = i;
        
        const slideHTML = `
            <div class="slide english-slide">
                <div class="slide-caption">
                    <h3>Slide ${slideNum}</h3>
                </div>
                <img src="slides/eng/Talk__ECOWAS_Togo_Day_1 (1)_page-${pageNum}.jpg"
                     alt="Slide ${slideNum}" 
                     class="slide-image">
            </div>
        `;
        englishContainer.innerHTML += slideHTML;
    }
    
    // Generate French slides (1-96)
    for (let i = 1; i <= 96; i++) {
        const pageNum = i.toString().padStart(4, '0'); 
        const slideNum = i;
        
        const slideHTML = `
            <div class="slide french-slide">
                <div class="slide-caption">
                    <h3>Diapositive ${slideNum}</h3>
                </div>
                <img src="slides/fra/Talk__ECOWAS_Togo_Day_1_French (1)_page-${pageNum}.jpg"
                     alt="Diapositive ${slideNum}" 
                     class="slide-image">
            </div>
        `;
        frenchContainer.innerHTML += slideHTML;
    }
    
    slides.english = document.querySelectorAll('.english-slide');
    slides.french = document.querySelectorAll('.french-slide');
    console.log('English slides:', slides.english.length);
    console.log('French slides:', slides.french.length);
}

// Update button text based on language
function updateButtonText() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn && nextBtn) {
        if (currentLang === 'french') {
            prevBtn.textContent = 'Précédent';
            nextBtn.textContent = 'Suivant';
        } else {
            prevBtn.textContent = 'Previous';
            nextBtn.textContent = 'Next';
        }
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
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    if (slides[currentLang][currentSlideIndex]) {
        console.log(`Showing ${currentLang} slide ${currentSlideIndex + 1}`);
        slides[currentLang][currentSlideIndex].classList.add('active');
    } else {
        console.error(`No slide found for ${currentLang} at index ${currentSlideIndex}`);
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
    menu.classList.toggle('show');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    generateSlides();
    updateSlides();
    updateButtonText();
});