import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { getAuthors, getAuthorBooks, createAuthor, deleteAuthor } from '../model/authors.js'
import { deleteUserBooks } from '../model/books.js'
const router = express.Router()


router.route('/')
	.get((req, res) => {
		let allAuthors = getAuthors()
		res.status(StatusCodes.OK).json(allAuthors)
	})
	.post(createAuthor, (req, res) => {
		res.status(StatusCodes.CREATED).json({success: true})
	})

router.route('/:id')
	.delete(deleteAuthor, deleteUserBooks, (req, res) => {
		res.status(StatusCodes.OK).json({success: true})
	})

router.route('/:id/books').get((req, res) => {
	let {id} = req.params
	let {authorBooks, name} = getAuthorBooks(id)
	res.status(StatusCodes.OK).json({authorBooks, name})
})


export default router