// backend/src/services/imagekit.service.js

const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

const uploadImage = async (imageBuffer) => {
    try {
        if (!imageBuffer) {
            throw new Error("Image buffer is missing.");
        }

        console.log("Is Buffer:", Buffer.isBuffer(imageBuffer));
        console.log("Buffer Size:", imageBuffer.length);

        const base64Image = imageBuffer.toString("base64");

        const fileName = `aura-ai-${Date.now()}.jpg`;

        const result = await imagekit.files.upload({
            file: base64Image,
            fileName: fileName,
            folder: "/aura-ai/generated-images"
        });

        console.log("ImageKit upload successful.");
        console.log("Image URL:", result.url);

        return {
            imageUrl: result.url,
            imageFileId: result.fileId
        };

    } catch (error) {
        console.error("========== IMAGEKIT ERROR ==========");
        console.error("Message:", error.message);
        console.error("Full Error:", error);
        console.error("====================================");

        throw new Error("Failed to upload image.");
    }
};

module.exports = {
    uploadImage
};