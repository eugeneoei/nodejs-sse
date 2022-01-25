const POSTS_LIMIT = 2
const POSTS_FILTERS_MAPPING = {
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

module.exports = {
    POSTS_LIMIT,
    POSTS_FILTERS_MAPPING,
    POST_OPTIONS_MAPPING
}
