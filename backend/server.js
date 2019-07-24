const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const history = require('connect-history-api-fallback');
 
const app = express()

const http = require('http').createServer(app);

const config = require('./config')
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const offerRoutes = require('./api/offer/offer.routes')
const bookingRoutes = require('./api/booking/booking.routes')
const cloudinaryRoutes = require('./api/cloudinary/cloudinary.routes')

const logger = require('./services/logger.service')
const socketService = require('./services/socket.service')

app.use(history())
app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({ url: config.dbURL })
  }))


if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: 'http://localhost:8080',
        credentials: true
    };
    app.use(cors(corsOptions));
}

// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/offer', offerRoutes)
app.use('/api/booking', bookingRoutes)
app.use('/api/cloudinary', cloudinaryRoutes)

socketService.setup(http);




const port = process.env.PORT || 3000;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
}