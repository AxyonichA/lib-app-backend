import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
let users = [
  {
    id: 1,
		nickName: "Boolka",
    login: "example1@mail.ru",
    passwordHash: "$2b$10$ImacCFijIgtQi0eJ4b0Dce1FnOHCWLdXnbQ.KMzkfHEW7llLC7PyC",
    role: 'admin'
  },
  {
    id: 2,
		nickName: "Slasher123",
    login: "example2@mail.ru",
    passwordHash: "$2b$10$ImacCFijIgtQi0eJ4b0Dce1FnOHCWLdXnbQ.KMzkfHEW7llLC7PyC",
    role: 'user'
  },
  {
    id: 3,
		nickName: "Kranovschik",
    login: "example3@mail.ru",
    passwordHash: "123",
    role: 'user'
  },
  {
    id: 4,
		nickName: "Читающая",
    login: "example4@mail.ru",
    passwordHash: "123",
    role: 'user'
  },
  {
    id: 5,
		nickName: "Axel",
    login: "example5@mail.ru",
    passwordHash: "123",
    role: 'user'
  }
]

const getUsers = () =>  users

function getUser(userID) {
  let user = users.find(user => user.id == userID)
  return user
}

function deleteUser(req, res, next) {
  users = users.filter((user) => user.id !== Number(req.params.id))
  next()
}
function updateUser(req, res, next) {
  let userID = Number(req.params.id)
  let { nickName, login, role } = req.body
  let currentUser = users.find(user => user.id === userID)
  switch (req.user.role) {
    case 'admin':
      currentUser.nickName = nickName
      currentUser.login = login
      currentUser.role = role
      next()      
      break;
    case 'user':
      if(req.user.id === userID) {
        currentUser.nickName = nickName
        currentUser.login = login
      }
      next()
      break;
  }
}

async function createUser(req, res, next) {
  let {login, password, nickName} = req.body
	let isLoginExists = users.find((user) => user.login === login)
	if (isLoginExists) {
		res.status(StatusCodes.CONFLICT).json('Эта почта уже используется')
		return
	}
	let passwordHash = await bcrypt.hash(password, 10)
	let newUser = {
		id: users[users.length - 1].id + 1,
		nickName,
		login,
		role: 'user',
		passwordHash
	}
	users.push(newUser)
  next()
}

async function changeUserPassord(req, res, next) {
  if(req.user.id !== Number(req.params.id)) {
		return
	}
	let {oldPassword, newPassword} = req.body
  let user = users.find(user => user.id === Number(req.params.id))
  console.log(oldPassword)
	let isPasswordMatch = await bcrypt.compare(`${oldPassword}`, user.passwordHash)
	if(!isPasswordMatch) {
		res.status(StatusCodes.NOT_ACCEPTABLE).json('Wrong password')
		return
	} else {
		let user = users.find(user => user.id === Number(req.params.id))
		let passwordHash = await bcrypt.hash(newPassword, 10)
    console.log(user.passwordHash)
		user.passwordHash = passwordHash
    console.log(user.passwordHash)
    next()
	}
}
export {users, getUsers, getUser, createUser, deleteUser, updateUser, changeUserPassord}