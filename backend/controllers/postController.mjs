import asyncHandler from 'express-async-handler';
import { Post } from '../models/post.mjs';
import { validateCreatePost } from '../models/validation.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cloudinaryUploadImage } from '../utils/cloudinaryConfig.mjs'
import fs from 'fs';
// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/**--------------------------------------------
 * @desc   create new post
 * @route  post /api//posts/create
 * @method GET
 * @access Admin
 ----------------------------------------------*/
const createNewPostCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: 'No image uploaded' })
  }
  const { error } = validateCreatePost(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message })
  }
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
  const result = await cloudinaryUploadImage(imagePath)

  const newPost = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id 
    }
  })
  fs.unlinkSync(imagePath)
  res.status(201).json({ message: 'Post created successfully', newPost })
  
})
export { createNewPostCtrl }