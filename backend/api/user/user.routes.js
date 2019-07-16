const express = require('express')
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, deleteUser, updateUser,getUserByNickname} = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getUsers)


router.get('/user/:nick', getUserByNickname)
router.get('/:id', getUser)
router.put('/', requireAuth, updateUser)
router.delete('/:id', requireAuth, deleteUser)

module.exports = router