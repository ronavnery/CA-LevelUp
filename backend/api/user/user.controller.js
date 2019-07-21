const userService = require('./user.service')
const offerService = require('../offer/offer.service')

async function login(req, res) {
    const user = await userService.checkCredentials(req.body)
    res.json(user)
}

async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
    res.send(user)
}
async function getUserByNickname(req, res) {
    const user = await userService.getByNickname(req.params.nick)
    res.send(user)
}
  
const getUsers = async (req, res) => {
    const filterBy = req.query
    const users = await userService.query(filterBy)
    res.send(users)
}

async function addUser(req, res) {
    const newUser = req.body
    const addedUser = await userService.add(newUser)
    res.send(addedUser);
}

async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.send({})
}

async function updateUser(req, res) {
    try {
        const user = await userService.getByNickname(req.body.nickName);
        const updatedUser = await userService.update(req.body);
        if (user.imgUrl !== updatedUser.imgUrl) await offerService.updateOfferMakerImg(updatedUser)
        // console.log('sending back updated user:', updatedUser)
        res.send(updatedUser)
    }
    catch(err) {
        throw err
    }
}

async function checkIfLoggedIn(req, res) {
    if (req.session.user) res.send(req.session.user)
    else return res.status(418).end('No User Logged In')
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    login,
    addUser,
    updateUser,
    getUserByNickname,
    checkIfLoggedIn
}