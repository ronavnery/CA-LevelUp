'use strict';
import httpService from './http.service';

export default {
    add,
    getUserInbox
    // getLoggedinUser,
    // logOut,
    // deleteUser,
}

function add(bookingReq) {
    return httpService.post(_getUrl(), bookingReq)
}

async function getUserInbox(inboxId) {
    try {
        const inbox = await httpService.get(_getUrl()+'/inbox', inboxId)
        return inbox
    }
    catch(err) {}
}

function _getUrl(id = '') {
    return `booking/${id}`
}
