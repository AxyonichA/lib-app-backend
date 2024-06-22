import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { getBooks, addBook, deleteBook, updateBook, getBook } from '../model/books.js'
import { authRole, requireAuth } from '../services/passport-config.js'


const router = express.Router()

router.route('/')
	.get(requireAuth, getBooks, (req, res) => {
		res.status(StatusCodes.OK).json(req.books)
	})
	.post(requireAuth, authRole(['admin']), addBook, (req, res) => {
		res.status(StatusCodes.CREATED).json(req.bookID)
	})
router.route('/:id')
	.get(requireAuth, getBook, (req, res) => {
		res.status(StatusCodes.OK).json(req.book)
	})
	.delete(requireAuth, authRole(['admin']), deleteBook, (req, res) => {
		res.status(StatusCodes.OK).json({success: true})
	})
	.patch(requireAuth, authRole(['admin']), updateBook, (req, res) => {
		res.status(StatusCodes.OK).json({success: true})
	})


export default router