const express = require('express')
const { PostService } = require('../services/post.service.js')
const { ImageKitService } = require('../services/imagekit.service')
const { isAuthenticated } = require('../middlewares/authorisation.middleware')
const { validatePostCreation } = require('../middlewares/post.middleware')

const postController = app => {
    const router = express.Router()

    const postService = new PostService()
    const imageService = new ImageKitService()

    app.use('/posts', isAuthenticated, router)

    router.get('', async (req, res) => {
        try {
            const posts = await postService.getPosts()
            res.json(posts)
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    })

    router.post('/:id/comments', (req, res) => {
        res.json({
            message: 'POST post comments success'
        })
    })

    router.post('', validatePostCreation, async (req, res) => {
        try {
            const { userId, content } = req.body
            const post = await postService.createPost({
                userId,
                content
            })
            res.json(post)
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    })

    router.patch('/:id/likes', (req, res) => {
        // todo: validate the fact that user cannot like own post
        res.json({
            message: 'PATCH post likes success'
        })
    })
}

module.exports = { postController }
