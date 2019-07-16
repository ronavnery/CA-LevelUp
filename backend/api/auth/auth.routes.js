const express = require('express')
const requireMiddleware = require('../../middlewares/requireAuth.middleware')
const {login, signup, logout} = require('./auth.controller')

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.get('/logout', requireMiddleware.requireAuth, logout)

module.exports = router