const { COMMENTS_LIMIT } = require('../constants/comment.constant')

const userReference = () => {
    return {
        path: 'user',
        select: ['_id', 'firstName', 'lastName', 'profilePicture']
    }
}

const commentReference = (options = {}) => {
    return {
        path: 'comments',
        select: ['_id', 'user', 'content', 'createdAt'],
        populate: userReference(),
        perDocumentLimit: COMMENTS_LIMIT,
        options: {
            sort: {
                createdAt: 'desc'
            },
            ...options
        }
    }
}

// const commentPaginatedReference = page => {
//     return {
//         ...commentReference(),
//         skip: (page - 1) * COMMENTS_LIMIT
//     }
// }

module.exports = {
    userReference,
    commentReference
    // commentPaginatedReference
}
