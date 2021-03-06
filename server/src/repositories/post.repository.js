const Post = require('../models/post.model')
const {
    userReference,
    commentReference
    // commentPaginatedReference
} = require('../utils/reference.utils')
const { POSTS_LIMIT } = require('../constants/post.constant')
const { COMMENTS_LIMIT } = require('../constants/comment.constant')

class PostRepository {
    constructor() {
        this.postModel = Post
    }

    async getPosts(queryFilters, queryOptions) {
        const options = {
            ...queryOptions,
            limit: POSTS_LIMIT,
            sort: {
                createdAt: 'desc'
            }
        }
        const posts = await this.postModel
            .find(queryFilters, null, options)
            .populate([userReference(), commentReference()])
        return posts
    }

    async getPostById(id) {
        const post = await this.postModel
            .findById(id)
            .populate([userReference(), commentReference()])
        return post
    }

    async createPost({ userId, content, images }) {
        const newPost = await this.postModel.create({
            user: userId,
            content,
            images
        })
        return newPost
    }

    async getPostPaginatedComments(id, queryOptions) {
        const post = await this.postModel
            .findById(id)
            .populate([commentReference(queryOptions)])
        return post.comments
    }

    async addUserToPostComments(postId, commentId) {
        const updatedPost = await this.postModel.findByIdAndUpdate(postId, {
            $push: {
                comments: commentId
            },
            $inc: {
                commentsCount: 1
            }
        })
        return updatedPost
    }

    async addUserToPostLikesAndIncreaseLikesCount(postId, userId) {
        const updatedPost = await this.postModel.findByIdAndUpdate(postId, {
            $push: {
                likes: userId
            },
            $inc: {
                likesCount: 1
            }
        })
        return updatedPost
    }

    async removeUserFromPostLikesAndDecreaseLikesCount(postId, userId) {
        const updatedPost = await this.postModel.findByIdAndUpdate(postId, {
            $pull: {
                likes: userId
            },
            $inc: {
                likesCount: -1
            }
        })
        return updatedPost
    }
}

module.exports = { PostRepository }
