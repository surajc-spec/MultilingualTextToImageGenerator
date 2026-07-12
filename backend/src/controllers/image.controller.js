// backend/src/controllers/image.controller.js

const imageService = require("../services/image.service");
const translationService = require("../services/translation.service");

const createGeneratedImage = async (req, res) => {
    try {
        const { prompt, language = "English" } = req.body;

        // Validate prompt
        if (!prompt || !prompt.trim()) {
            return res.status(400).json({
                error: "A text prompt parameter is required."
            });
        }

        const originalPrompt = prompt.trim();

        console.log(`Original Prompt: "${originalPrompt}"`);
        console.log(`Selected Language: ${language}`);

        let finalPrompt = originalPrompt;

        // Translate only non-English prompts
        if (language.toLowerCase() !== "english") {
            console.log("Translating prompt to English...");

            finalPrompt = await translationService.translatePrompt(
                originalPrompt,
                language
            );

            console.log(`Translated Prompt: "${finalPrompt}"`);
        } else {
            console.log("English prompt detected. Skipping translation.");
        }

        // Generate image using English prompt
        console.log(`Generating image using: "${finalPrompt}"`);

        const imageBuffer =
            await imageService.generateCloudflareImage(finalPrompt);

        // Convert image buffer to Base64 Data URI
        const base64Image = `data:image/jpeg;base64,${imageBuffer.toString(
            "base64"
        )}`;

        return res.status(200).json({
            success: true,
            message: "Image successfully created.",
            originalPrompt,
            translatedPrompt: finalPrompt,
            language,
            image: base64Image
        });

    } catch (error) {
        console.error("Controller Error:", error.message);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    createGeneratedImage
};