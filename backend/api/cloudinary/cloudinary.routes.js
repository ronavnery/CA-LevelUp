const express = require('express') 
const router = express.Router()
const {uploadFile} = require('./cloudinary.controller.js')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post('/', upload.single('imgUpload'), uploadFile)

module.exports = router