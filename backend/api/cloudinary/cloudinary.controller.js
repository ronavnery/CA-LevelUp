const cloudinaryService = require('./cloudinary.service')

module.exports = {
    uploadFile
}

async function uploadFile(req, res) {
    console.log('got req in cloud controller:', req.file)
    if(!req.file) res.send('');
    const fileUrl = await cloudinaryService.upload(req.file)
    res.send(fileUrl)
}