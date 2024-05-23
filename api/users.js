import express from 'express'
import { changeUserPassord, deleteUser, getUser, getUsers, updateUser } from '../model/users.js'
import { StatusCodes } from 'http-status-codes'
import { authRole, requireAuth } from '../services/passport-config.js'

const router = express.Router()


router.route('/').get(requireAuth, authRole(['admin']), (req, res) => {
	let users = getUsers()
	res.status(StatusCodes.OK).json(users)
})

router.route('/:id')
	.get((req,res,next) => {
		let userID = Number(req.params.id)
		let user = getUser(userID)
		let userToSend = {...user}
		delete userToSend.passwordHash
		console.log(userID)
		res.status(StatusCodes.OK).json(userToSend)
	})
	.delete(requireAuth, authRole(['admin']), deleteUser, (req, res, next) => {
		res.status(StatusCodes.OK).json({ msg: 'User successfully deleted'})
	})
	.put(requireAuth, authRole(['admin', 'user']), updateUser, (req, res, next) => {
		res.status(StatusCodes.OK).json({ msg: 'User successfully updated'})
	})
	
router.route('/:id/changePassword')
	.put(requireAuth, changeUserPassord, (req,res,next) => {
		res.status(StatusCodes.OK).json('Password changed successfully')
	})

export default router