const crypto = require('crypto')
const { passwordConfig } = require('../config/password.config')

const generateSalt = () => {
    const salt = crypto.randomBytes(passwordConfig.randomBytes).toString('hex')
    return salt
}

const hashPassword = (salt, password) => {
    const hashedPassword = crypto
        .pbkdf2Sync(
            password,
            salt,
            passwordConfig.iterations,
            passwordConfig.keyLength,
            passwordConfig.digest
        )
        .toString(`hex`)
    return hashedPassword
}

const doesPasswordAndStoredPasswordMatch = (userSalt, userHash, password) => {
    const hash = crypto
        .pbkdf2Sync(
            password,
            userSalt,
            passwordConfig.iterations,
            passwordConfig.keyLength,
            passwordConfig.digest
        )
        .toString(`hex`)
    return userHash === hash
}

module.exports = {
    generateSalt,
    hashPassword,
    doesPasswordAndStoredPasswordMatch
}
