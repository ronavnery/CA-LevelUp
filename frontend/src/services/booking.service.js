'use strict';
import httpService from './http.service';

export default {
    add,
    update,
    getUserInbox,
    // getLoggedinUser,
    // logOut,
    // deleteUser,
}

function add(bookingReq) {
    return httpService.post(_getUrl(), bookingReq)
}

async function getUserInbox(userId) {
    try {
        const inbox = await httpService.get(_getUrl() + '/inbox', { id: userId })
        return inbox
    }
    catch (err) { }
}

async function update(bookingReq) {
    console.log(bookingReq)
    const newBooking = await httpService.put(_getUrl(), bookingReq)
    return newBooking
}

function _getUrl(id = '') {
    return `booking/${id}`
}
