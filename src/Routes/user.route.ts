import { Router } from "express";
import { ClienteController } from "../Controllers/UserController";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";

const router = Router();

router.get("/user", ClienteController.getUserInfo);
router.post("/delete", ClienteController.deleteUser);
router.get("/all", ClienteController.getAllUsers)
router.put("/user", ClienteController.updateUser);
router.post("/user/email", ClienteController.getUserByEmail);

export default router;