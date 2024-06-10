import express from 'express'
import { changeUserPassord, deleteUser, getUser, getUsers, updateUser } from '../model/users.js'
import { StatusCodes } from 'http-status-codes'
import { authRole, requireAuth } from '../services/passport-config.js'

const router = express.Router()


router.route('/').get(requireAuth, authRole(['admin']), getUsers, (req, res) => {
	res.status(StatusCodes.OK).json(req.users)
})

router.route('/:id')
	.get(getUser, async(req, res) => {
		res.status(StatusCodes.OK).json(req.foundUser)
	})
	.delete(requireAuth, authRole(['admin']), deleteUser, (req, res) => {
		res.status(StatusCodes.OK).json({ msg: 'User successfully deleted'})
	})
	.patch(requireAuth, authRole(['admin', 'user']), updateUser, (req, res) => {
		res.status(StatusCodes.OK).json({ msg: 'User successfully updated'})
	})
	
router.route('/:id/changePassword')
	.patch(requireAuth, changeUserPassord, (req, res) => {
		res.status(StatusCodes.OK).json('Password changed successfully')
	})

export default router