// backend/src/controllers/image.controller.js

const imageService = require("../services/image.service");
const translationService = require("../services/translation.service");
const imagekitService = require("../services/imagekit.service");
const imageModel = require("../models/image.model");

const createGeneratedImage = async (req, res) => {
    try {
        const { prompt, language = "English" } = req.body;

        // Validate prompt
        if (!prompt || !prompt.trim()) {
            return res.status(400).json({
                success: false,
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
            console.log(
                "English prompt detected. Skipping translation."
            );
        }

        // Generate image using Cloudflare
        console.log(
            `Generating image using: "${finalPrompt}"`
        );

        const imageBuffer =
            await imageService.generateCloudflareImage(finalPrompt);

        console.log("Image generated successfully.");

        // Upload image to ImageKit
        console.log("Uploading image to ImageKit...");

        const uploadedImage =
            await imagekitService.uploadImage(imageBuffer);

        console.log(
            `ImageKit URL: ${uploadedImage.imageUrl}`
        );

        // Save image in MongoDB
        const savedImage = await imageModel.create({
            user: req.user.id,
            language,
            imageUrl: uploadedImage.imageUrl,
            imageFileId: uploadedImage.imageFileId
        });

        console.log(
            `Image saved in MongoDB: ${savedImage._id}`
        );

        return res.status(201).json({
            success: true,
            message: "Image successfully generated and saved.",
            image: savedImage
        });

    } catch (error) {
        console.error(
            "Controller Error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getMyImages = async (req, res) => {
    try {
        const userId = req.user.id;

        const images = await imageModel
            .find({
                user: userId
            })
            .sort({
                createdAt: -1
            });

        return res.status(200).json({
            success: true,
            count: images.length,
            images
        });

    } catch (error) {
        console.error("Get Images Error:", error.message);

        return res.status(500).json({
            success: false,
            error: "Failed to fetch images."
        });
    }
};


module.exports = {
    createGeneratedImage,
    getMyImages
};
