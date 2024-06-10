import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'

import { User } from './users.js'

async function signIn(req, res, next) {
	try {
		let {login, passwordHash} = req.body
		const user = await User.findOne({login}).lean()

		if(!user) {
			res.status(StatusCodes.NOT_FOUND).json('User not found')
			return
		}
		
		let isPasswordMatch = await bcrypt.compare(passwordHash, user.passwordHash)
		if(!isPasswordMatch) {
			res.status(StatusCodes.NOT_ACCEPTABLE).json('Wrong password')
			return
		}

		let userID = user._id
		const token = jwt.sign({userID}, `${process.env.JWT_SECRET}`, {expiresIn:'30d'})
		
		delete user.passwordHash 
		req.user = user
		req.token = token
		next()		
	} catch (err) {
		console.log(err);
	}

}

export {signIn}