import mongoose, { Schema } from 'mongoose'
import multer from 'multer';
import fs from 'fs'
import path from 'path';
import { __dirname} from '../index.js'

const fileSchema = new Schema({
	entity_type: {
		type: String,
		required: true
	},
	entity_id: {
		type: String,
		required: true
	},
	entity_propertyName: {
		type: String,
		required: true
	},
	file_storage_link: {
		type: String,
		required: true
	},
	file_name: {
		type: String,
		required: true
	},
	file_type: {
		type: String,
		required: true
	},
})

const File = mongoose.model('File', fileSchema)


function clearDirectory(path) {
	fs.readdir(path, (err, files) => {
		if(err) {
			console.log('Error reading directory');
			return
		}
		files.forEach(file => {
			const filePath = path.join(path, file)
			console.log(filePath);
			fs.unlink(filePath, err => {
				if(err) {
					console.log(err);
				}
			})
		})
	})
}

const storage = multer.diskStorage({
	destination: async(req, file, cb) => {
		console.log(file);		
		const {entity_id, entity_type, entity_propertyName} = req.body
		if (file) {
			const file_type = path.extname(file.originalname);
			const file_name = Buffer.from(file.originalname, 'binary').toString('utf-8');
			const file_storage_link = `/files/${req.params.entityID}/${file_name}`
			const createFileResult = await File.create({entity_id, entity_type, entity_propertyName, file_storage_link, file_name, file_type})
			const createdFileID = createFileResult._id
			if (!fs.existsSync(__dirname + `/files/${req.params.entityID}`)) {
				fs.mkdirSync(__dirname + `/files/${req.params.entityID}`)	
			}
		}
		cb(null, __dirname + `/files/${req.params.entityID}`)
	},
	filename: async(req, file, cb) => {
		cb(null, Buffer.from(file.originalname, 'binary').toString('utf-8'));
	}
})

export const upload = multer({ storage: storage})

export const getFile = async(req, res, next) => {
	const findFileResult = await File.find({entity_id: req.params.entityID}).select('file_storage_link')
	console.log(findFileResult);
	req.fileStorageLinks = findFileResult
	next()
}

export const getFileByEntityID = async(req, res, next) => {
	const findFileResult = await File.find({entity_id: req.params.entityID}).select('file_storage_link')
	console.log(findFileResult);
	req.fileStorageLinks = findFileResult
	next()
}

export const deleteAllFilesByEntityID = async(req, res, next) => {
	const deleteFilesResult = await File.deleteMany({entity_id: req.params.entityID})
	console.log(__dirname + `/files/${req.params.entityID}`);
	fs.rm(__dirname + `/files/${req.params.entityID}`, {recursive: true, force: true}, (err) => {
		console.log(err);
	})
	next()
}

export const deleteFileByID = async(req, res, next) => {
	const deleteFileResult = await File.findByIdAndDelete(req.params.fileID)
	console.log(deleteFileResult);
	const {entity_id, file_name} = deleteFileResult
	fs.rm(__dirname + `/files/${entity_id}/${file_name}`, {recursive: true, force: true}, (err) => {
		console.log(err);
	})
	next()
}
