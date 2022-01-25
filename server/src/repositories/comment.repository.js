const Comment = require('../models/comment.model')

class CommentRepository {
    constructor() {
        this.commentModel = Comment
    }

    async createComment({ userId, content }) {
        const newComment = await this.commentModel.create({
            user: userId,
            content
        })
        return newComment
    }
}

module.exports = { CommentRepository }
