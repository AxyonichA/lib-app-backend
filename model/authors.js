import { StatusCodes } from 'http-status-codes'
import { Book } from './books.js'
import mongoose, { Schema } from 'mongoose'

const authorSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  },
  deathDate: {
    type: String,
    required: true
  },
  birthPlace: {
    type: String,
    required: true
  },
  deathPlace: {
    type: String,
    required: true
  },
})

const Author = mongoose.model('Author', authorSchema)

const getAuthors = async(req, res, next) => {
  try {
    let authors = await Author.find().sort({name: 1})
    req.authors = authors
    next()     
  } catch (err) {
    console.log(err);
  }
}

const getAuthor = async(req, res, next) => {
  try {
    const author = await Author.findById(req.params.id)
    req.author = author
    next()
  } catch (err) {
    console.log(err);
  }
}
const createAuthor = async(req, res, next) => {
  try {
    const createAuthorResult = await Author.create(req.body)
    req.authorID = createAuthorResult._id
    next()    
  } catch (err) {
    console.log(err)
  }
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

const updateAuthor = async(req,res,next) => {
  try {
    const authorUpdateResult = await Author.findByIdAndUpdate(req.params.id, req.body)
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
export {getAuthors, getAuthor, getAuthorBooks, createAuthor, deleteAuthor, updateAuthor}