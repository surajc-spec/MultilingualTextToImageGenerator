const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('../src/routes/auth.routes')
const cors = require('cors');
const imageRoutes = require('./routes/image.routes')

const app = express()

app.use(cors());
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/v1/images',imageRoutes)

module.exports = app;