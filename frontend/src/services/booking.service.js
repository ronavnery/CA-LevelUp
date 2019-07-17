'use strict';
import httpService from './http.service';

export default {
    add,
    // getLoggedinUser,
    // logOut,
    // deleteUser,
}

function add(bookingReq) {
    return httpService.post(_getUrl(), bookingReq)
}

function _getUrl(id = '') {
    return `booking/${id}`
}
