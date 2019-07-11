'use strict';
import httpService from './http.service';

export default {
    login,
    // getLoggedinUser,
    // logOut,
    // deleteUser,
}

// var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))

// function getLoggedinUser() {
//     return loggedInUser;
// }


async function login(user) {
    try {
        const registeredUser = await httpService.post(_getUrl('signin'), user)
        return _handleSuccessfulRegister(registeredUser)
    }
    catch (err) {
        throw err
    }
}

// async function login(user) {
//     const returnedUser = await httpService.post(_getUrl('login'), user)
//     try {
//         if (returnedUser) return _handleSuccessfulRegister(returnedUser)
//         return returnedUser
//     }
//     catch (err) {
//         throw err
//     }
// }

// async function logOut() {
//     await httpService.post(_getUrl('logout'))
//     try {
//         sessionStorage.clear()
//     }
//     catch (err) {
//         throw err
//     }
// }

// function deleteUser(userId) {
//     return httpService.delete(_getUrl(userId))
//         .then(res => res.data)
// }

// function _handleSuccessfulRegister(user) {
//     // loggedInUser = user

//     sessionStorage.setItem('loggedInUser', JSON.stringify(user));
//     // eventBus.$emit(USER_LOGIN)
//     return user;
// }

// function _getUrl(method = '') {
//     return `user/${method}`
// }