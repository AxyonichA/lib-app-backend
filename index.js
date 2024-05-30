import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import books from './api/books.js'
import authors from './api/authors.js'
import users from './api/users.js'
import auth from './api/auth.js'

const app = express()

app.use(express.json())
app.use(cors({
	origin: '*',
	methods: '*'
}))

app.use('/api/books', books)
app.use('/api/authors', authors)
app.use('/api/users', users)
app.use('/authorization', auth)



mongoose.connect("mongodb://localhost:27017/Library")
	.then(() => {
		console.log("Connected to database!")
		app.listen(5000, () => console.log('Server is on'))
	})
	.catch(() => {
		console.log("Connection failed");
	})