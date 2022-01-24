const formatUserData = user => {
    const id = user._id
    const { email, firstName, lastName, profilePicture } = user
    return {
        id,
        email,
        firstName,
        lastName,
        profilePicture
    }
}

module.exports = {
    formatUserData
}
