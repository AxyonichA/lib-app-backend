import { StatusCodes } from 'http-status-codes'
import { books } from './books.js'

let authors = [
  {
    id: 1,
		name: "Author 1",
  },
  {
    id: 2,
		name: "Author 2",
  },
  {
    id: 3,
		name: "Author 3",
  },
  {
    id: 4,
		name: "Author 4",
  },
  {
    id: 5,
		name: "Author 5",
  }
]

const getAuthors = () => authors

function createAuthor(req, res, next) {
  const name = req.body.editedAuthor
  const newAuthor = {id: authors.length + 1, name}
  authors.push(newAuthor)
  next()
}

function deleteAuthor(req, res, next) {
  authors = authors.filter((author) => author.id !== Number(req.params.id))
  next()
}

function getAuthorBooks(id) {
  const author = authors.find(author => author.id === Number(id))
	let authorBooks = books.filter((book) => book.authorID === Number(id) )
  return {authorBooks, name: author.name}
}
export {authors, getAuthors, getAuthorBooks, createAuthor, deleteAuthor}