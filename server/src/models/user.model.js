const mongoose = require('mongoose')
const { Schema, model } = mongoose
const { isEmail } = require('validator')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'The email you have provided is invalid.']
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
})

const User = model('User', userSchema)

module.exports = { User }
