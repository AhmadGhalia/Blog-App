import express from 'express'
import { registerUserCtrl, loginUser} from '../controllers/userAuth.mjs'
const route = express.Router()
route.post('/register',registerUserCtrl)

route.post('/login', loginUser)

export default route