const cookieConfig = {
    options: {
        httpOnly: true,
        sameSite: process.env.ENVIRONMENT === 'development' ? 'none' : 'strict',
        secure: process.env.ENVIRONMENT === 'development' ? false : true
    },
    name: 'jwt'
}

module.exports = { cookieConfig }
