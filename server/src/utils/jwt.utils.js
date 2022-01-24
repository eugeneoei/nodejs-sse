const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../config/jwt.config')

const generateToken = id => {
    return jwt.sign({ id }, jwtConfig.secret)
}

module.exports = {
    generateToken
}
