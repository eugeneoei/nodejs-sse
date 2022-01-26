const express = require('express')
const { PostService } = require('../services/post.service')
const { CommentService } = require('../services/comment.service')
const { ImageService } = require('../services/image.service')
const { UserService } = require('../services/user.service')
const { isAuthenticated } = require('../middlewares/authorisation.middleware')
const { validatePostCreation } = require('../middlewares/post.middleware')
const { validateCommentCreation } = require('../middlewares/comment.middleware')

const postController = app => {
    const router = express.Router()

    const postService = new PostService()
    const userService = new UserService()
    const commentService = new CommentService()
    const imageService = new ImageService()

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
            res.status(404).json({
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
        try {
            const postId = req.params.id
            const query = req.query
            const comments = await postService.getPostPaginatedComments(
                postId,
                query
            )
            res.json(comments)
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
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

    router.patch('/:id/like', async (req, res) => {
        try {
            const userId = req.user.id
            const postId = req.params.id
            const updatedPost = await postService.likePost(postId, userId)
            res.json(updatedPost)
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    })

    router.patch('/:id/unlike', async (req, res) => {
        try {
            const userId = req.user.id
            const postId = req.params.id
            const updatedPost = await postService.unlikePost(postId, userId)
            res.json(updatedPost)
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    })
}

module.exports = { postController }
