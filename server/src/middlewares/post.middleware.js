const REQUIRE_POST_CREATION_PROPERTIES = ['userId', 'content']

const validatePostCreation = (req, res, next) => {
    try {
        const data = req.body
        checkPropertiesExist(data, REQUIRE_POST_CREATION_PROPERTIES)
        next()
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const checkPropertiesExist = (data, properties) => {
    for (const property of properties) {
        const isRequiredPropertyMissing = !(property in data)
        if (isRequiredPropertyMissing) {
            throw new Error(`Missing "${property}" property.`)
        }
    }
}

module.exports = {
    validatePostCreation
}
