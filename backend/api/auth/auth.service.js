const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(nickName, password) {
    logger.debug(`auth.service - login with nickName: ${nickName}`)
    if (!nickName || !password) return Promise.reject('email and password are required!')

    const user = await userService.getByNickname(nickName)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')
    delete user.password;

    return user;
}

async function signup(newUser) {
    const {email, password, nickName} = newUser
    logger.debug(`auth.service - signup with email: ${email}, nickName: ${nickName}`)
    if (!email || !password || !nickName) return Promise.reject('email, Nickname and password are required!')
    const checkIfUniqueUser = await userService.verifyUnique(email, nickName)
    if (!checkIfUniqueUser) throw new Error('Nickname or Email already registered')
    const hash = await bcrypt.hash(password, saltRounds)
    newUser.password = hash;
    newUser.createdAt = Date.now();
    const user = await userService.add(newUser)
    delete user.password;
    return user;
}

module.exports = {
    signup,
    login,
}