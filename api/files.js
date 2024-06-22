import express from 'express'
import { deleteFiles, getFile, upload } from '../model/files.js'
import { StatusCodes } from 'http-status-codes'

const router = express.Router()

router.route('/:id')
	.get(getFile, (req,res) => {
	// console.log(req.fileStorageLinks);
	res.status(StatusCodes.OK).json(req.fileStorageLinks)
}).delete(deleteFiles, (req, res) => {
	res.status(StatusCodes.OK).json({msg: 'files deleted'})
})

router.route('/:id/upload').post(upload.single("file"),(req, res) => {
	console.log(req.file);
	res.status(StatusCodes.OK).json('file created')
})

export default router