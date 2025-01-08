import { getAllUsersCtrl, getUserCtrl ,updateUserProfileCtrl, getUserCount} from '../controllers/userController.mjs'
import express from 'express'
import {verifyToken, verifyAdmin, verifytokenOnlyUser }from '../middlewares/varifyToken.mjs'
import validateObjectId from '../middlewares/validateObjectId.mjs'
const route = express.Router()
route.get('/profile', verifyAdmin, getAllUsersCtrl)
route.get('/count', verifyAdmin, getUserCount)
route.get('/profile/:id',validateObjectId, getUserCtrl)
route.put('/profile/:id',validateObjectId, verifytokenOnlyUser, updateUserProfileCtrl)
export default route   