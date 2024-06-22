import { StatusCodes } from 'http-status-codes'
import mongoose, { Schema } from 'mongoose'


const bookSchema = new Schema({
	authorID: {
		type: String,
		required: [true],
	},
	authorName: {
		type: String,
		required: [true],
	},
	title: {
		type: String,
		required: [true],
	},
	body: {
		type: String,
		required: true,
	},
})
const Book = mongoose.model('Book', bookSchema)

const getBooks = async(req, res, next) => {
  try {
    let books = await Book.find()
    req.books = books
		next()		
  } catch (err) {
    console.log(err);
  }
}

const getBook = async(req, res, next) => {
	try {
		let book = await Book.findById(req.params.id)
		req.book = book
		next()
	} catch (err) {
		console.log(err);
	}
}

const addBook = async(req, res, next) => {
	const addBookResult = await Book.create(req.body)
	req.bookID = addBookResult._id
  next()
}

const deleteBook = async(req, res, next) => {
  const deleteBookResult = await Book.findByIdAndDelete(req.params.id)
  next()
}


const updateBook = async(req, res, next) => {
  const updateBookResult = await Book.findByIdAndUpdate(req.params.id, req.body)
  next()
}

export {Book, getBooks, getBook, addBook, deleteBook, updateBook }
