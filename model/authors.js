import { StatusCodes } from 'http-status-codes'
import { posts } from './posts.js'

const users = [
  {
    id: 1,
		name: "Author 1",
    login: null,
    passwordHash: null
  },
  {
    id: 2,
		name: "Author 2",
    login: null,
    passwordHash: null
  },
  {
    id: 3,
		name: "Author 3",
    login: null,
    passwordHash: null
  },
  {
    id: 4,
		name: "Author 4",
    login: null,
    passwordHash: null
  }
]


// function getAuthors(req, res) {
// 	res.status(StatusCodes.OK).json(users)
// }
const getUsers = () => users

function getUserPosts(id) {
  const user = users.find(user => user.id === Number(id))
	let userPosts = posts.filter((post) => post.userID === Number(id) )
  return {userPosts, name: user.name}
}
export {getUsers, getUserPosts}