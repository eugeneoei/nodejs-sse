const multerConfig = {
    registration: {
        name: 'profilePicture'
    },
    postImages: {
        limit: 5,
        name: 'images'
    }
}

module.exports = { multerConfig }
