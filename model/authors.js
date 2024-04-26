import { StatusCodes } from 'http-status-codes'
import { posts } from './posts.js'

const authors = [
  {
    id: 1,
		name: "Author 1"
  },
  {
    id: 2,
		name: "Author 2"
  },
  {
    id: 3,
		name: "Author 3"
  },
  {
    id: 4,
		name: "Author 4"
  }
]


function getAuthors(req, res) {
	res.status(StatusCodes.OK).json(authors)
}

function getAuthorPosts(req, res) {
  const {id} = req.params
  const author = authors.find(author => author.id === Number(id))
	let authorPosts = posts.filter((post) => post.author === author.name )
  res.status(StatusCodes.OK).json({authorPosts, name: author.name})
}
export {getAuthors, getAuthorPosts}