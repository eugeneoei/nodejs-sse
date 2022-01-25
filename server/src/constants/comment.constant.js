const COMMENTS_LIMIT = 3
const COMMENT_OPTIONS_MAPPING = {
    page: {
        property: 'skip',
        convert: data => COMMENTS_LIMIT * (parseInt(data) - 1)
    }
}

module.exports = {
    COMMENTS_LIMIT,
    COMMENT_OPTIONS_MAPPING
}
