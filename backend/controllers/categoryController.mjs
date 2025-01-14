import asynchandler from 'express-async-handler'
import { Category } from '../models/Category.mjs'
import * as validation from '../models/validation.mjs'

const createCategory = asynchandler(async (req, res) => {
  const { error } = validation.validateCreateCategory(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  const category = await Category.create(
    {
      title: req.body.title,
      user: req.user.id,
    })

  res.status(200).json({ message: 'The category created successfully', category })
})

const getAllCategories = asynchandler(async (req, res) => {
  const categories = await Category.find()
  res.status(200).json({ categories })
})

const deleteCategory = asynchandler(async (req, res) => {
  const category = await Category.findById(req.params.id)
  if (!category) {
    res.status(404).json({ message: 'category not found' })
  }
  await Category.findByIdAndDelete(req.params.id)
  res.status(200).json({ message: 'The category deleted successfully', categoryId: category._id })


})


export { createCategory,getAllCategories,deleteCategory }