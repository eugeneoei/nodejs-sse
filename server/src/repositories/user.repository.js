const { User } = require('../models/user.model')

class UserRepository {
    constructor() {
        this.userModel = User
    }

    async getUserByEmail(email) {
        const user = await this.userModel.findOne({ email })
        return user
    }

    async createUser(user) {
        const newUser = await this.userModel.create(user)
        return newUser
    }

    async getUserById(id) {
        const user = await this.userModel.findById(id)
        return user
    }
}

module.exports = { UserRepository }
