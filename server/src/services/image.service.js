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

    async uploadMultipleFiles(files) {
        const promises = files.map(async file => await this.upload(file))
        const responses = await Promise.all(promises)
        const imageUrls = responses.map(response => {
            const imageId = nanoid()
            return {
                id: imageId,
                url: response
            }
        })
        return imageUrls
    }
}

module.exports = { ImageService }
