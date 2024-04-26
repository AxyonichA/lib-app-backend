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