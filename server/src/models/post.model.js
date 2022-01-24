const mongoose = require('mongoose')
const { Schema, model } = mongoose

const postSchema = new Schema(
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
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comments'
            }
        ],
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

const Post = model('Post', postSchema)

module.exports = { Post }
