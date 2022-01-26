const mongoose = require('mongoose')
const { mongooseConfig } = require('../config/mongoose.config')
mongoose.set('returnOriginal', false)

const initialiseMongoose = async () => {
    const connection = mongoose.connection
    connection.on('connected', () => console.log('DB connection success.'))
    connection.on('disconnected', () => console.log('DB disconnected.'))
    await mongoose.connect(mongooseConfig.uri, mongooseConfig.options)
}

module.exports = { initialiseMongoose }
