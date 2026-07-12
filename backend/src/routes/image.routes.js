
const express = require("express");
const router = express.Router();

const imageController = require("../controllers/image.controller");
const authMiddleware = require("../middlewares/auth.middleware");



router.post("/generate",authMiddleware, imageController.createGeneratedImage );
router.get( "/my-images",authMiddleware,imageController.getMyImages);


module.exports = router;