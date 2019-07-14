const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(userName, password) {
    logger.debug(`auth.service - login with username: ${userName}`)
    if (!userName || !password) return Promise.reject('email and password are required!')

    const user = await userService.getByUsername(userName)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')
    delete user.password;
    return user;
}

async function signup(newUser) {
    const {email, password, userName} = newUser
    logger.debug(`auth.service - signup with email: ${email}, username: ${userName}`)
    if (!email || !password || !userName) return Promise.reject('email, username and password are required!')
    const checkIfUniqueUser = userService.verifyUnique({email, userName})
    if (!checkIfUniqueUser) return Promise.reject('Username or Email already registered') 
    const hash = await bcrypt.hash(password, saltRounds)
    newUser.password = hash;
    const user = await userService.add(newUser)
    delete user.password;
    return user;
}

module.exports = {
    signup,
    login,
}