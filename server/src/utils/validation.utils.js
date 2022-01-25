const { isEmail, isStrongPassword } = require('validator')

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

module.exports = {
    checkProfilePicturePropertyExist,
    checkPropertiesExist,
    isEmailValid,
    validatePasswordStrength
}
