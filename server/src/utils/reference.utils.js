COMMENTS_LIMIT = 10

const userReference = () => {
    return {
        path: 'user',
        select: ['_id', 'firstName', 'lastName', 'profilePicture']
    }
}

const commentReference = () => {
    return {
        path: 'comments',
        select: ['_id', 'user', 'content', 'createdAt'],
        populate: userReference(),
        perDocumentLimit: COMMENTS_LIMIT
    }
}

const commentPaginatedReference = page => {
    return {
        ...commentReference(),
        skip: (page - 1) * COMMENTS_LIMIT
    }
}

module.exports = {
    userReference,
    commentReference,
    commentPaginatedReference
}
