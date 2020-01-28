// require moment for date formatting for 
const moment = require('moment');
// Requiring the models we need for our queries
const { Show, RSVP, User, ShowBand, Venue, Comment, Sequelize } = require('../sequelize');
const { getRecordByName, getRecordByID, timeConversion } = require('./utils');

const exampleDateTime = moment([20, 6, 20, 21])
console.log(exampleDateTime.format());

// import the Sequelize operators
const Op = Sequelize.Op;

// Create show
const createShow = async (req, res) => {
    try {
        const { name, date, time, photo, venueName, bandNames, description } = req.body;
        const venue = await getRecordByName('venue', venueName);
        const separatedDateTime = timeConversion(date, time);
        const { year, month, day, hour, minutes } = separatedDateTime;
        console.log(year);
        let dateTime = moment([year, month, day, hour, minutes]);
        // add bands and venue to ShowBand join tables
        const show = await Show.create({
            name: name,
            date: date,
            time: time,
            dateTime: dateTime,
            photo: photo,
            description: description,
            id_venue: venue.id
        })
        await bandNames.forEach(async (bandName) => {
            const band = await getRecordByName('band', bandName);
            await ShowBand.create({
                id_show: show.id,
                id_band: band.id
            })
        })
        res.sendStatus(201);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Get all upcoming shows in database
const getAllUpcomingShows = async (req, res) => {
    try {
        const shows = await Show.findAll({
            where: {
                dateTime: {
                    [Op.gte]: moment().subtract(7, 'days').toDate()
                }
            },
            include: [
                { model: User, as: 'bands' },
                { model: Venue }
            ],
        });
        res.status(200).send(shows);
    }
    catch (err) {
        res.send(err);
    }
}

// get detailed info for single show
const getSingleShow = async (req, res) => {
    try {
        const { id } = req.params;
        const show = await Show.findOne({
            where: {
                id
            },
            include: [
                { model: User, through: ShowBand, as: 'bands', attributes: ['id', 'name'] },
                { model: Venue, attributes: ['id', 'name'] },
                { model: User, as: 'Fans', attributes: ['id', 'name'] },
                { model: Comment }
            ]
        })
        res.send(show);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Allow fan to rsvp to a show
const rsvpFanToShow = async (req, res) => {
    try {
        const { id_fan, id_show } = req.body;
        await RSVP.create({
            id_show,
            id_fan
        })
        res.sendStatus(201);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Allow fan to remove their rsvp
const removeFanRSVP = async (req, res) => {
    try {
        const { id_fan, id_show } = req.body;
        await RSVP.destroy({
            where: {
                id_fan,
                id_show
            }
        })
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// TODO: refactor to use eager loading
// Get all shows that a given user has rsvpd to
const getFanRSVPs = async (req, res) => {
    try {
        const { id } = req.params;
        const rsvps = await RSVP.findAll({
            where: {
                id_fan: id
            }
        })
        Promise.all(rsvps.map(async (rsvp) => {
            const show = await Show.findOne({
                where: {
                    id: rsvp.id_show
                }
            })
            return show;
        })).then((data) => {
            res.send(data)
        })
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400);
    }
}

// TODO: refactor to use eager loading
// Get all fans who have rsvpd to a show
const getShowRSVPs = async (req, res) => {
    try {
        const { id } = req.params;
        const rsvps = await RSVP.findAll({
            where: {
                id_show: id
            }
        })
        Promise.all(rsvps.map(async (rsvp) => {
            console.log(rsvp);
            const fan = await User.findOne({
                where: {
                    id: rsvp.id_fan
                }
            })
            return fan;
        })).then((data) => {
            res.send(data)
        })
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// Update show

// Delete show

module.exports = {
    createShow,
    getAllUpcomingShows,
    getFanRSVPs,
    getSingleShow,
    getShowRSVPs,
    removeFanRSVP,
    rsvpFanToShow,
    getAllShows
}