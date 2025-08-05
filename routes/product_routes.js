import express from 'express';
import { CreateProduct, GetAllProducts } from '../controller/product_controller.js';
import { AuthenticateUser } from '../middlewares/middleware.js';


let router = express.Router();


// Route to create a new user
router.post("/create/product",AuthenticateUser, CreateProduct);
router.get("/get/products",GetAllProducts);



export default router;