const { PostRepository } = require('../repositories/post.repository')
const { formatPosts, formatPost } = require('../utils/formatter.utils')
const { POST_LIMIT } = require('../constants/post.constant')

const VALID_FILTERS_MAPPING = {
    userId: {
        property: 'user'
    }
}
const POST_OPTIONS_MAPPING = {
    page: {
        property: 'skip',
        convert: data => POST_LIMIT * (parseInt(data) - 1)
    }
}

class PostService {
    constructor() {
        this.postRepository = new PostRepository()
        this.validFiltersMapping = VALID_FILTERS_MAPPING
        this.postOptionsMapping = POST_OPTIONS_MAPPING
    }

    async getPosts(query) {
        const queryFilters = this.generateFilters(query)
        const queryOptions = this.generateOptions(query)
        const posts = await this.postRepository.getPosts(
            queryFilters,
            queryOptions
        )
        const formattedPosts = formatPosts(posts)
        return formattedPosts
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

    generateFilters(query) {
        const filters = {}
        for (const [key, value] of Object.entries(query)) {
            if (key in this.validFiltersMapping) {
                const filterMapping = this.validFiltersMapping[key]
                const filterProperty = filterMapping.property
                filters[filterProperty] = value
            }
        }
        return filters
    }

    generateOptions(query) {
        const options = {}
        for (const [key, value] of Object.entries(query)) {
            if (key in this.postOptionsMapping) {
                const optionMapping = this.postOptionsMapping[key]
                const optionProperty = optionMapping.property
                const data = optionMapping.convert(value)
                options[optionProperty] = data
            }
        }
        return options
    }
}

module.exports = { PostService }
