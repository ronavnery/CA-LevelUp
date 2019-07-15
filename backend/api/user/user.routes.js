const express = require('express')
const requireMiddleware = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, deleteUser,login} = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getUsers)


router.get('/:id', getUser)
router.delete('/:id',  requireMiddleware.requireAdmin , deleteUser)

module.exports = router