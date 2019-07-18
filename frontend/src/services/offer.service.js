'use strict';
import httpService from './http.service';

export default {
    query,
    add,
    update,
    remove,
    getById,
}

function query(filter) {
    return httpService.get(_getUrl(), filter)
} 

function add(offer) {
    return httpService.post(_getUrl(), offer)
}

function update(offer) {
    return httpService.put(_getUrl(offer._id), offer)
}

function remove(_id) {
    return httpService.delete(_getUrl(_id))
}

function getById(_id) {
    return httpService.get(_getUrl(_id))
}

function _getUrl(id = '') {
    return `offer/${id}`
}





