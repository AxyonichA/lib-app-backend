import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { getAuthors, getAuthorBooks, createAuthor, deleteAuthor, updateAuthor, getAuthor } from '../model/authors.js'
import { authRole, requireAuth } from '../services/passport-config.js'

const router = express.Router()


router.route('/')
	.get(requireAuth, getAuthors, (req, res) => {
		res.status(StatusCodes.OK).json(req.authors)
	})
	.post(requireAuth, authRole(['admin']), createAuthor, (req, res) => {
		res.status(StatusCodes.CREATED).json(req.authorID)
	})

router.route('/:id')
	.get(requireAuth, getAuthor, (req, res) => {
		res.status(StatusCodes.OK).json(req.author)
	})
	.delete(requireAuth, authRole(['admin']), deleteAuthor, (req, res) => {
		res.status(StatusCodes.OK).json({success: true})
	})
	.patch(requireAuth, authRole(['admin']), updateAuthor, (req, res) => {
		res.status(StatusCodes.OK).json({success: true})
	})

router.route('/:id/books').get(requireAuth, getAuthorBooks, (req, res) => {
	res.status(StatusCodes.OK).json(req.authorBooks)
})


export default router