function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('collapse');
}

const combinedContext = `
[PDF Research Document]: This is a sample context from a 70-page PDF about the Ecowas Big Data Framework. It focuses on improving statistics using big data and AI, including data collection methods, AI-driven analysis, and statistical enhancements for Ecowas member states. For more details, refer to the full document.
`.trim();

function formatBotResponse(responseText) {
    let formattedText = responseText;
    const listRegex = /(\d+\.\s+)([^\n]+)/g;
    if (listRegex.test(formattedText)) {
        formattedText = formattedText.replace(listRegex, (match, number, item) => `<li>${item.trim()}</li>`);
        formattedText = `<ul>${formattedText}</ul>`;
    }
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\n/g, '<br>');
    return formattedText;
}

async function sendMessage() {
    const inputElement = document.getElementById('userInput');
    const chatBody = document.getElementById('chatBody');
    const question = inputElement.value.trim();

    if (!question) {
        alert('Please enter a question.');
        return;
    }

    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user-message';
    userMessage.textContent = question;
    chatBody.appendChild(userMessage);
    inputElement.value = '';

    chatBody.scrollTop = chatBody.scrollHeight;

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer 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`, // Replace with your actual OpenRouter API key
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'meta-llama/llama-3.1-8b-instruct:free',
                messages: [
                    { role: 'system', content: `
You are a helpful assistant specializing in Ecowas framework. You must answer questions based solely on the provided context from a 70-page PDF research document. The context is as follows:

${combinedContext}

If a user's question is off-topic (i.e., not related to Ecowas Framework), do not answer the question. Instead, politely inform the user that the question is off-topic and suggest relevant questions they can ask about Ecowas Big Data framework. For example, you might suggest: "How to improve statistics using big data and AI?"
`},
                    { role: 'user', content: question },
                ],
                max_tokens: 500,
                temperature: 0.7,
            }),
        });

        typingIndicator.remove();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot-message';
        botMessage.innerHTML = formatBotResponse(data.choices[0].message.content.trim());
        chatBody.appendChild(botMessage);
    } catch (error) {
        typingIndicator.remove();
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot-message';
        botMessage.textContent = `Error: Failed to get a response from the API. ${error.message}. Please check your API key or try again later.`;
        chatBody.appendChild(botMessage);
    }

    chatBody.scrollTop = chatBody.scrollHeight;
}

window.onload = function() {
    const chatBody = document.getElementById('chatBody');
    const initialMessage = document.createElement('div');
    initialMessage.className = 'chat-message bot-message';
    initialMessage.textContent = 'Hello! I’m the Ecowas Big Data Chatbot. Ask me about improving statistics using big data and AI.';
    chatBody.appendChild(initialMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
};

