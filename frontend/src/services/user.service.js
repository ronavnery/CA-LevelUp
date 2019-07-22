'use strict';
import httpService from './http.service';

let safeToLogout = true;

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
    catch (err) {
        throw err
    }
}

async function login(credentials) {
    try {
        const registeredUser = await httpService.post(_getAuthUrl('login'), credentials)
        if (registeredUser) sessionStorage.setItem('loggedInUser', JSON.stringify(registeredUser));

        else throw new Error('Invalid Username or Password');
        console.log(registeredUser)
        safeToLogout = true;
        return registeredUser
    }
    catch (err) {
        console.log('in user service got err', err.message)
        throw err.message
    }
}
async function logout() {
    try {
        sessionStorage.clear()


        if (safeToLogout) {
            safeToLogout = false;
            await httpService.get(_getAuthUrl('logout'))
        }

        return 'All Good';
    } catch (err) {
        throw err
    }
}

async function getProfileByNickname(nickName) {
    try {
        const user = await httpService.get(_getUrl('user/' + nickName))
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
    catch (err) {
        throw err
    }
}

async function update(updatedUser) {
    try {
        const updated = await httpService.put(_getUrl(), updatedUser)
        sessionStorage.setItem('loggedInUser', JSON.stringify(updated))
        return updated
    }
    catch (err) {
        throw err
    }
}

async function checkIfLoggedIn() {
    // try {
    //     const user = await httpService.get(_getUrl('loggedin'))
    //     return user
    // }
    // catch (err) {
    //     throw err
    // }
    try {
        const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (user) return Promise.resolve(user);
        else return Promise.reject('No User Found');
    } catch (err) {
        throw err;
    }
}

async function getUserInbox(userId) {
    try {
        const msgs = await httpService.get(_getUrl() + '/msgs', userId)
        return msgs
    }
    catch (err) {
        throw err
    }
}

function logUserCategoryChoice(category, user) {
    console.log('logging with', category, user )
    var storedCategories = JSON.parse(localStorage.getItem(user))
    if (!storedCategories) storedCategories = []
    storedCategories.push(category)
    localStorage.setItem(user, JSON.stringify(storedCategories));
}

function getUserPopularCategory(user = 'visitor') {
    var storedCategories = JSON.parse(localStorage.getItem(user))
    if (!storedCategories) {
        localStorage.setItem(user, JSON.stringify([]));
        storedCategories = [];
    }
    function mode(arr) {
        return arr.sort((a, b) =>
            arr.filter(v => v === a).length
            - arr.filter(v => v === b).length
        ).pop();
    }
    // console.log('mode is!!!', mode(storedCategories))
    return mode(storedCategories);
}

export default {
    login,
    getProfileByNickname,
    add,
    remove,
    update,
    getUsers,
    logout,
    checkIfLoggedIn,
    logUserCategoryChoice,
    getUserPopularCategory,
    getUserInbox
}
