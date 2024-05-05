import express from 'express'

const router = express.Router()

import { auth, register } from '../model/auth.js'
import { StatusCodes } from 'http-status-codes'


router.route('/').get((req, res) => {
	let {login, password, nickname} = req.query
	let authResult
	if(!nickname) {
		authResult = auth(login, password)		
	} else {
		authResult = register(login, password, nickname)
	}

	res.status(StatusCodes.OK).json(authResult)
})

export default router