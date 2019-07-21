const bookingService = require('./booking.service')
// const offerService = require('../offer/offer.service') 
// const userService = require('../user/user.service') 

const getBookings = async (req, res) => {
    const bookings = await bookingService.query(req.query)
    res.send(bookings)
}

async function getBooking(req, res) {
    const booking = await bookingService.getById(req.params.id)
    res.send(booking)
}

async function deleteBooking(req, res) {
    await bookingService.remove(req.params.id)
    res.send({})
}

async function updateBooking(req, res) {
    const booking = await bookingService.update(req.body)
    res.send({ booking })
}

async function getInbox(req, res) {
    console.log('query', req.query)
    const inbox = await bookingService.getInbox(req.query.id)
    res.send(inbox)
}

async function addBooking(req, res) {
    console.log('Controller: Adding to booking db')
    const booking = await bookingService.add(req.body, req.session.user)
    console.log('Controller: Updating offer db with booking')
    // booking.createdBy = req.session.user
    // console.log('Controller: req.session.user is:', req.session.user)
    res.send({ booking })
}

module.exports = {
    getBooking,
    getBookings,
    deleteBooking,
    addBooking,
    updateBooking,
    getInbox
}