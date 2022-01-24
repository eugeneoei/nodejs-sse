const express = require('express')
const multer = require('multer')
const profilePictureUpload = multer().single('profilePicture')
const { AuthenticationService } = require('../services/authentication.service')
const { UserService } = require('../services/user.service')
const { ImageKitService } = require('../services/imagekit.service')
const {
    validateUserRegistration,
    validateLogin
} = require('../middlewares/authentication.middleware')
const { isAuthenticated } = require('../middlewares/authorisation.middleware')
const { cookieConfig } = require('../config/cookie.config')

const authenticationController = app => {
    const router = express.Router()

    const authenticationService = new AuthenticationService()
    const userService = new UserService()
    const imageService = new ImageKitService()

    app.use('/auth', router)

    router.post(
        '/register',
        profilePictureUpload,
        validateUserRegistration,
        async (req, res) => {
            try {
                const { email, firstName, lastName, password } = req.body
                const file = req.file
                const doesEmailExist = await userService.doesEmailExist(email)
                if (doesEmailExist) {
                    throw new Error('Email is already in used.')
                }
                const imageUrl = await imageService.upload(file)
                await userService.createUser({
                    email,
                    firstName,
                    lastName,
                    password,
                    profilePicture: imageUrl
                })
                res.status(201).json({
                    message: 'Created'
                })
            } catch (error) {
                res.status(400).json({
                    error: error.message
                })
            }
        }
    )

    router.post('/login', validateLogin, async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await authenticationService.verifyUserCredentials(
                email,
                password
            )
            const token = authenticationService.generateToken(user)
            res.cookie(cookieConfig.name, token, cookieConfig.options)
            res.json(user)
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    })

    router.delete('/logout', (req, res) => {
        res.clearCookie(cookieConfig.name)
        res.sendStatus(204)
    })

    router.get('', isAuthenticated, async (req, res) => {
        try {
            const userId = req.user.id
            const user = await userService.getUserById(userId)
            res.json(user)
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    })
}

module.exports = { authenticationController }
