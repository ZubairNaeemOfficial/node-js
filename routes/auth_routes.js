import express from 'express';
import { LoginUser, logout, RegisterUser } from '../controller/auth_controller.js';
import { upload } from '../utils/multerFunctions.js';

let router = express.Router();


// Route to create a new user
router.post('/signup',upload.single("image"), RegisterUser);
router.post("/signin",LoginUser);
router.post("/logout",logout)


export default router;