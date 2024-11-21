const {
    flight: flightModel,
    hotel: hotelModel,
    site: siteModel,
    itinerary: itineraryModel,
    itineraryItem: itineraryItemModel
} = require('../models')


// create itinerary details 
const createItinerary = async (req, res) => {
    try {

        const { flights, hotels, sites, name } = req.body

        const newItinerary = await itineraryModel.create({ name })

        if (flights && flights.length > 0) {
            for (const flight of flights) {
                const saveFlight = await flightModel.create(flight)
                await itineraryItemModel.create({
                    itineraryId: newItinerary.id,
                    itemId: saveFlight.id,
                    type: 'flight'
                })
            }
        }


        if (hotels && hotels.length > 0) {
            for (const hotel of hotels) {
                const saveHotel = await hotelModel.create(hotel)
                await itineraryItemModel.create({
                    itineraryId: newItinerary.id,
                    itemId: saveHotel.id,
                    type: 'hotel'
                })
            }
        }


        if (sites && sites.length > 0) {
            for (const site of sites) {
                const saveSite = await siteModel.create(site)
                await itineraryItemModel.create({
                    itineraryId: newItinerary.id,
                    itemId: saveSite.id,
                    type: 'site'
                })
            }
        }

        res.status(201).json({ message: 'Itinerary created successfully', itinerary: newItinerary })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to create Itinerary" })
    }
}


// get the itinerary details

const getItinerary = async (req, res) => {
    try {

        const id = parseInt(req.params.id)

        // find itinerary by id
        const itinerary = await itineraryModel.findByPk(id)

        // if not found
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found" })
        }

        // if it is found , return the itinerary details
        const items = await itineraryModel.findAll({
            where: { id : itinerary.id }
        })

        // retrive the item details for each 
        const flights = []
        const hotels = []
        const sites = []

        for (const item of items) {
            // extract the data
            if (item.type === 'flight') {
                const flight = await flightModel.findByPk(item.itemId)
                if (flight) flights.push(flight)
            } else if (item.type === 'hotel') {
                const hotel = await hotelModel.findByPk(item.itemId)
                if (hotel) hotels.push(hotel)
            } else {
                const site = await siteModel.findByPk(item.itemId)
                if (site) sites.push(site)
            }
        }

        // return all data 
        res.status(200).json({ itinerary: itinerary, flights, hotels, sites })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get Itinerary" })
    }
}

// exports
module.exports = { createItinerary, getItinerary }