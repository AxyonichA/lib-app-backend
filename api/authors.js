import express from 'express'

import { getAuthorPosts } from '../model/authors.js'
import { getAuthors } from '../model/authors.js'


const router = express.Router()

router.route('/').get(getAuthors)
router.route('/:id/posts').get(getAuthorPosts)


export default router