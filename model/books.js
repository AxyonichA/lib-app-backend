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
  } catch (err) {
    console.log(err);
  }
  next()
}

const addBook = async(req, res, next) => {
  const book = new Book(req.body)
  const addBookResult = await book.save()
  next()
}

const deleteBook = async(req, res, next) => {
  const deleteBookResult = await Book.findByIdAndDelete(req.params.id)
  next()
}


const updateBook = async(req, res, next) => {
  const updateResult = await Book.findByIdAndUpdate(req.params.id, req.body)
  next()
}

export {Book, getBooks, addBook, deleteBook, updateBook }
