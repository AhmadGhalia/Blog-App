import * as commentController from '../controllers/commentController.mjs';
import * as varify from '../middlewares/varifyToken.mjs';
import * as validate from '../models/validation.mjs';
import validateObject from '../middlewares/validateObjectId.mjs'
import express from 'express';

const route = express.Router();

// Using the namespace objects
route.post('/create', varify.verifyToken, commentController.createNewComment)
route.get('/', varify.verifyAdmin, commentController.getAllComment)
route.delete('/',validateObject, varify.verifyToken, commentController.deleteComment)
export default route;
