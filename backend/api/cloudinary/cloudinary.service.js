


const cloudinary = require('cloudinary').v2
const cloudinaryConfig = require('./config.json').cloudinary
cloudinary.config(cloudinaryConfig)


module.exports = {
    upload
}

async function upload(file) {
    try {
        const cloudFile = await cloudinary.uploader.upload(file.path)
        const cloudFileUrl = cloudFile.secure_url
        return cloudFileUrl
    } catch(err) {
        console.log('got err in cloud service:', err)
        throw err
    }
}