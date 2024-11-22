const axiosInstance = require('../lib/axios.lib')
const { validateFlightQueryParams, getHotelsByLocation, getSitesByLocation } = require('../validation/validate')





// input validation for origin and destination from flight data
const getFlightsByOriginAndDestination = async (req, res) => {

    // input validation for origin and destination
    const errors = validateFlightQueryParams(req.query)
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Invalid input', errors })
    }

    // get flights data from database which is origin and destination
    try {
        const { origin, destination } = req.query
        const response = await axiosInstance.get(`/flights/search?origin=${origin}&destination=${destination}`)
        res.json(response.data)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error fetching flights, origin and destination data' })
    }
}



// get flights data 
const getFlights = async (req, res) => {
    try {
        // test error and rate limiting using query parameter
        const test_error = req.query.test_error
        const rate_limit = req.query.rate_limit

        const response = await axiosInstance.get(`/flights?test_error${test_error}&rate_limit=${rate_limit}`, {
            headers: {
                "Content-Type": "applicataion/json",
                CLIENT_KEY: process.env.CLIENT_KEY,
                CLIENT_SECRET: process.env.CLIENT_SECRET
            }
        });

        return res.json(response.data);
    } catch (error) {
        console.error(error.message);

        // test error and rate limit handling
        if (error.response.status === 429) {
            return res.status(429).json({ message: 'Rate limit exceeded flights' });
        }
        else if (error.response.status === 500 && error.response.data.error === 'test_error, simulated error for testing purposes') {
            return res.status(500).json({ error: 'test_error, simulated error for testing purposes' });
        }

        res.status(500).json({ message: "Fatiled to get flights" })
    }
}




// input valdiation for hotels data which get by location
const validateHotelsQueryParams = async (req, res) => {

    // input validation for location 
    const errors = getHotelsByLocation(req.query)
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Invalid input for location', errors })
    }


    try {
        const { location } = req.query

        const response = await axiosInstance.get(`/hotels/search?location=${location}`)

        res.json(response.data)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Failed to validate hotels query parameters" })

    }
}


const getHotels = async (req, res) => {
    try {
        const test_error = req.query.test_error
        const rate_limit = req.query.rate_limit

        const response = await axiosInstance.get(`/hotels?test_error${test_error}&rate_limit=${rate_limit}`)
        res.status(200).json(response.data)
    } catch (error) {
        console.error(error)

        // rate limiting error handle
        if (error.response.status === 429) {
            return res.status(429).json({ message: 'Rate limit exceeded hotels' })
        } else if (error.response.status === 500 && error.response.data.error === "Simulated test error for testing") {
            return res.status(500).json({ error: "Simulated test error for testing" })
        }


        res.status(500).json({ message: "Failed to fetch hotels data" })
    }
}



// input validation for sites data which get by location
const validateSitesQueryParams = async (req, res) => {

    // input validate function
    const errors = getSitesByLocation(req.query)
    if (errors.length > 0) {
        return res.status(400).json({ message: errors })
    }

    try {
        // validate location input using query
        const { location } = req.query

        // get location data from database suing query search with axiosInstance
        const response = await axiosInstance.get(`/sites/search?location=${location}`)
        res.json(response.data)


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to validate sites query parameters" })
    }
}

const getSites = async (req, res) => {
    try {
        const test_error = req.query.test_error
        const rate_limit = req.query.rate_limit

        const response = await axiosInstance.get(`/sites?test_error${test_error}&rate_limit=${rate_limit}`)
        res.json(response.data)
    } catch (error) {
        console.error(error)

        // rate limit error handle
        if (error.response.status === 429) {
            return res.status(429).json({ message: 'Rate limit exceeded sites' })
        } else if (error.response.status === 500 && error.response.data.error === "Simulated test error for testing") {
            return res.status(500).json({ error: "Simulated test error for testing" })
        }

        res.status(500).json({ message: "Failed to fetch sites data" })
    }
}

module.exports = {
    getFlights,
    getHotels,
    getSites,
    getFlightsByOriginAndDestination,
    validateHotelsQueryParams,
    validateSitesQueryParams
}




