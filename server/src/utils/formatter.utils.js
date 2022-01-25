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
    return posts.map(post => {
        const formattedPost = formatPost(post)
        const formattedUser = formatUser(post.user)
        const formattedComments = formatComments(post.comments)
        return {
            ...formattedPost,
            user: formattedUser,
            comments: formattedComments
        }
    })
}

const formatPost = post => {
    const id = post._id
    const { content, likes, comments, createdAt } = post
    return {
        id,
        content,
        likes,
        comments,
        createdAt
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
