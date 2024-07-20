require("dotenv").config();

const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGOOSE_CONNECTION_STRING_THINGDB;

const connectThingDB = () => {
    try {
        const thingDB = mongoose.createConnection(MONGO_URI);
        thingDB.on('connected', () => console.log('connected to thingDB'))
        return { thingDB }
    } catch (error) {
        console.error(`Error:${error.message}`)
        process.exit(1)
    }
}

module.exports = { connectThingDB }
