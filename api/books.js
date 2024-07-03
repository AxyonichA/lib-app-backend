import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { getBooks, addBook, deleteBook, updateBook, getBook } from '../model/books.js'
import { authRole, requireAuth } from '../services/passport-config.js'
import { deleteAllFilesByEntityID, getFileByEntityID } from '../model/files.js'

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
router.route('/:id/files')
	.delete(requireAuth, deleteAllFilesByEntityID, (req, res) => {
		res.status(StatusCodes.OK).json(req.fileStorageLinks)
	})


export default router