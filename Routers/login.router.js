import express from 'express';
import { userLogin } from '../Controllers/Login.js';
import { forGetPassword, passwordReset } from '../Controllers/ForGetPassword.js';



const router = express.Router()
router.post('/login',userLogin) // http://localhost:4000/user/login
router.post('/forgetpassword',forGetPassword) // http://localhost:4000/user/forgetpassword
router.post('/resetpassword',passwordReset) // http://localhost:4000/user/resetpassword
export default router