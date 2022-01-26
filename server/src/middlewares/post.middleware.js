const {
    checkPropertiesExist,
    checkPostImagesPropertyExist
} = require('../utils/validation.utils')

const REQUIRED_POST_CREATION_PROPERTIES = ['content']

const validatePostCreation = (req, res, next) => {
    try {
        const data = req.body
        const files = req.files
        checkPropertiesExist(data, REQUIRED_POST_CREATION_PROPERTIES)
        checkPostImagesPropertyExist(files)
        next()
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports = {
    validatePostCreation
}
