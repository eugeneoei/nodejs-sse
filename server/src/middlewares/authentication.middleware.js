const { isEmail, isStrongPassword } = require('validator')
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

const checkProfilePicturePropertyExist = file => {
    if (!file) {
        throw new Error('Missing "profilePicture" property')
    }
}

const checkPropertiesExist = (data, properties) => {
    for (const property of properties) {
        const isRequiredPropertyMissing = !(property in data)
        if (isRequiredPropertyMissing) {
            throw new Error(`Missing "${property}" property.`)
        }
    }
}

const isEmailValid = email => {
    if (!isEmail(email)) {
        throw new Error('The email you have provided is invalid.')
    }
}

const validatePasswordStrength = password => {
    if (!isStrongPassword(password)) {
        throw new Error('Password you have provided is not strong enough.')
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
