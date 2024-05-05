import { StatusCodes } from 'http-status-codes'
import { authors } from './authors.js'
let books = [
    {
      id: 1,
      authorID: 1,
      authorName: "Author 1",
      title: "Заголовок поста 1",
      body: "Содержание поста 1"
    },
    {
      id: 2,
      authorID: 2,
      authorName: "Author 2",
      title: "Заголовок поста 2",
      body: "Содержание поста 2"
    },
    {
      id: 3,
      authorID: 3,
      authorName: "Author 3",
      title: "Заголовок поста 3",
      body: "Содержание поста 3"
    },
    {
      id: 4,
      authorID: 1,
      authorName: "Author 1",
      title: "Заголовок поста 4",
      body: "Содержание поста 4"
    },
    {
      id: 5,
      authorID: 2,
      authorName: "Author 2",
      title: "Заголовок поста 5",
      body: "Содержание поста 5"
    },
    {
      id: 6,
      authorID: 3,
      authorName: "Author 3",
      title: "Заголовок поста 6",
      body: "Содержание поста 6"
    },
    {
      id: 7,
      authorID: 1,
      authorName: "Author 1",
      title: "Заголовок поста 7",
      body: "Содержание поста 7"
    },
    {
      id: 8,
      authorID: 2,
      authorName: "Author 2",
      title: "Заголовок поста 8",
      body: "Содержание поста 8"
    },
    {
      id: 9,
      authorID: 3,
      authorName: "Author 3",
      title: "Заголовок поста 9",
      body: "Содержание поста 9"
    },
    {
      id: 10,
      authorID: 4,
      authorName: "Author 4",
      title: "Заголовок поста 10",
      body: "Содержание поста 10"
    }
  ]


const getBooks = () => books

const addBook = (req, res, next) => {
  let {title, body, authorID} = req.body
  authorID = Number(authorID)
  console.log(authorID)
  let author = authors.find(author => author.id === authorID)
  let authorName = author.name  
	let book = {title, body, authorID, id: books.length === 0 ? 1 : books[books.length - 1].id + 1, authorName}
	books.push(book)
  next()
}

function deleteBook (req, res, next) {
  books = books.filter((book) => book.id !== Number(req.params.id))
  next()
}


function updateBook (req, res, next) {
  let {id} = req.params
  let {title, body, authorID} = req.body
  let author = authors.find(author => author.id === Number(authorID))
  let authorName = author.name
  books = books.map((book) => {
    if(book.id === Number(id)) {
      book.authorID = Number(authorID)
      book.authorName = authorName
      book.title = title
      book.body = body
    }
    return book
  })
  next()
}

function deleteUserBooks(req, res, next) {
  books = books.filter((book) => book.authorID !== Number(req.params.id))
  next()
}

export {books, getBooks, addBook, deleteBook, updateBook, deleteUserBooks}
