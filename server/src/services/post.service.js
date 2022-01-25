const { PostRepository } = require('../repositories/post.repository')
const { formatPosts, formatPost } = require('../utils/formatter.utils')
const {
    POSTS_FILTERS_MAPPING,
    POST_OPTIONS_MAPPING
} = require('../constants/post.constant')

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

    async getPostById(id) {
        const post = await this.postRepository.getPostById(id)
        const formattedPost = formatPost(post)
        return formattedPost
    }

    async createPost({ userId, content }) {
        const newPost = await this.postRepository.createPost({
            userId,
            content
        })
        const formattedNewPost = formatPost(newPost)
        return formattedNewPost
    }

    async updatePostComments(postId, commentId) {
        const updatedPost = await this.postRepository.updatePostComments(
            postId,
            commentId
        )
        return updatedPost
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
}

module.exports = { PostService }
