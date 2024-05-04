import { StatusCodes } from 'http-status-codes'
import { posts } from './posts.js'

let users = [
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

const getUsers = () => users

function createUser(req, res, next) {
  const name = req.body.editedAuthor
  const newAuthor = {id: users.length + 1, name, login: null, passwordHash: null}
  users.push(newAuthor)
  next()
}

function deleteUser(req, res, next) {
  users = users.filter((user) => user.id !== Number(req.params.id))
  next()
}

function getUserPosts(id) {
  const user = users.find(user => user.id === Number(id))
	let userPosts = posts.filter((post) => post.userID === Number(id) )
  return {userPosts, name: user.name}
}
export {users, getUsers, getUserPosts, createUser, deleteUser}