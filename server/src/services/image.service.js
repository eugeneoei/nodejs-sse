const imagekit = require('imagekit')
const { nanoid } = require('nanoid')
const { imagekitConfig } = require('../config/imagekit.config')

class ImageService {
    constructor() {
        this.imagekit = new imagekit(imagekitConfig)
    }

    async upload(file) {
        const fileType = file.mimetype.split('/')[1]
        const fileId = nanoid()
        const response = await this.imagekit.upload({
            file: file.buffer,
            fileName: `${fileId}.${fileType}`
        })
        const imageUrl = response.url
        return imageUrl
    }
}

module.exports = { ImageService }
