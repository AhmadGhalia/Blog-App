import asyncHandler from 'express-async-handler';
import { Post } from '../models/post.mjs';
import { validateCreatePost, validateUpdatePost } from '../models/validation.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cloudinaryUploadImage, cloudinaryRemoveImage } from '../utils/cloudinaryConfig.mjs'
import fs, { read } from 'fs';
// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/**--------------------------------------------
 * @desc   create new post
 * @route  post /api//posts/create
 * @method post
 * @access registed users
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


/**--------------------------------------------
 * @desc   get all posts
 * @route   /api//posts/getAllPosts
 * @method GET
 * @access public both admin and users
 ----------------------------------------------*/
const getAllPostCtrl = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 3
  const { pageNumber, category } = req.query;
  let posts;
  if (pageNumber) {
    posts = await Post.find().skip((pageNumber - 1) * POST_PER_PAGE).limit(POST_PER_PAGE).sort({ createdAt: -1 }).populate('user', ['-password'])
  } else if (category) {
    posts = await Post.find({ category }).sort({ createdAt: -1 }).populate('user', ['-password'])
  } else {
    posts = await Post.find().sort({ createdAt: -1 }).populate('user', ['-password'])
  }

  res.status(200).json(posts)
})
/**--------------------------------------------
 * @desc   get all posts
 * @route   /api//posts/getAllPosts
 * @method GET
 * @access public both admin and users
 ----------------------------------------------*/
const getSinglePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user', ['-password'])
  if (!post) {
    res.status(404).json({ message: 'Post not found' })
  }
  res.status(200).json(post)
})

const getCountPostCtrl = asyncHandler(async (req, res) => {
  const count = await Post.countDocuments();
  res.status(200).json({ count })
})

/**--------------------------------------------
 * @desc   delete a post
 * @route   /api//posts/:id
 * @method Delete
 * @access private both admin and users
 ----------------------------------------------*/
const deleteSinglePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(404).json({ message: 'Post not found' })
  }
  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await Post.findByIdAndDelete(req.params.id)
    await cloudinaryRemoveImage(post.image.publicId)
    res.status(200).json({ message: 'The post is deleted', postID: post._id })
  }
  else {
    res.status(403).json({ message: 'Access denied, forbidden' })
  }
})

/**--------------------------------------------
 * @desc   update a post
 * @route   /api/posts/update/:id
 * @method put
 * @access private only users
 ----------------------------------------------*/
const updateSinglePostCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdatePost(req.body); // Validate the input data
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(404).json({ message: 'Post not found' })
  }

  if (req.user.id !== post.user.toString()) {
    res.status(403).json({ message: 'Access denid, only the owner can update the post' })
  }
  // Update the user's profile in the database
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true } // Return the updated document
  )

  res.status(200).json({ message: 'The post is updated', updatedPost })

})

/**--------------------------------------------
 * @desc   update an image
 * @route   /api/posts/upload-image/:id
 * @method put
 * @access private only users
 ----------------------------------------------*/
const updateImagePostCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No emage provided' });
  }

  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(404).json({ message: 'Post not found' })
  }

  if (req.user.id !== post.user.toString()) {
    res.status(403).json({ message: 'Access denid, only the owner can update the post' })
  }
  // Update the post image in the database
  await cloudinaryRemoveImage(post.image.publicId)
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
  const result = await cloudinaryUploadImage(imagePath)

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id, {
    $set: {
      image: {
        url: result.secure_url,
        publicId: result.public_id
      }
    }
  },
    { new: true } // Return the updated document
  ).populate('user', ['-password']); // Exclude 'password' field

  fs.unlinkSync(imagePath)
  res.status(200).json({ message: 'The post is updated', updatedPost })
})

/**--------------------------------------------
 * @desc   toggle like
 * @route   /api/posts/like/:id
 * @method put
 * @access private only logged users
 ----------------------------------------------*/
const taggleLike = asyncHandler(async (req, res) => {
  const loggedUser = req.user.id;
  const postId = req.params.id;
  let post = await Post.findById(postId)
  if (!post) {
    res.status(401).json({ message: 'post not find' })
  }

  const postIsAlreadyLiked = post.likes.find((user) => {
    return user.toString() === loggedUser
  })

  if (postIsAlreadyLiked) {
    await Post.findByIdAndUpdate(postId, {
      $pull: {
        likes: loggedUser
      }
    }, { new: true }
    )
  } else {
    await Post.findByIdAndUpdate(postId, {
      $push: {
        likes: loggedUser
      }
    }, { new: true }
    )
  }
  res.status(200).json({ message: 'good' })
})


export { createNewPostCtrl, getAllPostCtrl, getSinglePostCtrl, getCountPostCtrl, deleteSinglePostCtrl, updateSinglePostCtrl, updateImagePostCtrl, taggleLike }