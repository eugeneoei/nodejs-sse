const { PostRepository } = require('../repositories/post.repository')
const {
    formatPosts,
    formatPost,
    formatComments
} = require('../utils/formatter.utils')
const {
    POSTS_FILTERS_MAPPING,
    POST_OPTIONS_MAPPING
} = require('../constants/post.constant')
const { COMMENT_OPTIONS_MAPPING } = require('../constants/comment.constant')

class PostService {
    constructor() {
        this.postRepository = new PostRepository()
    }

    async getPosts(query) {
        const queryFilters = this.generateFilters(query, POSTS_FILTERS_MAPPING)
        const queryOptions = this.generateOptions(query, POST_OPTIONS_MAPPING)
        const posts = await this.postRepository.getPosts(
            queryFilters,
            queryOptions
        )
        const formattedPosts = formatPosts(posts)
        return formattedPosts
    }

    generateFilters(query, filtersMapping) {
        const filters = {}
        for (const [key, value] of Object.entries(query)) {
            if (key in filtersMapping) {
                const filterMapping = filtersMapping[key]
                const filterProperty = filterMapping.property
                filters[filterProperty] = value
            }
        }
        return filters
    }

    generateOptions(query, optionsMapping) {
        const options = {}
        for (const [key, value] of Object.entries(query)) {
            if (key in optionsMapping) {
                const optionMapping = optionsMapping[key]
                const optionProperty = optionMapping.property
                const data = optionMapping.convert(value)
                options[optionProperty] = data
            }
        }
        return options
    }

    async getPostById(id) {
        const post = await this.postRepository.getPostById(id)
        if (post) {
            const formattedPost = formatPost(post)
            return formattedPost
        }
        throw new Error('Post does not exist.')
    }

    async createPost({ userId, content }) {
        const newPost = await this.postRepository.createPost({
            userId,
            content
        })
        const formattedNewPost = formatPost(newPost)
        return formattedNewPost
    }

    async getPostPaginatedComments(id, query) {
        const queryOptions = this.generateOptions(
            query,
            COMMENT_OPTIONS_MAPPING
        )
        const comments = await this.postRepository.getPostPaginatedComments(
            id,
            queryOptions
        )
        const formattedComments = formatComments(comments)
        return formattedComments
    }

    async updatePostComments(postId, commentId) {
        const updatedPost = await this.postRepository.addUserToPostComments(
            postId,
            commentId
        )
        return updatedPost
    }

    async likePost(postId, userId) {
        await this.checkIfUserCanLikePost(postId, userId)
        const updatedPost =
            await this.postRepository.addUserToPostLikesAndIncreaseLikesCount(
                postId,
                userId
            )
        return updatedPost
    }

    async checkIfUserCanLikePost(postId, userId) {
        const post = await this.getPostById(postId)
        const postOwnerId = post.user.id.toString()
        const postLikes = post.likes
        const isPostOwner = this.isUserPostOwner(postOwnerId, userId)
        if (isPostOwner) {
            throw new Error('Liking your own post is not allowed!')
        }
        const hasLikedPost = this.hasUserLikedPost(postLikes, userId)
        if (hasLikedPost) {
            throw new Error('You have already liked this post!')
        }
    }

    isUserPostOwner(postOwnerId, userId) {
        return postOwnerId === userId
    }

    hasUserLikedPost(postLikes, userId) {
        return postLikes.includes(userId)
    }

    async unlikePost(postId, userId) {
        await this.checkIfUserCanUnlikePost(postId, userId)
        const updatedPost =
            await this.postRepository.removeUserFromPostLikesAndDecreaseLikesCount(
                postId,
                userId
            )
        return updatedPost
    }

    async checkIfUserCanUnlikePost(postId, userId) {
        const post = await this.getPostById(postId)
        const postLikes = post.likes
        const hasLikedPost = this.hasUserLikedPost(postLikes, userId)
        if (hasLikedPost) {
            return
        }
        throw new Error('You cannot unlike a post you have not liked!')
    }
}

module.exports = { PostService }
