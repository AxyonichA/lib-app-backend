import express from 'express'
import cors from 'cors'
// import bodyParser from 'body-parser'
import posts from './api/posts.js'
import authors from './api/authors.js'

const app = express()

// app.use(bodyParser.json())
app.use(express.json())
app.use(cors({
	origin: '*',
	methods: '*'
}))


app.use('/api/posts', posts)
app.use('/api/authors', authors)



app.listen(5000)

// TODO
// переименовать в authors в users {login, passwordHASH} COMPLETED
// в model/posts author переделать в authorID COMPLETED
// в model/authors переделать функцию getAuthorPosts так, чтобы фильтр постов происходил по authorID COMPLETED
// Вынести req,res из middleware-функций в model в api COMPLETED
// Переделать модалку, переместив все содержимое, не относящееся к модалке, в slot, и осуществить внешнее управление состоянием модалки COMPLETED
// В postStore добавить в функции параметры так, чтобы не было необходимости хранить editedPost в store COMPLETED
// !!! ВНИКНУТЬ В ВОЗМОЖНОСТЬ РАБОТЫ СУЩЕСТВУЮЩИх ФУНКЦИЙ БЕЗ pinia COMPLETED