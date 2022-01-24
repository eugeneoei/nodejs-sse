const { Post } = require('../models/post.model')

class PostRepository {
    constructor() {
        this.postModel = Post
    }

    async getPosts() {
        const posts = await this.postModel.find()
        // .populate({
        //     path: 'comments',
        //     select: ['_id', 'user', 'content']
        // })
        return posts
    }

    async createPost({ userId, content }) {
        const newPost = await this.postModel.create({
            user: userId,
            content
        })
        return newPost
    }
}

module.exports = { PostRepository }
