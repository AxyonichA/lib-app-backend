import { StatusCodes } from 'http-status-codes'
import { Book } from './books.js'
import mongoose, { Schema } from 'mongoose'

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

const Author = mongoose.model('Author', authorSchema)

const getAuthors = async(req, res, next) => {
  try {
    let authors = await Author.find()
    req.authors = authors
    next()     
  } catch (err) {
    console.log(err);
  }
}

const createAuthor = async(req, res, next) => {
  try {
    const author = new Author(req.body)
    const createAuthorResult = await author.save()
  } catch (err) {
    console.log(err)
  }
    next()
}

const deleteAuthor = async(req, res, next) => {
  try {
    const authorDeleteResult = await Author.findByIdAndDelete(req.params.id)
    const authorBooksDeleteResult = await Book.deleteMany({authorID: req.params.id})
    next()  
  } catch (err) {
    console.log(err);
  }

}

const getAuthorBooks = async(req, res, next) => {
  try {
    const authorBooks = await Book.find({authorID: req.params.id})
    req.authorBooks = authorBooks
    next()
  } catch (err) {
    console.log(err);
  }

}
export {getAuthors, getAuthorBooks, createAuthor, deleteAuthor}