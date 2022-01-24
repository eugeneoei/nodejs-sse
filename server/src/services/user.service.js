const { UserRepository } = require('../repositories/user.repository')
const { generateSalt, hashPassword } = require('../utils/password.utils')
const { formatUserData } = require('../utils/data-formatter.utils')

class UserService {
    constructor() {
        this.userRepository = new UserRepository()
    }

    async doesEmailExist(email) {
        const user = await this.userRepository.getUserByEmail(email)
        return user ? true : false
    }

    async createUser(user) {
        const password = user.password
        const salt = generateSalt()
        const hash = hashPassword(salt, password)
        const newUser = await this.userRepository.createUser({
            ...user,
            salt,
            hash
        })
        const formattedNewUser = formatUserData(newUser)
        return formattedNewUser
    }

    async getUserById(id) {
        const user = await this.userRepository.getUserById(id)
        const formattedUser = formatUserData(user)
        return formattedUser
    }
}

module.exports = { UserService }
