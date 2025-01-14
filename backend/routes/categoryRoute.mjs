import * as categoryController from '../controllers/categoryController.mjs';
import * as varify from '../middlewares/varifyToken.mjs';
import validateObject from '../middlewares/validateObjectId.mjs';
import express from 'express';

const route = express.Router();

route.post('/', varify.verifytokenOnlyUserAndAdmin, categoryController.createCategory)
route.get('/', varify.verifytokenOnlyUserAndAdmin, categoryController.getAllCategories)
route.delete('/:id', validateObject, varify.verifytokenOnlyUserAndAdmin, categoryController.deleteCategory)
export default route;