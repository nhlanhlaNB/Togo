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

    // Define multiple models and API keys
    const modelsAndKeys = [
        { model: 'meta-llama/llama-3.1-8b-instruct:free', apiKey: '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' },
        { model: 'mistralai/mixtral-8x7b-instruct', apiKey: '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' },
        { model: 'xai/grok-1', apiKey: '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' },
    ];

    let errorMessage = '';

    for (const { model, apiKey } of modelsAndKeys) {
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: model,
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
                errorMessage += `Model ${model} failed with status ${response.status}. `;
                continue; // Try the next model/key pair
            }

            const data = await response.json();
            const botMessage = document.createElement('div');
            botMessage.className = 'chat-message bot-message';
            botMessage.innerHTML = formatBotResponse(data.choices[0].message.content.trim());
            chatBody.appendChild(botMessage);
            return; // Exit the loop on success
        } catch (error) {
            errorMessage += `Model ${model} error: ${error.message}. `;
        }
    }

    // If all attempts fail
    typingIndicator.remove();
    const botMessage = document.createElement('div');
    botMessage.className = 'chat-message bot-message';
    botMessage.textContent = `Error: Failed to get a response from the API. ${errorMessage}Please check your API keys or try again later.`;
    chatBody.appendChild(botMessage);
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

