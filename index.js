import express from 'express'
import cors from 'cors'

// import bodyParser from 'body-parser'
import books from './api/books.js'
import authors from './api/authors.js'
import auth from './api/auth.js'

const app = express()

// app.use(bodyParser.json())
app.use(express.json())
app.use(cors({
	origin: '*',
	methods: '*'
}))


app.use('/api/books', books)
app.use('/api/authors', authors)
app.use('/auth', auth)


app.listen(5000)

// TODO
// Переделать приложение под идею с библиотекой
	//  authors - авторы произведений {authorID, ФИО, birthPlace, birthDate, deathDate, biography}
	//  books - книги {authorID, bookID, title, description, date}
	//  users - пользователи сайта {userId, login, password, nickname, ФИО, birthDate, }
// Переделать модалку с регистрацией и логином в отдельную страницу
