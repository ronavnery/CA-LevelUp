'use strict';
import httpService from './http.service';

export default {
    getUsers,
    getUserById,
    getUserByUserName,
    add,
    remove,
    update
}


var users = [{
        "_id": 'usrId1',
        "name": "Harding Holden",
        "userName": "HardingH11",
        "dateJoined": 1545835345590.0,
        "email": "pughthomas@retrack.com",
        "password": "aliquip89",
        "userImg": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
        "skillTags": [
            "Web Development",
            "Spiritualism"
        ],
        "offers": ['ofrId1'],
        "wishlist": [],
        "leveledUpIn": []
    },
    {
        "_id": "usrId2",
        "name": "Jay Mirchaet",
        "userName": "Jay4life",
        "dateJoined": 1524501205222.0,
        "email": "kelliherman@retrack.com",
        "password": "ipsum83",
        "userImg": "https://www.picmonkey.com/blog/wp-content/uploads/2016/11/1-intro-photo-final.jpg",
        "skillTags": [
            "Dj",
            "Web Development",
            "Drawing"
        ],
        "offers": ['ofrId2'],
        "wishlist": [],
        "leveledUpIn": []
    },
    {

    }
]

function getUsers() {
    return Promise.resolve(users)
}

function getUserById(_id) {
    const user = users.find(user => user._id === _id)
    return Promise.resolve(user)
}

function getUserByUserName(username) {
    const user = users.find(user => user.userName === username)
    return Promise.resolve(user)
}

function add(newUser) {
    users.push(newUser)
    return Promise.resolve(newUser)
}

function remove(_id) {
    const idx = users.findIndex(user => user._id === _id)
    users.splice(idx, 1);
    return Promise.resolve(idx)
}

function update(updatedUser) {
    const idx = users.findIndex(user => user._id === updatedUser._id)
    users.splice(idx, 1, updatedUser);
    return Promise.resolve(updatedUser)
}
// var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))

// function getLoggedinUser() {
//     return loggedInUser;
// }



// async function login(user) {
//     try {
//         const returnedUser = await httpService.post(_getUrl('login'), user)
//         return returnedUser
//     }
//     catch (err) {
//         throw err
//     }
// }

// async function logOut() {
//     try {
//          await httpService.post(_getUrl('logout'))
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


function _getUrl(route = '') {
    return `user/${route}`
}

function _getAuthUrl(route = '') {
    return `auth/${route}`
}

/* Database User Service Functions:
async function login(credentials) {
    try {
        const registeredUser = await httpService.post(_getAuthUrl('login'), credentials)
        console.log(registeredUser)
        return registeredUser
    }
    catch (err) {
        throw err
    }
}

async function getProfile(userName) {
    try {
        const user = await httpService.get(_getUrl(userName))
        return user;
    } 
    catch (err) {
        throw err;
    }
}

async function addUser(newUser) {
    try {
        const addedUser = await httpService.post(_getAuthUrl('signup'), newUser)
        return addedUser;
    }
    catch (err) {
        throw err
    }
}




export default {
    login,
    getProfile
    // getLoggedinUser,
    // logOut,
    // deleteUser,
    addUser
}
*/