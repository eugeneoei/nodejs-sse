const multer = require('multer')
const { multerConfig } = require('../config/multer.config')
const { registration, postImages } = multerConfig

const profileImageUpload = multer().single(registration.name)

const postImagesUpload = multer().array(postImages.name, postImages.limit)

module.exports = {
    profileImageUpload,
    postImagesUpload
}
