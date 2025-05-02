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
    
    if (!englishContainer || !frenchContainer) {
        console.error('Slide containers not found');
        return;
    }
    
    // Generate English slides (1-93)
    for (let i = 1; i <= 93; i++) {
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
    
    // Generate French slides (1-93)
    for (let i = 1; i <= 93; i++) {
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

// Chatbot functionality
const chatbotResponses = {
    greeting: [
        "Hello! How can I help you with information about the ECOWAS Big Data Workshop?",
        "Welcome! I'm here to answer your questions about the workshop. What would you like to know?",
        "Hi there! Ask me anything about the ECOWAS Big Data Workshop!"
    ],
    workshop: [
        "The workshop focuses on unlocking Big Data for ECOWAS statistics. It's led by Prof. Abejide Ade-Ibijola at the University of Johannesburg.",
        "This is a transformative workshop that aims to build a regional framework for Big Data in ECOWAS. It's supported by the World Bank's HISWA Project."
    ],
    bigdata: [
        "Big Data refers to extremely large data sets that may be analyzed computationally to reveal patterns, trends, and associations. In the ECOWAS context, it can help with regional statistics, policy planning, and sustainable development.",
        "Big Data analytics can transform how ECOWAS countries collect, process and utilize statistical information for policy decisions."
    ],
    ecowas: [
        "ECOWAS stands for the Economic Community of West African States. It's a regional political and economic union of fifteen countries located in West Africa.",
        "ECOWAS was established on May 28, 1975, with the signing of the Treaty of Lagos. Its mission includes promoting economic integration across the region."
    ],
    default: [
        "I don't have specific information about that. Would you like to know about the workshop, Big Data, or ECOWAS?",
        "I'm not sure about that. Can I help you with information about the workshop objectives or participants instead?",
        "That's a bit outside my knowledge area. Feel free to ask about the workshop, ECOWAS, or Big Data initiatives!"
    ]
};

// Variables for chatbot state
let isChatbotOpen = false;
const chatbotButton = document.getElementById('chatbotButton');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

// Function to toggle chatbot visibility
function toggleChatbot() {
    isChatbotOpen = !isChatbotOpen;
    if (isChatbotOpen) {
        chatbotContainer.classList.add('active');
        // If it's the first time opening, show greeting
        if (chatbotMessages.children.length === 0) {
            setTimeout(() => {
                addBotMessage(getRandomResponse('greeting'));
            }, 500);
        }
    } else {
        chatbotContainer.classList.remove('active');
    }
}

// Function to get a random response from a category
function getRandomResponse(category) {
    const responses = chatbotResponses[category] || chatbotResponses.default;
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

// Function to add a message from the user
function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbot-message', 'user-message');
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Function to add a message from the bot
function addBotMessage(message) {
    // Add typing indicator first
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('chatbot-typing');
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.classList.add('typing-dot');
        typingIndicator.appendChild(dot);
    }
    chatbotMessages.appendChild(typingIndicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Then remove typing indicator and add actual message after a delay
    setTimeout(() => {
        chatbotMessages.removeChild(typingIndicator);
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbot-message', 'bot-message');
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 1200);
}

// Function to process user message and generate response
function processMessage(message) {
    message = message.toLowerCase();
    
    // Check for different keywords and topics
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return getRandomResponse('greeting');
    } else if (message.includes('workshop') || message.includes('event') || message.includes('conference')) {
        return getRandomResponse('workshop');
    } else if (message.includes('big data') || message.includes('data') || message.includes('analytics')) {
        return getRandomResponse('bigdata');
    } else if (message.includes('ecowas') || message.includes('economic community') || message.includes('west africa')) {
        return getRandomResponse('ecowas');
    } else {
        return getRandomResponse('default');
    }
}

// Function to handle sending a message
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        addUserMessage(message);
        chatbotInput.value = '';
        
        // Process message and respond after a short delay
        setTimeout(() => {
            const response = processMessage(message);
            addBotMessage(response);
        }, 500);
    }
}

// Event listeners for chatbot interactions
chatbotButton.addEventListener('click', toggleChatbot);
chatbotClose.addEventListener('click', toggleChatbot);
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    generateSlides();
    updateSlides();
    updateButtonText();
});