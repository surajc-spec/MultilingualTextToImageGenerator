// backend/src/controllers/image.controller.js
const imageService = require('../services/image.service');

const createGeneratedImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "A text prompt parameter is required." });
        }

        console.log(`Processing prompt: "${prompt}"...`);
        
        // 1. Call your image service to fetch raw image bytes
        const imageBuffer = await imageService.generateCloudflareImage(prompt);

        // 2. Convert raw image buffer directly to a base64 Data URI
        const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

        // 3. Respond back to the frontend client app with the image data URI
        return res.status(200).json({
            success: true,
            message: "Image successfully created.",
            image: base64Image
        });

    } catch (error) {
        console.error("Controller Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createGeneratedImage
};
