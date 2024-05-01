import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { getUsers, getUserPosts, createUser, deleteUser } from '../model/authors.js'
import { deleteUserPosts } from '../model/posts.js'
const router = express.Router()


router.route('/')
	.get((req, res) => {
		let allAuthors = getUsers()
		res.status(StatusCodes.OK).json(allAuthors)
	})
	.post(createUser, (req, res) => {
		res.status(StatusCodes.CREATED).json({success: true})
	})

router.route('/:id')
	.delete(deleteUser, deleteUserPosts, (req, res) => {
		res.status(StatusCodes.OK).json({success: true})
	})

router.route('/:id/posts').get((req, res) => {
	let {id} = req.params
	let {userPosts, name} = getUserPosts(id)
	res.status(StatusCodes.OK).json({userPosts, name})
})


export default router