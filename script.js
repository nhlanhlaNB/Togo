        // Initialize slide state
        let currentLang = 'english';
        let currentSlideIndex = 0;
        const slides = {
            english: [],
            french: document.querySelectorAll('.french-slide')
        };

        // Generate English slides dynamically
        function generateEnglishSlides() {
            const container = document.getElementById('englishSlidesContainer');
            
            for (let i = 1; i <= 96; i++) {
                const pageNum = i.toString().padStart(4, '0');
                const slideNum = i + 1;
                
                const slideHTML = `
                    <div class="slide english-slide">
                        <div class="slide-caption">
                            <h3>Slide ${slideNum}</h3>
                        </div>
                        <img src="slides/eng/Talk__ECOWAS_Togo_Day_1_page-${pageNum}.jpg" alt="Slide ${slideNum}" style="width: 70%; max-height: 350px; object-fit: contain; border-radius: 8px; margin: 0 auto 1rem; display: block; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    </div>
                `;
                
                container.innerHTML += slideHTML;
            }
            
            // Store references to the generated slides
            slides.english = document.querySelectorAll('.english-slide');
        }

        // Show slides based on language
        function showSlides(lang) {
            currentLang = lang;
            currentSlideIndex = 0;
            updateSlides();
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
            generateEnglishSlides();
            updateSlides();
        });