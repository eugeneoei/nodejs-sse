const mongoose = require('mongoose')
const { Schema, model } = mongoose

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
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

const Comment = model('Comment', commentSchema)

module.exports = { Comment }
