const { UserRepository } = require('../repositories/user.repository')
const {
    doesPasswordAndStoredPasswordMatch
} = require('../utils/password.utils')
const { generateToken } = require('../utils/jwt.utils')
const { formatUser } = require('../utils/formatter.utils')

INVALID_CREDENTIALS_MESSAGE = 'Invalid email or password.'

class AuthenticationService {
    constructor() {
        this.userRepository = new UserRepository()
    }

    async verifyUserCredentials(email, password) {
        const user = await this.userRepository.getUserByEmail(email)
        if (!user) {
            throw new Error(INVALID_CREDENTIALS_MESSAGE)
        }
        const salt = user.salt
        const hash = user.hash
        const areCrendentialsValid = doesPasswordAndStoredPasswordMatch(
            salt,
            hash,
            password
        )
        if (areCrendentialsValid) {
            const formattedUser = formatUser(user)
            return formattedUser
        }
        throw new Error(INVALID_CREDENTIALS_MESSAGE)
    }

    generateToken(user) {
        const userId = user.id
        const token = generateToken(userId)
        return token
    }
}

module.exports = { AuthenticationService }
