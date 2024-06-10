import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { createUser } from '../model/users.js'
import { signIn } from '../model/auth.js'
import { requireAuth } from '../services/passport-config.js'

const router = express.Router()


router.route('/').get(requireAuth, async(req, res) => {
	res.status(StatusCodes.OK).json(req.user)
})

router.route('/signin').post(signIn, (req, res) => {
	let user = req.user
	let token = req.token
	res.status(StatusCodes.OK).json({msg: `user ${user.nickName} logged in`, user, token})
})

router.route('/signup').post(createUser, signIn, async (req, res) => {
	let user = req.user
	let token = req.token
	res.status(StatusCodes.OK).json({msg: `user registrated successfully and logged in`, user, token})
})

export default router