const mongooseConfig = {
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    uri: process.env.MONGO_URI
}

module.exports = { mongooseConfig }
