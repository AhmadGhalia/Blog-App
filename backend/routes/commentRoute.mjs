import * as commentController from '../controllers/commentController.mjs';
import * as varify from '../middlewares/varifyToken.mjs';
import * as validate from '../models/validation.mjs';
import validateObject from '../middlewares/validateObjectId.mjs'
import express from 'express';

const route = express.Router();
route.post('/create', varify.verifyToken, commentController.createNewComment)
route.get('/', varify.verifyAdmin, commentController.getAllComment)
route.delete('/',validateObject, varify.verifyToken, commentController.deleteComment)
route.put('/',validateObject, varify.verifyToken, commentController.updateComment)
export default route;
