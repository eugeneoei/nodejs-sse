const { PostRepository } = require('../repositories/post.repository')

class PostService {
    constructor() {
        this.postRepository = new PostRepository()
    }

    async createPost({ userId, content }) {
        const newPost = await this.postRepository.createPost({
            userId,
            content
        })
        return newPost
    }

    async getPosts() {
        const posts = await this.postRepository.getPosts()
        return posts
    }
}

module.exports = { PostService }
