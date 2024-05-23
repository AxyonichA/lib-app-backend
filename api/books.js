import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { getBooks, addBook, deleteBook, updateBook } from '../model/books.js'
import { authRole, requireAuth } from '../services/passport-config.js'


const router = express.Router()

router.route('/')
	.get(requireAuth, (req, res, next) => {
		let books = getBooks()
		res.status(StatusCodes.OK).json(books)
	})
	.post(requireAuth, authRole(['admin']), addBook, (req, res) => {
		res.status(StatusCodes.CREATED).json({success: true})
	})
router.route('/:id')
	.delete(requireAuth, authRole(['admin']), deleteBook, (req, res) => {
		res.status(StatusCodes.OK).json({success: true})
	})
	.put(requireAuth, authRole(['admin']), updateBook, (req, res) => {
		res.status(StatusCodes.OK).json({success: true})
	})


export default router