const {
    checkProfilePicturePropertyExist,
    checkPropertiesExist,
    isEmailValid,
    validatePasswordStrength
} = require('../utils/validation.utils')

const REQUIRED_USER_REGISTRATION_PROPERTIES = [
    'email',
    'firstName',
    'lastName',
    'password'
]
const REQUIRED_LOGIN_PROPERTIES = ['email', 'password']

const validateUserRegistration = (req, res, next) => {
    try {
        const data = req.body
        const { email, password } = data
        checkProfilePicturePropertyExist(req.file)
        checkPropertiesExist(data, REQUIRED_USER_REGISTRATION_PROPERTIES)
        isEmailValid(email)
        validatePasswordStrength(password)
        next()
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const validateLogin = (req, res, next) => {
    try {
        const data = req.body
        checkPropertiesExist(data, REQUIRED_LOGIN_PROPERTIES)
        isEmailValid(data.email)
        next()
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports = {
    validateUserRegistration,
    validateLogin
}
