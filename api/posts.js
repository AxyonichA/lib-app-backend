import express from 'express'

import { getPosts, addPost, deletePost, updatePost } from '../model/posts.js'


const router = express.Router()

router.route('/').get(getPosts).post(addPost)
router.route('/:id').delete(deletePost).put(updatePost)


export default router