const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../config/jwt.config')
const { cookieConfig } = require('../config/cookie.config')

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies[cookieConfig.name]
        if (token) {
            const data = jwt.verify(token, jwtConfig.secret)
            req.user = {
                id: data.id
            }
            next()
        } else {
            res.status(403).json({
                error: 'Forbidden.'
            })
        }
    } catch {
        res.status(403).json({
            error: 'Forbidden.'
        })
    }
}

module.exports = { isAuthenticated }
