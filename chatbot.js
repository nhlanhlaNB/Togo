const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const pdf = require('pdf-parse');
const cors = require('cors');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests and enable CORS
app.use(express.json());
app.use(cors());

// Extract text from PDF document
async function extractPdfText(filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        const cleanedText = data.text
            .replace(/\s+/g, ' ') // Normalize whitespace
            .trim();
        return cleanedText;
    } catch (error) {
        console.error('Error extracting PDF text:', error.message);
        return '[PDF Research Document]: PDF content unavailable. Please ensure the PDF file exists at the specified path.';
    }
}

// Load PDF context
let combinedContext = '';
(async () => {
    try {
        const pdfContent = await extractPdfText('PDF.pdf');
        const maxContextLength = 5000;
        combinedContext = `[PDF Research Document]: ${pdfContent.substring(0, maxContextLength)}`;
        console.log('Context loaded successfully');
    } catch (error) {
        console.error('Failed to load context:', error);
        combinedContext = '[Error]: Context could not be loaded. Please try again later.';
    }
})();

// OpenRouter API configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
    console.error('Error: OPENROUTER_API_KEY is not set in the .env file.');
    process.exit(1);
}

// Route to handle chatbot questions
app.post('/ask', async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }

    if (!combinedContext || combinedContext.includes('[Error]')) {
        return res.status(500).json({ error: 'Context failed to load. Please check the server logs.' });
    }

    const systemPrompt = `
You are a helpful assistant specializing in Telkom customer feedback analysis. You must answer questions based solely on the provided context from a 125-page PDF research document. The context is as follows:

${combinedContext}

If a user's question is off-topic (i.e., not related to Telkom customer feedback, services, or pain points), do not answer the question. Instead, politely inform the user that the question is off-topic and suggest relevant questions they can ask about Telkom customer experiences, pain points, or services. For example, you might suggest: "Can I help you with something related to Telkom? For example, you could ask about customer pain points or what customers enjoy about Telkom's services."
`;

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'deepseek/deepseek-chat-v3-0324:free',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: question },
                ],
                max_tokens: 500,
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        const answer = response.data.choices[0].message.content.trim();
        res.json({ answer });
    } catch (error) {
        console.error('OpenRouter API error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to get a response from OpenRouter API.' });
    }
});

// Simple root route
app.get('/', (req, res) => {
    res.send('Telkom Data Science Chatbot Backend is running. Access the frontend via Live Server (e.g., http://127.0.0.1:5500/chatbot.html).');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});