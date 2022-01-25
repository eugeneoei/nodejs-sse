const { CommentRepository } = require('../repositories/comment.repository')
const { formatComment } = require('../utils/formatter.utils')

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository()
    }

    async createComment({ userId, content }) {
        const newComment = await this.commentRepository.createComment({
            userId,
            content
        })
        const formattedNewComment = formatComment(newComment)
        return formattedNewComment
    }
}

module.exports = { CommentService }
