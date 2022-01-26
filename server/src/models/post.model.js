const mongoose = require('mongoose')
const { Schema, model } = mongoose
const Comment = require('./comment.model')
const User = require('./user.model')

const postSchema = new Schema(
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
        images: {
            type: Array,
            required: true
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: User
            }
        ],
        likesCount: {
            type: Number,
            default: 0
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: Comment
            }
        ],
        commentsCount: {
            type: Number,
            default: 0
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

module.exports = model('Post', postSchema)
