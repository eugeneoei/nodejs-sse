const mongoose = require('mongoose')
const { Schema, model } = mongoose
const User = require('./user.model')

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: User,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Number
        },
        updatedAt: {
            type: Number
        }
    },
    {
        timestamps: {
            currentTime: () => Date.now()
        }
    }
)

module.exports = model('Comment', commentSchema)
