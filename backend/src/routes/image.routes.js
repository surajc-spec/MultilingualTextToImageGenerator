// backend/src/routes/image.routes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image.controller');


router.post('/generate', imageController.createGeneratedImage);

module.exports = router;
