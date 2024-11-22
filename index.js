const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const { sequelize } = require('./models')
// controllers
const { createItinerary, getItinerary } = require('./controllers/dataController')

const { getFlights, getHotels, getSites, getFlightsByOriginAndDestination, validateHotelsQueryParams, validateSitesQueryParams } = require('./controllers/itineraryController')


// middelwares
app.use(cors())
app.use(express.json())


app.post('/itinerary', createItinerary)
app.get('/itinerary/:id', getItinerary)


// routes
app.get('/data/flights', getFlights)
app.get('/data/hotels', getHotels)
app.get('/data/sites', getSites)

// get validate flights of origin and destination
app.get('/data/getFlightsByOriginAndDestination', getFlightsByOriginAndDestination) // http://localhost:3000/data/getFlightsByOriginAndDestination?origin=raipur&destination=bhuj

// get validate hotels by location details
app.get('/hotel/search', validateHotelsQueryParams) // http://localhost:3000/hotel/search?location=Mandarmoni

// get validate sites by location details
app.get('/sites/search', validateSitesQueryParams) // http://localhost:3000/sites/search?location=Behrampur

// authenticate sequelize
sequelize.authenticate().then(() => {
    console.log('connected to database')
}).catch((error) => {
    console.log("Error in connection to database", error)
})


app.listen(3000, () => {
    console.log('server is running on port 3000')
})