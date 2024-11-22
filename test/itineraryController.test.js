const {
    getFlightsByOriginAndDestination,
    validateHotelsQueryParams,
    validateSitesQueryParams } = require('../controllers/itineraryController')

const axiosInstance = require('../lib/axios.lib')

jest.mock('../lib/axios.lib.js', () => ({
    get: jest.fn()
}))



describe("Itinerary Controller Tests", () => {
    it("should return flights by origin and destination", async () => {
        const mockResponse = {
            flights: [
                {
                    id: 3,
                    origin: "mopa",
                    destination: "jammu",
                    flight_number: "952",
                    departure_time: "10/7/2024, 5:37:56 PM",
                    arrival_time: "10/7/2024, 10:37:56 PM",
                    price: 244.44
                }
            ]
        }

        axiosInstance.get.mockResolvedValue(mockResponse)
        const req = { query: { origin: "mopa", destination: "jammu" } }
        const res = { json: jest.fn(), status: jest.fn(() => req) }
        await getFlightsByOriginAndDestination(req, res)

        expect(axiosInstance.get).toHaveBeenCalledWith('/flights/search?origin=mopa&destination=jammu')

        expect(res.json).toHaveBeenCalledWith(mockResponse.data)
    })


    // test hotels
    test("should return location by query params", async () => {
        const mockResponse = {
            hotels: [
                {
                    id: 1,
                    name: "Bechtelar LLC Hotel",
                    location: "Cuttack",
                    price_per_night: 29991.83,
                    available_rooms: 6
                }
            ]
        }

        axiosInstance.get.mockResolvedValue(mockResponse)
        const req = { query: { location: "Cuttack" } }
        const res = { json: jest.fn(), status: jest.fn(() => req) }
        await validateHotelsQueryParams(req, res)
        expect(axiosInstance.get).toHaveBeenCalledWith('/hotels/search?location=Cuttack')

    })


    // sites
    test('should return location by query params', async () => {
        const mockResponse = {
            sites: [
                {
                    id: 1,
                    name: "Steuber, Grimes and Graham Site",
                    location: "Daman",
                    description: "Admitto carbo assentator comparo."
                }
            ]
        }

        axiosInstance.get.mockResolvedValue(mockResponse)
        const req = { query: { location: "Daman" } }
        const res = { json: jest.fn(), status: jest.fn(() => req) }
        await validateSitesQueryParams(req, res)
        expect(axiosInstance.get).toHaveBeenCalledWith('/sites/search?location=Daman')

    })

})

