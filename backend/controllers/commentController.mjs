import asynchandler from 'express-async-handler'
import { Comment } from '../models/Comment.mjs'
import { User } from '../models/User.mjs'
import * as validation from '../models/validation.mjs'

const createNewComment = asynchandler(async (req, res) => {
  const { error } = validation.validateCreateComment(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  const profile = await User.findById(req.user.id)
  const newComment = await Comment.create(
    {
      text: req.body.text,
      postId: req.body.postId,
      user: req.user.id,
      username: profile.username
    })

  res.status(200).json({ message: 'The comment created successfully', newComment })
})


const getAllComment = asynchandler(async (req, res) => {
  const comments = await Comment.find()
  res.status(200).json({ comments })
})


const deleteComment = asynchandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)
  if (!comment) {
    res.status(404).json({ message: 'comment not found' })
  }
  if (req.user.isAdmin || req.user.id === comment.user.toString()) {
    await Comment.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'The comment deleted successfully' })
  }
  else {
    res.status(403).json({ message: 'You are not allowed to delete this comment' })
  }
})


const updateComment = asynchandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)
  if (!comment) {
    res.status(404).json({ message: 'comment not found' })
  }
  const { error } = validation.validateUpdateComment(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  if (req.user.isAdmin || req.user.id !== comment.user.toString()) {

    res.status(200).json({ message: 'Only admin and user himselv can update the comment' })
  }
  const profile = await User.findById(req.user.id)
  const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
    $set: {
      text: req.body.text,
    }

  }, { new: true })
  res.status(200).json({ message: 'The comment updated successfully', updatedComment })
})
export { createNewComment, getAllComment, deleteComment , updateComment}