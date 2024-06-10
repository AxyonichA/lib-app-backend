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
			clearDirectory(__dirname + `/files/${req.params.id}`)
			const file_type = path.extname(file.originalname);
			const file_name = Buffer.from(file.originalname, 'binary').toString('utf-8');
			const file_storage_link = `/files/${req.params.id}/${file_name}`
			const createFileResult = await File.create({entity_id, entity_type, entity_propertyName, file_storage_link, file_name, file_type})
			const createdFileID = createFileResult._id
			if (!fs.existsSync(__dirname + `/files/${req.params.id}`)) {
				fs.mkdirSync(__dirname + `/files/${req.params.id}`)	
			}
		}
		cb(null, __dirname + `/files/${req.params.id}`)
	},
	filename: async(req, file, cb) => {
		cb(null, Buffer.from(file.originalname, 'binary').toString('utf-8'));
	}
})

export const upload = multer({ storage: storage})

export const getFile = async(req, res, next) => {
	const findFileResult = await File.find({entity_id: req.params.id}).select('file_storage_link')
	console.log(findFileResult);
	req.fileStorageLinks = findFileResult
	next()
}

export const deleteFiles = async(req, res, next) => {
	const deleteFilesResult = await File.deleteMany({entity_id: req.params.id})
	console.log(__dirname + `/files/${req.params.id}`);
	fs.rm(__dirname + `/files/${req.params.id}`, {recursive: true, force: true}, (err) => {
		console.log(err);
	})
	next()
}
// const storage = multer.diskStorage({
// 	destination: async function (req, file, cb) {
// 		try {
// 			let fileResponse = await File.findById(req.params.id);
// 			let fileEntity = fileResponse?.[0];
// 			console.log('file', fileEntity)
// 			console.log('filePath[file.entity_name]',filePath[fileEntity.entity_name])
// 			// Set destination folder based on request ID
// 			let folder = null;
// 			if (file) {
// 					const extension = path.extname(file.originalname);
// 					let decodedFileName = Buffer.from(file.originalname, 'binary').toString('utf-8');
// 					folder = `${filePath[fileEntity.entity_name]}`/`${fileEntity.entity_id}`;
// 					await File.findByIdAndUpdate(req.params.id, {file_storage_link: path.join(folder, decodedFileName), file_name: decodedFileName, file_ext: extension})
// 					if (!fs.existsSync(folder)) {
// 							fs.mkdirSync(folder, { recursive: true });
// 					}
// 			}
// 			cb(null, folder);
// 		} catch (error) {
// 			// Handle the error here
// 			console.error(`Ошибка при загрузке файлов: req.params.id: ${req.params.id}, error: ${error}`);
// 			cb(error); // Pass the error to the callback
// 		}
// 	},
// 	filename: function (req, file, cb) {
// 			try {
// 			// Use original file name as filename
// 					cb(null, Buffer.from(file.originalname, 'binary').toString('utf-8'));
// 			} catch (error) {
// 					// Handle the error here
// 					console.error(`Ошибка при загрузке файлов 2: req.params.id: ${req.params.id}, error: ${error}`);
// 					cb(error); // Pass the error to the callback
// 			}
// 	},
// 	overwrite: true
// });
