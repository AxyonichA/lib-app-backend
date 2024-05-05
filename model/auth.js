import { users } from './users.js'

const auth = (login, password) => {
	let authUser = users.find((user) => user.login === login)
	let authSuccess = authUser ? (authUser.passwordHash === password ? true : false) : false
	return authSuccess
}
const register = (login, password, nickname) => {
	return `Login: ${login}, Password: ${password}, Nickname: ${nickname}`
}

export { auth, register }