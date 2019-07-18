const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { nickName , password } = req.body
    try {
        const user = await authService.login(nickName, password)
        req.session.user = user;
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

async function signup(req, res) {
    try {
        const newUser = req.body
        logger.debug(newUser.email + ", " + newUser.nickName)
        const user = await authService.signup(newUser)
        logger.debug(`auth.route - new user created: ` + JSON.stringify(user))
        req.session.user = user
        res.status(200).send(user)
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        console.log("X" + err.name + "X")
        console.log("0" + err.message + "0")
        if (err.message === 'Nickname or Email already registered') res.status(409).send({error: 'Nickname or Email already registered'})
        // res.status(500).send({ error: 'could not signup, please try later' })
    }
}

async function logout(req, res){
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: 'Could not sign-out user, got error:', err })
    }
}

module.exports = {
    login,
    signup,
    logout
}