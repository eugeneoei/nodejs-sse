const formatUser = user => {
    const id = user._id
    const { firstName, lastName, profilePicture } = user
    return {
        id,
        firstName,
        lastName,
        profilePicture
    }
}

const formatPosts = posts => {
    return posts.map(post => formatPost(post))
}

const formatPost = post => {
    const id = post._id
    const { user, content, likes, comments, createdAt } = post
    const formattedUser = formatUser(user)
    const formattedComments = formatComments(comments)
    return {
        id,
        content,
        likes,
        createdAt,
        user: formattedUser,
        comments: formattedComments
    }
}

const formatComments = comments => {
    return comments.map(comment => {
        const formattedComment = formatComment(comment)
        const formattedUser = formatUser(comment.user)
        return {
            ...formattedComment,
            user: formattedUser
        }
    })
}

const formatComment = comment => {
    const id = comment._id
    const { content, createdAt } = comment
    return {
        id,
        content,
        createdAt
    }
}

module.exports = {
    formatUser,
    formatPosts,
    formatPost,
    formatComment
}
