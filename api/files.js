import express from 'express'
import { deleteAllFilesByEntityID, deleteFileByID, getFileByEntityID, upload } from '../model/files.js'
import { StatusCodes } from 'http-status-codes'

const router = express.Router()

router.route('/:entityID')
	.get(getFileByEntityID, (req,res) => {
	res.status(StatusCodes.OK).json(req.fileStorageLinks)
}).delete(deleteAllFilesByEntityID, (req, res) => {
	res.status(StatusCodes.OK).json({msg: 'files deleted'})
})
router.route('/:entityID/:fileID')
	.delete(deleteFileByID, (req, res) => {
		res.status(StatusCodes.OK).json({msg: 'file deleted'})
	})
router.route('/:entityID/upload').post(upload.single("file"),(req, res) => {
	console.log(req.file);
	res.status(StatusCodes.OK).json('file created')
})

export default router