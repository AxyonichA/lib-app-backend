import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'

import { createUser, users } from '../model/users.js'
import { signIn } from '../model/auth.js'
import { requireAuth } from '../services/passport-config.js'

const router = express.Router()


router.route('/').get(requireAuth, (req, res) => {
	let user = req.user
	delete user.passwordHash
	res.status(StatusCodes.OK).json(user)
})

router.route('/signin').post(signIn, (req, res) => {
	let userToSend = req.userToSend
	let token = req.token
	res.status(StatusCodes.OK).json({msg: `user ${userToSend.nickName} logged in`, user: {...userToSend}, token})
})

router.route('/signup').post(createUser, signIn, async (req, res) => {
	let userToSend = req.userToSend
	let token = req.token
	res.status(StatusCodes.OK).json({msg: `user registrated successfully and logged in`, user: {...userToSend}, token})
})

export default router