// backend/src/services/translation.service.js

require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const translatePrompt = async (text, language) => {
    try {
        if (!text || !text.trim()) {
            throw new Error("Prompt is required.");
        }

        if (!language || language.toLowerCase() === "english") {
            return text.trim();
        }

        console.log(
            "Gemini API Key Loaded:",
            !!process.env.GEMINI_API_KEY
        );

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",

            contents: `
Translate the following ${language} image generation prompt into English.

Preserve the exact meaning.

Do not add new objects, people, styles, lighting, camera details, or artistic details.

Return ONLY the translated English prompt.

Prompt:
"${text}"
            `
        });

        const translatedPrompt = response.text?.trim();

        if (!translatedPrompt) {
            throw new Error(
                "Gemini returned an empty translation."
            );
        }

        return translatedPrompt;

    } catch (error) {
        console.error(
            "Gemini Translation Error:",
            error
        );

        throw error;
    }
};

module.exports = {
    translatePrompt
};