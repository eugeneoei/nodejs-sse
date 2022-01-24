require('dotenv').config()
const { initialiaseExpress } = require('./src/loaders/express.loader')
const { initialiseMongoose } = require('./src/loaders/mongoose.loader')

const init = async () => {
    try {
        await initialiseMongoose()
        initialiaseExpress()
    } catch (error) {
        console.log(`Initialisation error: ${error}`)
    }
}

init()
