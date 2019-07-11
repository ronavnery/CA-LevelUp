'use strict';

import httpService from './http.service';

export default {
    query,
    add,
    update,
    remove,
    getById,
}

function query() {
    return [
        {
            _id: "o001",
            createdAt: 5402391238021,
            title: 'Learn juggling',
            description: 'Will teach you to juggle 3 balls in no time',
            imgs: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJsQwe5oP-kItVhzvckqm96mGtCKZWQN6524UoqbGrDvd6eLaZ'],
            tags: ['Hobbies', 'Juggling'],
            requirements: ['Two hands'],
            stars: 4,
            createdBy: { _id: 'u005', name: 'Tami', img: "https://www.freepik.com/free-photos-vectors/flower" },
            wishers: [{ _id: 'u002' }, { _id: 'u009' }],
            reviews: [{ _id: 'r003' }, { _id: 'r090' }],
            leveledUp: [{ _id: 'u031' }],
            location:
            {
                type: 'faceToFace',
                address: '24 Yeyezkel st, Tel - Aviv',
                coords: { lat: 12.231231, lng: 32.321242 }
            }
        },
        {
            _id: "o001",
            createdAt: 5402391238021,
            title: 'Learn juggling',
            description: 'Will teach you to juggle 3 balls in no time',
            imgs: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJsQwe5oP-kItVhzvckqm96mGtCKZWQN6524UoqbGrDvd6eLaZ'],
            tags: ['Hobbies', 'Juggling'],
            requirements: ['Two hands'],
            stars: 4,
            createdBy: { _id: 'u005', name: 'Tami', img: "https://www.freepik.com/free-photos-vectors/flower" },
            wishers: [{ _id: 'u002' }, { _id: 'u009' }],
            reviews: [{ _id: 'r003' }, { _id: 'r090' }],
            leveledUp: [{ _id: 'u031' }],
            location:
            {
                type: 'faceToFace',
                address: '24 Yeyezkel st, Tel - Aviv',
                coords: { lat: 12.231231, lng: 32.321242 }
            }
        }
    ]
}

function add(offer) {
    return offer
    return httpService.post(_getUrl(), offer)
}
function update(offer) {
    return offer
    return httpService.put(_getUrl(offer._id), offer)
}
function remove(_id) {
    return _id
    return httpService.delete(_getUrl(_id))
}
function getById(_id) {
    return _id
    return httpService.get(_getUrl(_id))
}
function _getUrl(id = '') {
    return `offer/${id}`
}