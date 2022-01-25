const Post = require('../models/post.model')
const {
    userReference,
    commentReference,
    commentPaginatedReference
} = require('../utils/reference.utils')
const { POST_LIMIT } = require('../constants/post.constant')

class PostRepository {
    constructor() {
        this.postModel = Post
        this.postsLimit = POST_LIMIT
    }

    // async getPosts() {
    //     const posts = await this.postModel
    //         .find()
    //         .populate([userReference(), commentReference()])
    //     return posts
    // }

    async getPosts(queryFilters, queryOptions) {
        const options = {
            ...queryOptions,
            limit: this.postsLimit,
            sort: {
                createdAt: 'desc'
            }
        }
        const posts = await this.postModel
            .find(queryFilters, null, options)
            .populate([userReference(), commentReference()])
        return posts
    }

    // async getPaginatedPosts(page) {
    //     const posts = await this.postModel
    //         .find()
    //         .populate([userReference(), commentPaginatedReference(page)])
    //     return posts
    // }

    async createPost({ userId, content }) {
        const newPost = await this.postModel.create({
            user: userId,
            content
        })
        return newPost
    }

    async updatePostComments(postId, commentId) {
        const updatedPost = await this.postModel.updateOne(
            {
                _id: postId
            },
            {
                $push: {
                    comments: commentId
                }
            }
        )
        return updatedPost
    }
}

module.exports = { PostRepository }
