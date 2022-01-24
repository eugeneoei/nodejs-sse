const express = require('express')
const cookieParser = require('cookie-parser')
const {
    authenticationController
} = require('../controllers/authentication.controller')
const { postController } = require('../controllers/post.controller')

const initialiaseExpress = () => {
    const app = express()
    const router = express.Router()

    app.use(cookieParser())
    app.use(express.json())

    app.use('/api', router)
    authenticationController(router)
    postController(router)

    app.listen(process.env.PORT, () =>
        console.log(`Express Server listening on port ${process.env.PORT}!`)
    )
}

module.exports = { initialiaseExpress }
