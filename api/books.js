import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { getBooks, addBook, deleteBook, updateBook } from '../model/books.js'


const router = express.Router()

router.route('/')
	.get((req, res) => {
		let books = getBooks()
		res.status(StatusCodes.OK).json(books)
	})
	.post(addBook, (req, res) => {
		res.status(StatusCodes.CREATED).json({success: true})
	})
router.route('/:id')
	.delete(deleteBook, (req, res) => {
		res.status(StatusCodes.OK).json({success: true})
	})
	.put(updateBook, (req, res) => {
		res.status(StatusCodes.OK).json({success: true})
	})


export default router