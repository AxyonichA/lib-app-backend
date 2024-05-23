import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'

import { createUser, users } from './users.js'

async function signIn(req, res, next) {
	let {login, password} = req.body

	let user = users.find((user) => user.login === login)
	if(!user) {
		res.status(StatusCodes.NOT_FOUND).json('User not found')
		return
	}
	let isPasswordMatch = await bcrypt.compare(`${password}`, user.passwordHash)
	if(!isPasswordMatch) {
		res.status(StatusCodes.NOT_ACCEPTABLE).json('Wrong password')
		return
	}
	let userID = user.id
	const token = jwt.sign({userID}, `${process.env.JWT_SECRET}`, {expiresIn:'30d'})
	let userToSend = {...user}
	delete userToSend.passwordHash
	req.userToSend = userToSend 
	req.token = token
	next()
}

export {signIn}