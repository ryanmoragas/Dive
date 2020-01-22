// compile all controllers and export to router from here
const { addFanToVenue, 
        addFanToBand, 
        addGenreToBand, 
        createUser, 
        getAllBands,
        getBandGenres,
        getSingleUser 
    } = require('./User');
const { getTypes } = require('./Type');
const { createVenue } = require('./Venue');

module.exports = {
    addFanToBand,
    addFanToVenue,
    addGenreToBand,
    createUser,
    getAllBands,
    getBandGenres,
    getSingleUser,
    getTypes,
    createVenue
}