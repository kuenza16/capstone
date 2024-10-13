const express = require("express")

const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');


const viewRoutes = require('./routes/viewRoutes')

const depositRoutes = require('./routes/depositRoutes')

const withdrawalRoutes = require('./routes/withdrawalRoutes')

const searchRoutes = require('./routes/searchRoutes')

const rtgsRoutes = require('./routes/rtgsRoutes')

const atsRoute = require('./routes/atsRoutes')

const dollarSelling = require('./routes/dollarSelling')

const swiftRoutes = require('./routes/swiftRoutes')

const feedback = require('./routes/feedbackRoutes')






// Use CORS to allow requests from your frontend
app.use(cors({
    origin: 'https://bankofbhutan.onrender.com'  // Your frontend URL
}));
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/deposits', depositRoutes)

app.use('/api/v1/withdrawals',withdrawalRoutes)


app.use('/api/v1/search',searchRoutes)

app.use('/api/v1/rtgs',rtgsRoutes)

app.use('/api/v1/ats',atsRoute)

app.use('/api/v1/ds',dollarSelling)

app.use('/api/v1/swift',swiftRoutes)

app.use('/api/v1/feedback',feedback)

app.use('/',viewRoutes)
app.use(express.static(path.join(__dirname, 'views')))

module.exports = app