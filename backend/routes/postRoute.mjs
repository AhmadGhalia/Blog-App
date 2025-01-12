import * as postController from '../controllers/postController.mjs';
import * as validate from '../middlewares/varifyToken.mjs';
import validateObjectId from '../middlewares/validateObjectId.mjs';
import { photoUpload } from '../middlewares/photoUpload.mjs';
import express from 'express';

const route = express.Router();

// Using the namespace objects
route.post('/', validate.verifyToken, photoUpload.single('image'), postController.createNewPostCtrl);
route.get('/', postController.getAllPostCtrl);
route.get('/:id', validateObjectId, postController.getSinglePostCtrl);
route.get('/count', postController.getCountPostCtrl);
route.delete('/delete/:id', validateObjectId, validate.verifyToken, postController.deleteSinglePostCtrl);
route.put('/update/:id', validateObjectId, validate.verifyToken, postController.updateSinglePostCtrl);
route.put('/like/:id', validateObjectId, validate.verifyToken, postController.taggleLike);

export default route; 
