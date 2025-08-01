import express from 'express';
import { LoginUser, logout, RegisterUser } from '../controller/auth_controller.js';

let router = express.Router();


// Route to create a new user
router.post('/signup', RegisterUser);
router.post("/signin",LoginUser);
router.post("/logout",logout)


export default router;