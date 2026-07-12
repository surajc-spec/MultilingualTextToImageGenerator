const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        language: {
            type: String,
            required: true,
            default: "English"
        },

        imageUrl: {
            type: String,
            required: true
        },

        imageFileId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const imageModel = mongoose.model("Image", imageSchema);

module.exports = imageModel;