const express = require('express')
const requireMiddleware = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, deleteUser, updateUser,getUserByNickname, checkIfLoggedIn} = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getUsers)

router.get('/loggedin', checkIfLoggedIn)
router.get('/user/:nick', getUserByNickname)
router.get('/:id', getUser)
router.put('/', requireMiddleware.requireAuth, updateUser)
router.delete('/:id',  requireMiddleware.requireAdmin , deleteUser)

module.exports = router