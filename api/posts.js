import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { getPosts, addPost, deletePost, updatePost } from '../model/posts.js'


const router = express.Router()

router.route('/')
	.get((req, res) => {
		let posts = getPosts()
		res.status(StatusCodes.OK).json(posts)
	})
	.post(addPost, (req, res) => {
		res.status(StatusCodes.CREATED).json({success: true})
	})
router.route('/:id')
	.delete(deletePost, (req, res) => {
		res.status(StatusCodes.OK).json({success: true})
	})
	.put(updatePost, (req, res) => {
		res.status(StatusCodes.OK).json({success: true})
	})


export default router