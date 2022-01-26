const multerConfig = {
    registrationImageUploadLimit: 1,
    postImages: {
        limit: 5,
        name: 'images'
    }
}

module.exports = { multerConfig }
