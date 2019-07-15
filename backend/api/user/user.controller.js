const userService = require('./user.service')

async function login(req, res) {
    const user = await userService.checkCredentials(req.body)
    res.json(user)
}

async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
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
    // const loggedInUser = req.session.user;
    // const userToUpdate = req.body
    // if (loggedInUser._id !== userToUpdate)
    try {
        const updatedUser = await userService.update(req.body)
        res.send(updatedUser)
    }
    catch(err) {
        throw err
    }
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    login,
    addUser,
    updateUser
}