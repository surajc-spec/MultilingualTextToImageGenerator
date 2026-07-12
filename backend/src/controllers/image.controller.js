// backend/src/controllers/image.controller.js
const fs = require('fs');
const path = require('path');
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

        // 2. Generate a unique file name using date/time stamps
        const now = new Date();
        const timestamp = now.getFullYear() +
            String(now.getMonth() + 1).padStart(2, '0') +
            String(now.getDate()).padStart(2, '0') + '_' +
            String(now.getHours()).padStart(2, '0') +
            String(now.getMinutes()).padStart(2, '0') +
            String(now.getSeconds()).padStart(2, '0');
        
        const fileName = `generated_${timestamp}.jpg`;
        
        // 3. Save the image to your backend directory
        // Feel free to update this path destination to a specific folder if needed
        const outputPath = path.join(__dirname, '../../', fileName);
        fs.writeFileSync(outputPath, imageBuffer);

        // 4. Respond back to the frontend client app
        return res.status(200).json({
            success: true,
            message: "Image successfully created and stored.",
            fileName: fileName
        });

    } catch (error) {
        console.error("Controller Error:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createGeneratedImage
};
