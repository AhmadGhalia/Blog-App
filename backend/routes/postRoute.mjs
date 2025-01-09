import{createNewPostCtrl} from '../controllers/postController.mjs'
import express from 'express';
// Import middleware functions to verify tokens and access permissions
import { verifyToken, verifyAdmin, verifytokenOnlyUser ,verifytokenOnlyUserAndAdmin } from '../middlewares/varifyToken.mjs';
// Import middleware to validate MongoDB Object IDs
import validateObjectId from '../middlewares/validateObjectId.mjs';

import { photoUpload } from '../middlewares/photoUpload.mjs'
const route = express.Router();

route.post('/create',verifyToken,photoUpload.single('image'),createNewPostCtrl)

export default route;