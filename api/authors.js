import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { getAuthors, getAuthorBooks, createAuthor, deleteAuthor } from '../model/authors.js'
import { deleteUserBooks } from '../model/books.js'
import { authRole, requireAuth } from '../services/passport-config.js'

const router = express.Router()


router.route('/')
	.get(requireAuth, (req, res, next) => {
		let allAuthors = getAuthors()
		res.status(StatusCodes.OK).json(allAuthors)
	})
	.post(requireAuth, authRole(['admin']), createAuthor, (req, res) => {
		res.status(StatusCodes.CREATED).json({success: true})
	})

router.route('/:id')
	.delete(requireAuth, authRole(['admin']), deleteAuthor, deleteUserBooks, (req, res) => {
		res.status(StatusCodes.OK).json({success: true})
	})

router.route('/:id/books').get(requireAuth, (req, res) => {
	let {id} = req.params
	let {authorBooks, name} = getAuthorBooks(id)
	res.status(StatusCodes.OK).json({authorBooks, name})
})


export default router