// flights validation
function validateFlightQueryParams(query) {
    const errors = []
    if (!query.origin) {
        errors.push('Origin is required')
    }
    if (!query.destination) {
        errors.push('Destination is required')
    }

    return errors
}


// hotels valdiation location
function getHotelsByLocation(query) {
    const errors = []
    if (!query.location) {
        errors.push({ message: 'Location is required' })
    }

    return errors;
}

// sites validation location 
function getSitesByLocation(query) {
    const errors = []
    if (!query.location) {
        errors.push({ message: 'Location is required' })
    }
    return errors
}

module.exports = { validateFlightQueryParams, getHotelsByLocation, getSitesByLocation }
