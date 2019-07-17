const express = require('express') 
const requireAuth = require('../../middlewares/requireAuth.middleware')
const {getBooking, getBookings, deleteBooking, updateBooking, addBooking} = require('./booking.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBookings)
router.post('/',requireAuth, addBooking)
router.get('/:id',getBooking)
router.put('/:id',requireAuth, updateBooking)
router.delete('/:id',requireAuth, deleteBooking)

module.exports = router