require('dotenv').config()
const axios = require('axios')

const axiosInstance = axios.create({
    baseURL: process.env.MICROSERVICE_BASE_URL,
    headers: {
        CLIENT_KEY: process.env.CLIENT_KEY,
        CLIENT_SECRET: process.env.CLIENT_SECRET
    }
})

const getFlights = async (req, res) => {
    try {
        const response = await axiosInstance.get('/flights', {
            headers: {
                "Content-Type": "applicataion/json",
                CLIENT_KEY: process.env.CLIENT_KEY,
                CLIENT_SECRET: process.env.CLIENT_SECRET
            }
        });

        return res.json(response.data);
    } catch (error) {
        console.error('Error in getFlights:', error.message);
        console.error('Error stack:', error.stack);
    }
}


const getHotels = async (req, res) => {
    try {
        const response = await axiosInstance.get('/hotels')
        res.json(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to fetch hotels data" })
    }
}


const getSites = async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites')
        res.json(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to fetch sites data" })
    }
}

module.exports = {
    getFlights,
    getHotels,
    getSites
}
