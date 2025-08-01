import express from "express"
import { DeleteUser, GetUser, GetUserById, PostUser, UpdateUser } from "../controller/user_controller.js";
import { authenticateUser, authorizeRole } from "../middlewares/middleware.js";
let router = express.Router();


router.post("/create-user", PostUser);
router.get("/get-users", authenticateUser,authorizeRole("admin") ,GetUser);
router.delete("/delete-user/:id", DeleteUser);
router.put("/update-user/:id", UpdateUser);
router.get("/get-user/:id", GetUserById)

export default router;