const bookingService = require('./booking.service') 

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
    res.send({booking})
}

async function addBooking(req, res) {
    console.log('in controller, req.body is:', req.body)
    const booking = await bookingService.add(req.body,req.session.user)
    console.log('in controller after service, booking is:', booking)
    booking.createdBy = req.session.user
    console.log('req.session.user is:', req.session.user)
    res.send({booking})
}

module.exports = {
    getBooking,
    getBookings,
    deleteBooking,
    addBooking,
    updateBooking
}