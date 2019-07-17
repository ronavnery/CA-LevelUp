'use strict';
import httpService from './http.service';


function _getUrl(route = '') {
    return `user/${route}`
}

function _getAuthUrl(route = '') {
    return `auth/${route}`
}


async function getUsers(filterBy = null) {
    try {
        const users = await httpService.get(_getUrl(), filterBy)
        return users
    }
    catch(err) {
        throw err
    }
}

async function login(credentials) {
    try {
        const registeredUser = await httpService.post(_getAuthUrl('login'), credentials)
        if (registeredUser) sessionStorage.setItem('loggedInUser', JSON.stringify(registeredUser));
        
        console.log(registeredUser)
        return registeredUser
    }
    catch (err) {
        throw err
    }
}

async function logout() {
    try {
        await httpService.get(_getAuthUrl('logout'))
        sessionStorage.clear()
        return 'All Good';
    } 
    catch(err) {
        throw err
    }
}

async function getProfileByNickname(nickName) {
    try {
        const user = await httpService.get(_getUrl('user/'+nickName))
        return user;
    } 
    catch (err) {
        throw err;
    }
}

async function add(newUser) {
    try {
        const addedUser = await httpService.post(_getAuthUrl('signup'), newUser)
        sessionStorage.setItem('loggedInUser', JSON.stringify(addedUser));
        return addedUser;
    }
    catch (err) {
        throw err
    }
}

async function remove(userId) {
    try {
        const idx = await httpService.delete(_getUrl(`${userId}`))
        return idx
    }
    catch(err) {
        throw err
    }
}

async function update(updatedUser) {
    try {
        const updated = await httpService.put(_getUrl(), updatedUser)
        return updated
    }
    catch(err) {
        throw err
    }
}

async function checkIfLoggedIn() {
    try {
        const user = await httpService.get(_getUrl('loggedin'))
        return  user
    }
    catch (err) {
        throw err
    }
}

export default {
    login,
    getProfileByNickname,
    add,
    remove,
    update,
    getUsers,
    logout,
    checkIfLoggedIn
}
