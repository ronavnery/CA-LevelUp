'use strict';
import axios from 'axios';

export default {
    getRelatedPhotos
}

async function getRelatedPhotos(searchTerm) {
    try {
        const res = await axios.get(`https://api.unsplash.com/search/photos?per_page=6&query=${searchTerm}&orientation=landscape&client_id=288fe127f571edeade19b623a9f4984d9341ea0fc8106452b64347c9203243f4`)
        console.log(res.data)
        return res.data.results.map(img => img.urls.full)
    } catch (err) {
        console.log(err)
    }
}
