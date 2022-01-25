const express = require('express')
const { PostService } = require('../services/post.service')
const { CommentService } = require('../services/comment.service')
const { ImageKitService } = require('../services/imagekit.service')
const { UserService } = require('../services/user.service')
const { isAuthenticated } = require('../middlewares/authorisation.middleware')
const { validatePostCreation } = require('../middlewares/post.middleware')
const { validateCommentCreation } = require('../middlewares/comment.middleware')

const postController = app => {
    const router = express.Router()

    const postService = new PostService()
    const userService = new UserService()
    const commentService = new CommentService()
    const imageService = new ImageKitService()

    app.use('/posts', isAuthenticated, router)

    router.get('', async (req, res) => {
        try {
            const query = req.query
            const posts = await postService.getPosts(query)
            res.json(posts)
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    })

    router.get('/:id', async (req, res) => {
        try {
            const postId = req.params.id
            const post = await postService.getPostById(postId)
            res.json(post)
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    })

    router.post('', validatePostCreation, async (req, res) => {
        try {
            const userId = req.user.id
            const { content } = req.body
            const post = await postService.createPost({
                userId,
                content
            })
            const user = await userService.getUserById(userId)
            res.json({
                ...post,
                user
            })
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    })

    router.get('/:id/comments', async (req, res) => {
        res.send("GET one post's comments success.")
    })

    router.post('/:id/comments', validateCommentCreation, async (req, res) => {
        try {
            const userId = req.user.id
            const postId = req.params.id
            const { content } = req.body
            const newComment = await commentService.createComment({
                userId,
                content
            })
            const user = await userService.getUserById(userId)
            await postService.updatePostComments(postId, newComment.id)
            res.json({
                ...newComment,
                user
            })
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    })

    router.patch('/:id/like', (req, res) => {
        // todo: validate the fact that user cannot like own post
        res.json({
            message: 'PATCH post like success'
        })
    })

    router.patch('/:id/unlike', (req, res) => {
        res.json({
            message: 'PATCH post unlike success'
        })
    })
}

module.exports = { postController }

test = [111, 222, 333]

for (const i of test) {
    console.log(i)
}
