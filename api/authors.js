import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { getUserPosts } from '../model/authors.js'
import { getUsers } from '../model/authors.js'


const router = express.Router()


router.route('/').get((req, res) => {
	let allAuthors = getUsers()
	res.status(StatusCodes.OK).json(allAuthors)
})

router.route('/:id/posts').get((req, res) => {
	let {id} = req.params
	let {userPosts, name} = getUserPosts(id)
	res.status(StatusCodes.OK).json({userPosts, name})
})


export default router