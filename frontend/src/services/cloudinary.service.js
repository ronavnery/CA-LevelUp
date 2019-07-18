import httpService from './http.service';

function _getCloudUrl (route= '') {
    return `cloudinary/${route}`
}   



async function uploadImgToCloud(file) {
    const form = new FormData();
    form.append("imgUpload", file);
    try {
        const fileUrl = await httpService.post(_getCloudUrl(), form)
        return fileUrl
    } catch(err) {
        throw err
    }
}


export default {
    uploadImgToCloud
}